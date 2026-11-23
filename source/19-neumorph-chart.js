// 夏夏的AI灵感 · 新拟物 UI。此文件包含该控件的原版绘图、灯光和动作。
(() => {
  (() => {
    "use strict";
    const root = typeof window > "u" ? globalThis : window, values2 = [3400, 5200, 4600, 6800, 5600, 7400, 8640], xs = values2.map((_, i) => 390 + i * 110), ys = values2.map((v) => 710 - v * 0.025), slopes = ys.slice(1).map((y, i) => (y - ys[i]) / 110), tangent = ys.map((_, i) => i === 0 ? slopes[0] : i === ys.length - 1 ? slopes.at(-1) : slopes[i - 1] * slopes[i] <= 0 ? 0 : 2 * slopes[i - 1] * slopes[i] / (slopes[i - 1] + slopes[i])), segments = slopes.map((_, i) => ({ x0: xs[i], y0: ys[i], x1: xs[i] + 110 / 3, y1: ys[i] + tangent[i] * 110 / 3, x2: xs[i + 1] - 110 / 3, y2: ys[i + 1] - tangent[i + 1] * 110 / 3, x3: xs[i + 1], y3: ys[i + 1] })), clamp = (x) => Math.max(0, Math.min(1, x));
    function yAt(x) {
      const i = Math.max(0, Math.min(5, Math.floor((x - xs[0]) / 110))), s = segments[i], u = clamp((x - s.x0) / 110), v = 1 - u;
      return v * v * v * s.y0 + 3 * v * v * u * s.y1 + 3 * v * u * u * s.y2 + u * u * u * s.y3;
    }
    const number = (n) => Number(n.toFixed(6)), path = `M${xs[0]} ${ys[0]} ` + segments.map((s) => `C${number(s.x1)} ${number(s.y1)} ${number(s.x2)} ${number(s.y2)} ${s.x3} ${s.y3}`).join(" ");
    root.IceCurve = { values: values2, xs, ys, tangent, segments, path, yAt, valueAt: (x) => (710 - yAt(x)) / 0.025 };
  })();
  const P = { bg: "#e7e7e3", ink: "#2f443b", muted: "#45534d", accent: "#376653", on: "#ffffff", well: "#d8dcd5", dark: "#344d42", light: "#f8faf5", line: "#b3beb4", tint: "#c4d8c7", surface: "#e7e7e3", contrast: "#c7cbc4" }, C = { events: window.SETTINGS.events, overview: { settled: 23.2 }, stages: [{}, { at: 0.5666666666666667 }], beat: (n) => Math.max(0, Math.round((-3e-3 + n * 60 / 128) * 60) / 60) }, E = C.events, D = 25.316666666666666, cl = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
  const ease = (n) => (n = cl(n), n * n * (3 - 2 * n)), ramp = (t, a, b) => ease((t - a) / (b - a)), f = (n) => Number(n.toFixed(4)), esc = (s) => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
  function press(t, at) {
    return ramp(t, at - 1 / 60, at) - ramp(t, at + 1 / 60, at + 5 / 60);
  }
  function text(x, y, s, size = 32, role = "ink", anchor = "start", extra = "") {
    const color = P[role] || role, bg = role === "light" ? P.dark : role === "on" ? P.accent : P.contrast;
    return `<text x="${f(x)}" y="${f(y)}" font-size="${size}" fill="${color}" text-anchor="${anchor}" data-text="${esc(s)}" data-bg="${bg}" ${extra}>${esc(s)}</text>`;
  }
  const line = (x1, y1, x2, y2, color = P.line, width2 = 2, extra = "") => `<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}" fill="none" stroke="${color}" stroke-width="${width2}" stroke-linecap="round" ${extra}/>`;
  function rect(x, y, w, h, fill = "url(#ice)", r = 14, stroke = "none", extra = "") {
    return `<rect x="${f(x)}" y="${f(y)}" width="${f(Math.max(0.01, w))}" height="${f(Math.max(0.01, h))}" rx="${f(Math.max(0, r))}" fill="${fill}" stroke="${stroke}" stroke-width="2" ${extra}/>`;
  }
  const group = (s, tr = "", extra = "") => `<g transform="${tr}" ${extra}>${s}</g>`;
  function cap(x, y, w, h, label, t, at, opts = {}) {
    const p = press(t, at), b = 0, r = 22, fill = opts.dark ? P.dark : "url(#chrome)", role = opts.dark ? "light" : "ink", stroke = "none", shadow = `filter="url(#${p > 0.4 ? "contactShadow" : "smallShadow"})"`;
    return group(rect(-w / 2, -h / 2, w, h, fill, r, stroke, shadow) + text(0, 11, label, opts.size || 30, role, "middle", 'font-weight="700"'), `translate(${x + w / 2} ${y + h / 2 + 8 * p}) scale(1 ${1 - 0.085 * p})`);
  }
  function surface(w, h, r, main = !1) {
    let s = rect(-w / 2, -h / 2, w, h, "url(#ice)", r, "none", 'filter="url(#shadow)"');
    return s = rect(-w / 2 + 5, -h / 2 + 9, w, h, "#b4b9ae", r, "none", 'opacity=".50"') + rect(-w / 2 - 4, -h / 2 - 5, w, h, "#ffffff", r) + s, s += line(-w / 2 + r, -h / 2 + 2, w / 2 - r, -h / 2 + 2, "#fbfff8", 3), s;
  }
  function values(t) {
    const s = { t, mini: !1 };
    return s.chart = ramp(t, E.chartDraw, E.chartDrawEnd), s;
  }
  function header(w, title, secondary = "", mini = !1) {
    let out = "";
    return out += text(40, 54, title, mini ? 38 : 31, "ink", "start", 'font-weight="700"'), secondary && !mini && (out += text(w - 40, 52, secondary, 23, "muted", "end", 'class="secondary"')), out;
  }
  function renderChart(w, h, s) {
    let out = header(w, "访问趋势", "", s.mini), dark = !1;
    out += text(43, 119, s.mini ? Math.round(8640 + 1e3 * ramp(s.t, C.overview.settled, D - 0.1)).toLocaleString("en-US") : "8,640", 47, "ink", "start", 'font-weight="700"'), s.mini || (out += text(242, 115, "+16.8%", 26, "muted")), out += cap(w - 175, 82, 130, 50, "日期", s.t, E.dateOpen, { size: 25 });
    const x = 58, y = 171, gw = w - 112, gh = h - 233;
    dark && (out += rect(x - 12, y - 14, gw + 24, gh + 46, P.dark, 12));
    for (let i = 0; i < 4; i++) out += line(x, y + i * gh / 3, x + gw, y + i * gh / 3, dark ? "#635775" : P.line, 1.2);
    const path = window.IceCurve.path, q = s.chart, dy = s.mini ? -14 * ramp(s.t, C.overview.settled, D - 0.1) : 0, transform = `translate(${x} ${y + gh + dy}) scale(${gw / 660} ${gh / 245}) translate(-390 -710)`;
    out += group(`<path d="${path} L1050 710L390 710Z" fill="${dark ? "#f69fd8" : P.accent}" opacity="${0.15}"/><path d="${path}" fill="none" stroke="${dark ? "#f8ade1" : P.accent}" stroke-width="${5.5}" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1.2" stroke-dashoffset="${1 - q}"/>`, transform);
    let hover = s.hover ?? (s.mini ? ramp(s.t, C.overview.settled, D - 0.15) : ramp(s.t, E.hoverStart, E.hoverEnd)), px = x + gw * hover;
    if (q > 0.99) {
      out += line(px, y + 10, px, y + gh, dark ? "#c2fff5" : P.muted, 1.3, 'stroke-dasharray="4 6"');
      let value = Math.round(window.IceCurve.valueAt(390 + 660 * hover));
      out += rect(cl(px - 68, x, x + gw - 136), y - 11, 136, 49, dark ? P.light : P.dark, 9) + text(cl(px, x + 68, x + gw - 68), y + 22, value.toLocaleString("en-US"), 27, dark ? "ink" : "light", "middle");
    }
    return s.mini || ["周一", "周三", "周五", "周日"].forEach((a, i) => out += text(x + i * gw / 3, h - 26, a, 24, "muted", i === 0 ? "start" : i === 3 ? "end" : "middle")), out;
  }
  const { width, height, radius } = window.SETTINGS, svg = document.getElementById("drawing");
  svg.innerHTML = `<defs>
<radialGradient id="back" cx="42%" cy="33%" r="84%"><stop offset="0.0" stop-color="#e7e7e3" /><stop offset="1.0" stop-color="#e7e7e3" /></radialGradient>
<linearGradient id="ice" x1=".12" y1="0" x2=".86" y2="1"><stop offset="0.0" stop-color="#ecece8" /><stop offset="0.5" stop-color="#e6e6e2" /><stop offset="1.0" stop-color="#dedfda" /></linearGradient>
<linearGradient id="lip" x1="0" y1="0" x2=".5" y2="1"><stop offset="0.0" stop-color="#f6f7f3" /><stop offset="1.0" stop-color="#8d9d97" /></linearGradient>
<linearGradient id="rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0.0" stop-color="#f6f7f3" /><stop offset="1.0" stop-color="#8d9d97" /></linearGradient>
<linearGradient id="chrome" x1="0" y1="0" x2="1" y2=".55"><stop offset="0.0" stop-color="#f0f0ec" /><stop offset="0.5" stop-color="#e5e6e1" /><stop offset="1.0" stop-color="#d8dbd5" /></linearGradient>
<linearGradient id="topshine" x1="0" y1="0" x2=".2" y2="1"><stop offset="0.0" stop-color="#f6f7f3" stop-opacity="0" /><stop offset="1.0" stop-color="#f6f7f3" stop-opacity="0" /></linearGradient>
<linearGradient id="well" x1=".05" y1="0" x2=".3" y2="1"><stop offset="0.0" stop-color="#c7cbc4" /><stop offset="0.5" stop-color="#dcdfd8" /><stop offset="1.0" stop-color="#eef0e9" /></linearGradient>
<linearGradient id="railLight" x1="0" y1="0" x2="0" y2="1"><stop offset="0.0" stop-color="#486f5e" /><stop offset="1.0" stop-color="#8d9d97" /></linearGradient>
<linearGradient id="disc" x1="0" y1="0" x2="1" y2="1"><stop offset="0.0" stop-color="#d7ded8" /><stop offset="0.5" stop-color="#f0f2eb" /><stop offset="1.0" stop-color="#bac8bf" /></linearGradient>
<radialGradient id="pool"><stop offset="0.0" stop-color="#8d9d97" stop-opacity="0" /><stop offset="1.0" stop-color="#e7e7e3" stop-opacity="0" /></radialGradient>
<filter id="shadow" x="-35%" y="-60%" width="170%" height="240%"><feDropShadow dx="-15" dy="-15" stdDeviation="10" flood-color="#ffffff" flood-opacity="0.94" /><feDropShadow dx="15" dy="15" stdDeviation="11" flood-color="#a7afa5" flood-opacity="0.49" /></filter>
<filter id="smallShadow" x="-50%" y="-60%" width="220%" height="250%"><feDropShadow dx="-5.25" dy="-5.25" stdDeviation="3.5" flood-color="#ffffff" flood-opacity="0.94" /><feDropShadow dx="5.25" dy="5.25" stdDeviation="3.8499999999999996" flood-color="#a7afa5" flood-opacity="0.49" /></filter>
<filter id="contactShadow" x="-50%" y="-60%" width="220%" height="250%"><feDropShadow dx="-5.25" dy="-5.25" stdDeviation="3.5" flood-color="#ffffff" flood-opacity="0.94" id="contactDrop" /><feDropShadow dx="5.25" dy="5.25" stdDeviation="3.8499999999999996" flood-color="#a7afa5" flood-opacity="0.49" /></filter>
<filter id="pointerShadow" x="-60%" y="-50%" width="230%" height="240%"><feDropShadow dx="-5.25" dy="-5.25" stdDeviation="3.5" flood-color="#ffffff" flood-opacity="0.94" /><feDropShadow dx="5.25" dy="5.25" stdDeviation="3.8499999999999996" flood-color="#a7afa5" flood-opacity="0.49" /></filter>
<symbol id="playIcon" viewBox="0 0 48 48"><path d="M17 10Q14 8 14 12V36Q14 40 17 38L36 26Q39 24 36 22Z" fill="#3e4b48" /></symbol>
<symbol id="speaker" viewBox="0 0 48 48"><path d="M7 19H15L26 10V38L15 29H7Z" fill="#3e4b48" /><path d="M33 16Q42 24 33 32M38 10Q52 24 38 38" fill="none" stroke="#3e4b48" stroke-width="3.5" stroke-linecap="round" /></symbol>
<linearGradient id="chartBarFill" x1="0" y1="0" x2="1" y2="1"><stop offset="0.0" stop-color="#f0f0ec" /><stop offset="0.5" stop-color="#e5e6e1" /><stop offset="1.0" stop-color="#d8dbd5" /></linearGradient><linearGradient id="chartAreaFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0.0" stop-color="#486f5e" stop-opacity="0.28" /><stop offset="1.0" stop-color="#486f5e" stop-opacity="0" /></linearGradient><filter id="overviewShadow" x="-30%" y="-40%" width="160%" height="190%"><feDropShadow dx="-7.05" dy="-7.05" stdDeviation="4.699999999999999" flood-color="#ffffff" flood-opacity="0.94" /><feDropShadow dx="7.05" dy="7.05" stdDeviation="5.17" flood-color="#a7afa5" flood-opacity="0.49" /></filter><filter id="overviewControlShadow" x="-50%" y="-60%" width="220%" height="250%"><feDropShadow dx="-5.25" dy="-5.25" stdDeviation="3.5" flood-color="#ffffff" flood-opacity="0.94" /><feDropShadow dx="5.25" dy="5.25" stdDeviation="3.8499999999999996" flood-color="#a7afa5" flood-opacity="0.49" /></filter><linearGradient id="overviewWell" x1="0" y1="0" x2=".2" y2="1"><stop offset="0.0" stop-color="#c7cbc4" /><stop offset="0.5" stop-color="#dcdfd8" /><stop offset="1.0" stop-color="#eef0e9" /></linearGradient></defs><g id="housing"></g><g id="face"></g>`;
  const housing = svg.querySelector("#housing"), face = svg.querySelector("#face");
  housing.setAttribute("transform", "translate(" + width / 2 + " " + height / 2 + ")");
  housing.innerHTML = surface(width, height, radius, !0);
  function render(t, overrides = {}) {
    const s = Object.assign(values(t), overrides);
    return face.innerHTML = renderChart(width, height, s), s;
  }
  window.componentSource = { render };
})();
