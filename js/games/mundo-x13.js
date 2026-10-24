/* mundo-x13 — Las emociones */
(function () {
'use strict';
const U = Kids.util;
const INK = '#14235B';
const V = (inner) => '<svg viewBox="0 0 100 100" aria-hidden="true">' + inner + '</svg>';

/* caras parametrizables: ojos, cejas, boca y extras por emoción */
const FACE = {
  neutro:     { c: '#FFE29A', eyes: 'round', brows: 'flat',   mouth: '<path d="M40 72h20" stroke="' + INK + '" stroke-width="3.6" stroke-linecap="round" fill="none"/>' },
  alegre:     { c: '#FFD66B', eyes: 'happy', brows: 'none',   mouth: '<path d="M30 62Q50 92 70 62Z" fill="#8B2E3A" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/><path d="M33 64h34" stroke="#fff" stroke-width="5" stroke-linecap="round"/><ellipse cx="50" cy="77" rx="9" ry="5" fill="#FF8FA3"/>', cheeks: 1 },
  triste:     { c: '#A9CFF5', eyes: 'down',  brows: 'sad',    mouth: '<path d="M36 76q14 -14 28 0" stroke="' + INK + '" stroke-width="3.6" stroke-linecap="round" fill="none"/>', extra: '<path d="M32 58q-6 10 0 14q6 -4 0 -14z" fill="#6CB8F0" stroke="#4C8DF6" stroke-width="1.6"/>' },
  enfadado:   { c: '#FF9A82', eyes: 'angry', brows: 'angry',  mouth: '<path d="M34 68h32v10H34z" fill="#fff" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/><path d="M42 68v10M50 68v10M58 68v10" stroke="' + INK + '" stroke-width="2"/>', extra: '<path d="M70 14l7 7M77 14l-7 7" stroke="#E0503C" stroke-width="3.4" stroke-linecap="round"/>' },
  miedo:      { c: '#CDBDF7', eyes: 'scared', brows: 'scared', mouth: '<path d="M36 74q14 -12 28 0q-14 12 -28 0z" fill="#8B2E3A" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>', extra: '<path d="M80 30q-6 9 0 12q6 -3 0 -12z" fill="#BFE9FB" stroke="#6CB8E0" stroke-width="1.6"/>' },
  sorpresa:   { c: '#FFC988', eyes: 'wide',  brows: 'high',   mouth: '<ellipse cx="50" cy="73" rx="7.5" ry="10" fill="#8B2E3A" stroke="' + INK + '" stroke-width="3"/>', extra: '<path d="M16 28l-6 -4M84 28l6 -4M50 8v-6" stroke="#FFB300" stroke-width="3.4" stroke-linecap="round"/>' },
  sueno:      { c: '#B9C6F2', eyes: 'sleepy', brows: 'flat',  mouth: '<ellipse cx="50" cy="74" rx="8" ry="9" fill="#8B2E3A" stroke="' + INK + '" stroke-width="3"/>', extra: '<g font-family="Baloo 2,sans-serif" font-weight="800" fill="#6B5BC8"><text x="72" y="26" font-size="20">Z</text><text x="84" y="14" font-size="13">z</text></g>' },
  verguenza:  { c: '#FFB9CB', eyes: 'shy',   brows: 'sad',    mouth: '<path d="M38 72q4 5 8 0t8 0t8 0" stroke="' + INK + '" stroke-width="3.4" stroke-linecap="round" fill="none"/>', blush: 1 }
};
function eyes(t) {
  const white = (cx, r) => `<circle cx="${cx}" cy="48" r="${r}" fill="#fff" stroke="${INK}" stroke-width="2.4"/>`;
  const pup = (cx, dx, dy, r) => `<circle cx="${cx + dx}" cy="${48 + dy}" r="${r}" fill="${INK}"/><circle cx="${cx + dx + r * .35}" cy="${48 + dy - r * .35}" r="${r * .3}" fill="#fff"/>`;
  switch (t) {
    case 'happy': return `<path d="M29 50q7 -11 14 0M57 50q7 -11 14 0" stroke="${INK}" stroke-width="4" stroke-linecap="round" fill="none"/>`;
    case 'down': return white(36, 7.5) + white(64, 7.5) + pup(36, 0, 3, 4.2) + pup(64, 0, 3, 4.2);
    case 'angry': return white(36, 6.5) + white(64, 6.5) + pup(36, 1.2, 1, 3.6) + pup(64, -1.2, 1, 3.6);
    case 'scared': return white(35, 10) + white(65, 10) + `<circle cx="35" cy="48" r="2.8" fill="${INK}"/><circle cx="65" cy="48" r="2.8" fill="${INK}"/>`;
    case 'wide': return white(35, 10) + white(65, 10) + pup(35, 0, 0, 5) + pup(65, 0, 0, 5);
    case 'sleepy': return `<path d="M28 48q8 8 16 0M56 48q8 8 16 0" stroke="${INK}" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M30 55q5 3 10 0M60 55q5 3 10 0" stroke="${INK}" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".5"/>`;
    case 'shy': return white(36, 6.5) + white(64, 6.5) + pup(36, 2.6, 2.6, 3.6) + pup(64, 2.6, 2.6, 3.6);
    default: return white(36, 7) + white(64, 7) + pup(36, 0, 0, 4) + pup(64, 0, 0, 4);
  }
}
function brows(t) {
  const s = `stroke="${INK}" stroke-width="3.6" stroke-linecap="round" fill="none"`;
  switch (t) {
    case 'sad': return `<path d="M27 40L43 33M73 40L57 33" ${s}/>`;
    case 'angry': return `<path d="M27 31L44 40M73 31L56 40" ${s}/>`;
    case 'scared': return `<path d="M27 36Q34 26 44 30M73 36Q66 26 56 30" ${s}/>`;
    case 'high': return `<path d="M27 30q8 -9 16 0M57 30q8 -9 16 0" ${s}/>`;
    case 'flat': return `<path d="M29 36h14M57 36h14" ${s} opacity=".55"/>`;
    default: return '';
  }
}
function faceSvg(emo) {
  const f = FACE[emo] || FACE.neutro;
  return V(`<ellipse cx="50" cy="93" rx="26" ry="4" fill="${INK}" opacity=".1"/>${emo === 'enfadado' ? '' : `<path d="M36 17q-4 -10 6 -12q-2 6 4 10M60 15q2 -8 10 -6q-6 3 -6 9" fill="${f.c}" stroke="rgba(20,35,91,.25)" stroke-width="2.4"/>`}<circle cx="50" cy="54" r="39" fill="${f.c}" stroke="rgba(20,35,91,.25)" stroke-width="3"/><ellipse cx="38" cy="32" rx="14" ry="7" fill="#fff" opacity=".25" transform="rotate(-20 38 32)"/>${f.cheeks ? '<circle cx="24" cy="64" r="6" fill="#FF8FA3" opacity=".55"/><circle cx="76" cy="64" r="6" fill="#FF8FA3" opacity=".55"/>' : ''}${f.blush ? '<circle cx="24" cy="62" r="9" fill="#FF6B8E" opacity=".6"/><circle cx="76" cy="62" r="9" fill="#FF6B8E" opacity=".6"/>' : ''}${eyes(f.eyes)}${brows(f.brows)}${f.mouth}${f.extra || ''}`);
}
const icon = (inner) => V(`<circle cx="50" cy="50" r="42" fill="#fff" stroke="rgba(20,35,91,.15)" stroke-width="3"/>${inner}`);
Kids.art.add({
  'wx13-face': faceSvg,
  'wx13-ic-wind': icon('<path d="M18 40h36q10 0 10 -8t-9 -8M18 54h50q10 0 10 8t-10 8M18 68h26" stroke="#6CB8E0" stroke-width="5" fill="none" stroke-linecap="round"/>'),
  'wx13-ic-count': icon(`<g font-family="Baloo 2,sans-serif" font-weight="800" font-size="28" fill="#8C7BE0" text-anchor="middle"><text x="30" y="46">1</text><text x="52" y="46">2</text><text x="74" y="46">3</text></g><path d="M22 62q28 14 56 0" stroke="#FFD23F" stroke-width="5" fill="none" stroke-linecap="round"/><text x="50" y="82" font-size="14" font-family="Baloo 2,sans-serif" font-weight="800" fill="#4B5A8A" text-anchor="middle">…10</text>`),
  'wx13-ic-hug': icon('<path d="M50 74C26 58 24 38 38 34q10 -2 12 8q2 -10 12 -8c14 4 12 24 -12 40z" fill="#FF7EA8"/><path d="M16 56q8 -4 14 6M84 56q-8 -4 -14 6" stroke="#F6C9A0" stroke-width="7" stroke-linecap="round" fill="none"/>'),
  'wx13-ic-talk': icon('<path d="M24 28h52q8 0 8 8v22q0 8 -8 8H48l-14 12V66h-10q-8 0 -8 -8V36q0 -8 8 -8z" fill="#BFE3FA" stroke="#4C8DF6" stroke-width="3" stroke-linejoin="round"/><path d="M34 42h32M34 52h20" stroke="#4C8DF6" stroke-width="4" stroke-linecap="round"/>'),
  'wx13-ic-draw': icon('<path d="M26 74l4 -16 34 -34 12 12 -34 34z" fill="#FFD23F" stroke="#E0A800" stroke-width="3" stroke-linejoin="round"/><path d="M26 74l4 -16 12 12z" fill="#F6C9A0"/><path d="M60 28l12 12" stroke="#FF7EA8" stroke-width="5"/>'),
  'wx13-ic-no': icon('<circle cx="50" cy="50" r="26" fill="none" stroke="#F26B6B" stroke-width="7"/><path d="M32 68L68 32" stroke="#F26B6B" stroke-width="7" stroke-linecap="round"/>')
});

const EMO = {
  alegre:    { n: 'Alegre',          w: 'alegre' },
  triste:    { n: 'Triste',          w: 'triste' },
  enfadado:  { n: 'Enfadado',        w: 'enfadado' },
  miedo:     { n: 'Con miedo',       w: 'con miedo' },
  sorpresa:  { n: 'Sorprendido',     w: 'sorprendido' },
  sueno:     { n: 'Con sueño',       w: 'con sueño' },
  verguenza: { n: 'Con vergüenza',   w: 'con vergüenza' }
};
const FKEY = { alegre: 'alegre', triste: 'triste', enfadado: 'enfadado', miedo: 'miedo', sorpresa: 'sorpresa', sueno: 'sueno', verguenza: 'verguenza' };
const SIT = [
  { e: 'alegre', t: 'Ha ganado un premio en el cole.', a: 'star' },
  { e: 'alegre', t: 'Es su cumpleaños y hay una tarta.', a: 'cake' },
  { e: 'alegre', t: 'Va al parque a jugar con sus amigos.', a: 'ball' },
  { e: 'triste', t: 'Se le ha caído el helado al suelo.' },
  { e: 'triste', t: 'Se le ha roto su peluche favorito.', a: 'teddy' },
  { e: 'triste', t: 'Su mejor amigo se ha ido a vivir muy lejos.', a: 'house' },
  { e: 'enfadado', t: 'Su hermano le ha tirado la torre de cubos que había hecho.' },
  { e: 'enfadado', t: 'Alguien le ha quitado su juguete sin pedirlo.', a: 'car' },
  { e: 'miedo', t: 'Oye un trueno muy fuerte en plena noche.', a: 'cloud' },
  { e: 'miedo', t: 'Está a oscuras y ve una sombra rara en la pared.', a: 'moon' },
  { e: 'sorpresa', t: 'Abre una caja y hay un regalo que no esperaba.', a: 'balloon' },
  { e: 'sorpresa', t: 'Entra en casa y todos gritan: «¡Sorpresa!»', a: 'cake' },
  { e: 'sueno', t: 'Ha jugado todo el día y ya es muy tarde.', a: 'bed' },
  { e: 'sueno', t: 'Bosteza y se le cierran los ojitos.', a: 'moon' },
  { e: 'verguenza', t: 'Se ha tropezado delante de toda la clase.' },
  { e: 'verguenza', t: 'Tiene que cantar delante de todos y se pone rojo.' }
];
const COPE = {
  enfadado: {
    q: '¿Qué puedo hacer cuando estoy enfadado?',
    pos: [['Respirar hondo', 'wx13-ic-wind'], ['Contar hasta 10', 'wx13-ic-count'], ['Pedir un abrazo', 'wx13-ic-hug']],
    neg: ['Pegar a alguien', 'Romper mis juguetes', 'Gritar muy fuerte']
  },
  triste: {
    q: '¿Qué puedo hacer cuando estoy triste?',
    pos: [['Pedir un abrazo', 'wx13-ic-hug'], ['Contárselo a alguien', 'wx13-ic-talk'], ['Dibujar lo que siento', 'wx13-ic-draw']],
    neg: ['Esconderme sin hablar con nadie', 'Enfadarme con todos']
  },
  miedo: {
    q: '¿Qué puedo hacer cuando tengo miedo?',
    pos: [['Decírselo a un adulto', 'wx13-ic-talk'], ['Respirar hondo', 'wx13-ic-wind'], ['Abrazar mi peluche', 'teddy']],
    neg: ['Quedarme callado sin decir nada', 'Salir corriendo a la calle']
  }
};
let plan = [], usedSit = [];

Kids.css(`
.g-mundo-x13 .wx13-main{display:flex;flex-direction:column;align-items:center;gap:1rem;width:100%}
.g-mundo-x13 .wx13-hero{width:clamp(9rem,28vmin,15rem);aspect-ratio:1;position:relative}
.g-mundo-x13 .wx13-hero svg,.g-mundo-x13 .wx13-opt svg{width:100%;height:100%;display:block}
.g-mundo-x13 .wx13-hero .q{position:absolute;right:-.6rem;top:-.4rem;width:3rem;height:3rem;border-radius:50%;background:#fff;box-shadow:0 .2rem 0 var(--line);font-family:'Baloo 2';font-weight:800;font-size:2rem;display:flex;align-items:center;justify-content:center;color:var(--g)}
.g-mundo-x13 .wx13-sit{display:flex;align-items:center;gap:.8rem;max-width:44rem;font-family:'Baloo 2';font-weight:700;font-size:clamp(1.3rem,3.6vmin,2rem);line-height:1.2;text-align:center;justify-content:center}
.g-mundo-x13 .wx13-sit .a{width:3.6rem;height:3.6rem;flex:none}
.g-mundo-x13 .wx13-sit .a svg{width:100%;height:100%}
.g-mundo-x13 .wx13-faces{display:flex;flex-wrap:wrap;justify-content:center;gap:.9rem;width:100%;max-width:62rem}
.g-mundo-x13 .wx13-opt{flex:0 1 clamp(7.2rem,17%,11rem);padding:.5rem;justify-content:flex-start;align-self:flex-start}
.g-mundo-x13 .wx13-opt .face{display:block;width:min(100%,7.5rem);aspect-ratio:1;flex:none}
.g-mundo-x13 .wx13-opt.nolbl{aspect-ratio:1;justify-content:center}
.g-mundo-x13 .wx13-opt .face svg{max-width:none;max-height:none}
.g-mundo-x13 .wx13-cope{display:flex;flex-wrap:wrap;justify-content:center;gap:.9rem;width:100%;max-width:62rem}
.g-mundo-x13 .wx13-c{display:flex;align-items:center;gap:.7rem;min-height:4.6rem;padding:.4rem 1.1rem .4rem .5rem;border-radius:1.6rem;background:#fff;border:.2rem solid var(--line);box-shadow:0 .3rem 0 var(--line);font-family:'Baloo 2';font-weight:700;font-size:clamp(1.15rem,3vmin,1.6rem);text-align:left;flex:1 1 17rem;max-width:24rem;line-height:1.1}
.g-mundo-x13 .wx13-c .ic{width:3.6rem;height:3.6rem;flex:none}
.g-mundo-x13 .wx13-c .ic svg{width:100%;height:100%}
.g-mundo-x13 .wx13-c.right{background:#BDEFC8;border-color:#5CC77A}
.g-mundo-x13 .wx13-c.bad{background:#FFE3E0}
.g-mundo-x13 .wx13-c.hint{animation:pulse .7s 6}
.g-mundo-x13 .wx13-cnt{font-family:'Baloo 2';font-weight:800;color:var(--ink2);font-size:1.3rem}
`);

const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const face = e => Kids.art.get('wx13-face', FKEY[e] || e);

Kids.game({
  id: 'mundo-x13', group: 'mundo', num: 16,
  title: 'Las emociones',
  blurb: '¿Cómo se siente? Mira las caras y elige la emoción.',
  how: 'Mira la cara o la historia y toca la emoción que corresponde: alegre, triste, enfadado, con miedo, sorprendido, con sueño o con vergüenza.',
  icon: 'heart',
  levels: ['3 emociones', '5 emociones con historias', '7 emociones y qué hacer'],
  rounds: 6,
  round(g, i) {
    if (i === 0) {
      usedSit = [];
      const pool = g.level === 1 ? ['alegre', 'triste', 'enfadado'] : g.level === 2 ? ['alegre', 'triste', 'enfadado', 'miedo', 'sorpresa'] : Object.keys(EMO);
      if (g.level === 1) { plan = U.shuffle(pool.concat(pool)); }
      else if (g.level === 2) { plan = U.shuffle(pool.concat(U.pick(pool))); }
      else {
        const four = U.sample(Object.keys(EMO), 4).map(e => ({ e }));
        plan = [four[0], four[1], 'cope1', four[2], four[3], 'cope2'];
      }
    }
    const p = plan[i];
    if (g.level === 1) return level1(g, i, p);
    if (g.level === 2) return situation(g, p, 5);
    if (typeof p === 'string') return cope(g, p === 'cope1' ? 'enfadado' : U.pick(['triste', 'miedo']));
    return situation(g, p.e, 4);
  }
});

function level1(g, i, e) {
  const all = ['alegre', 'triste', 'enfadado'];
  const wrap = U.el('<div class="wx13-main"></div>');
  g.area.appendChild(wrap);
  let done = false;
  if (i % 2 === 0) {
    g.ask('¿Cómo se siente?');
    wrap.appendChild(U.el(`<div class="wx13-hero pop" role="img" aria-label="Cara de personaje">${face(e)}</div>`));
    const opts = U.el('<div class="opts"></div>');
    U.shuffle(all).forEach(k => opts.appendChild(U.el(`<button class="ans" data-e="${k}" style="font-size:clamp(1.6rem,4.5vmin,2.4rem)">${EMO[k].n}</button>`)));
    wrap.appendChild(opts);
    g.helpHint = () => { const b = opts.querySelector(`[data-e="${e}"]`); b.classList.add('pulse'); g.toast('Mira bien la cara: ¿está ' + EMO[e].w + '?'); };
    opts.addEventListener('click', ev => {
      const b = ev.target.closest('.ans'); if (!b || b.disabled || done) return;
      if (b.dataset.e === e) { done = true; b.classList.add('right'); opts.querySelectorAll('.ans').forEach(x => x.disabled = true); g.right('¡Sí! Está ' + EMO[e].w); }
      else { b.classList.add('bad'); b.disabled = true; g.wrong('Mmm, mira otra vez su cara. ¡Tú puedes!'); }
    });
  } else {
    g.ask('¿Cuál es la cara ' + (e === 'alegre' ? 'alegre' : e === 'triste' ? 'triste' : 'enfadada') + '?');
    const fs = U.el('<div class="wx13-faces"></div>');
    U.shuffle(all).forEach(k => fs.appendChild(U.el(`<button class="pic wx13-opt nolbl" data-e="${k}" aria-label="Cara ${EMO[k].w}">${'<span class="face">' + face(k) + '</span>'}</button>`)));
    wrap.appendChild(fs);
    g.helpHint = () => { fs.querySelector(`[data-e="${e}"]`).classList.add('pulse'); g.toast('Busca la cara que está ' + EMO[e].w); };
    fs.addEventListener('click', ev => {
      const b = ev.target.closest('.pic'); if (!b || b.disabled || done) return;
      if (b.dataset.e === e) { done = true; b.classList.add('right'); fs.querySelectorAll('.pic').forEach(x => x.disabled = true); g.right('¡Muy bien!'); }
      else { b.classList.add('bad'); b.disabled = true; g.wrong('Esa no es. ¡Prueba con otra cara!'); }
    });
  }
}

function situation(g, e, nOpts) {
  let cands = SIT.filter(s => s.e === e && usedSit.indexOf(s) < 0);
  if (!cands.length) cands = SIT.filter(s => s.e === e);
  const s = U.pick(cands); usedSit.push(s);
  const pool = nOpts === 5 ? ['alegre', 'triste', 'enfadado', 'miedo', 'sorpresa'] : Object.keys(EMO);
  const opts = nOpts >= pool.length ? pool : U.shuffle([e].concat(U.sample(pool.filter(x => x !== e), nOpts - 1)));
  g.ask(s.t + ' ¿Cómo se siente?');
  const wrap = U.el('<div class="wx13-main"></div>');
  wrap.appendChild(U.el(`<div class="wx13-hero" role="img" aria-label="Personaje pensando">${face('neutro')}<span class="q">?</span></div>`));
  wrap.appendChild(U.el(`<div class="wx13-sit card">${s.a ? '<span class="a">' + Kids.art.get(s.a) + '</span>' : ''}<span>${U.esc(s.t)}</span></div>`));
  const fs = U.el('<div class="wx13-faces"></div>');
  U.shuffle(opts).forEach(k => fs.appendChild(U.el(`<button class="pic wx13-opt" data-e="${k}" aria-label="${EMO[k].n}"><span class="face">${face(k)}</span><span class="lbl">${EMO[k].n}</span></button>`)));
  wrap.appendChild(fs); g.area.appendChild(wrap);
  let done = false;
  g.helpHint = () => { fs.querySelector(`[data-e="${e}"]`).classList.add('pulse'); g.toast('Piensa: ¿cómo te sentirías tú?'); };
  fs.addEventListener('click', ev => {
    const b = ev.target.closest('.pic'); if (!b || b.disabled || done) return;
    if (b.dataset.e === e) { done = true; b.classList.add('right'); fs.querySelectorAll('.pic').forEach(x => x.disabled = true); g.right('¡Sí! Se siente ' + EMO[e].w); }
    else { b.classList.add('bad'); b.disabled = true; g.wrong('Mmm, piensa cómo te sentirías tú. ¡Prueba otra vez!'); }
  });
}

function cope(g, e) {
  const d = COPE[e];
  g.ask(d.q + ' Toca las ideas buenas.');
  const wrap = U.el('<div class="wx13-main"></div>');
  wrap.appendChild(U.el(`<div class="wx13-hero" style="width:clamp(6rem,18vmin,10rem)" role="img" aria-label="Cara ${EMO[e].w}">${face(e)}</div>`));
  const list = U.el('<div class="wx13-cope"></div>');
  const items = d.pos.map(p => ({ t: p[0], ic: p[1], ok: true })).concat(U.sample(d.neg, 2).map(t => ({ t, ic: 'wx13-ic-no', ok: false })));
  U.shuffle(items).forEach(o => list.appendChild(U.el(`<button class="wx13-c" data-ok="${o.ok ? 1 : 0}"><span class="ic">${Kids.art.get(o.ic)}</span><span>${o.t}</span></button>`)));
  const cnt = U.el('<div class="wx13-cnt">Ideas buenas: 0 de 3</div>');
  wrap.appendChild(list); wrap.appendChild(cnt); g.area.appendChild(wrap);
  let found = 0;
  g.helpHint = () => { const b = list.querySelector('[data-ok="1"]:not(.right)'); if (b) b.classList.add('hint'); g.toast('Pista: busca ideas que ayudan y no hacen daño'); };
  list.addEventListener('click', ev => {
    const b = ev.target.closest('.wx13-c'); if (!b || b.disabled) return;
    b.disabled = true;
    if (b.dataset.ok === '1') {
      b.classList.add('right'); b.classList.remove('hint'); found++; Kids.sound.pop(); cnt.textContent = 'Ideas buenas: ' + found + ' de 3';
      if (found === 3) g.t(() => g.right('¡Qué buenas ideas! Así nos sentimos mejor'), 350);
      else g.toast('¡Buena idea!');
    } else { b.classList.add('bad'); g.wrong('Eso no ayuda ni es amable. ¡Busca otra idea!'); }
  });
}
})();
