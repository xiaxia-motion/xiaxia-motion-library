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
    attach: () => player
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
  function player(ui) {
    const media = ui.media;
    let side = 0, playing = false, offset = 28, anchor = now(), from = 0, changed = -9, objectURL = "", localName = "";
    const stock = [108, 117];
    function duration() {
      return objectURL && Number.isFinite(media.duration) ? Math.max(1, Math.ceil(media.duration)) : stock[side];
    }
    function position() {
      return clamp(objectURL ? media.currentTime || 0 : offset + (playing ? now() - anchor : 0), 0, duration());
    }
    function seek(t) {
      offset = clamp(t, 0, duration());
      anchor = now();
      if (objectURL && Number.isFinite(media.duration)) media.currentTime = Math.min(offset, media.duration);
      ui.field.value = String(offset);
    }
    function pause() {
      offset = position();
      playing = false;
      anchor = now();
      if (objectURL) media.pause();
    }
    function revoke() {
      if (!objectURL) return;
      media.pause();
      media.removeAttribute("src");
      media.load();
      URL.revokeObjectURL(objectURL);
      objectURL = "";
      localName = "";
    }
    async function toggle() {
      if (playing) {
        pause();
        ui.status("暂停");
        return;
      }
      if (position() >= duration()) seek(0);
      anchor = now();
      playing = true;
      if (objectURL) {
        try {
          await media.play();
        } catch (e) {
          playing = false;
          ui.status("此格式无法播放，请选择浏览器支持的音频。");
          return;
        }
      }
      ui.status("播放中");
    }
    function change() {
      const wasPlaying = playing;
      pause();
      revoke();
      from = mix(from, side, ease((now() - changed) / 0.2));
      side = 1 - side;
      changed = now();
      seek(0);
      playing = wasPlaying;
      ui.status(side ? "Night Bloom" : "Afterimage");
    }
    buttonEvents(ui, (a) => a === "toggle" ? toggle() : change());
    ui.field.oninput = () => seek(+ui.field.value);
    ui.file.onchange = () => {
      const f = ui.file.files[0];
      if (!f) return;
      pause();
      revoke();
      side = 0;
      from = 0;
      changed = -9;
      localName = f.name.replace(/\.[^.]+$/, "").slice(0, 32);
      objectURL = URL.createObjectURL(f);
      media.src = objectURL;
      media.load();
      offset = 0;
      ui.status("已载入本机音频，点击播放");
    };
    media.onended = () => {
      playing = false;
      ui.status("播放完毕");
    };
    media.onerror = () => {
      if (objectURL) ui.status("此音频格式无法读取");
    };
    key(ui, (k) => {
      if (k === " " || k === "Enter") {
        toggle();
        return true;
      }
      if (k === "ArrowRight" || k === "ArrowLeft") {
        seek(position() + (k === "ArrowRight" ? 5 : -5));
        return true;
      }
      return false;
    });
    drag(ui, (p) => {
      if (Math.abs(p.y - 10) < 26) seek((p.x + 104) / 208 * duration());
    }, (p) => {
      if (Math.abs(p.y - 10) < 36) seek((p.x + 104) / 208 * duration());
    }, () => {
    });
    clickFace(ui, (p) => {
      if (p.y > 28 && p.y < 81 && Math.abs(p.x) < 64) {
        if (Math.abs(p.x) < 23) toggle();
        else change();
      }
    });
    return { leave: pause, dispose: revoke, sample() {
      if (playing && !objectURL && position() >= duration()) pause();
      const seconds = Math.floor(position()), length = duration();
      ui.field.max = String(length);
      ui.field.value = String(seconds);
      return { trackMix: mix(from, side, ease((now() - changed) / 0.2)), play: playing, playerSeconds: seconds, durationSeconds: length, track: seconds / length, trackNames: objectURL ? [localName, "Night Bloom"] : void 0 };
    } };
  }
  return __toCommonJS(input_exports);
})();
