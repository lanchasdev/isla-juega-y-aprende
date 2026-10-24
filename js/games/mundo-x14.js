/* mundo-x14 — Higiene */
(function () {
'use strict';
const U = Kids.util;
const V = (inner) => '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="52" r="46" fill="#EAF6FD"/>' + inner + '</svg>';
const SKIN = '#F6C9A0', SK2 = '#E0A878', BLUE = '#6CB8F0';
const drops = (xs, y) => xs.map((x, k) => `<path d="M${x} ${y + (k % 2) * 8} q-4 6 0 9 q4 -3 0 -9z" fill="${BLUE}"/>`).join('');
const tap = '<path d="M14 18h48q10 0 10 10v6" stroke="#9AA7BD" stroke-width="9" fill="none" stroke-linecap="round"/><rect x="10" y="10" width="14" height="6" rx="3" fill="#7C8AA5"/>';
const hands = (cy) => `<g stroke="${SK2}" stroke-width="2"><ellipse cx="38" cy="${cy}" rx="22" ry="11" fill="${SKIN}" transform="rotate(-12 38 ${cy})"/><ellipse cx="62" cy="${cy}" rx="22" ry="11" fill="${SKIN}" transform="rotate(12 62 ${cy})"/></g><g fill="${SKIN}" stroke="${SK2}" stroke-width="1.6"><rect x="18" y="${cy - 20}" width="6" height="16" rx="3" transform="rotate(-14 21 ${cy - 12})"/><rect x="26" y="${cy - 22}" width="6" height="16" rx="3" transform="rotate(-8 29 ${cy - 14})"/><rect x="68" y="${cy - 22}" width="6" height="16" rx="3" transform="rotate(8 71 ${cy - 14})"/><rect x="76" y="${cy - 20}" width="6" height="16" rx="3" transform="rotate(14 79 ${cy - 12})"/></g>`;
const bub = (pts) => pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="${p[2]}" fill="#fff" stroke="#9CD3F5" stroke-width="1.6"/>`).join('');
const brush = (x, y, rot, paste) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-34" y="-5" width="48" height="10" rx="5" fill="#4C8DF6"/><rect x="8" y="-9" width="22" height="12" rx="4" fill="#fff" stroke="#4C8DF6" stroke-width="2.4"/>${paste ? '<path d="M10 -9 q10 -10 20 0z" fill="#5CC77A"/>' : ''}<g stroke="#9CD3F5" stroke-width="2" stroke-linecap="round"><path d="M12 -2v5M17 -2v5M22 -2v5M27 -2v5"/></g></g>`;
const person = (cy, extra, shirt) => `<path d="M16 100Q18 76 50 76Q82 76 84 100Z" fill="${shirt || SKIN}"/><circle cx="50" cy="${cy}" r="19" fill="${SKIN}" stroke="${SK2}" stroke-width="2"/><path d="M31 ${cy - 2}Q32 ${cy - 22} 50 ${cy - 22}Q68 ${cy - 22} 69 ${cy - 2}Q58 ${cy - 12} 50 ${cy - 12}Q42 ${cy - 12} 31 ${cy - 2}Z" fill="#8B5E3C"/><circle cx="43" cy="${cy + 2}" r="2.2" fill="#14235B"/><circle cx="57" cy="${cy + 2}" r="2.2" fill="#14235B"/><path d="M44 ${cy + 9}q6 5 12 0" stroke="#14235B" stroke-width="2.4" fill="none" stroke-linecap="round"/>${extra || ''}`;
const shower = '<path d="M86 6V22" stroke="#9AA7BD" stroke-width="6" stroke-linecap="round"/><path d="M60 22h40l-6 10H66z" fill="#9AA7BD" transform="translate(-12 0)"/>';
const towel = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#4C8DF6"/><rect x="${x}" y="${y + h * .3}" width="${w}" height="${h * .12}" fill="#fff" opacity=".8"/><rect x="${x}" y="${y + h * .55}" width="${w}" height="${h * .12}" fill="#fff" opacity=".8"/>`;

Kids.art.add({
  'wx14-m1': V(`${tap}${drops([60, 70, 80], 40)}${hands(76)}`),
  'wx14-m2': V(`<rect x="34" y="14" width="34" height="22" rx="9" fill="#FF8FB1" stroke="#E0608A" stroke-width="2.6" transform="rotate(-8 50 25)"/><path d="M42 22h14" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>${bub([[28, 30, 5], [74, 36, 6], [24, 48, 3.5]])}${hands(76)}${bub([[42, 70, 5], [58, 72, 6]])}`),
  'wx14-m3': V(`${hands(66)}${bub([[30, 56, 8], [46, 50, 10], [62, 54, 9], [76, 60, 7], [38, 74, 7], [56, 76, 8], [70, 74, 6], [50, 38, 5], [22, 72, 4], [82, 44, 4]])}<path d="M12 90q6 6 14 2M88 90q-6 6 -14 2" stroke="#8C7BE0" stroke-width="3.4" fill="none" stroke-linecap="round"/>`),
  'wx14-m4': V(`${tap}${drops([56, 66, 76, 86], 40)}${hands(76)}${bub([[44, 66, 4], [58, 70, 3.4]])}`),
  'wx14-m5': V(`${towel(14, 40, 72, 44)}<g stroke="${SK2}" stroke-width="2"><ellipse cx="38" cy="48" rx="19" ry="9" fill="${SKIN}" transform="rotate(-10 38 48)"/><ellipse cx="62" cy="48" rx="19" ry="9" fill="${SKIN}" transform="rotate(10 62 48)"/></g><path d="M22 22q4 -8 10 0M44 16q4 -8 10 0M68 22q4 -8 10 0" stroke="#FFD23F" stroke-width="3.4" fill="none" stroke-linecap="round"/>`),
  'wx14-d1': V(`${brush(46, 62, -8, true)}<path d="M64 24h24v22h-24z" fill="#FF7E69"/><rect x="62" y="18" width="28" height="8" rx="3" fill="#fff"/><path d="M68 46q-4 12 -8 8" stroke="#5CC77A" stroke-width="5" fill="none" stroke-linecap="round"/><g fill="#FFD23F"><path d="M20 24l3 -6 3 6 6 3 -6 3 -3 6 -3 -6 -6 -3z"/></g>`),
  'wx14-d2': V(`<path d="M12 60q38 36 76 0q-38 -14 -76 0z" fill="#FF8FA3" stroke="#E0608A" stroke-width="2.6"/><path d="M18 60q32 -9 64 0q-4 16 -32 18q-28 -2 -32 -18z" fill="#fff"/><path d="M34 60v14M50 58v18M66 60v14" stroke="#CFE3F2" stroke-width="2"/>${brush(60, 40, -14, false)}${bub([[22, 40, 5], [34, 30, 4], [80, 36, 5], [86, 56, 3.4]])}`),
  'wx14-d3': V(`<ellipse cx="50" cy="66" rx="40" ry="20" fill="#fff" stroke="#9AA7BD" stroke-width="3"/><ellipse cx="50" cy="66" rx="30" ry="13" fill="#DCEFFB"/><circle cx="50" cy="68" r="4" fill="#9AA7BD"/><path d="M50 14v24" stroke="#F26B6B" stroke-width="5" stroke-linecap="round"/><path d="M42 30l8 10 8 -10" stroke="#F26B6B" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${bub([[30, 62, 5], [68, 62, 6], [40, 72, 4]])}`),
  'wx14-d4': V(`<path d="M30 40h36l-4 42q-1 6 -7 6H41q-6 0 -7 -6z" fill="#fff" stroke="#6CB8E0" stroke-width="3"/><path d="M33 56h30l-2 24q-1 4 -5 4H40q-4 0 -5 -4z" fill="${BLUE}" opacity=".75"/><path d="M26 44q-6 -10 4 -16" stroke="${BLUE}" stroke-width="3.4" fill="none" stroke-linecap="round"/>${drops([74, 84, 78], 26)}<path d="M68 52q8 -2 10 6M70 66q8 -2 10 6" stroke="${BLUE}" stroke-width="3" fill="none" stroke-linecap="round"/>`),
  'wx14-d5': V(`<circle cx="50" cy="46" r="26" fill="${SKIN}" stroke="${SK2}" stroke-width="2"/><path d="M26 42Q28 18 50 18Q72 18 74 42Q62 30 50 32Q38 30 26 42Z" fill="#8B5E3C"/><circle cx="41" cy="48" r="2.6" fill="#14235B"/><circle cx="59" cy="48" r="2.6" fill="#14235B"/><path d="M42 58q8 7 16 0" stroke="#14235B" stroke-width="2.8" fill="none" stroke-linecap="round"/><circle cx="34" cy="56" r="4" fill="#FF8FA3" opacity=".6"/><circle cx="66" cy="56" r="4" fill="#FF8FA3" opacity=".6"/>${towel(14, 72, 72, 22)}`),
  'wx14-s1': V(`${shower}${drops([30, 44, 58, 72], 40)}${person(72, '', '#FFB3C7')}`.replace('translate(-12 0)', 'translate(-12 0)')),
  'wx14-s2': V(`<rect x="22" y="30" width="24" height="52" rx="8" fill="#FF9A5C" stroke="#E0742E" stroke-width="2.6"/><rect x="28" y="18" width="12" height="14" rx="3" fill="#E0742E"/><rect x="26" y="46" width="16" height="16" rx="4" fill="#fff"/><path d="M52 40q8 -6 16 0t10 8" stroke="#FFB347" stroke-width="7" fill="none" stroke-linecap="round"/><rect x="58" y="62" width="30" height="20" rx="8" fill="#FFD23F" stroke="#E0A800" stroke-width="2.4"/><g fill="#E0A800"><circle cx="66" cy="68" r="1.8"/><circle cx="76" cy="74" r="1.8"/><circle cx="82" cy="67" r="1.8"/></g>${bub([[56, 28, 4], [80, 30, 5]])}`),
  'wx14-s3': V(`${person(58, '', '#FFB3C7')}${bub([[34, 36, 8], [52, 28, 10], [68, 38, 8], [24, 70, 9], [76, 72, 9], [46, 82, 8], [62, 88, 7], [88, 56, 5], [14, 52, 5]])}`),
  'wx14-s4': V(`${shower}${drops([30, 44, 58, 72], 40)}${person(72, bub([[26, 88, 5], [74, 90, 4]]), '#FFB3C7')}`),
  'wx14-s5': V(`${person(54, '')}<path d="M16 100Q18 78 50 78Q82 78 84 100Z" fill="#4C8DF6"/><path d="M26 92h48" stroke="#fff" stroke-width="4" opacity=".8"/><path d="M30 38Q30 18 50 18Q70 18 70 38Q60 28 50 28Q40 28 30 38Z" fill="#4C8DF6"/><path d="M32 33h36" stroke="#fff" stroke-width="3" opacity=".8"/>`),
  'wx14-s6': V(`<path d="M30 22l8 -4q12 8 24 0l8 4 16 16 -10 10 -10 -8V86H34V40l-10 8 -10 -10z" fill="#C9B8F5" stroke="#8C7BE0" stroke-width="2.6" stroke-linejoin="round"/><g stroke="#fff" stroke-width="3.4" opacity=".8"><path d="M34 52h32M34 64h32M34 76h32"/></g><path d="M52 28a8 8 0 1 0 6 12a6.4 6.4 0 1 1 -6 -12z" fill="#FFE98F"/><path d="M38 24l1.6 -4 1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6z" fill="#FFE98F"/>`),
  'wx14-wc': V('<path d="M30 14h34v28H30z" fill="#fff" stroke="#9AA7BD" stroke-width="3" stroke-linejoin="round"/><rect x="38" y="20" width="18" height="4" rx="2" fill="#9AA7BD"/><path d="M22 46h56q0 22 -22 30v12H44V76Q22 68 22 46z" fill="#fff" stroke="#9AA7BD" stroke-width="3" stroke-linejoin="round"/><ellipse cx="50" cy="50" rx="22" ry="5" fill="#BFE3FA"/>'),
  'wx14-no': V('<circle cx="50" cy="52" r="26" fill="none" stroke="#F26B6B" stroke-width="7"/><path d="M32 70L68 34" stroke="#F26B6B" stroke-width="7" stroke-linecap="round"/>')
});

const ROUT = {
  manos: { n: 'lavarse las manos', steps: [['wx14-m1', 'Mojarse las manos'], ['wx14-m2', 'Echar jabón'], ['wx14-m3', 'Frotar bien'], ['wx14-m4', 'Aclarar con agua'], ['wx14-m5', 'Secar con la toalla']] },
  dientes: { n: 'lavarse los dientes', steps: [['wx14-d1', 'Poner pasta en el cepillo'], ['wx14-d2', 'Cepillar los dientes'], ['wx14-d3', 'Escupir'], ['wx14-d4', 'Enjuagar la boca'], ['wx14-d5', 'Secarse la cara']] },
  ducha: { n: 'ducharse', steps: [['wx14-s1', 'Mojarse con agua'], ['wx14-s2', 'Echar gel en la esponja'], ['wx14-s3', 'Frotar con jabón'], ['wx14-s4', 'Quitar el jabón con agua'], ['wx14-s5', 'Secarse con la toalla'], ['wx14-s6', 'Ponerse el pijama']] }
};
const WHEN = {
  good: [['apple', 'Antes de comer'], ['wx14-wc', 'Después de ir al baño'], ['house', 'Al llegar a casa'], ['tree', 'Después de jugar en el parque']],
  bad: [['bed', 'Mientras dormimos'], ['sun', 'Solo los domingos'], ['umbrella', 'Solo cuando llueve'], ['wx14-no', 'Nunca']]
};
let order = [];

Kids.css(`
.g-mundo-x14{--c:5}
.g-mundo-x14 .wx14-ord{display:grid;gap:.6rem;width:100%;max-width:62rem;grid-template-columns:repeat(var(--c),1fr)}
.g-mundo-x14 .wx14-slot{aspect-ratio:1/1.12;position:relative;min-width:0}
.g-mundo-x14 .wx14-slot .num{position:absolute;left:.4rem;top:.1rem;font-family:'Baloo 2';font-weight:800;font-size:1.4rem;color:#6a7bb5}
.g-mundo-x14 .wx14-tray{display:grid;gap:.6rem;width:100%;max-width:62rem;grid-template-columns:repeat(var(--c),1fr);background:rgba(255,255,255,.8);border-radius:1.8rem;padding:.6rem}
.g-mundo-x14 .wx14-it{width:100%;height:100%;aspect-ratio:1/1.12;min-width:0;background:#fff;border-radius:1.2rem;padding:.3rem .25rem .2rem;box-shadow:0 .3rem 0 var(--line);border:.2rem solid var(--line);display:flex;flex-direction:column;align-items:center;gap:.1rem}
.g-mundo-x14 .wx14-slot .wx14-it{aspect-ratio:auto;height:100%}
.g-mundo-x14 .wx14-it>svg{flex:1;min-height:0;width:100%;display:block;pointer-events:none}
.g-mundo-x14 .wx14-it .t{font-family:'Baloo 2';font-weight:700;font-size:clamp(.8rem,1.8vmin,1.1rem);line-height:1;text-align:center}
.g-mundo-x14 .wx14-it.hint{animation:bounce .6s 5}
.g-mundo-x14 .wx14-slot.slot{font-size:1rem}
.g-mundo-x14 .wx14-wh{display:flex;flex-wrap:wrap;justify-content:center;gap:.9rem;width:100%;max-width:60rem}
.g-mundo-x14 .wx14-wh .pic{flex:0 1 clamp(8.5rem,30%,12rem);aspect-ratio:1/.95}
.g-mundo-x14 .wx14-wh .pic svg{max-width:5.5rem;max-height:5.5rem}
.g-mundo-x14 .wx14-wh .pic .lbl{text-align:center;font-size:clamp(1rem,2.4vmin,1.3rem)}
.g-mundo-x14 .wx14-wh .pic.sel{border-color:#5CC77A;background:#E6FAEC}
.g-mundo-x14 .wx14-cnt{font-family:'Baloo 2';font-weight:800;color:var(--ink2);font-size:1.3rem}
@media (max-width:640px){.g-mundo-x14 .wx14-ord.big,.g-mundo-x14 .wx14-tray.big{--c:3!important}.g-mundo-x14 .wx14-it .t{font-size:.8rem}}
`);

Kids.game({
  id: 'mundo-x14', group: 'mundo', num: 17,
  title: 'Higiene',
  blurb: 'Pon en orden los pasos para lavarte las manos, los dientes y ducharte.',
  how: 'Mira los dibujos y pon los pasos en orden: arrastra cada dibujo a su hueco, o tócalo y se colocará si es el siguiente paso. En el nivel difícil, también elegirás cuándo nos lavamos las manos.',
  icon: 'raindrop',
  levels: ['3 pasos', '4 o 5 pasos', 'Rutina completa'],
  rounds: 5,
  round(g, i) {
    if (i === 0) order = U.shuffle(Object.keys(ROUT));
    if (g.level === 3 && i === 4) return when(g);
    const key = order[i % 3], steps = ROUT[key].steps;
    let idx;
    if (g.level === 3) idx = steps.map((_, k) => k);
    else {
      const n = g.level === 1 ? 3 : Math.min(steps.length, U.rnd(4, 5));
      idx = U.sample(steps.map((_, k) => k), n).sort((a, b) => a - b);
    }
    ordering(g, key, idx.map(k => steps[k]));
  }
});

function ordering(g, key, chosen) {
  const n = chosen.length, big = n > 4;
  g.ask('Pon en orden los pasos para ' + ROUT[key].n + '. ¿Qué haces primero?');
  const ord = U.el(`<div class="wx14-ord ${big ? 'big' : ''}" style="--c:${n}"></div>`);
  for (let k = 0; k < n; k++) ord.appendChild(U.el(`<div class="wx14-slot slot" data-k="${k}" role="button" tabindex="0" aria-label="Paso ${k + 1}"><span class="num">${k + 1}</span></div>`));
  const tray = U.el(`<div class="wx14-tray ${big ? 'big' : ''}" style="--c:${n}"></div>`);
  let sh; do { sh = U.shuffle(chosen); } while (sh.every((s, k) => s === chosen[k]));
  g.area.appendChild(ord); g.area.appendChild(tray);
  let placed = 0, lastTried = null;
  const nxtStep = () => chosen[placed];
  function attempt(it, slot) {
    const idx = chosen.findIndex(s => s[0] === it.dataset.a), k = +slot.dataset.k; lastTried = it;
    if (idx === k && !slot.querySelector('.wx14-it')) {
      it.dataset.locked = '1'; it.style.transform = ''; slot.appendChild(it); slot.classList.add('filled'); Kids.sound.pop(); placed++;
      if (placed === n) g.t(() => g.right('¡Bien hecho! Así se hace'), 500);
      else g.toast('¡Bien! ¿Y después?');
      return true;
    }
    g.shake(it);
    g.wrong('Ese paso va después. Piensa qué haces antes.');
    return false;
  }
  g.helpHint = () => {
    const s = nxtStep(), it = s && tray.querySelector(`[data-a="${s[0]}"]`); if (!it) return;
    it.classList.add('hint'); ord.children[placed].classList.add('hot');
    g.t(() => { it.classList.remove('hint'); ord.children[placed] && ord.children[placed].classList.remove('hot'); }, 3800);
    g.toast('Ahora toca: «' + s[1] + '»');
  };
  sh.forEach(s => {
    const it = U.el(`<button class="wx14-it" data-a="${s[0]}" aria-label="${s[1]}">${Kids.art.get(s[0])}<span class="t">${s[1]}</span></button>`);
    tray.appendChild(it);
    Kids.drag(it, {
      targets: () => Array.from(ord.children),
      onDrop: (slot, el) => attempt(el, slot),
      onTap: el => { attempt(el, ord.children[placed]); }
    });
  });
}

function when(g) {
  g.ask('¿Cuándo nos lavamos las manos? Toca todas las respuestas correctas.');
  const good = U.sample(WHEN.good, 3), bad = U.sample(WHEN.bad, 3);
  const wrap = U.el('<div style="display:contents"></div>');
  const box = U.el('<div class="wx14-wh"></div>');
  U.shuffle(good.map(o => [o, 1]).concat(bad.map(o => [o, 0]))).forEach(([o, ok]) => box.appendChild(U.el(`<button class="pic" data-ok="${ok}" aria-label="${o[1]}">${Kids.art.get(o[0])}<span class="lbl">${o[1]}</span></button>`)));
  const cnt = U.el('<div class="wx14-cnt">Correctas: 0 de 3</div>');
  wrap.appendChild(box); wrap.appendChild(cnt); g.area.appendChild(wrap);
  let found = 0;
  g.helpHint = () => { const b = box.querySelector('[data-ok="1"]:not(.right)'); if (b) b.classList.add('pulse'); g.toast('Pista: piensa cuándo tenemos las manos sucias'); };
  box.addEventListener('click', e => {
    const b = e.target.closest('.pic'); if (!b || b.disabled) return;
    b.disabled = true;
    if (b.dataset.ok === '1') {
      b.classList.add('right'); b.classList.remove('pulse'); found++; Kids.sound.pop(); cnt.textContent = 'Correctas: ' + found + ' de 3';
      if (found === 3) g.t(() => g.right('¡Manos limpias, niño sano!'), 350); else g.toast('¡Sí!');
    } else { b.classList.add('bad'); g.wrong('Mmm, ahí no hace falta. ¡Busca otra!'); }
  });
}
})();
