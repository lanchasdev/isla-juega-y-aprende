/* Lectura x10 — Verdadero o falso */
(function () {
'use strict';
const U = Kids.util;
/* [frase, dibujo|null, ¿verdadera?, explicación, nivel] */
const S = [
  /* nivel 1: cortas con dibujo */
  ['El pez vuela.', 'fish', 0, 'Los peces nadan, no vuelan.', 1],
  ['El sol brilla de día.', 'sun', 1, '¡Sí! El sol nos da luz y calor de día.', 1],
  ['La vaca da leche.', 'cow', 1, '¡Sí! Las vacas nos dan leche.', 1],
  ['El gato dice guau.', 'cat', 0, 'El gato dice miau. Guau lo dice el perro.', 1],
  ['El perro ladra.', 'dog', 1, '¡Sí! Los perros ladran: guau, guau.', 1],
  ['La luna sale de noche.', 'moon', 1, '¡Sí! La luna se ve en el cielo de noche.', 1],
  ['El pato nada en el agua.', 'duck', 1, '¡Sí! A los patos les encanta nadar.', 1],
  ['La nieve es caliente.', 'snowflake', 0, 'La nieve es fría, muy fría.', 1],
  ['La rana salta.', 'frog', 1, '¡Sí! Las ranas saltan muy alto.', 1],
  ['El elefante es pequeño.', 'elephant', 0, 'El elefante es enorme, uno de los animales más grandes.', 1],
  ['El coche tiene ruedas.', 'car', 1, '¡Sí! Los coches ruedan gracias a sus cuatro ruedas.', 1],
  ['El pájaro vuela.', 'bird', 1, '¡Sí! Los pájaros tienen alas y vuelan.', 1],
  ['La tortuga es muy rápida.', 'turtle', 0, 'La tortuga es muy lenta.', 1],
  ['La jirafa tiene el cuello corto.', 'giraffe', 0, 'La jirafa tiene el cuello larguísimo.', 1],
  ['La zanahoria es naranja.', 'carrot', 1, '¡Sí! Las zanahorias son naranjas.', 1],
  ['La manzana es una fruta.', 'apple', 1, '¡Sí! La manzana crece en un árbol y es una fruta.', 1],
  /* nivel 2: más largas, sin dibujo */
  ['Las abejas hacen miel.', null, 1, '¡Sí! Las abejas fabrican la miel en sus colmenas.', 2],
  ['Los peces viven en el agua.', null, 1, '¡Sí! Los peces nadan y respiran en el agua.', 2],
  ['Los coches vuelan por el cielo.', null, 0, 'Los coches van por la carretera. Los aviones son los que vuelan.', 2],
  ['Por la noche podemos ver las estrellas.', null, 1, '¡Sí! Las estrellas se ven mejor de noche.', 2],
  ['Los plátanos crecen en el mar.', null, 0, 'Los plátanos crecen en plantas, no en el mar.', 2],
  ['En invierno hace más frío que en verano.', null, 1, '¡Sí! El invierno es la estación más fría.', 2],
  ['Los pájaros ponen huevos.', null, 1, '¡Sí! De los huevos nacen los pajaritos.', 2],
  ['Usamos el paraguas para no mojarnos con la lluvia.', null, 1, '¡Sí! El paraguas nos protege de la lluvia.', 2],
  ['Los perros tienen seis patas.', null, 0, 'Los perros tienen cuatro patas.', 2],
  ['Una semana tiene siete días.', null, 1, '¡Sí! Lunes, martes, miércoles, jueves, viernes, sábado y domingo.', 2],
  ['La bicicleta tiene tres ruedas.', null, 0, 'La bicicleta tiene dos ruedas. El triciclo tiene tres.', 2],
  ['Las vacas dicen miau.', null, 0, 'Las vacas dicen muuu. Miau lo dicen los gatos.', 2],
  ['Los zapatos se ponen en las manos.', null, 0, 'Los zapatos se ponen en los pies.', 2],
  ['Los libros sirven para leer.', null, 1, '¡Sí! En los libros hay historias para leer.', 2],
  ['Después de llover con sol puede salir el arcoíris.', null, 1, '¡Sí! Cuando llueve y brilla el sol aparece el arcoíris.', 2],
  /* nivel 3: negaciones y conocimiento del mundo */
  ['Los pingüinos viven en el Polo Norte.', null, 0, 'Los pingüinos viven en el Polo Sur.', 3],
  ['Los osos polares viven en el Polo Norte.', null, 1, '¡Sí! Los osos polares viven en el Polo Norte.', 3],
  ['Los peces no pueden respirar en el agua.', null, 0, 'Sí pueden: respiran en el agua con las branquias.', 3],
  ['El sol no es una estrella.', null, 0, 'El sol sí es una estrella: la más cercana a la Tierra.', 3],
  ['La ballena no es un pez.', null, 1, '¡Sí! La ballena es un mamífero y da leche a sus crías.', 3],
  ['Las arañas tienen ocho patas.', null, 1, '¡Sí! Las arañas tienen ocho patas.', 3],
  ['Un año tiene doce meses.', null, 1, '¡Sí! Son doce meses, de enero a diciembre.', 3],
  ['La luna no tiene luz propia.', null, 1, '¡Sí! La luna refleja la luz del sol.', 3],
  ['El agua del mar es dulce.', null, 0, 'El agua del mar es salada.', 3],
  ['El invierno es la estación más calurosa.', null, 0, 'La más calurosa es el verano.', 3],
  ['Las vacas no ponen huevos.', null, 1, '¡Sí! Los huevos los ponen las gallinas.', 3],
  ['Los camellos viven en el desierto.', null, 1, '¡Sí! Los camellos aguantan bien el calor y la sequía.', 3],
  ['La Tierra gira alrededor del sol.', null, 1, '¡Sí! La Tierra tarda un año en dar la vuelta al sol.', 3],
  ['Los leones viven en el Polo Sur.', null, 0, 'Los leones viven en la sabana de África, donde hace calor.', 3],
  ['Las mariposas no tienen alas.', null, 0, 'Las mariposas sí tienen alas, cuatro alas de colores.', 3]
].map(([t, a, v, e, l]) => ({ t, a, v: !!v, e, l }));
let used = [];

const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.5l5 5 10-11"/></svg>';
const CROSS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';

Kids.css(`
.g-lectura-x10{gap:1rem}
.g-lectura-x10 .x10-card{display:flex;align-items:center;justify-content:center;gap:1.2rem;background:#fff;border-radius:2rem;box-shadow:0 .45rem 0 var(--line);border:.2rem solid var(--line);padding:1rem 1.6rem;max-width:min(48rem,100%);flex-wrap:wrap;position:relative}
.g-lectura-x10 .x10-card .ic{width:clamp(7rem,24vmin,11rem);height:clamp(7rem,24vmin,11rem);flex:none}
.g-lectura-x10 .x10-card .ic svg{width:100%;height:100%}
.g-lectura-x10 .x10-t{font-family:'Baloo 2',sans-serif;font-weight:800;font-size:clamp(1.8rem,5.6vmin,3rem);line-height:1.1;text-align:center;flex:1;min-width:12rem}
.g-lectura-x10 .x10-say{width:3.2rem;height:3.2rem;border-radius:50%;background:var(--gl);color:var(--gd);display:flex;align-items:center;justify-content:center;flex:none}
.g-lectura-x10 .x10-say svg{width:1.6rem;height:1.6rem}
.g-lectura-x10 .x10-btns{display:flex;gap:1.4rem;justify-content:center;flex-wrap:wrap}
.g-lectura-x10 .x10-b{display:flex;align-items:center;gap:.7rem;min-width:min(13rem,42vw);min-height:5.6rem;padding:.4rem 1.6rem;border-radius:2rem;font-family:'Baloo 2',sans-serif;font-weight:800;font-size:clamp(1.8rem,5vmin,2.6rem);color:#fff;justify-content:center;transition:transform .12s}
.g-lectura-x10 .x10-b svg{width:2.4rem;height:2.4rem;flex:none}
.g-lectura-x10 .x10-b.yes{background:#3FB765;box-shadow:0 .45rem 0 #2A8B49}
.g-lectura-x10 .x10-b.no{background:#EE5A5A;box-shadow:0 .45rem 0 #BF3C3C}
.g-lectura-x10 .x10-b:active{transform:translateY(.25rem)}
.g-lectura-x10 .x10-b[disabled]{opacity:.45;pointer-events:none}
.g-lectura-x10 .x10-b.win{opacity:1;animation:pop .5s;outline:.3rem solid #fff;box-shadow:0 0 0 .5rem #FFD23F}
.g-lectura-x10 .x10-exp{background:#EAFBEE;border:.2rem solid #5CC77A;border-radius:1.4rem;padding:.6rem 1.2rem;font-size:clamp(1.15rem,3.4vmin,1.6rem);text-align:center;max-width:min(40rem,100%);animation:pop .4s}
.g-lectura-x10 .x10-exp.hid{visibility:hidden}
`);

Kids.game({
  id: 'lectura-x10', group: 'lectura', num: 14,
  title: 'Verdadero o falso', icon: 'lion', rounds: 8,
  blurb: 'Lee la frase y di si es verdadera (sí) o falsa (no).',
  how: 'Lee la frase. Si es verdad, toca el botón verde del sí. Si no es verdad, toca el botón rojo del no.',
  levels: ['Frases cortas con dibujo', 'Frases más largas', 'Con «no» y del mundo'],
  round(g, i) {
    if (i === 0) used = [];
    const pool = S.filter(s => s.l === g.level && !used.includes(s));
    /* alternar verdaderas y falsas de forma equilibrada */
    const wantTrue = Math.random() < .5;
    let c = pool.filter(s => s.v === wantTrue); if (!c.length) c = pool; if (!c.length) c = S.filter(s => s.l === g.level);
    const it = U.pick(c); used.push(it);
    g.ask('¿Verdadero o falso?');
    g.t(() => g.say(it.t), 1100);
    const card = U.el(`<div class="x10-card">${it.a ? '<span class="ic" aria-hidden="true">' + Kids.art.get(it.a) + '</span>' : ''}<span class="x10-t">${U.esc(it.t)}</span><button class="x10-say" aria-label="Escuchar la frase">${Kids.icons.speaker}</button></div>`);
    card.querySelector('.x10-say').onclick = () => g.say(it.t);
    const exp = U.el('<div class="x10-exp hid" aria-live="polite">&nbsp;</div>');
    const btns = U.el(`<div class="x10-btns">
      <button class="x10-b yes" aria-label="Sí, es verdad">${CHECK} Sí</button>
      <button class="x10-b no" aria-label="No, es falso">${CROSS} No</button></div>`);
    g.area.appendChild(card); g.area.appendChild(btns); g.area.appendChild(exp);
    const [yes, no] = btns.children; let done = false;
    function answer(says, btn) {
      if (done) return;
      if (says === it.v) {
        done = true; yes.disabled = no.disabled = true; btn.classList.add('win');
        Kids.sound.pop();
        exp.classList.remove('hid'); exp.textContent = it.e; g.say((it.v ? 'Verdadero. ' : 'Falso. ') + it.e);
        g.t(() => g.right(), 1500 + it.e.length * 55);
      } else {
        btn.disabled = true; g.shake(btn); g.wrong(it.v ? 'Mmm… ¡Piénsalo otra vez!' : 'Mmm… ¡Lee con calma otra vez!');
        g.say(it.t);
      }
    }
    yes.onclick = () => answer(true, yes); no.onclick = () => answer(false, no);
    g.helpHint = () => { const r = it.v ? yes : no; r.classList.add('pulse'); g.toast('Piensa en lo que sabes de ' + (it.a ? 'este dibujo' : 'esto')); };
  }
});
})();
