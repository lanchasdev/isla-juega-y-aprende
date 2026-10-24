/* mundo-x17 — El cielo */
(function () {
'use strict';
const U = Kids.util;
const V = (inner) => '<svg viewBox="0 0 100 100" aria-hidden="true">' + inner + '</svg>';
const S = (inner) => '<svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + inner + '</svg>';
const ball = (id, c1, c2) => `<defs><radialGradient id="wx17-${id}-g" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient></defs>`;
const gloss = '<ellipse cx="36" cy="32" rx="10" ry="6" fill="#fff" opacity=".35" transform="rotate(-30 36 32)"/>';
const spark = (x, y, s, c) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -6 Q1 -1 6 0 Q1 1 0 6 Q-1 1 -6 0 Q-1 -1 0 -6Z" fill="${c || '#FFF3B0'}"/>`;

Kids.art.add({
  'wx17-day': S(`<defs><linearGradient id="wx17-dy" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6EC6F5"/><stop offset="1" stop-color="#D6F1FD"/></linearGradient></defs>
    <rect width="200" height="140" fill="url(#wx17-dy)"/>
    <circle cx="150" cy="40" r="34" fill="#FFE98F" opacity=".4"/><circle cx="150" cy="40" r="23" fill="#FFD23F"/>
    <g stroke="#FFC107" stroke-width="3.4" stroke-linecap="round"><path d="M150 6v-4M150 78v4M116 40h-5M184 40h5M126 16l-3-3M174 64l3 3M174 16l3-3M126 64l-3 3"/></g>
    <circle cx="143" cy="37" r="2.4" fill="#14235B"/><circle cx="157" cy="37" r="2.4" fill="#14235B"/><path d="M143 46 Q150 52 157 46" fill="none" stroke="#14235B" stroke-width="2" stroke-linecap="round"/>
    <g fill="#fff"><ellipse cx="46" cy="34" rx="22" ry="9"/><ellipse cx="62" cy="28" rx="14" ry="9"/><ellipse cx="96" cy="70" rx="16" ry="6"/><ellipse cx="106" cy="66" rx="10" ry="6"/></g>
    <path d="M0 108 Q50 84 110 106 T200 98 V140 H0Z" fill="#9BDD9A"/><path d="M0 124 Q80 108 150 124 T200 120 V140 H0Z" fill="#7CCB86"/>
    <g transform="translate(34 98)"><rect x="-3" y="2" width="6" height="22" rx="3" fill="#A37350"/><circle cy="-6" r="15" fill="#5CC77A"/><circle cx="-9" cy="2" r="9" fill="#6FD28A"/><circle cx="10" cy="2" r="9" fill="#6FD28A"/></g>`),
  'wx17-night': S(`<defs><linearGradient id="wx17-nt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14235B"/><stop offset="1" stop-color="#4A4FA8"/></linearGradient>
    <mask id="wx17-nm"><rect width="200" height="140" fill="#fff"/><circle cx="162" cy="30" r="19" fill="#000"/></mask></defs>
    <rect width="200" height="140" fill="url(#wx17-nt)"/>
    <circle cx="150" cy="40" r="34" fill="#FFF3C4" opacity=".12"/>
    <circle cx="148" cy="40" r="23" fill="#FFF3C4" mask="url(#wx17-nm)"/>
    ${spark(30, 24, 1.3)}${spark(70, 52, 1)}${spark(96, 20, 1.5)}${spark(24, 74, .9)}${spark(112, 62, 1)}${spark(180, 84, 1.1)}${spark(54, 12, .8)}${spark(128, 14, .9)}${spark(86, 84, .8)}
    <path d="M0 110 Q50 90 110 108 T200 100 V140 H0Z" fill="#2D3A82"/><path d="M0 126 Q80 112 150 126 T200 122 V140 H0Z" fill="#232E6B"/>
    <g transform="translate(40 104)"><rect x="-12" y="0" width="24" height="18" fill="#FFB347"/><path d="M-15 0 L0 -12 L15 0Z" fill="#FF7E69"/><rect x="-4" y="5" width="8" height="8" fill="#FFF3B0"/></g>`),
  'wx17-mercury': V(`${ball('me', '#D6D0C8', '#8F887E')}<circle cx="50" cy="50" r="38" fill="url(#wx17-me-g)"/>
    <g fill="#7F786F" opacity=".55"><circle cx="38" cy="58" r="7"/><circle cx="62" cy="40" r="5.5"/><circle cx="66" cy="66" r="4.4"/><circle cx="46" cy="36" r="3.4"/></g>${gloss}`),
  'wx17-venus': V(`${ball('ve', '#FFE3A1', '#E8A64C')}<circle cx="50" cy="50" r="38" fill="url(#wx17-ve-g)"/>
    <g fill="none" stroke="#D88F3A" stroke-width="3" stroke-linecap="round" opacity=".5"><path d="M18 42 Q36 34 52 44 T84 40"/><path d="M14 58 Q34 66 54 56 T88 60"/><path d="M24 74 Q44 68 62 76"/></g>${gloss}`),
  'wx17-earth': V(`${ball('ea', '#7CC4FA', '#2F7FD6')}<defs><clipPath id="wx17-ea-c"><circle cx="50" cy="50" r="38"/></clipPath></defs><circle cx="50" cy="50" r="38" fill="url(#wx17-ea-g)"/>
    <g clip-path="url(#wx17-ea-c)" fill="#58C26B"><path d="M26 28 Q40 18 52 28 Q58 40 46 46 Q50 56 38 58 Q30 48 22 42Z"/><path d="M62 54 Q78 48 84 60 Q82 76 70 82 Q60 72 62 54Z"/><path d="M60 22 Q72 18 78 28 Q70 34 62 30Z"/></g>
    <g fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" opacity=".8"><path d="M20 62 Q30 56 40 62"/><path d="M52 70 Q58 66 64 70"/><path d="M62 34 Q70 30 78 36"/></g>${gloss}`),
  'wx17-mars': V(`${ball('ma', '#F28A62', '#C2442A')}<defs><clipPath id="wx17-ma-c"><circle cx="50" cy="50" r="38"/></clipPath></defs><circle cx="50" cy="50" r="38" fill="url(#wx17-ma-g)"/>
    <g clip-path="url(#wx17-ma-c)"><ellipse cx="50" cy="14" rx="14" ry="6" fill="#FFF1E6" opacity=".9"/><g fill="#9C3220" opacity=".4"><path d="M24 50 Q38 40 48 52 Q40 64 26 62Z"/><circle cx="66" cy="64" r="7"/><circle cx="62" cy="38" r="4"/></g></g>${gloss}`),
  'wx17-jupiter': V(`${ball('ju', '#F4D8B4', '#CE9A6A')}<defs><clipPath id="wx17-ju-c"><circle cx="50" cy="50" r="38"/></clipPath></defs><circle cx="50" cy="50" r="38" fill="url(#wx17-ju-g)"/>
    <g clip-path="url(#wx17-ju-c)"><rect x="8" y="24" width="84" height="9" fill="#C9824F" opacity=".75"/><rect x="8" y="40" width="84" height="7" fill="#E8B887" opacity=".9"/><rect x="8" y="52" width="84" height="10" fill="#B9723F" opacity=".7"/><rect x="8" y="68" width="84" height="7" fill="#E8B887" opacity=".9"/><ellipse cx="64" cy="60" rx="9" ry="5.4" fill="#D9543B"/></g>${gloss}`),
  'wx17-saturn': V(`${ball('sa', '#FAE4A8', '#D9A95A')}<g transform="rotate(-18 50 50)"><path d="M2 50 A48 13 0 0 1 98 50" fill="none" stroke="#C99A62" stroke-width="7" stroke-linecap="round"/>
    <circle cx="50" cy="50" r="29" fill="url(#wx17-sa-g)"/><g opacity=".5" fill="none" stroke="#C99A62" stroke-width="3"><path d="M24 42 Q50 36 76 42"/><path d="M22 58 Q50 64 78 58"/></g>
    <path d="M2 50 A48 13 0 0 0 98 50" fill="none" stroke="#E9C58A" stroke-width="7" stroke-linecap="round"/><path d="M12 50 A38 10 0 0 0 88 50" fill="none" stroke="#fff" stroke-width="1.6" opacity=".6"/></g>`)
});

const P = {
  mercurio: { n: 'Mercurio', d: 'Mercurio', art: 'wx17-mercury' },
  venus:    { n: 'Venus', d: 'Venus', art: 'wx17-venus' },
  tierra:   { n: 'la Tierra', d: 'la Tierra', art: 'wx17-earth', short: 'Tierra' },
  marte:    { n: 'Marte', d: 'Marte', art: 'wx17-mars' },
  jupiter:  { n: 'Júpiter', d: 'Júpiter', art: 'wx17-jupiter' },
  saturno:  { n: 'Saturno', d: 'Saturno', art: 'wx17-saturn' },
  sol:      { n: 'el Sol', d: 'el Sol', art: 'sun', short: 'Sol' },
  luna:     { n: 'la Luna', d: 'la Luna', art: 'moon', short: 'Luna' }
};
const lab = k => P[k].short || P[k].n;
const art = k => Kids.art.get(P[k].art);
const LOOKS = {
  saturno: '¿Qué planeta tiene anillos?',
  marte: '¿Qué planeta es rojo?',
  tierra: '¿Qué planeta es azul y verde? Es el planeta donde vivimos.',
  jupiter: '¿Qué planeta es enorme y tiene bandas de colores?'
};
const ORDER = ['mercurio', 'venus', 'tierra', 'marte'];
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

Kids.css(`
.g-mundo-x17{--cw:clamp(3.6rem,12.5vmin,7.5rem);gap:.8rem}
.g-mundo-x17 .x17-scene{aspect-ratio:200/140;height:clamp(7rem,30vh,16rem);max-width:100%;border-radius:1.8rem;overflow:hidden;border:.25rem solid #fff;box-shadow:0 .4rem 0 rgba(20,35,91,.14);flex:none}
.g-mundo-x17 .x17-scene svg{width:100%;height:100%;display:block}
.g-mundo-x17 .x17-ref .pic{width:clamp(8rem,26vmin,13rem)}
.g-mundo-x17 .x17-opts .pic{width:clamp(5.4rem,19vmin,10rem);cursor:pointer}
.g-mundo-x17 .x17-opts .pic svg{max-width:100%;aspect-ratio:1;height:auto}
.g-mundo-x17 .x17-opts.big .pic{width:clamp(7rem,22vmin,11rem)}
.g-mundo-x17 .x17-opts .ans{font-size:clamp(1.5rem,5vmin,2.4rem);min-width:8rem}
.g-mundo-x17 .x17-vs{display:flex;align-items:center;gap:.8rem;flex-wrap:wrap;justify-content:center}
.g-mundo-x17 .x17-row{display:flex;align-items:center;justify-content:center;gap:clamp(.2rem,1.4vmin,.9rem);width:100%}
.g-mundo-x17 .x17-sun{width:calc(var(--cw) + .5rem);flex:none;display:flex;flex-direction:column;align-items:center;font-family:'Baloo 2';font-weight:800;font-size:1.1rem;line-height:1}
.g-mundo-x17 .x17-sun svg{width:100%;aspect-ratio:1;display:block}
.g-mundo-x17 .x17-sl{position:relative;width:calc(var(--cw) + .5rem);height:calc(var(--cw) + .9rem);flex:none;border:.25rem dashed #9CB5E8;background:rgba(255,255,255,.7);border-radius:1.4rem;display:flex;align-items:center;justify-content:center;transition:all .15s;cursor:pointer}
.g-mundo-x17 .x17-sl.hot{background:#FFF3BF;border-color:var(--yellow);transform:scale(1.06)}
.g-mundo-x17 .x17-sl.filled{border-style:solid;border-color:var(--green);background:#E8F9EC}
.g-mundo-x17 .x17-sl.hint{animation:pulse .7s 6}
.g-mundo-x17 .x17-num{position:absolute;left:50%;top:-.9rem;transform:translateX(-50%);width:1.8rem;height:1.8rem;border-radius:50%;background:var(--g);color:#fff;font-family:'Baloo 2';font-weight:800;font-size:1.2rem;line-height:1.8rem;text-align:center;z-index:2}
.g-mundo-x17 .x17-arr{width:clamp(1rem,3.4vmin,1.8rem);flex:none;color:var(--g)}
.g-mundo-x17 .x17-arr svg{width:100%;display:block}
.g-mundo-x17 .x17-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:.7rem;background:rgba(255,255,255,.8);border-radius:1.8rem;padding:.7rem;min-height:calc(var(--cw) + 2.8rem);width:100%;max-width:44rem}
.g-mundo-x17 .x17-card{width:var(--cw);background:#fff;border:.2rem solid var(--line);border-radius:1.2rem;box-shadow:0 .3rem 0 var(--line);padding:.2rem;display:flex;flex-direction:column;align-items:center;font-family:'Baloo 2';font-weight:800;font-size:clamp(.8rem,2.5vmin,1.15rem);line-height:1.1}
.g-mundo-x17 .x17-card svg{width:100%;aspect-ratio:1;display:block;pointer-events:none}
.g-mundo-x17 .x17-card.sel{border-color:var(--yellow);background:#FFF7D1;transform:translateY(-.3rem)}
.g-mundo-x17 .x17-card.hint{animation:bounce .6s 5}
.g-mundo-x17 .x17-sl .x17-card{border:0;box-shadow:none;background:transparent;width:100%;height:100%;justify-content:center}
@media (max-width:560px){.g-mundo-x17 .x17-arr{display:none}.g-mundo-x17 .x17-row{gap:.25rem}}
`);

const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg>';

/* ronda de elegir: opts [{k, html, text?}] */
function choose(g, o) {
  g.ask(o.ask);
  if (o.scene) g.area.appendChild(U.el(`<div class="x17-scene" role="img" aria-label="${o.sceneLabel || 'El cielo'}">${Kids.art.get(o.scene)}</div>`));
  if (o.ref) g.area.appendChild(U.el(`<div class="x17-ref"><div class="pic big" role="img" aria-label="${o.refLabel || ''}">${o.ref}</div></div>`));
  const box = U.el(`<div class="opts x17-opts ${o.big ? 'big' : ''}"></div>`);
  let right = null;
  U.shuffle(o.opts).forEach(op => {
    const b = op.text
      ? U.el(`<button class="ans" aria-label="${U.esc(op.text)}">${U.esc(op.text)}</button>`)
      : U.el(`<button class="pic" aria-label="${U.esc(op.label)}">${op.html}<span class="lbl">${U.esc(op.label)}</span></button>`);
    if (op.k === o.correct) right = b;
    b.onclick = () => {
      if (b.disabled) return;
      if (op.k === o.correct) { b.classList.add('right'); box.querySelectorAll('button').forEach(x => x.disabled = true); g.right(o.praise); }
      else { b.classList.add('bad'); b.disabled = true; g.wrong('Mmm, casi. ¡Prueba otra vez!'); }
    };
    box.appendChild(b);
  });
  g.area.appendChild(box);
  g.helpHint = () => { right.style.animation = 'bounce .6s 5'; g.toast(o.help || 'Mira bien el dibujo'); };
}
const celest = k => ({ k, html: Kids.art.get({ sol: 'sun', luna: 'moon', est: 'star', nube: 'cloud' }[k]), label: { sol: 'El Sol', luna: 'La Luna', est: 'Las estrellas', nube: 'La nube' }[k] });

let seq = [];
Kids.game({
  id: 'mundo-x17', group: 'mundo', num: 20,
  title: 'El cielo',
  blurb: 'Descubre el sol, la luna, las estrellas y los planetas.',
  how: 'Mira el cielo y toca la respuesta correcta. En el nivel difícil, ordena los planetas desde el Sol.',
  icon: 'moon',
  levels: ['Sol, luna y estrellas', 'Los planetas', 'Orden y tamaños'],
  rounds: 6,
  round(g, i) {
    if (i === 0) seq = [];
    if (g.level === 1) return lv1(g, i);
    if (g.level === 2) return lv2(g, i);
    return i % 2 === 0 ? order(g) : compare(g);
  }
});

function lv1(g, i) {
  if (!seq.length) seq = U.shuffle(['dia', 'noche', 'sol', 'luna', 'est', 'solDia']);
  const t = seq.pop();
  if (t === 'dia' || t === 'noche') {
    return choose(g, { ask: '¿Es de día o de noche?', scene: t === 'dia' ? 'wx17-day' : 'wx17-night', sceneLabel: t === 'dia' ? 'Un cielo de día' : 'Un cielo de noche',
      opts: [{ k: 'dia', html: Kids.art.get('sun'), label: 'Día' }, { k: 'noche', html: Kids.art.get('moon'), label: 'Noche' }], correct: t,
      help: t === 'dia' ? 'Mira, ¡hay sol y el cielo es azul!' : 'Mira, ¡hay luna y estrellas!' });
  }
  if (t === 'solDia') return choose(g, { ask: 'Si brilla el Sol, ¿es de día o de noche?', scene: 'wx17-day', opts: [{ k: 'dia', html: Kids.art.get('sun'), label: 'Día' }, { k: 'noche', html: Kids.art.get('moon'), label: 'Noche' }], correct: 'dia', help: 'El Sol sale de día.' });
  if (t === 'sol') return choose(g, { ask: '¿Qué nos da luz y calor durante el día?', scene: 'wx17-day', opts: ['sol', 'luna', 'est'].map(celest), correct: 'sol', help: 'Es amarillo y muy brillante.' });
  if (t === 'luna') return choose(g, { ask: '¿Qué brilla de noche?', scene: 'wx17-night', opts: ['luna', 'sol', 'nube'].map(celest), correct: 'luna', help: 'De noche sale la Luna.' });
  return choose(g, { ask: '¿Cómo se llaman los puntitos que brillan en el cielo de noche?', scene: 'wx17-night', opts: ['est', 'sol', 'luna'].map(celest), correct: 'est', help: 'Son muchos puntitos pequeñitos.' });
}

function lv2(g, i) {
  if (!seq.length) seq = U.shuffle(['saturno', 'marte', 'tierra', 'jupiter']);
  if (i % 2 === 0) {
    const k = seq.pop();
    return choose(g, { ask: LOOKS[k], opts: ['saturno', 'marte', 'tierra', 'jupiter'].map(p => ({ k: p, html: art(p), label: lab(p) })), correct: k,
      help: { saturno: 'Busca el que lleva anillos.', marte: 'Marte es el planeta rojo.', tierra: 'Es el azul con manchas verdes.', jupiter: 'Es el grande con rayas.' }[k], big: true });
  }
  const k = seq.length ? seq.pop() : U.pick(['saturno', 'marte', 'tierra', 'jupiter']);
  const names = U.shuffle(['saturno', 'marte', 'tierra', 'jupiter'].filter(p => p !== k)).slice(0, 2).concat([k]);
  choose(g, { ask: '¿Cómo se llama este planeta?', ref: art(k), refLabel: 'Un planeta', opts: names.map(p => ({ k: p, text: lab(p) })), correct: k,
    help: { saturno: 'Fíjate en sus anillos.', marte: 'Es rojo.', tierra: 'Es azul y verde: nuestro hogar.', jupiter: 'Tiene bandas de colores.' }[k] });
}

function compare(g) {
  const bank = [['sol', 'tierra', 'sol'], ['jupiter', 'tierra', 'jupiter'], ['tierra', 'luna', 'tierra'], ['sol', 'marte', 'sol'], ['saturno', 'marte', 'saturno'], ['jupiter', 'mercurio', 'jupiter']];
  const near = [['mercurio', 'marte', 'mercurio'], ['tierra', 'marte', 'tierra'], ['venus', 'tierra', 'venus'], ['mercurio', 'tierra', 'mercurio']];
  if (!seq.length) seq = U.shuffle(['b', 'n', 'b']);
  const t = seq.pop();
  const it = U.pick(t === 'b' ? bank : near);
  const q = t === 'b' ? `¿Cuál es más grande: ${P[it[0]].d} o ${P[it[1]].d}?` : `¿Cuál está más cerca del Sol: ${P[it[0]].d} o ${P[it[1]].d}?`;
  choose(g, { ask: q, opts: [it[0], it[1]].map(p => ({ k: p, html: art(p), label: lab(p) })), correct: it[2], big: true,
    help: t === 'b' ? 'Piensa: ¡algunos son enormes!' : 'El orden es: Mercurio, Venus, Tierra, Marte.' });
}

function order(g) {
  g.ask('Pon los planetas en orden, empezando por el más cercano al Sol.');
  const row = U.el('<div class="x17-row"></div>');
  row.appendChild(U.el(`<div class="x17-sun">${Kids.art.get('sun')}<span>Sol</span></div>`));
  ORDER.forEach((p, k) => {
    row.appendChild(U.el(`<span class="x17-arr">${ARROW}</span>`));
    row.appendChild(U.el(`<div class="x17-sl" role="button" tabindex="0" data-k="${k}" aria-label="Lugar ${k + 1}"><span class="x17-num">${k + 1}</span></div>`));
  });
  g.area.appendChild(row);
  const tray = U.el('<div class="x17-tray"></div>'); g.area.appendChild(tray);
  const slots = Array.from(row.querySelectorAll('.x17-sl'));
  let sel = null, remaining = ORDER.length;
  const clear = () => { if (sel) sel.classList.remove('sel'); sel = null; };
  function attempt(card, slot) {
    if (slot.classList.contains('filled')) { g.toast('Ese lugar ya está ocupado'); return false; }
    if (+card.dataset.k === +slot.dataset.k) {
      clear(); card.dataset.locked = '1'; card.classList.remove('hint', 'sel', 'dragging'); card.style.transform = '';
      slot.classList.add('filled'); slot.classList.remove('hint'); slot.appendChild(card); Kids.sound.pop();
      if (--remaining === 0) { g.say('¡Muy bien, los planetas están en orden!'); g.t(() => g.right('¡Planetas en orden!'), 500); }
      return true;
    }
    g.shake(card); g.wrong('Mmm, ese no va ahí. ¡Piensa cuál está más cerca del Sol!'); return false;
  }
  g.helpHint = () => {
    const k = slots.findIndex(s => !s.classList.contains('filled')); if (k < 0) return;
    const c = tray.querySelector(`[data-k="${k}"]`); slots[k].classList.add('hint'); if (c) c.classList.add('hint');
    g.toast('Aquí va ' + P[ORDER[k]].d); g.t(() => { slots[k].classList.remove('hint'); if (c) c.classList.remove('hint'); }, 3800);
  };
  U.shuffle(ORDER.map((p, k) => k)).forEach(k => {
    const p = ORDER[k];
    const card = U.el(`<button class="x17-card" data-k="${k}" aria-label="${lab(p)}">${art(p)}<span>${lab(p)}</span></button>`);
    tray.appendChild(card);
    Kids.drag(card, {
      targets: () => slots.filter(x => !x.classList.contains('filled')),
      onStart: () => clear(), onDrop: (s, el) => attempt(el, s),
      onTap: el => { clear(); sel = el; el.classList.add('sel'); }
    });
  });
  slots.forEach(sl => {
    const act = () => { if (sel) attempt(sel, sl); else g.toast('Toca primero un planeta'); };
    sl.addEventListener('click', act);
    sl.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
  });
}
})();
