// 夏夏的AI灵感 · 蒲公英弹性入场。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // shim3:three
  var require_three = __commonJS({
    "shim3:three"(exports, module) {
      module.exports = window.THREE;
    }
  });
  var THREE5 = __toESM(require_three(), 1);
  var MUSIC_SYNC = {
    "sourceStart": 35.011333,
    "mainBounce": 1.2,
    "returnBounce": 2.125,
    "entryStart": 0.275,
    "halfCycle": 0.925,
    "damping": 0.55,
    "fireworks": [
      {
        "musicTime": 38.086333,
        "videoTime": 3.066666666666667,
        "frame": 92,
        "errorMs": -8.3333,
        "flight": 0.92,
        "release": 2.146666666666667
      },
      {
        "musicTime": 39.466333,
        "videoTime": 4.466666666666667,
        "frame": 134,
        "errorMs": 11.6667,
        "flight": 0.86,
        "release": 3.606666666666667
      },
      {
        "musicTime": 40.391333,
        "videoTime": 5.366666666666666,
        "frame": 161,
        "errorMs": -13.3333,
        "flight": 0.8,
        "release": 4.566666666666666
      },
      {
        "musicTime": 41.321333,
        "videoTime": 6.3,
        "frame": 189,
        "errorMs": -10,
        "flight": 0.74,
        "release": 5.56
      },
      {
        "musicTime": 41.776333,
        "videoTime": 6.766666666666667,
        "frame": 203,
        "errorMs": 1.6667,
        "flight": 0.68,
        "release": 6.086666666666667
      },
      {
        "musicTime": 42.251333,
        "videoTime": 7.233333333333333,
        "frame": 217,
        "errorMs": -6.6667,
        "flight": 0.62,
        "release": 6.613333333333333
      },
      {
        "musicTime": 42.706333,
        "videoTime": 7.7,
        "frame": 231,
        "errorMs": 5,
        "flight": 0.58,
        "release": 7.12
      },
      {
        "musicTime": 43.176333,
        "videoTime": 8.166666666666666,
        "frame": 245,
        "errorMs": 1.6667,
        "flight": 0.54,
        "release": 7.626666666666666
      },
      {
        "musicTime": 43.406333,
        "videoTime": 8.4,
        "frame": 252,
        "errorMs": 5,
        "flight": 0.5,
        "release": 7.9
      },
      {
        "musicTime": 43.636333,
        "videoTime": 8.633333333333333,
        "frame": 259,
        "errorMs": 8.3333,
        "flight": 0.48,
        "release": 8.153333333333332
      },
      {
        "musicTime": 43.876333,
        "videoTime": 8.866666666666667,
        "frame": 266,
        "errorMs": 1.6667,
        "flight": 0.46,
        "release": 8.406666666666666
      },
      {
        "musicTime": 44.101333,
        "videoTime": 9.1,
        "frame": 273,
        "errorMs": 10,
        "flight": 0.44,
        "release": 8.66
      }
    ]
  };
  var PARAMETERS = {
    seed: 2026111506,
    width: 1440,
    height: 1080,
    fps: 60,
    duration: 16.5,
    output: { width: 3840, height: 2880, maxVideoRate: 34e6, maxTotalRate: 4e7 },
    palette: ["#ec397b", "#efbd0b", "#ee8c22", "#13a888", "#258dca", "#9c48b4"],
    flower: { radius: 1.13, seeds: 158, pappusRadius: 0.155, retainedSeeds: 26 },
    motion: { slowTurns: 0.1, fastTurns: 1.72, acceleration: [1.15, 7.6], braking: [8.9, 10.9], sway: 0.18, tangentCarry: 0.72, radialKick: 2.75, detachedDrag: 3.7 },
    entry: { amplitude: 8.3, start: MUSIC_SYNC.entryStart, halfCycle: MUSIC_SYNC.halfCycle, damping: MUSIC_SYNC.damping, settle: [2.6, 3] },
    flexibility: { step: 1 / 240, windSway: 0.6, depthSway: 0.19, bend: 0.72, secondaryBend: 0.16, recoil: 0.13, tipTilt: 0.16, drift: 0.13 },
    emission: { start: 2.15, bands: 6, bandDuration: 1 },
    music: { path: "", sourceStart: MUSIC_SYNC.sourceStart, mainBounce: MUSIC_SYNC.mainBounce, returnBounce: MUSIC_SYNC.returnBounce },
    fireworks: { petals: 156, impulse: 3.1, drag: 5.8, fallDelay: 0.35, fallSpeed: 0.25, fallResponse: 1.4, petalScale: 1.3, trailSeconds: 0.045, trailLife: 0.72 },
    ending: { start: 11, ramp: 2.4, extraFallSpeed: 2.8, stagger: 0.45, musicFade: 1.8 },
    signature: { text: "\u590F\u590F\u7684AI\u7075\u611F", start: 11.55, appear: 1.7, stagger: 0.08, drop: 64, drift: 17, flutter: 9, tilt: 0.07, windPixels: 112, top: 184, bandHeight: 132, baseline: 96, fontSize: 82, tracking: 5, color: "#627786", accent: "#b2768e", emblemStart: 11.35, emblemAppear: 1.55, emblemY: 174, emblemColors: ["#cf91a7", "#9fb9ab", "#c9b47d"], layout: "" },
    quality: { samples: 3, shutter: 6e-3, petalRows: 10, petalColumns: 6 },
    composition: { fov: 39, cameraZ: 13.7 }
  };
  var BURSTS = [
    { release: 2, flight: 0.5, target: [-3.85, 2.2, 0.1], color: 0, size: 1.18 },
    { release: 2.58, flight: 0.54, target: [3.85, 2.15, -0.25], color: 4, size: 1.2 },
    { release: 3.15, flight: 0.5, target: [0, 3, -0.6], color: 1, size: 1.22 },
    { release: 3.65, flight: 0.48, target: [-3.95, -1.35, 0.6], color: 3, size: 1.2 },
    { release: 4.08, flight: 0.51, target: [3.95, -1.25, 0.25], color: 2, size: 1.22 },
    { release: 4.48, flight: 0.56, target: [-2, 0.65, -0.4], color: 5, size: 1.1 },
    { release: 4.98, flight: 0.5, target: [2.05, 0.7, 0.15], color: 0, size: 1.14 },
    { release: 5.46, flight: 0.51, target: [-3.1, -2.3, 0.2], color: 4, size: 1.22 },
    { release: 5.88, flight: 0.54, target: [3.1, -2.2, -0.1], color: 1, size: 1.25 },
    { release: 6.35, flight: 0.55, target: [-2.4, 2.25, -0.5], color: 2, size: 1.3 },
    { release: 6.72, flight: 0.54, target: [2.4, 2.25, -0.3], color: 3, size: 1.32 },
    { release: 7.04, flight: 0.56, target: [0.12, 2.45, 0.4], color: 0, size: 1.5 }
  ].map((burst, i) => ({ ...burst, sourceSeed: [36, 18, 1, 87, 80, 26, 11, 59, 38, 4, 14, 0][i], release: MUSIC_SYNC.fireworks[i].release, flight: MUSIC_SYNC.fireworks[i].flight }));
  var THREE = __toESM(require_three(), 1);
  var clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  var smooth = (a, b, t) => {
    const u = clamp((t - a) / (b - a));
    return u * u * (3 - 2 * u);
  };
  function entryX(t) {
    const e = PARAMETERS.entry, a = Math.max(0, t - e.start), w = Math.PI / e.halfCycle, d = e.damping * w / Math.sqrt(1 - e.damping * e.damping);
    return e.amplitude * Math.exp(-d * a) * (Math.cos(w * a) + d / w * Math.sin(w * a)) * (1 - smooth(...e.settle, t));
  }
  function windAt(t) {
    return { x: 0.72 * Math.sin(t * 1.85 - 0.6) + 0.28 * Math.sin(t * 3.12 + 1.15), z: 0.66 * Math.sin(t * 1.13 + 0.3) + 0.25 * Math.sin(t * 2.6 - 0.7) };
  }
  function recoilAt(t) {
    let x = 0, z = 0, y = 0;
    for (const b of BURSTS) {
      const a = t - b.release;
      if (a < 0 || a > 2.7) continue;
      const length = Math.hypot(b.target[0], b.target[2], 0.8), pulse = Math.exp(-2.5 * a) * Math.sin(7.2 * a) * smooth(0, 0.07, a);
      const strength = PARAMETERS.flexibility.recoil * (0.45 + 0.55 * smooth(...PARAMETERS.motion.acceleration, b.release));
      x -= b.target[0] / length * pulse * strength;
      z -= b.target[2] / length * pulse * strength;
      y -= pulse * strength * 0.22;
    }
    return { x, z, y };
  }
  var step = PARAMETERS.flexibility.step;
  var table = [];
  var state = [entryX(0), 0, 0, 0, 0, 0, 0, 0, 0, 0];
  function advance(offset, target, frequency, damping) {
    const a = (target - state[offset]) * frequency * frequency - 2 * damping * frequency * state[offset + 1];
    state[offset + 1] += a * step;
    state[offset] += state[offset + 1] * step;
  }
  for (let i = 0; i <= Math.ceil((PARAMETERS.duration + 0.1) / step); i++) {
    const t = i * step, w = windAt(t), gate = smooth(2.18, 3.1, t), relax = 1 - 0.24 * smooth(8.9, 11, t);
    table.push([...state]);
    advance(0, entryX(t + step), 6.8, 0.58);
    advance(2, w.x * PARAMETERS.flexibility.windSway * gate * relax, 4.7, 0.52);
    advance(4, w.z * PARAMETERS.flexibility.depthSway * gate * relax, 4, 0.6);
    advance(6, w.x * PARAMETERS.flexibility.bend * gate * relax, 6.4, 0.5);
    advance(8, Math.sin(t * 2.55 + 0.8) * PARAMETERS.flexibility.secondaryBend * gate * relax, 8.3, 0.55);
  }
  function sample(t) {
    const f = clamp(t / step, 0, table.length - 1), i = Math.min(Math.floor(f), table.length - 2), a = f - i;
    return table[i].map((v, k) => v + (table[i + 1][k] - v) * a);
  }
  function flexibleState(t) {
    const s = sample(t), entry = entryX(t), r = recoilAt(t), gate = smooth(2.18, 3.1, t), w = windAt(t);
    const bx = 0.47 * (s[0] - entry) + 0.78 * s[6] - 0.3 * s[2] - 0.065 * gate;
    const sx = s[8] + r.x * 0.9;
    const tiltX = clamp(-0.13 * (s[0] - entry) + PARAMETERS.flexibility.tipTilt * w.x * gate - 0.055 * s[3] + r.x * 0.7, -0.24, 0.24);
    const tiltZ = clamp(0.12 * s[4] + 0.035 * w.z * gate - 0.035 * s[5] + r.z * 0.7, -0.14, 0.14);
    return {
      position: new THREE.Vector3(entry + s[2] + r.x, 0.28 - 0.035 * s[2] * s[2] + 0.055 * Math.sin(t * 2.3 + 0.2) * gate + r.y - 0.2 * smooth(7.4, 10, t), s[4] + r.z),
      bendX: bx,
      bendZ: 0.26 * s[4] - 0.09 * s[5],
      secondaryX: sx,
      tiltX,
      tiltZ,
      recoil: r,
      wind: w
    };
  }
  function flexiblePoint(t, u, state2 = flexibleState(t)) {
    const bottom = -PARAMETERS.composition.cameraZ * Math.tan(PARAMETERS.composition.fov * Math.PI / 360), h = state2.position, span = h.y - bottom;
    const follow = u * u * (3 - 2 * u), bow = 16 * u * u * (1 - u) * (1 - u), wave = bow * (2 * u - 1) * 2, tip = u * u * (u - 1);
    return new THREE.Vector3(
      h.x * follow + state2.bendX * bow + state2.secondaryX * wave + span * state2.tiltX * tip,
      bottom + span * u,
      h.z * follow + state2.bendZ * bow - 0.4 * state2.secondaryX * wave + span * state2.tiltZ * tip
    );
  }
  function stemDirection(t) {
    const s = flexibleState(t);
    return new THREE.Vector3(s.tiltX, 1, s.tiltZ).normalize();
  }
  function windDrift(t, birth, phase = 0) {
    const age = Math.max(0, t - birth), gain = PARAMETERS.flexibility.drift * smooth(0.15, 1, age);
    const integral = (freq, offset) => -(Math.cos(freq * t + offset) - Math.cos(freq * birth + offset)) / freq;
    return new THREE.Vector3(
      gain * (0.72 * integral(1.85, -0.6) + 0.28 * integral(3.12, 1.15)),
      0.022 * (Math.sin(age * 1.9 + phase) - Math.sin(phase)) * smooth(0.3, 1.2, age),
      gain * 0.42 * integral(1.13, 0.3)
    );
  }
  var THREE2 = __toESM(require_three(), 1);
  function createPetalGeometry(lengthSegments = 14, widthSegments = 8) {
    const positions = [], indices = [];
    for (let j = 0; j <= lengthSegments; j++) {
      const s = j / lengthSegments;
      const w = 5e-3 + 0.365 * Math.pow(Math.sin(Math.PI * s), 0.56) * (0.86 + 0.14 * s);
      for (let i = 0; i <= widthSegments; i++) {
        const x = (i / widthSegments * 2 - 1) * w;
        const z = 0.15 * Math.sin(Math.PI * s) + 0.09 * s * s + 0.18 * x * x;
        positions.push(x, s, z);
      }
    }
    for (let j = 0; j < lengthSegments; j++) {
      for (let i = 0; i < widthSegments; i++) {
        const a = j * (widthSegments + 1) + i, b = a + widthSegments + 1;
        indices.push(a, a + 1, b, a + 1, b + 1, b);
      }
    }
    const g = new THREE2.BufferGeometry();
    g.setAttribute("position", new THREE2.Float32BufferAttribute(positions, 3));
    g.setIndex(indices);
    g.computeVertexNormals();
    return g;
  }
  var THREE3 = __toESM(require_three(), 1);
  var clamp2 = (x) => Math.max(0, Math.min(1, x));
  var smooth2 = (u) => {
    u = clamp2(u);
    return u * u * (3 - 2 * u);
  };
  function settlingOffset(t, phase, strength = 1, out = new THREE3.Vector3()) {
    const e = PARAMETERS.ending, start = e.start + e.stagger * (0.5 + 0.5 * Math.cos(phase));
    const a = Math.max(0, t - start), u = clamp2(a / e.ramp), gate = smooth2(u);
    const distance = e.ramp * (u * u * u - 0.5 * u * u * u * u) + Math.max(0, a - e.ramp);
    const response = 0.9 + 0.2 * (0.5 + 0.5 * Math.sin(phase * 0.73));
    const flutter = 0.14 * gate * (Math.sin(a * 1.18 + phase) - Math.sin(phase));
    return out.set(flutter * strength, -e.extraFallSpeed * response * distance * strength, 0);
  }
  var THREE4 = __toESM(require_three(), 1);
  var clamp3 = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  var smooth3 = (a, b, t) => {
    const u = clamp3((t - a) / (b - a));
    return u * u * (3 - 2 * u);
  };
  function randomGenerator(seed) {
    let x = seed;
    return () => {
      x = Math.imul(x, 1664525) + 1013904223 | 0;
      return (x >>> 0) / 4294967296;
    };
  }
  var intSmooth = (a, b, t) => {
    const d = b - a, u = clamp3((t - a) / d);
    return d * (u * u * u - 0.5 * u * u * u * u) + Math.max(0, t - b);
  };
  function angleAt(t) {
    const m = PARAMETERS.motion;
    return 2 * Math.PI * (m.slowTurns * t + (m.fastTurns - m.slowTurns) * intSmooth(...m.acceleration, t) - (m.fastTurns - 0.035) * intSmooth(...m.braking, t));
  }
  function headPose(t) {
    const state2 = flexibleState(t), sway = new THREE4.Quaternion().setFromUnitVectors(new THREE4.Vector3(0, 1, 0), stemDirection(t));
    const spin = new THREE4.Quaternion().setFromAxisAngle(new THREE4.Vector3(0, 1, 0), angleAt(t) + 0.23);
    return { position: state2.position, quaternion: sway.multiply(spin) };
  }
  function attached(seed, t) {
    const h = headPose(t);
    return { position: seed.anchor.clone().applyQuaternion(h.quaternion).add(h.position), quaternion: h.quaternion.clone().multiply(seed.q) };
  }
  function cacheLaunch(seed) {
    const t = seed.release, h = attached(seed, t), next = attached(seed, t + 1e-4), prev = attached(seed, t - 1e-4);
    const v = next.position.sub(prev.position).multiplyScalar(5e3);
    const radial = h.position.clone().sub(headPose(t).position).normalize();
    const load = smooth3(...PARAMETERS.motion.acceleration, t), kick = 0.35 + (PARAMETERS.motion.radialKick - 0.35) * load;
    seed.start = h.position;
    seed.startQ = h.quaternion;
    seed.v0 = v.multiplyScalar(PARAMETERS.motion.tangentCarry).addScaledVector(radial, kick);
    if (seed.burst) {
      seed.target = new THREE4.Vector3(...seed.burst.target);
      seed.endV = seed.target.clone().sub(seed.start).multiplyScalar(0.22).add(new THREE4.Vector3(0, 0.28, 0));
    }
  }
  function seedFlight(seed, t) {
    if (t <= seed.release) return attached(seed, t);
    const a = t - seed.release, position = new THREE4.Vector3();
    if (seed.burst) {
      const d = seed.burst.flight, u = clamp3(a / d), u2 = u * u, u3 = u2 * u;
      position.copy(seed.start).multiplyScalar(2 * u3 - 3 * u2 + 1).addScaledVector(seed.v0, d * (u3 - 2 * u2 + u)).addScaledVector(seed.target, -2 * u3 + 3 * u2).addScaledVector(seed.endV, d * (u3 - u2));
    } else {
      const drag = PARAMETERS.motion.detachedDrag, k = (1 - Math.exp(-drag * a)) / drag;
      position.copy(seed.start).addScaledVector(seed.v0, k).add(new THREE4.Vector3(0.1 * a + 0.07 * (Math.sin(a * 1.4 + seed.phase) - Math.sin(seed.phase)), -0.07 * a * a + 0.09 * Math.sin(a * 1.7), seed.depth * (1 - Math.exp(-a * 0.45))));
      position.add(windDrift(t, seed.release, seed.phase));
      position.add(settlingOffset(t, seed.phase, 0.4));
    }
    const turn = new THREE4.Quaternion().setFromAxisAngle(seed.axis, 0.65 * a + 0.16 * Math.sin(a * 2.1));
    return { position, quaternion: seed.startQ.clone().multiply(turn) };
  }
  function sparkPosition(s, t, out = new THREE4.Vector3()) {
    const a = Math.max(0, t - s.birth), k = PARAMETERS.fireworks.drag, travel = (1 - Math.exp(-k * a)) / k;
    out.copy(s.center).addScaledVector(s.velocity, travel).addScaledVector(s.carry, 0.12 * (1 - Math.exp(-1.6 * a)) / 1.6);
    out.x += 0.055 * a + 0.055 * (Math.sin(a * 1.65 + s.phase) - Math.sin(s.phase)) * smooth3(0, 0.4, a);
    const fallAge = Math.max(0, a - PARAMETERS.fireworks.fallDelay), response = PARAMETERS.fireworks.fallResponse;
    out.y -= PARAMETERS.fireworks.fallSpeed * (fallAge - (1 - Math.exp(-response * fallAge)) / response);
    out.y += 0.045 * (Math.cos(a * 1.4 + s.phase) - Math.cos(s.phase)) * smooth3(0, 0.4, a);
    out.z += s.depth * 0.08 * a;
    out.add(windDrift(t, s.birth, s.phase));
    out.add(settlingOffset(t, s.phase));
    return out;
  }
  var exportMode = new URLSearchParams(location.search).has("render");
  var renderWidth = 800;
  var renderHeight = 600;
  var debug = new URLSearchParams(location.search).get("debug");
  var renderer = new THREE5.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(1);
  renderer.setSize(renderWidth, renderHeight);
  renderer.outputColorSpace = THREE5.SRGBColorSpace;
  renderer.toneMapping = THREE5.NoToneMapping;
  renderer.autoClear = false;
  document.querySelector("#stage").appendChild(renderer.domElement);
  var scene = new THREE5.Scene();
  var camera = new THREE5.PerspectiveCamera(PARAMETERS.composition.fov, PARAMETERS.width / PARAMETERS.height, 0.1, 70);
  camera.position.set(0, 0, PARAMETERS.composition.cameraZ);
  camera.lookAt(0, 0, 0);
  var rand = randomGenerator(PARAMETERS.seed);
  var Y = new THREE5.Vector3(0, 1, 0);
  var white = new THREE5.Color("#fff");
  var palette = PARAMETERS.palette.map((c) => new THREE5.Color(c));
  var screenCamera = new THREE5.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  var screenGeometry = new THREE5.PlaneGeometry(2, 2);
  var backgroundScene = new THREE5.Scene();
  backgroundScene.add(new THREE5.Mesh(screenGeometry, new THREE5.ShaderMaterial({
    vertexShader: "varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}",
    fragmentShader: "varying vec2 vUv;void main(){float e=pow(abs(vUv.y-.51)*2.,2.4);vec3 c=mix(vec3(1.),vec3(.866,.876,.861),e*.8);gl_FragColor=vec4(c,1.);\n#include <colorspace_fragment>\n}",
    depthTest: false,
    depthWrite: false
  })));
  var sampleTarget = new THREE5.WebGLRenderTarget(renderWidth, renderHeight, { type: THREE5.HalfFloatType, depthBuffer: true, samples: 4 });
  var accumulationTarget = new THREE5.WebGLRenderTarget(renderWidth, renderHeight, { type: THREE5.HalfFloatType, depthBuffer: false });
  sampleTarget.texture.colorSpace = THREE5.LinearSRGBColorSpace;
  accumulationTarget.texture.colorSpace = THREE5.LinearSRGBColorSpace;
  var sumScene = new THREE5.Scene();
  var copyScene = new THREE5.Scene();
  var sumMaterial = new THREE5.ShaderMaterial({
    uniforms: { source: { value: sampleTarget.texture }, weight: { value: 1 } },
    vertexShader: "varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}",
    fragmentShader: "varying vec2 vUv;uniform sampler2D source;uniform float weight;void main(){gl_FragColor=texture2D(source,vUv)*weight;}",
    transparent: true,
    blending: THREE5.CustomBlending,
    blendSrc: THREE5.OneFactor,
    blendDst: THREE5.OneFactor,
    blendEquation: THREE5.AddEquation,
    depthTest: false,
    depthWrite: false
  });
  sumScene.add(new THREE5.Mesh(screenGeometry, sumMaterial));
  copyScene.add(new THREE5.Mesh(screenGeometry, new THREE5.MeshBasicMaterial({ map: accumulationTarget.texture, depthTest: false, depthWrite: false, toneMapped: false })));
  var seeds = [];
  for (let i = 0; i < PARAMETERS.flower.seeds; i++) {
    const y = 1 - 2 * (i + 0.5) / PARAMETERS.flower.seeds, phi = i * 2.399963229728653 + 0.09 * (rand() - 0.5), r = Math.sqrt(1 - y * y);
    const normal = new THREE5.Vector3(r * Math.cos(phi), y, r * Math.sin(phi));
    seeds.push({
      id: i,
      normal,
      anchor: normal.clone().multiplyScalar(PARAMETERS.flower.radius * (0.93 + rand() * 0.13)),
      q: new THREE5.Quaternion().setFromUnitVectors(Y, normal),
      release: i < PARAMETERS.flower.retainedSeeds ? 99 : 3.15 + Math.pow(rand(), 0.88) * 4.05,
      phase: rand() * Math.PI * 2,
      depth: (rand() - 0.35) * 1.2,
      axis: new THREE5.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize(),
      color: Math.floor(rand() * palette.length),
      cap: PARAMETERS.flower.pappusRadius * (0.8 + rand() * 0.45),
      petals: [],
      burst: null
    });
  }
  BURSTS.forEach((b, bi) => {
    const target = new THREE5.Vector3(...b.target), center = headPose(b.release).position, dir = target.clone().sub(center).normalize();
    let best = null, score = -Infinity;
    for (const s of seeds) {
      if (s.burst) continue;
      const v = attached(s, b.release).position.sub(center).normalize();
      const value = v.dot(dir);
      if (value > score) {
        score = value;
        best = s;
      }
    }
    if (b.sourceSeed !== void 0) best = seeds[b.sourceSeed];
    best.release = b.release;
    best.burst = { ...b, index: bi };
    best.color = b.color;
  });
  var flowRandom = randomGenerator(PARAMETERS.seed + 83);
  var freeSeeds = seeds.filter((s) => !s.burst && s.release < 90).sort((a, b) => a.phase - b.phase);
  var emissionBands = [];
  var cursor = 0;
  var cumulative = 0;
  for (let band = 0; band < PARAMETERS.emission.bands; band++) {
    cumulative += band + 1;
    const end = Math.round(freeSeeds.length * cumulative / (PARAMETERS.emission.bands * (PARAMETERS.emission.bands + 1) / 2)), count = end - cursor, start = PARAMETERS.emission.start + band * PARAMETERS.emission.bandDuration;
    for (let j = 0; j < count; j++) freeSeeds[cursor + j].release = start + (j + 0.18 + 0.64 * flowRandom()) / count * PARAMETERS.emission.bandDuration;
    emissionBands.push({ start, end: start + PARAMETERS.emission.bandDuration, count });
    cursor = end;
  }
  seeds.forEach(cacheLaunch);
  var petals = [];
  for (const seed of seeds) {
    const count = seed.burst ? 5 : 3;
    for (let j = 0; j < count; j++) {
      const a = j / count * Math.PI * 2 + seed.phase;
      const orient = new THREE5.Quaternion().setFromAxisAngle(Y, a).multiply(new THREE5.Quaternion().setFromAxisAngle(new THREE5.Vector3(1, 0, 0), -Math.PI / 2 + 0.18));
      const p = { type: "seed", seed, orient, offset: new THREE5.Vector3(Math.cos(a) * 0.018, 0.025, Math.sin(a) * 0.018), length: (0.082 + rand() * 0.052) * (seed.burst ? 1.1 : 1), width: 0.65 + rand() * 0.3, color: palette[seed.color].clone().lerp(white, rand() * 0.12), phase: rand() * 6.283 };
      seed.petals.push(p);
      petals.push(p);
    }
  }
  var sparks = [];
  for (const seed of seeds.filter((s) => s.burst)) {
    const b = seed.burst;
    for (let j = 0; j < PARAMETERS.fireworks.petals; j++) {
      const y = 1 - 2 * (j + 0.5) / PARAMETERS.fireworks.petals, a = j * 2.399963229728653 + seed.phase, r = Math.sqrt(1 - y * y);
      const direction = new THREE5.Vector3(r * Math.cos(a), y, r * Math.sin(a) * 0.8).normalize();
      const speed = (2.25 + Math.pow(rand(), 0.52) * 1.9) * b.size * PARAMETERS.fireworks.impulse;
      const choice = rand(), color = (choice < 0.82 ? palette[b.color] : choice < 0.94 ? palette[1] : palette[(b.color + 2) % 6]).clone().lerp(white, rand() * 0.08);
      const p = {
        type: "spark",
        seed,
        birth: seed.release + b.flight,
        center: seed.target.clone(),
        carry: seed.endV.clone(),
        velocity: direction.clone().multiplyScalar(speed),
        direction,
        phase: rand() * 6.283,
        depth: rand() - 0.5,
        axis: new THREE5.Vector3(rand(), rand() - 0.5, rand() - 0.5).normalize(),
        rate: 0.35 + rand() * 0.85,
        retainedRandom: rand(),
        length: (j % 31 === 0 ? 0.15 : 0.035 + rand() * 0.063) * b.size * PARAMETERS.fireworks.petalScale,
        width: 0.54 + rand() * 0.46,
        color,
        orient: new THREE5.Quaternion().setFromUnitVectors(Y, direction)
      };
      sparks.push(p);
      petals.push(p);
    }
  }
  for (let i = 0; i < 14; i++) {
    const seed = seeds[28 + i * 7 % 110];
    petals.push({ type: "near", seed, birth: 5.3 + i * 0.21, phase: rand() * 6.283, length: 0.12 + rand() * 0.15, width: 0.75, color: palette[i % 6].clone(), side: i % 2 ? -1 : 1, depth: 3.3 + rand() * 0.8 });
  }
  var petalGeometry = createPetalGeometry(PARAMETERS.quality.petalRows, PARAMETERS.quality.petalColumns);
  var uv = [];
  for (let j = 0; j <= PARAMETERS.quality.petalRows; j++) for (let i = 0; i <= PARAMETERS.quality.petalColumns; i++) uv.push(i / PARAMETERS.quality.petalColumns, j / PARAMETERS.quality.petalRows);
  petalGeometry.setAttribute("uv", new THREE5.Float32BufferAttribute(uv, 2));
  var alphas = new Float32Array(petals.length);
  petalGeometry.setAttribute("aAlpha", new THREE5.InstancedBufferAttribute(alphas, 1));
  var petalMaterial = new THREE5.ShaderMaterial({
    transparent: true,
    side: THREE5.DoubleSide,
    depthWrite: false,
    vertexShader: "attribute float aAlpha;varying float vAlpha;varying vec3 vColor;varying vec3 vNormal;varying vec2 vUv;void main(){vAlpha=aAlpha;vColor=instanceColor;vUv=uv;vNormal=normalize(mat3(modelMatrix*instanceMatrix)*normal);gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.);}",
    fragmentShader: "varying float vAlpha;varying vec3 vColor;varying vec3 vNormal;varying vec2 vUv;void main(){if(vAlpha<.004)discard;float lighting=.80+.20*abs(dot(normalize(vNormal),normalize(vec3(-.3,.5,1.))));float vein=exp(-abs(vUv.x-.5)*125.)*.28;vec3 c=mix(vColor*lighting,vec3(1.),vein+.045*vUv.y);gl_FragColor=vec4(c,vAlpha);\n#include <colorspace_fragment>\n}"
  });
  var petalMesh = new THREE5.InstancedMesh(petalGeometry, petalMaterial, petals.length);
  petalMesh.instanceMatrix.setUsage(THREE5.DynamicDrawUsage);
  petalMesh.frustumCulled = false;
  petalMesh.renderOrder = 3;
  petals.forEach((p, i) => petalMesh.setColorAt(i, p.color));
  scene.add(petalMesh);
  function lineLayer(segments, name) {
    const positions = new Float32Array(segments * 6), colors = new Float32Array(segments * 6), alpha = new Float32Array(segments * 2), geo = new THREE5.BufferGeometry();
    geo.setAttribute("position", new THREE5.BufferAttribute(positions, 3).setUsage(THREE5.DynamicDrawUsage));
    geo.setAttribute("color", new THREE5.BufferAttribute(colors, 3).setUsage(THREE5.DynamicDrawUsage));
    geo.setAttribute("aAlpha", new THREE5.BufferAttribute(alpha, 1).setUsage(THREE5.DynamicDrawUsage));
    const material = new THREE5.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      vertexShader: "attribute float aAlpha;varying float vAlpha;varying vec3 vColor;void main(){vAlpha=aAlpha;vColor=color;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
      fragmentShader: "varying float vAlpha;varying vec3 vColor;void main(){gl_FragColor=vec4(vColor,vAlpha);\n#include <colorspace_fragment>\n}"
    });
    const obj = new THREE5.LineSegments(geo, material);
    obj.frustumCulled = false;
    obj.name = name;
    scene.add(obj);
    return { obj, geo, positions, colors, alpha, n: 0, reset() {
      this.n = 0;
    }, add(a, b, c, aa, ab = aa) {
      const i = this.n++;
      positions.set(a.toArray(), i * 6);
      positions.set(b.toArray(), i * 6 + 3);
      colors.set(c.toArray(), i * 6);
      colors.set(c.toArray(), i * 6 + 3);
      alpha[i * 2] = aa;
      alpha[i * 2 + 1] = ab;
    }, flush() {
      geo.setDrawRange(0, this.n * 2);
      for (const a of Object.values(geo.attributes)) a.needsUpdate = true;
    } };
  }
  var fibers = lineLayer(PARAMETERS.flower.seeds * 48 + 180, "\u84B2\u516C\u82F1\u7ED2\u4E1D");
  var trails = lineLayer(sparks.length * 4 + BURSTS.length * 14, "\u82B1\u74E3\u70DF\u82B1\u77ED\u5C3E");
  fibers.obj.renderOrder = 2;
  trails.obj.renderOrder = 1;
  var core = new THREE5.Mesh(new THREE5.SphereGeometry(0.057, 16, 12), new THREE5.MeshBasicMaterial({ color: "#8eaaa8", transparent: true, opacity: 0.75 }));
  scene.add(core);
  var stemGeometry = new THREE5.BufferGeometry();
  var stemPositions = new Float32Array(65 * 9 * 3);
  var stemIndices = [];
  for (let j = 0; j < 64; j++) for (let i = 0; i < 8; i++) {
    const a = j * 9 + i, b = a + 9;
    stemIndices.push(a, a + 1, b, a + 1, b + 1, b);
  }
  stemGeometry.setAttribute("position", new THREE5.BufferAttribute(stemPositions, 3));
  stemGeometry.setIndex(stemIndices);
  var stem = new THREE5.Mesh(stemGeometry, new THREE5.MeshBasicMaterial({ color: "#98aeb3", transparent: true, opacity: 0.78 }));
  stem.frustumCulled = false;
  scene.add(stem);
  var dummy = new THREE5.Object3D();
  var pos = new THREE5.Vector3();
  var q = new THREE5.Quaternion();
  var tmp = new THREE5.Vector3();
  var tmp2 = new THREE5.Vector3();
  var ink = new THREE5.Color("#95acb5");
  var currentTime = 0;
  var soundtrack = null;
  if (soundtrack) soundtrack.preload = "auto";
  function update(t) {
    const h = headPose(t), stemFade = 1, flex = flexibleState(t);
    core.position.copy(h.position);
    core.material.opacity = 0.75 * stemFade;
    stem.material.opacity = 0.78 * stemFade;
    for (let j = 0; j <= 64; j++) {
      const u = j / 64, center = flexiblePoint(t, u, flex), tangent = flexiblePoint(t, Math.min(1, u + 1e-3), flex).sub(flexiblePoint(t, Math.max(0, u - 1e-3), flex)).normalize();
      const side = new THREE5.Vector3(tangent.y, -tangent.x, 0).normalize(), binormal = tangent.clone().cross(side).normalize();
      for (let i = 0; i <= 8; i++) {
        const a = i / 8 * Math.PI * 2, k = (j * 9 + i) * 3, radius = 82e-4 - 27e-4 * u, p = center.clone().addScaledVector(side, Math.cos(a) * radius).addScaledVector(binormal, Math.sin(a) * radius);
        stemPositions[k] = p.x;
        stemPositions[k + 1] = p.y;
        stemPositions[k + 2] = p.z;
      }
    }
    stemGeometry.attributes.position.needsUpdate = true;
    fibers.reset();
    trails.reset();
    const poses = [];
    for (const seed of seeds) {
      const age = t - seed.release, pose = seedFlight(seed, t);
      poses[seed.id] = pose;
      const remain = age <= 0 ? 1 : 1 - smooth3(0, 0.3, age);
      if (remain > 1e-3) {
        const end = seed.anchor, side = new THREE5.Vector3(seed.normal.y, -seed.normal.x, 0.3).normalize();
        let prev = h.position.clone().addScaledVector(seed.normal.clone().applyQuaternion(h.quaternion), 0.065);
        for (let k = 1; k <= 7; k++) {
          const u = k / 7, local = end.clone().multiplyScalar(u).addScaledVector(side, Math.sin(u * Math.PI) * 0.022 * Math.sin(t * 2 + seed.phase));
          const p = local.applyQuaternion(h.quaternion).add(h.position);
          fibers.add(prev, p, ink, 0.3 * remain * stemFade);
          prev = p;
        }
      }
      const capAlpha = (age <= 0 ? 1 : 1 - smooth3(0.3, 1.65, age)) * (seed.burst ? 1 - smooth3(seed.burst.flight - 0.12, seed.burst.flight + 0.05, age) : 1) * stemFade;
      if (capAlpha > 1e-3) {
        for (let k = 0; k < 10; k++) {
          const a = k / 10 * Math.PI * 2 + seed.phase, r = seed.cap * (0.9 + 0.1 * Math.sin(k * 3.7));
          let prev = new THREE5.Vector3(0, -0.1, 0).applyQuaternion(pose.quaternion).add(pose.position);
          for (let j = 1; j <= 3; j++) {
            const u = j / 3, local = new THREE5.Vector3(Math.cos(a) * r * u, 0.1 * u - 0.1 + 0.025 * Math.sin(u * Math.PI), Math.sin(a) * r * u);
            const p = local.applyQuaternion(pose.quaternion).add(pose.position);
            fibers.add(prev, p, ink, (0.44 - 0.12 * u) * capAlpha);
            prev = p;
          }
        }
      }
    }
    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      let alpha = 0, scale = 1;
      if (p.type === "seed") {
        const pose = poses[p.seed.id], age = t - p.seed.release;
        pos.copy(p.offset).applyQuaternion(pose.quaternion).add(pose.position);
        q.copy(pose.quaternion).multiply(p.orient);
        q.multiply(new THREE5.Quaternion().setFromAxisAngle(Y, 0.14 * Math.sin(t * 2.2 + p.phase)));
        alpha = 0.88 * (p.seed.burst ? 1 - smooth3(p.seed.burst.flight - 0.025, p.seed.burst.flight + 0.025, age) : 1);
        if (p.seed.release === 99) alpha *= stemFade;
      } else if (p.type === "spark") {
        const a = t - p.birth;
        sparkPosition(p, t, pos);
        q.copy(p.orient).multiply(new THREE5.Quaternion().setFromAxisAngle(p.axis, a * p.rate + 0.28 * Math.sin(a * 2 + p.phase) * smooth3(0, 0.4, a)));
        alpha = 0.98 * smooth3(0, 0.018, a);
        scale = 0.58 + 0.42 * smooth3(0, 0.07, a);
        if (a > 0 && a < PARAMETERS.fireworks.trailLife) {
          for (let k = 0; k < 4; k++) {
            const ta = Math.max(p.birth, t - PARAMETERS.fireworks.trailSeconds * k), tb = Math.max(p.birth, t - PARAMETERS.fireworks.trailSeconds * (k + 1));
            const pa = sparkPosition(p, ta, new THREE5.Vector3()), pb = sparkPosition(p, tb, new THREE5.Vector3());
            const fade = (1 - smooth3(0.2, PARAMETERS.fireworks.trailLife, a)) * 0.8;
            trails.add(pa, pb, p.color, fade * (1 - k / 4), fade * (1 - (k + 1) / 4));
          }
        }
      } else {
        const a = Math.max(0, t - p.birth), origin = seedFlight(p.seed, p.birth);
        pos.copy(origin.position);
        pos.x += p.side * (1 - Math.exp(-a * 1.3)) * 1.5 + 0.1 * Math.sin(a * 1.6 + p.phase) * smooth3(0, 0.5, a);
        pos.y += 0.14 * a - 0.1 * a * a;
        pos.z += p.depth * (1 - Math.exp(-a * 0.42));
        pos.add(windDrift(t, p.birth, p.phase));
        pos.add(settlingOffset(t, p.phase, 0.4));
        q.copy(origin.quaternion).multiply(new THREE5.Quaternion().setFromEuler(new THREE5.Euler(a * 0.7 + p.phase, a * 0.3, a * 0.28)));
        alpha = 0.82 * smooth3(0, 0.16, t - p.birth);
        scale = 0.4 + 0.6 * smooth3(0, 0.65, a);
      }
      if (debug === "fibers") alpha = 0;
      dummy.position.copy(pos);
      dummy.quaternion.copy(q);
      dummy.scale.set(p.length * p.width * scale, p.length * scale, p.length * scale);
      dummy.updateMatrix();
      petalMesh.setMatrixAt(i, dummy.matrix);
      alphas[i] = Math.max(0, alpha);
    }
    for (const seed of seeds.filter((s) => s.burst)) {
      const a = t - seed.release;
      if (a <= 0 || a >= seed.burst.flight) continue;
      for (let k = 0; k < 9; k++) {
        const ta = Math.max(seed.release, t - k * 0.019), tb = Math.max(seed.release, t - (k + 1) * 0.019);
        trails.add(seedFlight(seed, ta).position, seedFlight(seed, tb).position, palette[seed.color], 0.6 * (1 - k / 9), 0.6 * (1 - (k + 1) / 9));
      }
    }
    fibers.flush();
    trails.flush();
    petalGeometry.attributes.aAlpha.needsUpdate = true;
    petalMesh.instanceMatrix.needsUpdate = true;
    if (debug === "stem") {
      petalMesh.visible = false;
      fibers.obj.visible = false;
      trails.obj.visible = false;
      core.scale.setScalar(1.5);
    }
    if (debug === "petals") {
      fibers.obj.visible = false;
      stem.visible = false;
      core.visible = false;
      trails.obj.visible = false;
    }
  }
  function render(t, samples = PARAMETERS.quality.samples) {
    currentTime = clamp3(t, 0, PARAMETERS.duration);
    samples = Math.max(1, Math.round(samples));
    renderer.setRenderTarget(accumulationTarget);
    renderer.setClearColor(0, 0);
    renderer.clear();
    sumMaterial.uniforms.weight.value = 1 / samples;
    for (let i = 0; i < samples; i++) {
      const sampleTime = clamp3(currentTime + ((i + 0.5) / samples - 0.5) * PARAMETERS.quality.shutter, 0, PARAMETERS.duration);
      update(sampleTime);
      renderer.setRenderTarget(sampleTarget);
      renderer.clear();
      renderer.render(backgroundScene, screenCamera);
      renderer.clearDepth();
      renderer.render(scene, camera);
      renderer.setRenderTarget(accumulationTarget);
      renderer.render(sumScene, screenCamera);
    }
    renderer.setRenderTarget(null);
    renderer.clear();
    renderer.render(copyScene, screenCamera);
  }
  window.drawEffect = (t) => render(t, 1);
})();
