/* Cuentos con huecos — lectura-10 */
(function () {
'use strict';
const K = window.Kids, U = K.util, A = K.art;

const S = (inner) => `<svg viewBox="0 0 100 100">${inner}</svg>`;
A.add({
  'lectura10-estanque': S(`<ellipse cx="50" cy="64" rx="42" ry="24" fill="#8BD0F0" stroke="#6CB8E0" stroke-width="3"/><path d="M28 62q8-6 16 0M54 68q8-6 16 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/><path d="M14 52v-26M20 54v-20M86 52v-28" stroke="#6BBF59" stroke-width="4" stroke-linecap="round"/><ellipse cx="14" cy="24" rx="4" ry="8" fill="#8B5E3C"/><ellipse cx="86" cy="22" rx="4" ry="8" fill="#8B5E3C"/>`),
  'lectura10-mar': S(`<rect x="8" y="22" width="84" height="62" rx="16" fill="#6CC4EE"/><path d="M8 40q10-8 21 0t21 0t21 0t21 0M8 58q10-8 21 0t21 0t21 0t21 0M8 76q10-8 21 0t21 0t21 0t21 0" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".75"/>`),
  'lectura10-nina': S(`<path d="M32 44h36l10 44H22z" fill="#FF7EA8"/><rect x="38" y="82" width="8" height="10" rx="3" fill="#FFD9B8"/><rect x="54" y="82" width="8" height="10" rx="3" fill="#FFD9B8"/><circle cx="50" cy="26" r="22" fill="#7A4A2B"/><circle cx="50" cy="32" r="17" fill="#FFD9B8"/><circle cx="43" cy="31" r="2.6" fill="#14235B"/><circle cx="57" cy="31" r="2.6" fill="#14235B"/><path d="M44 38q6 5 12 0" stroke="#14235B" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="38" cy="37" r="3" fill="#FFB3A7" opacity=".7"/><circle cx="62" cy="37" r="3" fill="#FFB3A7" opacity=".7"/><path d="M33 17q17-14 34 0" fill="#7A4A2B"/>`),
  'lectura10-nino': S(`<path d="M32 44h36l6 34H26z" fill="#4C8DF6"/><rect x="34" y="76" width="12" height="16" rx="4" fill="#3E5C9A"/><rect x="54" y="76" width="12" height="16" rx="4" fill="#3E5C9A"/><circle cx="50" cy="30" r="17" fill="#FFD9B8"/><path d="M33 28q2-16 17-16t17 16q-8-8-17-8t-17 8z" fill="#5A3A22"/><circle cx="43" cy="31" r="2.6" fill="#14235B"/><circle cx="57" cy="31" r="2.6" fill="#14235B"/><path d="M44 38q6 5 12 0" stroke="#14235B" stroke-width="2.4" fill="none" stroke-linecap="round"/>`)
});

/* palabras -> dibujo */
const W = {
  cama: 'bed', nube: 'cloud', taza: 'cup', pelota: 'ball', 'árbol': 'tree', zapato: 'shoe', libro: 'book', tren: 'train',
  paraguas: 'umbrella', tambor: 'drum', 'plátano': 'banana', estanque: 'lectura10-estanque', mar: 'lectura10-mar', casa: 'house',
  flor: 'flower', camiseta: 'tshirt', silla: 'chair', zanahoria: 'carrot', llave: 'key', mesa: 'table', fresa: 'strawberry',
  'lámpara': 'lamp', bufanda: 'scarf', sol: 'sun', pollito: 'chick', bota: 'boot', gota: 'raindrop', 'bañador': 'swimsuit',
  gorro: 'beanie', sandalia: 'sandal', coche: 'car', cometa: 'kite', globo: 'balloon', pato: 'duck', luna: 'moon', manzana: 'apple'
};

/* escenas */
const P = (n, x, y, s, ...a) => A.get(n, ...a).replace('<svg', `<svg x="${x}" y="${y}" width="${s}" height="${s}"`);
const BG = {
  meadow: '<rect width="400" height="220" fill="#CDEBFA"/><circle cx="340" cy="40" r="22" fill="#FFE27A"/><ellipse cx="90" cy="46" rx="40" ry="13" fill="#fff" opacity=".85"/><ellipse cx="270" cy="30" rx="30" ry="10" fill="#fff" opacity=".8"/><path d="M0 140Q100 110 200 135T400 125V220H0z" fill="#9EDC7C"/>',
  room: '<rect width="400" height="220" fill="#FFE9C9"/><rect y="150" width="400" height="70" fill="#E9B66B"/><rect x="262" y="26" width="90" height="74" rx="10" fill="#CDEBFA" stroke="#fff" stroke-width="6"/><path d="M307 26v74M262 63h90" stroke="#fff" stroke-width="4"/>',
  pond: '<rect width="400" height="220" fill="#CDEBFA"/><circle cx="60" cy="40" r="22" fill="#FFE27A"/><path d="M0 100Q100 85 200 100T400 95V220H0z" fill="#9EDC7C"/><ellipse cx="200" cy="158" rx="170" ry="52" fill="#6CC4EE"/><path d="M110 150q12-7 24 0M250 165q12-7 24 0M190 180q12-7 24 0" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/>',
  sea: '<rect width="400" height="220" fill="#CDEBFA"/><circle cx="330" cy="45" r="24" fill="#FFE27A"/><ellipse cx="110" cy="44" rx="38" ry="12" fill="#fff" opacity=".85"/><rect y="115" width="400" height="105" fill="#4FB3E8"/><path d="M0 130q25-10 50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0M0 170q25-10 50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0" stroke="#fff" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>',
  rain: '<rect width="400" height="220" fill="#B9C9E0"/><ellipse cx="100" cy="36" rx="60" ry="22" fill="#8FA3C2"/><ellipse cx="280" cy="30" rx="70" ry="24" fill="#8FA3C2"/><path d="M0 160Q100 140 200 158T400 150V220H0z" fill="#8CCB84"/><g stroke="#4C8DF6" stroke-width="4" stroke-linecap="round" opacity=".8"><path d="M40 70l-6 16M90 90l-6 16M150 66l-6 16M210 92l-6 16M270 68l-6 16M330 90l-6 16M370 62l-6 16M120 120l-6 16M300 125l-6 16M60 130l-6 16"/></g>',
  snow: '<rect width="400" height="220" fill="#DCEBFA"/><path d="M0 150Q100 130 200 148T400 140V220H0z" fill="#fff"/><g fill="#fff"><circle cx="40" cy="40" r="4"/><circle cx="120" cy="70" r="3.5"/><circle cx="200" cy="30" r="4"/><circle cx="290" cy="60" r="3.5"/><circle cx="360" cy="30" r="4"/><circle cx="330" cy="110" r="3"/><circle cx="70" cy="110" r="3"/></g>',
  night: '<rect width="400" height="220" fill="#2C3E7A"/><g fill="#fff"><circle cx="40" cy="40" r="2.5"/><circle cx="120" cy="80" r="2"/><circle cx="260" cy="30" r="2.5"/><circle cx="360" cy="90" r="2"/><circle cx="200" cy="60" r="2"/></g><path d="M0 160Q100 140 200 158T400 150V220H0z" fill="#3F8F5A"/>',
  beach: '<rect width="400" height="220" fill="#CDEBFA"/><circle cx="60" cy="42" r="24" fill="#FFE27A"/><rect y="100" width="400" height="50" fill="#4FB3E8"/><path d="M0 135q25-10 50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0" stroke="#fff" stroke-width="5" fill="none" opacity=".6"/><path d="M0 150Q100 140 200 150T400 148V220H0z" fill="#F5DDA0"/>'
};
const SVG = (bg, body) => `<svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">${BG[bg]}${body}</svg>`;

/* a = respuesta, e = absurdas (nivel 1-2), alt = plausibles (nivel 3) ; verb = hueco de verbo */
const Q = [
  /* frases cortas */
  { lv: 1, t: 'El gato duerme en la ___.', a: 'cama', e: ['nube', 'taza', 'pelota'],
    sc: () => SVG('room', P('bed', 100, 40, 190) + P('cat', 170, 56, 90)) },
  { lv: 1, t: 'El perro duerme bajo el ___.', a: 'árbol', e: ['zapato', 'libro', 'tren'],
    sc: () => SVG('meadow', P('tree', 200, 0, 190) + P('dog', 110, 90, 100)) },
  { lv: 1, t: 'La niña usa el ___ si llueve.', a: 'paraguas', e: ['tambor', 'plátano', 'tren'],
    sc: () => SVG('rain', P('lectura10-nina', 125, 70, 140) + P('umbrella', 135, 4, 120)) },
  { lv: 1, t: 'El pato nada en el ___.', a: 'estanque', e: ['árbol', 'tren', 'libro'],
    sc: () => SVG('pond', P('duck', 150, 70, 100)) },
  { lv: 1, t: 'El barco navega por el ___.', a: 'mar', e: ['tren', 'libro', 'zapato'],
    sc: () => SVG('sea', P('boat', 130, 50, 150)) },
  { lv: 1, t: 'La abeja visita una ___.', a: 'flor', e: ['silla', 'taza', 'nube'],
    sc: () => SVG('meadow', P('flower', 220, 80, 100, '#FF7EA8') + P('flower', 90, 100, 80, '#FFC21A') + P('bee', 170, 40, 70)) },
  { lv: 1, t: 'El conejo come una ___.', a: 'zanahoria', e: ['silla', 'llave', 'nube'],
    sc: () => SVG('meadow', P('rabbit', 100, 70, 120) + P('carrot', 220, 100, 90)) },
  { lv: 1, t: 'El niño patea la ___.', a: 'pelota', e: ['nube', 'taza', 'flor'],
    sc: () => SVG('meadow', P('lectura10-nino', 90, 70, 130) + P('ball', 230, 125, 60)) },
  { lv: 1, t: 'El mono come un ___.', a: 'plátano', e: ['zapato', 'tren', 'libro'],
    sc: () => SVG('meadow', P('monkey', 110, 70, 130) + P('banana', 230, 100, 80)) },
  { lv: 1, t: 'Mamá enciende la ___.', a: 'lámpara', e: ['mesa', 'fresa', 'nube'],
    sc: () => SVG('room', P('table', 120, 90, 150) + P('lamp', 170, 20, 90)) },
  { lv: 1, t: 'El niño lee un ___.', a: 'libro', e: ['zapato', 'árbol', 'tren'],
    sc: () => SVG('room', P('lectura10-nino', 100, 60, 140) + P('book', 215, 100, 80)) },
  { lv: 1, t: 'Bebo leche en una ___.', a: 'taza', e: ['silla', 'nube', 'llave'],
    sc: () => SVG('room', P('table', 100, 80, 200) + P('cup', 175, 40, 100)) },
  { lv: 1, t: 'El muñeco de nieve lleva una ___.', a: 'bufanda', e: ['taza', 'fresa', 'nube'],
    sc: () => SVG('snow', P('snowman', 130, 40, 150) + P('scarf', 205, 110, 60)) },
  /* frases largas (nivel 3) */
  { lv: 3, t: 'Cuando llueve mucho, la niña abre su ___ para no mojarse.', a: 'paraguas', alt: ['bota', 'nube', 'gota'],
    sc: () => SVG('rain', P('lectura10-nina', 125, 70, 140) + P('umbrella', 135, 4, 120)) },
  { lv: 3, t: 'Hace mucho frío, así que el niño se pone la ___ en el cuello.', a: 'bufanda', alt: ['sandalia', 'camiseta', 'bota'],
    sc: () => SVG('snow', P('lectura10-nino', 110, 50, 150) + P('snowflake', 270, 40, 60)) },
  { lv: 3, t: 'De día, el ___ amarillo nos da luz y calor.', a: 'sol', alt: ['plátano', 'pollito', 'tambor'],
    sc: () => SVG('meadow', P('sun', 150, 20, 120) + P('tree', 20, 60, 130)) },
  { lv: 3, t: 'En la playa me pongo mi ___ para nadar en el mar.', a: 'bañador', alt: ['bufanda', 'bota', 'gorro'],
    sc: () => SVG('beach', P('lectura10-nino', 140, 60, 140) + P('swimsuit', 270, 90, 70)) },
  { lv: 3, t: 'El niño ___ la pelota con el pie en el parque.', a: 'patea', alt: ['bebe', 'duerme', 'vuela'], verb: 1,
    sc: () => SVG('meadow', P('lectura10-nino', 90, 70, 130) + P('ball', 230, 125, 60)) },
  { lv: 3, t: 'La niña ___ un cuento antes de dormir en su cama.', a: 'lee', alt: ['nada', 'corre', 'vuela'], verb: 1,
    sc: () => SVG('room', P('bed', 80, 50, 190) + P('lectura10-nina', 130, 40, 120) + P('book', 230, 90, 70)) },
  { lv: 3, t: 'El pájaro ___ muy alto por el cielo azul.', a: 'vuela', alt: ['nada', 'come', 'corre'], verb: 1,
    sc: () => SVG('meadow', P('bird', 150, 20, 110) + P('cloud', 270, 20, 80)) },
  { lv: 3, t: 'El pez ___ feliz entre las olas del mar.', a: 'nada', alt: ['vuela', 'corre', 'canta'], verb: 1,
    sc: () => SVG('sea', P('fish', 150, 100, 100) + P('lectura10-mar', 270, 120, 70)) },
  { lv: 3, t: 'Por la noche, la ___ brilla sola y redonda en el cielo.', a: 'luna', alt: ['bota', 'taza', 'silla'],
    sc: () => SVG('night', P('moon', 150, 20, 120)) }
];

K.css(`
.g-lectura-10{display:flex;flex-direction:column;align-items:center;gap:.9rem;width:100%}
.g-lectura-10 .page{width:100%;background:#fff;border-radius:1.8rem;padding:.7rem;box-shadow:0 .4rem 0 var(--line);border:.2rem solid var(--gl);display:flex;flex-direction:column;gap:.7rem}
.g-lectura-10 .sc{width:min(100%,52vh);aspect-ratio:400/220;border-radius:1.2rem;overflow:hidden;margin:0 auto}
.g-lectura-10 .sc svg{width:100%;height:100%;display:block}
.g-lectura-10 .sentence{display:flex;align-items:center;gap:.8rem;padding:.2rem .6rem .4rem}
.g-lectura-10 .txt10{flex:1;font-family:'Baloo 2';font-weight:800;font-size:clamp(1.7rem,4.4vh,2.5rem);line-height:1.35;text-align:center}
.g-lectura-10 .blank{display:inline-block;min-width:5.5rem;border-bottom:.25rem dashed #9CB5E8;margin:0 .2rem;text-align:center;color:#E8590C;line-height:1.1;vertical-align:baseline;padding:0 .3rem}
.g-lectura-10 .blank.done{border-bottom:.25rem solid #5CC77A;animation:pop .5s}
.g-lectura-10 .blank.q{color:transparent}
.g-lectura-10 .spk{width:3.2rem;height:3.2rem;border-radius:50%;background:var(--gl);color:var(--gd);display:flex;align-items:center;justify-content:center;flex:none}
.g-lectura-10 .spk svg{width:1.6rem;height:1.6rem}
.g-lectura-10 .opts{gap:.9rem}
.g-lectura-10 .opt.pic{width:clamp(6.5rem,17vw,9rem);height:clamp(6.5rem,17vw,9rem)}
.g-lectura-10 .opt.pic svg{width:100%;height:100%;max-width:none;max-height:none}
.g-lectura-10 .ans.opt{font-size:clamp(1.7rem,4.4vh,2.4rem);min-height:4.2rem;padding:.2rem 1.2rem;min-width:7rem}
.g-lectura-10 .opt.help{animation:pulse .9s infinite;outline:.25rem solid var(--yellow)}
.g-lectura-10 .seg button[disabled]{opacity:.4}
`);

let deck = [], mode = 'w';
K.game({
  id: 'lectura-10', group: 'lectura', num: 4,
  title: 'Cuentos con huecos', icon: 'book', rounds: 6,
  blurb: 'Lee la frase y elige lo que falta en el hueco.',
  how: 'Mira la ilustración y lee la frase. Toca la palabra o el dibujo que completa el hueco.',
  levels: ['Frases cortas', 'Más opciones', 'Frases largas'],
  round(g, i) {
    const lv = g.level;
    if (i === 0 || !deck.length) {
      const pool = Q.filter(q => lv === 3 ? q.lv === 3 : q.lv === 1);
      deck = U.sample(pool, g.rounds);
    }
    const q = deck.pop();
    const n = lv === 1 ? 2 : lv === 2 ? U.rnd(2, 3) : 3;
    const ds = lv === 3 ? q.alt : U.sample(q.e, n);
    const words = U.shuffle([q.a].concat(ds));
    const full = q.t.replace('___', q.a), blankText = q.t.replace('___', ' ... ');
    const parts = q.t.split('___');

    g.ask('Elige lo que falta en la frase');
    const root = U.el(`<div class="wrap10" style="width:100%;max-width:46rem;display:flex;flex-direction:column;align-items:center;gap:.9rem">
      <div class="seg" role="group" aria-label="Tipo de respuestas"><button data-m="w">Palabras</button><button data-m="d">Dibujos</button></div>
      <div class="page"><div class="sc">${q.sc()}</div>
        <div class="sentence"><div class="txt10">${U.esc(parts[0])}<span class="blank q">${U.esc(q.a)}</span>${U.esc(parts[1])}</div>
        <button class="spk" aria-label="Escuchar la frase">${K.icons.speaker}</button></div></div>
      <div class="opts"></div></div>`);
    g.area.appendChild(root);
    const box = root.querySelector('.opts'), blank = root.querySelector('.blank'), seg = root.querySelector('.seg');
    root.querySelector('.spk').onclick = () => g.say(blankText);
    g.t(() => g.say(blankText), 1300);
    let done = false, btns = [];
    const canPic = !q.verb;
    seg.querySelector('[data-m="d"]').disabled = !canPic;
    function build() {
      const m = canPic ? mode : 'w';
      seg.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.m === m));
      box.innerHTML = '';
      btns = words.map(w => {
        const b = U.el(m === 'w'
          ? `<button class="ans opt">${U.esc(w)}</button>`
          : `<button class="pic opt" aria-label="${U.esc(w)}">${A.get(W[w])}</button>`);
        b._w = w;
        b.onclick = () => {
          if (done || b.disabled) return;
          g.say(q.t.replace('___', w));
          if (w === q.a) {
            done = true; btns.forEach(x => x.classList.remove('help'));
            b.classList.add('right');
            blank.classList.remove('q'); blank.classList.add('done');
            g.right();
          } else {
            b.classList.add('bad'); b.disabled = true;
            g.wrong('Lee la frase otra vez. ¡Tú puedes!');
          }
        };
        box.appendChild(b); return b;
      });
    }
    seg.onclick = (e) => {
      const b = e.target.closest('button'); if (!b || b.disabled || done) return;
      mode = b.dataset.m; build();
    };
    build();
    g.helpHint = () => {
      const b = btns.find(x => x._w === q.a); if (b) b.classList.add('help');
      g.toast('Escucha la frase otra vez, ¡casi lo tienes!');
      g.say(blankText);
    };
  }
});
})();
