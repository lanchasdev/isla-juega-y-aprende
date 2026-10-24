/* Lectura x2 — Cuenta las sílabas */
(function () {
'use strict';
const U = Kids.util;
const W = [
  ['sol','sol','sun'],['pez','pez','fish'],['flor','flor','flower'],['tren','tren','train'],
  ['pato','pa-to','duck'],['gato','ga-to','cat'],['casa','ca-sa','house'],['luna','lu-na','moon'],['mesa','me-sa','table'],
  ['vaca','va-ca','cow'],['rana','ra-na','frog'],['oso','o-so','bear'],['perro','pe-rro','dog'],['libro','li-bro','book'],
  ['barco','bar-co','boat'],['tarta','tar-ta','cake'],['nube','nu-be','cloud'],['león','le-ón','lion'],['ratón','ra-tón','mouse'],
  ['pera','pe-ra','pear'],['fresa','fre-sa','strawberry'],['globo','glo-bo','balloon'],['llave','lla-ve','key'],['árbol','ár-bol','tree'],
  ['conejo','co-ne-jo','rabbit'],['caballo','ca-ba-llo','horse'],['tortuga','tor-tu-ga','turtle'],['jirafa','ji-ra-fa','giraffe'],
  ['ballena','ba-lle-na','whale'],['pelota','pe-lo-ta','ball'],['zapato','za-pa-to','shoe'],['manzana','man-za-na','apple'],
  ['naranja','na-ran-ja','orange'],['plátano','plá-ta-no','banana'],['cereza','ce-re-za','cherry'],['sandía','san-dí-a','watermelon'],
  ['estrella','es-tre-lla','star'],['abeja','a-be-ja','bee'],['gallina','ga-lli-na','hen'],['muñeca','mu-ñe-ca','doll'],
  ['paraguas','pa-ra-guas','umbrella'],['corazón','co-ra-zón','heart'],['pingüino','pin-güi-no','penguin'],['cangrejo','can-gre-jo','crab'],
  ['mariposa','ma-ri-po-sa','butterfly'],['elefante','e-le-fan-te','elephant'],['camiseta','ca-mi-se-ta','tshirt'],
  ['zanahoria','za-na-ho-ria','carrot'],['arcoíris','ar-co-í-ris','rainbow']
].map(([w, s, a]) => ({ w, s: s.split('-'), a }));
const COLS = ['#7B61D9', '#D9692A', '#1F9BA8', '#D6477A', '#4C8DF6'];
const NUM = ['', 'una', 'dos', 'tres', 'cuatro', 'cinco'];
let mode = 'clap';
Kids.art.add({
  'lx2-clap': '<svg viewBox="0 0 100 100"><g fill="#FFD6A8" stroke="#E8A56B" stroke-width="3" stroke-linejoin="round"><rect x="20" y="26" width="28" height="54" rx="14" transform="rotate(-16 34 53)"/><rect x="52" y="26" width="28" height="54" rx="14" transform="rotate(16 66 53)"/></g><g stroke="#FFB400" stroke-width="4" stroke-linecap="round"><path d="M50 8v10M34 12l4 8M66 12l-4 8"/></g><g stroke="#E8A56B" stroke-width="2.5" stroke-linecap="round" fill="none"><path d="M26 40l8-3M30 50l8-3M74 40l-8-3M70 50l-8-3"/></g></svg>'
});

Kids.css(`
.g-lectura-x2{gap:.8rem}
.g-lectura-x2 .x2-top{display:flex;align-items:center;justify-content:center;gap:1.2rem;flex-wrap:wrap}
.g-lectura-x2 .x2-pic{width:clamp(7rem,24vmin,12rem);height:clamp(7rem,24vmin,12rem);padding:.7rem;background:#fff;border-radius:1.8rem;box-shadow:0 .4rem 0 var(--line)}
.g-lectura-x2 .x2-pic svg{width:100%;height:100%}
.g-lectura-x2 .x2-word{font-family:'Baloo 2',sans-serif;font-weight:800;font-size:clamp(2.6rem,10vmin,4.6rem);background:#fff;padding:.2rem 1.4rem;border-radius:1.6rem;box-shadow:0 .4rem 0 var(--line);line-height:1.1;min-height:1.3em}
.g-lectura-x2 .x2-word span{display:inline-block}
.g-lectura-x2 .x2-word .dot{color:#C9BFA6;margin:0 .15em}
.g-lectura-x2 .x2-word span.beat{animation:pop .4s}
.g-lectura-x2 .x2-clap{width:clamp(7rem,24vmin,10rem);height:clamp(7rem,24vmin,10rem);border-radius:50%;background:var(--a2);box-shadow:0 .5rem 0 #E0B94A;display:flex;align-items:center;justify-content:center;padding:1rem;transition:transform .08s}
.g-lectura-x2 .x2-clap svg{width:100%;height:100%}
.g-lectura-x2 .x2-clap:active,.g-lectura-x2 .x2-clap.go{transform:scale(.88)}
.g-lectura-x2 .x2-clap.hint{animation:pulse 1s infinite;outline:.25rem solid #5CC77A}
.g-lectura-x2 .x2-count{display:flex;gap:.5rem;min-height:2.6rem;align-items:center;justify-content:center;flex-wrap:wrap}
.g-lectura-x2 .x2-count i{width:2.2rem;height:2.2rem;border-radius:50%;background:var(--g);animation:pop .3s;box-shadow:0 .2rem 0 var(--gd)}
.g-lectura-x2 .x2-row{display:flex;gap:1rem;align-items:center;justify-content:center;flex-wrap:wrap}
.g-lectura-x2 .x2-num{min-width:4.6rem;min-height:4.6rem;font-size:2.4rem;padding:0 1rem}
`);

Kids.game({
  id: 'lectura-x2', group: 'lectura', num: 6,
  title: 'Cuenta las sílabas', icon: 'elephant', rounds: 7,
  blurb: 'Da una palmada por cada sílaba de la palabra.',
  how: 'Mira el dibujo y da una palmada por cada sílaba de la palabra. Luego toca Ya está. También puedes elegir el número.',
  levels: ['1 o 2 sílabas', 'Hasta 3 sílabas', 'Hasta 4 sílabas'],
  round(g, i) {
    const lv = g.level, sh = g.shared = g.shared || { used: [] };
    if (i === 0) sh.used = [];
    const ok = x => lv === 1 ? x.s.length <= 2 : lv === 2 ? x.s.length >= 2 && x.s.length <= 3 : x.s.length >= 3;
    let pool = W.filter(ok);
    if (lv === 1) { const one = W.filter(x => x.s.length === 1), two = pool.filter(x => x.s.length === 2); pool = Math.random() < .35 ? one : two; }
    let cand = pool.filter(x => !sh.used.includes(x.w)); if (!cand.length) cand = pool;
    const t = U.pick(cand); sh.used.push(t.w);
    const n = t.s.length, maxN = lv === 1 ? 3 : lv === 2 ? 4 : 5;
    let claps = 0, done = false;

    const bar = U.el('<div class="seg"><button data-m="clap">Palmadas</button><button data-m="num">Elegir número</button></div>');
    const top = U.el(`<div class="x2-top"><div class="x2-pic">${Kids.art.get(t.a)}</div><div class="x2-word" aria-live="polite"></div></div>`);
    const wordEl = top.querySelector('.x2-word'); wordEl.textContent = t.w;
    const body = U.el('<div style="display:flex;flex-direction:column;align-items:center;gap:.8rem;width:100%"></div>');
    g.area.append(bar, top, body);

    function reveal() {
      wordEl.innerHTML = t.s.map((s, k) => `<span style="color:${COLS[k % 5]}">${U.esc(s)}</span>`).join('<span class="dot">·</span>');
      const sp = wordEl.querySelectorAll('span:not(.dot)');
      sp.forEach((s, k) => g.t(() => { s.classList.add('beat'); Kids.sound.tone(330 + k * 80, 0, .12, 'triangle', .12); }, 350 * k + 100));
    }
    function win() {
      done = true; body.querySelectorAll('button').forEach(b => b.disabled = true);
      reveal(); g.say(t.s.join(', ') + '. ' + t.w + ', ' + NUM[n] + (n === 1 ? ' sílaba' : ' sílabas'));
      g.t(() => g.right(), 350 * n + 1200);
    }
    function clap(btn) {
      if (done) return;
      claps++; btn.classList.add('go'); g.t(() => btn.classList.remove('go'), 110);
      Kids.sound.tone(150, 0, .07, 'square', .12); Kids.sound.tone(1800, 0, .03, 'sawtooth', .05);
      drawCount();
    }
    let countEl = null;
    function drawCount() { if (countEl) countEl.innerHTML = U.range(claps).map(() => '<i></i>').join(''); }
    function build() {
      bar.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.m === mode));
      body.innerHTML = ''; claps = 0; countEl = null;
      if (mode === 'clap') {
        const btn = U.el(`<button class="x2-clap" aria-label="Dar una palmada">${Kids.art.get('lx2-clap')}</button>`);
        countEl = U.el('<div class="x2-count" aria-live="polite"></div>');
        const row = U.el('<div class="x2-row"></div>');
        const reset = U.el('<button class="btn white sm" aria-label="Empezar de nuevo">Borrar</button>');
        const ok = U.el('<button class="btn sm">¡Ya está!</button>');
        reset.onclick = () => { if (done) return; claps = 0; drawCount(); Kids.sound.tap(); };
        ok.onclick = () => {
          if (done) return;
          if (claps === n) win();
          else { g.wrong(claps === 0 ? 'Da palmadas tocando la mano' : (claps < n ? 'Te faltan palmadas. ¡Otra vez!' : 'Son menos. ¡Cuenta otra vez!')); claps = 0; drawCount(); }
        };
        btn.onclick = () => clap(btn);
        row.append(reset, ok);
        body.append(btn, countEl, row);
        g.ask('Da una palmada por cada sílaba');
        g.btnClap = btn;
      } else {
        const opts = U.el('<div class="opts"></div>');
        U.range(maxN, 1).forEach(k => {
          const b = U.el(`<button class="ans x2-num" aria-label="${NUM[k]}">${k}</button>`);
          b.onclick = () => {
            if (done) return;
            if (k === n) { b.classList.add('right'); win(); }
            else { b.classList.add('bad'); g.wrong(); g.t(() => b.classList.remove('bad'), 450); }
          };
          opts.appendChild(b);
        });
        body.appendChild(opts);
        g.ask('¿Cuántas sílabas tiene la palabra?');
        g.btnClap = null;
      }
    }
    g.helpHint = () => {
      if (done) return;
      reveal(); g.toast('Mira: ' + t.s.length + (n === 1 ? ' trozo' : ' trozos') + ' de color'); g.say(t.s.join(', '));
      if (g.btnClap) g.btnClap.classList.add('hint');
    };
    bar.querySelectorAll('button').forEach(b => b.onclick = () => { if (done || b.dataset.m === mode) return; mode = b.dataset.m; Kids.sound.pop(); build(); });
    build();
  }
});
})();
