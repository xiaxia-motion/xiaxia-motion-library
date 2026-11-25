// 电视扫描条切换双标题 · 夏夏的AI灵感
var NeoEffect = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // ../../../../../../../../var/folders/99/fwfmgn090cl0c1l5bc51xtcw0000gn/T/neo-4k60-MVi4O2/src/component-entry.js
  var component_entry_exports = {};
  __export(component_entry_exports, {
    draw: () => draw,
    ready: () => ready
  });

  // reveal/sampleTiming.json
  var sampleTiming_default = {
    fps: 30,
    inFrame: 180,
    outFrame: 540,
    land: 271,
    staticStart: 317,
    staticLast: 323,
    firstVoice: 9.558,
    beginPhoto: 12.9,
    endPeel: 13.7,
    traceWord: 10.72,
    secondVoice: 12.91,
    glassVoice: 15.49,
    steelVoice: 16.24,
    whiteVoice: 16.95,
    endSpeech: 17.883,
    glassTurn: [
      15.33,
      15.95
    ],
    steelTurn: [
      16.1,
      16.69
    ],
    whiteTurn: [
      16.83,
      17.46
    ],
    whiteConsonant: 16.866666666666667
  };

  // native.js
  var SCALE = 1;
  var sizes = /* @__PURE__ */ new WeakMap();
  function mark(canvas, w, h) {
    sizes.set(canvas, { w, h, sx: canvas.width / w, sy: canvas.height / h });
    return canvas;
  }
  function baseScale(canvas) {
    return sizes.get(canvas)?.sx || 1;
  }
  var prepared = /* @__PURE__ */ new WeakSet();
  function scaleEffects(ctx) {
    if (prepared.has(ctx)) return;
    prepared.add(ctx);
    for (const name of ["shadowBlur", "shadowOffsetX", "shadowOffsetY", "filter"]) {
      const native = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, name);
      if (!native?.set) continue;
      Object.defineProperty(ctx, name, {
        configurable: true,
        get() {
          const value = native.get.call(this);
          return name === "filter" ? value : value / baseScale(this.canvas);
        },
        set(value) {
          const k = baseScale(this.canvas);
          native.set.call(this, name === "filter" ? String(value).replace(/blur\(\s*([\d.]+)px\s*\)/g, (_, n) => "blur(" + Number(n) * k + "px)") : value * k);
        }
      });
    }
  }
  function context(canvas, options) {
    const ctx = canvas.getContext("2d", options);
    const size = sizes.get(canvas);
    if (!size) throw new Error("尚未登记画布逻辑尺寸");
    ctx.setTransform(size.sx, 0, 0, size.sy, 0, 0);
    scaleEffects(ctx);
    return ctx;
  }
  function sheet(w, h, options, ratio = SCALE) {
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(w * ratio));
    canvas.height = Math.max(1, Math.round(h * ratio));
    mark(canvas, w, h);
    context(canvas, options);
    return canvas;
  }
  function blit(ctx, image2, ...a) {
    const size = sizes.get(image2);
    if (!size) {
      ctx.drawImage(image2, ...a);
      return;
    }
    if (a.length === 2) {
      ctx.drawImage(image2, a[0], a[1], size.w, size.h);
      return;
    }
    if (a.length === 8) {
      ctx.drawImage(image2, a[0] * size.sx, a[1] * size.sy, a[2] * size.sx, a[3] * size.sy, ...a.slice(4));
      return;
    }
    ctx.drawImage(image2, ...a);
  }
  function betweenTicks(frame, integerValue) {
    const i = Math.floor(frame), k = frame - i;
    if (!k) return integerValue(i);
    const a = integerValue(i), b = integerValue(i + 1);
    return a + (b - a) * k;
  }

  // reveal/hammerCues.json
  var hammerCues_default = {
    entry: 215,
    land: 271,
    glitch: 331,
    punch: 336,
    body: 343,
    topic: {
      中文: "新粗野主义",
      英文: "NEOBRUTALISM",
      版式: "neo"
    },
    starts: [
      0,
      2,
      4,
      6,
      8,
      10,
      12,
      15,
      18,
      21,
      24,
      26,
      28,
      30,
      32,
      34,
      36,
      38,
      40,
      42,
      44,
      46,
      48,
      49,
      50,
      51,
      52
    ],
    words: [
      {
        中文: "包豪斯",
        英文: "BAUHAUS"
      },
      {
        中文: "拟物化",
        英文: "SKEUOMORPHISM"
      },
      {
        中文: "达达主义",
        英文: "DADA"
      },
      {
        中文: "风格派",
        英文: "DE STIJL"
      },
      {
        中文: "像素风",
        英文: "PIXEL ART"
      },
      {
        中文: "构成主义",
        英文: "CONSTRUCTIVISM"
      },
      {
        中文: "扁平化",
        英文: "FLAT DESIGN"
      },
      {
        中文: "孟菲斯",
        英文: "MEMPHIS"
      },
      {
        中文: "欧普艺术",
        英文: "OP ART"
      },
      {
        中文: "装饰艺术",
        英文: "ART DECO"
      },
      {
        中文: "新拟物",
        英文: "NEUMORPHISM"
      },
      {
        中文: "瑞士国际主义",
        英文: "SWISS STYLE"
      },
      {
        中文: "超现实主义",
        英文: "SURREALISM"
      },
      {
        中文: "波普艺术",
        英文: "POP ART"
      },
      {
        中文: "新艺术运动",
        英文: "ART NOUVEAU"
      },
      {
        中文: "低多边形",
        英文: "LOW POLY"
      },
      {
        中文: "极简主义",
        英文: "MINIMALISM"
      },
      {
        中文: "蒸汽波",
        英文: "VAPORWAVE"
      },
      {
        中文: "网页粗野主义",
        英文: "WEB BRUTALISM"
      },
      {
        中文: "黏土拟态",
        英文: "CLAYMORPHISM"
      },
      {
        中文: "赛博朋克",
        英文: "CYBERPUNK"
      },
      {
        中文: "数字拼贴",
        英文: "DIGITAL COLLAGE"
      },
      {
        中文: "玻璃拟态",
        英文: "GLASSMORPHISM"
      },
      {
        中文: "等距插画",
        英文: "ISOMETRIC"
      },
      {
        中文: "Y2K",
        英文: "Y2K AESTHETIC"
      },
      {
        中文: "故障艺术",
        英文: "GLITCH ART"
      }
    ]
  };

  // reveal/drawing/signalTracks.js
  var W = 1440;
  var H = 1080;
  var center = [720, 523];
  var rayEnds = [[-100, -100], [190, -110], [575, -110], [980, -100], [1470, -90], [1570, 312], [1550, 824], [1310, 1200], [845, 1190], [422, 1190], [-110, 1130], [-100, 644]];
  var lines = [];
  var lerp = (a, b, p) => a + (b - a) * p;
  var clamp = (n) => Math.max(0, Math.min(1, n));
  function parts(a, b, count, isRay) {
    for (let i = 0; i < count; i++) {
      const point = (t) => [lerp(a[0], b[0], t) / W, lerp(a[1], b[1], t) / H];
      let head = point(i / count), foot = point((i + 1) / count);
      if (foot[1] < head[1]) [head, foot] = [foot, head];
      lines.push({ head, foot, isRay });
    }
  }
  rayEnds.forEach((tip, i) => parts(center, tip, i % 2 === 0 ? 2 : 1, true));
  [[320, 252, 800, 545], [468, 341, 505, 350]].forEach(([x, y, w, h], level) => {
    const corners = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
    corners.forEach((p, i) => parts(p, corners[(i + 1) % 4], i % 2 === 0 || level === 0 && i === 1 ? 2 : 1, false));
  });
  lines.sort((a, b) => a.head[0] + a.foot[0] - b.head[0] - b.foot[0] || a.head[1] - b.head[1]);
  var ease = (t) => {
    const u = clamp(t);
    return u * u * (3 - 2 * u);
  };
  function tint(a, b, p) {
    return "rgb(" + a.map((ch, i) => Math.round(lerp(ch, b[i], p))).join(",") + ")";
  }
  function signalTracks(c, w, h, time, morph) {
    const phase = ease(morph), frame = time * 30;
    lines.forEach(({ head, foot, isRay }, i) => {
      const lane = (i + 0.52) / lines.length, run = Math.max(0, time - 5.85);
      const amp = 0.14 + 0.58 * Math.abs(Math.sin(i * 0.47 + time * 5 + run * run * 12) * Math.cos(i * 0.17 - time * 3));
      const p = ease(clamp((phase - 0.07 * Math.abs(lane - 0.5)) / 0.965));
      const horizon = 523 / H;
      const distance = (point) => (point[0] - 0.5) ** 2 + (point[1] - horizon) ** 2;
      const [outer, inner] = distance(head) > distance(foot) ? [head, foot] : [foot, head];
      const sign = outer[1] < horizon ? -1 : 1;
      const gather = ease(morph / 0.62), extend = ease((morph - 0.48) / 0.52);
      const x1 = w * lerp(lane, outer[0], p), y1 = h * lerp(0.5 + sign * amp * 0.5, outer[1], p);
      const x2 = w * lerp(lerp(lane, 0.5, gather), inner[0], extend);
      const y2 = h * lerp(lerp(0.5 - sign * amp * 0.5, horizon, gather), inner[1], extend);
      const ink3 = i % 4 ? [225, 250, 65] : [255, 249, 235], rail = isRay ? [65, 80, 70] : [62, 77, 66];
      const glow = 0.26 * Math.exp(-((frame - 212 - i * 0.17) ** 2) / 15);
      const hue = tint(ink3, rail, clamp(p * (1 - glow)));
      c.save();
      c.globalAlpha *= lerp(0.68 + 0.3 * Math.sin(lane * Math.PI), 1, p);
      c.strokeStyle = hue;
      c.lineWidth = lerp(Math.max(3, w / lines.length * 0.41), isRay ? 1.8 : 2, p);
      c.beginPath();
      c.moveTo(x1, y1);
      c.lineTo(x2, y2);
      c.stroke();
      c.restore();
    });
  }

  // reveal/drawing/cleanHammer.js
  var W2 = 1440;
  var H2 = 1080;
  var ink = "#211e1b";
  var blue = "#a8bad8";
  var gold = "#f2ba4f";
  var red = "#df6248";
  var tunnel = "#101915";
  var pale = "#def39f";
  var clamp2 = (v) => Math.max(0, Math.min(1, v));
  var between = (v, a, b) => clamp2((v - a) / (b - a));
  var smooth = (v) => clamp2(v) ** 2 * (3 - 2 * clamp2(v));
  var out = (v) => 1 - (1 - clamp2(v)) ** 3;
  var glyph = '"Hiragino Sans GB","Heiti SC",sans-serif';
  var latin = '"Helvetica Neue",Arial,sans-serif';
  function box(c, x, y, w, h, color, stroke, width = 1) {
    if (color) {
      c.fillStyle = color;
      c.fillRect(x, y, w, h);
    }
    if (stroke) {
      c.strokeStyle = stroke;
      c.lineWidth = width;
      c.strokeRect(x, y, w, h);
    }
  }
  function line(c, x, y, X, Y, color, width = 2) {
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(X, Y);
    c.strokeStyle = color;
    c.lineWidth = width;
    c.stroke();
  }
  function text(c, label, x, y, size, fill = ink, opt = {}) {
    c.save();
    c.font = (opt.bold || 650) + " " + size + "px " + (opt.en ? latin : glyph);
    c.textAlign = opt.align || "left";
    c.textBaseline = "alphabetic";
    c.letterSpacing = (opt.space || 0) + "px";
    if (opt.edge) {
      c.lineJoin = "round";
      c.lineWidth = opt.edge;
      c.strokeStyle = opt.stroke || ink;
      c.strokeText(label, x, y);
    }
    c.fillStyle = fill;
    c.fillText(label, x, y);
    c.restore();
  }
  function clipBox(c, x, y, w, h) {
    c.beginPath();
    c.rect(x, y, w, h);
    c.clip();
  }
  function triangle(c, points, fill) {
    c.beginPath();
    c.moveTo(...points[0]);
    points.slice(1).forEach((p) => c.lineTo(...p));
    c.closePath();
    c.fillStyle = fill;
    c.fill();
  }
  function runway(c, fade, frame) {
    box(c, 0, 0, W2, H2, tunnel);
    c.save();
    c.globalAlpha = fade;
    signalTracks(c, W2, H2, frame / 30, 1);
    c.restore();
  }
  function flyingWord(c, w, i, dt, n) {
    const side = i % 2 ? -1 : 1, lift = [-1, 0.72, 1, -0.4][i % 4];
    let z, x, y, opacity;
    if (dt < 0) {
      const p = (dt + 3) / 3;
      z = 0.17 + 0.38 * p;
      x = -side * (62 + 55 * (1 - p));
      y = -lift * 75;
      opacity = 0.21 + 0.33 * p;
    } else if (dt < n) {
      const p = dt / n;
      z = 0.83 + 0.85 * p * p;
      x = side * (26 + 445 * p * p);
      y = lift * (24 + 149 * p);
      opacity = 1;
    } else {
      const p = dt - n;
      z = 1.73 + 0.53 * p;
      x = side * (650 + 340 * p);
      y = lift * (182 + 49 * p);
      opacity = 0.41 - 0.16 * p;
    }
    c.save();
    c.globalAlpha = clamp2(opacity);
    c.translate(720 + x, 543 + y);
    c.scale(z, z);
    text(c, w.中文, 0, 0, w.中文.length <= 4 ? 143 : 119, ["#f1f0d5", "#d1e8aa", "#dfdfc8"][i % 3], { align: "center", bold: 800, space: -4, en: w.中文 === "Y2K" });
    c.restore();
  }
  function pose(frame, j) {
    const k = frame - j.land;
    if (k < 0) {
      const p = clamp2((k + 13) / 13);
      const s = p * p * (3 - 2 * p);
      return { z: 0.11 + 0.89 * s, x: 720 + 28 * (1 - s), y: 523 + 17 * s, a: out(p) };
    }
    if (k < 60) return { z: 1 + 0.154 * k / 60, x: 720, y: 540, a: 1 };
    const settle = out(between(frame, j.body, j.body + 33));
    return { z: 1.154 + 8e-3 * out(between(frame, j.glitch, j.body)) - 0.046 * settle, x: 720, y: 540 - 112 * settle, a: 1 };
  }
  function topic(c, f, j, styled) {
    const t = pose(f, j);
    c.save();
    c.globalAlpha = t.a;
    c.translate(t.x, t.y);
    c.scale(t.z, t.z);
    const opt = { bold: 800, align: "center", space: -5.5 };
    if (styled) {
      text(c, j.topic.中文, 10, 59, 162, ink, { ...opt, edge: 7 });
      text(c, j.topic.中文, 0, 49, 162, "#ffdf68", { ...opt, edge: 9 });
    } else text(c, j.topic.中文, 0, 49, 162, pale, opt);
    c.restore();
  }
  function flight(c, f, j) {
    const past = f - j.land;
    runway(c, 1 - 0.85 * smooth(between(past, -3, 23)), f);
    const rule2 = smooth(between(past, -4, 15));
    if (rule2 > 0) {
      c.save();
      c.globalAlpha = rule2;
      [332, 747].forEach((y) => line(c, 710 - 532 * rule2, y, 730 + 532 * rule2, y, "#849868", 2));
      c.restore();
    }
    if (past >= -13) topic(c, f, j, false);
    const now = f - j.entry;
    j.words.forEach((w, i) => {
      const dt = now - j.starts[i], n = j.starts[i + 1] - j.starts[i];
      if (dt >= -3 && dt < n + 2) flyingWord(c, w, i, dt, n);
    });
  }
  function lesson(c, f, j) {
    box(c, 0, 0, W2, H2, "#f4eedf");
    const shift = 112 * out(between(f, j.body, j.body + 33));
    const x = 118, y = 329 - shift, w = 1204, h = 413;
    box(c, x + 17, y + 17, w, h, ink);
    box(c, x, y, w, h, blue, ink, 8);
    c.save();
    clipBox(c, x + 4, y + 4, w - 8, h - 8);
    triangle(c, [[x, y], [x + 128, y], [x, y + 128]], red);
    line(c, x + 1, y + 129, x + 129, y + 1, ink, 5);
    box(c, x + w - 101, y + h - 26, 102, 27, gold, ink, 4);
    box(c, x + w - 148, y + h - 26, 47, 27, red, ink, 4);
    c.restore();
    topic(c, f, j, true);
  }
  function noise(a) {
    const q = Math.sin(a * 12.9898 + 78.233) * 43758.5453;
    return q - Math.floor(q);
  }
  function buffer() {
    return sheet(W2, H2, { alpha: false });
  }
  function context2(e) {
    return e.getContext("2d", { alpha: false, willReadFrequently: false });
  }
  function glitched(c, oldFrame, newFrame, t, punch) {
    const p = (t + 1) / 12;
    const pulse = Math.max(0.23, 1 - Math.abs(t - punch) / 4) * (1 - 0.6 * clamp2((t - 8) / 4));
    const finished = t === 11;
    const bands = 48;
    for (let k = 0; k < bands; k++) {
      const edge = Math.round(k * H2 / bands), bottom = Math.round((k + 1) * H2 / bands), h = bottom - edge;
      const order = 0.54 * k / (bands - 1) + 0.46 * noise(k + 18);
      const source = finished || order <= p ? newFrame : oldFrame;
      const near = Math.abs(order - p);
      const dx = finished ? 0 : Math.round((noise(k * 9 + 37 * Math.floor(t / 2)) - 0.5) * pulse * (near < 0.23 ? 137 : 19));
      blit(c, source, 0, edge, W2, h, dx, edge, W2, h);
      if (dx > 0) blit(c, source, 0, edge, 1, h, 0, edge, dx, h);
      if (dx < 0) blit(c, source, W2 - 1, edge, 1, h, W2 + dx, edge, -dx, h);
      if (!finished && near < 0.18) {
        const scan = 1 + Math.floor(noise(k * 3 + t) * 4);
        c.save();
        c.globalAlpha = 0.55 * pulse;
        box(c, 0, edge + 1, W2, scan, k % 3 ? "#6fbba5" : "#df6657");
        c.restore();
        if (noise(k + 11 * t) > 0.65) {
          c.save();
          c.globalAlpha = 0.38 * pulse;
          blit(c, source, 0, edge, W2, h, dx + (k % 2 ? -12 : 17), edge, W2, h);
          c.restore();
        }
      }
    }
  }
  var previous;
  var next;
  var gate;
  function gateImage() {
    if (!gate) {
      gate = buffer();
      lesson(context2(gate), hammerCues_default.body, hammerCues_default);
    }
    return gate;
  }
  function halfBeatHammer(c, frame, timing) {
    if (frame < timing.staticStart) {
      flight(c, frame, hammerCues_default);
      return;
    }
    if (!previous) {
      previous = buffer();
      next = buffer();
    }
    flight(context2(previous), frame, hammerCues_default);
    const u = between(frame, timing.staticStart, timing.staticLast);
    const phase = betweenTicks(frame, (n) => Math.round(between(n, timing.staticStart, timing.staticLast) * 11));
    lesson(context2(next), hammerCues_default.body, hammerCues_default);
    glitched(c, previous, next, phase, 5);
  }

  // reveal/drawing/base.js
  var W3 = 1440;
  var H3 = 1080;
  var ink2 = "#202021";
  var paper = "#f8f4ea";
  var fontCN = '"Hiragino Sans GB","Heiti SC","Arial",sans-serif';
  var clamp3 = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  var mix = (a, b, p) => a + (b - a) * p;
  var lin = (t, a, b) => clamp3((t - a) / (b - a));
  var smooth2 = (q) => q * q * (3 - 2 * q);
  var step = (t, a, b) => smooth2(lin(t, a, b));
  function rgb(a, b, k) {
    if (k <= 0) return a;
    if (k >= 1) return b;
    const va = parseInt(a.slice(1), 16), vb = parseInt(b.slice(1), 16);
    return "rgb(" + [16, 8, 0].map((s) => Math.round(mix(va >> s & 255, vb >> s & 255, k))).join(",") + ")";
  }
  function rect(c, x, y, w, h, color, stroke = null, lw = 3) {
    if (w <= 0 || h <= 0) return;
    if (color) {
      c.fillStyle = color;
      c.fillRect(x, y, w, h);
    }
    if (stroke) {
      c.strokeStyle = stroke;
      c.lineWidth = lw;
      c.strokeRect(x, y, w, h);
    }
  }
  function txt(c, str, x, y, size, opt = {}) {
    if (!str || size <= 1) return;
    const { color = ink2, weight = 600, align = "left", font = fontCN, max, base = "middle" } = opt;
    c.save();
    c.fillStyle = color;
    c.textAlign = align;
    c.textBaseline = base;
    c.font = weight + " " + size + "px " + font;
    if (max && c.measureText(str).width > max) {
      let s = max / c.measureText(str).width;
      c.translate(x, y);
      c.scale(s, 1);
      c.fillText(str, 0, 0);
    } else c.fillText(str, x, y);
    c.restore();
  }
  function group(c, fn) {
    c.save();
    fn();
    c.restore();
  }
  function clip(c, x, y, w, h, fn) {
    group(c, () => {
      c.beginPath();
      c.rect(x, y, w, h);
      c.clip();
      fn();
    });
  }
  function cover(c, im, x, y, w, h, fx = 0.5, fy = 0.5) {
    if (!im || w <= 0 || h <= 0) return;
    const scale = Math.max(w / im.width, h / im.height), sw = w / scale, sh = h / scale;
    blit(c, im, (im.width - sw) * fx, (im.height - sh) * fy, sw, sh, x, y, w, h);
  }

  // drawing/photos.js
  var pictures = {};

  // reveal/drawing/festival.js
  var acts = [
    { id: "sat1", day: "周六", artist: "沿河声场", time: "16:00", end: "16:45", stage: "草地舞台" },
    { id: "sat2", day: "周六", artist: "南线来信", time: "18:10", end: "18:55", stage: "仓库舞台" },
    { id: "sat3", day: "周六", artist: "夏夜列车", time: "20:00", end: "20:55", stage: "主舞台" },
    { id: "sun1", day: "周日", artist: "折线乐队", time: "15:45", end: "16:25", stage: "草地舞台" },
    { id: "sun2", day: "周日", artist: "北岸白噪", time: "17:30", end: "18:15", stage: "仓库舞台" },
    { id: "sun3", day: "周日", artist: "折线乐队", time: "20:30", end: "21:25", stage: "主舞台" }
  ];
  var featured = acts[5];
  var prior = acts[4];

  // reveal/drawing/press.js
  var lerpRect = (a, b, k) => a.map((v, i) => mix(v, b[i], k));

  // reveal/drawing/museum.js
  var first = [84, 153, 1272, 660];
  var whiteMount = [95, 153, 1250, 669];
  var gate2 = [110, 318, 1240, 456];
  var gateSource = [110, 318, 1240, 456];
  var image = (c, key, r) => cover(c, pictures["gallery_" + key], ...r, 0.51, 0.46);
  function turnPrint(c, r, oldKey, newKey, q, oldZoom = 1) {
    const [x, y, w, h] = r, cols = 10, strip = w / cols;
    const project = (key, focus, fy, zoom = 1) => {
      const im = pictures["gallery_" + key], scale = Math.max(w / im.width, h / im.height) * zoom;
      const sw = w / scale, sh = h / scale;
      return { im, sw: sw / cols, sh, sx: (im.width - sw) * focus, sy: (im.height - sh) * fy };
    };
    const old = project(oldKey, 0.51, 0.46, oldZoom), next2 = project(newKey, 0.46, 0.47);
    for (let i = 0; i < cols; i++) {
      const t = Math.min(1, Math.max(0, (q - i * 0.013) / 0.883));
      const angle = t * Math.PI / 2, front = Math.cos(angle), side = Math.sin(angle);
      const left = x + i * strip, ow = strip * front / (front + side), nw = strip - ow;
      if (ow > 1e-3) blit(c, old.im, old.sx + i * old.sw, old.sy, old.sw, old.sh, left, y, ow + 0.45, h);
      if (nw > 1e-3) blit(c, next2.im, next2.sx + i * next2.sw, next2.sy, next2.sw, next2.sh, left + ow, y, nw + 0.4, h);
      if (t > 0 && t < 1) {
        const shade = Math.sin(angle * 2);
        rect(c, left, y, ow, h, "rgba(13,24,32," + 0.13 * shade + ")");
        rect(c, left + ow, y, nw, h, "rgba(242,246,242," + 0.085 * shade + ")");
      }
    }
  }
  function mount(c, r) {
    rect(c, r[0] + 9, r[1] + 11, r[2], r[3], "#211e1b");
    rect(c, ...r, "#faf5e9", "#211e1b", 5);
  }
  var details = [["glass", "玻璃幕墙", 0.46], ["steel", "钢框架", 0.51], ["white", "刷得雪白的墙", 0.48]];
  function triptych(c, t, r, timing = null) {
    const [x, y, w, h] = r;
    const intro = step(t, ...timing?.glassTurn ?? [17.46, 18.22]), two = step(t, ...timing?.steelTurn ?? [18.16, 18.92]), three = step(t, ...timing?.whiteTurn ?? [18.99, 19.68]);
    const labelH = h * 0.123 * intro, gutter = 12, ww2 = w * two * (0.5 - three / 6), ww3 = w * three / 3;
    const widths = [w - ww2 - ww3, ww2, ww3];
    let xx = x;
    details.forEach(([key, label, focus], i) => {
      const wid = widths[i], pad = i === 0 ? 0 : gutter * Math.min(1, wid / 60), rw2 = wid - pad;
      if (rw2 > 1) {
        const photo = [xx + pad, y, rw2, h - labelH];
        clip(c, ...photo, () => {
          if (i === 0 && intro < 1) turnPrint(c, photo, "wide", "glass", intro, timing ? 1.048 : 1);
          else {
            const minWidth = w / 3 - gutter, planeWidth = Math.max(minWidth, rw2);
            const sampleLeft = photo[0] + (rw2 - planeWidth) * focus;
            cover(c, pictures["gallery_" + key], sampleLeft, photo[1], planeWidth, photo[3], focus, 0.47);
          }
        });
        if (labelH > 4) clip(c, xx + pad, y + h - labelH, rw2, labelH, () => {
          c.globalAlpha = intro;
          txt(c, label, xx + pad + 3, y + h - labelH * 0.47, Math.min(43, h * 0.067), { weight: 750, max: 390 });
        });
      }
      xx += wid;
    });
  }
  function unrollArchive(c, progress) {
    const r = lerpRect(gate2, first, progress), [x, y, w, h] = r;
    const total = 124;
    const release = (at) => Math.min(1, Math.max(0, progress * 1.22 - (1 - at) * 0.22));
    group(c, () => {
      c.beginPath();
      c.moveTo(x - 14, y + h + 16);
      c.lineTo(x - 14, y + h * (1 - release(0)));
      for (let i = 0; i <= total; i++) {
        const at = i / total;
        c.lineTo(x + w * at, y + h * (1 - release(at)) - 0.4);
      }
      c.lineTo(x + w + 16, y + h * (1 - release(1)));
      c.lineTo(x + w + 16, y + h + 16);
      c.closePath();
      c.clip();
      group(c, () => {
        c.globalAlpha = step(progress, 0.02, 0.38);
        mount(c, r);
      });
      image(c, "wide", r);
    });
    for (let i = 0; i < total; i++) {
      const at = (i + 0.5) / total, dx = x + i * w / total, dw = w / total + 0.35;
      const advance = release(at);
      const flat = 1 - advance;
      const bend = Math.sin(advance * Math.PI);
      const edgeY = y + h * flat, roll = h * 0.115 * bend;
      const rawX = gateSource[0] + i * gateSource[2] / total;
      if (flat > 0) {
        blit(
          c,
          gateImage(),
          rawX,
          gateSource[1],
          gateSource[2] / total,
          gateSource[3] * flat,
          dx,
          y,
          dw,
          Math.max(0.02, h * flat)
        );
      }
      if (roll > 0.15) {
        const shade = c.createLinearGradient(0, edgeY, 0, edgeY + roll * 0.51);
        shade.addColorStop(0, "rgba(27,27,26,.28)");
        shade.addColorStop(1, "rgba(27,27,26,0)");
        rect(c, dx, edgeY, dw, roll * 0.51, shade);
        const back = c.createLinearGradient(0, edgeY - roll, 0, edgeY);
        back.addColorStop(0, "#d7d2c5");
        back.addColorStop(0.51, "#fbf8ed");
        back.addColorStop(0.91, "#eae5d5");
        back.addColorStop(1, "#a8a496");
        rect(c, dx, edgeY - roll, dw, roll, back);
      }
    }
  }
  var endBeam = [272, 306, 896, 75];
  var endGlass = [293, 384, 848, 271];
  function sourceQuad(x, y, w, h, rise = 0) {
    return [[x, y], [x + w, y + rise], [x, y + h]];
  }
  var ph = whiteMount[3] * (1 - 0.123);
  var third = whiteMount[2] / 3;
  var gap = 12;
  var right = third * 2 + gap;
  var rw = whiteMount[2] - right;
  var eaveSample = sourceQuad(right + rw * 0.014, ph * 0.524, rw * (0.551 - 0.014), ph * (0.602 - 0.524), ph * (0.488 - 0.524));
  var pieces = [
    { base: sourceQuad(0, 0, third, ph), sample: sourceQuad(19, 211, 364, 182), target: sourceQuad(...endGlass), color: "#829499", density: 0.94 },
    { base: sourceQuad(third + gap, 0, third - gap, ph), sample: sourceQuad(594, 260, 22, 176), target: sourceQuad(1136, 380, 22, 275), color: "#3a4140", density: 0.91 },
    { base: sourceQuad(right, 0, rw, ph), sample: eaveSample, target: sourceQuad(...endBeam), color: "#ddd9c8", density: 0.32 }
  ];
  function narratedHistory(c, t, timing) {
    const open = step(t, timing.beginPhoto, timing.endPeel);
    rect(c, 0, 0, W3, H3, rgb("#f4eedf", paper, open));
    if (open < 1) {
      if (open === 0) blit(c, gateImage(), 0, 0);
      else unrollArchive(c, open);
      return;
    }
    const glass = step(t, ...timing.glassTurn);
    const drift = step(t, timing.endPeel, timing.glassTurn[0]);
    const approach = 1 + 0.048 * drift;
    if (glass === 0) {
      mount(c, first);
      clip(c, ...first, () => {
        c.translate(794, 470);
        c.scale(approach, approach);
        c.translate(-794, -470);
        image(c, "wide", first);
      });
      return;
    }
    const r = lerpRect(first, whiteMount, glass);
    if (glass < 1) group(c, () => {
      c.globalAlpha = 1 - glass;
      mount(c, r);
    });
    triptych(c, t, r, timing);
  }

  // ../../../../../../../../var/folders/99/fwfmgn090cl0c1l5bc51xtcw0000gn/T/neo-4k60-MVi4O2/src/component-entry.js
  async function ready() {
  }
  function draw(c, t) {
    if (t * 30 <= sampleTiming_default.staticLast) halfBeatHammer(c, t * 30, sampleTiming_default);
    else narratedHistory(c, t, sampleTiming_default);
  }
  return __toCommonJS(component_entry_exports);
})();
