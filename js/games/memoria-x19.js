/* memoria-x19 — Torre de Hanói con tres discos */
(function () {
'use strict';
const K = window.Kids, U = K.util;

const COLORS = ['#FF7EA8', '#FFC93C', '#4C8DF6', '#5CC77A'];      // disco 1 (pequeño) .. 4 (grande)
const SHADE = ['#D9527F', '#D9A010', '#2F68C9', '#3AA057'];
const PEGNAME = ['de la izquierda', 'del medio', 'de la derecha'];
const OPT = { 2: 3, 3: 7, 4: 15 };
let lastMoves = 0, lastN = 3, lastLevel = 1;

/* Solver recursivo: siguiente movimiento óptimo para llevar todos los discos <= k a dest */
function hintMove(pegs, k, dest) {
  if (k === 0) return null;
  const p = pegs.findIndex(s => s.includes(k));
  if (p === dest) return hintMove(pegs, k - 1, dest);
  const via = 3 - p - dest;
  for (let m = k - 1; m >= 1; m--) if (!pegs[via].includes(m)) return hintMove(pegs, k - 1, via);
  return [p, dest];
}

K.css(`
.g-memoria-x19{gap:.8rem}
.g-memoria-x19 .bar{display:flex;gap:.8rem;align-items:center;justify-content:center;flex-wrap:wrap}
.g-memoria-x19 .moves{background:#fff;border-radius:999px;padding:.2rem 1.2rem;font-family:'Baloo 2';font-size:1.4rem;box-shadow:var(--shadow)}
.g-memoria-x19 .moves b{color:var(--gd);font-size:1.8rem}
.g-memoria-x19 .goal{font-size:1.1rem;color:var(--ink2);font-family:'Baloo 2'}
.g-memoria-x19 .board{width:min(48rem,96%);background:linear-gradient(#D6EEFF,#EAF7FF);border-radius:2rem;padding:1rem 1rem 0;box-shadow:0 .4rem 0 rgba(20,35,91,.12);position:relative}
.g-memoria-x19 .pegs{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;height:calc(var(--n)*2.5rem + 5rem)}
.g-memoria-x19 .peg{position:relative;border-radius:1.2rem;transition:background .2s}
.g-memoria-x19 .peg.hot,.g-memoria-x19 .peg.sel{background:rgba(255,210,63,.35)}
.g-memoria-x19 .peg.hint{animation:pulse 1s infinite;background:rgba(92,199,122,.3)}
.g-memoria-x19 .pegbtn{position:absolute;inset:0;width:100%;height:100%;border-radius:1.2rem;z-index:1}
.g-memoria-x19 .pegbtn:focus-visible{outline:.25rem solid var(--blue)}
.g-memoria-x19 .rod{position:absolute;left:50%;bottom:0;width:1.1rem;height:calc(100% - .4rem);transform:translateX(-50%);background:linear-gradient(90deg,#B98B5B,#D9AE7C,#B98B5B);border-radius:.6rem .6rem 0 0}
.g-memoria-x19 .disc{position:absolute;left:50%;height:2.2rem;border-radius:1.1rem;transform:translateX(-50%);transition:bottom .2s,transform .2s;z-index:2;pointer-events:none;
  box-shadow:inset 0 -.35rem 0 rgba(0,0,0,.16),0 .15rem 0 rgba(20,35,91,.15);display:flex;align-items:center;justify-content:center;font-family:'Baloo 2';color:#fff;font-size:1.2rem;text-shadow:0 .1rem 0 rgba(0,0,0,.25)}
.g-memoria-x19 .disc.top{pointer-events:auto}
.g-memoria-x19 .disc.lift{transform:translateX(-50%) translateY(-1.1rem) scale(1.05)}
.g-memoria-x19 .disc.dragging{transition:none}
.g-memoria-x19 .base{height:1.2rem;margin:0 -1rem;background:#B98B5B;border-radius:0 0 1.6rem 1.6rem;box-shadow:inset 0 .3rem 0 #D9AE7C}
.g-memoria-x19 .msg{min-height:1.8rem;font-family:'Baloo 2';font-size:1.25rem;color:var(--ink2);text-align:center}
.g-memoria-x19 .btns{display:flex;gap:.8rem;flex-wrap:wrap;justify-content:center}
@media (max-width:640px){.g-memoria-x19 .disc{height:2rem}.g-memoria-x19 .pegs{height:calc(var(--n)*2.3rem + 5rem)}}
`);

K.game({
  id: 'memoria-x19', group: 'memoria', num: 23, title: 'Torre de Hanói',
  blurb: 'Pasa la torre de discos a otra varilla. Un disco grande nunca va sobre uno pequeño.',
  how: 'Toca una varilla para coger el disco de arriba y toca otra varilla para soltarlo. También puedes arrastrarlo. Nunca pongas un disco grande encima de uno pequeño. Lleva toda la torre a otra varilla.',
  icon: 'drum', levels: ['2 discos', '3 discos con pista', '3 discos, menos de 11'], rounds: 1,
  stars() {
    const m = lastMoves, o = OPT[lastN];
    if (lastLevel === 3) { const lim = lastN === 4 ? 20 : 10; return m <= lim ? 3 : m <= lim + 4 ? 2 : 1; }
    return m <= o + 2 ? 3 : m <= o + 6 ? 2 : 1;
  },
  round(g) {
    lastLevel = g.level;
    let n = g.level === 1 ? 2 : 3, moves = 0, sel = -1, pegs, hintOn = null, over = false;
    const area = g.area;
    g.ask(g.level === 1 ? 'Pasa los 2 discos a otra varilla' : 'Pasa la torre a otra varilla');

    const bar = U.el(`<div class="bar">
      <div class="moves">Movimientos: <b>0</b></div>
      <span class="goal"></span>
      ${g.level === 3 ? `<span class="seg" role="group" aria-label="Número de discos"><button class="on" data-n="3">3 discos</button><button data-n="4" aria-label="Reto extra, cuatro discos">Reto: 4</button></span>` : ''}
    </div>`);
    const board = U.el('<div class="board"><div class="pegs"></div><div class="base"></div></div>');
    const msg = U.el('<div class="msg" aria-live="polite"></div>');
    const btns = U.el(`<div class="btns">
      ${g.level <= 2 ? '<button class="btn blue sm" data-a="hint" aria-label="Pista">Pista</button>' : ''}
      <button class="btn white sm" data-a="reset" aria-label="Reiniciar">Reiniciar</button></div>`);
    area.append(bar, board, msg, btns);
    const pegsEl = board.querySelector('.pegs'), movesEl = bar.querySelector('b'), goalEl = bar.querySelector('.goal');

    function goalText() {
      const o = OPT[n];
      if (g.level === 3) return n === 4 ? 'Reto: menos de 21 movimientos' : 'Objetivo: menos de 11 movimientos';
      return `Se puede en ${o} movimientos`;
    }
    function reset() {
      pegs = [U.range(n).map(i => n - i), [], []]; moves = 0; sel = -1; hintOn = null; over = false;
      goalEl.textContent = goalText(); msg.textContent = ''; render();
    }
    function setMsg(t) { msg.textContent = t; }

    function render() {
      movesEl.textContent = moves;
      pegsEl.style.setProperty('--n', n);
      pegsEl.innerHTML = '';
      pegs.forEach((stack, p) => {
        const peg = U.el(`<div class="peg ${sel === p ? 'sel' : ''} ${hintOn && hintOn[1] === p ? 'hint' : ''} ${hintOn && hintOn[0] === p ? 'hint' : ''}" data-p="${p}">
          <button class="pegbtn" aria-label="Varilla ${p + 1}, ${stack.length ? stack.length + ' discos' : 'vacía'}"></button><div class="rod"></div></div>`);
        peg.querySelector('.pegbtn').onclick = () => tapPeg(p);
        stack.forEach((d, j) => {
          const w = 34 + d * (n === 4 ? 14 : 18);               // % del ancho de la varilla
          const top = j === stack.length - 1;
          const disc = U.el(`<div class="disc ${top ? 'top' : ''} ${top && sel === p ? 'lift' : ''}" style="width:${w}%;bottom:${j * 2.3}rem;background:linear-gradient(${COLORS[d - 1]},${SHADE[d - 1]})">${d}</div>`);
          peg.appendChild(disc);
          if (top && !over) K.drag(disc, {
            targets: () => Array.from(pegsEl.querySelectorAll('.pegbtn')),
            onStart: () => { if (sel !== -1 && sel !== p) return; },
            onDrop: (t) => { const to = +t.parentNode.dataset.p; if (to === p) return false; sel = p; tapPeg(to); return true; },
            onTap: () => tapPeg(p)
          });
        });
        pegsEl.appendChild(peg);
      });
    }

    function tapPeg(p) {
      if (over) return;
      hintOn = null;
      K.sound.tap();
      if (sel === -1) {
        if (!pegs[p].length) { setMsg('Esa varilla está vacía. Toca una con discos.'); render(); return; }
        sel = p; setMsg('Ahora toca la varilla donde lo quieres poner.'); render(); return;
      }
      if (sel === p) { sel = -1; setMsg(''); render(); return; }
      const from = sel; sel = -1;
      const disc = pegs[from][pegs[from].length - 1], tgt = pegs[p][pegs[p].length - 1];
      if (tgt !== undefined && tgt < disc) {
        render();
        setMsg('Un disco grande no puede ir sobre uno pequeño. ¡Ya lo he devuelto!');
        const el = pegsEl.children[p]; g.shake(el);
        g.wrong('Un disco grande no cabe sobre uno pequeño');
        return;
      }
      pegs[p].push(pegs[from].pop()); moves++; K.sound.pop(); setMsg('');
      render();
      if (p !== 0 && pegs[p].length === n) {
        over = true; lastMoves = moves; lastN = n;
        render();
        const o = OPT[n];
        setMsg(moves <= o ? '¡Lo has hecho con el menor número de movimientos!' : `¡Torre completa en ${moves} movimientos!`);
        g.t(() => g.right('¡Torre completada!'), 500);
      }
    }

    function showHint() {
      if (over) return;
      const lp = pegs.findIndex(s => s.includes(n)), h = hintMove(pegs, n, lp === 0 ? 2 : lp);
      if (!h) return;
      sel = -1; hintOn = h; render();
      const t = `Mueve el disco de la varilla ${PEGNAME[h[0]]} a la varilla ${PEGNAME[h[1]]}.`;
      setMsg(t); g.say(t);
    }
    g.helpHint = () => { if (g.level <= 2) showHint(); else { setMsg('Piensa: ¿dónde puede esperar el disco pequeño?'); g.say('Piensa: dónde puede esperar el disco pequeño'); } };

    btns.querySelector('[data-a=reset]').onclick = () => { K.sound.pop(); reset(); };
    const hb = btns.querySelector('[data-a=hint]'); if (hb) hb.onclick = () => { K.sound.pop(); showHint(); };
    bar.querySelectorAll('.seg button').forEach(b => b.onclick = () => {
      bar.querySelectorAll('.seg button').forEach(x => x.classList.toggle('on', x === b));
      n = +b.dataset.n; g.ask(n === 4 ? 'Reto extra: pasa la torre de 4 discos' : 'Pasa la torre a otra varilla'); K.sound.pop(); reset();
    });
    reset();
  }
});
})();
