# 字母花园 · 5种创意键盘 UI

夏夏的AI灵感，《VibeCoding · 5种创意键盘 UI》第 3 款。原片位置为 00:08.65–00:12.75，独立演示截取定稿第 519 至 764 帧，共 246 帧、4.10 秒（60 帧/秒）。

## 第一次打开

1. 完整解压 ZIP，保持 index.html 与同目录脚本、样式文件在同一文件夹内。
2. 双击 index.html，即可在现代浏览器离线观看定稿逐帧动画（支持播放、暂停、重播与进度条定位）。
3. 点击「自己操作」，或直接点击画布里的任意按键，即可切换到真实交互模式。点击温润陶瓷方键或敲击字母键（最多并排 6 株），每个字母都会长出不同花型的水彩植物并随风轻摆；按退格让末株凋落飘瓣，按回车洒出暖金花粉。
4. 点击「开启声音」可启用纯浏览器 Web Audio 离线拟音，无需联网或外部音源文件。

## 复刻提示词

手工水彩棉纸背景与温润白陶瓷方键虚拟键盘，上方设纸面种植框。每按一个字母便从输入框底线抽芽长出对应花型与叶脉的水彩植物并在微风中轻摆；输入 G、R、O、W 长出四株花草，按退格让 W 对应花株低头凋落，再重按 W 补种绽放一株明亮金黄小花。

## 工具与技术规格

定稿成片规格 1920 × 1440、60 帧/秒，由纯 HTML5 Canvas 2D 与 React/Remotion 确定性时间轴编排。本独立包零外部依赖、零 CDN，双击即可离线运行；互动音效使用浏览器内置 Web Audio 实时合成。

drawPlantStemAndLeaves 与 drawBotanicalFlower 分别绘制弧形枝茎、叶脉与五类水彩花型（poppy / anemone / daisy / camellia / gold），击键弹出陶瓷预览气泡。

## 如何修改和嵌入

- `effect.js` 是本款键盘的核心源码，包含定稿回放函数 `renderDemo` 与真实互动渲染函数 `renderLive`。
- `sound.js` 负责离线 Web Audio 拟音合成，`viewer.js` 负责指针命中与实体键盘监听，`settings.js` 的 `speed` 可调节播放倍率。
- 把整个目录连同 `提示词.txt` 交给 AI，说明要修改的配色、字样或反馈节奏，保存后刷新 `index.html` 即可查看。
- 在自己的网页中独立绘制某一帧或嵌入交互画布：

```js
const ctx = canvas.getContext("2d");
KeyboardUI.renderDemo(ctx, 642);
```

页面还暴露 `window.singleEffect.seek(秒数)`、`play()`、`pause()`、`setMode("live" | "demo")` 和 `pressKey("A")` 供脚本控制。

## 署名与许可

本包原创源码由夏夏的AI灵感按 [MIT 许可](LICENSE.txt) 开源，支持修改、分享与商用，再分发请保留署名与许可文本。概念灵感参考 Type Garden (https://x.com/art_akshat/status/2105650261566030314)，水彩棉纸、植物绘图与交互代码均为本栏目独立编写。
