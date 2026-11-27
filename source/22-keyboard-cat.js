// 夏夏的AI灵感 · 小猫陪打字。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
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
  "cat": {
    "index": "01",
    "title": "小猫陪打字",
    "subtitle": "NEKO COMPANION",
    "keys": [
      "M",
      "E",
      "O",
      "P",
      "Backspace",
      "W"
    ],
    "press": [
      255,
      270,
      300,
      330,
      360,
      390
    ],
    "purr": 415
  }
};

  function drawCatCharacter(g, frame, catX, catY, headTilt, lookDx, lookDy, wrongState, wrongAge, happy, meowDoneAge, popOffsetY = 0) {
  const strokeCol = "#5c3f4b";
  // 摇曳焦糖白尖小尾巴
  g.save();
  g.translate(0, popOffsetY);
  const tailWag = Math.sin(frame * (happy ? 0.24 : 0.11)) * (happy ? 18 : 9);
  g.strokeStyle = strokeCol;
  g.lineWidth = 26;
  g.lineCap = "round";
  g.beginPath();
  g.moveTo(catX + 106, catY + 48);
  g.quadraticCurveTo(catX + 166 + tailWag * 0.5, catY + 12, catX + 148 + tailWag, catY - 46);
  g.stroke();
  g.strokeStyle = "#f2a96b";
  g.lineWidth = 19;
  g.stroke();
  g.strokeStyle = "#fff8ef";
  g.lineWidth = 17;
  g.beginPath();
  g.moveTo(catX + 153 + tailWag * 0.85, catY - 28);
  g.lineTo(catX + 148 + tailWag, catY - 46);
  g.stroke();
  g.restore();

  // 圆润身子与毛绒小脑袋
  g.save();
  g.translate(catX, catY + popOffsetY);
  g.rotate(headTilt);

  const torsoG = g.createLinearGradient(0, -10, 0, 92);
  torsoG.addColorStop(0, "#fffaf1");
  torsoG.addColorStop(1, "#f7e7d7");
  g.fillStyle = torsoG;
  g.strokeStyle = strokeCol;
  g.lineWidth = 3.2;
  g.beginPath();
  g.ellipse(0, 56, 118, 66, 0, Math.PI, TAU);
  g.lineTo(118, 86);
  g.lineTo(-118, 86);
  g.closePath();
  g.fill();
  g.stroke();

  const earTwitch = wrongState ? Math.sin(wrongAge * 0.9) * 0.14 : happy ? Math.sin(meowDoneAge * 0.25) * 0.08 : 0;
  for (const side of [-1, 1]) {
    g.save();
    g.translate(side * 72, -56);
    g.rotate(side * 0.24 + side * earTwitch);
    g.fillStyle = side > 0 ? "#f2a666" : "#fff9ef";
    g.strokeStyle = strokeCol;
    g.lineWidth = 3.2;
    g.lineJoin = "round";
    g.beginPath();
    g.moveTo(-28, 22);
    g.quadraticCurveTo(-8, -36, 4, -38);
    g.quadraticCurveTo(18, -36, 30, 22);
    g.closePath();
    g.fill();
    g.stroke();
    g.fillStyle = "#f9c5cf";
    g.beginPath();
    g.moveTo(-14, 14);
    g.quadraticCurveTo(-2, -18, 3, -19);
    g.quadraticCurveTo(10, -18, 16, 14);
    g.closePath();
    g.fill();
    g.restore();
  }

  const headG = g.createRadialGradient(-24, -34, 14, 0, -6, 112);
  headG.addColorStop(0, "#fffdf8");
  headG.addColorStop(0.75, "#fff4e6");
  headG.addColorStop(1, "#f2decb");
  g.fillStyle = headG;
  g.beginPath();
  g.ellipse(0, -12, 108, 82, 0, 0, TAU);
  g.fill();

  g.save();
  g.beginPath();
  g.ellipse(0, -12, 106.5, 80.5, 0, 0, TAU);
  g.clip();
  const patchG = g.createRadialGradient(54, -56, 10, 54, -46, 95);
  patchG.addColorStop(0, "#f7b277");
  patchG.addColorStop(1, "#e79055");
  g.fillStyle = patchG;
  g.beginPath();
  g.ellipse(62, -48, 66, 56, -0.22, 0, TAU);
  g.fill();
  g.strokeStyle = "#cf7843";
  g.lineWidth = 4.2;
  g.lineCap = "round";
  for (const ox of [-10, 0, 10]) {
    g.beginPath();
    g.moveTo(ox, -92);
    g.lineTo(ox * 0.85, -72);
    g.stroke();
  }
  g.restore();

  g.strokeStyle = strokeCol;
  g.lineWidth = 3.2;
  g.beginPath();
  g.ellipse(0, -12, 108, 82, 0, 0, TAU);
  g.stroke();

  const blushA = happy ? 0.62 : 0.36;
  drawGlowBlob(g, -60, 10, 24, "#ff8da8", blushA);
  drawGlowBlob(g, 60, 10, 24, "#ff8da8", blushA);

  const blinkPhase = frame % 118;
  const isBlinking = !happy && !wrongState && blinkPhase >= 112 && blinkPhase <= 116;
  for (const ex of [-40, 40]) {
    g.save();
    g.translate(ex, -12);
    if (happy) {
      g.strokeStyle = strokeCol;
      g.lineWidth = 4.2;
      g.lineCap = "round";
      g.beginPath();
      g.arc(0, 4, 13, Math.PI * 1.12, Math.PI * 1.88);
      g.stroke();
    } else if (isBlinking) {
      g.strokeStyle = strokeCol;
      g.lineWidth = 3.6;
      g.lineCap = "round";
      g.beginPath();
      g.moveTo(-11, 0);
      g.quadraticCurveTo(0, 4, 11, 0);
      g.stroke();
    } else {
      const r = wrongState ? 11.8 : 10.6;
      const gx = lookDx * 3.8, gy = lookDy * 2.8;
      g.fillStyle = "#3f2832";
      g.beginPath();
      g.arc(gx, gy, r, 0, TAU);
      g.fill();
      g.fillStyle = "#ffffff";
      g.beginPath();
      g.arc(gx - 3.6, gy - 3.6, 3.6, 0, TAU);
      g.fill();
      g.beginPath();
      g.arc(gx + 3.2, gy + 3.0, 1.7, 0, TAU);
      g.fill();
    }
    g.restore();
  }

  g.fillStyle = "#f28c9c";
  g.beginPath();
  g.ellipse(0, 1, 5.5, 3.8, 0, 0, TAU);
  g.fill();

  g.strokeStyle = strokeCol;
  g.lineWidth = 2.8;
  g.lineCap = "round";
  g.beginPath();
  if (wrongState) {
    g.fillStyle = "#f28c9c";
    g.arc(0, 13, 5.5, 0, TAU);
    g.fill();
    g.stroke();
  } else {
    g.moveTo(-13, 10);
    g.quadraticCurveTo(-6.5, 18, 0, 10);
    g.quadraticCurveTo(6.5, 18, 13, 10);
    g.stroke();
  }

  g.strokeStyle = rgba(strokeCol, 0.55);
  g.lineWidth = 2;
  for (const sgn of [-1, 1]) {
    g.beginPath();
    g.moveTo(sgn * 72, 2);
    g.quadraticCurveTo(sgn * 94, -1, sgn * 112, -5);
    g.moveTo(sgn * 73, 13);
    g.quadraticCurveTo(sgn * 95, 14, sgn * 110, 18);
    g.stroke();
  }

  if (wrongState) {
    const pop = easeOutBack(range(wrongAge, 0, 10), 1.8);
    g.save();
    g.translate(-92, -96);
    g.scale(pop, pop);
    g.fillStyle = "#ef6a72";
    g.font = '700 30px "Outfit", sans-serif';
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("?!", 0, 0);
    g.restore();
  }

  if (happy) {
    const hearts = [
      { dx: -116, dy: -66, s: 11, delay: 0, sp: 1.4 },
      { dx: -82, dy: -104, s: 8.5, delay: 4, sp: 1.2 },
      { dx: 108, dy: -82, s: 12, delay: 2, sp: 1.5 },
      { dx: 136, dy: -46, s: 8, delay: 6, sp: 1.1 },
      { dx: 18, dy: -118, s: 9.5, delay: 5, sp: 1.3 },
    ];
    hearts.forEach((h, idx) => {
      const a = meowDoneAge - h.delay;
      if (a <= 0) return;
      const u = clamp(a / 56);
      const fade = smooth(range(a, 0, 10)) * (1 - smooth(range(u, 0.72, 1)));
      drawHeart(g, h.dx + Math.sin(a * 0.14 + idx) * 6, h.dy - u * 34 * h.sp, h.s * (0.7 + 0.35 * easeOutBack(range(a, 0, 12))), idx % 2 === 0 ? "#f57b9c" : "#f9a4b8", fade);
    });
  }
  g.restore();
}

function renderCatStage(g, frame, tl, showHeader = true) {
  const c = tl.cat;
  const bg = g.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#efe3f9");
  bg.addColorStop(0.52, "#f5eaf7");
  bg.addColorStop(1, "#fdeee6");
  g.fillStyle = bg;
  g.fillRect(0, 0, W, H);

  drawGlowBlob(g, 210, 180, 280, "#ffffff", 0.55);
  drawGlowBlob(g, 1020, 740, 320, "#ffd8c4", 0.45);
  drawGlowBlob(g, 960, 180, 220, "#e6c7f7", 0.38);

  if (showHeader) {
    drawStageHeader(g, c.index, c.title, c.subtitle, false, "#a57aa0", 1);
  }

  let textStr = "";
  let wrongState = false;
  let wrongAge = 999;
  let meowDoneAge = -1;
  const keyGlow = {};

  for (let i = 0; i < c.press.length; i++) {
    const f0 = c.press[i], k = c.keys[i];
    if (frame >= f0) {
      if (k === "Backspace") {
        textStr = textStr.slice(0, -1);
        wrongState = false;
      } else {
        textStr += k;
        if (k === "P") {
          wrongState = true;
          wrongAge = frame - f0;
        }
        if (k === "W") meowDoneAge = frame - f0;
      }
      const age = frame - f0;
      if (age >= 0 && age < 22) keyGlow[k] = Math.max(keyGlow[k] ?? 0, 1 - smooth(age / 22));
    }
  }
  const happy = meowDoneAge >= 0;
  const happyT = happy ? smooth(range(meowDoneAge, 0, 18)) : 0;

  // 奶油珍珠圆润机身
  const bx = 136, by = 148, bw = 928, bh = 688, br = 38;
  g.save();
  g.shadowColor = "rgba(116, 82, 118, 0.16)";
  g.shadowBlur = 42;
  g.shadowOffsetY = 20;
  const bodyG = g.createLinearGradient(bx, by, bx, by + bh);
  bodyG.addColorStop(0, "#fffdf9");
  bodyG.addColorStop(1, "#f7ebf1");
  g.fillStyle = bodyG;
  g.beginPath();
  g.roundRect(bx, by, bw, bh, br);
  g.fill();
  g.restore();

  g.save();
  g.strokeStyle = "rgba(164, 128, 152, 0.32)";
  g.lineWidth = 2;
  g.beginPath();
  g.roundRect(bx + 1, by + 1, bw - 2, bh - 2, br);
  g.stroke();
  g.restore();

  // 上方输入框
  const ix = 186, iy = 186, iw = 828, ih = 122;
  g.save();
  const inG = g.createLinearGradient(ix, iy, ix, iy + ih);
  inG.addColorStop(0, "#fff8eb");
  inG.addColorStop(1, "#fffcf5");
  g.fillStyle = inG;
  g.beginPath();
  g.roundRect(ix, iy, iw, ih, 24);
  g.fill();
  g.strokeStyle = wrongState ? "#ef7e76" : happy ? "#f296ad" : "#dfc9d5";
  g.lineWidth = wrongState || happy ? 2.4 : 1.8;
  g.stroke();

  const shakeX = wrongState && wrongAge < 16 ? Math.sin(wrongAge * 1.45) * 4.5 * (1 - wrongAge / 16) : 0;
  g.font = '700 58px "Georgia", "Baskerville", serif';
  g.textAlign = "left";
  g.textBaseline = "middle";
  let tx = ix + 44 + shakeX;
  for (let i = 0; i < textStr.length; i++) {
    const ch = textStr[i];
    const isErr = wrongState && i === textStr.length - 1 && ch === "P";
    g.fillStyle = isErr ? "#e25d62" : "#563b49";
    g.fillText(ch, tx, iy + ih / 2 + 2);
    tx += g.measureText(ch).width + 4;
  }

  const curA = 0.35 + 0.65 * (0.5 + 0.5 * Math.cos(frame * 0.2));
  g.fillStyle = rgba(wrongState ? "#e25d62" : "#e8927c", curA);
  g.beginPath();
  g.roundRect(tx + 5, iy + 32, 3.6, 58, 2);
  g.fill();

  if (happy) {
    const hs = easeOutBack(range(meowDoneAge, 2, 18), 1.8) * (1 + 0.06 * Math.sin(meowDoneAge * 0.28));
    drawHeart(g, ix + iw - 66, iy + ih / 2 - 14, 24 * hs, "#f47b99", happyT);
    drawSparkle(g, ix + iw - 34, iy + 34, 9 * hs, "#f9b46c", happyT);
    drawSparkle(g, ix + iw - 96, iy + 38, 6.5 * hs, "#f47b99", happyT);
  }
  g.restore();

  // 小猫位置与眼神追踪
  const catBaseX = 698, catBaseY = 486;
  const breath = Math.sin(frame * 0.085) * 2.4;
  let activePress = null;
  let nextTargetKey = MAIN_KEYS["M"];
  for (let i = 0; i < c.press.length; i++) {
    const pf = c.press[i], kid = c.keys[i];
    if (frame >= pf - 12 && frame <= pf + 15) activePress = { i, pf, kid, key: MAIN_KEYS[kid] };
    if (frame <= pf + 4) {
      nextTargetKey = MAIN_KEYS[kid];
      break;
    }
  }
  if (happy) nextTargetKey = { x: catBaseX, y: 510 };

  const lookDx = clamp((nextTargetKey.x - catBaseX) / 230, -1, 1);
  const lookDy = clamp((nextTargetKey.y - catBaseY) / 220, -0.5, 1);
  const headTilt = happy ? Math.sin(meowDoneAge * 0.12) * 0.065 : lookDx * 0.055;
  const catX = catBaseX + lookDx * 56;
  const catY = catBaseY + breath;

  drawCatCharacter(g, frame, catX, catY, headTilt, lookDx, lookDy, wrongState, wrongAge, happy, meowDoneAge, 0);

  // 32 键软糖键盘
  g.save();
  g.fillStyle = "#e6d4e6";
  g.beginPath();
  g.roundRect(166, 558, 868, 256, 26);
  g.fill();
  g.strokeStyle = "#b89bb9";
  g.lineWidth = 2;
  g.stroke();

  ALL_KEYS.forEach((id) => {
    const k = MAIN_KEYS[id];
    const glow = keyGlow[id] ?? 0;
    const isMod = id.length > 1;
    const isWrongKey = id === "P" && wrongState;
    const dy = glow * 4.2;
    const kw = k.w * (1 - glow * 0.03), kh = k.h * (1 - glow * 0.04);
    const x = k.x - kw / 2, y = k.y - kh / 2 + dy;
    const baseDepth = 4.6 * (1 - glow * 0.72);

    g.save();
    g.fillStyle = isWrongKey ? "#d46a6a" : glow > 0.1 ? "#dc905b" : isMod ? "#bfa5c2" : "#dcc8ba";
    g.beginPath();
    g.roundRect(x, y + baseDepth, kw, kh, 12);
    g.fill();

    g.fillStyle = isWrongKey ? "#fca5a5" : glow > 0.05 ? lerpColor(isMod ? "#f0dfee" : "#fff7ee", "#f9b478", glow) : isMod ? "#f0dfee" : "#fff7ee";
    g.beginPath();
    g.roundRect(x, y, kw, kh, 12);
    g.fill();

    g.strokeStyle = glow > 0.1 ? "#d97d48" : "#9c7e90";
    g.lineWidth = 1.5;
    g.stroke();

    g.strokeStyle = "rgba(255, 255, 255, 0.75)";
    g.lineWidth = 1.4;
    g.beginPath();
    g.moveTo(x + 9, y + 3);
    g.lineTo(x + kw - 9, y + 3);
    g.stroke();

    const ink = "#5b3e4c";
    if (id.length === 1) {
      g.fillStyle = ink;
      g.font = '700 22px "Outfit", sans-serif';
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText(id, k.x, k.y + dy + 0.5);
    } else if (id === "Mode") {
      g.fillStyle = ink;
      g.font = '700 15px "Outfit", sans-serif';
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText("123", k.x, k.y + dy + 0.5);
    } else {
      drawKeyIcon(g, id, k.x, k.y + dy, id === "Emoji" ? 0.92 : 0.86, ink, 1.9);
    }
    g.restore();
  });
  g.restore();

  // 小猫弧形毛绒双爪（在键盘图层之上精准按压）
  const leftRest = { x: catX - 64, y: 556 };
  const rightRest = { x: catX + 64, y: 556 };
  let leftPaw = { ...leftRest, press: 0 };
  let rightPaw = { ...rightRest, press: 0 };

  if (activePress) {
    const { pf, kid, key } = activePress;
    const useLeft = ["E", "W", "M"].includes(kid) && key.x < catX + 10;
    let reach = 0, hit = 0;
    if (frame < pf) reach = smoother(range(frame, pf - 11, pf));
    else if (frame <= pf + 4) { reach = 1; hit = 1; }
    else reach = 1 - smoother(range(frame, pf + 4, pf + 15));
    const arcLift = Math.sin(Math.PI * reach) * 26 * (1 - hit * 0.85);
    const targetP = {
      x: mix((useLeft ? leftRest : rightRest).x, key.x, reach),
      y: mix((useLeft ? leftRest : rightRest).y, key.y - 4, reach) - arcLift,
      press: hit,
    };
    if (useLeft) leftPaw = targetP;
    else rightPaw = targetP;
  }

  const strokeCol = "#5c3f4b";
  const drawPaw = (shoulderX, shoulderY, paw, isOrange) => {
    const dx = paw.x - shoulderX, dy = paw.y - shoulderY;
    const dist = Math.hypot(dx, dy);
    g.save();
    if (dist > 8) {
      const bendY = Math.min(shoulderY, paw.y) - 24 - Math.min(28, dist * 0.14);
      const cpx = shoulderX + dx * 0.52;
      g.strokeStyle = "rgba(92, 63, 75, 0.12)";
      g.lineWidth = 28;
      g.lineCap = "round";
      g.beginPath();
      g.moveTo(shoulderX, shoulderY + 10);
      g.quadraticCurveTo(cpx, bendY + 14, paw.x, paw.y + 8);
      g.stroke();

      g.strokeStyle = strokeCol;
      g.lineWidth = 31;
      g.beginPath();
      g.moveTo(shoulderX, shoulderY);
      g.quadraticCurveTo(cpx, bendY, paw.x, paw.y);
      g.stroke();

      const armG = g.createLinearGradient(shoulderX, shoulderY, paw.x, paw.y);
      armG.addColorStop(0, isOrange ? "#f5b882" : "#fff7ec");
      armG.addColorStop(0.75, isOrange ? "#f9cca2" : "#fffbf5");
      armG.addColorStop(1, "#fffaf2");
      g.strokeStyle = armG;
      g.lineWidth = 24.5;
      g.stroke();
    }
    g.translate(paw.x, paw.y);
    g.scale(1 + paw.press * 0.1, 1 - paw.press * 0.12);
    g.fillStyle = "#fffaf2";
    g.strokeStyle = strokeCol;
    g.lineWidth = 3;
    g.beginPath();
    g.ellipse(0, 0, 23, 18.5, 0, 0, TAU);
    g.fill();
    g.stroke();
    g.strokeStyle = rgba(strokeCol, 0.72);
    g.lineWidth = 2.2;
    g.lineCap = "round";
    for (const tx of [-7.5, 0, 7.5]) {
      g.beginPath();
      g.moveTo(tx, 8.5);
      g.lineTo(tx * 1.05, 15.5);
      g.stroke();
    }
    if (paw.press > 0.5) {
      g.strokeStyle = "rgba(249, 168, 120, 0.58)";
      g.lineWidth = 2.2;
      g.beginPath();
      g.arc(0, 4, 29, 0, TAU);
      g.stroke();
    }
    g.restore();
  };
  drawPaw(catX - 58, 548, leftPaw, false);
  drawPaw(catX + 58, 548, rightPaw, true);
}

// =========================================================================


  function hitTestKey(x, y) {
    for (const id of ALL_KEYS) {
      const k = MAIN_KEYS[id];
      if (Math.abs(x - k.x) <= k.w / 2 + 3 && Math.abs(y - k.y) <= k.h / 2 + 3) return id;
    }
    return null;
  }

  function createLive(audio) {
    const st = { text: "", presses: {}, lastHit: null, wrongUntil: -1, wrongStart: -999, happyStart: -999 };
    function pressKey(id, frame) {
      st.presses[id] = frame;
      st.lastHit = { id, frame, key: MAIN_KEYS[id] };
      if (id === "Backspace") {
        st.text = st.text.slice(0, -1);
        st.happyStart = -999;
        st.wrongStart = frame;
        st.wrongUntil = frame + 48;
        audio && audio.playCat("wrong");
        return "退格删掉一字，小猫吓了一跳";
      }
      if (id === "Enter" || id === "Emoji") {
        st.happyStart = frame;
        st.wrongUntil = -1;
        audio && audio.playCat("happy");
        return "小猫开心眯眼冒爱心！";
      }
      if (id === "Shift" || id === "Mode") {
        audio && audio.playCat("tap");
        return "小猫拍了拍功能键";
      }
      const ch = id === "Space" ? " " : id;
      if (st.text.length < 11) st.text += ch;
      else st.text = st.text.slice(1) + ch;
      if (st.text.endsWith("MEOW")) {
        st.happyStart = frame;
        st.wrongUntil = -1;
        audio && audio.playCat("happy");
        return "拼出 MEOW，小猫开心撒娇！";
      }
      st.happyStart = -999;
      audio && audio.playCat("tap");
      return "小猫按下了 " + (id === "Space" ? "空格" : id);
    }
    function action(act, frame) {
      if (act === "clear") { st.text = ""; st.happyStart = -999; st.wrongUntil = -1; return "已清空输入框"; }
      if (act === "meow") { st.text = "MEOW"; st.happyStart = frame; st.wrongUntil = -1; st.lastHit = { id: "W", frame, key: MAIN_KEYS["W"] }; st.presses["W"] = frame; audio && audio.playCat("happy"); return "拼出 MEOW，小猫开心冒爱心！"; }
      if (act === "blush") { st.wrongStart = frame; st.wrongUntil = frame + 70; st.happyStart = -999; audio && audio.playCat("wrong"); return "小猫打错字脸红啦！"; }
      return "";
    }
    return { pressKey, action, sample: () => st };
  }

  function renderLive(g, st, frame) {
    resetCtx(g);
    const bg = g.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#efe3f9"); bg.addColorStop(0.52, "#f5eaf7"); bg.addColorStop(1, "#fdeee6");
    g.fillStyle = bg; g.fillRect(0, 0, W, H);
    drawGlowBlob(g, 210, 180, 280, "#ffffff", 0.55);
    drawGlowBlob(g, 1020, 740, 320, "#ffd8c4", 0.45);
    drawGlowBlob(g, 960, 180, 220, "#e6c7f7", 0.38);
    drawStageHeader(g, "01", "小猫陪打字", "NEKO COMPANION", false, "#a57aa0", 1);

    const wrongState = frame < st.wrongUntil;
    const wrongAge = wrongState ? frame - st.wrongStart : 999;
    const happy = st.happyStart >= 0 && frame - st.happyStart < 240;
    const meowDoneAge = happy ? frame - st.happyStart : -1;
    const happyT = happy ? smooth(range(meowDoneAge, 0, 18)) : 0;

    const bx = 136, by = 148, bw = 928, bh = 688, br = 38;
    g.save();
    g.shadowColor = "rgba(116,82,118,0.16)"; g.shadowBlur = 42; g.shadowOffsetY = 20;
    const bodyG = g.createLinearGradient(bx, by, bx, by + bh);
    bodyG.addColorStop(0, "#fffdf9"); bodyG.addColorStop(1, "#f7ebf1");
    g.fillStyle = bodyG; g.beginPath(); g.roundRect(bx, by, bw, bh, br); g.fill();
    g.restore();
    g.strokeStyle = "rgba(164,128,152,0.32)"; g.lineWidth = 2;
    g.beginPath(); g.roundRect(bx + 1, by + 1, bw - 2, bh - 2, br); g.stroke();

    const ix = 186, iy = 186, iw = 828, ih = 122;
    g.save();
    const inG = g.createLinearGradient(ix, iy, ix, iy + ih);
    inG.addColorStop(0, "#fff8eb"); inG.addColorStop(1, "#fffcf5");
    g.fillStyle = inG; g.beginPath(); g.roundRect(ix, iy, iw, ih, 24); g.fill();
    g.strokeStyle = wrongState ? "#ef7e76" : happy ? "#f296ad" : "#dfc9d5";
    g.lineWidth = wrongState || happy ? 2.4 : 1.8; g.stroke();

    const shakeX = wrongState && wrongAge < 16 ? Math.sin(wrongAge * 1.45) * 4.5 * (1 - wrongAge / 16) : 0;
    g.font = '700 54px "Georgia", "Baskerville", serif';
    g.textAlign = "left"; g.textBaseline = "middle";
    let tx = ix + 44 + shakeX;
    for (let i = 0; i < st.text.length; i++) {
      g.fillStyle = "#563b49";
      g.fillText(st.text[i], tx, iy + ih / 2 + 2);
      tx += g.measureText(st.text[i]).width + 4;
    }
    const curA = 0.35 + 0.65 * (0.5 + 0.5 * Math.cos(frame * 0.2));
    g.fillStyle = rgba(wrongState ? "#e25d62" : "#e8927c", curA);
    g.beginPath(); g.roundRect(tx + 5, iy + 32, 3.6, 58, 2); g.fill();
    if (happy) {
      const hs = easeOutBack(range(meowDoneAge, 2, 18), 1.8) * (1 + 0.06 * Math.sin(meowDoneAge * 0.28));
      drawHeart(g, ix + iw - 66, iy + ih / 2 - 14, 24 * hs, "#f47b99", happyT);
      drawSparkle(g, ix + iw - 34, iy + 34, 9 * hs, "#f9b46c", happyT);
      drawSparkle(g, ix + iw - 96, iy + 38, 6.5 * hs, "#f47b99", happyT);
    }
    g.restore();

    const catBaseX = 698, catBaseY = 486;
    const breath = Math.sin(frame * 0.085) * 2.4;
    const recentHit = st.lastHit && frame - st.lastHit.frame < 24 ? st.lastHit : null;
    const targetKey = happy ? { x: catBaseX, y: 510 } : (recentHit ? recentHit.key : { x: catBaseX, y: 620 });
    const lookDx = clamp((targetKey.x - catBaseX) / 230, -1, 1);
    const lookDy = clamp((targetKey.y - catBaseY) / 220, -0.5, 1);
    const headTilt = happy ? Math.sin(meowDoneAge * 0.12) * 0.065 : lookDx * 0.055;
    const catX = catBaseX + lookDx * 56, catY = catBaseY + breath;
    drawCatCharacter(g, frame, catX, catY, headTilt, lookDx, lookDy, wrongState, wrongAge, happy, meowDoneAge, 0);

    const keyGlow = {};
    for (const [kid, pf] of Object.entries(st.presses)) {
      const age = frame - pf;
      if (age >= 0 && age < 22) keyGlow[kid] = 1 - smooth(age / 22);
    }

    g.save();
    g.fillStyle = "#e6d4e6"; g.beginPath(); g.roundRect(166, 558, 868, 256, 26); g.fill();
    g.strokeStyle = "#b89bb9"; g.lineWidth = 2; g.stroke();
    ALL_KEYS.forEach((id) => {
      const k = MAIN_KEYS[id], glow = keyGlow[id] ?? 0, isMod = id.length > 1;
      const dy = glow * 4.2, kw = k.w * (1 - glow * 0.03), kh = k.h * (1 - glow * 0.04);
      const x = k.x - kw / 2, y = k.y - kh / 2 + dy;
      g.save();
      g.fillStyle = glow > 0.1 ? "#dc905b" : isMod ? "#bfa5c2" : "#dcc8ba";
      g.beginPath(); g.roundRect(x, y + 4.6 * (1 - glow * 0.72), kw, kh, 12); g.fill();
      g.fillStyle = glow > 0.05 ? lerpColor(isMod ? "#f0dfee" : "#fff7ee", "#f9b478", glow) : isMod ? "#f0dfee" : "#fff7ee";
      g.beginPath(); g.roundRect(x, y, kw, kh, 12); g.fill();
      g.strokeStyle = glow > 0.1 ? "#d97d48" : "#9c7e90"; g.lineWidth = 1.5; g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.75)"; g.lineWidth = 1.4;
      g.beginPath(); g.moveTo(x + 9, y + 3); g.lineTo(x + kw - 9, y + 3); g.stroke();
      const ink = "#5b3e4c";
      if (id.length === 1) { g.fillStyle = ink; g.font = '700 22px "Outfit", sans-serif'; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(id, k.x, k.y + dy + 0.5); }
      else if (id === "Mode") { g.fillStyle = ink; g.font = '700 15px "Outfit", sans-serif'; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("123", k.x, k.y + dy + 0.5); }
      else drawKeyIcon(g, id, k.x, k.y + dy, id === "Emoji" ? 0.92 : 0.86, ink, 1.9);
      g.restore();
    });
    g.restore();

    const leftRest = { x: catX - 64, y: 556 }, rightRest = { x: catX + 64, y: 556 };
    let leftPaw = { ...leftRest, press: 0 }, rightPaw = { ...rightRest, press: 0 };
    if (recentHit && frame - recentHit.frame < 16) {
      const age = frame - recentHit.frame;
      const useLeft = recentHit.key.x < catX + 10;
      const reach = age <= 5 ? 1 : 1 - smoother((age - 5) / 11);
      const hit = age <= 5 ? 1 : 0;
      const arcLift = Math.sin(Math.PI * reach) * 24 * (1 - hit * 0.85);
      const targetP = {
        x: mix((useLeft ? leftRest : rightRest).x, recentHit.key.x, reach),
        y: mix((useLeft ? leftRest : rightRest).y, recentHit.key.y - 4, reach) - arcLift,
        press: hit,
      };
      if (useLeft) leftPaw = targetP; else rightPaw = targetP;
    }
    const strokeCol = "#5c3f4b";
    const drawPaw = (sx, sy, paw, isOrange) => {
      const dx = paw.x - sx, dy = paw.y - sy, dist = Math.hypot(dx, dy);
      g.save();
      if (dist > 8) {
        const bendY = Math.min(sy, paw.y) - 24 - Math.min(28, dist * 0.14), cpx = sx + dx * 0.52;
        g.strokeStyle = "rgba(92,63,75,0.12)"; g.lineWidth = 28; g.lineCap = "round";
        g.beginPath(); g.moveTo(sx, sy + 10); g.quadraticCurveTo(cpx, bendY + 14, paw.x, paw.y + 8); g.stroke();
        g.strokeStyle = strokeCol; g.lineWidth = 31;
        g.beginPath(); g.moveTo(sx, sy); g.quadraticCurveTo(cpx, bendY, paw.x, paw.y); g.stroke();
        const armG = g.createLinearGradient(sx, sy, paw.x, paw.y);
        armG.addColorStop(0, isOrange ? "#f5b882" : "#fff7ec"); armG.addColorStop(1, "#fffaf2");
        g.strokeStyle = armG; g.lineWidth = 24.5; g.stroke();
      }
      g.translate(paw.x, paw.y); g.scale(1 + paw.press * 0.1, 1 - paw.press * 0.12);
      g.fillStyle = "#fffaf2"; g.strokeStyle = strokeCol; g.lineWidth = 3;
      g.beginPath(); g.ellipse(0, 0, 23, 18.5, 0, 0, TAU); g.fill(); g.stroke();
      g.strokeStyle = rgba(strokeCol, 0.72); g.lineWidth = 2.2; g.lineCap = "round";
      for (const txp of [-7.5, 0, 7.5]) { g.beginPath(); g.moveTo(txp, 8.5); g.lineTo(txp * 1.05, 15.5); g.stroke(); }
      g.restore();
    };
    drawPaw(catX - 58, 548, leftPaw, false);
    drawPaw(catX + 58, 548, rightPaw, true);
  }


  function renderDemo(g, frame) {
    resetCtx(g);
    renderCatStage(g, frame, DEMO_TIMELINE, true);
  }

  window.KeyboardUI = {
    config: { slug: "cat", name: "小猫陪打字", start: 246, end: 480, fps: 60 },
    renderDemo,
    renderLive,
    createLive,
    hitTestKey,
  };
})();
