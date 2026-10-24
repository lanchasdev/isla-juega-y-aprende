/* Dibujos de animales (estilo libro de cuentos plano). 30 entradas. */
(function () {
  const S = inner => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  const shadow = (cx = 50, cy = 93, rx = 30) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="4" fill="#3b2a1a" opacity=".14"/>`;
  const eye = (x, y, r = 4) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#2b2118"/><circle cx="${x + r * .35}" cy="${y - r * .38}" r="${r * .4}" fill="#fff"/><circle cx="${x - r * .35}" cy="${y + r * .4}" r="${r * .17}" fill="#fff" opacity=".85"/>`;
  const eyes = (x, y, sep, r = 4) => eye(x - sep, y, r) + eye(x + sep, y, r);
  const cheeks = (x, y, sep, r = 3.6) => `<ellipse cx="${x - sep}" cy="${y}" rx="${r}" ry="${r * .7}" fill="#FF8FA3" opacity=".6"/><ellipse cx="${x + sep}" cy="${y}" rx="${r}" ry="${r * .7}" fill="#FF8FA3" opacity=".6"/>`;
  const smile = (x, y, w = 5, c = '#5a3a28') => `<path d="M${x - w} ${y}q${w} ${w * .95} ${w * 2} 0" fill="none" stroke="${c}" stroke-width="1.7" stroke-linecap="round"/>`;
  const el = (cx, cy, rx, ry, f, extra = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${extra}/>`;
  const ci = (cx, cy, r, f, extra = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${extra}/>`;

  Kids.art.add({
    duck: () => S(`${shadow()}
      <path d="M33 86q-6 6 0 7h13q3-3-2-7z M67 86q6 6 0 7H54q-3-3 2-7z" fill="#FF9F43"/>
      ${el(50, 68, 30, 22, '#FFD23F')}${el(50, 74, 18, 13, '#FFE88A')}
      ${el(21, 68, 8, 13, '#F5B800', 'transform="rotate(12 21 68)"')}${el(79, 68, 8, 13, '#F5B800', 'transform="rotate(-12 79 68)"')}
      ${ci(50, 36, 25, '#FFD23F')}
      <path d="M46 12q4-8 8 0-4 2-8 0z M40 14q-2-6 3-6 0 4-3 6z" fill="#F5B800"/>
      ${el(50, 46, 13, 7.5, '#FF9F43')}<path d="M40 46q10 3 20 0" stroke="#D9761C" stroke-width="1.3" fill="none" stroke-linecap="round"/>
      ${eyes(50, 31, 11, 4.2)}${cheeks(50, 42, 20)}`),

    chick: () => S(`${shadow(50, 93, 26)}
      <path d="M36 86q-5 6 0 7h12q2-3-2-7z M64 86q5 6 0 7H52q-2-3 2-7z" fill="#FF9F43"/>
      ${ci(50, 56, 37, '#FFD84D')}${el(50, 70, 22, 16, '#FFEA8C')}
      ${el(15, 62, 7, 12, '#F7C52B', 'transform="rotate(20 15 62)"')}${el(85, 62, 7, 12, '#F7C52B', 'transform="rotate(-20 85 62)"')}
      <path d="M50 20q-8-12-12-6 6 2 8 8zM50 20q2-14 10-10-4 4-6 10zM50 20q10-8 14 0-8 0-12 4z" fill="#F7C52B"/>
      <path d="M42 50q8-3 16 0l-8 9z" fill="#FF9F43"/>
      ${eyes(50, 42, 14, 4.6)}${cheeks(50, 54, 24, 4)}`),

    dog: () => S(`${shadow()}
      <path d="M72 80q18-6 18-24 4 14-4 28-8 4-14-4z" fill="#C98A4B"/>
      ${el(50, 80, 23, 16, '#E8B97A')}${el(50, 84, 12, 11, '#FFF1DC')}
      <path d="M36 90q-4 4 0 4h10v-4z M64 90q4 4 0 4H54v-4z" fill="#D9A25F"/>
      ${el(20, 44, 11, 22, '#9C6030', 'transform="rotate(14 20 44)"')}${el(80, 44, 11, 22, '#9C6030', 'transform="rotate(-14 80 44)"')}
      ${ci(50, 42, 28, '#E8B97A')}
      ${el(50, 34, 6, 10, '#C98A4B')}
      ${el(50, 54, 16, 12.5, '#FFF1DC')}
      ${el(50, 47, 6.5, 4.5, '#3b2a1a')}<path d="M50 51v5M50 56q-6 4-10 0M50 56q6 4 10 0" fill="none" stroke="#5a3a28" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M46 59q4 11 8 0z" fill="#FF7E8F"/>
      ${eyes(50, 35, 13, 4.2)}${cheeks(50, 50, 24)}`),

    cat: () => S(`${shadow()}
      <path d="M74 84q22 0 18-24-2-8 4-8 2 20-4 30-8 8-18 2z" fill="#F29A3A"/>
      ${el(50, 80, 23, 16, '#FFB04D')}${el(50, 84, 11, 10, '#FFE7C4')}
      <path d="M36 90q-4 4 0 4h10v-4z M64 90q4 4 0 4H54v-4z" fill="#F29A3A"/>
      <path d="M17 12l8 30 20-16z M83 12l-8 30-20-16z" fill="#FFB04D"/><path d="M22 20l4 14 9-7z M78 20l-4 14-9-7z" fill="#FF9DB0"/>
      ${el(50, 46, 34, 28, '#FFB04D')}
      <path d="M50 20v9M42 21l2 8M58 21l-2 8M16 48h8M17 56l7-2M84 48h-8M83 56l-7-2" stroke="#E08420" stroke-width="2.4" stroke-linecap="round" fill="none"/>
      ${el(50, 58, 12, 8.5, '#FFE7C4')}
      <path d="M46.5 51h7l-3.500 4.200z" fill="#FF7E9A"/><path d="M50 55q-4 4-8 1M50 55q4 4 8 1" fill="none" stroke="#7a4a28" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M30 56l-14-2M30 60l-13 4M70 56l14-2M70 60l13 4" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".9"/>
      ${eyes(50, 44, 15, 4.6)}${cheeks(50, 56, 25)}`),

    rabbit: () => S(`${shadow()}
      ${ci(82, 82, 7, '#fff')}
      ${el(50, 80, 22, 16, '#F4EEF4')}${el(50, 84, 11, 10, '#fff')}
      <path d="M36 90q-4 4 0 4h10v-4z M64 90q4 4 0 4H54v-4z" fill="#E6DCE8"/>
      ${el(33, 24, 9, 25, '#F4EEF4', 'transform="rotate(-8 33 24)"')}${el(67, 24, 9, 25, '#F4EEF4', 'transform="rotate(8 67 24)"')}
      ${el(33, 25, 4.5, 18, '#FFB3C6', 'transform="rotate(-8 33 25)"')}${el(67, 25, 4.5, 18, '#FFB3C6', 'transform="rotate(8 67 25)"')}
      ${el(50, 54, 30, 25, '#F4EEF4')}
      ${el(50, 61, 10, 7, '#fff')}
      ${el(50, 55, 3.500, 2.600, '#FF8FA3')}<path d="M50 58q-4 4-7 1M50 58q4 4 7 1" fill="none" stroke="#7a5a6a" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M47 63h6v6q-3 1-6 0z" fill="#fff" stroke="#E0D4E2" stroke-width=".8"/>
      ${eyes(50, 49, 14, 4.4)}${cheeks(50, 59, 23)}`),

    mouse: () => S(`${shadow()}
      <path d="M72 84q22 2 20-16-2-10-10-6" fill="none" stroke="#FFB3C6" stroke-width="3" stroke-linecap="round"/>
      ${el(50, 78, 24, 17, '#B9BCC9')}${el(50, 82, 13, 11, '#EEF0F6')}
      <path d="M36 90q-4 4 0 4h10v-4z M64 90q4 4 0 4H54v-4z" fill="#FFB3C6"/>
      ${ci(20, 28, 17, '#B9BCC9')}${ci(20, 28, 11, '#FFB3C6')}${ci(80, 28, 17, '#B9BCC9')}${ci(80, 28, 11, '#FFB3C6')}
      ${el(50, 50, 30, 28, '#B9BCC9')}
      ${el(50, 60, 17, 13, '#EEF0F6')}
      ${el(50, 54, 5, 3.800, '#FF8FA3')}<path d="M50 58q-4 5-8 1M50 58q4 5 8 1" fill="none" stroke="#6a6a7a" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M34 58l-14-3M34 62l-13 5M66 58l14-3M66 62l13 5" stroke="#8a8a9c" stroke-width="1" stroke-linecap="round"/>
      ${eyes(50, 44, 13, 4.4)}${cheeks(50, 56, 22)}`),

    monkey: () => S(`${shadow()}
      <path d="M74 84q22 0 18-22-2-10 6-8" fill="none" stroke="#9C6030" stroke-width="5" stroke-linecap="round"/>
      ${el(50, 80, 22, 16, '#B5703A')}${el(50, 84, 12, 10, '#F2D3A6')}
      <path d="M36 90q-4 4 0 4h10v-4z M64 90q4 4 0 4H54v-4z" fill="#9C6030"/>
      ${ci(15, 42, 12, '#B5703A')}${ci(15, 42, 7, '#F2D3A6')}${ci(85, 42, 12, '#B5703A')}${ci(85, 42, 7, '#F2D3A6')}
      ${ci(50, 42, 31, '#B5703A')}
      <path d="M50 30q-6-6-13-2-8 6-6 18 4 4 8 2 3 8 11 8 8 0 11-8 4 2 8-2 2-12-6-18-7-4-13 2z" fill="#F2D3A6"/>
      ${el(50, 56, 14, 10, '#F8E3C2')}
      ${el(46, 53, 1.500, 1.300, '#7a4a28')}${el(54, 53, 1.500, 1.300, '#7a4a28')}${smile(50, 58, 6)}
      ${eyes(50, 40, 11, 4.2)}${cheeks(50, 51, 21)}`),

    cow: () => S(`${shadow()}
      ${el(50, 80, 24, 16, '#fff', 'stroke="#E3DACB" stroke-width="1.500"')}${ci(36, 78, 7, '#4a3a38')}${ci(66, 84, 6, '#4a3a38')}
      <path d="M36 90q-4 4 0 4h10v-4z M64 90q4 4 0 4H54v-4z" fill="#4a3a38"/>
      <path d="M26 18q-8-6-6-12 8 2 12 10zM74 18q8-6 6-12-8 2-12 10z" fill="#F6E3AE"/>
      ${el(14, 36, 13, 7.500, '#fff', 'transform="rotate(-18 14 36)"')}${el(86, 36, 13, 7.500, '#fff', 'transform="rotate(18 86 36)"')}
      ${el(14, 36, 8, 4, '#FFB3C6', 'transform="rotate(-18 14 36)"')}${el(86, 36, 8, 4, '#FFB3C6', 'transform="rotate(18 86 36)"')}
      ${el(50, 40, 28, 25, '#fff', 'stroke="#E3DACB" stroke-width="1.500"')}
      <path d="M32 18q10-4 18 2-4 10-10 12-10 0-14-6 2-5 6-8z" fill="#4a3a38"/>
      ${el(50, 58, 20, 14, '#FFB3C6')}${el(42, 58, 3, 4, '#B5546E')}${el(58, 58, 3, 4, '#B5546E')}
      ${eyes(50, 38, 15, 4.2)}${cheeks(50, 48, 25)}${smile(50, 66, 5, '#B5546E')}`),

    pig: () => S(`${shadow()}
      <path d="M72 80q12-2 8 8-4-4-10-2" fill="none" stroke="#F58AA8" stroke-width="2.500" stroke-linecap="round"/>
      ${el(50, 80, 24, 16, '#FFB3C6')}${el(50, 84, 12, 10, '#FFD3E0')}
      <path d="M36 90q-4 4 0 4h10v-4z M64 90q4 4 0 4H54v-4z" fill="#F58AA8"/>
      <path d="M18 14l24 10-10 20-14-8z M82 14l-24 10 10 20 14-8z" fill="#F58AA8"/>
      ${ci(50, 48, 32, '#FFB3C6')}
      ${el(50, 58, 14, 10.5, '#FF8FB0')}${el(44, 58, 2.600, 3.800, '#B5546E')}${el(56, 58, 2.600, 3.800, '#B5546E')}
      ${eyes(50, 42, 15, 4.400)}${cheeks(50, 55, 26, 4.200)}${smile(50, 70, 5, '#B5546E')}`),

    horse: () => S(`${shadow()}
      <path d="M28 20l-6-14 14 6zM72 20l6-14-14 6z" fill="#A05F2C"/>
      <path d="M34 12q-18 8-14 36 2 18 10 22l6-30q-2-14 6-22z" fill="#5a3a28"/>
      <path d="M50 8q-14 0-18 16l-4 20q-2 18 4 30h28q6-12 4-30l-4-20Q64 8 50 8z" fill="#C98A4B" transform="translate(0 0)"/>
      <path d="M50 8q-6 0-9 6 6 10 5 22 5-6 12-4 0-12-8-24z" fill="#5a3a28"/>
      ${el(50, 70, 21, 20, '#F3D5A8')}
      ${el(41, 74, 2.800, 4.500, '#8a5a30', 'transform="rotate(10 41 74)"')}${el(59, 74, 2.800, 4.500, '#8a5a30', 'transform="rotate(-10 59 74)"')}
      <path d="M44 85q6 4 12 0" fill="none" stroke="#7a4a28" stroke-width="1.7" stroke-linecap="round"/>
      <path d="M45 28q5-6 10 0l-1 9q-4 3-8 0z" fill="#fff" opacity=".85"/>
      ${eyes(50, 50, 15, 4.300)}${cheeks(50, 62, 22)}`),

    sheep: () => S(`${shadow()}
      <path d="M38 80v12h6V80z M56 80v12h6V80z" fill="#4a3a38"/>
      ${[[50,66,26],[26,62,14],[74,62,14],[34,80,12],[66,80,12],[50,80,10],[30,36,13],[70,36,13],[40,24,13],[60,24,13],[50,22,13]].map(c => ci(c[0], c[1], c[2] + 1.500, '#D9CDB8')).join('')}${[[50,66,26],[26,62,14],[74,62,14],[34,80,12],[66,80,12],[50,80,10],[30,36,13],[70,36,13],[40,24,13],[60,24,13],[50,22,13]].map(c => ci(c[0], c[1], c[2], '#FBF8F2')).join('')}
      ${el(18, 46, 8, 5, '#6a5048', 'transform="rotate(-20 18 46)"')}${el(82, 46, 8, 5, '#6a5048', 'transform="rotate(20 82 46)"')}
      ${el(50, 46, 20, 22, '#6a5048')}
      ${el(50, 56, 9, 6, '#8a6a5e')}${el(50, 52, 3, 2.200, '#3b2a28')}${smile(50, 58, 4.500, '#2b1f1d')}
      ${eyes(50, 42, 10, 4.200)}${cheeks(50, 52, 17, 3.200)}`),

    hen: () => S(`${shadow()}
      <path d="M62 72q22-14 28-34-2 24-8 36z M64 78q26-4 32-22-4 24-22 32z" fill="#E8B97A"/>
      <path d="M40 84v8h-5 M56 84v8h-5" stroke="#FF9F43" stroke-width="3" stroke-linecap="round" fill="none"/>
      ${el(48, 66, 32, 24, '#fff')}${el(48, 66, 32, 24, 'none', 'stroke="#EDE3D3" stroke-width="1.500"')}
      ${el(56, 68, 15, 11, '#F6E3AE', 'transform="rotate(-18 56 68)"')}
      ${ci(36, 38, 22, '#fff')}${ci(36, 38, 22, 'none', 'stroke="#EDE3D3" stroke-width="1.500"')}
      <path d="M26 20q-2-12 4-10 2-6 6 0 4-6 6 2 4 0 2 8-6 8-18 0z" fill="#E8453C"/>
      <path d="M16 38l-10 5 10 5z" fill="#FF9F43"/>
      <path d="M17 49q2 11 8 7-2-5-3-8z" fill="#E8453C"/>
      ${eye(30, 34, 3.800)}${cheeks(36, 46, 8, 3.200)}`),

    frog: () => S(`${shadow()}
      ${el(50, 72, 32, 22, '#6CCB5F')}${el(50, 78, 20, 14, '#C9F0A8')}
      ${el(20, 86, 14, 6, '#6CCB5F')}${el(80, 86, 14, 6, '#6CCB5F')}
      ${ci(28, 28, 16, '#6CCB5F')}${ci(72, 28, 16, '#6CCB5F')}
      ${ci(28, 28, 11, '#fff')}${ci(72, 28, 11, '#fff')}
      ${eye(29, 29, 6.500)}${eye(71, 29, 6.500)}
      ${el(50, 52, 36, 24, '#6CCB5F')}
      <path d="M26 56q24 22 48 0" fill="none" stroke="#2f7a3a" stroke-width="2" stroke-linecap="round"/>
      ${ci(44, 46, 1.300, '#2f7a3a')}${ci(56, 46, 1.300, '#2f7a3a')}
      ${cheeks(50, 55, 27, 4.200)}
      ${ci(30, 70, 3, '#4DAF4A', 'opacity=".6"')}${ci(68, 66, 4, '#4DAF4A', 'opacity=".6"')}`),

    turtle: () => S(`${shadow(50, 91, 38)}
      <path d="M86 76q12 0 10 8-8 0-12-4z" fill="#9BD36B"/>
      ${el(34, 87, 10, 7, '#9BD36B')}${el(72, 87, 10, 7, '#9BD36B')}
      ${el(22, 62, 10, 12, '#9BD36B')}
      ${ci(20, 52, 16, '#9BD36B')}
      <path d="M22 86C20 44 40 36 58 36s34 10 32 50z" fill="#4DAF4A"/>
      <path d="M22 86C20 44 40 36 58 36s34 10 32 50z" fill="none" stroke="#2f7a3a" stroke-width="1.500"/>
      <path d="M44 84l-4-22 18-8 18 8-2 22z M40 62l-12-8 M58 54V40 M76 62l10-10" fill="#6CCB5F" stroke="#2f7a3a" stroke-width="1.800" stroke-linejoin="round"/>
      <path d="M21 84h70v5q-35 6-70 0z" fill="#F2D78A"/>
      ${eye(14, 50, 3.800)}${cheeks(22, 58, 0, 3)}${smile(14, 58, 4)}`),

    bear: () => S(`${shadow()}
      ${el(50, 80, 24, 16, '#B5703A')}${el(50, 84, 12, 10, '#E8C99A')}
      <path d="M36 90q-4 4 0 4h10v-4z M64 90q4 4 0 4H54v-4z" fill="#8a5428"/>
      ${ci(22, 22, 13, '#B5703A')}${ci(22, 22, 7, '#E8C99A')}${ci(78, 22, 13, '#B5703A')}${ci(78, 22, 7, '#E8C99A')}
      ${ci(50, 46, 33, '#B5703A')}
      ${el(50, 58, 15, 12, '#E8C99A')}${el(50, 52, 6, 4.200, '#3b2a1a')}
      <path d="M50 56v4M50 60q-5 5-9 1M50 60q5 5 9 1" fill="none" stroke="#5a3a28" stroke-width="1.600" stroke-linecap="round"/>
      ${eyes(50, 41, 15, 4.300)}${cheeks(50, 56, 27)}`),

    lion: () => S(`${shadow()}
      <path d="M72 84q20-2 18-22 0-6 5-6" fill="none" stroke="#E89A2B" stroke-width="3.500" stroke-linecap="round"/>${ci(95, 54, 4, '#B5541E')}
      ${el(50, 80, 22, 16, '#FFC95A')}${el(50, 84, 11, 10, '#FFE7B0')}
      <path d="M36 90q-4 4 0 4h10v-4z M64 90q4 4 0 4H54v-4z" fill="#E89A2B"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => { const a = i * 30 * Math.PI / 180; return ci((50 + 33 * Math.cos(a)).toFixed(1), (46 + 33 * Math.sin(a)).toFixed(1), 13, i % 2 ? '#C9701E' : '#B5541E'); }).join('')}
      ${ci(50, 46, 30, '#B5541E')}
      ${ci(26, 24, 8, '#FFC95A')}${ci(74, 24, 8, '#FFC95A')}${ci(26, 24, 4.500, '#FFB3C6')}${ci(74, 24, 4.500, '#FFB3C6')}
      ${ci(50, 48, 25, '#FFC95A')}
      ${el(50, 57, 12, 9, '#FFE7B0')}<path d="M45 50h10l-5 6z" fill="#B5541E"/>
      <path d="M50 55q-4 5-8 1M50 55q4 5 8 1" fill="none" stroke="#7a4a28" stroke-width="1.600" stroke-linecap="round"/>
      ${eyes(50, 43, 11, 4.200)}${cheeks(50, 54, 20, 3.400)}`),

    fox: () => S(`${shadow()}
      <path d="M70 84q26 4 24-26-2 16-12 14-6 4-12 12z" fill="#F2762E"/><path d="M92 62q4 14-8 22-6-6-2-10 8 0 10-12z" fill="#fff"/>
      ${el(50, 82, 20, 14, '#F2762E')}${el(50, 85, 10, 9, '#FFF3E4')}
      <path d="M36 90q-4 4 0 4h10v-4z M64 90q4 4 0 4H54v-4z" fill="#4a2c1c"/>
      <path d="M12 8l6 38 26-18z M88 8l-6 38-26-18z" fill="#F2762E"/><path d="M18 18l3 18 11-8z M82 18l-3 18-11-8z" fill="#4a2c1c"/>
      <path d="M8 56Q8 28 50 28t42 28Q86 82 50 84 14 82 8 56z" fill="#F2762E"/>
      <path d="M8 56Q22 50 38 62 46 70 50 72 54 70 62 62 78 50 92 56 86 82 50 84 14 82 8 56z" fill="#FFF3E4"/>
      ${el(50, 63, 4.500, 3.500, '#2b2118')}<path d="M50 66q-4 4-8 1M50 66q4 4 8 1" fill="none" stroke="#5a3a28" stroke-width="1.500" stroke-linecap="round"/>
      ${eyes(50, 47, 16, 4.200)}${cheeks(50, 58, 26, 3.400)}`),

    owl: () => S(`${shadow()}
      <path d="M36 88v5h-5M44 88v5M56 88v5M64 88v5h5" stroke="#FF9F43" stroke-width="3.200" stroke-linecap="round" fill="none"/>
      <path d="M14 18l12 10 6-14z M86 18l-12 10-6-14z" fill="#8a5a38"/>
      ${el(50, 56, 38, 36, '#A9744A')}
      ${el(50, 72, 22, 18, '#F2DDB8')}
      ${[0, 1, 2].map(r => [0, 1, 2].map(c => `<path d="M${38 + c * 12 + (r % 2) * 4} ${66 + r * 7}q3 3 6 0" fill="none" stroke="#D9BC8C" stroke-width="1.400" stroke-linecap="round"/>`).join('')).join('')}
      ${el(14, 62, 8, 20, '#8a5a38', 'transform="rotate(8 14 62)"')}${el(86, 62, 8, 20, '#8a5a38', 'transform="rotate(-8 86 62)"')}
      ${ci(32, 44, 16, '#F2DDB8')}${ci(68, 44, 16, '#F2DDB8')}
      ${ci(32, 44, 16, 'none', 'stroke="#D9BC8C" stroke-width="1.500"')}${ci(68, 44, 16, 'none', 'stroke="#D9BC8C" stroke-width="1.500"')}
      ${eye(32, 44, 8)}${eye(68, 44, 8)}
      <path d="M44 52h12l-6 11z" fill="#FF9F43"/>
      ${cheeks(50, 58, 25, 3.500)}`),

    elephant: () => S(`${shadow()}
      <path d="M76 76q14-4 10 10 0-6-8-4z" fill="none" stroke="#8FA3B8" stroke-width="2.500" stroke-linecap="round"/>
      ${el(50, 80, 26, 16, '#A9BDD1')}
      <path d="M32 88h10v6H32z M58 88h10v6H58z" fill="#8FA3B8"/>
      ${el(16, 44, 17, 25, '#8FA3B8')}${el(16, 44, 10, 17, '#F6B8C6')}${el(84, 44, 17, 25, '#8FA3B8')}${el(84, 44, 10, 17, '#F6B8C6')}
      ${ci(50, 44, 28, '#A9BDD1')}
      <path d="M40 54q-2 28 -6 30 -3 4 2 6 4 0 6-6 4-10 6-24zM60 54q2 28 6 30 3 4-2 6-4 0-6-6-4-10-6-24z" fill="none"/>
      <path d="M40 52h20q2 26-4 36-3 6-8 2-2-4 2-8 2-12-2-22z" fill="#A9BDD1"/>
      <path d="M50 58q0 18-2 24" fill="none" stroke="#8FA3B8" stroke-width="1.200" stroke-linecap="round"/>
      ${eyes(50, 40, 12, 4.200)}${cheeks(50, 52, 23, 3.800)}`),

    parrot: () => S(`${shadow(50, 94, 24)}
      <path d="M52 66q-6 22 4 26 10 2 10-4-4-4-4-22z" fill="#2E9BE0"/><path d="M58 70q0 16 6 20" stroke="#F4C21F" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M36 86v7h-5M48 86v7h-5" stroke="#FF9F43" stroke-width="3.200" stroke-linecap="round" fill="none"/>
      ${el(46, 62, 28, 28, '#E8453C')}${el(40, 68, 14, 18, '#FF8A7A')}
      ${el(66, 62, 10, 18, '#2E9BE0', 'transform="rotate(-10 66 62)"')}<path d="M62 70q4 8 10 4" fill="none" stroke="#F4C21F" stroke-width="3" stroke-linecap="round"/>
      ${ci(44, 32, 22, '#E8453C')}
      <path d="M44 10q-4-8 4-8-2 4 2 6 6-4 10 0-6 0-8 6z" fill="#F4C21F"/>
      ${ci(40, 32, 11, '#fff')}
      <path d="M52 30q18-4 22 12-2 8-10 6-6-4-6-10z" fill="#FFD23F"/><path d="M52 30q18-4 22 12" fill="none" stroke="#E89A2B" stroke-width="1.500"/>
      ${eye(40, 31, 5)}${cheeks(44, 42, 0, 3.200)}`),

    penguin: () => S(`${shadow()}
      <path d="M30 88q-6 6 2 6h12q2-4-2-6z M70 88q6 6-2 6H56q-2-4 2-6z" fill="#FF9F43"/>
      ${el(50, 56, 34, 38, '#2D3E5E')}
      ${el(14, 60, 8, 20, '#26354F', 'transform="rotate(14 14 60)"')}${el(86, 60, 8, 20, '#26354F', 'transform="rotate(-14 86 60)"')}
      ${el(50, 64, 22, 28, '#fff')}
      <path d="M26 40q24 24 48 0 8-30-24-32-32 2-24 32z" fill="#2D3E5E"/>
      <path d="M32 38q8-12 18-4 10-8 18 4 -2 12-18 18-16-6-18-18z" fill="#fff"/>
      <path d="M42 44h16l-8 10z" fill="#FF9F43"/>
      ${eyes(50, 36, 11, 4)}${cheeks(50, 48, 19, 3.600)}`),

    polarbear: () => S(`${shadow()}
      ${el(50, 80, 24, 16, '#F4F8FC')}${el(50, 80, 24, 16, 'none', 'stroke="#D5E3F0" stroke-width="1.500"')}
      <path d="M36 90q-4 4 0 4h10v-4z M64 90q4 4 0 4H54v-4z" fill="#D5E3F0"/>
      ${ci(22, 22, 13, '#F4F8FC')}${ci(22, 22, 7, '#BFD8EE')}${ci(78, 22, 13, '#F4F8FC')}${ci(78, 22, 7, '#BFD8EE')}
      ${ci(50, 46, 33, '#F4F8FC')}${ci(50, 46, 33, 'none', 'stroke="#D5E3F0" stroke-width="1.500"')}
      ${el(50, 58, 15, 12, '#fff')}${el(50, 52, 6, 4.200, '#2b2f3a')}
      <path d="M50 56v4M50 60q-5 5-9 1M50 60q5 5 9 1" fill="none" stroke="#4a5568" stroke-width="1.600" stroke-linecap="round"/>
      ${eyes(50, 41, 15, 4.300)}${cheeks(50, 56, 27)}`),

    dolphin: () => S(`<ellipse cx="50" cy="93" rx="30" ry="3.800" fill="#1a4a6a" opacity=".14"/>
      <path d="M86 56Q92 40 98 40 96 52 98 66 90 70 86 56z" fill="#4C9BE8"/>
      <path d="M38 36Q44 14 58 20 50 26 50 40z" fill="#4C9BE8"/>
      <path d="M6 48Q4 36 20 32Q46 26 66 46 76 58 90 56 86 72 66 76 36 84 20 66 8 60 6 48z" fill="#5BA8F0"/>
      <path d="M8 54Q14 64 24 68 42 80 68 74 80 70 86 62 66 70 42 68 24 62 14 58 8 54z" fill="#E3F1FF"/>
      <path d="M40 70q-4 14 6 20 4-8 8-18z" fill="#4C9BE8"/>
      ${eye(22, 44, 4.200)}${cheeks(28, 54, 0, 3.400)}
      <path d="M8 52q8 8 18 6" fill="none" stroke="#2b5a8a" stroke-width="1.800" stroke-linecap="round"/>
      ${ci(12, 22, 3, '#fff', 'fill-opacity=".5" stroke="#8cc8f0" stroke-width="1"')}${ci(20, 14, 2, '#fff', 'fill-opacity=".5" stroke="#8cc8f0" stroke-width="1"')}`),

    fish: () => S(`<ellipse cx="50" cy="93" rx="28" ry="3.500" fill="#1a4a6a" opacity=".12"/>
      <path d="M72 50q20-24 22-26 4 26 0 52-4-6-22-26z" fill="#FF8A3D" transform="translate(-4 0)"/>
      <path d="M40 26q10-12 24-4-4 8-4 10z M42 76q10 12 22 6-4-8-4-10z" fill="#FF8A3D"/>
      ${el(46, 50, 36, 28, '#FFA24D')}
      <path d="M52 24q-10 26 0 52M64 28q-8 22 0 44" fill="none" stroke="#FF7A2E" stroke-width="4.500" stroke-linecap="round" opacity=".5"/>
      ${el(40, 62, 20, 10, '#FFD7A8', 'opacity=".7"')}
      <path d="M44 50q10 18 22 0" fill="none"/>
      ${ci(28, 42, 7, '#fff')}${eye(27, 42, 4.600)}
      <path d="M12 52q5 6 11 3" fill="none" stroke="#B5541E" stroke-width="1.800" stroke-linecap="round"/>
      ${cheeks(34, 54, 0, 3.400)}
      ${ci(10, 28, 3, '#fff', 'fill-opacity=".5" stroke="#8cc8f0" stroke-width="1"')}${ci(16, 16, 2, '#fff', 'fill-opacity=".5" stroke="#8cc8f0" stroke-width="1"')}`),

    crab: () => S(`${shadow()}
      <path d="M26 66l-14 8M28 72l-12 12M74 66l14 8M72 72l12 12M34 76l-6 14M66 76l6 14" stroke="#E8453C" stroke-width="5" stroke-linecap="round"/>
      <path d="M26 54Q10 50 8 34q-2-14 12-14 6 8 6 14 6 0 6 8z" fill="#F2593F"/>
      <path d="M74 54q16-4 18-20 2-14-12-14-6 8-6 14-6 0-6 8z" fill="#F2593F"/>
      <path d="M12 22l8 8M88 22l-8 8" stroke="#FFD0C4" stroke-width="0"/>
      <path d="M8 34l-2-14 10 4z M92 34l2-14-10 4z" fill="#F2593F"/>
      ${el(50, 66, 34, 24, '#F2593F')}${el(50, 74, 22, 12, '#FF8A70', 'opacity=".5"')}
      <path d="M38 48v-10M62 48v-10" stroke="#F2593F" stroke-width="4" stroke-linecap="round"/>
      ${ci(38, 34, 8, '#fff')}${ci(62, 34, 8, '#fff')}${eye(38, 34, 4.500)}${eye(62, 34, 4.500)}
      ${smile(50, 64, 8, '#7a2418')}${cheeks(50, 64, 22, 4)}`),

    whale: () => S(`<ellipse cx="50" cy="93" rx="32" ry="3.800" fill="#1a4a6a" opacity=".12"/>
      <path d="M40 22q-6-8 0-12 4 4 4 12zM48 22q4-12 12-10-2 8-8 12z" fill="none" stroke="#9AD7F7" stroke-width="3" stroke-linecap="round"/>
      <path d="M84 40q14-12 10-26 -10 4-12 18z M84 40q4-4 16 0-8 8-14 12z" fill="#3E7FD0"/>
      <path d="M8 62Q6 32 38 28q36-2 50 22 4 22-8 32Q50 98 20 82 8 74 8 62z" fill="#4C93E8"/>
      <path d="M12 70q36 18 70 4 4-6 4-10-30 18-74 6z" fill="#E3F1FF"/>
      <path d="M44 66q8 8 18 6-6 8-18 0z" fill="#3E7FD0"/>
      ${eye(28, 56, 4.500)}${cheeks(20, 66, 0, 3.800)}
      <path d="M14 66q12 12 28 4" fill="none" stroke="#1f4a8a" stroke-width="1.800" stroke-linecap="round"/>`),

    bird: () => S(`${shadow(50, 94, 26)}
      <path d="M72 62l22 8-8 6 10 4-24 2z" fill="#2E7FC0"/>
      <path d="M38 84v8h-5M50 84v8h-5" stroke="#FF9F43" stroke-width="3" stroke-linecap="round" fill="none"/>
      ${el(50, 62, 30, 24, '#5BB5F0')}${el(44, 72, 18, 12, '#E6F5FF')}
      ${el(60, 62, 14, 10, '#2E9BE0', 'transform="rotate(20 60 62)"')}
      ${ci(36, 38, 22, '#5BB5F0')}
      <path d="M32 18q-2-8 4-8 0 4 2 6 4-4 6 0-6 0-8 6z" fill="#2E9BE0"/>
      <path d="M16 36l-12 4 12 5z" fill="#FFB02E"/>
      ${eye(34, 34, 4.600)}${cheeks(38, 46, 0, 3.500)}`),

    butterfly: () => S(`<ellipse cx="50" cy="94" rx="24" ry="3" fill="#3b2a1a" opacity=".12"/>
      <path d="M50 46Q36 6 10 14q-8 22 18 34z" fill="#FF8FB8"/><path d="M50 46Q64 6 90 14q8 22-18 34z" fill="#FF8FB8"/>
      <path d="M50 54Q26 50 16 72q4 18 24 12 10-4 10-30z" fill="#B58CF0"/><path d="M50 54q24-4 34 18-4 18-24 12-10-4-10-30z" fill="#B58CF0"/>
      ${ci(26, 26, 7, '#FFD0E2')}${ci(74, 26, 7, '#FFD0E2')}${ci(30, 70, 5.500, '#E0CCFA')}${ci(70, 70, 5.500, '#E0CCFA')}
      ${ci(24, 26, 2.500, '#fff')}${ci(72, 26, 2.500, '#fff')}
      ${el(50, 54, 6, 26, '#5a3a58')}${ci(50, 28, 8, '#5a3a58')}
      <path d="M46 22q-6-12-10-12M54 22q6-12 10-12" stroke="#5a3a58" stroke-width="2" stroke-linecap="round" fill="none"/>${ci(36, 10, 2.500, '#5a3a58')}${ci(64, 10, 2.500, '#5a3a58')}
      ${eyes(50, 28, 3.200, 2.300)}${smile(50, 33, 2.500, '#fff')}`),

    bee: () => S(`<ellipse cx="50" cy="93" rx="24" ry="3.500" fill="#3b2a1a" opacity=".12"/>
      ${el(30, 24, 14, 20, '#DDF1FF', 'transform="rotate(-25 30 24)" opacity=".9"')}${el(70, 24, 14, 20, '#DDF1FF', 'transform="rotate(25 70 24)" opacity=".9"')}
      <path d="M50 78l0 14" stroke="#3b2a28" stroke-width="3" stroke-linecap="round"/>
      <path d="M34 76q16 18 32 0z" fill="none"/>
      <path d="M44 84l6 10 6-10z" fill="#3b2a28"/>
      ${el(50, 64, 30, 24, '#FFD23F')}
      <path d="M36 44q-4 20 0 40M50 40v48M64 44q4 20 0 40" fill="none" stroke="#3b2a28" stroke-width="7"/>
      <clipPath id="bee-c"><ellipse cx="50" cy="64" rx="30" ry="24"/></clipPath>
      ${ci(50, 40, 24, '#FFD23F')}
      <path d="M40 18q-6-10-12-8M60 18q6-10 12-8" stroke="#3b2a28" stroke-width="2" stroke-linecap="round" fill="none"/>${ci(28, 10, 3, '#3b2a28')}${ci(72, 10, 3, '#3b2a28')}
      ${eyes(50, 38, 10, 4.400)}${cheeks(50, 48, 18, 3.500)}${smile(50, 49, 4)}`),

    giraffe: () => S(`${shadow()}
      <path d="M72 82q14-6 12-20 4 14-2 24z" fill="#E8A63A"/>
      <path d="M38 40h24l6 40H32z" fill="#FFCF5A"/>
      ${el(50, 80, 26, 14, '#FFCF5A')}
      <path d="M32 88h9v6h-9z M59 88h9v6h-9z" fill="#B5541E"/>
      ${ci(42, 60, 5, '#C9701E')}${ci(58, 70, 5, '#C9701E')}${ci(44, 82, 5.500, '#C9701E')}${ci(64, 84, 4, '#C9701E')}${ci(56, 50, 4, '#C9701E')}
      <path d="M34 12v-8M66 12v-8" stroke="#B5541E" stroke-width="2.500" stroke-linecap="round"/>${ci(34, 4, 3.200, '#B5541E')}${ci(66, 4, 3.200, '#B5541E')}
      ${el(22, 22, 9, 5, '#FFCF5A', 'transform="rotate(-20 22 22)"')}${el(78, 22, 9, 5, '#FFCF5A', 'transform="rotate(20 78 22)"')}
      ${el(50, 28, 25, 22, '#FFCF5A')}
      ${ci(40, 14, 3.500, '#C9701E')}${ci(60, 12, 3, '#C9701E')}
      ${el(50, 38, 16, 11, '#FFE7B0')}${el(44, 38, 1.800, 2.200, '#8a5a30')}${el(56, 38, 1.800, 2.200, '#8a5a30')}${smile(50, 43, 5)}
      ${eyes(50, 25, 13, 4)}${cheeks(50, 34, 23, 3.200)}`)
  });
})();
