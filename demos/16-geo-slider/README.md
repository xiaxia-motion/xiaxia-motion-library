# 线宽滑块

《表现几何 UI》独立动效 · 夏夏的AI灵感

## 打开与操作

解压整个 ZIP 后，双击 index.html 即可离线观看。点击「自己操作」进入交互版。横拖滑块改变线宽，左右键每次调 1 pt。

## 复刻与调参

把纵向白色滑柄放在青柠轨道上。横向拖动时，轨道的粉紫色已走段、2 至 8 pt 的数字以及左侧涟漪版画的线宽同步变化。最后停在粗线状态，能看清起点和终点的差别。

滑柄横坐标从 474 到 771，有七个刻度。视频从第 1654 帧拖到 1708 帧。 保留定稿中该组件的外形、状态与动作拍点。

奶油底 #faf4e9、梅紫壳 #322438、青柠 #dae990、桃粉 #f1a1b5、粉紫 #bba4e9。 定稿为 3840×2880、60 帧/秒。源码在 1000×750 逻辑画布布局。此包从第 1642 帧起演，到第 1748 帧结束，含 1.78 秒画面。独立视口为 838×347，按容器等比缩放。

## 工具与源码入口

定稿以 HTML Canvas 2D 绘制，GSAP 3.14.2 驱动原片时间线，Puppeteer 控制 Chromium 取帧，FFmpeg 封装。独立版本使用浏览器 Canvas 2D、指针与键盘事件及 requestAnimationFrame。 预览所需的脚本随 ZIP 提供，双击即可运行。

- effect.js 包含本组件的绘图、缓动和原片状态计算。搜索调色板变量 P 可以修改颜色。
- settings.js 的 start、end 使用原片绝对秒数，speed 控制演示速度。view 是独立视口在原始逻辑画布里的左、上、宽、高。改视口大小时，同时修改两个 HTML 中 canvas 的宽高。
- index.html 使用 player.js 控制播放。window.singleEffect.seek(秒) 从本组件的起点定位，pause() 和 play() 用于暂停与播放。
- interactive/index.html 使用 controls.js 处理本组的指针和键盘输入。
- 提示词.txt 可直接复制给 AI。请连同整个解压文件夹提供，以便 AI 在已验证的源码上修改。

原创源码按 MIT 许可公开，可修改和商用，再分发时保留 LICENSE.txt。[本期全部组件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/note-16.md)
