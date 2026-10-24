/* Mates X3 — Decenas y unidades */
(function () {
'use strict';
const U = Kids.util, A = Kids.art;
let lastN = 0;

const stick = (c) => `<svg viewBox="0 0 20 100" preserveAspectRatio="xMidYMid meet"><rect x="3" y="2" width="14" height="96" rx="7" fill="${c}"/><rect x="6" y="6" width="3" height="60" rx="1.5" fill="#fff" opacity=".45"/></svg>`;
const bundle = () => {
  const cols = ['#FFB86B', '#FFC978', '#FFB86B', '#FFC978', '#FFB86B', '#FFC978', '#FFB86B', '#FFC978', '#FFB86B', '#FFC978'];
  return `<svg viewBox="0 0 100 100"><g>${cols.map((c, k) => `<rect x="${4 + k * 9.4}" y="4" width="8" height="92" rx="4" fill="${c}"/>`).join('')}</g><rect x="2" y="32" width="96" height="10" rx="5" fill="#FF7E69"/><rect x="2" y="60" width="96" height="10" rx="5" fill="#FF7E69"/></svg>`;
};
A.add({ 'mx3-stick': stick, 'mx3-bundle': bundle });

Kids.css(`
.g-mates-x3 .x3-wrap{display:flex;flex-direction:column;align-items:center;gap:.9rem;width:100%;max-width:60rem}
.g-mates-x3 .x3-board{display:grid;grid-template-columns:1.4fr 1fr;gap:.9rem;width:100%}
.g-mates-x3 .x3-col{background:#fff;border-radius:1.6rem;border:.2rem solid var(--line);box-shadow:0 .4rem 0 var(--line);padding:.5rem .7rem .7rem;display:flex;flex-direction:column;align-items:center;gap:.3rem;min-height:11.5rem;transition:background .15s}
.g-mates-x3 .x3-col.hot{background:#FFF3BF}
.g-mates-x3 .x3-col h4{margin:0;font-family:'Baloo 2';font-size:1.25rem;display:flex;gap:.5rem;align-items:center}
.g-mates-x3 .x3-col h4 b{background:var(--gl);border-radius:.7rem;min-width:2rem;text-align:center;padding:0 .4rem;font-size:1.4rem}
.g-mates-x3 .x3-in{display:flex;flex-wrap:wrap;gap:.35rem;justify-content:center;align-content:center;flex:1;width:100%}
.g-mates-x3 .x3-b{width:min(3.6rem,8.4vw);height:min(5.2rem,13vw);animation:pop .3s both;display:block}
.g-mates-x3 .x3-b svg,.g-mates-x3 .x3-s svg,.g-mates-x3 .x3-src i svg{width:100%;height:100%}
.g-mates-x3 .x3-s{width:min(1.1rem,3vw);height:min(4.6rem,12vw);animation:pop .3s both;display:block}
.g-mates-x3 .x3-tools{display:grid;grid-template-columns:1fr 1fr;gap:.7rem;width:100%}
.g-mates-x3 .x3-src{display:flex;align-items:center;gap:.6rem;background:var(--a2);border-radius:1.4rem;padding:.4rem .8rem;box-shadow:0 .3rem 0 rgba(20,35,91,.14);font-family:'Baloo 2';font-weight:800;font-size:1.25rem;line-height:1;text-align:left;touch-action:none}
.g-mates-x3 .x3-src.u{background:var(--a3)}
.g-mates-x3 .x3-src i{display:block;flex:none;width:3rem;height:3.8rem;font-style:normal}
.g-mates-x3 .x3-src small{display:block;font-family:'Nunito';font-size:.85rem;color:var(--ink2)}
.g-mates-x3 .x3-src:active{transform:translateY(.15rem)}
.g-mates-x3 .x3-row{display:flex;gap:.8rem;flex-wrap:wrap;justify-content:center}
.g-mates-x3 .x3-pile{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;align-items:flex-end;background:#fff;border:.2rem solid var(--line);border-radius:1.6rem;padding:.8rem 1rem;box-shadow:0 .4rem 0 var(--line);width:100%}
.g-mates-x3 .x3-pile .tens{display:flex;flex-wrap:wrap;gap:.4rem;justify-content:center}
.g-mates-x3 .x3-pile .ones{display:flex;flex-wrap:wrap;gap:.3rem;justify-content:center;align-items:flex-end}
.g-mates-x3 .x3-big{font-family:'Baloo 2';font-weight:800;font-size:3.4rem;line-height:1;background:#fff;border-radius:1.4rem;padding:.2rem 1.4rem;box-shadow:0 .3rem 0 var(--line)}
.g-mates-x3 .x3-ok{font-size:1.5rem;padding:.4rem 1.8rem}
.g-mates-x3 .x3-ghost{width:min(3.6rem,8.4vw);height:min(5.2rem,13vw);opacity:.35;display:block}
@media (max-width:640px){.g-mates-x3 .x3-board{grid-template-columns:1.2fr 1fr}.g-mates-x3 .x3-src{font-size:1rem;padding:.3rem .5rem}.g-mates-x3 .x3-src i{width:2rem}}
`);

function maxFor(lv) { return lv === 1 ? 20 : lv === 2 ? 60 : 99; }
function newN(lv) {
  for (let t = 0; t < 40; t++) {
    const n = lv === 1 ? U.rnd(3, 20) : lv === 2 ? U.rnd(12, 60) : U.rnd(21, 99);
    if (n !== lastN && !(lv > 1 && n % 10 === 0 && Math.random() < .7)) { lastN = n; return n; }
  }
  return 17;
}
const tx = n => n === 1 ? '1 paquete' : n + ' paquetes';

Kids.game({
  id: 'mates-x3', group: 'mates', num: 8,
  title: 'Decenas y unidades',
  blurb: 'Forma números con paquetes de 10 palitos y palitos sueltos.',
  how: 'Un paquete tiene diez palitos. Forma el número que te piden con paquetes y palitos sueltos, o cuenta cuántos hay y toca el número.',
  icon: 'pear',
  levels: ['Hasta 20', 'Hasta 60', 'Hasta 99 y mezcla'],
  rounds: 8,
  round(g, i) {
    const lv = g.level, n = newN(lv), T = Math.floor(n / 10), O = n % 10;
    const mode = lv === 1 ? (i % 2 ? 'count' : 'form') : lv === 2 ? (i % 3 === 2 ? 'count' : 'form') : (Math.random() < .5 ? 'count' : 'form');
    const wrap = U.el('<div class="x3-wrap"></div>'); g.area.appendChild(wrap);
    if (mode === 'count') return countMode();
    return formMode();

    function countMode() {
      g.ask('¿Cuántos palitos hay?');
      const pile = U.el('<div class="x3-pile" role="img" aria-label="Montón de palitos"><div class="tens"></div><div class="ones"></div></div>');
      for (let k = 0; k < T; k++) pile.querySelector('.tens').appendChild(U.el(`<span class="x3-b">${bundle()}</span>`));
      for (let k = 0; k < O; k++) pile.querySelector('.ones').appendChild(U.el(`<span class="x3-s">${stick('#FFB86B')}</span>`));
      wrap.appendChild(pile);
      wrap.appendChild(U.el('<div style="color:var(--ink2);font-size:1.1rem">Cada paquete tiene 10 palitos</div>'));
      const opts = new Set([n]);
      [n + 1, n - 1, n + 10, n - 10, T + O * 10, n + 2, n - 2].forEach(c => { if (opts.size < 4 && c >= 1 && c <= maxFor(lv) && c !== n && (lv > 1 || c <= 20)) opts.add(c); });
      while (opts.size < 4) opts.add(U.rnd(1, maxFor(lv)));
      const ob = U.el('<div class="opts"></div>');
      const btns = U.shuffle([...opts]).map(v => {
        const b = U.el(`<button class="ans">${v}</button>`);
        b.onclick = () => {
          if (v === n) { btns.forEach(x => x.disabled = true); b.classList.add('right'); g.right(); }
          else { b.classList.add('bad'); b.disabled = true; g.wrong(); }
        };
        ob.appendChild(b); return b;
      });
      wrap.appendChild(ob);
      g.helpHint = () => {
        g.toast(`${tx(T)} y ${O === 1 ? '1 palito' : O + ' palitos'}: ${T ? T + ' decenas' : ''} ${O ? ' y ' + O + ' unidades' : ''}`.replace(/\s+/g, ' '));
        btns.forEach(b => { if (+b.textContent === n && !b.disabled) b.classList.add('hint'); });
        pile.style.outline = '.25rem solid #FFD23F';
      };
    }

    function formMode() {
      g.ask('Forma el ' + n);
      let t = 0, o = 0;
      wrap.appendChild(U.el(`<div class="x3-big" aria-label="Número ${n}">${n}</div>`));
      const board = U.el(`<div class="x3-board">
        <div class="x3-col" data-k="t"><h4>Paquetes <b class="ct">0</b></h4><div class="x3-in"></div></div>
        <div class="x3-col" data-k="o"><h4>Sueltos <b class="co">0</b></h4><div class="x3-in"></div></div></div>`);
      wrap.appendChild(board);
      const colT = board.children[0], colO = board.children[1];
      const draw = () => {
        const it = colT.querySelector('.x3-in'), io = colO.querySelector('.x3-in');
        it.innerHTML = ''; io.innerHTML = '';
        for (let k = 0; k < t; k++) it.appendChild(U.el(`<span class="x3-b">${bundle()}</span>`));
        for (let k = 0; k < o; k++) io.appendChild(U.el(`<span class="x3-s">${stick('#FFB86B')}</span>`));
        colT.querySelector('.ct').textContent = t; colO.querySelector('.co').textContent = o;
      };
      const addT = () => { if (t < 9) { t++; Kids.sound.pop(); draw(); } };
      const addO = () => {
        o++; Kids.sound.pop();
        if (o >= 10) { o = 0; t++; draw(); g.toast('¡10 palitos! Se atan en un paquete'); } else draw();
      };
      const tools = U.el(`<div class="x3-tools">
        <button class="x3-src" data-k="t" aria-label="Añadir un paquete de 10"><i>${bundle()}</i><span>+ Paquete<small>10 palitos</small></span></button>
        <button class="x3-src u" data-k="o" aria-label="Añadir un palito"><i>${stick('#FFB86B')}</i><span>+ Palito<small>1 palito</small></span></button></div>`);
      wrap.appendChild(tools);
      const [bT, bO] = tools.children;
      [[bT, addT], [bO, addO]].forEach(([b, fn]) => {
        Kids.drag(b, {
          targets: () => [colT, colO],
          onDrop(tg) { b.style.transform = ''; if (tg === colT && b === bT) addT(); else if (tg === colO && b === bO) addO(); else if (tg === colT) addT(); else addO(); return false; },
          onTap: fn
        });
        b.addEventListener('click', e => { if (e.detail === 0) fn(); });
      });
      // un solo dragger por tipo: soltar en la columna que sea añade el tipo de la herramienta
      bT.onpointerup = null;
      const row = U.el('<div class="x3-row"></div>');
      const rm = U.el('<button class="btn white sm" aria-label="Quitar uno">Quitar</button>');
      const clr = U.el('<button class="btn white sm" aria-label="Empezar de nuevo">Vaciar</button>');
      const ok = U.el('<button class="btn x3-ok" aria-label="Comprobar">¡Listo!</button>');
      rm.onclick = () => { if (o > 0) o--; else if (t > 0) { t--; o = 9; } draw(); Kids.sound.tap && Kids.sound.tap(); };
      clr.onclick = () => { t = 0; o = 0; draw(); };
      ok.onclick = () => {
        if (t * 10 + o === n) { ok.disabled = true; rm.disabled = true; clr.disabled = true; bT.dataset.locked = 1; bO.dataset.locked = 1; g.right(); }
        else if (t * 10 + o === 0) g.toast('Añade paquetes y palitos');
        else { g.shake(board); g.wrong(t * 10 + o > n ? 'Te has pasado un poquito' : 'Todavía faltan palitos'); }
      };
      row.append(rm, clr, ok); wrap.appendChild(row);
      g.helpHint = () => {
        g.toast(`El ${n} son ${tx(T)} y ${O === 1 ? '1 palito suelto' : O + ' palitos sueltos'}`);
        colT.style.outline = colO.style.outline = '';
        colT.style.outline = '.25rem solid #FFD23F';
        if (O) colO.style.outline = '.25rem solid #FFD23F';
      };
    }
  }
});
})();
