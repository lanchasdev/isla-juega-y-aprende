/* memoria-x15 — Código secreto */
(function () {
'use strict';
const K = window.Kids, U = K.util;

/* dibujo -> [letra, nombre] (la letra es la inicial del nombre) */
const D = {
  duck: ['P', 'pato'], dog: ['P', 'perro'], cat: ['G', 'gato'], rabbit: ['C', 'conejo'], mouse: ['R', 'ratón'], monkey: ['M', 'mono'], cow: ['V', 'vaca'],
  sheep: ['O', 'oveja'], hen: ['G', 'gallina'], frog: ['R', 'rana'], turtle: ['T', 'tortuga'], bear: ['O', 'oso'], lion: ['L', 'león'], fox: ['Z', 'zorro'],
  owl: ['B', 'búho'], elephant: ['E', 'elefante'], penguin: ['P', 'pingüino'], giraffe: ['J', 'jirafa'], apple: ['M', 'manzana'], orange: ['N', 'naranja'],
  strawberry: ['F', 'fresa'], grapes: ['U', 'uvas'], cherry: ['C', 'cereza'], carrot: ['Z', 'zanahoria'], cake: ['T', 'tarta'], sun: ['S', 'sol'], moon: ['L', 'luna'],
  star: ['E', 'estrella'], cloud: ['N', 'nube'], flower: ['F', 'flor'], tree: ['A', 'árbol'], leaf: ['H', 'hoja'], rainbow: ['A', 'arcoíris'], car: ['C', 'coche'],
  drum: ['T', 'tambor'], train: ['T', 'tren'], doll: ['M', 'muñeca'], table: ['M', 'mesa'], chair: ['S', 'silla'], house: ['C', 'casa'], key: ['L', 'llave'],
  book: ['L', 'libro'], shoe: ['Z', 'zapato'], hat: ['S', 'sombrero'], boat: ['B', 'barco'], bed: ['C', 'cama'], cup: ['T', 'taza'], lamp: ['L', 'lámpara'],
  robot: ['R', 'robot'], teddy: ['O', 'osito'], bee: ['A', 'abeja'], butterfly: ['M', 'mariposa'], fish: ['P', 'pez'], whale: ['B', 'ballena']
};
const BY = {}; Object.keys(D).forEach(k => (BY[D[k][0]] = BY[D[k][0]] || []).push(k));
const WORDS = {
  1: [['SOL', 'sun'], ['OSO', 'bear'], ['UVA', 'grapes'], ['PEZ', 'fish']],
  2: ['LUNA', 'MESA', 'CASA', 'PATO', 'GATO', 'RANA', 'VACA', 'MONO', 'TREN', 'FLOR', 'NUBE', 'ROSA', 'COCO', 'MALA'],
  3: ['ZORRO', 'PERRO', 'FRESA', 'NUBES', 'PATOS', 'GATOS', 'VACAS', 'MONOS', 'TORRE', 'PLATO', 'LUNAS', 'CASAS', 'TARTA']
};
const WORDS_OK = { 1: WORDS[1], 2: WORDS[2].filter(w => ![...w].some(l => !BY[l])), 3: WORDS[3].filter(w => ![...w].some(l => !BY[l])) };
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const EXTRA = Object.keys(BY);   // letras con dibujo

let bag = [];
function build(level, last) {
  let w, hint;
  if (!bag.length) bag = U.shuffle(WORDS_OK[level]);
  const e = bag.pop(); w = Array.isArray(e) ? e[0] : e; hint = Array.isArray(e) ? e[1] : null;
  const letters = [...new Set(w.split(''))];
  const tsize = level === 1 ? letters.length : level === 2 ? 8 : 10;
  const decoys = U.sample(EXTRA.filter(l => !letters.includes(l)), Math.max(0, tsize - letters.length));
  const tl = U.shuffle([...letters, ...decoys]);
  /* clave secreta de capricho (solo nivel 3, a veces): dibujos con letras que no son su inicial */
  const wild = level === 3 && Math.random() < .5;
  const used = new Set(hint ? [hint] : []), table = [];
  if (wild) {
    const arts = U.sample(Object.keys(D), tl.length);
    tl.forEach((l, i) => { table.push({ art: arts[i], letter: l }); });
  } else {
    tl.forEach(l => { const c = BY[l].filter(a => !used.has(a)); const a = U.pick(c.length ? c : BY[l]); used.add(a); table.push({ art: a, letter: l }); });
  }
  const map = {}; table.forEach(t => (map[t.letter] = t));
  const code = w.split('').map(l => map[l].art);
  let keys;
  if (level === 1) keys = U.shuffle([...new Set([...letters, ...U.sample(EXTRA.filter(l => !letters.includes(l)), 2)])]);
  else if (level === 2) keys = U.shuffle([...new Set([...tl, ...U.sample(EXTRA.filter(l => !tl.includes(l)), 2)])]);
  else keys = ALPHA;
  return { word: w, hint, table: U.shuffle(table), code, keys, wild };
}

K.css(`
.g-memoria-x15{gap:.7rem}
.g-memoria-x15 .coded{display:flex;gap:.6rem;justify-content:center;align-items:flex-end}
.g-memoria-x15 .col{display:flex;flex-direction:column;align-items:center;gap:.3rem}
.g-memoria-x15 .col .pic2{width:var(--cw);height:var(--cw);background:#fff;border-radius:1.2rem;box-shadow:0 .3rem 0 var(--line);padding:.25rem}
.g-memoria-x15 .col .pic2 svg{width:100%;height:100%;display:block}
.g-memoria-x15 .col .sl{width:calc(var(--cw)*.78);height:calc(var(--cw)*.78);font-size:calc(var(--cw)*.5);padding:0;min-width:0;min-height:0;color:var(--ink);line-height:1}
.g-memoria-x15 .col .sl.act{border-color:#F2B93B;background:#FFF3BF;animation:pulse 1.2s infinite}
.g-memoria-x15 .col .sl.bad{background:#FFD3CF;border-color:#E58C85;animation:shake .4s}
.g-memoria-x15 .col .sl.help{background:#E8F9EC;border-color:#5CC77A}
.g-memoria-x15 .coded{--cw:min(17vw,12vh,5.6rem)}
.g-memoria-x15 .coded.n5{--cw:min(15vw,11vh,5rem)}
.g-memoria-x15 .hintp{display:flex;align-items:center;gap:.6rem;background:#fff;border-radius:999px;padding:.2rem 1rem .2rem .3rem;font-family:'Baloo 2';font-size:1.1rem}
.g-memoria-x15 .hintp svg{width:3.2rem;height:3.2rem}
.g-memoria-x15 .keyt{background:rgba(255,255,255,.8);border-radius:1.4rem;padding:.5rem .7rem;display:flex;flex-wrap:wrap;gap:.35rem .5rem;justify-content:center;max-width:min(100%,46rem)}
.g-memoria-x15 .keyt .tt{width:100%;text-align:center;font-family:'Baloo 2';font-size:1rem;color:var(--ink2);line-height:1}
.g-memoria-x15 .ke{display:flex;align-items:center;gap:.15rem;background:#fff;border-radius:.9rem;padding:.1rem .45rem .1rem .1rem;box-shadow:0 .2rem 0 var(--line)}
.g-memoria-x15 .ke svg{width:var(--ks);height:var(--ks)}
.g-memoria-x15 .ke b{font-family:'Baloo 2';font-size:calc(var(--ks)*.62);line-height:1;color:var(--gd)}
.g-memoria-x15 .ke.help{animation:pulse 1s infinite;box-shadow:0 0 0 .22rem #F2B93B}
.g-memoria-x15 .keyt{--ks:min(3rem,9.5vw)}
.g-memoria-x15 .keyt.big{--ks:min(2.5rem,8vw)}
.g-memoria-x15 .kb{display:flex;flex-wrap:wrap;gap:.4rem;justify-content:center;max-width:min(100%,44rem)}
.g-memoria-x15 .kb button{width:var(--kw);height:var(--kh);border-radius:.9rem;background:var(--g);color:#fff;font-family:'Baloo 2';font-size:calc(var(--kh)*.55);box-shadow:0 .25rem 0 var(--gd);padding:0;min-width:0;line-height:1}
.g-memoria-x15 .kb button:active{transform:translateY(.15rem);box-shadow:0 .1rem 0 var(--gd)}
.g-memoria-x15 .kb{--kw:4rem;--kh:3.6rem}
.g-memoria-x15 .kb.full{--kw:min(3.2rem,11.2vw);--kh:min(3rem,7.5vh,11vw)}
.g-memoria-x15 .kb .back{background:#fff;color:var(--ink);box-shadow:0 .25rem 0 var(--line);width:calc(var(--kw)*1.4)}
.g-memoria-x15 .kb .back svg{width:55%;height:55%}
.g-memoria-x15 .wildmsg{font-family:'Baloo 2';font-size:1.1rem;color:var(--gd);background:#fff;padding:.1rem .9rem;border-radius:999px}
@media (max-width:640px){.g-memoria-x15 .keyt{padding:.4rem .4rem}.g-memoria-x15 .kb{--kw:3.4rem;--kh:3.1rem}}
`);

const BK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5h11v14H9L3 12z"/><path d="M13 9l5 6M18 9l-5 6"/></svg>';
let lastWord = '';
K.game({
  id: 'memoria-x15', group: 'memoria', num: 19, title: 'Código secreto',
  blurb: 'Cada dibujo es una letra. Descifra la palabra secreta.',
  how: 'Cada dibujo esconde una letra. Mira la tabla de claves, busca la letra de cada dibujo y escribe la palabra secreta.',
  icon: 'key', levels: ['3 letras con pista', '4 letras', '5 letras'], rounds: 4,
  round(g) {
    if (g.i === 0) bag = [];
    const R = build(g.level, lastWord); lastWord = R.word;
    const n = R.word.length;
    g.ask(g.level === 1 ? 'Mira la clave y escribe la palabra secreta.' : 'Descifra la palabra secreta con la tabla de claves.');
    if (R.wild) g.area.appendChild(U.el('<div class="wildmsg">¡Esta vez la clave es otra!</div>'));
    if (R.hint) g.area.appendChild(U.el(`<div class="hintp">${K.art.get(R.hint)}<span>Pista: la palabra es este dibujo</span></div>`));
    const coded = U.el(`<div class="coded ${n > 4 ? 'n5' : ''}"></div>`);
    const val = Array(n).fill('');
    const slEls = R.code.map((a, i) => {
      const col = U.el(`<div class="col"><div class="pic2" aria-label="${U.esc(D[a][1])}">${K.art.get(a)}</div><button class="slot sl" aria-label="Letra ${i + 1}"></button></div>`);
      coded.appendChild(col); const s = col.querySelector('.sl');
      s.onclick = () => { if (done) return; val[i] = ''; show(i); update(); };
      return s;
    });
    const keyt = U.el(`<div class="keyt ${R.table.length > 8 ? 'big' : ''}"><div class="tt">Tabla de claves</div></div>`);
    const keEls = {};
    R.table.forEach(t => {
      const e = U.el(`<div class="ke" aria-label="${U.esc(D[t.art][1])} es la letra ${t.letter}">${K.art.get(t.art)}<b>= ${t.letter}</b></div>`);
      keyt.appendChild(e); keEls[t.letter] = e;
    });
    const kb = U.el(`<div class="kb ${g.level === 3 ? 'full' : ''}"></div>`);
    R.keys.forEach(l => { const b = U.el(`<button aria-label="Letra ${l}">${l}</button>`); b.onclick = () => type(l); kb.appendChild(b); });
    const back = U.el(`<button class="back" aria-label="Borrar una letra">${BK}</button>`); back.onclick = () => { if (done) return; let i = val.length - 1; while (i >= 0 && !val[i]) i--; if (i >= 0) { val[i] = ''; show(i); update(); } }; kb.appendChild(back);
    g.area.append(coded, keyt, kb);
    let done = false;
    const show = i => { slEls[i].textContent = val[i]; slEls[i].classList.remove('bad', 'help'); };
    const update = () => { const a = val.findIndex(v => !v); slEls.forEach((s, i) => s.classList.toggle('act', i === a)); };
    function type(l) {
      if (done) return; const i = val.findIndex(v => !v); if (i < 0) return;
      val[i] = l; show(i); K.sound.tap(); update();
      if (val.every(Boolean)) {
        const w = val.join('');
        if (w === R.word) { done = true; slEls.forEach(s => s.classList.add('help')); update(); slEls.forEach(s => s.classList.remove('act')); g.say(R.word.toLowerCase()); g.t(() => g.right('¡Código descifrado!'), 700); }
        else {
          const bad = []; val.forEach((v, k) => { if (v !== R.word[k]) bad.push(k); });
          bad.forEach(k => { slEls[k].classList.add('bad'); });
          g.wrong(bad.length === 1 ? 'Casi... una letra no es esa. Mira la clave.' : 'Casi. Mira bien la tabla de claves.');
          g.t(() => { bad.forEach(k => { val[k] = ''; show(k); }); update(); }, 800);
        }
      }
    }
    update();
    g.helpHint = () => {
      const i = val.findIndex((v, k) => v !== R.word[k]);
      const k = i < 0 ? 0 : i; const l = R.word[k];
      keEls[l] && keEls[l].classList.add('help');
      slEls[k].classList.add('act');
      g.toast('Mira la letra que brilla en la tabla.'); g.say('Mira la letra que brilla en la tabla.');
    };
  }
});
})();
