// 从声级窗冲入字阵 · 夏夏的AI灵感
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

  // native.js
  var sizes = /* @__PURE__ */ new WeakMap();
  function blit(ctx, image, ...a) {
    const size = sizes.get(image);
    if (!size) {
      ctx.drawImage(image, ...a);
      return;
    }
    if (a.length === 2) {
      ctx.drawImage(image, a[0], a[1], size.w, size.h);
      return;
    }
    if (a.length === 8) {
      ctx.drawImage(image, a[0] * size.sx, a[1] * size.sy, a[2] * size.sx, a[3] * size.sy, ...a.slice(4));
      return;
    }
    ctx.drawImage(image, ...a);
  }

  // drawing/base.js
  var W = 1440;
  var H = 1080;
  var ink = "#202021";
  var paper = "#f8f4ea";
  var fontCN = '"Hiragino Sans GB","Heiti SC","Arial",sans-serif';
  var clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  var mix = (a, b, p) => a + (b - a) * p;
  var lin = (t, a, b) => clamp((t - a) / (b - a));
  var smooth = (q) => q * q * (3 - 2 * q);
  var step = (t, a, b) => smooth(lin(t, a, b));
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
  function rule(c, x1, y1, x2, y2, color = ink, lw = 3) {
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.lineWidth = lw;
    c.strokeStyle = color;
    c.stroke();
  }
  function txt(c, str, x, y, size, opt = {}) {
    if (!str || size <= 1) return;
    const { color = ink, weight = 600, align = "left", font = fontCN, max, base = "middle" } = opt;
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
  function arrow(c, x, y, size, opt = {}) {
    const { color = ink, angle = -Math.PI / 4, width = 0.105 } = opt;
    group(c, () => {
      c.translate(x, y);
      c.rotate(angle);
      c.lineWidth = size * width;
      c.lineCap = "square";
      c.lineJoin = "miter";
      c.strokeStyle = color;
      c.beginPath();
      c.moveTo(-size * 0.47, 0);
      c.lineTo(size * 0.42, 0);
      c.moveTo(size * 0.05, -size * 0.36);
      c.lineTo(size * 0.42, 0);
      c.lineTo(size * 0.05, size * 0.36);
      c.stroke();
    });
  }

  // hammerCues.json
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

  // drawing/signalTracks.js
  var W2 = 1440;
  var H2 = 1080;
  var center = [720, 523];
  var rayEnds = [[-100, -100], [190, -110], [575, -110], [980, -100], [1470, -90], [1570, 312], [1550, 824], [1310, 1200], [845, 1190], [422, 1190], [-110, 1130], [-100, 644]];
  var lines = [];
  var lerp = (a, b, p) => a + (b - a) * p;
  var clamp2 = (n) => Math.max(0, Math.min(1, n));
  function parts(a, b, count, isRay) {
    for (let i = 0; i < count; i++) {
      const point = (t) => [lerp(a[0], b[0], t) / W2, lerp(a[1], b[1], t) / H2];
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
    const u = clamp2(t);
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
      const p = ease(clamp2((phase - 0.07 * Math.abs(lane - 0.5)) / 0.965));
      const horizon = 523 / H2;
      const distance = (point) => (point[0] - 0.5) ** 2 + (point[1] - horizon) ** 2;
      const [outer, inner] = distance(head) > distance(foot) ? [head, foot] : [foot, head];
      const sign = outer[1] < horizon ? -1 : 1;
      const gather = ease(morph / 0.62), extend = ease((morph - 0.48) / 0.52);
      const x1 = w * lerp(lane, outer[0], p), y1 = h * lerp(0.5 + sign * amp * 0.5, outer[1], p);
      const x2 = w * lerp(lerp(lane, 0.5, gather), inner[0], extend);
      const y2 = h * lerp(lerp(0.5 - sign * amp * 0.5, horizon, gather), inner[1], extend);
      const ink5 = i % 4 ? [225, 250, 65] : [255, 249, 235], rail = isRay ? [65, 80, 70] : [62, 77, 66];
      const glow = 0.26 * Math.exp(-((frame - 212 - i * 0.17) ** 2) / 15);
      const hue = tint(ink5, rail, clamp2(p * (1 - glow)));
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

  // drawing/cleanHammer.js
  var ink2 = "#211e1b";
  var clamp3 = (v) => Math.max(0, Math.min(1, v));
  var glyph = '"Hiragino Sans GB","Heiti SC",sans-serif';
  var latin = '"Helvetica Neue",Arial,sans-serif';
  function text(c, label, x, y, size, fill = ink2, opt = {}) {
    c.save();
    c.font = (opt.bold || 650) + " " + size + "px " + (opt.en ? latin : glyph);
    c.textAlign = opt.align || "left";
    c.textBaseline = "alphabetic";
    c.letterSpacing = (opt.space || 0) + "px";
    if (opt.edge) {
      c.lineJoin = "round";
      c.lineWidth = opt.edge;
      c.strokeStyle = opt.stroke || ink2;
      c.strokeText(label, x, y);
    }
    c.fillStyle = fill;
    c.fillText(label, x, y);
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
    c.globalAlpha = clamp3(opacity);
    c.translate(720 + x, 543 + y);
    c.scale(z, z);
    text(c, w.中文, 0, 0, w.中文.length <= 4 ? 143 : 119, ["#f1f0d5", "#d1e8aa", "#dfdfc8"][i % 3], { align: "center", bold: 800, space: -4, en: w.中文 === "Y2K" });
    c.restore();
  }
  function entryWords(c, frame) {
    const progress = clamp3((frame - 206) / (hammerCues_default.entry - 206)), scale = progress * progress;
    if (scale === 0) return;
    c.save();
    c.translate(720, 523);
    c.scale(scale, scale);
    c.translate(-720, -523);
    hammerCues_default.words.forEach((word, i) => {
      const dt = -hammerCues_default.starts[i], length = hammerCues_default.starts[i + 1] - hammerCues_default.starts[i];
      if (dt >= -3 && dt < length + 2) flyingWord(c, word, i, dt, length);
    });
    c.restore();
  }

  // drawing/photos.js
  var pictures = {};
  async function loadPhotos() {
    await Promise.all(Object.entries(window.NEO_MEDIA || {}).map(([id, url]) => new Promise((resolve, reject) => {
      const im = new Image();
      im.onload = () => {
        pictures[id] = im;
        resolve();
      };
      im.onerror = () => reject(Error("图片无法读取 " + id));
      im.src = url;
    })));
  }

  // drawing/festival.js
  var F = { ink: "#171916", bone: "#fff9eb", acid: "#e1fa41", cobalt: "#293ee3", coral: "#ff7355", muted: "#585b51", dark: "#101915", cream: "#fbf7e8", num: '"DIN Condensed","Arial Narrow","Helvetica Neue",sans-serif' };
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
  var posterPhoto = (c, x, y, w, h, fy = 0.31) => cover(c, pictures.guitar, x, y, w, h, 0.56, fy);
  function heavy(c, s, x, y, size, max, opt = {}) {
    txt(c, s, x, y, size, { weight: 900, max, ...opt });
  }
  function logo(c, x, y, w, color = F.ink) {
    const bars = [0.49, 0.89, 0.66, 1, 0.4];
    bars.forEach((v, i) => rect(c, x + w * i * 0.198, y + (1 - v) * w * 0.46, w * 0.123, v * w * 0.9, color));
  }

  // drawing/festivalOpening.js
  function signalWindow(c, x, y, w, h, t, flight) {
    clip(c, x, y, w, h, () => {
      rect(c, x, y, w, h, F.dark);
      group(c, () => {
        c.translate(x, y);
        signalTracks(c, w, h, t, flight);
        if (t > 6.85) {
          c.scale(w / W, h / H);
          entryWords(c, t * 30);
        }
      });
    });
  }
  function festivalOpening(c, t) {
    const lift = step(t, 0.76, 0.92), color = step(t, 1.62, 1.82), join = step(t, 2.55, 3.37);
    const knock = Math.sin(Math.PI * step(t, 3.23, 3.53)) * 8;
    const bx = mix(160, 73, join), by = mix(265, 77, join) + knock, bw = mix(1119, 1285, join), bh = mix(480, 790, join);
    const split = mix(0.718, 0.493, join) * bw, head = 79;
    const flight = lin(t, 5.91, 215 / 30);
    const push = flight * flight * (2.34 - 1.34 * flight);
    const lens = 1 + 0.7 * push;
    const gx = bx + split + 6, gw = bw - split - 12, gh = 108, gy = by + bh - gh - 7;
    const aimX = gx + gw * 0.5, aimY = gy + gh * 0.49;
    const dx = push * (720 - aimX), dy = push * (500 - aimY);
    const proj = (x, y) => [aimX + dx + (x - aimX) * lens, aimY + dy + (y - aimY) * lens];
    rect(c, 0, 0, W, H, paper);
    group(c, () => {
      c.translate(aimX + dx, aimY + dy);
      c.scale(lens, lens);
      c.translate(-aimX, -aimY);
      rect(c, bx + 21 * lift, by + 23 * lift, bw, bh, F.ink);
      rect(c, bx, by, bw, bh, F.bone, F.ink, 8);
      clip(c, bx + 4, by + 4, bw - 8, bh - 8, () => {
        rect(c, bx, by + bh * (1 - color), bw, bh, F.acid);
        rect(c, bx + split + bw * (1 - color), by, bw - split, bh, F.cobalt, F.ink, 7);
        if (join < 1) {
          const roll = step(t, 0.77, 0.98) + step(t, 1.66, 1.87);
          group(c, () => {
            c.globalAlpha = 1 - join;
            clip(c, bx + 40, by + bh * 0.3, 800, bh * 0.42, () => {
              ["粗黑边框", "硬阴影", "鲜明色块"].forEach((l, i) => heavy(c, l, bx + 48, by + bh * 0.52 + (i - roll) * 204 - join * 125, 146, 780));
            });
            arrow(c, bx + bw * 0.86, by + bh * 0.5, 132, { angle: -Math.PI / 4 });
          });
        }
        if (join > 0) {
          group(c, () => {
            c.translate(0, -head * (1 - join));
            rect(c, bx, by, bw, head, F.ink);
            logo(c, bx + 27, by + 18, 42, F.acid);
            txt(c, "独立音乐节", bx + 90, by + 40, 35, { weight: 750, color: F.bone });
            txt(c, "演出阵容", bx + bw - 213, by + 40, 30, { color: F.bone, align: "right" });
            txt(c, "我的行程", bx + bw - 32, by + 40, 30, { color: F.acid, align: "right" });
          });
          const lx = bx + 34, ty = by + head, hh = bh - head;
          clip(c, bx + 4, ty, (split - 6) * join, hh - 4, () => {
            rect(c, bx, ty, split, hh, F.acid);
            txt(c, "周六  /  周日", lx + 3, ty + 61, 35, { weight: 690 });
            heavy(c, "周末", lx - 3, ty + 202, 167, split - 74);
            heavy(c, "现场", lx - 3, ty + 374, 167, split - 74);
            rule(c, lx, ty + 479, bx + split - 37, ty + 479, F.ink, 7);
            const cw = split - 76;
            rect(c, lx + 8, ty + 527 + 8, cw, 104, F.ink);
            rect(c, lx, ty + 527, cw, 104, F.bone, F.ink, 5);
            heavy(c, "选演出场次", lx + 25, ty + 579, 54, cw - 130);
            arrow(c, lx + cw - 53, ty + 579, 47);
          });
          const px = bx + split + 6, pw = bw - split - 12, ph = hh - gh - 8;
          clip(c, px + pw * (1 - join), ty, pw * join, hh, () => {
            posterPhoto(c, px, ty, pw, ph, 0.35);
            rect(c, px + 19, ty + 21, 253, 54, F.coral, F.ink, 4);
            txt(c, "折线乐队", px + 145, ty + 49, 32, { align: "center", weight: 800 });
            rect(c, px, gy, pw, gh, F.dark);
            if (flight === 0) signalWindow(c, px, gy, pw, gh, t, 0);
          });
          rule(c, bx + split, ty, bx + split, by + bh, F.ink, 8);
        }
      });
    });
    if (flight > 0) {
      const origin = proj(gx, gy), u = step(flight, 0.04, 0.97);
      const x = mix(origin[0], 0, u), y = mix(origin[1], 0, u), rw = mix(gw * lens, W, u), rh = mix(gh * lens, H, u);
      signalWindow(c, x, y, rw, rh, t, flight);
    }
  }

  // reveal/drawing/base.js
  var W3 = 1440;
  var H3 = 1080;
  var ink3 = "#202021";
  var paper2 = "#f8f4ea";
  var fontCN2 = '"Hiragino Sans GB","Heiti SC","Arial",sans-serif';
  var clamp4 = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  var mix2 = (a, b, p) => a + (b - a) * p;
  var lin2 = (t, a, b) => clamp4((t - a) / (b - a));
  var smooth2 = (q) => q * q * (3 - 2 * q);
  var step2 = (t, a, b) => smooth2(lin2(t, a, b));
  function rect2(c, x, y, w, h, color, stroke = null, lw = 3) {
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
  function rule2(c, x1, y1, x2, y2, color = ink3, lw = 3) {
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.lineWidth = lw;
    c.strokeStyle = color;
    c.stroke();
  }
  function txt2(c, str, x, y, size, opt = {}) {
    if (!str || size <= 1) return;
    const { color = ink3, weight = 600, align = "left", font = fontCN2, max, base = "middle" } = opt;
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
  function group2(c, fn) {
    c.save();
    fn();
    c.restore();
  }
  function clip2(c, x, y, w, h, fn) {
    group2(c, () => {
      c.beginPath();
      c.rect(x, y, w, h);
      c.clip();
      fn();
    });
  }
  function cover2(c, im, x, y, w, h, fx = 0.5, fy = 0.5) {
    if (!im || w <= 0 || h <= 0) return;
    const scale = Math.max(w / im.width, h / im.height), sw = w / scale, sh = h / scale;
    blit(c, im, (im.width - sw) * fx, (im.height - sh) * fy, sw, sh, x, y, w, h);
  }
  function arrow2(c, x, y, size, opt = {}) {
    const { color = ink3, angle = -Math.PI / 4, width = 0.105 } = opt;
    group2(c, () => {
      c.translate(x, y);
      c.rotate(angle);
      c.lineWidth = size * width;
      c.lineCap = "square";
      c.lineJoin = "miter";
      c.strokeStyle = color;
      c.beginPath();
      c.moveTo(-size * 0.47, 0);
      c.lineTo(size * 0.42, 0);
      c.moveTo(size * 0.05, -size * 0.36);
      c.lineTo(size * 0.42, 0);
      c.lineTo(size * 0.05, size * 0.36);
      c.stroke();
    });
  }

  // reveal/hammerCues.json
  var hammerCues_default2 = {
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
  var W4 = 1440;
  var H4 = 1080;
  var center2 = [720, 523];
  var rayEnds2 = [[-100, -100], [190, -110], [575, -110], [980, -100], [1470, -90], [1570, 312], [1550, 824], [1310, 1200], [845, 1190], [422, 1190], [-110, 1130], [-100, 644]];
  var lines2 = [];
  var lerp2 = (a, b, p) => a + (b - a) * p;
  var clamp5 = (n) => Math.max(0, Math.min(1, n));
  function parts2(a, b, count, isRay) {
    for (let i = 0; i < count; i++) {
      const point = (t) => [lerp2(a[0], b[0], t) / W4, lerp2(a[1], b[1], t) / H4];
      let head = point(i / count), foot = point((i + 1) / count);
      if (foot[1] < head[1]) [head, foot] = [foot, head];
      lines2.push({ head, foot, isRay });
    }
  }
  rayEnds2.forEach((tip, i) => parts2(center2, tip, i % 2 === 0 ? 2 : 1, true));
  [[320, 252, 800, 545], [468, 341, 505, 350]].forEach(([x, y, w, h], level) => {
    const corners = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
    corners.forEach((p, i) => parts2(p, corners[(i + 1) % 4], i % 2 === 0 || level === 0 && i === 1 ? 2 : 1, false));
  });
  lines2.sort((a, b) => a.head[0] + a.foot[0] - b.head[0] - b.foot[0] || a.head[1] - b.head[1]);
  var ease2 = (t) => {
    const u = clamp5(t);
    return u * u * (3 - 2 * u);
  };
  function tint2(a, b, p) {
    return "rgb(" + a.map((ch, i) => Math.round(lerp2(ch, b[i], p))).join(",") + ")";
  }
  function signalTracks2(c, w, h, time, morph) {
    const phase = ease2(morph), frame = time * 30;
    lines2.forEach(({ head, foot, isRay }, i) => {
      const lane = (i + 0.52) / lines2.length, run = Math.max(0, time - 5.85);
      const amp = 0.14 + 0.58 * Math.abs(Math.sin(i * 0.47 + time * 5 + run * run * 12) * Math.cos(i * 0.17 - time * 3));
      const p = ease2(clamp5((phase - 0.07 * Math.abs(lane - 0.5)) / 0.965));
      const horizon = 523 / H4;
      const distance = (point) => (point[0] - 0.5) ** 2 + (point[1] - horizon) ** 2;
      const [outer, inner] = distance(head) > distance(foot) ? [head, foot] : [foot, head];
      const sign = outer[1] < horizon ? -1 : 1;
      const gather = ease2(morph / 0.62), extend = ease2((morph - 0.48) / 0.52);
      const x1 = w * lerp2(lane, outer[0], p), y1 = h * lerp2(0.5 + sign * amp * 0.5, outer[1], p);
      const x2 = w * lerp2(lerp2(lane, 0.5, gather), inner[0], extend);
      const y2 = h * lerp2(lerp2(0.5 - sign * amp * 0.5, horizon, gather), inner[1], extend);
      const ink5 = i % 4 ? [225, 250, 65] : [255, 249, 235], rail = isRay ? [65, 80, 70] : [62, 77, 66];
      const glow = 0.26 * Math.exp(-((frame - 212 - i * 0.17) ** 2) / 15);
      const hue = tint2(ink5, rail, clamp5(p * (1 - glow)));
      c.save();
      c.globalAlpha *= lerp2(0.68 + 0.3 * Math.sin(lane * Math.PI), 1, p);
      c.strokeStyle = hue;
      c.lineWidth = lerp2(Math.max(3, w / lines2.length * 0.41), isRay ? 1.8 : 2, p);
      c.beginPath();
      c.moveTo(x1, y1);
      c.lineTo(x2, y2);
      c.stroke();
      c.restore();
    });
  }

  // reveal/drawing/cleanHammer.js
  var ink4 = "#211e1b";
  var clamp6 = (v) => Math.max(0, Math.min(1, v));
  var glyph2 = '"Hiragino Sans GB","Heiti SC",sans-serif';
  var latin2 = '"Helvetica Neue",Arial,sans-serif';
  function text2(c, label, x, y, size, fill = ink4, opt = {}) {
    c.save();
    c.font = (opt.bold || 650) + " " + size + "px " + (opt.en ? latin2 : glyph2);
    c.textAlign = opt.align || "left";
    c.textBaseline = "alphabetic";
    c.letterSpacing = (opt.space || 0) + "px";
    if (opt.edge) {
      c.lineJoin = "round";
      c.lineWidth = opt.edge;
      c.strokeStyle = opt.stroke || ink4;
      c.strokeText(label, x, y);
    }
    c.fillStyle = fill;
    c.fillText(label, x, y);
    c.restore();
  }
  function flyingWord2(c, w, i, dt, n) {
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
    c.globalAlpha = clamp6(opacity);
    c.translate(720 + x, 543 + y);
    c.scale(z, z);
    text2(c, w.中文, 0, 0, w.中文.length <= 4 ? 143 : 119, ["#f1f0d5", "#d1e8aa", "#dfdfc8"][i % 3], { align: "center", bold: 800, space: -4, en: w.中文 === "Y2K" });
    c.restore();
  }
  function entryWords2(c, frame) {
    const progress = clamp6((frame - 206) / (hammerCues_default2.entry - 206)), scale = progress * progress;
    if (scale === 0) return;
    c.save();
    c.translate(720, 523);
    c.scale(scale, scale);
    c.translate(-720, -523);
    hammerCues_default2.words.forEach((word, i) => {
      const dt = -hammerCues_default2.starts[i], length = hammerCues_default2.starts[i + 1] - hammerCues_default2.starts[i];
      if (dt >= -3 && dt < length + 2) flyingWord2(c, word, i, dt, length);
    });
    c.restore();
  }

  // reveal/drawing/festival.js
  var F2 = { ink: "#171916", bone: "#fff9eb", acid: "#e1fa41", cobalt: "#293ee3", coral: "#ff7355", muted: "#585b51", dark: "#101915", cream: "#fbf7e8", num: '"DIN Condensed","Arial Narrow","Helvetica Neue",sans-serif' };
  var acts2 = [
    { id: "sat1", day: "周六", artist: "沿河声场", time: "16:00", end: "16:45", stage: "草地舞台" },
    { id: "sat2", day: "周六", artist: "南线来信", time: "18:10", end: "18:55", stage: "仓库舞台" },
    { id: "sat3", day: "周六", artist: "夏夜列车", time: "20:00", end: "20:55", stage: "主舞台" },
    { id: "sun1", day: "周日", artist: "折线乐队", time: "15:45", end: "16:25", stage: "草地舞台" },
    { id: "sun2", day: "周日", artist: "北岸白噪", time: "17:30", end: "18:15", stage: "仓库舞台" },
    { id: "sun3", day: "周日", artist: "折线乐队", time: "20:30", end: "21:25", stage: "主舞台" }
  ];
  var featured2 = acts2[5];
  var prior2 = acts2[4];
  var posterPhoto2 = (c, x, y, w, h, fy = 0.31) => cover2(c, pictures.guitar, x, y, w, h, 0.56, fy);
  function heavy2(c, s, x, y, size, max, opt = {}) {
    txt2(c, s, x, y, size, { weight: 900, max, ...opt });
  }
  function logo2(c, x, y, w, color = F2.ink) {
    const bars = [0.49, 0.89, 0.66, 1, 0.4];
    bars.forEach((v, i) => rect2(c, x + w * i * 0.198, y + (1 - v) * w * 0.46, w * 0.123, v * w * 0.9, color));
  }

  // reveal/drawing/festivalOpening.js
  function signalWindow2(c, x, y, w, h, t, flight) {
    clip2(c, x, y, w, h, () => {
      rect2(c, x, y, w, h, F2.dark);
      group2(c, () => {
        c.translate(x, y);
        signalTracks2(c, w, h, t, flight);
        if (t > 6.85) {
          c.scale(w / W3, h / H3);
          entryWords2(c, t * 30);
        }
      });
    });
  }
  function festivalOpening2(c, t) {
    const lift = step2(t, 0.76, 0.92), color = step2(t, 1.62, 1.82), join = step2(t, 2.55, 3.37);
    const knock = Math.sin(Math.PI * step2(t, 3.23, 3.53)) * 8;
    const bx = mix2(160, 73, join), by = mix2(265, 77, join) + knock, bw = mix2(1119, 1285, join), bh = mix2(480, 790, join);
    const split = mix2(0.718, 0.493, join) * bw, head = 79;
    const flight = lin2(t, 5.91, 215 / 30);
    const push = flight * flight * (2.34 - 1.34 * flight);
    const lens = 1 + 0.7 * push;
    const gx = bx + split + 6, gw = bw - split - 12, gh = 108, gy = by + bh - gh - 7;
    const aimX = gx + gw * 0.5, aimY = gy + gh * 0.49;
    const dx = push * (720 - aimX), dy = push * (500 - aimY);
    const proj = (x, y) => [aimX + dx + (x - aimX) * lens, aimY + dy + (y - aimY) * lens];
    rect2(c, 0, 0, W3, H3, paper2);
    group2(c, () => {
      c.translate(aimX + dx, aimY + dy);
      c.scale(lens, lens);
      c.translate(-aimX, -aimY);
      rect2(c, bx + 21 * lift, by + 23 * lift, bw, bh, F2.ink);
      rect2(c, bx, by, bw, bh, F2.bone, F2.ink, 8);
      clip2(c, bx + 4, by + 4, bw - 8, bh - 8, () => {
        rect2(c, bx, by + bh * (1 - color), bw, bh, F2.acid);
        rect2(c, bx + split + bw * (1 - color), by, bw - split, bh, F2.cobalt, F2.ink, 7);
        if (join < 1) {
          const roll = step2(t, 0.77, 0.98) + step2(t, 1.66, 1.87);
          group2(c, () => {
            c.globalAlpha = 1 - join;
            clip2(c, bx + 40, by + bh * 0.3, 800, bh * 0.42, () => {
              ["粗黑边框", "硬阴影", "鲜明色块"].forEach((l, i) => heavy2(c, l, bx + 48, by + bh * 0.52 + (i - roll) * 204 - join * 125, 146, 780));
            });
            arrow2(c, bx + bw * 0.86, by + bh * 0.5, 132, { angle: -Math.PI / 4 });
          });
        }
        if (join > 0) {
          group2(c, () => {
            c.translate(0, -head * (1 - join));
            rect2(c, bx, by, bw, head, F2.ink);
            logo2(c, bx + 27, by + 18, 42, F2.acid);
            txt2(c, "独立音乐节", bx + 90, by + 40, 35, { weight: 750, color: F2.bone });
            txt2(c, "演出阵容", bx + bw - 213, by + 40, 30, { color: F2.bone, align: "right" });
            txt2(c, "我的行程", bx + bw - 32, by + 40, 30, { color: F2.acid, align: "right" });
          });
          const lx = bx + 34, ty = by + head, hh = bh - head;
          clip2(c, bx + 4, ty, (split - 6) * join, hh - 4, () => {
            rect2(c, bx, ty, split, hh, F2.acid);
            txt2(c, "周六  /  周日", lx + 3, ty + 61, 35, { weight: 690 });
            heavy2(c, "周末", lx - 3, ty + 202, 167, split - 74);
            heavy2(c, "现场", lx - 3, ty + 374, 167, split - 74);
            rule2(c, lx, ty + 479, bx + split - 37, ty + 479, F2.ink, 7);
            const cw = split - 76;
            rect2(c, lx + 8, ty + 527 + 8, cw, 104, F2.ink);
            rect2(c, lx, ty + 527, cw, 104, F2.bone, F2.ink, 5);
            heavy2(c, "选演出场次", lx + 25, ty + 579, 54, cw - 130);
            arrow2(c, lx + cw - 53, ty + 579, 47);
          });
          const px = bx + split + 6, pw = bw - split - 12, ph = hh - gh - 8;
          clip2(c, px + pw * (1 - join), ty, pw * join, hh, () => {
            posterPhoto2(c, px, ty, pw, ph, 0.35);
            rect2(c, px + 19, ty + 21, 253, 54, F2.coral, F2.ink, 4);
            txt2(c, "折线乐队", px + 145, ty + 49, 32, { align: "center", weight: 800 });
            rect2(c, px, gy, pw, gh, F2.dark);
            if (flight === 0) signalWindow2(c, px, gy, pw, gh, t, 0);
          });
          rule2(c, bx + split, ty, bx + split, by + bh, F2.ink, 8);
        }
      });
    });
    if (flight > 0) {
      const origin = proj(gx, gy), u = step2(flight, 0.04, 0.97);
      const x = mix2(origin[0], 0, u), y = mix2(origin[1], 0, u), rw = mix2(gw * lens, W3, u), rh = mix2(gh * lens, H3, u);
      signalWindow2(c, x, y, rw, rh, t, flight);
    }
  }

  // ../../../../../../../../var/folders/99/fwfmgn090cl0c1l5bc51xtcw0000gn/T/neo-4k60-MVi4O2/src/component-entry.js
  async function ready() {
    await loadPhotos();
  }
  function draw(c, t) {
    (t < 6 ? festivalOpening : festivalOpening2)(c, t);
  }
  return __toCommonJS(component_entry_exports);
})();
