/* Lectura x14 — ¿Quién hace qué? */
(function () {
'use strict';
const U = Kids.util;

/* ---------- personitas ---------- */
const person = o => `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="96" rx="30" ry="3.6" fill="rgba(20,35,91,.1)"/>
  ${o.back || ''}
  <path d="M16 98Q18 66 50 64Q82 66 84 98Z" fill="${o.shirt}"/>${o.body || ''}
  <rect x="43" y="56" width="14" height="12" rx="5" fill="${o.skin}"/>
  <circle cx="27" cy="44" r="4.5" fill="${o.skin}"/><circle cx="73" cy="44" r="4.5" fill="${o.skin}"/>
  <circle cx="50" cy="42" r="23" fill="${o.skin}"/>
  ${o.hair || ''}
  <circle cx="41" cy="44" r="3" fill="#14235B"/><circle cx="59" cy="44" r="3" fill="#14235B"/>
  <circle cx="42" cy="43" r="1" fill="#fff"/><circle cx="60" cy="43" r="1" fill="#fff"/>
  <ellipse cx="34" cy="52" rx="4.4" ry="2.8" fill="#FF9DB5" opacity=".7"/><ellipse cx="66" cy="52" rx="4.4" ry="2.8" fill="#FF9DB5" opacity=".7"/>
  <path d="M43 52Q50 60 57 52" fill="none" stroke="#14235B" stroke-width="2.6" stroke-linecap="round"/>
  ${o.face || ''}${o.hat || ''}</svg>`;
const SK = ['#F6C9A0', '#F3B58F', '#FFD7B5', '#B97A4B', '#8A5A36'];
const hairSide = c => `<path d="M27 42Q26 22 50 21Q74 22 73 42Q66 30 50 31Q34 30 27 42Z" fill="${c}"/>`;

const PEOPLE = {
  medico: person({ skin: SK[1], shirt: '#F4F8FF', hair: hairSide('#6B3E1E'),
    body: '<path d="M42 66L50 80L58 66" fill="none" stroke="#B7C9E6" stroke-width="3"/><rect x="62" y="74" width="12" height="9" rx="2" fill="#fff" stroke="#B7C9E6" stroke-width="2"/><path d="M68 76v5M65.5 78.5h5" stroke="#E0584A" stroke-width="2"/>',
    hat: '<path d="M27 38Q27 14 50 14Q73 14 73 38Q50 29 27 38Z" fill="#5BC0C7"/><circle cx="50" cy="24" r="6" fill="#fff"/><path d="M50 20v8M46 24h8" stroke="#E0584A" stroke-width="2.4" stroke-linecap="round"/>' }),
  bombero: person({ skin: SK[3], shirt: '#E8453C', hair: '',
    body: '<path d="M20 90Q50 84 80 90M22 96Q50 90 78 96" stroke="#FFD23F" stroke-width="4" fill="none"/>',
    hat: '<path d="M24 38Q24 12 50 12Q76 12 76 38Z" fill="#E8453C"/><rect x="20" y="36" width="60" height="7" rx="3.5" fill="#C93228"/><path d="M50 16L56 26H44Z" fill="#FFD23F"/><rect x="47" y="12" width="6" height="8" rx="2" fill="#FFD23F"/>' }),
  cocinero: person({ skin: SK[0], shirt: '#fff', hair: hairSide('#2B1B12'),
    body: '<circle cx="42" cy="78" r="2.2" fill="#B7C9E6"/><circle cx="58" cy="78" r="2.2" fill="#B7C9E6"/><circle cx="42" cy="88" r="2.2" fill="#B7C9E6"/><circle cx="58" cy="88" r="2.2" fill="#B7C9E6"/><path d="M50 68V98" stroke="#E4E9F5" stroke-width="2"/>',
    hat: '<rect x="33" y="26" width="34" height="10" rx="3" fill="#fff" stroke="#E4E9F5" stroke-width="2"/><circle cx="36" cy="20" r="11" fill="#fff" stroke="#E4E9F5" stroke-width="2"/><circle cx="50" cy="14" r="12" fill="#fff" stroke="#E4E9F5" stroke-width="2"/><circle cx="64" cy="20" r="11" fill="#fff" stroke="#E4E9F5" stroke-width="2"/><rect x="34" y="24" width="32" height="11" rx="3" fill="#fff"/>' }),
  panadero: person({ skin: SK[2], shirt: '#E9B780', hair: hairSide('#8A5A32'),
    body: '<path d="M30 98V82Q50 76 70 82V98Z" fill="#fff" opacity=".9"/><circle cx="58" cy="70" r="2" fill="#fff"/><circle cx="68" cy="74" r="1.6" fill="#fff"/>',
    face: '<circle cx="62" cy="38" r="1.5" fill="#fff"/><circle cx="36" cy="50" r="1.3" fill="#fff"/>',
    hat: '<path d="M28 36Q26 16 50 14Q74 16 72 36Q50 28 28 36Z" fill="#fff" stroke="#E4E9F5" stroke-width="2"/>' }),
  jardinero: person({ skin: SK[1], shirt: '#5CB86B', hair: '',
    body: '<path d="M30 98V84H70V98Z" fill="#3E9A52"/><path d="M34 84L38 68M66 84L62 68" stroke="#3E9A52" stroke-width="5" stroke-linecap="round"/><rect x="42" y="88" width="16" height="10" rx="2" fill="#2F8043"/>',
    hat: '<ellipse cx="50" cy="30" rx="38" ry="9" fill="#F2D27A" stroke="#D4AF52" stroke-width="2"/><path d="M30 30Q30 10 50 10Q70 10 70 30Z" fill="#F2D27A"/><rect x="31" y="24" width="38" height="5" fill="#E0584A"/>' }),
  maestra: person({ skin: SK[0], shirt: '#B79CF0', back: '<circle cx="50" cy="16" r="9" fill="#7A4A26"/>',
    hair: '<path d="M26 44Q24 20 50 20Q76 20 74 44Q70 28 50 30Q30 28 26 44Z" fill="#7A4A26"/>',
    body: '<path d="M42 66L50 76L58 66" fill="#fff" opacity=".9"/>',
    face: '<g fill="none" stroke="#14235B" stroke-width="2.2"><circle cx="41" cy="44" r="7"/><circle cx="59" cy="44" r="7"/><path d="M48 44h4"/></g>' }),
  pintor: person({ skin: SK[2], shirt: '#fff', hair: hairSide('#1B1B1B'),
    body: '<circle cx="34" cy="80" r="4" fill="#E8453C"/><circle cx="52" cy="90" r="4" fill="#4C8DF6"/><circle cx="68" cy="78" r="4" fill="#FFD23F"/><circle cx="42" cy="92" r="3" fill="#5CC77A"/><path d="M38 66L50 74L62 66" fill="none" stroke="#E4E9F5" stroke-width="3"/>',
    face: '<path d="M44 55Q50 52 56 55" stroke="#1B1B1B" stroke-width="2.2" fill="none" stroke-linecap="round"/>',
    hat: '<ellipse cx="46" cy="22" rx="28" ry="10" fill="#E8453C" transform="rotate(-8 46 22)"/><circle cx="46" cy="11" r="3" fill="#C93228"/>' }),
  policia: person({ skin: SK[3], shirt: '#2F4B9A', hair: '',
    body: '<path d="M42 66L50 78L58 66" fill="#fff" opacity=".9"/><path d="M62 76l4 3 4-3v7l-4 3-4-3Z" fill="#FFD23F"/><rect x="46" y="78" width="8" height="3" fill="#FFD23F"/>',
    hat: '<path d="M26 36Q26 14 50 14Q74 14 74 36Z" fill="#2F4B9A"/><rect x="22" y="34" width="56" height="7" rx="3.5" fill="#1F356F"/><path d="M50 18l4 3-4 6-4-6Z" fill="#FFD23F"/>' }),
  granjero: person({ skin: SK[0], shirt: '#E0584A', hair: hairSide('#B8742E'),
    body: '<path d="M30 98V84H70V98Z" fill="#4C8DF6"/><path d="M34 84L38 68M66 84L62 68" stroke="#4C8DF6" stroke-width="5" stroke-linecap="round"/><path d="M26 76h14M62 76h14M24 88h12M64 90h12" stroke="#fff" stroke-width="3" opacity=".6"/>',
    hat: '<ellipse cx="50" cy="28" rx="36" ry="8" fill="#F2D27A" stroke="#D4AF52" stroke-width="2"/><path d="M32 28Q32 12 50 12Q68 12 68 28Z" fill="#F2D27A"/>' }),
  mecanico: person({ skin: SK[4], shirt: '#3E6FD8', hair: '',
    body: '<path d="M30 98V82H70V98Z" fill="#2E5BBF"/><path d="M34 82L38 68M66 82L62 68" stroke="#2E5BBF" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="90" r="3" fill="#FFD23F"/>',
    face: '<path d="M62 36q3 2 1 5" stroke="#14235B" stroke-width="2" fill="none" opacity=".5"/><rect x="30" y="50" width="6" height="3" rx="1.5" fill="#14235B" opacity=".3"/>',
    hat: '<path d="M27 36Q27 14 50 14Q73 14 73 36Z" fill="#3E6FD8"/><path d="M62 36H88Q86 42 76 42H62Z" fill="#2E5BBF"/>' })
};

/* ---------- herramientas ---------- */
const TS = '<ellipse cx="50" cy="94" rx="30" ry="3.6" fill="rgba(20,35,91,.1)"/>';
const TOOLS = {
  estetoscopio: `<svg viewBox="0 0 100 100">${TS}<path d="M28 12V36Q28 54 50 54Q72 54 72 36V12" fill="none" stroke="#5A6B8C" stroke-width="5" stroke-linecap="round"/><circle cx="28" cy="11" r="4.5" fill="#B7C2D8"/><circle cx="72" cy="11" r="4.5" fill="#B7C2D8"/><path d="M50 54V68" stroke="#5A6B8C" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="78" r="13" fill="#C7D0E0" stroke="#5A6B8C" stroke-width="4"/><circle cx="50" cy="78" r="6" fill="#8FA0C0"/></svg>`,
  manguera: `<svg viewBox="0 0 100 100">${TS}<path d="M10 80Q12 56 34 62Q52 68 46 82Q40 94 24 88" fill="none" stroke="#E8453C" stroke-width="9" stroke-linecap="round"/><path d="M46 66L70 46" stroke="#E8453C" stroke-width="9" stroke-linecap="round"/><rect x="62" y="34" width="14" height="20" rx="4" fill="#FFD23F" transform="rotate(40 69 44)"/><g fill="#7FCBF2"><circle cx="86" cy="26" r="4"/><circle cx="92" cy="40" r="3.5"/><circle cx="80" cy="14" r="3"/><circle cx="92" cy="14" r="2.5"/></g></svg>`,
  olla: `<svg viewBox="0 0 100 100">${TS}<path d="M38 24Q34 14 40 8M52 24Q48 14 54 6M66 24Q62 14 68 8" stroke="#CFD8E8" stroke-width="4" fill="none" stroke-linecap="round"/><rect x="14" y="46" width="12" height="8" rx="4" fill="#7E8BA8"/><rect x="74" y="46" width="12" height="8" rx="4" fill="#7E8BA8"/><path d="M22 36H78V76Q78 90 64 90H36Q22 90 22 76Z" fill="#A9B6CE" stroke="#7E8BA8" stroke-width="3"/><path d="M18 36Q50 24 82 36" fill="#C7D0E0" stroke="#7E8BA8" stroke-width="3"/><circle cx="50" cy="28" r="4.5" fill="#7E8BA8"/><path d="M30 46V74" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".5"/></svg>`,
  pan: `<svg viewBox="0 0 100 100">${TS}<path d="M10 62Q10 28 50 28Q90 28 90 62Q90 82 70 84H30Q10 82 10 62Z" fill="#E9A84F" stroke="#C98A34" stroke-width="3"/><path d="M28 40L38 54M48 34L58 50M68 40L78 54" stroke="#F8D49A" stroke-width="5.5" stroke-linecap="round"/></svg>`,
  regadera: `<svg viewBox="0 0 100 100">${TS}<path d="M22 40H62L66 82Q66 88 60 88H26Q20 88 20 82Z" fill="#4FA95E" stroke="#3A8A48" stroke-width="3"/><path d="M62 54L88 32" stroke="#3A8A48" stroke-width="7" stroke-linecap="round"/><path d="M82 24L96 40L88 44L78 30Z" fill="#6CCB7A" stroke="#3A8A48" stroke-width="2"/><path d="M24 44Q2 44 6 66Q8 74 22 70" fill="none" stroke="#3A8A48" stroke-width="6" stroke-linecap="round"/><g fill="#7FCBF2"><circle cx="88" cy="56" r="3"/><circle cx="94" cy="64" r="2.6"/><circle cx="82" cy="66" r="2.6"/></g></svg>`,
  pizarra: `<svg viewBox="0 0 100 100">${TS}<rect x="8" y="14" width="84" height="62" rx="7" fill="#2F7D59" stroke="#C48A52" stroke-width="6"/><path d="M8 82H92" stroke="#C48A52" stroke-width="5" stroke-linecap="round"/><text x="50" y="56" font-family="'Baloo 2',Nunito,sans-serif" font-weight="800" font-size="26" text-anchor="middle" fill="#fff">A B C</text><rect x="62" y="76" width="14" height="5" rx="2" fill="#fff"/></svg>`,
  pincel: `<svg viewBox="0 0 100 100">${TS}<g transform="rotate(40 50 50)"><rect x="43" y="6" width="14" height="46" rx="7" fill="#E8453C"/><rect x="42" y="50" width="16" height="12" fill="#C7D0E0"/><path d="M42 62H58Q60 78 50 90Q40 78 42 62Z" fill="#4C8DF6"/></g><circle cx="22" cy="82" r="7" fill="#4C8DF6" opacity=".8"/></svg>`,
  silbato: `<svg viewBox="0 0 100 100">${TS}<path d="M20 20Q40 4 60 24" fill="none" stroke="#2F4B9A" stroke-width="3" stroke-linecap="round"/><circle cx="40" cy="62" r="22" fill="#FFD23F" stroke="#E0A800" stroke-width="3"/><rect x="52" y="48" width="38" height="20" rx="7" fill="#FFD23F" stroke="#E0A800" stroke-width="3"/><circle cx="36" cy="60" r="7" fill="#fff" opacity=".85"/><rect x="62" y="40" width="10" height="8" rx="3" fill="#E0A800"/></svg>`,
  llave: `<svg viewBox="0 0 100 100">${TS}<g transform="rotate(-40 50 50)"><rect x="43" y="30" width="14" height="62" rx="7" fill="#9AA7BE" stroke="#6F7E9B" stroke-width="3"/><path d="M32 10H44V24H56V10H68V28Q68 38 50 38Q32 38 32 28Z" fill="#9AA7BE" stroke="#6F7E9B" stroke-width="3" stroke-linejoin="round"/><circle cx="50" cy="82" r="3" fill="#fff" opacity=".7"/></g></svg>`
};
Kids.art.add(Object.fromEntries(Object.entries(PEOPLE).map(([k, v]) => ['lx14-' + k, v]).concat(Object.entries(TOOLS).map(([k, v]) => ['lx14-t-' + k, v]))));

/* n = persona, t = herramienta; q = pregunta de nivel 3 */
const R = [
  { id: 'medico', n: 'el médico', t: 'el estetoscopio', ta: 'lx14-t-estetoscopio', q: '¿Quién cura a los enfermos?' },
  { id: 'bombero', n: 'el bombero', t: 'la manguera', ta: 'lx14-t-manguera', q: '¿Quién apaga los incendios?' },
  { id: 'cocinero', n: 'el cocinero', t: 'la olla', ta: 'lx14-t-olla', q: '¿Quién prepara la comida en el restaurante?' },
  { id: 'panadero', n: 'el panadero', t: 'el pan', ta: 'lx14-t-pan', q: '¿Quién hornea el pan?' },
  { id: 'jardinero', n: 'el jardinero', t: 'la regadera', ta: 'lx14-t-regadera', q: '¿Quién cuida las flores del jardín?' },
  { id: 'maestra', n: 'la maestra', t: 'la pizarra', ta: 'lx14-t-pizarra', q: '¿Quién nos enseña en el cole?' },
  { id: 'pintor', n: 'el pintor', t: 'el pincel', ta: 'lx14-t-pincel', q: '¿Quién pinta cuadros?' },
  { id: 'policia', n: 'el policía', t: 'el silbato', ta: 'lx14-t-silbato', q: '¿Quién ayuda con el tráfico en la calle?' },
  { id: 'granjero', n: 'el granjero', t: 'la vaca', ta: 'cow', q: '¿Quién cuida los animales de la granja?' },
  { id: 'mecanico', n: 'el mecánico', t: 'la llave inglesa', ta: 'lx14-t-llave', q: '¿Quién arregla los coches?' }
];
const LINE = ['#E8453C', '#3D8BEF', '#E0A800', '#2E9E4F', '#9B6BE0', '#E86A9A'];

Kids.css(`
.g-lectura-x14{gap:.8rem}
.g-lectura-x14 .x14-board{position:relative;display:grid;grid-template-columns:1fr 1fr;column-gap:clamp(2.2rem,12vw,7rem);row-gap:.55rem;width:100%;max-width:38rem;align-content:center}
.g-lectura-x14 .x14-board .col{display:flex;flex-direction:column;gap:.55rem;justify-content:center}
.g-lectura-x14 .x14-t{display:flex;align-items:center;gap:.5rem;background:#fff;border-radius:1.3rem;padding:.2rem .6rem .2rem .3rem;box-shadow:0 .3rem 0 var(--line);border:.2rem solid var(--line);min-height:clamp(4.2rem,11.5vh,5.8rem);text-align:left;font-family:'Baloo 2';font-size:clamp(1rem,3.2vmin,1.5rem);line-height:1.05;transition:transform .12s,background .2s;position:relative;z-index:2}
.g-lectura-x14 .x14-t .im{width:clamp(3.2rem,9vh,4.8rem);height:clamp(3.2rem,9vh,4.8rem);flex:none;border-radius:1rem;background:var(--gl);padding:.15rem}
.g-lectura-x14 .x14-t .im svg{width:100%;height:100%}
.g-lectura-x14 .x14-t.sel{border-color:var(--ink);background:#FFF3BF;transform:scale(1.05)}
.g-lectura-x14 .x14-t.hint{animation:pulse 1s infinite;outline:.25rem solid #5CC77A}
.g-lectura-x14 .x14-t.ok{background:#E8F9EC}
.g-lectura-x14 .x14-t.ok[disabled]{opacity:1}
.g-lectura-x14 .x14-t.bad{animation:shake .4s}
.g-lectura-x14 svg.x14-lines{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:visible}
.g-lectura-x14 .x14-q{display:grid;grid-template-columns:repeat(2,minmax(0,13rem));gap:.9rem;justify-content:center}
.g-lectura-x14 .x14-q .pic{padding:.4rem;min-height:clamp(8rem,22vh,12rem)}
.g-lectura-x14 .x14-q .pic svg{max-width:7.5rem;max-height:7.5rem;width:100%;height:100%;flex:1;min-height:0}
.g-lectura-x14 .x14-q .pic .lbl{font-size:clamp(1.1rem,3.4vmin,1.6rem)}
.g-lectura-x14 .x14-q .pic.hint{animation:pulse 1s infinite;outline:.25rem solid #5CC77A}
`);

let usedQ = [];
Kids.game({
  id: 'lectura-x14', group: 'lectura', num: 18,
  title: '¿Quién hace qué?', icon: 'lx14-bombero', rounds: 6,
  blurb: 'Une cada persona con lo que usa en su trabajo.',
  how: 'Toca una persona y luego lo que usa en su trabajo. En el nivel difícil también contestas preguntas.',
  levels: ['3 parejas', '5 parejas', '6 parejas y preguntas'],
  round(g, i) {
    if (i === 0) usedQ = [];
    const lv = g.level;
    if (lv === 3 && i % 2 === 1) return questionRound(g);
    const n = lv === 1 ? 3 : lv === 2 ? 5 : 6;
    const set = U.sample(R, n);
    const left = U.shuffle(set), right = U.shuffle(set);
    g.ask('Une a cada persona con lo que usa');
    const board = U.el('<div class="x14-board"></div>');
    const cl = U.el('<div class="col"></div>'), cr = U.el('<div class="col"></div>');
    const svgNS = 'http://www.w3.org/2000/svg';
    const lines = document.createElementNS(svgNS, 'svg'); lines.setAttribute('class', 'x14-lines');
    board.appendChild(cl); board.appendChild(cr); board.appendChild(lines);
    g.area.appendChild(board);
    const mk = (side, r, art, label) => {
      const b = U.el(`<button class="x14-t" aria-label="${U.esc(label)}"><span class="im">${Kids.art.get(art)}</span><span>${U.esc(label)}</span></button>`);
      b._r = r; b._side = side; return b;
    };
    left.forEach(r => cl.appendChild(mk('L', r, 'lx14-' + r.id, r.n)));
    right.forEach(r => cr.appendChild(mk('R', r, r.ta, r.t)));
    const all = [...board.querySelectorAll('.x14-t')];
    const pairs = [];
    function draw() {
      lines.innerHTML = '';
      const br = board.getBoundingClientRect();
      pairs.forEach(p => {
        const a = p.a.getBoundingClientRect(), b = p.b.getBoundingClientRect();
        const ln = document.createElementNS(svgNS, 'path');
        const x1 = a.right - br.left, y1 = a.top + a.height / 2 - br.top, x2 = b.left - br.left, y2 = b.top + b.height / 2 - br.top, mx = (x1 + x2) / 2;
        ln.setAttribute('d', `M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`);
        ln.setAttribute('fill', 'none'); ln.setAttribute('stroke', p.c); ln.setAttribute('stroke-width', '5'); ln.setAttribute('stroke-linecap', 'round');
        lines.appendChild(ln);
      });
    }
    try { new ResizeObserver(draw).observe(board); } catch (e) {}
    let sel = null, done = 0;
    all.forEach(b => b.onclick = () => {
      if (b.disabled) return;
      g.say(b._side === 'L' ? b._r.n : b._r.t);
      if (!sel || sel._side === b._side) { if (sel) sel.classList.remove('sel'); sel = (sel === b ? null : b); if (sel) sel.classList.add('sel'); return; }
      const a = sel; sel = null; a.classList.remove('sel');
      const L = a._side === 'L' ? a : b, Rr = a._side === 'L' ? b : a;
      if (L._r === Rr._r) {
        [L, Rr].forEach(x => { x.disabled = true; x.classList.add('ok'); x.style.borderColor = LINE[done % LINE.length]; });
        pairs.push({ a: L, b: Rr, c: LINE[done % LINE.length] }); done++; draw(); Kids.sound.pop();
        all.forEach(x => x.classList.remove('hint'));
        if (done === n) g.right(); else g.toast('¡Pareja! Sigue así');
      } else { [a, b].forEach(x => { x.classList.add('bad'); g.t(() => x.classList.remove('bad'), 450); }); g.wrong('Esos no van juntos. ¡Prueba otra vez!'); }
    });
    g.helpHint = () => {
      const l = (sel && sel._side === 'L' ? sel : null) || cl.querySelector('.x14-t:not([disabled])'); if (!l) return;
      const rr = all.find(x => x._side === 'R' && x._r === l._r && !x.disabled);
      l.classList.add('hint'); if (rr) rr.classList.add('hint');
      g.toast(l._r.n.charAt(0).toUpperCase() + l._r.n.slice(1) + ' usa ' + l._r.t);
    };
  }
});

function questionRound(g) {
  const cand = R.filter(r => !usedQ.includes(r.id)); const t = U.pick(cand.length ? cand : R); usedQ.push(t.id);
  const opts = U.shuffle([t].concat(U.sample(R.filter(r => r !== t), 3)));
  g.ask(t.q);
  const wrap = U.el('<div class="x14-q"></div>');
  opts.forEach(o => {
    const b = U.el(`<button class="pic" aria-label="${U.esc(o.n)}">${Kids.art.get('lx14-' + o.id)}<span class="lbl">${U.esc(o.n)}</span></button>`);
    b._ok = o === t;
    b.onclick = () => {
      if (b.disabled) return;
      if (b._ok) { b.classList.add('right'); wrap.querySelectorAll('button').forEach(x => x.disabled = true); g.right(); }
      else { b.classList.add('bad'); b.disabled = true; g.wrong(); }
    };
    wrap.appendChild(b);
  });
  g.area.appendChild(wrap);
  g.helpHint = () => { const b = [...wrap.children].find(x => x._ok); if (b) { b.classList.add('hint'); g.toast('Piensa: ' + t.n + ' usa ' + t.t); } };
}
})();
