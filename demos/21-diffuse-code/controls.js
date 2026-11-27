var DiffuseInput = (() => {
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
      for (let key2 of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key2) && key2 !== except)
          __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // input.js
  var input_exports = {};
  __export(input_exports, {
    attach: () => code
  });
  var clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
  var ease = (x) => {
    x = clamp(x);
    return x * x * (3 - 2 * x);
  };
  var mix = (a, b, t) => a + (b - a) * t;
  var now = () => performance.now() / 1e3;
  function buttonEvents(ui, handle) {
    ui.actions.forEach((b) => b.addEventListener("click", () => handle(b.dataset.act)));
  }
  function clickFace(ui, handle) {
    ui.canvas.addEventListener("click", (e) => handle(ui.point(e)));
  }
  function key(ui, handle) {
    ui.canvas.addEventListener("keydown", (e) => {
      if (handle(e.key)) {
        e.preventDefault();
      }
    });
  }
  function code(ui) {
    let value = "", changed = -8;
    const completeFrame = 1529, endFrame = 1762;
    function enter(text) {
      const old = value;
      value = text.normalize("NFKC").replace(/[^0-9]/g, "").slice(0, 6);
      ui.field.value = value;
      if (old === value) return;
      changed = now();
      for (let i = old.length; i < value.length; i++) ui.note(i, (i - old.length) * 0.095);
      ui.status(value.length === 6 ? "六位已填齐" : "已输入 " + value.length + " / 6 位");
    }
    ui.field.oninput = () => enter(ui.field.value);
    buttonEvents(ui, () => {
      enter("");
      ui.field.focus();
    });
    clickFace(ui, () => ui.field.focus());
    key(ui, (k) => {
      if (k === "Enter" || k === " ") {
        ui.field.focus();
        return true;
      }
      if (/^\d$/.test(k)) {
        enter(value + k);
        return true;
      }
      if (k === "Backspace") {
        enter(value.slice(0, -1));
        return true;
      }
      return false;
    });
    return { sample(t) {
      const dt = t - changed, done = value.length === 6, travel = ease(dt / 0.115), dest = Math.min(5, value.length);
      const light = done ? DiffuseUI.pointOnRim(Math.min(endFrame, completeFrame + dt * 60)) : [(mix(Math.max(0, dest - 1), dest, travel) - 2.5) * 44, -23];
      return { code: value.length, inputCode: value, digitTravel: travel, codeSeal: done ? ease(dt / 0.19) : 0, light };
    } };
  }
  return __toCommonJS(input_exports);
})();
