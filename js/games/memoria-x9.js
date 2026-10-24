/* Busca a Lolo escondido */
(function () {
'use strict';
const U = Kids.util;
Kids.art.add({
  'x9-bush': c => `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="92" rx="44" ry="6" fill="#000" opacity=".1"/><g fill="${c || '#5FB070'}"><ellipse cx="26" cy="68" rx="24" ry="24"/><ellipse cx="52" cy="56" rx="28" ry="30"/><ellipse cx="76" cy="70" rx="22" ry="22"/></g><g fill="#fff" opacity=".18"><ellipse cx="40" cy="44" rx="10" ry="6"/><ellipse cx="18" cy="60" rx="6" ry="4"/></g><g fill="#FF8FA3"><circle cx="30" cy="72" r="3"/><circle cx="62" cy="52" r="3"/><circle cx="78" cy="74" r="3"/></g></svg>`
});
function A(name, x, y, w, flip) {
  const args = Array.prototype.slice.call(arguments, 5);
  const s = Kids.art.get.apply(Kids.art, [name].concat(args)).replace('<svg', `<svg x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${w.toFixed(1)}"`);
  return flip ? `<g transform="translate(${(2 * x + w).toFixed(1)} 0) scale(-1 1)">${s}</g>` : s;
}
const cl = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" opacity=".95"><ellipse cx="0" cy="0" rx="14" ry="8"/><ellipse cx="-9" cy="2" rx="9" ry="7"/><ellipse cx="10" cy="2" rx="10" ry="7"/></g>`;

/* temas: fondo + objetos que se reparten (n, tamaño base, zona) */
const FCOL = ['#FF7EA8', '#FFC21A', '#8C7BE0', '#FF7E69', '#4C8DF6'];
const THEMES = {
  parque: { name: 'el parque', hz: .36,
    bg: (W, H, hz) => `<rect width="${W}" height="${H}" fill="#CDEBFF"/>${cl(W * .2, hz * H * .5, 1.1)}${cl(W * .62, hz * H * .35, .9)}<ellipse cx="${W * .3}" cy="${hz * H + 2}" rx="${W * .6}" ry="${H * .09}" fill="#9AD68C"/><rect y="${hz * H}" width="${W}" height="${H}" fill="#A9DE9A"/><path d="M${W * .42} ${H} Q${W * .5} ${H * .6} ${W * .72} ${hz * H + 4} L${W * .8} ${hz * H + 4} Q${W * .66} ${H * .6} ${W * .7} ${H}Z" fill="#F6E3AE"/>`,
    g: [['tree', 40], ['flower', 12], ['flower', 12], ['dog', 20], ['cat', 18], ['rabbit', 16], ['ball', 11], ['turtle', 14], ['x9-bush', 22], ['duck', 14]],
    s: [['cloud', 28], ['kite', 18], ['bird', 12], ['butterfly', 11], ['sun', 22]], big: ['x9-bush', 'tree', 'x9-bush'] },
  granja: { name: 'la granja', hz: .38,
    bg: (W, H, hz) => `<rect width="${W}" height="${H}" fill="#D6F0FF"/>${cl(W * .75, hz * H * .4, 1)}<ellipse cx="${W * .5}" cy="${hz * H + 2}" rx="${W * .7}" ry="${H * .1}" fill="#B5E3A4"/><rect y="${hz * H}" width="${W}" height="${H}" fill="#A9DE9A"/><g fill="#fff">${Array.from({ length: Math.ceil(W / 22) }, (_, i) => `<rect x="${i * 22 + 4}" y="${hz * H + 2}" width="5" height="16" rx="2.5"/>`).join('')}<rect y="${hz * H + 6}" width="${W}" height="3.4" rx="1.7"/><rect y="${hz * H + 13}" width="${W}" height="3.4" rx="1.7"/></g>`,
    g: [['cow', 28], ['pig', 22], ['horse', 30], ['sheep', 22], ['hen', 15], ['chick', 12], ['duck', 14], ['house', 44], ['tree', 38], ['rabbit', 16], ['flower', 12], ['x9-bush', 22]],
    s: [['cloud', 28], ['bird', 12], ['sun', 22], ['butterfly', 11]], big: ['x9-bush', 'house', 'cow', 'tree'] },
  selva: { name: 'la selva', hz: .3,
    bg: (W, H, hz) => `<rect width="${W}" height="${H}" fill="#BFE8A6"/><rect y="${hz * H}" width="${W}" height="${H}" fill="#8CCB74"/><g fill="#6DB45E" opacity=".65"><ellipse cx="${W * .15}" cy="${hz * H}" rx="${W * .22}" ry="${H * .16}"/><ellipse cx="${W * .6}" cy="${hz * H - 4}" rx="${W * .3}" ry="${H * .18}"/><ellipse cx="${W * .95}" cy="${hz * H}" rx="${W * .2}" ry="${H * .15}"/></g><g stroke="#5FA352" stroke-width="2.4" fill="none" stroke-linecap="round">${[.1, .3, .52, .75, .92].map(f => `<path d="M${W * f} 0 q4 ${H * .12} -2 ${H * .2}"/>`).join('')}</g>`,
    g: [['tree', 44], ['parrot', 17], ['monkey', 22], ['elephant', 34], ['giraffe', 40], ['frog', 12], ['turtle', 15], ['leaf', 12], ['flower', 12], ['x9-bush', 24], ['bear', 22]],
    s: [['butterfly', 11], ['bird', 12], ['parrot', 15], ['cloud', 24]], big: ['x9-bush', 'tree', 'elephant', 'x9-bush'] },
  mercado: { name: 'el mercado', hz: .4,
    bg: (W, H, hz) => {
      const cols = ['#FF7E69', '#FFD23F', '#4C8DF6', '#5CC77A'], n = Math.ceil(W / 40); let st = '';
      for (let i = 0; i < n; i++) st += `<path d="M${i * 40} ${hz * H * .35} h40 v${hz * H * .22} q-5 7 -10 0 q-5 7 -10 0 q-5 7 -10 0 q-5 7 -10 0Z" fill="${cols[i % 4]}"/><rect x="${i * 40 + 18}" y="${hz * H * .62}" width="4" height="${hz * H * .38}" fill="#B98558"/>`;
      return `<rect width="${W}" height="${H}" fill="#FFF1D6"/>${st}<rect y="${hz * H}" width="${W}" height="${H}" fill="#EBCB95"/><g stroke="#DDB879" stroke-width="1.4">${Array.from({ length: 9 }, (_, i) => `<path d="M0 ${hz * H + (H - hz * H) * (i + 1) / 9} H${W}"/>`).join('')}</g>`;
    },
    g: [['apple', 11], ['banana', 13], ['pear', 11], ['orange', 11], ['grapes', 13], ['watermelon', 18], ['carrot', 12], ['strawberry', 10], ['cherry', 10], ['cat', 18], ['dog', 20], ['rabbit', 15], ['mouse', 12], ['cake', 15], ['ball', 11], ['x9-bush', 20]],
    s: [['balloon', 14], ['bird', 11], ['butterfly', 10]], big: ['x9-bush', 'watermelon', 'dog'] }
};
const LV = {
  1: { s: 26, n: 9, cover: [[.1, .2]], extra: 0, decoys: 0 },
  2: { s: 16, n: 24, cover: [[.25, .4]], extra: .25, decoys: 1 },
  3: { s: 12, n: 42, cover: [[.32, .5], [.1, .2]], extra: .4, decoys: 3 }
};
let usedThemes = [];

function ov(a, b) { // fracción de a cubierta por b (cajas {x,y,w} con y = base)
  const ax0 = a.x - a.w / 2, ax1 = a.x + a.w / 2, ay0 = a.y - a.w, ay1 = a.y;
  const bx0 = b.x - b.w / 2, bx1 = b.x + b.w / 2, by0 = b.y - b.w, by1 = b.y;
  const w = Math.min(ax1, bx1) - Math.max(ax0, bx0), h = Math.min(ay1, by1) - Math.max(ay0, by0);
  return w > 0 && h > 0 ? (w * h) / (a.w * a.w) : 0;
}
function build(key, W, H, lvl) {
  const T = THEMES[key], L = LV[lvl], hz = T.hz * H, items = [];
  const s = L.s;
  const lolo = { n: 'lion', w: s, x: U.rnd(Math.ceil(s / 2 + 3), Math.floor(W - s / 2 - 3)), y: U.rnd(Math.ceil(hz + s + 6), H - 3), flip: Math.random() < .5, lolo: true };
  const mk = (n, base, zone, k) => {
    const y = zone === 'g' ? hz + 4 + Math.random() * (H - hz - 5) : 12 + Math.random() * (hz - 8);
    const t = zone === 'g' ? (y - hz) / (H - hz) : .5;
    let w = base * (.72 + .5 * t) * (.85 + Math.random() * .3);
    if (lvl === 1 && w < 12) w = 12; // todo grande en nivel fácil
    if (lvl === 1 && n !== 'tree' && n !== 'house' && n !== 'x9-bush') w = Math.min(w * 1.1, 26);
    return { n, w, x: U.rnd(Math.ceil(w / 2), Math.floor(W - w / 2)), y: y + (zone === 'g' ? 0 : w), flip: Math.random() < .5, args: n === 'flower' ? [U.pick(FCOL)] : n === 'balloon' ? [U.pick(['#FF7E69', '#4C8DF6', '#FFC21A'])] : [] };
  };
  // cubiertas deliberadas
  const side = Math.random() < .5 ? 1 : -1;
  L.cover.forEach((r, ci) => {
    const nm = U.pick(T.big), base = (nm === 'house' || nm === 'tree') ? 40 : 28;
    let cs = Math.max(s * U.rnd(13, 19) / 10, Math.min(base, s * 2.2));
    const f = r[0] + Math.random() * (r[1] - r[0]), sd = ci === 0 ? side : -side;
    const it = { n: nm, w: cs, x: lolo.x + sd * (s / 2 + cs / 2 - f * s), y: Math.min(H - 1, lolo.y + U.rnd(1, 3)), flip: false, args: [] };
    if (it.x - cs / 2 < 0 || it.x + cs / 2 > W) it.x = lolo.x - sd * (s / 2 + cs / 2 - f * s);
    items.push(it);
  });
  // resto de objetos
  let guard = 0;
  while (items.length < L.n && guard++ < 600) {
    const useS = Math.random() < .22;
    const [n, base] = U.pick(useS ? T.s : T.g);
    const it = mk(n, base, useS ? 's' : 'g');
    if (it.y > lolo.y - 2 && ov(lolo, it) > L.extra) continue;
    items.push(it);
  }
  // parecidos (zorros, osos…) para despistar
  for (let d = 0; d < L.decoys; d++) { const w = s * U.rnd(9, 13) / 10, y = U.rnd(Math.ceil(hz + w + 4), H - 2); const it = { n: U.pick(['fox', 'dog', 'bear', 'cat']), w, x: U.rnd(Math.ceil(w / 2), Math.floor(W - w / 2)), y, flip: Math.random() < .5, args: [] }; if (it.y > lolo.y - 2 && ov(lolo, it) > L.extra) continue; items.push(it); }
  items.push(lolo);
  items.sort((a, b) => a.y - b.y);
  let svg = T.bg(W, H, T.hz), loloSvg = '';
  items.forEach(it => {
    const body = A(it.n, it.x - it.w / 2, it.y - it.w, it.w, it.flip, ...(it.args || []));
    if (it.lolo) svg += `<g class="x9-lolo">${body}</g>`; else svg += body;
  });
  return { svg, lolo };
}

Kids.css(`
.g-memoria-x9{gap:.7rem}
.g-memoria-x9 .lb{position:relative;width:min(100%,calc(var(--bh,60vh) * var(--ar)));aspect-ratio:var(--ar);border-radius:1.6rem;overflow:hidden;box-shadow:0 .4rem 0 rgba(20,35,91,.14);border:.25rem solid #fff;touch-action:manipulation;cursor:pointer;flex:none}
.g-memoria-x9 .lb svg.sc{position:absolute;inset:0;width:100%;height:100%;display:block}
.g-memoria-x9 .lb .lh{position:absolute;transform:translate(-50%,-50%);border-radius:50%;background:transparent;z-index:4;padding:0;border:0}
.g-memoria-x9 .lb .lh:focus-visible{outline:.25rem solid var(--blue)}
.g-memoria-x9 .x9-lolo{transform-box:fill-box;transform-origin:50% 100%}
.g-memoria-x9 .x9-found{animation:x9hop .7s 2}
@keyframes x9hop{0%,100%{transform:translateY(0) scale(1.5)}50%{transform:translateY(-6px) scale(1.8)}}
.g-memoria-x9 .x9-puff{animation:x9puff .8s forwards;transform-box:fill-box;transform-origin:center}
@keyframes x9puff{from{opacity:.95;transform:scale(.4)}to{opacity:0;transform:scale(1.6) translateY(-4px)}}
.g-memoria-x9 .x9-ring{fill:none;stroke:#FFD23F;stroke-width:2.4;animation:x9ring 1s forwards;transform-box:fill-box;transform-origin:center}
@keyframes x9ring{from{opacity:1;transform:scale(.4)}to{opacity:0;transform:scale(2.6)}}
.g-memoria-x9 .lbar{display:flex;gap:.8rem;align-items:center;justify-content:center;flex-wrap:wrap}
.g-memoria-x9 .lpill{background:#fff;border-radius:999px;padding:.2rem 1rem;font-family:'Baloo 2',sans-serif;font-size:1.2rem;box-shadow:0 .25rem 0 var(--line);display:flex;align-items:center;gap:.4rem}
.g-memoria-x9 .lpill b{color:var(--gd);font-size:1.4rem}
.g-memoria-x9 .lpill svg{width:1.8rem;height:1.8rem}
`);

Kids.game({
  id: 'memoria-x9', group: 'memoria', num: 13,
  title: 'Busca a Lolo',
  blurb: '¡Lolo el león se esconde en la escena! Mira bien y tócalo.',
  how: 'Lolo el león se ha escondido entre muchas cosas. Búscalo y tócalo. Si necesitas ayuda, pulsa el botón de pista y un círculo te enseñará por dónde mirar.',
  icon: 'lion',
  levels: ['Lolo grande', 'Más cosas y Lolo mediano', 'Escena llena y Lolo pequeño'],
  rounds: 3,
  stars(m) { return m <= 3 ? 3 : m <= 7 ? 2 : 1; },
  round(g, ri) {
    if (ri === 0) usedThemes = [];
    const keys = Object.keys(THEMES).filter(k => !usedThemes.includes(k));
    const key = U.pick(keys.length ? keys : Object.keys(THEMES)); usedThemes.push(key);
    const narrow = window.innerWidth < 640 || window.innerHeight > window.innerWidth * 1.1;
    const W = narrow ? 130 : 200, H = narrow ? 150 : 130;
    const B = build(key, W, H, g.level), lo = B.lolo;
    g.ask('¿Dónde está Lolo? Estamos en ' + THEMES[key].name);
    const lb = U.el(`<div class="lb" style="--ar:${W / H};--bh:${narrow ? 56 : 58}vh"><svg class="sc" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${B.svg}<g class="x9-fx"></g><g class="x9-hint"></g></svg></div>`);
    const svg = lb.querySelector('svg'), fx = lb.querySelector('.x9-fx'), hintG = lb.querySelector('.x9-hint');
    const hr = Math.max(lo.w * .62, narrow ? 9 : 7.5);
    const cx = lo.x, cy = lo.y - lo.w / 2;
    const btn = U.el(`<button class="lh" aria-label="Lolo el león" style="left:${cx / W * 100}%;top:${cy / H * 100}%;width:${2 * hr / W * 100}%;aspect-ratio:1"></button>`);
    lb.appendChild(btn);
    let tries = 0, hints = 0, found = false;
    const pills = U.el(`<div class="lbar"><div class="lpill">Intentos <b id="tr">0</b></div><button class="btn sm blue" id="hint" aria-label="Pista: un círculo me enseña dónde mirar">Pista</button><div class="lpill">Pistas <b id="hn">0</b></div></div>`);
    g.area.append(lb, pills);
    const trEl = pills.querySelector('#tr'), hnEl = pills.querySelector('#hn');
    function ns(tag, at) { const e = document.createElementNS('http://www.w3.org/2000/svg', tag); for (const k in at) e.setAttribute(k, at[k]); return e; }
    function win() {
      if (found) return; found = true; tries++; trEl.textContent = tries;
      const lg = svg.querySelector('.x9-lolo'); svg.insertBefore(lg, fx); lg.classList.add('x9-found');
      hintG.innerHTML = '';
      fx.appendChild(ns('circle', { class: 'x9-ring', cx, cy, r: lo.w }));
      g.right('¡Has encontrado a Lolo!');
    }
    btn.onclick = e => { e.stopPropagation(); win(); };
    lb.onclick = e => {
      if (found) return;
      const r = svg.getBoundingClientRect(), sc = Math.max(r.width / W, r.height / H);
      const ox = (r.width - W * sc) / 2, oy = (r.height - H * sc) / 2;
      const x = (e.clientX - r.left - ox) / sc, y = (e.clientY - r.top - oy) / sc;
      if (Math.hypot(x - cx, y - cy) <= hr) { win(); return; }
      tries++; trEl.textContent = tries;
      const p = ns('g', { class: 'x9-puff' });
      p.appendChild(ns('circle', { cx: x, cy: y, r: 6, fill: '#fff', opacity: .85 }));
      const t = ns('text', { x, y: y + 4, 'text-anchor': 'middle', 'font-size': 11, 'font-weight': 800, fill: '#8C7BE0', 'font-family': 'Baloo 2,sans-serif' }); t.textContent = '?'; p.appendChild(t);
      fx.appendChild(p); setTimeout(() => p.remove(), 900);
      g.wrong('Ahí no está. ¡Sigue buscando!');
    };
    function showHint() {
      if (found) return;
      hints++; hnEl.textContent = hints;
      const R = [H * .42, H * .27, H * .17][Math.min(2, hints - 1)] * (g.level === 3 ? .85 : 1), r = Math.max(R, lo.w * 1.2);
      if (!showHint.off) { const a = Math.random() * 6.28, d = Math.random() * r * .35; showHint.off = [Math.cos(a) * d, Math.sin(a) * d]; }
      const mx = Math.min(W - r * .4, Math.max(r * .4, cx + showHint.off[0] * (r / (H * .42)))), my = Math.min(H - r * .4, Math.max(r * .4, cy + showHint.off[1] * (r / (H * .42))));
      hintG.innerHTML = '';
      hintG.appendChild(ns('path', { d: `M0 0H${W}V${H}H0Z M${mx - r} ${my}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`, 'fill-rule': 'evenodd', fill: 'rgba(20,35,91,.42)', style: 'pointer-events:none' }));
      hintG.appendChild(ns('circle', { cx: mx, cy: my, r, fill: 'none', stroke: '#FFD23F', 'stroke-width': 2.2, 'stroke-dasharray': '5 4', style: 'pointer-events:none' }));
      Kids.sound.pop();
    }
    pills.querySelector('#hint').onclick = showHint;
    g.helpHint = () => { g.toast('Pulsa «Pista» y un círculo te ayudará'); showHint(); };
  }
});
})();
