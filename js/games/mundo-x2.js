/* mundo-x2 — Alimentación sana */
(function () {
'use strict';
const U = Kids.util;
const SH = '<ellipse cx="50" cy="94" rx="26" ry="4" fill="#14235B" opacity=".12"/>';
Kids.art.add({
  'wx2-broccoli': `<svg viewBox="0 0 100 100">${SH}<path d="M40 60 H60 L64 90 Q50 96 36 90Z" fill="#9BD672"/><g fill="#3FA55B"><circle cx="30" cy="48" r="16"/><circle cx="50" cy="34" r="19"/><circle cx="70" cy="48" r="16"/><circle cx="50" cy="54" r="14"/></g><g fill="#5CC77A"><circle cx="26" cy="44" r="7"/><circle cx="48" cy="28" r="8"/><circle cx="72" cy="44" r="7"/><circle cx="50" cy="52" r="6"/></g></svg>`,
  'wx2-bread': `<svg viewBox="0 0 100 100">${SH}<path d="M10 62 Q6 30 38 26 H62 Q94 30 90 62 Q90 82 70 84 H30 Q10 82 10 62Z" fill="#E9A957"/><path d="M14 60 Q12 34 38 31 H62 Q88 34 86 60Z" fill="#F2BE75"/><path d="M32 38 q7 9 0 20 M50 36 q7 10 0 22 M68 38 q7 9 0 20" fill="none" stroke="#C97F2E" stroke-width="3.5" stroke-linecap="round"/></svg>`,
  'wx2-egg': `<svg viewBox="0 0 100 100">${SH}<path d="M16 52 Q10 26 38 22 Q60 10 80 26 Q94 44 80 68 Q70 86 46 82 Q20 86 16 52Z" fill="#fff" stroke="#E6DCC8" stroke-width="3"/><circle cx="50" cy="50" r="17" fill="#FFC933"/><ellipse cx="44" cy="43" rx="5" ry="3.5" fill="#FFE69A"/></svg>`,
  'wx2-milk': `<svg viewBox="0 0 100 100">${SH}<path d="M24 22 H76 L69 88 Q50 94 31 88Z" fill="#E3F1FB" stroke="#BFD6EE" stroke-width="3" stroke-linejoin="round"/><path d="M28 38 H72 L67 86 Q50 91 33 86Z" fill="#fff"/><circle cx="43" cy="60" r="3.2" fill="#14235B"/><circle cx="57" cy="60" r="3.2" fill="#14235B"/><path d="M44 69 Q50 74 56 69" fill="none" stroke="#14235B" stroke-width="2.6" stroke-linecap="round"/></svg>`,
  'wx2-chicken': `<svg viewBox="0 0 100 100">${SH}<g transform="rotate(-38 50 52)"><rect x="43" y="56" width="14" height="30" rx="6" fill="#FFF3D6"/><circle cx="43" cy="88" r="7.5" fill="#FFF3D6"/><circle cx="57" cy="88" r="7.5" fill="#FFF3D6"/><ellipse cx="50" cy="38" rx="25" ry="31" fill="#D9873E"/><ellipse cx="42" cy="28" rx="8" ry="12" fill="#EFA55C" opacity=".8"/></g></svg>`,
  'wx2-cheese': `<svg viewBox="0 0 100 100">${SH}<path d="M8 62 L82 26 Q94 28 94 42 V72 H8Z" fill="#FFD23F"/><path d="M8 62 L82 26 Q94 28 94 42 L20 64Z" fill="#FFE680"/><circle cx="34" cy="72" r="6" fill="#F2B93B"/><circle cx="62" cy="62" r="7" fill="#F2B93B"/><circle cx="80" cy="56" r="4" fill="#F2B93B"/></svg>`,
  'wx2-candy': `<svg viewBox="0 0 100 100">${SH}<path d="M6 36 L30 50 L6 64Z" fill="#FF7EA8"/><path d="M94 36 L70 50 L94 64Z" fill="#FF7EA8"/><circle cx="50" cy="50" r="27" fill="#FF5D8F"/><path d="M30 38 Q50 56 70 62 M34 66 Q52 44 66 34" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".85"/></svg>`,
  'wx2-soda': `<svg viewBox="0 0 100 100">${SH}<path d="M66 6 L58 30" stroke="#47B5BF" stroke-width="5" stroke-linecap="round"/><rect x="30" y="24" width="40" height="64" rx="9" fill="#E8574A"/><rect x="30" y="44" width="40" height="22" fill="#fff"/><ellipse cx="50" cy="25" rx="19" ry="5" fill="#C9D3DC"/><path d="M42 55 Q50 48 58 55 Q50 62 42 55Z" fill="#E8574A"/></svg>`,
  'wx2-tomato': `<svg viewBox="0 0 100 100">${SH}<ellipse cx="50" cy="56" rx="34" ry="30" fill="#FF5A4D"/><ellipse cx="38" cy="44" rx="9" ry="6" fill="#fff" opacity=".4"/><path d="M50 28 L40 20 L48 30 L36 32 L48 36 L50 26 L52 36 L64 32 L52 30 L60 20Z" fill="#3FA55B"/></svg>`,
  'wx2-yogurt': `<svg viewBox="0 0 100 100">${SH}<path d="M26 32 H74 L68 88 H32Z" fill="#fff" stroke="#D5E1F2" stroke-width="3" stroke-linejoin="round"/><path d="M28 48 H72 L70 66 H30Z" fill="#FF8FA3"/><rect x="22" y="24" width="56" height="12" rx="5" fill="#B7A2F0"/><circle cx="50" cy="57" r="6" fill="#FF5D8F"/></svg>`,
  'wx2-rice': `<svg viewBox="0 0 100 100">${SH}<path d="M18 52 Q22 26 50 26 Q78 26 82 52Z" fill="#fff" stroke="#E6DCC8" stroke-width="2.5"/><g fill="#EFE6D2"><ellipse cx="38" cy="40" rx="4" ry="2" transform="rotate(30 38 40)"/><ellipse cx="54" cy="34" rx="4" ry="2" transform="rotate(-20 54 34)"/><ellipse cx="64" cy="44" rx="4" ry="2" transform="rotate(40 64 44)"/><ellipse cx="46" cy="46" rx="4" ry="2"/></g><path d="M10 50 H90 Q88 88 50 90 Q12 88 10 50Z" fill="#4C8DF6"/><path d="M16 62 H84" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/></svg>`,
  'wx2-donut': `<svg viewBox="0 0 100 100">${SH}<circle cx="50" cy="52" r="36" fill="#E9A957"/><circle cx="50" cy="48" r="36" fill="#FF8FB1"/><circle cx="50" cy="48" r="11" fill="#FFF8EA"/><g stroke-width="4" stroke-linecap="round"><path d="M26 34 l6 -3" stroke="#FFD23F"/><path d="M68 32 l6 4" stroke="#47B5BF"/><path d="M76 54 l-2 6" stroke="#fff"/><path d="M30 64 l5 4" stroke="#8C7BE0"/><path d="M56 74 l6 -2" stroke="#FFD23F"/><path d="M50 22 l2 6" stroke="#fff"/></g></svg>`,
  'wx2-icon': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="94" rx="32" ry="4" fill="#14235B" opacity=".12"/><circle cx="50" cy="52" r="42" fill="#fff" stroke="#EADFC8" stroke-width="3"/><path d="M50 52 L50 12 A40 40 0 0 1 88 40Z" fill="#BFE8A8"/><path d="M50 52 L88 40 A40 40 0 0 1 74 86Z" fill="#FFC9C2"/><path d="M50 52 L74 86 A40 40 0 0 1 26 86Z" fill="#FFE2A8"/><path d="M50 52 L26 86 A40 40 0 0 1 12 40Z" fill="#E9D5B0"/><path d="M50 52 L12 40 A40 40 0 0 1 50 12Z" fill="#CFE6FB"/><circle cx="50" cy="52" r="9" fill="#fff"/></svg>`
});

/* grupos y alimentos */
const GROUPS = ['verduras', 'fruta', 'proteina', 'cereales', 'lacteo'];
const GN = { verduras: 'Verduras', fruta: 'Fruta', proteina: 'Proteína', cereales: 'Cereales', lacteo: 'Lácteos', treat: 'De vez en cuando' };
const GFULL = { verduras: 'las verduras', fruta: 'la fruta', proteina: 'las proteínas', cereales: 'los cereales y el pan', lacteo: 'los lácteos' };
const GCOL = { verduras: '#BFE8A8', fruta: '#FFC9C2', proteina: '#FFE2A8', cereales: '#EAD8B2', lacteo: '#CFE6FB' };
const GREP = { verduras: 'carrot', fruta: 'apple', proteina: 'wx2-egg', cereales: 'wx2-bread', lacteo: 'wx2-milk' };
const F = {
  carrot: ['la zanahoria', 'verduras'], 'wx2-broccoli': ['el brócoli', 'verduras'], 'wx2-tomato': ['el tomate', 'verduras'],
  apple: ['la manzana', 'fruta'], banana: ['el plátano', 'fruta'], orange: ['la naranja', 'fruta'], pear: ['la pera', 'fruta'], strawberry: ['la fresa', 'fruta'], grapes: ['las uvas', 'fruta'],
  'wx2-egg': ['el huevo', 'proteina'], fish: ['el pescado', 'proteina'], 'wx2-chicken': ['el pollo', 'proteina'],
  'wx2-bread': ['el pan', 'cereales'], 'wx2-rice': ['el arroz', 'cereales'],
  'wx2-milk': ['la leche', 'lacteo'], 'wx2-cheese': ['el queso', 'lacteo'], 'wx2-yogurt': ['el yogur', 'lacteo'],
  cake: ['el pastel', 'treat'], 'wx2-candy': ['el caramelo', 'treat'], 'wx2-soda': ['el refresco', 'treat'], 'wx2-donut': ['la rosquilla', 'treat']
};
const ids = g => Object.keys(F).filter(k => F[k][1] === g);
const HEALTHY = Object.keys(F).filter(k => F[k][1] !== 'treat'), TREATS = ids('treat');
const nm = k => F[k][0].replace(/^(el|la|los|las) /, '');
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

Kids.css(`
.g-mundo-x2 .x2-tray{display:flex;flex-wrap:wrap;gap:.6rem;justify-content:center;width:100%;max-width:56rem;min-height:5rem}
.g-mundo-x2 .x2-f{width:clamp(4.6rem,13vmin,6.4rem);background:#fff;border-radius:1.2rem;border:.18rem solid var(--line);box-shadow:0 .3rem 0 var(--line);padding:.25rem .15rem .2rem;display:flex;flex-direction:column;align-items:center;font-family:'Baloo 2';font-size:clamp(.8rem,2vmin,1rem);line-height:1;touch-action:none;transition:box-shadow .15s}
.g-mundo-x2 .x2-f svg{width:100%;aspect-ratio:1;display:block}
.g-mundo-x2 .x2-f.sel{border-color:#FF9F1C;background:#FFF3BF;transform:translateY(-.2rem)}
.g-mundo-x2 .x2-f.dragging{z-index:60;position:relative;box-shadow:0 .8rem 1rem rgba(20,35,91,.2)}
.g-mundo-x2 .x2-f.pulse{animation:pulse .7s 5}
.g-mundo-x2 .x2-main{display:flex;gap:1.4rem;align-items:center;justify-content:center;flex-wrap:wrap;width:100%}
.g-mundo-x2 .x2-dish,.g-mundo-x2 .x2-box{border-radius:2rem;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:.3rem;padding:.6rem;transition:all .15s;text-align:center;font-family:'Baloo 2';font-size:clamp(1rem,2.6vmin,1.4rem);color:var(--ink);line-height:1}
.g-mundo-x2 .x2-dish{width:clamp(11rem,38vmin,18rem);min-height:clamp(10rem,32vmin,15rem);background:#fff;border:.7rem solid #E8F2F6;box-shadow:0 .5rem 0 #C9DCE4,inset 0 0 0 .2rem #DCE9EE}
.g-mundo-x2 .x2-box{width:clamp(9rem,30vmin,15rem);min-height:clamp(8rem,28vmin,13rem);background:#FFF0D6;border:.25rem dashed #E9B872}
.g-mundo-x2 .hot{background:#FFF3BF;transform:scale(1.04)}
.g-mundo-x2 .x2-stack{display:flex;flex-wrap:wrap;gap:.1rem;justify-content:center}
.g-mundo-x2 .x2-stack svg{width:clamp(2.4rem,7vmin,3.6rem);height:clamp(2.4rem,7vmin,3.6rem)}
.g-mundo-x2 .x2-plate{position:relative;width:min(88vw,40vh,26rem);aspect-ratio:1;border-radius:50%;flex:none;box-shadow:0 .5rem 0 #C9DCE4;border:.7rem solid #fff;outline:.2rem solid #DCE9EE}
.g-mundo-x2 .x2-slot{position:absolute;width:34%;height:34%;transform:translate(-50%,-50%);border-radius:50%;background:rgba(255,255,255,.7);border:.2rem dashed rgba(20,35,91,.3);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Baloo 2';font-size:clamp(.7rem,1.9vmin,1rem);line-height:1;color:var(--ink2);padding:0;transition:transform .15s,background .15s}
.g-mundo-x2 .x2-slot.hot{background:#FFF3BF;transform:translate(-50%,-50%) scale(1.1)}
.g-mundo-x2 .x2-slot.full{border-style:solid;border-color:#5CC77A;background:#fff}
.g-mundo-x2 .x2-slot.pulse{animation:pulse .7s 5}
.g-mundo-x2 .x2-slot svg{width:80%;height:80%}
.g-mundo-x2 .x2-slot b{font-size:1.8em;color:var(--ink2)}
.g-mundo-x2 .x2-gopts{display:flex;flex-wrap:wrap;gap:.8rem;justify-content:center;width:100%}
.g-mundo-x2 .x2-g{width:clamp(5.6rem,17vmin,8rem);min-height:clamp(6rem,18vmin,8.4rem);flex-direction:column;font-size:clamp(.9rem,2.4vmin,1.3rem);padding:.3rem;gap:.1rem;line-height:1}
.g-mundo-x2 .x2-g svg{width:clamp(2.8rem,9vmin,4.6rem);height:clamp(2.8rem,9vmin,4.6rem)}
.g-mundo-x2 .x2-g.pulse{animation:pulse .7s 5}
.g-mundo-x2 .x2-info{font-family:'Baloo 2';font-size:1.1rem;color:var(--ink2);text-align:center}
@media (max-width:760px){.g-mundo-x2 .x2-main{gap:.8rem}.g-mundo-x2 .x2-dish{width:44vw;min-width:9.5rem}.g-mundo-x2 .x2-box{width:40vw;min-width:8.5rem}}
`);

function food(k, label) {
  return U.el(`<button class="x2-f" data-f="${k}" aria-label="${U.esc(F[k][0])}">${Kids.art.get(k)}<span>${F[k][0].replace(/^(el|la|los|las) /, '')}</span></button>`);
}
/* plato con 5 huecos; devuelve {el, slots} */
function plate() {
  const el = U.el('<div class="x2-plate"></div>');
  const stops = GROUPS.map((gk, k) => `${GCOL[gk]} ${k * 72}deg ${(k + 1) * 72}deg`).join(',');
  el.style.background = `conic-gradient(from -36deg,${stops})`;
  const slots = {};
  GROUPS.forEach((gk, k) => {
    const a = k * 72 * Math.PI / 180, R = 29;
    const s = U.el(`<button class="x2-slot" data-g="${gk}" aria-label="Hueco de ${GN[gk]}"><span>${GN[gk]}</span></button>`);
    s.style.left = (50 + R * Math.sin(a)) + '%'; s.style.top = (50 - R * Math.cos(a)) + '%';
    el.appendChild(s); slots[gk] = s;
  });
  return { el, slots };
}
function fillSlot(s, k) { s.classList.add('full'); s.innerHTML = Kids.art.get(k); s.dataset.done = '1'; }

/* interacción común: arrastrar o tocar (elegir alimento y tocar destino) */
function wire(g, trayEl, targets, attempt) {
  let sel = null;
  const clear = () => { if (sel) sel.classList.remove('sel'); sel = null; };
  const setup = el => {
    Kids.drag(el, {
      targets: () => targets,
      onDrop: (t, e) => { clear(); return attempt(e, t); },
      onTap: e => { Kids.sound.tap(); const was = sel === e; clear(); if (!was) { sel = e; e.classList.add('sel'); g.say(F[e.dataset.f][0]); } }
    });
  };
  trayEl.querySelectorAll('.x2-f').forEach(setup);
  targets.forEach(t => t.addEventListener('click', () => { if (!sel) { g.toast('Primero toca un alimento'); return; } const e = sel; clear(); attempt(e, t); }));
}

const MSG_TREAT = 'Está rico, pero es de vez en cuando. ¡Pruébalo en su caja!';
Kids.game({
  id: 'mundo-x2', group: 'mundo', num: 5,
  title: 'Alimentación sana',
  blurb: 'Llena el plato con comida sana y aprende los grupos de alimentos.',
  how: 'Arrastra o toca los alimentos para llenar el plato sano. Los dulces van a la caja de de vez en cuando.',
  icon: 'wx2-icon',
  levels: ['Sano o de vez en cuando', 'Un plato completo', 'Menú del día'],
  rounds: 5,
  round(g, i) {
    const L = g.level;
    /* ===== Nivel 1: sanos al plato, dulces a la caja ===== */
    if (L === 1) {
      const nh = U.rnd(3, 4), items = U.shuffle(U.sample(HEALTHY, nh).concat(U.sample(TREATS, 6 - nh)));
      const tray = U.el('<div class="x2-tray"></div>'); items.forEach(k => tray.appendChild(food(k)));
      const dish = U.el('<div class="x2-dish" data-t="ok" role="button" tabindex="0" aria-label="Plato sano"><span>Mi plato sano</span><div class="x2-stack"></div></div>');
      const box = U.el('<div class="x2-box" data-t="treat" role="button" tabindex="0" aria-label="De vez en cuando"><span>De vez en cuando</span><div class="x2-stack"></div></div>');
      const main = U.el('<div class="x2-main"></div>'); main.append(dish, box);
      g.area.append(tray, main);
      let left = items.length;
      const attempt = (el, t) => {
        const k = el.dataset.f, treat = F[k][1] === 'treat', want = treat ? 'treat' : 'ok';
        if (t.dataset.t !== want) {
          g.shake(el);
          g.wrong(treat ? MSG_TREAT : '¡' + cap(F[k][0]) + ' es muy sano! Va al plato.');
          return false;
        }
        t.querySelector('.x2-stack').insertAdjacentHTML('beforeend', Kids.art.get(k));
        el.remove(); Kids.sound.pop(); left--;
        if (!left) g.right('¡Qué plato tan sano!');
        return true;
      };
      wire(g, tray, [dish, box], attempt);
      g.helpHint = () => { const e = tray.querySelector('.x2-f'); if (!e) return; e.classList.add('pulse'); (F[e.dataset.f][1] === 'treat' ? box : dish).classList.add('hot'); g.toast('Pista: mira el alimento que se mueve'); g.t(() => { dish.classList.remove('hot'); box.classList.remove('hot'); }, 2500); };
      g.ask('Pon la comida sana en el plato y los dulces en «De vez en cuando»');
      return;
    }
    /* ===== Nivel 3, rondas impares: ¿qué grupo falta? ===== */
    if (L === 3 && i % 2 === 1) {
      const miss = U.pick(GROUPS), p = plate();
      GROUPS.forEach(gk => { if (gk !== miss) fillSlot(p.slots[gk], U.pick(ids(gk))); else { p.slots[gk].innerHTML = '<b>?</b>'; } });
      Object.values(p.slots).forEach(s => s.style.pointerEvents = 'none');
      const row = U.el('<div class="x2-gopts"></div>');
      U.shuffle(GROUPS).forEach(gk => row.appendChild(U.el(`<button class="ans x2-g" data-g="${gk}" aria-label="${GN[gk]}">${Kids.art.get(GREP[gk])}${GN[gk]}</button>`)));
      g.area.append(p.el, row);
      let done = false;
      row.querySelectorAll('.x2-g').forEach(b => b.onclick = () => {
        if (done) return; const gk = b.dataset.g;
        if (gk === miss) { done = true; b.classList.add('right'); fillSlot(p.slots[miss], U.pick(ids(miss))); g.say(GN[miss]); g.right('¡Eso es! Faltaba ' + GFULL[miss]); }
        else { b.classList.add('bad'); b.disabled = true; g.wrong('Ese grupo ya está en el plato. ¡Mira el hueco vacío!'); }
      });
      g.helpHint = () => { const b = row.querySelector(`[data-g="${miss}"]`); b && b.classList.add('pulse'); p.slots[miss].classList.add('pulse'); g.toast('Pista: fíjate en el hueco con el signo ?'); };
      g.ask('¿Qué grupo de alimentos falta en este plato?');
      return;
    }
    /* ===== Niveles 2 y 3 (menú): completar el plato ===== */
    const p = plate(), need = {}; GROUPS.forEach(gk => need[gk] = ids(gk));
    let items = GROUPS.map(gk => U.pick(ids(gk)));
    if (L === 2) items = items.concat(U.sample(TREATS, 2));
    else {
      const extra = U.sample(HEALTHY.filter(k => !items.includes(k)), 2);
      items = items.concat(extra, U.sample(TREATS, 2));
    }
    items = U.shuffle(items);
    const tray = U.el('<div class="x2-tray"></div>'); items.forEach(k => tray.appendChild(food(k)));
    const box = U.el('<div class="x2-box" data-t="treat" role="button" tabindex="0" aria-label="De vez en cuando" style="min-height:0;width:auto;padding:.4rem 1rem;flex-direction:row"><span>De vez en cuando</span><div class="x2-stack"></div></div>');
    const main = U.el('<div class="x2-main"></div>'); main.append(p.el, box);
    g.area.append(main, tray);
    let full = 0;
    const attempt = (el, t) => {
      const k = el.dataset.f, gk = F[k][1];
      if (t.dataset.t === 'treat') {
        if (gk === 'treat') { t.querySelector('.x2-stack').insertAdjacentHTML('beforeend', Kids.art.get(k)); el.remove(); Kids.sound.pop(); return true; }
        g.shake(el); g.wrong('¡' + cap(F[k][0]) + ' es sano! Va a su sitio del plato.'); return false;
      }
      const tg = t.dataset.g;
      if (gk === 'treat') { g.shake(el); g.wrong(MSG_TREAT); return false; }
      if (tg !== gk) { g.shake(el); g.wrong(cap(F[k][0]) + ' es de ' + GFULL[gk] + '. ¡Busca ese hueco!'); return false; }
      if (t.dataset.done) { g.toast('Ya tienes un alimento de ' + GFULL[gk] + '. ¡Prueba otro grupo!'); return false; }
      fillSlot(t, k); el.remove(); Kids.sound.pop(); g.say(F[k][0]); full++;
      if (full === 5) g.right(L === 2 ? '¡Plato completo!' : '¡Menú del día completo!');
      return true;
    };
    wire(g, tray, Object.values(p.slots).concat([box]), attempt);
    g.helpHint = () => {
      const e = Array.from(tray.querySelectorAll('.x2-f')).find(x => F[x.dataset.f][1] !== 'treat' && !p.slots[F[x.dataset.f][1]].dataset.done);
      if (!e) return; e.classList.add('pulse'); p.slots[F[e.dataset.f][1]].classList.add('pulse');
      g.toast('Pista: ' + F[e.dataset.f][0] + ' va en el hueco que se mueve'); g.t(() => p.slots[F[e.dataset.f][1]].classList.remove('pulse'), 3800);
    };
    g.ask(L === 2 ? 'Completa el plato: un alimento de cada grupo' : 'Prepara un menú completo con un alimento de cada grupo');
  },
  stars(m) { return m <= 3 ? 3 : m <= 8 ? 2 : 1; }
});
})();
