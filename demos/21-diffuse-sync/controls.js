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
    attach: () => sync
  });
  var clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
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
  function sync(ui) {
    let started = null, amount = 0;
    function begin() {
      started = now();
      amount = 0;
      ui.status("同步中");
    }
    buttonEvents(ui, begin);
    clickFace(ui, begin);
    key(ui, (k) => {
      if (k !== "Enter" && k !== " ") return false;
      begin();
      return true;
    });
    ui.field.oninput = () => {
      started = null;
      amount = Number(ui.field.value) / 100;
      ui.status(amount === 1 ? "同步完成" : Math.round(amount * 100) + "%");
    };
    return { sample(t) {
      if (started !== null) {
        const v = clamp((t - started) / 2.6);
        amount = 0.74 * v + 0.26 * (1 - Math.exp(-3.6 * v)) / (1 - Math.exp(-3.6));
        if (v === 1) {
          started = null;
          amount = 1;
          ui.status("同步完成");
        }
      }
      ui.field.value = String(Math.round(amount * 100));
      const a = -2.12 + Math.PI * 2 * amount;
      return { sync: amount, syncAngle: -2.12, light: amount > 0 && amount < 1 ? [86 * Math.cos(a), 86 * Math.sin(a)] : null };
    } };
  }
  return __toCommonJS(input_exports);
})();
