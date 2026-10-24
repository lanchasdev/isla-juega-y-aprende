/* Lectura x11 — Adivinanzas */
(function () {
'use strict';
const U = Kids.util;

Kids.art.add({
  'lx11-egg': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="91" rx="26" ry="5" fill="rgba(20,35,91,.1)"/>
    <path d="M50 10C73 10 83 48 83 64 83 82 68 91 50 91 32 91 17 82 17 64 17 48 27 10 50 10Z" fill="#FFF6E2" stroke="#E7CFA0" stroke-width="3"/>
    <ellipse cx="37" cy="36" rx="5" ry="10" fill="#fff" opacity=".8" transform="rotate(18 37 36)"/>
    <circle cx="40" cy="62" r="4" fill="#14235B"/><circle cx="60" cy="62" r="4" fill="#14235B"/>
    <circle cx="41.4" cy="60.6" r="1.4" fill="#fff"/><circle cx="61.4" cy="60.6" r="1.4" fill="#fff"/>
    <ellipse cx="33" cy="71" rx="5" ry="3" fill="#FFB8C6" opacity=".8"/><ellipse cx="67" cy="71" rx="5" ry="3" fill="#FFB8C6" opacity=".8"/>
    <path d="M43 72Q50 79 57 72" fill="none" stroke="#14235B" stroke-width="3" stroke-linecap="round"/></svg>`,
  'lx11-clock': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="93" rx="30" ry="4" fill="rgba(20,35,91,.1)"/>
    <circle cx="26" cy="22" r="11" fill="#FF7E69"/><circle cx="74" cy="22" r="11" fill="#FF7E69"/>
    <rect x="44" y="4" width="12" height="9" rx="4" fill="#FFB347"/>
    <path d="M30 80L22 92M70 80L78 92" stroke="#E0584A" stroke-width="6" stroke-linecap="round"/>
    <circle cx="50" cy="54" r="36" fill="#FF9F8E"/><circle cx="50" cy="54" r="30" fill="#fff"/>
    <g stroke="#14235B" stroke-width="3" stroke-linecap="round"><path d="M50 28v5M50 75v5M24 54h5M71 54h5"/></g>
    <path d="M50 54V36" stroke="#14235B" stroke-width="4" stroke-linecap="round"/><path d="M50 54L63 61" stroke="#E0584A" stroke-width="4" stroke-linecap="round"/>
    <circle cx="50" cy="54" r="3.5" fill="#14235B"/></svg>`
});

/* c = categoría; s = pistas cortas (niveles 1 y 2); l = pistas largas (nivel 3) */
const B = [
  { a: 'cow', n: 'la vaca', c: 'animal', s: ['Vivo en la granja y digo muuu.', 'Doy leche blanquita.'], l: ['Vivo en la granja.', 'Tengo manchas negras y blancas.', 'Como hierba en el prado.', 'Doy leche y digo muuu.'] },
  { a: 'bee', n: 'la abeja', c: 'animal', s: ['Vuelo de flor en flor', 'y hago miel muy dulce.'], l: ['Tengo rayas negras y amarillas.', 'Hago zzz cuando vuelo.', 'Visito las flores.', 'Hago la miel.'] },
  { a: 'hen', n: 'la gallina', c: 'animal', s: ['Tengo plumas y pico,', 'digo coc, coc y pongo huevos.'], l: ['Vivo en el gallinero.', 'Tengo plumas, pico y cresta pequeña.', 'Digo coc, coc, coc.', 'Pongo huevos cada día.'] },
  { a: 'cat', n: 'el gato', c: 'animal', s: ['Tengo bigotes y digo miau,', 'y cazo ratones.'], l: ['Tengo bigotes y cuatro patitas.', 'Me limpio con la lengua.', 'Duermo mucho y ronroneo.', 'Digo miau y cazo ratones.'] },
  { a: 'dog', n: 'el perro', c: 'animal', s: ['Muevo la cola y digo guau,', 'soy el mejor amigo del niño.'], l: ['Tengo cuatro patas y cola.', 'Me gusta jugar y correr.', 'Cuido la casa.', 'Digo guau, guau.'] },
  { a: 'duck', n: 'el pato', c: 'animal', s: ['Digo cuac, cuac,', 'y nado en la charca.'], l: ['Tengo plumas y dos patitas.', 'Nado en la charca.', 'Tengo el pico plano y naranja.', 'Digo cuac, cuac.'] },
  { a: 'fish', n: 'el pez', c: 'animal', s: ['Vivo siempre en el agua,', 'no tengo patas, tengo aletas.'], l: ['Vivo siempre dentro del agua.', 'No tengo patas ni plumas.', 'Tengo escamas y aletas.', 'Respiro bajo el agua.'] },
  { a: 'elephant', n: 'el elefante', c: 'animal', s: ['Soy muy grande y gris,', 'y tengo una trompa larga.'], l: ['Soy enorme y de color gris.', 'Tengo orejas muy grandes.', 'Con mi trompa bebo agua.', 'Tengo dos colmillos blancos.'] },
  { a: 'giraffe', n: 'la jirafa', c: 'animal', s: ['Tengo manchas marrones', 'y un cuello larguísimo.'], l: ['Vivo en África.', 'Tengo manchas marrones.', 'Mi cuello es larguísimo.', 'Como hojas de lo más alto de los árboles.'] },
  { a: 'penguin', n: 'el pingüino', c: 'animal', s: ['Voy vestido de frac', 'y vivo entre el hielo.'], l: ['Vivo donde hace mucho frío.', 'Voy vestido de blanco y negro.', 'Tengo alas pero no vuelo.', 'Camino balanceándome.'] },
  { a: 'turtle', n: 'la tortuga', c: 'animal', s: ['Llevo mi casa a cuestas', 'y camino muy despacio.'], l: ['Camino muy, muy despacio.', 'Llevo una casa en la espalda.', 'Si tengo miedo, escondo la cabeza.', 'Mi casa se llama caparazón.'] },

  { a: 'apple', n: 'la manzana', c: 'comida', s: ['Soy una fruta redonda,', 'roja o verde, y crezco en el manzano.'], l: ['Soy una fruta.', 'Soy redonda y puedo ser roja o verde.', 'Crezco en un manzano.', 'Si me muerdes, ¡crujo!'] },
  { a: 'banana', n: 'el plátano', c: 'comida', s: ['Soy larga y amarilla,', 'y a los monos les encanto.'], l: ['Soy una fruta larga y curva.', 'Mi piel es amarilla.', 'Hay que pelarme para comerme.', 'A los monos les encanto.'] },
  { a: 'carrot', n: 'la zanahoria', c: 'comida', s: ['Crezco bajo la tierra,', 'soy larga y naranja.'], l: ['Crezco debajo de la tierra.', 'Soy larga y naranja.', 'Tengo hojas verdes por arriba.', 'A los conejos les encanto.'] },
  { a: 'cake', n: 'la tarta', c: 'comida', s: ['Soy muy dulce y tengo velas,', 'me comes en tu cumpleaños.'], l: ['Soy muy dulce.', 'Me comes en tu cumpleaños.', 'Me ponen velas encima.', 'Soplas y pides un deseo.'] },
  { a: 'strawberry', n: 'la fresa', c: 'comida', s: ['Soy roja y pequeñita,', 'con pepitas por fuera.'], l: ['Soy una fruta roja.', 'Tengo pepitas amarillas por fuera.', 'Soy pequeña y muy dulce.', 'Me comes con nata.'] },
  { a: 'orange', n: 'la naranja', c: 'comida', s: ['Soy redonda y naranja,', 'y de mí sale zumo.'], l: ['Soy una fruta redonda.', 'Mi piel es naranja.', 'Dentro tengo gajos.', 'Con mi jugo se hace zumo.'] },
  { a: 'lx11-egg', n: 'el huevo', c: 'comida', s: ['Tengo cáscara blanca,', 'dentro yema y clara.'], l: ['Tengo una cáscara blanca y frágil.', 'Dentro llevo yema y clara.', 'Me pone la gallina.', 'Puedo ser frito o cocido.'] },

  { a: 'lx11-clock', n: 'el reloj', c: 'objeto', s: ['Hago tic, tac, tic, tac', 'y te digo qué hora es.'], l: ['Tengo números en círculo.', 'Tengo dos agujas.', 'Hago tic, tac.', 'Me miras para saber la hora.'] },
  { a: 'umbrella', n: 'el paraguas', c: 'objeto', s: ['Si llueve me abres', 'y no te mojas.'], l: ['Me abres cuando llueve.', 'Tengo un mango para agarrarme.', 'Soy como un tejado pequeño.', 'Contigo no te mojas.'] },
  { a: 'key', n: 'la llave', c: 'objeto', s: ['Abro puertas', 'y vivo en un llavero.'], l: ['Soy pequeña y de metal.', 'Tengo dientes pero no muerdo.', 'Me metes en la cerradura.', 'Abro y cierro la puerta.'] },
  { a: 'bed', n: 'la cama', c: 'objeto', s: ['Tengo sábanas y almohada,', 'aquí duermes por la noche.'], l: ['Estoy en tu habitación.', 'Tengo sábanas y manta.', 'Tengo una almohada blandita.', 'En mí duermes por la noche.'] },
  { a: 'book', n: 'el libro', c: 'objeto', s: ['Tengo hojas con letras', 'y cuentos para leer.'], l: ['Tengo muchas hojas.', 'Dentro hay letras y dibujos.', 'Me abres y me lees.', 'Guardo cuentos.'] },
  { a: 'kite', n: 'la cometa', c: 'objeto', s: ['Vuelo sin alas,', 'atada a un hilo.'], l: ['Soy de papel o de tela.', 'Tengo una cola con lazos.', 'Me sujetas con un hilo.', 'Vuelo alto cuando hace viento.'] },
  { a: 'ball', n: 'la pelota', c: 'objeto', s: ['Soy redonda y rebotas,', 'con los pies me chutas.'], l: ['Soy redonda.', 'Rebotas cuando me tiras al suelo.', 'Con los pies me chutas.', 'Me usan en el fútbol.'] },

  { a: 'sun', n: 'el sol', c: 'cielo', s: ['Amarillo y redondo,', 'salgo por la mañana y doy calor.'], l: ['Salgo por la mañana.', 'Soy amarillo y redondo.', 'Doy luz y calor a todo el mundo.', 'Por mí es de día.'] },
  { a: 'moon', n: 'la luna', c: 'cielo', s: ['Salgo de noche en el cielo,', 'a veces redonda, a veces como una sonrisa.'], l: ['Salgo cuando es de noche.', 'Soy blanca y brillante.', 'A veces soy redonda y a veces una sonrisa.', 'Las estrellas son mis amigas.'] },
  { a: 'rainbow', n: 'el arcoíris', c: 'cielo', s: ['Salgo cuando llueve y brilla el sol,', 'y tengo muchos colores.'], l: ['Salgo después de la lluvia.', 'Soy curvo como un puente.', 'Tengo muchos colores.', 'Rojo, naranja, amarillo, verde, azul…'] },
  { a: 'cloud', n: 'la nube', c: 'cielo', s: ['Floto en el cielo, blandita,', 'y a veces hago llover.'], l: ['Floto en el cielo.', 'Soy blanca y blandita como el algodón.', 'Cuando me pongo gris, llueve.', 'El viento me empuja.'] },
  { a: 'tree', n: 'el árbol', c: 'cielo2', s: ['Tengo tronco y ramas', 'y hojas verdes.'], l: ['Tengo un tronco y muchas ramas.', 'En primavera tengo hojas verdes.', 'Los pájaros hacen su nido en mí.', 'Con mi sombra te refrescas.'] },
  { a: 'snowman', n: 'el muñeco de nieve', c: 'cielo2', s: ['Soy de nieve, con nariz', 'de zanahoria y bufanda.'], l: ['Estoy hecho de nieve.', 'Tengo ojos de carbón.', 'Mi nariz es una zanahoria.', 'Si sale el sol, me derrito.'] }
];
/* 'cielo2' se une a 'cielo' para las parecidas */
const CAT = c => c === 'cielo2' ? 'cielo' : c;
B.forEach(x => { x.c = CAT(x.c); });

Kids.css(`
.g-lectura-x11{gap:.9rem}
.g-lectura-x11 .x11-card{background:#fff;border-radius:1.8rem;padding:.9rem 1.4rem;box-shadow:0 .4rem 0 var(--line);display:flex;align-items:center;gap:1rem;max-width:min(40rem,96%);width:100%}
.g-lectura-x11 .x11-txt{flex:1;font-family:'Baloo 2';font-weight:800;font-size:clamp(1.35rem,4.6vmin,2.1rem);line-height:1.2;text-align:center}
.g-lectura-x11 .x11-txt span{display:block}
.g-lectura-x11 .x11-txt.long span{font-size:.95em}
.g-lectura-x11 .x11-again{flex:none}
.g-lectura-x11 .x11-mystery{width:clamp(5rem,16vmin,8rem);height:clamp(5rem,16vmin,8rem);border-radius:1.4rem;background:var(--gl);display:flex;align-items:center;justify-content:center;font-family:'Baloo 2';font-size:3.6rem;color:var(--gd);flex:none;border:.2rem dashed var(--g)}
.g-lectura-x11 .x11-mystery svg{width:100%;height:100%;padding:.3rem}
.g-lectura-x11 .x11-pics{display:grid;grid-template-columns:repeat(3,auto);gap:1rem;justify-content:center}
.g-lectura-x11 .x11-pics .pic{width:clamp(6.6rem,24vw,11rem);height:clamp(7.4rem,28vmin,12rem);font-size:clamp(.95rem,3vmin,1.3rem);text-align:center;padding:.5rem}
.g-lectura-x11 .x11-pics .pic svg{flex:1;min-height:0;width:100%}
.g-lectura-x11 .x11-words{display:grid;grid-template-columns:repeat(2,minmax(0,15rem));gap:.9rem;justify-content:center;width:100%}
.g-lectura-x11 .x11-words .ans{font-size:clamp(1.4rem,4.6vmin,2.2rem);min-width:0;padding:.2rem .8rem;min-height:4.4rem;line-height:1.1}
.g-lectura-x11 .x11-words .ans:nth-child(2){background:var(--a2)}.g-lectura-x11 .x11-words .ans:nth-child(3){background:var(--a3)}.g-lectura-x11 .x11-words .ans:nth-child(4){background:var(--a4)}
.g-lectura-x11 .hint{animation:pulse 1s infinite;outline:.25rem solid #5CC77A}
@media (max-width:560px){.g-lectura-x11 .x11-card{padding:.7rem .8rem}}
`);

let used = [];
Kids.game({
  id: 'lectura-x11', group: 'lectura', num: 15,
  title: 'Adivinanzas', icon: 'owl', rounds: 8,
  blurb: 'Escucha la adivinanza y toca la respuesta correcta.',
  how: 'Escucha o lee la adivinanza y toca el dibujo o la palabra que es la respuesta.',
  levels: ['Pistas fáciles', 'Dibujos parecidos', 'Con 4 pistas'],
  round(g, i) {
    if (i === 0) used = [];
    const lv = g.level;
    let cand = B.filter(x => !used.includes(x.a));
    if (!cand.length) cand = B;
    const t = U.pick(cand); used.push(t.a);
    let opts;
    if (lv === 1) {
      const cats = U.shuffle([...new Set(B.map(x => x.c))].filter(c => c !== t.c)).slice(0, 2);
      opts = [t].concat(cats.map(c => U.pick(B.filter(x => x.c === c))));
    } else {
      const same = B.filter(x => x.c === t.c && x !== t);
      opts = [t].concat(U.sample(same, lv === 2 ? 2 : 3));
    }
    opts = U.shuffle(opts);
    const lines = lv === 3 ? t.l : t.s;
    const text = lines.join(' ');

    const card = U.el(`<div class="x11-card"></div>`);
    const txt = U.el(`<div class="x11-txt ${lv === 3 ? 'long' : ''}">${lines.map(l => `<span>${U.esc(l)}</span>`).join('')}</div>`);
    const again = U.el(`<button class="btn blue sm x11-again" aria-label="Escuchar la adivinanza otra vez">${Kids.icons.speaker}</button>`);
    again.onclick = () => g.say(text + ' ¿Qué soy?');
    let mystery = null;
    if (lv === 3) { mystery = U.el(`<div class="x11-mystery" aria-hidden="true">?</div>`); card.appendChild(mystery); }
    card.appendChild(txt); card.appendChild(again);
    g.area.appendChild(card);

    const wrap = U.el(`<div class="${lv === 3 ? 'x11-words' : 'x11-pics'}"></div>`);
    let done = false;
    opts.forEach(o => {
      const b = lv === 3
        ? U.el(`<button class="ans">${U.esc(o.n.replace(/^(el|la) /, ''))}</button>`)
        : U.el(`<button class="pic" aria-label="${U.esc(o.n)}">${Kids.art.get(o.a)}<span class="lbl">${U.esc(o.n)}</span></button>`);
      b._ok = o === t;
      b.onclick = () => {
        if (done || b.disabled) return;
        if (b._ok) {
          done = true; b.classList.add('right'); wrap.querySelectorAll('button').forEach(x => x.disabled = true);
          if (mystery) { mystery.innerHTML = Kids.art.get(t.a); mystery.style.borderStyle = 'solid'; mystery.classList.add('pop'); }
          g.right('¡Es ' + t.n + '!');
        } else { b.classList.add('bad'); b.disabled = true; g.wrong(); }
      };
      wrap.appendChild(b);
    });
    g.area.appendChild(wrap);
    g.helpHint = () => {
      const b = [...wrap.querySelectorAll('button')].find(x => x._ok);
      if (b) { b.classList.add('hint'); g.toast('Escucha otra vez con calma'); }
    };
    g.ask('Escucha la adivinanza: ¿qué soy?');
    g.say(text + ' ¿Qué soy?');
  }
});
})();
