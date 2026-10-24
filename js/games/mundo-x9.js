/* mundo-x9 — Animales y sus crías */
(function () {
'use strict';
const U = Kids.util;
const S = (inner) => '<svg viewBox="0 0 100 100" aria-hidden="true">' + inner + '</svg>';
const sh = '<ellipse cx="50" cy="93" rx="27" ry="3.8" fill="#3b2a1a" opacity=".14"/>';
const eye = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#2b2118"/><circle cx="${x + r * .35}" cy="${y - r * .38}" r="${r * .4}" fill="#fff"/>`;
const eyes = (y, sep, r) => eye(50 - sep, y, r || 4.4) + eye(50 + sep, y, r || 4.4);
const cheeks = (y, sep) => `<ellipse cx="${50 - sep}" cy="${y}" rx="4" ry="2.8" fill="#FF8FA3" opacity=".6"/><ellipse cx="${50 + sep}" cy="${y}" rx="4" ry="2.8" fill="#FF8FA3" opacity=".6"/>`;
const smile = (y, w) => `<path d="M${50 - w} ${y}q${w} ${w} ${w * 2} 0" fill="none" stroke="#5a3a28" stroke-width="1.8" stroke-linecap="round"/>`;
const body = (c, rx) => `<ellipse cx="50" cy="80" rx="${rx || 22}" ry="13" fill="${c}"/>`;

Kids.art.add({
  'mx9-calf': S(`${sh}${body('#fff')}<ellipse cx="38" cy="82" rx="7" ry="5" fill="#8B5E3C"/>
    <ellipse cx="22" cy="46" rx="11" ry="6.5" fill="#fff" transform="rotate(-24 22 46)"/><ellipse cx="22" cy="46" rx="7" ry="3.8" fill="#FFB3C6" transform="rotate(-24 22 46)"/>
    <ellipse cx="78" cy="46" rx="11" ry="6.5" fill="#8B5E3C" transform="rotate(24 78 46)"/><ellipse cx="78" cy="46" rx="7" ry="3.8" fill="#FFB3C6" transform="rotate(24 78 46)"/>
    <path d="M36 26q-3-9 2-11M64 26q3-9-2-11" stroke="#F2E3C0" stroke-width="5" stroke-linecap="round" fill="none"/>
    <ellipse cx="50" cy="50" rx="26" ry="27" fill="#fff"/><path d="M56 26Q80 32 72 56Q60 50 56 26Z" fill="#8B5E3C"/>
    <ellipse cx="50" cy="63" rx="15" ry="11" fill="#FFB3C6"/><ellipse cx="44" cy="63" rx="2.2" ry="3" fill="#C9627F"/><ellipse cx="56" cy="63" rx="2.2" ry="3" fill="#C9627F"/>${eyes(46, 11)}${cheeks(55, 20)}`),
  'mx9-lamb': S(`${sh}${body('#fff')}<path d="M40 88v5M60 88v5" stroke="#5a4636" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="28" cy="50" rx="10" ry="6" fill="#5a4636" transform="rotate(30 28 50)"/><ellipse cx="72" cy="50" rx="10" ry="6" fill="#5a4636" transform="rotate(-30 72 50)"/>
    <g fill="#fff" stroke="#EDE6D8" stroke-width="1.2"><circle cx="30" cy="34" r="12"/><circle cx="46" cy="25" r="13"/><circle cx="62" cy="25" r="13"/><circle cx="72" cy="38" r="12"/><circle cx="26" cy="54" r="9"/><circle cx="76" cy="54" r="9"/></g>
    <ellipse cx="50" cy="52" rx="19" ry="21" fill="#5a4636"/><ellipse cx="50" cy="62" rx="9" ry="6" fill="#8A6F58"/><g><circle cx="42" cy="49" r="4.6" fill="#fff"/><circle cx="58" cy="49" r="4.6" fill="#fff"/><circle cx="42.500" cy="49.500" r="2.800" fill="#2b2118"/><circle cx="58.500" cy="49.500" r="2.800" fill="#2b2118"/></g><path d="M45 66q5 4 10 0" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>`),
  'mx9-piglet': S(`${sh}${body('#FFB3C6')}<path d="M72 80q10-2 8-9q-2-5-8 0" fill="none" stroke="#FF8FA3" stroke-width="3" stroke-linecap="round"/>
    <path d="M26 30Q16 16 34 20L42 30Z" fill="#FF8FA3"/><path d="M74 30Q84 16 66 20L58 30Z" fill="#FF8FA3"/>
    <ellipse cx="50" cy="52" rx="28" ry="26" fill="#FFC6D4"/><ellipse cx="50" cy="60" rx="14" ry="10.5" fill="#FF9FB8"/><ellipse cx="44.500" cy="60" rx="2.400" ry="3.400" fill="#C9627F"/><ellipse cx="55.500" cy="60" rx="2.400" ry="3.400" fill="#C9627F"/>${eyes(44, 12)}${cheeks(54, 21)}`),
  'mx9-foal': S(`${sh}${body('#B5793F', 20)}<path d="M38 88v5M62 88v5" stroke="#6B4423" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M34 22L30 8L42 18ZM66 22L70 8L58 18Z" fill="#B5793F"/><path d="M36 18l-3-7l7 5ZM64 18l3-7l-7 5Z" fill="#FFB3C6"/>
    <path d="M44 14Q36 6 30 20Q28 40 36 46L50 20Z" fill="#6B4423"/>
    <path d="M30 34Q30 18 50 18T70 34Q72 54 66 66H34Q28 54 30 34Z" fill="#C98E52"/>
    <ellipse cx="50" cy="66" rx="14" ry="11" fill="#E8C9A0"/><ellipse cx="44" cy="67" rx="2" ry="2.8" fill="#7A4A2A"/><ellipse cx="56" cy="67" rx="2" ry="2.8" fill="#7A4A2A"/><path d="M50 22L53 38L47 38Z" fill="#fff" opacity=".85"/>${eyes(44, 11)}${cheeks(55, 18)}`),
  'mx9-kitten': S(`${sh}${body('#FFB066', 20)}<path d="M70 82q16-4 12-18" fill="none" stroke="#F29A3E" stroke-width="5" stroke-linecap="round"/>
    <path d="M24 44L22 16L44 28ZM76 44L78 16L56 28Z" fill="#FFB066"/><path d="M27 38L26 22L38 29ZM73 38L74 22L62 29Z" fill="#FFB3C6"/>
    <ellipse cx="50" cy="52" rx="28" ry="25" fill="#FFC27D"/><path d="M50 28v10M40 30l2 8M60 30l-2 8" stroke="#F29A3E" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="50" cy="60" rx="10" ry="7" fill="#FFF0DC"/><path d="M47 56h6l-3 4z" fill="#E07A8C"/>${eyes(47, 12, 4.8)}${cheeks(58, 20)}<path d="M50 60v3M50 63q-4 3-7 0M50 63q4 3 7 0" fill="none" stroke="#7a4a28" stroke-width="1.5" stroke-linecap="round"/><path d="M18 56h12M18 62h12M70 56h12M70 62h12" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>`),
  'mx9-puppy': S(`${sh}${body('#E3B889', 20)}<path d="M70 84q14-2 13-14" fill="none" stroke="#C99A64" stroke-width="5" stroke-linecap="round"/>
    <path d="M26 28Q10 30 14 56Q20 66 30 56Z" fill="#8B5E3C"/><path d="M74 28Q90 30 86 56Q80 66 70 56Z" fill="#8B5E3C"/>
    <ellipse cx="50" cy="50" rx="27" ry="26" fill="#F2CDA0"/><ellipse cx="50" cy="60" rx="15" ry="11" fill="#FFF0DC"/><ellipse cx="50" cy="55" rx="5" ry="3.6" fill="#3a2a20"/><path d="M50 58v5q-4 3-8 0M50 63q4 3 8 0" fill="none" stroke="#5a3a28" stroke-width="1.7" stroke-linecap="round"/><ellipse cx="50" cy="70" rx="5" ry="4" fill="#FF8FA3"/>
    <ellipse cx="62" cy="40" rx="8" ry="9" fill="#8B5E3C" opacity=".85"/>${eyes(44, 12)}${cheeks(58, 22)}`),
  'mx9-tadpole': S(`<ellipse cx="50" cy="88" rx="38" ry="6" fill="#8EC9F0" opacity=".5"/><path d="M62 52Q80 40 92 56Q80 70 62 56Z" fill="#2E5B53"/><path d="M62 53Q78 46 86 56" fill="none" stroke="#3F7A6E" stroke-width="2"/>
    <ellipse cx="40" cy="54" rx="26" ry="22" fill="#3F7A6E"/><ellipse cx="38" cy="62" rx="16" ry="9" fill="#6AA796" opacity=".7"/>${eye(30, 46, 5.6)}${eye(48, 44, 5.6)}${smile(60, 6).replace('#5a3a28', '#17352f')}
    <circle cx="14" cy="30" r="3.5" fill="#BFE4F7" opacity=".9"/><circle cx="24" cy="18" r="2.4" fill="#BFE4F7" opacity=".9"/><circle cx="84" cy="30" r="3" fill="#BFE4F7" opacity=".9"/>`),
  'mx9-cub': S(`${sh}${body('#9C6B43', 21)}
    <circle cx="26" cy="28" r="11" fill="#8A5A36"/><circle cx="74" cy="28" r="11" fill="#8A5A36"/><circle cx="26" cy="28" r="6" fill="#E8C9A0"/><circle cx="74" cy="28" r="6" fill="#E8C9A0"/>
    <ellipse cx="50" cy="52" rx="28" ry="26" fill="#A87448"/><ellipse cx="50" cy="62" rx="15" ry="11.5" fill="#E8C9A0"/><ellipse cx="50" cy="56" rx="5.5" ry="4" fill="#3a2a20"/><path d="M50 60v4q-4 3-8 0M50 64q4 3 8 0" fill="none" stroke="#5a3a28" stroke-width="1.7" stroke-linecap="round"/>${eyes(45, 12)}${cheeks(60, 22)}`),
  'mx9-duckling': S(`${sh}<ellipse cx="46" cy="76" rx="26" ry="16" fill="#FFE27A"/><path d="M26 74Q18 62 28 66" fill="#FFD23F"/><path d="M40 72Q58 62 70 76Q56 84 40 72Z" fill="#FFD23F" opacity=".8"/>
    <circle cx="58" cy="44" r="23" fill="#FFE98F"/><path d="M52 24Q54 14 60 20" fill="none" stroke="#FFD23F" stroke-width="3" stroke-linecap="round"/>
    <path d="M72 44Q92 42 90 52Q86 58 70 54Z" fill="#FF9A3C"/><path d="M72 49H88" stroke="#E07A1C" stroke-width="1.5"/>${eye(60, 38, 4.2)}<ellipse cx="50" cy="50" rx="4" ry="2.8" fill="#FF8FA3" opacity=".6"/><path d="M36 86v6h6M54 86v6h6" stroke="#FF9A3C" stroke-width="3.5" stroke-linecap="round" fill="none"/>`)
});

/* mother: art de catálogo; baby: art + nombre */
const FAM = [
  { m: 'vaca',   ma: 'cow',   mn: 'la vaca',   c: 'ternero',   ca: 'mx9-calf',     cn: 'el ternero' },
  { m: 'gallina',ma: 'hen',   mn: 'la gallina',c: 'pollito',   ca: 'chick',        cn: 'el pollito' },
  { m: 'oveja',  ma: 'sheep', mn: 'la oveja',  c: 'cordero',   ca: 'mx9-lamb',     cn: 'el cordero' },
  { m: 'cerda',  ma: 'pig',   mn: 'la cerda',  c: 'cerdito',   ca: 'mx9-piglet',   cn: 'el cerdito' },
  { m: 'pata',   ma: 'duck',  mn: 'la pata',   c: 'patito',    ca: 'mx9-duckling', cn: 'el patito' },
  { m: 'yegua',  ma: 'horse', mn: 'la yegua',  c: 'potro',     ca: 'mx9-foal',     cn: 'el potro' },
  { m: 'gata',   ma: 'cat',   mn: 'la gata',   c: 'gatito',    ca: 'mx9-kitten',   cn: 'el gatito' },
  { m: 'perra',  ma: 'dog',   mn: 'la perra',  c: 'cachorro',  ca: 'mx9-puppy',    cn: 'el cachorro' },
  { m: 'rana',   ma: 'frog',  mn: 'la rana',   c: 'renacuajo', ca: 'mx9-tadpole',  cn: 'el renacuajo' },
  { m: 'osa',    ma: 'bear',  mn: 'la osa',    c: 'osezno',    ca: 'mx9-cub',      cn: 'el osezno' }
];
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const COLORS = ['#8C7BE0', '#F2B93B', '#4C8DF6', '#FF7E8A', '#47B5BF', '#5CC77A'];

Kids.css(`
.g-mundo-x9 .toast{pointer-events:none}
.g-mundo-x9 .x9-board{position:relative;width:100%;max-width:40rem;display:flex;justify-content:space-between;gap:1rem;flex:0 1 auto;min-height:0}
.g-mundo-x9 .x9-col{display:flex;flex-direction:column;gap:.6rem;flex:0 0 auto;min-width:var(--cw,0);position:relative;z-index:2}
.g-mundo-x9 .x9-card{background:#fff;border-radius:1.4rem;border:.22rem solid var(--line);box-shadow:0 .3rem 0 var(--line);padding:.25rem .4rem;display:flex;align-items:center;gap:.5rem;font-family:'Baloo 2';font-size:1.25rem;line-height:1.05;min-height:var(--ch);transition:transform .12s}
.g-mundo-x9 .x9-card svg{width:var(--ch);height:var(--ch);flex:none;display:block;pointer-events:none}
.g-mundo-x9 .x9-card span{flex:1;text-align:left}
.g-mundo-x9 .x9-card.sel{border-color:var(--yellow);background:#FFF7D1;transform:scale(1.04)}
.g-mundo-x9 .x9-card.hot{border-color:var(--g);transform:scale(1.04)}
.g-mundo-x9 .x9-card.done{opacity:1;border-color:var(--c);background:#fff;pointer-events:none}
.g-mundo-x9 .x9-card.hint{animation:pulse .7s 6}
.g-mundo-x9 .x9-card.bad{background:#FFD3CF;animation:shake .4s}
.g-mundo-x9 .x9-card[data-side=r]{flex-direction:row-reverse}
.g-mundo-x9 .x9-card[data-side=r] span{text-align:right}
.g-mundo-x9 .x9-lines{position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none;overflow:visible}
.g-mundo-x9 .x9-ch{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;width:100%}
.g-mundo-x9 .x9-hero{width:min(11rem,26vmin)}
.g-mundo-x9 .x9-hero svg{width:100%;height:auto;display:block}
@media (max-width:640px){.g-mundo-x9 .x9-card{font-size:1.05rem}.g-mundo-x9 .x9-col{min-width:0!important}}
`);

function question(g) {
  const f = U.pick(FAM);
  const wrongs = U.sample(FAM.filter(x => x !== f), 2);
  const opts = U.shuffle([f].concat(wrongs));
  const hero = U.el(`<div class="x9-hero">${Kids.art.get(f.ma)}</div>`);
  const box = U.el('<div class="x9-ch"></div>');
  const btns = opts.map(o => { const b = U.el(`<button class="ans" data-m="${o.m}" aria-label="${cap(o.c)}">${cap(o.c)}</button>`); box.appendChild(b); return b; });
  g.area.appendChild(hero); g.area.appendChild(box);
  g.ask('¿Cómo se llama la cría de ' + f.mn + '?');
  g.helpHint = () => { btns.forEach(b => { if (b.dataset.m === f.m) b.style.animation = 'bounce .6s 5'; }); g.toast('La cría de ' + f.mn + ' es ' + f.cn); };
  btns.forEach(b => b.addEventListener('click', () => {
    if (b.dataset.m === f.m) {
      b.classList.add('right'); btns.forEach(x => x.disabled = true);
      hero.innerHTML = Kids.art.get(f.ca); g.right('¡' + cap(f.cn) + '!');
    } else { b.classList.add('bad'); g.wrong('Ese no es. ¡Prueba otra vez!'); }
  }));
}

Kids.game({
  id: 'mundo-x9', group: 'mundo', num: 12,
  title: 'Animales y sus crías',
  blurb: 'Une cada animal mamá con su cría.',
  how: 'Toca un animal y luego toca su cría para unirlos con una línea. También puedes arrastrar el animal hasta su cría.',
  icon: 'cow',
  levels: ['3 parejas', '5 parejas', '6 parejas y nombres'],
  rounds: 4,
  round(g, i) {
    if (g.level === 3 && i >= 2) return question(g);
    const n = g.level === 1 ? 3 : g.level === 2 ? 5 : 6;
    const fam = U.sample(FAM, n);
    const showC = g.level === 1;
    const showM = g.level < 3;
    const board = U.el(`<div class="x9-board"><div class="x9-col" data-c="l"></div><svg class="x9-lines" aria-hidden="true"></svg><div class="x9-col" data-c="r"></div></div>`);
    const L = board.querySelector('[data-c=l]'), R = board.querySelector('[data-c=r]'), svg = board.querySelector('.x9-lines');
    const ch = n >= 6 ? '3.6rem' : n === 5 ? '4.2rem' : '5.2rem';
    board.style.setProperty('--ch', ch);
    L.style.setProperty('--cw', showM ? '14rem' : '0'); R.style.setProperty('--cw', showC ? '14rem' : '0');
    
    const cardOf = {};
    U.shuffle(fam).forEach(f => {
      const b = U.el(`<button class="x9-card" data-side="l" data-m="${f.m}" aria-label="${cap(f.mn)}">${Kids.art.get(f.ma)}${showM ? '<span>' + cap(f.mn) + '</span>' : ''}</button>`);
      L.appendChild(b); cardOf['l' + f.m] = b;
    });
    U.shuffle(fam).forEach(f => {
      const b = U.el(`<button class="x9-card" data-side="r" data-m="${f.m}" aria-label="Cría ${f.cn}">${Kids.art.get(f.ca)}${showC ? '<span>' + cap(f.cn) + '</span>' : ''}</button>`);
      R.appendChild(b); cardOf['r' + f.m] = b;
    });
    g.area.appendChild(board);
    g.ask(g.level === 1 ? 'Une cada mamá con su cría.' : 'Une cada animal con su cría. ¿Quién es la mamá de cada uno?');
    let sel = null, left = n, k = 0;
    const clear = () => { if (sel) sel.classList.remove('sel'); sel = null; };
    function line(a, b, col) {
      const br = board.getBoundingClientRect(), ar = a.getBoundingClientRect(), cr = b.getBoundingClientRect();
      const ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      ln.setAttribute('x1', ar.right - br.left); ln.setAttribute('y1', ar.top + ar.height / 2 - br.top);
      ln.setAttribute('x2', cr.left - br.left); ln.setAttribute('y2', cr.top + cr.height / 2 - br.top);
      ln.setAttribute('stroke', col); ln.setAttribute('stroke-width', '7'); ln.setAttribute('stroke-linecap', 'round'); ln.setAttribute('opacity', '.9');
      svg.appendChild(ln);
    }
    function tryPair(a, b) { // a: madre (l), b: cría (r)
      if (a.dataset.m === b.dataset.m) {
        const col = COLORS[k++ % COLORS.length];
        [a, b].forEach(x => { x.classList.remove('sel', 'hot'); x.classList.add('done'); x.style.setProperty('--c', col); x.disabled = true; });
        line(a, b, col); clear(); Kids.sound.pop();
        const f = fam.find(x => x.m === a.dataset.m); g.say(cap(f.mn) + ' y ' + f.cn);
        if (--left === 0) g.t(() => g.right('¡Todas las familias juntas!'), 600);
        return true;
      }
      g.shake(b); b.classList.add('bad'); g.t(() => b.classList.remove('bad'), 450);
      clear(); g.wrong('Esa cría no es de ' + cap(fam.find(x => x.m === a.dataset.m).mn).toLowerCase() + '. ¡Prueba otra!');
      return false;
    }
    g.helpHint = () => {
      const a = Array.from(L.children).find(x => !x.classList.contains('done'));
      if (!a) return;
      const b = cardOf['r' + a.dataset.m];
      a.classList.add('hint'); b.classList.add('hint'); g.t(() => { a.classList.remove('hint'); b.classList.remove('hint'); }, 3800);
      const f = fam.find(x => x.m === a.dataset.m); g.toast('Mira: ' + cap(f.mn) + ' va con ' + f.cn);
    };
    Array.from(L.children).forEach(a => {
      Kids.drag(a, {
        targets: () => Array.from(R.children).filter(x => !x.classList.contains('done')),
        onStart: el => { clear(); },
        onDrop: (t, el) => { tryPair(el, t); return false; },
        onTap: el => { clear(); sel = el; el.classList.add('sel'); }
      });
    });
    Array.from(R.children).forEach(b => b.addEventListener('click', () => {
      if (b.classList.contains('done')) return;
      if (sel) tryPair(sel, b); else g.toast('Toca primero un animal de la izquierda');
    }));
  }
});
})();
