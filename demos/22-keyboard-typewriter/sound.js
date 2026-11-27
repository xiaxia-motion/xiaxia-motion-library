// 夏夏的AI灵感 · 五款创意键盘纯浏览器 Web Audio 离线拟音合成器（零外部音源依赖）。
(() => {
  const midiHz = (m) => 440 * Math.pow(2, (m - 69) / 12);

  function createAudio() {
    let ctx = null;
    let enabled = false;
    let noiseBuf = null;

    function ensure() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) throw new Error("Web Audio 不可用");
      if (!ctx) {
        ctx = new AC();
        noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.25), ctx.sampleRate);
        const ch = noiseBuf.getChannelData(0);
        for (let i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
      }
      if (ctx.state === "suspended") ctx.resume();
      return ctx;
    }

    async function toggle() {
      if (!enabled) {
        ensure();
        enabled = true;
      } else {
        enabled = false;
      }
      return enabled;
    }

    function playTypewriter(key) {
      if (!enabled) return;
      const ac = ensure(), t = ac.currentTime;
      if (key === "Enter") {
        // 复古打字机机械车铃
        [2480, 4960, 6190].forEach((f, idx) => {
          const o = ac.createOscillator(), g = ac.createGain();
          o.type = "sine";
          o.frequency.setValueAtTime(f, t);
          g.gain.setValueAtTime(idx === 0 ? 0.14 : 0.05, t);
          g.gain.exponentialRampToValueAtTime(0.0005, t + (idx === 0 ? 0.55 : 0.25));
          o.connect(g).connect(ac.destination);
          o.start(t);
          o.stop(t + 0.6);
        });
        return;
      }
      const src = ac.createBufferSource();
      src.buffer = noiseBuf;
      const bp = ac.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.setValueAtTime(key === "Space" ? 1500 : 2800 + Math.random() * 500, t);
      bp.Q.value = 1.6;
      const g = ac.createGain();
      g.gain.setValueAtTime(0.22, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
      src.connect(bp).connect(g).connect(ac.destination);
      src.start(t);
      src.stop(t + 0.055);
    }

    function playCat(kind) {
      if (!enabled) return;
      const ac = ensure(), t = ac.currentTime;
      const o = ac.createOscillator(), g = ac.createGain();
      if (kind === "happy") {
        o.type = "triangle";
        o.frequency.setValueAtTime(520, t);
        o.frequency.exponentialRampToValueAtTime(840, t + 0.12);
        o.frequency.exponentialRampToValueAtTime(620, t + 0.28);
        g.gain.setValueAtTime(0.001, t);
        g.gain.linearRampToValueAtTime(0.14, t + 0.04);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
        o.connect(g).connect(ac.destination);
        o.start(t);
        o.stop(t + 0.35);
      } else if (kind === "wrong") {
        o.type = "sine";
        o.frequency.setValueAtTime(340, t);
        o.frequency.exponentialRampToValueAtTime(220, t + 0.14);
        g.gain.setValueAtTime(0.12, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
        o.connect(g).connect(ac.destination);
        o.start(t);
        o.stop(t + 0.18);
      } else {
        o.type = "sine";
        o.frequency.setValueAtTime(240 + Math.random() * 60, t);
        o.frequency.exponentialRampToValueAtTime(110, t + 0.055);
        g.gain.setValueAtTime(0.16, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.065);
        o.connect(g).connect(ac.destination);
        o.start(t);
        o.stop(t + 0.075);
      }
    }

    function playGarden(kind, seed = 0) {
      if (!enabled) return;
      const ac = ensure(), t = ac.currentTime;
      const scale = [63, 65, 67, 70, 72, 75, 77, 79];
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = "sine";
      if (kind === "wilt") {
        o.frequency.setValueAtTime(520, t);
        o.frequency.exponentialRampToValueAtTime(240, t + 0.18);
        g.gain.setValueAtTime(0.11, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      } else if (kind === "sparkle") {
        [75, 79, 82, 87].forEach((m, i) => {
          const os = ac.createOscillator(), gn = ac.createGain();
          os.type = "triangle";
          os.frequency.setValueAtTime(midiHz(m), t + i * 0.055);
          gn.gain.setValueAtTime(0.08, t + i * 0.055);
          gn.gain.exponentialRampToValueAtTime(0.001, t + i * 0.055 + 0.35);
          os.connect(gn).connect(ac.destination);
          os.start(t + i * 0.055);
          os.stop(t + i * 0.055 + 0.38);
        });
        return;
      } else {
        const f = midiHz(scale[Math.abs(seed) % scale.length]);
        o.frequency.setValueAtTime(f * 0.92, t);
        o.frequency.exponentialRampToValueAtTime(f, t + 0.04);
        g.gain.setValueAtTime(0.14, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
      }
      o.connect(g).connect(ac.destination);
      o.start(t);
      o.stop(t + 0.32);
    }

    function playPiano(midi, delay = 0) {
      if (!enabled) return;
      const ac = ensure(), t = ac.currentTime + delay;
      const f = midiHz(midi);
      [1, 2, 3].forEach((mult, idx) => {
        const o = ac.createOscillator(), g = ac.createGain();
        o.type = idx === 0 ? "triangle" : "sine";
        o.frequency.setValueAtTime(f * mult, t);
        const amp = idx === 0 ? 0.18 : idx === 1 ? 0.06 : 0.02;
        g.gain.setValueAtTime(0.0005, t);
        g.gain.linearRampToValueAtTime(amp, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0005, t + (idx === 0 ? 0.65 : 0.32));
        o.connect(g).connect(ac.destination);
        o.start(t);
        o.stop(t + 0.7);
      });
    }

    function playLaser(kind) {
      if (!enabled) return;
      const ac = ensure(), t = ac.currentTime;
      const o = ac.createOscillator(), g = ac.createGain();
      if (kind === "suck") {
        o.type = "sawtooth";
        o.frequency.setValueAtTime(220, t);
        o.frequency.exponentialRampToValueAtTime(860, t + 0.16);
        g.gain.setValueAtTime(0.1, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      } else if (kind === "lock") {
        o.type = "sine";
        o.frequency.setValueAtTime(140, t);
        o.frequency.exponentialRampToValueAtTime(48, t + 0.32);
        g.gain.setValueAtTime(0.24, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.36);
      } else {
        o.type = "sawtooth";
        o.frequency.setValueAtTime(1180, t);
        o.frequency.exponentialRampToValueAtTime(260, t + 0.12);
        const lp = ac.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.setValueAtTime(2800, t);
        g.gain.setValueAtTime(0.11, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
        o.connect(lp).connect(g).connect(ac.destination);
        o.start(t);
        o.stop(t + 0.16);
        return;
      }
      o.connect(g).connect(ac.destination);
      o.start(t);
      o.stop(t + 0.38);
    }

    return {
      toggle,
      isEnabled: () => enabled,
      playTypewriter,
      playCat,
      playGarden,
      playPiano,
      playLaser,
      dispose: () => { if (ctx) { ctx.close().catch(() => {}); ctx = null; } },
    };
  }

  window.KeyboardAudio = { create: createAudio };
})();
