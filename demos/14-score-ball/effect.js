// 夏夏的AI灵感 · 十三次落音与跟随镜头。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
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
  var THREE2 = __toESM(require_three());
  var THREE = __toESM(require_three(), 1);
  var clamp = (x) => Math.max(0, Math.min(1, x));
  var sm = (a, b, t) => {
    const u = clamp((t - a) / (b - a));
    return u * u * u * (u * (u * 6 - 15) + 10);
  };
  var mix = (a, b, u) => a + (b - a) * u;
  var vecmix = (a, b, u) => a.map((x, i) => mix(x, b[i], u));
  function cameraAt(t, ball, end2, track) {
    const flower = [0.6 + Math.sin(Math.min(t, 4.7) * 0.36) * 0.8, 1.6, 10.8], flight = [1.4, 3.2, 16.5], physics = [4.3, 5.8, 17.8];
    let position = vecmix(flower, [1.8, 4.5, 26], sm(5.22, 6.1, t)), target = [0, 0.65, 0], offset = vecmix([-205, 115], [0, 110], sm(5.22, 6.1, t)), fov = 43;
    position = vecmix(position, flight, sm(6.15, 8.05, t));
    offset = vecmix(offset, [-110, 115], sm(6.15, 8.05, t));
    position = vecmix(position, physics, sm(11.7, 14.45, t));
    target = vecmix(target, [-0.5, 2.1, 0], sm(11.7, 14.45, t));
    offset = vecmix(offset, [-80, 110], sm(11.7, 14.45, t));
    const follow = sm(15.45, 18.3, t), close = sm(17.8, 21.1, t), relative = vecmix([3, 3.3, 12.5], [0.5, 1.35, 4.2], close);
    position = vecmix(position, ball.slice(0, 3).map((v, k) => v + relative[k]), follow);
    target = vecmix(target, ball.slice(0, 3), follow);
    offset = vecmix(offset, [-215, 125], follow);
    const sheet = sm(24.45, 25.825, t);
    if (track) {
      const distance = 0.57, aimZ = track.z - 0.65;
      position = vecmix(position, [track.x + 0.65 - 5.85 * distance, 9.3 * distance, aimZ + 13.85 * distance], sheet);
      target = vecmix(target, [track.x + 0.65, 0, aimZ], sheet);
      offset = vecmix(offset, [0, 145], sheet);
    }
    fov = mix(43, 42, sheet);
    return { position, target, offset, fov };
  }
  async function createScore(scene2, end2) {
    const data = window.scoreData, scale = data.worldScale ?? 15 / data.width, firstX = data.notes[0].x, group = new THREE.Group();
    group.position.x = end2[0];
    scene2.add(group);
    const toWorld = (n) => [(n.x - firstX) * scale, 0.167, (n.y - data.height / 2) * scale + 1];
    let svg = window.scoreSheet;
    svg = svg.replace("<svg ", '<svg fill="#9cceff" color="#9cceff" ').replaceAll('fill="currentColor"', 'fill="#9cceff"').replaceAll('stroke="currentColor"', 'stroke="#9cceff"').replaceAll('stroke="#000000"', 'stroke="#6993c1"').replaceAll('stroke="black"', 'stroke="#6993c1"').replaceAll('color="black"', 'color="#9cceff"').replaceAll('color="#000000"', 'color="#9cceff"');
    const image = new Image();
    image.src = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    await image.decode();
    const c = document.createElement("canvas");
    c.width = Math.min(12e3, Math.ceil(data.width * 2));
    c.height = Math.ceil(c.width * data.height / data.width);
    c.getContext("2d").drawImage(image, 0, 0, c.width, c.height);
    URL.revokeObjectURL(image.src);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const plate = new THREE.Mesh(new THREE.PlaneGeometry(data.width * scale, data.height * scale), new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }));
    plate.rotation.x = -Math.PI / 2;
    plate.position.set((data.width / 2 - firstX) * scale, 0.025, 1);
    group.add(plate);
    const targets = data.notes.map((n) => ({ ...n, p: toWorld(n) })), ball = new THREE.Group();
    group.add(ball);
    const pts = [];
    for (let k = 0; k < 4; k++) for (let j = 0; j < 80; j++) for (let e = 0; e < 2; e++) {
      const a = (j + e) / 80 * Math.PI * 2, b = k / 4 * Math.PI;
      pts.push(Math.cos(a) * Math.cos(b) * 0.167, Math.sin(a) * 0.167, Math.cos(a) * Math.sin(b) * 0.167);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    const line = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: new THREE.Color(0.55, 1.15, 2.1), transparent: true, opacity: 0.68, blending: THREE.AdditiveBlending }));
    ball.add(line);
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.16, 32, 24), new THREE.MeshBasicMaterial({ color: 1728923, transparent: true, opacity: 0.04, depthWrite: false }));
    ball.add(core);
    const rims = targets.map((n) => {
      const m = new THREE.Mesh(new THREE.RingGeometry(0.19, 0.215, 64), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.45, 0.95, 1.9), transparent: true, opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
      m.rotation.x = -Math.PI / 2;
      m.position.set(n.p[0], 0.032, n.p[2]);
      group.add(m);
      return m;
    });
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(60 * 3), 3));
    const trail = new THREE.Line(trailGeo, new THREE.LineBasicMaterial({ color: 8637183, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending }));
    trail.frustumCulled = false;
    group.add(trail);
    function track(t) {
      const keys = targets;
      let i = 0;
      while (i + 1 < keys.length && keys[i + 1].time <= t) i++;
      i = Math.min(i, keys.length - 2);
      const a = keys[i], b = keys[i + 1], h = b.time - a.time, u = Math.max(0, Math.min(1, (t - a.time) / h));
      const component = (k) => {
        const slope = (j) => (keys[j + 1].p[k] - keys[j].p[k]) / (keys[j + 1].time - keys[j].time), tangent = (j) => {
          if (j === 0) return slope(0);
          if (j === keys.length - 1) return slope(j - 1);
          const l = slope(j - 1), r = slope(j);
          return l * r <= 0 ? 0 : 2 * l * r / (l + r);
        };
        return (2 * u ** 3 - 3 * u * u + 1) * a.p[k] + (u ** 3 - 2 * u * u + u) * h * tangent(i) + (-2 * u ** 3 + 3 * u * u) * b.p[k] + (u ** 3 - u * u) * h * tangent(i + 1);
      };
      return { x: component(0) + end2[0], z: component(2) };
    }
    function arc(a, b, u) {
      u = Math.max(0, Math.min(1, u));
      const d = Math.hypot(b.p[0] - a.p[0], b.p[2] - a.p[2]), h = 0.42 + Math.min(0.35, d * 0.1);
      return [mix(a.p[0], b.p[0], u), 0.167 + 4 * u * (1 - u) * h, mix(a.p[2], b.p[2], u)];
    }
    let state = {};
    return { data, scale, firstX, first: targets[0].p.map((v, k) => k === 0 ? v + end2[0] : v), targets, camera: track, render(t) {
      group.visible = t >= 24.7 && t < 31.3;
      plate.material.opacity = sm(24.7, 25.6, t) * 0.83 * (1 - sm(30.2, 30.42, t));
      ball.visible = t >= targets[0].time;
      let i = 0;
      while (i + 1 < targets.length && targets[i + 1].time <= t) i++;
      const a = targets[i], b = targets[i + 1], age = t - a.time, u = b ? Math.max(0, Math.min(1, age / (b.time - a.time))) : 1, pos = b ? arc(a, b, u) : a.p;
      ball.position.fromArray(pos);
      const pulse = age >= 0 ? Math.exp(-age / 0.085) : 0;
      ball.scale.set(1 + pulse * 0.08, 1 - pulse * 0.14, 1 + pulse * 0.08);
      ball.rotation.y = t * 0.6;
      line.material.opacity = (0.68 + pulse * 0.18) * (1 - sm(30.2, 30.4, t));
      core.material.opacity = 0.04 * (1 - sm(30.2, 30.4, t));
      rims.forEach((m, j) => {
        const age2 = t - targets[j].time, flash = Math.exp(-Math.max(0, age2) / 0.14);
        m.material.opacity = age2 >= 0 && age2 < 1.2 ? (1 - age2 / 1.2) ** 1.15 * (0.45 + 0.5 * flash) : 0;
        m.material.opacity *= 1 - sm(30.2, 30.42, t);
        m.scale.setScalar(1 + 0.65 * (1 - Math.exp(-Math.max(0, age2) / 0.1)));
      });
      trail.visible = !!b && age >= 0;
      const pa = trailGeo.attributes.position.array;
      for (let j = 0; j < 60; j++) pa.set(arc(a, b || a, Math.max(0, u - 0.28) + Math.min(0.28, u) * j / 59), j * 3);
      trailGeo.attributes.position.needsUpdate = true;
      trail.material.opacity = 0.42;
      state = { target: i, note: a.pitch, position: pos, worldPosition: pos.map((v, k) => k === 0 ? v + end2[0] : v), age, time: t, source: a.file, camera: track(t) };
    }, get state() {
      return state;
    } };
  }
  function createScoreBridge(host, world) {
    const ns = "http://www.w3.org/2000/svg";
    host.innerHTML = '<div class="bridge-bg" style="position:absolute;inset:0;background:radial-gradient(ellipse at 54% 40%,#11223780,transparent 63%),#03070d"></div><svg viewBox="0 0 1440 1080" style="position:absolute;inset:0;width:100%;height:100%;overflow:hidden"></svg>';
    const svg = host.querySelector("svg"), paths = [];
    for (let i = 0; i < 4; i++) {
      const p = document.createElementNS(ns, "path");
      p.setAttribute("stroke", "#87caf7");
      p.setAttribute("stroke-width", "1.25");
      svg.appendChild(p);
      paths.push(p);
    }
    const dot = document.createElementNS(ns, "g");
    dot.setAttribute("fill", "none");
    dot.setAttribute("stroke", "#b9e5ff");
    dot.setAttribute("stroke-width", "1.1");
    for (let i = 0; i < 3; i++) {
      const c = document.createElementNS(ns, "ellipse");
      c.setAttribute("rx", String(23));
      c.setAttribute("ry", String(i === 0 ? 23 : 8));
      c.setAttribute("transform", "rotate(" + i * 60 + ")");
      dot.appendChild(c);
    }
    svg.appendChild(dot);
    function plane(i) {
      const cx = 295 + (i - 1.5) * 100 + 425, cy = 218 + (i - 1.5) * 72 + 239.0625, ry = -19 * Math.PI / 180, rx = 11 * Math.PI / 180;
      return [[-425, -239.0625], [425, -239.0625], [425, 239.0625], [-425, 239.0625]].map(([x, y]) => {
        const ax = x * Math.cos(ry), az = -x * Math.sin(ry), ay = y * Math.cos(rx) - az * Math.sin(rx), z = y * Math.sin(rx) + az * Math.cos(rx), k = 1600 / (1600 - z);
        return [cx + ax * k, cy + ay * k];
      });
    }
    return { render(t) {
      const start = 30.2, end2 = 30.9, active = t >= start && t <= end2 + 0.02;
      host.style.opacity = active ? "1" : "0";
      if (!active) return;
      const u = sm(start, end2, t), fade = sm(start, start + 0.22, t), data = world.score.data, scale = world.score.scale, firstX = world.score.firstX;
      host.firstChild.style.opacity = String(sm(start + 0.16, end2, t));
      paths.forEach((p, i) => {
        const line = data.staffLines[[0, 1, 3, 4][i]], z = (line.y - data.height / 2) * scale + 1;
        const a = world.project([world.end[0] + (line.x1 - firstX) * scale, 0.025, z]), b = world.project([world.end[0] + (line.x2 - firstX) * scale, 0.025, z]);
        const from = [a, b, b, a], target = plane(i), pts = target.map((q, j) => q.map((v, k) => mix(from[j][k], v, u)));
        p.setAttribute("d", pts.map((q, j) => (j ? "L" : "M") + q.join(",")).join(" ") + " Z");
        p.setAttribute("fill", i === 0 ? "#03070d" : "#050d15");
        p.setAttribute("fill-opacity", String(u * (i === 0 ? 1 : 0.25)));
        p.setAttribute("stroke-opacity", String(fade * 0.5));
      });
      const origin = world.project(world.score.state.worldPosition), x = mix(origin[0], 570, u), y = mix(origin[1], 349.0625, u) - Math.sin(Math.PI * u) * 60;
      dot.setAttribute("transform", `translate(${x} ${y}) scale(${mix(1, 3 / 23, u)})`);
      dot.setAttribute("opacity", String(fade));
      window.__bridgeState = { t, progress: u, ball: [x, y], targetLayerCorners: paths.map((p) => p.getAttribute("d")) };
    } };
  }
  var canvas = document.querySelector("canvas");
  var renderer = new THREE2.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  renderer.setSize(960, 720, false);
  renderer.setClearColor(330259, 1);
  var scene = new THREE2.Scene();
  var cam = new THREE2.PerspectiveCamera(42, 4 / 3, 0.1, 140);
  var end = [0, 0.17, 1];
  window.effectReady = createScore(scene, end).then((score) => {
    const w = { end, score, project(p) {
      const v = new THREE2.Vector3(...p).project(cam);
      return [720 + v.x * 720, 540 - v.y * 540];
    } };
    const host = document.getElementById("bridge"), bridge = host ? createScoreBridge(host, w) : null;
    window.drawEffect = (t) => {
      const c = cameraAt(t, end, end, score.camera(t));
      cam.position.fromArray(c.position);
      cam.lookAt(...c.target);
      cam.fov = c.fov;
      cam.setViewOffset(1440, 1080, ...c.offset, 1440, 1080);
      cam.updateProjectionMatrix();
      score.render(t);
      renderer.render(scene, cam);
      if (bridge) bridge.render(t);
      if (window.scoreSound) window.scoreSound(t);
    };
  });
})();
