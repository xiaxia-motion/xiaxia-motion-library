# 球面木纹、大理石与行星扫换

来自「夏夏的AI灵感」2026-11-17 发布的《VibeCoding 八工具》。本包为原版材质节点与兼容预览，演示窗口长 4.83 秒。

## 从这里开始

1. 完整解压 ZIP，保留目录结构。
2. 双击 index.html，用浏览器打开。可以暂停、重播或拖动进度条。
3. 把本目录与「提示词.txt」一起交给 AI。先说要改哪个动作、颜色或文字，再对照预览检查。

## 画面与时间

在半径 0.88 的单球表面，以局部 x 坐标和宽度 0.12 的过渡带，从右往左依次扫过木纹、大理石和行星。高光、球面轮廓和自转连续。

源工程为「VibeCoding 八种工具 · v24」。时钟从 19.920 秒取到 24.750 秒。设置在 settings.js，speed 为 1 表示原速，0.5 表示半速。

原版节点.html 和 node-material.js 保留原 TSL 材质。默认入口以单独编写的 WebGL 着色器绘制三种材质，并沿用相同扫换时间。两个入口都可离线打开。

## 工具、插件与实现

Three.js 0.180.0、WebGL2、TSL Textures。原节点入口使用 MeshPhysicalNodeMaterial；兼容入口使用 ShaderMaterial。

[Three.js](https://threejs.org/docs/) · [TSL Textures](https://github.com/boytchev/tsl-textures)

对照 [原版节点预览](原版节点.html)。在 node-material.js 中搜索 sweep1 和 sweep2 可调扫换时间；在 effect.js 中搜索 first 和 second 可同步修改兼容预览。

## 修改和嵌入

默认球面在 effect.js，原版材质节点在 node-material.js。刷新对应预览页即可检查。

把完整组件目录放进自己的静态网站，使用 iframe 能隔开样式、动画时钟和点击事件。将路径换成组件的实际位置。

~~~html
<iframe src="./14-material-sweep/index.html" title="球面木纹、大理石与行星扫换" loading="lazy" style="width:100%;height:640px;border:0"></iframe>
~~~

## 检查自己的改版

从头播放，确认该动作有起点、过渡和稳定状态。暂停后拖到中段，再次回到同一位置应得到一致的姿势。调整速度后，确认轨迹与先后次序仍然一致。

## 复刻提示词

在半径 0.88 的单球表面，以局部 x 坐标和宽度 0.12 的过渡带，从右往左依次扫过木纹、大理石和行星。高光、球面轮廓和自转连续。 独立展示这个动作，遵循下载包的取景、时间范围和缓动，提供播放、暂停、重播与定位。

## 署名与许可

本包原创代码由夏夏的AI灵感提供，按 [MIT 许可](LICENSE.txt) 开放修改和商用。重新分发时保留署名及许可声明。随包第三方运行库与改编代码适用各自声明，详见 vendor 内的许可文件。
