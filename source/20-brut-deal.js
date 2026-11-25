// 十张网页旋转发牌 · 夏夏的AI灵感
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

  // local:three
  var { AdditiveBlending, BoxGeometry, CanvasTexture, Color, DirectionalLight, DoubleSide, Group, HemisphereLight, IcosahedronGeometry, InstancedBufferAttribute, InstancedBufferGeometry, LinearFilter, Mesh, MeshBasicMaterial, MeshStandardMaterial, OrthographicCamera, PerspectiveCamera, PlaneGeometry, Quaternion, RepeatWrapping, SRGBColorSpace, Scene, ShaderMaterial, Vector3, WebGLRenderer } = globalThis.THREE;

  // sites.json
  var sites_default = [{ id: "example1" }, { id: "example2" }, { id: "example3" }, { id: "example4" }, { id: "example5" }, { id: "example6" }, { id: "example7" }, { id: "example8" }, { id: "example9" }, { id: "example10" }];

  // beats.json
  var beats_default = {
    glass: 17.903,
    steel: 18.683,
    wall: 19.363,
    concrete: 30.1,
    mark: 32.36,
    launch: 37.69,
    spinStop: 38.46,
    deal: 39.1,
    interval: 0.117,
    flight: 0.54,
    float: 40.91,
    focus: 41.55,
    shine: 44.04,
    return: 45.42,
    impact: 48.58,
    print: 75.36,
    dealOrder: [
      1,
      4,
      0,
      6,
      2,
      8,
      5,
      7,
      3,
      9
    ]
  };

  // drawing/photos.js
  var pictures = {};

  // drawing/base.js
  var W = 1440;
  var H = 1080;
  var ink = "#202021";
  var paper = "#f8f4ea";
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
  function rounded(c, x, y, w, h, r, fill, stroke = null, lw = 3) {
    c.beginPath();
    c.roundRect(x, y, w, h, r);
    if (fill) {
      c.fillStyle = fill;
      c.fill();
    }
    if (stroke) {
      c.lineWidth = lw;
      c.strokeStyle = stroke;
      c.stroke();
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
  function band(t, a, b, c, d) {
    return step(t, a, b) * (1 - step(t, c, d));
  }

  // drawing/particles.js
  function makeDust() {
    let seed = 832814;
    const random = () => (seed = Math.imul(seed, 1664525) + 1013904223 >>> 0) / 4294967296;
    const count = 1280, points = [], depth = [], weight = [], tint = [];
    for (let i = 0; i < count; i++) {
      const a = 2 * Math.PI * random(), radius = 22 + Math.sqrt(random()) * 1060;
      points.push(Math.cos(a) * radius, Math.sin(a) * radius * 0.73);
      depth.push(random());
      weight.push(0.3 + random() ** 1.7 * 0.7);
      tint.push(random());
    }
    const geo = new InstancedBufferGeometry().copy(new PlaneGeometry(1, 1));
    geo.instanceCount = count;
    for (const [key, values, size] of [["seedXY", points, 2], ["seedZ", depth, 1], ["weight", weight, 1], ["tint", tint, 1]]) geo.setAttribute(key, new InstancedBufferAttribute(new Float32Array(values), size));
    const mat = new ShaderMaterial({
      uniforms: { travel: { value: 0 }, speed: { value: 0 } },
      vertexShader: `attribute vec2 seedXY;attribute float seedZ;attribute float weight;attribute float tint;
 uniform float travel;uniform float speed;varying vec2 st;varying vec3 color;varying float lum;
 void main(){
  float z=fract(seedZ-travel), invz=1./(.17+1.52*z);
  vec2 origin=vec2(0.,-9.),p=seedXY*invz,dir=normalize(p),side=vec2(dir.y,-dir.x);
  float proximity=clamp((invz-.58)*.68,0.,1.);
  float width=(.85+weight*1.65)*(1.+.65*proximity);
  float len=width+speed*length(p)*(.010+.088*proximity)*weight;
  vec2 px=origin+p+side*position.x*width+dir*((position.y-.5)*len);
  gl_Position=vec4(px/vec2(720.,540.),.99,1.);
  st=uv;lum=smoothstep(0.,.12,z)*(1.-smoothstep(.84,1.,z))*(.30+.62*weight)*(.65+.35*speed);
  color=mix(vec3(.68,.82,1.),vec3(.94,.95,.90),tint);
 }`,
      fragmentShader: `varying vec2 st;varying vec3 color;varying float lum;void main(){
 float core=1.-smoothstep(.05,1.,abs(st.x*2.-1.));
 float tail=smoothstep(0.,.82,st.y)*(1.-smoothstep(.78,1.,st.y));
 gl_FragColor=vec4(color,lum*core*(.06+tail*.94));}`,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: AdditiveBlending
    });
    const field = new Mesh(geo, mat);
    field.frustumCulled = false;
    return field;
  }

  // drawing/softFocus.js
  var panelW = 1e3;
  var panelH = 526;
  var start = 40.47;
  var openEnd = 41.18;
  var returnStart = 44.42;
  var end = 44.97;
  var onsets = { corners: 41.17, shadow: 41.99, color: 42.8, glass: 43.64 };
  var ink2 = "#252337";
  var layers;
  function makeLayer(w, h) {
    const canvas = sheet(w, h);
    return { canvas, ctx: canvas.getContext("2d") };
  }
  function roundedPath(c, x, y, w, h, r) {
    c.beginPath();
    c.roundRect(x, y, w, h, Math.min(Math.max(0, r), w / 2, h / 2));
  }
  function disk(c, x, y, r, style) {
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    c.fillStyle = style;
    c.fill();
  }
  function cutRecord() {
    const { canvas, ctx: c } = makeLayer(672, 672);
    c.translate(336, 336);
    const base = c.createConicGradient(-0.48, 0, 0);
    [
      [0, "#24223f"],
      [0.075, "#56536c"],
      [0.16, "#1d1c32"],
      [0.26, "#29263e"],
      [0.41, "#76738d"],
      [0.49, "#343148"],
      [0.58, "#242237"],
      [0.72, "#454258"],
      [0.8, "#8c87a1"],
      [0.88, "#373448"],
      [1, "#24223f"]
    ].forEach(([o, v]) => base.addColorStop(o, v));
    disk(c, 0, 0, 328, base);
    for (let n = 0; n < 67; n++) {
      const r = 117 + n * 3.11;
      c.beginPath();
      c.arc(0, 0, r, 0, Math.PI * 2);
      c.strokeStyle = n % 5 === 0 ? "rgba(229,223,240,.43)" : "rgba(219,212,247,.20)";
      c.lineWidth = n % 5 === 0 ? 1.4 : 0.75;
      c.stroke();
    }
    c.strokeStyle = "#b4adc7";
    c.lineWidth = 2.4;
    c.beginPath();
    c.arc(0, 0, 325, 0, Math.PI * 2);
    c.stroke();
    disk(c, 0, 0, 112, "#edb58e");
    c.save();
    c.beginPath();
    c.arc(0, 0, 111, 0, Math.PI * 2);
    c.clip();
    c.lineWidth = 9;
    c.strokeStyle = "#7a4a62";
    for (let i = 0; i < 6; i++) {
      c.beginPath();
      c.ellipse(75 + i * 12, 54, 89, 134, -0.48, 0, Math.PI * 2);
      c.stroke();
    }
    c.restore();
    disk(c, 0, 0, 9, "#262338");
    disk(c, -1, -1, 4, "#9b9aa2");
    return canvas;
  }
  function paintBackdrop(c, record, time, color) {
    c.clearRect(0, 0, panelW, panelH);
    c.fillStyle = "#fcfaf6";
    c.fillRect(0, 0, panelW, panelH);
    if (color > 0) {
      const gradient = c.createLinearGradient(-40, 35, 880, 525);
      gradient.addColorStop(0, "#ffede3");
      gradient.addColorStop(0.29, "#edddfc");
      gradient.addColorStop(0.57, "#c7b0f4");
      gradient.addColorStop(0.82, "#b7a6ef");
      gradient.addColorStop(1, "#ded2fb");
      c.save();
      c.globalAlpha = color;
      c.fillStyle = gradient;
      c.fillRect(0, 0, panelW, panelH);
      const bloom = c.createRadialGradient(98, 28, 5, 98, 28, 425);
      bloom.addColorStop(0, "rgba(255,252,243,.75)");
      bloom.addColorStop(1, "rgba(255,245,238,0)");
      c.fillStyle = bloom;
      c.fillRect(0, 0, panelW, panelH);
      c.restore();
    }
    c.save();
    c.translate(805, 196);
    c.rotate(-0.23 + (time - start) * 0.13);
    blit(c, record, -336, -336);
    c.restore();
    c.save();
    c.fillStyle = ink2;
    c.textBaseline = "alphabetic";
    c.font = '700 79px "Songti SC","STSong","Hiragino Sans GB",serif';
    c.fillText("月面漫游", 62, 195);
    c.font = '500 28px "Hiragino Sans GB",sans-serif';
    c.fillStyle = "#50455d";
    c.fillText("迟岸", 67, 253);
    c.restore();
  }
  function drawTransport(c, time, glass) {
    const x = 52, w = 894, h = 110, y = mix(368, 262, glass), radius = 36;
    c.save();
    roundedPath(c, x, y, w, h, radius);
    c.clip();
    if (glass > 1e-3) {
      c.save();
      c.filter = "blur(" + String(3.7 * glass) + "px) saturate(" + String(1 + 0.22 * glass) + ")";
      blit(c, layers.back.canvas, 3 * glass, -5 * glass);
      c.restore();
    }
    c.fillStyle = "rgba(255,255,255," + (1 - 0.83 * glass) + ")";
    c.fillRect(x - 5, y - 4, w + 10, h + 9);
    if (glass > 1e-3) {
      const rim = c.createLinearGradient(x, y, x + w, y + h);
      [[0, "rgba(255,255,255,.56)"], [0.27, "rgba(250,249,255,.13)"], [0.62, "rgba(255,255,255,.01)"], [1, "rgba(213,211,255,.34)"]].forEach(([o, v]) => rim.addColorStop(o, v));
      c.save();
      c.globalAlpha = glass;
      c.fillStyle = rim;
      c.fillRect(x, y, w, h);
      c.restore();
    }
    c.restore();
    roundedPath(c, x + 1, y + 1, w - 2, h - 2, radius);
    const edge = c.createLinearGradient(x, y, x + w * 0.4, y + h);
    edge.addColorStop(0, glass > 0.01 ? "#fff" : "#e5dfed");
    edge.addColorStop(0.5, glass > 0.01 ? "rgba(255,255,255,.89)" : "#e5dfed");
    edge.addColorStop(1, "rgba(117,109,148,.30)");
    c.lineWidth = 2.3;
    c.strokeStyle = edge;
    c.stroke();
    const cy = y + h / 2;
    disk(c, 107, cy, 31, ink2);
    c.fillStyle = "#fff";
    c.fillRect(98, cy - 11, 6, 22);
    c.fillRect(109, cy - 11, 6, 22);
    c.save();
    c.fillStyle = ink2;
    c.font = '500 21px "Helvetica Neue",Arial,sans-serif';
    c.textBaseline = "middle";
    c.fillText("2:16", 161, cy);
    const waveX = 227, spacing = 5.75, progress = 0.44 + (time - start) * 0.017;
    for (let i = 0; i < 61; i++) {
      const u = i / 60;
      const height = 6 + 22 * (0.2 + 0.8 * Math.sin(u * 7.8 + 1.4) ** 2) * (0.16 + 0.84 * Math.sin(i * 1.24 + 0.53 * Math.sin(i * 0.63)) ** 2);
      c.strokeStyle = u < progress ? "#332a46" : "#897c9c";
      c.lineWidth = 3;
      c.lineCap = "round";
      c.beginPath();
      c.moveTo(waveX + i * spacing, cy - height / 2);
      c.lineTo(waveX + i * spacing, cy + height / 2);
      c.stroke();
    }
    c.restore();
  }
  function softFocus(c, time, threeCorners, original) {
    if (time <= start || time >= end) return;
    if (!layers) layers = { back: makeLayer(panelW, panelH), card: makeLayer(panelW, panelH), record: cutRecord() };
    const enter = step(time, start, openEnd), exit = step(time, returnStart, end), open = enter * (1 - exit);
    const round = step(time, onsets.corners - 0.035, onsets.corners + 0.34);
    const shadow = step(time, onsets.shadow - 0.055, onsets.shadow + 0.41);
    const gradient = step(time, onsets.color - 0.055, onsets.color + 0.43);
    const glass = step(time, onsets.glass - 0.05, onsets.glass + 0.4);
    const content = step(time, start + 0.12, openEnd - 0.06) * (1 - step(time, returnStart + 0.1, end - 0.035));
    const [tl, tr, bl] = threeCorners;
    c.save();
    const lift = shadow * open;
    const goalX = 152 + 10 * shadow, goalY = 161 - 23 * lift;
    const angle = (-0.012 - 0.016 * shadow + 0.018 * glass) * open;
    const w = 1116 + 12 * lift, h = w * panelH / panelW;
    const dx = Math.cos(angle) * w, dy = Math.sin(angle) * w, ex = -Math.sin(angle) * h, ey = Math.cos(angle) * h;
    const ox = mix(tl[0], goalX, open), oy = mix(tl[1], goalY, open);
    c.transform(
      mix(tr[0] - tl[0], dx, open) / panelW,
      mix(tr[1] - tl[1], dy, open) / panelW,
      mix(bl[0] - tl[0], ex, open) / panelH,
      mix(bl[1] - tl[1], ey, open) / panelH,
      ox,
      oy
    );
    const radius = mix(11, 66, round) * open + 5 * (1 - open);
    if (shadow * open > 1e-3) {
      c.save();
      c.globalAlpha = lift * 0.97;
      roundedPath(c, -12 * lift, -11 * lift, panelW + 32 * lift, panelH + 62 * lift, radius + 4);
      c.fillStyle = "#d8d7df";
      c.fill();
      c.restore();
      c.save();
      c.shadowColor = "rgba(44,34,65," + String(0.36 * shadow * open) + ")";
      c.shadowBlur = 44 * shadow * open;
      c.shadowOffsetX = 13 * lift;
      c.shadowOffsetY = 39 * lift;
      roundedPath(c, 0, 0, panelW, panelH, radius);
      c.fillStyle = "#f9f7f4";
      c.fill();
      c.restore();
    }
    const card = layers.card.ctx;
    paintBackdrop(layers.back.ctx, layers.record, time, gradient);
    card.clearRect(0, 0, panelW, panelH);
    blit(card, layers.back.canvas, 0, 0);
    drawTransport(card, time, glass);
    c.save();
    roundedPath(c, 0, 0, panelW, panelH, radius);
    c.clip();
    const flapWidth = panelW * (1 - content) * 0.5;
    if (content > 0) {
      c.save();
      c.beginPath();
      c.rect(flapWidth, 0, panelW - 2 * flapWidth, panelH);
      c.clip();
      blit(c, layers.card.canvas, 0, 0);
      c.restore();
    }
    if (flapWidth > 1e-3) {
      const half = original.width / 2;
      blit(c, original, 0, 0, half, original.height, 0, 0, flapWidth + 0.15, panelH);
      blit(c, original, half, 0, half, original.height, panelW - flapWidth - 0.15, 0, flapWidth + 0.15, panelH);
      if (content > 0) {
        const turn = Math.sin(content * Math.PI);
        for (const [left, right, rev] of [[0, flapWidth, false], [panelW - flapWidth, panelW, true]]) {
          const sheen = c.createLinearGradient(left, 0, right, 0);
          sheen.addColorStop(rev ? 1 : 0, "rgba(242,235,255,0)");
          sheen.addColorStop(rev ? 0 : 1, "rgba(242,235,255," + String(0.28 * turn) + ")");
          c.fillStyle = sheen;
          c.fillRect(left, 0, right - left, panelH);
        }
      }
    }
    c.restore();
    c.restore();
  }

  // edl.json
  var edl_default = {
    frames: 4122,
    spans: [
      {
        id: "lead",
        s: 0,
        e: 24.6,
        old: 0,
        oldEnd: 24.6
      },
      {
        id: "build",
        s: 24.6,
        e: 32.486333333333334
      },
      {
        id: "mid",
        s: 32.486333333333334,
        e: 75.7,
        old: 33.67,
        oldEnd: 80.82
      },
      {
        id: "params",
        s: 75.7,
        e: 82.70500000000001
      },
      {
        id: "app",
        s: 82.70500000000001,
        e: 99.22366069153585,
        old: 80.82,
        oldEnd: 100.5
      },
      {
        id: "black",
        s: 99.22366069153585,
        e: 102.48869904148691
      },
      {
        id: "craft",
        s: 102.48869904148691,
        e: 109.66973908029246,
        old: 104.34,
        oldEnd: 112.89
      },
      {
        id: "outro",
        s: 109.7,
        e: 115.4
      },
      {
        id: "show",
        s: 115.41666666666667,
        e: 137.4
      }
    ],
    starts: {
      Opening: 0,
      Hammer: 215,
      Archive: 343,
      Construction: 738,
      Websites: 1023,
      ButtonStudy: 1668,
      Parameters: 2271,
      Applications: 2481,
      Conclusion: 3291,
      Showcase: 3462
    },
    buildingHits: [
      0.83,
      1.58,
      1.88,
      2.26,
      2.88,
      3.33,
      3.87,
      4.27,
      4.84,
      5.35,
      5.91,
      6.38
    ],
    collisions: [
      71.44,
      72.49,
      73.1
    ],
    cutV5Frames: [
      2017,
      2057
    ],
    bridge: {
      motorStart: 5.94,
      entry: 7.166666666666667,
      land: 9.033333333333333
    },
    edit7: {
      旧版缩短帧: 84,
      题名首现: 259,
      题名单独占据中心: 269,
      题名落定: 271,
      故障第一帧: 331,
      故障密集错行: 336,
      到达正文: 343
    }
  };

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

  // drawing/webDeck.js
  var filmOffset = 33.67 - edl_default.spans.find((span) => span.id === "mid").s;
  var cw = 226;
  var ch = 249;
  var focusIndex = 2;
  var axis = /* @__PURE__ */ new Vector3(0.22, 1, 0.06).normalize();
  var quaternion = /* @__PURE__ */ new Quaternion();
  var vertices = `varying vec2 vUv; varying vec3 vN; varying vec3 vV;
void main(){vUv=uv;vec4 mv=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}`;
  var fragment = `uniform sampler2D web;uniform float focus;uniform float shine;
uniform float opacity;uniform float lightAngle;uniform float glarePower;
varying vec2 vUv;varying vec3 vN;varying vec3 vV;
float roundedBox(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
void main(){
 vec2 p=(vUv-.5)*vec2(1.,1.10);
 float d=roundedBox(p,vec2(.498,.548),.019);
 float aa=max(.0002,fwidth(d)),mask=1.-smoothstep(-aa*.55,aa*.55,d);
 if(mask<.001)discard;
 // 四边只用一个轮廓。镜面反光由卡面法线与虚拟光源的位置共同决定。
 vec2 uv=gl_FrontFacing?vUv:vec2(1.-vUv.x,vUv.y);
 vec3 front=texture2D(web,uv).rgb;
 vec2 lightDir=vec2(sin(lightAngle),cos(lightAngle));
 float tilt=pow(1.-abs(dot(normalize(vN),normalize(vV))),2.);
 float ramp=clamp(dot(p,lightDir)+.50,0.,1.);
 float dist=dot(p,normalize(lightDir+vec2(.53,.17)))-shine;
 float sweep=exp(-dist*dist*72.)+ .40*exp(-pow(dist-.09,2.)*700.);
 float edge=1.-smoothstep(.0002,.0034,-d);
 vec3 pearl=mix(vec3(.82,.91,1.),vec3(1.,.94,.83),ramp);
 vec3 color=front;
 if(!gl_FrontFacing){color=front*.46+vec3(.008,.012,.016);}
 color+=pearl*(ramp*ramp*glarePower+sweep*(.012+.091*focus)+tilt*.021);
 color=mix(color,pearl,edge*(.09+.09*ramp+.13*tilt));
 gl_FragColor=vec4(color,mask*opacity);
 #include <colorspace_fragment>
}`;
  var geometry = /* @__PURE__ */ new PlaneGeometry(1, 1);
  function create() {
    const environment = new Scene(), cards = new Scene();
    environment.background = new Color("#070809");
    const dust = makeDust();
    environment.add(dust);
    const shadow = artTex("玻璃落影", 256, 292, (c, w, h) => {
      c.shadowColor = "#080913";
      c.shadowBlur = 11;
      rounded(c, 22, 20, w - 45, h - 52, 18, "rgba(16,15,23,.60)");
    });
    const list = sites_default.map(({ id }, i) => {
      const tx = artTex(id, 828, 915, (c, w, h) => blit(c, pictures[id], 0, 0, w, h), 1);
      const u = { lightAngle: { value: 0.5 }, glarePower: { value: 0.01 }, web: { value: tx }, focus: { value: 0 }, shine: { value: -1 }, opacity: { value: 1 } };
      const m = new Mesh(geometry, new ShaderMaterial({ vertexShader: vertices, fragmentShader: fragment, uniforms: u, transparent: true, depthWrite: true, side: DoubleSide, forceSinglePass: true }));
      const shade = plane(shadow);
      shade.material.depthWrite = false;
      cards.add(shade, m);
      return { m, u, shade };
    });
    const lead = list[focusIndex];
    const ghosts = [0.06, 0.12].map((alpha) => {
      const uniforms = Object.fromEntries(Object.entries(lead.u).map(([name, u]) => [name, { value: u.value }]));
      uniforms.opacity.value = alpha;
      const mesh = new Mesh(geometry, new ShaderMaterial({ vertexShader: vertices, fragmentShader: fragment, uniforms, transparent: true, depthWrite: false, side: DoubleSide, forceSinglePass: true }));
      mesh.renderOrder = 9;
      cards.add(mesh);
      return mesh;
    });
    return { environment, cards, dust, list, ghosts };
  }
  function curve(t, s, e) {
    const x = lin(t, s, e);
    return 1 - Math.pow(1 - x, 3);
  }
  function poseAt2(t, i) {
    const col = i % 5, row = Math.floor(i / 5), tx = (col - 2) * 249, ty = (row - 0.5) * 278 - 20, hero = i === focusIndex;
    const base = { x: tx, y: ty, z: 8, rx: 0, ry: 0, rz: 0, sc: 1, axis: 0, visible: true };
    if (t < beats_default.deal) {
      const spawn = 32.82, release = step(t, 38.58, beats_default.deal), k = lin(t, spawn, beats_default.deal), birth = step(t, spawn, 38.54);
      const rotations = 6 * step(k, 0, 1) + 2.5 * step(k, 0.025, 0.41) + 2.5 * step(k, 0.55, 0.97);
      return {
        ...base,
        x: 0,
        y: mix(0, 86, release),
        z: mix(-1950, 116, birth),
        sc: 0.23 + 1.2 * birth,
        axis: 360 * rotations,
        rx: mix(-10, 17, release),
        ry: 0,
        rz: 0,
        visible: hero && t >= spawn
      };
    }
    const st = beats_default.deal + beats_default.dealOrder[i] * beats_default.interval;
    const u = lin(t, st, st + beats_default.flight), v = curve(t, st, st + beats_default.flight), arc = Math.sin(u * Math.PI);
    if (t < beats_default.float + 0.02) return { ...base, x: tx * v, y: mix(86, ty, v) - arc * (91 + row * 18), z: mix(116, 8, v) + arc * 172, rx: mix(17, 0, v) + arc * 9, ry: arc * (col - 2) * 22 + (u > 0 && u < 1 ? 360 * (i % 2 ? 1 : -1) * step(u, 0.02, 0.96) : 0), rz: arc * (col - 2) * 13, sc: mix(1.43, 1, v), visible: hero || t >= st };
    const f = band(t, beats_default.focus, 42.42, beats_default.return, 46.35), tm = t - beats_default.float, ft = step(t, beats_default.float, beats_default.float + 0.39);
    base.x += ft * Math.sin(tm * 0.97 + i * 0.74) * 4;
    base.y += ft * Math.sin(tm * 1.4 + i * 0.58) * 5;
    base.ry += ft * Math.cos(tm * 1.12 + i * 0.71) * 3;
    if (hero) {
      base.x = mix(base.x, 6, f);
      base.y = mix(base.y, -74, f);
      base.z += f * 334;
      base.sc += f * 0.68;
      base.ry += f * mix(-9, 9, step(t, 42.65, 45.12));
      base.rx -= f * 5;
    } else {
      base.x *= 1 + f * 0.26;
      base.y += f * (row ? 33 : -42);
      base.z -= f * 122;
    }
    const wind = band(t, 48.04, beats_default.impact, beats_default.impact, beats_default.impact + 0.17);
    base.x *= 1 - wind * 0.068;
    base.y *= 1 - wind * 0.068;
    const dx = tx, dy = row ? 278 : -76, reach = Math.hypot(dx, dy);
    const delay = 0.09 * reach / 606, e = lin(t, beats_default.impact + delay, beats_default.impact + delay + 0.7);
    const side = i % 2 ? 1 : -1, travel = 2240 * e * e * (2.9 - 1.9 * e), len = Math.hypot(dx, dy);
    base.x += dx / len * travel;
    base.y += dy / len * travel;
    base.z += e * (540 + col * 26);
    base.rx += e * side * (86 + 7 * i);
    base.ry += e * side * (95 + 6 * i);
    base.rz += e * side * (90 + 4 * i);
    base.visible = e < 1;
    return base;
  }
  function brandHandoff(c, t, start2) {
    const q = step(t, beats_default.impact, beats_default.impact + 0.85), flip = step(t, beats_default.impact, beats_default.impact + 0.39);
    const r = lerpRect(start2, gumRect, q), [x, y, w, h] = r, front = flip < 0.5;
    const turn = Math.max(0.016, Math.abs(Math.cos(flip * Math.PI)));
    group(c, () => {
      c.translate(x + w / 2, y + h / 2);
      c.scale(turn, 1);
      c.translate(-x - w / 2, -y - h / 2);
      if (front) {
        c.save();
        c.beginPath();
        c.roundRect(x, y, w, h, Math.max(2, w * 0.019));
        c.clip();
        blit(c, pictures[sites_default[focusIndex].id], x, y, w, h);
        c.restore();
      } else caseSheet(c, t, r);
    });
  }
  function burstLight(c, t, x, y) {
    const elapsed = t - beats_default.impact;
    if (elapsed < -0.055) return;
    const gain = step(elapsed, -0.055, 0.047), expand = step(elapsed, 4e-3, 0.78);
    const radius = 8 + Math.hypot(W, H) * 1.42 * Math.pow(expand, 1.15);
    const warm = step(elapsed, 0.16, 0.78), tone = (alpha, white2) => {
      const k = warm * (1 - white2);
      return "rgba(" + [248, 244, 234].map((v) => Math.round(mix(255, v, k))).join(",") + "," + alpha * gain + ")";
    };
    const light = c.createRadialGradient(x, y, 0, x, y, radius);
    light.addColorStop(0, tone(1, 1 - warm));
    light.addColorStop(0.46, tone(1, 0.46 * (1 - warm)));
    light.addColorStop(0.65, tone(0.97, 0.29));
    light.addColorStop(0.8, tone(0.55, 0.2));
    light.addColorStop(0.92, tone(0.11, 0.13));
    light.addColorStop(1, tone(0, 0));
    rect(c, 0, 0, W, H, light);
  }
  var world;
  function webDeck(c, t) {
    if (!world) world = create();
    const d = world, { renderer, cam } = studio();
    const orb = band(t, 41.51, 42.52, 45.45, 46.39), turn = step(t, 42.67, 45.02);
    const hit = t >= beats_default.impact ? Math.exp(-(t - beats_default.impact) * 8) : 0, r = t - beats_default.impact;
    aim(
      13 * orb + hit * Math.sin(r * 52) * 25,
      -41 * orb + hit * Math.sin(r * 42) * 14,
      orb * 135,
      lens - 127 * orb,
      orb * (-14 + 30 * turn) + hit * 4,
      orb * (6 - 9 * turn),
      orb * (-2 + 3 * turn) + hit * 2
    );
    const integral = (x, a, b) => {
      const u = lin(x, a, b);
      return (b - a) * (u * u * u - 0.5 * u * u * u * u) + Math.max(0, x - b);
    };
    const drive = step(t, 32.94, 34.28) - step(t, 37.85, 39.36);
    d.dust.material.uniforms.travel.value = 0.026 * (t - 32) + 0.83 * (integral(t, 32.94, 34.28) - integral(t, 37.85, 39.36));
    d.dust.material.uniforms.speed.value = 0.045 + 0.95 * drive;
    if (t >= beats_default.impact + 0.85) {
      rect(c, 0, 0, W, H, paper);
      caseSheet(c, t);
      return;
    }
    d.list.forEach(({ m, u, shade }, i) => {
      const a = poseAt2(t, i);
      m.visible = shade.visible = a.visible && !(i === focusIndex && t >= beats_default.impact);
      if (!a.visible) return;
      const selected = i === focusIndex, f = selected ? orb : 0;
      u.focus.value = f;
      u.shine.value = mix(-0.94, 0.94, step(t, 43.45, 45.25)) + 0.019 * Math.sin(t + i);
      const lightX = 0.5 + 0.45 * Math.sin(t * 0.83 + i * 0.41), lightY = 0.5 + 0.43 * Math.cos(t * 1.2 + i * 0.37);
      u.lightAngle.value = Math.atan2(lightX - 0.5, -(lightY - 0.5));
      u.glarePower.value = lightY * (0.027 + 0.029 * f);
      const opened = band(t - filmOffset, 40.49, 41.13, 44.47, 44.96);
      u.opacity.value = step(t, 32.82, 33.72) * (selected ? 1 - opened : 1 - 0.91 * orb);
      pose(m, a.x, a.y, a.z, cw * a.sc, ch * a.sc, a.rx, a.ry, a.rz);
      if (a.axis) m.quaternion.multiply(quaternion.setFromAxisAngle(axis, a.axis * rad));
      shade.quaternion.copy(m.quaternion);
      shade.position.set(a.x + 10 + f * 14, -a.y - 16 - f * 17, a.z - 12);
      shade.scale.set(cw * a.sc * 1.19, ch * a.sc * 1.19, 1);
      shade.material.opacity = 0.32 * u.opacity.value;
      m.renderOrder = selected && orb > 0.08 ? 60 : 23 + Math.round(a.z * 0.012);
      shade.renderOrder = m.renderOrder - 1;
    });
    d.ghosts.forEach((mesh, i) => {
      const fade = band(t, 34.27, 34.72, 38.15, 38.87);
      mesh.visible = fade > 0.01;
      if (!mesh.visible) return;
      const a = poseAt2(t - (2 - i) * 0.012, focusIndex);
      pose(mesh, a.x, a.y, a.z - 7 - i, cw * a.sc, ch * a.sc, a.rx, a.ry, a.rz);
      mesh.quaternion.multiply(quaternion.setFromAxisAngle(axis, a.axis * rad));
      mesh.material.uniforms.opacity.value = fade * (i ? 0.085 : 0.038);
    });
    renderer.setRenderTarget(null);
    renderer.render(d.environment, cam);
    blit(c, renderer.domElement, 0, 0);
    const source = poseAt2(beats_default.impact - 1e-3, focusIndex);
    const hitPoint = /* @__PURE__ */ new Vector3(source.x, -source.y, source.z).project(cam);
    const hx = (hitPoint.x + 1) * W * 0.5, hy = (1 - hitPoint.y) * H * 0.5;
    burstLight(c, t, hx, hy);
    renderer.render(d.cards, cam);
    blit(c, renderer.domElement, 0, 0);
    const filmSeconds = t - filmOffset;
    if (filmSeconds > 40.47 && filmSeconds < 44.97) {
      const focus = d.list[focusIndex].m;
      const corners = [[-0.5, 0.5], [0.5, 0.5], [-0.5, -0.5]].map(([x, y]) => {
        const point = focus.localToWorld(/* @__PURE__ */ new Vector3(x, y, 0)).project(cam);
        return [(point.x + 1) * W / 2, (1 - point.y) * H / 2];
      });
      softFocus(c, filmSeconds, corners, pictures[sites_default[focusIndex].id]);
    }
    if (t >= beats_default.impact) {
      const a = poseAt2(beats_default.impact - 1e-3, focusIndex), p = /* @__PURE__ */ new Vector3(a.x, -a.y, a.z).project(cam);
      const x = (p.x + 1) * W * 0.5, y = (1 - p.y) * H * 0.5, k = lens / (lens - a.z);
      brandHandoff(c, t, [x - cw * k / 2, y - ch * k / 2, cw * k, ch * k]);
    }
  }

  // sample-pages.js
  function makeSamples(pictures2, ids, shop) {
    function surface2(w, h) {
      const paper2 = document.createElement("canvas");
      paper2.width = w;
      paper2.height = h;
      return [paper2, paper2.getContext("2d")];
    }
    function label(c2, value, x, y, size, bold = true, ink3 = "#191923") {
      c2.fillStyle = ink3;
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
      const [p2, c2] = surface2(828, 915), colors = ["#bfceff", "#e1e9bb", "#efbb9b", "#e2d9ec", "#bddbd4"];
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
    const [p, c] = surface2(1152, 894);
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
    makeSamples(pictures, ["example1", "example2", "example3", "example4", "example5", "example6", "example7", "example8", "example9", "example10"], false);
  }
  function draw(c, t) {
    webDeck(c, t + 74 / 30 + 33.67 - 32.486333333333334);
  }
  return __toCommonJS(component_entry_exports);
})();
