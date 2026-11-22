// 夏夏的AI灵感 · 本组件的原始矢量图形和动作求值。使用方法见 README.md。
(() => {
  const C = { events: { button: 0.4666666666666667, success: 1.1666666666666667, play: 2.3333333333333335, scrubStart: 2.5833333333333335, scrubEnd: 3.75, sliderStart: 4.683333333333334, sliderDip: 5.15, sliderOver: 5.616666666666666, sliderRelease: 5.733333333333333, sliderRest: 5.85, toggleOn: 6.566666666666666, toggleOff: 6.8, tabMiddle: 7.5, tabRight: 7.733333333333333, focus: 8.666666666666666, key1: 8.783333333333333, key2: 8.9, submit: 9.133333333333333, choose: 10.316666666666666, chartDraw: 11.25, chartDrawEnd: 12.416666666666666, hoverStart: 12.416666666666666, hoverMiddle: 12.883333333333333, hoverNext: 13.233333333333333, hoverEnd: 13.583333333333334, hoverLeave: 13.833333333333334, dateOpen: 14.066666666666666, dateSelect: 15, dateApply: 15.466666666666667, menuSelect: 16.633333333333333, checkA: 17.816666666666666, checkB: 18.05, radioSelect: 18.283333333333335, choicesApply: 18.516666666666666, confirm: 19.683333333333334, progressStart: 20.616666666666667, progressStep1: 21.083333333333332, progressStep2: 21.333333333333332, progressPauseEnd: 21.45, progressEnd: 21.566666666666666, progressDone: 21.8 }, overview: { settled: 23.2 }, duration: 25.316666666666666, stages: [{}, { at: 0.5666666666666667 }], beat: (n) => Math.max(0, Math.round((-3e-3 + n * 60 / 128) * 60) / 60) }, E = C.events, D = C.duration, P = { bg: "#fafafa", ink: "#171717", muted: "#4b4b4b", accent: "#171717", on: "#ffffff", well: "#f0f0f0", dark: "#171717", light: "#ffffff", line: "#bdbdbd", tint: "#e9e9e9", surface: "#ffffff", contrast: "#eeeeee" }, cl = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n)), mix = (a, b, u) => a + (b - a) * u, ease = (n) => (n = cl(n), n * n * (3 - 2 * n)), ramp = (t, a, b) => ease((t - a) / (b - a)), f = (n) => Number(n.toFixed(4)), esc = (s) => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
  function text(x, y, s, size = 32, role = "ink", anchor = "start", extra = "") {
    const color = P[role] || role, bg = role === "light" ? P.dark : role === "on" ? P.accent : P.contrast;
    return `<text x="${f(x)}" y="${f(y)}" font-size="${size}" fill="${color}" text-anchor="${anchor}" data-text="${esc(s)}" data-bg="${bg}" ${extra}>${esc(s)}</text>`;
  }
  const line = (x1, y1, x2, y2, color = P.line, width2 = 2, extra = "") => `<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}" fill="none" stroke="${color}" stroke-width="${width2}" stroke-linecap="round" ${extra}/>`;
  function rect(x, y, w, h, fill = "url(#ice)", r = 14, stroke = "none", extra = "") {
    return `<rect x="${f(x)}" y="${f(y)}" width="${f(Math.max(0.01, w))}" height="${f(Math.max(0.01, h))}" rx="${f(Math.max(0, r))}" fill="${fill}" stroke="${stroke}" stroke-width="${1.8}" ${extra}/>`;
  }
  const circle = (x, y, r, fill, stroke = "none", sw = 2, extra = "") => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" ${extra}/>`;
  const searchIcon = (x, y, col = P.ink) => circle(x, y, 12, "none", col, 3) + line(x + 9, y + 9, x + 20, y + 20, col, 3);
  function surface(w, h, r, main = !1) {
    const stroke = P.ink;
    let s = rect(-w / 2, -h / 2, w, h, "url(#ice)", r, stroke, "");
    return s = rect(-w / 2 + 2, -h / 2 + 4, w, h, "#171717", r) + s, s;
  }
  function seq(t, stops) {
    for (let i = 1; i < stops.length; i++) {
      let [a, b] = [stops[i - 1], stops[i]];
      if (t < b[0]) return mix(a[1], b[1], ramp(t, a[0], b[0]));
    }
    return stops.at(-1)[1];
  }
  function values(t, mini = !1) {
    const elapsed = Math.max(0, t - C.overview.settled), u = cl(elapsed / 1.9), s = { t, mini };
    return s.music = mini ? 0.66 + 0.22 * ramp(t, C.overview.settled, D - 0.2) : seq(t, [[0, 0.32], [E.scrubStart, 0.32], [E.scrubEnd, 0.86]]), s.level = mini ? 0.78 - 0.48 * ramp(t, C.overview.settled + 0.1, C.overview.settled + 0.75) + 0.59 * ramp(t, C.overview.settled + 0.95, D - 0.18) : seq(t, [[0, 0.86], [E.sliderStart, 0.86], [E.sliderDip, 0.36], [E.sliderOver, 1], [E.sliderRest, 1]]), s.toggle = mini ? 1 - ramp(t, C.beat(50), C.beat(50) + 0.13) + ramp(t, C.beat(52), C.beat(52) + 0.13) : ramp(t, E.toggleOn, E.toggleOn + 0.11) - ramp(t, E.toggleOff, E.toggleOff + 0.11), s.tab = mini ? 2 - 2 * ramp(t, C.beat(50.5), C.beat(50.5) + 0.16) + ramp(t, C.beat(52), C.beat(52) + 0.16) : ramp(t, E.tabMiddle, E.tabMiddle + 0.11) + ramp(t, E.tabRight, E.tabRight + 0.11), s.date = mini ? 18 + 2 * ramp(t, C.beat(50.5), C.beat(50.5) + 0.18) : 13 + 5 * ramp(t, E.dateSelect, E.dateSelect + 0.13), s.menu = mini ? 1 + ramp(t, C.beat(51), C.beat(51) + 0.14) : ramp(t, E.menuSelect, E.menuSelect + 0.12), s.checks = mini ? [1, 1 - ramp(t, C.beat(50.5), C.beat(50.5) + 0.08), ramp(t, C.beat(51), C.beat(51) + 0.08)] : [ramp(t, E.checkA, E.checkA + 0.07), ramp(t, E.checkB, E.checkB + 0.07), 0], s.radio = mini ? 1 + ramp(t, C.beat(51.5), C.beat(51.5) + 0.12) : ramp(t, E.radioSelect, E.radioSelect + 0.12), s.confirmed = mini ? t >= C.beat(52) : t >= E.confirm, s.progress = mini ? cl(1 - ramp(t, C.beat(50.7), C.beat(51)) + ramp(t, C.beat(51) + 0.06, D - 0.15)) : seq(t, [[0, 0], [E.progressStart, 0], [E.progressStep1, 0.37], [E.progressStep2, 0.68], [E.progressPauseEnd, 0.68], [E.progressEnd, 1]]), s.play = mini ? 1 : ramp(t, E.play, E.play + 0.08), s.chart = mini ? 1 : ramp(t, E.chartDraw, E.chartDrawEnd), s.query = mini ? t < C.beat(50) ? "数据" : t < C.beat(50.25) ? "" : t < C.beat(50.5) ? "设" : "设置" : t < E.key1 ? "" : t < E.key2 ? "数" : "数据", s;
  }
  function searchBox(w, y, h, s, result = !1) {
    const bg = P.surface, tx = "ink", content = s.query || "搜索组件";
    let out = rect(35, y, w - 70, h, bg, 5, P.ink);
    return out += searchIcon(72, y + h / 2 - 3, P.ink) + text(110, y + h / 2 + 11, content, 33, tx), s.query && s.t * 3 % 1 < 0.58 && (out += line(112 + s.query.length * 34, y + 25, 112 + s.query.length * 34, y + h - 25, P.ink, 2)), out += rect(w - 183, y + 19, 111, h - 38, P.well, 3, P.line) + text(w - 127, y + h / 2 + 8, s.query ? "回车" : "⌘ K", 24, "ink", "middle"), out;
  }
  function renderSearch(w, h, s, result = !1) {
    if (!result) return searchBox(w, 30, h - 60, s);
    let out = "";
    out += searchBox(w, 28, 86, s, !0);
    const y0 = 166;
    return ["访问趋势", "访问统计", "来源分析"].forEach((label, i) => {
      const selected = s.mini ? Math.floor((s.t - C.overview.settled) * 1.5) % 3 : i === 0 && s.t >= E.choose;
      let chosen = s.mini ? selected === i : selected;
      const y = y0 + i * 78, span = chosen && !s.mini ? ramp(s.t, E.choose, E.choose + 0.14) : 1;
      out += rect(35, y - 38, (w - 70) * span, 67, chosen ? P.ink : "none", 6);
      const role = chosen ? "light" : "ink";
      out += text(65, y + 6, label, s.mini ? 38 : 31, role), out += text(w - 70, y + 5, i === 0 ? "↗" : i === 1 ? "≡" : "◷", 31, role, "end");
    }), out;
  }
  const drawing = document.getElementById("drawing");
  drawing.innerHTML = '<defs><linearGradient id="ice" x1=".12" y1="0" x2=".86" y2="1"><stop offset="0.0" stop-color="#ffffff"></stop><stop offset="1.0" stop-color="#ffffff"></stop></linearGradient></defs><g id="housing"></g><g id="face"></g>';
  const width = 880, height = 144, radius = 7, housing = drawing.querySelector("#housing"), face = drawing.querySelector("#face");
  housing.setAttribute("transform", "translate(" + width / 2 + " " + height / 2 + ")");
  housing.innerHTML = surface(width, height, radius);
  function paint(t, patch = {}) {
    const s = Object.assign(values(t), patch);
    return face.innerHTML = renderSearch(width, height, s), s;
  }
  window.componentSource = { render: paint };
})();
