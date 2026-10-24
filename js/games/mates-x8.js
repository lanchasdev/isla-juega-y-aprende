/* Mates x8 — Formas geométricas en la ciudad */
(function () {
'use strict';
const U = Kids.util, A = Kids.art;

const NAMES = { circle: ['círculo', 'círculos'], triangle: ['triángulo', 'triángulos'], square: ['cuadrado', 'cuadrados'], rectangle: ['rectángulo', 'rectángulos'] };
const COL = ['#FF7E69', '#FFD23F', '#47B5BF', '#8C7BE0', '#5CC77A', '#4C8DF6', '#FF8FB1', '#F2994A'];
const G = 214;

Kids.css(`
.g-mates-x8 .x8-head{display:flex;align-items:center;justify-content:center;gap:.8rem;flex-wrap:wrap}
.g-mates-x8 .x8-cnt{font-family:'Baloo 2';font-size:1.5rem;background:#fff;border-radius:999px;padding:.15rem 1.2rem;box-shadow:var(--shadow)}
.g-mates-x8 .x8-cnt b{color:var(--gd)}
.g-mates-x8 .x8-tg{display:flex;align-items:center;gap:.5rem;background:var(--gl);border-radius:999px;padding:.1rem 1rem .1rem .4rem;font-family:'Baloo 2';font-size:1.4rem}
.g-mates-x8 .x8-tg svg{width:2.2rem;height:2.2rem}
.g-mates-x8 .x8-city{width:min(100%,64rem,calc((100vh - 21rem)*1.6));border-radius:2rem;box-shadow:0 .4rem 0 rgba(20,35,91,.12);background:#CDEBFA;touch-action:manipulation}
.g-mates-x8 .x8-city .sh{cursor:pointer;stroke:rgba(20,35,91,.28);stroke-width:1.4;transform-box:fill-box;transform-origin:center}
.g-mates-x8 .x8-city .sh:hover{filter:brightness(1.07)}
.g-mates-x8 .x8-city .sh.found{stroke:#1F9B45;stroke-width:3.6;filter:drop-shadow(0 0 3px #5CC77A);animation:pop .5s}
.g-mates-x8 .x8-city .sh.mark{stroke:#2F6FE0;stroke-width:3.6;filter:drop-shadow(0 0 3px #4C8DF6)}
.g-mates-x8 .x8-city .sh.hint{animation:pulse .8s infinite;stroke:#F2B93B;stroke-width:3.6}
.g-mates-x8 .x8-city .sh.no{animation:shake .4s}
@media (max-width:640px){.g-mates-x8 .x8-city{width:100%}}
`);

function build(lv, VW) {
  const shapes = [];
  let out = '';
  const col = () => U.pick(COL);
  const sh = (type, a, fill) => {
    const i = shapes.length; shapes.push(type); fill = fill || col();
    const c = `class="sh" data-i="${i}" data-t="${type}" fill="${fill}"`;
    if (type === 'circle') return `<circle ${c} cx="${a[0].toFixed(1)}" cy="${a[1].toFixed(1)}" r="${a[2].toFixed(1)}"/>`;
    if (type === 'triangle') return `<polygon ${c} points="${a.map(n => n.toFixed(1)).join(' ')}" stroke-linejoin="round"/>`;
    return `<rect ${c} x="${a[0].toFixed(1)}" y="${a[1].toFixed(1)}" width="${a[2].toFixed(1)}" height="${a[3].toFixed(1)}" rx="2"/>`;
  };
  const line = (x1, y1, x2, y2, w, c) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c || '#8A6A4A'}" stroke-width="${w}" stroke-linecap="round"/>`;
  const obj = {
    house(cx, w) {
      const s = Math.min(w * .82, 58), x = cx - s / 2;
      return sh('square', [x, G - s, s, s], U.pick(['#FFE8B0', '#FFD0C8', '#D4ECFA', '#E4DCFA'])) + sh('triangle', [x - 6, G - s + 1, x + s + 6, G - s + 1, cx, G - s - s * .6], U.pick(['#E5604D', '#8C7BE0', '#4C8DF6'])) +
        sh('rectangle', [x + s * .14, G - s * .56, s * .26, s * .56], '#B07A4A') + sh('square', [x + s * .55, G - s * .78, s * .28, s * .28], '#BFE6FB');
    },
    tower(cx, w) {
      const bw = Math.min(w * .74, 42), bh = bw * 2.1, x = cx - bw / 2, y = G - bh;
      let r = sh('rectangle', [x, y, bw, bh], U.pick(['#B7C9F2', '#F6C2CF', '#C5E8C9', '#FFE19A']));
      const ws = bw * (lv === 3 ? .26 : .3), rows = lv === 3 ? 3 : 2;
      for (let k = 0; k < rows; k++) { r += sh('square', [x + bw * .14, y + 8 + k * (bh / (rows + .5)), ws, ws], '#fff'); if (lv === 3) r += sh('square', [x + bw * .6, y + 8 + k * (bh / (rows + .5)), ws, ws], '#fff'); }
      return r;
    },
    car(cx, w) {
      const bw = Math.min(w * .92, 62), x = cx - bw / 2, r = bw * .12;
      return sh('rectangle', [cx - bw * .27, G - r * 2 - bw * .3 - bw * .2, bw * .54, bw * .2], U.pick(['#9CC5EE', '#FFB4A6'])) + sh('rectangle', [x, G - r * 2 - bw * .3, bw, bw * .3]) +
        sh('circle', [cx - bw * .27, G - r, r], '#4B5A8A') + sh('circle', [cx + bw * .27, G - r, r], '#4B5A8A');
    },
    bus(cx, w) {
      const bw = Math.min(w * .96, 78), bh = bw * .36, x = cx - bw / 2, r = bw * .08;
      let o = sh('rectangle', [x, G - bh - r, bw, bh], '#FFD23F');
      for (let k = 0; k < 3; k++) o += sh('square', [x + bw * (.1 + k * .28), G - bh - r + bh * .14, bh * .34, bh * .34], '#fff');
      return o + sh('circle', [x + bw * .24, G - r, r], '#4B5A8A') + sh('circle', [x + bw * .76, G - r, r], '#4B5A8A');
    },
    tree(cx, w) { const r = Math.min(w * .36, 19); return line(cx, G, cx, G - r * 1.5, 6) + sh('circle', [cx, G - r * 1.9, r], '#5CC77A'); },
    pine(cx, w) { const b = Math.min(w * .4, 21); return line(cx, G, cx, G - 14, 6) + sh('triangle', [cx - b, G - 10, cx + b, G - 10, cx, G - 10 - b * 2.3], '#3FAE6A'); },
    sign(cx) { const t = U.pick(lv === 1 ? ['circle', 'triangle'] : ['circle', 'triangle', 'square']); const y = G - 44;
      return line(cx, G, cx, y + 8, 3.2, '#8A8AA5') + (t === 'circle' ? sh('circle', [cx, y, 12], '#F26B6B') : t === 'triangle' ? sh('triangle', [cx - 13, y + 10, cx + 13, y + 10, cx, y - 14], '#FFD23F') : sh('square', [cx - 11, y - 11, 22, 22], '#4C8DF6')); },
    tent(cx, w) { const b = Math.min(w * .46, 30); return sh('triangle', [cx - b, G, cx + b, G, cx, G - b * 1.5], U.pick(['#FF8FB1', '#F2994A', '#8C7BE0'])); },
    flag(cx) { return line(cx, G, cx, G - 56, 3.2, '#8A8AA5') + sh('triangle', [cx, G - 56, cx, G - 36, cx + 26, G - 46]); },
    ball(cx) { return sh('circle', [cx, G - 11, 11]); },
    gift(cx) { return sh('square', [cx - 13, G - 26, 26, 26]); }
  };
  const pools = {
    1: ['house', 'house', 'tree', 'pine', 'tent', 'car', 'sign', 'ball'],
    2: ['house', 'house', 'tree', 'pine', 'tent', 'car', 'sign', 'tower', 'bus', 'gift', 'flag'],
    3: ['house', 'tower', 'tree', 'pine', 'tent', 'car', 'sign', 'tower', 'bus', 'gift', 'flag', 'ball']
  }[lv];
  const narrow = VW < 400, n = narrow ? (lv === 3 ? 4 : 3) : (lv === 1 ? 4 : lv === 2 ? 5 : 6), sw = VW / n;
  const names = U.shuffle(pools).slice(0, n);
  // evitar dos "bus" o "tower" iguales seguidos no es crítico; se permite
  let sky = '';
  const sx = U.rnd(30, VW - 30);
  sky += [0, 45, 90, 135, 180, 225, 270, 315].map(a => line((sx + Math.cos(a * Math.PI / 180) * 24).toFixed(1), (46 + Math.sin(a * Math.PI / 180) * 24).toFixed(1), (sx + Math.cos(a * Math.PI / 180) * 31).toFixed(1), (46 + Math.sin(a * Math.PI / 180) * 31).toFixed(1), 3.4, '#F2B93B')).join('');
  sky += sh('circle', [sx, 46, 17], '#FFD23F');
  if (lv >= 2) { const bx = (sx + VW / 2) % (VW - 40) + 20; sky += line(bx, 98, bx, 116, 1.6, '#9AA5C9') + sh('circle', [bx, 88, 10]); }
  if (lv === 3) { const bx = (sx + VW / 4) % (VW - 40) + 20; sky += line(bx, 90, bx, 108, 1.6, '#9AA5C9') + sh('circle', [bx, 80, 9]); }
  let objs = '';
  names.forEach((nm, k) => { objs += obj[nm]((k + .5) * sw, sw - 6); });
  return { shapes, markup: sky + objs };
}

function icon(t) { return A.get('shape', t, '#8C7BE0'); }

Kids.game({
  id: 'mates-x8', group: 'mates', num: 13,
  title: 'Formas geométricas',
  blurb: 'Encuentra todas las formas escondidas en la ciudad.',
  how: 'Mira la ciudad y toca todas las formas que te pida el juego: círculos, triángulos, cuadrados o rectángulos.',
  icon: 'house',
  levels: ['Círculos y triángulos', 'Y también cuadrados y rectángulos', 'Más formas y contar cuántas hay'],
  rounds: 6,
  round(g, i) {
    const lv = g.level;
    const types = lv === 1 ? ['circle', 'triangle'] : ['circle', 'triangle', 'square', 'rectangle'];
    const count = lv === 3 && i % 2 === 1;
    const maxC = lv === 1 ? 5 : lv === 2 ? 6 : 7;
    const VW = window.innerWidth < 640 ? 240 : 400;
    let city, target, total;
    for (let t = 0; t < 60; t++) {
      city = build(lv, VW);
      const ok = U.shuffle(types).find(ty => { const c = city.shapes.filter(s => s === ty).length; return c >= 2 && c <= maxC; });
      if (ok) { target = ok; total = city.shapes.filter(s => s === ok).length; break; }
    }
    if (!target) { target = 'circle'; total = city.shapes.filter(s => s === 'circle').length; }
    const nm = NAMES[target];
    const head = U.el('<div class="x8-head"></div>');
    const cnt = U.el('<div class="x8-cnt"></div>');
    const tg = U.el(`<div class="x8-tg">${icon(target)}<span>${count ? 'Cuenta los ' + nm[1] : 'Busca los ' + nm[1]}</span></div>`);
    head.appendChild(tg); head.appendChild(cnt);
    const svg = U.el(`<svg class="x8-city" viewBox="0 0 ${VW} 250" role="img" aria-label="Una ciudad con casas, coches y árboles">
      <rect width="${VW}" height="250" fill="#CDEBFA"/><g transform="scale(${VW / 400} 1)">
      <path d="M0 196 C 60 170, 120 190, 190 178 S 330 168, 400 186 V250 H0Z" fill="#B5E3A0"/>
      <path d="M0 214 C 100 206, 300 206, 400 214 V250 H0Z" fill="#8ED69A"/>
      <path d="M0 232 H400" stroke="#fff" stroke-width="5" stroke-dasharray="14 12" stroke-linecap="round" opacity=".7"/></g>
      ${city.markup}</svg>`);
    const els = [...svg.querySelectorAll('.sh')];
    const isT = el => el.dataset.t === target;
    let found = 0, marks = 0, done = false;
    const setCnt = () => { cnt.innerHTML = count ? `Has marcado <b>${marks}</b>` : `Has encontrado <b>${found}</b> de <b>${total}</b>`; };
    setCnt();
    g.area.appendChild(head); g.area.appendChild(svg);

    if (!count) {
      g.ask(`Toca todos los ${nm[1]}. ¡Hay ${total}!`);
      svg.addEventListener('click', e => {
        const el = e.target.closest('.sh'); if (!el || done || el.classList.contains('found')) return;
        if (isT(el)) {
          el.classList.remove('hint'); el.classList.add('found'); found++; Kids.sound.pop(); setCnt();
          if (found === total) { done = true; g.right(); }
        } else { g.shake(el); el.classList.add('no'); g.t(() => el.classList.remove('no'), 450); g.wrong('Ese no es un ' + nm[0] + '. ¡Sigue buscando!'); }
      });
      g.helpHint = () => {
        const left = els.filter(el => isT(el) && !el.classList.contains('found'));
        if (left.length) { g.toast('Mira cómo brilla uno…'); left[0].classList.add('hint'); }
      };
    } else {
      g.ask(`¿Cuántos ${nm[1]} hay? Toca para marcarlos.`);
      svg.addEventListener('click', e => {
        const el = e.target.closest('.sh'); if (!el || done) return;
        el.classList.toggle('mark'); marks = svg.querySelectorAll('.sh.mark').length; Kids.sound.tap(); setCnt();
      });
      const box = U.el('<div class="opts"></div>');
      const vals = new Set([total]);
      [-2, -1, 1, 2, 3].forEach(d => { if (total + d >= 1) vals.add(total + d); });
      const choose = [total].concat(U.sample([...vals].filter(v => v !== total), 3));
      const btns = U.shuffle(choose).map(v => {
        const b = U.el(`<button class="ans">${v}</button>`);
        b.onclick = () => {
          if (done) return;
          if (v === total) { done = true; btns.forEach(x => x.disabled = true); b.classList.add('right'); els.filter(isT).forEach(el => el.classList.add('found')); g.right(); }
          else { b.classList.add('bad'); b.disabled = true; g.wrong(); }
        };
        box.appendChild(b); return b;
      });
      g.area.appendChild(box);
      g.helpHint = () => {
        g.toast('Vamos a contarlos uno a uno');
        els.filter(isT).forEach((el, k) => g.t(() => { el.classList.add('hint'); Kids.sound.pop(); }, 500 * (k + 1)));
      };
    }
  }
});
})();
