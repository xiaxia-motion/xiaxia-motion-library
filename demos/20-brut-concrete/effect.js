// 十二组混凝土构件坠落搭楼 · 夏夏的AI灵感
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

  // drawing/base.js
  var W = 1440;
  var H = 1080;
  var ink = "#202021";
  var fontCN = '"Hiragino Sans GB","Heiti SC","Arial",sans-serif';
  var clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  var mix = (a, b, p) => a + (b - a) * p;
  var lin = (t, a, b) => clamp((t - a) / (b - a));
  var smooth = (q) => q * q * (3 - 2 * q);
  var step = (t, a, b) => smooth(lin(t, a, b));
  function rect(c, x2, y2, w, h, color, stroke = null, lw = 3) {
    if (w <= 0 || h <= 0) return;
    if (color) {
      c.fillStyle = color;
      c.fillRect(x2, y2, w, h);
    }
    if (stroke) {
      c.strokeStyle = stroke;
      c.lineWidth = lw;
      c.strokeRect(x2, y2, w, h);
    }
  }
  function txt(c, str, x2, y2, size, opt = {}) {
    if (!str || size <= 1) return;
    const { color = ink, weight = 600, align = "left", font = fontCN, max, base = "middle" } = opt;
    c.save();
    c.fillStyle = color;
    c.textAlign = align;
    c.textBaseline = base;
    c.font = weight + " " + size + "px " + font;
    if (max && c.measureText(str).width > max) {
      let s = max / c.measureText(str).width;
      c.translate(x2, y2);
      c.scale(s, 1);
      c.fillText(str, 0, 0);
    } else c.fillText(str, x2, y2);
    c.restore();
  }
  function group(c, fn) {
    c.save();
    fn();
    c.restore();
  }
  function clip(c, x2, y2, w, h, fn) {
    group(c, () => {
      c.beginPath();
      c.rect(x2, y2, w, h);
      c.clip();
      fn();
    });
  }
  function cover(c, im, x2, y2, w, h, fx = 0.5, fy = 0.5) {
    if (!im || w <= 0 || h <= 0) return;
    const scale = Math.max(w / im.width, h / im.height), sw = w / scale, sh = h / scale;
    blit(c, im, (im.width - sw) * fx, (im.height - sh) * fy, sw, sh, x2, y2, w, h);
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

  // drawing/space.js
  var lens = 1580;
  var rad = Math.PI / 180;
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

  // drawing/windowCamera.js
  var pane = { left: 0.744, right: 1.386, bottom: 3.39, top: 4.225, z: 1.229 };
  var x = (pane.left + pane.right) / 2;
  var y = (pane.bottom + pane.top) / 2;
  var settled = 6.61;
  var word = 9.917;
  var sprint = 0.55;
  var portalEnd = word + sprint;
  function approachWindow(cam, u) {
    const elapsed = Math.max(0, u - settled), kick = Math.max(0, u - word), easeIn = 0.28;
    const distance = elapsed < easeIn ? elapsed * elapsed / (2 * easeIn) : elapsed - easeIn * 0.5;
    const preZoom = 1 + 0.092 * distance;
    const rush = Math.min(1, kick / sprint), zoom = preZoom * Math.exp(3.65 * Math.pow(rush, 2.35));
    const preAlign = Math.min(1, elapsed / (word - settled)) * 0.22;
    const align = mix(preAlign, 1, step(kick, 0, 0.47));
    const yaw = 0.44 * (1 - align), pitch = Math.atan2(6.32, 14) * (1 - align);
    const focus = new Vector3(mix(-0.1, x, align), mix(2.05, y, align), mix(0, pane.z, align));
    const start = Math.hypot(14, 6.32), d = start / zoom;
    cam.position.set(focus.x + d * Math.cos(pitch) * Math.sin(yaw), focus.y + d * Math.sin(pitch), focus.z + d * Math.cos(pitch) * Math.cos(yaw));
    cam.lookAt(focus);
    cam.updateMatrixWorld();
    const size = 5.46 / zoom, k = step(kick, 0, 0.36), near = 0.014, far = 60;
    const A = -(2 * (1 - k) + k * (far + near) / d) / (far - near), B = -(1 - k) - k * near / d + A * near;
    cam.projectionMatrix.set(1 / (size * W / H), 0, 0, 0, 0, 1 / size, 0, 0, 0, 0, A, B, 0, 0, -k / d, 1 - k);
    cam.projectionMatrixInverse.copy(cam.projectionMatrix).invert();
  }
  function windowSurface() {
    const screen = sheet(W, H, { alpha: false });
    const ctx = screen.getContext("2d", { alpha: false }), map = new CanvasTexture(screen);
    map.colorSpace = SRGBColorSpace;
    map.generateMipmaps = false;
    map.minFilter = LinearFilter;
    const uniforms = { film: { value: map }, opening: { value: 0 } };
    const material = new ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      vertexShader: "void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
      fragmentShader: `uniform sampler2D film;uniform float opening;
   void main(){vec2 uv=gl_FragCoord.xy/vec2(1440.,1080.);gl_FragColor=vec4(texture2D(film,uv).rgb,opening);
   #include <colorspace_fragment>
   }`
    });
    const mesh = new Mesh(new PlaneGeometry(pane.right - pane.left, pane.top - pane.bottom), material);
    mesh.position.set(x, y, pane.z);
    mesh.renderOrder = 9;
    mesh.frustumCulled = false;
    return { mesh, update(canvas, u) {
      mesh.visible = u > word - 0.14;
      if (!mesh.visible) return;
      blit(ctx, canvas, 0, 0);
      map.needsUpdate = true;
      uniforms.opening.value = step(u, word - 0.14, word + 0.25);
    } };
  }

  // drawing/building.js
  var hits = edl_default.buildingHits;
  var rig;
  function boards() {
    const cn = document.createElement("canvas");
    cn.width = cn.height = 512;
    const c = cn.getContext("2d"), pix = c.createImageData(512, 512);
    let seed = 37811;
    const random = () => (seed = Math.imul(seed, 1664525) + 1013904223 >>> 0) / 4294967296;
    for (let y2 = 0; y2 < 512; y2++) for (let x2 = 0; x2 < 512; x2++) {
      const i = 4 * (y2 * 512 + x2), j = y2 % 43, grain = 2.4 * Math.sin(y2 * 1.8 + Math.sin(x2 / 48) * 0.6);
      const density = 184 + grain + (random() - 0.5) * 18 + Math.floor(y2 / 43) % 3 * 3;
      const seam = j === 0 ? -30 : j === 1 ? 7 : 0;
      pix.data[i] = density + seam + 8;
      pix.data[i + 1] = density + seam + 3;
      pix.data[i + 2] = density + seam - 4;
      pix.data[i + 3] = 255;
    }
    c.putImageData(pix, 0, 0);
    for (let i = 0; i < 310; i++) {
      const x2 = random() * 512, y2 = random() * 512;
      c.strokeStyle = "rgba(52,44,33," + random() * 0.2 + ")";
      c.lineWidth = random() * 1.4 + 0.3;
      c.beginPath();
      c.moveTo(x2, y2);
      c.bezierCurveTo(x2 + 22, y2 - 1, x2 + 61, y2 + 1, x2 + 14 + random() * 105, y2);
      c.stroke();
    }
    for (let j = 0; j < 3; j++) for (let k = 0; k < 3; k++) {
      const x2 = 45 + k * 184 + j % 2 * 30, y2 = 44 + j * 177;
      c.fillStyle = "#d1c9b7";
      c.beginPath();
      c.arc(x2 + 0.8, y2 + 1.4, 4, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = "#776f61";
      c.beginPath();
      c.arc(x2, y2, 3.1, 0, Math.PI * 2);
      c.fill();
    }
    const tx = new CanvasTexture(cn);
    tx.colorSpace = SRGBColorSpace;
    tx.wrapS = tx.wrapT = RepeatWrapping;
    tx.anisotropy = 4;
    return tx;
  }
  function makeRig() {
    const scene = new Scene();
    scene.background = new Color("#e5dfd2");
    const cam = new OrthographicCamera(-8, 8, 6, -6, 0.1, 120);
    const hemi = new HemisphereLight("#fffdf6", "#879096", 1.72);
    scene.add(hemi);
    const sun = new DirectionalLight("#fffaf2", 2.22);
    sun.position.set(-4.4, 10.8, 7);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1536, 1536);
    Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 0.5, far: 35 });
    sun.shadow.normalBias = 0.017;
    sun.shadow.bias = -13e-5;
    scene.add(sun);
    const tex = boards();
    const wall = new MeshStandardMaterial({ map: tex, bumpMap: tex, bumpScale: 0.055, color: "#d6d4cd", roughness: 0.94 });
    const side = new MeshStandardMaterial({ map: tex, bumpMap: tex, bumpScale: 0.04, color: "#aeada8", roughness: 0.93 });
    const glass = new MeshStandardMaterial({ color: "#293c3e", metalness: 0.2, roughness: 0.52 });
    const metal = new MeshStandardMaterial({ color: "#474a43", roughness: 0.76 });
    const ground = new Mesh(new PlaneGeometry(170, 170), new MeshStandardMaterial({ color: "#dad6ca", roughness: 1 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.035;
    ground.receiveShadow = true;
    scene.add(ground);
    const groups = hits.map(() => {
      const g = new Group();
      scene.add(g);
      return g;
    });
    function box(i, x2, y2, z, w, h, d, mat = wall) {
      const geo = new BoxGeometry(w, h, d), uv = geo.attributes.uv, pos = geo.attributes.position, n = geo.attributes.normal;
      for (let j = 0; j < uv.count; j++) {
        const sideFace = Math.abs(n.getX(j)) > 0.5, top = Math.abs(n.getY(j)) > 0.5;
        uv.setXY(j, (sideFace ? pos.getZ(j) + z : pos.getX(j) + x2) * 0.55, (top ? z + pos.getZ(j) : y2 + pos.getY(j)) * 0.62);
      }
      const m = new Mesh(geo, mat);
      m.position.set(x2, y2, z);
      m.castShadow = m.receiveShadow = true;
      groups[i].add(m);
    }
    box(0, 0, 0.16, 0, 8.25, 0.32, 3.95);
    for (let i = 0; i < 4; i++) for (const z of [-1.06, 1.06]) box(1 + i % 3, -2.75 + 1.82 * i, 0.99, z, 0.38, 1.35, 0.53, side);
    for (let i = 0; i < 4; i++) box(3, -3.63, 0.13 + i * 0.09, 2.13 - i * 0.17, 1.45, 0.22 + i * 0.09, 0.52);
    function floorPlate(i, y2, cx, w, depth) {
      box(i, cx, y2, 0, w, 0.34, depth);
      box(i, cx, y2 + 0.2675, depth / 2 - 0.09, w, 0.195, 0.23);
    }
    function ribbon(i, y2, x0, w) {
      box(i, x0 + w / 2, y2, -0.03, w - 0.37, 1.03, 2.49, glass);
      for (let j = 0; j < w / 0.69; j++) {
        const x2 = x0 + 0.12 + j * 0.69;
        box(i, x2, y2, 1.245, 0.048, 1.03, 0.1, metal);
        box(i, x2, y2, -1.275, 0.046, 1.03, 0.08, metal);
      }
      box(i, x0 + w / 2, y2 - 0.38, 1.28, w, 0.12, 0.11, metal);
      box(i, x0 + 0.1, y2, 0.02, 0.2, 1.09, 2.72, side);
      box(i, x0 + w - 0.1, y2, 0.02, 0.2, 1.09, 2.72, wall);
    }
    floorPlate(4, 1.73, 0, 8.45, 3.81);
    ribbon(5, 2.4, -3.72, 7.04);
    floorPlate(6, 3.04, 0.11, 8.06, 3.58);
    ribbon(7, 3.71, -3.54, 6.97);
    floorPlate(8, 4.39, 0.36, 7.73, 3.44);
    box(9, -2.88, 3.02, -1.65, 1.23, 5.4, 1.29);
    box(9, -2.88, 5.82, -1.65, 1.46, 0.23, 1.52);
    for (let k = 0; k < 3; k++) box(9, -2.86, 3.26 + k * 0.68, -0.989, 0.45, 0.16, 0.035, glass);
    box(10, 0.67, 4.81, -0.54, 2.97, 0.6, 1.56, side);
    box(10, 0.65, 5.12, -0.54, 3.28, 0.17, 1.76);
    for (let k = 0; k < 6; k++) box(11, -3.02 + k * 1.22, 3.24, 1.64, 0.15, 2.75, 0.41);
    const dust = Array.from({ length: 24 }, (_, i) => {
      const m = new Mesh(new IcosahedronGeometry(1, 0), i % 3 ? side : wall);
      scene.add(m);
      return m;
    });
    const portal = windowSurface();
    scene.add(portal.mesh);
    return { scene, cam, groups, dust, portal };
  }
  function paintBuilding(c, u) {
    if (!rig) rig = makeRig();
    const { scene, cam, groups, dust } = rig;
    groups.forEach((g, i) => {
      const lead = i === 0 ? 0.59 : 0.42, dt2 = u - hits[i], k = clamp(1 + dt2 / lead);
      g.visible = dt2 >= -lead && (i !== 0 || u >= 0.73);
      const bounce = dt2 >= 0 ? Math.exp(-dt2 * 20) * Math.abs(Math.sin(dt2 * 31)) * 0.11 : 0;
      g.position.y = 7.9 * (1 - k * k) + bounce;
      g.rotation.z = (1 - k) * (0.11 * (i % 2 ? 1 : -1));
      g.rotation.y = (1 - k) * 0.12;
    });
    let last = -1;
    hits.forEach((t, i) => {
      if (t <= u) last = i;
    });
    const dt = last < 0 ? 100 : u - hits[last], env = dt < 0.5 ? Math.exp(-dt * 12) : 0;
    dust.forEach((m, i) => {
      m.visible = dt >= 0 && dt < 0.52;
      if (!m.visible) return;
      const angle = (i * 2.399 + last) * 1.1, dx = Math.cos(angle), dz = Math.sin(angle), speed = 1.3 + i * 7 % 13 * 0.2;
      const floor = [0.33, 0.58, 0.48, 0.36, 1.73, 1.9, 3.08, 3.21, 4.4, 0.65, 4.53, 1.88][last] || 0;
      m.position.set((i % 3 - 1) * 1.85 + dx * (1 + dt * speed), Math.max(0.03, floor + dt * (1 + i % 4 * 0.65) - 5.5 * dt * dt), dz * (1.3 + dt * speed));
      m.rotation.set(dt * i * 2, angle + dt * 3, dt * i);
      m.scale.setScalar((0.022 + i % 5 * 0.014) * (1 - step(dt, 0.22, 0.52)));
    });
    const detail = step(u, 6.61, 7.45);
    const az = mix(0.64, 0.44, step(u, 1.1, 6.49)) - 0.19 * detail;
    const fx = mix(-0.1, 1.17, detail), fy = mix(2.05, 3.53, detail) + env * Math.sin(dt * 54) * 0.16, fz = detail * 1.36;
    const base = 5.46 - 2.97 * detail;
    cam.left = -base * 4 / 3;
    cam.right = -cam.left;
    cam.top = base;
    cam.bottom = -base;
    cam.position.set(fx + 14 * Math.sin(az), fy + 6.32 - detail * 2.5, fz + 14 * Math.cos(az));
    cam.lookAt(fx, fy, fz);
    cam.updateProjectionMatrix();
    if (u >= 6.61) approachWindow(cam, u);
    rig.portal.update(c.canvas, u);
    const renderer = studio().renderer, was = renderer.shadowMap.enabled;
    renderer.shadowMap.enabled = true;
    renderer.render(scene, cam);
    blit(c, renderer.domElement, 0, 0, W, H);
    renderer.shadowMap.enabled = was;
    if (u < 0.91) {
      cam.updateMatrixWorld();
      return [[-4.125, 0.32, -1.975], [4.125, 0.32, -1.975], [-4.125, 0.32, 1.975]].map(([a, b, z]) => {
        const q = new Vector3(a, b, z).project(cam);
        return [(q.x + 1) * W / 2, (1 - q.y) * H / 2];
      });
    }
  }

  // drawing/signalTracks.js
  var W2 = 1440;
  var H2 = 1080;
  var center = [720, 523];
  var rayEnds = [[-100, -100], [190, -110], [575, -110], [980, -100], [1470, -90], [1570, 312], [1550, 824], [1310, 1200], [845, 1190], [422, 1190], [-110, 1130], [-100, 644]];
  var lines = [];
  var lerp = (a, b, p) => a + (b - a) * p;
  function parts(a, b, count, isRay) {
    for (let i = 0; i < count; i++) {
      const point = (t) => [lerp(a[0], b[0], t) / W2, lerp(a[1], b[1], t) / H2];
      let head = point(i / count), foot = point((i + 1) / count);
      if (foot[1] < head[1]) [head, foot] = [foot, head];
      lines.push({ head, foot, isRay });
    }
  }
  rayEnds.forEach((tip, i) => parts(center, tip, i % 2 === 0 ? 2 : 1, true));
  [[320, 252, 800, 545], [468, 341, 505, 350]].forEach(([x2, y2, w, h], level) => {
    const corners = [[x2, y2], [x2 + w, y2], [x2 + w, y2 + h], [x2, y2 + h]];
    corners.forEach((p, i) => parts(p, corners[(i + 1) % 4], i % 2 === 0 || level === 0 && i === 1 ? 2 : 1, false));
  });
  lines.sort((a, b) => a.head[0] + a.foot[0] - b.head[0] - b.foot[0] || a.head[1] - b.head[1]);

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

  // drawing/museum.js
  var whiteMount = [95, 153, 1250, 669];
  function turnPrint(c, r, oldKey, newKey, q) {
    const [x2, y2, w, h] = r, cols = 10, strip = w / cols;
    const project = (key, focus, fy) => {
      const im = pictures["gallery_" + key], scale = Math.max(w / im.width, h / im.height);
      const sw = w / scale, sh = h / scale;
      return { im, sw: sw / cols, sh, sx: (im.width - sw) * focus, sy: (im.height - sh) * fy };
    };
    const old = project(oldKey, 0.51, 0.46), next = project(newKey, 0.46, 0.47);
    for (let i = 0; i < cols; i++) {
      const t = Math.min(1, Math.max(0, (q - i * 0.013) / 0.883));
      const angle = t * Math.PI / 2, front = Math.cos(angle), side = Math.sin(angle);
      const left = x2 + i * strip, ow = strip * front / (front + side), nw = strip - ow;
      if (ow > 1e-3) blit(c, old.im, old.sx + i * old.sw, old.sy, old.sw, old.sh, left, y2, ow + 0.45, h);
      if (nw > 1e-3) blit(c, next.im, next.sx + i * next.sw, next.sy, next.sw, next.sh, left + ow, y2, nw + 0.4, h);
      if (t > 0 && t < 1) {
        const shade = Math.sin(angle * 2);
        rect(c, left, y2, ow, h, "rgba(13,24,32," + 0.13 * shade + ")");
        rect(c, left + ow, y2, nw, h, "rgba(242,246,242," + 0.085 * shade + ")");
      }
    }
  }
  var details = [["glass", "玻璃幕墙", 0.46], ["steel", "钢框架", 0.51], ["white", "刷得雪白的墙", 0.48]];
  function triptych(c, t, r) {
    const [x2, y2, w, h] = r;
    const intro = step(t, 17.46, 18.22), two = step(t, 18.16, 18.92), three = step(t, 18.99, 19.68);
    const labelH = h * 0.123 * intro, gutter = 12, ww2 = w * two * (0.5 - three / 6), ww3 = w * three / 3;
    const widths = [w - ww2 - ww3, ww2, ww3];
    let xx = x2;
    details.forEach(([key, label, focus], i) => {
      const wid = widths[i], pad = i === 0 ? 0 : gutter * Math.min(1, wid / 60), rw2 = wid - pad;
      if (rw2 > 1) {
        const photo = [xx + pad, y2, rw2, h - labelH];
        clip(c, ...photo, () => {
          if (i === 0 && intro < 1) turnPrint(c, photo, "wide", "glass", intro);
          else {
            const minWidth = w / 3 - gutter, planeWidth = Math.max(minWidth, rw2);
            const sampleLeft = photo[0] + (rw2 - planeWidth) * focus;
            cover(c, pictures["gallery_" + key], sampleLeft, photo[1], planeWidth, photo[3], focus, 0.47);
          }
        });
        if (labelH > 4) clip(c, xx + pad, y2 + h - labelH, rw2, labelH, () => {
          c.globalAlpha = intro;
          txt(c, label, xx + pad + 3, y2 + h - labelH * 0.47, Math.min(43, h * 0.067), { weight: 750, max: 390 });
        });
      }
      xx += wid;
    });
  }
  var panelSheet;
  function completedExhibit() {
    if (!panelSheet) {
      panelSheet = sheet(whiteMount[2], whiteMount[3]);
      triptych(panelSheet.getContext("2d"), 24.6, [0, 0, whiteMount[2], whiteMount[3]]);
    }
    return panelSheet;
  }
  var endBeam = [272, 306, 896, 75];
  var endGlass = [293, 384, 848, 271];
  function sourceQuad(x2, y2, w, h, rise = 0) {
    return [[x2, y2], [x2 + w, y2 + rise], [x2, y2 + h]];
  }
  function quadPath(c, q) {
    const [a, b, d] = q;
    c.beginPath();
    c.moveTo(...a);
    c.lineTo(...b);
    c.lineTo(b[0] + d[0] - a[0], b[1] + d[1] - a[1]);
    c.lineTo(...d);
    c.closePath();
  }
  var interpolateQuad = (a, b, v) => a.map((pt, i) => [mix(pt[0], b[i][0], v), mix(pt[1], b[i][1], v)]);
  var sheetCoordinates = (q) => q.map(([x2, y2]) => [x2 + whiteMount[0], y2 + whiteMount[1]]);
  function textureQuad(c, sheet2, source, dest, color, inkWeight) {
    const [o, p, q] = source, [a, b, d] = dest, w = p[0] - o[0], h = q[1] - o[1];
    if (Math.abs(w * h) < 1e-5) return;
    group(c, () => {
      quadPath(c, dest);
      c.clip();
      c.transform((b[0] - a[0]) / w, (b[1] - a[1]) / w, (d[0] - a[0]) / h, (d[1] - a[1]) / h, a[0], a[1]);
      c.transform(1, -(p[1] - o[1]) / w, 0, 1, 0, 0);
      blit(c, sheet2, -o[0], -o[1]);
    });
    if (inkWeight > 0) group(c, () => {
      c.globalAlpha = inkWeight;
      quadPath(c, dest);
      c.fillStyle = color;
      c.fill();
    });
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
  function reduction(c, t, collapse = 0, showBeam = true) {
    const sheet2 = completedExhibit(), [x2, y2, w, h] = whiteMount;
    const cut = step(t, 20.55, 22.3), join = step(t, 21.92, 23.95);
    const simplify = step(t, 22.223, 24.07);
    if (t < 21.2) {
      const retract = 1 - step(t, 20.55, 21.2), hh = (h - ph) * retract;
      if (hh > 0.1) blit(c, sheet2, 0, ph, w, h - ph, x2, y2 + ph, w, hh);
    }
    pieces.forEach((el, i) => {
      if (i === 2 && !showBeam) return;
      const crop = interpolateQuad(el.base, el.sample, cut);
      let placed = interpolateQuad(sheetCoordinates(crop), el.target, join);
      if (collapse > 0 && i !== 2) {
        const ky = 1 - step(collapse, 0, 0.39);
        if (ky < 1e-3) return;
        placed = placed.map(([px, py]) => [px, endBeam[1] + endBeam[3] + (py - endBeam[1] - endBeam[3]) * ky]);
      }
      textureQuad(c, sheet2, crop, placed, el.color, el.density * simplify);
      if (i === 0 && simplify > 0) {
        const [a, b, d] = placed;
        const ww = b[0] - a[0], hh = d[1] - a[1];
        group(c, () => {
          quadPath(c, placed);
          c.clip();
          c.globalAlpha = simplify * 0.93;
          c.strokeStyle = "#394344";
          c.lineWidth = 3.5;
          for (let j = 0; j <= 5; j++) {
            const px = a[0] + j * ww / 5;
            c.beginPath();
            c.moveTo(px, a[1]);
            c.lineTo(px, a[1] + hh);
            c.stroke();
          }
          c.strokeRect(a[0] + 2, a[1] + 2, ww - 4, Math.max(0, hh - 4));
        });
      }
    });
  }
  function slabCorners(landing, u) {
    const t = Math.max(0.62, u), k = Math.min(1, Math.max(0, 1 + (t - 0.83) / 0.59));
    const lift = 7.9 * (1 - k * k) + (t >= 0.83 ? Math.exp(-20 * (t - 0.83)) * Math.abs(Math.sin(31 * (t - 0.83))) * 0.11 : 0);
    const rotZ = -0.11 * (1 - k), rotY = 0.12 * (1 - k);
    const projectedY = -H / (2 * 5.46) * Math.cos(Math.atan2(6.32, 14));
    const X = landing[1].map((v, i) => (v - landing[0][i]) / 8.25), Z = landing[2].map((v, i) => (v - landing[0][i]) / 3.95);
    return [[-4.125, -1.975], [4.125, -1.975], [-4.125, 1.975]].map(([a, z], i) => {
      const sx = a * Math.cos(rotZ) - 0.32 * Math.sin(rotZ), sy = a * Math.sin(rotZ) + 0.32 * Math.cos(rotZ);
      const rx = sx * Math.cos(rotY) + z * Math.sin(rotY), rz = -sx * Math.sin(rotY) + z * Math.cos(rotY);
      return [landing[i][0] + X[0] * (rx - a) + Z[0] * (rz - z), landing[i][1] + X[1] * (rx - a) + Z[1] * (rz - z) + projectedY * (sy - 0.32 + lift)];
    });
  }
  function photoToSlab(c, u, landing) {
    if (!landing || u >= 0.855) return;
    const sheet2 = completedExhibit(), to = slabCorners(landing, u);
    reduction(c, 24.6, u, false);
    const from = sourceQuad(...endBeam), p = step(u, 0.035, 0.675);
    const target = interpolateQuad(from, to, p).map(([x2, y2]) => [x2, y2 - Math.sin(Math.PI * p) * 30]);
    const [a, b, d] = target, dx = b[0] - a[0], dy = b[1] - a[1];
    const edge = 24 * step(u, 0.2, 0.57) * (1 - step(u, 0.73, 0.825));
    group(c, () => {
      c.globalAlpha = 1 - step(u, 0.73, 0.835);
      if (edge > 0.2) {
        c.fillStyle = "#afa99c";
        c.beginPath();
        c.moveTo(...d);
        c.lineTo(d[0] + dx, d[1] + dy);
        c.lineTo(...b);
        c.lineTo(b[0], b[1] + edge);
        c.lineTo(d[0] + dx, d[1] + dy + edge);
        c.lineTo(d[0], d[1] + edge);
        c.closePath();
        c.fill();
      }
      textureQuad(c, sheet2, eaveSample, target, "#ddd9c8", 0.32 + step(u, 0.4, 0.72) * 0.34);
    });
  }

  // ../../../../../../../../var/folders/99/fwfmgn090cl0c1l5bc51xtcw0000gn/T/neo-4k60-MVi4O2/src/component-entry.js
  async function ready() {
    await loadPhotos();
  }
  function draw(c, t) {
    const u = t + 74 / 30 - 24.6;
    const corners = paintBuilding(c, u);
    if (u < 0.88) {
      c.save();
      c.globalAlpha = 1 - step(u, 0, 0.82);
      rect(c, 0, 0, W, H, "#f8f4ea");
      c.restore();
      photoToSlab(c, u, corners);
    }
  }
  return __toCommonJS(component_entry_exports);
})();
