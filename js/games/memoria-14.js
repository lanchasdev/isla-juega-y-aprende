/* memoria-14 — El intruso : encuentra el dibujo que no pertenece al grupo */
(function () {
'use strict';
const K = window.Kids, U = K.util;

/* nombres con artículo (pl = plural; los plurales no se usan como intruso) */
const N = {
  apple: 'la manzana', banana: 'el plátano', pear: 'la pera', orange: 'la naranja', strawberry: 'la fresa', grapes: ['las uvas', 1], cherry: 'la cereza',
  watermelon: 'la sandía', carrot: 'la zanahoria', cake: 'la tarta', cow: 'la vaca', pig: 'el cerdo', horse: 'el caballo', sheep: 'la oveja', hen: 'la gallina',
  fish: 'el pez', whale: 'la ballena', dolphin: 'el delfín', crab: 'el cangrejo', car: 'el coche', train: 'el tren', boat: 'el barco', ball: 'la pelota',
  kite: 'la cometa', drum: 'el tambor', teddy: 'el osito', doll: 'la muñeca', robot: 'el robot', beanie: 'el gorro', scarf: 'la bufanda', swimsuit: 'el bañador',
  tshirt: 'la camiseta', boot: 'la bota', sandal: 'la sandalia', hat: 'el sombrero', table: 'la mesa', chair: 'la silla', bed: 'la cama', lamp: 'la lámpara',
  cup: 'la taza', book: 'el libro', duck: 'el pato', bird: 'el pájaro', parrot: 'el loro', owl: 'el búho', penguin: 'el pingüino', butterfly: 'la mariposa',
  bee: 'la abeja', dog: 'el perro', cat: 'el gato', rabbit: 'el conejo', mouse: 'el ratón', lion: 'el león', bear: 'el oso', frog: 'la rana', monkey: 'el mono',
  elephant: 'el elefante', giraffe: 'la jirafa', fox: 'el zorro', turtle: 'la tortuga', sun: 'el sol', snowman: 'el muñeco de nieve', snowflake: 'el copo de nieve',
  polarbear: 'el oso polar'
};
const nameOf = k => Array.isArray(N[k]) ? N[k][0] : N[k];
const isPl = k => Array.isArray(N[k]);
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

/* grupos: pl = "Las otras son …", one = "… es …" */
const S = {
  fruta:   { pl: 'frutas', one: 'una fruta', items: ['apple', 'banana', 'pear', 'orange', 'strawberry', 'grapes', 'cherry', 'watermelon'] },
  animal:  { pl: 'animales', one: 'un animal', items: ['cow', 'pig', 'horse', 'sheep', 'dog', 'cat', 'rabbit', 'duck', 'fish', 'whale', 'lion', 'bear', 'frog', 'mouse', 'monkey', 'elephant'] },
  ropa:    { pl: 'prendas de ropa', one: 'una prenda de ropa', items: ['beanie', 'scarf', 'swimsuit', 'tshirt', 'boot', 'sandal', 'hat'] },
  casa:    { pl: 'cosas de la casa', one: 'una cosa de la casa', items: ['table', 'chair', 'bed', 'lamp', 'cup', 'book'] },
  vehic:   { pl: 'vehículos', one: 'un vehículo', items: ['car', 'train', 'boat'] },
  juguete: { pl: 'juguetes', one: 'un juguete', items: ['ball', 'kite', 'drum', 'teddy', 'doll', 'robot'] },
  /* nivel 2 */
  granja:  { pl: 'animales de la granja', one: 'un animal de la granja', items: ['cow', 'pig', 'horse', 'sheep', 'hen'] },
  marino:  { pl: 'animales marinos', one: 'un animal marino', items: ['fish', 'whale', 'dolphin', 'crab'] },
  verdura: { pl: 'verduras', one: 'una verdura', items: ['carrot'] },
  dulce:   { pl: 'dulces', one: 'un dulce', items: ['cake'] },
  ave:     { pl: 'aves', one: 'un ave', items: ['bird', 'parrot', 'owl', 'hen', 'penguin'] },
  insecto: { pl: 'insectos', one: 'un insecto', items: ['butterfly', 'bee'] },
  mueble:  { pl: 'muebles', one: 'un mueble', items: ['table', 'chair', 'bed'] },
  vajilla: { pl: 'cosas para la mesa', one: 'una cosa para la mesa', items: ['cup'] },
  vehic2:  { pl: 'vehículos', one: 'un vehículo', items: ['car', 'train', 'boat'] },
  jug2:    { pl: 'juguetes', one: 'un juguete', items: ['ball', 'kite', 'drum'] },
  /* nivel 3 */
  vuela:   { pl: 'animales que vuelan', one: 'un animal que vuela', items: ['bird', 'parrot', 'owl', 'butterfly', 'bee', 'duck'] },
  novuela: { pl: 'animales que no vuelan', one: 'un animal que no vuela', items: ['cow', 'pig', 'horse', 'dog', 'cat', 'frog', 'elephant', 'rabbit'] },
  verano:  { pl: 'cosas de verano', one: 'una cosa de verano', items: ['sun', 'swimsuit', 'sandal', 'watermelon', 'tshirt'] },
  invierno:{ pl: 'cosas de invierno', one: 'una cosa de invierno', items: ['beanie', 'scarf', 'snowman', 'snowflake', 'polarbear'] },
  mascota: { pl: 'mascotas', one: 'una mascota', items: ['dog', 'cat', 'rabbit', 'parrot', 'turtle'], solo: ['dog', 'cat', 'rabbit'] },
  salvaje: { pl: 'animales salvajes', one: 'un animal salvaje', items: ['lion', 'elephant', 'giraffe', 'bear', 'fox'] },
  patas2:  { pl: 'animales con dos patas', one: 'un animal con dos patas', items: ['hen', 'duck', 'bird', 'parrot', 'owl', 'penguin'] },
  patas4:  { pl: 'animales con cuatro patas', one: 'un animal con cuatro patas', items: ['cow', 'pig', 'horse', 'sheep', 'dog', 'cat', 'elephant'] }
};
/* pares [mayoría, intruso]; el segundo se puede invertir si both */
const L1 = [['fruta', 'animal'], ['fruta', 'ropa'], ['fruta', 'casa'], ['fruta', 'juguete'], ['fruta', 'vehic'], ['animal', 'fruta'], ['animal', 'ropa'], ['animal', 'casa'],
  ['animal', 'juguete'], ['animal', 'vehic'], ['ropa', 'animal'], ['ropa', 'fruta'], ['ropa', 'casa'], ['ropa', 'vehic'], ['casa', 'animal'], ['casa', 'fruta'],
  ['casa', 'ropa'], ['casa', 'vehic'], ['vehic', 'fruta'], ['vehic', 'animal'], ['vehic', 'ropa'], ['vehic', 'casa'], ['juguete', 'fruta'], ['juguete', 'animal'],
  ['juguete', 'ropa'], ['juguete', 'casa']];
const L2 = [['granja', 'marino'], ['marino', 'granja'], ['fruta', 'verdura'], ['fruta', 'dulce'], ['ave', 'insecto'], ['mueble', 'vajilla'], ['ave', 'marino'], ['marino', 'ave']];
const L3 = [['vuela', 'novuela'], ['novuela', 'vuela'], ['verano', 'invierno'], ['invierno', 'verano'], ['mascota', 'salvaje'], ['salvaje', 'mascota'],
  ['patas4', 'patas2'], ['patas2', 'patas4']];
/* evitar ambigüedad pato/gallina/pingüino entre aves y marinos */
const BAN = { 'ave|marino': ['penguin', 'hen'], 'marino|ave': ['penguin'], 'granja|marino': [], 'ave|insecto': [] };

function build(level, last) {
  const pairs = level === 1 ? L1 : level === 2 ? L2 : L3;
  let pair, tries = 0;
  do { pair = U.pick(pairs); tries++; } while (last && pair.join() === last && tries < 8);
  const maj = S[pair[0]], int = S[pair[1]], n = level === 3 ? 5 : 3;
  const ban = BAN[pair.join('|')] || [];
  let pool = maj.items.filter(x => !ban.includes(x));
  /* ningún elemento mayoritario puede pertenecer también al grupo del intruso */
  pool = pool.filter(x => !int.items.includes(x));
  let ipool = (int.solo || int.items).filter(x => !isPl(x) && !maj.items.includes(x) && !ban.includes(x));
  if (level === 1) { // en nivel 1 el grupo "animal" de intruso no puede mezclarse con la mayoría
    ipool = ipool.filter(x => !pool.includes(x));
  }
  const good = U.sample(pool, n), bad = U.pick(ipool);
  return {
    key: pair.join(), cards: U.shuffle([...good.map(k => ({ k, bad: false })), { k: bad, bad: true }]),
    why: `Las otras son ${maj.pl}. ${cap(nameOf(bad))} ${isPl(bad) ? 'son' : 'es'} ${int.one}.`,
    hint: level === 3 ? 'Piensa en lo que tienen en común casi todos.' : 'Busca las que son parecidas entre sí.', bad
  };
}

K.css(`
.g-memoria-14{gap:1rem}
.g-memoria-14 .grid{display:grid;grid-template-columns:repeat(var(--cols),var(--cs));gap:1rem;justify-content:center;flex:none;
  --cs:min(26vh,21vw)}
.g-memoria-14 .grid.c4{--cols:4}
.g-memoria-14 .grid.c6{--cols:3;--cs:min(21vh,27vw)}
.g-memoria-14 .grid .pic{width:var(--cs);height:var(--cs);padding:.5rem;box-sizing:border-box}
.g-memoria-14 .grid .pic svg{max-width:none;max-height:none;width:100%;height:100%}
.g-memoria-14 .pic.dim{opacity:.3;transform:scale(.92)}
.g-memoria-14 .why{display:flex;align-items:center;gap:1rem;max-width:min(94%,42rem);padding:.7rem 1.4rem;font-family:'Baloo 2';font-size:1.5rem;line-height:1.15;
  background:#E8F9EC;border:.2rem solid #5CC77A;animation:pop .5s both}
.g-memoria-14 .why .pi{width:3.6rem;height:3.6rem;flex:none}
.g-memoria-14 .why .pi svg{width:100%;height:100%}
@media (max-width:640px){
  .g-memoria-14 .grid.c4{--cols:2;--cs:min(19vh,40vw)}
  .g-memoria-14 .grid.c6{--cs:min(14vh,28vw)}
  .g-memoria-14 .why{font-size:1.25rem}
}
`);

let lastKey = '';
K.game({
  id: 'memoria-14', group: 'memoria', num: 4, title: 'El intruso',
  blurb: 'Hay uno que no es como los demás. Tócalo.',
  how: 'Mira los dibujos. Todos son parecidos menos uno. Toca el que no es como los demás.',
  icon: 'car', levels: ['Muy distinto', 'Parecidos', 'Criterio sutil'], rounds: 8,
  round(g) {
    const r = build(g.level, lastKey); lastKey = r.key;
    g.ask('¿Cuál no es como los demás?');
    const grid = U.el(`<div class="grid ${g.level === 3 ? 'c6' : 'c4'}"></div>`);
    const holder = U.el('<div></div>');
    g.area.append(grid, holder);
    let done = false;
    const els = r.cards.map(c => {
      const b = U.el(`<button class="pic big" aria-label="${U.esc(nameOf(c.k))}">${K.art.get(c.k)}</button>`);
      b.onclick = () => {
        if (done || b.disabled) return;
        K.sound.tap();
        if (!c.bad) { b.classList.add('bad'); b.disabled = true; g.wrong(); return; }
        done = true; b.classList.add('right');
        els.forEach(e => { if (e !== b) { e.disabled = true; if (!e.classList.contains('bad')) e.classList.add('dim'); e.classList.remove('bad'); } });
        holder.appendChild(U.el(`<div class="card why"><span class="pi">${K.art.get(c.k)}</span><span>${U.esc(r.why)}</span></div>`));
        g.say(r.why);
        g.t(() => g.right(), 800 + r.why.length * 40);
      };
      grid.appendChild(b); return b;
    });
    g.helpHint = () => {
      const wrong = els.filter((e, ix) => !r.cards[ix].bad && !e.disabled);
      U.sample(wrong, Math.min(wrong.length - 1, g.level === 3 ? 2 : 1)).forEach(e => e.classList.add('dim'));
      g.toast(r.hint); g.say(r.hint);
    };
  }
});
})();
