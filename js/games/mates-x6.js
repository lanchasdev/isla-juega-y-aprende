/* Mates x6 — Recta numérica (la rana salta por los nenúfares) */
(function () {
'use strict';
const U = Kids.util, A = Kids.art;

Kids.css(`
.g-mates-x6 .x6-eq{display:flex;align-items:center;justify-content:center;gap:.7rem;flex-wrap:wrap;font-family:'Baloo 2';font-weight:800;font-size:3rem;line-height:1;background:#fff;border-radius:1.8rem;padding:.3rem 1.2rem;box-shadow:0 .4rem 0 var(--line)}
.g-mates-x6 .x6-eq .fr{width:3.4rem;height:3.4rem}
.g-mates-x6 .x6-j{background:var(--a2);border-radius:999px;padding:0 1rem;font-size:2.4rem;box-shadow:0 .25rem 0 #E8CF6A}
.g-mates-x6 .x6-j.neg{background:var(--a4);box-shadow:0 .25rem 0 #EDA9BA}
.g-mates-x6 .x6-q{background:var(--gl);border-radius:1rem;min-width:3.4rem;text-align:center;padding:0 .6rem}
.g-mates-x6 .x6-pond{width:min(62rem,98%);background:linear-gradient(#BFE6FB,#8ED0F0);border-radius:2rem;padding:1.2rem .8rem .8rem;box-shadow:0 .4rem 0 rgba(20,35,91,.12)}
.g-mates-x6 .x6-grid{position:relative;display:grid;grid-template-columns:repeat(var(--c),1fr);gap:2.9rem .2rem}
.g-mates-x6 .x6-pad{width:100%;max-width:4.8rem;aspect-ratio:1;margin:0 auto;border-radius:50%;background:radial-gradient(circle at 35% 30%,#8FE29B,#4DB86A);box-shadow:0 .3rem 0 #348F4F,inset 0 -.2rem 0 rgba(0,0,0,.08);font-family:'Baloo 2';font-weight:800;font-size:1.7rem;color:#0F3D1F;display:flex;align-items:center;justify-content:center;position:relative;transition:transform .12s}
.g-mates-x6 .x6-pad:hover{transform:translateY(-.12rem)}
.g-mates-x6 .x6-pad::after{content:'';position:absolute;right:-4%;top:42%;width:26%;height:14%;background:#BFE6FB;border-radius:0 0 0 60%;transform:rotate(-20deg);opacity:.0}
.g-mates-x6 .x6-pad.bad{background:radial-gradient(circle at 35% 30%,#FFD3CF,#F5A19A);animation:shake .4s}
.g-mates-x6 .x6-pad.right{background:radial-gradient(circle at 35% 30%,#FFF3A8,#FFD23F);box-shadow:0 .3rem 0 #E0A800;animation:pop .5s}
.g-mates-x6 .x6-pad.goal{box-shadow:0 0 0 .3rem #FFD23F,0 .3rem 0 #348F4F}
.g-mates-x6 .x6-pad.step{animation:pulse .6s 2;box-shadow:0 0 0 .3rem #fff,0 .3rem 0 #348F4F}
.g-mates-x6 .x6-pad.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .4rem #FFD23F,0 .3rem 0 #348F4F}
.g-mates-x6 .x6-pad[disabled]{pointer-events:none}
.g-mates-x6 .x6-frog{position:absolute;left:0;top:0;width:3.6rem;height:3.6rem;pointer-events:none;z-index:3;filter:drop-shadow(0 .2rem .1rem rgba(0,0,0,.2))}
.g-mates-x6 .x6-frog svg{width:100%;height:100%}
@media (max-width:640px){.g-mates-x6 .x6-grid{grid-template-columns:repeat(var(--cm),1fr)}.g-mates-x6 .x6-eq{font-size:2.2rem}.g-mates-x6 .x6-j{font-size:1.8rem}.g-mates-x6 .x6-pad{font-size:1.4rem}.g-mates-x6 .x6-frog{width:3rem;height:3rem}.g-mates-x6 .x6-grid{gap:2.4rem .2rem}}
`);

const sgn = d => (d > 0 ? '+' : '−') + Math.abs(d);
const say = d => d > 0 ? d + ' hacia delante (+' + d + ')' : Math.abs(d) + ' hacia atrás (−' + Math.abs(d) + ')';

function make(lv) {
  if (lv === 1) {
    const d = U.pick([1, 2]), s = U.rnd(0, 10 - d);
    return { type: 'jump', s, ds: [d], max: 10 };
  }
  if (lv === 2) {
    let d, s;
    do { d = U.pick([1, 2, 3, -1, -2, -3]); s = U.rnd(0, 15); } while (s + d < 0 || s + d > 15);
    return { type: 'jump', s, ds: [d], max: 15 };
  }
  if (Math.random() < .4) { // ¿qué salto lleva del a al b?
    const a = U.rnd(0, 17), b = U.rnd(Math.max(0, a - 7), Math.min(20, a + 7));
    if (a === b) return make(lv);
    return { type: 'which', s: a, e: b, max: 20 };
  }
  for (let t = 0; t < 60; t++) {
    const x = U.rnd(3, 7), y = U.rnd(1, 5), s = U.rnd(0, 20 - x);
    const first = Math.random() < .7;
    const ds = first ? [x, -y] : [-y, x];
    const m = s + ds[0]; if (m < 0 || m > 20 || m + ds[1] < 0 || m + ds[1] > 20) continue;
    return { type: 'jump', s, ds, max: 20 };
  }
  return { type: 'jump', s: 6, ds: [5, -3], max: 20 };
}

Kids.game({
  id: 'mates-x6', group: 'mates', num: 11,
  title: 'Recta numérica',
  blurb: 'Ayuda a la rana a saltar por los nenúfares.',
  how: 'Mira dónde está la rana y cuánto salta. Toca el nenúfar donde caerá.',
  icon: 'frog',
  levels: ['Hasta 10, saltos de 1 y 2', 'Hasta 15, hacia delante y atrás', 'Hasta 20, dos saltos'],
  rounds: 8,
  round(g, i) {
    const p = make(g.level), N = p.max;
    const cols = N === 10 ? 11 : N === 15 ? 8 : 11;
    let end = p.s; if (p.type === 'jump') p.ds.forEach(d => end += d); else end = p.e;
    const eq = U.el('<div class="x6-eq"></div>');
    const fr = `<span class="fr">${A.get('frog')}</span>`;
    if (p.type === 'jump') {
      eq.innerHTML = fr + `<span>${p.s}</span>` + p.ds.map(d => `<span class="x6-j ${d < 0 ? 'neg' : ''}">${sgn(d)}</span>`).join('') + '<span>=</span><span class="x6-q">?</span>';
      g.ask('La rana está en el ' + p.s + (p.ds.length === 1 ? ' y salta ' + say(p.ds[0]) : ', salta ' + say(p.ds[0]) + ' y luego ' + say(p.ds[1])) + '. ¿Dónde cae?');
    } else {
      eq.innerHTML = fr + `<span>${p.s}</span><span class="x6-j x6-q">?</span><span>=</span><span>${p.e}</span>`;
      g.ask('La rana está en el ' + p.s + ' y quiere llegar al ' + p.e + '. ¿Qué salto tiene que dar?');
    }
    g.area.appendChild(eq);
    const pond = U.el('<div class="x6-pond"></div>');
    const grid = U.el(`<div class="x6-grid" style="--c:${cols};--cm:${N === 20 ? 7 : 6}"></div>`);
    pond.appendChild(grid); g.area.appendChild(pond);
    const pads = [];
    for (let n = 0; n <= N; n++) {
      const b = U.el(`<button class="x6-pad" aria-label="Nenúfar ${n}">${n}</button>`);
      grid.appendChild(b); pads.push(b);
    }
    const frog = U.el(`<div class="x6-frog" aria-hidden="true">${A.get('frog')}</div>`);
    grid.appendChild(frog);
    let pos = p.s, busy = false;
    const place = n => {
      const pd = pads[n];
      frog.style.left = (pd.offsetLeft + pd.offsetWidth / 2 - frog.offsetWidth / 2) + 'px';
      frog.style.top = (pd.offsetTop - frog.offsetHeight * .62) + 'px';
    };
    place(pos);
    try { const ro = new ResizeObserver(() => place(pos)); ro.observe(grid); } catch (e) {}
    const hop = (to, done) => {
      const a = pads[pos], b = pads[to];
      const dx = b.offsetLeft - a.offsetLeft + (b.offsetWidth - a.offsetWidth) / 2, dy = b.offsetTop - a.offsetTop;
      Kids.sound.tone(520 + to * 18, 0, .12, 'triangle', .12);
      let anim;
      try { anim = frog.animate([{ transform: 'translate(0,0) scale(1,1)' }, { transform: `translate(${dx / 2}px,${dy / 2 - 46}px) scale(.9,1.12)`, offset: .5 }, { transform: `translate(${dx}px,${dy}px) scale(1.1,.88)`, offset: .92 }, { transform: `translate(${dx}px,${dy}px)` }], { duration: 560, easing: 'ease-in-out' }); } catch (e) {}
      g.t(() => { pos = to; place(pos); if (anim) anim.cancel(); Kids.sound.pop(); done && done(); }, anim ? 570 : 0);
    };
    const settle = () => { pads[end].classList.add('right'); g.right(); };

    if (p.type === 'jump') {
      pads.forEach((b, n) => b.onclick = () => {
        if (busy) return;
        if (n !== end) { b.classList.add('bad'); b.disabled = true; g.wrong(); return; }
        busy = true; pads.forEach(x => x.disabled = true);
        let at = p.s;
        const seq = p.ds.map(d => at += d);
        const stepAt = k => hop(seq[k], () => { if (k + 1 < seq.length) g.t(() => stepAt(k + 1), 250); else { eq.querySelector('.x6-q').textContent = end; settle(); } });
        stepAt(0);
      });
      g.helpHint = () => {
        g.toast('Cuenta los saltos conmigo');
        let at = p.s, k = 0;
        p.ds.forEach(d => { const sg = Math.sign(d); for (let m = 1; m <= Math.abs(d); m++) { at += sg; const pd = pads[at]; g.t(() => { pd.classList.remove('step'); void pd.offsetWidth; pd.classList.add('step'); Kids.sound.pop(); }, 450 * (++k)); } });
        g.t(() => { const pd = pads[end]; if (!pd.disabled) pd.classList.add('hint'); }, 450 * (k + 1));
      };
    } else {
      pads[p.e].classList.add('goal');
      const d = p.e - p.s;
      const vals = U.shuffle([d, d + 1, d - 1, -d, d + 2].filter((v, k, arr) => v !== 0 && arr.indexOf(v) === k)).filter(v => v === d || true);
      const opts = [d].concat(U.shuffle(vals.filter(v => v !== d)).slice(0, 3));
      const box = U.el('<div class="opts"></div>');
      U.shuffle(opts).forEach(v => {
        const b = U.el(`<button class="ans" aria-label="Salto ${sgn(v)}">${sgn(v)}</button>`);
        b.onclick = () => {
          if (busy) return;
          if (v !== d) { b.classList.add('bad'); b.disabled = true; g.wrong(); return; }
          busy = true; b.classList.add('right'); box.querySelectorAll('button').forEach(x => x.disabled = true);
          eq.querySelector('.x6-q').textContent = sgn(d);
          hop(p.e, () => { pads[p.e].classList.add('right'); g.right(); });
        };
        box.appendChild(b);
      });
      g.area.appendChild(box);
      g.helpHint = () => {
        g.toast('Cuenta cuántos nenúfares hay hasta el ' + p.e);
        const sg = Math.sign(d); let at = p.s;
        for (let m = 1; m <= Math.abs(d); m++) { at += sg; const pd = pads[at]; g.t(() => { pd.classList.remove('step'); void pd.offsetWidth; pd.classList.add('step'); Kids.sound.pop(); }, 450 * m); }
        g.t(() => box.querySelectorAll('button').forEach(b => { if (b.textContent === sgn(d) && !b.disabled) b.classList.add('pulse'); }), 450 * (Math.abs(d) + 1));
      };
    }
  }
});
})();
