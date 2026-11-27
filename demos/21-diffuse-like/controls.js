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
    attach: () => like
  });
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
  function like(ui) {
    let selected = false, changed = -8;
    function toggle() {
      selected = !selected;
      changed = now();
      ui.actions[0].setAttribute("aria-pressed", String(selected));
      ui.status(selected ? "已点赞，2,482" : "已撤销，2,481");
    }
    buttonEvents(ui, toggle);
    clickFace(ui, toggle);
    key(ui, (k) => {
      if (![" ", "Enter"].includes(k)) return false;
      toggle();
      return true;
    });
    return { sample: (t) => ({ like: Number(selected), likeAge: selected ? t - changed : -1 }) };
  }
  return __toCommonJS(input_exports);
})();
