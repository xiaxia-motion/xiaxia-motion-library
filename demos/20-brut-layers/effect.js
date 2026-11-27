// 按钮边框与硬阴影分层测量 · 夏夏的AI灵感
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
    for (const name2 of ["shadowBlur", "shadowOffsetX", "shadowOffsetY", "filter"]) {
      const native = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, name2);
      if (!native?.set) continue;
      Object.defineProperty(ctx, name2, {
        configurable: true,
        get() {
          const value = native.get.call(this);
          return name2 === "filter" ? value : value / baseScale(this.canvas);
        },
        set(value) {
          const k = baseScale(this.canvas);
          native.set.call(this, name2 === "filter" ? String(value).replace(/blur\(\s*([\d.]+)px\s*\)/g, (_, n) => "blur(" + Number(n) * k + "px)") : value * k);
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
  var latin = '"Helvetica Neue",Arial,sans-serif';
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
  function pointer(c, x, y, sc = 1) {
    group(c, () => {
      c.translate(x, y);
      c.scale(sc, sc);
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(6, 39);
      c.lineTo(15, 28);
      c.lineTo(24, 44);
      c.lineTo(32, 40);
      c.lineTo(22, 24);
      c.lineTo(37, 22);
      c.closePath();
      c.fillStyle = white;
      c.fill();
      c.lineWidth = 3;
      c.strokeStyle = ink;
      c.stroke();
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
  function heavy(c, s, x, y, size, max, opt = {}) {
    txt(c, s, x, y, size, { weight: 900, max, ...opt });
  }
  function plus(c, x, y, size, fg = F.ink) {
    rule(c, x - size / 2, y, x + size / 2, y, fg, size * 0.15);
    rule(c, x, y - size / 2, x, y + size / 2, fg, size * 0.15);
  }

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

  // local:three
  var { AdditiveBlending, BoxGeometry, CanvasTexture, Color, DirectionalLight, DoubleSide, Group, HemisphereLight, IcosahedronGeometry, InstancedBufferAttribute, InstancedBufferGeometry, LinearFilter, Mesh, MeshBasicMaterial, MeshStandardMaterial, OrthographicCamera, PerspectiveCamera, PlaneGeometry, Quaternion, RepeatWrapping, SRGBColorSpace, Scene, ShaderMaterial, Vector3, WebGLRenderer } = globalThis.THREE;

  // drawing/space.js
  var lens = 1580;
  var rad = Math.PI / 180;
  var texCache = /* @__PURE__ */ new Map();
  var plainGeo = /* @__PURE__ */ new PlaneGeometry(1, 1);
  function surface(w, h, paint, ratio = SCALE) {
    const cn = sheet(w, h, void 0, ratio);
    const ctx = cn.getContext("2d");
    paint(ctx, w, h);
    return cn;
  }
  function texture(cn) {
    const tx = new CanvasTexture(cn);
    tx.colorSpace = SRGBColorSpace;
    tx.generateMipmaps = false;
    tx.minFilter = LinearFilter;
    tx.magFilter = LinearFilter;
    return tx;
  }
  function artTex(key, w, h, paint, ratio = SCALE) {
    if (!texCache.has(key)) texCache.set(key, texture(surface(w, h, paint, ratio)));
    return texCache.get(key);
  }
  function plane(tex, color = "#ffffff", alpha = true) {
    return new Mesh(plainGeo, new MeshBasicMaterial({ map: tex, color, side: DoubleSide, transparent: alpha, depthWrite: !alpha, toneMapped: false }));
  }
  function pose(mesh, x, y, z, w, h, rx = 0, ry = 0, rz = 0) {
    mesh.position.set(x, -y, z);
    mesh.rotation.order = "YXZ";
    mesh.rotation.set(rx * rad, ry * rad, -rz * rad);
    mesh.scale.set(w, h, 1);
    return mesh;
  }
  var studioRig = null;
  function studio() {
    if (studioRig) return studioRig;
    const renderer = new WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(SCALE);
    renderer.setSize(W, H, false);
    mark(renderer.domElement, W, H);
    renderer.setClearColor(0, 0);
    renderer.outputColorSpace = SRGBColorSpace;
    const cam = new PerspectiveCamera(2 * Math.atan(H / 2 / lens) / rad, W / H, 5, 12e3);
    studioRig = { renderer, cam };
    return studioRig;
  }
  function aim(x = 0, y = 0, z = 0, d = lens, yaw = 0, pitch = 0, roll = 0) {
    const { cam } = studio(), Y = yaw * rad, P = pitch * rad;
    cam.up.set(0, 1, 0);
    cam.position.set(x + d * Math.sin(Y) * Math.cos(P), -y + d * Math.sin(P), z + d * Math.cos(Y) * Math.cos(P));
    cam.lookAt(x, -y, z);
    cam.rotateZ(roll * rad);
    cam.updateMatrixWorld();
  }
  function expose(c, world) {
    const s = studio();
    s.renderer.render(world, s.cam);
    blit(c, s.renderer.domElement, 0, 0);
  }
  function band(t, a, b, c, d) {
    return step(t, a, b) * (1 - step(t, c, d));
  }

  // drawing/camera.js
  var rig;
  function buttonLayers() {
    const world = new Scene(), back = plane(null, ink), edge = plane(null, ink);
    const face = plane(artTex("新粗野主义题名面", 960, 228, (c, w, h) => {
      rect(c, 0, 0, w, h, F.acid);
      txt(c, "新粗野主义", w * 0.5, h * 0.5, 103, { align: "center", weight: 800 });
    }));
    world.add(back, edge, face);
    back.renderOrder = 2;
    edge.renderOrder = 3;
    face.renderOrder = 4;
    return { world, back, edge, face };
  }
  function gauge(c, fromX, fromY, endX, endY, value, progress) {
    if (progress <= 0) return;
    group(c, () => {
      c.globalAlpha = progress;
      const reachX = mix(fromX, endX, progress), reachY = mix(fromY, endY, progress);
      const dirX = endX > fromX ? 1 : -1;
      rule(c, fromX - 5, fromY, fromX + 5, fromY, ink, 3);
      rule(c, fromX, fromY, reachX, reachY, ink, 2);
      rule(c, reachX, reachY, reachX + dirX * 24 * progress, reachY, ink, 2);
      txt(c, value, reachX + dirX * 36, reachY, 52, { align: dirX > 0 ? "left" : "right", font: latin, weight: 700 });
    });
  }
  function featureButton(c, actual) {
    const advance = step(actual, 66.16, 67.43) * 40 / 30;
    const legacy = 33.67 + actual - 32.4863333333 + advance;
    specimenShot(c, legacy, step(actual, 66.86, 67.57), actual);
  }
  function specimenShot(c, t, align = 0, demoTime = null) {
    if (!rig) rig = buttonLayers();
    const { world, face, edge, back } = rig;
    const spread = band(t, 62.25, 65.94, 68.43, 70) * (1 - align);
    let angle = band(t, 60.68, 63.63, 68.9, 70.12) * (1 - align);
    let reach = step(t, 60.68, 61.56) * (1 - align), mount = 1 - step(t, 61.43, 62.6);
    let yaw = angle * (-24 + 44 * step(t, 63.19, 68.56));
    let x = -16, y = -59.5, w = 748, h = 179, d = 12 + 11 * (1 - align) * step(t, 65.13, 66.7);
    let ring = 4.5 + 2.8 * (1 - align) * step(t, 62.65, 64.49);
    let bx = spread * 67, by = spread * 51, bz = -spread * 133, ez = spread * 78, fz = spread * 102 + 0.1;
    rect(c, 0, 0, W, H, paper);
    let guide = null;
    if (demoTime !== null) {
      const a = demoTime, zoom = step(a, 59.82, 61.44), join = step(a, 66.38, 66.965);
      const studyWidth = mix(748, 960, zoom), k = studyWidth / 218;
      const stroke = 2 + 2 * step(a, 62.3, 62.55);
      const shadow = 4 * step(a, 64.045, 64.39) + 4 * step(a, 64.7, 64.96);
      const mountFold = step(a, 59.82, 60.94);
      if (mountFold < 1) {
        const fold = (v, to) => mix(v, to, mountFold);
        board(c, fold(173, 337), fold(294, 395), fold(1094, 733), fold(375, 170), white, 10 * (1 - mountFold));
      }
      mount = 0;
      x = mix(mix(-16, 0, zoom), x, join);
      y = mix(mix(-59.5, -88, zoom), y, join);
      w = mix(studyWidth, w, join);
      h = mix(studyWidth * 179 / 748, h, join);
      ring = mix(mix(4.5, stroke * k, zoom), ring, join);
      d = mix(mix(12, 0, zoom) + shadow * k + ring * 0.5 * step(a, 64.045, 64.38), d, join);
      angle *= join;
      reach *= join;
      yaw *= join;
      bx *= join;
      by *= join;
      bz *= join;
      ez *= join;
      fz = mix(0.1, fz, join);
      const boundary = step(a, 61.97, 62.12) * (1 - step(a, 63.7, 64.01));
      const drop = step(a, 64.38, 64.55) * (1 - step(a, 65.76, 66));
      if (boundary > 0) guide = [W / 2 + x - w * 0.22, H / 2 + y - h / 2, W / 2 + x - w * 0.22 - 78, H / 2 + y - h / 2 - 72, Math.round(stroke) + " px", boundary];
      else if (drop > 0) guide = [W / 2 + x + w / 2 + d, H / 2 + y + h / 2 + d, W / 2 + x + w / 2 + d - 36, H / 2 + y + h / 2 + d + 78, Math.round(shadow) + " px", drop];
    }
    if (mount > 0) group(c, () => {
      c.globalAlpha = mount;
      board(c, 173, 294, 1094, 375, white, 10);
    });
    aim(-15 * reach, -28 * reach, 0, lens - 123 * angle, yaw, -angle * 22, -angle * 2.8);
    pose(back, x + d + bx, y + d + by, bz, w, h);
    pose(edge, x, y, ez, w + ring, h + ring);
    pose(face, x, y, fz, w - ring, h - ring);
    expose(c, world);
    if (guide) gauge(c, ...guide);
  }

  // drawing/colorFlow.js
  var buttonBox = [320, 374, 800, 190];
  var ink2 = "#191a17";
  var colors = ["#ffe22b", "#ff8cc3", "#56d6e1", "#82e57c"];
  var slotA = [208, 452, 496, 150];
  var slotB = [727, 452, 502, 150];
  var oldButton = [330, 391, 748, 179];
  var between = (a, b, u) => a.map(([x, y], i) => [mix(x, b[i][0], u), mix(y, b[i][1], u)]);
  function polygon(c, pts, fill, line = 0) {
    c.beginPath();
    pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y));
    c.closePath();
    c.fillStyle = fill;
    c.fill();
    if (line) {
      c.lineWidth = line;
      c.lineJoin = "miter";
      c.strokeStyle = ink2;
      c.stroke();
    }
  }
  function boxPoints(r, side = 0, fract = 0) {
    const [x, y, w, h] = r, edge = x + (side ? 0 : w), outer = x + (side ? w : 0);
    const zig = [[0, 0], [-0.033, 0.18], [0.043, 0.32], [-0.022, 0.51], [0.041, 0.71], [-0.024, 0.85], [0, 1]];
    return [[outer, y], ...zig.map(([d, dy]) => [edge + w * d * fract, y + h * dy]), [outer, y + h]];
  }
  function pairRect(r, side, sep) {
    const [x, y, w, h] = r;
    return [x + side * w * 0.5 + (side ? 1 : -1) * sep, y, w * 0.5, h];
  }
  function path(c, pts, col, width) {
    c.beginPath();
    pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y));
    c.strokeStyle = col;
    c.lineWidth = width;
    c.stroke();
  }
  var previewHit = 2069 / 30;
  var yellowHit = 2092 / 30;
  var cyanHit = 2123 / 30;
  function rush(t, start, contact, distance) {
    const progress = lin(t, start, contact);
    return distance * (1 - progress * progress * progress);
  }
  function force(t, at) {
    const age = t - at;
    if (age < 0) return { stretch: 0, bounce: 0 };
    const compression = Math.sin(Math.PI * lin(age, 0, 0.126));
    const freeAge = Math.max(0, age - 0.126);
    return { stretch: compression, bounce: freeAge > 0 ? Math.abs(Math.sin(freeAge * 20)) * Math.exp(-11.5 * freeAge) : 0 };
  }
  function fracture(c, r, at, t, power, seed) {
    const age = t - at;
    if (age < 0 || age > 0.67) return;
    const [x, y, w, h] = r, cx = x + w / 2, cy = y + h * 0.53, scale = Math.min(1, w / 880) * power;
    group(c, () => {
      const flash = (1 - step(age, 0.035, 0.17)) * scale;
      const arms = [[[0, 0], [-16, -21], [-29, -18], [-52, -50], [-83, -65]], [[0, 0], [10, 14], [30, 17], [48, 44], [89, 57]], [[0, 0], [18, -5], [23, -24], [44, -41]]];
      if (flash > 0) {
        const reach = (0.47 + 0.53 * step(age, 0, 0.065)) * scale;
        for (const arm of arms) {
          const pts = arm.map(([a, b]) => [cx + a * reach, cy + b * reach]);
          path(c, pts, ink2, 7 * flash);
          path(c, pts, "#fff9d2", 2.5 * flash);
        }
      }
      c.globalAlpha = 1 - step(age, 0.39, 0.67);
      for (let i = 0; i < 15; i++) {
        const n = i * 37 + seed, sign = i % 2 ? 1 : -1;
        const vx = sign * (90 + n % 288) * scale, vy = -(66 + n * 3 % 279) * scale;
        const px = cx + vx * age, py = cy + (i % 5 - 2) * 4 * scale + vy * age + 790 * age * age;
        const size = (2.7 + n % 5) * scale, turn = age * (3 + n % 14) * sign + i * 1.34;
        const dx = Math.cos(turn) * size, dy = Math.sin(turn) * size;
        polygon(c, [[px - dx, py - dy], [px + dy + dx * 0.3, py - dx + dy * 0.3], [px + dx, py + dy]], i % 4 ? ink2 : "#fff0ad");
      }
    });
  }
  var endRects = ([x, y, w, h]) => [[x, y, w * 0.71, h], [x + w * 0.71, y, w * 0.29, h * 0.53], [x + w * 0.71, y + h * 0.53, w * 0.145, h * 0.47], [x + w * 0.855, y + h * 0.53, w * 0.145, h * 0.47]];
  function fourButton(c, r, press = 0, alpha = 1) {
    const d = Math.min(15, r[3] * 0.1), off = d * press, R = [r[0] + off, r[1] + off, r[2], r[3]], [x, y, w, h] = R;
    group(c, () => {
      c.globalAlpha = alpha;
      rect(c, r[0] + d, r[1] + d, w, h, ink2);
      endRects(R).forEach((s, i) => rect(c, ...s, colors[i], ink2, Math.max(3, h * 0.027)));
      rect(c, ...R, null, ink2, Math.max(4, h * 0.036));
      heavy(c, "加入行程", x + w * 0.058, y + h * 0.51, h * 0.47, w * 0.63);
      plus(c, x + w * 0.855, y + h * 0.265, h * 0.29);
    });
  }
  function colorFlow(c, t) {
    const align = step(t, 66.86, 67.57), enter = step(t, 67.57, 68.46), fuse = step(t, 71.36, 72.12);
    if (t < 67.57) {
      const cameraLead = step(t, 66.16, 67.43) * 40 / 30;
      specimenShot(c, 33.67 + t - 32.4863333333 + cameraLead, align);
      return;
    }
    rect(c, 0, 0, W, H, paper);
    const aLand = step(t, yellowHit + 0.13, 70.32), bLand = step(t, cyanHit + 0.13, 71.37);
    const bigA = lerpRect(oldButton, [193, 277, 1054, 372], step(t, 67.57, 68.45));
    const a = lerpRect(bigA, slotA, aLand);
    const bShow = step(t, 70.08, 70.38);
    const bStage = lerpRect([700, 452, 8, 3], [610, 216, 602, 219], bShow);
    const b = lerpRect(bStage, slotB, bLand);
    const target = endRects(buttonBox);
    const preparation = step(t, 67.62, 68.48);
    let aGap = 150 * preparation;
    if (t > 68.5 && t < previewHit) aGap = rush(t, 68.5, previewHit, 150);
    if (t >= previewHit) {
      const flight = lin(t, previewHit + 0.1, 69.41);
      aGap = 128 * (2 * flight - flight * flight);
      if (t >= 69.41) aGap = rush(t, 69.41, yellowHit, 128);
    }
    const bGap = bShow * rush(t, 70.39, cyanHit, 142);
    const prs = step(t, 72.84, 73.13) * (1 - step(t, 74.88, 75.42));
    if (fuse === 1) {
      fourButton(c, buttonBox, prs);
      const appear = step(t, 72.22, 72.88) * (1 - step(t, 75.12, 75.58));
      if (appear > 0) group(c, () => {
        c.globalAlpha = appear;
        pointer(c, buttonBox[0] + buttonBox[2] * 0.81 + (1 - appear) * 109 + prs * 12, buttonBox[1] + buttonBox[3] * 0.38 + prs * 13, 0.97);
      });
      return;
    }
    const data = [[a, aGap, yellowHit, 1], [b, bGap, cyanHit, bShow]];
    data.forEach(([r, gap, at, show], pair) => {
      if (!show) return;
      const response = force(t, pair === 0 && t < 69.41 ? previewHit : at);
      group(c, () => {
        for (let side = 0; side < 2; side++) {
          const idx = pair * 2 + side, flat = pairRect(r, side, gap);
          const sign = side === 0 ? -1 : 1, loss = flat[2] * 0.13 * response.stretch;
          if (side === 0) flat[0] += loss;
          flat[2] -= loss;
          flat[0] += sign * response.bounce * r[2] * 0.023;
          const swell = flat[3] * 0.048 * response.stretch;
          flat[1] -= swell;
          flat[3] += 2 * swell;
          const crack = pair === 0 ? step(t, previewHit, previewHit + 0.065) : step(t, cyanHit, cyanHit + 0.065);
          const pts = between(boxPoints(flat, side, crack), boxPoints(target[idx], side, 0), fuse);
          const depth = mix(12 * show, 14, fuse);
          group(c, () => {
            c.translate(depth, depth);
            polygon(c, pts, ink2);
          });
          polygon(c, pts, pair === 0 ? rgb(F.acid, colors[idx], step(t, 67.57, 68.2)) : colors[idx], mix(5 * show, 6, fuse));
        }
      });
    });
    fracture(c, [193, 277, 1054, 372], previewHit, t, 0.64, 5);
    fracture(c, [193, 277, 1054, 372], yellowHit, t, 1, 19);
    fracture(c, [610, 216, 602, 219], cyanHit, t, 1.1, 41);
    const keep = 1 - step(t, 67.57, 67.94);
    if (keep > 0) {
      const [x, y, w, h] = a;
      group(c, () => {
        c.translate(0, y + h * 0.5);
        c.scale(1, keep);
        txt(c, "新粗野主义", x + w * 0.5, 0, 81, { align: "center", weight: 800 });
      });
    }
    if (fuse > 0) group(c, () => {
      c.globalAlpha = step(fuse, 0.48, 1);
      const [x, y, w, h] = buttonBox;
      heavy(c, "加入行程", x + w * 0.058, y + h * 0.51, h * 0.47, w * 0.63);
      plus(c, x + w * 0.855, y + h * 0.265, h * 0.29);
    });
  }

  // ../../../../../../../../var/folders/99/fwfmgn090cl0c1l5bc51xtcw0000gn/T/neo-4k60-MVi4O2/src/component-entry.js
  async function ready() {
  }
  function draw(c, t) {
    const actual = t + 74 / 30;
    if (actual < 60.68 - 33.67 + 32.486333333333334) nameCard(c, t + 74 / 30 + 33.67 - 32.486333333333334);
    else if (actual < 67) featureButton(c, actual);
    else colorFlow(c, actual);
  }
  return __toCommonJS(component_entry_exports);
})();
