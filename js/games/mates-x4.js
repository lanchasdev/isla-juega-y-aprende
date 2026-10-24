/* Mates X4 — ¿Qué hora es? */
(function () {
'use strict';
const U = Kids.util, A = Kids.art;
let lastKey = '';

function clockSvg(h, m, opt) {
  opt = opt || {};
  const ha = ((h % 12) + m / 60) * 30, ma = m * 6;
  let s = `<svg viewBox="0 0 200 200" class="x4-svg" role="img" aria-label="Reloj de agujas"><circle cx="100" cy="104" r="92" fill="#14235B" opacity=".1"/><circle cx="100" cy="100" r="92" fill="#FFD23F"/><circle cx="100" cy="100" r="80" fill="#fff"/>`;
  for (let k = 0; k < 60; k++) {
    const a = k * 6 * Math.PI / 180, r1 = k % 5 ? 74 : 70, r2 = 78;
    s += `<line x1="${100 + Math.sin(a) * r1}" y1="${100 - Math.cos(a) * r1}" x2="${100 + Math.sin(a) * r2}" y2="${100 - Math.cos(a) * r2}" stroke="#14235B" stroke-width="${k % 5 ? 1 : 2.6}" stroke-linecap="round" opacity="${k % 5 ? .35 : .8}"/>`;
  }
  for (let k = 1; k <= 12; k++) {
    const a = k * 30 * Math.PI / 180;
    s += `<text x="${100 + Math.sin(a) * 56}" y="${100 - Math.cos(a) * 56 + 7}" text-anchor="middle" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="21" fill="#14235B">${k}</text>`;
  }
  s += `<g class="x4-hh" style="transform:rotate(${ha}deg);transform-origin:100px 100px"><rect x="94" y="52" width="12" height="52" rx="6" fill="#FF7E69"/></g>`;
  s += `<g class="x4-mh" style="transform:rotate(${ma}deg);transform-origin:100px 100px"><rect x="96.5" y="26" width="7" height="80" rx="3.5" fill="#2A8A94"/></g>`;
  s += `<circle cx="100" cy="100" r="7" fill="#14235B"/><circle cx="100" cy="100" r="2.6" fill="#FFD23F"/></svg>`;
  return s;
}
A.add({ 'mx4-reloj': (h, m) => clockSvg(h == null ? 3 : h, m || 0) });

Kids.css(`
.g-mates-x4 .x4-wrap{display:flex;gap:1.4rem;align-items:center;justify-content:center;width:100%;flex-wrap:wrap}
.g-mates-x4 .x4-clock{width:min(19rem,56vw,36vh);flex:none;position:relative;touch-action:none}
.g-mates-x4 .x4-clock .x4-svg{width:100%;height:auto}
.g-mates-x4 .x4-clock g{transition:transform .35s cubic-bezier(.3,1.4,.5,1)}
.g-mates-x4 .x4-side{display:flex;flex-direction:column;gap:.8rem;align-items:center}
.g-mates-x4 .x4-opts{display:grid;grid-template-columns:1fr 1fr;gap:.9rem;width:min(30rem,92vw)}
.g-mates-x4 .x4-opts.three{grid-template-columns:1fr}
.g-mates-x4 .x4-opt{min-height:4.4rem;border-radius:1.4rem;padding:.3rem .6rem;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.05;font-family:'Baloo 2';font-weight:800;font-size:1.5rem;box-shadow:0 .4rem 0 rgba(20,35,91,.16);transition:transform .12s}
.g-mates-x4 .x4-opt small{font-family:'Nunito';font-weight:800;font-size:1.05rem;color:var(--ink2)}
.g-mates-x4 .x4-opt:nth-child(4n+1){background:var(--a1)}.g-mates-x4 .x4-opt:nth-child(4n+2){background:var(--a2)}
.g-mates-x4 .x4-opt:nth-child(4n+3){background:var(--a3)}.g-mates-x4 .x4-opt:nth-child(4n+4){background:var(--a4)}
.g-mates-x4 .x4-opt:hover{transform:translateY(-.15rem)}
.g-mates-x4 .x4-opt.right{background:#BDEFC8!important;box-shadow:0 .4rem 0 #5CC77A;animation:pop .5s}
.g-mates-x4 .x4-opt.bad{background:#FFD3CF!important;animation:shake .4s}
.g-mates-x4 .x4-opt.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .45rem #FFD23F}
.g-mates-x4 .x4-opt[disabled]{pointer-events:none}
.g-mates-x4 .x4-dig{font-family:'Baloo 2';font-weight:800;font-size:2.6rem;line-height:1;background:#14235B;color:#9CF0A8;border-radius:1rem;padding:.2rem 1.2rem;letter-spacing:.1rem;min-width:7rem;text-align:center;font-variant-numeric:tabular-nums}
.g-mates-x4 .x4-ctl{display:flex;align-items:center;gap:.6rem;background:#fff;border-radius:1.4rem;padding:.4rem .7rem;box-shadow:0 .3rem 0 var(--line)}
.g-mates-x4 .x4-ctl label{font-family:'Baloo 2';font-size:1.2rem;min-width:5.6rem;text-align:center;line-height:1}
.g-mates-x4 .x4-ctl label i{display:inline-block;width:.9rem;height:.9rem;border-radius:50%;margin-right:.3rem;vertical-align:-.05rem}
.g-mates-x4 .x4-pm{width:3.4rem;height:3.4rem;border-radius:50%;background:var(--a3);font-family:'Baloo 2';font-size:2rem;line-height:1;box-shadow:0 .25rem 0 rgba(20,35,91,.16)}
.g-mates-x4 .x4-pm.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .4rem #FFD23F}
.g-mates-x4 .x4-mins{display:flex;gap:.5rem;flex-wrap:wrap;justify-content:center}
.g-mates-x4 .x4-mins button{border-radius:999px;background:#fff;padding:.3rem 1rem;font-family:'Baloo 2';font-size:1.15rem;box-shadow:0 .25rem 0 var(--line);border:.18rem solid var(--line);min-height:2.8rem}
.g-mates-x4 .x4-mins button.on{background:var(--g);color:#fff;border-color:var(--g)}
.g-mates-x4 .x4-mins button.hint{animation:pulse 1s infinite}
.g-mates-x4 .x4-legend{font-size:1rem;color:var(--ink2);display:flex;gap:1rem;flex-wrap:wrap;justify-content:center}
.g-mates-x4 .x4-legend i{display:inline-block;width:1.4rem;height:.5rem;border-radius:.3rem;margin-right:.3rem;vertical-align:.15rem}
@media (max-width:640px){.g-mates-x4 .x4-opt{font-size:1.2rem}.g-mates-x4 .x4-wrap{gap:.8rem}}
`);

const HN = h => h === 1 ? 'la 1' : 'las ' + h;
function txt(h, m) {
  if (m === 0) return HN(h) + ' en punto';
  if (m === 30) return HN(h) + ' y media';
  if (m === 15) return HN(h) + ' y cuarto';
  const n = h % 12 + 1; return HN(n) + ' menos cuarto';
}
const dig = (h, m) => h + ':' + (m < 10 ? '0' + m : m);

Kids.game({
  id: 'mates-x4', group: 'mates', num: 9,
  title: '¿Qué hora es?',
  blurb: 'Lee la hora en el reloj y pon las agujas donde toca.',
  how: 'Mira el reloj. La aguja corta marca la hora y la larga los minutos. Elige la hora correcta, o pon tú las agujas.',
  icon: 'sun',
  levels: ['Horas en punto', 'En punto y media', 'Cuarto, menos cuarto y poner la hora'],
  rounds: 8,
  round(g, i) {
    const lv = g.level, mins = lv === 1 ? [0] : lv === 2 ? [0, 30] : [0, 15, 30, 45];
    const setMode = lv === 3 ? i % 2 === 1 : (i === 3 || i === 7);
    let h, m, key;
    do { h = U.rnd(1, 12); m = U.pick(lv === 2 ? [0, 30, 0, 30] : mins); key = h + ':' + m; } while (key === lastKey);
    lastKey = key;
    const wrap = U.el('<div class="x4-wrap"></div>'); g.area.appendChild(wrap);
    const clockBox = U.el('<div class="x4-clock"></div>'); wrap.appendChild(clockBox);
    const side = U.el('<div class="x4-side"></div>'); wrap.appendChild(side);
    const legend = '<div class="x4-legend"><span><i style="background:#FF7E69"></i>aguja corta: la hora</span><span><i style="background:#2A8A94"></i>aguja larga: los minutos</span></div>';

    if (!setMode) {
      g.ask('¿Qué hora marca el reloj?');
      clockBox.innerHTML = clockSvg(h, m);
      side.insertAdjacentHTML('beforeend', legend);
      // opciones
      const all = [];
      U.range(12, 1).forEach(hh => mins.forEach(mm => all.push([hh, mm])));
      const same = (a, b) => a[0] === b[0] && a[1] === b[1];
      const T = [h, m], chosen = [T];
      const add = c => { if (chosen.length < (lv === 1 ? 3 : 4) && !chosen.some(x => same(x, c) || txt(x[0], x[1]) === txt(c[0], c[1]))) chosen.push(c); };
      const hp = h % 12 + 1, hm = (h + 10) % 12 + 1;
      if (lv === 1) { add([hp, 0]); add([hm, 0]); }
      else {
        add([h, mins.filter(x => x !== m)[U.rnd(0, mins.length - 2)]]);
        add([U.pick([hp, hm]), m]);
        add([U.pick([hp, hm]), U.pick(mins)]);
      }
      U.shuffle(all).forEach(add);
      const ob = U.el(`<div class="x4-opts ${lv === 1 ? 'three' : ''}"></div>`);
      const btns = U.shuffle(chosen).map(c => {
        const b = U.el(`<button class="x4-opt" aria-label="${txt(c[0], c[1])}"><span>${txt(c[0], c[1])}</span><small>${dig(c[0], c[1])}</small></button>`);
        b.onclick = () => {
          if (same(c, T)) { btns.forEach(x => x.disabled = true); b.classList.add('right'); g.right(); }
          else { b.classList.add('bad'); b.disabled = true; g.wrong(); }
        };
        ob.appendChild(b); return b;
      });
      side.appendChild(ob);
      g.helpHint = () => {
        g.toast(m === 0 ? 'La aguja larga está en el 12: es en punto' : m === 30 ? 'La aguja larga está en el 6: es y media' : m === 15 ? 'La aguja larga está en el 3: es y cuarto' : 'La aguja larga está en el 9: es menos cuarto');
        btns.forEach(b => { if (b.getAttribute('aria-label') === txt(h, m) && !b.disabled) b.classList.add('hint'); });
      };
      return;
    }

    // modo: poner la hora
    g.ask('Pon el reloj a ' + txt(h, m));
    let ch = U.rnd(1, 12), cm = 0;
    if (ch === h && m === 0) ch = h % 12 + 1;
    const render = () => {
      const ha = ((ch % 12) + cm / 60) * 30, ma = cm * 6;
      const hhE = clockBox.querySelector('.x4-hh'), mhE = clockBox.querySelector('.x4-mh');
      if (!hhE) { clockBox.innerHTML = clockSvg(ch, cm); } else { hhE.style.transform = `rotate(${ha}deg)`; mhE.style.transform = `rotate(${ma}deg)`; }
      if (digEl) digEl.textContent = dig(ch, cm);
      minBtns.forEach(b => b.classList.toggle('on', +b.dataset.m === cm));
    };
    const digEl = lv < 3 ? U.el('<div class="x4-dig" aria-live="polite"></div>') : null;
    if (digEl) side.appendChild(digEl);
    const ctl = U.el(`<div class="x4-ctl"><button class="x4-pm" data-d="-1" aria-label="Una hora menos">−</button><label><i style="background:#FF7E69"></i>hora</label><button class="x4-pm" data-d="1" aria-label="Una hora más">+</button></div>`);
    side.appendChild(ctl);
    ctl.querySelectorAll('.x4-pm').forEach(b => b.onclick = () => { ch = ((ch - 1 + +b.dataset.d + 12) % 12) + 1; Kids.sound.pop(); render(); });
    const minRow = U.el('<div class="x4-mins"></div>');
    const MN = { 0: 'en punto', 15: 'y cuarto', 30: 'y media', 45: 'menos cuarto' };
    const minBtns = (lv === 1 ? [] : mins).map(v => {
      const b = U.el(`<button data-m="${v}" aria-label="Minutero: ${MN[v]}">${MN[v]}</button>`);
      b.onclick = () => { cm = v; Kids.sound.pop(); render(); };
      minRow.appendChild(b); return b;
    });
    if (lv > 1) { side.appendChild(U.el('<div class="x4-legend"><span><i style="background:#2A8A94"></i>aguja larga: elige o arrástrala</span></div>')); side.appendChild(minRow); }
    const ok = U.el('<button class="btn">¡Listo!</button>');
    ok.onclick = () => {
      if (ch === h && cm === m) { ok.disabled = true; g.right(); }
      else { g.shake(clockBox); g.wrong(ch !== h ? 'Mira la aguja corta: ¿a qué hora apunta?' : 'Mira la aguja larga'); }
    };
    side.appendChild(ok);
    render();
    // arrastrar el minutero sobre la esfera
    if (lv > 1) {
      let dragging = false;
      const setFrom = e => {
        const r = clockBox.getBoundingClientRect(), x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
        let mm = ((Math.atan2(x, -y) * 180 / Math.PI + 360) % 360) / 6, best = 0, bd = 99;
        mins.forEach(v => { const d = Math.min(Math.abs(v - mm), 60 - Math.abs(v - mm)); if (d < bd) { bd = d; best = v; } });
        if (best !== cm) { cm = best; Kids.sound.pop(); render(); }
      };
      clockBox.addEventListener('pointerdown', e => { dragging = true; try { clockBox.setPointerCapture(e.pointerId); } catch (_) {} setFrom(e); });
      clockBox.addEventListener('pointermove', e => { if (dragging) setFrom(e); });
      clockBox.addEventListener('pointerup', () => { dragging = false; });
      clockBox.addEventListener('pointercancel', () => { dragging = false; });
    }
    g.helpHint = () => {
      g.toast(m === 0 ? `Aguja corta en el ${h}, aguja larga en el 12` : m === 30 ? `Aguja corta pasado el ${h}, aguja larga en el 6` : m === 15 ? `Aguja corta pasado el ${h}, aguja larga en el 3` : `Aguja corta casi en el ${h % 12 + 1}, aguja larga en el 9`);
      ctl.querySelectorAll('.x4-pm').forEach(b => b.classList.add('hint'));
      minBtns.forEach(b => { if (+b.dataset.m === m) b.classList.add('hint'); });
    };
  }
});
})();
