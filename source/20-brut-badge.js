// 网页取景与徽章硬影弯折 · 夏夏的AI灵感
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

  // drawing/photos.js
  var pictures = {};

  // drawing/base.js
  var ink = "#202021";
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

  // drawing/festival.js
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

  // drawing/press.js
  var lerpRect = (a, b, k) => a.map((v, i) => mix(v, b[i], k));

  // drawing/exhibition.js
  var gumBox = { x: 242, y: 126, w: 956, h: 956 * 894 / 1152 };
  var gumRect = [gumBox.x, gumBox.y, gumBox.w, gumBox.h];
  var caseButton = { x: gumBox.x + gumBox.w * 75 / 1152, y: gumBox.y + gumBox.h * 747 / 894, w: gumBox.w * 289 / 1152, h: gumBox.h * 68 / 894 };
  var filmTime = (t) => t - (33.67 - 32.486333333333334);
  var full = [576, 447, 1152];
  var blackLine = [983.5, 266, 337];
  var pink = [280, 432, 560];
  var detailBox = [147, 151, 1146, 673];
  var macro = [801, 746.5, 390];
  var crops = [
    [50.65, 51.4, blackLine, [105, 209, 1230, 530]],
    [51.67, 52.4, pink, [109, 193, 1222, 554]],
    [52.46, 53.34, macro, detailBox]
  ];
  function sourceArea(focus, box) {
    const [cx, cy, w] = focus, h = w * box[3] / box[2];
    return [Math.max(0, Math.min(1152 - w, cx - w / 2)), Math.max(0, Math.min(894 - h, cy - h / 2)), w, h];
  }
  function bendAmount(q) {
    const x = q - 53.496;
    if (x < 0 || x > 0.24) return 0;
    if (x <= 0.034) return Math.cos(x / 0.034 * 0.45) * 8;
    if (x <= 0.114) return mix(7.2, -1.85, step(x, 0.034, 0.114));
    return mix(-1.85, 0, step(x, 0.114, 0.24));
  }
  function foldShadow(c, image, k) {
    const left = 739, top = 705, right = 797, floor = 792;
    const rows = 9, cols = 6, dx = (right - left) / cols, dy = (floor - top) / rows;
    const point = (i, j) => {
      const x = left + dx * i, y = top + dy * j;
      const ax = Math.sin(Math.PI * i / cols), ay = Math.sin(Math.PI * j / rows);
      const amount = k * ax * ay * (0.5 + Math.max(0, 1 - Math.abs(x - 768 + (y - 749) * 0.52) / 22));
      return [x + amount, y + amount * 0.55];
    };
    function facet(s, a, b, d) {
      const sx = s[0], sy = s[1], ux = (b[0] - a[0]) / dx, uy = (b[1] - a[1]) / dx;
      const vx = (d[0] - a[0]) / dy, vy = (d[1] - a[1]) / dy;
      group(c, () => {
        c.beginPath();
        c.moveTo(...a);
        c.lineTo(...b);
        c.lineTo(...d);
        c.closePath();
        c.clip();
        c.transform(ux, uy, vx, vy, a[0] - ux * sx - vx * sy, a[1] - uy * sx - vy * sy);
        blit(c, image, 0, 0);
      });
    }
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const a = point(i, j), b = point(i + 1, j), d = point(i, j + 1), e = point(i + 1, j + 1), sx = left + dx * i, sy = top + dy * j;
      facet([sx, sy], a, b, d);
      group(c, () => {
        c.beginPath();
        c.moveTo(...e);
        c.lineTo(...b);
        c.lineTo(...d);
        c.closePath();
        c.clip();
        const ux = (e[0] - d[0]) / dx, uy = (e[1] - d[1]) / dx, vx = (e[0] - b[0]) / dy, vy = (e[1] - b[1]) / dy;
        c.transform(ux, uy, vx, vy, e[0] - ux * (sx + dx) - vx * (sy + dy), e[1] - uy * (sx + dx) - vy * (sy + dy));
        blit(c, image, 0, 0);
      });
    }
  }
  function picture(c, r, src, q) {
    const [x, y, w, h] = r, [sx, sy, sw, sh] = src, im = pictures.gum;
    rect(c, x + 9, y + 9, w, h, ink);
    clip(c, x, y, w, h, () => {
      c.translate(x, y);
      c.scale(w / sw, h / sh);
      c.translate(-sx, -sy);
      blit(c, im, 0, 0);
      const k = bendAmount(q);
      if (Math.abs(k) > 0.02) foldShadow(c, im, k);
    });
    rect(c, x, y, w, h, null, ink, 4);
  }
  function caseSheet(c, t, openingRect = null) {
    const q = filmTime(t);
    if (openingRect) {
      picture(c, openingRect, [0, 0, 1152, 894], q);
      return;
    }
    let r = gumRect, focus = full;
    for (const [a, b, target, frame] of crops) {
      const p = step(q, a, b);
      if (p <= 0) break;
      focus = focus.map((n, i) => mix(n, target[i], p));
      r = lerpRect(r, frame, p);
    }
    picture(c, r, sourceArea(focus, r), q);
  }

  // sample-pages.js
  function makeSamples(pictures2, ids, shop) {
    function surface(w, h) {
      const paper2 = document.createElement("canvas");
      paper2.width = w;
      paper2.height = h;
      return [paper2, paper2.getContext("2d")];
    }
    function label(c2, value, x, y, size, bold = true, ink2 = "#191923") {
      c2.fillStyle = ink2;
      c2.font = (bold ? "750 " : "450 ") + size + "px Arial,sans-serif";
      c2.fillText(value, x, y);
    }
    function box(c2, x, y, w, h, color, r = 0) {
      c2.fillStyle = color;
      c2.beginPath();
      c2.roundRect(x, y, w, h, r);
      c2.fill();
    }
    const titles = ["Fieldwork", "Weekly planner", "Paper Forms", "Studio Notes", "Common Space", "Plain Type", "Track Record", "Daylight", "Signal Room", "Open Frame"];
    ids.forEach((id, i) => {
      const [p2, c2] = surface(828, 915), colors = ["#bfceff", "#e1e9bb", "#efbb9b", "#e2d9ec", "#bddbd4"];
      const accent = colors[i % colors.length], dark = "#181922";
      box(c2, 0, 0, 828, 915, "#fafaf7");
      box(c2, 40, 35, 23, 23, dark, 5);
      label(c2, titles[i], 78, 55, 23);
      label(c2, "Journal     About     Studio", 404, 55, 18, false);
      box(c2, 664, 24, 118, 46, dark, 22);
      label(c2, "Get started", 680, 54, 17, false, "#ffffff");
      label(c2, ["AN INDEPENDENT STUDIO", "TOOLS FOR DAILY WORK", "DESIGN NOTES"][i % 3], 52, 164, 16);
      label(c2, ["Make space", "A little more", "Better ideas"][i % 3], 48, 255, 72);
      label(c2, ["for good work.", "room to play.", "start here."][i % 3], 48, 337, 72);
      label(c2, "A collection of projects, working notes and experiments.", 53, 392, 20, false);
      box(c2, 52, 427, 157, 43, dark, 22);
      label(c2, "Explore the work", 65, 455, 17, false, "#ffffff");
      box(c2, 42, 511, 744, 351, accent, 20);
      c2.save();
      c2.beginPath();
      c2.roundRect(42, 511, 744, 351, 20);
      c2.clip();
      for (let k = 0; k < 11; k++) {
        c2.strokeStyle = k % 3 === 0 ? "#42434f" : "#ffffff";
        c2.lineWidth = 5 + i % 3;
        c2.beginPath();
        c2.ellipse(385 + 20 * Math.sin(i), 680, 72 + k * 26, 40 + k * 23, 0.13 * (i % 5), 0, Math.PI * 2);
        c2.stroke();
      }
      box(c2, 77, 764, 233, 64, "#fffdf4", 12);
      label(c2, "Edition " + String(i + 1).padStart(2, "0"), 97, 806, 28);
      c2.restore();
      pictures2[id] = p2;
    });
    if (!shop) return;
    const [p, c] = surface(1152, 894);
    box(c, 0, 0, 1152, 894, "#f594c4");
    box(c, 0, 0, 1152, 83, "#fff5dc");
    box(c, 0, 80, 1152, 5, "#161619");
    label(c, "PRINT CLUB", 32, 57, 37);
    label(c, "Editions     Artists     Shop", 540, 52, 24, false);
    box(c, 925, 0, 227, 80, "#141518");
    label(c, "Join the club", 949, 50, 27, true, "#fff5dc");
    label(c, "Independent", 46, 280, 104);
    label(c, "paper editions.", 46, 400, 97);
    label(c, "Small runs of bold visual experiments.", 64, 491, 32, false);
    box(c, 65, 733, 301, 88, "#1b1b1b");
    box(c, 58, 725, 301, 88, "#fff6d6");
    label(c, "See the editions", 75, 780, 32);
    box(c, 746, 701, 57, 105, "#15151a");
    box(c, 692, 682, 90, 110, "#ffbd49");
    c.strokeStyle = "#15151a";
    c.lineWidth = 6;
    c.strokeRect(692, 682, 90, 110);
    label(c, "P", 709, 765, 70);
    c.save();
    c.translate(889, 394);
    c.rotate(-0.2);
    box(c, -153, -151, 302, 302, "#15151a");
    box(c, -165, -164, 300, 300, "#fad05b");
    c.lineWidth = 8;
    c.strokeRect(-165, -164, 300, 300);
    label(c, "PRINT", -149, -47, 61);
    label(c, "NO. 03", -149, 42, 60);
    c.restore();
    pictures2.gum = p;
  }

  // ../../../../../../../../var/folders/99/fwfmgn090cl0c1l5bc51xtcw0000gn/T/neo-4k60-MVi4O2/src/component-entry.js
  async function ready() {
    makeSamples(pictures, [], true);
  }
  function draw(c, t) {
    c.fillStyle = "#f8f4ea";
    c.fillRect(0, 0, 1440, 1080);
    caseSheet(c, t + 74 / 30 + 33.67 - 32.486333333333334);
  }
  return __toCommonJS(component_entry_exports);
})();
