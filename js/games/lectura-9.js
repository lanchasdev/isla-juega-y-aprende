/* Rimas divertidas — lectura-9 */
(function () {
'use strict';
const K = window.Kids, U = K.util;

const S = (inner) => `<svg viewBox="0 0 100 100">${inner}</svg>`;
const SH = '<ellipse cx="50" cy="90" rx="30" ry="5" fill="#14235B" opacity=".10"/>';
K.art.add({
  'lectura9-camion': S(`${SH}<rect x="8" y="34" width="52" height="40" rx="7" fill="#FF7E69"/><path d="M60 46h18l12 14v14H60z" fill="#4C8DF6"/><path d="M66 51h9l7 9H66z" fill="#DDF1FF"/><circle cx="27" cy="76" r="9" fill="#14235B"/><circle cx="27" cy="76" r="4" fill="#cfd8f5"/><circle cx="74" cy="76" r="9" fill="#14235B"/><circle cx="74" cy="76" r="4" fill="#cfd8f5"/><rect x="16" y="43" width="34" height="9" rx="4" fill="#fff" opacity=".5"/>`),
  'lectura9-limon': S(`${SH}<path d="M12 52Q14 26 50 24Q86 26 88 52Q86 76 50 78Q14 76 12 52Z" fill="#FFE04A"/><path d="M10 52l-6 0M90 52l6 0" stroke="#E5B800" stroke-width="5" stroke-linecap="round"/><ellipse cx="38" cy="40" rx="12" ry="6" fill="#fff" opacity=".4"/><path d="M52 24q8-12 20-12q-4 10-20 12z" fill="#5CC77A"/>`),
  'lectura9-botella': S(`${SH}<rect x="40" y="10" width="20" height="12" rx="4" fill="#E9B66B"/><path d="M42 22h16v16q18 8 18 26v18q0 8-8 8H32q-8 0-8-8V64q0-18 18-26z" fill="#5CC77A"/><rect x="30" y="56" width="40" height="20" rx="6" fill="#fff" opacity=".85"/><path d="M34 44q4-4 8-4" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".6" fill="none"/>`),
  'lectura9-cuna': S(`${SH}<path d="M12 40h76M12 40v40M88 40v40" stroke="#C98B4C" stroke-width="5" stroke-linecap="round"/><path d="M14 56h72q0 22-36 22T14 56z" fill="#FFB3CB"/><path d="M14 56h72" stroke="#fff" stroke-width="4"/><path d="M26 40v18M38 40v18M50 40v18M62 40v18M74 40v18" stroke="#E0A86A" stroke-width="3.5"/><path d="M10 84q40 8 80 0" stroke="#C98B4C" stroke-width="5" stroke-linecap="round" fill="none"/>`),
  'lectura9-campana': S(`${SH}<path d="M50 12a6 6 0 0 1 6 6v3q22 6 22 32v14l8 10H14l8-10V53q0-26 22-32v-3a6 6 0 0 1 6-6z" fill="#FFC21A"/><path d="M34 40q4-10 14-12" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none" opacity=".6"/><circle cx="50" cy="82" r="8" fill="#E69A00"/>`),
  'lectura9-caracol': S(`${SH}<path d="M10 80q0-8 10-8h54q12 0 12 8z" fill="#9EDC7C"/><path d="M80 72q4-20 6-34" stroke="#9EDC7C" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M76 72q-2-20-2-28" stroke="#9EDC7C" stroke-width="6" stroke-linecap="round" fill="none"/><circle cx="86" cy="36" r="4" fill="#14235B"/><circle cx="74" cy="41" r="4" fill="#14235B"/><circle cx="45" cy="48" r="26" fill="#FFB38A"/><path d="M45 48m-17 0a17 17 0 1 1 34 0a11 11 0 1 1-22 0a6 6 0 1 1 12 0" fill="none" stroke="#E8825A" stroke-width="4" stroke-linecap="round"/>`),
  'lectura9-plato': S(`<ellipse cx="50" cy="88" rx="32" ry="5" fill="#14235B" opacity=".10"/><ellipse cx="50" cy="56" rx="40" ry="26" fill="#fff" stroke="#BFD3F6" stroke-width="4"/><ellipse cx="50" cy="56" rx="26" ry="16" fill="#DDEBFF" stroke="#BFD3F6" stroke-width="3"/><circle cx="50" cy="56" r="8" fill="#FF7E69"/>`),
  'lectura9-espejo': S(`${SH}<rect x="44" y="66" width="12" height="22" rx="5" fill="#C98B4C"/><ellipse cx="50" cy="40" rx="30" ry="34" fill="#FFC21A"/><ellipse cx="50" cy="40" rx="23" ry="27" fill="#DDF1FF"/><path d="M36 28q6-8 14-9" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none"/>`),
  'lectura9-maleta': S(`${SH}<path d="M38 28v-8q0-6 6-6h12q6 0 6 6v8" fill="none" stroke="#8B5E3C" stroke-width="5"/><rect x="12" y="28" width="76" height="56" rx="10" fill="#B07A45"/><rect x="12" y="46" width="76" height="6" fill="#8B5E3C" opacity=".5"/><rect x="42" y="42" width="16" height="14" rx="3" fill="#FFC21A"/><rect x="20" y="30" width="8" height="52" fill="#fff" opacity=".18"/>`),
  'lectura9-galleta': S(`${SH}<circle cx="50" cy="50" r="38" fill="#E9B66B"/><circle cx="50" cy="50" r="38" fill="none" stroke="#D49A4A" stroke-width="4"/><g fill="#6B4226"><circle cx="36" cy="38" r="5"/><circle cx="62" cy="34" r="5"/><circle cx="52" cy="56" r="5.5"/><circle cx="32" cy="62" r="4.5"/><circle cx="68" cy="60" r="4.5"/><circle cx="50" cy="26" r="3.5"/></g>`),
  'lectura9-cadena': S(`<g fill="none" stroke="#8D9BB8" stroke-width="7"><rect x="6" y="38" width="34" height="22" rx="11"/><rect x="30" y="38" width="34" height="22" rx="11" stroke="#AEB9D2"/><rect x="54" y="38" width="34" height="22" rx="11" transform="rotate(0)"/></g>`)
});

/* grupos de rimas consonantes (la terminación se resalta) */
const G = [
  { end: 'ón', w: [['ratón', 'mouse'], ['botón', 'button'], ['león', 'lion'], ['camión', 'lectura9-camion'], ['limón', 'lectura9-limon']] },
  { end: 'ato', w: [['pato', 'duck'], ['gato', 'cat'], ['zapato', 'shoe'], ['plato', 'lectura9-plato']] },
  { end: 'ana', w: [['rana', 'frog'], ['manzana', 'apple'], ['campana', 'lectura9-campana']] },
  { end: 'ota', w: [['pelota', 'ball'], ['bota', 'boot'], ['gota', 'raindrop']] },
  { end: 'esa', w: [['mesa', 'table'], ['fresa', 'strawberry']] },
  { end: 'ella', w: [['estrella', 'star'], ['botella', 'lectura9-botella']] },
  { end: 'una', w: [['luna', 'moon'], ['cuna', 'lectura9-cuna']] },
  { end: 'ol', w: [['sol', 'sun'], ['caracol', 'lectura9-caracol']] },
  { end: 'ejo', w: [['conejo', 'rabbit'], ['espejo', 'lectura9-espejo']] },
  { end: 'eta', w: [['cometa', 'kite'], ['maleta', 'lectura9-maleta'], ['galleta', 'lectura9-galleta']] },
  { end: 'ena', w: [['ballena', 'whale'], ['cadena', 'lectura9-cadena']] }
];
const ALL = [];
G.forEach((g, gi) => g.w.forEach(([word, art]) => ALL.push({ word, art, gi, end: g.end })));
const hl = (it) => { const st = it.word.slice(0, it.word.length - it.end.length); return `${U.esc(st)}<b class="rh">${U.esc(it.end)}</b>`; };

K.css(`
.g-lectura-9{display:flex;flex-direction:column;align-items:center;gap:1rem;width:100%}
.g-lectura-9 .rh{color:#E8590C}
.g-lectura-9 .prompt{display:flex;align-items:center;gap:1.2rem;background:#fff;border-radius:1.8rem;padding:.6rem 1.6rem .6rem .8rem;box-shadow:0 .4rem 0 var(--line);border:.2rem solid var(--gl)}
.g-lectura-9 .prompt .pimg{width:clamp(6rem,17vh,9.5rem);height:clamp(6rem,17vh,9.5rem);flex:none}
.g-lectura-9 .prompt .pimg svg{width:100%;height:100%}
.g-lectura-9 .prompt .pword{font-family:'Baloo 2';font-weight:800;font-size:clamp(2.6rem,6.5vh,4rem);line-height:1}
.g-lectura-9 .prompt .spk{width:3.4rem;height:3.4rem;border-radius:50%;background:var(--gl);color:var(--gd);display:flex;align-items:center;justify-content:center;flex:none}
.g-lectura-9 .prompt .spk svg{width:1.7rem;height:1.7rem}
.g-lectura-9 .opts{gap:1rem}
.g-lectura-9 .opt{width:clamp(7.5rem,21vw,11.5rem);min-height:clamp(8rem,20vh,11rem)}
.g-lectura-9 .opt svg{width:clamp(4.5rem,13vh,7rem);height:clamp(4.5rem,13vh,7rem)}
.g-lectura-9 .opt .lbl{font-size:clamp(1.3rem,3vh,1.9rem);font-weight:800}
.g-lectura-9 .ans.opt{width:auto;min-width:9rem;padding:.4rem 1.6rem;font-size:clamp(1.9rem,5vh,2.8rem)}
.g-lectura-9 .opt.help{animation:pulse .9s infinite;border-color:var(--yellow)}
.g-lectura-9 .tip{min-height:2.6rem;font-family:'Baloo 2';font-size:1.6rem;font-weight:800;color:var(--ink2);text-align:center}
@media (max-width:600px){.g-lectura-9 .prompt{flex-direction:column;padding:.7rem 1.2rem}.g-lectura-9 .opts{gap:.7rem}}
`);

let deck = [];
K.game({
  id: 'lectura-9', group: 'lectura', num: 3,
  title: 'Rimas divertidas', icon: 'mouse', rounds: 8,
  blurb: 'Busca la palabra que suena igual al final.',
  how: 'Mira la palabra y toca la que rima con ella, es decir, la que suena igual al final. Por ejemplo, ratón rima con botón.',
  levels: ['3 con dibujos', 'Distractores parecidos', 'Solo palabras'],
  round(g, i) {
    const lv = g.level;
    if (i === 0 || !deck.length) deck = U.shuffle(G.map((_, k) => k));
    const gi = deck.pop();
    const pair = U.sample(ALL.filter(x => x.gi === gi), 2);
    const shown = pair[0], ans = pair[1];
    const others = ALL.filter(x => x.gi !== gi);
    const nd = lv === 3 ? 3 : 2;
    let ds = [];
    if (lv >= 2) {
      const l2 = shown.word.slice(0, 2), l1 = shown.word[0];
      const sim = others.filter(x => x.word.slice(0, 2) === l2);
      const sim1 = others.filter(x => x.word[0] === l1);
      const s = sim.length ? U.pick(sim) : sim1.length ? U.pick(sim1) : null;
      if (s) ds.push(s);
    }
    const used = new Set(ds.map(x => x.gi));
    U.shuffle(others).forEach(x => { if (ds.length < nd && !used.has(x.gi)) { ds.push(x); used.add(x.gi); } });
    const opts = U.shuffle([ans].concat(ds));
    const wordOnly = lv === 3 && Math.random() < 0.5;
    const wordsOnly = lv === 3;

    g.ask('¿Qué rima con ' + shown.word + '?');
    const root = U.el(`<div class="g-lectura-9">
      <div class="prompt">${wordOnly ? '' : `<div class="pimg">${K.art.get(shown.art)}</div>`}<div class="pword">${hl(shown)}</div>
      <button class="spk" aria-label="Escuchar la palabra">${K.icons.speaker}</button></div>
      <div class="opts"></div><div class="tip"></div></div>`);
    g.area.appendChild(root);
    root.querySelector('.spk').onclick = () => g.say(shown.word);
    const box = root.querySelector('.opts'), tip = root.querySelector('.tip');
    let done = false;
    const btns = opts.map(o => {
      const b = U.el(wordsOnly
        ? `<button class="ans opt" data-w="${o.word}">${U.esc(o.word)}</button>`
        : `<button class="pic opt" aria-label="${o.word}">${K.art.get(o.art)}<span class="lbl">${U.esc(o.word)}</span></button>`);
      b._o = o;
      b.onclick = () => {
        if (done || b.disabled) return;
        g.say(o.word);
        if (o === ans) {
          done = true; btns.forEach(x => x.classList.remove('help'));
          b.classList.add('right');
          const l = b.querySelector('.lbl'); if (l) l.innerHTML = hl(o); else b.innerHTML = hl(o);
          tip.innerHTML = `${hl(shown)} y ${hl(o)} riman: ¡terminan igual!`;
          g.right();
        } else {
          b.classList.add('bad'); b.disabled = true;
          g.wrong('Escucha el final de la palabra. ¡Prueba otra!');
        }
      };
      box.appendChild(b); return b;
    });
    g.helpHint = () => {
      const b = btns.find(x => x._o === ans); if (b) b.classList.add('help');
      g.toast('Escucha: <b style="color:#E8590C">' + U.esc(shown.end) + '</b>, ¡busca la que termine igual!');
      g.say(shown.word);
    };
  }
});
})();
