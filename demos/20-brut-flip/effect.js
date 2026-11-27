// 徽章翻成题名按钮 · 夏夏的AI灵感
var NeoEffect = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name2 in all)
      __defProp(target, name2, { get: all[name2], enumerable: true });
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
  var white = "#fffdf6";
  var yellow = "#ffdc48";
  var fontCN = '"Hiragino Sans GB","Heiti SC","Arial",sans-serif';
  var clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  var mix = (a, b, p) => a + (b - a) * p;
  var lin = (t, a, b) => clamp((t - a) / (b - a));
  var smooth = (q) => q * q * (3 - 2 * q);
  var step = (t, a, b) => smooth(lin(t, a, b));
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
  function board(c, x, y, w, h, fill = white, depth = 10) {
    rect(c, x + depth, y + depth, w, h, ink);
    rect(c, x, y, w, h, fill, ink, 4);
  }

  // drawing/photos.js
  var pictures = {};

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
  var badgeCrop = [688, 683, 104, 127];
  function detailSource() {
    const h = macro[2] * detailBox[3] / detailBox[2];
    return [macro[0] - macro[2] / 2, macro[1] - h / 2, macro[2], h];
  }
  function sourceArea(focus, box) {
    const [cx, cy, w] = focus, h = w * box[3] / box[2];
    return [Math.max(0, Math.min(1152 - w, cx - w / 2)), Math.max(0, Math.min(894 - h, cy - h / 2)), w, h];
  }
  function badgeAtRest() {
    const [x, y, w, h] = detailBox, [sx, sy, sw, sh] = detailSource();
    return [x + (badgeCrop[0] - sx) * w / sw, y + (badgeCrop[1] - sy) * h / sh, badgeCrop[2] * w / sw, badgeCrop[3] * h / sh];
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

  // drawing/plates.js
  var title = [164, 271, 1112, 384];
  var panel = [173, 294, 1094, 375];
  var button = [330, 391, 748, 179];
  var name = "新粗野主义";
  function printMask(c, shape, radius) {
    const [x, y, w, h] = shape, [dx, dy, dw, dh] = detailBox, im = pictures.gum;
    c.beginPath();
    c.roundRect(x + 9, y + 9, w, h, radius);
    c.fillStyle = ink;
    c.fill();
    group(c, () => {
      c.beginPath();
      c.roundRect(x, y, w, h, radius);
      c.clip();
      blit(c, im, ...detailSource(), dx, dy, dw, dh);
    });
    c.beginPath();
    c.roundRect(x, y, w, h, radius);
    c.strokeStyle = ink;
    c.lineWidth = 4;
    c.stroke();
  }
  function pageToBadge(c, t, q) {
    const k = step(q, 55.61, 56.5);
    if (k <= 0) {
      caseSheet(c, t);
      return;
    }
    const badge = badgeAtRest(), r = lerpRect(detailBox, badge, k);
    const turn = step(q, 56.5, 57.07), heading = Math.cos(turn * Math.PI / 2);
    const x = r[0] + r[2] / 2, y = r[1] + r[3] / 2;
    group(c, () => {
      c.translate(mix(x, 720, turn), mix(y, 463, turn) - Math.sin(turn * Math.PI) * 16);
      c.rotate(-0.055 * Math.sin(turn * Math.PI));
      c.scale(Math.max(4e-3, heading), 1);
      c.translate(-x, -y);
      printMask(c, r, Math.min(r[2], r[3]) * 0.5 * k);
    });
  }
  function titleFace(c, q) {
    const flip = step(q, 57.07, 57.32), incoming = step(q, 57.316, 57.336);
    const settle = step(q, 58.58, 59.46);
    const [, , bw, bh] = badgeAtRest();
    const born = lerpRect([720 - bw / 2, 463 - bh / 2, bw, bh], title, flip);
    const frame = lerpRect(title, panel, settle), face = lerpRect(born, button, settle);
    const [x, y, w, h] = face, angle = Math.max(1e-3, Math.sin(Math.PI * 0.5 * flip));
    if (settle > 0) board(c, ...frame, white, 10);
    group(c, () => {
      c.translate(x + w / 2, y + h / 2);
      c.scale(angle, 1);
      c.translate(-w / 2, -h / 2);
      const radius = Math.min(w, h) * 0.48 * (1 - flip);
      c.beginPath();
      c.roundRect(mix(9, 12, settle), mix(9, 12, settle), w, h, radius);
      c.fillStyle = ink;
      c.fill();
      c.beginPath();
      c.roundRect(0, 0, w, h, radius);
      c.fillStyle = rgb(yellow, F.acid, settle);
      c.fill();
      c.strokeStyle = ink;
      c.lineWidth = 4;
      c.stroke();
      if (flip > 0.2) group(c, () => {
        c.translate(w * 0.5, h * 0.5);
        c.scale(1, mix(5e-3, 1, incoming));
        txt(c, name, 0, 0, mix(171, 81, settle), { align: "center", weight: settle < 0.5 ? 900 : 800, max: w * 0.89 });
      });
    });
  }
  function nameCard(c, t) {
    const q = filmTime(t);
    rect(c, 0, 0, W, H, paper);
    if (q < 57.07) {
      pageToBadge(c, t, q);
      return;
    }
    titleFace(c, q);
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
    nameCard(c, t + 74 / 30 + 33.67 - 32.486333333333334);
  }
  return __toCommonJS(component_entry_exports);
})();
