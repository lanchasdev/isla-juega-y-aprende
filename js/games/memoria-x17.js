/* memoria-x17 — ¿Qué está mal? Toca lo que no tiene sentido en el dibujo */
(function () {
'use strict';
const K = window.Kids, U = K.util;

/* dibujo del catálogo colocado en la escena (viewBox 200x130) */
function A(name, x, y, w, o) {
  o = o || {};
  let s = K.art.get(name, ...(o.args || []));
  s = s.replace('<svg', `<svg x="${x}" y="${y}" width="${w}" height="${w}" style="overflow:visible;${o.style || ''}"`);
  if (o.rot) s = `<g transform="rotate(${o.rot} ${x + w / 2} ${y + w / 2})">${s}</g>`;
  return s;
}
const R = (x, y, w, h, f, r) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r || 0}" fill="${f}"/>`;
const C = (x, y, r, f) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"/>`;
function tree(x, y, crown) { // base del tronco en (x,y)
  return `${R(x - 5, y - 26, 10, 28, '#A9703F', 3)}${C(x, y - 38, 22, crown)}${C(x - 14, y - 28, 13, crown)}${C(x + 14, y - 28, 13, crown)}<circle cx="${x - 7}" cy="${y - 46}" r="6" fill="#fff" opacity=".25"/>`;
}
function sun(x, y, r, col) {
  let rays = '';
  for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5; rays += `<path d="M${x + Math.cos(a) * (r + 3)} ${y + Math.sin(a) * (r + 3)} L${x + Math.cos(a) * (r + 9)} ${y + Math.sin(a) * (r + 9)}" stroke="${col}" stroke-width="3.5" stroke-linecap="round"/>`; }
  return `${rays}${C(x, y, r, col)}${C(x - r * .3, y - r * .2, 1.8, '#3b2a20')}${C(x + r * .3, y - r * .2, 1.8, '#3b2a20')}<path d="M${x - r * .35} ${y + r * .25} Q${x} ${y + r * .55} ${x + r * .35} ${y + r * .25}" fill="none" stroke="#3b2a20" stroke-width="1.6" stroke-linecap="round"/>`;
}
function car(x, y, square) {
  const w = square ? (cx, cy) => `<rect x="${cx - 8}" y="${cy - 8}" width="16" height="16" fill="#3a3f52"/><rect x="${cx - 3.5}" y="${cy - 3.5}" width="7" height="7" fill="#dfe5ee"/>`
    : (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="9" fill="#3a3f52"/><circle cx="${cx}" cy="${cy}" r="4" fill="#dfe5ee"/>`;
  return `<g transform="translate(${x} ${y})"><path d="M14 26 L22 8 Q24 4 29 4 H48 Q53 4 56 8 L64 26Z" fill="#F26B6B"/><path d="M23 25 L27 10 H35 V25Z M38 25 V10 H48 L53 25Z" fill="#D6EEFF"/><rect x="0" y="22" width="78" height="22" rx="9" fill="#E03131"/><rect x="70" y="28" width="7" height="7" rx="3" fill="#FFE066"/>${w(18, 44)}${w(60, 44)}</g>`;
}
const drops = (xs, y) => xs.map((x, i) => A('raindrop', x, y + (i % 2) * 14, 14)).join('');
const stars = '<g fill="#FFE98A">' + [[12, 10], [40, 28], [70, 8], [110, 30], [130, 12], [185, 44], [22, 50], [95, 52]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="1.8"/>`).join('') + '</g>';
const clouds = (...p) => p.map(q => A('cloud', q[0], q[1], q[2])).join('');

/* ============ banco de escenas ============ */
/* t: [{ ok(), bad(), z:[x,y,w,h] | [[..],[..]], say, sub? }]  (el orden es el de dibujo) */
const SCENES = [
  { id: 'estanque', ttl: 'el estanque',
    bg: () => R(0, 0, 200, 72, '#CDEBFA') + R(0, 70, 200, 60, '#9EDC7C') + '<ellipse cx="118" cy="104" rx="56" ry="17" fill="#8ED3F5"/><ellipse cx="118" cy="104" rx="46" ry="12" fill="#6CC4EE"/>' + clouds([96, 8, 50]),
    t: [
      { ok: () => sun(168, 26, 12, '#FFD23F'), bad: () => R(0, 0, 200, 70, '#1D2B64') + stars + sun(168, 26, 12, '#FFD23F'), z: [150, 8, 36, 36], say: 'De noche sale la luna, no el sol.' },
      { ok: () => tree(40, 96, '#4DB86B'), bad: () => tree(40, 96, '#E86CC0'), z: [12, 40, 56, 50], say: 'Las hojas de los árboles son verdes.', sub: 1 },
      { ok: () => A('fish', 96, 92, 28), bad: () => A('fish', 28, 36, 26), z: [24, 34, 32, 28], say: 'Los peces viven en el agua.' },
      { ok: () => A('bird', 64, 22, 20), bad: () => A('cow', 106, -4, 34), z: [104, -6, 40, 40], say: 'Las vacas viven en el prado, no pueden estar en las nubes.' }
    ] },
  { id: 'playa', ttl: 'la playa',
    bg: () => R(0, 0, 200, 62, '#BFE6FB') + R(0, 60, 200, 30, '#4FB6E8') + R(0, 88, 200, 42, '#F6E3AE') + '<path d="M0 62 q10 -6 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>' + A('umbrella', 16, 84, 38),
    t: [
      { ok: () => A('sun', 148, 2, 36), bad: () => A('sun', 148, 2, 36, { style: 'filter:hue-rotate(85deg)' }), z: [148, 2, 36, 36], say: 'El sol es amarillo, no verde.', sub: 1 },
      { ok: () => A('bird', 56, 22, 20) + A('bird', 90, 12, 16), bad: () => [30, 62, 96, 50, 80].map((x, i) => A('snowflake', x, 6 + (i % 3) * 14, 14)).join(''), z: [24, 4, 96, 42], say: 'En la playa hace calor y el sol brilla. No nieva.' },
      { ok: () => A('boat', 70, 56, 30), bad: () => A('car', 70, 58, 30), z: [68, 56, 34, 30], say: 'Los coches van por la carretera. Los barcos son los que flotan en el mar.' },
      { ok: () => A('crab', 104, 98, 22), bad: () => A('snowman', 100, 84, 38), z: [98, 84, 42, 42], say: 'Un muñeco de nieve se derrite con el calor del sol.' }
    ] },
  { id: 'granja', ttl: 'la granja',
    bg: () => R(0, 0, 200, 64, '#CDEBFA') + R(0, 62, 200, 68, '#9EDC7C') + R(138, 52, 54, 44, '#E8604C', 3) + `<path d="M132 54 L165 28 L198 54Z" fill="#B5412F"/>` + R(156, 70, 18, 26, '#8A5A33', 3) + clouds([16, 8, 40], [104, 14, 36]) + A('sun', 158, -6, 30),
    t: [
      { ok: () => A('pig', 18, 86, 32), bad: () => A('pig', 18, 86, 32, { style: 'filter:hue-rotate(185deg)' }), z: [18, 86, 32, 32], say: 'Los cerdos son de color rosa.', sub: 1 },
      { ok: () => A('hen', 66, 90, 26), bad: () => A('fish', 62, 94, 26), z: [62, 90, 30, 30], say: 'Los peces necesitan el agua para vivir. Fuera del agua no pueden respirar.' },
      { ok: () => A('sheep', 96, 84, 32), bad: () => A('penguin', 96, 84, 32), z: [96, 84, 32, 32], say: 'Los pingüinos viven donde hace mucho frío, no en una granja.' },
      { ok: () => A('bird', 56, 20, 20), bad: () => A('whale', 46, 6, 46), z: [44, 8, 50, 40], say: 'Las ballenas viven en el mar, no pueden volar por el cielo.' }
    ] },
  { id: 'calle', ttl: 'la calle',
    bg: () => R(0, 0, 200, 70, '#CDEBFA') + R(0, 70, 200, 60, '#C7D2B6') + R(0, 90, 200, 36, '#6E7488') + '<path d="M0 108 H200" stroke="#FFE066" stroke-width="3" stroke-dasharray="14 10"/>' + clouds([96, 6, 38]) + A('tree', 150, 40, 40),
    t: [
      { ok: () => car(92, 82, false), bad: () => car(92, 82, true), z: [100, 108, 62, 20], say: 'Las ruedas son redondas para que el coche pueda rodar.' },
      { ok: () => A('house', 6, 36, 56), bad: () => A('house', 6, 36, 56, { rot: 180 }), z: [6, 36, 56, 56], say: 'Las casas tienen el tejado arriba, para que no nos moje la lluvia.' },
      { ok: () => A('raindrop', 100, 40, 14) + A('raindrop', 112, 52, 14), bad: () => drops([70, 90, 112, 132, 80, 120], 24), z: [66, 22, 78, 48], say: 'La lluvia cae de las nubes. Sin nubes, no llueve.', sub: 1 },
      { ok: () => A('dog', 70, 62, 22), bad: () => A('boat', 62, 86, 30), z: [62, 86, 32, 30], say: 'Los barcos navegan por el agua, no por la carretera.' }
    ] },
  { id: 'nieve', ttl: 'la nieve',
    bg: () => R(0, 0, 200, 64, '#DCE8F5') + R(0, 58, 200, 72, '#FFFFFF') + '<path d="M0 66 Q50 48 100 64 T200 60 V70 H0Z" fill="#fff"/>' + clouds([20, 6, 40], [120, 10, 40]) + A('snowflake', 80, 28, 12) + A('snowflake', 150, 40, 12) + A('snowflake', 8, 44, 12) + A('snowman', 76, 62, 42),
    t: [
      { ok: () => A('polarbear', 14, 84, 36), bad: () => A('monkey', 14, 84, 36), z: [14, 84, 36, 36], say: 'Los monos viven en la selva, donde hace calor. En la nieve viven los osos polares.' },
      { ok: () => A('scarf', 128, 90, 24), bad: () => A('swimsuit', 128, 90, 24), z: [126, 88, 28, 28], say: 'En la nieve hace frío. Nos ponemos bufanda, no bañador.' },
      { ok: () => A('snowflake', 160, 14, 18), bad: () => A('butterfly', 156, 10, 24), z: [154, 8, 30, 28], say: 'Las mariposas no vuelan cuando hace tanto frío.', sub: 1 }
    ] },
  { id: 'cuarto', ttl: 'la habitación',
    bg: () => R(0, 0, 200, 88, '#FFE9C7') + R(0, 86, 200, 44, '#E8C089') + '<path d="M0 88 H200" stroke="#C98E55" stroke-width="3"/>' + R(132, 14, 46, 36, '#BFE6FB', 4) + '<path d="M155 14 V50 M132 32 H178" stroke="#fff" stroke-width="3"/>' + A('sun', 144, 18, 18) + A('table', 100, 66, 46),
    t: [
      { ok: () => A('bed', 8, 62, 56), bad: () => A('bed', 8, -6, 56, { rot: 180 }), z: [8, -6, 56, 50], say: 'Las camas se ponen en el suelo, no en el techo.' },
      { ok: () => A('lamp', 70, 64, 28), bad: () => A('lamp', 70, 64, 28, { rot: 180 }), z: [70, 64, 28, 28], say: 'La lámpara se coloca con la luz hacia arriba, no del revés.', sub: 1 },
      { ok: () => A('cup', 112, 44, 20), bad: () => A('elephant', 100, 12, 46), z: [98, 10, 50, 56], say: 'Un elefante es demasiado grande y pesado para subirse a una mesa.' }
    ] },
  { id: 'cielo', ttl: 'el cielo',
    bg: () => R(0, 0, 200, 130, '#BFE6FB') + R(0, 100, 200, 30, '#9EDC7C') + '<path d="M0 104 Q50 86 100 102 T200 98 V130 H0Z" fill="#8ED69A"/>' + clouds([14, 20, 44], [130, 8, 44]) + A('sun', 8, -2, 26),
    t: [
      { ok: () => A('bird', 60, 14, 22), bad: () => A('turtle', 58, 8, 30), z: [56, 8, 34, 34], say: 'Las tortugas caminan despacio por el suelo. No saben volar.' },
      { ok: () => A('rainbow', 70, 44, 66), bad: () => A('rainbow', 70, 44, 66, { rot: 180 }), z: [70, 44, 66, 66], say: 'El arcoíris hace un arco hacia arriba, como un puente en el cielo.', sub: 1 },
      { ok: () => A('butterfly', 150, 56, 22), bad: () => A('fish', 148, 54, 26), z: [146, 52, 32, 30], say: 'Los peces no vuelan. Nadan en el agua.' }
    ] },
  { id: 'zoo', ttl: 'el zoo',
    bg: () => R(0, 0, 200, 60, '#CDEBFA') + R(0, 56, 200, 74, '#9EDC7C') + '<g fill="#C98E55">' + [10, 36, 62, 88, 114, 140, 166, 190].map(x => R(x - 3, 54, 7, 30, '#C98E55', 3)).join('') + R(0, 62, 200, 5, '#C98E55') + R(0, 74, 200, 5, '#C98E55') + '</g>' + clouds([60, 8, 40]) + A('tree', 160, 14, 40),
    t: [
      { ok: () => A('elephant', 10, 70, 56) + A('mouse', 78, 102, 16), bad: () => A('elephant', 8, 100, 22) + A('mouse', 50, 62, 62), z: [[8, 98, 26, 26], [50, 62, 62, 62]], say: 'Un elefante es mucho más grande que un ratón.', sub: 1 },
      { ok: () => A('lion', 126, 88, 36), bad: () => A('lion', 126, 88, 36, { style: 'filter:hue-rotate(190deg)' }), z: [126, 88, 36, 36], say: 'Los leones no son azules. Son de color amarillo y marrón.', sub: 1 },
      { ok: () => A('parrot', 96, 84, 26), bad: () => A('dolphin', 94, 86, 30), z: [94, 84, 32, 32], say: 'Los delfines viven en el mar. No pueden vivir en tierra.' }
    ] }
];

K.css(`
.g-memoria-x17{gap:.7rem}
.g-memoria-x17 .stage{position:relative;width:min(100%,calc(var(--hmax) * 200 / 130));flex:none;border-radius:1.6rem;overflow:hidden;box-shadow:0 .4rem 0 rgba(20,35,91,.14);border:.25rem solid #fff;background:#fff;cursor:pointer;touch-action:manipulation}
.g-memoria-x17 .stage svg.sc{width:100%;height:auto;display:block}
.g-memoria-x17 .found{fill:rgba(92,199,122,.22);stroke:#2F9E5B;stroke-width:3;stroke-dasharray:none;animation:pop .5s both;transform-box:fill-box;transform-origin:center}
.g-memoria-x17 .hintring{fill:rgba(255,210,63,.28);stroke:#E0A800;stroke-width:3;stroke-dasharray:6 4;animation:pulse 0.9s 4}
.g-memoria-x17 .cnt{display:flex;gap:.5rem;align-items:center;font-family:'Baloo 2';font-size:1.3rem}
.g-memoria-x17 .cnt i{width:1.9rem;height:1.9rem;border-radius:50%;background:#fff;border:.2rem solid var(--g);display:inline-block;transition:all .3s}
.g-memoria-x17 .cnt i.on{background:#5CC77A;border-color:#2F9E5B;box-shadow:0 0 0 .2rem #fff,0 0 0 .35rem #5CC77A}
.g-memoria-x17 .why{max-width:min(94%,42rem);padding:.5rem 1.2rem;font-family:'Baloo 2';font-size:1.3rem;line-height:1.15;background:#E8F9EC;border:.2rem solid #5CC77A;animation:pop .5s both;text-align:center;min-height:2.6rem}
.g-memoria-x17 .miss{position:absolute;width:3rem;height:3rem;margin:-1.5rem 0 0 -1.5rem;border-radius:50%;border:.25rem solid #F26B6B;pointer-events:none;animation:floatUp .8s forwards}
`);

let used = [];
K.game({
  id: 'memoria-x17', group: 'memoria', num: 21, title: '¿Qué está mal?',
  blurb: 'En el dibujo hay cosas que no tienen sentido. ¡Encuéntralas y tócalas!',
  how: 'Mira bien el dibujo. Hay cosas que están mal, que no pueden ser así. Tócalas con el dedo. Te diré por qué están mal.',
  icon: 'fish', levels: ['1 error', '2 errores', '3 errores, alguno difícil'], rounds: 5,
  round(g, ri) {
    if (ri === 0) used = [];
    const pool = SCENES.filter(s => used.indexOf(s.id) < 0 && (g.level < 3 || s.t.some(e => e.sub)));
    const sc = U.pick(pool.length ? pool : SCENES); used.push(sc.id);
    const n = Math.min(g.level, sc.t.length);
    let idx = U.sample(U.range(sc.t.length), n);
    if (g.level === 3 && !idx.some(i => sc.t[i].sub)) { const subs = U.range(sc.t.length).filter(i => sc.t[i].sub); idx[0] = U.pick(subs); idx = Array.from(new Set(idx)); while (idx.length < n) { const c = U.pick(U.range(sc.t.length)); if (idx.indexOf(c) < 0) idx.push(c); } }
    const errs = idx.map(i => sc.t[i]);
    const rectsOf = e => (Array.isArray(e.z[0]) ? e.z : [e.z]);
    g.ask(n === 1 ? 'Hay una cosa que está mal. ¿Cuál es?' : `Hay ${n} cosas que están mal. ¡Encuéntralas!`);

    const svg = `<svg class="sc" viewBox="0 0 200 130" role="img" aria-label="Dibujo de ${sc.ttl} con ${n === 1 ? 'un error' : n + ' errores'}">${sc.bg()}${sc.t.map((e, i) => idx.indexOf(i) >= 0 ? e.bad() : e.ok()).join('')}<g class="marks"></g></svg>`;
    const hmax = Math.max(160, Math.min(g.area.clientHeight - 200, 520));
    const stage = U.el(`<div class="stage" style="--hmax:${hmax}px" role="group" aria-label="Toca lo que está mal">${svg}</div>`);
    const cnt = U.el(`<div class="cnt" aria-live="polite"><span>Errores:</span>${errs.map(() => '<i></i>').join('')}</div>`);
    const why = U.el('<div class="card why" style="visibility:hidden">&nbsp;</div>');
    g.area.append(stage, cnt, why);
    const marks = stage.querySelector('.marks'), dots = cnt.querySelectorAll('i');
    const found = errs.map(() => false);
    let nf = 0;

    const addRing = (e, cls) => rectsOf(e).map(r => `<ellipse class="${cls}" cx="${r[0] + r[2] / 2}" cy="${r[1] + r[3] / 2}" rx="${r[2] / 2 + 3}" ry="${r[3] / 2 + 3}"/>`).join('');
    stage.addEventListener('click', ev => {
      if (nf === errs.length) return;
      const s = stage.querySelector('svg.sc'), b = s.getBoundingClientRect();
      const x = (ev.clientX - b.left) / b.width * 200, y = (ev.clientY - b.top) / b.height * 130;
      const pad = 4;
      const hit = errs.findIndex((e, i) => !found[i] && rectsOf(e).some(r => x >= r[0] - pad && x <= r[0] + r[2] + pad && y >= r[1] - pad && y <= r[1] + r[3] + pad));
      if (hit < 0) {
        const m = U.el('<i class="miss"></i>'); m.style.left = (ev.clientX - stage.getBoundingClientRect().left) + 'px'; m.style.top = (ev.clientY - stage.getBoundingClientRect().top) + 'px';
        stage.appendChild(m); setTimeout(() => m.remove(), 900);
        g.wrong(U.pick(['Eso está bien. ¡Sigue buscando!', 'Eso es normal. Busca otra cosa.', 'Ahí no hay error. ¡Mira bien!']));
        return;
      }
      found[hit] = true; nf++; K.sound.pop();
      marks.insertAdjacentHTML('beforeend', addRing(errs[hit], 'found'));
      dots[hit].classList.add('on');
      why.style.visibility = 'visible'; why.textContent = errs[hit].say; g.say(errs[hit].say);
      if (nf === errs.length) g.t(() => g.right(n > 1 ? '¡Los has encontrado todos!' : undefined), 800 + errs[hit].say.length * 55);
    });
    g.helpHint = () => {
      const i = found.indexOf(false); if (i < 0) return;
      marks.insertAdjacentHTML('beforeend', addRing(errs[i], 'hintring'));
      g.t(() => marks.querySelectorAll('.hintring').forEach(x => x.remove()), 3800);
      g.toast('Mira dentro del círculo amarillo.');
    };
  }
});
})();
