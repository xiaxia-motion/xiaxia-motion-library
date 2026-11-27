# 十二组混凝土构件坠落搭楼

定稿取样 00:22.13–00:30.03。起止逻辑帧为 664 至 901（末帧不含），原时钟每秒 30 单位，成片与预览按每秒 60 帧取样。

## 打开与操作

1. 下载并完整解压本组 ZIP，双击 index.html。现代桌面浏览器可离线使用。 请在浏览器中启用图形加速。
2. 点「暂停」，拖动时间条检查动作。点「回到开头」或「播放」可重复观察。减弱动态效果的系统偏好会让页面从暂停开始。

## 文件与修改办法

- effect.js 是可读的主源码，可直接编辑。搜索 paintBuilding、photoToSlab 定位绘制函数。
- settings.js 的 speed 是播放倍率，默认为 1。start / end 的单位是秒，fps 的单位是帧/秒。保持本组时段，可以用 speed 调快或放慢。绘制使用固定逻辑坐标，网页等比缩放。
- 本组可调项包括构件落点、回震衰减和板面材质。先把整个文件夹和「提示词.txt」交给 AI，说明只调整其中哪一项。修改后刷新 index.html 可直接对照。
- 在自己的网页中依照 index.html 保留本组脚本的加载顺序；NeoEffect.ready() 完成后，对二维画布调用 NeoEffect.draw(ctx, 原片秒数)。此页面也提供 window.singleEffect.seek(组件内秒数)、play() 和 pause()。
- media.js 将 WebP 作为 data URL 内嵌。换图时，用新图的 data:image/webp;base64 数据替换原键对应的值，并更新图片署名。

## 调用工具与规格

原片使用 React 19.2.3 与 Remotion 4.0.539 编排，Chromium 逐帧绘制，FFmpeg 编码。独立预览以 Canvas 2D 和浏览器帧钟运行。 本组的三维场景使用 Three.js 0.180.0 与 WebGL 2。 原片交付为 3840 × 2880、60 帧/秒。随包预览以静音方式绘制，使用系统中文字体。

## 复刻提示词

为 4:3 的浏览器预览实现「十二组混凝土构件坠落搭楼」。让照片中的横檐旋成第一块楼板，再以十二次错开的落点拼起柱、楼层和窗带。保留板纹、落地回震与局部碎屑，再缓推完成的建筑。 使用 1440 × 1080 的逻辑画布，按 60 帧/秒采样，演示约 7.9 秒。让构件落点、回震衰减和板面材质可调，拖动时间条到任一位置都能重现同一画面。

## 许可与素材

原创绘制与独立播放器采用 MIT 许可，可修改、商用，分发时请保留来源与许可。 图片、库和参考代码的单独许可见下列条目。

- 西格拉姆大厦玻璃幕墙，摄影 Jo Baert。本包从成片的裁切图缩放为 WebP，照片衍生部分沿用 CC BY-SA 3.0。[原始摄影](https://commons.wikimedia.org/wiki/File:Seagram_Building.jpg) · [摄影许可](https://creativecommons.org/licenses/by-sa/3.0/)
- 范斯沃斯住宅钢框架，摄影 Lessismore2020。本包从成片的裁切图缩放为 WebP，照片衍生部分沿用 CC BY-SA 4.0。[原始摄影](https://commons.wikimedia.org/wiki/File:Farnsworth_House_Exterior_1.jpg) · [摄影许可](https://creativecommons.org/licenses/by-sa/4.0/)
- 图根哈特别墅白墙，摄影 Karelj。本包从成片的裁切图缩放为 WebP，照片衍生部分沿用 CC BY-SA 3.0。[原始摄影](https://commons.wikimedia.org/wiki/File:Vila_Tugendhat_Brno_2016_4.jpg) · [摄影许可](https://creativecommons.org/licenses/by-sa/3.0/)
- 包内 three.js 运行库为 r180，原始 MIT 许可随 vendor/three-LICENSE.txt 提供。[Three.js r180](https://github.com/mrdoob/three.js/tree/r180)
