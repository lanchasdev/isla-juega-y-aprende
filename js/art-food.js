/* Isla Juega y Aprende - dibujos: comida y naturaleza */
(function () {
  'use strict';
  const S = (b, defs) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${defs ? '<defs>' + defs + '</defs>' : ''}${b}</svg>`;
  const shade = (hex, f) => { // f<0 oscurece, f>0 aclara
    const n = parseInt(hex.slice(1), 16);
    const c = [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.round(f < 0 ? v * (1 + f) : v + (255 - v) * f));
    return '#' + c.map(v => v.toString(16).padStart(2, '0')).join('');
  };
  const shadow = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry || 3.5}" fill="#5a4630" opacity=".13"/>`;
  const shine = (d, o) => `<path d="${d}" fill="#fff" opacity="${o || .5}"/>`;
  const dot = (x, y, r, c, o) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"${o ? ` opacity="${o}"` : ''}/>`;
  const leafP = (x, y, rot, len, w, c) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M0 0 C${w} ${-len * .3} ${w} ${-len * .8} 0 ${-len} C${-w} ${-len * .8} ${-w} ${-len * .3} 0 0Z" fill="${c || '#5CB85C'}"/><path d="M0 -2 L0 ${-len * .8}" stroke="${shade(c || '#5CB85C', -.2)}" stroke-width="1.2" stroke-linecap="round" fill="none"/></g>`;
  const face = (cx, cy, k, sleep) => {
    const ink = '#4a3228';
    const eyes = sleep
      ? `<path d="M${cx - 8 * k} ${cy} q${2.6 * k} ${2.8 * k} ${5.2 * k} 0 M${cx + 2.8 * k} ${cy} q${2.6 * k} ${2.8 * k} ${5.2 * k} 0" stroke="${ink}" stroke-width="${1.7 * k}" fill="none" stroke-linecap="round"/>`
      : `${dot(cx - 6.5 * k, cy, 2.6 * k, ink)}${dot(cx + 6.5 * k, cy, 2.6 * k, ink)}${dot(cx - 5.7 * k, cy - .9 * k, .9 * k, '#fff')}${dot(cx + 7.3 * k, cy - .9 * k, .9 * k, '#fff')}`;
    return `${eyes}<path d="M${cx - 4 * k} ${cy + 5 * k} q${4 * k} ${4.6 * k} ${8 * k} 0" stroke="${ink}" stroke-width="${1.7 * k}" fill="none" stroke-linecap="round"/>${dot(cx - 11 * k, cy + 4.5 * k, 2.8 * k, '#FF7A8A', .5)}${dot(cx + 11 * k, cy + 4.5 * k, 2.8 * k, '#FF7A8A', .5)}`;
  };
  const drop = (x, y, s, c) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -8 C0 -8 -6 -1 -6 3 A6 6 0 0 0 6 3 C6 -1 0 -8 0 -8Z" fill="${c || '#4DABF7'}"/>`;
  const star5 = (cx, cy, R, r, rot) => {
    let p = '';
    for (let i = 0; i < 10; i++) {
      const a = (rot || -90) * Math.PI / 180 + i * Math.PI / 5, rr = i % 2 ? r : R;
      p += (i ? 'L' : 'M') + (cx + rr * Math.cos(a)).toFixed(1) + ' ' + (cy + rr * Math.sin(a)).toFixed(1);
    }
    return p + 'Z';
  };
  const blossom5 = (x, y, r, c, c2) => {
    let g = '';
    for (let i = 0; i < 5; i++) {
      const a = (-90 + i * 72) * Math.PI / 180;
      g += dot((x + r * .62 * Math.cos(a)).toFixed(1), (y + r * .62 * Math.sin(a)).toFixed(1), r * .52, c);
    }
    return g + dot(x, y, r * .28, c2 || '#FFD54F') + dot(x - r * .08, y - r * .08, r * .1, '#fff', .7);
  };

  /* ---------- frutas ---------- */
  const apple = S(`${shadow(50, 92, 28)}
    <path d="M50 30 C60 20 88 24 88 54 C88 78 70 93 50 89 C30 93 12 78 12 54 C12 24 40 20 50 30Z" fill="url(#apple-g)"/>
    <path d="M70 34 C84 44 84 74 62 86 C80 82 90 62 84 44 C81 38 76 34 70 34Z" fill="#B71C2E" opacity=".25"/>
    <path d="M50 31 C49 23 50 16 55 9" stroke="#7B4A2A" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    ${leafP(54, 20, 58, 26, 8, '#5CB85C')}
    ${shine('M24 44 C24 36 30 31 36 30 C32 34 30 40 30 46 C30 50 26 52 24 44Z', .6)}${dot(29, 58, 2.6, '#fff', .5)}`,
    `<radialGradient id="apple-g" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#FF6B6B"/><stop offset="1" stop-color="#E5303F"/></radialGradient>`);

  const banana = S(`${shadow(52, 92, 30)}
    <path d="M26 20 C14 58 40 92 86 70 C92 67 93 60 88 58 C62 68 44 54 42 20Z" fill="#FFD43B"/>
    <path d="M42 20 C44 54 62 68 88 58 C88 57 87 56 86 56 C62 60 50 44 50 20Z" fill="#F2B705" opacity=".6"/>
    <path d="M25 40 C28 62 44 78 66 78" stroke="#fff" stroke-width="3.2" stroke-linecap="round" fill="none" opacity=".55"/>
    <path d="M24 12 L44 12 L43 24 L26 25Z" fill="#8D6A3E"/><rect x="25" y="9" width="19" height="7" rx="3.5" fill="#6F5130"/>
    <path d="M85 59 C91 57 94 62 91 66 C89 69 86 70 84 68Z" fill="#5a4630"/>`);

  const pear = S(`${shadow(50, 93, 26)}
    <path d="M50 14 C62 14 60 30 65 38 C80 47 87 62 82 75 C77 90 60 92 50 92 C40 92 23 90 18 75 C13 62 20 47 35 38 C40 30 38 14 50 14Z" fill="url(#pear-g)"/>
    
    <path d="M50 16 C50 10 52 7 56 4" stroke="#7B4A2A" stroke-width="4" stroke-linecap="round" fill="none"/>
    ${leafP(52, 14, 62, 24, 7, '#4CAF50')}
    ${shine('M28 62 C26 54 30 48 36 44 C34 50 34 56 36 62 C36 66 29 68 28 62Z', .55)}${dot(34, 74, 2.4, '#fff', .45)}
    ${dot(60, 66, 1.3, '#6B9A1E', .5)}${dot(66, 74, 1.3, '#6B9A1E', .5)}${dot(55, 76, 1.3, '#6B9A1E', .5)}`,
    `<radialGradient id="pear-g" cx=".35" cy=".4" r=".85"><stop offset="0" stop-color="#D4EE6A"/><stop offset="1" stop-color="#9ACD32"/></radialGradient>`);

  const orange = S(`${shadow(50, 92, 28)}
    <circle cx="50" cy="55" r="37" fill="url(#orange-g)"/>
    <path d="M72 30 C90 48 84 76 56 90 C80 90 94 66 86 46 C83 38 78 33 72 30Z" fill="#D9730D" opacity=".28"/>
    ${[[34, 48], [52, 40], [66, 54], [42, 66], [60, 72], [30, 62], [72, 68], [50, 56]].map(p => dot(p[0], p[1], 1.2, '#E07F0B', .55)).join('')}
    <path d="M50 20 L50 17" stroke="#7B4A2A" stroke-width="4" stroke-linecap="round"/>
    ${leafP(52, 20, 70, 30, 9, '#4CAF50')}${leafP(48, 20, -40, 18, 6, '#5CB85C')}
    ${shine('M24 48 C24 38 31 30 40 27 C34 33 31 40 31 48 C31 54 25 56 24 48Z', .6)}`,
    `<radialGradient id="orange-g" cx=".38" cy=".38" r=".8"><stop offset="0" stop-color="#FFBE4A"/><stop offset="1" stop-color="#FF8E12"/></radialGradient>`);

  const strawberry = S(`${shadow(50, 93, 24)}
    <path d="M50 92 C22 76 10 52 14 38 C18 26 36 28 50 32 C64 28 82 26 86 38 C90 52 78 76 50 92Z" fill="url(#strawberry-g)"/>
    <path d="M76 38 C88 50 76 74 52 90 C80 78 92 52 82 38Z" fill="#B3142A" opacity=".25"/>
    ${[[32, 46], [48, 44], [64, 46], [26, 58], [40, 58], [56, 58], [72, 58], [34, 70], [48, 70], [62, 70], [41, 82], [55, 82]].map(p => `<ellipse cx="${p[0]}" cy="${p[1]}" rx="2" ry="3" fill="#FFE29A"/>`).join('')}
    <path d="M50 30 C42 22 28 20 22 28 C30 28 34 32 38 34 C30 36 28 42 30 44 C38 40 44 38 50 40 C56 38 62 40 70 44 C72 42 70 36 62 34 C66 32 70 28 78 28 C72 20 58 22 50 30Z" fill="#4CAF50"/>
    <path d="M50 30 L50 14" stroke="#4CAF50" stroke-width="5" stroke-linecap="round"/>
    ${shine('M22 44 C22 38 26 34 31 33 C28 37 27 41 27 46 C27 50 22 50 22 44Z', .55)}`,
    `<radialGradient id="strawberry-g" cx=".4" cy=".35" r=".85"><stop offset="0" stop-color="#FF5A6E"/><stop offset="1" stop-color="#E02143"/></radialGradient>`);

  const grapes = (() => {
    const pts = [[26, 36], [42, 36], [58, 36], [74, 36], [34, 50], [50, 50], [66, 50], [42, 64], [58, 64], [50, 78]];
    return S(`${shadow(50, 94, 22)}
    <path d="M50 28 Q50 16 58 10" stroke="#7B4A2A" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    ${leafP(54, 16, 70, 34, 11, '#5CB85C')}
    ${pts.map(p => dot(p[0], p[1], 10.5, '#8E4FD1') + dot(p[0] + 2, p[1] + 3, 7, '#6F32B5', .35) + `<ellipse cx="${p[0] - 3.5}" cy="${p[1] - 4}" rx="2.6" ry="1.8" fill="#fff" opacity=".65" transform="rotate(-35 ${p[0] - 3.5} ${p[1] - 4})"/>`).join('')}`);
  })();

  const cherry = S(`${shadow(50, 94, 34)}
    <path d="M30 72 C34 50 46 34 60 24 M68 70 C66 52 63 38 60 24" stroke="#5E9C3A" stroke-width="3.6" stroke-linecap="round" fill="none"/>
    ${leafP(60, 24, 40, 28, 10, '#4CAF50')}
    ${dot(30, 72, 17, '#D81B4A')}${dot(68, 70, 17, '#E5284F')}
    <path d="M40 66 C46 76 40 88 30 89 C42 92 52 80 46 66Z" fill="#9E0F33" opacity=".3"/>
    <path d="M78 64 C84 74 78 86 68 87 C80 90 90 78 84 64Z" fill="#9E0F33" opacity=".3"/>
    ${shine('M20 68 C20 62 24 58 29 57 C26 61 25 65 25 70 C25 73 20 73 20 68Z', .6)}${shine('M58 66 C58 60 62 56 67 55 C64 59 63 63 63 68 C63 71 58 71 58 66Z', .6)}`);

  const watermelon = S(`${shadow(50, 84, 38)}
    <path d="M6 34 A44 44 0 0 0 94 34Z" fill="#3E9B4F" stroke="#3E9B4F" stroke-width="8" stroke-linejoin="round"/>
    <path d="M6 34 A44 44 0 0 0 94 34Z" fill="#3E9B4F" stroke="#4DB562" stroke-width="3" stroke-linejoin="round" stroke-dasharray="1 0" opacity=".0"/>
    <path d="M10 34 A40 40 0 0 0 90 34Z" fill="#E8F5D0"/>
    <path d="M15 34 A35 35 0 0 0 85 34Z" fill="#FF5C6C"/>
    <path d="M22 34 A28 28 0 0 0 78 34Z" fill="#FF7482" opacity=".55"/>
    <path d="M16 36 H84" stroke="#fff" stroke-width="0" />
    ${[[32, 46], [50, 52], [68, 46], [42, 62], [58, 62], [50, 38]].map(p => `<path transform="translate(${p[0]} ${p[1]})" d="M0 -4 C3 -1 3 3 0 4 C-3 3 -3 -1 0 -4Z" fill="#3a2a2a"/>`).join('')}
    <path d="M14 34 A36 36 0 0 0 30 62" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".4" transform="translate(2 0)"/>
    <path d="M8 29 A44 44 0 0 1 92 29" stroke="#4DB562" stroke-width="0" fill="none"/>`);

  const carrot = S(`${shadow(50, 94, 24)}
    <g transform="rotate(28 50 50)">
    ${leafP(50, 26, -28, 26, 8, '#4CAF50')}${leafP(50, 26, 28, 26, 8, '#5CB85C')}${leafP(50, 26, 0, 30, 8, '#43A047')}
    <path d="M50 96 C40 74 30 52 30 38 C30 26 38 22 50 22 C62 22 70 26 70 38 C70 52 60 74 50 96Z" fill="#FF8A2B"/>
    <path d="M62 26 C74 36 62 70 50 96 C66 76 76 48 70 34Z" fill="#E56A0C" opacity=".35"/>
    <path d="M36 42 h9 M56 50 h8 M42 62 h8 M52 76 h6" stroke="#E56A0C" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>
    ${shine('M36 34 C36 30 38 28 41 27 C40 30 40 34 40 38 C40 41 36 40 36 34Z', .55)}
    </g>`);

  const cake = S(`${shadow(50, 93, 38)}
    <ellipse cx="50" cy="86" rx="40" ry="7" fill="#fff" stroke="#D9E3EF" stroke-width="2"/>
    <rect x="14" y="56" width="72" height="30" rx="10" fill="#B8774A"/>
    <rect x="14" y="74" width="72" height="12" rx="6" fill="#9C5F38" opacity=".5"/>
    <rect x="26" y="36" width="48" height="26" rx="9" fill="#D4915C"/>
    <path d="M12 60 C12 50 20 48 26 52 C30 46 38 46 42 52 C46 46 54 46 58 52 C62 46 70 46 74 52 C80 48 88 50 88 60 C88 66 82 66 80 62 C78 70 70 70 70 62 C68 68 60 68 58 62 C56 70 46 70 44 62 C42 68 34 68 32 62 C30 66 22 66 20 62 C18 66 12 66 12 60Z" fill="#FFC1D4"/>
    <path d="M24 40 C24 32 32 32 36 36 C42 30 58 30 64 36 C68 32 76 32 76 40 C76 46 72 48 70 44 C68 50 62 50 60 44 C56 50 44 50 40 44 C38 50 32 50 30 44 C28 48 24 46 24 40Z" fill="#FFE0EA"/>
    <rect x="45.5" y="14" width="9" height="22" rx="3" fill="#5AB0FF"/>
    <path d="M45.5 20 l9 4 M45.5 27 l9 4" stroke="#fff" stroke-width="2" opacity=".7"/>
    <path d="M50 3 C56 9 57 14 50 15 C43 14 44 9 50 3Z" fill="#FFB020"/><path d="M50 8 C53 11 53 13 50 14 C47 13 47 11 50 8Z" fill="#FFE066"/>
    ${[[22, 57, '#FFD43B'], [34, 60, '#69DB7C'], [48, 56, '#4DABF7'], [62, 60, '#FFD43B'], [76, 57, '#69DB7C'], [36, 40, '#FF8787'], [56, 38, '#4DABF7'], [66, 42, '#FFD43B']].map(p => dot(p[0], p[1], 2, p[2])).join('')}
    ${shine('M18 70 C18 66 20 64 22 64 L22 80 C20 80 18 78 18 76Z', .3)}`);

  /* ---------- cielo y naturaleza ---------- */
  const sun = (() => {
    let r = '';
    for (let i = 0; i < 12; i++) r += `<rect x="46" y="3" width="8" height="${i % 2 ? 11 : 15}" rx="4" fill="${i % 2 ? '#FFB020' : '#FF9F1C'}" transform="rotate(${i * 30} 50 50)"/>`;
    return S(`${r}${dot(50, 50, 29, '#FFD43B')}${dot(50, 50, 29, 'url(#sun-g)')}
      <path d="M34 36 C38 30 44 27 50 27" stroke="#fff" stroke-width="3.4" stroke-linecap="round" fill="none" opacity=".55"/>
      ${face(50, 49, 1.15)}`,
      `<radialGradient id="sun-g" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#FFF3A0" stop-opacity=".8"/><stop offset="1" stop-color="#FFB020" stop-opacity=".6"/></radialGradient>`);
  })();

  const moon = S(`<g mask="url(#moon-m)"><rect width="100" height="100" fill="#FFE9A8"/>
    <circle cx="24" cy="30" r="8" fill="#F4D27F" opacity=".7"/><circle cx="14" cy="64" r="5" fill="#F4D27F" opacity=".7"/><circle cx="34" cy="82" r="4" fill="#F4D27F" opacity=".7"/>
    <path d="M10 40 C8 30 14 18 24 12" stroke="#fff" stroke-width="3.5" stroke-linecap="round" fill="none" opacity=".6"/></g>
    ${face(24, 54, .95, true)}
    ${star5(86, 14, 6, 2.8)  ? `<path d="${star5(86, 16, 6, 2.8)}" fill="#FFD43B"/><path d="${star5(78, 86, 4, 1.9)}" fill="#FFD43B" opacity=".8"/>` : ''}`,
    `<mask id="moon-m"><rect width="100" height="100" fill="#000"/><circle cx="46" cy="52" r="42" fill="#fff"/><circle cx="72" cy="40" r="35" fill="#000"/></mask>`);

  const star = S(`${shadow(50, 94, 26, 3)}
    <path d="${star5(50, 53, 38, 21)}" fill="#FFC928" stroke="#FFC928" stroke-width="10" stroke-linejoin="round"/>
    <path d="${star5(50, 53, 38, 21)}" fill="none" stroke="#FFDD57" stroke-width="3" stroke-linejoin="round" transform="translate(0 -2)" opacity=".0"/>
    <path d="M30 28 C34 22 40 18 46 15" stroke="#fff" stroke-width="3.4" stroke-linecap="round" fill="none" opacity=".6"/>
    ${face(50, 54, 1.1)}`);

  const cloud = S(`${shadow(50, 90, 34, 3)}
    <g fill="#fff" stroke="#BCD9F4" stroke-width="6" stroke-linejoin="round">
    ${dot(28, 64, 17, '#fff')}${dot(50, 44, 24, '#fff')}${dot(74, 60, 19, '#fff')}<rect x="28" y="56" width="46" height="26" rx="13"/></g>
    <g fill="#fff">${dot(28, 64, 17, '#fff')}${dot(50, 44, 24, '#fff')}${dot(74, 60, 19, '#fff')}<rect x="28" y="56" width="46" height="26" rx="13"/></g>
    
    <path d="M36 40 C40 32 46 28 54 28" stroke="#E3F0FC" stroke-width="3.4" stroke-linecap="round" fill="none"/>
    ${face(50, 61, .95)}`);

  const flower = (color) => {
    const c = color || '#FF7EA8', d = shade(c, -.18);
    let pet = '';
    for (let i = 0; i < 6; i++) pet += `<ellipse cx="50" cy="19" rx="11" ry="15" fill="${i % 2 ? d : c}" transform="rotate(${i * 60} 50 36)"/>`;
    return S(`${shadow(50, 95, 18, 2.8)}
      <path d="M50 52 C48 66 52 80 50 94" stroke="#43A047" stroke-width="5" stroke-linecap="round" fill="none"/>
      ${leafP(50, 82, 55, 24, 9, '#5CB85C')}${leafP(50, 72, -55, 20, 8, '#4CAF50')}
      ${pet}${dot(50, 36, 12, '#FFD43B')}${dot(50, 36, 12, '#F5A800', .0)}${dot(47, 33, 4, '#fff', .55)}${dot(54, 40, 1.5, '#E69A00')}${dot(45, 40, 1.5, '#E69A00')}${dot(56, 32, 1.3, '#E69A00')}`);
  };

  const tree = S(`${shadow(50, 94, 28)}
    <path d="M43 94 C45 80 46 68 44 56 L56 56 C54 68 55 80 57 94Z" fill="#8D5A34"/>
    <path d="M52 94 C53 80 54 68 53 56 L56 56 C54 68 55 80 57 94Z" fill="#6F4526" opacity=".6"/>
    <path d="M50 76 L36 62 M50 68 L62 54" stroke="#8D5A34" stroke-width="4" stroke-linecap="round"/>
    ${dot(30, 44, 20, '#4CAF50')}${dot(70, 44, 20, '#4CAF50')}${dot(50, 28, 24, '#5CB85C')}${dot(50, 50, 24, '#4CAF50')}${dot(28, 62, 4, '#4CAF50', 0)}
    ${dot(66, 56, 14, '#3F9A44', .35)}${dot(40, 60, 11, '#3F9A44', .3)}
    <path d="M30 20 C36 12 46 9 54 11" stroke="#fff" stroke-width="3.6" stroke-linecap="round" fill="none" opacity=".4"/>
    ${[[36, 34], [62, 24], [74, 48], [50, 48], [28, 52]].map(p => dot(p[0], p[1], 5.5, '#E5303F') + dot(p[0] - 1.5, p[1] - 1.8, 1.5, '#fff', .7)).join('')}`);

  const leaf = S(`${shadow(50, 95, 18, 2.5)}
    <g transform="rotate(24 50 50)">
    <path d="M50 94 L50 80" stroke="#8D5A34" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M50 8 C58 20 66 22 80 22 C74 34 82 40 86 46 C76 50 78 58 82 66 C68 66 64 72 50 82 C36 72 32 66 18 66 C22 58 24 50 14 46 C18 40 26 34 20 22 C34 22 42 20 50 8Z" fill="url(#leaf-g)" stroke="#C2410C" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M50 84 L50 20 M50 70 L32 58 M50 70 L68 58 M50 52 L30 40 M50 52 L70 40 M50 36 L38 28 M50 36 L62 28" stroke="#B93A12" stroke-width="2.2" stroke-linecap="round" fill="none" opacity=".75"/>
    <path d="M44 22 C38 28 34 34 30 40" stroke="#fff" stroke-width="2.6" stroke-linecap="round" fill="none" opacity=".4"/>
    </g>`,
    `<linearGradient id="leaf-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFB020"/><stop offset=".55" stop-color="#FF7A1A"/><stop offset="1" stop-color="#E5392B"/></linearGradient>`);

  const blossom = S(`
    <path d="M6 94 C20 80 30 70 44 62 C58 54 66 40 84 20" stroke="#7B4A2A" stroke-width="6" stroke-linecap="round" fill="none"/>
    <path d="M34 70 C34 60 28 54 20 50 M54 56 C58 66 66 70 74 72 M66 44 C60 34 62 24 58 14" stroke="#7B4A2A" stroke-width="3.6" stroke-linecap="round" fill="none"/>
    ${dot(22, 50, 4, '#FF9DB8')}${dot(60, 16, 4, '#FF9DB8')}${dot(76, 73, 4, '#FF9DB8')}
    ${blossom5(24, 56, 12, '#FFB3C8', '#FFD54F')}${blossom5(48, 30, 13, '#FF9DB8', '#FFD54F')}${blossom5(78, 60, 12, '#FFB3C8', '#FFD54F')}${blossom5(78, 20, 11, '#FF9DB8', '#FFD54F')}${blossom5(46, 76, 10, '#FFC6D6', '#FFD54F')}${blossom5(62, 38, 9, '#FFC6D6', '#FFD54F')}
    <g fill="#FFC6D6" opacity=".9"><ellipse cx="14" cy="84" rx="3" ry="2" transform="rotate(30 14 84)"/><ellipse cx="90" cy="86" rx="3" ry="2" transform="rotate(-30 90 86)"/><ellipse cx="30" cy="92" rx="2.6" ry="1.8"/></g>`);

  const snowman = S(`${shadow(50, 95, 28)}
    <circle cx="50" cy="73" r="22" fill="#fff" stroke="#CFE3F5" stroke-width="2.5"/><path d="M62 56 C74 66 72 86 54 94 C70 92 78 76 72 62Z" fill="#CFE3F5" opacity=".6"/>
    <circle cx="50" cy="40" r="17" fill="#fff" stroke="#CFE3F5" stroke-width="2.5"/><path d="M60 28 C68 36 64 50 54 56 C66 54 70 42 66 32Z" fill="#CFE3F5" opacity=".6"/>
    <path d="M30 66 L12 54 M12 54 l-4 -6 M12 54 l-6 2 M70 66 L88 54 M88 54 l4 -6 M88 54 l6 2" stroke="#7B4A2A" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M32 24 C32 8 68 8 68 24Z" fill="#E5303F"/><rect x="29" y="22" width="42" height="8" rx="4" fill="#fff" stroke="#CFE3F5" stroke-width="1.5"/>${dot(50, 8, 5, '#fff')}
    ${dot(44, 39, 2.4, '#3a2a2a')}${dot(57, 39, 2.4, '#3a2a2a')}
    <path d="M50 43 L68 47 L50 49Z" fill="#FF8A2B"/>
    <path d="M44 51 q6 4 12 0" stroke="#3a2a2a" stroke-width="1.6" fill="none" stroke-linecap="round"/>${dot(38, 46, 3, '#FF9AA8', .5)}${dot(60, 52, 0, '#fff')}
    <path d="M34 54 C42 60 58 60 66 54 L68 62 C58 68 42 68 32 62Z" fill="#2FA84F"/><path d="M42 60 L40 76 L50 76 L50 63Z" fill="#2FA84F"/><path d="M44 66 h6 M43 71 h6" stroke="#1E7E3A" stroke-width="2" opacity=".6"/>
    ${dot(50, 78, 2.6, '#3a2a2a')}${dot(50, 87, 2.6, '#3a2a2a')}`);

  const umbrella = S(`${shadow(50, 94, 14, 2.5)}
    <path d="M50 52 V78 C50 90 34 90 34 79" stroke="#7B4A2A" stroke-width="5" stroke-linecap="round" fill="none"/>
    <clipPath id="umbrella-c"><path d="M6 52 A44 44 0 0 1 94 52 Q83 62 72 52 Q61 62 50 52 Q39 62 28 52 Q17 62 6 52Z"/></clipPath>
    <g clip-path="url(#umbrella-c)"><rect width="100" height="100" fill="#FF6B6B"/><ellipse cx="50" cy="52" rx="30" ry="44" fill="#FFD43B"/><ellipse cx="50" cy="52" rx="14" ry="44" fill="#4DABF7"/>
    <path d="M18 30 C24 20 34 14 44 11" stroke="#fff" stroke-width="3.6" stroke-linecap="round" fill="none" opacity=".45"/>
    <path d="M70 20 C84 28 92 40 92 52 H72 Z" fill="#000" opacity=".08"/></g>
    <path d="M50 8 L50 2" stroke="#7B4A2A" stroke-width="3.5" stroke-linecap="round"/>
    ${drop(18, 72, 1.3)}${drop(80, 66, 1.3)}${drop(70, 86, 1.1)}${drop(88, 84, .9)}${drop(10, 90, .9)}`);

  const heart = S(`${shadow(50, 94, 24, 3)}
    <path d="M50 88 C12 62 8 38 20 26 C32 14 46 22 50 32 C54 22 68 14 80 26 C92 38 88 62 50 88Z" fill="url(#heart-g)"/>
    <path d="M70 32 C84 40 84 62 54 86 C86 66 94 42 80 28Z" fill="#B3142A" opacity=".22"/>
    <path d="M22 38 C22 30 28 25 35 25" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".6"/>${dot(24, 49, 2.6, '#fff', .6)}`,
    `<radialGradient id="heart-g" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#FF7A93"/><stop offset="1" stop-color="#EF3358"/></radialGradient>`);

  const rainbow = (() => {
    const cols = ['#FF6B6B', '#FFA94D', '#FFD43B', '#69DB7C', '#4DABF7'];
    const arcs = cols.map((c, i) => { const r = 38 - i * 7.2; return `<path d="M${50 - r} 74 A${r} ${r} 0 0 1 ${50 + r} 74" stroke="${c}" stroke-width="7.6" fill="none"/>`; }).join('');
    const cl = (x) => `<g transform="translate(${x} 74)"><g fill="#fff" stroke="#BCD9F4" stroke-width="3">${dot(-10, 0, 9, '#fff')}${dot(0, -6, 12, '#fff')}${dot(10, 0, 9, '#fff')}<rect x="-18" y="-4" width="36" height="13" rx="6.5"/></g><g fill="#fff">${dot(-10, 0, 8, '#fff')}${dot(0, -6, 11, '#fff')}${dot(10, 0, 8, '#fff')}<rect x="-17" y="-3" width="34" height="11" rx="5.5"/></g></g>`;
    return S(`${arcs}${cl(21)}${cl(79)}`);
  })();

  const raindrop = S(`${shadow(50, 94, 20, 2.8)}
    <path d="M50 6 C50 6 18 44 18 64 C18 82 32 93 50 93 C68 93 82 82 82 64 C82 44 50 6 50 6Z" fill="url(#raindrop-g)"/>
    <path d="M68 46 C80 62 76 82 54 91 C74 90 84 76 80 62 C78 54 74 48 68 46Z" fill="#1971C2" opacity=".25"/>
    <path d="M30 66 C28 56 32 48 38 42" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".65"/>${dot(33, 78, 2.6, '#fff', .55)}`,
    `<linearGradient id="raindrop-g" x1=".2" y1="0" x2=".8" y2="1"><stop offset="0" stop-color="#7CC8FF"/><stop offset="1" stop-color="#2F8FE8"/></linearGradient>`);

  const snowflake = (() => {
    const arm = `<path d="M50 50 V8 M50 22 L40 12 M50 22 L60 12 M50 36 L42 29 M50 36 L58 29" stroke="#5EB8EE" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>${dot(50, 8, 3, '#5EB8EE')}`;
    let g = '';
    for (let i = 0; i < 6; i++) g += `<g transform="rotate(${i * 60} 50 50)">${arm}</g>`;
    return S(`<circle cx="50" cy="50" r="47" fill="#E6F4FD" opacity=".7"/>${g}<path d="${star5(50, 50, 9, 9, -90)}" fill="#fff" stroke="#5EB8EE" stroke-width="3.5" stroke-linejoin="round"/>${dot(50, 50, 3, '#BFE3F8')}`);
  })();

  Kids.art.add({ apple, banana, pear, orange, strawberry, grapes, cherry, watermelon, carrot, cake, sun, moon, star, cloud, flower, tree, leaf, blossom, snowman, umbrella, heart, rainbow, raindrop, snowflake });
})();
