/* Lectura x6 — Contrarios */
(function () {
'use strict';
const U = Kids.util;

const SH = '<ellipse cx="50" cy="92" rx="26" ry="5" fill="#14235B" opacity=".08"/>';
Kids.art.add({
  'lx6-hot': '<svg viewBox="0 0 100 100">' + SH + '<path d="M22 44h48v22a24 24 0 0 1-24 24h0a24 24 0 0 1-24-24z" fill="#FF8F6B"/><path d="M70 50h6a9 9 0 0 1 0 18h-8" fill="none" stroke="#FF8F6B" stroke-width="7" stroke-linecap="round"/><ellipse cx="46" cy="44" rx="24" ry="5" fill="#8A4B2F"/><g fill="none" stroke="#E4572E" stroke-width="5" stroke-linecap="round"><path d="M34 32q-6-8 0-14t0-10"/><path d="M48 32q-6-8 0-14t0-10"/><path d="M62 32q-6-8 0-14t0-10"/></g><circle cx="38" cy="67" r="3" fill="#14235B"/><circle cx="54" cy="67" r="3" fill="#14235B"/><path d="M41 74q5 5 10 0" fill="none" stroke="#14235B" stroke-width="2.5" stroke-linecap="round"/></svg>',
  'lx6-full': '<svg viewBox="0 0 100 100">' + SH + '<path d="M26 14h48l-6 74H32z" fill="#E8F6FF" stroke="#9CC5EE" stroke-width="3" stroke-linejoin="round"/><path d="M28.5 22h43l-4.8 62H33.3z" fill="#5BB4F0"/><path d="M40 40q10-6 20 0" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/><circle cx="42" cy="56" r="3" fill="#14235B"/><circle cx="58" cy="56" r="3" fill="#14235B"/><path d="M44 64q6 6 12 0" fill="none" stroke="#14235B" stroke-width="2.5" stroke-linecap="round"/></svg>',
  'lx6-empty': '<svg viewBox="0 0 100 100">' + SH + '<path d="M26 14h48l-6 74H32z" fill="#F3FAFF" stroke="#9CC5EE" stroke-width="3" stroke-linejoin="round"/><path d="M33 70h34l-1 14H34z" fill="#CBE7FA" opacity=".6"/><path d="M34 22l3 40" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="42" cy="50" r="3" fill="#14235B"/><circle cx="58" cy="50" r="3" fill="#14235B"/><path d="M44 62q6-5 12 0" fill="none" stroke="#14235B" stroke-width="2.5" stroke-linecap="round"/></svg>',
  'lx6-open': '<svg viewBox="0 0 100 100"><rect x="18" y="10" width="64" height="82" rx="6" fill="#2F2A5E"/><path d="M18 10l40 8v70l-40 4z" fill="#C98B52" stroke="#A56A35" stroke-width="3" stroke-linejoin="round"/><circle cx="48" cy="54" r="3.5" fill="#FFD23F"/><path d="M26 28l20 3M26 60l20 2" stroke="#A56A35" stroke-width="3" stroke-linecap="round"/><path d="M62 30q6 4 0 8M70 28q8 6 0 12" fill="none" stroke="#FFD23F" stroke-width="3" stroke-linecap="round"/></svg>',
  'lx6-closed': '<svg viewBox="0 0 100 100"><rect x="18" y="10" width="64" height="82" rx="6" fill="#A56A35"/><rect x="24" y="16" width="52" height="70" rx="4" fill="#C98B52"/><path d="M24 40h52M24 62h52" stroke="#A56A35" stroke-width="3"/><circle cx="66" cy="54" r="4" fill="#FFD23F"/></svg>',
  'lx6-up': '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="#CFE6FB"/><path d="M50 22l24 28H59v26H41V50H26z" fill="#4C8DF6" stroke="#fff" stroke-width="3" stroke-linejoin="round"/></svg>',
  'lx6-down': '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="#FFD9E2"/><path d="M50 78L26 50h15V24h18v26h15z" fill="#F0587F" stroke="#fff" stroke-width="3" stroke-linejoin="round"/></svg>',
  'lx6-long': '<svg viewBox="0 0 100 100"><g transform="rotate(-38 50 50)"><rect x="-4" y="40" width="108" height="20" rx="4" fill="#FFD23F"/><path d="M-4 50l-10 0" stroke="#FFD23F"/><rect x="-4" y="40" width="16" height="20" rx="4" fill="#FF8FA3"/><path d="M96 40l12 10-12 10z" fill="#F4D6A8"/><path d="M104 46l4 4-4 4z" fill="#14235B"/></g></svg>',
  'lx6-short': '<svg viewBox="0 0 100 100"><g transform="rotate(-38 50 50)"><rect x="30" y="40" width="30" height="20" rx="4" fill="#FFD23F"/><rect x="30" y="40" width="9" height="20" rx="3" fill="#FF8FA3"/><path d="M60 40l11 10-11 10z" fill="#F4D6A8"/><path d="M67 46l4 4-4 4z" fill="#14235B"/></g></svg>',
  'lx6-happy': '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#FFD23F"/><circle cx="36" cy="42" r="5" fill="#14235B"/><circle cx="64" cy="42" r="5" fill="#14235B"/><path d="M28 58q22 28 44 0z" fill="#fff" stroke="#14235B" stroke-width="3.5" stroke-linejoin="round"/><circle cx="26" cy="56" r="5" fill="#FF9AA2" opacity=".7"/><circle cx="74" cy="56" r="5" fill="#FF9AA2" opacity=".7"/></svg>',
  'lx6-sad': '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#BFD9F5"/><circle cx="36" cy="44" r="5" fill="#14235B"/><circle cx="64" cy="44" r="5" fill="#14235B"/><path d="M32 70q18-18 36 0" fill="none" stroke="#14235B" stroke-width="4" stroke-linecap="round"/><path d="M30 54q-3 8 0 12q3-4 0-12z" fill="#5BB4F0"/><path d="M28 36l12 4M72 36l-12 4" stroke="#14235B" stroke-width="3.5" stroke-linecap="round"/></svg>'
});

/* pares con dibujo: [palabra A, dibujo A, palabra B, dibujo B] */
const PIC = [
  ['grande', 'elephant', 'pequeño', 'mouse'],
  ['día', 'sun', 'noche', 'moon'],
  ['frío', 'snowflake', 'caliente', 'lx6-hot'],
  ['arriba', 'lx6-up', 'abajo', 'lx6-down'],
  ['lleno', 'lx6-full', 'vacío', 'lx6-empty'],
  ['abierto', 'lx6-open', 'cerrado', 'lx6-closed'],
  ['largo', 'lx6-long', 'corto', 'lx6-short'],
  ['feliz', 'lx6-happy', 'triste', 'lx6-sad']
];
/* solo palabras */
const WORDS = [
  ['feliz', 'triste'], ['rápido', 'lento'], ['duro', 'blando'], ['alto', 'bajo'], ['gordo', 'delgado'], ['limpio', 'sucio'],
  ['nuevo', 'viejo'], ['mojado', 'seco'], ['dentro', 'fuera'], ['mucho', 'poco'], ['bueno', 'malo'], ['ligero', 'pesado'],
  ['claro', 'oscuro'], ['subir', 'bajar'], ['entrar', 'salir'], ['reír', 'llorar'], ['grande', 'pequeño'], ['frío', 'caliente'],
  ['día', 'noche'], ['lleno', 'vacío'], ['abierto', 'cerrado'], ['empezar', 'terminar'], ['despierto', 'dormido'], ['cerca', 'lejos']
];
const COLS = ['#8C7BE0', '#47B5BF', '#F2B93B', '#F0587F', '#5CC77A', '#4C8DF6'];
let last = '';

Kids.css(`
.g-lectura-x6{gap:.8rem}
.g-lectura-x6 .x6-board{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:0 clamp(3rem,16vw,9rem);width:min(46rem,100%)}
.g-lectura-x6 .x6-col{display:flex;flex-direction:column;gap:var(--gap,.7rem);justify-content:center}
.g-lectura-x6 .x6-lines{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible;z-index:3}
.g-lectura-x6 .x6-card{flex-direction:row;justify-content:flex-start;gap:.7rem;padding:.3rem .9rem .3rem .4rem;min-height:var(--h,4.6rem);width:100%;font-size:clamp(1.3rem,4.4vmin,1.9rem);border-radius:1.4rem;position:relative}
.g-lectura-x6 .x6-card.wo{justify-content:center;padding:.3rem .8rem;font-size:clamp(1.5rem,5vmin,2.2rem)}
.g-lectura-x6 .x6-card .ic{width:var(--ic,3.6rem);height:var(--ic,3.6rem);flex:none}
.g-lectura-x6 .x6-card .ic svg{width:100%;height:100%;max-width:none;max-height:none}
.g-lectura-x6 .x6-card .dot{position:absolute;top:50%;width:.9rem;height:.9rem;border-radius:50%;background:#fff;border:.2rem solid var(--line);transform:translateY(-50%)}
.g-lectura-x6 .x6-col.L .dot{right:-.55rem}.g-lectura-x6 .x6-col.R .dot{left:-.55rem}
.g-lectura-x6 .x6-card.sel{border-color:var(--g);background:var(--gl);transform:scale(1.04);box-shadow:0 .4rem 0 var(--g)}
.g-lectura-x6 .x6-card.done{background:#EAFBEE;border-color:#5CC77A;pointer-events:none}
.g-lectura-x6 .x6-card.done .dot{background:var(--c);border-color:var(--c)}
.g-lectura-x6 .x6-card.hint{animation:pulse 1s infinite;border-color:#5CC77A}
.g-lectura-x6 .x6-tip{font-size:1.05rem;color:var(--ink2);text-align:center}
`);

Kids.game({
  id: 'lectura-x6', group: 'lectura', num: 10,
  title: 'Contrarios', icon: 'sun', rounds: 3,
  blurb: 'Une cada cosa con su contraria: grande con pequeño, día con noche…',
  how: 'Toca una tarjeta y luego toca su contraria. Por ejemplo, grande con pequeño.',
  levels: ['3 pares con dibujo', '5 pares con dibujo', '6 pares de palabras'],
  stars(m, r) { return m <= 2 ? 3 : m <= 6 ? 2 : 1; },
  round(g, i) {
    const lv = g.level;
    let pairs;
    if (lv === 3) pairs = U.sample(WORDS, 6).map(p => ({ a: { w: p[0] }, b: { w: p[1] } }));
    else pairs = U.sample(PIC, lv === 1 ? 3 : 5).map(p => ({ a: { w: p[0], art: p[1] }, b: { w: p[2], art: p[3] } }));
    const sig = pairs.map(p => p.a.w).join();
    pairs.forEach((p, k) => { p.id = k; p.col = COLS[k % COLS.length]; if (Math.random() < .5) { const t = p.a; p.a = p.b; p.b = t; } });
    const n = pairs.length, hasArt = lv < 3;
    const L = U.shuffle(pairs.map(p => ({ p, it: p.a }))), R = U.shuffle(pairs.map(p => ({ p, it: p.b })));
    g.ask(lv === 3 ? 'Une cada palabra con su contraria' : 'Une cada cosa con su contraria');
    const board = U.el('<div class="x6-board"></div>');
    const h = n >= 6 ? 4.1 : n === 5 ? 4.5 : 5.4, ic = n >= 6 ? 3 : n === 5 ? 3.6 : 4.4;
    board.style.setProperty('--h', h + 'rem'); board.style.setProperty('--ic', ic + 'rem');
    board.style.setProperty('--gap', n >= 6 ? '.6rem' : '.8rem');
    const cols = [U.el('<div class="x6-col L"></div>'), U.el('<div class="x6-col R"></div>')];
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('class', 'x6-lines');
    const cards = [];
    [L, R].forEach((side, s) => side.forEach(o => {
      const b = U.el(`<button class="pic x6-card ${hasArt ? '' : 'wo'}" aria-label="${U.esc(o.it.w)}">${hasArt ? '<span class="ic">' + Kids.art.get(o.it.art) + '</span>' : ''}<span class="lbl">${U.esc(o.it.w)}</span><i class="dot"></i></button>`);
      b._p = o.p; b._s = s; b._w = o.it.w; cols[s].appendChild(b); cards.push(b);
    }));
    board.appendChild(cols[0]); board.appendChild(cols[1]); board.appendChild(svg);
    g.area.appendChild(board);
    g.area.appendChild(U.el('<div class="x6-tip">Toca una tarjeta y después su contraria</div>'));
    let sel = null, found = 0; const links = [];
    function draw() {
      svg.innerHTML = ''; const br = board.getBoundingClientRect();
      links.forEach(([a, b, col]) => {
        const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        const l = a._s === 0 ? [a, b] : [b, a], r1 = l[0].getBoundingClientRect(), r2 = l[1].getBoundingClientRect();
        const x1 = r1.right - br.left, y1 = r1.top + r1.height / 2 - br.top, x2 = r2.left - br.left, y2 = r2.top + r2.height / 2 - br.top;
        const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        p.setAttribute('d', `M${x1} ${y1} C${x1 + 40} ${y1},${x2 - 40} ${y2},${x2} ${y2}`);
        p.setAttribute('fill', 'none'); p.setAttribute('stroke', col); p.setAttribute('stroke-width', '7'); p.setAttribute('stroke-linecap', 'round');
        svg.appendChild(p);
      });
    }
    if (window.ResizeObserver) new ResizeObserver(draw).observe(board);
    cards.forEach(c => c.onclick = () => {
      if (c.classList.contains('done')) return;
      g.say(c._w);
      if (!sel) { sel = c; c.classList.add('sel'); Kids.sound.tap(); return; }
      if (sel === c) { c.classList.remove('sel'); sel = null; return; }
      if (sel._s === c._s) { sel.classList.remove('sel'); sel = c; c.classList.add('sel'); Kids.sound.tap(); return; }
      const a = sel; sel = null; a.classList.remove('sel');
      if (a._p === c._p) {
        [a, c].forEach(x => { x.classList.add('done', 'pop'); x.style.setProperty('--c', a._p.col); });
        links.push([a, c, a._p.col]); draw(); found++; Kids.sound.pop();
        g.toast(`<b>${U.esc(a._w)}</b> y <b>${U.esc(c._w)}</b> son contrarios`);
        if (found === n) g.t(() => g.right(), 500);
      } else {
        g.shake(a); g.shake(c); g.wrong('Esas no son contrarias. ¡Prueba otra!');
      }
    });
    g.helpHint = () => {
      const p = pairs.find(q => !cards.find(c => c._p === q && c.classList.contains('done')));
      if (!p) return; cards.filter(c => c._p === p).forEach(c => { c.classList.add('hint'); g.t(() => c.classList.remove('hint'), 3500); });
      g.toast('Mira las tarjetas que brillan');
    };
  }
});
})();
