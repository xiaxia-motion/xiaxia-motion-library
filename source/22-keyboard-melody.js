// 夏夏的AI灵感 · 旋律键盘。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
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
  "piano": {
    "index": "03",
    "title": "旋律键盘",
    "subtitle": "MELODY SYNTH",
    "word": "beat",
    "keys": [
      "B",
      "E",
      "A",
      "T"
    ],
    "notes": [
      63,
      67,
      70,
      74
    ],
    "noteNames": [
      "E♭4",
      "G4",
      "B♭4",
      "D5"
    ],
    "press": [
      810,
      825,
      855,
      885
    ],
    "enter": 915,
    "replay": [
      930,
      945,
      975,
      990
    ]
  }
};

  const NOTE_COLORS = ["#2dd4bf", "#60a5fa", "#c084fc", "#fbbf24"];

function drawTrebleClef(g, x, y, scale, color) {
  g.save();
  g.translate(x, y);
  g.scale(scale, scale);
  g.strokeStyle = color;
  g.fillStyle = color;
  g.lineWidth = 2.6;
  g.lineCap = "round";
  g.lineJoin = "round";
  g.beginPath();
  g.moveTo(4, 34);
  g.bezierCurveTo(-12, 34, -14, 14, 2, 10);
  g.bezierCurveTo(18, 6, 20, 26, 4, 29);
  g.bezierCurveTo(-14, 31, -18, 4, -2, -16);
  g.bezierCurveTo(8, -28, 12, -46, 3, -52);
  g.bezierCurveTo(-5, -56, -7, -40, -3, -22);
  g.lineTo(6, 40);
  g.bezierCurveTo(8, 50, -3, 55, -8, 49);
  g.stroke();
  g.beginPath();
  g.arc(-7.5, 48.5, 3.2, 0, TAU);
  g.fill();
  g.restore();
}

function renderMelodyStage(g, frame, tl, starTex, showHeader = true) {
  const p = tl.piano;
  const bg = g.createRadialGradient(W * 0.5, H * 0.42, 60, W * 0.5, H * 0.5, W * 0.85);
  bg.addColorStop(0, "#101728");
  bg.addColorStop(0.58, "#090d17");
  bg.addColorStop(1, "#05070d");
  g.fillStyle = bg;
  g.fillRect(0, 0, W, H);

  g.save();
  g.globalAlpha = 0.72;
  g.drawImage(starTex, 0, 0);
  g.restore();

  const noteHitAge = [999, 999, 999, 999];
  const noteEnergies = [0, 0, 0, 0];
  let typedCount = 0;
  for (let i = 0; i < 4; i++) {
    if (frame >= p.press[i]) {
      typedCount = i + 1;
      const a1 = frame - p.press[i];
      noteHitAge[i] = Math.min(noteHitAge[i], a1);
      noteEnergies[i] = Math.max(noteEnergies[i], Math.exp(-a1 / 24));
    }
    if (frame >= p.replay[i]) {
      const a2 = frame - p.replay[i];
      noteHitAge[i] = Math.min(noteHitAge[i], a2);
      noteEnergies[i] = Math.max(noteEnergies[i], Math.exp(-a2 / 26) * 1.15);
    }
  }
  const isReplaying = frame >= p.enter;
  const enterGlow = frame >= p.enter ? Math.exp(-(frame - p.enter) / 18) : 0;

  const blobPos = [[280, 260], [490, 210], [730, 220], [940, 280]];
  g.save();
  g.globalCompositeOperation = "screen";
  for (let i = 0; i < 4; i++) {
    drawGlowBlob(g, blobPos[i][0], blobPos[i][1], 260 + noteEnergies[i] * 140, NOTE_COLORS[i], (i < typedCount ? 0.14 : 0.04) + noteEnergies[i] * 0.3);
  }
  g.restore();

  if (showHeader) {
    drawStageHeader(g, p.index, p.title, p.subtitle, true, "#5eead4", 1);
  }

  const bx = 136, by = 148, bw = 928, bh = 688, br = 32;
  g.save();
  g.shadowColor = "rgba(0, 0, 0, 0.65)";
  g.shadowBlur = 46;
  g.shadowOffsetY = 22;
  const bodyG = g.createLinearGradient(bx, by, bx, by + bh);
  bodyG.addColorStop(0, "rgba(25, 31, 46, 0.92)");
  bodyG.addColorStop(0.5, "rgba(16, 20, 31, 0.95)");
  bodyG.addColorStop(1, "rgba(12, 15, 24, 0.97)");
  g.fillStyle = bodyG;
  g.beginPath();
  g.roundRect(bx, by, bw, bh, br);
  g.fill();
  g.restore();

  g.save();
  const phase = frame * 0.025;
  const rimG = g.createLinearGradient(bx + bw * (0.5 + 0.5 * Math.cos(phase)), by, bx + bw * (0.5 - 0.5 * Math.cos(phase)), by + bh);
  rimG.addColorStop(0, rgba("#2dd4bf", 0.52));
  rimG.addColorStop(0.35, rgba("#60a5fa", 0.36));
  rimG.addColorStop(0.7, rgba("#c084fc", 0.45));
  rimG.addColorStop(1, rgba("#fbbf24", 0.42));
  g.strokeStyle = rimG;
  g.lineWidth = 1.6;
  g.beginPath();
  g.roundRect(bx + 0.8, by + 0.8, bw - 1.6, bh - 1.6, br);
  g.stroke();
  g.restore();

  const sx = 182, sy = 180, sw = 836, sh = 190;
  g.save();
  g.fillStyle = "rgba(7, 10, 18, 0.78)";
  g.beginPath();
  g.roundRect(sx, sy, sw, sh, 20);
  g.fill();
  g.strokeStyle = "rgba(255, 255, 255, 0.09)";
  g.lineWidth = 1.1;
  g.stroke();

  const dotColor = isReplaying ? "#2dd4bf" : "#fbbf24";
  g.fillStyle = dotColor;
  g.shadowColor = dotColor;
  g.shadowBlur = 10;
  g.beginPath();
  g.arc(sx + 24, sy + 22, 4.2, 0, TAU);
  g.fill();
  g.shadowBlur = 0;
  g.font = '500 12px "GeistMono", monospace';
  g.fillStyle = rgba(dotColor, 0.9);
  g.textAlign = "left";
  g.textBaseline = "middle";
  g.fillText(isReplaying ? "PLAYBACK · DROP 120 BPM" : "INPUT · E♭ MAJ7", sx + 36, sy + 22.5);

  const slotGap = 16, slotW = (sw - 48 - slotGap * 3) / 4, slotH = 88, slotY = sy + 42;
  for (let i = 0; i < 4; i++) {
    const x = sx + 24 + i * (slotW + slotGap);
    const active = i < typedCount, energy = noteEnergies[i], col = NOTE_COLORS[i];
    g.save();
    if (active) {
      const sg = g.createRadialGradient(x + slotW / 2, slotY + slotH / 2, 4, x + slotW / 2, slotY + slotH / 2, slotW * 0.75);
      sg.addColorStop(0, rgba(col, 0.14 + energy * 0.24));
      sg.addColorStop(1, rgba(col, 0.02));
      g.fillStyle = sg;
    } else {
      g.fillStyle = "rgba(255, 255, 255, 0.025)";
    }
    g.beginPath();
    g.roundRect(x, slotY, slotW, slotH, 14);
    g.fill();
    g.strokeStyle = active ? rgba(col, 0.36 + energy * 0.62) : "rgba(255, 255, 255, 0.08)";
    g.lineWidth = active ? 1.4 + energy * 1.1 : 1;
    g.stroke();

    if (active) {
      g.font = '500 12px "GeistMono", monospace';
      g.fillStyle = rgba(col, 0.85);
      g.textAlign = "left";
      g.textBaseline = "top";
      g.fillText(p.noteNames[i], x + 12, slotY + 10);

      const pop = 1 + energy * 0.11;
      g.save();
      g.translate(x + slotW / 2, slotY + slotH / 2 + 4);
      g.scale(pop, pop);
      g.shadowColor = rgba(col, 0.75);
      g.shadowBlur = 12 + energy * 18;
      g.font = '600 44px "Outfit", sans-serif';
      g.fillStyle = lerpColor(col, "#ffffff", 0.32 + energy * 0.5);
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText(p.word[i], 0, 0);
      g.restore();
    } else {
      g.fillStyle = "rgba(255, 255, 255, 0.16)";
      g.fillRect(x + slotW / 2 - 12, slotY + slotH / 2, 24, 2);
    }
    g.restore();
  }

  // 实时物理多谐波虹彩声波线
  const waveY = sy + 158;
  const totalEnergy = noteEnergies.reduce((a, b) => a + b, 0);
  const waveGrad = g.createLinearGradient(sx + 24, waveY, sx + sw - 24, waveY);
  waveGrad.addColorStop(0, NOTE_COLORS[0]);
  waveGrad.addColorStop(0.35, NOTE_COLORS[1]);
  waveGrad.addColorStop(0.68, NOTE_COLORS[2]);
  waveGrad.addColorStop(1, NOTE_COLORS[3]);
  g.save();
  g.strokeStyle = waveGrad;
  g.lineWidth = 2.4;
  g.shadowColor = "#60a5fa";
  g.shadowBlur = 10 + totalEnergy * 10;
  g.beginPath();
  for (let k = 0; k <= 110; k++) {
    const u = k / 110;
    const x = sx + 24 + (sw - 48) * u;
    const env = Math.sin(Math.PI * u) ** 1.4;
    let amp = 1.4 * Math.sin(u * TAU * 2.5 + frame * 0.08);
    for (let i = 0; i < 4; i++) {
      if (noteEnergies[i] > 0.005) {
        amp += noteEnergies[i] * 14.5 * Math.sin(u * TAU * (3.2 + i * 1.45) - frame * (0.32 + i * 0.06) + i * 1.7);
      }
    }
    const y = waveY + amp * env;
    if (k === 0) g.moveTo(x, y);
    else g.lineTo(x, y);
  }
  g.stroke();
  g.restore();
  g.restore();

  // 悬空五线谱（E♭4, G4, B♭4, D5，仅降 E 与降 B 显示 ♭！）
  const staffTop = 426, staffGap = 17, staffL = 224, staffR = 976;
  g.save();
  for (let i = 0; i < 5; i++) {
    const y = staffTop + i * staffGap;
    const lg = g.createLinearGradient(staffL, y, staffR, y);
    lg.addColorStop(0, "rgba(255,255,255,0.06)");
    lg.addColorStop(0.15, "rgba(220,234,255,0.24)");
    lg.addColorStop(0.85, "rgba(220,234,255,0.24)");
    lg.addColorStop(1, "rgba(255,255,255,0.06)");
    g.strokeStyle = lg;
    g.lineWidth = 1.25;
    g.beginPath();
    g.moveTo(staffL, y);
    g.lineTo(staffR, y);
    g.stroke();
  }
  drawTrebleClef(g, staffL + 36, staffTop + staffGap * 2.1, 0.88, "rgba(216, 232, 255, 0.65)");

  if (frame >= p.enter && frame <= p.replay[3] + 20) {
    const scanT = range(frame, p.enter, p.replay[3] + 10);
    const scanX = mix(staffL + 110, staffR - 45, smoother(scanT));
    const scanG = g.createLinearGradient(scanX - 55, 0, scanX + 18, 0);
    scanG.addColorStop(0, "rgba(94, 234, 212, 0)");
    scanG.addColorStop(0.75, "rgba(94, 234, 212, 0.24)");
    scanG.addColorStop(1, "rgba(255, 255, 255, 0.55)");
    g.fillStyle = scanG;
    g.fillRect(scanX - 55, staffTop - 16, 73, staffGap * 4 + 32);
  }

  const noteStepsFromBottom = [0, 2, 4, 6];
  const noteHasFlat = [true, false, true, false];
  const noteXs = [410, 560, 710, 860];
  for (let i = 0; i < 4; i++) {
    if (i >= typedCount) continue;
    const nx = noteXs[i];
    const ny = staffTop + staffGap * 4 - noteStepsFromBottom[i] * (staffGap / 2);
    const appear = easeOutBack(range(frame - p.press[i], 0, 11), 1.4);
    const energy = noteEnergies[i], col = NOTE_COLORS[i];

    if (noteHitAge[i] < 22) {
      const rt = noteHitAge[i] / 22;
      drawGlowBlob(g, nx, ny, 24 + rt * 38, col, (1 - rt) * 0.45);
    }

    g.save();
    g.translate(nx, ny + (1 - clamp(appear)) * 16);
    g.scale(appear, appear);
    if (noteHasFlat[i]) {
      g.font = '500 26px "Georgia", serif';
      g.fillStyle = rgba(col, 0.92);
      g.textAlign = "right";
      g.textBaseline = "middle";
      g.fillText("♭", -16, -2);
    }
    const stemUp = i < 2;
    g.strokeStyle = lerpColor(col, "#ffffff", 0.3 + energy * 0.5);
    g.lineWidth = 2.4;
    g.beginPath();
    if (stemUp) { g.moveTo(9.5, -2); g.lineTo(9.5, -52); }
    else { g.moveTo(-9.5, 2); g.lineTo(-9.5, 52); }
    g.stroke();

    g.shadowColor = col;
    g.shadowBlur = 14 + energy * 22;
    g.fillStyle = lerpColor(col, "#ffffff", 0.28 + energy * 0.6);
    g.beginPath();
    g.ellipse(0, 0, 11.5, 8.2, -0.32, 0, TAU);
    g.fill();
    g.restore();
  }
  g.restore();

  const keyGlow = {}, keyColor = {};
  for (let i = 0; i < 4; i++) {
    const kid = p.keys[i];
    if (noteEnergies[i] > 0.01) {
      keyGlow[kid] = Math.max(keyGlow[kid] ?? 0, noteEnergies[i]);
      keyColor[kid] = NOTE_COLORS[i];
    }
  }
  if (enterGlow > 0.01) { keyGlow["Enter"] = enterGlow; keyColor["Enter"] = "#2dd4bf"; }

  g.save();
  g.fillStyle = "rgba(8, 11, 18, 0.72)";
  g.beginPath();
  g.roundRect(166, 558, 868, 256, 22);
  g.fill();
  g.strokeStyle = "rgba(255, 255, 255, 0.06)";
  g.lineWidth = 1;
  g.stroke();

  ALL_KEYS.forEach((id) => {
    const k = MAIN_KEYS[id], glow = keyGlow[id] ?? 0, acc = keyColor[id] ?? "#60a5fa";
    const isMod = id.length > 1, isEnter = id === "Enter";
    const dy = glow * 3.2, kw = k.w * (1 - glow * 0.03), kh = k.h * (1 - glow * 0.035);
    const x = k.x - kw / 2, y = k.y - kh / 2 + dy;
    g.save();
    g.fillStyle = "rgba(0, 0, 0, 0.45)";
    g.beginPath();
    g.roundRect(x, y + 3.5 - dy * 0.7, kw, kh, 10);
    g.fill();
    const kg = g.createLinearGradient(x, y, x, y + kh);
    if (glow > 0.05) {
      kg.addColorStop(0, lerpColor("#232d42", acc, glow * 0.72));
      kg.addColorStop(1, lerpColor("#141a28", acc, glow * 0.45));
      g.shadowColor = rgba(acc, glow * 0.8);
      g.shadowBlur = 18 * glow;
    } else if (isEnter) {
      kg.addColorStop(0, "rgba(45, 212, 191, 0.26)");
      kg.addColorStop(1, "rgba(20, 88, 92, 0.34)");
    } else if (isMod) {
      kg.addColorStop(0, "rgba(38, 46, 66, 0.85)");
      kg.addColorStop(1, "rgba(22, 28, 42, 0.92)");
    } else {
      kg.addColorStop(0, "rgba(48, 57, 80, 0.76)");
      kg.addColorStop(1, "rgba(26, 32, 47, 0.88)");
    }
    g.fillStyle = kg;
    g.beginPath();
    g.roundRect(x, y, kw, kh, 10);
    g.fill();
    g.shadowBlur = 0;
    g.strokeStyle = glow > 0.05 ? rgba(acc, 0.9) : isEnter ? "rgba(94, 234, 212, 0.5)" : "rgba(255, 255, 255, 0.12)";
    g.lineWidth = glow > 0.05 ? 1.4 : 1;
    g.stroke();

    const ink = glow > 0.35 ? "#ffffff" : isEnter ? "#a7f3d0" : isMod ? "#8e9db8" : "#dce6f5";
    if (id.length === 1) {
      g.fillStyle = ink;
      g.font = '500 22px "Outfit", sans-serif';
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText(id.toLowerCase(), k.x, k.y + dy + 0.5);
    } else if (id === "Mode") {
      g.fillStyle = ink;
      g.font = '500 15px "GeistMono", monospace';
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText("123", k.x, k.y + dy + 0.5);
    } else {
      drawKeyIcon(g, id, k.x, k.y + dy, id === "Emoji" ? 0.92 : 0.86, ink, 1.75);
    }
    g.restore();
  });
  g.restore();
}

// =========================================================================

  const starTex = createStarfieldTexture();

  function hitTestKey(x, y) {
    for (const id of ALL_KEYS) {
      const k = MAIN_KEYS[id];
      if (Math.abs(x - k.x) <= k.w / 2 + 3 && Math.abs(y - k.y) <= k.h / 2 + 3) return id;
    }
    return null;
  }

  const SCALE = [
    { midi: 63, name: "E♭4", step: 0, flat: true },
    { midi: 65, name: "F4", step: 1, flat: false },
    { midi: 67, name: "G4", step: 2, flat: false },
    { midi: 68, name: "A♭4", step: 3, flat: true },
    { midi: 70, name: "B♭4", step: 4, flat: true },
    { midi: 72, name: "C5", step: 5, flat: false },
    { midi: 74, name: "D5", step: 6, flat: false },
    { midi: 75, name: "E♭5", step: 7, flat: true },
  ];
  const FIXED_BEAT = { B: SCALE[0], E: SCALE[2], A: SCALE[4], T: SCALE[6] };

  function noteForKey(id) {
    if (FIXED_BEAT[id]) return FIXED_BEAT[id];
    return SCALE[(id.charCodeAt(0) - 65) % SCALE.length];
  }

  function createLive(audio) {
    const st = { slots: [], replayStart: -999, enterFrame: -999, presses: {} };
    function startReplay(frame) {
      if (st.slots.length === 0) return "请先敲入 1–4 个字母组成旋律";
      st.replayStart = frame;
      st.enterFrame = frame;
      st.presses["Enter"] = frame;
      st.slots.forEach((sl, idx) => {
        audio && audio.playPiano(sl.note.midi, idx * 0.25);
      });
      return "正在按 120 BPM 回奏 " + st.slots.map((s) => s.ch.toLowerCase()).join("");
    }
    function pressKey(id, frame) {
      st.presses[id] = frame;
      if (id === "Enter") return startReplay(frame);
      if (id === "Backspace") {
        st.slots.pop();
        st.replayStart = -999;
        return "已移除最后一个音符";
      }
      if (id.length !== 1) return "敲击 A–Z 输入音符，按 Enter 回奏";
      if (st.slots.length >= 4) st.slots = [];
      const note = noteForKey(id);
      st.slots.push({ ch: id, note, pressFrame: frame });
      st.replayStart = -999;
      audio && audio.playPiano(note.midi, 0);
      return "演奏 " + id.toLowerCase() + "（" + note.name + "）";
    }
    function action(act, frame) {
      if (act === "clear") { st.slots = []; st.replayStart = -999; return "已清空乐谱"; }
      if (act === "beat") {
        st.slots = ["B", "E", "A", "T"].map((ch, idx) => ({ ch, note: noteForKey(ch), pressFrame: frame - (4 - idx) * 8 }));
        return startReplay(frame);
      }
      if (act === "replay") return startReplay(frame);
      return "";
    }
    return { pressKey, action, sample: () => st };
  }

  function renderLive(g, st, frame) {
    resetCtx(g);
    const bg = g.createRadialGradient(W * 0.5, H * 0.42, 60, W * 0.5, H * 0.5, W * 0.85);
    bg.addColorStop(0, "#101728"); bg.addColorStop(0.58, "#090d17"); bg.addColorStop(1, "#05070d");
    g.fillStyle = bg; g.fillRect(0, 0, W, H);
    g.save(); g.globalAlpha = 0.72; g.drawImage(starTex, 0, 0); g.restore();

    const noteEnergies = [0, 0, 0, 0], noteHitAge = [999, 999, 999, 999];
    const replayOffsets = [0, 15, 30, 45];
    const isReplaying = st.replayStart >= 0 && frame - st.replayStart < 90;
    for (let i = 0; i < st.slots.length; i++) {
      const a1 = frame - st.slots[i].pressFrame;
      if (a1 >= 0) { noteHitAge[i] = Math.min(noteHitAge[i], a1); noteEnergies[i] = Math.max(noteEnergies[i], Math.exp(-a1 / 24)); }
      if (st.replayStart >= 0) {
        const a2 = frame - (st.replayStart + replayOffsets[i]);
        if (a2 >= 0) { noteHitAge[i] = Math.min(noteHitAge[i], a2); noteEnergies[i] = Math.max(noteEnergies[i], Math.exp(-a2 / 26) * 1.15); }
      }
    }
    const enterGlow = st.enterFrame >= 0 ? Math.exp(-(frame - st.enterFrame) / 18) : 0;

    const blobPos = [[280, 260], [490, 210], [730, 220], [940, 280]];
    g.save(); g.globalCompositeOperation = "screen";
    for (let i = 0; i < 4; i++) {
      drawGlowBlob(g, blobPos[i][0], blobPos[i][1], 260 + noteEnergies[i] * 140, NOTE_COLORS[i], (i < st.slots.length ? 0.14 : 0.04) + noteEnergies[i] * 0.3);
    }
    g.restore();
    drawStageHeader(g, "03", "旋律键盘", "MELODY SYNTH", true, "#5eead4", 1);

    const bx = 136, by = 148, bw = 928, bh = 688, br = 32;
    g.save();
    g.shadowColor = "rgba(0,0,0,0.65)"; g.shadowBlur = 46; g.shadowOffsetY = 22;
    const bodyG = g.createLinearGradient(bx, by, bx, by + bh);
    bodyG.addColorStop(0, "rgba(25,31,46,0.92)"); bodyG.addColorStop(1, "rgba(12,15,24,0.97)");
    g.fillStyle = bodyG; g.beginPath(); g.roundRect(bx, by, bw, bh, br); g.fill();
    g.restore();

    const phase = frame * 0.025;
    const rimG = g.createLinearGradient(bx + bw * (0.5 + 0.5 * Math.cos(phase)), by, bx + bw * (0.5 - 0.5 * Math.cos(phase)), by + bh);
    rimG.addColorStop(0, rgba("#2dd4bf", 0.52)); rimG.addColorStop(0.5, rgba("#c084fc", 0.45)); rimG.addColorStop(1, rgba("#fbbf24", 0.42));
    g.strokeStyle = rimG; g.lineWidth = 1.6;
    g.beginPath(); g.roundRect(bx + 0.8, by + 0.8, bw - 1.6, bh - 1.6, br); g.stroke();

    const sx = 182, sy = 180, sw = 836, sh = 190;
    g.save();
    g.fillStyle = "rgba(7,10,18,0.78)"; g.beginPath(); g.roundRect(sx, sy, sw, sh, 20); g.fill();
    g.strokeStyle = "rgba(255,255,255,0.09)"; g.lineWidth = 1.1; g.stroke();
    const dotColor = isReplaying ? "#2dd4bf" : "#fbbf24";
    g.fillStyle = dotColor; g.shadowColor = dotColor; g.shadowBlur = 10;
    g.beginPath(); g.arc(sx + 24, sy + 22, 4.2, 0, TAU); g.fill(); g.shadowBlur = 0;
    g.font = '500 12px "GeistMono", monospace'; g.fillStyle = rgba(dotColor, 0.9); g.textAlign = "left"; g.textBaseline = "middle";
    g.fillText(isReplaying ? "PLAYBACK · 120 BPM" : "LIVE SYNTH · E♭ MAJOR", sx + 36, sy + 22.5);

    const slotGap = 16, slotW = (sw - 48 - slotGap * 3) / 4, slotH = 88, slotY = sy + 42;
    for (let i = 0; i < 4; i++) {
      const x = sx + 24 + i * (slotW + slotGap), sl = st.slots[i], energy = noteEnergies[i], col = NOTE_COLORS[i];
      g.save();
      g.fillStyle = sl ? rgba(col, 0.10 + energy * 0.20) : "rgba(255,255,255,0.025)";
      g.beginPath(); g.roundRect(x, slotY, slotW, slotH, 14); g.fill();
      g.strokeStyle = sl ? rgba(col, 0.36 + energy * 0.62) : "rgba(255,255,255,0.08)";
      g.lineWidth = sl ? 1.4 + energy : 1; g.stroke();
      if (sl) {
        g.font = '500 12px "GeistMono", monospace'; g.fillStyle = rgba(col, 0.85); g.textAlign = "left"; g.textBaseline = "top";
        g.fillText(sl.note.name, x + 12, slotY + 10);
        g.save(); g.translate(x + slotW / 2, slotY + slotH / 2 + 4); g.scale(1 + energy * 0.11, 1 + energy * 0.11);
        g.shadowColor = rgba(col, 0.75); g.shadowBlur = 12 + energy * 18;
        g.font = '600 44px "Outfit", sans-serif'; g.fillStyle = lerpColor(col, "#ffffff", 0.32 + energy * 0.5);
        g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(sl.ch.toLowerCase(), 0, 0); g.restore();
      } else {
        g.fillStyle = "rgba(255,255,255,0.16)"; g.fillRect(x + slotW / 2 - 12, slotY + slotH / 2, 24, 2);
      }
      g.restore();
    }

    const waveY = sy + 158, totalEnergy = noteEnergies.reduce((a, b) => a + b, 0);
    const waveGrad = g.createLinearGradient(sx + 24, waveY, sx + sw - 24, waveY);
    waveGrad.addColorStop(0, NOTE_COLORS[0]); waveGrad.addColorStop(0.35, NOTE_COLORS[1]); waveGrad.addColorStop(0.68, NOTE_COLORS[2]); waveGrad.addColorStop(1, NOTE_COLORS[3]);
    g.strokeStyle = waveGrad; g.lineWidth = 2.4; g.shadowColor = "#60a5fa"; g.shadowBlur = 10 + totalEnergy * 10;
    g.beginPath();
    for (let k = 0; k <= 110; k++) {
      const u = k / 110, x = sx + 24 + (sw - 48) * u, env = Math.sin(Math.PI * u) ** 1.4;
      let amp = 1.4 * Math.sin(u * TAU * 2.5 + frame * 0.08);
      for (let i = 0; i < 4; i++) if (noteEnergies[i] > 0.005) amp += noteEnergies[i] * 14.5 * Math.sin(u * TAU * (3.2 + i * 1.45) - frame * (0.32 + i * 0.06) + i * 1.7);
      if (k === 0) g.moveTo(x, waveY + amp * env); else g.lineTo(x, waveY + amp * env);
    }
    g.stroke();
    g.restore();

    const staffTop = 426, staffGap = 17, staffL = 224, staffR = 976;
    g.save();
    for (let i = 0; i < 5; i++) {
      const y = staffTop + i * staffGap;
      g.strokeStyle = "rgba(220,234,255,0.24)"; g.lineWidth = 1.25;
      g.beginPath(); g.moveTo(staffL, y); g.lineTo(staffR, y); g.stroke();
    }
    drawTrebleClef(g, staffL + 36, staffTop + staffGap * 2.1, 0.88, "rgba(216,232,255,0.65)");
    if (isReplaying) {
      const scanX = mix(staffL + 110, staffR - 45, smoother(range(frame - st.replayStart, 0, 56)));
      const scanG = g.createLinearGradient(scanX - 55, 0, scanX + 18, 0);
      scanG.addColorStop(0, "rgba(94,234,212,0)"); scanG.addColorStop(0.75, "rgba(94,234,212,0.24)"); scanG.addColorStop(1, "rgba(255,255,255,0.55)");
      g.fillStyle = scanG; g.fillRect(scanX - 55, staffTop - 16, 73, staffGap * 4 + 32);
    }
    const noteXs = [410, 560, 710, 860];
    st.slots.forEach((sl, i) => {
      const nx = noteXs[i], ny = staffTop + staffGap * 4 - sl.note.step * (staffGap / 2);
      const appear = easeOutBack(range(frame - sl.pressFrame, 0, 11), 1.4), energy = noteEnergies[i], col = NOTE_COLORS[i];
      if (noteHitAge[i] < 22) drawGlowBlob(g, nx, ny, 24 + (noteHitAge[i] / 22) * 38, col, (1 - noteHitAge[i] / 22) * 0.45);
      g.save(); g.translate(nx, ny); g.scale(appear, appear);
      if (sl.note.flat) { g.font = '500 26px "Georgia", serif'; g.fillStyle = rgba(col, 0.92); g.textAlign = "right"; g.textBaseline = "middle"; g.fillText("♭", -16, -2); }
      g.strokeStyle = lerpColor(col, "#ffffff", 0.3 + energy * 0.5); g.lineWidth = 2.4;
      g.beginPath(); if (sl.note.step < 4) { g.moveTo(9.5, -2); g.lineTo(9.5, -52); } else { g.moveTo(-9.5, 2); g.lineTo(-9.5, 52); } g.stroke();
      g.shadowColor = col; g.shadowBlur = 14 + energy * 22;
      g.fillStyle = lerpColor(col, "#ffffff", 0.28 + energy * 0.6);
      g.beginPath(); g.ellipse(0, 0, 11.5, 8.2, -0.32, 0, TAU); g.fill();
      g.restore();
    });
    g.restore();

    const keyGlow = {}, keyColor = {};
    st.slots.forEach((sl, i) => { if (noteEnergies[i] > 0.01) { keyGlow[sl.ch] = Math.max(keyGlow[sl.ch] ?? 0, noteEnergies[i]); keyColor[sl.ch] = NOTE_COLORS[i]; } });
    if (enterGlow > 0.01) { keyGlow["Enter"] = enterGlow; keyColor["Enter"] = "#2dd4bf"; }

    g.save();
    g.fillStyle = "rgba(8,11,18,0.72)"; g.beginPath(); g.roundRect(166, 558, 868, 256, 22); g.fill();
    g.strokeStyle = "rgba(255,255,255,0.06)"; g.lineWidth = 1; g.stroke();
    ALL_KEYS.forEach((id) => {
      const k = MAIN_KEYS[id], glow = keyGlow[id] ?? 0, acc = keyColor[id] ?? "#60a5fa", isMod = id.length > 1, isEnter = id === "Enter";
      const dy = glow * 3.2, kw = k.w * (1 - glow * 0.03), kh = k.h * (1 - glow * 0.035), x = k.x - kw / 2, y = k.y - kh / 2 + dy;
      g.save();
      g.fillStyle = "rgba(0,0,0,0.45)"; g.beginPath(); g.roundRect(x, y + 3.5 - dy * 0.7, kw, kh, 10); g.fill();
      const kg = g.createLinearGradient(x, y, x, y + kh);
      if (glow > 0.05) { kg.addColorStop(0, lerpColor("#232d42", acc, glow * 0.72)); kg.addColorStop(1, lerpColor("#141a28", acc, glow * 0.45)); g.shadowColor = rgba(acc, glow * 0.8); g.shadowBlur = 18 * glow; }
      else if (isEnter) { kg.addColorStop(0, "rgba(45,212,191,0.26)"); kg.addColorStop(1, "rgba(20,88,92,0.34)"); }
      else { kg.addColorStop(0, isMod ? "rgba(38,46,66,0.85)" : "rgba(48,57,80,0.76)"); kg.addColorStop(1, isMod ? "rgba(22,28,42,0.92)" : "rgba(26,32,47,0.88)"); }
      g.fillStyle = kg; g.beginPath(); g.roundRect(x, y, kw, kh, 10); g.fill(); g.shadowBlur = 0;
      g.strokeStyle = glow > 0.05 ? rgba(acc, 0.9) : isEnter ? "rgba(94,234,212,0.5)" : "rgba(255,255,255,0.12)"; g.lineWidth = glow > 0.05 ? 1.4 : 1; g.stroke();
      const ink = glow > 0.35 ? "#ffffff" : isEnter ? "#a7f3d0" : isMod ? "#8e9db8" : "#dce6f5";
      if (id.length === 1) { g.fillStyle = ink; g.font = '500 22px "Outfit", sans-serif'; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(id.toLowerCase(), k.x, k.y + dy + 0.5); }
      else if (id === "Mode") { g.fillStyle = ink; g.font = '500 15px "GeistMono", monospace'; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("123", k.x, k.y + dy + 0.5); }
      else drawKeyIcon(g, id, k.x, k.y + dy, id === "Emoji" ? 0.92 : 0.86, ink, 1.75);
      g.restore();
    });
    g.restore();
  }


  function renderDemo(g, frame) {
    resetCtx(g);
    renderMelodyStage(g, frame, DEMO_TIMELINE, starTex, true);
  }

  window.KeyboardUI = {
    config: { slug: "melody", name: "旋律键盘", start: 807, end: 1017, fps: 60 },
    renderDemo,
    renderLive,
    createLive,
    hitTestKey,
  };
})();
