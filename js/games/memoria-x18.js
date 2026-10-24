/* memoria-x18 — Cartas de memoria con sonidos: empareja cada sonido con el animal que lo hace */
(function () {
'use strict';
const K = window.Kids, U = K.util;

/* gallo propio */
K.art.add({
  'mx18-rooster': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="92" rx="30" ry="4" fill="#5b4a2e" opacity=".16"/>
    <path d="M20 58 Q4 44 12 22 Q22 38 30 44Z" fill="#3FA7D6"/><path d="M24 62 Q4 62 4 40 Q18 48 30 52Z" fill="#5CC77A"/><path d="M22 54 Q8 30 22 14 Q28 34 34 46Z" fill="#E4572E"/>
    <ellipse cx="50" cy="64" rx="28" ry="24" fill="#E8693F"/><path d="M34 70 Q50 92 70 68 Q60 80 34 70Z" fill="#C94E28" opacity=".5"/>
    <path d="M30 62 Q42 50 56 66 Q44 78 30 62Z" fill="#F59A5B"/>
    <rect x="44" y="84" width="4" height="8" rx="2" fill="#F2B93B"/><rect x="58" y="84" width="4" height="8" rx="2" fill="#F2B93B"/>
    <circle cx="68" cy="34" r="17" fill="#fff"/><circle cx="68" cy="34" r="17" fill="#FFF3E3"/>
    <path d="M58 20 Q60 6 66 14 Q70 2 76 14 Q82 8 80 22Z" fill="#E03131"/>
    <path d="M84 32 L98 38 L84 44Z" fill="#F2B93B"/><path d="M80 44 Q84 56 76 54 Q74 48 78 44Z" fill="#E03131"/>
    <circle cx="72" cy="31" r="3.4" fill="#3b2a20"/><circle cx="73" cy="30" r="1.2" fill="#fff"/></svg>`,
  'mx18-speaker': c => `<svg viewBox="0 0 100 100"><path d="M18 38 H34 L54 20 V80 L34 62 H18Z" fill="${c || '#6552C4'}" stroke="${c || '#6552C4'}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M66 36 Q76 50 66 64" fill="none" stroke="${c || '#6552C4'}" stroke-width="7" stroke-linecap="round"/><path d="M76 24 Q94 50 76 76" fill="none" stroke="${c || '#6552C4'}" stroke-width="7" stroke-linecap="round"/></svg>`
});

/* animal, artículo+nombre, onomatopeya hablada, frase, tono */
const AN = [
  { k: 'cow',   n: 'La vaca',   s: 'muuu',          say: 'Muuuu',        f: 196 },
  { k: 'dog',   n: 'El perro',  s: 'guau',          say: 'Guau, guau',   f: 330 },
  { k: 'cat',   n: 'El gato',   s: 'miau',          say: 'Miau',         f: 600 },
  { k: 'mx18-rooster', n: 'El gallo', s: 'quiquiriquí', say: 'Quiquiriquí', f: 740 },
  { k: 'sheep', n: 'La oveja',  s: 'bee',           say: 'Beee, beee',   f: 440 },
  { k: 'duck',  n: 'El pato',   s: 'cuac',          say: 'Cuac, cuac',   f: 520 },
  { k: 'pig',   n: 'El cerdo',  s: 'oinc',          say: 'Oinc, oinc',   f: 262 },
  { k: 'horse', n: 'El caballo', s: 'iiiiii',       say: 'Iiiiiii',      f: 880 },
  { k: 'frog',  n: 'La rana',   s: 'croac',         say: 'Croac, croac', f: 247 }
];
const PAIRS = { 1: 3, 2: 5, 3: 8 };
let finalPairs = 3, finalMistakes = 0;

K.css(`
.g-memoria-x18{gap:.8rem}
.g-memoria-x18 .deck{display:grid;grid-template-columns:repeat(var(--c),var(--w));gap:.9rem;justify-content:center;flex:none;perspective:1200px}
.g-memoria-x18 .mc{position:relative;width:var(--w);height:var(--h)}
.g-memoria-x18 .flip{position:absolute;inset:0;width:100%;height:100%;transform-style:preserve-3d;transition:transform .5s cubic-bezier(.4,1.3,.5,1);border-radius:1.4rem}
.g-memoria-x18 .mc.up .flip{transform:rotateY(180deg)}
.g-memoria-x18 .face{position:absolute;inset:0;border-radius:1.4rem;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.2rem;box-shadow:0 .35rem 0 rgba(20,35,91,.16);padding:.4rem}
.g-memoria-x18 .back{background:repeating-linear-gradient(45deg,var(--g) 0 .8rem,var(--gd) .8rem 1.6rem);border:.35rem solid #fff;color:#fff;font-family:'Baloo 2';font-size:2.6rem}
.g-memoria-x18 .back b{background:rgba(255,255,255,.9);color:var(--gd);width:2.6rem;height:2.6rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.8rem}
.g-memoria-x18 .front{background:#fff;border:.25rem solid var(--line);transform:rotateY(180deg)}
.g-memoria-x18 .front.snd{background:var(--gl);border-color:var(--g)}
.g-memoria-x18 .front svg{width:70%;height:auto;max-height:62%}
.g-memoria-x18 .front .lbl{font-family:'Baloo 2';font-size:1.1rem;line-height:1}
.g-memoria-x18 .front.snd .word{font-family:'Baloo 2';font-size:clamp(.85rem,calc(var(--w) * .15),1.8rem);color:var(--gd);line-height:1;overflow-wrap:anywhere;text-align:center}
.g-memoria-x18 .mc.done .front{background:#E8F9EC;border-color:#5CC77A}
.g-memoria-x18 .mc.glow .flip{animation:pulse .6s 3}
.g-memoria-x18 .mc.glow .back{box-shadow:0 0 0 .4rem var(--yellow),0 .35rem 0 rgba(20,35,91,.16)}
.g-memoria-x18 .listen{position:absolute;right:-.5rem;top:-.6rem;z-index:3;width:2.9rem;height:2.9rem;border-radius:50%;background:var(--g);color:#fff;display:none;align-items:center;justify-content:center;box-shadow:0 .2rem 0 var(--gd)}
.g-memoria-x18 .listen svg{width:1.5rem;height:1.5rem}
.g-memoria-x18 .mc.snd.up .listen{display:flex}
.g-memoria-x18 .msg{font-family:'Baloo 2';font-size:1.3rem;color:var(--ink2);min-height:1.6rem;text-align:center}
@media (max-width:640px){.g-memoria-x18 .deck{gap:.6rem}}
`);

K.game({
  id: 'memoria-x18', group: 'memoria', num: 22, title: 'Cartas con sonidos',
  blurb: 'Da la vuelta a las cartas. Une cada sonido con el animal que lo hace.',
  how: 'Toca una carta para darle la vuelta. Si es de sonido, escucha qué animal es. Busca el dibujo del animal que hace ese sonido. Puedes pulsar el altavoz para escuchar otra vez.',
  icon: 'cow', levels: ['3 parejas', '5 parejas', '8 parejas'], rounds: 1,
  stars() { const n = finalPairs, m = finalMistakes; return m <= n ? 3 : m <= n * 2 + 1 ? 2 : 1; },
  round(g) {
    const np = PAIRS[g.level]; finalPairs = np; finalMistakes = 0;
    const set = U.sample(AN, np);
    const cards = U.shuffle(set.flatMap(a => [{ a, t: 's' }, { a, t: 'a' }]));
    const total = cards.length;
    const cols = g.level === 1 ? 3 : g.level === 2 ? 5 : 4;
    const mobile = window.innerWidth < 640;
    const c = mobile ? (g.level === 1 ? 3 : g.level === 2 ? 3 : 4) : cols;
    const rows = Math.ceil(total / c);
    g.ask('Busca el animal que hace cada sonido');

    const deck = U.el('<div class="deck"></div>');
    const msg = U.el('<div class="msg" aria-live="polite"></div>');
    g.area.append(deck, msg);
    /* tamaño de carta: cabe en alto y ancho del área */
    const W = Math.min(g.area.clientWidth - 24, 900), H = Math.max(g.area.clientHeight - 70, 220);
    const gap = 14, wMax = (W - gap * (c - 1)) / c, hMax = (H - gap * (rows - 1)) / rows;
    const cw = Math.max(64, Math.min(wMax, hMax * 0.82, 175)), ch = Math.min(hMax, cw * 1.22);
    deck.style.setProperty('--c', c); deck.style.setProperty('--w', cw + 'px'); deck.style.setProperty('--h', ch + 'px');

    const play = a => { K.voice.say(a.say); K.sound.tone(a.f, 0, .18, 'triangle', .14); K.sound.tone(a.f * 1.25, .12, .18, 'triangle', .1); };
    let first = null, busy = false, matched = 0;
    const els = cards.map((cd, ix) => {
      const snd = cd.t === 's';
      const el = U.el(`<div class="mc ${snd ? 'snd' : ''}"><button class="flip" aria-label="Carta ${ix + 1}, boca abajo">
        <span class="face back"><b>?</b></span>
        <span class="face front ${snd ? 'snd' : ''}">${snd ? `${K.art.get('mx18-speaker', '#6552C4')}<span class="word">${U.esc(cd.a.s)}</span>` : `${K.art.get(cd.a.k)}<span class="lbl">${cd.a.n}</span>`}</span></button>
        ${snd ? `<button class="listen" aria-label="Escuchar el sonido otra vez">${K.icons.speaker}</button>` : ''}</div>`);
      cd.el = el;
      el.querySelector('.flip').onclick = () => flip(cd);
      const l = el.querySelector('.listen'); if (l) l.onclick = e => { e.stopPropagation(); play(cd.a); };
      deck.appendChild(el); return el;
    });

    function flip(cd) {
      if (busy || cd.up || cd.done) return;
      cd.up = true; cd.el.classList.add('up'); K.sound.pop();
      cd.el.querySelector('.flip').setAttribute('aria-label', cd.t === 's' ? 'Sonido ' + cd.a.s : cd.a.n);
      if (cd.t === 's') play(cd.a); else K.voice.say(cd.a.n);
      if (!first) { first = cd; return; }
      const a = first, b = cd; first = null;
      if (a.a === b.a && a.t !== b.t) {
        busy = true; matched++;
        [a, b].forEach(x => { x.done = true; x.el.classList.add('done'); });
        const t = `${a.a.n} hace ${a.a.s}`; msg.textContent = t + '.';
        g.t(() => { K.voice.say(t); }, 450);
        if (matched === np) { finalMistakes = g.mistakes; g.t(() => g.right('¡Todas las parejas!'), 1700); }
        else g.t(() => { busy = false; }, 600);
      } else {
        busy = true; finalMistakes++;
        g.wrong(a.t === b.t ? 'Mira: necesitas un sonido y un animal' : 'No es esa pareja, ¡sigue buscando!');
        if (g.roundMistakes > 2 && g.roundMistakes % 3 === 2) g.helpHint();
        g.t(() => {
          [a, b].forEach(x => { x.up = false; x.el.classList.remove('up'); x.el.querySelector('.flip').setAttribute('aria-label', 'Carta, boca abajo'); });
          busy = false;
        }, 1300);
      }
    }
    g.helpHint = () => {
      const open = cards.filter(x => !x.done);
      const sc = open.find(x => x.t === 's' && !x.up) || open.find(x => !x.up); if (!sc) return;
      const mate = open.find(x => x.a === sc.a && x !== sc);
      [sc, mate].forEach(x => { if (x) { x.el.classList.add('glow'); g.t(() => x.el.classList.remove('glow'), 2000); } });
      g.toast('Mira las cartas que brillan: ¡son pareja!');
    };
  }
});
})();
