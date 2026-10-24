/* Mates X14 — Cuenta de 2 en 2, de 5 en 5 y de 10 en 10 (el canguro) */
(function () {
'use strict';
const U = Kids.util, A = Kids.art;
let lastKey = '';

A.add({
  'mx14-roo': `<svg viewBox="0 0 100 100">
<ellipse cx="50" cy="96" rx="30" ry="4" fill="rgba(20,35,91,.14)"/>
<path d="M30 78 Q4 84 6 94 Q22 96 40 88Z" fill="#C97E43"/>
<ellipse cx="46" cy="62" rx="22" ry="27" fill="#E0A064"/>
<path d="M58 40 Q76 52 72 80 Q68 90 56 88 Q64 66 52 48Z" fill="#E0A064"/>
<ellipse cx="53" cy="68" rx="13" ry="15" fill="#F6D9B2"/>
<path d="M42 62 Q53 70 64 62" fill="none" stroke="#C97E43" stroke-width="3" stroke-linecap="round"/>
<path d="M50 87 Q52 95 66 95 L82 95 Q86 88 74 86 L62 86Z" fill="#C97E43"/>
<path d="M44 88 Q48 96 62 96 L68 90 Q56 86 50 80Z" fill="#E0A064"/>
<ellipse cx="62" cy="31" rx="15" ry="14" fill="#E0A064"/>
<ellipse cx="75" cy="37" rx="11" ry="8" fill="#F6D9B2"/>
<path d="M50 24 Q40 4 46 4 Q58 8 58 22Z" fill="#E0A064"/>
<path d="M60 20 Q58 2 66 4 Q74 12 70 24Z" fill="#E0A064"/>
<path d="M52 20 Q46 8 48 8 Q54 10 55 20Z" fill="#F6B5A0"/>
<path d="M63 18 Q62 8 66 9 Q70 14 68 20Z" fill="#F6B5A0"/>
<circle cx="66" cy="29" r="3.6" fill="#14235B"/><circle cx="67.2" cy="27.8" r="1.2" fill="#fff"/>
<ellipse cx="82" cy="35" rx="3.6" ry="2.8" fill="#8A4F2A"/>
<path d="M72 42 q6 4 11 0" fill="none" stroke="#8A4F2A" stroke-width="2.4" stroke-linecap="round"/>
<circle cx="60" cy="38" r="3.4" fill="#FF9DB3" opacity=".6"/>
<path d="M54 52 Q64 56 66 62" fill="none" stroke="#C97E43" stroke-width="5" stroke-linecap="round"/>
</svg>`
});

Kids.css(`
.g-mates-x14{gap:.7rem}
.g-mates-x14 .kg-scene{position:relative;width:min(46rem,96%);padding:6rem .8rem 1.6rem;background:linear-gradient(#CDEBFA 0 52%,#7FD0F0 52%);border-radius:2rem;box-shadow:0 .4rem 0 rgba(20,35,91,.12);overflow:hidden;--sw:min(4.6rem,13vw);display:flex;flex-direction:column;gap:1.6rem;align-items:center}
.g-mates-x14 .kg-sun{position:absolute;right:1rem;top:.6rem;width:4rem;opacity:.95;pointer-events:none}
.g-mates-x14 .kg-row{display:flex;gap:.45rem;justify-content:center;position:relative;z-index:2}
.g-mates-x14 .kg-row.rev{flex-direction:row-reverse}
.g-mates-x14 .kg-st{width:var(--sw);height:calc(var(--sw)*.74);border-radius:50% 50% 46% 46%/62% 62% 38% 38%;background:#EFE9DA;border-bottom:.35rem solid #BDB49B;box-shadow:0 .3rem 0 rgba(20,35,91,.14);position:relative;display:flex;align-items:center;justify-content:center;font-family:'Baloo 2';font-weight:800;font-size:calc(var(--sw)*.42);color:var(--ink);padding:0;flex:none;transition:transform .15s,background .2s}
.g-mates-x14 .kg-st.gap{background:#fff;border:.22rem dashed #9CB5E8;color:#4C8DF6;animation:pulse 1.4s infinite}
.g-mates-x14 .kg-st.fillin{background:#BDEFC8;animation:pop .45s}
.g-mates-x14 button.kg-st:hover{transform:translateY(-.15rem)}
.g-mates-x14 .kg-st.bad{background:#FFD3CF;animation:shake .4s}
.g-mates-x14 .kg-st.right{background:#BDEFC8}
.g-mates-x14 .kg-st.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .35rem #FFD23F}
.g-mates-x14 .kg-st.land{animation:bounce .4s}
.g-mates-x14 .kg-lab{position:absolute;left:50%;bottom:-1.55rem;transform:translateX(-50%);background:#fff;border-radius:999px;padding:0 .5rem;font-family:'Baloo 2';font-size:.95rem;line-height:1.3;color:var(--gd);box-shadow:0 .15rem 0 var(--line);white-space:nowrap;display:none}
.g-mates-x14 .kg-scene.labels .kg-lab{display:block}
.g-mates-x14 .kg-cap{font-family:'Baloo 2';font-size:1.15rem;color:#fff;text-shadow:0 .1rem 0 rgba(20,35,91,.3);text-align:center;line-height:1}
.g-mates-x14 .kg-roo{position:absolute;left:0;top:0;width:var(--rw,5.4rem);height:var(--rw,5.4rem);z-index:5;pointer-events:none;will-change:transform}
.g-mates-x14 .kg-roo .in{display:block;width:100%;height:100%}
.g-mates-x14 .kg-roo svg{width:100%;height:100%;display:block}
.g-mates-x14 .kg-bar{display:flex;gap:.8rem;align-items:center;justify-content:center;flex-wrap:wrap}
.g-mates-x14 .kg-again{font-size:1.2rem;padding:.3rem 1.3rem}
.g-mates-x14 .opts .ans.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .5rem #FFD23F}
@media (max-width:640px){.g-mates-x14 .opts{gap:.6rem}.g-mates-x14 .opts .ans{min-width:4.2rem;font-size:2rem;padding:.2rem .9rem}.g-mates-x14 .kg-scene{padding-top:5rem;--rw:4.4rem}.g-mates-x14 .kg-sun{width:3rem}}
`);

function makeSeq(lv) {
  for (let t = 0; t < 60; t++) {
    let step, start, back = false;
    if (lv === 1) { step = 2; start = U.pick([0, 2, 4, 6, 8, 10]); }
    else if (lv === 2) {
      step = U.pick([5, 10]);
      start = step === 5 ? 5 * U.rnd(0, 14) : 10 * U.rnd(0, 5);
    } else {
      step = U.pick([2, 5, 5, 10]); back = Math.random() < .4;
      if (back) start = (step === 2 ? U.rnd(14, 40) : step === 5 ? 5 * U.rnd(6, 20) : 10 * U.rnd(6, 10)) + (step === 2 && Math.random() < .5 ? 1 : 0);
      else {
        if (step === 2) start = U.rnd(1, 30);
        else if (step === 5) start = Math.random() < .5 ? 5 * U.rnd(1, 12) : U.rnd(1, 40);
        else start = Math.random() < .5 ? 10 * U.rnd(1, 4) : U.rnd(1, 45);
      }
    }
    const seq = U.range(6).map(k => start + (back ? -k : k) * step);
    if (seq.some(v => v < 0 || v > 100)) continue;
    const key = step + ':' + start + back;
    if (key === lastKey) continue;
    lastKey = key;
    return { step, start, back, seq };
  }
  return { step: 2, start: 0, back: false, seq: [0, 2, 4, 6, 8, 10] };
}

Kids.game({
  id: 'mates-x14', group: 'mates', num: 19,
  title: 'Cuenta de 2 en 2, de 5 en 5 y de 10 en 10',
  blurb: 'El canguro salta por las piedras: ¿dónde cae?',
  how: 'El canguro salta de piedra en piedra contando de dos en dos, de cinco en cinco o de diez en diez. Completa el número que falta o toca la piedra donde cae.',
  icon: 'mx14-roo',
  levels: ['De 2 en 2 hasta 20', 'De 5 en 5 y de 10 en 10', 'Mezcla, desde otro número y hacia atrás'],
  rounds: 8,
  round(g, i) {
    const lv = g.level, p = makeSeq(lv), seq = p.seq;
    const mode = (lv === 1 ? Math.random() < .6 : Math.random() < .5) ? 'fill' : 'tap';
    const gi = mode === 'fill' ? U.rnd(2, 5) : 3;       // índice de la piedra misteriosa
    const answer = seq[gi];
    const stepTxt = p.step + ' en ' + p.step;
    const from = p.start !== 0 || lv === 3 ? ' desde el ' + p.start : '';
    const dir = p.back ? 'hacia atrás ' : '';
    const ask = mode === 'fill'
      ? 'El canguro salta ' + dir + 'de ' + stepTxt + from + '. ¿Qué número falta?'
      : 'El canguro salta ' + dir + 'de ' + stepTxt + from + '. ¿Dónde cae el siguiente salto?';
    g.ask(ask);

    const scene = U.el(`<div class="kg-scene ${lv === 1 ? 'labels' : ''}"><div class="kg-sun" aria-hidden="true">${A.get('sun')}</div></div>`);
    const row = U.el(`<div class="kg-row ${p.back ? 'rev' : ''}"></div>`);
    const stones = [];
    const lastKnown = mode === 'fill' ? gi - 1 : gi - 1;
    const shown = mode === 'fill' ? seq.length : gi;
    for (let k = 0; k < shown; k++) {
      const gap = mode === 'fill' && k === gi;
      const st = U.el(`<div class="kg-st ${gap ? 'gap' : ''}">${gap ? '?' : seq[k]}${k > 0 ? `<span class="kg-lab">${p.back ? '−' : '+'}${p.step}</span>` : ''}</div>`);
      row.appendChild(st); stones.push(st);
    }
    scene.appendChild(row);
    let cand = [], candRow = null;
    const roo = U.el(`<div class="kg-roo" aria-hidden="true"><span class="in">${A.get('mx14-roo')}</span></div>`);

    /* distractores */
    const pool = [answer + 1, answer - 1, answer + p.step, answer - p.step, answer + 2 * p.step, answer + (p.step === 10 ? 5 : 2), answer - (p.step === 10 ? 5 : 2), answer + 10, answer - 10, answer + 5, answer - 5]
      .filter(v => v >= 0 && v <= 100 && v !== answer && !seq.slice(0, shown).includes(v));
    const need = (lv === 1 ? 3 : 4) - 1;
    /* prioriza distractores creíbles (±1, ±step) y rellena con el resto */
    const prime = U.shuffle([...new Set(pool.slice(0, 4))]);
    const others = U.shuffle([...new Set(pool.slice(4))].filter(v => !prime.includes(v)));
    const dis = prime.concat(others).slice(0, need);
    const vals = U.shuffle([answer].concat(dis));

    let optsBox = null, btns = [], tapStones = [];
    if (mode === 'fill') {
      optsBox = U.el('<div class="opts"></div>');
      btns = vals.map(v => {
        const b = U.el(`<button class="ans" aria-label="${v}">${v}</button>`);
        b.onclick = () => {
          if (busy) return;
          if (v === answer) {
            btns.forEach(x => x.disabled = true); b.classList.add('right');
            const gs = stones[gi]; gs.classList.remove('gap'); gs.classList.add('fillin');
            gs.firstChild.textContent = v;
            finish(gs, stones.slice(gi + 1));
          } else { b.classList.add('bad'); b.disabled = true; g.wrong(); }
        };
        optsBox.appendChild(b); return b;
      });
    } else {
      candRow = U.el('<div class="kg-row"></div>');
      scene.appendChild(U.el('<div class="kg-cap">¿Dónde cae? Toca la piedra</div>'));
      scene.appendChild(candRow);
      tapStones = vals.map(v => {
        const b = U.el(`<button class="kg-st" aria-label="Piedra ${v}">${v}</button>`);
        b.onclick = () => {
          if (busy) return;
          if (v === answer) { tapStones.forEach(x => x.disabled = true); b.classList.add('right'); finish(b, []); }
          else { b.classList.add('bad'); g.wrong(); g.t(() => b.classList.remove('bad'), 450); }
        };
        candRow.appendChild(b); return b;
      });
    }
    scene.appendChild(roo);
    const bar = U.el('<div class="kg-bar"></div>');
    const again = U.el('<button class="btn white kg-again" aria-label="Ver otra vez el recorrido del canguro">↻ Ver otra vez</button>');
    bar.appendChild(again);
    g.area.append(scene, bar);
    if (optsBox) g.area.appendChild(optsBox);

    /* ---- canguro ---- */
    let busy = true, cur = { x: 0, y: 0 }, anims = [];
    const rw = () => roo.offsetWidth;
    const spot = el => {
      const sr = scene.getBoundingClientRect(), r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - sr.left - rw() / 2, y: r.top - sr.top - roo.offsetHeight * .86 };
    };
    const tr = q => `translate(${q.x}px,${q.y}px)`;
    function place(el, flip) { cur = spot(el); roo.style.transform = tr(cur); roo.firstChild.style.transform = flip ? 'scaleX(-1)' : ''; }
    function hop(el, dur, done) {
      const to = spot(el), from = cur;
      roo.firstChild.style.transform = to.x < from.x - 2 ? 'scaleX(-1)' : to.x > from.x + 2 ? '' : roo.firstChild.style.transform;
      const top = Math.min(from.y, to.y) - roo.offsetHeight * .55;
      const a = roo.animate([
        { transform: tr(from) + ' scale(1.05,.9)', offset: 0 },
        { transform: `translate(${(from.x + to.x) / 2}px,${top}px) scale(.95,1.08)`, offset: .5, easing: 'ease-in' },
        { transform: tr(to) + ' scale(1.08,.9)', offset: 1 }
      ], { duration: dur, easing: 'ease-out' });
      anims.push(a);
      let fin = false;
      const fn = () => { if (fin) return; fin = true; try { a.cancel(); } catch (e) {} cur = to; roo.style.transform = tr(to); el.classList.remove('land'); void el.offsetWidth; el.classList.add('land'); Kids.sound.tone(380 + 60 * (stones.indexOf(el) + 1), 0, .15, 'triangle', .12); done && done(); };
      a.onfinish = fn; g.t(fn, dur + 250);
    }
    function runPath(list, k, dur, end) {
      if (k >= list.length) { end && end(); return; }
      hop(list[k], dur, () => g.t(() => runPath(list, k + 1, dur, end), 120));
    }
    function intro() {
      busy = true; again.disabled = true;
      anims.forEach(a => { try { a.cancel(); } catch (e) {} }); anims = [];
      place(stones[0], p.back);
      g.t(() => runPath(stones.slice(1, lastKnown + 1), 0, 620, () => { busy = false; again.disabled = false; }), 600);
    }
    function finish(target, rest) {
      busy = true;
      hop(target, 650, () => {
        runPath(rest, 0, 420);
      });
      g.right();
    }
    again.onclick = () => { Kids.sound.tap(); if (!busy) intro(); };

    g.helpHint = () => {
      g.toast(p.back ? 'Cada salto quita ' + p.step : 'Cada salto suma ' + p.step);
      scene.classList.add('labels');
      if (mode === 'fill') btns.forEach(b => { if (+b.textContent === answer && !b.disabled) b.classList.add('hint'); });
      else tapStones.forEach(b => { if (+b.textContent === answer && !b.disabled) b.classList.add('hint'); });
    };

    g.t(intro, 150);
  }
});
})();
