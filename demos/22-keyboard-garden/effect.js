// 夏夏的AI灵感 · 字母花园。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
(() => {
  const W = 1200;
const H = 900;
const S = 1.2;
const TAU = Math.PI * 2;

const clamp = (v, lo = 0, hi = 1) => (v < lo ? lo : v > hi ? hi : v);
const mix = (a, b, t) => a + (b - a) * t;
const range = (v, a, b) => clamp((v - a) / (b - a || 1e-6));
const smooth = (t) => {
  const x = clamp(t);
  return x * x * (3 - 2 * x);
};
const smoother = (t) => {
  const x = clamp(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
};
const easeOutCubic = (t) => 1 - (1 - clamp(t)) ** 3;
const easeOutBack = (t, s = 1.35) => {
  const x = clamp(t) - 1;
  return 1 + (s + 1) * x * x * x + s * x * x;
};
const hash = (n) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
};

function parseHex(hex) {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}
function lerpColor(hexA, hexB, t, alpha = 1) {
  const a = parseHex(hexA);
  const b = parseHex(hexB);
  const u = clamp(t);
  const r = Math.round(mix(a[0], b[0], u));
  const g = Math.round(mix(a[1], b[1], u));
  const bl = Math.round(mix(a[2], b[2], u));
  return alpha >= 0.999 ? `rgb(${r},${g},${bl})` : `rgba(${r},${g},${bl},${alpha.toFixed(4)})`;
}
function rgba(hex, a) {
  const [r, g, b] = parseHex(hex);
  return `rgba(${r},${g},${b},${clamp(a).toFixed(4)})`;
}

function resetCtx(g) {
  g.setTransform(S, 0, 0, S, 0, 0);
  g.globalAlpha = 1;
  g.globalCompositeOperation = "source-over";
  g.shadowBlur = 0;
  g.shadowOffsetX = 0;
  g.shadowOffsetY = 0;
  g.shadowColor = "transparent";
  g.lineCap = "butt";
  g.lineJoin = "miter";
  g.lineWidth = 1;
}

// ---------------- 共享 32 键 QWERTY 布局 ----------------
const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Shift", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ["Mode", "Emoji", "Space", "Enter"],
];
const ALL_KEYS = ROWS.flat();
const KEY_UNITS = {
  Shift: 1.42,
  Backspace: 1.42,
  Mode: 1.32,
  Emoji: 1.05,
  Space: 5.36,
  Enter: 2.27,
};

function buildKeyLayout(x, y, w, h, gap = 11, rowGap = 10) {
  const map = {};
  const pitch = (w + gap) / 10;
  const rowH = (h - 3 * rowGap) / 4;
  ROWS.forEach((row, r) => {
    const units = row.map((k) => KEY_UNITS[k] ?? 1);
    const totalW = units.reduce((a, b) => a + b, 0) * pitch - gap;
    let cx = x + (w - totalW) / 2;
    row.forEach((id, j) => {
      const kw = units[j] * pitch - gap;
      map[id] = {
        id,
        row: r,
        col: j,
        x: cx + kw / 2,
        y: y + (rowH + rowGap) * r + rowH / 2,
        w: kw,
        h: rowH,
      };
      cx += units[j] * pitch;
    });
  });
  return map;
}

const MAIN_KEYS = buildKeyLayout(182, 574, 836, 224, 11, 10);
const INTRO_KEYS = buildKeyLayout(192, 488, 816, 286, 12, 13);



// ---------------- 离线确定性纹理 ----------------
function createPaperTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const g = c.getContext("2d");
  const img = g.createImageData(256, 256);
  const d = img.data;
  for (let i = 0; i < 256 * 256; i++) {
    const n = (hash(i * 1.13 + 7.9) - 0.5) * 26;
    const v = clamp(128 + n, 0, 255);
    d[i * 4] = v;
    d[i * 4 + 1] = v - 2;
    d[i * 4 + 2] = v - 6;
    d[i * 4 + 3] = 17;
  }
  g.putImageData(img, 0, 0);
  g.strokeStyle = "rgba(120, 108, 90, 0.045)";
  g.lineWidth = 0.7;
  for (let i = 0; i < 42; i++) {
    const x = hash(i * 13.7) * 256;
    const y = hash(i * 29.3) * 256;
    const len = 8 + hash(i * 41.1) * 18;
    const ang = hash(i * 53.9) * TAU;
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    g.stroke();
  }
  return c;
}

function createStarfieldTexture() {
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d");
  g.clearRect(0, 0, W, H);
  for (let i = 0; i < 165; i++) {
    const x = hash(i * 17.3 + 1.1) * W;
    const y = hash(i * 31.7 + 2.3) * H;
    const r = 0.5 + Math.pow(hash(i * 47.9), 2.8) * 1.9;
    const a = 0.14 + hash(i * 71.3) * 0.55;
    const tint = i % 5 === 0 ? "#93c5fd" : i % 7 === 0 ? "#f5d0fe" : i % 9 === 0 ? "#fde68a" : "#ffffff";
    g.fillStyle = rgba(tint, a);
    g.beginPath();
    g.arc(x, y, r, 0, TAU);
    g.fill();
  }
  return c;
}

// ---------------- 公共图形工具 ----------------
function drawKeyIcon(g, id, x, y, scale, color, lineWidth = 1.9) {
  g.save();
  g.translate(x, y);
  g.scale(scale, scale);
  g.strokeStyle = color;
  g.fillStyle = color;
  g.lineWidth = lineWidth;
  g.lineCap = "round";
  g.lineJoin = "round";
  if (id === "Shift") {
    g.beginPath();
    g.moveTo(0, -10);
    g.lineTo(11, 1);
    g.lineTo(5.5, 1);
    g.lineTo(5.5, 9);
    g.lineTo(-5.5, 9);
    g.lineTo(-5.5, 1);
    g.lineTo(-11, 1);
    g.closePath();
    g.stroke();
  } else if (id === "Backspace") {
    g.beginPath();
    g.moveTo(-14, 0);
    g.lineTo(-6, -8.5);
    g.lineTo(10.5, -8.5);
    g.quadraticCurveTo(13.5, -8.5, 13.5, -5.5);
    g.lineTo(13.5, 5.5);
    g.quadraticCurveTo(13.5, 8.5, 10.5, 8.5);
    g.lineTo(-6, 8.5);
    g.closePath();
    g.stroke();
    g.beginPath();
    g.moveTo(-2, -3.5);
    g.lineTo(5, 3.5);
    g.moveTo(5, -3.5);
    g.lineTo(-2, 3.5);
    g.stroke();
  } else if (id === "Emoji") {
    g.beginPath();
    g.arc(0, 0, 9.5, 0, TAU);
    g.stroke();
    g.beginPath();
    g.arc(-3.4, -2.4, 1.15, 0, TAU);
    g.arc(3.4, -2.4, 1.15, 0, TAU);
    g.fill();
    g.beginPath();
    g.arc(0, 0.5, 4.8, 0.22 * Math.PI, 0.78 * Math.PI);
    g.stroke();
  } else if (id === "Space") {
    g.beginPath();
    g.moveTo(-16, -1.5);
    g.lineTo(-16, 3.5);
    g.lineTo(16, 3.5);
    g.lineTo(16, -1.5);
    g.stroke();
  } else if (id === "Enter") {
    g.beginPath();
    g.moveTo(10, -7);
    g.lineTo(10, 0);
    g.quadraticCurveTo(10, 3.5, 6.5, 3.5);
    g.lineTo(-10, 3.5);
    g.moveTo(-5.5, -1.5);
    g.lineTo(-10.5, 3.5);
    g.lineTo(-5.5, 8.5);
    g.stroke();
  }
  g.restore();
}

function drawStageHeader(g, indexText, title, subtitle, darkTheme, accentHex, alphaVal, yShift = 0) {
  if (alphaVal <= 0.002) return;
  g.save();
  g.globalAlpha *= clamp(alphaVal);
  g.translate(0, yShift);
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = '500 13px "GeistMono", "Outfit", sans-serif';
  g.fillStyle = rgba(accentHex, 0.85);
  g.fillText(`${indexText}  ·  ${subtitle}`, W / 2, 54);

  g.font = darkTheme
    ? '600 36px "Hiragino Sans GB", "PingFang SC", sans-serif'
    : '500 36px "Hiragino Sans GB", "PingFang SC", "STSong", serif';
  if (darkTheme) {
    g.shadowColor = rgba(accentHex, 0.34);
    g.shadowBlur = 18;
    g.fillStyle = "#f4f7fb";
  } else {
    g.shadowColor = "rgba(0,0,0,0.06)";
    g.shadowBlur = 6;
    g.fillStyle = indexText === "01" ? "#543946" : "#253b2c";
  }
  g.fillText(title, W / 2, 98);
  g.restore();
}

function drawGlowBlob(g, x, y, r, hex, alphaVal) {
  if (alphaVal <= 0.002 || r <= 1) return;
  const grad = g.createRadialGradient(x, y, 0, x, y, r);
  grad.addColorStop(0, rgba(hex, alphaVal));
  grad.addColorStop(0.45, rgba(hex, alphaVal * 0.42));
  grad.addColorStop(1, rgba(hex, 0));
  g.fillStyle = grad;
  g.beginPath();
  g.arc(x, y, r, 0, TAU);
  g.fill();
}

function drawHeart(g, x, y, size, color, alphaVal = 1) {
  g.save();
  g.globalAlpha *= clamp(alphaVal);
  g.translate(x, y);
  g.scale(size, size);
  g.fillStyle = color;
  g.beginPath();
  g.moveTo(0, 0.35);
  g.bezierCurveTo(-0.08, -0.22, -0.92, -0.34, -0.92, 0.22);
  g.bezierCurveTo(-0.92, 0.68, -0.25, 0.96, 0, 1.2);
  g.bezierCurveTo(0.25, 0.96, 0.92, 0.68, 0.92, 0.22);
  g.bezierCurveTo(0.92, -0.34, 0.08, -0.22, 0, 0.35);
  g.closePath();
  g.fill();
  g.restore();
}

function drawSparkle(g, x, y, r, color, alphaVal = 1) {
  g.save();
  g.globalAlpha *= clamp(alphaVal);
  g.translate(x, y);
  g.fillStyle = color;
  g.beginPath();
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2;
    g.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    g.lineTo(Math.cos(a + Math.PI / 4) * r * 0.28, Math.sin(a + Math.PI / 4) * r * 0.28);
  }
  g.closePath();
  g.fill();
  g.restore();
}

// =========================================================================

  const DEMO_TIMELINE = {
  "garden": {
    "index": "02",
    "title": "字母花园",
    "subtitle": "TYPE GARDEN",
    "keys": [
      "G",
      "R",
      "O",
      "W",
      "Backspace",
      "W"
    ],
    "press": [
      525,
      540,
      570,
      600,
      660,
      705
    ]
  }
};

  function drawBotanicalFlower(g, x, y, type, openT, wind) {
  if (openT <= 0.01) return;
  g.save();
  g.translate(x, y);
  g.rotate(wind * 0.12);
  const sc = easeOutBack(openT, 1.45);
  g.scale(sc, sc);

  if (type === "poppy") {
    for (let i = 0; i < 5; i++) {
      g.save();
      g.rotate((i / 5) * TAU - Math.PI / 2);
      const pg = g.createRadialGradient(0, -14, 2, 0, -18, 26);
      pg.addColorStop(0, "#f59e56");
      pg.addColorStop(0.55, "#e05a36");
      pg.addColorStop(1, "#b8361c");
      g.fillStyle = pg;
      g.beginPath();
      g.ellipse(0, -17, 15.5, 19, 0, 0, TAU);
      g.fill();
      g.restore();
    }
    g.fillStyle = "#3a251c";
    g.beginPath();
    g.arc(0, 0, 9, 0, TAU);
    g.fill();
    g.fillStyle = "#f4c96b";
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * TAU;
      g.beginPath();
      g.arc(Math.cos(a) * 10.5, Math.sin(a) * 10.5, 2.1, 0, TAU);
      g.fill();
    }
  } else if (type === "anemone") {
    for (let i = 0; i < 6; i++) {
      g.save();
      g.rotate((i / 6) * TAU - Math.PI / 6);
      const pg = g.createLinearGradient(0, 0, 0, -36);
      pg.addColorStop(0, "#5c4d9e");
      pg.addColorStop(0.6, "#8574c7");
      pg.addColorStop(1, "#b7a7eb");
      g.fillStyle = pg;
      g.beginPath();
      g.ellipse(0, -19, 13, 19.5, 0, 0, TAU);
      g.fill();
      g.restore();
    }
    g.fillStyle = "#2d224f";
    g.beginPath();
    g.arc(0, 0, 9.5, 0, TAU);
    g.fill();
    g.fillStyle = "#e7d8ff";
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * TAU;
      g.beginPath();
      g.arc(Math.cos(a) * 12, Math.sin(a) * 12, 1.8, 0, TAU);
      g.fill();
    }
  } else if (type === "daisy") {
    for (let i = 0; i < 12; i++) {
      g.save();
      g.rotate((i / 12) * TAU);
      const pg = g.createLinearGradient(0, -6, 0, -34);
      pg.addColorStop(0, "#efe6cc");
      pg.addColorStop(1, "#fffdf8");
      g.fillStyle = pg;
      g.strokeStyle = "rgba(180, 168, 138, 0.35)";
      g.lineWidth = 0.9;
      g.beginPath();
      g.ellipse(0, -21, 5.6, 15.5, 0, 0, TAU);
      g.fill();
      g.stroke();
      g.restore();
    }
    const cg = g.createRadialGradient(-3, -3, 2, 0, 0, 12.5);
    cg.addColorStop(0, "#ffe066");
    cg.addColorStop(1, "#d99220");
    g.fillStyle = cg;
    g.beginPath();
    g.arc(0, 0, 11.5, 0, TAU);
    g.fill();
  } else {
    const isGold = type === "gold";
    const cOut1 = isGold ? "#f7c454" : "#eb6562", cOut2 = isGold ? "#cf7c16" : "#b82d35";
    const cIn1 = isGold ? "#ffe48f" : "#f7978f", cIn2 = isGold ? "#e39522" : "#cf4148";
    for (let i = 0; i < 8; i++) {
      g.save();
      g.rotate((i / 8) * TAU);
      const pg = g.createRadialGradient(0, -14, 2, 0, -18, 24);
      pg.addColorStop(0, cOut1);
      pg.addColorStop(1, cOut2);
      g.fillStyle = pg;
      g.beginPath();
      g.ellipse(0, -18, 13.5, 17, 0, 0, TAU);
      g.fill();
      g.restore();
    }
    for (let i = 0; i < 6; i++) {
      g.save();
      g.rotate((i / 6) * TAU + 0.3);
      const pg = g.createRadialGradient(0, -9, 1, 0, -12, 16);
      pg.addColorStop(0, cIn1);
      pg.addColorStop(1, cIn2);
      g.fillStyle = pg;
      g.beginPath();
      g.ellipse(0, -11, 9.5, 12, 0, 0, TAU);
      g.fill();
      g.restore();
    }
    g.fillStyle = isGold ? "#6b3e12" : "#f8d36f";
    g.beginPath();
    g.arc(0, 0, 6.2, 0, TAU);
    g.fill();
  }
  g.restore();
}

function drawPlantStemAndLeaves(g, baseX, baseY, height, sway, growT, seed) {
  if (growT <= 0.01) return { tipX: baseX, tipY: baseY };
  const h = height * easeOutCubic(growT);
  const cpx = baseX + (seed % 2 === 0 ? -18 : 18) + sway * 10;
  const cpy = baseY - h * 0.52;
  const tipX = baseX + sway * 16;
  const tipY = baseY - h;

  const sg = g.createLinearGradient(baseX, baseY, tipX, tipY);
  sg.addColorStop(0, "#35553b");
  sg.addColorStop(1, "#628b59");
  g.strokeStyle = sg;
  g.lineWidth = 3.6;
  g.lineCap = "round";
  g.beginPath();
  g.moveTo(baseX, baseY);
  g.quadraticCurveTo(cpx, cpy, tipX, tipY);
  g.stroke();

  [0.3, 0.52, 0.74].forEach((r, idx) => {
    const lt = clamp((growT - r * 0.6) / 0.35);
    if (lt <= 0.01) return;
    const lx = (1 - r) * (1 - r) * baseX + 2 * (1 - r) * r * cpx + r * r * tipX;
    const ly = (1 - r) * (1 - r) * baseY + 2 * (1 - r) * r * cpy + r * r * tipY;
    for (const side of [-1, 1]) {
      const lSize = (18 - idx * 2.2) * easeOutBack(lt, 1.2);
      g.save();
      g.translate(lx, ly);
      g.rotate(side * (0.72 + idx * 0.08) + sway * 0.14);
      const lg = g.createLinearGradient(0, 0, side * lSize * 1.7, -lSize * 0.6);
      lg.addColorStop(0, "#466f4a");
      lg.addColorStop(1, "#7ca56c");
      g.fillStyle = lg;
      g.beginPath();
      g.moveTo(0, 0);
      g.quadraticCurveTo(side * lSize * 0.9, -lSize * 0.65, side * lSize * 1.85, -lSize * 0.25);
      g.quadraticCurveTo(side * lSize * 0.95, lSize * 0.35, 0, 0);
      g.fill();
      g.strokeStyle = "rgba(235, 245, 220, 0.38)";
      g.lineWidth = 0.9;
      g.beginPath();
      g.moveTo(0, 0);
      g.lineTo(side * lSize * 1.4, -lSize * 0.2);
      g.stroke();
      g.restore();
    }
  });
  return { tipX, tipY };
}

function renderGardenStage(g, frame, tl, paperTex, showHeader = true) {
  const gd = tl.garden;
  const bg = g.createRadialGradient(W * 0.42, H * 0.32, 80, W * 0.5, H * 0.5, W * 0.85);
  bg.addColorStop(0, "#fcfaf3");
  bg.addColorStop(0.55, "#f6f1e4");
  bg.addColorStop(1, "#ebe4d2");
  g.fillStyle = bg;
  g.fillRect(0, 0, W, H);

  g.save();
  g.fillStyle = g.createPattern(paperTex, "repeat");
  g.fillRect(0, 0, W, H);
  const sunShift = Math.sin(frame * 0.028) * 16;
  drawGlowBlob(g, 280 + sunShift, 120, 440, "#fff3cf", 0.52);
  drawGlowBlob(g, 740 - sunShift * 0.6, 170, 380, "#fff7df", 0.36);
  drawGlowBlob(g, 520 + sunShift * 0.4, 380, 320, "#f5ecd2", 0.24);
  g.restore();

  if (showHeader) {
    drawStageHeader(g, gd.index, gd.title, gd.subtitle, false, "#5a7a56", 1);
  }

  const baseLineY = 508;
  g.save();
  g.strokeStyle = "rgba(74, 102, 76, 0.28)";
  g.lineWidth = 1.4;
  g.beginPath();
  g.moveTo(188, baseLineY);
  g.lineTo(1012, baseLineY);
  g.stroke();
  for (let x = 200; x <= 1000; x += 25) {
    g.strokeStyle = "rgba(74, 102, 76, 0.22)";
    g.beginPath();
    g.moveTo(x, baseLineY);
    g.lineTo(x, baseLineY + (x % 100 === 0 ? 7 : 3.5));
    g.stroke();
  }
  g.restore();

  const [fG, fR, fO, fW1, fDel, fW2] = gd.press;
  const plants = [
    { ch: "G", x: 356, f: fG, h: 162, type: "poppy", stemOffX: 4, stemOffY: -76 },
    { ch: "R", x: 518, f: fR, h: 186, type: "anemone", stemOffX: -4, stemOffY: -78 },
    { ch: "O", x: 682, f: fO, h: 152, type: "daisy", stemOffX: 0, stemOffY: -78 },
  ];

  plants.forEach((pl, idx) => {
    if (frame < pl.f) return;
    const age = frame - pl.f;
    const letterPop = easeOutBack(range(age, 0, 10), 1.3);
    const wind = Math.sin(frame * 0.055 + idx * 1.6);
    const { tipX, tipY } = drawPlantStemAndLeaves(g, pl.x + pl.stemOffX, baseLineY + pl.stemOffY, pl.h, wind, range(age, 2, 24), idx);
    drawBotanicalFlower(g, tipX, tipY, pl.type, range(age, 14, 34), wind);
    g.save();
    g.translate(pl.x, baseLineY - 6);
    g.scale(letterPop, letterPop);
    g.font = '500 104px "Didot", "Baskerville", "Georgia", serif';
    g.fillStyle = "#26402c";
    g.textAlign = "center";
    g.textBaseline = "alphabetic";
    g.fillText(pl.ch, 0, 0);
    g.restore();
  });

  const wx = 846;
  const wWind = Math.sin(frame * 0.055 + 4.8);
  if (frame >= fW1 && frame < fW2) {
    const age1 = frame - fW1;
    if (frame < fDel) {
      const pop = easeOutBack(range(age1, 0, 10), 1.3);
      const { tipX, tipY } = drawPlantStemAndLeaves(g, wx, baseLineY - 76, 174, wWind, range(age1, 2, 24), 3);
      drawBotanicalFlower(g, tipX, tipY, "camellia", range(age1, 14, 34), wWind);
      g.save();
      g.translate(wx, baseLineY - 6);
      g.scale(pop, pop);
      g.font = '500 104px "Didot", "Baskerville", "Georgia", serif';
      g.fillStyle = "#26402c";
      g.textAlign = "center";
      g.textBaseline = "alphabetic";
      g.fillText("W", 0, 0);
      g.restore();
    } else {
      const delAge = frame - fDel;
      const retract = 1 - smoother(range(delAge, 0, 20));
      drawPlantStemAndLeaves(g, wx, baseLineY - 76, 174, wWind, retract, 3);
      if (retract > 0.02) {
        g.save();
        g.globalAlpha = retract;
        g.font = '500 104px "Didot", "Baskerville", "Georgia", serif';
        g.fillStyle = "#26402c";
        g.textAlign = "center";
        g.textBaseline = "alphabetic";
        g.fillText("W", wx, baseLineY - 6);
        g.restore();
      }
      const originX = wx + wWind * 16, originY = baseLineY - 250;
      for (let i = 0; i < 11; i++) {
        const u = range(delAge, i * 0.9, 40 + i * 1.8);
        if (u <= 0 || u >= 1) continue;
        const px = originX + (hash(i * 9.1) - 0.15) * 44 + u * (115 + hash(i * 17.3) * 85);
        const py = originY + (hash(i * 23.7) - 0.5) * 36 - Math.sin(u * Math.PI) * 34 + u * u * 72;
        g.save();
        g.globalAlpha = (1 - smooth(range(u, 0.58, 1))) * 0.92;
        g.translate(px, py);
        g.rotate(u * (3.2 + hash(i * 31.1) * 4) + i);
        g.fillStyle = i % 2 === 0 ? "#df5255" : "#f2847e";
        g.beginPath();
        g.ellipse(0, 0, 8.5, 5.2, 0, 0, TAU);
        g.fill();
        g.restore();
      }
    }
  } else if (frame >= fW2) {
    const age2 = frame - fW2;
    const pop = easeOutBack(range(age2, 0, 10), 1.35);
    const { tipX, tipY } = drawPlantStemAndLeaves(g, wx, baseLineY - 76, 178, wWind, range(age2, 2, 22), 4);
    drawBotanicalFlower(g, tipX, tipY, "gold", range(age2, 12, 30), wWind);
    for (let i = 0; i < 7; i++) {
      const u = range(age2, 14 + i * 2, 54 + i * 3);
      if (u <= 0 || u >= 1) continue;
      g.fillStyle = rgba("#e6a628", Math.sin(u * Math.PI) * 0.8);
      g.beginPath();
      g.arc(tipX + (hash(i * 19.7) - 0.5) * 76 + Math.sin(u * 5 + i) * 10, tipY - u * 54, 2.5, 0, TAU);
      g.fill();
    }
    g.save();
    g.translate(wx, baseLineY - 6);
    g.scale(pop, pop);
    g.font = '500 104px "Didot", "Baskerville", "Georgia", serif';
    g.fillStyle = "#26402c";
    g.textAlign = "center";
    g.textBaseline = "alphabetic";
    g.fillText("W", 0, 0);
    g.restore();
  }

  const activeCount = frame < fG ? 0 : frame < fR ? 1 : frame < fO ? 2 : frame < fW1 ? 3 : frame < fDel ? 4 : frame < fW2 ? 3 : 4;
  const cursorXs = [302, 438, 600, 764, 922];
  g.fillStyle = rgba("#4d7050", 0.25 + 0.65 * (0.5 + 0.5 * Math.cos(frame * 0.18)));
  g.fillRect(cursorXs[activeCount], baseLineY - 76, 2.2, 68);

  const keyGlow = {};
  let bubbleEvent = null;
  for (let i = 0; i < gd.press.length; i++) {
    const pf = gd.press[i], kid = gd.keys[i], age = frame - pf;
    if (age >= 0 && age < 22) {
      keyGlow[kid] = Math.max(keyGlow[kid] ?? 0, 1 - smooth(age / 22));
      if (kid.length === 1 && age < 19) bubbleEvent = { kid, age };
    }
  }

  g.save();
  g.shadowColor = "rgba(62, 78, 58, 0.10)";
  g.shadowBlur = 28;
  g.shadowOffsetY = 12;
  g.fillStyle = "#ecece0";
  g.beginPath();
  g.roundRect(166, 558, 868, 256, 26);
  g.fill();
  g.restore();
  g.strokeStyle = "#cfd5be";
  g.lineWidth = 1.4;
  g.beginPath();
  g.roundRect(166, 558, 868, 256, 26);
  g.stroke();

  ALL_KEYS.forEach((id) => {
    const k = MAIN_KEYS[id], glow = keyGlow[id] ?? 0, isMod = id.length > 1;
    const dy = glow * 3.2, kw = k.w * (1 - glow * 0.03), kh = k.h * (1 - glow * 0.035);
    const x = k.x - kw / 2, y = k.y - kh / 2 + dy;
    g.save();
    g.fillStyle = "rgba(76, 92, 68, 0.14)";
    g.beginPath();
    g.roundRect(x, y + 3.2 - dy * 0.6, kw, kh, 12);
    g.fill();
    g.fillStyle = glow > 0.05 ? lerpColor(isMod ? "#e3e8d6" : "#fcfbf3", "#4c724d", glow) : isMod ? "#e3e8d6" : "#fcfbf3";
    g.beginPath();
    g.roundRect(x, y, kw, kh, 12);
    g.fill();
    g.strokeStyle = glow > 0.05 ? "#3f6341" : "#c7ceb6";
    g.lineWidth = 1.25;
    g.stroke();

    const ink = glow > 0.35 ? "#fbfaf2" : isMod ? "#586e54" : "#2f4734";
    if (id.length === 1) {
      g.fillStyle = ink;
      g.font = '500 22px "Baskerville", "Georgia", serif';
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText(id, k.x, k.y + dy + 0.5);
    } else if (id === "Mode") {
      g.fillStyle = ink;
      g.font = '500 15px "Outfit", sans-serif';
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText("123", k.x, k.y + dy + 0.5);
    } else {
      drawKeyIcon(g, id, k.x, k.y + dy, id === "Emoji" ? 0.92 : 0.86, ink, 1.75);
    }
    g.restore();
  });

  if (bubbleEvent) {
    const { kid, age } = bubbleEvent;
    const k = MAIN_KEYS[kid], phase = age / 19;
    const enter = 1 - Math.exp(-(age + 2) / 2.6);
    const fade = 1 - smooth(range(phase, 0.5, 1));
    g.save();
    g.globalAlpha *= fade;
    g.translate(k.x, k.y - k.h / 2 - 45 - 6 * enter);
    g.scale(0.86 + 0.14 * enter, 0.86 + 0.14 * enter);
    g.shadowColor = "rgba(48, 78, 50, 0.25)";
    g.shadowBlur = 16;
    g.shadowOffsetY = 6;
    g.fillStyle = "#4c724d";
    g.beginPath();
    g.roundRect(-31, -31, 62, 62, 16);
    g.fill();
    g.beginPath();
    g.moveTo(-9, 29);
    g.lineTo(0, 40);
    g.lineTo(9, 29);
    g.closePath();
    g.fill();
    g.shadowBlur = 0;
    g.fillStyle = "#fcfbf3";
    g.font = '600 32px "Baskerville", "Georgia", serif';
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(kid, 0, 1);
    g.restore();
  }
}

// =========================================================================

  const paperTex = createPaperTexture();

  function hitTestKey(x, y) {
    for (const id of ALL_KEYS) {
      const k = MAIN_KEYS[id];
      if (Math.abs(x - k.x) <= k.w / 2 + 3 && Math.abs(y - k.y) <= k.h / 2 + 3) return id;
    }
    return null;
  }

  const FLOWER_TYPES = ["poppy", "anemone", "daisy", "camellia", "gold"];

  const LETTER_POOL = ALL_KEYS.filter((k) => k.length === 1);
  function pickVisualKey(id) {
    if (MAIN_KEYS[id]) return id;
    const up = String(id || "").toUpperCase();
    if (MAIN_KEYS[up]) return up;
    const cp = (String(id || "A").codePointAt(0) || 65);
    return LETTER_POOL[Math.abs(cp) % LETTER_POOL.length];
  }

  function createLive(audio) {
    const st = { plants: [], wilted: [], presses: {}, bubble: null, sparkleAt: -999 };
    function pressKey(id, frame) {
      const vKey = pickVisualKey(id);
      st.presses[vKey] = frame;
      if (id === "Backspace") {
        if (st.plants.length > 0) {
          const rm = st.plants.pop();
          st.wilted.push({ ...rm, delFrame: frame });
          if (st.wilted.length > 4) st.wilted.shift();
          audio && audio.playGarden("wilt");
          return "花株「" + rm.ch + "」随风飘落";
        }
        return "花圃已经清空";
      }
      if (id === "Enter" || id === "Emoji") {
        st.sparkleAt = frame;
        audio && audio.playGarden("sparkle");
        return "一阵清风洒下暖金花粉";
      }
      if (id === "Space" || id === "Shift" || id === "Mode") return "请输入汉字或字母种花";
      const chars = Array.from(String(id || "").trim());
      if (chars.length !== 1) return "请输入汉字或字母种花";
      const ch = chars[0];
      if (st.plants.length >= 6) st.plants.shift();
      const cp = ch.codePointAt(0) || 65;
      const code = cp >= 65 && cp <= 90 ? cp - 65 : Math.abs(cp) % 26;
      const plant = {
        ch,
        f: frame,
        h: 148 + (code % 5) * 11,
        type: FLOWER_TYPES[(code + st.plants.length) % FLOWER_TYPES.length],
        seed: code + st.plants.length * 3,
      };
      st.plants.push(plant);
      st.bubble = { kid: vKey, label: ch, frame };
      audio && audio.playGarden("bloom", code);
      return "种下「" + ch + "」的水彩小花";
    }
    function action(act, frame) {
      if (act === "clear") { st.plants = []; st.wilted = []; return "已清空花圃"; }
      if (act === "grow") {
        st.plants = [];
        ["G", "R", "O", "W"].forEach((ch, idx) => {
          st.plants.push({ ch, f: frame - (3 - idx) * 6, h: [162, 186, 152, 178][idx], type: ["poppy", "anemone", "daisy", "gold"][idx], seed: idx });
        });
        audio && audio.playGarden("sparkle");
        return "已种下 GROW 四株花草";
      }
      if (act === "sparkle") { st.sparkleAt = frame; audio && audio.playGarden("sparkle"); return "微风拂过花圃"; }
      return "";
    }
    return { pressKey, action, sample: () => st };
  }

  function renderLive(g, st, frame) {
    resetCtx(g);
    const bg = g.createRadialGradient(W * 0.42, H * 0.32, 80, W * 0.5, H * 0.5, W * 0.85);
    bg.addColorStop(0, "#fcfaf3"); bg.addColorStop(0.55, "#f6f1e4"); bg.addColorStop(1, "#ebe4d2");
    g.fillStyle = bg; g.fillRect(0, 0, W, H);
    g.save();
    g.fillStyle = g.createPattern(paperTex, "repeat"); g.fillRect(0, 0, W, H);
    const sunShift = Math.sin(frame * 0.028) * 16;
    drawGlowBlob(g, 280 + sunShift, 120, 440, "#fff3cf", 0.52);
    drawGlowBlob(g, 740 - sunShift * 0.6, 170, 380, "#fff7df", 0.36);
    g.restore();
    drawStageHeader(g, "02", "字母花园", "TYPE GARDEN", false, "#5a7a56", 1);

    const baseLineY = 508;
    g.save();
    g.strokeStyle = "rgba(74,102,76,0.28)"; g.lineWidth = 1.4;
    g.beginPath(); g.moveTo(188, baseLineY); g.lineTo(1012, baseLineY); g.stroke();
    for (let x = 200; x <= 1000; x += 25) {
      g.strokeStyle = "rgba(74,102,76,0.22)";
      g.beginPath(); g.moveTo(x, baseLineY); g.lineTo(x, baseLineY + (x % 100 === 0 ? 7 : 3.5)); g.stroke();
    }
    g.restore();

    const n = Math.max(1, st.plants.length);
    const span = Math.min(620, (n - 1) * 136);
    const x0 = W / 2 - span / 2;
    st.plants.forEach((pl, idx) => {
      const px = n === 1 ? W / 2 : x0 + (span * idx) / (n - 1);
      const age = Math.max(0, frame - pl.f);
      const wind = Math.sin(frame * 0.055 + idx * 1.6);
      const { tipX, tipY } = drawPlantStemAndLeaves(g, px, baseLineY - 76, pl.h, wind, range(age, 1, 22), pl.seed);
      drawBotanicalFlower(g, tipX, tipY, pl.type, range(age, 12, 30), wind);
      if (frame - st.sparkleAt >= 0 && frame - st.sparkleAt < 55) {
        const u = (frame - st.sparkleAt) / 55;
        for (let k = 0; k < 4; k++) {
          g.fillStyle = rgba("#e6a628", Math.sin(u * Math.PI) * 0.8);
          g.beginPath(); g.arc(tipX + (hash(k * 13.7 + idx) - 0.5) * 64, tipY - u * 48, 2.5, 0, TAU); g.fill();
        }
      }
      g.save();
      g.translate(px, baseLineY - 6);
      const pop = easeOutBack(range(age, 0, 10), 1.3);
      g.scale(pop, pop);
      const isCjk = /[^\x00-\x7f]/.test(pl.ch); g.font = isCjk ? '600 84px "Songti SC", "STSong", "Noto Serif SC", "PingFang SC", serif' : '500 98px "Didot", "Baskerville", "Georgia", serif';
      g.fillStyle = "#26402c"; g.textAlign = "center"; g.textBaseline = "alphabetic";
      g.fillText(pl.ch, 0, 0);
      g.restore();
    });

    st.wilted.forEach((wl) => {
      const delAge = frame - wl.delFrame;
      if (delAge < 0 || delAge > 44) return;
      for (let i = 0; i < 9; i++) {
        const u = range(delAge, i * 0.8, 38 + i * 1.6);
        if (u <= 0 || u >= 1) continue;
        const px = W / 2 + 120 + (hash(i * 9.1) - 0.3) * 140 + u * 110;
        const py = baseLineY - 220 - Math.sin(u * Math.PI) * 30 + u * u * 80;
        g.save();
        g.globalAlpha = (1 - smooth(range(u, 0.55, 1))) * 0.88;
        g.translate(px, py); g.rotate(u * 4 + i);
        g.fillStyle = i % 2 === 0 ? "#df5255" : "#f2847e";
        g.beginPath(); g.ellipse(0, 0, 8, 5, 0, 0, TAU); g.fill();
        g.restore();
      }
    });

    const keyGlow = {};
    for (const [kid, pf] of Object.entries(st.presses)) {
      const age = frame - pf;
      if (age >= 0 && age < 22) keyGlow[kid] = 1 - smooth(age / 22);
    }

    g.save();
    g.shadowColor = "rgba(62,78,58,0.10)"; g.shadowBlur = 28; g.shadowOffsetY = 12;
    g.fillStyle = "#ecece0"; g.beginPath(); g.roundRect(166, 558, 868, 256, 26); g.fill();
    g.restore();
    g.strokeStyle = "#cfd5be"; g.lineWidth = 1.4;
    g.beginPath(); g.roundRect(166, 558, 868, 256, 26); g.stroke();

    ALL_KEYS.forEach((id) => {
      const k = MAIN_KEYS[id], glow = keyGlow[id] ?? 0, isMod = id.length > 1;
      const dy = glow * 3.2, kw = k.w * (1 - glow * 0.03), kh = k.h * (1 - glow * 0.035);
      const x = k.x - kw / 2, y = k.y - kh / 2 + dy;
      g.save();
      g.fillStyle = "rgba(76,92,68,0.14)"; g.beginPath(); g.roundRect(x, y + 3.2 - dy * 0.6, kw, kh, 12); g.fill();
      g.fillStyle = glow > 0.05 ? lerpColor(isMod ? "#e3e8d6" : "#fcfbf3", "#4c724d", glow) : isMod ? "#e3e8d6" : "#fcfbf3";
      g.beginPath(); g.roundRect(x, y, kw, kh, 12); g.fill();
      g.strokeStyle = glow > 0.05 ? "#3f6341" : "#c7ceb6"; g.lineWidth = 1.25; g.stroke();
      const ink = glow > 0.35 ? "#fbfaf2" : isMod ? "#586e54" : "#2f4734";
      if (id.length === 1) { g.fillStyle = ink; g.font = '500 22px "Baskerville", "Georgia", serif'; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(id, k.x, k.y + dy + 0.5); }
      else if (id === "Mode") { g.fillStyle = ink; g.font = '500 15px "Outfit", sans-serif'; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("123", k.x, k.y + dy + 0.5); }
      else drawKeyIcon(g, id, k.x, k.y + dy, id === "Emoji" ? 0.92 : 0.86, ink, 1.75);
      g.restore();
    });

    if (st.bubble && frame - st.bubble.frame < 19 && MAIN_KEYS[st.bubble.kid]) {
      const age = frame - st.bubble.frame, k = MAIN_KEYS[st.bubble.kid];
      const enter = 1 - Math.exp(-(age + 2) / 2.6), fade = 1 - smooth(range(age / 19, 0.5, 1));
      g.save();
      g.globalAlpha *= fade; g.translate(k.x, k.y - k.h / 2 - 45 - 6 * enter);
      g.scale(0.86 + 0.14 * enter, 0.86 + 0.14 * enter);
      g.fillStyle = "#4c724d"; g.beginPath(); g.roundRect(-31, -31, 62, 62, 16); g.fill();
      g.fillStyle = "#fcfbf3"; g.font = '600 30px "Songti SC", "Baskerville", "PingFang SC", serif'; g.textAlign = "center"; g.textBaseline = "middle";
      g.fillText(st.bubble.label || st.bubble.kid, 0, 1);
      g.restore();
    }
  }


  function renderDemo(g, frame) {
    resetCtx(g);
    renderGardenStage(g, frame, DEMO_TIMELINE, paperTex, true);
  }

  window.KeyboardUI = {
    config: { slug: "garden", name: "字母花园", start: 519, end: 765, fps: 60 },
    renderDemo,
    renderLive,
    createLive,
    hitTestKey,
  };
})();
