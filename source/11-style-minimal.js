// 夏夏的AI灵感 · 黑白极简主图微晃。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
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
  var pages = styleOrder_v17_default.map((i2) => basePages[i2]);
  var assetNames = styleOrder_v17_default.map((i2) => baseAssetNames[i2]);
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
  var sm = (v, a, b) => {
    const t = clamp((v - a) / (b - a));
    return clamp(t * t * t * (t * (t * 6 - 15) + 10));
  };
  var beats = timeline_default.materialIntro;
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
        p.soften.map((n, i2) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("filter", { id: `soft-${uid}-${i2}`, x: "-50%", y: "-50%", width: "200%", height: "200%", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("feGaussianBlur", { stdDeviation: n }) }, i2)),
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
  function iconMotionAt(t, index) {
    const start = timeline_default.intro + index * timeline_default.section;
    const end = index === 11 ? timeline_default.outroStart : start + timeline_default.section - timeline_default.morph;
    const envelope = sm(t, start + 0.1, start + 0.55) * (1 - sm(t, end - 0.55, end));
    const local = t - start;
    return { envelope, dx: 1.8 * Math.sin(local * 2 * Math.PI / 3.2 + index * 0.37) * envelope, dy: 2.8 * Math.sin(local * 2 * Math.PI / 2.8 + index * 0.51) * envelope, angle: 1.35 * Math.sin(local * 2 * Math.PI / 3.8 + index * 0.43) * envelope };
  }
  var i = 2;
  var page = pages[i];
  var root = window.createEffectRoot(document.getElementById("mount"));
  window.drawEffect = (seconds) => {
    const f = Math.round(seconds * 60);
    window.effectFrame = f;
    window.flushEffect(() => root.render(/* @__PURE__ */ import_react.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 0 1440 884" }, /* @__PURE__ */ import_react.default.createElement(WebPage, { p: page, index: i, uid: "work" }), (() => {
      const m = iconMotionAt(seconds, i), h = page.hero;
      return /* @__PURE__ */ import_react.default.createElement("g", { transform: `translate(${m.dx} ${m.dy}) rotate(${m.angle} ${h.x} ${h.y})` }, /* @__PURE__ */ import_react.default.createElement("image", { href: "art.png", x: h.x - h.size / 2, y: h.y - h.size / 2, width: h.size, height: h.size }));
    })())));
  };
})();
