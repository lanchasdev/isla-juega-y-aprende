/* Mira y recuerda */
(function () {
'use strict';
const U = Kids.util;
Kids.art.add({
  'x10-car': c => `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="84" rx="42" ry="5" fill="#000" opacity=".1"/><path d="M6 68Q6 56 18 54L28 38Q32 32 40 32H62Q70 32 75 38L85 54Q95 56 95 68V74H6Z" fill="${c}" stroke="rgba(0,0,0,.12)" stroke-width="1.5" stroke-linejoin="round"/><path d="M33 40Q35 36 40 36H47V52H26Z" fill="#DDF1FF"/><path d="M52 36H62Q67 36 69 40L78 52H52Z" fill="#DDF1FF"/><rect x="88" y="58" width="7" height="7" rx="3" fill="#FFE27A"/><rect x="6" y="58" width="5" height="7" rx="2.5" fill="#FF8A7A"/><g><circle cx="27" cy="74" r="10" fill="#33406B"/><circle cx="27" cy="74" r="4.5" fill="#C9D3EA"/><circle cx="74" cy="74" r="10" fill="#33406B"/><circle cx="74" cy="74" r="4.5" fill="#C9D3EA"/></g></svg>`
});
function A(name, x, y, w, flip) {
  const args = Array.prototype.slice.call(arguments, 5);
  const s = Kids.art.get.apply(Kids.art, [name].concat(args)).replace('<svg', `<svg x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${w.toFixed(1)}"`);
  return flip ? `<g transform="translate(${(2 * x + w).toFixed(1)} 0) scale(-1 1)">${s}</g>` : s;
}
const COLORS = [
  { h: '#E5484D', m: 'rojo', f: 'roja' }, { h: '#3B82F6', m: 'azul', f: 'azul' }, { h: '#34B36B', m: 'verde', f: 'verde' },
  { h: '#FFC21A', m: 'amarillo', f: 'amarilla' }, { h: '#FF7EA8', m: 'rosa', f: 'rosa' }, { h: '#8C7BE0', m: 'morado', f: 'morada' }, { h: '#FF9340', m: 'naranja', f: 'naranja' }
];
const ANIM = { dog: 'el perro', cat: 'el gato', rabbit: 'el conejo', pig: 'el cerdito', sheep: 'la oveja', duck: 'el patito', hen: 'la gallina', mouse: 'el ratón', frog: 'la rana', cow: 'la vaca' };
const SECS = { 1: 10, 2: 8, 3: 6 };
const BIRDS = [[28, 24], [52, 40], [70, 14], [118, 30], [138, 12], [158, 46]];
const BUTT = [[82, 50], [118, 44], [100, 30]];
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

/* escena: datos puros; el dibujo sale de ellos */
function genScene(lv) {
  const cols = U.shuffle(COLORS);
  const sc = { lv, carC: cols[0], flowC: cols[1], ballC: cols[2], birds: U.rnd(2, lv === 3 ? 6 : lv === 2 ? 5 : 4), butt: U.rnd(2, 3) };
  const an = U.shuffle(Object.keys(ANIM));
  sc.animX = an[0]; sc.animY = an[1]; sc.carLeft = Math.random() < .5;
  return sc;
}
function drawScene(sc) {
  const lv = sc.lv; let s = '<rect width="200" height="130" fill="#CDEBFF"/><ellipse cx="60" cy="84" rx="120" ry="14" fill="#B5E3A4"/><rect y="86" width="200" height="44" fill="#A9DE9A"/><rect y="118" width="200" height="12" fill="#9AD68C"/>';
  s += A('sun', 168, 4, 26);
  s += A('tree', 70, 56, 62);
  const leftSlot = 24, rightSlot = 140;
  const carX = sc.carLeft ? leftSlot : rightSlot, aniX = sc.carLeft ? rightSlot : leftSlot;
  s += A('x10-car', carX - 2, 82, 40, !sc.carLeft, sc.carC.h);
  if (lv >= 2) s += A(sc.animX, aniX, 84, 36, sc.carLeft);
  s += A('flower', 96, 104, 24, false, sc.flowC.h);
  s += BIRDS.slice(0, sc.birds).map((p, i) => A('bird', p[0], p[1], 15, i % 2)).join('');
  if (lv >= 2) s += A('balloon', 4, 34, 26, false, sc.ballC.h);
  if (lv >= 3) {
    s += BUTT.slice(0, sc.butt).map((p, i) => A('butterfly', p[0], p[1], 14, i % 2)).join('');
    s += A(sc.animY, 62, 104, 22, false);
  }
  return s;
}
/* preguntas generadas desde los datos */
function genQs(sc, lv) {
  const P = [];
  P.push({ k: 'color', obj: 'car', q: '¿De qué color era el coche?', ans: sc.carC, fem: false });
  P.push({ k: 'color', obj: 'flower', q: '¿De qué color era la flor?', ans: sc.flowC, fem: true });
  P.push({ k: 'count', q: '¿Cuántos pajaritos había en el cielo?', ans: sc.birds, art: 'bird' });
  if (lv >= 2) {
    P.push({ k: 'color', obj: 'balloon', q: '¿De qué color era el globo?', ans: sc.ballC, fem: false });
    P.push({ k: 'which', q: '¿Qué animal había junto al árbol?', ans: sc.animX, pool: Object.keys(ANIM).filter(a => a !== sc.animX && a !== sc.animY) });
  }
  if (lv >= 3) {
    P.push({ k: 'count', q: '¿Cuántas mariposas había?', ans: sc.butt, art: 'butterfly' });
    const left = sc.carLeft ? 'car' : sc.animX, right = sc.carLeft ? sc.animX : 'car';
    const mk = (side, ans) => ({ k: 'pos', q: '¿Qué había a la ' + side + ' del árbol?', ans, pool: Object.keys(ANIM).filter(a => a !== sc.animX && a !== sc.animY), sc });
    P.push(mk('izquierda', left), mk('derecha', right));
    P.push({ k: 'which', q: '¿Qué animalito pequeño había delante del árbol?', ans: sc.animY, pool: Object.keys(ANIM).filter(a => a !== sc.animX && a !== sc.animY) });
  }
  let pick;
  if (lv === 3) {
    const pos = U.pick(P.filter(p => p.k === 'pos')), rest = U.shuffle(P.filter(p => p !== pos && !(p.k === 'pos'))).slice(0, 2);
    pick = U.shuffle([pos].concat(rest));
  } else {
    // tres preguntas de tipos distintos si se puede
    const sh = U.shuffle(P); pick = [];
    sh.forEach(p => { if (pick.length < 3 && !pick.some(x => x.k === p.k && x.obj === p.obj)) pick.push(p); });
  }
  return pick;
}
function optsFor(q, sc) {
  let o;
  if (q.k === 'color') {
    const others = U.sample(COLORS.filter(c => c.h !== q.ans.h), 2);
    o = [q.ans].concat(others).map(c => ({ id: c.h, html: Kids.art.get(q.obj === 'car' ? 'x10-car' : q.obj, ...(q.obj === 'car' ? [c.h] : [c.h])), label: c[q.fem ? 'f' : 'm'], ok: c.h === q.ans.h }));
  } else if (q.k === 'count') {
    const set = new Set([q.ans]); const base = [q.ans - 1, q.ans + 1, q.ans - 2, q.ans + 2].filter(n => n >= 1 && n <= 7);
    U.shuffle(base).forEach(n => { if (set.size < 3) set.add(n); });
    o = [...set].map(n => ({ id: n, html: '', label: String(n), num: true, ok: n === q.ans }));
  } else if (q.k === 'which') {
    o = [q.ans].concat(U.sample(q.pool, 2)).map(a => ({ id: a, html: Kids.art.get(a), label: cap(ANIM[a]), ok: a === q.ans }));
  } else { // posición
    const sc2 = q.sc, other = q.ans === 'car' ? sc2.animX : 'car';
    const third = U.pick(q.pool);
    const names = [q.ans, other, third];
    o = names.map(a => ({ id: a, html: a === 'car' ? Kids.art.get('x10-car', sc2.carC.h) : Kids.art.get(a), label: a === 'car' ? 'El coche' : cap(ANIM[a]), ok: a === q.ans }));
  }
  return U.shuffle(o);
}

let sc = null, qs = [];
Kids.css(`
.g-memoria-x10{gap:.8rem}
.g-memoria-x10 .mr{display:flex;flex-direction:column;align-items:center;gap:.8rem;width:100%}
.g-memoria-x10 .mr-board{width:min(100%,calc(55vh * 200 / 130));aspect-ratio:200/130;border-radius:1.6rem;overflow:hidden;border:.25rem solid #fff;box-shadow:0 .4rem 0 rgba(20,35,91,.14);background:#CDEBFF;flex:none}
.g-memoria-x10 .mr-board svg{width:100%;height:100%;display:block}
.g-memoria-x10 .mr-bar{display:flex;align-items:center;gap:1rem;flex-wrap:wrap;justify-content:center;width:min(100%,34rem)}
.g-memoria-x10 .mr-cnt{width:3.6rem;height:3.6rem;border-radius:50%;background:var(--g);color:#fff;font-family:'Baloo 2',sans-serif;font-size:2.2rem;display:flex;align-items:center;justify-content:center;box-shadow:0 .25rem 0 var(--gd);flex:none}
.g-memoria-x10 .mr-prog{flex:1;min-width:6rem;height:1rem;background:#fff;border-radius:999px;overflow:hidden;box-shadow:inset 0 0 0 .15rem var(--line)}
.g-memoria-x10 .mr-prog i{display:block;height:100%;width:100%;background:var(--yellow);border-radius:999px;transition:width linear}
.g-memoria-x10 .mr-curtain{width:min(100%,13rem);aspect-ratio:200/130;border-radius:1.6rem;background:var(--gl);display:flex;align-items:center;justify-content:center;border:.25rem dashed var(--g);flex:none}
.g-memoria-x10 .mr-curtain svg{height:75%;width:auto}
.g-memoria-x10 .mr-opts{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;width:100%}
.g-memoria-x10 .mr-opts .pic{width:9.5rem;min-height:9rem}
.g-memoria-x10 .mr-opts .pic svg{max-width:6rem;max-height:6rem}
.g-memoria-x10 .mr-opts .pic.num{font-size:3.4rem;min-height:6.5rem;justify-content:center}
.g-memoria-x10 .mr-opts .pic.num .lbl{font-size:3.4rem}
@media (max-width:640px){.g-memoria-x10 .mr-opts .pic{width:28%;min-height:7rem}.g-memoria-x10 .mr-opts .pic svg{max-width:4.5rem;max-height:4.5rem}.g-memoria-x10 .mr-board{width:100%}}
`);

Kids.game({
  id: 'memoria-x10', group: 'memoria', num: 14,
  title: 'Mira y recuerda',
  blurb: 'Mira la escena unos segundos y contesta preguntas sobre lo que has visto.',
  how: 'Mira bien la imagen. Cuando se acabe el tiempo, se esconde y te hago tres preguntas sobre lo que has visto. Si te olvidas, puedes mirar otra vez.',
  icon: 'owl',
  levels: ['10 segundos, 3 cosas', '8 segundos, 5 cosas', '6 segundos, 7 cosas'],
  rounds: 3,
  round(g, ri) {
    if (ri === 0) { sc = genScene(g.level); qs = genQs(sc, g.level); }
    const q = qs[ri];
    const root = U.el('<div class="mr"></div>'); g.area.appendChild(root);
    let tok = 0;
    function showScene(secs, done, again) {
      const my = ++tok; let left = secs;
      g.ask(again ? 'Mira otra vez, ¡con calma!' : '¡Mira bien! Luego te pregunto');
      root.innerHTML = `<div class="mr-board" role="img" aria-label="Escena para recordar"><svg viewBox="0 0 200 130">${drawScene(sc)}</svg></div>
        <div class="mr-bar"><div class="mr-cnt" aria-live="off">${left}</div><div class="mr-prog"><i></i></div><button class="btn sm" id="rdy" aria-label="${again ? 'Ya lo he visto' : 'Estoy listo'}">${again ? 'Ya lo vi' : '¡Estoy listo!'}</button></div>`;
      const cnt = root.querySelector('.mr-cnt'), bar = root.querySelector('.mr-prog i');
      void bar.offsetWidth; bar.style.transitionDuration = secs + 's'; bar.style.width = '0%';
      const end = () => { if (tok !== my) return; tok++; done(); };
      root.querySelector('#rdy').onclick = end;
      (function tick() { g.t(() => { if (tok !== my) return; left--; if (left <= 0) end(); else { cnt.textContent = left; tick(); } }, 1000); })();
    }
    function showQ() {
      tok++;
      g.ask(q.q);
      const os = optsFor(q, sc);
      root.innerHTML = `<div class="mr-curtain" aria-hidden="true">${Kids.art.get('cloud')}</div><div class="mr-opts"></div><div class="mr-again"></div>`;
      const box = root.querySelector('.mr-opts');
      os.forEach(o => {
        const b = U.el(`<button class="pic ${o.num ? 'num' : ''}" aria-label="${U.esc(o.label)}">${o.html}<span class="lbl">${U.esc(o.label)}</span></button>`);
        b.onclick = () => {
          if (o.ok) { b.classList.add('right'); box.querySelectorAll('button').forEach(x => x.disabled = true); g.right(); }
          else { b.classList.add('bad'); b.disabled = true; g.wrong(); }
        };
        box.appendChild(b);
      });
      if (q.k === 'count') {
        const c = root.querySelector('.mr-curtain'); c.innerHTML = '<div style="display:flex;gap:.3rem;flex-wrap:wrap;justify-content:center;width:70%;height:70%;align-items:center" aria-hidden="true">' + Kids.art.get(q.art).replace('<svg', '<svg style="width:3rem;height:3rem;opacity:.5"') + '</div>';
      }
    }
    g.helpHint = () => {
      const a = root.querySelector('.mr-again'); if (!a || a.firstChild) return;
      const b = U.el('<button class="btn sm blue" aria-label="Mirar otra vez la escena">Mirar otra vez</button>');
      b.onclick = () => showScene(5, showQ, true);
      a.appendChild(b); g.toast('Puedes mirar otra vez');
    };
    if (ri === 0) showScene(SECS[g.level], showQ, false); else showQ();
  }
});
})();
