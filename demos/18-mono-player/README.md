# 线性波形播放器

《黑白极简 UI》 · 夏夏的AI灵感

## 打开与操作

完整解压后，双击 index.html。点「自己操作」可在同一控件上输入。点播放键切换波形运动，拖动时间线定位；左右键快退、快进。播放器为静音示例。 播放器只演示唱片或波形、时间与按键，默认静音。

## 画面与时间

取自工作台 28.60 秒连续运镜版正文。十四个包保留各自的面板、原始绘制函数及操作节奏，独立展示时固定外框。 绘制 43 条竖向波形，根据当前位置区分黑线和浅灰线。播放时波形持续变化，演示进度由 32% 拖到 86%，160 秒刻度和下方时码联动。

近白底 #fafafa、墨黑 #171717、白色面板、灰线 #bdbdbd；黑白反转强调选择，细黑下沿提示键面厚度。 原片 3840×2880、4∶3、60 帧/秒。控件的逻辑尺寸为 820×340。本例的绘图时间对应成片第 323 至 439 帧，独立演示约 1.95 秒。独立播放器按控件大小居中，使用设备上的中文字体，字形会随设备而异。

## 工具、依赖与修改方法

原片使用 SVG、GSAP 3.14.2、Chromium 取帧和 FFmpeg 封装。独立预览使用浏览器原生 SVG、JavaScript、指针与键盘事件以及 requestAnimationFrame，可直接离线打开。

- effect.js 是本组可编辑的 SVG 绘制与原片动作源码，包含控件的颜色、轮廓与状态计算。修改颜色值可换配色，修改坐标或曲线可调造型。
- settings.js 的 width 和 height 是逻辑视口，start、end 为原动作的起止秒数。调整尺寸时同步修改两个 HTML 中 SVG 的 viewBox。
- index.html 和 player.js 用于演示播放。window.singleEffect.seek(秒数) 从这组动作起点定位，play()、pause() 分别播放、暂停。
- interactive/index.html 和 interactive/controls.js 将鼠标、触摸、键盘输入交给同一绘制函数。复制整个解压文件夹和提示词.txt 给 AI，即可在原实现上修改。
- 本地示例独立运行，许可为 MIT，允许修改与商用，再分发应保留 LICENSE.txt。

[返回本期目录](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/note-18.md)
