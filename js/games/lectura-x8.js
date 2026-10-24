/* Lectura x8 — ¿Qué letra falta? */
(function () {
'use strict';
const U = Kids.util;
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
/* banco: palabra, dibujo */
const BANK = [
  ['gato', 'cat'], ['perro', 'dog'], ['pato', 'duck'], ['casa', 'house'], ['sol', 'sun'], ['luna', 'moon'], ['mesa', 'table'], ['silla', 'chair'],
  ['pera', 'pear'], ['fresa', 'strawberry'], ['flor', 'flower'], ['árbol', 'tree'], ['coche', 'car'], ['tren', 'train'], ['libro', 'book'],
  ['llave', 'key'], ['oso', 'bear'], ['mono', 'monkey'], ['pez', 'fish'], ['rana', 'frog'], ['vaca', 'cow'], ['nube', 'cloud'],
  ['estrella', 'star'], ['corazón', 'heart'], ['barco', 'boat'], ['globo', 'balloon'], ['cama', 'bed'], ['taza', 'cup'], ['balón', 'ball'],
  ['cerdo', 'pig'], ['caballo', 'horse'], ['oveja', 'sheep'], ['zapato', 'shoe'], ['tortuga', 'turtle'], ['jirafa', 'giraffe'],
  ['mariposa', 'butterfly'], ['abeja', 'bee'], ['conejo', 'rabbit'], ['ratón', 'mouse'], ['manzana', 'apple'], ['tarta', 'cake'],
  ['lámpara', 'lamp'], ['tambor', 'drum'], ['cometa', 'kite'], ['plátano', 'banana'], ['naranja', 'orange'], ['uvas', 'grapes'],
  ['cereza', 'cherry'], ['león', 'lion'], ['zorro', 'fox'], ['pájaro', 'bird'], ['ballena', 'whale'], ['delfín', 'dolphin'], ['elefante', 'elephant'],
  ['zanahoria', 'carrot'], ['sandía', 'watermelon'], ['paraguas', 'umbrella'], ['cangrejo', 'crab'], ['pingüino', 'penguin'], ['bufanda', 'scarf'],
  ['gorro', 'beanie'], ['camiseta', 'tshirt'], ['sombrero', 'hat'], ['robot', 'robot'], ['muñeca', 'doll']
].map(([w, a]) => ({ w, a, n: norm(w) }));
/* otras palabras comunes del español infantil: ninguna opción puede formarlas */
const EXTRA = ('mano pan sal mar red rey ley luz uno una dos tres seis diez mala malo pata gata pala palo masa misa cosa caso rato rata pelo pila pico poco pozo ' +
 'lata lana lago lado lobo loco lodo mira mapa mama papa mono mina mesa meta mil sapo saco sopa sala seda silla sillas tela tele tapa tipo toro tos ' +
 'toma tiza vaso vela vena voz vida viña zona oro ojo ola oca ala ama asa isla ido uso uña una oso eso ese esa ato ' +
 'bota boca bola boda bolsa bien bote beso bolo cana cara cena cera cuna copa cola coco codo col con cine cesta cubo cuna dado dedo dos dia ' +
 'fila fino foca foco fama faro fiel gafas gana gala gol goma gusano hada hilo hoja hora hielo hoy hijo jefe jugo juez lupa luna lila lazo leche ' +
 'mono moto mudo mula muro nada nido nuez nota nubes ojos pavo peso pila pino pipa piso plato pluma puño puma queso rama remo ropa rosa ruta rico ' +
 'sol sello sera suma taza tapa taco tallo trapo trigo tubo vaca vara vela vino yate yema yo zumo pez paz pie pies mes mas mis mus nos nube ' +
 'tarta tarro tardes torta torre tinta tinto perra perro pera peras pero pena pesa pila polo pozo porra gato gata gatos guapo hueso huevo ' +
 'cabra cama campo canto cardo carta casa casas cebra cerro cesto chico chivo coche cofre cojin copo corto cosas cruz cuna cura dama dato dedo dia dama ' +
 'fresa fruta frio flor flora fuego fuerte fuera gafas globo gorra gorro gota grano gris gruta guante hacha hueco hogar ' +
 'lado lapiz lejos lento libre libro limon lista lleno llano llama llave lucha madre malla manta marco masa mazo medio mesa mismo mochila moda mosca mundo musica ' +
 'nariz negro nieve nuevo obra ocho olla ondas orden otra oveja pago pais palma panda pared pasta pecho pelota pinza piña plaza pollo ' +
 'prado puente pulpo punto queso radio raton rayo regalo reloj rojo roto ruido sabor salto sandia seco silla sobre sucio sueño tabla tarde techo ' +
 'tigre tierra tijera tienda tomate tonto trenes trozo turno unico vacio valle vecino verde viaje viejo vuelo zapato zumo').split(/\s+/).filter(Boolean);
const VALID = new Set(BANK.map(b => b.n).concat(EXTRA.map(norm)));
const VOW = 'aeiou'.split(''), CON = 'bcdfglmnprstvz'.split('');
const ALL = VOW.concat(CON).concat(['j', 'h', 'ñ', 'q']);

/* huecos permitidos: ni tildes, ni ü, ni dígrafos (ll, rr, ch, qu, gu) */
function okIdx(w, k) {
  const ch = w[k], n = norm(ch);
  if (ch !== n || ch === 'ü' || ch === 'ñ') return false;
  const a = w[k - 1] || '', b = w[k + 1] || '', pair = x => (x === 'll' || x === 'rr' || x === 'ch' || x === 'qu' || x === 'gu');
  if (pair(a + ch) || pair(ch + b)) return false;
  return true;
}
/* devuelve letras distractoras (no forman palabra válida) */
function distractors(word, hole, holesFilledOk, k) {
  const w = norm(word), right = w[hole], isV = VOW.includes(right);
  const pool = U.shuffle((isV ? VOW : CON).concat(isV ? [] : ['j', 'h'])).filter(x => x !== right);
  const rest = U.shuffle(ALL).filter(x => x !== right && !pool.includes(x));
  const out = [];
  pool.concat(rest).forEach(x => {
    if (out.length >= k) return;
    const t = w.slice(0, hole) + x + w.slice(hole + 1);
    if (!VALID.has(t)) out.push(x);
  });
  return out;
}
window.__x8test = { BANK, VALID, distractors, okIdx };

Kids.css(`
.g-lectura-x8{gap:1rem}
.g-lectura-x8 .x8-pic{width:clamp(8rem,28vmin,13rem);height:clamp(8rem,28vmin,13rem);padding:.8rem;background:#fff;border-radius:2rem;box-shadow:0 .4rem 0 var(--line);border:.2rem solid var(--line)}
.g-lectura-x8 .x8-pic svg{width:100%;height:100%}
.g-lectura-x8 .x8-word{display:flex;gap:.45rem;justify-content:center;flex-wrap:nowrap}
.g-lectura-x8 .x8-l{width:clamp(2.6rem,min(9vw,11vmin),5rem);height:clamp(3.4rem,min(11.5vw,14vmin),6.2rem);display:flex;align-items:center;justify-content:center;background:#fff;border-radius:1rem;box-shadow:0 .3rem 0 var(--line);border:.2rem solid var(--line);font-family:'Baloo 2',sans-serif;font-weight:800;font-size:clamp(2rem,min(7vw,9vmin),4rem);line-height:1}
.g-lectura-x8 .x8-l.hole{border:.25rem dashed #9CB5E8;background:rgba(255,255,255,.6);color:#9CB5E8;box-shadow:none}
.g-lectura-x8 .x8-l.cur{border-color:var(--yellow);background:#FFF3BF;color:var(--ink);animation:pulse 1.2s infinite}
.g-lectura-x8 .x8-l.ok{background:#BDEFC8;border-color:#5CC77A;color:var(--ink);animation:pop .5s}
.g-lectura-x8 .x8-opts{display:flex;gap:1.1rem;justify-content:center;flex-wrap:wrap}
.g-lectura-x8 .x8-opts .ans{width:clamp(5rem,16vmin,8rem);height:clamp(5rem,16vmin,8rem);min-width:0;font-size:clamp(2.6rem,9vmin,4.4rem);border-radius:1.6rem}
.g-lectura-x8 .x8-opts .ans:nth-child(2){background:var(--a2)}.g-lectura-x8 .x8-opts .ans:nth-child(3){background:var(--a3)}.g-lectura-x8 .x8-opts .ans:nth-child(4){background:var(--a4)}
.g-lectura-x8 .x8-opts .ans.hint{animation:pulse 1s infinite;outline:.25rem solid #5CC77A}
`);

Kids.game({
  id: 'lectura-x8', group: 'lectura', num: 12,
  title: '¿Qué letra falta?', icon: 'cat', rounds: 8,
  blurb: 'Mira el dibujo y toca la letra que falta en la palabra.',
  how: 'Mira el dibujo. A la palabra le falta una letra. Toca la letra que falta.',
  levels: ['Primera o última', 'Cualquier letra', 'Dos letras'],
  round(g, i) {
    const lv = g.level, nOpt = lv === 1 ? 3 : 4;
    g.shared = g.shared || { used: [] };
    const len = lv === 1 ? [3, 4] : lv === 2 ? [4, 5] : [5, 8];
    const holesFor = b => {
      const w = b.w, L = w.length;
      if (lv === 1) return [0, L - 1].filter(k => okIdx(w, k));
      const idx = U.range(L).filter(k => okIdx(w, k));
      return idx;
    };
    let cand = BANK.filter(b => b.w.length >= len[0] && b.w.length <= len[1] && !g.shared.used.includes(b.w));
    if (lv === 3) cand = cand.filter(b => holesFor(b).length >= 3);
    cand = cand.filter(b => holesFor(b).length >= 1 && holesFor(b).every(k => distractors(b.w, k, 0, nOpt - 1).length >= nOpt - 1));
    if (!cand.length) { g.shared.used = []; cand = BANK.filter(b => b.w.length >= len[0] && b.w.length <= len[1] && holesFor(b).length >= (lv === 3 ? 2 : 1)); }
    const b = U.pick(cand); g.shared.used.push(b.w);
    let holes;
    if (lv < 3) holes = [U.pick(holesFor(b))];
    else {
      const idx = holesFor(b); let pair = null;
      for (let t = 0; t < 40 && !pair; t++) { const s = U.sample(idx, 2).sort((x, y) => x - y); if (s[1] - s[0] > 1) pair = s; }
      holes = pair || U.sample(idx, 2).sort((x, y) => x - y);
    }
    const pic = U.el(`<div class="x8-pic" aria-hidden="true">${Kids.art.get(b.a)}</div>`);
    const wordEl = U.el('<div class="x8-word"></div>');
    const tiles = b.w.split('').map((ch, k) => {
      const t = U.el(`<div class="x8-l ${holes.includes(k) ? 'hole' : ''}">${holes.includes(k) ? '?' : ch}</div>`);
      wordEl.appendChild(t); return t;
    });
    const optsEl = U.el('<div class="x8-opts"></div>');
    g.area.appendChild(pic); g.area.appendChild(wordEl); g.area.appendChild(optsEl);
    g.ask(holes.length > 1 ? '¿Qué letras faltan? Toca la primera' : '¿Qué letra falta?');
    let step = 0, done = false;
    function showStep() {
      const h = holes[step], right = norm(b.w[h]);
      tiles.forEach((t, k) => t.classList.toggle('cur', k === h));
      const letters = U.shuffle([right].concat(distractors(b.w, h, 0, nOpt - 1)));
      optsEl.innerHTML = '';
      letters.forEach(L => {
        const btn = U.el(`<button class="ans" aria-label="Letra ${L}">${L}</button>`);
        btn.onclick = () => {
          if (done || btn.disabled) return;
          if (L === right) {
            btn.classList.add('right'); Kids.sound.pop(); g.say(L);
            const tl = tiles[h]; tl.textContent = b.w[h]; tl.classList.remove('hole', 'cur'); tl.classList.add('ok');
            optsEl.querySelectorAll('button').forEach(x => x.disabled = true);
            step++;
            if (step >= holes.length) { done = true; g.t(() => { g.say(b.w); }, 500); g.right(); }
            else g.t(showStep, 700);
          } else { btn.classList.add('bad'); btn.disabled = true; g.wrong(); }
        };
        optsEl.appendChild(btn);
      });
      g.helpHint = () => { optsEl.querySelectorAll('button').forEach(x => { if (x.textContent === right) x.classList.add('hint'); }); g.toast('Mira la letra que brilla'); };
    }
    showStep();
  }
});
})();
