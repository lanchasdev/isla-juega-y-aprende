/* Comprensión lectora — lectura-x16 */
(function () {
'use strict';
const K = window.Kids, U = K.util, A = K.art;

const S = (inner) => `<svg viewBox="0 0 100 100">${inner}</svg>`;
A.add({
  'lx16-pond': S(`<ellipse cx="50" cy="62" rx="42" ry="24" fill="#8BD0F0" stroke="#6CB8E0" stroke-width="3"/><path d="M28 60q8-6 16 0M54 68q8-6 16 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M20 44q-4-14 4-18M80 44q4-14-4-18" stroke="#5FB070" stroke-width="4" fill="none" stroke-linecap="round"/>`),
  'lx16-granja': S(`<path d="M12 48L50 14l38 34v38H12z" fill="#E8604C"/><path d="M12 48L50 14l38 34" fill="none" stroke="#C94B3A" stroke-width="4" stroke-linejoin="round"/><rect x="38" y="52" width="24" height="34" rx="3" fill="#FFF3DC"/><path d="M38 52l24 34M62 52L38 86" stroke="#E8604C" stroke-width="3"/><circle cx="50" cy="38" r="6" fill="#FFF3DC"/>`),
  'lx16-nieve': S(`<ellipse cx="50" cy="78" rx="42" ry="14" fill="#fff" stroke="#DCEBFA" stroke-width="3"/><path d="M50 18v36M32 28l36 16M32 44l36-16" stroke="#9CC5EE" stroke-width="5" stroke-linecap="round"/><circle cx="24" cy="60" r="3" fill="#BFE0FA"/><circle cx="78" cy="58" r="3" fill="#BFE0FA"/>`),
  'lx16-jardin': S(`<rect x="8" y="70" width="84" height="16" rx="8" fill="#8ED69A"/><path d="M28 70V48M50 70V36M72 70V52" stroke="#5FB070" stroke-width="4" stroke-linecap="round"/><circle cx="28" cy="42" r="9" fill="#FF8FA3"/><circle cx="50" cy="30" r="10" fill="#FFD23F"/><circle cx="72" cy="46" r="9" fill="#B9A6F0"/><circle cx="28" cy="42" r="3.5" fill="#FFE27A"/><circle cx="50" cy="30" r="4" fill="#F29A2E"/><circle cx="72" cy="46" r="3.5" fill="#FFE27A"/>`),
  'lx16-mimo': S(`<path d="M50 84C20 62 14 42 28 30c10-8 20-2 22 6 2-8 12-14 22-6 14 12 8 32-22 54z" fill="#FF7EA8"/><circle cx="36" cy="36" r="4" fill="#fff" opacity=".6"/>`),
  'lx16-sueno': S(`<path d="M62 14a30 30 0 1 0 24 48A34 34 0 0 1 62 14z" fill="#FFD23F"/><path d="M20 30h14l-14 14h14M42 14h10l-10 10h10" stroke="#8C7BE0" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`),
  'lx16-cubo': S(`<path d="M24 36h52l-6 46H30z" fill="#6CC4EE"/><path d="M24 36q26-14 52 0" fill="none" stroke="#4FA9D6" stroke-width="5"/><ellipse cx="50" cy="36" rx="26" ry="6" fill="#CDEBFA"/>`)
});

const P = (n, x, y, s, ...a) => A.get(n, ...a).replace('<svg', `<svg x="${x}" y="${y}" width="${s}" height="${s}"`);
const BG = {
  meadow: '<rect width="400" height="220" fill="#CDEBFA"/><circle cx="340" cy="40" r="22" fill="#FFE27A"/><ellipse cx="90" cy="46" rx="40" ry="13" fill="#fff" opacity=".85"/><path d="M0 120Q100 100 200 118T400 112V220H0z" fill="#A9DE9A"/><path d="M0 160Q120 140 240 160T400 150V220H0z" fill="#8ED69A"/>',
  pond: '<rect width="400" height="220" fill="#B9D4EA"/><ellipse cx="100" cy="36" rx="60" ry="20" fill="#9FB8D3"/><ellipse cx="290" cy="30" rx="60" ry="20" fill="#9FB8D3"/><path d="M0 110Q100 95 200 110T400 105V220H0z" fill="#9EDC7C"/><ellipse cx="200" cy="162" rx="170" ry="48" fill="#6CC4EE"/><g stroke="#fff" stroke-width="3" stroke-linecap="round"><path d="M60 20v14M140 10v14M230 18v14M330 8v14M300 50v14M100 60v14"/></g>',
  farm: '<rect width="400" height="220" fill="#CDEBFA"/><circle cx="60" cy="42" r="22" fill="#FFE27A"/><path d="M0 110Q100 92 200 108T400 100V220H0z" fill="#A9DE9A"/><path d="M0 170Q120 150 240 170T400 160V220H0z" fill="#8ED69A"/><rect x="290" y="60" width="90" height="70" fill="#E8604C"/><path d="M280 62L335 22l55 40z" fill="#C94B3A"/><rect x="320" y="90" width="30" height="40" rx="3" fill="#FFF3DC"/>',
  snow: '<rect width="400" height="220" fill="#DCEBFA"/><path d="M0 150Q100 128 200 148T400 138V220H0z" fill="#fff"/><g fill="#fff"><circle cx="40" cy="40" r="4"/><circle cx="120" cy="70" r="3.5"/><circle cx="220" cy="30" r="4"/><circle cx="330" cy="60" r="3.5"/><circle cx="370" cy="110" r="3"/></g>',
  garden: '<rect width="400" height="220" fill="#D9F0FF"/><circle cx="330" cy="44" r="24" fill="#FFE27A"/><path d="M0 130Q100 112 200 128T400 120V220H0z" fill="#A9DE9A"/><path d="M0 180Q120 160 240 180T400 170V220H0z" fill="#8ED69A"/>',
  night: '<rect width="400" height="220" fill="#2C3E7A"/><g fill="#fff"><circle cx="40" cy="40" r="2.5"/><circle cx="120" cy="80" r="2"/><circle cx="260" cy="30" r="2.5"/><circle cx="360" cy="90" r="2"/><circle cx="200" cy="56" r="2"/></g><circle cx="330" cy="44" r="20" fill="#FFF3B0"/><rect y="160" width="400" height="60" fill="#3F5299"/>'
};
const SCN = (bg, body) => `<svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Ilustración del cuento">${BG[bg]}${body}</svg>`;

const O = (t, art) => ({ t, art });
const STORIES = [
  { id: 'lolo', bg: 'meadow', draw: () => P('lion', 70, 50, 150) + P('butterfly', 250, 30, 70) + P('flower', 260, 110, 80, '#F05A5A'),
    s: ['Lolo el león paseaba por el prado.', 'Vio una mariposa azul y la siguió.', 'La mariposa se posó en una flor roja.', 'Lolo se quedó quieto para no asustarla.', 'Después sonrió muy contento.'],
    q: [
      { q: '¿Quién paseaba por el prado?', a: O('Lolo el león', 'lion'), d: [O('Pepe el pingüino', 'penguin'), O('Rita la rana', 'frog'), O('Mimosa la vaca', 'cow')] },
      { q: '¿Dónde paseaba Lolo?', a: O('Por el prado', 'flower'), d: [O('En la nieve', 'lx16-nieve'), O('En el mar', 'boat'), O('En la cama', 'bed')] },
      { q: '¿Qué vio Lolo?', a: O('Una mariposa', 'butterfly'), d: [O('Un pez', 'fish'), O('Un coche', 'car'), O('Un pájaro', 'bird')] }],
    inf: { q: '¿Por qué se quedó quieto Lolo?', a: O('Para no asustar a la mariposa'), d: [O('Porque tenía sueño'), O('Porque tenía hambre'), O('Porque se había perdido')] } },
  { id: 'rita', bg: 'pond', draw: () => P('frog', 110, 70, 120) + P('duck', 250, 80, 90) + P('raindrop', 70, 10, 50) + P('raindrop', 300, 20, 50),
    s: ['Rita la rana vivía en un estanque.', 'Un día empezó a llover y saltó de alegría.', 'Croó muy fuerte y se mojó las patas.', 'Sus amigos los patos salieron a bailar.', 'Todos estaban felices con la lluvia.'],
    q: [
      { q: '¿Quién vivía en el estanque?', a: O('Rita la rana', 'frog'), d: [O('Lolo el león', 'lion'), O('Beto el oso', 'bear'), O('Lola la abeja', 'bee')] },
      { q: '¿Dónde vivía Rita?', a: O('En un estanque', 'lx16-pond'), d: [O('En una granja', 'lx16-granja'), O('En la nieve', 'lx16-nieve'), O('En un jardín', 'lx16-jardin')] },
      { q: '¿Qué empezó a caer del cielo?', a: O('Lluvia', 'raindrop'), d: [O('Nieve', 'snowflake'), O('Manzanas', 'apple'), O('Hojas', 'leaf')] }],
    inf: { q: '¿Por qué estaba contenta Rita?', a: O('Porque le gustaba la lluvia'), d: [O('Porque tenía frío'), O('Porque no encontraba su casa'), O('Porque quería dormir')] } },
  { id: 'mimosa', bg: 'farm', draw: () => P('cow', 90, 60, 150) + P('lx16-cubo', 245, 110, 60) + P('hen', 200, 120, 60),
    s: ['La vaca Mimosa vivía en una granja.', 'Cada mañana daba leche fresca.', 'Hoy la niña Ana vino con un cubo.', 'Ana le dio un beso para darle las gracias.', 'Mimosa mugió muy contenta.'],
    q: [
      { q: '¿Quién vivía en la granja?', a: O('La vaca Mimosa', 'cow'), d: [O('La gata Luna', 'cat'), O('La oveja Lola', 'sheep'), O('La rana Rita', 'frog')] },
      { q: '¿Dónde vivía Mimosa?', a: O('En una granja', 'lx16-granja'), d: [O('En el mar', 'boat'), O('En la nieve', 'lx16-nieve'), O('En un estanque', 'lx16-pond')] },
      { q: '¿Qué daba Mimosa cada mañana?', a: O('Leche', 'cup'), d: [O('Zanahorias', 'carrot'), O('Pelotas', 'ball'), O('Flores', 'flower')] }],
    inf: { q: '¿Por qué mugió contenta Mimosa?', a: O('Porque Ana le dio un beso'), d: [O('Porque tenía mucho frío'), O('Porque se perdió'), O('Porque se hizo de noche')] } },
  { id: 'pepe', bg: 'snow', draw: () => P('penguin', 110, 50, 140) + P('beanie', 250, 110, 60) + P('lx16-nieve', 290, 20, 60),
    s: ['Pepe el pingüino jugaba en la nieve.', 'Encontró un gorro rojo en el suelo.', 'Se lo puso en la cabeza.', 'Le quedaba tan grande que se rió.', 'Desde ese día lo lleva siempre.'],
    q: [
      { q: '¿Quién jugaba en la nieve?', a: O('Pepe el pingüino', 'penguin'), d: [O('Dani el pato', 'duck'), O('Tito el mono', 'monkey'), O('Lolo el león', 'lion')] },
      { q: '¿Dónde jugaba Pepe?', a: O('En la nieve', 'lx16-nieve'), d: [O('En el jardín', 'lx16-jardin'), O('En la granja', 'lx16-granja'), O('En el estanque', 'lx16-pond')] },
      { q: '¿Qué encontró Pepe?', a: O('Un gorro', 'beanie'), d: [O('Una bota', 'boot'), O('Una llave', 'key'), O('Un libro', 'book')] }],
    inf: { q: '¿Por qué se rió Pepe?', a: O('Porque el gorro le quedaba grande'), d: [O('Porque se cayó al mar'), O('Porque tenía hambre'), O('Porque perdió la pelota')] } },
  { id: 'lola', bg: 'garden', draw: () => P('bee', 90, 40, 100) + P('flower', 220, 90, 110, '#FFC21A') + P('flower', 300, 130, 70, '#FF7EA8'),
    s: ['Lola la abeja volaba por el jardín.', 'Buscaba una flor con mucho néctar.', 'Encontró una flor amarilla muy grande.', 'Se llevó el néctar a su casa.', 'Sus amigas hicieron miel dulce.'],
    q: [
      { q: '¿Quién volaba por el jardín?', a: O('Lola la abeja', 'bee'), d: [O('Rita la rana', 'frog'), O('Mimosa la vaca', 'cow'), O('Pepe el pingüino', 'penguin')] },
      { q: '¿Por dónde volaba Lola?', a: O('Por el jardín', 'lx16-jardin'), d: [O('Por la nieve', 'lx16-nieve'), O('Por el mar', 'boat'), O('Por la cama', 'bed')] },
      { q: '¿Qué encontró Lola?', a: O('Una flor amarilla', 'flower'), d: [O('Un pez', 'fish'), O('Una manzana', 'apple'), O('Un coche', 'car')] }],
    inf: { q: '¿Para qué se llevó Lola el néctar a su casa?', a: O('Para hacer miel con sus amigas'), d: [O('Para jugar a la pelota'), O('Para lavarse las patas'), O('Para dormir en él')] } },
  { id: 'beto', bg: 'night', draw: () => P('bed', 90, 70, 150) + P('bear', 130, 40, 90) + P('moon', 280, 30, 50),
    s: ['Beto el osito tenía mucho sueño.', 'Se puso el pijama y subió a su cama.', 'Mamá osa le dio un beso de buenas noches.', 'Beto cerró los ojos.', 'Soñó con un campo lleno de miel.'],
    q: [
      { q: '¿Quién tenía mucho sueño?', a: O('Beto el osito', 'bear'), d: [O('Lolo el león', 'lion'), O('Tita la tortuga', 'turtle'), O('Dani el pato', 'duck')] },
      { q: '¿Dónde se acostó Beto?', a: O('En su cama', 'bed'), d: [O('En el estanque', 'lx16-pond'), O('En el jardín', 'lx16-jardin'), O('En la nieve', 'lx16-nieve')] },
      { q: '¿Qué le dio mamá osa?', a: O('Un beso', 'lx16-mimo'), d: [O('Una pelota', 'ball'), O('Una zanahoria', 'carrot'), O('Un libro', 'book')] }],
    inf: { q: '¿Por qué cerró los ojos Beto?', a: O('Porque tenía sueño y quería dormir'), d: [O('Porque tenía mucho frío'), O('Porque quería jugar'), O('Porque tenía hambre')] } },
  { id: 'tita', bg: 'meadow', draw: () => P('turtle', 100, 80, 120) + P('strawberry', 250, 100, 70) + P('cloud', 270, 10, 70),
    s: ['Tita la tortuga caminaba despacio por el campo.', 'Olió una fresa roja detrás de una piedra.', 'Estiró el cuello y llegó hasta ella.', 'Se la comió muy despacito.', 'Luego se echó una siesta al sol.'],
    q: [
      { q: '¿Quién caminaba por el campo?', a: O('Tita la tortuga', 'turtle'), d: [O('Lola la abeja', 'bee'), O('Pepe el pingüino', 'penguin'), O('Rita la rana', 'frog')] },
      { q: '¿Por dónde caminaba Tita?', a: O('Por el campo', 'tree'), d: [O('Por la nieve', 'lx16-nieve'), O('Por el mar', 'boat'), O('Por la casa', 'house')] },
      { q: '¿Qué olió Tita?', a: O('Una fresa', 'strawberry'), d: [O('Una flor', 'flower'), O('Una tarta', 'cake'), O('Una zanahoria', 'carrot')] }],
    inf: { q: '¿Por qué tardó mucho Tita en llegar a la fresa?', a: O('Porque las tortugas caminan despacio'), d: [O('Porque volaba muy alto'), O('Porque corría muy rápido'), O('Porque estaba dormida')] } }
];

Kids.css(`
.g-lectura-x16 .wrap{width:100%;max-width:50rem;display:flex;flex-direction:column;align-items:center;gap:.8rem}
.g-lectura-x16 .book{width:100%;display:flex;gap:1rem;align-items:center;justify-content:center;flex-wrap:wrap;padding:.8rem 1rem}
.g-lectura-x16 .sc{flex:0 0 min(100%,17rem);aspect-ratio:400/220;border-radius:1.4rem;overflow:hidden;box-shadow:0 .3rem 0 rgba(20,35,91,.12)}
.g-lectura-x16 .sc svg{width:100%;height:100%}
.g-lectura-x16 .story{flex:1 1 15rem;display:flex;flex-direction:column;gap:.5rem;min-width:0}
.g-lectura-x16 .story p{margin:0;font-family:'Baloo 2';font-size:clamp(1.25rem,3.2vh,1.7rem);line-height:1.25;color:var(--ink)}
.g-lectura-x16 .story p b{color:var(--gd)}
.g-lectura-x16 .btns{display:flex;gap:.6rem;flex-wrap:wrap}
.g-lectura-x16 .closed .story p{display:none}
.g-lectura-x16 .closed .story .hid{display:block}
.g-lectura-x16 .hid{display:none;margin:0;font-family:'Baloo 2';color:var(--ink2);font-size:1.15rem}
.g-lectura-x16 .opts .pic{width:clamp(6.5rem,19vw,9.5rem);min-height:7.5rem}
.g-lectura-x16 .opts .pic svg{width:100%;max-width:5.2rem;height:5.2rem}
.g-lectura-x16 .opts .pic .lbl{font-size:clamp(1rem,2.2vh,1.25rem);text-align:center;line-height:1.05}
.g-lectura-x16 .opts .ans.txt{font-size:clamp(1.2rem,3vh,1.7rem);min-height:3.6rem;min-width:min(100%,10rem);text-align:center;line-height:1.1;padding:.5rem 1rem;flex:1 1 11rem;max-width:21rem}
.g-lectura-x16 .help{animation:pulse .9s infinite;outline:.25rem solid var(--yellow)}
`);

let story = null, lastId = '';
K.game({
  id: 'lectura-x16', group: 'lectura', num: 20,
  title: 'Comprensión lectora', icon: 'book', rounds: 3,
  blurb: 'Lee un cuento corto y contesta tres preguntas.',
  how: 'Escucha o lee el cuento. Después contesta las preguntas tocando la respuesta correcta. Puedes leer el cuento otra vez cuando quieras.',
  levels: ['Cuento de 3 frases', 'Cuento de 4 frases', 'Cuento de 5 frases'],
  round(g, i) {
    const lv = g.level, nS = lv + 2;
    if (i === 0 || !story) {
      const pool = STORIES.filter(s => s.id !== lastId);
      story = U.pick(pool); lastId = story.id;
    }
    const st = story;
    const qd = (lv === 3 && i === 2) ? st.inf : st.q[i];
    const sents = st.s.slice(0, nS);
    const tell = sents.join(' ');
    const nd = lv === 1 ? 2 : 3;
    const opts = U.shuffle([qd.a].concat(lv === 3 && i === 2 ? qd.d : U.sample(qd.d, nd)));
    const usePic = lv === 1;

    g.ask(qd.q);
    const root = U.el(`<div class="wrap">
      <div class="card book ${i > 0 ? 'closed' : ''}">
        <div class="sc">${SCN(st.bg, st.draw())}</div>
        <div class="story">
          ${sents.map((s, k) => `<p>${U.esc(s)}</p>`).join('')}
          <p class="hid">El cuento está guardado. Puedes leerlo otra vez.</p>
          <div class="btns">
            <button class="btn sm blue listen" aria-label="Escuchar el cuento">${K.icons.speaker} Escuchar</button>
            <button class="btn sm white tog" aria-label="Mostrar u ocultar el cuento">${i > 0 ? 'Leer el cuento otra vez' : 'Ocultar el cuento'}</button>
          </div>
        </div>
      </div>
      <div class="opts"></div></div>`);
    g.area.appendChild(root);
    const book = root.querySelector('.book'), tog = root.querySelector('.tog'), box = root.querySelector('.opts');
    root.querySelector('.listen').onclick = () => g.say(tell);
    tog.onclick = () => {
      const c = book.classList.toggle('closed');
      tog.textContent = c ? 'Leer el cuento otra vez' : 'Ocultar el cuento';
      K.sound.pop();
    };
    if (i === 0) g.say(tell + ' ' + qd.q);

    let done = false;
    const btns = opts.map(o => {
      const b = U.el(usePic && o.art
        ? `<button class="pic" aria-label="${U.esc(o.t)}">${A.get(o.art)}<span class="lbl">${U.esc(o.t)}</span></button>`
        : `<button class="ans txt">${U.esc(o.t)}</button>`);
      b._o = o;
      b.onclick = () => {
        if (done || b.disabled) return;
        g.say(o.t);
        if (o === qd.a) {
          done = true; btns.forEach(x => x.classList.remove('help'));
          b.classList.add('right'); g.right();
        } else {
          b.classList.add('bad'); b.disabled = true;
          g.wrong('Vuelve a leer el cuento. ¡Tú puedes!');
        }
      };
      box.appendChild(b); return b;
    });
    g.helpHint = () => {
      book.classList.remove('closed'); tog.textContent = 'Ocultar el cuento';
      g.toast('Lee el cuento otra vez, ¡la respuesta está ahí!');
      g.say(tell);
      const b = btns.find(x => x._o === qd.a); if (b) b.classList.add('help');
    };
  }
});
})();
