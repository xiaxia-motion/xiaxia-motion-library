// 夏夏的AI灵感 · 目光追踪。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
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

  // shim:react
  var require_react = __commonJS({
    "shim:react"(exports, module) {
      module.exports = window.React;
    }
  });
  var require_react_jsx_runtime_production = __commonJS({
    "\u89C6\u9891/01-\u77E5\u8BC6\u8BB2\u89E3/\u7701Token\u65B9\u6CD5/\u65E9\u671F\u6E90\u7801\u5DE5\u7A0B/token-saving-30s/node_modules/react/cjs/react-jsx-runtime.production.js"(exports) {
      "use strict";
      /**
       * @license React
       * react-jsx-runtime.production.js
       *
       * Copyright (c) Meta Platforms, Inc. and affiliates.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */
      var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element");
      var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
      function jsxProd(type, config, maybeKey) {
        var key = null;
        void 0 !== maybeKey && (key = "" + maybeKey);
        void 0 !== config.key && (key = "" + config.key);
        if ("key" in config) {
          maybeKey = {};
          for (var propName in config)
            "key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        config = maybeKey.ref;
        return {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref: void 0 !== config ? config : null,
          props: maybeKey
        };
      }
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsx = jsxProd;
      exports.jsxs = jsxProd;
    }
  });
  var require_jsx_runtime = __commonJS({
    "\u89C6\u9891/01-\u77E5\u8BC6\u8BB2\u89E3/\u7701Token\u65B9\u6CD5/\u65E9\u671F\u6E90\u7801\u5DE5\u7A0B/token-saving-30s/node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_jsx_runtime_production();
      } else {
        module.exports = null;
      }
    }
  });
  var import_react = __toESM(require_react());
  var timeline_default = {
    fps: 60,
    frames: 1596,
    opening: {
      line: [
        22,
        37
      ],
      sub: [
        35,
        67
      ],
      reveal: [
        118,
        166
      ]
    },
    scrolls: [
      [
        454,
        488,
        718
      ],
      [
        762,
        802,
        718
      ],
      [
        1122,
        1162,
        718
      ]
    ],
    chapters: [
      166,
      488,
      802,
      1162
    ],
    promptIntro: [
      161,
      181
    ],
    promptOutro: [
      1424,
      1440
    ],
    lens: [
      823,
      844,
      1082,
      1105
    ],
    closing: {
      click: 1408,
      collapse: [
        1440,
        1491
      ],
      logo: [
        1476,
        1512
      ],
      word: [
        1486,
        1519
      ]
    },
    clicks: [
      112,
      448,
      754,
      1114,
      1408
    ],
    pointer: [
      [
        74,
        1193,
        775
      ],
      [
        103,
        1053,
        585
      ],
      [
        118,
        1053,
        585
      ],
      [
        166,
        1372,
        64
      ],
      [
        190,
        1200,
        300
      ],
      [
        222,
        915,
        320
      ],
      [
        248,
        896,
        460
      ],
      [
        276,
        1230,
        455
      ],
      [
        304,
        1190,
        620
      ],
      [
        333,
        950,
        614
      ],
      [
        360,
        1040,
        340
      ],
      [
        391,
        1192,
        348
      ],
      [
        425,
        326,
        698
      ],
      [
        454,
        326,
        698
      ],
      [
        488,
        307,
        503
      ],
      [
        514,
        300,
        480
      ],
      [
        546,
        445,
        480
      ],
      [
        581,
        705,
        458
      ],
      [
        618,
        1015,
        475
      ],
      [
        646,
        1120,
        487
      ],
      [
        678,
        802,
        480
      ],
      [
        709,
        500,
        487
      ],
      [
        743,
        1135,
        760
      ],
      [
        765,
        1135,
        760
      ],
      [
        808,
        1174,
        736
      ],
      [
        830,
        490,
        560
      ],
      [
        865,
        585,
        566
      ],
      [
        903,
        745,
        564
      ],
      [
        943,
        840,
        575
      ],
      [
        981,
        789,
        620
      ],
      [
        1014,
        626,
        625
      ],
      [
        1048,
        488,
        608
      ],
      [
        1075,
        663,
        560
      ],
      [
        1107,
        1168,
        810
      ],
      [
        1126,
        1168,
        810
      ],
      [
        1168,
        1157,
        773
      ],
      [
        1196,
        392,
        590
      ],
      [
        1224,
        294,
        659
      ],
      [
        1252,
        488,
        705
      ],
      [
        1278,
        364,
        730
      ],
      [
        1308,
        632,
        624
      ],
      [
        1338,
        1058,
        588
      ],
      [
        1369,
        996,
        695
      ],
      [
        1398,
        907,
        665
      ],
      [
        1440,
        907,
        665
      ],
      [
        1488,
        720,
        444
      ],
      [
        1595,
        720,
        444
      ]
    ],
    cues: [
      [
        5,
        "ink"
      ],
      [
        22,
        "rule"
      ],
      [
        38,
        "type"
      ],
      [
        48,
        "type"
      ],
      [
        58,
        "type"
      ],
      [
        112,
        "click"
      ],
      [
        120,
        "reveal"
      ],
      [
        166,
        "land"
      ],
      [
        230,
        "gaze"
      ],
      [
        276,
        "gaze"
      ],
      [
        334,
        "gaze"
      ],
      [
        448,
        "click"
      ],
      [
        459,
        "page"
      ],
      [
        517,
        "stretch"
      ],
      [
        578,
        "stretch"
      ],
      [
        622,
        "stretch"
      ],
      [
        685,
        "stretch"
      ],
      [
        754,
        "click"
      ],
      [
        769,
        "page"
      ],
      [
        834,
        "lens"
      ],
      [
        901,
        "scan"
      ],
      [
        945,
        "scan"
      ],
      [
        1015,
        "scan"
      ],
      [
        1091,
        "close"
      ],
      [
        1114,
        "click"
      ],
      [
        1129,
        "page"
      ],
      [
        1200,
        "magnet"
      ],
      [
        1254,
        "magnet"
      ],
      [
        1336,
        "magnet"
      ],
      [
        1370,
        "magnet"
      ],
      [
        1408,
        "save"
      ],
      [
        1444,
        "fold"
      ],
      [
        1480,
        "sign"
      ]
    ],
    audio: {
      gainDb: -13.3,
      fadeSeconds: 0.56,
      rate: 48e3
    }
  };
  var C = { ink: "#233728", red: "#bd302b", paper: "#f6f2e9", page: "#f3f1ec", dark: "#1d3027", soft: "#8b8b7e", line: "#d6d3c9", cream: "#f7f0e2", warm: "#dfc9a2" };
  var clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  var lerp = (a, b, t) => a + (b - a) * t;
  var unit = (f, a, b) => clamp((f - a) / (b - a));
  var sm = (f, a, b) => {
    const t = unit(f, a, b);
    return t * t * (3 - 2 * t);
  };
  var tx = (x, y) => `translate(${x} ${y})`;
  function track(f, points = timeline_default.pointer) {
    if (f <= points[0][0]) return { x: points[0][1], y: points[0][2] };
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1], b = points[i];
      if (f <= b[0]) {
        const q = sm(f, a[0], b[0]);
        return { x: lerp(a[1], b[1], q), y: lerp(a[2], b[2], q) };
      }
    }
    const p = points[points.length - 1];
    return { x: p[1], y: p[2] };
  }
  var lensAmount = (f) => sm(f, timeline_default.lens[0], timeline_default.lens[1]) * (1 - sm(f, timeline_default.lens[2], timeline_default.lens[3]));
  var clickPulse = (f) => Math.max(0, ...timeline_default.clicks.map((a) => Math.sin(Math.PI * unit(f, a - 4, a + 7))));
  function gaze(f) {
    const p = track(f - 3), q = track(f - 7);
    const dx = (q.x - 1010) / 240, dy = (q.y - 455) / 230;
    return { headX: clamp(dx, -1, 1) * 6, headY: clamp(dy, -1, 1) * 4, angle: clamp(dx, -1, 1) * 3, pupils: [974, 1058].map((x) => {
      const vx = p.x - x, vy = p.y - 443, d = Math.max(85, Math.hypot(vx, vy));
      return { x: vx / d * 14, y: vy / d * 17 };
    }) };
  }
  var buttons = [{ x: 151, y: 611, w: 474, h: 104, label: "\u804A\u804A\u9879\u76EE" }, { x: 670, y: 611, w: 474, h: 104, label: "\u6536\u85CF\u4F5C\u54C1\u96C6" }];
  var magnets = buttons.map((b) => {
    let x = 0, y = 0, vx = 0, vy = 0;
    const a = [];
    for (let f = 0; f < timeline_default.frames; f++) {
      const p = track(f), cx = b.x + b.w / 2, cy = b.y + b.h / 2;
      const range = f >= 1162 && f < 1440 && Math.abs(p.x - cx) < b.w / 2 + 68 && Math.abs(p.y - cy) < b.h / 2 + 68;
      const gx = range ? clamp((p.x - cx) * 0.22, -35, 35) : 0, gy = range ? clamp((p.y - cy) * 0.38, -29, 29) : 0;
      for (let j = 0; j < 2; j++) {
        const dt = 1 / 120;
        vx += (180 * (gx - x) - 16 * vx) / 0.7 * dt;
        vy += (180 * (gy - y) - 16 * vy) / 0.7 * dt;
        x += vx * dt;
        y += vy * dt;
      }
      a.push({ x, y, range });
    }
    return a;
  });
  function mixColor(a, b, t) {
    const v = (s, i) => parseInt(s.slice(1 + i * 2, 3 + i * 2), 16);
    return "#" + [0, 1, 2].map((i) => Math.round(lerp(v(a, i), v(b, i), clamp(t))).toString(16).padStart(2, "0")).join("");
  }
  var import_jsx_runtime = __toESM(require_jsx_runtime());
  function Text({ x, y, children, size = 24, fill = C.ink, weight = 400, anchor = "start", spacing = 0, serif = false, opacity = 1 }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", { x, y, fontFamily: serif ? "Georgia,serif" : '"Helvetica Neue","Hiragino Sans GB",sans-serif', fontSize: size, fontWeight: weight, fill, textAnchor: anchor, letterSpacing: spacing, opacity, children });
  }
  var Arrow = ({ x, y, size = 1, color = C.ink }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M-15 0H15M5-10l10 10-10 10", fill: "none", stroke: color, strokeWidth: "2.7", strokeLinecap: "round", strokeLinejoin: "round", transform: tx(x, y) + ` scale(${size})` });
  function Defs() {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", { id: "window", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "65", y: "60", width: "1310", height: "806", rx: "25" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", { id: "content", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "65", y: "148", width: "1310", height: "718" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", { id: "photograph", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "130", y: "294", width: "1180", height: "453", rx: "6" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: "pebble", cx: ".31", cy: ".18", r: ".94", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#657165" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".37", stopColor: "#313e34" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".77", stopColor: "#15251d" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#08140e" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "bevel", x1: "0", y1: "0", x2: "1", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#939b88" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".45", stopColor: "#344333" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#102017" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "eye-white", x1: "0", y1: "0", x2: ".8", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#fffdf0" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#dddac8" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "green-button", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#314b3b" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#1b3023" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", { id: "cursor-shadow", x: "-60%", y: "-40%", width: "230%", height: "220%", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDropShadow", { dx: "0", dy: "2.5", stdDeviation: "2.2", floodColor: "#182118", floodOpacity: ".23" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", { id: "orb-shadow", x: "-100%", y: "-300%", width: "300%", height: "700%", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", { stdDeviation: "10" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", { id: "lens-shadow", x: "-50%", y: "-50%", width: "200%", height: "200%", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDropShadow", { dx: "0", dy: "7", stdDeviation: "9", floodColor: "#11180e", floodOpacity: ".35" }) })
    ] });
  }
  function Hero({ f }) {
    const a = gaze(f);
    const p = track(f);
    const hover = sm(f, 413, 428), press = Math.sin(Math.PI * clamp((f - 444) / 12));
    const blink = 1 - 0.94 * (Math.sin(Math.PI * sm(f, 232, 241)) ** 8 + Math.sin(Math.PI * sm(f, 362, 371)) ** 8);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "65", y: "148", width: "1310", height: "718", fill: C.page }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { x: 151, y: 224, size: 21, fill: C.red, weight: 500, spacing: 2, children: "01 \u76EE\u5149\u8FFD\u8E2A" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { x: 151, y: 350, size: 42, weight: 400, children: "\u4F60\u597D\uFF0C\u6211\u662F\u590F\u590F\u3002" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { x: 144, y: 479, size: 111, weight: 600, spacing: -6, children: "\u8BA9\u7075\u611F\uFF0C" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { x: 144, y: 600, size: 111, weight: 600, spacing: -6, children: "\u53D1\u751F\u3002" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { x: 151, y: 799, size: 24, fill: "#777e70", spacing: 2, children: "\u8BBE\u8BA1 \xB7 \u5F71\u50CF \xB7 \u521B\u610F\u5B9E\u9A8C" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { transform: tx(326, 698) + ` scale(${1 - 0.025 * press}) translate(-326 -698)`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "151", y: "655", width: "350", height: "86", rx: "43", fill: mixColor(C.dark, "#314a37", hover) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { x: 201, y: 708, size: 28, fill: C.cream, weight: 500, children: "\u63A2\u7D22\u4F5C\u54C1" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, { x: 451 + 4 * hover, y: 698, color: C.cream })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "1012", cy: "464", r: "208", fill: "none", stroke: "#deded1", strokeWidth: "1.5" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M798 464H1226M1012 250V678", stroke: "#e6e5db", strokeWidth: "1.1" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "1012", cy: "255", r: "3", fill: "#c7cbba" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "1221", cy: "464", r: "3", fill: "#c7cbba" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: 1010 + a.headX * 0.3, cy: "611", rx: "108", ry: "15", fill: "#233124", opacity: ".19", filter: "url(#orb-shadow)" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { transform: tx(a.headX, a.headY) + ` rotate(${a.angle} 1010 455)`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M885 429C883 355 920 327 1007 324C1097 321 1144 354 1145 430L1144 485C1143 552 1103 578 1016 579C929 580 888 549 886 488Z", fill: "url(#pebble)", stroke: "url(#bevel)", strokeWidth: "2.2" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M916 383C931 355 972 346 1008 346", fill: "none", stroke: "#bec5aa", strokeOpacity: ".35", strokeWidth: "2.2", strokeLinecap: "round" }),
        [974, 1058].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { transform: tx(x, 443) + ` scale(1 ${Math.max(0.06, blink)})`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { rx: "31", ry: "46", fill: "#0b1b12", opacity: ".4", transform: "translate(0 4)" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { rx: "29", ry: "43", fill: "url(#eye-white)" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: a.pupils[i].x, cy: a.pupils[i].y, rx: "11.8", ry: "18", fill: "#17271d" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: a.pupils[i].x - 2, cy: a.pupils[i].y - 5.5, rx: "2.2", ry: "3.4", fill: "#fffdf2", opacity: ".86" })
        ] }, x)),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M999 525Q1015 532 1032 523", stroke: "#9aa58a", strokeOpacity: ".48", strokeWidth: "2.5", fill: "none", strokeLinecap: "round" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { transform: tx(1010, 720), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "-73", cy: "-7", r: "4.5", fill: "#698264" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { x: -57, y: 0, size: 21, fill: "#717a6b", children: "\u7075\u611F\u52A9\u624B\u5728\u7EBF" })
      ] })
    ] });
  }
  function Pointer({ f }) {
    const p = track(f), vis = sm(f, 74, 86) * (1 - sm(f, 1474, 1489)), lens = lensAmount(f), q = 1 - 0.12 * clickPulse(f);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { transform: tx(p.x, p.y) + ` scale(${q})`, opacity: vis * (1 - 0.76 * lens), filter: "url(#cursor-shadow)", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 0 1.4 34.4 10.2 26.1 18.1 41.4 24.6 37.9 16.7 23.2 29 21.2Z", fill: C.red, stroke: "#fffaf0", strokeWidth: "2.2", strokeLinejoin: "round" }) });
  }
  var root = window.createEffectRoot(document.getElementById("mount"));
  window.drawEffect = (seconds) => {
    const f = Math.round(seconds * 60);
    window.effectFrame = f;
    window.flushEffect(() => root.render(/* @__PURE__ */ import_react.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "35 40 1370 852" }, /* @__PURE__ */ import_react.default.createElement(Defs, null), /* @__PURE__ */ import_react.default.createElement("g", { transform: "translate(0,-0)" }, /* @__PURE__ */ import_react.default.createElement(Hero, { f })), /* @__PURE__ */ import_react.default.createElement(Pointer, { f }))));
  };
})();
