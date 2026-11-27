# 验证码 · 弥散光 UI

夏夏的AI灵感，《VibeCoding审美提升｜9种弥散光UI组件》第 6 款。原片正文位置为 00:24.28–00:29.37。独立演示使用定稿第 1457 至 1762 帧，共 306 帧、5.1 秒。时间从第 0 帧起，以 60 帧/秒取样。

## 第一次打开

1. 完整解压 ZIP，将 index.html、脚本和 vendor 目录放在一起。
2. 双击 index.html。可以暂停、拖动演示时间，或点「从头播放」。系统开启减弱动态效果时，预览默认暂停。
3. 点「自己操作」。在示例输入框键入任意六位数字或整串粘贴，可退格重输。点「开启琴声」可听每一位的提示音。 点「返回定稿演示」可回到原片节奏。

### 验证码提示音

点「开启琴声」后播放，或自己输入六位演示数字。包内 piano.js 合成原创高音钢琴音色，依次使用 F5、A5、C6、D6、C6、F6，对应定稿第 1467、1479、1490、1502、1515、1529 帧。前五音短促，末音带余韵。midi、held 与 voice 分别控制音高、按住时长和音色。关闭琴声后仍可完整操作。输入只在当前页面处理。

## 复刻提示词

做一组六格烟黑验证码框，用等宽数字快速输入。让发光选框逐格前移，输完时六位数字显出不同光色。把六格连成一圈细虹彩，让光球沿整圈绕回出发点。

## 工具与技术规格

定稿使用 React 19.2.3、Remotion 4.0.539、Canvas 2D 和 Three.js 0.180.0。场间飞行经 cannon-es 0.20.0 预计算，Chromium 取帧、FFmpeg 编码。独立包内含 Three.js，浏览器直接绘制，可离线运行。 验证码采用 Web Audio 在本机合成六个高音，沿用定稿的音高和入点。 定稿为 3840 × 2880、60 帧/秒。独立页把镜头留给这件组件，运行时实时生成玻璃、字样与反射。三维演示保留定稿的朝向、接触位置和沿边光迹；浏览器无法建立 WebGL 2 时使用二维正面。操作模式在正面直接接收指针、键盘或表单输入。

code 是已填位数，digitTravel 推动光标移到下一格，codeSeal 将六格连成 255 × 46 的共同轮廓。原片示例为 687204，六个音依次是 F5、A5、C6、D6、C6、F6。

## 如何修改和调用

- effect.js 是本组可读的主源码，搜索 code 可定位实际卡面，stateAt 和 pointOnRim 分别给出带时间的状态和光点坐标。
- controls.js 负责本组的操作，settings.js 中的 speed 是演示倍率。viewer.js 控制播放、暂停和时间条。程序使用设计像素，坐标原点在卡面中心，系统中文字体随设备回退。
- 把整个文件夹和「提示词.txt」交给 AI，指出想改动的参数。保存后刷新 index.html，可继续对照。用 ?view=flat 打开入口可单独查看二维卡面。
- 接到自己的网页时按 index.html 的顺序加载脚本。下面的代码取本组定稿的一帧，适合在自己的 Canvas 中独立绘制。

```js
const ctx = canvas.getContext('2d');
const state = DiffuseUI.stateAt(1609);
ctx.save();
ctx.translate(canvas.width / 2, canvas.height / 2);
DiffuseUI.drawFace(ctx, state);
ctx.restore();
```

要复用带旋转和沿边光球的三维画面，建立同样大小、上下重叠的两个 canvas，调用 DiffuseUI.create(底层画布, 上层画布)。对返回值调用 render(定稿帧号)，卸载时调用 dispose()。预览页另提供 window.singleEffect.seek(组件内秒数)、play() 和 pause()。

## 署名与许可

本栏目独立绘制了本例的控件、字样和程序材质。原创代码使用 MIT 许可，可以修改、分享和商用，分发时保留 LICENSE.txt。随包的 Three.js 保留原 MIT 许可于 vendor/three-LICENSE.txt。视觉参考为观默的《Halo》。[视觉参考原帖](https://x.com/guanmo_ai/status/2125425240184385648) · [Three.js r180](https://github.com/mrdoob/three.js/tree/r180)
