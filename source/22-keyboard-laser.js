// 夏夏的AI灵感 · 激光输入框。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
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

const DOT_GLYPHS = {
  A: ["011110", "100001", "100001", "111111", "100001", "100001", "100001"],
  B: ["111110", "100001", "100001", "111110", "100001", "100001", "111110"],
  C: ["011110", "100001", "100000", "100000", "100000", "100001", "011110"],
  D: ["111100", "100010", "100001", "100001", "100001", "100010", "111100"],
  E: ["111111", "100000", "100000", "111110", "100000", "100000", "111111"],
  F: ["111111", "100000", "100000", "111110", "100000", "100000", "100000"],
  G: ["011110", "100001", "100000", "100111", "100001", "100001", "011110"],
  H: ["100001", "100001", "100001", "111111", "100001", "100001", "100001"],
  I: ["011110", "001100", "001100", "001100", "001100", "001100", "011110"],
  J: ["001111", "000100", "000100", "000100", "100100", "100100", "011000"],
  K: ["100001", "100010", "100100", "111000", "100100", "100010", "100001"],
  L: ["100000", "100000", "100000", "100000", "100000", "100000", "111111"],
  M: ["100001", "110011", "101101", "100001", "100001", "100001", "100001"],
  N: ["100001", "110001", "101001", "100101", "100011", "100001", "100001"],
  O: ["011110", "100001", "100001", "100001", "100001", "100001", "011110"],
  P: ["111110", "100001", "100001", "111110", "100000", "100000", "100000"],
  Q: ["011110", "100001", "100001", "100001", "101001", "100110", "011101"],
  R: ["111110", "100001", "100001", "111110", "100100", "100010", "100001"],
  S: ["011111", "100000", "100000", "011110", "000001", "000001", "111110"],
  T: ["111111", "001100", "001100", "001100", "001100", "001100", "001100"],
  U: ["100001", "100001", "100001", "100001", "100001", "100001", "011110"],
  V: ["100001", "100001", "100001", "100001", "010010", "010010", "001100"],
  W: ["100001", "100001", "100001", "100001", "101101", "110011", "100001"],
  X: ["100001", "100001", "010010", "001100", "010010", "100001", "100001"],
  Y: ["100001", "100001", "010010", "001100", "001100", "001100", "001100"],
  Z: ["111111", "000001", "000010", "001100", "010000", "100000", "111111"]
};

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
  "laser": {
    "index": "04",
    "title": "激光输入框",
    "subtitle": "LASER MATRIX",
    "events": [
      {
        "key": "B",
        "press": 1065,
        "launch": 1068,
        "hit": 1080,
        "sample": 0,
        "tone": 311.127,
        "accent": false,
        "finish": false
      },
      {
        "key": "O",
        "press": 1095,
        "launch": 1097,
        "hit": 1110,
        "sample": 1,
        "tone": 391.995,
        "accent": false,
        "finish": false
      },
      {
        "key": "O",
        "press": 1118,
        "launch": 1120,
        "hit": 1132,
        "sample": 2,
        "tone": 466.164,
        "accent": false,
        "finish": false
      },
      {
        "key": "X",
        "press": 1140,
        "launch": 1142,
        "hit": 1155,
        "sample": 3,
        "tone": 293.665,
        "accent": true,
        "finish": false
      },
      {
        "key": "Backspace",
        "press": 1170,
        "launch": 1173,
        "hit": 1192,
        "sample": 4,
        "tone": 261.626,
        "accent": true,
        "finish": false
      },
      {
        "key": "M",
        "press": 1200,
        "launch": 1203,
        "hit": 1215,
        "sample": 5,
        "tone": 466.164,
        "accent": false,
        "finish": true
      }
    ]
  }
};

  function renderLaserStage(g, frame, tl, showHeader = true) {
  const lz = tl.laser;
  const bg = g.createRadialGradient(W * 0.5, H * 0.42, 70, W * 0.5, H * 0.5, W * 0.85);
  bg.addColorStop(0, "#12241f");
  bg.addColorStop(0.55, "#0a1512");
  bg.addColorStop(1, "#050b09");
  g.fillStyle = bg;
  g.fillRect(0, 0, W, H);

  let slots = [];
  let shakeX = 0, shakeY = 0, finishAge = -1;
  const keyGlow = {}, activeBeams = [];

  for (const ev of lz.events) {
    const pressAge = frame - ev.press;
    const visualId = ev.keyId || (MAIN_KEYS[ev.key] ? ev.key : pickLaserVisualKey(ev.key));
    if (pressAge >= 0 && pressAge < 22) keyGlow[visualId] = Math.max(keyGlow[visualId] ?? 0, 1 - smooth(pressAge / 22));
    if (frame >= ev.launch && frame <= ev.hit) {
      activeBeams.push({ ev, u: range(frame, ev.launch, ev.hit), slotIdx: ev.key === "Backspace" ? Math.max(0, slots.length - 1) : slots.length });
    }
    if (frame >= ev.hit) {
      const ha = frame - ev.hit;
      if (ha < 14) {
        const amp = (ev.finish ? 4.2 : 1.7) * Math.exp(-ha / 4.2);
        shakeX += Math.sin(ha * 2.6) * amp;
        shakeY += Math.cos(ha * 3.1) * amp;
      }
      if (ev.key === "Backspace") slots.pop();
      else {
        slots.push({ ch: ev.key, accent: ev.accent, hitFrame: ev.hit });
        if (ev.finish) finishAge = ha;
      }
    }
  }

  const boomBoost = finishAge >= 0 ? Math.exp(-finishAge / 24) : 0;
  drawGlowBlob(g, W / 2, 340, 380 + boomBoost * 120, "#34d399", 0.14 + boomBoost * 0.24);

  if (showHeader) {
    drawStageHeader(g, lz.index, lz.title, lz.subtitle, true, "#6ee7b7", 1);
  }

  g.save();
  g.translate(shakeX, shakeY);
  const bx = 136, by = 148, bw = 928, bh = 688, br = 30;

  g.save();
  g.shadowColor = "rgba(0, 0, 0, 0.72)";
  g.shadowBlur = 46;
  g.shadowOffsetY = 22;
  const chassisG = g.createLinearGradient(bx, by, bx, by + bh);
  chassisG.addColorStop(0, "#24342f");
  chassisG.addColorStop(0.18, "#192622");
  chassisG.addColorStop(1, "#111b18");
  g.fillStyle = chassisG;
  g.beginPath();
  g.roundRect(bx, by, bw, bh, br);
  g.fill();
  g.restore();

  g.strokeStyle = boomBoost > 0.05 ? lerpColor("#4a6b5f", "#6ee7b7", boomBoost * 0.85) : "rgba(134, 219, 184, 0.24)";
  g.lineWidth = 1.6;
  g.beginPath();
  g.roundRect(bx + 0.8, by + 0.8, bw - 1.6, bh - 1.6, br);
  g.stroke();

  for (let i = 0; i < 3; i++) {
    const h = 7 + i * 4;
    g.fillStyle = i === 2 && slots.some((s) => s.accent) ? "#f59e0b" : "#34d399";
    g.beginPath();
    g.roundRect(bx + 36 + i * 8, by + 35 - h, 4.5, h, 2);
    g.fill();
  }
  g.font = '500 12.5px "GeistMono", monospace';
  g.fillStyle = "rgba(182, 232, 208, 0.72)";
  g.textAlign = "left";
  g.textBaseline = "middle";
  g.fillText("LASER // MATRIX TERMINAL", bx + 68, by + 29);

  for (let i = 0; i < 8; i++) {
    g.fillStyle = "rgba(7, 13, 11, 0.8)";
    g.beginPath();
    g.roundRect(bx + bw - 134 + i * 10, by + 22, 3.6, 14, 1.8);
    g.fill();
  }
  const ledCol = slots.some((s) => s.accent) ? "#f59e0b" : "#34d399";
  g.save();
  g.fillStyle = ledCol;
  g.shadowColor = ledCol;
  g.shadowBlur = 12;
  g.beginPath();
  g.arc(bx + bw - 38, by + 29, 4.5, 0, TAU);
  g.fill();
  g.restore();

  const sx = 182, sy = 202, sw = 836, sh = 292;
  g.save();
  const scrG = g.createLinearGradient(sx, sy, sx, sy + sh);
  scrG.addColorStop(0, "#05100c");
  scrG.addColorStop(0.5, "#071711");
  scrG.addColorStop(1, "#091c15");
  g.fillStyle = scrG;
  g.beginPath();
  g.roundRect(sx, sy, sw, sh, 20);
  g.fill();

  g.save();
  g.beginPath();
  g.roundRect(sx, sy, sw, sh, 20);
  g.clip();
  const sheen = g.createLinearGradient(sx, sy, sx + 480, sy + 260);
  sheen.addColorStop(0, "rgba(167, 243, 208, 0.08)");
  sheen.addColorStop(0.45, "rgba(167, 243, 208, 0.015)");
  sheen.addColorStop(1, "rgba(167, 243, 208, 0)");
  g.fillStyle = sheen;
  g.fillRect(sx, sy, sw, sh);

  const cols = 37, rows = 11, cellPitch = 19.5;
  const gx0 = sx + (sw - (cols - 1) * cellPitch) / 2;
  const gy0 = sy + (sh - (rows - 1) * cellPitch) / 2;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      g.fillStyle = "rgba(52, 211, 153, 0.085)";
      g.beginPath();
      g.roundRect(gx0 + c * cellPitch - 4.2, gy0 + r * cellPitch - 4.2, 8.4, 8.4, 2.2);
      g.fill();
    }
  }

  const slotCols = [4, 12, 20, 28];
  const slotCenter = (idx) => ({ x: gx0 + (slotCols[idx] + 2.5) * cellPitch, y: gy0 + 5 * cellPitch });

  slots.forEach((slot, idx) => {
    const info = getLaserGlyph(slot.ch);
    if (!info) return;
    const { grid: glyph, hires } = info;
    const cStart = slotCols[idx], rStart = hires ? 1.15 : 2, hitAge = frame - slot.hitFrame;
    const flash = Math.exp(-hitAge / 12);
    const mainCol = slot.accent ? "#f59e0b" : "#4ade80";
    const glowCol = slot.accent ? "#fbbf24" : "#34d399";
    const scanSweep = finishAge >= 0 ? range(finishAge, 0, 18) : -1;
    const scanCol = scanSweep >= 0 ? mix(0, cols + 6, smoother(scanSweep)) : -99;

    if (hitAge < 16) {
      const u = hitAge / 16, sc = slotCenter(idx);
      drawGlowBlob(g, sc.x, sc.y, 44 + u * 54, glowCol, (1 - u) * 0.42);
    }

    const stepC = hires ? 0.44 : 1;
    const stepR = hires ? 0.56 : 1;
    const halfOuter = hires ? 2.55 : 5.2;
    const halfCore = hires ? 1.05 : 2.3;
    const colStartAdj = hires ? cStart - 0.55 : cStart;

    for (let gr = 0; gr < glyph.length; gr++) {
      for (let gc = 0; gc < glyph[gr].length; gc++) {
        if (glyph[gr][gc] !== "1" || hitAge < gc * (hires ? 0.36 : 0.7)) continue;
        const colCoord = colStartAdj + gc * stepC;
        const px = gx0 + colCoord * cellPitch, py = gy0 + (rStart + gr * stepR) * cellPitch;
        const scanDist = Math.abs(colCoord - scanCol);
        const b = clamp(flash * 0.7 + (scanDist < 4 ? (1 - scanDist / 4) * 0.85 : 0));
        g.save();
        g.shadowColor = glowCol;
        g.shadowBlur = (hires ? 5.5 : 12) + b * 12;
        g.fillStyle = lerpColor(mainCol, "#ffffff", 0.25 + b * 0.65);
        g.beginPath();
        g.roundRect(px - halfOuter, py - halfOuter, halfOuter * 2, halfOuter * 2, hires ? 1.2 : 2.8);
        g.fill();
        g.fillStyle = rgba("#ffffff", 0.55 + b * 0.45);
        g.beginPath();
        g.roundRect(px - halfCore, py - halfCore, halfCore * 2, halfCore * 2, hires ? 0.6 : 1.4);
        g.fill();
        g.restore();
      }
    }
  });

  if (slots.length < 4) {
    const curCol = slotCols[slots.length];
    const blink = 0.25 + 0.75 * (0.5 + 0.5 * Math.cos(frame * 0.24));
    for (let r = 2; r <= 8; r++) {
      g.fillStyle = rgba("#34d399", blink * 0.85);
      g.beginPath();
      g.roundRect(gx0 + curCol * cellPitch - 3.6, gy0 + r * cellPitch - 3.6, 7.2, 7.2, 2);
      g.fill();
    }
  }
  g.restore();
  g.strokeStyle = "rgba(110, 231, 183, 0.22)";
  g.lineWidth = 1.6;
  g.beginPath();
  g.roundRect(sx, sy, sw, sh, 20);
  g.stroke();
  g.restore();

  // 工业战术 32 键虚拟键盘
  g.save();
  g.fillStyle = "rgba(9, 16, 14, 0.82)";
  g.beginPath();
  g.roundRect(166, 558, 868, 256, 22);
  g.fill();
  g.strokeStyle = "rgba(110, 231, 183, 0.10)";
  g.lineWidth = 1;
  g.stroke();

  ALL_KEYS.forEach((id) => {
    const k = MAIN_KEYS[id], glow = keyGlow[id] ?? 0, isMod = id.length > 1, isBack = id === "Backspace";
    const acc = isBack || id === "X" ? "#f59e0b" : "#34d399";
    const dy = glow * 3.5, kw = k.w * (1 - glow * 0.03), kh = k.h * (1 - glow * 0.035);
    const x = k.x - kw / 2, y = k.y - kh / 2 + dy;
    g.save();
    g.fillStyle = "#060c0a";
    g.beginPath();
    g.roundRect(x, y + 3.8 - dy * 0.7, kw, kh, 10);
    g.fill();
    const kg = g.createLinearGradient(x, y, x, y + kh);
    if (isBack) {
      kg.addColorStop(0, lerpColor("#d96b27", "#fbbf24", glow * 0.6));
      kg.addColorStop(1, lerpColor("#a84616", "#f59e0b", glow * 0.4));
    } else if (glow > 0.05) {
      kg.addColorStop(0, lerpColor("#284238", acc, glow * 0.75));
      kg.addColorStop(1, lerpColor("#162822", acc, glow * 0.48));
    } else if (isMod) {
      kg.addColorStop(0, "#243831");
      kg.addColorStop(1, "#172520");
    } else {
      kg.addColorStop(0, "#2c453c");
      kg.addColorStop(1, "#1b2e27");
    }
    if (glow > 0.05) { g.shadowColor = acc; g.shadowBlur = 18 * glow; }
    g.fillStyle = kg;
    g.beginPath();
    g.roundRect(x, y, kw, kh, 10);
    g.fill();
    g.shadowBlur = 0;
    g.strokeStyle = glow > 0.05 ? acc : isBack ? "#f79c59" : "rgba(148, 224, 192, 0.22)";
    g.lineWidth = glow > 0.05 ? 1.6 : 1.1;
    g.stroke();

    const ink = isBack ? "#fff8ef" : glow > 0.35 ? "#061912" : isMod ? "#8eb8a6" : "#dff7eb";
    if (id.length === 1) {
      g.fillStyle = ink;
      g.font = '600 22px "GeistMono", monospace';
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText(id, k.x, k.y + dy + 0.5);
    } else if (id === "Mode") {
      g.fillStyle = ink;
      g.font = '500 15px "GeistMono", monospace';
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText("123", k.x, k.y + dy + 0.5);
    } else {
      drawKeyIcon(g, id, k.x, k.y + dy, id === "Emoji" ? 0.92 : 0.86, ink, 1.85);
    }
    g.restore();
  });
  g.restore();

  // 三层高能激光束 + 飞行火花 + 字符微影
  activeBeams.forEach(({ ev, u, slotIdx }) => {
    const isBack = ev.key === "Backspace";
    const keyPt = MAIN_KEYS[ev.keyId || ev.key] || MAIN_KEYS[pickLaserVisualKey(ev.key)];
    const targetPt = slotCenter(clamp(slotIdx, 0, 3));
    const p0 = isBack ? targetPt : { x: keyPt.x, y: keyPt.y };
    const p2 = isBack ? { x: keyPt.x, y: keyPt.y } : targetPt;
    const p1 = { x: (p0.x + p2.x) / 2 + (isBack ? 75 : ev.key === "X" ? -60 : 45), y: Math.min(p0.y, p2.y) + 75 };
    const pt = (t) => ({
      x: (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x,
      y: (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y,
    });
    const headU = smoother(u), tailU = Math.max(0, headU - 0.34);
    const col = ev.accent ? "#fbbf24" : "#34d399", head = pt(headU);

    g.save();
    g.globalCompositeOperation = "screen";
    [{ w: 14, color: rgba(col, 0.25) }, { w: 5.5, color: rgba(col, 0.85) }, { w: 2.2, color: "#ffffff" }].forEach((ly) => {
      g.strokeStyle = ly.color;
      g.lineWidth = ly.w;
      g.lineCap = "round";
      g.beginPath();
      for (let i = 0; i <= 18; i++) {
        const q = pt(mix(tailU, headU, i / 18));
        if (i === 0) g.moveTo(q.x, q.y);
        else g.lineTo(q.x, q.y);
      }
      g.stroke();
    });
    drawGlowBlob(g, head.x, head.y, 26, col, 0.9);
    g.fillStyle = "#ffffff";
    g.beginPath();
    g.arc(head.x, head.y, 5.2, 0, TAU);
    g.fill();
    for (let i = 0; i < 6; i++) {
      const sp = pt(clamp(headU - i * 0.055));
      g.fillStyle = rgba(col, (1 - i / 6) * 0.85);
      g.beginPath();
      g.arc(sp.x + (hash(i * 13.3 + ev.press) - 0.5) * 18, sp.y + (hash(i * 29.7 + ev.press) - 0.5) * 18, 2.2 * (1 - i * 0.12), 0, TAU);
      g.fill();
    }
    g.font = '700 18px "PingFang SC", "Hiragino Sans GB", "GeistMono", sans-serif';
    g.fillStyle = "#ffffff";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(isBack ? "X" : ev.key, head.x, head.y - 18);
    g.restore();
  });

  g.restore();
}

// =========================================================================


  function hitTestKey(x, y) {
    for (const id of ALL_KEYS) {
      const k = MAIN_KEYS[id];
      if (Math.abs(x - k.x) <= k.w / 2 + 3 && Math.abs(y - k.y) <= k.h / 2 + 3) return id;
    }
    return null;
  }

  const LASER_LETTERS = ALL_KEYS.filter((k) => k.length === 1);
  const DYNAMIC_GLYPH_CACHE = {};
  let rasterCanvas = null;

  function pickLaserVisualKey(ch) {
    if (MAIN_KEYS[ch]) return ch;
    const up = String(ch || "").toUpperCase();
    if (MAIN_KEYS[up]) return up;
    const cp = String(ch || "A").codePointAt(0) || 65;
    return LASER_LETTERS[Math.abs(cp) % LASER_LETTERS.length];
  }

  function getLaserGlyph(ch) {
    if (DOT_GLYPHS[ch]) return { grid: DOT_GLYPHS[ch], hires: false };
    const up = String(ch || "").toUpperCase();
    if (DOT_GLYPHS[up]) return { grid: DOT_GLYPHS[up], hires: false };
    if (DYNAMIC_GLYPH_CACHE[ch]) return DYNAMIC_GLYPH_CACHE[ch];
    if (typeof document === "undefined") return null;
    if (!rasterCanvas) {
      rasterCanvas = document.createElement("canvas");
      rasterCanvas.width = 16;
      rasterCanvas.height = 16;
    }
    const rctx = rasterCanvas.getContext("2d", { willReadFrequently: true });
    rctx.clearRect(0, 0, 16, 16);
    rctx.fillStyle = "#ffffff";
    rctx.textAlign = "center";
    rctx.textBaseline = "middle";
    rctx.font = '500 14px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif';
    rctx.fillText(ch, 8, 8.6);
    const img = rctx.getImageData(0, 0, 16, 16).data;
    const grid = [];
    for (let r = 0; r < 16; r++) {
      let row = "";
      for (let c = 0; c < 16; c++) {
        row += img[(r * 16 + c) * 4 + 3] >= 126 ? "1" : "0";
      }
      grid.push(row);
    }
    const res = { grid, hires: true };
    DYNAMIC_GLYPH_CACHE[ch] = res;
    return res;
  }

  function createLive(audio) {
    const st = { events: [], sweepAt: -999 };
    function pressKey(id, frame) {
      if (id === "Enter") {
        st.sweepAt = frame;
        audio && audio.playLaser("lock");
        return "全屏翡翠激光扫描锁定！";
      }
      if (id === "Backspace") {
        st.events.push({ key: "Backspace", keyId: "Backspace", press: frame, launch: frame + 1, hit: frame + 16, accent: true, finish: false });
        audio && audio.playLaser("suck");
        return "琥珀红光逆向回吸消除字符";
      }
      if (id === "Space" || id === "Shift" || id === "Mode" || id === "Emoji") {
        return "输入汉字或 A–Z 发射翡翠激光，退格键回吸消除";
      }
      const chars = Array.from(String(id || "").trim());
      if (chars.length !== 1) return "输入汉字或 A–Z 发射翡翠激光，退格键回吸消除";
      const ch = /^[a-z]$/.test(chars[0]) ? chars[0].toUpperCase() : chars[0];
      let count = 0;
      for (const e of st.events) count = e.key === "Backspace" ? Math.max(0, count - 1) : Math.min(4, count + 1);
      if (count >= 4) st.events = [];
      const isFourth = count === 3;
      st.events.push({
        key: ch,
        keyId: pickLaserVisualKey(ch),
        press: frame,
        launch: frame + 2,
        hit: frame + 14,
        accent: ch === "X",
        finish: isFourth,
      });
      audio && audio.playLaser(isFourth ? "lock" : "fire");
      return "发射激光蚀刻「" + ch + "」";
    }
    function action(act, frame) {
      if (act === "clear") { st.events = []; st.sweepAt = -999; return "点阵终端已清空"; }
      if (act === "boom") {
        st.events = ["B", "O", "O", "M"].map((ch, i) => ({
          key: ch, press: frame + i * 10, launch: frame + i * 10 + 2, hit: frame + i * 10 + 13, accent: false, finish: i === 3,
        }));
        audio && audio.playLaser("lock");
        return "齐射激光写入 BOOM！";
      }
      if (act === "sweep") { st.sweepAt = frame; audio && audio.playLaser("lock"); return "触发扫描光束"; }
      return "";
    }
    return { pressKey, action, sample: () => st };
  }

  function renderLive(g, st, frame) {
    resetCtx(g);
    const liveTl = { laser: { index: "04", title: "激光输入框", subtitle: "LASER MATRIX", events: st.events } };
    renderLaserStage(g, frame, liveTl, true);
    if (st.sweepAt >= 0 && frame - st.sweepAt < 22) {
      const u = (frame - st.sweepAt) / 22;
      const sx = mix(182, 1018, smoother(u));
      g.save();
      g.globalCompositeOperation = "screen";
      const sg = g.createLinearGradient(sx - 40, 0, sx + 12, 0);
      sg.addColorStop(0, "rgba(52,211,153,0)"); sg.addColorStop(0.8, "rgba(52,211,153,0.4)"); sg.addColorStop(1, "rgba(255,255,255,0.75)");
      g.fillStyle = sg; g.fillRect(sx - 40, 202, 52, 292);
      g.restore();
    }
  }


  function renderDemo(g, frame) {
    resetCtx(g);
    renderLaserStage(g, frame, DEMO_TIMELINE, true);
  }

  window.KeyboardUI = {
    config: { slug: "laser", name: "激光输入框", start: 1050, end: 1230, fps: 60 },
    renderDemo,
    renderLive,
    createLive,
    hitTestKey,
  };
})();
