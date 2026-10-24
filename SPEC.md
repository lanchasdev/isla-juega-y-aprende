# Isla Juega y Aprende — guía para quien escriba un juego o dibujos

Web estática para niños de 6–7 años (tablet apaisada / ordenador / móvil). JS clásico, sin build, sin librerías, sin imágenes externas: **todo dibujado con SVG inline**. Lee `js/core.js` y `css/style.css` antes de empezar (son cortos).

## Estética (obligatoria)
Cálido, redondeado, tipo cuento ilustrado: fondo crema, tarjetas blancas muy redondeadas con sombra inferior, botones grandes, colores suaves (lila `--a1`, amarillo `--a2`, azul `--a3`, rosa `--a4`), tinta azul marino `--ink`. Los dibujos son planos con contorno suave, ojos grandes y sonrientes, colores alegres (nada de líneas negras gruesas). Objetivos táctiles ≥ 64px. Texto grande. **Nunca castigar**: al fallar solo `g.wrong()`.
Colores por grupo (variables ya definidas en el contenedor del juego): `--g` (color fuerte), `--gl` (claro), `--gd` (oscuro).

## Dibujos: `Kids.art`
- `Kids.art.add({ nombre: '<svg viewBox="0 0 100 100">…</svg>' , otro: (color)=>'<svg…>' })`
- `Kids.art.get('nombre', ...args)` devuelve el string SVG. Siempre `viewBox="0 0 100 100"` (cuadrado), **sin width/height fijos** (se escala con CSS al contenedor). Sin `id` duplicados: si usas gradientes/clipPath, prefija el id con el nombre (`duck-g1`).
- Cada SVG se centra y rellena su caja. Sombra opcional suave (elipse gris translúcida) abajo.
- Si un juego necesita dibujos propios, regístralos en SU fichero con prefijo del juego (p.ej. `mates4-robot`). Los dibujos compartidos están en `js/art-animals.js`, `js/art-food.js`, `js/art-objects.js` (ver catálogo abajo; **úsalos solo por esos nombres**).

### Catálogo compartido (nombres exactos)
**animales (`art-animals.js`)**: duck, chick, dog, cat, rabbit, mouse, monkey, cow, pig, horse, sheep, hen, frog, turtle, bear, lion, fox, owl, elephant, parrot, penguin, polarbear, dolphin, fish, crab, whale, bird, butterfly, bee, giraffe.
**comida y naturaleza (`art-food.js`)**: apple, banana, pear, orange, strawberry, grapes, cherry, watermelon, carrot, cake, sun, moon, star, cloud, flower (arg color opcional, ej. `get('flower','#FF7EA8')`), tree, leaf (hoja de otoño), blossom (rama de cerezo en flor), snowman, umbrella, heart, rainbow, raindrop, snowflake.
**objetos (`art-objects.js`)**: car, ball, teddy, robot, kite, drum, train, doll, table, chair, button (arg color opcional), house, key, book, shoe, beanie (gorro de lana), swimsuit, balloon (arg color `get('balloon','#FF7E69')`), coin (arg texto `get('coin','2')` dibuja moneda con ese número/texto), boat, bed, cup, lamp, scarf, tshirt, sandal, boot, hat.
Triángulo/cuadrado/círculo/rombo/estrella para series: `shape` → `Kids.art.get('shape','circle'|'square'|'triangle'|'diamond'|'star'|'heart','#E03131')` (en `art-objects.js`).

## Definir un juego (el patrón)
Un fichero `js/games/<id>.js` con una IIFE que llama:

```js
Kids.game({
  id: 'mates-1',            // = nombre del fichero
  group: 'mates',           // mates | lectura | memoria | mundo
  num: 1,                   // orden dentro del grupo (se muestra en el círculo)
  title: 'Cuenta los animales',
  blurb: 'Cuenta cuántos hay y toca el número.',   // 1 frase (se lee en voz alta en "Escucha las instrucciones")
  how: 'Cuenta los animales y toca el número correcto.', // opcional: texto hablado
  icon: 'duck',             // nombre de dibujo para la tarjeta
  levels: ['Hasta 5','Hasta 10','Hasta 20'],       // 3 textos cortos para Fácil/Medio/Difícil
  rounds: 8,                // nº de rondas (puntos de progreso). Juegos de una sola partida (memory): rounds:1
  round(g, i) { … },        // construye la ronda i dentro de g.area
  stars(mistakes, rounds) { return 3; }            // opcional; por defecto ≤20% fallos = 3★, ≤60% = 2★
});
```

### Objeto `g` (contexto de la ronda)
- `g.level` → 1 fácil, 2 medio, 3 difícil. **Los tres niveles deben notarse** (más cantidad, más distractores, más variedad, menos ayudas).
- `g.area` → div vacío, flex columna centrada, ya limpiado al empezar la ronda. Construye aquí con `Kids.util.el('<div>…</div>')` y `appendChild`.
- `g.ask('¿Cuántos patos hay?')` → muestra la pregunta en la píldora superior **y la lee en voz alta**. Llama siempre.
- `g.right()` → acierto: confeti + felicitación + pasa sola a la siguiente ronda (o termina). Llamar **una sola vez** por ronda. (Opcional `g.right('¡Qué listo!')`.)
- `g.wrong()` → fallo suave (mensaje amable, cuenta para estrellas; no pasa de ronda). `g.roundMistakes` = fallos de esta ronda: úsalo para ayudar (p.ej. a los 2 fallos, `g.helpHint = () => {…resaltar la correcta…}` asignado al empezar la ronda).
- `g.shake(el)`, `g.toast(html)`, `g.t(fn, ms)` (setTimeout seguro: se cancela al salir del juego; **no uses setTimeout/setInterval directos**), `g.say('texto')`, `g.lock()/g.unlock()`.
- `g.i` índice de ronda, `g.rounds` total.
- Marca visualmente los botones: añade clases `right` / `bad` (ya tienen animación) y desactiva con `disabled`.

### Utilidades `Kids.util`
`shuffle(a)`, `pick(a)`, `sample(a,n)`, `rnd(a,b)` (inclusivo), `range(n,from)`, `el(html)`, `esc(s)`. `Kids.css('...')` inyecta CSS (usa siempre el selector `.g-<id>` para no pisar otros juegos). `Kids.drag(el,{targets:()=>[...], onDrop:(target,el)=>bool, onTap:(el)=>{}})` para arrastrar con dedo o ratón (si onDrop devuelve true tú colocas el elemento: `target.appendChild(el)`). Siempre ofrece también alternativa táctil/clic si es razonable. `Kids.sound.pop()/tap()`.

### Clases CSS ya disponibles (ver style.css)
`.opts` (fila de respuestas que se reparte en 4 colores) + `.ans` (botón grande; clases `.right/.bad`), `.pic` (tarjeta con dibujo + `.lbl` etiqueta), `.pic.big`, `.card`, `.scene` (+`.pond .meadow .sky`), `.slot` (hueco punteado; `.hot` `.filled`), `.chip`, `.seg` (interruptor de segmentos; `button.on`), `.bigword`, `.btn`, `.shake .pop .bounce .pulse`.

## Reglas de calidad
1. Cada juego debe ser **jugable de verdad** (no una maqueta): genera datos aleatorios, valida respuestas, 3 niveles con dificultad real, ayudas amables, sin callejones sin salida.
2. Nada de emojis como dibujos: usa `Kids.art` o SVG propio. Textos en español, cálidos y cortos.
3. Responsive: usa rem, %, vmin, flex/grid; que quepa en 1024×768 y en un móvil vertical 390×800 sin scroll horizontal. Evita tamaños en px fijos grandes.
4. Accesible: botones reales `<button>`, `aria-label` en los que solo tengan dibujo.
5. Solo toca tu(s) fichero(s). No edites core.js ni style.css ni index.html (si necesitas algo del núcleo, di qué en tu informe).
6. Comprueba la sintaxis con `node --check <fichero>` antes de terminar.


---
## AMPLIACIÓN (segunda tanda de juegos)
- Ids nuevos: `mates-x1`…`mates-x20`, `lectura-x1`…, `memoria-x1`…, `mundo-x1`… (la x y el número k = nº de la lista del usuario). Fichero = `js/games/<id>.js`. `num` = 5+k en mates, 4+k en lectura y memoria, 3+k en mundo.
- **Lolo** es la mascota (el león): `Kids.art.get('lion')`. Otros personajes: los animales del catálogo.
- Sonido sintetizado: `Kids.sound.tone(freqHz, retrasoSeg, duracionSeg, 'sine'|'triangle'|'square'|'sawtooth', volumen)` y `Kids.sound.ctx()` (AudioContext) para sonidos propios (siempre tras una interacción del niño). Voz: `Kids.voice.say(texto)`; para sonidos de animales usa onomatopeyas habladas ('muuu', 'guau').
- Dibujos nuevos que necesites: regístralos en TU fichero con prefijo del juego (`mx1-reloj`…) y no cambies los compartidos. Escenas largas: SVG por código.
- Estados entre rondas: `g.shared` no existe en el núcleo; si lo necesitas, guarda en una variable de la IIFE reiniciada cuando `g.i === 0`.
- Juegos de una sola partida con rounds:1 deben fijar `stars()` razonable. Juegos "para ordenar/arrastrar" deben ofrecer también la alternativa de tocar (tocar elemento y luego tocar destino).
- Hay 80 juegos más en desarrollo en paralelo por otros agentes: NO toques ficheros ajenos.
