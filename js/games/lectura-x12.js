/* Lectura x12 — Lee y colorea */
(function () {
'use strict';
const U = Kids.util;

const COLORS = [
  { id: 'rojo', h: '#F0453D' }, { id: 'azul', h: '#3D8BEF' }, { id: 'amarillo', h: '#FFD23F' }, { id: 'verde', h: '#4FC36E' },
  { id: 'naranja', h: '#FF9A3C' }, { id: 'rosa', h: '#FF8CB8' }, { id: 'morado', h: '#9B6BE0' }, { id: 'marrón', h: '#A8693B' }, { id: 'gris', h: '#A7B0BE' }
];
const BASIC = COLORS.slice(0, 6), EASY = COLORS.slice(0, 4), ADV = COLORS.slice(4);

/* ---- piezas de dibujo ---- */
const P = (id, art, inner) => `<g class="part" data-p="${id}" role="button" tabindex="0" aria-label="${art} ${id}">${inner}</g>`;
const T = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
const rays = (n, r1, r2) => Array.from({ length: n }, (_, k) => { const a = k * 6.2832 / n; return `M${(Math.cos(a) * r1).toFixed(1)} ${(Math.sin(a) * r1).toFixed(1)}L${(Math.cos(a) * r2).toFixed(1)} ${(Math.sin(a) * r2).toFixed(1)}`; }).join('');
const sol = (x, y, s) => P('sol', 'el', T(x, y, s, `<path d="${rays(10, 21, 30)}" stroke="#F2B93B" stroke-width="5" stroke-linecap="round" fill="none"/><circle r="17" class="f"/><circle cx="-6" cy="-3" r="2" fill="#14235B"/><circle cx="6" cy="-3" r="2" fill="#14235B"/><path d="M-6 5Q0 10 6 5" stroke="#14235B" stroke-width="2" fill="none" stroke-linecap="round"/>`));
const nube = (x, y, s) => P('nube', 'la', T(x, y, s, `<path class="f" d="M-26 10Q-42 10-38 -4Q-36-16-22-14Q-18-30-2-25Q14-27 18-12Q34-12 32 2Q31 10 18 10Z"/><circle cx="-12" cy="-1" r="2" fill="#14235B"/><circle cx="6" cy="-1" r="2" fill="#14235B"/><path d="M-8 4Q-3 8 2 4" stroke="#14235B" stroke-width="2" fill="none" stroke-linecap="round"/>`));
const star = (cx, cy, r, r2) => { let d = ''; for (let k = 0; k < 10; k++) { const a = -1.5708 + k * 0.62832, rr = k % 2 ? r2 : r; d += (k ? 'L' : 'M') + (cx + Math.cos(a) * rr).toFixed(1) + ' ' + (cy + Math.sin(a) * rr).toFixed(1); } return d + 'Z'; };
const flor = (x, y, s) => P('flor', 'la', T(x, y, s, `<path d="M0 0V34" stroke="#4FA95E" stroke-width="5" stroke-linecap="round"/><path d="M0 22Q-14 14-16 24Q-6 30 0 22Z" fill="#6CCB7A"/>` +
  [0, 1, 2, 3, 4].map(k => { const a = -1.5708 + k * 1.2566; return `<circle class="f" cx="${(Math.cos(a) * 11).toFixed(1)}" cy="${(Math.sin(a) * 11).toFixed(1)}" r="9"/>`; }).join('') +
  [0, 1, 2, 3, 4].map(k => { const a = -1.5708 + k * 1.2566; return `<circle class="f ns" cx="${(Math.cos(a) * 11).toFixed(1)}" cy="${(Math.sin(a) * 11).toFixed(1)}" r="9"/>`; }).join('') +
  `<circle r="6" fill="#FFC857"/>`));
const arbol = (x, y, s) => P('tronco', 'el', T(x, y, s, `<rect class="f" x="-7" y="-2" width="14" height="46" rx="4"/>`)) + P('árbol', 'el', T(x, y, s, `<circle class="f" cx="0" cy="-22" r="28"/><circle cx="-8" cy="-24" r="2.4" fill="#14235B"/><circle cx="8" cy="-24" r="2.4" fill="#14235B"/><path d="M-6 -15Q0 -10 6 -15" stroke="#14235B" stroke-width="2.2" fill="none" stroke-linecap="round"/>`));
const WRAP = (bg, inner) => `<svg viewBox="0 0 240 180" role="group" aria-label="Dibujo para colorear">${bg}${inner}</svg>`;
const SKY = '<rect width="240" height="180" rx="22" fill="#E6F4FF"/>';
const GRASS = '<path d="M0 138Q60 126 120 136T240 130V158Q240 180 218 180H22Q0 180 0 158Z" fill="#BDE8A6"/>';

const SCENES = [
  {
    id: 'casa',
    parts: [['sol', 'el'], ['nube', 'la'], ['casa', 'la'], ['tejado', 'el'], ['puerta', 'la'], ['árbol', 'el'], ['tronco', 'el'], ['flor', 'la']],
    svg: WRAP(SKY + GRASS,
      sol(40, 38, .9) + nube(150, 34, .95) +
      P('casa', 'la', '<rect class="f" x="62" y="86" width="96" height="58" rx="5"/><rect x="128" y="98" width="20" height="20" rx="4" fill="#CFE9FF" stroke="#8EA0CF" stroke-width="2.5"/>') +
      P('puerta', 'la', '<rect class="f" x="84" y="108" width="24" height="36" rx="5"/><circle cx="102" cy="127" r="2.4" fill="#14235B"/>') +
      P('tejado', 'el', '<path class="f" d="M52 90L110 44L168 90Z" stroke-linejoin="round"/>') +
      arbol(200, 104, 1) + flor(26, 112, 1))
  },
  {
    id: 'mar',
    parts: [['sol', 'el'], ['nube', 'la'], ['barco', 'el'], ['vela', 'la'], ['pez', 'el'], ['estrella', 'la'], ['cangrejo', 'el']],
    svg: WRAP('<rect width="240" height="180" rx="22" fill="#E6F4FF"/><path d="M0 78Q20 70 40 78T80 78T120 78T160 78T200 78T240 78V158Q240 180 218 180H22Q0 180 0 158Z" fill="#8ED2F0"/><path d="M0 150Q60 138 120 148T240 144V158Q240 180 218 180H22Q0 180 0 158Z" fill="#F6E3AE"/><g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6" fill="none"><path d="M20 100q8-6 16 0t16 0"/><path d="M170 116q8-6 16 0t16 0"/></g>',
      sol(36, 36, .8) + nube(190, 30, .85) +
      '<path d="M122 90V30" stroke="#8A5A32" stroke-width="4" stroke-linecap="round"/>' +
      P('barco', 'el', '<path class="f" d="M84 88L164 88L152 112Q124 118 96 112Z" stroke-linejoin="round"/>') +
      P('vela', 'la', '<path class="f" d="M128 82V32L162 78Z" stroke-linejoin="round"/>') +
      P('pez', 'el', '<path class="f" d="M70 132L92 120V144Z" stroke-linejoin="round"/><ellipse class="f" cx="50" cy="132" rx="24" ry="14"/><circle cx="38" cy="129" r="3" fill="#14235B"/><path d="M34 137Q40 141 45 137" stroke="#14235B" stroke-width="2" fill="none" stroke-linecap="round"/>') +
      P('estrella', 'la', `<path class="f" d="${star(196, 152, 20, 9)}" stroke-linejoin="round"/>`) +
      P('cangrejo', 'el', '<circle class="f" cx="96" cy="152" r="7"/><circle class="f" cx="146" cy="152" r="7"/><ellipse class="f" cx="121" cy="160" rx="20" ry="12"/><circle cx="114" cy="157" r="2.4" fill="#14235B"/><circle cx="128" cy="157" r="2.4" fill="#14235B"/>'))
  },
  {
    id: 'fiesta',
    parts: [['globo', 'el'], ['regalo', 'el'], ['tarta', 'la'], ['sombrero', 'el'], ['estrella', 'la'], ['corazón', 'el']],
    svg: WRAP('<rect width="240" height="180" rx="22" fill="#FFF1D6"/><path d="M0 140H240V158Q240 180 218 180H22Q0 180 0 158Z" fill="#F6D7A8"/>',
      P('globo', 'el', '<path d="M60 92Q66 112 56 128" stroke="#8EA0CF" stroke-width="2.5" fill="none"/><ellipse class="f" cx="60" cy="58" rx="26" ry="33"/><path class="f" d="M60 91L54 99H66Z"/><ellipse cx="50" cy="44" rx="5" ry="9" fill="#fff" opacity=".6" transform="rotate(20 50 44)"/>') +
      P('estrella', 'la', `<path class="f" d="${star(120, 44, 22, 10)}" stroke-linejoin="round"/>`) +
      P('sombrero', 'el', '<path class="f" d="M170 76L192 24L214 76Z" stroke-linejoin="round"/><circle cx="192" cy="22" r="6" fill="#FFD23F"/><path d="M178 60Q192 66 206 60" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>') +
      P('regalo', 'el', '<rect class="f" x="92" y="116" width="62" height="40" rx="5"/><rect class="f" x="88" y="104" width="70" height="16" rx="5"/><rect x="116" y="104" width="14" height="52" fill="#fff" opacity=".85"/><path d="M123 104Q108 88 112 100M123 104Q138 88 134 100" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".85"/>') +
      P('tarta', 'la', '<rect class="f" x="164" y="134" width="62" height="24" rx="7"/><rect class="f" x="172" y="114" width="46" height="24" rx="7"/><rect x="192" y="100" width="6" height="14" rx="2" fill="#4C8DF6"/><path d="M195 90Q190 97 195 99Q200 97 195 90Z" fill="#FF9A3C"/>') +
      P('corazón', 'el', '<path class="f" d="M40 160C12 142 14 118 30 118C35 118 38 121 40 125C42 121 45 118 50 118C66 118 68 142 40 160Z" stroke-linejoin="round"/>'))
  },
  {
    id: 'parque',
    parts: [['sol', 'el'], ['cometa', 'la'], ['mariposa', 'la'], ['pelota', 'la'], ['flor', 'la'], ['árbol', 'el'], ['tronco', 'el']],
    svg: WRAP(SKY + GRASS,
      sol(34, 36, .8) +
      '<path d="M140 78Q128 96 140 108Q150 120 138 130" stroke="#8EA0CF" stroke-width="2.5" fill="none"/>' +
      P('cometa', 'la', '<path class="f" d="M140 18L168 46L140 74L112 46Z" stroke-linejoin="round"/><path d="M140 18V74M112 46H168" stroke="#fff" stroke-width="2.5" opacity=".7"/>') +
      P('mariposa', 'la', '<ellipse class="f" cx="76" cy="84" rx="14" ry="11" transform="rotate(-25 76 84)"/><ellipse class="f" cx="98" cy="84" rx="14" ry="11" transform="rotate(25 98 84)"/><ellipse class="f" cx="78" cy="98" rx="10" ry="8" transform="rotate(25 78 98)"/><ellipse class="f" cx="96" cy="98" rx="10" ry="8" transform="rotate(-25 96 98)"/><rect x="85" y="76" width="4" height="28" rx="2" fill="#14235B"/>') +
      P('pelota', 'la', '<circle class="f" cx="70" cy="150" r="17"/><path d="M54 146Q70 156 86 146" stroke="#fff" stroke-width="3" fill="none" opacity=".75"/><path d="M70 133V167" stroke="#fff" stroke-width="3" opacity=".75"/>') +
      flor(120, 124, 1.1) + arbol(200, 104, 1))
  },
  {
    id: 'viaje',
    parts: [['sol', 'el'], ['nube', 'la'], ['avión', 'el'], ['coche', 'el'], ['árbol', 'el'], ['tronco', 'el']],
    svg: WRAP(SKY + '<rect x="0" y="142" width="240" height="38" fill="#C9CFDB"/><path d="M0 142H240" stroke="#B3BBCB" stroke-width="3"/><path d="M14 162h22M64 162h22M114 162h22M164 162h22" stroke="#fff" stroke-width="4" stroke-linecap="round"/>',
      sol(34, 36, .8) + nube(190, 34, .8) +
      P('avión', 'el', '<path class="f" d="M60 54L40 34L52 34L74 50Z" stroke-linejoin="round"/><ellipse class="f" cx="100" cy="56" rx="40" ry="12"/><path class="f" d="M92 56L84 80L104 78L116 56Z" stroke-linejoin="round"/><circle cx="116" cy="54" r="2.6" fill="#14235B"/><circle cx="126" cy="54" r="2.6" fill="#14235B"/>') +
      P('coche', 'el', '<path class="f" d="M24 140V122Q24 112 34 110H52L62 92Q64 88 70 88H104Q110 88 112 92L122 110H134Q144 112 144 122V140Z" stroke-linejoin="round"/><path d="M66 94H82V108H58ZM88 94H104L112 108H88Z" fill="#CFE9FF"/><circle cx="48" cy="142" r="11" fill="#4B5A8A"/><circle cx="48" cy="142" r="4" fill="#C9CFDB"/><circle cx="116" cy="142" r="11" fill="#4B5A8A"/><circle cx="116" cy="142" r="4" fill="#C9CFDB"/>') +
      arbol(202, 108, .9))
  }
].map(s => ({ id: s.id, svg: s.svg, parts: s.parts.map(([n, a]) => ({ id: n, art: a })) }));

Kids.css(`
.g-lectura-x12{gap:.7rem}
.g-lectura-x12 .x12-order{background:#fff;border-radius:1.6rem;padding:.55rem 1.1rem;box-shadow:0 .35rem 0 var(--line);display:flex;align-items:center;gap:.7rem;max-width:min(46rem,96%)}
.g-lectura-x12 .x12-line{font-family:'Baloo 2';font-weight:800;font-size:clamp(1.25rem,4.2vmin,2rem);line-height:1.25;text-align:center}
.g-lectura-x12 .x12-line .cl{display:inline;padding:0;border-radius:.6rem;transition:background .3s}
.g-lectura-x12 .x12-line .cl.done{background:#BDEFC8;box-shadow:0 0 0 .2rem #BDEFC8}
.g-lectura-x12 .x12-line .cl.done::after{content:' ✓';color:#2E9E4F}
.g-lectura-x12 .x12-scene{width:100%;max-width:min(32rem,92vw);flex:0 1 auto;min-height:0;display:flex;justify-content:center}
.g-lectura-x12 .x12-scene svg{width:100%;height:auto;max-height:41vh;filter:drop-shadow(0 .35rem 0 rgba(20,35,91,.12))}
.g-lectura-x12 .part{cursor:pointer;outline:none}
.g-lectura-x12 .part .f{fill:var(--c,#fff);stroke:#6F80B8;stroke-width:2.5;stroke-linejoin:round;transition:fill .4s}
.g-lectura-x12 .part .f.ns{stroke:none}
.g-lectura-x12 .part:hover .f:not(.ns){stroke:#14235B}
.g-lectura-x12 .part:focus-visible .f:not(.ns){stroke:#4C8DF6;stroke-width:4}
.g-lectura-x12 .part.paint{transform-box:fill-box;transform-origin:center;animation:x12pop .5s}
.g-lectura-x12 .part.hint{animation:x12blink .9s infinite}
@keyframes x12pop{40%{transform:scale(1.1)}100%{transform:scale(1)}}
@keyframes x12blink{50%{opacity:.45}}
.g-lectura-x12 .x12-pal{display:flex;flex-wrap:wrap;gap:.6rem;justify-content:center;max-width:min(48rem,98%)}
.g-lectura-x12 .x12-sw{display:flex;flex-direction:column;align-items:center;gap:.1rem;width:4.5rem;padding:.3rem 0 .25rem;border-radius:1.2rem;background:#fff;box-shadow:0 .3rem 0 var(--line);font-family:'Baloo 2';font-size:.95rem;line-height:1.1;border:.2rem solid transparent;transition:transform .12s}
.g-lectura-x12 .x12-sw i{display:block;width:2.6rem;height:2.6rem;border-radius:50%;border:.2rem solid rgba(20,35,91,.2)}
.g-lectura-x12 .x12-sw.on{border-color:var(--ink);transform:translateY(-.25rem) scale(1.06);background:var(--gl)}
.g-lectura-x12 .x12-sw.hint{animation:pulse 1s infinite;outline:.25rem solid #5CC77A}
@media (max-width:560px){.g-lectura-x12 .x12-pal{gap:.4rem}.g-lectura-x12 .x12-sw{width:3.9rem;font-size:.85rem}.g-lectura-x12 .x12-sw i{width:2.3rem;height:2.3rem}.g-lectura-x12 .x12-scene svg{max-height:34vh}}
`);

let lastScene = '';
Kids.game({
  id: 'lectura-x12', group: 'lectura', num: 16,
  title: 'Lee y colorea', icon: 'balloon', rounds: 6,
  blurb: 'Lee la orden, elige el color y pinta el dibujo.',
  how: 'Lee la orden, por ejemplo pinta el globo de rojo. Elige el color y toca la parte del dibujo para pintarla.',
  levels: ['1 orden', '2 órdenes', '3 órdenes'],
  round(g, i) {
    const lv = g.level;
    let sc = U.pick(SCENES.filter(s => s.id !== lastScene)); lastScene = sc.id;
    const parts = U.sample(sc.parts, lv);
    let cols;
    if (lv === 1) cols = U.sample(EASY, 1);
    else if (lv === 2) cols = U.sample(BASIC, 2);
    else cols = U.sample(ADV, 2).concat(U.sample(COLORS.filter(c => !ADV.includes(c)), 1));
    cols = U.shuffle(cols);
    const orders = parts.map((p, k) => ({ p, c: cols[k], done: false, txt: `${p.art} ${p.id} de ${cols[k].id}` }));
    let pal;
    if (lv < 3) pal = BASIC.slice();
    else { pal = cols.slice(); U.shuffle(COLORS.filter(c => !cols.includes(c))).forEach(c => { if (pal.length < 8) pal.push(c); }); pal = COLORS.filter(c => pal.includes(c)); }

    const sentence = 'Pinta ' + orders.map(o => o.txt).reduce((a, t, k, arr) => a + (k === 0 ? '' : k === arr.length - 1 ? ' y ' : ', ') + t, '') + '.';
    const lineHtml = 'Pinta ' + orders.map((o, k) => `<span class="cl" data-k="${k}">${U.esc(o.txt)}</span>`).reduce((a, t, k, arr) => a + (k === 0 ? '' : k === arr.length - 1 ? ' y ' : ', ') + t, '') + '.';

    const bar = U.el(`<div class="x12-order"><div class="x12-line">${lineHtml}</div><button class="btn blue sm" aria-label="Escuchar la orden">${Kids.icons.speaker}</button></div>`);
    bar.querySelector('button').onclick = () => g.say(sentence);
    const scene = U.el(`<div class="x12-scene">${sc.svg}</div>`);
    const palEl = U.el('<div class="x12-pal" role="group" aria-label="Colores"></div>');
    g.area.appendChild(bar); g.area.appendChild(scene); g.area.appendChild(palEl);

    let cur = null;
    pal.forEach(c => {
      const b = U.el(`<button class="x12-sw" data-c="${c.id}" aria-label="${c.id}"><i style="background:${c.h}"></i>${c.id}</button>`);
      b.onclick = () => { cur = c; palEl.querySelectorAll('.x12-sw').forEach(x => x.classList.toggle('on', x === b)); Kids.sound.pop(); };
      palEl.appendChild(b);
    });

    const partEls = {};
    scene.querySelectorAll('.part').forEach(el => { partEls[el.dataset.p] = el; });
    function press(el) {
      const pid = el.dataset.p;
      const o = orders.find(x => x.p.id === pid);
      if (!cur) { g.toast('Primero elige un color'); palEl.classList.remove('shake'); void palEl.offsetWidth; palEl.classList.add('shake'); return; }
      if (!o) { g.toast('Esa parte no está en la orden. Lee otra vez'); g.shake(el); return; }
      if (o.done) return;
      el.classList.remove('hint');
      el.style.setProperty('--c', cur.h);
      el.classList.remove('paint'); void el.getBoundingClientRect(); el.classList.add('paint');
      Kids.sound.pop();
      if (cur.id === o.c.id) {
        o.done = true;
        const cl = bar.querySelector(`.cl[data-k="${orders.indexOf(o)}"]`); if (cl) cl.classList.add('done');
        if (orders.every(x => x.done)) g.right(); else g.toast('¡Bien! Sigue con la otra orden');
      } else {
        g.wrong('Lee otra vez: ' + o.txt);
        g.t(() => { if (!o.done) { el.style.removeProperty('--c'); el.classList.remove('paint'); } }, 800);
      }
    }
    Object.values(partEls).forEach(el => {
      el.addEventListener('click', () => press(el));
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); press(el); } });
    });
    g.helpHint = () => {
      const o = orders.find(x => !x.done); if (!o) return;
      const sw = palEl.querySelector(`[data-c="${o.c.id}"]`); if (sw) sw.classList.add('hint');
      const pe = partEls[o.p.id]; if (pe) pe.classList.add('hint');
      g.toast('Busca ' + o.p.art + ' ' + o.p.id + ' y el color ' + o.c.id);
    };
    g.ask(sentence);
  }
});
})();
