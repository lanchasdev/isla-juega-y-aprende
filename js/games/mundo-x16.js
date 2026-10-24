/* mundo-x16 — Ciclo de la mariposa (y de la rana y la gallina) */
(function () {
'use strict';
const U = Kids.util;
const V = (inner) => '<svg viewBox="0 0 100 100" aria-hidden="true">' + inner + '</svg>';
const shadow = '<ellipse cx="50" cy="91" rx="30" ry="5" fill="#14235B" opacity=".10"/>';
const eye = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/><circle cx="${x + r * .15}" cy="${y + r * .1}" r="${r * .55}" fill="#14235B"/><circle cx="${x + r * .4}" cy="${y - r * .3}" r="${r * .22}" fill="#fff"/>`;

Kids.art.add({
  'wx16-egg': V(`${shadow}
    <path d="M10 70 Q14 40 52 40 Q92 42 92 74 Q60 90 10 70Z" fill="#6CCB6A"/><path d="M12 70 Q50 82 90 74" fill="none" stroke="#4DAF50" stroke-width="3" stroke-linecap="round"/>
    <path d="M20 66 Q50 56 84 66" fill="none" stroke="#9BE08F" stroke-width="2.4" stroke-linecap="round"/>
    <g fill="#FFF3B0" stroke="#EAD275" stroke-width="1.6"><circle cx="34" cy="60" r="7"/><circle cx="50" cy="56" r="7.5"/><circle cx="66" cy="60" r="7"/><circle cx="42" cy="47" r="6.5"/><circle cx="58" cy="46" r="6.5"/><circle cx="50" cy="36" r="6"/><circle cx="76" cy="66" r="5.5"/></g>
    <g fill="#fff" opacity=".85"><circle cx="32" cy="57" r="2"/><circle cx="48" cy="53" r="2.2"/><circle cx="64" cy="57" r="2"/><circle cx="40" cy="45" r="1.8"/><circle cx="56" cy="44" r="1.8"/><circle cx="48" cy="34" r="1.6"/></g>`),
  'wx16-larva': V(`${shadow}
    <path d="M8 76 Q50 92 94 74 Q70 62 8 76Z" fill="#6CCB6A"/>
    <g stroke="#4DAF50" stroke-width="1.2" fill="#9BDB4A">
    <circle cx="18" cy="66" r="9"/><circle cx="30" cy="62" r="10"/><circle cx="44" cy="62" r="10.5"/><circle cx="58" cy="61" r="11"/></g>
    <g fill="#F7B731"><circle cx="30" cy="61" r="3"/><circle cx="44" cy="61" r="3"/></g>
    <circle cx="70" cy="50" r="17" fill="#B6E85E" stroke="#4DAF50" stroke-width="1.2"/><circle cx="62" cy="58" r="1" fill="none"/>
    ${eye(64, 47, 5)}${eye(77, 47, 5)}<path d="M64 58 Q70 64 77 58" fill="none" stroke="#14235B" stroke-width="2" stroke-linecap="round"/>
    <circle cx="60" cy="55" r="2.4" fill="#FF9FB6" opacity=".7"/><circle cx="82" cy="55" r="2.4" fill="#FF9FB6" opacity=".7"/>
    <path d="M64 34 Q58 22 54 22M76 34 Q82 22 86 22" fill="none" stroke="#4DAF50" stroke-width="2.2" stroke-linecap="round"/><circle cx="54" cy="22" r="2.6" fill="#F7B731"/><circle cx="86" cy="22" r="2.6" fill="#F7B731"/>
    <g fill="#4DAF50"><rect x="14" y="72" width="4" height="6" rx="2"/><rect x="27" y="71" width="4" height="6" rx="2"/><rect x="41" y="71" width="4" height="6" rx="2"/><rect x="55" y="71" width="4" height="6" rx="2"/></g>`),
  'wx16-pupa': V(`
    <path d="M6 14 Q50 4 94 14" fill="none" stroke="#8B6A55" stroke-width="7" stroke-linecap="round"/><path d="M20 12 l-6 -6M70 9 l5 -6" stroke="#6BAF55" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 14 V30" stroke="#C9B79C" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M50 28 C 28 36, 26 66, 50 90 C 74 66, 72 36, 50 28Z" fill="#9BD16B" stroke="#6BAF55" stroke-width="2.4"/>
    <path d="M50 28 C 40 40, 40 64, 50 90" fill="none" stroke="#B8E58A" stroke-width="3" stroke-linecap="round" opacity=".7"/>
    <g fill="none" stroke="#6BAF55" stroke-width="2" stroke-linecap="round"><path d="M33 44 Q50 50 67 44"/><path d="M31 56 Q50 62 69 56"/><path d="M35 68 Q50 74 65 68"/></g>
    <g fill="#F7C531"><circle cx="43" cy="40" r="2.2"/><circle cx="57" cy="40" r="2.2"/><circle cx="50" cy="75" r="2.2"/></g>`),
  'wx16-spawn': V(`
    <ellipse cx="50" cy="62" rx="44" ry="30" fill="#BFE6F7"/><path d="M12 70 q10 -6 20 0 t20 0 t20 0 t20 0" fill="none" stroke="#fff" stroke-width="2.4" opacity=".8"/>
    <g fill="#E3F6E6" stroke="#9BD3A8" stroke-width="1.6"><circle cx="30" cy="54" r="11"/><circle cx="52" cy="50" r="11.5"/><circle cx="71" cy="57" r="10.5"/><circle cx="40" cy="70" r="10.5"/><circle cx="62" cy="72" r="10"/></g>
    <g fill="#33503A"><circle cx="30" cy="54" r="4.4"/><circle cx="52" cy="50" r="4.6"/><circle cx="71" cy="57" r="4.2"/><circle cx="40" cy="70" r="4.2"/><circle cx="62" cy="72" r="4"/></g>
    <g fill="#fff" opacity=".9"><circle cx="24" cy="47" r="2"/><circle cx="46" cy="43" r="2.2"/><circle cx="66" cy="50" r="2"/><circle cx="34" cy="63" r="2"/><circle cx="57" cy="65" r="2"/></g>
    <path d="M78 22 v-10 M84 24 v-14" stroke="#4DAF50" stroke-width="3" stroke-linecap="round"/>`),
  'wx16-tadpole': V(`
    <ellipse cx="50" cy="55" rx="44" ry="34" fill="#BFE6F7"/><path d="M14 80 q9 -5 18 0 t18 0 t18 0 t18 0" fill="none" stroke="#fff" stroke-width="2.4" opacity=".8"/>
    <path d="M52 52 C 66 40, 80 62, 90 52 C 84 74, 66 70, 52 62Z" fill="#6E9A3B"/>
    <ellipse cx="38" cy="52" rx="20" ry="16" fill="#7DB046"/><ellipse cx="34" cy="60" rx="12" ry="7" fill="#A5D06A" opacity=".7"/>
    ${eye(30, 45, 6)}${eye(45, 44, 6)}<path d="M30 58 Q38 64 46 58" fill="none" stroke="#14235B" stroke-width="2.2" stroke-linecap="round"/>
    <g fill="#fff" opacity=".85" stroke="#9ED3EC" stroke-width="1"><circle cx="18" cy="30" r="3.6"/><circle cx="26" cy="20" r="2.4"/><circle cx="78" cy="30" r="3"/></g>`),
  'wx16-froglet': V(`${shadow}
    <path d="M70 70 Q88 72 90 84 Q74 82 66 76Z" fill="#6FB93E"/>
    <ellipse cx="48" cy="66" rx="26" ry="20" fill="#86CE4B"/><ellipse cx="48" cy="74" rx="16" ry="10" fill="#C5EC93"/>
    <path d="M30 78 Q20 80 18 88 L34 88 Q36 82 36 78Z M66 78 Q76 80 78 88 L62 88 Q60 82 60 78Z" fill="#6FB93E"/>
    <ellipse cx="48" cy="46" rx="22" ry="17" fill="#86CE4B"/>
    <circle cx="35" cy="32" r="9.5" fill="#86CE4B"/><circle cx="61" cy="32" r="9.5" fill="#86CE4B"/>
    ${eye(35, 31, 7)}${eye(61, 31, 7)}<path d="M36 51 Q48 60 60 51" fill="none" stroke="#14235B" stroke-width="2.4" stroke-linecap="round"/>
    <circle cx="29" cy="46" r="3" fill="#FF9FB6" opacity=".7"/><circle cx="67" cy="46" r="3" fill="#FF9FB6" opacity=".7"/>`),
  'wx16-eggc': V(`${shadow}
    <path d="M16 82 Q50 94 84 82 Q80 68 50 68 Q20 68 16 82Z" fill="#E3B766"/><g stroke="#C9953E" stroke-width="1.6" stroke-linecap="round"><path d="M22 80 l10 -6M40 84 l8 -8M62 82 l-8 -8M80 80 l-10 -6"/></g>
    <path d="M50 12 C 28 12, 22 44, 24 58 C 26 76, 40 84, 50 84 C 60 84, 74 76, 76 58 C 78 44, 72 12, 50 12Z" fill="#FFF4E0" stroke="#E5CFA6" stroke-width="2.4"/>
    <ellipse cx="38" cy="36" rx="6" ry="11" fill="#fff" opacity=".8" transform="rotate(14 38 36)"/>
    <g fill="#EBD3A6"><circle cx="58" cy="46" r="2"/><circle cx="64" cy="62" r="2.2"/><circle cx="46" cy="64" r="1.8"/></g>`),
  'wx16-pollo': V(`${shadow}
    <path d="M44 74 V88 M58 74 V88 M38 88 h12 M52 88 h12" stroke="#FF9F43" stroke-width="3.4" stroke-linecap="round" fill="none"/>
    <path d="M70 52 Q94 40 90 66 Q82 78 66 74Z" fill="#B97A4A"/><path d="M72 56 Q88 50 86 66" fill="none" stroke="#9A5F34" stroke-width="2.2" stroke-linecap="round"/>
    <ellipse cx="48" cy="62" rx="26" ry="20" fill="#F2B56B"/><ellipse cx="46" cy="68" rx="16" ry="10" fill="#FBD9A2"/>
    <path d="M36 62 q10 6 20 -2" fill="none" stroke="#D99447" stroke-width="2" stroke-linecap="round"/>
    <circle cx="36" cy="36" r="16" fill="#F7C47B"/><path d="M30 22 q3 -8 7 -2 q3 -8 7 0 q-3 4 -7 4z" fill="#F26B6B"/>
    ${eye(31, 35, 4.6)}<path d="M18 36 l-10 3 l10 4z" fill="#FF9F43"/><path d="M32 46 q-1 7 2 8 q3 -1 2 -8z" fill="#F26B6B"/>`)
});

/* ====== datos de los ciclos ====== */
const CYCLES = {
  mariposa: { name: 'mariposa', stages: [
    { id: 'huevo', art: 'wx16-egg', n: 'Huevo', d: 'el huevo' },
    { id: 'oruga', art: 'wx16-larva', n: 'Oruga', d: 'la oruga' },
    { id: 'crisalida', art: 'wx16-pupa', n: 'Crisálida', d: 'la crisálida' },
    { id: 'mariposa', art: 'butterfly', n: 'Mariposa', d: 'la mariposa' }],
    qs: [
      { q: '¿De qué sale la mariposa?', a: 'crisalida' },
      { q: '¿Qué sale del huevo de la mariposa?', a: 'oruga' },
      { q: '¿En qué se convierte la oruga? Se queda dentro de un capullo.', a: 'crisalida' },
      { q: '¿Quién vuela por el aire con sus alas de colores?', a: 'mariposa' },
      { q: '¿Qué es lo primero en la vida de una mariposa?', a: 'huevo' }] },
  rana: { name: 'rana', stages: [
    { id: 'huevos', art: 'wx16-spawn', n: 'Huevos', d: 'los huevos' },
    { id: 'renacuajo', art: 'wx16-tadpole', n: 'Renacuajo', d: 'el renacuajo' },
    { id: 'ranita', art: 'wx16-froglet', n: 'Ranita', d: 'la ranita' },
    { id: 'rana', art: 'frog', n: 'Rana', d: 'la rana' }],
    qs: [
      { q: '¿De qué sale el renacuajo?', a: 'huevos' },
      { q: '¿Quién nada en el agua con su cola?', a: 'renacuajo' },
      { q: '¿En qué se convierte el renacuajo cuando le salen las patas?', a: 'ranita' },
      { q: '¿Quién es la rana mayor, grande y saltarina?', a: 'rana' }] },
  gallina: { name: 'gallina', stages: [
    { id: 'huevo', art: 'wx16-eggc', n: 'Huevo', d: 'el huevo' },
    { id: 'pollito', art: 'chick', n: 'Pollito', d: 'el pollito' },
    { id: 'pollo', art: 'wx16-pollo', n: 'Pollo', d: 'el pollo' },
    { id: 'gallina', art: 'hen', n: 'Gallina', d: 'la gallina' }],
    qs: [
      { q: '¿De qué sale el pollito?', a: 'huevo' },
      { q: '¿Quién pone los huevos?', a: 'gallina' },
      { q: '¿Qué sale del huevo, pequeñito y amarillo?', a: 'pollito' },
      { q: '¿En qué se convierte el pollito cuando crece un poco?', a: 'pollo' }] }
};
const L1_IDS = ['huevo', 'oruga', 'mariposa'];
const pick3 = (a, n) => U.sample(a, n);
let deck = [];
function nextCycle(level) {
  if (!deck.length) deck = U.shuffle(level === 3 ? ['rana', 'gallina', 'rana', 'gallina', 'mariposa', 'rana'] : ['mariposa']);
  return CYCLES[deck.pop()];
}

Kids.css(`
.g-mundo-x16{--cw:clamp(4rem,14vmin,8.5rem);gap:.7rem}
.g-mundo-x16 .x16-row{display:flex;align-items:center;justify-content:center;gap:clamp(.2rem,1.4vmin,.9rem);width:100%}
.g-mundo-x16 .x16-sl{position:relative;width:calc(var(--cw) + .5rem);height:calc(var(--cw) + .5rem);flex:none;border:.25rem dashed #B7A6F0;background:rgba(255,255,255,.7);border-radius:1.4rem;display:flex;align-items:center;justify-content:center;transition:all .15s;cursor:pointer}
.g-mundo-x16 .x16-sl.hot{background:#FFF3BF;border-color:var(--yellow);transform:scale(1.06)}
.g-mundo-x16 .x16-sl.filled{border-style:solid;border-color:var(--green);background:#E8F9EC}
.g-mundo-x16 .x16-sl.hint{animation:pulse .7s 6}
.g-mundo-x16 .x16-num{position:absolute;left:50%;top:-.9rem;transform:translateX(-50%);width:1.8rem;height:1.8rem;border-radius:50%;background:var(--g);color:#fff;font-family:'Baloo 2';font-weight:800;font-size:1.2rem;line-height:1.8rem;text-align:center;z-index:2}
.g-mundo-x16 .x16-arr{width:clamp(1rem,3.6vmin,1.8rem);flex:none;color:var(--g)}
.g-mundo-x16 .x16-arr svg{width:100%;display:block}
.g-mundo-x16 .x16-loop{width:min(92%,38rem);height:clamp(1.4rem,4vh,2.4rem);color:var(--g);margin-top:-.2rem}
.g-mundo-x16 .x16-loop svg{width:100%;height:100%;display:block}
.g-mundo-x16 .x16-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:.7rem;background:rgba(255,255,255,.8);border-radius:1.8rem;padding:.7rem;min-height:calc(var(--cw) + 2.6rem);width:100%;max-width:46rem}
.g-mundo-x16 .x16-card{width:var(--cw);background:#fff;border:.2rem solid var(--line);border-radius:1.2rem;box-shadow:0 .3rem 0 var(--line);padding:.2rem;display:flex;flex-direction:column;align-items:center;gap:.05rem;font-family:'Baloo 2';font-weight:800;font-size:clamp(.8rem,2.5vmin,1.2rem);line-height:1.1;position:relative}
.g-mundo-x16 .x16-card svg{width:100%;aspect-ratio:1;display:block;pointer-events:none}
.g-mundo-x16 .x16-card.sel{border-color:var(--yellow);background:#FFF7D1;transform:translateY(-.3rem)}
.g-mundo-x16 .x16-card.hint{animation:bounce .6s 5}
.g-mundo-x16 .x16-sl .x16-card{border:0;box-shadow:none;background:transparent;width:100%;height:100%;justify-content:center}
.g-mundo-x16 .x16-ref{display:flex;flex-direction:column;align-items:center;gap:.3rem}
.g-mundo-x16 .x16-ref .pic{width:clamp(8rem,26vmin,13rem)}
.g-mundo-x16 .x16-opts .pic{width:clamp(6.2rem,20vmin,11rem);cursor:pointer}
.g-mundo-x16 .x16-opts .pic svg{max-width:100%;aspect-ratio:1;height:auto}
`);

const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg>';
const LOOP = '<svg viewBox="0 0 300 30" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M285 3 C 292 30, 8 30, 16 8" stroke-dasharray="2 9"/><path d="M8 16 L16 7 L25 14"/></svg>';

Kids.game({
  id: 'mundo-x16', group: 'mundo', num: 19,
  title: 'Ciclo de la mariposa',
  blurb: 'Ordena las etapas de la vida de la mariposa, la rana y la gallina.',
  how: 'Arrastra cada tarjeta a su hueco, del uno al último. También puedes tocar la tarjeta y luego tocar el hueco. Después contesta preguntas.',
  icon: 'butterfly',
  levels: ['3 etapas', '4 etapas', 'Sin nombres: rana y gallina'],
  rounds: 6,
  round(g, i) {
    if (i === 0) deck = [];
    const cyc = nextCycle(g.level);
    const full = g.level === 1 ? cyc.stages.filter(s => L1_IDS.indexOf(s.id) >= 0) : cyc.stages;
    const names = g.level < 3;
    const artOf = s => Kids.art.get(s.art);
    if (i % 2 === 0) order(g, cyc, full, names, artOf); else question(g, cyc, full, names, artOf);
  }
});

function order(g, cyc, full, names, artOf) {
  g.ask(g.level === 3 ? '¿Cómo crece ' + (cyc.name === 'rana' ? 'una rana' : cyc.name === 'gallina' ? 'una gallina' : 'una mariposa') + '? Pon las tarjetas en orden.' : 'Ordena la vida de la ' + cyc.name + ': ¿qué va primero?');
  const n = full.length;
  const board = U.el('<div class="x16-row"></div>');
  full.forEach((s, k) => {
    if (k) board.appendChild(U.el(`<span class="x16-arr">${ARROW}</span>`));
    board.appendChild(U.el(`<div class="x16-sl" role="button" tabindex="0" data-k="${k}" aria-label="Hueco ${k + 1}"><span class="x16-num">${k + 1}</span></div>`));
  });
  g.area.appendChild(board);
  if (n >= 4) g.area.appendChild(U.el(`<div class="x16-loop" aria-hidden="true">${LOOP}</div>`));
  const tray = U.el('<div class="x16-tray"></div>');
  g.area.appendChild(tray);
  const slots = Array.from(board.querySelectorAll('.x16-sl'));
  let selected = null, remaining = n, last = null;
  const clearSel = () => { if (selected) selected.classList.remove('sel'); selected = null; };
  function attempt(card, slot) {
    if (slot.classList.contains('filled')) { g.toast('Ese hueco ya está lleno'); return false; }
    last = card;
    if (+card.dataset.k === +slot.dataset.k) {
      clearSel(); card.dataset.locked = '1'; card.classList.remove('hint', 'sel', 'dragging');
      card.style.transform = ''; slot.classList.add('filled'); slot.classList.remove('hint'); slot.appendChild(card); Kids.sound.pop();
      if (--remaining === 0) { g.say('¡Muy bien, está en orden!'); g.t(() => g.right('¡Todo en orden!'), 500); }
      return true;
    }
    g.shake(card);
    g.wrong(g.roundMistakes === 0 ? 'Mmm, ese no va ahí. ¿Qué pasa primero?' : 'Casi. Piensa: ¿qué va antes?');
    return false;
  }
  g.helpHint = () => {
    const k = slots.findIndex(s => !s.classList.contains('filled'));
    if (k < 0) return;
    const card = tray.querySelector(`[data-k="${k}"]`);
    slots[k].classList.add('hint'); if (card) card.classList.add('hint');
    g.toast('Mira: aquí va ' + full[k].d);
    g.t(() => { slots[k].classList.remove('hint'); if (card) card.classList.remove('hint'); }, 3800);
  };
  U.shuffle(full.map((s, k) => k)).forEach(k => {
    const s = full[k];
    const card = U.el(`<button class="x16-card" data-k="${k}" aria-label="${s.n}">${artOf(s)}${names ? '<span>' + s.n + '</span>' : ''}</button>`);
    tray.appendChild(card);
    Kids.drag(card, {
      targets: () => slots.filter(x => !x.classList.contains('filled')),
      onStart: () => clearSel(),
      onDrop: (slot, el) => attempt(el, slot),
      onTap: el => { clearSel(); selected = el; el.classList.add('sel'); }
    });
  });
  slots.forEach(sl => {
    const act = () => { if (selected) attempt(selected, sl); else g.toast('Toca primero una tarjeta'); };
    sl.addEventListener('click', act);
    sl.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
  });
}

function question(g, cyc, full, names, artOf) {
  const ids = full.map(s => s.id);
  const by = id => full.find(s => s.id === id);
  const cands = [];
  cyc.qs.forEach(q => { if (ids.indexOf(q.a) >= 0) cands.push({ q: q.q, ref: null, a: by(q.a) }); });
  full.forEach((s, k) => {
    if (k < full.length - 1) cands.push({ q: '¿Qué viene después de ' + s.d + '?', ref: s, a: full[k + 1] });
    if (k > 0 && g.level >= 2) cands.push({ q: '¿Qué viene antes de ' + s.d + '?', ref: s, a: full[k - 1] });
  });
  const c = U.pick(cands);
  g.ask(c.q.replace(' de el ', ' del '));
  if (c.ref) {
    const r = U.el(`<div class="x16-ref"><div class="pic big" aria-label="${c.ref.n}">${artOf(c.ref)}${names ? '<span class="lbl">' + c.ref.n + '</span>' : ''}</div></div>`);
    g.area.appendChild(r);
  }
  const nOpt = g.level === 1 ? Math.min(3, full.length) : g.level === 2 ? 3 : 4;
  const others = U.shuffle(full.filter(s => s !== c.a && s !== c.ref));
  let opts = [c.a].concat(others.slice(0, nOpt - 1));
  if (opts.length < nOpt) opts = opts.concat(U.shuffle(full.filter(s => opts.indexOf(s) < 0)).slice(0, nOpt - opts.length));
  const box = U.el('<div class="opts x16-opts"></div>');
  let btnRight = null;
  U.shuffle(opts).forEach(s => {
    const b = U.el(`<button class="pic" aria-label="${s.n}">${artOf(s)}${names ? '<span class="lbl">' + s.n + '</span>' : ''}</button>`);
    if (s === c.a) btnRight = b;
    b.onclick = () => {
      if (b.disabled) return;
      if (s === c.a) { b.classList.add('right'); box.querySelectorAll('.pic').forEach(x => x.disabled = true); g.right(); }
      else { b.classList.add('bad'); b.disabled = true; g.wrong('Mmm, casi. ¡Prueba otra vez!'); }
    };
    box.appendChild(b);
  });
  g.area.appendChild(box);
  g.helpHint = () => { btnRight.classList.add('hint'); btnRight.style.animation = 'bounce .6s 5'; g.toast('Mira esta: ' + c.a.d); };
}
})();
