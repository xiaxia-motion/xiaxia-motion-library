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
    attach: () => toast
  });
  var clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
  var ease = (x) => {
    x = clamp(x);
    return x * x * (3 - 2 * x);
  };
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
  function toast(ui) {
    let index = 0, changed = -8;
    function push(action) {
      index = action === "reset" ? 0 : index === 3 ? 1 : index + 1;
      changed = now();
      ui.status(["文件已就绪", "导出完成", "收到新评论", "素材已归档"][index]);
    }
    buttonEvents(ui, push);
    clickFace(ui, () => push("next"));
    key(ui, (k) => {
      if (!["Enter", " "].includes(k)) return false;
      push("next");
      return true;
    });
    return { sample(t) {
      const u = ease((t - changed) / 0.32);
      return { notice: index ? 1 : 0, noticeIndex: index, noticeMix: index ? u : 1, topLift: index ? -7 - 4.2 * Math.sin(Math.PI * u) : 0 };
    } };
  }
  return __toCommonJS(input_exports);
})();
