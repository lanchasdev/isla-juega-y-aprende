/* Lectura x15 — Trabalenguas animados */
(function () {
'use strict';
const U = Kids.util;

Kids.art.add({
  'lx15-tiger': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="93" rx="28" ry="4" fill="rgba(20,35,91,.1)"/><circle cx="22" cy="30" r="11" fill="#FFA23D"/><circle cx="78" cy="30" r="11" fill="#FFA23D"/><circle cx="22" cy="30" r="5" fill="#FFD9B0"/><circle cx="78" cy="30" r="5" fill="#FFD9B0"/>
    <ellipse cx="50" cy="56" rx="36" ry="33" fill="#FFA23D"/><path d="M50 24V36M34 28L38 38M66 28L62 38M14 52H26M14 62L25 60M86 52H74M86 62L75 60" stroke="#7A3E12" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="50" cy="68" rx="19" ry="14" fill="#FFF1DC"/><ellipse cx="50" cy="60" rx="6" ry="4.4" fill="#E0584A"/><path d="M50 64V70M42 72Q50 78 58 72" stroke="#7A3E12" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <circle cx="36" cy="48" r="4" fill="#14235B"/><circle cx="64" cy="48" r="4" fill="#14235B"/><circle cx="37.4" cy="46.6" r="1.4" fill="#fff"/><circle cx="65.4" cy="46.6" r="1.4" fill="#fff"/></svg>`,
  'lx15-potato': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="90" rx="30" ry="4.5" fill="rgba(20,35,91,.1)"/><path d="M16 56Q14 26 44 22Q80 18 86 50Q92 80 58 86Q20 90 16 56Z" fill="#CC9A62" stroke="#A97A44" stroke-width="3"/><circle cx="68" cy="34" r="2.6" fill="#A97A44"/><circle cx="28" cy="74" r="2.4" fill="#A97A44"/><circle cx="74" cy="70" r="2.6" fill="#A97A44"/>
    <circle cx="40" cy="52" r="3.6" fill="#14235B"/><circle cx="60" cy="52" r="3.6" fill="#14235B"/><circle cx="41.2" cy="50.8" r="1.2" fill="#fff"/><circle cx="61.2" cy="50.8" r="1.2" fill="#fff"/><path d="M43 62Q50 69 57 62" fill="none" stroke="#14235B" stroke-width="2.6" stroke-linecap="round"/><ellipse cx="33" cy="61" rx="4" ry="2.6" fill="#FFB8C6" opacity=".8"/><ellipse cx="67" cy="61" rx="4" ry="2.6" fill="#FFB8C6" opacity=".8"/></svg>`,
  'lx15-box': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="91" rx="34" ry="4.5" fill="rgba(20,35,91,.1)"/><path d="M12 38L50 28L88 38L50 48Z" fill="#E7B873"/><path d="M12 38V72L50 86V48Z" fill="#D9A15A"/><path d="M88 38V72L50 86V48Z" fill="#C98F46"/><path d="M38 33L50 48L62 33" fill="none" stroke="#F8E3B8" stroke-width="5" stroke-linejoin="round" opacity=".85"/><path d="M50 48V86" stroke="#F8E3B8" stroke-width="5" opacity=".85"/></svg>`,
  'lx15-wheat': `<svg viewBox="0 0 100 100"><path d="M50 96V30" stroke="#C9A24A" stroke-width="4" stroke-linecap="round"/><g fill="#E8C060"><ellipse cx="42" cy="26" rx="6" ry="11" transform="rotate(-20 42 26)"/><ellipse cx="58" cy="26" rx="6" ry="11" transform="rotate(20 58 26)"/><ellipse cx="50" cy="16" rx="6" ry="11"/><ellipse cx="41" cy="44" rx="5.5" ry="10" transform="rotate(-20 41 44)"/><ellipse cx="59" cy="44" rx="5.5" ry="10" transform="rotate(20 59 44)"/></g></svg>`,
  'lx15-hammer': `<svg viewBox="0 0 200 120"><rect x="14" y="98" width="130" height="16" rx="5" fill="#C48A52"/><rect x="14" y="98" width="130" height="5" rx="2.5" fill="#D9A56E"/>
    <rect x="58" y="80" width="6" height="20" rx="2" fill="#8E99AE"/><rect x="54" y="76" width="14" height="5" rx="2.5" fill="#6F7E9B"/>
    <g class="hm"><rect x="146" y="40" width="9" height="62" rx="4" fill="#B3733A"/><rect x="122" y="22" width="50" height="22" rx="6" fill="#9AA7BE"/><rect x="122" y="22" width="14" height="22" rx="5" fill="#7E8BA8"/></g></svg>`
});

/* pool: niveles; gap = índice de palabra a ocultar (nivel 1-2); chunks = trozos para ordenar (nivel 3) */
const TW = [
  { id: 'pablito', lv: 1, t: 'Pablito clavó un clavito', gap: 1, bad: ['comió', 'miró'], ill: 'hammer' },
  { id: 'mama', lv: 1, t: 'Mi mamá me mima mucho', gap: 3, bad: ['besa', 'canta'], ill: 'mama' },
  { id: 'pepe', lv: 1, t: 'Pepe pela papas pequeñas', gap: 1, bad: ['corta', 'lava'], ill: 'potato' },
  { id: 'tito', lv: 1, t: 'Tito toma té tibio', gap: 0, bad: ['Luis', 'Mario'], ill: 'tea' },
  { id: 'rita', lv: 1, t: 'Rita la rana rema', gap: 2, bad: ['gata', 'pata'], ill: 'frog' },
  { id: 'pablito2', lv: 2, t: 'Pablito clavó un clavito. ¿Qué clavito clavó Pablito?', gap: 3, bad: ['martillo', 'tornillo'], ill: 'hammer' },
  { id: 'tigres', lv: 2, t: 'Tres tristes tigres tragaban trigo en un trigal', gap: 3, bad: ['comían', 'miraban'], ill: 'tigers' },
  { id: 'cuentos', lv: 2, t: 'Cuando cuentes cuentos, cuenta cuántos cuentos cuentas', gap: 3, bad: ['dime', 'mira'], ill: 'book' },
  { id: 'paquito', lv: 2, t: 'Poquito a poquito Paquito empaca poquitas copitas en pocos paquetes', gap: 4, bad: ['guarda', 'pone'], ill: 'boxes',
    chunks: ['Poquito a poquito', 'Paquito empaca', 'poquitas copitas', 'en pocos paquetes'] },
  { id: 'pecas', lv: 3, t: 'Pepe Pecas pica papas con un pico, con un pico pica papas Pepe Pecas', ill: 'potato2',
    chunks: ['Pepe Pecas pica papas', 'con un pico,', 'con un pico pica papas', 'Pepe Pecas'] },
  { id: 'erre', lv: 3, t: 'Erre con erre cigarro, erre con erre barril; rápido ruedan los carros cargados de azúcar del ferrocarril', ill: 'train',
    chunks: ['Erre con erre cigarro,', 'erre con erre barril;', 'rápido ruedan los carros', 'cargados de azúcar', 'del ferrocarril'] },
  { id: 'roque', lv: 3, t: 'El perro de San Roque no tiene rabo porque Ramón Ramírez se lo ha cortado', ill: 'dog',
    chunks: ['El perro de San Roque', 'no tiene rabo', 'porque Ramón Ramírez', 'se lo ha cortado'] }
];

const it = (svg, cls, d) => `<span class="it ${cls}" style="animation-delay:${d || 0}s">${svg}</span>`;
const A = n => Kids.art.get(n);
const ILL = {
  hammer: () => `<span class="it hammerwrap">${A('lx15-hammer')}</span>${it(Kids.avatarSvg(U.rnd(0, 3)), 'an-bob', 0)}`,
  mama: () => it(Kids.avatarSvg(1), 'an-bob', 0) + `<span class="hearts">${[0, 1, 2].map(k => it(A('heart'), 'an-float', k * .6)).join('')}</span>` + it(Kids.avatarSvg(0), 'an-bob', .4),
  potato: () => it(A('lx15-potato'), 'an-wob', 0) + it(A('lx15-potato'), 'an-wob', .3) + it(A('lx15-potato'), 'an-wob', .6),
  potato2: () => it(Kids.avatarSvg(2), 'an-bob', 0) + it(A('lx15-potato'), 'an-hop', 0) + it(A('lx15-potato'), 'an-hop', .25) + it(A('lx15-potato'), 'an-hop', .5),
  tea: () => it(A('teddy'), 'an-bob', 0) + `<span class="it teawrap">${A('cup')}<i class="st s1"></i><i class="st s2"></i><i class="st s3"></i></span>`,
  frog: () => `<span class="it boatwrap an-rock">${A('boat')}<span class="onboat">${A('frog')}</span></span>`,
  tigers: () => [0, 1, 2].map(k => it(A('lx15-tiger'), 'an-bob', k * .3)).join('') + `<span class="wheat">${[0, 1, 2].map(k => it(A('lx15-wheat'), 'an-sway', k * .4)).join('')}</span>`,
  book: () => it(A('book'), 'an-wob', 0) + `<span class="hearts">${[0, 1, 2].map(k => it(A('star'), 'an-float', k * .5)).join('')}</span>`,
  boxes: () => [0, 1, 2].map(k => it(A('cup'), 'an-hop', k * .3)).join('') + it(A('lx15-box'), 'an-wob', .2),
  train: () => `<span class="trainwrap">${it(A('train'), 'an-slide', 0)}</span>`,
  dog: () => it(A('dog'), 'an-wob', 0) + it(A('house'), 'an-bob', .5)
};

Kids.css(`
.g-lectura-x15{gap:.8rem}
.g-lectura-x15 .x15-ill{overflow:hidden;width:100%;display:flex;align-items:flex-end;justify-content:center;gap:.4rem;height:clamp(5.5rem,20vh,10rem);position:relative;max-width:100%}
.g-lectura-x15 .x15-ill .it{display:block;height:100%;aspect-ratio:1;max-width:21vw;position:relative}
.g-lectura-x15 .x15-ill .it svg{width:100%;height:100%}
.g-lectura-x15 .x15-ill .hammerwrap{aspect-ratio:1.7;max-width:34vw}
.g-lectura-x15 .x15-ill .hm{transform-box:view-box;transform-origin:150px 100px;animation:x15ham .9s ease-in infinite alternate}
@keyframes x15ham{from{transform:rotate(8deg)}to{transform:rotate(-78deg)}}
.g-lectura-x15 .hearts{display:flex;height:100%;align-items:flex-end}
.g-lectura-x15 .hearts .it{height:55%;aspect-ratio:1}
.g-lectura-x15 .wheat{display:flex;height:70%}
.g-lectura-x15 .teawrap .st{position:absolute;top:-8%;width:.35rem;height:1.3rem;border-radius:1rem;background:#CFD8E8;animation:x15st 1.6s infinite;opacity:0}
.g-lectura-x15 .teawrap .s1{left:36%}.g-lectura-x15 .teawrap .s2{left:50%;animation-delay:.5s}.g-lectura-x15 .teawrap .s3{left:62%;animation-delay:1s}
@keyframes x15st{0%{transform:translateY(.8rem);opacity:0}30%{opacity:.9}100%{transform:translateY(-1.2rem);opacity:0}}
.g-lectura-x15 .boatwrap{aspect-ratio:1.2}
.g-lectura-x15 .boatwrap .onboat{position:absolute;left:28%;top:-30%;width:44%;aspect-ratio:1}.g-lectura-x15 .boatwrap .onboat svg{width:100%;height:100%}
.g-lectura-x15 .trainwrap{display:block;width:min(34rem,86vw);height:100%;overflow:hidden;border-bottom:.35rem solid #B8C0D4}
.g-lectura-x15 .an-bob{animation:bounce 1s ease-in-out infinite}
.g-lectura-x15 .an-wob{animation:x15wob 1.1s ease-in-out infinite alternate;transform-origin:50% 90%}
.g-lectura-x15 .an-hop{animation:x15hop .7s ease-in-out infinite}
.g-lectura-x15 .an-sway{animation:x15wob 1.8s ease-in-out infinite alternate;transform-origin:50% 100%}
.g-lectura-x15 .an-rock{animation:x15wob 1.6s ease-in-out infinite alternate;transform-origin:50% 100%}
.g-lectura-x15 .an-float{animation:x15flt 2s ease-out infinite;opacity:0}
.g-lectura-x15 .an-slide{animation:x15sl 3.2s linear infinite;width:34%;aspect-ratio:1}
@keyframes x15wob{from{transform:rotate(-7deg)}to{transform:rotate(7deg)}}
@keyframes x15hop{0%,100%{transform:translateY(0) scale(1.05,.95)}50%{transform:translateY(-1.2rem) scale(.96,1.04)}}
@keyframes x15flt{0%{transform:translateY(.8rem) scale(.6);opacity:0}25%{opacity:1}100%{transform:translateY(-3.2rem) scale(1);opacity:0}}
@keyframes x15sl{from{transform:translateX(-110%)}to{transform:translateX(300%)}}
.g-lectura-x15 .x15-card{background:#fff;border-radius:1.8rem;padding:.8rem 1.4rem;box-shadow:0 .4rem 0 var(--line);max-width:min(44rem,96%);text-align:center;font-family:'Baloo 2';font-weight:800;font-size:clamp(1.5rem,5.4vmin,2.6rem);line-height:1.3}
.g-lectura-x15 .x15-card.long{font-size:clamp(1.15rem,3.8vmin,1.8rem)}
.g-lectura-x15 .x15-card .w{display:inline-block;padding:0 .25rem;border-radius:.7rem;transition:background .12s,transform .12s}
.g-lectura-x15 .x15-card .w.hl{background:var(--yellow);transform:scale(1.12)}
.g-lectura-x15 .x15-card .blank{display:inline-block;min-width:4.5rem;border-bottom:.28rem solid var(--g);margin:0 .2rem}
.g-lectura-x15 .x15-btns{display:flex;gap:.8rem;flex-wrap:wrap;justify-content:center}
.g-lectura-x15 .x15-btns .btn{font-size:clamp(1.2rem,3.6vmin,1.6rem)}
.g-lectura-x15 .x15-opts{display:flex;gap:.9rem;flex-wrap:wrap;justify-content:center}
.g-lectura-x15 .x15-opts .ans{font-size:clamp(1.5rem,5vmin,2.4rem);min-width:0;padding:.2rem 1.3rem;min-height:4.6rem}
.g-lectura-x15 .ans.hint{animation:pulse 1s infinite;outline:.25rem solid #5CC77A}
.g-lectura-x15 .x15-line{width:min(44rem,96%);display:flex;flex-wrap:wrap;gap:.4rem;justify-content:center;min-height:3rem;max-width:min(44rem,96%);padding:.4rem .8rem;border-radius:1.2rem;background:rgba(255,255,255,.7);border:.2rem dashed #9CB5E8;font-family:'Baloo 2';font-size:clamp(1.1rem,3.4vmin,1.6rem)}
.g-lectura-x15 .x15-line .chip{background:#BDEFC8}
.g-lectura-x15 .x15-burst{position:absolute;inset:0;pointer-events:none;z-index:30;display:flex;align-items:center;justify-content:center}
.g-lectura-x15 .x15-burst svg{position:absolute;width:3.2rem;height:3.2rem;animation:x15bu 1.1s ease-out forwards}
@keyframes x15bu{from{transform:translate(0,0) scale(.4);opacity:1}to{transform:translate(var(--dx),var(--dy)) scale(1.2) rotate(120deg);opacity:0}}
`);

const strip = s => s.replace(/[¿¡]/g, '');
let usedT = [];
Kids.game({
  id: 'lectura-x15', group: 'lectura', num: 19,
  title: 'Trabalenguas animados', icon: 'parrot', rounds: 4,
  blurb: 'Escucha el trabalenguas, dilo tú y completa una palabra.',
  how: 'Escucha el trabalenguas con las palabras iluminadas. Después léelo tú en voz alta y toca lo dije. Al final, completa el reto.',
  levels: ['Cortitos', 'Medianos', 'Largos'],
  round(g, i) {
    if (i === 0) usedT = [];
    const lv = g.level;
    let cand = TW.filter(x => x.lv === lv && !usedT.includes(x.id));
    if (lv === 3) cand = TW.filter(x => x.chunks && !usedT.includes(x.id));
    if (!cand.length) cand = TW.filter(x => lv === 3 ? x.chunks : x.lv === lv);
    const T = U.pick(cand); usedT.push(T.id);
    const words = T.t.split(' ');
    const long = words.length > 9;

    const ill = U.el(`<div class="x15-ill" aria-hidden="true">${ILL[T.ill]()}</div>`);
    const card = U.el(`<div class="x15-card ${long ? 'long' : ''}" lang="es">${words.map((w, k) => `<span class="w" data-k="${k}">${U.esc(w)}</span>`).join(' ')}</div>`);
    const btns = U.el('<div class="x15-btns"></div>');
    g.area.appendChild(ill); g.area.appendChild(card); g.area.appendChild(btns);
    const wEls = [...card.querySelectorAll('.w')];
    const setHL = k => wEls.forEach((e, j) => e.classList.toggle('hl', j === k));

    /* posiciones de cada palabra en el texto, para el resaltado con onboundary */
    const text = strip(T.t); const starts = []; { let pos = 0; strip(T.t).split(' ').forEach(w => { const s = text.indexOf(w, pos); starts.push(s); pos = s + w.length; }); }
    let lid = 0;
    function listen() {
      const my = ++lid; setHL(-1);
      let got = false, fb = false;
      const fallback = () => {
        if (fb || got || my !== lid) return; fb = true; let tt = 100;
        words.forEach((w, k) => { g.t(() => { if (my === lid && !got) setHL(k); }, tt); tt += 360 + w.length * 75; });
        g.t(() => { if (my === lid && !got) setHL(-1); }, tt + 150);
      };
      const canSpeak = ('speechSynthesis' in window) && Kids.save.data.voice;
      if (canSpeak) {
        try {
          const u = new SpeechSynthesisUtterance(text); u.lang = 'es-ES'; u.rate = 0.62; u.pitch = 1.1;
          const v = speechSynthesis.getVoices().find(v => /^es/i.test(v.lang)); if (v) u.voice = v;
          u.onboundary = e => {
            if (my !== lid || (e.name && e.name !== 'word')) return; got = true;
            let k = 0; for (let j = 0; j < starts.length; j++) if (starts[j] <= e.charIndex) k = j; setHL(k);
          };
          u.onend = () => { if (my === lid) setHL(-1); };
          speechSynthesis.cancel(); speechSynthesis.speak(u);
          g.t(fallback, 1500);
        } catch (e) { fallback(); }
      } else fallback();
    }

    function phase1() {
      g.ask('Escucha el trabalenguas');
      btns.innerHTML = '';
      const b1 = U.el(`<button class="btn blue" aria-label="Escuchar el trabalenguas">${Kids.icons.speaker} Escuchar</button>`);
      const b2 = U.el(`<button class="btn" aria-label="Ahora tú">Ahora tú ${Kids.icons.arrow}</button>`);
      b1.onclick = listen; b2.onclick = () => { lid++; setHL(-1); phase2(); };
      btns.appendChild(b1); btns.appendChild(b2);
      g.helpHint = null;
    }
    function phase2() {
      g.ask('Ahora tú: léelo en voz alta, despacito');
      btns.innerHTML = '';
      const b1 = U.el(`<button class="btn blue" aria-label="Escuchar otra vez">${Kids.icons.speaker} Escuchar</button>`);
      const b2 = U.el(`<button class="btn teal" aria-label="Lo dije">¡Lo dije!</button>`);
      b1.onclick = listen;
      b2.onclick = () => {
        lid++; setHL(-1); b2.disabled = true; b1.disabled = true; Kids.sound.win();
        const burst = U.el('<div class="x15-burst"></div>');
        for (let k = 0; k < 9; k++) {
          const s = U.el(Kids.art.get('star')); const a = k / 9 * 6.28, r = 90 + Math.random() * 90;
          s.style.setProperty('--dx', Math.cos(a) * r + 'px'); s.style.setProperty('--dy', Math.sin(a) * r + 'px'); burst.appendChild(s);
        }
        g.area.appendChild(burst); g.t(() => burst.remove(), 1200);
        g.toast('¡Qué bien lo has dicho!');
        g.t(phase3, 1300);
      };
      btns.appendChild(b1); btns.appendChild(b2);
    }
    function phase3() {
      btns.innerHTML = '';
      if (lv < 3) {
        const m = /^([¿¡]*)(.*?)([.,;:?!]*)$/.exec(words[T.gap]); const ans = m[2];
        card.innerHTML = words.map((w, k) => k === T.gap ? `<span class="w">${m[1]}<span class="blank">&nbsp;</span>${m[3]}</span>` : `<span class="w">${U.esc(w)}</span>`).join(' ');
        g.ask('¿Qué palabra falta?');
        const opts = U.shuffle([ans].concat(T.bad));
        const wrap = U.el('<div class="x15-opts"></div>');
        opts.forEach(o => {
          const b = U.el(`<button class="ans">${U.esc(o)}</button>`); b._ok = o === ans;
          b.onclick = () => {
            if (b.disabled) return; g.say(o);
            if (b._ok) { b.classList.add('right'); wrap.querySelectorAll('button').forEach(x => x.disabled = true); card.querySelector('.blank').innerHTML = U.esc(ans); card.querySelector('.blank').style.borderColor = '#5CC77A'; g.right(); }
            else { b.classList.add('bad'); b.disabled = true; g.wrong('Escucha otra vez: busca la que suena como las demás'); }
          };
          wrap.appendChild(b);
        });
        btns.appendChild(wrap);
        const again = U.el(`<button class="btn blue sm" aria-label="Escuchar el trabalenguas">${Kids.icons.speaker} Escuchar</button>`); again.onclick = listen;
        btns.appendChild(again);
        g.helpHint = () => { const b = [...wrap.children].find(x => x._ok); if (b) { b.classList.add('hint'); g.toast('Empieza igual que las otras palabras'); } };
      } else {
        g.ask('Ordena los trozos del trabalenguas');
        card.style.display = 'none';
        const line = U.el('<div class="x15-line" aria-live="polite"></div>');
        card.parentNode.insertBefore(line, card);
        const pool = U.el('<div class="x15-opts"></div>');
        let next = 0;
        U.shuffle(T.chunks.map((c, k) => ({ c, k }))).forEach(o => {
          const b = U.el(`<button class="ans">${U.esc(o.c)}</button>`); b._k = o.k;
          b.onclick = () => {
            if (b.disabled) return; g.say(o.c);
            if (o.c === T.chunks[next]) {
              b.disabled = true; b.style.display = 'none'; next++;
              line.appendChild(U.el(`<span class="chip">${U.esc(o.c)}</span>`));
              if (next === T.chunks.length) { Kids.sound.pop(); card.style.display = ''; line.remove(); pool.remove(); g.right(); }
            } else { b.classList.add('bad'); g.shake(b); g.t(() => b.classList.remove('bad'), 450); g.wrong('Ese trozo va en otro sitio. ¡Escucha y prueba otra vez!'); }
          };
          pool.appendChild(b);
        });
        btns.appendChild(pool);
        const again = U.el(`<button class="btn blue sm" aria-label="Escuchar el trabalenguas">${Kids.icons.speaker} Escuchar</button>`); again.onclick = listen;
        btns.appendChild(again);
        g.helpHint = () => { const b = [...pool.children].find(x => x._k === next); if (b) { b.classList.add('hint'); g.toast('Empieza por «' + U.esc(T.chunks[next].split(' ')[0]) + '»'); } };
      }
    }
    phase1();
  }
});
})();
