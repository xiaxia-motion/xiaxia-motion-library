// 夏夏的AI灵感 · 三张材质卡亮相与玻璃图标接力。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
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
  var import_react2 = __toESM(require_react());

  // shim:remotion
  var staticFile = (name) => (window.effectAssets || {})[name] || (/paper|grain/.test(name) ? "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2280%22%20height%3D%2280%22%3E%3Cfilter%20id%3D%22p%22%3E%3CfeTurbulence%20baseFrequency%3D%22.8%22%20numOctaves%3D%223%22%2F%3E%3C%2Ffilter%3E%3Cpath%20fill%3D%22%23f7f1e4%22%20d%3D%22M0%200h80v80H0z%22%2F%3E%3Cpath%20filter%3D%22url(%23p)%22%20opacity%3D%22.075%22%20d%3D%22M0%200h80v80H0z%22%2F%3E%3C%2Fsvg%3E" : "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22s%22%20x2%3D%22.5%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23d7ded2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e9aa71%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cpath%20fill%3D%22url(%23s)%22%20d%3D%22M0%200h600v400H0z%22%2F%3E%3Ccircle%20cx%3D%22400%22%20cy%3D%22149%22%20r%3D%2251%22%20fill%3D%22%23eea464%22%2F%3E%3Cpath%20d%3D%22M0%20283l100-77%2054%2022%2087-78%20194%20124%2095-58%2070%2044v140H0%22%20fill%3D%22%237b958a%22%2F%3E%3Cpath%20d%3D%22M0%20308l141-53%2078%2021%2099-54%20151%2071%20131-29v136H0%22%20fill%3D%22%23365a54%22%2F%3E%3C%2Fsvg%3E");
  var delayRender = () => 0;
  var continueRender = () => {
  };
  var cancelRender = (e) => {
    throw e;
  };
  var styleOrder_v17_default = [2, 7, 5, 0, 1, 3, 4, 6, 8, 9, 10, 11];
  var text = (x, y, size, anchor = 0, spacing = 0, weight = 600, angle = 0) => ({ x, y, size, anchor, spacing, weight, angle });
  var shape = (x, y, w, h, r, fill, stroke = fill, sw = 0, opacity = 1) => ({ x, y, w, h, r, fill, stroke, sw, opacity });
  var blank = () => shape(720, 430, 0, 0, 0, "#ffffff", "none", 0, 0);
  var base = { soften: [0, 0, 0, 0], shine: [0, 0, 0, 0], wash: { color: "#ffffff", amount: 0 }, paper: 0, font: "cjk", italic: 0, brand: text(66, 76, 24), nav: text(1265, 76, 19, 1), desc: text(76, 685, 27, 0, 0, 400), button: shape(76, 728, 180, 57, 0, "#233728"), buttonInk: "#ffffff", line: { x: 66, y: 111, w: 1308, color: "#a2a38e", sw: 1 }, note: "" };
  var basePages = [
    { ...base, id: "ed", revision: 9, name: "\u6742\u5FD7\u7F16\u8F91", bg: "#f3efe4", ink: "#26382d", muted: "#65705e", accent: "#b14331", paper: 0.32, font: "serif", brand: { ...text(80, 80, 28), font: "cjk" }, nav: { ...text(1360, 80, 21, 1), font: "cjk" }, title: [text(80, 335, 140, 0, -5), text(535, 335, 140, 0, -5)], desc: text(80, 535, 29, 0, 0.5, 400), button: shape(80, 650, 242, 62, 0, "#f3efe4", "#415940", 1.5), buttonInk: "#26382d", hero: { x: 1050, y: 612, size: 426 }, shapes: [shape(764, 414, 612, 410, 0, "#ccd4c0"), shape(80, 384, 1280, 1, 0, "#9ba58d"), blank(), blank()], line: { x: 80, y: 126, w: 1280, color: "#9ba58d", sw: 1 }, note: "\u6A2A\u8D2F\u9875\u9996\u7684\u886C\u7EBF\u6807\u9898\uFF0C\u4E0B\u65B9\u5DE6\u4FA7\u8BF4\u660E\u5165\u53E3\u4E0E\u53F3\u4FA7\u7EB8\u827A\u753B\u5E45" },
    { ...base, id: "br", revision: 9, name: "\u65B0\u7C97\u91CE\u4E3B\u4E49", bg: "#fffaf0", ink: "#191919", muted: "#393a34", accent: "#ff815d", brand: text(76, 80, 27, 0, 0, 800), nav: text(1360, 80, 22, 1), title: [text(84, 326, 112, 0, -4, 900), text(84, 467, 112, 0, -4, 900)], desc: text(88, 565, 26, 0, 0, 500), button: shape(88, 637, 380, 80, 0, "#ff815d", "#191919", 5), buttonInk: "#191919", hero: { x: 1047, y: 475, size: 476 }, shapes: [shape(762, 202, 598, 576, 0, "#191919"), shape(748, 188, 598, 576, 0, "#e9ff61", "#191919", 5), shape(100, 650, 380, 80, 0, "#191919"), blank()], line: { x: 76, y: 125, w: 1284, color: "#191919", sw: 4 }, note: "\u767D\u5E95\u91CD\u5B57\u4E0E\u9178\u9EC4\u4F5C\u54C1\u7A97\uFF0C\u7EDF\u4E00\u5DE6\u8F74\u3001\u7C97\u9ED1\u76F4\u89D2\u548C\u73CA\u745A\u786C\u9634\u5F71\u6309\u94AE" },
    { ...base, id: "gl", soften: [18, 0, 0, 0], shine: [0, 0.5, 0, 0], wash: { color: "#f3d9ce", amount: 0.65 }, name: "\u73BB\u7483\u62DF\u6001", bg: "#e4eee4", ink: "#27443d", muted: "#5d7770", accent: "#9cd5b9", brand: text(720, 79, 26, 0.5), nav: text(720, 133, 20, 0.5), title: [text(158, 373, 88, 0, -2), text(158, 484, 88, 0, -2)], desc: text(160, 591, 25, 0, 0, 400), button: shape(158, 642, 198, 62, 31, "#ffffff", "#c2ddd2", 1.4, 0.7), buttonInk: "#2d5d50", hero: { x: 1030, y: 463, size: 474 }, shapes: [shape(905, 209, 285, 285, 143, "#ecc7b9"), shape(108, 221, 1224, 538, 48, "#ffffff", "#ffffff", 2, 0.49), shape(1160, 645, 100, 100, 50, "#b1dcba"), blank()], line: { x: 510, y: 162, w: 420, color: "#bed3c3", sw: 1 }, note: "\u5C45\u4E2D\u5BFC\u822A\u3001\u60AC\u6D6E\u73BB\u7483\u6A2A\u5361\u3001\u524D\u540E\u9519\u5C42\u7684\u901A\u900F\u56FE\u6807" },
    { ...base, id: "bauhaus", name: "\u5305\u8C6A\u65AF", bg: "#f4efdf", ink: "#172937", muted: "#263c4a", accent: "#e84535", title: [text(767, 362, 104, 0, -4, 800), text(767, 493, 104, 0, -4, 800)], desc: text(773, 617, 26, 0, 0, 400), button: shape(774, 691, 492, 67, 0, "#245d9a"), buttonInk: "#fff9e9", hero: { x: 363, y: 470, size: 497 }, shapes: [shape(0, 135, 647, 729, 0, "#f2cb35"), shape(505, 135, 142, 729, 0, "#245d9a"), shape(66, 714, 262, 82, 0, "#e84535"), shape(0, 113, 1440, 22, 0, "#172937")], line: { x: 66, y: 106, w: 1308, color: "#f4efdf", sw: 0 }, note: "\u5DE6\u4FA7\u539F\u8272\u51E0\u4F55\u753B\u5E45\u4E0E\u53F3\u4FA7\u5B57\u7EA7\uFF0C\u7EA2\u9EC4\u84DD\u4E25\u683C\u5206\u533A" },
    { ...base, id: "swiss", revision: 9, name: "\u745E\u58EB\u5E73\u9762", bg: "#f6f5ee", ink: "#151b18", titleInk: "#fffdf7", muted: "#62675e", accent: "#d92e40", brand: text(80, 80, 26), nav: text(1360, 80, 21, 1), title: [text(86, 325, 148, 0, -4, 700), text(550, 325, 148, 0, -4, 700)], desc: text(785, 553, 29, 0, 0, 400), button: shape(785, 630, 324, 74, 0, "#151b18"), buttonInk: "#fffdf7", hero: { x: 362, y: 625, size: 360 }, shapes: [shape(0, 158, 1440, 240, 0, "#d92e40"), shape(656, 456, 1, 338, 0, "#b2b6aa"), shape(785, 758, 580, 5, 0, "#d92e40"), blank()], line: { x: 80, y: 119, w: 1280, color: "#151b18", sw: 1 }, note: "\u7EA2\u8272\u6574\u6761\u6807\u9898\u5E26\uFF0C\u4E0B\u65B9\u56FE\u6807\u4E0E\u8BF4\u660E\u4F9D\u4E25\u683C\u7F51\u683C\u5206\u680F" },
    { ...base, id: "minimal", name: "\u9ED1\u767D\u6781\u7B80", bg: "#fbfbf7", ink: "#171b18", muted: "#74766d", accent: "#171b18", brand: text(720, 73, 21, 0.5, 1), nav: text(1320, 73, 18, 1, 1, 400), title: [text(720, 571, 65, 0.5, 2, 400), text(720, 654, 65, 0.5, 2, 400)], desc: text(720, 713, 21, 0.5, 1, 400), button: shape(638, 748, 164, 42, 21, "#171b18"), buttonInk: "#ffffff", hero: { x: 720, y: 323, size: 300 }, shapes: [blank(), blank(), blank(), blank()], line: { x: 720, y: 111, w: 0, color: "#fbfbf7", sw: 0 }, note: "\u4E2D\u8F74\u5C0F\u56FE\u6807\u4E0E\u4E0A\u4E0B\u7559\u767D\uFF0C\u51CF\u5C11\u88C5\u9970\u548C\u5B57\u91CD" },
    { ...base, id: "pixel", name: "\u50CF\u7D20\u98CE", bg: "#103b30", ink: "#d1ff7b", muted: "#a8d6aa", accent: "#b5ff5c", font: "mono", brand: text(66, 76, 25, 0, 1), nav: text(1320, 76, 21, 1, 1), title: [text(708, 360, 91, 0, 3, 700), text(708, 477, 91, 0, 3, 700)], desc: text(711, 584, 25, 0, 0, 400), button: shape(711, 643, 499, 76, 0, "#b5ff5c", "#0b251e", 6), buttonInk: "#103b30", hero: { x: 345, y: 474, size: 460 }, shapes: [shape(56, 151, 1328, 653, 0, "#0b2b22", "#79b754", 4), shape(638, 171, 4, 613, 0, "#719f52"), shape(76, 171, 120, 20, 0, "#b5ff5c"), shape(1234, 764, 130, 20, 0, "#b5ff5c")], line: { x: 66, y: 114, w: 1308, color: "#8bd66b", sw: 3 }, note: "\u50CF\u7D20\u7F51\u683C\u53CC\u533A\uFF0C\u5757\u72B6\u8FB9\u7F18\u548C\u7B49\u5BBD\u6807\u7B7E" },
    { ...base, id: "neumorph", soften: [9, 9, 0, 0], name: "\u65B0\u62DF\u7269", bg: "#e7ecee", ink: "#45545b", muted: "#758189", accent: "#aebfc4", brand: text(720, 75, 24, 0.5), nav: text(720, 135, 20, 0.5), title: [text(807, 364, 81, 0, 0, 500), text(807, 472, 81, 0, 0, 500)], desc: text(809, 573, 25, 0, 0, 400), button: shape(808, 635, 365, 66, 33, "#e7ecee", "#f7fbfd", 2), buttonInk: "#53636a", hero: { x: 363, y: 475, size: 330 }, shapes: [shape(139, 251, 468, 468, 234, "#c9d2d5"), shape(121, 233, 468, 468, 234, "#f6f9fa"), shape(130, 242, 468, 468, 234, "#e7ecee"), shape(522, 98, 396, 58, 29, "#e7ecee", "#f7fbfd", 1.5)], line: { x: 720, y: 178, w: 0, color: "#e7ecee", sw: 0 }, note: "\u5DE6\u4FA7\u540C\u8272\u51F8\u9762\u5706\u76D8\u4E0E\u53F3\u4FA7\u4F4E\u5B57\u91CD\u6807\u9898\u3001\u51F9\u51F8\u80F6\u56CA" },
    { ...base, id: "clay", revision: 9, name: "\u9ECF\u571F\u98CE", bg: "#fff3e9", ink: "#694983", muted: "#927b9c", accent: "#f4ce68", brand: text(76, 78, 25), nav: text(1364, 78, 21, 1), title: [text(720, 222, 66, 0.5, 0, 600), text(720, 340, 100, 0.5, 0, 700)], desc: text(720, 400, 25, 0.5, 0, 400), button: shape(594, 780, 252, 55, 27.5, "#f4ce68", "#fff2c0", 3), buttonInk: "#694983", hero: { x: 720, y: 588, size: 312 }, shapes: [blank(), blank(), blank(), blank()], line: { x: 720, y: 111, w: 0, color: "#fff3e9", sw: 0 }, note: "\u4E2D\u8F74\u6807\u9898\u3001\u5355\u4E2A\u67D4\u8F6F\u7269\u4F53\u4E0E\u77EE\u5706\u53F0\uFF0C\u53BB\u6389\u5927\u65B9\u6846\u548C\u6E38\u79BB\u80F6\u56CA" },
    { ...base, id: "sketch", name: "\u624B\u7ED8\u6D82\u9E26", bg: "#f4f0de", ink: "#354b39", muted: "#6c795e", accent: "#d3ae6f", paper: 0.6, font: "serif", italic: 1, brand: text(73, 79, 25, 0, 1, 600, -2), nav: text(1307, 81, 21, 1, 0, 500, 1), title: [text(775, 328, 103, 0, 0, 600, -4), text(786, 461, 103, 0, 0, 600, -3)], desc: text(791, 581, 26, 0, 0.5, 400, -2), button: shape(790, 643, 430, 62, 13, "#d5deae", "#647b49", 2), buttonInk: "#354b39", hero: { x: 356, y: 491, size: 488 }, shapes: [shape(83, 217, 551, 553, 9, "#f4f0de", "#8e9d72", 2), shape(112, 232, 493, 518, 6, "#f4f0de", "#b7b98e", 1), shape(765, 485, 467, 6, 0, "#b99c62"), blank()], line: { x: 66, y: 117, w: 1308, color: "#a0a982", sw: 1 }, note: "\u94C5\u7B14\u8FB9\u7EBF\u3001\u9519\u843D\u659C\u5B57\u4E0E\u624B\u7ED8\u753B\u5E45" },
    { ...base, id: "cyber", revision: 9, name: "\u8D5B\u535A\u670B\u514B", bg: "#0d1020", ink: "#f1fff9", muted: "#aaafcc", accent: "#82eadc", brand: text(80, 80, 25, 0, 1), nav: text(1360, 80, 21, 1, 1), title: [text(96, 331, 110, 0, -2, 700), text(96, 467, 110, 0, -2, 700)], desc: text(96, 580, 26, 0, 0, 400), button: shape(96, 648, 302, 70, 0, "#82eadc"), buttonInk: "#10252a", hero: { x: 1055, y: 458, size: 480 }, shapes: [blank(), blank(), blank(), blank()], line: { x: 80, y: 122, w: 1280, color: "#354761", sw: 1 }, note: "\u5B8C\u6574\u6807\u9898\u5DE6\u9F50\uFF0C\u53F3\u4FA7\u5207\u89D2\u9713\u8679\u89C6\u57DF\u4E0E\u4F4E\u5BC6\u5EA6\u900F\u89C6\u7F51\u683C" },
    { ...base, id: "y2k", revision: 9, wash: { color: "#e3ddf1", amount: 0.35 }, name: "Y2K", bg: "#eeedf5", ink: "#403363", muted: "#7b7195", accent: "#c3bbde", italic: 1, brand: { ...text(80, 80, 27), italic: 0 }, nav: { ...text(1360, 80, 21, 1), italic: 0 }, title: [text(340, 716, 104, 0, -3, 800), text(674, 716, 104, 0, -3, 800)], desc: { ...text(720, 174, 25, 0.5, 0, 400), italic: 0 }, button: shape(590, 764, 260, 60, 30, "#f2f4ff", "#ffffff", 3), buttonInk: "#57477e", hero: { x: 720, y: 408, size: 412 }, shapes: [blank(), blank(), blank(), blank()], line: { x: 80, y: 122, w: 1280, color: "#b8b4ca", sw: 1 }, note: "\u62C9\u5BBD\u94F6\u8272\u80F6\u56CA\u4E0E\u91D1\u5C5E\u4E3B\u89C6\u89C9\uFF0C\u4E0B\u65B9\u5B8C\u6574\u5355\u884C\u659C\u4F53\u6807\u9898\u548C\u4E2D\u8F74\u6309\u94AE" }
  ];
  var baseAssetNames = ["spark-editorial-v3.png", "spark-brutalist-v3.png", "spark-glass-v3.png", "spark-bauhaus-v4.png", "spark-swiss-v4.png", "spark-minimal-v4.png", "spark-pixel-v4.png", "spark-neumorph-v4.png", "spark-clay-v4.png", "spark-sketch-v4.png", "spark-cyber-v4.png", "spark-y2k-v4.png"];
  var pages = styleOrder_v17_default.map((i) => basePages[i]);
  var assetNames = styleOrder_v17_default.map((i) => baseAssetNames[i]);
  var timeline_default = {
    fps: 60,
    duration: 45.483333333333334,
    intro: 3.6,
    section: 3.2,
    morph: 0.82,
    outroStart: 41.4,
    gridReady: 42.47,
    end: 45.483333333333334,
    title: {
      ruleStart: 0.35,
      ruleReady: 0.7,
      subStart: 0.58,
      subReady: 1.05,
      exitStart: 2.55,
      exitEnd: 3.15,
      morphStart: 2.14,
      morphEnd: 3.6,
      originX: 1050,
      originY: 585
    },
    galleryHoldStartFrame: 2549,
    galleryHoldFrames: 180,
    durationFrames: 2729,
    materialIntro: {
      titleFadeStart: 2.08,
      titleFadeEnd: 2.52,
      joinStart: 2.18,
      joinEnd: 2.6,
      sideFadeStart: 2.16,
      sideFadeEnd: 2.43,
      iconFadeStart: 2.13,
      iconFadeEnd: 2.36,
      enterDuration: 0.62,
      enterStagger: 0.045,
      idleStart: 0.66,
      idleReady: 1.05,
      cardFadeStart: 2.12,
      cardFadeEnd: 2.43,
      reveal: {
        mainStart: 0,
        mainEnd: 0.26,
        copyStart: 0.32,
        copyEnd: 0.56,
        cardStarts: [
          0.68,
          1,
          1.32
        ],
        cardDuration: 0.28
      },
      flyStart: 2.14,
      flyEnd: 3.6
    },
    selectedIntro: "C2"
  };
  var clamp = (v) => Math.min(1, Math.max(0, v));
  var mix = (a, b, t) => t <= 0 ? a : t >= 1 ? b : a + (b - a) * t;
  var sm = (v, a, b) => {
    const t = clamp((v - a) / (b - a));
    return clamp(t * t * t * (t * (t * 6 - 15) + 10));
  };
  var out = (v, a, b) => clamp(1 - Math.pow(1 - clamp((v - a) / (b - a)), 3));
  var color = (a, b, t) => {
    if (a === "none") a = b === "none" ? "#ffffff" : b;
    if (b === "none") b = a;
    const aa = parseInt(a.slice(1), 16), bb = parseInt(b.slice(1), 16);
    return "#" + [16, 8, 0].map((n) => Math.round(mix(aa >> n & 255, bb >> n & 255, t)).toString(16).padStart(2, "0")).join("");
  };
  function blend(a, b, t) {
    if (typeof a === "number" && typeof b === "number") return mix(a, b, t);
    if (typeof a === "string" && typeof b === "string") return a.startsWith("#") || a === "none" ? color(a, b, t) : t < 0.5 ? a : b;
    if (Array.isArray(a)) return a.map((x, i) => blend(x, b[i], t));
    if (a && typeof a === "object") return Object.fromEntries(Object.keys(a).map((k) => [k, blend(a[k], b[k], t)]));
    return a;
  }
  var beats = timeline_default.materialIntro;
  var cards = [{ x: 390, y: 707, r: -5, bg: "#f1e6d8", asset: "spark-clay-v4.png" }, { x: 720, y: 683, r: 0, bg: "#fffdf7", asset: "spark-editorial-v3.png" }, { x: 1050, y: 707, r: 5, bg: "#e6edf0", asset: "spark-glass-v3.png" }];
  function cardReveal(t, i) {
    const start = beats.reveal.cardStarts[i];
    return sm(t, start, start + beats.reveal.cardDuration);
  }
  function c2CardPose(t, i) {
    const c = cards[i], start = beats.reveal.cardStarts[i], e = out(t, start, start + beats.reveal.cardDuration), fly = sm(t, beats.flyStart, beats.flyEnd), idle = sm(t, beats.idleStart, beats.idleReady) * e * (1 - fly);
    return { x: c.x + Math.sin(t * 1.7 + i * 2.1) * 1.5 * idle, y: c.y + 26 * (1 - e) + Math.sin(t * 1.45 + i * 2.1) * 2 * idle, r: c.r * mix(0.6, 1, e) + Math.sin(t * 1.35 + i * 2.1) * 0.42 * idle };
  }
  function c2HeroAt(t, target) {
    const p = c2CardPose(t, 2), q = sm(t, beats.flyStart, beats.flyEnd);
    return { x: mix(p.x, target.x, q), y: mix(p.y, target.y, q), size: mix(254, target.size, q), angle: p.r * (1 - q), progress: q, reveal: cardReveal(t, 2) };
  }
  function stateAt(t) {
    let a = 0, b = 0, p = 0, raw = 0;
    if (t >= timeline_default.intro) {
      a = Math.min(11, Math.floor((t - timeline_default.intro) / timeline_default.section));
      b = a;
      const next = timeline_default.intro + (a + 1) * timeline_default.section;
      if (a < 11 && t > next - timeline_default.morph) {
        b = a + 1;
        raw = clamp((t - next + timeline_default.morph) / timeline_default.morph);
        p = sm(raw, 0, 1);
      }
    }
    const page = pages[a];
    const opening = sm(t, timeline_default.title.morphStart, timeline_default.title.morphEnd);
    const closing = sm(t, timeline_default.outroStart, 42.47);
    const scale = mix(1, 318 / 1440, closing), x = mix(0, 1074, closing), y = mix(0, 684, closing);
    const hero = blend(pages[a].hero, pages[b].hero, sm(raw, 0.22, 0.77));
    if (t < timeline_default.intro) {
      const h = c2HeroAt(t, pages[0].hero);
      hero.x = h.x;
      hero.y = h.y;
      hero.size = h.size;
    }
    return { a, b, p: sm(raw, 0.15, 0.85), layoutPhase: p, raw, page, opening, closing, scale, x, y, hero, t, grid: sm(t, 41.7, 42.47) };
  }
  function pageOpacity(raw, stable, incoming) {
    return stable ? 1 : incoming ? sm(raw, 0.54, 1) : 1 - sm(raw, 0, 0.46);
  }
  var import_jsx_runtime = __toESM(require_jsx_runtime());
  function RedesignTreatment({ p, uid }) {
    if (p.revision !== 9) return null;
    if (p.id === "clay") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `clay-${uid}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#eedbf7" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#b99dcd" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", { id: `clay-shadow-${uid}`, x: "-40%", y: "-150%", width: "180%", height: "400%", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", { stdDeviation: "13" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: "720", cy: "748", rx: "212", ry: "22", fill: "#c9b4d6", opacity: ".28", filter: `url(#clay-shadow-${uid})` }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "500", y: "704", width: "440", height: "48", rx: "24", fill: `url(#clay-${uid})` }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: "720", cy: "705", rx: "220", ry: "34", fill: "#f2e1f7", stroke: "#fff7ff", strokeWidth: "2" })
    ] });
    if (p.id === "cyber") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: `cyber-halo-${uid}`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#8e49ec", stopOpacity: ".26" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#8e49ec", stopOpacity: "0" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", { id: `cyber-window-${uid}`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M784 194H1312L1362 244V654L1326 690H782L746 654V232Z" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M784 194H1312L1362 244V654L1326 690H782L746 654V232Z", fill: "#151a31", stroke: "#394160", strokeWidth: "1.5" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { clipPath: `url(#cyber-window-${uid})`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: "1055", cy: "444", rx: "315", ry: "270", fill: `url(#cyber-halo-${uid})` }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { stroke: "#88a4c9", strokeWidth: "1", opacity: ".12", children: [
          [280, 360, 440, 520, 600, 680].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: `M746 ${y}H1362` }, y)),
          [794, 878, 962, 1046, 1130, 1214, 1298].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: `M${x} 194V690` }, x))
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M784 194H985M1362 488V654L1326 690H1210", fill: "none", stroke: "#82eadc", strokeWidth: "2.5" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M746 340V232L784 194", fill: "none", stroke: "#9b67ed", strokeWidth: "2.5" })
    ] });
    if (p.id === "y2k") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `chrome-${uid}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#ffffff" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".22", stopColor: "#dad6eb" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".47", stopColor: "#a9a2c1" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".51", stopColor: "#fdfdff" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".78", stopColor: "#eee8f7" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#bfc8df" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `chrome-inside-${uid}`, x1: "0", y1: "0", x2: "1", y2: "1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#d8d1ea" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".45", stopColor: "#f6e9f5" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#d6e9f6" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "238", y: "270", width: "964", height: "274", rx: "137", fill: `url(#chrome-${uid})`, stroke: "#fff", strokeWidth: "2" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "251", y: "283", width: "938", height: "248", rx: "124", fill: `url(#chrome-inside-${uid})`, stroke: "#b1aec7", strokeWidth: "1.3" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M390 286H1050", stroke: "#ffffff", strokeWidth: "3", strokeLinecap: "round", opacity: ".8" })
    ] });
    return null;
  }
  var import_jsx_runtime2 = __toESM(require_jsx_runtime());
  var fonts = { cjk: "StyleSans", serif: "StyleSerif", mono: "Menlo,StyleSans" };
  var measure = null;
  function T({ pose, p, children, color: fill, weight }) {
    if (!measure && typeof document !== "undefined") measure = document.createElement("canvas").getContext("2d");
    const content = String(children), family = fonts[pose.font ?? p.font], italic = (pose.italic ?? p.italic) > 0.5;
    if (measure) measure.font = `${italic ? "italic " : ""}${weight ?? pose.weight} ${pose.size}px ${family}`;
    const width = (measure?.measureText(content).width ?? content.length * pose.size) + pose.spacing * (content.length - 1);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("text", { "data-web-text": "true", x: pose.x - width * pose.anchor, y: pose.y, fontSize: pose.size, letterSpacing: pose.spacing, fontWeight: weight ?? pose.weight, fill: fill ?? p.ink, fontFamily: family, fontStyle: italic ? "italic" : "normal", transform: `rotate(${pose.angle} ${pose.x} ${pose.y})`, children });
  }
  function WebPage({ p, index, showIcon = false, uid = "main" }) {
    const btn = p.button;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { "data-web-layout": p.id, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("defs", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pattern", { id: `paper-${uid}`, patternUnits: "userSpaceOnUse", width: "1440", height: "1080", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("image", { href: staticFile("paper.png"), width: "1440", height: "1080" }) }),
        p.soften.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("filter", { id: `soft-${uid}-${i}`, x: "-50%", y: "-50%", width: "200%", height: "200%", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("feGaussianBlur", { stdDeviation: n }) }, i)),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("linearGradient", { id: `wash-${uid}`, x1: "0", y1: "0", x2: "1", y2: "1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { stopColor: p.bg }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "1", stopColor: p.wash.color })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("linearGradient", { id: `shine-${uid}`, x1: "0", y1: "0", x2: "1", y2: "1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { stopColor: "#fff", stopOpacity: ".75" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: ".55", stopColor: "#ffffff", stopOpacity: "0" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "1", stopColor: "#ffffff", stopOpacity: ".34" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { width: "1440", height: "864", fill: p.bg }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { width: "1440", height: "864", fill: `url(#wash-${uid})`, opacity: p.wash.amount }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { width: "1440", height: "864", fill: `url(#paper-${uid})`, opacity: p.paper }),
      p.shapes.map((v, k) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: v.x, y: v.y, width: v.w, height: v.h, rx: Math.min(v.r, v.w / 2, v.h / 2), fill: v.fill, stroke: v.stroke, strokeWidth: v.sw, opacity: v.opacity, filter: `url(#soft-${uid}-${k})` }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: v.x, y: v.y, width: v.w, height: v.h, rx: v.r, fill: `url(#shine-${uid})`, opacity: p.shine[k] })
      ] }, k)),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RedesignTreatment, { p, uid }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("line", { x1: p.line.x, y1: p.line.y, x2: p.line.x + p.line.w, y2: p.line.y, stroke: p.line.color, strokeWidth: p.line.sw }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { pose: p.brand, p, children: "\u590F\u590F\u7684AI\u7075\u611F" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { pose: p.nav, p, weight: 400, children: "\u77E5\u8BC6\u3000\u4F5C\u54C1\u3000\u63D0\u793A\u8BCD" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { pose: p.title[0], p, color: p.titleInk, children: "\u628A\u7075\u611F" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { pose: p.title[1], p, color: p.titleInk, children: "\u505A\u6210\u4F5C\u54C1" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { pose: p.desc, p, color: p.muted, children: "\u7528 AI\uFF0C\u628A\u8111\u6D77\u91CC\u7684\u60F3\u6CD5\u505A\u51FA\u6765\u3002" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { "data-web-button": "true", children: [
        p.revision === 9 && p.id === "cyber" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: `M${btn.x} ${btn.y}H${btn.x + btn.w - 18}L${btn.x + btn.w} ${btn.y + 18}V${btn.y + btn.h}H${btn.x + 18}L${btn.x} ${btn.y + btn.h - 18}Z`, fill: btn.fill }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: btn.x, y: btn.y, width: btn.w, height: btn.h, rx: Math.min(btn.r, btn.w / 2, btn.h / 2), fill: btn.fill, stroke: btn.stroke, strokeWidth: btn.sw, opacity: btn.opacity }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("text", { x: btn.x + btn.w / 2, y: btn.y + btn.h / 2 + 9, textAnchor: "middle", fontFamily: "StyleSans", fontSize: Math.min(28, btn.h * 0.43), fontWeight: "600", fill: p.buttonInk, children: "\u770B\u4F5C\u54C1 \u2197" })
      ] }),
      showIcon ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("image", { href: staticFile(assetNames[index]), x: p.hero.x - p.hero.size / 2, y: p.hero.y - p.hero.size / 2, width: p.hero.size, height: p.hero.size }) : null
    ] });
  }
  function PageStage({ t }) {
    const s = stateAt(t);
    if (t < 2.6 || t >= 42.47) return null;
    const visible = sm(t, 2.6, 3.6) * (1 - sm(t, 41.4, 41.87));
    const items = s.a === s.b ? [s.a] : [s.a, s.b];
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { "data-page-stage": "true", width: "1440", height: "1080", style: { position: "absolute", inset: 0 }, children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("g", { "data-page-layer": i, opacity: visible * pageOpacity(s.raw, s.a === s.b, i === s.b), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(WebPage, { p: pages[i], index: i, uid: `page-${i}` }) }, i)) });
  }
  var materialletters_v16_default = { c1Top: [{ c: "\u7ED9", x: 113.8, y: 380, d: "M88.62 -119.42C85.68 -113.54 84.14 -110.74 81.76 -107.24C78.96 -103.18 73.92 -96.88 71.12 -94.08C67.34 -90.16 59.64 -84.14 55.02 -81.34L42.14 -87.5C39.34 -82.04 37.66 -78.82 35.28 -74.76C33.04 -74.62 29.12 -74.48 23.66 -74.34C25.06 -76.3 33.32 -91.28 35.14 -95.2C40.46 -106.12 40.46 -106.12 43.4 -111.02L27.44 -117.46C23.52 -105.56 23.52 -105.42 20.02 -97.3C17.22 -90.86 16.38 -89.46 11.48 -80.5C7.84 -76.02 7.28 -75.46 4.2 -74.48L6.72 -59.92C11.34 -60.34 19.6 -61.04 26.04 -61.46C20.86 -55.02 17.92 -51.52 14.28 -47.6L12.88 -46.06C10.78 -44.1 9.94 -43.68 5.6 -42.14L8.82 -26.88C11.2 -27.3 11.2 -27.3 13.72 -27.58C17.92 -28 18.62 -28.14 26.18 -29.12C42.28 -31.22 42.28 -31.22 53.2 -33.04L54.32 -47.46C45.5 -45.92 41.16 -45.22 39.34 -45.08C35.14 -44.52 31.5 -43.96 28.56 -43.54C37.94 -53.2 47.74 -65.94 53.06 -75.32C55.44 -72.38 56.42 -70.7 58.66 -65.8C63.28 -68.74 64.68 -69.86 67.2 -71.82V-62.16C71.12 -62.58 73.92 -62.72 79.8 -62.72H108.5C114.66 -62.72 117.46 -62.58 121.1 -62.16V-71.26C123.9 -69.3 125.44 -68.18 130.34 -65.1C133 -71.82 134.54 -74.48 138.18 -78.96C131.32 -82.6 124.32 -87.64 118.16 -92.82C111.3 -98.84 107.24 -103.18 101.08 -111.3C101.5 -112 101.78 -112.56 102.9 -114.38C103.18 -114.8 103.6 -115.36 104.16 -116.34ZM78.68 -75.88C75.18 -75.88 74.48 -75.88 73.5 -75.88C72.8 -76.02 72.8 -76.02 72.24 -76.02C82.04 -84.7 86.8 -90.02 92.96 -98.98C98.98 -90.44 105.14 -84 112.7 -77.84C113.26 -77.42 114.1 -76.72 115.08 -75.88C113.96 -75.88 112.98 -75.88 109.76 -75.88ZM76.72 3.36H112.14V11.2H127.82C127.4 7.56 127.12 1.96 127.12 -4.76V-37.66C127.12 -43.82 127.26 -46.34 127.68 -50.26C124.46 -49.98 121.52 -49.84 116.2 -49.84H73.78C68.46 -49.84 66.64 -49.84 61.74 -50.26C62.16 -46.2 62.3 -44.1 62.3 -37.52V-3.22C62.3 1.4 62.02 5.88 61.6 11.2H76.72ZM76.72 -36.82H112.28V-10.08H76.72ZM55.02 -21.7C45.64 -19.04 38.22 -17.08 26.32 -14.28C16.1 -11.9 12.88 -11.34 5.88 -10.92L9.94 5.88C12.88 4.76 14.28 4.34 17.36 3.5C37.38 -1.54 42.56 -2.94 54.88 -7Z", bounds: [4.2, -119.42000000000002, 138.18, 11.200000000000001] }, { c: "A", x: 253.8, y: 380, d: "M111.58 1.68C109.62 -1.96 107.94 -5.88 104.44 -14.84L73.36 -95.62C70.14 -104.16 69.3 -106.4 68.6 -109.76H44.24C43.54 -106.12 42.42 -102.62 39.76 -95.62L8.96 -14.84C6.44 -8.4 3.64 -2.1 1.54 1.68H24.5C25.62 -4.2 26.18 -6.3 28.7 -13.02L34.3 -28.28H79.1L84.7 -13.02C86.24 -8.96 87.78 -2.94 88.62 1.68ZM74.06 -44.38H39.34L53.9 -85.82C54.32 -87.08 54.32 -87.08 56.56 -93.66C58.1 -89.04 58.52 -87.36 59.08 -85.82Z", bounds: [1.54, -109.76, 111.58000000000001, 1.6800000000000002] }, { c: "I", x: 366.92, y: 380, d: "M9.94 -109.76C10.78 -104.16 11.06 -100.38 11.06 -91.7V-16.38C11.06 -8.12 10.78 -3.64 9.94 1.68H31.22C30.38 -3.64 30.1 -8.12 30.1 -16.38V-91.7C30.1 -100.1 30.38 -104.44 31.22 -109.76Z", bounds: [9.940000000000001, -109.76, 31.220000000000002, 1.6800000000000002] }], c1Bottom: [{ c: "\u6362", x: 113.38, y: 556, d: "M43.296 -87.12C40.656 -86.856 37.884 -86.724 34.848 -86.724H33.528V-97.548C33.528 -104.412 33.66 -107.184 34.188 -111.012H18.876C19.536 -106.524 19.668 -103.488 19.668 -97.416V-86.724H14.916C11.22 -86.724 9.108 -86.856 5.94 -87.384V-73.392C9.504 -73.788 11.748 -73.92 14.784 -73.92H19.668V-48.576C10.164 -45.936 8.712 -45.54 4.62 -45.144L6.6 -30.756C8.976 -31.68 8.976 -31.68 19.668 -35.112V-6.6C19.668 -3.696 19.008 -3.036 16.104 -3.036C13.2 -3.036 10.692 -3.168 5.412 -3.828C7.392 1.584 7.92 3.828 8.316 9.504C12.276 9.768 15.048 9.9 17.16 9.9C30.096 9.9 33.528 7.26 33.528 -2.904V-40.128L43.164 -43.956V-57.024C38.544 -55.176 36.96 -54.648 33.528 -53.328V-73.92H34.98C36.036 -73.92 39.996 -73.656 43.296 -73.392V-78.672C45.276 -76.956 48.048 -73.92 50.688 -70.752V-42.636C47.124 -42.636 45.012 -42.636 42.768 -42.9V-29.172C46.728 -29.7 50.424 -29.832 56.628 -29.832H71.676C67.452 -22.176 63.756 -17.688 57.42 -12.672C50.82 -7.524 44.88 -4.488 35.112 -1.452C38.676 2.772 40.524 5.808 42.9 11.352C53.988 7.128 60.456 3.3 67.584 -3.036C73.92 -8.712 78.144 -14.124 83.16 -23.1C87.648 -15.048 91.872 -9.636 98.604 -3.564C105.996 3.3 112.464 7.26 122.76 11.748C123.948 7.656 125.004 5.544 128.04 0.66C128.832 -0.66 128.964 -0.924 129.492 -1.716C119.856 -5.412 114.048 -8.712 107.052 -14.388C101.112 -19.272 97.416 -23.496 93.192 -29.832H115.5C125.004 -29.832 125.004 -29.832 128.172 -29.304V-43.428C125.136 -42.9 121.572 -42.636 116.82 -42.636V-64.548C116.82 -70.488 116.952 -73.128 117.348 -77.484C113.388 -77.088 111.408 -76.956 105.864 -76.956H96.624C103.62 -87.12 106.392 -91.212 107.184 -92.532C109.032 -95.568 109.692 -96.492 110.748 -97.812L104.28 -104.544C101.64 -104.148 99.528 -104.016 94.776 -104.016H78.54C79.2 -105.204 79.2 -105.204 79.332 -105.6C79.464 -105.996 79.464 -105.996 79.86 -106.524C79.86 -106.656 79.992 -106.788 80.124 -107.052C80.256 -107.184 80.256 -107.316 80.256 -107.316C80.52 -107.712 80.52 -107.712 80.652 -107.976C81.18 -109.032 81.444 -109.428 81.972 -110.616L66.66 -112.2C65.34 -107.052 64.284 -104.544 60.984 -99.66C55.44 -91.212 50.424 -85.8 43.296 -80.256ZM60.192 -76.956C65.604 -82.5 68.772 -86.592 72.204 -92.4H91.212C87.516 -86.46 83.82 -80.916 80.652 -76.956ZM89.496 -42.636C89.628 -45.144 89.76 -51.744 90.024 -65.34H104.28V-42.636ZM76.956 -65.34C76.692 -54.12 76.428 -46.464 76.296 -42.636H63.492V-65.34Z", bounds: [4.62, -112.2, 129.49200000000002, 11.748000000000001] }, { c: "\u4E2A", x: 245.38, y: 556, d: "M59.268 -111.804C55.968 -105.204 51.876 -99.264 47.52 -94.248C41.316 -87.252 32.736 -80.124 24.288 -74.712C15.84 -69.3 12.672 -67.716 3.036 -63.492C7.392 -59.136 10.692 -54.384 12.54 -49.5C20.46 -53.724 34.452 -62.964 42.768 -69.564C52.932 -77.748 57.42 -82.368 65.34 -92.796C72.204 -84.084 75.108 -81.048 83.82 -73.128C93.984 -64.02 106.92 -55.44 119.856 -49.368C125.004 -59.928 125.4 -60.72 128.436 -63.624C120.516 -66.924 116.82 -68.64 112.464 -71.148C105.336 -75.504 96.756 -81.312 92.664 -84.876C87.12 -89.496 79.596 -97.416 73.26 -105.072C74.052 -106.392 74.316 -107.052 75.372 -108.9ZM73.92 10.164C73.26 5.148 72.996 0.396 72.996 -5.544V-57.948C72.996 -64.68 73.26 -68.376 73.788 -72.6H56.892C57.552 -68.112 57.816 -63.624 57.816 -58.08V-5.412C57.816 0.396 57.552 5.28 56.892 10.164Z", bounds: [3.036, -111.804, 128.436, 10.164] }, { c: "\u5BA1", x: 377.38, y: 556, d: "M22.968 -101.112C16.236 -101.112 12.804 -101.244 8.448 -101.64C8.844 -98.34 8.976 -96.228 8.976 -91.872V-87.12C8.976 -82.5 8.844 -80.388 8.448 -77.22H23.1V-88.308H109.032V-77.22H123.684C123.288 -80.652 123.156 -82.764 123.156 -86.988V-91.872C123.156 -96.36 123.288 -98.472 123.684 -101.64C119.328 -101.244 115.896 -101.112 109.164 -101.112H73.128C71.28 -105.468 70.092 -107.712 66.66 -113.52L51.612 -108.108C53.988 -104.676 54.912 -103.224 55.968 -101.112ZM58.212 -15.312V-1.452C58.212 3.696 58.08 6.072 57.42 11.088H73.392C72.6 6.996 72.468 4.356 72.468 -1.452V-15.312H100.056V-7.92H114.84C114.444 -10.692 114.18 -14.916 114.18 -21.516V-61.38C114.18 -67.188 114.444 -71.016 114.84 -73.788C109.56 -73.524 107.052 -73.392 100.848 -73.392H72.468V-75.372C72.468 -79.596 72.6 -80.916 73.392 -84.612H57.42C58.212 -80.652 58.212 -79.992 58.212 -74.976V-73.392H30.624C25.212 -73.392 22.44 -73.524 17.16 -73.788C17.556 -71.016 17.82 -67.056 17.82 -61.248V-21.516C17.82 -15.18 17.556 -10.824 17.16 -7.92H31.812V-15.312ZM58.212 -61.248V-50.16H31.812V-61.248ZM72.468 -61.248H100.056V-50.16H72.468ZM58.212 -38.676V-26.928H31.812V-38.676ZM72.468 -38.676H100.056V-26.928H72.468Z", bounds: [8.448, -113.52000000000001, 123.68400000000001, 11.088000000000001] }, { c: "\u7F8E", x: 509.38, y: 556, d: "M107.58 -23.232C113.52 -23.232 118.404 -22.968 122.76 -22.44V-36.036C118.668 -35.508 114.972 -35.376 108.636 -35.376H70.752C71.28 -37.224 71.544 -38.808 72.204 -42.504L57.024 -43.428C56.628 -39.468 56.364 -37.62 55.836 -35.376H23.364C17.556 -35.376 13.596 -35.508 9.24 -36.036V-22.44C13.728 -22.968 18.48 -23.232 24.42 -23.232H49.896C40.788 -11.748 26.4 -5.28 5.676 -3.3C9.504 3.168 10.692 5.676 12.144 11.088C29.964 7.656 38.676 4.488 47.388 -1.32C55.044 -6.468 61.116 -12.804 64.68 -19.404C70.488 -10.956 77.352 -4.752 86.592 0.396C95.964 5.676 105.204 8.712 120.516 11.352C121.836 5.148 122.892 2.376 126.456 -3.696C114.444 -4.62 107.316 -5.94 99 -9.372C90.816 -12.54 83.688 -17.292 78.54 -23.232ZM57.156 -97.02C54.12 -102.564 51.744 -106.392 47.388 -112.2L34.188 -107.58C36.96 -104.544 39.336 -101.376 41.976 -97.02H26.4C20.592 -97.02 16.5 -97.284 12.276 -97.812V-84.612C16.236 -85.008 20.46 -85.272 26.4 -85.272H58.08V-77.088H29.832C24.156 -77.088 21.516 -77.22 17.952 -77.748V-64.944C21.648 -65.472 24.684 -65.604 29.832 -65.604H58.08V-57.156H21.78C16.104 -57.156 11.748 -57.42 7.656 -57.948V-44.352C12.012 -44.88 16.368 -45.144 21.78 -45.144H110.352C116.688 -45.144 120.384 -45.012 124.344 -44.352V-57.948C120.516 -57.42 116.556 -57.156 110.352 -57.156H72.336V-65.604H102.3C107.448 -65.604 110.352 -65.472 114.048 -64.944V-77.748C110.484 -77.22 107.712 -77.088 102.3 -77.088H72.336V-85.272H105.6C111.54 -85.272 115.764 -85.008 119.724 -84.612V-97.812C115.764 -97.284 111.804 -97.02 105.6 -97.02H89.232C92.4 -101.112 94.644 -104.148 97.02 -107.844L82.632 -111.54C80.124 -105.996 77.088 -101.112 74.052 -97.02Z", bounds: [5.676, -112.2, 126.456, 11.352] }], c2Title: [{ c: "\u7ED9", x: 287.68100000000004, y: 341, d: "M89.886 -121.126C86.904 -115.162 85.342 -112.322 82.928 -108.772C80.088 -104.654 74.976 -98.264 72.136 -95.424C68.302 -91.448 60.492 -85.342 55.806 -82.502L42.742 -88.75C39.902 -83.212 38.198 -79.946 35.784 -75.828C33.512 -75.686 29.536 -75.544 23.998 -75.402C25.418 -77.39 33.796 -92.584 35.642 -96.56C41.038 -107.636 41.038 -107.636 44.02 -112.606L27.832 -119.138C23.856 -107.068 23.856 -106.926 20.306 -98.69C17.466 -92.158 16.614 -90.738 11.644 -81.65C7.952 -77.106 7.384 -76.538 4.26 -75.544L6.816 -60.776C11.502 -61.202 19.88 -61.912 26.412 -62.338C21.158 -55.806 18.176 -52.256 14.484 -48.28L13.064 -46.718C10.934 -44.73 10.082 -44.304 5.68 -42.742L8.946 -27.264C11.36 -27.69 11.36 -27.69 13.916 -27.974C18.176 -28.4 18.886 -28.542 26.554 -29.536C42.884 -31.666 42.884 -31.666 53.96 -33.512L55.096 -48.138C46.15 -46.576 41.748 -45.866 39.902 -45.724C35.642 -45.156 31.95 -44.588 28.968 -44.162C38.482 -53.96 48.422 -66.882 53.818 -76.396C56.232 -73.414 57.226 -71.71 59.498 -66.74C64.184 -69.722 65.604 -70.858 68.16 -72.846V-63.048C72.136 -63.474 74.976 -63.616 80.94 -63.616H110.05C116.298 -63.616 119.138 -63.474 122.83 -63.048V-72.278C125.67 -70.29 127.232 -69.154 132.202 -66.03C134.9 -72.846 136.462 -75.544 140.154 -80.088C133.196 -83.78 126.096 -88.892 119.848 -94.146C112.89 -100.252 108.772 -104.654 102.524 -112.89C102.95 -113.6 103.234 -114.168 104.37 -116.014C104.654 -116.44 105.08 -117.008 105.648 -118.002ZM79.804 -76.964C76.254 -76.964 75.544 -76.964 74.55 -76.964C73.84 -77.106 73.84 -77.106 73.272 -77.106C83.212 -85.91 88.04 -91.306 94.288 -100.394C100.394 -91.732 106.642 -85.2 114.31 -78.952C114.878 -78.526 115.73 -77.816 116.724 -76.964C115.588 -76.964 114.594 -76.964 111.328 -76.964ZM77.816 3.408H113.742V11.36H129.646C129.22 7.668 128.936 1.988 128.936 -4.828V-38.198C128.936 -44.446 129.078 -47.002 129.504 -50.978C126.238 -50.694 123.256 -50.552 117.86 -50.552H74.834C69.438 -50.552 67.592 -50.552 62.622 -50.978C63.048 -46.86 63.19 -44.73 63.19 -38.056V-3.266C63.19 1.42 62.906 5.964 62.48 11.36H77.816ZM77.816 -37.346H113.884V-10.224H77.816ZM55.806 -22.01C46.292 -19.312 38.766 -17.324 26.696 -14.484C16.33 -12.07 13.064 -11.502 5.964 -11.076L10.082 5.964C13.064 4.828 14.484 4.402 17.608 3.55C37.914 -1.562 43.168 -2.982 55.664 -7.1Z", bounds: [4.26, -121.12599999999999, 140.154, 11.36] }, { c: "A", x: 429.68100000000004, y: 341, d: "M113.174 1.704C111.186 -1.988 109.482 -5.964 105.932 -15.052L74.408 -96.986C71.142 -105.648 70.29 -107.92 69.58 -111.328H44.872C44.162 -107.636 43.026 -104.086 40.328 -96.986L9.088 -15.052C6.532 -8.52 3.692 -2.13 1.562 1.704H24.85C25.986 -4.26 26.554 -6.39 29.11 -13.206L34.79 -28.684H80.23L85.91 -13.206C87.472 -9.088 89.034 -2.982 89.886 1.704ZM75.118 -45.014H39.902L54.67 -87.046C55.096 -88.324 55.096 -88.324 57.368 -94.998C58.93 -90.312 59.356 -88.608 59.924 -87.046Z", bounds: [1.5619999999999998, -111.32799999999999, 113.17399999999999, 1.7039999999999997] }, { c: "I", x: 544.417, y: 341, d: "M10.082 -111.328C10.934 -105.648 11.218 -101.814 11.218 -93.01V-16.614C11.218 -8.236 10.934 -3.692 10.082 1.704H31.666C30.814 -3.692 30.53 -8.236 30.53 -16.614V-93.01C30.53 -101.53 30.814 -105.932 31.666 -111.328Z", bounds: [10.081999999999999, -111.32799999999999, 31.665999999999997, 1.7039999999999997] }, { c: "\u6362", x: 586.023, y: 341, d: "M46.576 -93.72C43.736 -93.436 40.754 -93.294 37.488 -93.294H36.068V-104.938C36.068 -112.322 36.21 -115.304 36.778 -119.422H20.306C21.016 -114.594 21.158 -111.328 21.158 -104.796V-93.294H16.046C12.07 -93.294 9.798 -93.436 6.39 -94.004V-78.952C10.224 -79.378 12.638 -79.52 15.904 -79.52H21.158V-52.256C10.934 -49.416 9.372 -48.99 4.97 -48.564L7.1 -33.086C9.656 -34.08 9.656 -34.08 21.158 -37.772V-7.1C21.158 -3.976 20.448 -3.266 17.324 -3.266C14.2 -3.266 11.502 -3.408 5.822 -4.118C7.952 1.704 8.52 4.118 8.946 10.224C13.206 10.508 16.188 10.65 18.46 10.65C32.376 10.65 36.068 7.81 36.068 -3.124V-43.168L46.434 -47.286V-61.344C41.464 -59.356 39.76 -58.788 36.068 -57.368V-79.52H37.63C38.766 -79.52 43.026 -79.236 46.576 -78.952V-84.632C48.706 -82.786 51.688 -79.52 54.528 -76.112V-45.866C50.694 -45.866 48.422 -45.866 46.008 -46.15V-31.382C50.268 -31.95 54.244 -32.092 60.918 -32.092H77.106C72.562 -23.856 68.586 -19.028 61.77 -13.632C54.67 -8.094 48.28 -4.828 37.772 -1.562C41.606 2.982 43.594 6.248 46.15 12.212C58.078 7.668 65.036 3.55 72.704 -3.266C79.52 -9.372 84.064 -15.194 89.46 -24.85C94.288 -16.188 98.832 -10.366 106.074 -3.834C114.026 3.55 120.984 7.81 132.06 12.638C133.338 8.236 134.474 5.964 137.74 0.71C138.592 -0.71 138.734 -0.994 139.302 -1.846C128.936 -5.822 122.688 -9.372 115.162 -15.478C108.772 -20.732 104.796 -25.276 100.252 -32.092H124.25C134.474 -32.092 134.474 -32.092 137.882 -31.524V-46.718C134.616 -46.15 130.782 -45.866 125.67 -45.866V-69.438C125.67 -75.828 125.812 -78.668 126.238 -83.354C121.978 -82.928 119.848 -82.786 113.884 -82.786H103.944C111.47 -93.72 114.452 -98.122 115.304 -99.542C117.292 -102.808 118.002 -103.802 119.138 -105.222L112.18 -112.464C109.34 -112.038 107.068 -111.896 101.956 -111.896H84.49C85.2 -113.174 85.2 -113.174 85.342 -113.6C85.484 -114.026 85.484 -114.026 85.91 -114.594C85.91 -114.736 86.052 -114.878 86.194 -115.162C86.336 -115.304 86.336 -115.446 86.336 -115.446C86.62 -115.872 86.62 -115.872 86.762 -116.156C87.33 -117.292 87.614 -117.718 88.182 -118.996L71.71 -120.7C70.29 -115.162 69.154 -112.464 65.604 -107.21C59.64 -98.122 54.244 -92.3 46.576 -86.336ZM64.752 -82.786C70.574 -88.75 73.982 -93.152 77.674 -99.4H98.122C94.146 -93.01 90.17 -87.046 86.762 -82.786ZM96.276 -45.866C96.418 -48.564 96.56 -55.664 96.844 -70.29H112.18V-45.866ZM82.786 -70.29C82.502 -58.22 82.218 -49.984 82.076 -45.866H68.302V-70.29Z", bounds: [4.97, -120.69999999999999, 139.302, 12.637999999999998] }, { c: "\u4E2A", x: 728.023, y: 341, d: "M63.758 -120.274C60.208 -113.174 55.806 -106.784 51.12 -101.388C44.446 -93.862 35.216 -86.194 26.128 -80.372C17.04 -74.55 13.632 -72.846 3.266 -68.302C7.952 -63.616 11.502 -58.504 13.49 -53.25C22.01 -57.794 37.062 -67.734 46.008 -74.834C56.942 -83.638 61.77 -88.608 70.29 -99.826C77.674 -90.454 80.798 -87.188 90.17 -78.668C101.104 -68.87 115.02 -59.64 128.936 -53.108C134.474 -64.468 134.9 -65.32 138.166 -68.444C129.646 -71.994 125.67 -73.84 120.984 -76.538C113.316 -81.224 104.086 -87.472 99.684 -91.306C93.72 -96.276 85.626 -104.796 78.81 -113.032C79.662 -114.452 79.946 -115.162 81.082 -117.15ZM79.52 10.934C78.81 5.538 78.526 0.426 78.526 -5.964V-62.338C78.526 -69.58 78.81 -73.556 79.378 -78.1H61.202C61.912 -73.272 62.196 -68.444 62.196 -62.48V-5.822C62.196 0.426 61.912 5.68 61.202 10.934Z", bounds: [3.2659999999999996, -120.27399999999999, 138.166, 10.934] }, { c: "\u5BA1", x: 870.023, y: 341, d: "M24.708 -108.772C17.466 -108.772 13.774 -108.914 9.088 -109.34C9.514 -105.79 9.656 -103.518 9.656 -98.832V-93.72C9.656 -88.75 9.514 -86.478 9.088 -83.07H24.85V-94.998H117.292V-83.07H133.054C132.628 -86.762 132.486 -89.034 132.486 -93.578V-98.832C132.486 -103.66 132.628 -105.932 133.054 -109.34C128.368 -108.914 124.676 -108.772 117.434 -108.772H78.668C76.68 -113.458 75.402 -115.872 71.71 -122.12L55.522 -116.298C58.078 -112.606 59.072 -111.044 60.208 -108.772ZM62.622 -16.472V-1.562C62.622 3.976 62.48 6.532 61.77 11.928H78.952C78.1 7.526 77.958 4.686 77.958 -1.562V-16.472H107.636V-8.52H123.54C123.114 -11.502 122.83 -16.046 122.83 -23.146V-66.03C122.83 -72.278 123.114 -76.396 123.54 -79.378C117.86 -79.094 115.162 -78.952 108.488 -78.952H77.958V-81.082C77.958 -85.626 78.1 -87.046 78.952 -91.022H61.77C62.622 -86.762 62.622 -86.052 62.622 -80.656V-78.952H32.944C27.122 -78.952 24.14 -79.094 18.46 -79.378C18.886 -76.396 19.17 -72.136 19.17 -65.888V-23.146C19.17 -16.33 18.886 -11.644 18.46 -8.52H34.222V-16.472ZM62.622 -65.888V-53.96H34.222V-65.888ZM77.958 -65.888H107.636V-53.96H77.958ZM62.622 -41.606V-28.968H34.222V-41.606ZM77.958 -41.606H107.636V-28.968H77.958Z", bounds: [9.088, -122.11999999999999, 133.054, 11.927999999999999] }, { c: "\u7F8E", x: 1012.023, y: 341, d: "M115.73 -24.992C122.12 -24.992 127.374 -24.708 132.06 -24.14V-38.766C127.658 -38.198 123.682 -38.056 116.866 -38.056H76.112C76.68 -40.044 76.964 -41.748 77.674 -45.724L61.344 -46.718C60.918 -42.458 60.634 -40.47 60.066 -38.056H25.134C18.886 -38.056 14.626 -38.198 9.94 -38.766V-24.14C14.768 -24.708 19.88 -24.992 26.27 -24.992H53.676C43.878 -12.638 28.4 -5.68 6.106 -3.55C10.224 3.408 11.502 6.106 13.064 11.928C32.234 8.236 41.606 4.828 50.978 -1.42C59.214 -6.958 65.746 -13.774 69.58 -20.874C75.828 -11.786 83.212 -5.112 93.152 0.426C103.234 6.106 113.174 9.372 129.646 12.212C131.066 5.538 132.202 2.556 136.036 -3.976C123.114 -4.97 115.446 -6.39 106.5 -10.082C97.696 -13.49 90.028 -18.602 84.49 -24.992ZM61.486 -104.37C58.22 -110.334 55.664 -114.452 50.978 -120.7L36.778 -115.73C39.76 -112.464 42.316 -109.056 45.156 -104.37H28.4C22.152 -104.37 17.75 -104.654 13.206 -105.222V-91.022C17.466 -91.448 22.01 -91.732 28.4 -91.732H62.48V-82.928H32.092C25.986 -82.928 23.146 -83.07 19.312 -83.638V-69.864C23.288 -70.432 26.554 -70.574 32.092 -70.574H62.48V-61.486H23.43C17.324 -61.486 12.638 -61.77 8.236 -62.338V-47.712C12.922 -48.28 17.608 -48.564 23.43 -48.564H118.712C125.528 -48.564 129.504 -48.422 133.764 -47.712V-62.338C129.646 -61.77 125.386 -61.486 118.712 -61.486H77.816V-70.574H110.05C115.588 -70.574 118.712 -70.432 122.688 -69.864V-83.638C118.854 -83.07 115.872 -82.928 110.05 -82.928H77.816V-91.732H113.6C119.99 -91.732 124.534 -91.448 128.794 -91.022V-105.222C124.534 -104.654 120.274 -104.37 113.6 -104.37H95.992C99.4 -108.772 101.814 -112.038 104.37 -116.014L88.892 -119.99C86.194 -114.026 82.928 -108.772 79.662 -104.37Z", bounds: [6.106, -120.69999999999999, 136.036, 12.212] }], c3Top: [{ c: "\u7ED9", x: 114.88, y: 374, d: "M65.832 -88.712C63.648 -84.344 62.504 -82.264 60.736 -79.664C58.656 -76.648 54.912 -71.968 52.832 -69.888C50.024 -66.976 44.304 -62.504 40.872 -60.424L31.304 -65C29.224 -60.944 27.976 -58.552 26.208 -55.536C24.544 -55.432 21.632 -55.328 17.576 -55.224C18.616 -56.68 24.752 -67.808 26.104 -70.72C30.056 -78.832 30.056 -78.832 32.24 -82.472L20.384 -87.256C17.472 -78.416 17.472 -78.312 14.872 -72.28C12.792 -67.496 12.168 -66.456 8.528 -59.8C5.824 -56.472 5.408 -56.056 3.12 -55.328L4.992 -44.512C8.424 -44.824 14.56 -45.344 19.344 -45.656C15.496 -40.872 13.312 -38.272 10.608 -35.36L9.568 -34.216C8.008 -32.76 7.384 -32.448 4.16 -31.304L6.552 -19.968C8.32 -20.28 8.32 -20.28 10.192 -20.488C13.312 -20.8 13.832 -20.904 19.448 -21.632C31.408 -23.192 31.408 -23.192 39.52 -24.544L40.352 -35.256C33.8 -34.112 30.576 -33.592 29.224 -33.488C26.104 -33.072 23.4 -32.656 21.216 -32.344C28.184 -39.52 35.464 -48.984 39.416 -55.952C41.184 -53.768 41.912 -52.52 43.576 -48.88C47.008 -51.064 48.048 -51.896 49.92 -53.352V-46.176C52.832 -46.488 54.912 -46.592 59.28 -46.592H80.6C85.176 -46.592 87.256 -46.488 89.96 -46.176V-52.936C92.04 -51.48 93.184 -50.648 96.824 -48.36C98.8 -53.352 99.944 -55.328 102.648 -58.656C97.552 -61.36 92.352 -65.104 87.776 -68.952C82.68 -73.424 79.664 -76.648 75.088 -82.68C75.4 -83.2 75.608 -83.616 76.44 -84.968C76.648 -85.28 76.96 -85.696 77.376 -86.424ZM58.448 -56.368C55.848 -56.368 55.328 -56.368 54.6 -56.368C54.08 -56.472 54.08 -56.472 53.664 -56.472C60.944 -62.92 64.48 -66.872 69.056 -73.528C73.528 -67.184 78.104 -62.4 83.72 -57.824C84.136 -57.512 84.76 -56.992 85.488 -56.368C84.656 -56.368 83.928 -56.368 81.536 -56.368ZM56.992 2.496H83.304V8.32H94.952C94.64 5.616 94.432 1.456 94.432 -3.536V-27.976C94.432 -32.552 94.536 -34.424 94.848 -37.336C92.456 -37.128 90.272 -37.024 86.32 -37.024H54.808C50.856 -37.024 49.504 -37.024 45.864 -37.336C46.176 -34.32 46.28 -32.76 46.28 -27.872V-2.392C46.28 1.04 46.072 4.368 45.76 8.32H56.992ZM56.992 -27.352H83.408V-7.488H56.992ZM40.872 -16.12C33.904 -14.144 28.392 -12.688 19.552 -10.608C11.96 -8.84 9.568 -8.424 4.368 -8.112L7.384 4.368C9.568 3.536 10.608 3.224 12.896 2.6C27.768 -1.144 31.616 -2.184 40.768 -5.2Z", bounds: [3.1199999999999997, -88.71199999999999, 102.648, 8.32] }, { c: "A", x: 218.88, y: 374, d: "M82.888 1.248C81.432 -1.456 80.184 -4.368 77.584 -11.024L54.496 -71.032C52.104 -77.376 51.48 -79.04 50.96 -81.536H32.864C32.344 -78.832 31.512 -76.232 29.536 -71.032L6.656 -11.024C4.784 -6.24 2.704 -1.56 1.144 1.248H18.2C19.032 -3.12 19.448 -4.68 21.32 -9.672L25.48 -21.008H58.76L62.92 -9.672C64.064 -6.656 65.208 -2.184 65.832 1.248ZM55.016 -32.968H29.224L40.04 -63.752C40.352 -64.688 40.352 -64.688 42.016 -69.576C43.16 -66.144 43.472 -64.896 43.888 -63.752Z", bounds: [1.144, -81.536, 82.88799999999999, 1.248] }, { c: "I", x: 302.912, y: 374, d: "M7.384 -81.536C8.008 -77.376 8.216 -74.568 8.216 -68.12V-12.168C8.216 -6.032 8.008 -2.704 7.384 1.248H23.192C22.568 -2.704 22.36 -6.032 22.36 -12.168V-68.12C22.36 -74.36 22.568 -77.584 23.192 -81.536Z", bounds: [7.3839999999999995, -81.536, 23.192, 1.248] }, { c: "\u6362", x: 333.384, y: 374, d: "M34.112 -68.64C32.032 -68.432 29.848 -68.328 27.456 -68.328H26.416V-76.856C26.416 -82.264 26.52 -84.448 26.936 -87.464H14.872C15.392 -83.928 15.496 -81.536 15.496 -76.752V-68.328H11.752C8.84 -68.328 7.176 -68.432 4.68 -68.848V-57.824C7.488 -58.136 9.256 -58.24 11.648 -58.24H15.496V-38.272C8.008 -36.192 6.864 -35.88 3.64 -35.568L5.2 -24.232C7.072 -24.96 7.072 -24.96 15.496 -27.664V-5.2C15.496 -2.912 14.976 -2.392 12.688 -2.392C10.4 -2.392 8.424 -2.496 4.264 -3.016C5.824 1.248 6.24 3.016 6.552 7.488C9.672 7.696 11.856 7.8 13.52 7.8C23.712 7.8 26.416 5.72 26.416 -2.288V-31.616L34.008 -34.632V-44.928C30.368 -43.472 29.12 -43.056 26.416 -42.016V-58.24H27.56C28.392 -58.24 31.512 -58.032 34.112 -57.824V-61.984C35.672 -60.632 37.856 -58.24 39.936 -55.744V-33.592C37.128 -33.592 35.464 -33.592 33.696 -33.8V-22.984C36.816 -23.4 39.728 -23.504 44.616 -23.504H56.472C53.144 -17.472 50.232 -13.936 45.24 -9.984C40.04 -5.928 35.36 -3.536 27.664 -1.144C30.472 2.184 31.928 4.576 33.8 8.944C42.536 5.616 47.632 2.6 53.248 -2.392C58.24 -6.864 61.568 -11.128 65.52 -18.2C69.056 -11.856 72.384 -7.592 77.688 -2.808C83.512 2.6 88.608 5.72 96.72 9.256C97.656 6.032 98.488 4.368 100.88 0.52C101.504 -0.52 101.608 -0.728 102.024 -1.352C94.432 -4.264 89.856 -6.864 84.344 -11.336C79.664 -15.184 76.752 -18.512 73.424 -23.504H91C98.488 -23.504 98.488 -23.504 100.984 -23.088V-34.216C98.592 -33.8 95.784 -33.592 92.04 -33.592V-50.856C92.04 -55.536 92.144 -57.616 92.456 -61.048C89.336 -60.736 87.776 -60.632 83.408 -60.632H76.128C81.64 -68.64 83.824 -71.864 84.448 -72.904C85.904 -75.296 86.424 -76.024 87.256 -77.064L82.16 -82.368C80.08 -82.056 78.416 -81.952 74.672 -81.952H61.88C62.4 -82.888 62.4 -82.888 62.504 -83.2C62.608 -83.512 62.608 -83.512 62.92 -83.928C62.92 -84.032 63.024 -84.136 63.128 -84.344C63.232 -84.448 63.232 -84.552 63.232 -84.552C63.44 -84.864 63.44 -84.864 63.544 -85.072C63.96 -85.904 64.168 -86.216 64.584 -87.152L52.52 -88.4C51.48 -84.344 50.648 -82.368 48.048 -78.52C43.68 -71.864 39.728 -67.6 34.112 -63.232ZM47.424 -60.632C51.688 -65 54.184 -68.224 56.888 -72.8H71.864C68.952 -68.12 66.04 -63.752 63.544 -60.632ZM70.512 -33.592C70.616 -35.568 70.72 -40.768 70.928 -51.48H82.16V-33.592ZM60.632 -51.48C60.424 -42.64 60.216 -36.608 60.112 -33.592H50.024V-51.48Z", bounds: [3.6399999999999997, -88.39999999999999, 102.024, 9.256] }, { c: "\u4E2A", x: 437.384, y: 374, d: "M46.696 -88.088C44.096 -82.888 40.872 -78.208 37.44 -74.256C32.552 -68.744 25.792 -63.128 19.136 -58.864C12.48 -54.6 9.984 -53.352 2.392 -50.024C5.824 -46.592 8.424 -42.848 9.88 -39C16.12 -42.328 27.144 -49.608 33.696 -54.808C41.704 -61.256 45.24 -64.896 51.48 -73.112C56.888 -66.248 59.176 -63.856 66.04 -57.616C74.048 -50.44 84.24 -43.68 94.432 -38.896C98.488 -47.216 98.8 -47.84 101.192 -50.128C94.952 -52.728 92.04 -54.08 88.608 -56.056C82.992 -59.488 76.232 -64.064 73.008 -66.872C68.64 -70.512 62.712 -76.752 57.72 -82.784C58.344 -83.824 58.552 -84.344 59.384 -85.8ZM58.24 8.008C57.72 4.056 57.512 0.312 57.512 -4.368V-45.656C57.512 -50.96 57.72 -53.872 58.136 -57.2H44.824C45.344 -53.664 45.552 -50.128 45.552 -45.76V-4.264C45.552 0.312 45.344 4.16 44.824 8.008Z", bounds: [2.392, -88.088, 101.192, 8.008] }], c3Bottom: [{ c: "\u5BA1", x: 104.432, y: 620, d: "M36.888 -162.392C26.076 -162.392 20.564 -162.604 13.568 -163.24C14.204 -157.94 14.416 -154.548 14.416 -147.552V-139.92C14.416 -132.5 14.204 -129.108 13.568 -124.02H37.1V-141.828H175.112V-124.02H198.644C198.008 -129.532 197.796 -132.924 197.796 -139.708V-147.552C197.796 -154.76 198.008 -158.152 198.644 -163.24C191.648 -162.604 186.136 -162.392 175.324 -162.392H117.448C114.48 -169.388 112.572 -172.992 107.06 -182.32L82.892 -173.628C86.708 -168.116 88.192 -165.784 89.888 -162.392ZM93.492 -24.592V-2.332C93.492 5.936 93.28 9.752 92.22 17.808H117.872C116.6 11.236 116.388 6.996 116.388 -2.332V-24.592H160.696V-12.72H184.44C183.804 -17.172 183.38 -23.956 183.38 -34.556V-98.58C183.38 -107.908 183.804 -114.056 184.44 -118.508C175.96 -118.084 171.932 -117.872 161.968 -117.872H116.388V-121.052C116.388 -127.836 116.6 -129.956 117.872 -135.892H92.22C93.492 -129.532 93.492 -128.472 93.492 -120.416V-117.872H49.184C40.492 -117.872 36.04 -118.084 27.56 -118.508C28.196 -114.056 28.62 -107.696 28.62 -98.368V-34.556C28.62 -24.38 28.196 -17.384 27.56 -12.72H51.092V-24.592ZM93.492 -98.368V-80.56H51.092V-98.368ZM116.388 -98.368H160.696V-80.56H116.388ZM93.492 -62.116V-43.248H51.092V-62.116ZM116.388 -62.116H160.696V-43.248H116.388Z", bounds: [13.568, -182.32, 198.644, 17.808] }, { c: "\u7F8E", x: 316.432, y: 620, d: "M172.78 -37.312C182.32 -37.312 190.164 -36.888 197.16 -36.04V-57.876C190.588 -57.028 184.652 -56.816 174.476 -56.816H113.632C114.48 -59.784 114.904 -62.328 115.964 -68.264L91.584 -69.748C90.948 -63.388 90.524 -60.42 89.676 -56.816H37.524C28.196 -56.816 21.836 -57.028 14.84 -57.876V-36.04C22.048 -36.888 29.68 -37.312 39.22 -37.312H80.136C65.508 -18.868 42.4 -8.48 9.116 -5.3C15.264 5.088 17.172 9.116 19.504 17.808C48.124 12.296 62.116 7.208 76.108 -2.12C88.404 -10.388 98.156 -20.564 103.88 -31.164C113.208 -17.596 124.232 -7.632 139.072 0.636C154.124 9.116 168.964 13.992 193.556 18.232C195.676 8.268 197.372 3.816 203.096 -5.936C183.804 -7.42 172.356 -9.54 159 -15.052C145.856 -20.14 134.408 -27.772 126.14 -37.312ZM91.796 -155.82C86.92 -164.724 83.104 -170.872 76.108 -180.2L54.908 -172.78C59.36 -167.904 63.176 -162.816 67.416 -155.82H42.4C33.072 -155.82 26.5 -156.244 19.716 -157.092V-135.892C26.076 -136.528 32.86 -136.952 42.4 -136.952H93.28V-123.808H47.912C38.796 -123.808 34.556 -124.02 28.832 -124.868V-104.304C34.768 -105.152 39.644 -105.364 47.912 -105.364H93.28V-91.796H34.98C25.864 -91.796 18.868 -92.22 12.296 -93.068V-71.232C19.292 -72.08 26.288 -72.504 34.98 -72.504H177.232C187.408 -72.504 193.344 -72.292 199.704 -71.232V-93.068C193.556 -92.22 187.196 -91.796 177.232 -91.796H116.176V-105.364H164.3C172.568 -105.364 177.232 -105.152 183.168 -104.304V-124.868C177.444 -124.02 172.992 -123.808 164.3 -123.808H116.176V-136.952H169.6C179.14 -136.952 185.924 -136.528 192.284 -135.892V-157.092C185.924 -156.244 179.564 -155.82 169.6 -155.82H143.312C148.4 -162.392 152.004 -167.268 155.82 -173.204L132.712 -179.14C128.684 -170.236 123.808 -162.392 118.932 -155.82Z", bounds: [9.116, -180.2, 203.096, 18.232] }], c4Top: [{ c: "\u7ED9", x: 567.486, y: 425, d: "M93.684 -126.244C90.576 -120.028 88.948 -117.068 86.432 -113.368C83.472 -109.076 78.144 -102.416 75.184 -99.456C71.188 -95.312 63.048 -88.948 58.164 -85.988L44.548 -92.5C41.588 -86.728 39.812 -83.324 37.296 -79.032C34.928 -78.884 30.784 -78.736 25.012 -78.588C26.492 -80.66 35.224 -96.496 37.148 -100.64C42.772 -112.184 42.772 -112.184 45.88 -117.364L29.008 -124.172C24.864 -111.592 24.864 -111.444 21.164 -102.86C18.204 -96.052 17.316 -94.572 12.136 -85.1C8.288 -80.364 7.696 -79.772 4.44 -78.736L7.104 -63.344C11.988 -63.788 20.72 -64.528 27.528 -64.972C22.052 -58.164 18.944 -54.464 15.096 -50.32L13.616 -48.692C11.396 -46.62 10.508 -46.176 5.92 -44.548L9.324 -28.416C11.84 -28.86 11.84 -28.86 14.504 -29.156C18.944 -29.6 19.684 -29.748 27.676 -30.784C44.696 -33.004 44.696 -33.004 56.24 -34.928L57.424 -50.172C48.1 -48.544 43.512 -47.804 41.588 -47.656C37.148 -47.064 33.3 -46.472 30.192 -46.028C40.108 -56.24 50.468 -69.708 56.092 -79.624C58.608 -76.516 59.644 -74.74 62.012 -69.56C66.896 -72.668 68.376 -73.852 71.04 -75.924V-65.712C75.184 -66.156 78.144 -66.304 84.36 -66.304H114.7C121.212 -66.304 124.172 -66.156 128.02 -65.712V-75.332C130.98 -73.26 132.608 -72.076 137.788 -68.82C140.6 -75.924 142.228 -78.736 146.076 -83.472C138.824 -87.32 131.424 -92.648 124.912 -98.124C117.66 -104.488 113.368 -109.076 106.856 -117.66C107.3 -118.4 107.596 -118.992 108.78 -120.916C109.076 -121.36 109.52 -121.952 110.112 -122.988ZM83.176 -80.216C79.476 -80.216 78.736 -80.216 77.7 -80.216C76.96 -80.364 76.96 -80.364 76.368 -80.364C86.728 -89.54 91.76 -95.164 98.272 -104.636C104.636 -95.608 111.148 -88.8 119.14 -82.288C119.732 -81.844 120.62 -81.104 121.656 -80.216C120.472 -80.216 119.436 -80.216 116.032 -80.216ZM81.104 3.552H118.548V11.84H135.124C134.68 7.992 134.384 2.072 134.384 -5.032V-39.812C134.384 -46.324 134.532 -48.988 134.976 -53.132C131.572 -52.836 128.464 -52.688 122.84 -52.688H77.996C72.372 -52.688 70.448 -52.688 65.268 -53.132C65.712 -48.84 65.86 -46.62 65.86 -39.664V-3.404C65.86 1.48 65.564 6.216 65.12 11.84H81.104ZM81.104 -38.924H118.696V-10.656H81.104ZM58.164 -22.94C48.248 -20.128 40.404 -18.056 27.824 -15.096C17.02 -12.58 13.616 -11.988 6.216 -11.544L10.508 6.216C13.616 5.032 15.096 4.588 18.352 3.7C39.516 -1.628 44.992 -3.108 58.016 -7.4Z", bounds: [4.4399999999999995, -126.244, 146.076, 11.84] }, { c: "A", x: 715.486, y: 425, d: "M117.956 1.776C115.884 -2.072 114.108 -6.216 110.408 -15.688L77.552 -101.084C74.148 -110.112 73.26 -112.48 72.52 -116.032H46.768C46.028 -112.184 44.844 -108.484 42.032 -101.084L9.472 -15.688C6.808 -8.88 3.848 -2.22 1.628 1.776H25.9C27.084 -4.44 27.676 -6.66 30.34 -13.764L36.26 -29.896H83.62L89.54 -13.764C91.168 -9.472 92.796 -3.108 93.684 1.776ZM78.292 -46.916H41.588L56.98 -90.724C57.424 -92.056 57.424 -92.056 59.792 -99.012C61.42 -94.128 61.864 -92.352 62.456 -90.724Z", bounds: [1.628, -116.032, 117.95599999999999, 1.7759999999999998] }, { c: "I", x: 835.0699999999999, y: 425, d: "M10.508 -116.032C11.396 -110.112 11.692 -106.116 11.692 -96.94V-17.316C11.692 -8.584 11.396 -3.848 10.508 1.776H33.004C32.116 -3.848 31.82 -8.584 31.82 -17.316V-96.94C31.82 -105.82 32.116 -110.408 33.004 -116.032Z", bounds: [10.508, -116.032, 33.004, 1.7759999999999998] }], c4Bottom: [{ c: "\u6362", x: 436.49699999999996, y: 612, d: "M46.576 -93.72C43.736 -93.436 40.754 -93.294 37.488 -93.294H36.068V-104.938C36.068 -112.322 36.21 -115.304 36.778 -119.422H20.306C21.016 -114.594 21.158 -111.328 21.158 -104.796V-93.294H16.046C12.07 -93.294 9.798 -93.436 6.39 -94.004V-78.952C10.224 -79.378 12.638 -79.52 15.904 -79.52H21.158V-52.256C10.934 -49.416 9.372 -48.99 4.97 -48.564L7.1 -33.086C9.656 -34.08 9.656 -34.08 21.158 -37.772V-7.1C21.158 -3.976 20.448 -3.266 17.324 -3.266C14.2 -3.266 11.502 -3.408 5.822 -4.118C7.952 1.704 8.52 4.118 8.946 10.224C13.206 10.508 16.188 10.65 18.46 10.65C32.376 10.65 36.068 7.81 36.068 -3.124V-43.168L46.434 -47.286V-61.344C41.464 -59.356 39.76 -58.788 36.068 -57.368V-79.52H37.63C38.766 -79.52 43.026 -79.236 46.576 -78.952V-84.632C48.706 -82.786 51.688 -79.52 54.528 -76.112V-45.866C50.694 -45.866 48.422 -45.866 46.008 -46.15V-31.382C50.268 -31.95 54.244 -32.092 60.918 -32.092H77.106C72.562 -23.856 68.586 -19.028 61.77 -13.632C54.67 -8.094 48.28 -4.828 37.772 -1.562C41.606 2.982 43.594 6.248 46.15 12.212C58.078 7.668 65.036 3.55 72.704 -3.266C79.52 -9.372 84.064 -15.194 89.46 -24.85C94.288 -16.188 98.832 -10.366 106.074 -3.834C114.026 3.55 120.984 7.81 132.06 12.638C133.338 8.236 134.474 5.964 137.74 0.71C138.592 -0.71 138.734 -0.994 139.302 -1.846C128.936 -5.822 122.688 -9.372 115.162 -15.478C108.772 -20.732 104.796 -25.276 100.252 -32.092H124.25C134.474 -32.092 134.474 -32.092 137.882 -31.524V-46.718C134.616 -46.15 130.782 -45.866 125.67 -45.866V-69.438C125.67 -75.828 125.812 -78.668 126.238 -83.354C121.978 -82.928 119.848 -82.786 113.884 -82.786H103.944C111.47 -93.72 114.452 -98.122 115.304 -99.542C117.292 -102.808 118.002 -103.802 119.138 -105.222L112.18 -112.464C109.34 -112.038 107.068 -111.896 101.956 -111.896H84.49C85.2 -113.174 85.2 -113.174 85.342 -113.6C85.484 -114.026 85.484 -114.026 85.91 -114.594C85.91 -114.736 86.052 -114.878 86.194 -115.162C86.336 -115.304 86.336 -115.446 86.336 -115.446C86.62 -115.872 86.62 -115.872 86.762 -116.156C87.33 -117.292 87.614 -117.718 88.182 -118.996L71.71 -120.7C70.29 -115.162 69.154 -112.464 65.604 -107.21C59.64 -98.122 54.244 -92.3 46.576 -86.336ZM64.752 -82.786C70.574 -88.75 73.982 -93.152 77.674 -99.4H98.122C94.146 -93.01 90.17 -87.046 86.762 -82.786ZM96.276 -45.866C96.418 -48.564 96.56 -55.664 96.844 -70.29H112.18V-45.866ZM82.786 -70.29C82.502 -58.22 82.218 -49.984 82.076 -45.866H68.302V-70.29Z", bounds: [4.97, -120.69999999999999, 139.302, 12.637999999999998] }, { c: "\u4E2A", x: 578.497, y: 612, d: "M63.758 -120.274C60.208 -113.174 55.806 -106.784 51.12 -101.388C44.446 -93.862 35.216 -86.194 26.128 -80.372C17.04 -74.55 13.632 -72.846 3.266 -68.302C7.952 -63.616 11.502 -58.504 13.49 -53.25C22.01 -57.794 37.062 -67.734 46.008 -74.834C56.942 -83.638 61.77 -88.608 70.29 -99.826C77.674 -90.454 80.798 -87.188 90.17 -78.668C101.104 -68.87 115.02 -59.64 128.936 -53.108C134.474 -64.468 134.9 -65.32 138.166 -68.444C129.646 -71.994 125.67 -73.84 120.984 -76.538C113.316 -81.224 104.086 -87.472 99.684 -91.306C93.72 -96.276 85.626 -104.796 78.81 -113.032C79.662 -114.452 79.946 -115.162 81.082 -117.15ZM79.52 10.934C78.81 5.538 78.526 0.426 78.526 -5.964V-62.338C78.526 -69.58 78.81 -73.556 79.378 -78.1H61.202C61.912 -73.272 62.196 -68.444 62.196 -62.48V-5.822C62.196 0.426 61.912 5.68 61.202 10.934Z", bounds: [3.2659999999999996, -120.27399999999999, 138.166, 10.934] }, { c: "\u5BA1", x: 720.497, y: 612, d: "M24.708 -108.772C17.466 -108.772 13.774 -108.914 9.088 -109.34C9.514 -105.79 9.656 -103.518 9.656 -98.832V-93.72C9.656 -88.75 9.514 -86.478 9.088 -83.07H24.85V-94.998H117.292V-83.07H133.054C132.628 -86.762 132.486 -89.034 132.486 -93.578V-98.832C132.486 -103.66 132.628 -105.932 133.054 -109.34C128.368 -108.914 124.676 -108.772 117.434 -108.772H78.668C76.68 -113.458 75.402 -115.872 71.71 -122.12L55.522 -116.298C58.078 -112.606 59.072 -111.044 60.208 -108.772ZM62.622 -16.472V-1.562C62.622 3.976 62.48 6.532 61.77 11.928H78.952C78.1 7.526 77.958 4.686 77.958 -1.562V-16.472H107.636V-8.52H123.54C123.114 -11.502 122.83 -16.046 122.83 -23.146V-66.03C122.83 -72.278 123.114 -76.396 123.54 -79.378C117.86 -79.094 115.162 -78.952 108.488 -78.952H77.958V-81.082C77.958 -85.626 78.1 -87.046 78.952 -91.022H61.77C62.622 -86.762 62.622 -86.052 62.622 -80.656V-78.952H32.944C27.122 -78.952 24.14 -79.094 18.46 -79.378C18.886 -76.396 19.17 -72.136 19.17 -65.888V-23.146C19.17 -16.33 18.886 -11.644 18.46 -8.52H34.222V-16.472ZM62.622 -65.888V-53.96H34.222V-65.888ZM77.958 -65.888H107.636V-53.96H77.958ZM62.622 -41.606V-28.968H34.222V-41.606ZM77.958 -41.606H107.636V-28.968H77.958Z", bounds: [9.088, -122.11999999999999, 133.054, 11.927999999999999] }, { c: "\u7F8E", x: 862.497, y: 612, d: "M115.73 -24.992C122.12 -24.992 127.374 -24.708 132.06 -24.14V-38.766C127.658 -38.198 123.682 -38.056 116.866 -38.056H76.112C76.68 -40.044 76.964 -41.748 77.674 -45.724L61.344 -46.718C60.918 -42.458 60.634 -40.47 60.066 -38.056H25.134C18.886 -38.056 14.626 -38.198 9.94 -38.766V-24.14C14.768 -24.708 19.88 -24.992 26.27 -24.992H53.676C43.878 -12.638 28.4 -5.68 6.106 -3.55C10.224 3.408 11.502 6.106 13.064 11.928C32.234 8.236 41.606 4.828 50.978 -1.42C59.214 -6.958 65.746 -13.774 69.58 -20.874C75.828 -11.786 83.212 -5.112 93.152 0.426C103.234 6.106 113.174 9.372 129.646 12.212C131.066 5.538 132.202 2.556 136.036 -3.976C123.114 -4.97 115.446 -6.39 106.5 -10.082C97.696 -13.49 90.028 -18.602 84.49 -24.992ZM61.486 -104.37C58.22 -110.334 55.664 -114.452 50.978 -120.7L36.778 -115.73C39.76 -112.464 42.316 -109.056 45.156 -104.37H28.4C22.152 -104.37 17.75 -104.654 13.206 -105.222V-91.022C17.466 -91.448 22.01 -91.732 28.4 -91.732H62.48V-82.928H32.092C25.986 -82.928 23.146 -83.07 19.312 -83.638V-69.864C23.288 -70.432 26.554 -70.574 32.092 -70.574H62.48V-61.486H23.43C17.324 -61.486 12.638 -61.77 8.236 -62.338V-47.712C12.922 -48.28 17.608 -48.564 23.43 -48.564H118.712C125.528 -48.564 129.504 -48.422 133.764 -47.712V-62.338C129.646 -61.77 125.386 -61.486 118.712 -61.486H77.816V-70.574H110.05C115.588 -70.574 118.712 -70.432 122.688 -69.864V-83.638C118.854 -83.07 115.872 -82.928 110.05 -82.928H77.816V-91.732H113.6C119.99 -91.732 124.534 -91.448 128.794 -91.022V-105.222C124.534 -104.654 120.274 -104.37 113.6 -104.37H95.992C99.4 -108.772 101.814 -112.038 104.37 -116.014L88.892 -119.99C86.194 -114.026 82.928 -108.772 79.662 -104.37Z", bounds: [6.106, -120.69999999999999, 136.036, 12.212] }] };
  var import_jsx_runtime3 = __toESM(require_jsx_runtime());
  var beats2 = timeline_default.materialIntro;
  var ink = "#233728";
  function C2Opening({ t }) {
    if (t >= beats2.titleFadeEnd) return null;
    const titleAlpha = 1 - sm(t, beats2.titleFadeStart, beats2.titleFadeEnd), cardAlpha = 1 - sm(t, beats2.cardFadeStart, beats2.cardFadeEnd), main = sm(t, beats2.reveal.mainStart, beats2.reveal.mainEnd), copy = sm(t, beats2.reveal.copyStart, beats2.reveal.copyEnd);
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { "data-selected-intro": "C2", width: "1440", height: "1080", style: { position: "absolute", inset: 0 }, children: [
      cards.map((c, i) => {
        const p = c2CardPose(t, i), reveal = cardReveal(t, i);
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { "data-intro-card": i, "data-reveal": reveal, opacity: cardAlpha * reveal, transform: `translate(${p.x} ${p.y}) rotate(${p.r})`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "-133", y: "-160", width: "280", height: "340", fill: ink, opacity: ".08" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "-140", y: "-170", width: "280", height: "340", fill: c.bg, stroke: "#d8d3c6", strokeWidth: "1" }),
          i !== 2 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("image", { href: staticFile(c.asset), x: "-127", y: "-127", width: "254", height: "254" }) : null
        ] }, i);
      }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity: titleAlpha, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("g", { "data-title-block": "c2Title", "data-reveal": 0.28 + 0.72 * main, opacity: 0.28 + 0.72 * main, children: materialletters_v16_default.c2Title.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: c.d, fill: ink, transform: `translate(${c.x} ${c.y + 12 * (1 - main)})` }, i)) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("text", { "data-intro-copy": "true", "data-reveal": copy, x: "720", y: 441 + 10 * (1 - copy), textAnchor: "middle", fontFamily: "StyleSans", fontSize: "44", fill: ink, opacity: copy, children: "12\u79CD\u98CE\u683C \u4ECE\u63D0\u793A\u8BCD\u5F00\u59CB" })
      ] })
    ] });
  }
  var import_react = __toESM(require_react());
  function iconMotionAt(t, index) {
    const start = timeline_default.intro + index * timeline_default.section;
    const end = index === 11 ? timeline_default.outroStart : start + timeline_default.section - timeline_default.morph;
    const envelope = sm(t, start + 0.1, start + 0.55) * (1 - sm(t, end - 0.55, end));
    const local = t - start;
    return { envelope, dx: 1.8 * Math.sin(local * 2 * Math.PI / 3.2 + index * 0.37) * envelope, dy: 2.8 * Math.sin(local * 2 * Math.PI / 2.8 + index * 0.51) * envelope, angle: 1.35 * Math.sin(local * 2 * Math.PI / 3.8 + index * 0.43) * envelope };
  }
  var import_jsx_runtime4 = __toESM(require_jsx_runtime());
  var N = 256;
  var RINGS = 5;
  var sourcePromise;
  function sources() {
    return sourcePromise ??= (async () => Promise.all(assetNames.map(async (name) => {
      const image = new Image();
      image.src = staticFile(name);
      await image.decode();
      const c = document.createElement("canvas");
      c.width = image.width;
      c.height = image.height;
      const ctx = c.getContext("2d");
      ctx.drawImage(image, 0, 0);
      const pixels = ctx.getImageData(0, 0, c.width, c.height).data;
      const rad = [];
      for (let k = 0; k < N; k++) {
        const theta = k * 2 * Math.PI / N;
        let last = 0.1, gap = 0;
        for (let r = 2; r < c.width * 0.72; r += 1.5) {
          const x = Math.round(c.width / 2 + Math.cos(theta) * r), y = Math.round(c.height / 2 + Math.sin(theta) * r);
          if (x < 0 || y < 0 || x >= c.width || y >= c.height) break;
          const alpha = pixels[(y * c.width + x) * 4 + 3];
          if (alpha > 10) {
            last = r / c.width;
            gap = 0;
          } else if (r > c.width * 0.1) {
            gap++;
            if (gap >= 6) break;
          }
        }
        rad.push(Math.min(0.71, last + 5 / c.width));
      }
      return { image, rad };
    })))();
  }
  var VS = `attribute vec2 point;attribute vec2 uvA;attribute vec2 uvB;varying vec2 a;varying vec2 b;void main(){a=uvA;b=uvB;gl_Position=vec4(point.x/720.0-1.0,1.0-point.y/432.0,0.0,1.0);}`;
  var FS = `precision highp float;varying vec2 a;varying vec2 b;uniform sampler2D texA;uniform sampler2D texB;uniform float phase;uniform float opening;
void main(){
 vec4 aa=texture2D(texA,a),bb=texture2D(texB,b);
 // \u6750\u8D28\u6CBF\u66F2\u9762\u4ECE\u5DE6\u4E0B\u5411\u53F3\u4E0A\u63A8\u8FDB\uFF0C\u8F6E\u5ED3\u7531\u540C\u4E00\u5F20\u7F51\u683C\u53D8\u5F62\uFF0C\u6CA1\u6709\u4E24\u5F20\u5B8C\u6574\u56FE\u7684\u900F\u660E\u53E0\u653E\u3002
 float front=clamp(.25+.52*b.x-.23*b.y,0.06,.94);
 float material=smoothstep(front-.13,front+.13,phase*1.28-.13);
 if(phase<=.00001)material=0.;if(phase>=.99999)material=1.;
 float al=mix(aa.a,bb.a,material);vec3 co=mix(aa.rgb*aa.a,bb.rgb*bb.a,material)/max(al,.001);
 co=mix(vec3(.7412,.1882,.1686),co,smoothstep(.08,.88,opening));
 gl_FragColor=vec4(co,al);
}`;
  function shader(gl, type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw Error(gl.getShaderInfoLog(sh) || "\u7740\u8272\u5668\u9519\u8BEF");
    return sh;
  }
  var Surface = class {
    constructor(canvas, src) {
      this.textures = [];
      window.__sparkProfiles = src.map((s) => s.rad);
      const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: false, preserveDrawingBuffer: true });
      if (!gl) throw Error("\u65E0\u6CD5\u521B\u5EFA\u5F62\u53D8\u753B\u5E03");
      this.gl = gl;
      this.sources = src;
      const prog = gl.createProgram();
      gl.attachShader(prog, shader(gl, gl.VERTEX_SHADER, VS));
      gl.attachShader(prog, shader(gl, gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw Error(gl.getProgramInfoLog(prog) || "\u6750\u8D28\u7A0B\u5E8F\u9519\u8BEF");
      this.program = prog;
      gl.useProgram(prog);
      this.buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buf);
      ["point", "uvA", "uvB"].forEach((name, i) => {
        const a = gl.getAttribLocation(prog, name);
        gl.enableVertexAttribArray(a);
        gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 24, i * 8);
      });
      this.textures = src.map((s) => {
        const t = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, t);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, s.image);
        return t;
      });
      gl.uniform1i(gl.getUniformLocation(prog, "texA"), 0);
      gl.uniform1i(gl.getUniformLocation(prog, "texB"), 1);
    }
    draw(t) {
      const s = stateAt(t), gl = this.gl;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (t < 3.6 && cardReveal(t, 2) <= 0 || t >= 42.47) return;
      const a = this.sources[s.a], b = this.sources[s.b], v = [];
      const open = t < 3.6 ? s.opening : 1;
      const hero = s.hero, intro = t < 3.6 ? c2HeroAt(t, s.page.hero) : null;
      const sway = iconMotionAt(t, s.a), angle = (intro ? intro.angle : sway.angle) * Math.PI / 180, c = Math.cos(angle), sn = Math.sin(angle);
      const point = (k, r) => {
        const n = k % N, th = k * 2 * Math.PI / N, ca = Math.cos(th), sa = Math.sin(th), square = 0.5 / Math.max(Math.abs(ca), Math.abs(sa)), ra = intro ? mix(square, a.rad[n], open) : a.rad[n], rb = intro ? mix(square, b.rad[n], open) : b.rad[n];
        const rad = mix(ra, rb, s.p) * r;
        const breathe = 1 + 6e-3 * Math.sin(2.4 * t + th * 3) * Math.sin(Math.PI * r) * open;
        let xx = rad * ca * hero.size * breathe, yy = rad * sa * hero.size * breathe;
        const x = (hero.x + sway.dx + xx * c - yy * sn) * s.scale + s.x, y = (hero.y + sway.dy + xx * sn + yy * c) * s.scale + s.y;
        return [x, y, 0.5 + ra * ca * r, 0.5 + ra * sa * r, 0.5 + rb * ca * r, 0.5 + rb * sa * r];
      };
      for (let ring = 0; ring < RINGS; ring++) for (let k = 0; k < N; k++) {
        const r0 = ring / RINGS, r1 = (ring + 1) / RINGS;
        v.push(...point(k, r0), ...point(k + 1, r0), ...point(k + 1, r1), ...point(k, r0), ...point(k + 1, r1), ...point(k, r1));
      }
      gl.useProgram(this.program);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(v), gl.DYNAMIC_DRAW);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.textures[s.a]);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, this.textures[s.b]);
      gl.uniform1f(gl.getUniformLocation(this.program, "phase"), s.p);
      gl.uniform1f(gl.getUniformLocation(this.program, "opening"), 1);
      gl.drawArrays(gl.TRIANGLES, 0, v.length / 6);
      gl.finish();
      window.__sparkGeometry = { a: s.a, b: s.b, phase: s.p, vertices: v.length / 6, opacity: 1, x: hero.x, y: hero.y, size: hero.size, idle: sway };
      window.__iconMotion = iconMotionAt;
    }
    destroy() {
      const g = this.gl;
      this.textures.forEach((t) => g.deleteTexture(t));
      g.deleteBuffer(this.buf);
      g.deleteProgram(this.program);
    }
  };
  function Spark({ t }) {
    const canvas = (0, import_react.useRef)(null), surface = (0, import_react.useRef)(null), [ready, setReady] = (0, import_react.useState)(false);
    const [handle] = (0, import_react.useState)(() => delayRender("\u7B49\u5F8512\u79CD\u56FE\u6807\u7EB9\u7406\u548C\u5F62\u53D8\u7F51\u683C"));
    (0, import_react.useEffect)(() => {
      let live = true;
      sources().then((src) => {
        if (!live) return;
        surface.current = new Surface(canvas.current, src);
        surface.current.draw(t);
        setReady(true);
        continueRender(handle);
      }).catch(cancelRender);
      return () => {
        live = false;
        surface.current?.destroy();
      };
    }, [handle]);
    (0, import_react.useLayoutEffect)(() => {
      if (ready) surface.current?.draw(t);
    }, [t, ready]);
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("canvas", { "data-morph-surface": "true", "data-continuous-glass": "true", "data-intro-reveal": t < 3.6 ? cardReveal(t, 2) : 1, ref: canvas, width: 960, height: 576, style: { position: "absolute", left: 0, top: 0, width: 1440, height: 864, pointerEvents: "none", opacity: t < 3.6 ? cardReveal(t, 2) : 1 } });
  }
  var stage = document.querySelector("#stage");
  var design = document.querySelector("#design");
  function fit() {
    design.style.transform = "scale(" + stage.clientWidth / 1440 + ")";
  }
  new ResizeObserver(fit).observe(stage);
  fit();
  var root = window.createEffectRoot(design);
  window.effectReady = Promise.all(Object.values(window.effectAssets).map((s) => {
    const i = new Image();
    i.src = s;
    return i.decode();
  })).then(() => {
    window.drawEffect = (t) => window.flushEffect(() => root.render(/* @__PURE__ */ import_react2.default.createElement("div", { "data-film-stage": true }, /* @__PURE__ */ import_react2.default.createElement("img", { style: { position: "absolute", inset: 0, width: "100%", height: "100%" }, src: window.effectAssets["paper.png"] }), /* @__PURE__ */ import_react2.default.createElement(C2Opening, { t }), /* @__PURE__ */ import_react2.default.createElement(PageStage, { t }), /* @__PURE__ */ import_react2.default.createElement(Spark, { t }))));
  });
})();
