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
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // input.js
  var input_exports = {};
  __export(input_exports, {
    attach: () => charge
  });
  var clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
  var ease = (x) => {
    x = clamp(x);
    return x * x * (3 - 2 * x);
  };
  var now = () => performance.now() / 1e3;
  function drag(ui, down, move, up) {
    let pointer = null;
    ui.canvas.addEventListener("pointerdown", (e) => {
      if (pointer !== null || e.button !== 0) return;
      ui.canvas.focus({ preventScroll: true });
      pointer = e.pointerId;
      ui.canvas.setPointerCapture(pointer);
      down(ui.point(e));
    });
    ui.canvas.addEventListener("pointermove", (e) => {
      if (pointer === e.pointerId) move(ui.point(e));
    });
    function release(e, cancel) {
      if (pointer !== e.pointerId) return;
      pointer = null;
      up(ui.point(e), cancel);
    }
    ui.canvas.addEventListener("pointerup", (e) => release(e, false));
    ui.canvas.addEventListener("pointercancel", (e) => release(e, true));
    ui.canvas.addEventListener("lostpointercapture", (e) => release(e, true));
  }
  function charge(ui) {
    let hold = null, released = -20, was = 0, initialPress = 0, sent = false;
    const duration = 1.3;
    function begin() {
      if (hold !== null) return;
      hold = now();
      sent = false;
      was = 0;
      ui.status("正在蓄力");
    }
    function end(cancel = false) {
      if (hold === null) return;
      const t = now(), elapsed = t - hold;
      was = clamp(elapsed / duration);
      initialPress = ease(elapsed / 0.13);
      sent = !cancel && was >= 1;
      released = t;
      hold = null;
      ui.status(sent ? "已发送" : "已取消");
    }
    const handle = ui.actions[0];
    handle.onpointerdown = (e) => {
      if (e.button !== 0) return;
      handle.focus({ preventScroll: true });
      handle.setPointerCapture(e.pointerId);
      begin();
    };
    handle.onpointerup = () => end();
    handle.onpointercancel = () => end(true);
    handle.onlostpointercapture = () => end(true);
    for (const el of [handle, ui.canvas]) {
      el.addEventListener("keydown", (e) => {
        if ([" ", "Enter"].includes(e.key)) {
          e.preventDefault();
          if (!e.repeat) begin();
        }
      });
      el.addEventListener("keyup", (e) => {
        if ([" ", "Enter"].includes(e.key)) {
          e.preventDefault();
          end();
        }
      });
      el.addEventListener("blur", () => end(true));
    }
    drag(ui, begin, () => {
    }, (_, cancel) => end(cancel));
    return { leave: () => end(true), sample(t) {
      const active = hold !== null, elapsed = active ? t - hold : t - released;
      return { charge: active ? clamp(elapsed / duration) : sent ? 1 : was * (1 - ease(elapsed / 0.2)), press: active ? ease(elapsed / 0.13) : initialPress * (1 - ease(elapsed / 0.22)), sent };
    } };
  }
  return __toCommonJS(input_exports);
})();
