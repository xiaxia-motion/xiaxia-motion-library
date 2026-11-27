// 夏夏的AI灵感 · 高定复古打字机。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
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
  "opening": {
    "lines": [
      "VibeCoding",
      "5种创意键盘 UI"
    ],
    "events": [
      {
        "start": 2,
        "contact": 4,
        "key": "Shift",
        "hold": 6
      },
      {
        "start": 4,
        "contact": 6,
        "key": "V",
        "ink": "V"
      },
      {
        "start": 9,
        "contact": 11,
        "key": "I",
        "ink": "i"
      },
      {
        "start": 14,
        "contact": 16,
        "key": "B",
        "ink": "b"
      },
      {
        "start": 19,
        "contact": 21,
        "key": "E",
        "ink": "e"
      },
      {
        "start": 23,
        "contact": 25,
        "key": "Shift",
        "hold": 6
      },
      {
        "start": 25,
        "contact": 27,
        "key": "C",
        "ink": "C"
      },
      {
        "start": 30,
        "contact": 32,
        "key": "O",
        "ink": "o"
      },
      {
        "start": 35,
        "contact": 37,
        "key": "D",
        "ink": "d"
      },
      {
        "start": 40,
        "contact": 42,
        "key": "I",
        "ink": "i"
      },
      {
        "start": 45,
        "contact": 47,
        "key": "N",
        "ink": "n"
      },
      {
        "start": 50,
        "contact": 52,
        "key": "G",
        "ink": "g"
      },
      {
        "start": 61,
        "contact": 64,
        "key": "Return"
      },
      {
        "start": 68,
        "contact": 70,
        "key": "Mode"
      },
      {
        "start": 73,
        "contact": 75,
        "key": "5",
        "ink": "5"
      },
      {
        "start": 78,
        "contact": 80,
        "key": "Mode"
      },
      {
        "start": 81,
        "contact": 83,
        "key": "Z"
      },
      {
        "start": 84,
        "contact": 86,
        "key": "H"
      },
      {
        "start": 87,
        "contact": 89,
        "key": "O"
      },
      {
        "start": 90,
        "contact": 92,
        "key": "N"
      },
      {
        "start": 93,
        "contact": 95,
        "key": "G"
      },
      {
        "start": 96,
        "contact": 98,
        "key": "Space",
        "ink": "种"
      },
      {
        "start": 99,
        "contact": 101,
        "key": "C"
      },
      {
        "start": 102,
        "contact": 104,
        "key": "H"
      },
      {
        "start": 105,
        "contact": 107,
        "key": "U"
      },
      {
        "start": 108,
        "contact": 110,
        "key": "A"
      },
      {
        "start": 111,
        "contact": 113,
        "key": "N"
      },
      {
        "start": 114,
        "contact": 116,
        "key": "G"
      },
      {
        "start": 117,
        "contact": 119,
        "key": "Space",
        "ink": "创"
      },
      {
        "start": 120,
        "contact": 122,
        "key": "Y"
      },
      {
        "start": 123,
        "contact": 125,
        "key": "I"
      },
      {
        "start": 126,
        "contact": 128,
        "key": "Space",
        "ink": "意"
      },
      {
        "start": 129,
        "contact": 131,
        "key": "J"
      },
      {
        "start": 132,
        "contact": 134,
        "key": "I"
      },
      {
        "start": 135,
        "contact": 137,
        "key": "A"
      },
      {
        "start": 138,
        "contact": 140,
        "key": "N"
      },
      {
        "start": 141,
        "contact": 143,
        "key": "Space",
        "ink": "键"
      },
      {
        "start": 144,
        "contact": 146,
        "key": "P"
      },
      {
        "start": 147,
        "contact": 149,
        "key": "A"
      },
      {
        "start": 150,
        "contact": 152,
        "key": "N"
      },
      {
        "start": 153,
        "contact": 155,
        "key": "Space",
        "ink": "盘"
      },
      {
        "start": 157,
        "contact": 159,
        "key": "Space",
        "ink": " "
      },
      {
        "start": 161,
        "contact": 163,
        "key": "Shift",
        "hold": 12
      },
      {
        "start": 164,
        "contact": 166,
        "key": "U",
        "ink": "U"
      },
      {
        "start": 170,
        "contact": 172,
        "key": "I",
        "ink": "I"
      }
    ]
  }
};

  function renderTypewriterStage(g, frame, tl, paperTex, withAmbient = true) {
  const evs = tl.opening.events;

  const bg = g.createRadialGradient(W * 0.48, H * 0.34, 80, W * 0.5, H * 0.5, W * 0.82);
  bg.addColorStop(0, "#fbf9f4");
  bg.addColorStop(0.55, "#f3efe6");
  bg.addColorStop(1, "#e5dfd1");
  g.fillStyle = bg;
  g.fillRect(0, 0, W, H);

  if (withAmbient) {
    g.save();
    g.fillStyle = g.createPattern(paperTex, "repeat");
    g.fillRect(0, 0, W, H);
    const beam = g.createLinearGradient(120, 0, 860, 680);
    beam.addColorStop(0, "rgba(255,252,244,0.62)");
    beam.addColorStop(0.45, "rgba(255,250,240,0.16)");
    beam.addColorStop(1, "rgba(255,250,240,0)");
    g.fillStyle = beam;
    g.fillRect(0, 0, W, H);
    g.restore();
  }

  let line1 = "";
  let line2 = "";
  let line1Ages = [];
  let line2Ages = [];
  let onLine2 = false;
  let pinyinBuf = "";
  let inNumberMode = false;
  let lastActionAge = 999;

  for (const e of evs) {
    if (frame < e.contact) continue;
    const age = frame - e.contact;
    lastActionAge = Math.min(lastActionAge, age);
    if (e.key === "Return") {
      onLine2 = true;
      pinyinBuf = "";
    } else if (e.key === "Mode") {
      inNumberMode = !inNumberMode;
    } else if (e.ink !== undefined) {
      if (!onLine2) {
        line1 += e.ink;
        line1Ages.push(age);
      } else {
        line2 += e.ink;
        line2Ages.push(age);
      }
      pinyinBuf = "";
    } else if (onLine2 && e.key.length === 1 && !inNumberMode) {
      pinyinBuf += e.key.toLowerCase();
    }
  }

  const line1Full = "VibeCoding";
  const line2Full = "5种创意键盘 UI";

  g.save();
  g.font = '400 106px "Didot", "Baskerville", "Georgia", serif';
  g.textBaseline = "alphabetic";
  g.textAlign = "left";
  const l1FullW = g.measureText(line1Full).width;
  const l1StartX = (W - l1FullW) / 2;
  const l1Y = 204;

  let curX1 = l1StartX;
  for (let i = 0; i < line1.length; i++) {
    const ch = line1[i];
    const cw = g.measureText(ch).width;
    const age = line1Ages[i];
    const pop = age < 6 ? 1 + 0.08 * (1 - easeOutCubic(age / 6)) : 1;
    const inkA = age < 3 ? smooth(age / 3) : 1;
    g.save();
    g.translate(curX1 + cw / 2, l1Y);
    g.scale(pop, pop);
    g.fillStyle = rgba("#191816", inkA);
    g.fillText(ch, -cw / 2, 0);
    g.restore();
    curX1 += cw;
  }

  // 严格限于字迹笔画内的暖金扫光（在 174–208 帧敏捷掠过）
  if (frame > 173 && frame < 210) {
    const sweep = range(frame, 174, 206);
    const sx = l1StartX - 90 + (l1FullW + 180) * smoother(sweep);
    const sheen = g.createLinearGradient(sx - 85, l1Y - 90, sx + 85, l1Y + 20);
    sheen.addColorStop(0, "rgba(218, 174, 96, 0)");
    sheen.addColorStop(0.5, "rgba(214, 162, 74, 0.62)");
    sheen.addColorStop(1, "rgba(218, 174, 96, 0)");
    g.save();
    g.fillStyle = sheen;
    g.fillText(line1, l1StartX, l1Y);
    g.restore();
  }

  const l2Y = 296;
  const l2Chars = Array.from(line2Full);
  const measureL2Char = (ch) => {
    const isAscii = /[A-Za-z0-9 ]/.test(ch);
    g.font = isAscii
      ? '500 44px "Outfit", "Helvetica Neue", sans-serif'
      : '300 42px "Hiragino Sans GB", "PingFang SC", sans-serif';
    return g.measureText(ch).width + (ch === " " ? 4 : 5.5);
  };
  const l2Widths = l2Chars.map(measureL2Char);
  const l2TotalW = l2Widths.reduce((a, b) => a + b, 0) - 5.5;
  const l2StartX = (W - l2TotalW) / 2;

  const typedL2Chars = Array.from(line2);
  let curX2 = l2StartX;
  for (let i = 0; i < typedL2Chars.length; i++) {
    const ch = typedL2Chars[i];
    const isAscii = /[A-Za-z0-9 ]/.test(ch);
    g.font = isAscii
      ? '500 44px "Outfit", "Helvetica Neue", sans-serif'
      : '300 42px "Hiragino Sans GB", "PingFang SC", sans-serif';
    const cw = l2Widths[i] ?? g.measureText(ch).width;
    const age = line2Ages[i];
    const pop = age < 6 ? 1 + 0.09 * (1 - easeOutCubic(age / 6)) : 1;
    g.save();
    g.translate(curX2 + (cw - 5.5) / 2, l2Y);
    g.scale(pop, pop);
    g.fillStyle = ch === "U" || ch === "I" ? "#1d1b18" : "#3a3630";
    g.fillText(ch, -(cw - 5.5) / 2, 0);
    g.restore();
    curX2 += cw;
  }

  const blink = lastActionAge < 14 ? 1 : 0.35 + 0.65 * (0.5 + 0.5 * Math.cos(frame * 0.24));
  const cursorX = !onLine2 ? curX1 + 7 : curX2 + 6;
  const cursorY = !onLine2 ? l1Y - 82 : l2Y - 36;
  const cursorH = !onLine2 ? 92 : 44;
  g.fillStyle = rgba("#9e7a48", blink * 0.9);
  g.beginPath();
  g.roundRect(cursorX, cursorY, 2.4, cursorH, 1.2);
  g.fill();

  if (pinyinBuf.length > 0 && frame < 174) {
    g.font = '400 17px "GeistMono", monospace';
    const pw = Math.max(46, g.measureText(pinyinBuf).width + 24);
    const px = curX2 + 4;
    const py = l2Y + 14;
    g.fillStyle = "rgba(32, 30, 27, 0.075)";
    g.beginPath();
    g.roundRect(px, py, pw, 26, 13);
    g.fill();
    g.strokeStyle = "rgba(158, 122, 72, 0.32)";
    g.lineWidth = 1;
    g.stroke();
    g.fillStyle = "#6c573a";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(pinyinBuf, px + pw / 2, py + 13.5);
  }
  g.restore();

  const pressDepth = {};
  for (const e of evs) {
    const hold = e.hold ?? 4;
    if (frame >= e.start && frame <= e.contact + hold + 10) {
      let d = 0;
      if (frame < e.contact) d = easeOutCubic(range(frame, e.start, e.contact));
      else if (frame <= e.contact + hold) d = 1;
      else d = 1 - easeOutCubic(range(frame, e.contact + hold, e.contact + hold + 10));
      const kid = e.key === "Return" ? "Enter" : e.key === "5" ? "T" : e.key;
      pressDepth[kid] = Math.max(pressDepth[kid] ?? 0, d);
    }
  }

  // 精密拉丝金属字锤连杆排架
  const barY = 398, barLeft = 228, barRight = 972;
  g.save();
  const rackShadow = g.createRadialGradient(W / 2, 650, 120, W / 2, 650, 460);
  rackShadow.addColorStop(0, "rgba(35, 29, 22, 0.08)");
  rackShadow.addColorStop(1, "rgba(35, 29, 22, 0)");
  g.fillStyle = rackShadow;
  g.fillRect(140, 420, 920, 410);

  const hammerKeys = [...ROWS[0], ...ROWS[1], ...ROWS[2].slice(1, 8)];
  hammerKeys.sort((a, b) => INTRO_KEYS[a].x - INTRO_KEYS[b].x);
  hammerKeys.forEach((kid, idx) => {
    const d = pressDepth[kid] ?? 0;
    const x = mix(barLeft + 20, barRight - 20, idx / (hammerKeys.length - 1));
    const tipY = barY - d * 36;
    g.strokeStyle = "rgba(25, 22, 18, 0.14)";
    g.lineWidth = 4.5;
    g.lineCap = "round";
    g.beginPath();
    g.moveTo(x + 2, 482);
    g.lineTo(x + 2, tipY + 4);
    g.stroke();

    const mg = g.createLinearGradient(x - 2.5, tipY, x + 2.5, tipY);
    mg.addColorStop(0, "#75726d");
    mg.addColorStop(0.45, d > 0.2 ? "#f6f0e4" : "#d8d4cb");
    mg.addColorStop(1, "#5c5954");
    g.strokeStyle = mg;
    g.lineWidth = 3.8;
    g.beginPath();
    g.moveTo(x, 480);
    g.lineTo(x, tipY);
    g.stroke();

    g.fillStyle = d > 0.2 ? "#e5c38b" : "#8b877f";
    g.beginPath();
    g.roundRect(x - 3.6, tipY - 8, 7.2, 11, 2.2);
    g.fill();
  });

  const beamG = g.createLinearGradient(0, 444, 0, 464);
  beamG.addColorStop(0, "#e9e5dc");
  beamG.addColorStop(0.45, "#bab5ab");
  beamG.addColorStop(1, "#7c776f");
  g.fillStyle = beamG;
  g.beginPath();
  g.roundRect(barLeft - 8, 446, barRight - barLeft + 16, 15, 7.5);
  g.fill();
  g.strokeStyle = "rgba(255,255,255,0.65)";
  g.lineWidth = 1;
  g.stroke();
  g.restore();

  // 32 枚高定镀铬黑曜石圆键
  ALL_KEYS.forEach((id) => {
    const k = INTRO_KEYS[id];
    const d = pressDepth[id] ?? 0;
    const isCircle = id.length === 1 || id === "Emoji";
    const isRed = id === "Backspace";
    const dy = d * 5.5;
    const r = isCircle ? Math.min(k.w, k.h) * 0.475 : k.h * 0.44;
    const kw = isCircle ? r * 2 : k.w * 0.96;
    const kh = isCircle ? r * 2 : k.h * 0.88;
    const cx = k.x, cy = k.y + dy;

    g.save();
    g.fillStyle = rgba("#1a1714", 0.22 - d * 0.08);
    g.beginPath();
    g.roundRect(cx - kw / 2 + 2, cy - kh / 2 + 8 - dy * 0.55, kw, kh, r);
    g.fill();

    const sideH = 6.5 - d * 3.8;
    g.fillStyle = isRed ? "#4b161b" : "#1f1e1d";
    g.beginPath();
    g.roundRect(cx - kw / 2, cy - kh / 2 + sideH, kw, kh, r);
    g.fill();

    const rim = g.createLinearGradient(cx - kw / 2, cy - kh / 2, cx + kw / 2, cy + kh / 2);
    if (d > 0.25) {
      rim.addColorStop(0, "#fff5de");
      rim.addColorStop(0.5, "#d8b173");
      rim.addColorStop(1, "#7b6543");
    } else {
      rim.addColorStop(0, "#f2efe9");
      rim.addColorStop(0.45, "#a9a398");
      rim.addColorStop(1, "#4d4a45");
    }
    g.fillStyle = rim;
    g.beginPath();
    g.roundRect(cx - kw / 2, cy - kh / 2, kw, kh, r);
    g.fill();

    const pad = 3.2;
    const iw = kw - pad * 2, ih = kh - pad * 2, ir = Math.max(4, r - pad);
    const face = g.createRadialGradient(cx - iw * 0.14, cy - ih * 0.18, 2, cx, cy, Math.max(iw, ih) * 0.72);
    if (isRed) {
      face.addColorStop(0, "#8f2c36");
      face.addColorStop(0.65, "#681d25");
      face.addColorStop(1, "#441016");
    } else {
      face.addColorStop(0, d > 0.25 ? "#383530" : "#2e2d2b");
      face.addColorStop(0.65, "#191918");
      face.addColorStop(1, "#0e0e0d");
    }
    g.fillStyle = face;
    g.beginPath();
    g.roundRect(cx - iw / 2, cy - ih / 2, iw, ih, ir);
    g.fill();

    g.strokeStyle = d > 0.25 ? "rgba(255, 224, 168, 0.55)" : "rgba(255, 255, 255, 0.20)";
    g.lineWidth = 1.1;
    g.beginPath();
    g.roundRect(cx - iw / 2 + 1.5, cy - ih / 2 + 1.5, iw - 3, ih - 3, Math.max(2, ir - 1.5));
    g.stroke();

    const fg = d > 0.25 ? "#ffedc9" : "#f2efe8";
    if (id.length === 1) {
      const shown = inNumberMode && id === "T" ? "5" : id;
      g.fillStyle = fg;
      g.font = '500 22px "Didot", "Baskerville", "Georgia", serif';
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText(shown, cx, cy + 1);
    } else if (id === "Mode") {
      g.fillStyle = fg;
      g.font = '500 16px "Outfit", sans-serif';
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText(inNumberMode ? "ABC" : "123", cx, cy + 0.5);
    } else {
      drawKeyIcon(g, id, cx, cy, id === "Emoji" ? 0.96 : 0.88, fg, 1.75);
    }
    g.restore();
  });
}

// =========================================================================

  const paperTex = createPaperTexture();

  function hitTestKey(x, y) {
    for (const id of ALL_KEYS) {
      const k = INTRO_KEYS[id];
      const isCircle = id.length === 1 || id === "Emoji";
      const r = isCircle ? Math.min(k.w, k.h) * 0.48 : k.h * 0.45;
      const kw = isCircle ? r * 2 : k.w * 0.96;
      const kh = isCircle ? r * 2 : k.h * 0.88;
      if (Math.abs(x - k.x) <= kw / 2 + 3 && Math.abs(y - k.y) <= kh / 2 + 3) return id;
    }
    return null;
  }

  function createLive(audio) {
    const st = { line1: "VibeCoding", line2: "5种创意键盘 UI", onLine2: false, presses: {}, sheenStart: -999, shiftOn: false };
    function pressKey(id, frame) {
      st.presses[id] = frame;
      audio && audio.playTypewriter(id);
      if (id === "Shift") {
        st.shiftOn = !st.shiftOn;
        return st.shiftOn ? "已开启大写锁定" : "已关闭大写锁定";
      }
      if (id === "Mode" || id === "Emoji") return "当前演示字母层键位";
      if (id === "Enter") {
        st.onLine2 = !st.onLine2;
        st.sheenStart = frame;
        return st.onLine2 ? "已切换至第二行并触发暖金流光" : "已返回第一行并触发暖金流光";
      }
      if (id === "Backspace") {
        if (!st.onLine2) st.line1 = st.line1.slice(0, -1);
        else if (st.line2.length > 0) st.line2 = st.line2.slice(0, -1);
        else { st.onLine2 = false; st.line1 = st.line1.slice(0, -1); }
        return "已退格";
      }
      const ch = id === "Space" ? " " : (st.shiftOn || (!st.onLine2 && st.line1.length === 0) ? id : id.toLowerCase());
      st.shiftOn = false;
      if (!st.onLine2) {
        if (st.line1.length < 14) st.line1 += ch;
        else { st.onLine2 = true; if (st.line2.length < 18) st.line2 += ch; }
      } else if (st.line2.length < 18) {
        st.line2 += ch;
      }
      return "已击打 " + (id === "Space" ? "空格" : id);
    }
    function action(act, frame) {
      if (act === "clear") { st.line1 = ""; st.line2 = ""; st.onLine2 = false; return "已清空纸面，请自由打字"; }
      if (act === "demo-word") { st.line1 = "VibeCoding"; st.line2 = "5种创意键盘 UI"; st.onLine2 = true; st.sheenStart = frame; audio && audio.playTypewriter("Enter"); return "已还原示例双行标题"; }
      if (act === "sheen") { st.sheenStart = frame; audio && audio.playTypewriter("Enter"); return "暖金扫光掠过标题"; }
      return "";
    }
    return { pressKey, action, sample: () => st };
  }

  function renderLive(g, st, frame) {
    resetCtx(g);
    const bg = g.createRadialGradient(W * 0.48, H * 0.34, 80, W * 0.5, H * 0.5, W * 0.82);
    bg.addColorStop(0, "#fbf9f4"); bg.addColorStop(0.55, "#f3efe6"); bg.addColorStop(1, "#e5dfd1");
    g.fillStyle = bg; g.fillRect(0, 0, W, H);
    g.save();
    g.fillStyle = g.createPattern(paperTex, "repeat"); g.fillRect(0, 0, W, H);
    const beam = g.createLinearGradient(120, 0, 860, 680);
    beam.addColorStop(0, "rgba(255,252,244,0.62)"); beam.addColorStop(0.45, "rgba(255,250,240,0.16)"); beam.addColorStop(1, "rgba(255,250,240,0)");
    g.fillStyle = beam; g.fillRect(0, 0, W, H);
    g.restore();

    const l1 = st.line1 || "", l2 = st.line2 || "";
    const l1Y = 204, l2Y = 296;
    g.save();
    g.font = '400 104px "Didot", "Baskerville", "Georgia", serif';
    g.textBaseline = "alphabetic"; g.textAlign = "left";
    const l1W = g.measureText(l1).width;
    const l1X = (W - l1W) / 2;
    g.fillStyle = "#191816";
    g.fillText(l1, l1X, l1Y);

    const sheenAge = frame - st.sheenStart;
    if (l1 && sheenAge >= 0 && sheenAge < 36) {
      const sx = l1X - 90 + (l1W + 180) * smoother(sheenAge / 36);
      const sheen = g.createLinearGradient(sx - 85, l1Y - 90, sx + 85, l1Y + 20);
      sheen.addColorStop(0, "rgba(218,174,96,0)");
      sheen.addColorStop(0.5, "rgba(214,162,74,0.65)");
      sheen.addColorStop(1, "rgba(218,174,96,0)");
      g.fillStyle = sheen;
      g.fillText(l1, l1X, l1Y);
    }

    g.font = '400 42px "Outfit", -apple-system, "Hiragino Sans GB", sans-serif';
    const l2W = g.measureText(l2).width;
    const l2X = (W - l2W) / 2;
    g.fillStyle = "#3a3630";
    g.fillText(l2, l2X, l2Y);

    const blink = 0.35 + 0.65 * (0.5 + 0.5 * Math.cos(frame * 0.2));
    g.fillStyle = rgba("#9e7a48", blink * 0.9);
    const cxCur = !st.onLine2 ? (l1 ? l1X + l1W + 8 : W / 2) : (l2 ? l2X + l2W + 8 : W / 2);
    g.beginPath(); g.roundRect(cxCur, !st.onLine2 ? l1Y - 80 : l2Y - 36, 2.6, !st.onLine2 ? 88 : 42, 1.3); g.fill();
    g.restore();

    const pressDepth = {};
    for (const [kid, pf] of Object.entries(st.presses)) {
      const age = frame - pf;
      if (age >= 0 && age < 16) pressDepth[kid] = age < 3 ? easeOutCubic(age / 3) : 1 - easeOutCubic((age - 3) / 13);
    }

    const barY = 398, barLeft = 228, barRight = 972;
    g.save();
    const rackShadow = g.createRadialGradient(W / 2, 650, 120, W / 2, 650, 460);
    rackShadow.addColorStop(0, "rgba(35, 29, 22, 0.08)"); rackShadow.addColorStop(1, "rgba(35, 29, 22, 0)");
    g.fillStyle = rackShadow; g.fillRect(0, 0, W, H);
    const hammerKeys = [...ROWS[0], ...ROWS[1], ...ROWS[2].slice(1, 8)].sort((a, b) => INTRO_KEYS[a].x - INTRO_KEYS[b].x);
    hammerKeys.forEach((kid, idx) => {
      const d = pressDepth[kid] ?? 0;
      const x = mix(barLeft + 20, barRight - 20, idx / (hammerKeys.length - 1));
      const tipY = barY - d * 36;
      g.strokeStyle = "rgba(25, 22, 18, 0.14)"; g.lineWidth = 4.5; g.lineCap = "round";
      g.beginPath(); g.moveTo(x + 2, 482); g.lineTo(x + 2, tipY + 4); g.stroke();
      const mg = g.createLinearGradient(x - 2.5, tipY, x + 2.5, tipY);
      mg.addColorStop(0, "#75726d"); mg.addColorStop(0.45, d > 0.2 ? "#f6f0e4" : "#d8d4cb"); mg.addColorStop(1, "#5c5954");
      g.strokeStyle = mg; g.lineWidth = 3.8;
      g.beginPath(); g.moveTo(x, 480); g.lineTo(x, tipY); g.stroke();
      g.fillStyle = d > 0.2 ? "#e5c38b" : "#8b877f";
      g.beginPath(); g.roundRect(x - 3.6, tipY - 8, 7.2, 11, 2.2); g.fill();
    });
    const beamG = g.createLinearGradient(0, 444, 0, 464);
    beamG.addColorStop(0, "#e9e5dc"); beamG.addColorStop(0.45, "#bab5ab"); beamG.addColorStop(1, "#7c776f");
    g.fillStyle = beamG; g.beginPath(); g.roundRect(barLeft - 8, 446, barRight - barLeft + 16, 15, 7.5); g.fill();
    g.strokeStyle = "rgba(255,255,255,0.65)"; g.lineWidth = 1; g.stroke();
    g.restore();

    ALL_KEYS.forEach((id) => {
      const k = INTRO_KEYS[id], d = pressDepth[id] ?? 0;
      const isCircle = id.length === 1 || id === "Emoji", isRed = id === "Backspace";
      const dy = d * 5.5, r = isCircle ? Math.min(k.w, k.h) * 0.475 : k.h * 0.44;
      const kw = isCircle ? r * 2 : k.w * 0.96, kh = isCircle ? r * 2 : k.h * 0.88;
      const cx = k.x, cy = k.y + dy;
      g.save();
      g.fillStyle = rgba("#1a1714", 0.22 - d * 0.08);
      g.beginPath(); g.roundRect(cx - kw / 2 + 2, cy - kh / 2 + 8 - dy * 0.55, kw, kh, r); g.fill();
      g.fillStyle = isRed ? "#4b161b" : "#1f1e1d";
      g.beginPath(); g.roundRect(cx - kw / 2, cy - kh / 2 + 6.5 - d * 3.8, kw, kh, r); g.fill();
      const rim = g.createLinearGradient(cx - kw / 2, cy - kh / 2, cx + kw / 2, cy + kh / 2);
      if (d > 0.25 || (id === "Shift" && st.shiftOn)) { rim.addColorStop(0, "#fff5de"); rim.addColorStop(0.5, "#d8b173"); rim.addColorStop(1, "#7b6543"); }
      else { rim.addColorStop(0, "#f2efe9"); rim.addColorStop(0.45, "#a9a398"); rim.addColorStop(1, "#4d4a45"); }
      g.fillStyle = rim; g.beginPath(); g.roundRect(cx - kw / 2, cy - kh / 2, kw, kh, r); g.fill();
      const pad = 3.2, iw = kw - pad * 2, ih = kh - pad * 2, ir = Math.max(4, r - pad);
      const face = g.createRadialGradient(cx - iw * 0.14, cy - ih * 0.18, 2, cx, cy, Math.max(iw, ih) * 0.72);
      if (isRed) { face.addColorStop(0, "#8f2c36"); face.addColorStop(0.65, "#681d25"); face.addColorStop(1, "#441016"); }
      else { face.addColorStop(0, d > 0.25 ? "#383530" : "#2e2d2b"); face.addColorStop(0.65, "#191918"); face.addColorStop(1, "#0e0e0d"); }
      g.fillStyle = face; g.beginPath(); g.roundRect(cx - iw / 2, cy - ih / 2, iw, ih, ir); g.fill();
      g.strokeStyle = d > 0.25 ? "rgba(255,224,168,0.55)" : "rgba(255,255,255,0.20)"; g.lineWidth = 1.1;
      g.beginPath(); g.roundRect(cx - iw / 2 + 1.5, cy - ih / 2 + 1.5, iw - 3, ih - 3, Math.max(2, ir - 1.5)); g.stroke();
      const fg = d > 0.25 ? "#ffedc9" : "#f2efe8";
      if (id.length === 1) {
        g.fillStyle = fg; g.font = '500 22px "Didot", "Baskerville", "Georgia", serif';
        g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(id, cx, cy + 1);
      } else if (id === "Mode") {
        g.fillStyle = fg; g.font = '500 16px "Outfit", sans-serif';
        g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("123", cx, cy + 0.5);
      } else {
        drawKeyIcon(g, id, cx, cy, id === "Emoji" ? 0.96 : 0.88, fg, 1.75);
      }
      g.restore();
    });
  }


  function renderDemo(g, frame) {
    resetCtx(g);
    renderTypewriterStage(g, frame, DEMO_TIMELINE, paperTex, true);
  }

  window.KeyboardUI = {
    config: { slug: "typewriter", name: "高定复古打字机", start: 0, end: 210, fps: 60 },
    renderDemo,
    renderLive,
    createLive,
    hitTestKey,
  };
})();
