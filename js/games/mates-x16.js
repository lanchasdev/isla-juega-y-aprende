/* Mates x16 — Los días de la semana y los meses */
(function () {
'use strict';
const U = Kids.util, A = Kids.art;
const DAYS = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DCOL = ['#CDBEF5', '#FFE08A', '#BFE3FA', '#FFC9DC', '#C9F0D6', '#FFD3A8', '#FFB3A7'];
const MCOL = ['#BFE3FA', '#CDBEF5', '#C9F0D6', '#FFC9DC', '#FFE08A', '#FFD3A8', '#FFB3A7', '#FFE08A', '#FFD3A8', '#E9C9A0', '#CDBEF5', '#BFE3FA'];
const MART = ['snowflake', 'heart', 'blossom', 'umbrella', 'flower', 'sun', 'sun', 'sun', 'leaf', 'leaf', 'cloud', 'snowman'];
const DART = [null, null, null, null, null, 'sun', 'sun'];
let lastKey = '';

Kids.css(`
.g-mates-x16 .x16-row{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem;width:100%;max-width:62rem}
.g-mates-x16 .x16-slot{position:relative;width:var(--w,7.4rem);min-height:var(--h,5rem);padding:0;font-size:1.3rem}
.g-mates-x16 .x16-slot .n{position:absolute;left:.35rem;top:.1rem;font-family:'Baloo 2';font-size:.95rem;color:#8A97C2}
.g-mates-x16 .x16-slot.sel-target{background:#FFF3BF;border-color:var(--yellow)}
.g-mates-x16 .x16-slot.filled{border-style:solid}
.g-mates-x16 .x16-card{font-family:'Baloo 2';font-weight:800;font-size:var(--fz,1.7rem);color:var(--ink);background:var(--c,#fff);border-radius:1.2rem;min-width:var(--w,7.4rem);min-height:var(--h,5rem);padding:.2rem .5rem;box-shadow:0 .3rem 0 rgba(20,35,91,.16);display:inline-flex;flex-direction:column;align-items:center;justify-content:center;line-height:1;gap:.1rem;border:.2rem solid transparent}
.g-mates-x16 .x16-card svg{width:1.7rem;height:1.7rem}
.g-mates-x16 .x16-card.on{border-color:var(--ink);transform:translateY(-.25rem) scale(1.06)}
.g-mates-x16 .x16-card.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .4rem #FFD23F}
.g-mates-x16 .x16-slot .x16-card{box-shadow:none;width:100%;height:100%;min-height:calc(var(--h,5rem) - .5rem);border-radius:1rem}
.g-mates-x16 .x16-pool{min-height:calc(var(--h,5rem) + .6rem);padding:.6rem;border-radius:1.6rem;background:rgba(255,255,255,.55)}
.g-mates-x16 .x16-q{display:flex;align-items:center;justify-content:center;gap:.6rem;flex-wrap:wrap;font-family:'Baloo 2';font-weight:800;color:var(--ink)}
.g-mates-x16 .x16-big{font-size:2.6rem;background:#fff;border-radius:1.6rem;padding:.3rem 1.2rem;box-shadow:0 .4rem 0 var(--line);min-width:7rem;text-align:center}
.g-mates-x16 .x16-big.q{background:#FFF3BF;border:.25rem dashed var(--yellow)}
.g-mates-x16 .x16-ico{width:3.6rem;height:3.6rem}
.g-mates-x16 .opts .ans{font-size:2rem;min-width:9rem;flex-direction:column}
.g-mates-x16 .opts .ans.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .5rem #FFD23F}
.g-mates-x16 .x16-tl{display:flex;flex-wrap:wrap;gap:.3rem;justify-content:center;max-width:44rem}
.g-mates-x16 .x16-tl span{background:#fff;border-radius:.8rem;padding:.1rem .6rem;font-size:1.1rem;font-family:'Baloo 2';border:.15rem solid var(--line)}
.g-mates-x16 .x16-tl span.me{background:#FFF3BF;border-color:var(--yellow)}
@media (max-width:640px){.g-mates-x16 .x16-card{font-size:calc(var(--fz,1.7rem)*.86)}.g-mates-x16 .x16-big{font-size:1.9rem;min-width:5rem}.g-mates-x16 .opts .ans{font-size:1.6rem;min-width:7rem}}
`);

function cap(s) { return s; }

/* ---------- ordenar ---------- */
function orderRound(g, list, cols, art, label, pre) {
  const n = list.length, big = n > 7;
  const w = big ? 5.6 : 7.4, h = big ? 4.2 : 5, fz = big ? 1.2 : 1.7;
  g.screen.style.setProperty('--w', w + 'rem');
  g.area.style.setProperty('--w', w + 'rem'); g.area.style.setProperty('--h', h + 'rem'); g.area.style.setProperty('--fz', fz + 'rem');
  g.ask(label);
  const rowBox = U.el('<div class="x16-row"></div>');
  if (big) rowBox.style.maxWidth = 'calc(6 * (' + w + 'rem + .5rem))';
  const pool = U.el('<div class="x16-row x16-pool"></div>');
  const slots = [], cards = [];
  let selected = null, placed = 0;
  list.forEach((name, k) => {
    const s = U.el(`<div class="slot x16-slot" data-k="${k}" role="button" tabindex="0" aria-label="Hueco ${k + 1}"><span class="n">${k + 1}</span></div>`);
    slots.push(s); rowBox.appendChild(s);
  });
  const mk = (k) => {
    const art_ = art(k);
    const c = U.el(`<button class="x16-card" data-k="${k}" style="--c:${cols[k]}" aria-label="${list[k]}">${art_ ? A.get(art_) : ''}<span>${list[k]}</span></button>`);
    return c;
  };
  function clearSel() { if (selected) selected.classList.remove('on'); selected = null; slots.forEach(s => s.classList.remove('sel-target')); }
  function put(card, slot) {
    const k = +card.dataset.k, sk = +slot.dataset.k;
    if (slot.querySelector('.x16-card')) return false;
    if (k !== sk) { g.shake(card); g.wrong(k < sk ? 'Ese va antes. ¡Prueba otro hueco!' : 'Ese va más tarde. ¡Prueba otro hueco!'); clearSel(); return false; }
    slot.appendChild(card); slot.classList.add('filled'); card.classList.remove('on', 'hint'); card.dataset.locked = '1';
    clearSel(); Kids.sound.pop(); placed++;
    if (placed === n) { g.right('¡Todos en orden!'); g.t(() => g.say(list.join(', ')), 300); }
    return true;
  }
  const order = U.shuffle(U.range(n));
  order.forEach(k => {
    if (pre.includes(k)) { const c = mk(k); c.dataset.locked = '1'; c.disabled = true; slots[k].appendChild(c); slots[k].classList.add('filled'); placed++; return; }
    const c = mk(k); cards.push(c); pool.appendChild(c);
    Kids.drag(c, {
      targets: () => slots.filter(s => !s.querySelector('.x16-card')),
      onDrop: (t, el) => put(el, t),
      onTap: el => {
        Kids.voice.say(list[+el.dataset.k]);
        if (selected === el) { clearSel(); return; }
        clearSel(); selected = el; el.classList.add('on');
        slots.forEach(s => { if (!s.querySelector('.x16-card')) s.classList.add('sel-target'); });
      }
    });
  });
  slots.forEach(s => {
    const act = () => { if (selected && !s.querySelector('.x16-card')) put(selected, s); };
    s.onclick = act;
    s.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') act(); };
  });
  g.area.appendChild(rowBox); g.area.appendChild(pool);
  g.helpHint = () => {
    const next = slots.findIndex(s => !s.querySelector('.x16-card'));
    const c = cards.find(x => +x.dataset.k === next);
    g.toast(`Busca «${list[next]}»: es el número ${next + 1}`);
    if (c) c.classList.add('hint');
  };
}

/* ---------- preguntas ---------- */
function qRound(g, list, kind, cols, art) {
  const n = list.length, isDay = list === DAYS;
  const art_ = k => art(k);
  let idx, ask, answer, shown = [];
  const pre = isDay ? ['del', 'del'] : ['de', 'de'];
  const nm = (k, art2) => (isDay ? 'el ' : '') + list[k];
  const prep = (k) => isDay ? 'del ' + list[k] : 'de ' + list[k];
  for (let t = 0; t < 30; t++) {
    idx = U.rnd(0, n - 1);
    if (kind === 'before' && idx === 0 && !isDay) { continue; }
    if (kind === 'after' && idx === n - 1 && !isDay) { continue; }
    if (kind === 'between') { idx = U.rnd(1, n - 2); }
    const key = kind + idx; if (key !== lastKey) { lastKey = key; break; }
  }
  const mod = x => (x + n) % n;
  if (kind === 'after') { answer = mod(idx + 1); ask = `¿Qué ${isDay ? 'día' : 'mes'} va después ${prep(idx)}?`; }
  else if (kind === 'before') { answer = mod(idx - 1); ask = `¿Qué ${isDay ? 'día' : 'mes'} va antes ${prep(idx)}?`; }
  else if (kind === 'between') {
    answer = idx;
    ask = isDay ? `¿Qué día va entre el ${list[idx - 1]} y el ${list[idx + 1]}?` : `¿Qué mes va entre ${list[idx - 1]} y ${list[idx + 1]}?`;
  } else if (kind === 'weekend') {
    const we = Math.random() < .5;
    answer = U.pick([5, 6]);
    ask = '¿Cuál es un día del fin de semana?';
  }
  g.ask(ask);
  const wrongs = [];
  const pool = U.shuffle(U.range(n).filter(k => k !== answer && (kind === 'weekend' || k !== idx) && !(kind === 'weekend' && k > 4) && !(kind === 'between' && (k === idx - 1 || k === idx + 1))));
  // distractores cercanos al principio
  const near = [];
  if (kind !== 'weekend') { [mod(idx + 1), mod(idx - 1), mod(idx + 2), mod(idx - 2)].forEach(k => { if (k !== answer && k !== idx && !near.includes(k) && (kind === 'between' ? k !== idx - 1 && k !== idx + 1 : true)) near.push(k); }); }
  const dis = kind === 'weekend' ? U.sample(pool, 3) : U.shuffle(near).slice(0, 2).concat(pool.filter(k => !near.includes(k)).slice(0, 1));
  const vals = U.shuffle([answer].concat(dis.filter(k => k !== answer)).slice(0, 4));
  while (vals.length < 4) { const k = U.rnd(0, n - 1); if (!vals.includes(k)) vals.push(k); }
  const sh = U.shuffle(vals);

  const q = U.el('<div class="x16-q"></div>');
  const tl = U.el('<div class="x16-tl" aria-hidden="true"></div>');
  if (isDay && (kind === 'after' || kind === 'before' || kind === 'between')) {
    // línea de días pequeña como ayuda en niveles bajos
  }
  const ctx = (k, txt) => `<div class="x16-big" style="background:${cols[k]}">${txt}</div>`;
  if (kind === 'after') q.innerHTML = ctx(idx, list[idx]) + '<span class="x16-big" style="font-size:2.2rem">→</span><div class="x16-big q">?</div>';
  else if (kind === 'before') q.innerHTML = '<div class="x16-big q">?</div><span class="x16-big" style="font-size:2.2rem">→</span>' + ctx(idx, list[idx]);
  else if (kind === 'between') q.innerHTML = ctx(idx - 1, list[idx - 1]) + '<div class="x16-big q">?</div>' + ctx(idx + 1, list[idx + 1]);
  else q.innerHTML = '<div class="x16-big" style="background:#FFF3BF">' + (isDay ? 'sábado y domingo' : '') + '</div>';
  if (kind === 'weekend') q.innerHTML = '<div class="x16-big" style="background:#FFE08A;font-size:2rem">Fin de semana = sábado y domingo</div>';
  q.querySelectorAll('.x16-big:not(.q)').forEach((e, i) => { e.onclick = null; });
  g.area.appendChild(q);
  const qEl = q.querySelector('.q');
  const box = U.el('<div class="opts"></div>');
  const btns = sh.map(k => {
    const a = art_(k);
    const b = U.el(`<button class="ans" aria-label="${list[k]}">${a ? `<span class="x16-ico" style="display:block;width:2.2rem;height:2.2rem">${A.get(a)}</span>` : ''}<span>${list[k]}</span></button>`);
    b.onclick = () => {
      Kids.voice.say(list[k]);
      if (k === answer) { btns.forEach(x => x.disabled = true); b.classList.add('right'); if (qEl) { qEl.textContent = list[k]; qEl.classList.remove('q'); qEl.style.background = cols[k]; } g.right(); }
      else { b.classList.add('bad'); b.disabled = true; g.wrong(); }
    };
    box.appendChild(b); return b;
  });
  g.area.appendChild(box);
  // línea de tiempo de ayuda (siempre visible en nivel 1-2 para ver el orden)
  if (g.level < 3 || !isDay) { /* sin ayuda extra */ }
  g.helpHint = () => {
    const seq = list.map((x, k) => `<span class="${k === answer ? 'me' : ''}">${x}</span>`).join('');
    tl.innerHTML = seq; g.area.insertBefore(tl, box);
    g.toast('Mira la fila: están en orden');
    btns.forEach(b => { if (b.getAttribute('aria-label') === list[answer] && !b.disabled) b.classList.add('hint'); });
  };
}

const PLAN = {
  1: ['orderD', 'afterD', 'afterD', 'orderD', 'afterD', 'afterD'],
  2: ['beforeD', 'afterD', 'weekendD', 'betweenD', 'orderD', 'beforeD'],
  3: ['orderM', 'afterM', 'beforeM', 'betweenM', 'orderM', 'afterM']
};
let plan = [];

Kids.game({
  id: 'mates-x16', group: 'mates', num: 21,
  title: 'Los días y los meses',
  blurb: 'Ordena los días de la semana y los meses del año.',
  how: 'Pon los días en orden, toca la tarjeta y luego su hueco, o arrástrala. También contesta qué día o qué mes va antes o después.',
  icon: 'sun',
  levels: ['Días y siguiente día', 'Antes, después y fin de semana', 'Los 12 meses'],
  rounds: 6,
  round(g, i) {
    if (i === 0) { plan = PLAN[g.level].slice(); if (g.level === 1) plan = U.shuffle(plan); }
    const t = plan[i], isD = t.endsWith('D');
    const list = isD ? DAYS : MONTHS, cols = isD ? DCOL : MCOL;
    const art = isD ? (k => DART[k]) : (k => MART[k]);
    const kind = t.slice(0, -1);
    if (kind === 'order') {
      orderRound(g, list, cols, art, isD ? 'Ordena los días de la semana' : 'Ordena los meses del año', isD || g.level < 3 ? [] : U.sample(U.range(12), 3));
    } else qRound(g, list, kind, cols, art);
  },
  stars(m, r) { return m <= 2 ? 3 : m <= 8 ? 2 : 1; }
});
})();
