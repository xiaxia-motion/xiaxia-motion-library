# 蓄力发送 · 弥散光 UI

夏夏的AI灵感，《VibeCoding审美提升｜9种弥散光UI组件》第 2 款。原片正文位置为 00:09.33–00:12.18。独立演示使用定稿第 556 至 753 帧，共 198 帧、3.3 秒。时间从第 0 帧起，以 60 帧/秒取样。

## 第一次打开

1. 完整解压 ZIP，将 index.html、脚本和 vendor 目录放在一起。
2. 双击 index.html。可以暂停、拖动演示时间，或点「从头播放」。系统开启减弱动态效果时，预览默认暂停。
3. 点「自己操作」。按住画面里的胶囊键或下方按钮。充满后松手发送，提前松手可取消。使用键盘时按住空格。 点「返回定稿演示」可回到原片节奏。

## 复刻提示词

做一枚深色磨砂胶囊键，按住时让键身下沉。从左向右灌入青蓝、紫红和暖金，中央跟随显示百分比。到 100% 后微微回缩，松开时亮出对勾。

## 工具与技术规格

定稿使用 React 19.2.3、Remotion 4.0.539、Canvas 2D 和 Three.js 0.180.0。场间飞行经 cannon-es 0.20.0 预计算，Chromium 取帧、FFmpeg 编码。独立包内含 Three.js，浏览器直接绘制，可离线运行。 定稿为 3840 × 2880、60 帧/秒。独立页把镜头留给这件组件，运行时实时生成玻璃、字样与反射。三维演示保留定稿的朝向、接触位置和沿边光迹；浏览器无法建立 WebGL 2 时使用二维正面。操作模式在正面直接接收指针、键盘或表单输入。

charge 是 0–1 的充能量，press 是键面下沉量，sent 控制完成勾。原片先充满，随后在释放的那一帧变成「已发送」。

## 如何修改和调用

- effect.js 是本组可读的主源码，搜索 charge 可定位实际卡面，stateAt 和 pointOnRim 分别给出带时间的状态和光点坐标。
- controls.js 负责本组的操作，settings.js 中的 speed 是演示倍率。viewer.js 控制播放、暂停和时间条。程序使用设计像素，坐标原点在卡面中心，系统中文字体随设备回退。
- 把整个文件夹和「提示词.txt」交给 AI，指出想改动的参数。保存后刷新 index.html，可继续对照。用 ?view=flat 打开入口可单独查看二维卡面。
- 接到自己的网页时按 index.html 的顺序加载脚本。下面的代码取本组定稿的一帧，适合在自己的 Canvas 中独立绘制。

```js
const ctx = canvas.getContext('2d');
const state = DiffuseUI.stateAt(645);
ctx.save();
ctx.translate(canvas.width / 2, canvas.height / 2);
DiffuseUI.drawFace(ctx, state);
ctx.restore();
```

要复用带旋转和沿边光球的三维画面，建立同样大小、上下重叠的两个 canvas，调用 DiffuseUI.create(底层画布, 上层画布)。对返回值调用 render(定稿帧号)，卸载时调用 dispose()。预览页另提供 window.singleEffect.seek(组件内秒数)、play() 和 pause()。

## 署名与许可

本栏目独立绘制了本例的控件、字样和程序材质。原创代码使用 MIT 许可，可以修改、分享和商用，分发时保留 LICENSE.txt。随包的 Three.js 保留原 MIT 许可于 vendor/three-LICENSE.txt。视觉参考为观默的《Halo》。[视觉参考原帖](https://x.com/guanmo_ai/status/2125425240184385648) · [Three.js r180](https://github.com/mrdoob/three.js/tree/r180)
