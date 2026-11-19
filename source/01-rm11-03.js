// 夏夏的AI灵感 · 局部透镜。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
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

  // shim:remotion
  var staticFile = (name) => (window.effectAssets || {})[name] || (/paper|grain/.test(name) ? "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2280%22%20height%3D%2280%22%3E%3Cfilter%20id%3D%22p%22%3E%3CfeTurbulence%20baseFrequency%3D%22.8%22%20numOctaves%3D%223%22%2F%3E%3C%2Ffilter%3E%3Cpath%20fill%3D%22%23f7f1e4%22%20d%3D%22M0%200h80v80H0z%22%2F%3E%3Cpath%20filter%3D%22url(%23p)%22%20opacity%3D%22.075%22%20d%3D%22M0%200h80v80H0z%22%2F%3E%3C%2Fsvg%3E" : "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22s%22%20x2%3D%22.5%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23d7ded2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e9aa71%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cpath%20fill%3D%22url(%23s)%22%20d%3D%22M0%200h600v400H0z%22%2F%3E%3Ccircle%20cx%3D%22400%22%20cy%3D%22149%22%20r%3D%2251%22%20fill%3D%22%23eea464%22%2F%3E%3Cpath%20d%3D%22M0%20283l100-77%2054%2022%2087-78%20194%20124%2095-58%2070%2044v140H0%22%20fill%3D%22%237b958a%22%2F%3E%3Cpath%20d%3D%22M0%20308l141-53%2078%2021%2099-54%20151%2071%20131-29v136H0%22%20fill%3D%22%23365a54%22%2F%3E%3C%2Fsvg%3E");
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
  var import_jsx_runtime = __toESM(require_jsx_runtime());
  var asset = (n) => staticFile(n);
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
  function Photo() {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("image", { href: asset("light.jpg"), x: "130", y: "294", width: "1180", height: "453", preserveAspectRatio: "xMidYMid slice" });
  }
  function Lens({ f }) {
    const p = track(f), a = lensAmount(f), r = 114 * a, offset = 1436;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { transform: tx(0, offset), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "65", y: "148", width: "1310", height: "718", fill: C.page }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { x: 130, y: 218, size: 21, fill: C.red, weight: 500, spacing: 2, children: "03 \u5C40\u90E8\u900F\u955C" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { x: 130, y: 267, size: 40, weight: 500, children: "\u6E2F\u5C9B\u591C\u8F66" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { x: 1309, y: 265, size: 22, fill: "#818779", anchor: "end", children: "\u5F71\u50CF\u4F5C\u54C1 / 01" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { clipPath: "url(#photograph)", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Photo, {}),
        a > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", { id: "lens-circle", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: p.x, cy: p.y, r }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: p.x, cy: p.y, r, fill: "#111e16", filter: "url(#lens-shadow)" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { clipPath: "url(#lens-circle)", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { transform: tx(p.x, p.y) + ` scale(${1 + a}) translate(${-p.x} ${-p.y})`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Photo, {}) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: p.x, cy: p.y, r, fill: "none", stroke: "#fff7e7", strokeWidth: 3 * a }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: p.x, cy: p.y, r: r + 1.5, fill: "none", stroke: "#263b2d", strokeOpacity: ".55", strokeWidth: "1" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: `M${p.x - 6} ${p.y}h12M${p.x} ${p.y - 6}v12`, stroke: "#fff8e9", strokeWidth: "1.4", opacity: a * 0.7 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { transform: tx(p.x + 72 * a, p.y - 102 * a), opacity: a, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "-26", y: "-20", width: "52", height: "34", rx: "17", fill: "#f9f5e9" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { x: 0, y: 4, size: 20, weight: 500, anchor: "middle", children: "2\xD7" })
          ] })
        ] }) : null
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { x: 130, y: 796, size: 23, fill: "#6f796a", children: "\u628A\u76EE\u5149\uFF0C\u7559\u7ED9\u7EC6\u8282\u3002" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { x: 1244, y: 820, size: 27, fill: C.ink, anchor: "end", children: "\u8054\u7CFB\u521B\u4F5C" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, { x: 1279, y: 810 })
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
    window.flushEffect(() => root.render(/* @__PURE__ */ import_react.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "35 40 1370 852" }, /* @__PURE__ */ import_react.default.createElement(Defs, null), /* @__PURE__ */ import_react.default.createElement("g", { transform: "translate(0,-1436)" }, /* @__PURE__ */ import_react.default.createElement(Lens, { f })), /* @__PURE__ */ import_react.default.createElement(Pointer, { f }))));
  };
})();
