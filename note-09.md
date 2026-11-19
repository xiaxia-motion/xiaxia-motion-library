# 多光标并行绘制

《【AI教程】第9集：最近很火的Agent集群效果》 · 2026-11-12 · 夏夏的AI灵感

本条笔记共 7 组。每一组有自己的源码和离线预览。

[对话浮入与自动确认](#effect-09-dialog) · [多光标拖框与逐字排版](#effect-09-draw) · [多光标收队与同步绕环](#effect-09-regroup) · [滚屏续绘与人物追视](#effect-09-scroll) · [光标烟花聚字落款](#effect-09-signature) · [吸附辅助线与等距复制](#effect-09-snap) · [按钮火花变成十八枚光标](#effect-09-spark-cursors)

<a id="effect-09-dialog"></a>

## 对话浮入与自动确认

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/09-dialog.zip) · [在线读主源码](source/09-dialog.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/09-dialog.zip)

两个气泡依次进入，鼠标在第 2.20 秒出发，第 2.75 秒按下确认，按钮压缩后松开。

原版核心提取。HTML、SVG、Canvas 2D、原生 JavaScript。原片的网页重绘参考 Swarm Rebuild；这个离线包直接在浏览器中运行。

复用发布版对话、烟花变形与签名字形的相应绘制函数。独立示例用自绘双眼图形占据角色位置。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

两个气泡依次进入，鼠标在第 2.20 秒出发，第 2.75 秒按下确认，按钮压缩后松开。 采用纸色、墨绿、朱红和各自的光标颜色，给出可离线拖动进度的独立预览。

<a id="effect-09-draw"></a>

## 多光标拖框与逐字排版

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/09-draw.zip) · [在线读主源码](source/09-draw.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/09-draw.zip)

用 18 个有稳定颜色的光标分头描出卡片、排标题和画插图。每个指针的尖端跟着自己正在画的线走。

独立复现。HTML、SVG、Canvas 2D、原生 JavaScript。原片的网页重绘参考 Swarm Rebuild；这个离线包直接在浏览器中运行。

依据发布版的动作和时序独立实现。使用包内自绘的示例网页与人物，未包含浏览器扩展或原站快照。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

用 18 个有稳定颜色的光标分头描出卡片、排标题和画插图。每个指针的尖端跟着自己正在画的线走。 采用纸色、墨绿、朱红和各自的光标颜色，给出可离线拖动进度的独立预览。

<a id="effect-09-regroup"></a>

## 多光标收队与同步绕环

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/09-regroup.zip) · [在线读主源码](source/09-regroup.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/09-regroup.zip)

18 枚光标从不同位置同时收拢，在人物周围形成均匀的环并稳定旋转两秒。

独立复现。HTML、SVG、Canvas 2D、原生 JavaScript。原片的网页重绘参考 Swarm Rebuild；这个离线包直接在浏览器中运行。

依据发布版的动作和时序独立实现。使用包内自绘的示例网页与人物，未包含浏览器扩展或原站快照。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

18 枚光标从不同位置同时收拢，在人物周围形成均匀的环并稳定旋转两秒。 采用纸色、墨绿、朱红和各自的光标颜色，给出可离线拖动进度的独立预览。

<a id="effect-09-scroll"></a>

## 滚屏续绘与人物追视

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/09-scroll.zip) · [在线读主源码](source/09-scroll.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/09-scroll.zip)

先画完首屏人物，再缓动下滚；下方卡片接续绘出。眼睛的瞳孔在眼白范围内朝光标群移动，视线先向上再向左。

独立复现。HTML、SVG、Canvas 2D、原生 JavaScript。原片的网页重绘参考 Swarm Rebuild；这个离线包直接在浏览器中运行。

依据发布版的动作和时序独立实现。使用包内自绘的示例网页与人物，未包含浏览器扩展或原站快照。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

先画完首屏人物，再缓动下滚；下方卡片接续绘出。眼睛的瞳孔在眼白范围内朝光标群移动，视线先向上再向左。 采用纸色、墨绿、朱红和各自的光标颜色，给出可离线拖动进度的独立预览。

<a id="effect-09-signature"></a>

## 光标烟花聚字落款

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/09-signature.zip) · [在线读主源码](source/09-signature.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/09-signature.zip)

18 枚指针从环上散开，从真实字体的透明度通道每隔 4 像素取一点。粒子沿三次曲线落回字形，随后显示稳定文字与山形标识。

原版核心提取。HTML、SVG、Canvas 2D、原生 JavaScript。原片的网页重绘参考 Swarm Rebuild；这个离线包直接在浏览器中运行。

复用发布版对话、烟花变形与签名字形的相应绘制函数。独立示例用自绘双眼图形占据角色位置。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

18 枚指针从环上散开，从真实字体的透明度通道每隔 4 像素取一点。粒子沿三次曲线落回字形，随后显示稳定文字与山形标识。 采用纸色、墨绿、朱红和各自的光标颜色，给出可离线拖动进度的独立预览。

<a id="effect-09-snap"></a>

## 吸附辅助线与等距复制

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/09-snap.zip) · [在线读主源码](source/09-snap.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/09-snap.zip)

横拖卡片，靠近目标时出现洋红辅助线和等距线，松开后留下等距副本；每次复制使用同一张卡面。

独立复现。HTML、SVG、Canvas 2D、原生 JavaScript。原片的网页重绘参考 Swarm Rebuild；这个离线包直接在浏览器中运行。

依据发布版的动作和时序独立实现。使用包内自绘的示例网页与人物，未包含浏览器扩展或原站快照。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

横拖卡片，靠近目标时出现洋红辅助线和等距线，松开后留下等距副本；每次复制使用同一张卡面。 采用纸色、墨绿、朱红和各自的光标颜色，给出可离线拖动进度的独立预览。

<a id="effect-09-spark-cursors"></a>

## 按钮火花变成十八枚光标

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/09-spark-cursors.zip) · [在线读主源码](source/09-spark-cursors.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/09-spark-cursors.zip)

在确定按钮的边缘布置发射点。72 束短射线与 18 枚图形从同处射出，将每枚星芒的 64 个轮廓采样点连续变成箭头。

原版核心提取。HTML、SVG、Canvas 2D、原生 JavaScript。原片的网页重绘参考 Swarm Rebuild；这个离线包直接在浏览器中运行。

复用发布版对话、烟花变形与签名字形的相应绘制函数。独立示例用自绘双眼图形占据角色位置。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

在确定按钮的边缘布置发射点。72 束短射线与 18 枚图形从同处射出，将每枚星芒的 64 个轮廓采样点连续变成箭头。 采用纸色、墨绿、朱红和各自的光标颜色，给出可离线拖动进度的独立预览。

[回到全部笔记](README.md)
