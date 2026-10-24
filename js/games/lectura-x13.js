/* Lectura x13 — Familias de palabras */
(function () {
'use strict';
const U = Kids.util;

const SH = '<ellipse cx="50" cy="91" rx="30" ry="4.5" fill="rgba(20,35,91,.1)"/>';
const FACE = (y) => `<circle cx="40" cy="${y}" r="3.4" fill="#14235B"/><circle cx="60" cy="${y}" r="3.4" fill="#14235B"/><path d="M44 ${y + 8}Q50 ${y + 14} 56 ${y + 8}" fill="none" stroke="#14235B" stroke-width="2.6" stroke-linecap="round"/><ellipse cx="33" cy="${y + 7}" rx="4" ry="2.6" fill="#FFB8C6" opacity=".8"/><ellipse cx="67" cy="${y + 7}" rx="4" ry="2.6" fill="#FFB8C6" opacity=".8"/>`;
Kids.art.add({
  'lx13-pan': `<svg viewBox="0 0 100 100">${SH}<path d="M12 62Q12 28 50 28Q88 28 88 62Q88 82 70 84H30Q12 82 12 62Z" fill="#E9A84F" stroke="#C98A34" stroke-width="3"/><path d="M30 38L38 50M48 34L56 46M66 38L74 50" stroke="#F8D49A" stroke-width="5" stroke-linecap="round"/>${FACE(64)}</svg>`,
  'lx13-leche': `<svg viewBox="0 0 100 100">${SH}<path d="M28 14H72L67 84Q66 90 60 90H40Q34 90 33 84Z" fill="#EAF5FF" stroke="#B3D2EE" stroke-width="3"/><path d="M30 34H70L67 84Q66 90 60 90H40Q34 90 33 84Z" fill="#fff"/>${FACE(58)}<path d="M36 24V30" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>`,
  'lx13-mar': `<svg viewBox="0 0 100 100"><rect x="6" y="8" width="88" height="84" rx="20" fill="#E6F4FF"/><circle cx="72" cy="30" r="12" fill="#FFD23F"/><path d="M6 52Q20 42 34 52T62 52T94 52V72Q94 92 74 92H26Q6 92 6 72Z" fill="#6CC4EE"/><path d="M6 68Q20 60 34 68T62 68T94 68V74Q94 92 74 92H26Q6 92 6 74Z" fill="#3FA9E0"/><path d="M16 56q6-4 12 0M60 60q6-4 12 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
  'lx13-dulce': `<svg viewBox="0 0 100 100">${SH}<path d="M8 36L30 50L8 64Z" fill="#FFD23F"/><path d="M92 36L70 50L92 64Z" fill="#FFD23F"/><circle cx="50" cy="50" r="26" fill="#FF8CB8" stroke="#E86A9A" stroke-width="3"/><path d="M34 34Q50 26 66 34M30 50H70M34 66Q50 74 66 66" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".75"/>${FACE(46)}</svg>`,
  'lx13-reloj': `<svg viewBox="0 0 100 100">${SH}<circle cx="50" cy="48" r="38" fill="#4C8DF6"/><circle cx="50" cy="48" r="31" fill="#fff"/><g stroke="#14235B" stroke-width="3" stroke-linecap="round"><path d="M50 22v5M50 69v5M24 48h5M71 48h5"/></g><path d="M50 48V32" stroke="#14235B" stroke-width="4" stroke-linecap="round"/><path d="M50 48L61 54" stroke="#E0584A" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="48" r="3.5" fill="#14235B"/></svg>`
});

/* raíz, dibujo, derivadas (verificadas) e intrusos que se parecen sin ser de la familia */
const F = [
  { r: 'pan', a: 'lx13-pan', d: ['panadero', 'panadería', 'panera', 'panecillo', 'empanada'], x: ['panda', 'pantalón', 'pantano'] },
  { r: 'flor', a: 'flower', d: ['florero', 'florista', 'floristería', 'florecer', 'florido'], x: ['flaco', 'flauta', 'flecha'] },
  { r: 'mar', a: 'lx13-mar', d: ['marinero', 'marino', 'marea', 'submarino', 'maremoto'], x: ['mariposa', 'martes', 'martillo', 'marrón'] },
  { r: 'leche', a: 'lx13-leche', d: ['lechero', 'lechera', 'lechería', 'lechoso'], x: ['lechuga', 'lechuza'] },
  { r: 'zapato', a: 'shoe', d: ['zapatero', 'zapatería', 'zapatilla', 'zapatito'], x: ['zanahoria', 'zumo', 'zorro'] },
  { r: 'libro', a: 'book', d: ['librero', 'librería', 'libreta', 'librito'], x: ['libre', 'libélula', 'libertad'] },
  { r: 'dulce', a: 'lx13-dulce', d: ['dulzura', 'endulzar', 'dulcería', 'dulcero'], x: ['duda', 'ducha', 'duque'] },
  { r: 'fruta', a: 'apple', d: ['frutero', 'frutería', 'frutal'], x: ['fresa', 'frente', 'frío'] },
  { r: 'pez', a: 'fish', d: ['pecera', 'pescado', 'pescador', 'pescadería', 'pescar'], x: ['peine', 'pera', 'peso'] },
  { r: 'sol', a: 'sun', d: ['soleado', 'girasol', 'parasol', 'solecito'], x: ['solo', 'soldado', 'soledad'] },
  { r: 'casa', a: 'house', d: ['casita', 'casero', 'caserón', 'casona'], x: ['casco', 'cosa', 'castillo'] },
  { r: 'reloj', a: 'lx13-reloj', d: ['relojero', 'relojería', 'relojito'], x: ['regalo', 'reja', 'rueda'] }
];

Kids.css(`
.g-lectura-x13{gap:.9rem}
.g-lectura-x13 .x13-root{display:flex;align-items:center;gap:1rem;background:#fff;border-radius:1.8rem;padding:.5rem 1.6rem .5rem .8rem;box-shadow:0 .4rem 0 var(--line)}
.g-lectura-x13 .x13-root .pic{width:clamp(5rem,16vmin,8rem);height:clamp(5rem,16vmin,8rem);padding:.3rem;box-shadow:none;border:0;background:var(--gl)}
.g-lectura-x13 .x13-root .pic svg{width:100%;height:100%;max-width:none;max-height:none}
.g-lectura-x13 .x13-root b{font-family:'Baloo 2';font-size:clamp(2.2rem,8vmin,3.8rem);line-height:1}
.g-lectura-x13 .x13-opts{display:grid;gap:.9rem;justify-content:center;width:100%}
.g-lectura-x13 .x13-opts.c3{grid-template-columns:repeat(3,auto)}
.g-lectura-x13 .x13-opts.c4{grid-template-columns:repeat(2,minmax(0,15rem))}
.g-lectura-x13 .x13-opts .ans{font-size:clamp(1.4rem,4.6vmin,2.4rem);min-width:0;padding:.2rem 1rem;min-height:clamp(4.4rem,12vmin,5.6rem)}
.g-lectura-x13 .x13-opts .ans:nth-child(2){background:var(--a2)}.g-lectura-x13 .x13-opts .ans:nth-child(3){background:var(--a3)}.g-lectura-x13 .x13-opts .ans:nth-child(4){background:var(--a4)}
.g-lectura-x13 .ans.hint,.g-lectura-x13 .x13-tree.hint{animation:pulse 1s infinite;outline:.25rem solid #5CC77A}
.g-lectura-x13 .ans.sel{outline:.28rem solid var(--g);transform:translateY(-.2rem) scale(1.05)}
.g-lectura-x13 .ans.right{opacity:1}
.g-lectura-x13 .x13-trees{display:grid;grid-template-columns:1fr 1fr;gap:1rem;width:100%;max-width:44rem}
.g-lectura-x13 .x13-tree{background:#fff;border-radius:1.6rem;border:.22rem dashed #9CB5E8;padding:.5rem .5rem .7rem;display:flex;flex-direction:column;align-items:center;gap:.4rem;min-height:11rem;cursor:pointer;transition:background .15s,transform .15s;position:relative}
.g-lectura-x13 .x13-tree.hot{background:#FFF3BF;transform:scale(1.03)}
.g-lectura-x13 .x13-tree .hd{display:flex;align-items:center;gap:.5rem;font-family:'Baloo 2';font-size:clamp(1.4rem,4.4vmin,2rem);line-height:1}
.g-lectura-x13 .x13-tree .hd .pic{width:3.6rem;height:3.6rem;padding:.15rem;box-shadow:none;border:0;background:var(--gl)}
.g-lectura-x13 .x13-tree .hd svg{width:100%;height:100%;max-width:none;max-height:none}
.g-lectura-x13 .x13-tree .leaves{display:flex;flex-wrap:wrap;gap:.4rem;justify-content:center;width:100%}
.g-lectura-x13 .x13-tree .leaves .ans{background:#BDEFC8!important;font-size:clamp(1.1rem,3.4vmin,1.6rem);min-height:3rem;min-width:0;padding:.1rem .7rem;box-shadow:0 .2rem 0 #5CC77A;pointer-events:none}
.g-lectura-x13 .x13-pool{display:flex;flex-wrap:wrap;gap:.7rem;justify-content:center;max-width:46rem;min-height:4.6rem}
.g-lectura-x13 .x13-pool .ans{font-size:clamp(1.3rem,4vmin,2rem);min-width:0;min-height:4.2rem;padding:.2rem 1rem}
@media (max-width:560px){.g-lectura-x13 .x13-opts.c3{grid-template-columns:1fr}.g-lectura-x13 .x13-trees{gap:.6rem}.g-lectura-x13 .x13-tree{min-height:9rem}}
`);

const allD = (not) => F.filter(f => f !== not).flatMap(f => f.d);
let usedF = [];
Kids.game({
  id: 'lectura-x13', group: 'lectura', num: 17,
  title: 'Familias de palabras', icon: 'tree', rounds: 6,
  blurb: 'Pan, panadero, panadería… ¡Descubre qué palabras son de la misma familia!',
  how: 'Las palabras de una misma familia se parecen, como pan, panadero y panadería. Busca las que son de la familia.',
  levels: ['Elige 1 de 3', 'Toca las 2 de 4', 'Dos árboles'],
  round(g, i) {
    if (i === 0) usedF = [];
    const lv = g.level, area = g.area;
    let pool = F.filter(f => !usedF.includes(f.r)); if (pool.length < 2) { usedF = []; pool = F.slice(); }
    const fam = U.pick(pool); usedF.push(fam.r);
    const spk = w => { g.say(w); };

    if (lv === 3) return sortRound(g, fam, pool);

    const root = U.el(`<div class="x13-root"><div class="pic">${Kids.art.get(fam.a)}</div><b>${U.esc(fam.r)}</b><button class="btn blue sm" aria-label="Escuchar la palabra ${U.esc(fam.r)}">${Kids.icons.speaker}</button></div>`);
    root.querySelector('button').onclick = () => spk(fam.r);
    area.appendChild(root);

    const mode = lv === 1 ? 'one' : (i % 2 === 0 ? 'two' : 'odd');
    let words, isOk;
    if (mode === 'one') {
      const good = U.pick(fam.d);
      const bad = U.sample(allD(fam).filter(w => w[0] !== fam.r[0]), 2);
      words = U.shuffle([good].concat(bad)); isOk = w => fam.d.includes(w);
      g.ask('¿Cuál es de la familia de «' + fam.r + '»?');
    } else if (mode === 'two') {
      const good = U.sample(fam.d, 2);
      let bad = U.sample(fam.x, Math.min(2, fam.x.length)); if (bad.length < 2) bad = bad.concat(U.sample(allD(fam), 2 - bad.length));
      words = U.shuffle(good.concat(bad)); isOk = w => good.includes(w);
      g.ask('Toca las 2 palabras de la familia de «' + fam.r + '»');
    } else {
      const good = U.sample(fam.d, 3), bad = U.pick(fam.x);
      words = U.shuffle(good.concat([bad])); isOk = w => w !== bad;
      g.ask('¿Cuál NO es de la familia de «' + fam.r + '»?');
    }
    const need = mode === 'two' ? 2 : 1;
    const wrap = U.el(`<div class="x13-opts ${words.length === 3 ? 'c3' : 'c4'}"></div>`);
    let found = 0;
    words.forEach(w => {
      const b = U.el(`<button class="ans">${U.esc(w)}</button>`);
      b._ok = mode === 'odd' ? !isOk(w) : isOk(w);
      b.onclick = () => {
        if (b.disabled) return;
        g.say(w);
        if (b._ok) {
          b.classList.add('right'); b.disabled = true; found++; b.classList.remove('hint');
          if (found >= need) { wrap.querySelectorAll('button').forEach(x => { x.disabled = true; }); g.right(); }
          else g.toast('¡Una! Busca la otra');
        } else { b.classList.add('bad'); g.wrong(); g.t(() => b.classList.remove('bad'), 450); }
      };
      wrap.appendChild(b);
    });
    area.appendChild(wrap);
    g.helpHint = () => {
      const t = [...wrap.querySelectorAll('button')].find(b => b._ok && !b.disabled);
      if (t) { t.classList.add('hint'); g.toast('Mira cómo empieza: «' + U.esc(fam.r.slice(0, 3)) + '…»'); }
    };
  }
});

function sortRound(g, famA, pool) {
  const U2 = U;
  const famB = U2.pick(F.filter(f => f !== famA));
  const nA = 3, nB = U2.pick([2, 3]);
  const items = U2.sample(famA.d, nA).map(w => ({ w, f: famA })).concat(U2.sample(famB.d, Math.min(nB, famB.d.length)).map(w => ({ w, f: famB })));
  const fams = U2.shuffle([famA, famB]);
  g.ask('Pon cada palabra en el árbol de su familia');
  const trees = U2.el('<div class="x13-trees"></div>');
  const pool2 = U2.el('<div class="x13-pool" role="group" aria-label="Palabras"></div>');
  fams.forEach(f => {
    const t = U2.el(`<div class="x13-tree" role="button" tabindex="0" aria-label="Árbol de la familia de ${U2.esc(f.r)}"><div class="hd"><span class="pic">${Kids.art.get(f.a)}</span><span>${U2.esc(f.r)}</span></div><div class="leaves"></div></div>`);
    t._f = f; trees.appendChild(t);
  });
  g.area.appendChild(trees); g.area.appendChild(pool2);
  let sel = null, left = items.length;
  const treeEls = [...trees.children];
  function place(tok, tree) {
    if (tok._f === tree._f) {
      tok.dataset.locked = '1'; tok.classList.remove('sel', 'hint'); tok.classList.add('right');
      tree.querySelector('.leaves').appendChild(tok); tok.style.transform = ''; Kids.sound.pop(); sel = null; left--;
      treeEls.forEach(x => x.classList.remove('hint'));
      if (left === 0) g.right();
      return true;
    }
    g.wrong('Mira cómo empieza la palabra'); g.shake(tok); tok.classList.remove('sel'); sel = null; return false;
  }
  U2.shuffle(items).forEach(it => {
    const b = U2.el(`<button class="ans">${U2.esc(it.w)}</button>`); b._f = it.f;
    Kids.drag(b, {
      targets: () => treeEls,
      onDrop: (t, el) => place(el, t),
      onTap: el => { g.say(it.w); if (sel === el) { el.classList.remove('sel'); sel = null; return; } if (sel) sel.classList.remove('sel'); sel = el; el.classList.add('sel'); }
    });
    pool2.appendChild(b);
  });
  treeEls.forEach(t => {
    const go = () => { if (sel) place(sel, t); else g.toast('Toca una palabra y luego su árbol'); };
    t.addEventListener('click', go);
    t.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  });
  g.helpHint = () => {
    const tok = sel || [...pool2.querySelectorAll('.ans')].find(b => !b.dataset.locked); if (!tok) return;
    tok.classList.add('hint'); const tr = treeEls.find(t => t._f === tok._f); if (tr) tr.classList.add('hint');
    g.toast('«' + U2.esc(tok.textContent) + '» va con «' + U2.esc(tok._f.r) + '»');
  };
}
})();
