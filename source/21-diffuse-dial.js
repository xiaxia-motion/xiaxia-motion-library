// 阻尼刻度 · 夏夏的AI灵感 · 来自定稿的组件绘制与运动函数
var DiffuseUI = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod2) => function __require() {
    try {
      return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
    } catch (e) {
      throw mod2 = 0, e;
    }
  };
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
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));
  var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

  // runtime:three-local
  var require_three_local = __commonJS({
    "runtime:three-local"(exports, module) {
      module.exports = globalThis.THREE;
    }
  });

  // tour.json
  var require_tour = __commonJS({
    "tour.json"(exports, module) {
      module.exports = { scenes: [{ id: 0, first: 326, last: 506 }, { id: 1, first: 560, last: 731 }, { id: 2, first: 786, last: 940 }, { id: 4, first: 1001, last: 1184 }, { id: 3, first: 1234, last: 1392 }, { id: 5, first: 1457, last: 1762 }, { id: 6, first: 1830, last: 1973 }, { id: 8, first: 2031, last: 2206 }, { id: 7, first: 2260, last: 2423 }], audio: { duration: 45.8, dial: [[0, 0], [5.433333333333334, 0], [6.416666666666667, -13.5], [6.75, -12], [7.683333333333334, 7.6], [8.066666666666666, 5.4], [8.45, 6]], press: 9.333333333333334, send: 12.183333333333334, play: 13.1, card: [17.033333333333335, 17.916666666666668, 19.15], dock: [20.683333333333334, 21.566666666666666, 22.483333333333334], digits: [24.45, 24.65, 24.833333333333332, 25.033333333333335, 25.25, 25.483333333333334], notice: 30.5, syncStart: 33.85, syncEnd: 36.45, like: 37.666666666666664, musicJoin: 41.04, musicSkip: 6.22, charged: 11.666666666666666 }, anchors: [[289, 3.39], [326, 3.6], [506, 5.5], [560, 6.38], [731, 8.22], [786, 9.15], [940, 10.33], [1001, 11.33], [1184, 13.29], [1234, 14.02], [1392, 14.94], [1457, 15.416], [1473, 15.43], [1523, 15.63], [1573, 15.82], [1623, 16.02], [1673, 16.23], [1723, 16.46], [1762, 16.53], [1830, 17.18], [1973, 17.69], [2031, 18.3], [2045, 18.43], [2173, 19.67], [2206, 19.84], [2260, 20.47], [2302, 20.58], [2423, 21.05], [2504, 21.89], [2558, 22.4], [2608, 22.95], [2748, 24.5]], grid: [2423, 2534], parting: [2570, 2620] };
    }
  });

  // display-turn.cjs
  var require_display_turn = __commonJS({
    "display-turn.cjs"(exports, module) {
      var { Vector3: Vector32, Quaternion, Matrix4, MathUtils } = require_three_local();
      var { scenes } = require_tour();
      var DEG = MathUtils.DEG2RAD;
      var up = new Vector32(0, 1, 0);
      var origin = new Vector32();
      var forward = new Vector32(0, 0, 1);
      var turns2 = [
        { kind: "左右", axis: [0, 1], entry: 39, exit: -34, front: 415 },
        { kind: "上下", axis: [1, 0], entry: -35, exit: 30, front: 648 },
        { kind: "斜向", axis: [0.59, 0.81], entry: 40, exit: -34, front: 864 },
        { kind: "左右", axis: [0, 1], entry: 48, exit: -44, front: 1092 },
        { kind: "斜向", axis: [-0.64, 0.77], entry: -32, exit: 34, front: 1313 },
        { kind: "上下", axis: [1, 0], entry: 29, exit: -26, front: 1609 },
        { kind: "斜向", axis: [0.81, 0.59], entry: -39, exit: 33, front: 1901 },
        { kind: "上下", axis: [1, 0], entry: -39, exit: 37, front: 2118 },
        { kind: "左右", axis: [0, 1], entry: -31, exit: 34, front: 2338 }
      ];
      var views = [[-0.1, 0.14, 433, 0.8], [0.36, 0.21, 386, -1.5], [-0.19, 0.11, 390, 1.4], [-0.22, 0.17, 477, -1.2], [0.23, 0.25, 375, 1.55], [-0.13, 0.27, 381, -1.2], [0.23, 0.25, 385, 0.6], [-0.14, 0.15, 397, -1.1], [0.17, 0.12, 361, 0.5]];
      function framing(i, k) {
        const [ax, ay, d, roll] = views[i], sway = Math.sin(Math.PI * k);
        return {
          offset: new Vector32(ax + 0.1 * (k - 0.5), ay + 0.045 * sway, 1).normalize().multiplyScalar(d - 13 * sway),
          aimShift: new Vector32(2 * sway, i === 3 ? 8 : i === 2 ? 6 : -4, 0),
          roll: roll * DEG
        };
      }
      function angleAt2(i, f) {
        const s = scenes[i], p = turns2[i];
        const start = f <= p.front, from = start ? s.first : p.front, to = start ? p.front : s.last;
        const a = start ? p.entry : 0, b = start ? 0 : p.exit, d = to - from;
        const x = Math.min(1, Math.max(0, (f - from) / d)), x2 = x * x, x3 = x2 * x;
        const through = (p.exit - p.entry) / (s.last - s.first) * (i === 5 ? 0.7 : 0.87);
        return (2 * x3 - 3 * x2 + 1) * a + (-2 * x3 + 3 * x2) * b + (x3 - 2 * x2 + x) * d * (start ? 0 : through) + (x3 - x2) * d * (start ? through : 0);
      }
      function facing(i, k) {
        const { offset, aimShift, roll } = framing(i, k);
        const basis = new Matrix4().lookAt(offset.add(aimShift), origin, up);
        return new Quaternion().setFromRotationMatrix(basis).multiply(new Quaternion().setFromAxisAngle(forward, roll));
      }
      function orientation(i, f, k, edgeTilt) {
        const p = turns2[i], angle = angleAt2(i, f), axis = new Vector32(...p.axis, 0).normalize();
        const base = facing(i, k).multiply(new Quaternion().setFromAxisAngle(axis, angle * DEG));
        return base.multiply(new Quaternion().setFromAxisAngle(forward, edgeTilt * DEG * Math.min(1, Math.abs(angle) / 16)));
      }
      module.exports = { turns: turns2, framing, angleAt: angleAt2, facing, orientation };
    }
  });

  // route.cjs
  var require_route = __commonJS({
    "route.cjs"(exports, module) {
      var THREE = require_three_local();
      var tour2 = require_tour();
      var { Vector3: Vector32 } = THREE;
      var { orientation } = require_display_turn();
      var TAU = Math.PI * 2;
      var DEG = Math.PI / 180;
      var radius = 2.7;
      var cap = (x) => Math.max(0, Math.min(1, x));
      var mix2 = (a, b, p) => a + (b - a) * p;
      var smooth2 = (v) => {
        const x = cap(v);
        return x * x * (3 - 2 * x);
      };
      var ramp = (f, a, b) => smooth2((f - a) / (b - a));
      var unit = (a) => new Vector32(...a);
      var syncAngle = -2.12;
      var landmarks = [
        [0, 0, 0],
        [418, 44, -214],
        [820, -34, -529],
        [1220, 66, -701],
        [1610, -6, -600],
        [2035, -48, -895],
        [2450, 62, -1181],
        [2840, 32, -1498],
        [3250, -33, -1692]
      ];
      var scenes = tour2.scenes;
      function phase(i, f) {
        const s = scenes[i];
        return cap((f - s.first) / (s.last - s.first));
      }
      function gainAt(f) {
        const keys = tour2.audio.dial;
        for (let i = 1; i < keys.length; i++) {
          const [a, u] = keys[i - 1], [b, v] = keys[i];
          if (f <= b * 60) return mix2(u, v, ramp(f, a * 60, b * 60));
        }
        return keys.at(-1)[1];
      }
      function ringProgress(f) {
        const span = scenes[7].last - scenes[7].first;
        if (f < scenes[7].first) return 0;
        const x = cap((f - scenes[7].first + 0.5) / (span - 19));
        return 0.74 * x + 0.26 * (1 - Math.exp(-3.6 * x)) / (1 - Math.exp(-3.6));
      }
      function damp(f, start, period = 23, decay = 14) {
        const t = f - start;
        return t < 0 ? 0 : Math.sin(TAU * t / period) * Math.exp(-t / decay);
      }
      function recoil(i, f) {
        const end = scenes[i].last;
        return ramp(f, end - 25, end - 9) * (1 - ramp(f, end - 9, end + 2));
      }
      function station2(i, f) {
        const [x, y, z] = landmarks[i], s = scenes[i], k = phase(i, f);
        const hit = damp(f, s.first), spring = damp(f, s.last, 19, 10), load = recoil(i, f);
        let dy = 0, sx = 1, sy = 1, edgeTilt = 0;
        if (i === 0) edgeTilt = 2 * load;
        if (i === 1) {
          dy = -5 * hit - 5 * load + 6 * spring;
          sy = 1 - 0.17 * load + 0.052 * spring;
          sx = 1 - 0.055 * load;
        }
        if (i === 2) edgeTilt = 2 * hit + 3 * load - 3 * spring;
        if (i === 3) edgeTilt = 8 * load - 4 * spring;
        if (i === 4) {
          dy = -3 * hit;
          edgeTilt = 3 * load - 3 * spring;
        }
        if (i === 5) edgeTilt = 2 * load;
        if (i === 6) {
          dy = 4 * spring - 5 * load;
          edgeTilt = 4 * load - 3 * spring;
        }
        if (i === 8) {
          dy = -2.5 * hit;
          edgeTilt = 2 * hit;
        }
        return { pos: new Vector32(x, y + dy, z), quat: orientation(i, f, k, edgeTilt), scale: new Vector32(sx, sy, 1) };
      }
      function rimPoint(w, h, r, u) {
        r = Math.min(r, w / 2, h / 2);
        const dx = w - 2 * r, dy = h - 2 * r, arc = Math.PI * r / 2, hw = w / 2, hh = h / 2;
        let d = (u % 1 + 1) % 1 * (2 * dx + 2 * dy + 4 * arc);
        if (d < dx) return [-hw + r + d, -hh];
        d -= dx;
        const turn = (cx, cy, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
        if (d < arc) return turn(hw - r, -hh + r, -Math.PI / 2 + d / r);
        d -= arc;
        if (d < dy) return [hw, -hh + r + d];
        d -= dy;
        if (d < arc) return turn(hw - r, hh - r, d / r);
        d -= arc;
        if (d < dx) return [hw - r - d, hh];
        d -= dx;
        if (d < arc) return turn(-hw + r, hh - r, Math.PI / 2 + d / r);
        d -= arc;
        if (d < dy) return [-hw, hh - r - d];
        d -= dy;
        return turn(-hw + r, -hh + r, Math.PI + d / r);
      }
      var digitFrames = tour2.audio.digits.map((t) => Math.round(t * 60));
      var codeFrame = { width: 255, height: 46, radius: 10 };
      var codePerimeter = 2 * (codeFrame.width + codeFrame.height - 4 * codeFrame.radius) + TAU * codeFrame.radius;
      var codeStartDistance = 110 + codeFrame.width / 2 - codeFrame.radius;
      function codeLap(f) {
        return cap((f - digitFrames[5]) / (scenes[5].last - digitFrames[5]));
      }
      function tabAt(f) {
        return tour2.audio.dock.reduce((p, t) => p + ramp(f, t * 60, t * 60 + 20), 0);
      }
      function tabBounds(f) {
        let left = -110, right = -70;
        for (const time of tour2.audio.dock) {
          const start = time * 60;
          right += 45 * ramp(f, start, start + 14) + 2.2 * damp(f, start + 14, 13, 4);
          left += 45 * ramp(f, start + 5, start + 23);
        }
        return { left, right };
      }
      function noticeAt(f) {
        return ramp(f, scenes[6].first, scenes[6].first + 25);
      }
      function pressAt(f) {
        return ramp(f, 559, 569) * (1 - ramp(f, 731, 746));
      }
      var noticeFrames = [scenes[6].first, scenes[6].first + 60, scenes[6].first + 113];
      function topCardLift(f) {
        const enter = noticeFrames.slice(1).reduce((shift, start) => shift - 4.2 * Math.sin(Math.PI * cap((f - start) / 19)), 0);
        return -7 * noticeAt(f) - 7 * recoil(6, f) + 4 * damp(f, 1973, 21, 11) + enter;
      }
      function rail(i, f) {
        const k = phase(i, f), s = scenes[i];
        let p;
        if (i === 0) {
          const a = 0.74 * Math.PI + 1.52 * Math.PI * cap((gainAt(f) + 18) / 30);
          p = [115 * Math.cos(a), 115 * Math.sin(a)];
        } else if (i === 1) {
          p = rimPoint(247, 70, 35, 1.294 * (0.86 * k + 0.14 * smooth2(k)));
          const press = pressAt(f);
          p = [p[0] * (1 - 0.032 * press), p[1] * (1 - 0.1 * press)];
        } else if (i === 2) {
          p = rimPoint(247, 174, 24, 0.02 + 1.218 * (0.83 * k + 0.17 * smooth2(k)));
        } else if (i === 3) {
          p = rimPoint(183, 244, 19, 0.021 + 1.165 * (0.81 * k + 0.19 * smooth2(k)));
        } else if (i === 4) {
          const last = ramp(f, s.last - 25, s.last);
          p = [tabBounds(f).left + 10 + 77 * last, -20.5 - 10 * last];
        } else if (i === 5) {
          if (f >= digitFrames[5]) {
            p = rimPoint(codeFrame.width, codeFrame.height, codeFrame.radius, codeStartDistance / codePerimeter + codeLap(f));
          } else {
            let x = -110, h = 0;
            for (let j = 0; j < 5; j++) {
              const step = cap((f - digitFrames[j]) / (digitFrames[j + 1] - digitFrames[j]));
              x += 44 * step;
              h += 4 * 5.2 * step * (1 - step);
            }
            p = [x, -23 - h];
          }
        } else if (i === 6) {
          p = rimPoint(237, 57, 15, 0.018 + 1.316 * (0.78 * k + 0.22 * smooth2(k)));
          p[1] += topCardLift(f);
        } else if (i === 7) {
          const a = syncAngle + TAU * ringProgress(f) + 0.99 * ramp(f, s.last - 20, s.last);
          p = [86 * Math.cos(a), 86 * Math.sin(a)];
        } else {
          p = [-67, -12];
        }
        return new Vector32(p[0], -p[1], 3.7);
      }
      function worldRail(i, f) {
        const s = station2(i, f);
        return rail(i, f).multiply(s.scale).applyQuaternion(s.quat).add(s.pos);
      }
      function supportNormal(i, f) {
        const local = i === 7 ? [Math.cos(syncAngle), -Math.sin(syncAngle), 0] : i === 8 ? [-0.27, 0.962, 0.025] : [0, 1, 0];
        return unit(local).normalize().applyQuaternion(station2(i, f).quat);
      }
      module.exports = { scenes, landmarks, TAU, DEG, cap, mix: mix2, smooth: smooth2, ramp, unit, radius, phase, gainAt, ringProgress, syncAngle, damp, recoil, station: station2, rimPoint, rail, worldRail, supportNormal, codeFrame, codeLap, digitFrames, tabAt, tabBounds, noticeAt, noticeFrames, pressAt, topCardLift };
    }
  });

  // flights.json
  var require_flights = __commonJS({
    "flights.json"(exports, module) {
      module.exports = { fps: 60, step: 0.004166666666666667, flights: [{ from: 506, to: 560, gravity: 765, launch: [265.33643, 398.33031, -309.23412], hit: { frame: 560, subframe: 560, at: [327.57448, 73.26474, -209.89375], incoming: [265.33643, -290.16969, -309.23412], normal: [-0.19163, 0.69741, -0.69058] }, samples: [[88.77169, 26.02683, 68.41696], [93.19397, 32.53286, 63.26306], [97.61624, 38.82639, 58.10915], [102.03852, 44.90741, 52.95525], [106.46079, 50.77594, 47.80135], [110.88306, 56.43196, 42.64745], [115.30534, 61.87549, 37.49355], [119.72761, 67.10652, 32.33964], [124.14988, 72.12504, 27.18574], [128.57216, 76.93107, 22.03184], [132.99443, 81.52459, 16.87794], [137.41671, 85.90562, 11.72404], [141.83898, 90.07415, 6.57013], [146.26125, 94.03017, 1.41623], [150.68353, 97.7737, -3.73767], [155.1058, 101.30472, -8.89157], [159.52808, 104.62325, -14.04547], [163.95035, 107.72928, -19.19938], [168.37262, 110.6228, -24.35328], [172.7949, 113.30383, -29.50718], [177.21717, 115.77236, -34.66108], [181.63944, 118.02838, -39.81498], [186.06172, 120.07191, -44.96889], [190.48399, 121.90293, -50.12279], [194.90627, 123.52146, -55.27669], [199.32854, 124.92749, -60.43059], [203.75081, 126.12101, -65.58449], [208.17309, 127.10204, -70.7384], [212.59536, 127.87056, -75.8923], [217.01764, 128.42659, -81.0462], [221.43991, 128.77012, -86.2001], [225.86218, 128.90114, -91.354], [230.28446, 128.81967, -96.50791], [234.70673, 128.52569, -101.66181], [239.12901, 128.01922, -106.81571], [243.55128, 127.30025, -111.96961], [247.97355, 126.36877, -117.12351], [252.39583, 125.2248, -122.27742], [256.8181, 123.86832, -127.43132], [261.24037, 122.29935, -132.58522], [265.66265, 120.51788, -137.73912], [270.08492, 118.5239, -142.89303], [274.5072, 116.31743, -148.04693], [278.92947, 113.89845, -153.20083], [283.35174, 111.26698, -158.35473], [287.77402, 108.42301, -163.50863], [292.19629, 105.36653, -168.66254], [296.61857, 102.09756, -173.81644], [301.04084, 98.61608, -178.97034], [305.46311, 94.92211, -184.12424], [309.88539, 91.01564, -189.27814], [314.30766, 86.89666, -194.43205], [318.72993, 82.56519, -199.58595], [323.15221, 78.02121, -204.73985], [327.57448, 73.26474, -209.89375]] }, { from: 731, to: 786, hit: { frame: 786 }, samples: [] }, { from: 940, to: 1001, hit: { frame: 1001 }, samples: [] }, { from: 1184, to: 1234, hit: { frame: 1234 }, samples: [] }, { from: 1392, to: 1457, hit: { frame: 1457 }, samples: [] }, { from: 1762, to: 1830, hit: { frame: 1830 }, samples: [] }, { from: 1973, to: 2031, hit: { frame: 2031 }, samples: [] }, { from: 2206, to: 2260, hit: { frame: 2260 }, samples: [] }] };
    }
  });

  // voyage.cjs
  var require_voyage = __commonJS({
    "voyage.cjs"(exports, module) {
      var THREE = require_three_local();
      var R4 = require_route();
      var tour2 = require_tour();
      var { framing } = require_display_turn();
      var { flights } = require_flights();
      var { Vector3: Vector32, PerspectiveCamera } = THREE;
      var { mix: mix2, cap, ramp, station: station2, worldRail, unit, phase } = R4;
      var flat2 = [[270, 195, 1.26], [720, 195, 1.36], [1170, 195, 1.22], [270, 540, 1.32], [720, 540, 1.07], [1170, 540, 1.28], [270, 866, 1.32], [1170, 866, 1.28], [720, 866, 1.25]];
      var parted = [[164, 196, 1.13], [718, 168, 1.18], [1250, 184, 1.15], [420, 305, 1.04], [507, 819, 1.08], [997, 309, 1.04], [191, 817, 1.2], [1239, 797, 1.23], [872, 853, 1.15]];
      var wallAt = (f) => {
        const grid = ramp(f, ...tour2.grid), push = ramp(f, ...tour2.parting);
        return { grid, push, displace: push + 0.016 * R4.damp(f, tour2.parting[1], 28, 11) };
      };
      function legAt(f) {
        return flights.findIndex((b) => b.from < f && f < b.to);
      }
      function atIndex(f) {
        const n = R4.scenes.findIndex((s, i) => i < 8 && f < (s.last + R4.scenes[i + 1].first) / 2);
        return n < 0 ? 8 : n;
      }
      function ballAt(f) {
        const i = legAt(f);
        if (i < 0) return worldRail(atIndex(f), f);
        const leg = flights[i], n = f - leg.from, j = Math.floor(n), a = unit(leg.samples[j]), b = unit(leg.samples[Math.min(j + 1, leg.samples.length - 1)]);
        return a.lerp(b, n - j);
      }
      function baseRig(i, f) {
        const s = station2(i, f), { aimShift, offset, roll } = framing(i, phase(i, f));
        return { aim: s.pos.clone().add(aimShift), offset, roll };
      }
      function cameraAt(f) {
        const w = wallAt(f), j = legAt(f);
        let { aim, offset, roll } = baseRig(j < 0 ? atIndex(f) : j, f);
        if (j >= 0) {
          const leg = flights[j], k = cap((f - leg.from) / (leg.to - leg.from)), v = R4.smooth(k), a = baseRig(j, leg.from), b = baseRig(j + 1, leg.to);
          const mid = Math.sin(Math.PI * k) ** 2;
          aim = a.aim.lerp(b.aim, v).lerp(ballAt(f), mid * 0.74);
          aim.y += 28 * Math.sin(Math.PI * k) ** 1.15;
          offset = a.offset.lerp(b.offset, v);
          offset.z += mid * (95 + j % 3 * 18);
          offset.y += mid * 22;
          roll = mix2(a.roll, b.roll, v) + R4.DEG * (j % 2 ? -1.9 : 2.3) * mid;
        }
        const unfold = ramp(f, ...tour2.grid);
        const center = new Vector32(1620, 0, -815);
        aim.lerp(center, unfold);
        offset.lerp(new Vector32(0, 0, 1330), unfold);
        roll *= 1 - unfold;
        const height = mix2(730, 1080, w.grid), camera = new PerspectiveCamera(40, 1440 / height, 2, 12500);
        camera.position.copy(aim).add(offset);
        camera.lookAt(aim);
        camera.rotateZ(roll);
        camera.updateMatrixWorld();
        return { camera, height, aim };
      }
      function stagePose(i, f, rig) {
        const a = station2(i, f), w = wallAt(f);
        if (w.grid <= 0) return a;
        const id = R4.scenes[i].id;
        const [x, y, sc] = flat2[id].map((v, n) => mix2(v, parted[id][n], w.displace));
        const dist = 1330, units = 2 * dist * Math.tan(20 * R4.DEG) / rig.height;
        const dest = new Vector32((x - 720) * units, (rig.height / 2 - y) * units, -dist).applyMatrix4(rig.camera.matrixWorld);
        const k = ramp(f, tour2.grid[0] + 12, tour2.grid[1]);
        a.pos.lerp(dest, k);
        a.quat.slerp(rig.camera.quaternion, k);
        a.scale.lerp(new Vector32(sc * units, sc * units, sc * units), k);
        return a;
      }
      function project(point, rig) {
        const v = point.clone().project(rig.camera);
        return [(v.x + 1) * 720, (1 - v.y) * rig.height / 2, v.z];
      }
      var heartContact = flights[7].hit.frame;
      var lightVisible = (f) => f <= heartContact;
      function displayedBall(f, rig) {
        if (f <= tour2.grid[0]) return ballAt(f);
        const s = stagePose(8, f, rig);
        return R4.rail(8, f).multiply(s.scale).applyQuaternion(s.quat).add(s.pos);
      }
      module.exports = { heartContact, lightVisible, flat: flat2, parted, flights, legAt, atIndex, wallAt, ballAt, cameraAt, stagePose, project, displayedBall };
    }
  });

  // stage.js
  var stage_exports = {};
  __export(stage_exports, {
    config: () => config,
    create: () => create,
    drawFace: () => drawFace,
    drawLive: () => drawLive,
    phaseAt: () => phaseAt,
    pointOnRim: () => pointOnRim,
    stateAt: () => stateAt
  });
  var T2 = __toESM(require_three_local());
  var import_route3 = __toESM(require_route());
  var import_voyage3 = __toESM(require_voyage());

  // face.js
  var tau = Math.PI * 2;
  var sans = '"Helvetica Neue","Hiragino Sans GB",Arial,sans-serif';
  var mono = 'Menlo,"SFMono-Regular",monospace';
  var clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  var mix = (a, b, k) => a + (b - a) * k;
  var smooth = (x) => {
    x = clamp(x);
    return x * x * (3 - 2 * x);
  };
  var ease = (t, a, b) => smooth((t - a) / (b - a));
  var mod = (x, m) => (x % m + m) % m;
  var palette = [
    [255, 191, 113],
    [255, 103, 146],
    [172, 112, 252],
    [95, 148, 255],
    [108, 235, 246],
    [249, 230, 174],
    [255, 191, 113]
  ];
  var rgb = (v, a = 1) => "rgba(" + v[0] + "," + v[1] + "," + v[2] + "," + clamp(a) + ")";
  function color(u) {
    const p = mod(u, 1) * 6, i = Math.floor(p), q = smooth(p - i);
    return palette[i].map((a, k) => Math.round(mix(a, palette[i + 1][k], q)));
  }
  function line(c, points, style, w = 1) {
    c.beginPath();
    points.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y));
    c.strokeStyle = style;
    c.lineWidth = w;
    c.stroke();
  }
  function dot(c, x, y, r, fill) {
    if (r <= 0) return;
    c.beginPath();
    c.arc(x, y, r, 0, tau);
    c.fillStyle = fill;
    c.fill();
  }
  function label(c, str, x, y, size, options = {}) {
    const { weight = 400, fill = "#f1f1f3", align = "left", family = sans, track = 0 } = options;
    c.save();
    c.font = weight + " " + size + "px " + family;
    c.fillStyle = fill;
    c.textAlign = align;
    c.textBaseline = "middle";
    if (track) c.letterSpacing = track + "px";
    c.fillText(str, x, y);
    c.restore();
  }
  function haze(c, x, y, rx, ry, col, a) {
    if (a <= 2e-3 || rx <= 0 || ry <= 0) return;
    c.save();
    c.translate(x, y);
    c.scale(rx, ry);
    const g = c.createRadialGradient(0, 0, 0, 0, 0, 1);
    g.addColorStop(0, rgb(col, a));
    g.addColorStop(0.25, rgb(col, a * 0.61));
    g.addColorStop(0.61, rgb(col, a * 0.16));
    g.addColorStop(1, rgb(col, 0));
    c.fillStyle = g;
    c.fillRect(-1, -1, 2, 2);
    c.restore();
  }
  function spark(c, x, y, col, strength = 1, radius = 14) {
    if (strength <= 0.01) return;
    c.save();
    c.globalCompositeOperation = "screen";
    haze(c, x, y, radius * 2.1, radius * 1.65, col, 0.25 * strength);
    haze(c, x, y, radius * 0.72, radius * 0.72, col, 0.85 * strength);
    haze(c, x, y, radius * 1.55, 1.45, col, 0.65 * strength);
    dot(c, x, y, Math.max(0.4, radius * 0.105), rgb([255, 254, 249], strength));
    c.restore();
  }
  function spectrum(c, x, y, angle, alpha) {
    const g = c.createConicGradient(angle, x, y);
    for (let j = 0; j <= 12; j++) g.addColorStop(j / 12, rgb(color(j / 12), alpha));
    return g;
  }
  function ringArc(c, x, y, r, a, b, col, w = 1) {
    if (b - a < 1e-4) return;
    c.beginPath();
    c.arc(x, y, r, a, b);
    c.strokeStyle = col;
    c.lineWidth = w;
    c.stroke();
  }
  function dial(c, s) {
    const v = s.gain, a0 = 0.74 * Math.PI, span = 1.52 * Math.PI, pos = clamp((v + 18) / 30), ang = a0 + span * pos, r = 88;
    const body = c.createRadialGradient(-24, -52, 0, 0, 0, 95);
    body.addColorStop(0, "#252529");
    body.addColorStop(0.52, "#17171b");
    body.addColorStop(1, "#0a0a0d");
    dot(c, 0, 0, r, body);
    ringArc(c, 0, 0, r, 0, tau, "#33323b", 0.8);
    for (let i = 0; i <= 42; i++) {
      const a = a0 + span * i / 42, light = clamp(1 + (pos - i / 42) * 42), len = i % 3 === 0 ? 9.3 : 7;
      const co = color(0.98 + 0.76 * i / 42);
      line(
        c,
        [[(114 - len) * Math.cos(a), (114 - len) * Math.sin(a)], [114 * Math.cos(a), 114 * Math.sin(a)]],
        rgb(co, 0.09 + 0.83 * light),
        i % 3 === 0 ? 1.75 : 1.38
      );
    }
    const rim = spectrum(c, 0, 0, a0, 0.7), nx = (r - 16) * Math.cos(ang), ny = (r - 16) * Math.sin(ang);
    ringArc(c, 0, 0, r, a0, ang, rim, 1.35);
    ringArc(c, 0, 0, r - 0.7, a0, ang, spectrum(c, 0, 0, a0, 0.18), 3.6);
    haze(c, nx, ny, 10, 10, [255, 242, 227], 0.48);
    dot(c, nx, ny, 3.25, "#fffdf5");
    label(c, "GAIN", 0, -28, 8.5, { align: "center", family: mono, track: 2, fill: "#aeabb6" });
    label(c, (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v).toFixed(1), 0, 2, 39, { align: "center", weight: 350, fill: "#faf9f8" });
    label(c, "dB", 0, 31, 10, { align: "center", family: mono, fill: "#a8a4ae" });
  }
  function draw(c, index, state2) {
    c.save();
    c.lineCap = "round";
    c.lineJoin = "round";
    dial(c, state2);
    c.restore();
  }

  // surface.js
  var T = __toESM(require_three_local());
  var import_tour = __toESM(require_tour());
  var import_route = __toESM(require_route());
  var import_voyage = __toESM(require_voyage());
  var import_display_turn = __toESM(require_display_turn());

  // first-cues.json
  var first_cues_default = {
    duration: 22.5,
    dial: [
      [
        0,
        0
      ],
      [
        3.6,
        0
      ],
      [
        4.22,
        -13.5
      ],
      [
        4.43,
        -12
      ],
      [
        5.03,
        7.6
      ],
      [
        5.27,
        5.4
      ],
      [
        5.51,
        6
      ]
    ],
    press: 6.5,
    send: 8.12,
    play: 9.22,
    card: 11.4,
    dock: [
      14.06,
      14.37,
      14.69
    ],
    digits: [
      15.43,
      15.63,
      15.82,
      16.02,
      16.23,
      16.46
    ],
    notice: 17.25,
    like: 18.3,
    syncStart: 19.03,
    syncEnd: 20.52
  };

  // initial.js
  function knots(t, points) {
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1], b = points[i];
      if (t <= b[0]) return mix(a[1], b[1], ease(t, a[0], b[0]));
    }
    return points.at(-1)[1];
  }
  function state(t) {
    let tab = 0;
    first_cues_default.dock.forEach((a) => {
      tab += ease(t, a, a + 0.23);
    });
    const code = first_cues_default.digits.filter((st) => t >= st).length;
    const env = ease(t, 10.75, 11.5) * (1 - ease(t, 13.03, 14.08));
    const tilt = 0.13 * Math.sin(t * 0.75) + env * (0.91 * Math.sin((t - 11.09) * 2.55) + 0.23 * Math.sin((t - 11.27) * 4.6));
    return {
      t,
      energy: 0.69,
      gain: knots(t, first_cues_default.dial),
      charge: ease(t, first_cues_default.press, first_cues_default.send),
      sent: t >= first_cues_default.send,
      press: ease(t, first_cues_default.press - 0.12, first_cues_default.press + 0.09) * (1 - ease(t, first_cues_default.send, first_cues_default.send + 0.25)),
      play: t >= first_cues_default.play,
      track: clamp((t - first_cues_default.play) / 15),
      tab,
      tilt,
      code,
      notice: ease(t, first_cues_default.notice, first_cues_default.notice + 0.3),
      like: t >= first_cues_default.like ? 1 : 0,
      likeAge: t - first_cues_default.like,
      sync: ease(t, first_cues_default.syncStart, first_cues_default.syncEnd)
    };
  }

  // surface.js
  var ratio = 8 / 3;
  var faceSize = 392;
  var texScale = 2.5;
  var geometry = [
    [176, 176, 88, 12],
    [246, 69, 34.5, 9],
    [246, 173, 24, 10],
    [182, 243, 19, 7],
    [245, 60, 23, 8],
    [34, 45, 9, 5],
    [236, 56, 15, 7],
    [177, 177, 88.5, 10],
    [209, 70, 35, 9]
  ];
  var baseColors = [7640232, 11635615, 9349308, 11836591, 11180477, 8558494, 9275039, 9152936, 11967406];
  function phaseAt(f) {
    const a = import_tour.default.anchors;
    for (let j = 1; j < a.length; j++) if (f <= a[j][0]) return import_route.default.mix(a[j - 1][1], a[j][1], import_route.default.cap((f - a[j - 1][0]) / (a[j][0] - a[j - 1][0])));
    return a.at(-1)[1];
  }
  function stateAt(f) {
    const s = state(phaseAt(f)), b = import_route.default.scenes, hit = import_voyage.default.flights[7].hit.frame, start = import_voyage.default.flights[6].hit.frame;
    const switchTrack = b[2].last - 33, collect = import_display_turn.turns[3].front;
    const noticeTimes = import_route.default.noticeFrames;
    const noticeIndex = noticeTimes.filter((cue) => f >= cue).length;
    const lastDigit = import_route.default.digitFrames.findLast((cue) => cue <= f);
    return {
      ...s,
      t: phaseAt(f),
      spatial: true,
      gain: import_route.default.gainAt(f),
      charge: import_route.default.ramp(f, b[1].first, import_tour.default.audio.charged * 60),
      press: import_route.default.pressAt(f),
      sent: f >= b[1].last,
      trackMix: import_route.default.ramp(f, switchTrack, switchTrack + 12),
      playerSeconds: f < switchTrack ? 28 + Math.floor(6 * import_route.default.cap((f - b[2].first) / (switchTrack - b[2].first))) : Math.max(0, Math.floor((Math.min(f, b[2].last + 45) - switchTrack) / 30)),
      foilTurn: (0, import_display_turn.angleAt)(3, f) / 48,
      collected: import_route.default.ramp(f, collect, collect + 12),
      tabBounds: import_route.default.tabBounds(f),
      digitTravel: lastDigit === void 0 ? 1 : import_route.default.ramp(f, lastDigit, lastDigit + 7),
      noticeIndex,
      noticeMix: noticeIndex ? import_route.default.ramp(f, noticeTimes[noticeIndex - 1], noticeTimes[noticeIndex - 1] + 19) : 1,
      play: f >= b[2].first,
      beatLift: import_route.default.recoil(2, f),
      track: import_route.default.cap((f - b[2].first) / 380),
      tab: import_route.default.tabAt(f),
      notice: import_route.default.noticeAt(f),
      topLift: import_route.default.topCardLift(f),
      code: import_route.default.digitFrames.filter((t) => t <= f).length,
      codeSeal: import_route.default.ramp(f, import_route.default.digitFrames[5] - 1, import_route.default.digitFrames[5] + 11),
      codeFrame: import_route.default.codeFrame,
      sync: f < start ? 0 : import_route.default.ringProgress(f),
      syncAngle: import_route.default.syncAngle,
      like: f >= hit ? 1 : 0,
      likeAge: (f - hit) / 60
    };
  }
  function roundedShape(w, h, r) {
    const s = new T.Shape(), x = -w / 2, y = -h / 2;
    if (Math.abs(w - h) < 0.01 && r >= w / 2 - 0.2) {
      s.absarc(0, 0, w / 2, 0, Math.PI * 2, false);
      return s;
    }
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h);
    s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r);
    s.quadraticCurveTo(x, y, x + r, y);
    return s;
  }
  function rimGeometry(w, h, r, d) {
    const s = roundedShape(w - 1.5, h - 1.5, Math.max(1, r - 0.8));
    const g = new T.ExtrudeGeometry(s, { depth: d, bevelEnabled: true, bevelSize: 0.85, bevelThickness: 0.8, bevelSegments: 3, curveSegments: 16, steps: 1 });
    g.translate(0, 0, -d - 1.7);
    return g;
  }
  function makeObject(i) {
    const group = new T.Group(), metal = new T.MeshStandardMaterial({ color: baseColors[i], roughness: 0.31, metalness: 0.58 });
    const [w, h, r, d] = geometry[i], shell = new T.Group(), block = rimGeometry(w, h, r, d);
    for (let j = 0; j < (i === 5 ? 6 : 1); j++) {
      const m = new T.Mesh(block, metal);
      if (i === 5) m.position.x = (j - 2.5) * 44;
      shell.add(m);
      const edge = roundedShape(w - 1.4, h - 1.4, r - 0.7).getPoints(70).map((v) => new T.Vector3(v.x, v.y, -d + 0.1));
      const line2 = new T.LineLoop(new T.BufferGeometry().setFromPoints(edge), new T.LineBasicMaterial({ color: baseColors[i], transparent: true, opacity: 0.51 }));
      line2.position.x = m.position.x;
      shell.add(line2);
    }
    group.add(shell);
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = Math.round(faceSize * texScale);
    const ctx = canvas.getContext("2d", { alpha: true }), texture = new T.CanvasTexture(canvas);
    texture.colorSpace = T.SRGBColorSpace;
    texture.minFilter = T.LinearFilter;
    texture.generateMipmaps = false;
    const mat = new T.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, side: T.FrontSide, toneMapped: false });
    const face = new T.Mesh(new T.PlaneGeometry(faceSize, faceSize), mat);
    face.position.z = 0.06;
    group.add(face);
    return { group, shell, ctx, texture, canvas, paintKey: null };
  }
  function paint(o, i, f, active) {
    const s = import_route.default.scenes[i], focus = f > s.first - 20 && f < s.last + 25;
    const t = active || focus ? f : f < s.first ? s.first - 26 : s.last + 48;
    if (o.paintKey === t) return;
    o.paintKey = t;
    const st = stateAt(t), ctx = o.ctx, n = o.canvas.width, scale = n / faceSize;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, n, n);
    ctx.setTransform(scale, 0, 0, scale, n / 2, n / 2);
    if (f >= s.first && f <= s.last && i < 8) {
      const p = import_route.default.rail(i, f);
      st.contact = { x: p.x, y: -p.y, hue: 0.53 + 0.066 * f / 60 };
      if (i === 1) {
        st.contact.x /= 1 - 0.032 * st.press;
        st.contact.y /= 1 - 0.1 * st.press;
      }
    }
    draw(ctx, s.id, st);
    if (f >= s.first && f <= s.last && i !== 8) {
      const p = import_route.default.rail(i, f), col = color(0.61 + phaseAt(f) * 0.105);
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      haze(ctx, p.x, -p.y, 18, 11, col, 0.24);
      ctx.restore();
    }
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "destination-in";
    for (const dir of [0, 1]) {
      const gradient = ctx.createLinearGradient(0, 0, dir ? 0 : n, dir ? n : 0);
      for (const [u, a] of [[0, 0], [0.035, 0.14], [0.09, 0.66], [0.15, 1], [0.85, 1], [0.91, 0.66], [0.965, 0.14], [1, 0]]) gradient.addColorStop(u, "rgba(255,255,255," + a + ")");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, n, n);
    }
    ctx.restore();
    if (i === 1) o.shell.scale.set(1 - 0.032 * st.press, 1 - 0.1 * st.press, 1);
    if (i === 6) o.shell.position.y = -st.topLift;
    o.texture.needsUpdate = true;
  }

  // trail.js
  var import_voyage2 = __toESM(require_voyage());
  var import_route2 = __toESM(require_route());
  function spectrumTrail(c, f, rig, w) {
    if (!import_voyage2.default.lightVisible(f)) return;
    const visibility = import_route2.default.ramp(f, 292, 315);
    if (visibility < 1e-3) return;
    const leg = import_voyage2.default.legAt(f), station2 = import_voyage2.default.atIndex(f), s = import_route2.default.scenes[station2];
    const history = leg >= 0 ? 10.5 : 15, points = [], layers = 18;
    const pose = leg < 0 ? import_voyage2.default.stagePose(station2, f, rig) : null;
    for (let j = 0; j <= layers; j++) {
      const t = f - history * (1 - j / layers);
      const world = pose && t >= s.first && t <= s.last ? import_route2.default.rail(station2, t).multiply(pose.scale).applyQuaternion(pose.quat).add(pose.pos) : import_voyage2.default.displayedBall(t, rig);
      points.push(import_voyage2.default.project(world, rig).slice(0, 2));
    }
    const p = points.at(-1), hue = 0.53 + 0.066 * f / 60, col = color(hue);
    c.save();
    c.globalCompositeOperation = "screen";
    c.globalAlpha = visibility;
    c.lineCap = "round";
    c.lineJoin = "round";
    for (let j = 1; j <= layers; j++) {
      const v = j / layers, prev = points[j - 1], next = points[j];
      if (Math.hypot(next[0] - prev[0], next[1] - prev[1]) < 0.01) continue;
      const edge = color(hue - 0.3 * (1 - v)), white = edge.map((ch) => Math.round(ch + (253 - ch) * v * v * 0.86));
      line(c, [prev, next], rgb(edge, 0.14 * v * v), 2 + 8 * v);
      line(c, [prev, next], rgb(edge, 0.4 * v ** 1.5), 1.1 + 3 * v);
      line(c, [prev, next], rgb(white, 0.92 * v ** 1.25), 0.55 + 1.12 * v);
    }
    spark(c, p[0], p[1], col, 0.98, (leg < 0 ? 21 : 26) * (1 - 0.3 * w.grid));
    haze(c, p[0], p[1], leg < 0 ? 32 : 48, 2, col, 0.21);
    c.restore();
  }

  // one.json
  var one_default = { slug: "dial", id: 0, station: 0, start: 326, end: 514 };

  // stage.js
  var config = one_default;
  function drawFace(ctx, state2) {
    draw(ctx, one_default.id, state2);
  }
  var station = one_default.station;
  function pointOnRim(frame) {
    const p = import_route3.default.rail(station, frame);
    return [p.x, -p.y];
  }
  function marks(ctx, frame, state2) {
    const scene = import_route3.default.scenes[station];
    if (station === 8 || frame < scene.first || frame > scene.last) return;
    const [x, y] = pointOnRim(frame);
    state2.contact = { x, y, hue: 0.53 + 0.066 * frame / 60 };
    if (station === 1) {
      state2.contact.x /= 1 - 0.032 * state2.press;
      state2.contact.y /= 1 - 0.1 * state2.press;
    }
  }
  function drawLive(ctx, state2, light) {
    drawFace(ctx, state2);
    if (!light) return;
    const [x, y] = light, c = color(0.55 + state2.t * 0.066);
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    spark(ctx, x, y, c, 0.83, 6.2);
    haze(ctx, x, y, 11, 2, c, 0.18);
    ctx.restore();
  }
  function flat(view, frame) {
    const state2 = stateAt(frame);
    marks(view, frame, state2);
    state2.spatial = false;
    const scene = import_route3.default.scenes[station];
    drawLive(view, state2, station !== 8 && frame >= scene.first && frame <= scene.last ? pointOnRim(frame) : null);
  }
  function create(surface, overlay, options = {}) {
    const overlayCtx = overlay.getContext("2d"), w = surface.width, h = surface.height;
    let renderer, source, world, sphere;
    try {
      if (!options.flat) {
        renderer = new T2.WebGLRenderer({ canvas: surface, alpha: false, antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance" });
        renderer.setSize(w, h, false);
        renderer.outputColorSpace = T2.SRGBColorSpace;
        renderer.setClearColor(592400);
        world = new T2.Scene();
        world.fog = new T2.FogExp2(1118750, 53e-5);
        world.add(new T2.HemisphereLight(13950719, 5394532, 1.18));
        for (const [x, y, z, color2, power] of [[-400, 350, 260, 12903935, 2.4], [300, -240, -185, 15776223, 2.1], [260, 290, -320, 12107007, 1.6]]) {
          const lamp = new T2.DirectionalLight(color2, power);
          lamp.position.set(x, y, z);
          world.add(lamp);
        }
        source = makeObject(station);
        world.add(source.group);
        sphere = new T2.Mesh(new T2.SphereGeometry(import_route3.default.radius, 20, 14), new T2.MeshBasicMaterial({ color: 16775407, toneMapped: false, fog: false }));
        world.add(sphere);
      }
    } catch (error) {
      if (renderer) renderer.dispose();
      renderer = null;
    }
    function render(frame) {
      const f = Math.max(one_default.start, Math.min(one_default.end - 1, Math.round(frame)));
      overlayCtx.setTransform(1, 0, 0, 1, 0, 0);
      overlayCtx.clearRect(0, 0, w, h);
      if (!renderer) {
        overlayCtx.save();
        overlayCtx.fillStyle = "#090a10";
        overlayCtx.fillRect(0, 0, w, h);
        overlayCtx.translate(w / 2, h / 2);
        const zoom = Math.min(w / 365, h / 295);
        overlayCtx.scale(zoom, zoom);
        flat(overlayCtx, f);
        overlayCtx.restore();
        return;
      }
      const rig = import_voyage3.default.cameraAt(f), pose = import_voyage3.default.stagePose(station, f, rig);
      source.group.position.copy(pose.pos);
      source.group.quaternion.copy(pose.quat);
      source.group.scale.copy(pose.scale);
      paint(source, station, f, true);
      sphere.visible = import_voyage3.default.lightVisible(f);
      if (sphere.visible) sphere.position.copy(import_voyage3.default.displayedBall(f, rig));
      renderer.render(world, rig.camera);
      overlayCtx.save();
      overlayCtx.scale(w / 1440, h / rig.height);
      spectrumTrail(overlayCtx, f, rig, import_voyage3.default.wallAt(f));
      overlayCtx.restore();
    }
    function dispose() {
      if (!renderer) return;
      const resources = /* @__PURE__ */ new Set([source.texture]);
      world.traverse((obj) => {
        if (obj.geometry) resources.add(obj.geometry);
        if (obj.material) resources.add(obj.material);
      });
      resources.forEach((r) => r.dispose());
      renderer.dispose();
    }
    return { render, dispose, mode: renderer ? "webgl" : "canvas" };
  }
  return __toCommonJS(stage_exports);
})();
