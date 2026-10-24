/* Mates X1 — El tren de los números */
(function () {
'use strict';
const U = Kids.util, A = Kids.art;
const COLS = ['#FF9AA2', '#FFD23F', '#8FD1F0', '#B9A6F0', '#8EDB9A', '#FFB86B'];
let lastKey = '';

A.add({
  'mx1-loco': `<svg viewBox="0 0 120 100"><ellipse cx="60" cy="94" rx="52" ry="5" fill="#14235B" opacity=".1"/>
  <rect x="8" y="44" width="62" height="34" rx="10" fill="#47B5BF"/><rect x="62" y="22" width="42" height="56" rx="10" fill="#2A8A94"/>
  <rect x="70" y="30" width="26" height="22" rx="6" fill="#DDF3F4"/><circle cx="83" cy="41" r="4" fill="#14235B"/><path d="M77 46q6 5 12 0" stroke="#14235B" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <rect x="54" y="18" width="56" height="8" rx="4" fill="#FFD23F"/><rect x="18" y="24" width="16" height="26" rx="5" fill="#FF7E69"/><rect x="14" y="20" width="24" height="8" rx="4" fill="#E85F4B"/>
  <circle cx="14" cy="14" r="7" fill="#fff" opacity=".8"/><circle cx="26" cy="6" r="5" fill="#fff" opacity=".6"/>
  <circle cx="30" cy="82" r="11" fill="#14235B"/><circle cx="30" cy="82" r="4" fill="#FFD23F"/><circle cx="58" cy="82" r="11" fill="#14235B"/><circle cx="58" cy="82" r="4" fill="#FFD23F"/><circle cx="90" cy="82" r="9" fill="#14235B"/><circle cx="90" cy="82" r="3.4" fill="#FFD23F"/></svg>`
});

Kids.css(`
.g-mates-x1 .x1-track{position:relative;display:flex;align-items:flex-end;justify-content:center;gap:0;width:100%;padding:1rem .5rem 1.2rem}
.g-mates-x1 .x1-rail{position:absolute;left:0;right:0;bottom:.8rem;height:.55rem;border-radius:.3rem;background:repeating-linear-gradient(90deg,#B98A5B 0 .6rem,transparent .6rem 1.2rem);opacity:.55}
.g-mates-x1 .x1-loco{width:min(8rem,15vw);flex:none;margin-right:.35rem;animation:x1-chug 1.4s ease-in-out infinite alternate;position:relative}
@keyframes x1-chug{to{transform:translateY(-.15rem)}}
.g-mates-x1 .x1-w{position:relative;width:min(6.4rem,11.6vw);flex:none;margin-right:.35rem;display:flex;flex-direction:column;align-items:center}
.g-mates-x1 .x1-w::before{content:'';position:absolute;right:-.4rem;bottom:1.3rem;width:.45rem;height:.3rem;background:#14235B;border-radius:.2rem;opacity:.5}
.g-mates-x1 .x1-w:last-child::before{display:none}
.g-mates-x1 .x1-body{width:100%;height:min(5.8rem,10.6vw);border-radius:.9rem .9rem .5rem .5rem;display:flex;align-items:center;justify-content:center;font-family:'Baloo 2';font-weight:800;font-size:min(3rem,6vw);color:var(--ink);box-shadow:inset 0 -.45rem 0 rgba(20,35,91,.14),0 .25rem 0 rgba(20,35,91,.12);border:.18rem solid rgba(255,255,255,.7);position:relative}
.g-mates-x1 .x1-body.hole{background:rgba(255,255,255,.75)!important;border:.25rem dashed #9CB5E8;box-shadow:none;transition:all .15s}
.g-mates-x1 .x1-body.hot{background:#FFF3BF!important;border-color:var(--yellow);transform:scale(1.07)}
.g-mates-x1 .x1-body.filled{border:.18rem solid #5CC77A;background:#BDEFC8!important;animation:pop .45s}
.g-mates-x1 .x1-wheels{display:flex;justify-content:space-around;width:78%;margin-top:-.4rem}
.g-mates-x1 .x1-wheels i{width:min(1.5rem,3.4vw);height:min(1.5rem,3.4vw);border-radius:50%;background:#14235B;border:.2rem solid #5B6BA5;display:block}
.g-mates-x1 .x1-opts{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;width:100%;min-height:6rem}
.g-mates-x1 .x1-opts .ans{min-width:min(5.6rem,17vw);padding:.2rem .6rem}
.g-mates-x1 .x1-opts .ans.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .5rem #FFD23F}
.g-mates-x1 .x1-opts .ans.used{visibility:hidden}
.g-mates-x1 .x1-tip{color:var(--ink2);font-size:1.1rem;text-align:center}
@media (max-width:640px){.g-mates-x1 .x1-opts{gap:.6rem}}
`);

function makeSeq(lv, i) {
  for (let t = 0; t < 60; t++) {
    let vals, holes, step = 1, down = false;
    if (lv === 1) {
      const len = U.rnd(5, 6), s = U.rnd(1, 10 - len + 1);
      vals = U.range(len, s); holes = [U.rnd(1, len - 2)];
    } else if (lv === 2) {
      const len = 6, s = U.rnd(1, 20 - len + 1);
      vals = U.range(len, s);
      const a = U.rnd(1, 2), b = U.rnd(a + 2, len - 1); holes = [a, b];
    } else {
      step = U.pick([2, 5, 10, 2, 5, 10, 1]); down = Math.random() < .4;
      const len = 5;
      let s;
      if (step === 10) s = 10 * U.rnd(0, 5);
      else if (step === 5) s = 5 * U.rnd(0, 10);
      else if (step === 2) s = U.rnd(0, 24);
      else s = U.rnd(1, 40);
      vals = U.range(len).map(k => s + k * step);
      if (down) { vals = vals.reverse(); }
      holes = i % 3 === 2 ? [U.rnd(1, 2), U.rnd(3, 4)] : [U.rnd(1, len - 2)];
    }
    const key = vals.join(',') + holes.join('');
    if (key !== lastKey) { lastKey = key; return { vals, holes, step, down }; }
  }
  return { vals: [1, 2, 3, 4, 5], holes: [2], step: 1, down: false };
}

Kids.game({
  id: 'mates-x1', group: 'mates', num: 6,
  title: 'El tren de los números',
  blurb: 'Al tren le faltan números en los vagones. ¡Ponlos en su sitio!',
  how: 'Mira los vagones del tren. Faltan algunos números. Toca o arrastra el número que falta hasta su vagón.',
  icon: 'train',
  levels: ['Del 1 al 10', 'Hasta 20, dos huecos', 'De 2 en 2, 5 en 5, 10 en 10 y hacia atrás'],
  rounds: 8,
  round(g, i) {
    const lv = g.level, q = makeSeq(lv, i);
    const answers = q.holes.map(h => q.vals[h]);
    const shown = new Set(q.vals.filter((v, k) => !q.holes.includes(k)));
    const track = U.el('<div class="x1-track"><div class="x1-rail"></div></div>');
    track.appendChild(U.el(`<div class="x1-loco" aria-hidden="true">${A.get('mx1-loco')}</div>`));
    const holeEls = [];
    q.vals.forEach((v, k) => {
      const isHole = q.holes.includes(k);
      const w = U.el(`<div class="x1-w"><div class="x1-body ${isHole ? 'hole' : ''}" style="background:${COLS[k % COLS.length]}" ${isHole ? `aria-label="Vagón sin número"` : ''}>${isHole ? '?' : v}</div><div class="x1-wheels"><i></i><i></i></div></div>`);
      const body = w.firstChild;
      if (isHole) { body.dataset.v = v; holeEls.push(body); }
      track.appendChild(w);
    });
    let ask;
    if (lv < 3) ask = q.holes.length > 1 ? '¿Qué números faltan en el tren?' : '¿Qué número falta en el tren?';
    else if (q.step === 1) ask = (q.down ? 'Cuenta hacia atrás. ' : 'Cuenta hacia delante. ') + (q.holes.length > 1 ? '¿Qué números faltan?' : '¿Qué número falta?');
    else ask = `Cuenta de ${q.step} en ${q.step}${q.down ? ' hacia atrás' : ''}. ${q.holes.length > 1 ? '¿Qué números faltan?' : '¿Qué número falta?'}`;
    g.ask(ask);
    g.area.appendChild(track);

    // opciones
    const need = lv === 1 ? 4 : 5;
    const set = new Set(answers);
    const cand = [];
    answers.forEach(a => [a + 1, a - 1, a + q.step, a - q.step, a + 2 * q.step, a + 10, a - 10].forEach(c => cand.push(c)));
    const lim = lv === 1 ? 10 : lv === 2 ? 20 : 100;
    U.shuffle(cand).forEach(c => { if (set.size < need && c >= 0 && c <= lim && !set.has(c) && !shown.has(c)) set.add(c); });
    while (set.size < need) { const a0 = answers[0], c = U.rnd(Math.max(lv === 3 ? 0 : 1, a0 - 6), Math.min(lim, a0 + 6)); if (!shown.has(c)) set.add(c); }
    const optsEl = U.el('<div class="x1-opts"></div>');
    g.area.appendChild(optsEl);
    g.area.appendChild(U.el('<div class="x1-tip">Toca el número y luego se pone solo, o arrástralo al vagón.</div>'));
    const open = () => holeEls.filter(h => !h.classList.contains('filled'));
    const place = (hole, btn) => {
      hole.classList.remove('hole'); hole.classList.add('filled'); hole.textContent = hole.dataset.v; Kids.sound.pop();
      btn.classList.add('used'); btn.disabled = true;
      if (!open().length) g.right();
    };
    const miss = btn => { g.shake(btn); g.wrong(); };
    const btns = U.shuffle([...set]).map(v => {
      const b = U.el(`<button class="ans" aria-label="Número ${v}">${v}</button>`);
      Kids.drag(b, {
        targets: open,
        onDrop(t) { if (+t.dataset.v === v) { place(t, b); b.style.transform = ''; return true; } miss(b); return false; },
        onTap() { const t = open().find(h => +h.dataset.v === v); if (t) place(t, b); else miss(b); }
      });
      b.addEventListener('click', e => { if (e.detail === 0) { const t = open().find(h => +h.dataset.v === v); if (t) place(t, b); else miss(b); } });
      optsEl.appendChild(b); return b;
    });
    g.helpHint = () => {
      g.toast('Mira los números de al lado');
      btns.forEach(b => { if (set.has(+b.textContent) && answers.includes(+b.textContent) && !b.disabled) b.classList.add('hint'); });
    };
  }
});
})();
