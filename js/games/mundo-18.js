/* mundo-18 — Partes del cuerpo */
(function () {
'use strict';
const U = Kids.util;

/* ---------- geometría del niño (viewBox 0 0 200 300, de frente) ---------- */
const SKIN = '#F6C9A0', SKIN2 = '#EDB187', HAIR = '#6B3E1E', SHIRT = '#4C8DF6', SHORTS = '#F2B93B', SHOE = '#FF7E69';
const f1 = n => Math.round(n * 10) / 10;
/* cápsula de (x1,y1) a (x2,y2) con grosor w, como <rect> girado */
function capsule(x1, y1, x2, y2, w, attrs) {
  const dx = x2 - x1, dy = y2 - y1, len = Math.sqrt(dx * dx + dy * dy), ang = Math.atan2(-dx, dy) * 180 / Math.PI;
  return `<rect x="${f1(-w / 2)}" y="${f1(-w / 2)}" width="${w}" height="${f1(len + w)}" rx="${w / 2}" transform="translate(${x1} ${y1}) rotate(${f1(ang)})" ${attrs}/>`;
}
const mx = x => 200 - x;
function starPath(cx, cy, R, r) {
  let d = '';
  for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r : R; d += (k ? 'L' : 'M') + f1(cx + Math.cos(a) * rr) + ' ' + f1(cy + Math.sin(a) * rr); }
  return d + 'Z';
}
const HAIR_D = 'M60 60 Q56 20 100 18 Q144 20 140 60 Q128 40 112 44 Q100 36 86 44 Q70 40 60 60Z';

/* manos y dedos: del brazo derecho del dibujo (izquierda del que mira) */
function armParts(sx, sy, ex, ey) {
  const dx = ex - sx, dy = ey - sy, L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L, px = uy, py = -ux;
  const fingers = [-6, -2, 2, 6].map(o => capsule(f1(ex + ux * 5 + px * o), f1(ey + uy * 5 + py * o), f1(ex + ux * 14 + px * o * 1.15), f1(ey + uy * 14 + py * o * 1.15), 4.4, `fill="${SKIN}" stroke="${SKIN2}" stroke-width=".8"`)).join('');
  return { fingers, ux, uy };
}
const ARM = { sx: 66, sy: 123, ex: 40, ey: 197 };
const A = armParts(ARM.sx, ARM.sy, ARM.ex, ARM.ey);
const EL = { x: f1((ARM.sx + ARM.ex) / 2), y: f1((ARM.sy + ARM.ey) / 2) };            // codo
const HAND = { x: ARM.ex - 2, y: ARM.ey + 6 };                                            // mano
const FING = { x: f1(ARM.ex + A.ux * 17), y: f1(ARM.ey + A.uy * 17 + 5) };                // dedos

function kidBody() {
  const armL = capsule(ARM.sx, ARM.sy, ARM.ex, ARM.ey, 15, `fill="${SKIN}"`);
  const armR = capsule(mx(ARM.sx), ARM.sy, mx(ARM.ex), ARM.ey, 15, `fill="${SKIN}"`);
  const handL = `${A.fingers}<circle cx="${HAND.x}" cy="${HAND.y}" r="9.5" fill="${SKIN}"/>`;
  const handR = `<g transform="translate(200 0) scale(-1 1)">${handL}</g>`;
  const sleeveL = capsule(ARM.sx, ARM.sy, 56, 144, 23, `fill="${SHIRT}"`);
  const sleeveR = capsule(mx(ARM.sx), ARM.sy, mx(56), 144, 23, `fill="${SHIRT}"`);
  return `
  <ellipse cx="100" cy="288" rx="62" ry="8" fill="#14235B" opacity=".12"/>
  ${capsule(84, 208, 84, 262, 22, `fill="${SKIN}"`)}${capsule(116, 208, 116, 262, 22, `fill="${SKIN}"`)}
  <ellipse cx="84" cy="244" rx="8" ry="6.5" fill="${SKIN2}" opacity=".55"/><ellipse cx="116" cy="244" rx="8" ry="6.5" fill="${SKIN2}" opacity=".55"/>
  <rect x="73" y="259" width="22" height="12" rx="5" fill="#fff"/><rect x="105" y="259" width="22" height="12" rx="5" fill="#fff"/>
  <path d="M60 280 Q60 266 80 266 Q98 266 98 280 Q98 288 90 288 L68 288 Q60 288 60 280Z" fill="${SHOE}"/><path d="M140 280 Q140 266 120 266 Q102 266 102 280 Q102 288 110 288 L132 288 Q140 288 140 280Z" fill="${SHOE}"/>
  <rect x="60" y="283" width="38" height="5" rx="2.5" fill="#fff"/><rect x="102" y="283" width="38" height="5" rx="2.5" fill="#fff"/>
  <circle cx="72" cy="276" r="2.6" fill="#fff" opacity=".8"/><circle cx="128" cy="276" r="2.6" fill="#fff" opacity=".8"/>
  ${armL}${armR}
  <ellipse cx="${EL.x}" cy="${EL.y}" rx="5.5" ry="4.5" fill="${SKIN2}" opacity=".55"/><ellipse cx="${mx(EL.x)}" cy="${EL.y}" rx="5.5" ry="4.5" fill="${SKIN2}" opacity=".55"/>
  ${handL}${handR}
  <path d="M66 112 Q100 124 134 112 L142 128 L136 196 Q100 204 64 196 L58 128Z" fill="${SHIRT}"/>
  <path d="M64 188 Q100 198 136 188 L136 196 Q100 204 64 196Z" fill="#3A76DB"/>
  ${sleeveL}${sleeveR}
  <path d="${starPath(100, 148, 14, 6)}" fill="#FFD23F" stroke="#F2B93B" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M68 188 Q100 197 132 188 L137 228 Q120 233 104 228 L100 214 L96 228 Q80 233 63 228Z" fill="${SHORTS}"/>
  <path d="M100 196 L100 214" stroke="#E0A800" stroke-width="2" stroke-linecap="round"/>
  <rect x="91" y="96" width="18" height="24" rx="7" fill="${SKIN}"/><path d="M91 108 Q100 118 109 108 L109 116 Q100 124 91 116Z" fill="${SKIN2}" opacity=".5"/>
  <ellipse cx="61" cy="66" rx="8.5" ry="10.5" fill="${SKIN}"/><ellipse cx="139" cy="66" rx="8.5" ry="10.5" fill="${SKIN}"/>
  <ellipse cx="62" cy="67" rx="4" ry="6" fill="#F0A982"/><ellipse cx="138" cy="67" rx="4" ry="6" fill="#F0A982"/>
  <circle cx="100" cy="62" r="38" fill="${SKIN}"/>
  <path d="${HAIR_D}" fill="${HAIR}"/><path d="M80 28 Q100 20 120 28" fill="none" stroke="#8C5A32" stroke-width="3" stroke-linecap="round"/>
  <path d="M96 20 Q100 6 108 14 Q104 16 104 22Z" fill="${HAIR}"/>
  <ellipse cx="86" cy="64" rx="7" ry="8.5" fill="#fff"/><ellipse cx="114" cy="64" rx="7" ry="8.5" fill="#fff"/>
  <circle cx="87" cy="65" r="5" fill="#14235B"/><circle cx="113" cy="65" r="5" fill="#14235B"/><circle cx="88.8" cy="62.8" r="1.8" fill="#fff"/><circle cx="114.8" cy="62.8" r="1.8" fill="#fff"/>
  <path d="M77 52 Q86 47 94 51 M106 51 Q114 47 123 52" fill="none" stroke="${HAIR}" stroke-width="2.6" stroke-linecap="round"/>
  <circle cx="75" cy="79" r="6" fill="#FF9AA2" opacity=".6"/><circle cx="125" cy="79" r="6" fill="#FF9AA2" opacity=".6"/>
  <ellipse cx="100" cy="75" rx="4" ry="3.2" fill="#F0A982"/>
  <path d="M88 84 Q100 98 112 84Z" fill="#E8574A" stroke="#C9344E" stroke-width="1.5" stroke-linejoin="round"/><path d="M94 91 Q100 95 106 91 Q100 88 94 91Z" fill="#FF8FA3"/>`;
}

/* zonas táctiles: cada parte = lista de formas [html con {c} para atributos] */
const cap = (x1, y1, x2, y2, w) => capsule(x1, y1, x2, y2, w, '{c}');
const circ = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" {c}/>`;
const ell = (x, y, rx, ry) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" {c}/>`;
const PARTS = {
  pierna:  { label: 'la pierna',  shapes: [cap(84, 208, 84, 262, 24), cap(116, 208, 116, 262, 24)] },
  brazo:   { label: 'el brazo',   shapes: [cap(ARM.sx, ARM.sy, ARM.ex, ARM.ey, 19), cap(mx(ARM.sx), ARM.sy, mx(ARM.ex), ARM.ey, 19)] },
  cuello:  { label: 'el cuello',  shapes: ['<rect x="89" y="98" width="22" height="22" rx="8" {c}/>'] },
  cabeza:  { label: 'la cabeza',  shapes: [circ(100, 62, 38)] },
  hombro:  { label: 'el hombro',  shapes: [circ(68, 121, 13), circ(132, 121, 13)] },
  codo:    { label: 'el codo',    shapes: [circ(EL.x, EL.y, 10), circ(mx(EL.x), EL.y, 10)] },
  mano:    { label: 'la mano',    shapes: [circ(HAND.x, HAND.y, 11), circ(mx(HAND.x), HAND.y, 11)] },
  dedos:   { label: 'los dedos',  shapes: [ell(FING.x, FING.y, 11, 7), ell(mx(FING.x), FING.y, 11, 7)] },
  rodilla: { label: 'la rodilla', shapes: [circ(84, 244, 11), circ(116, 244, 11)] },
  pie:     { label: 'el pie',     shapes: [ell(79, 277, 20, 12), ell(121, 277, 20, 12)] },
  barriga: { label: 'la barriga', shapes: [ell(100, 173, 30, 19)] },
  pelo:    { label: 'el pelo',    shapes: [`<path d="${HAIR_D}" {c}/>`, '<path d="M96 20 Q100 6 108 14 Q104 16 104 22Z" {c}/>'] },
  orejas:  { label: 'las orejas', shapes: [ell(60, 66, 10, 12), ell(140, 66, 10, 12)], both: true },
  ojos:    { label: 'los ojos',   shapes: [ell(86, 64, 10, 11), ell(114, 64, 10, 11)], both: true },
  nariz:   { label: 'la nariz',   shapes: [ell(100, 75, 8, 7)] },
  boca:    { label: 'la boca',    shapes: [ell(100, 88, 14, 9)] }
};
const ORDER = ['pierna', 'brazo', 'cuello', 'cabeza', 'hombro', 'codo', 'mano', 'dedos', 'rodilla', 'pie', 'barriga', 'pelo', 'orejas', 'ojos', 'nariz', 'boca'];
/* recortes cuadrados para las fichas de apoyo */
const CROP = {
  cabeza: [52, 20, 96, 96], pelo: [56, 8, 88, 88], ojos: [64, 38, 72, 72], orejas: [44, 28, 112, 112], nariz: [72, 48, 56, 56], boca: [72, 62, 56, 56],
  cuello: [72, 80, 56, 56], hombro: [40, 92, 72, 72], brazo: [12, 112, 96, 96], codo: [24, 134, 56, 56], mano: [10, 176, 56, 56], dedos: [10, 194, 50, 50],
  barriga: [60, 134, 80, 80], pierna: [50, 198, 100, 100], rodilla: [56, 220, 56, 56], pie: [48, 246, 104, 52]
};

function kidSvg(interactive, crop) {
  const vb = crop ? crop.join(' ') : '0 0 200 300';
  let hs = '';
  if (interactive) {
    hs = '<g class="m18-hs">' + ORDER.map(id => PARTS[id].shapes.map((s, k) => s.replace('{c}', `class="hs" fill="transparent" data-p="${id}" data-k="${k}"`)).join('')).join('') + '</g>';
  }
  return `<svg viewBox="${vb}" role="img" aria-label="Un niño de frente">${kidBody()}${hs}</svg>`;
}

/* ---------- icono propio ---------- */
Kids.art.add({
  'mundo18-icon': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="94" rx="24" ry="4" fill="#14235B" opacity=".12"/><rect x="38" y="64" width="9" height="26" rx="4.5" fill="#F6C9A0"/><rect x="53" y="64" width="9" height="26" rx="4.5" fill="#F6C9A0"/><path d="M34 90q0 -6 8 -6t6 6z M52 90q0 -6 8 -6t6 6z" fill="#FF7E69"/><path d="M33 64h34l3 -2 -2 -24H32l-2 24Z" fill="#4C8DF6"/><path d="M33 64h34v7H33z" fill="#F2B93B"/><rect x="18" y="38" width="14" height="9" rx="4.5" fill="#F6C9A0" transform="rotate(30 25 42)"/><rect x="68" y="38" width="14" height="9" rx="4.5" fill="#F6C9A0" transform="rotate(-30 75 42)"/><circle cx="50" cy="26" r="17" fill="#F6C9A0"/><path d="M33 26Q32 8 50 8Q68 8 67 26Q58 16 50 18Q42 16 33 26Z" fill="#6B3E1E"/><circle cx="44" cy="28" r="2.4" fill="#14235B"/><circle cx="56" cy="28" r="2.4" fill="#14235B"/><path d="M44 34Q50 39 56 34" fill="none" stroke="#14235B" stroke-width="2" stroke-linecap="round"/><path d="${starPath(50, 52, 6, 2.6)}" fill="#FFD23F"/></svg>`
});

/* ---------- niveles ---------- */
const L1 = ['cabeza', 'barriga', 'mano', 'pie', 'nariz', 'boca', 'ojos', 'orejas'];
const L2NEW = ['codo', 'rodilla', 'hombro', 'brazo', 'pierna', 'cuello', 'pelo', 'dedos'];
const DESC = [
  ['¿Con qué parte oímos?', 'orejas'], ['¿Con qué parte miramos?', 'ojos'], ['¿Con qué parte olemos?', 'nariz'],
  ['¿Con qué parte hablamos y comemos?', 'boca'], ['¿Qué doblas para sentarte?', 'rodilla'], ['¿Con qué agarramos las cosas?', 'mano'],
  ['¿Dónde nos ponemos los zapatos?', 'pie'], ['¿Qué parte une la cabeza con el cuerpo?', 'cuello'], ['¿Qué doblas en medio del brazo?', 'codo'],
  ['¿Dónde nos peinamos?', 'pelo'], ['¿Dónde apoyamos una mochila?', 'hombro'], ['¿Dónde se llena la comida cuando comemos?', 'barriga'],
  ['¿Dónde nos ponemos un gorro?', 'cabeza'], ['¿Qué tenemos cinco en cada mano?', 'dedos'], ['¿Qué parte va del hombro hasta la mano?', 'brazo'],
  ['¿Qué parte tiene la rodilla en medio?', 'pierna']
];

Kids.css(`
.g-mundo-18 .m18{display:flex;gap:1rem;width:100%;max-width:60rem;flex:1 1 0;min-height:0;align-items:stretch}
.g-mundo-18 .m18-kid{flex:1;min-width:0;min-height:0;border-radius:2rem;background:linear-gradient(#CFE6FB,#EAF6FF 62%,#D5F0C8 62.1%,#BFE8AE);box-shadow:var(--shadow);padding:.5rem;display:flex;position:relative;overflow:hidden}
.g-mundo-18 .m18-kid>svg{flex:1;min-width:0;min-height:0;width:100%;height:100%;display:block}
.g-mundo-18 .hs{cursor:pointer;stroke:none}
.g-mundo-18 .hs.on{fill:rgba(255,210,63,.4);stroke:#FF9F1C;stroke-width:3.5;stroke-dasharray:none}
.g-mundo-18 .hs.hint{animation:m18blink .55s 7 alternate}
@keyframes m18blink{from{fill:rgba(255,210,63,0);stroke:rgba(255,159,28,0);stroke-width:3}to{fill:rgba(255,210,63,.55);stroke:#FF9F1C;stroke-width:4}}
.g-mundo-18 .m18-side{width:15rem;flex:none;background:#fff;border-radius:1.8rem;box-shadow:var(--shadow);padding:.8rem;display:flex;flex-direction:column;gap:.5rem;align-self:center}
.g-mundo-18 .m18-side h4{margin:0 0 .1rem;font-family:'Baloo 2';font-size:1.25rem;color:var(--ink2);line-height:1.1}
.g-mundo-18 .m18-chip{display:flex;align-items:center;gap:.6rem;background:var(--gl);border-radius:1.2rem;padding:.3rem .6rem .3rem .3rem;font-family:'Baloo 2';font-size:1.25rem;text-align:left;color:var(--ink);line-height:1.05}
.g-mundo-18 .m18-chip .mini{width:3.6rem;height:3.6rem;flex:none;background:#fff;border-radius:.9rem;overflow:hidden;display:flex}
.g-mundo-18 .m18-chip .mini svg{width:100%;height:100%}
.g-mundo-18 .m18-chip:active{transform:scale(.97)}
@media (max-width:760px){
  .g-mundo-18 .m18{flex-direction:column;gap:.6rem}
  .g-mundo-18 .m18-side{width:100%;flex-direction:row;flex-wrap:wrap;align-items:center;justify-content:center;padding:.5rem;gap:.4rem;align-self:stretch}
  .g-mundo-18 .m18-side h4{width:100%;text-align:center;font-size:1rem}
  .g-mundo-18 .m18-chip{font-size:1rem;padding:.2rem .5rem .2rem .2rem;gap:.35rem}
  .g-mundo-18 .m18-chip .mini{width:2.6rem;height:2.6rem}
}
`);

let PLAN = null;
Kids.game({
  id: 'mundo-18', group: 'mundo', num: 3,
  title: 'Partes del cuerpo',
  blurb: 'Toca la parte del cuerpo que te pedimos.',
  how: 'Escucha qué parte del cuerpo te pedimos y tócala en el dibujo del niño.',
  icon: 'mundo18-icon',
  levels: ['Partes grandes', 'Más partes', 'Adivina la parte'],
  rounds: 8,
  round(g, i) {
    // plan de preguntas de la partida (se crea en la ronda 0)
    if (i === 0 || !PLAN) {
      let plan;
      if (g.level === 1) plan = U.shuffle(L1).map(id => ({ id, q: 'Toca ' + PARTS[id].label }));
      else if (g.level === 2) plan = U.shuffle(U.sample(L2NEW, 6).concat(U.sample(L1, 2))).map(id => ({ id, q: 'Toca ' + PARTS[id].label }));
      else plan = U.sample(DESC, 8).map(d => ({ id: d[1], q: d[0] }));
      PLAN = plan;
    }
    const item = PLAN[i], target = item.id, P = PARTS[target];
    const pool = g.level === 1 ? L1 : g.level === 2 ? L1.concat(L2NEW) : Object.keys(PARTS);
    const chips = U.sample(pool.filter(x => x !== target), 3);

    const root = U.el(`<div class="m18">
      <div class="m18-kid">${kidSvg(true)}</div>
      <div class="m18-side"><h4>También puedes probar:</h4>
        ${chips.map(c => `<button class="m18-chip" data-c="${c}"><span class="mini">${kidSvg(false, CROP[c])}</span>${PARTS[c].label.replace(/^(la|el|los|las) /, '')}</button>`).join('')}
      </div></div>`);
    g.area.appendChild(root);
    const svg = root.querySelector('.m18-kid svg');
    const all = id => Array.from(svg.querySelectorAll(`.hs[data-p="${id}"]`));
    let done = false;

    svg.addEventListener('click', e => {
      const sh = e.target.closest('.hs');
      if (!sh || done) return;
      const id = sh.dataset.p;
      if (id === target) {
        done = true; Kids.sound.pop();
        (P.both ? all(id) : [sh]).forEach(x => x.classList.add('on'));
        g.say(P.label.charAt(0).toUpperCase() + P.label.slice(1));
        g.right('¡Sí! Es ' + P.label);
      } else {
        const L = PARTS[id].label;
        g.wrong('Eso es ' + L + '. ¡Sigue buscando!');
      }
    });
    g.helpHint = () => {
      if (done) return;
      all(target).forEach(x => x.classList.add('hint'));
      g.t(() => all(target).forEach(x => x.classList.remove('hint')), 4300);
      g.toast('Mira, parpadea la parte que buscas');
    };
    // fichas de apoyo: dicen su nombre y enseñan dónde está en el niño
    root.querySelectorAll('.m18-chip').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.c; Kids.sound.tap();
      g.say(PARTS[id].label.charAt(0).toUpperCase() + PARTS[id].label.slice(1));
      all(id).forEach(x => { x.classList.remove('hint'); void x.getBoundingClientRect(); x.classList.add('hint'); });
      g.t(() => all(id).forEach(x => x.classList.remove('hint')), 4300);
    }));
    g.ask(item.q);
  }
});
})();
