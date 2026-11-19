# VibeCoding 八工具

《vibecoding工具分享，代码生成视频全靠它们》 · 2026-11-17 · 夏夏的AI灵感

本条笔记共 12 组。每一组有自己的源码和离线预览。

[八张工具卡依次飞出](#effect-14-card-deal) · [银色卡片抛起翻转](#effect-14-card-toss) · [三段取样、裁切与时间线拼接](#effect-14-cut-timeline) · [鸟群方阵、圆环与波浪](#effect-14-flock-formations) · [线花生长与二十五只鸟离花](#effect-14-flower-to-flock) · [工具卡阵与标题向外散开](#effect-14-glyph-scatter) · [画面、边框、文字与声纹合层](#effect-14-layer-merge) · [球面木纹、大理石与行星扫换](#effect-14-material-sweep) · [十三次落音与跟随镜头](#effect-14-score-ball) · [谱线展开为四个画框](#effect-14-staff-to-layers) · [成片画框缩成工具卡](#effect-14-toolkit-outro) · [线球撞散二十个空心方块](#effect-14-wire-impact)

<a id="effect-14-card-deal"></a>

## 八张工具卡依次飞出

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/14-card-deal.zip) · [在线读主源码](source/14-card-deal.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/14-card-deal.zip)

第 1.25 秒开始发牌。八张卡间隔 95 毫秒依次起飞，每张飞行 0.50 秒，镜头沿纵深拉远，卡面稳定后排成两层。

原版核心提取。HTML/CSS 3D、原生 JavaScript。原片使用 GSAP 作为时间线；本包直接调用原片的逐帧 render。

保留卡面、几何、双面判断和动线，用系统字体替代成片字体。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

第 1.25 秒开始发牌。八张卡间隔 95 毫秒依次起飞，每张飞行 0.50 秒，镜头沿纵深拉远，卡面稳定后排成两层。 独立展示这个动作，遵循下载包的取景、时间范围和缓动，提供播放、暂停、重播与定位。

<a id="effect-14-card-toss"></a>

## 银色卡片抛起翻转

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/14-card-toss.zip) · [在线读主源码](source/14-card-toss.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/14-card-toss.zip)

卡片沿抛物线上升和回落，在 1.1 秒中绕自身对角轴转十圈。用法向量切换卡片正反，接触桌面后仅剩短暂震动。

原版核心提取。HTML/CSS 3D、原生 JavaScript。原片使用 GSAP 作为时间线；本包直接调用原片的逐帧 render。

保留卡面、几何、双面判断和动线，用系统字体替代成片字体。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

卡片沿抛物线上升和回落，在 1.1 秒中绕自身对角轴转十圈。用法向量切换卡片正反，接触桌面后仅剩短暂震动。 独立展示这个动作，遵循下载包的取景、时间范围和缓动，提供播放、暂停、重播与定位。

<a id="effect-14-cut-timeline"></a>

## 三段取样、裁切与时间线拼接

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/14-cut-timeline.zip) · [在线读主源码](source/14-cut-timeline.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/14-cut-timeline.zip)

将 12 秒的时间线等分为三个 4 秒区间，分别取第 1–2、5–6、9–10 秒。三个窗口扩大并连续拼成 3 秒，蓝色播放头按新时间扫过。

原版核心提取。React、SVG、Remotion 的原组件。独立预览使用本地 React；时间线裁切示例另提供可直接运行的 FFmpeg 命令。

保留绘图和排布函数，用源工程的程序图形替代内嵌的整段样片。静态缩略图来自同一段的程序画面。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

将 12 秒的时间线等分为三个 4 秒区间，分别取第 1–2、5–6、9–10 秒。三个窗口扩大并连续拼成 3 秒，蓝色播放头按新时间扫过。 独立展示这个动作，遵循下载包的取景、时间范围和缓动，提供播放、暂停、重播与定位。

<a id="effect-14-flock-formations"></a>

## 鸟群方阵、圆环与波浪

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/14-flock-formations.zip) · [在线读主源码](source/14-flock-formations.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/14-flock-formations.zip)

25 只鸟先以连续切线落入五乘五方阵，以 19 毫秒组间错峰重排成环，再用 1.53 秒三次缓动铺成正弦波；飞向下一组目标。

原版核心提取。Three.js 0.180.0、EffectComposer、UnrealBloomPass、Anime.js 4.5.0、Tween.js 25.0.0。原片用 Ammo.js 计算刚体位姿，包中有原始 120 Hz 物理采样。

使用原工程的几何、镜头、队形与碰撞数据，独立播放已选时间段。预览以 960 × 720 绘制。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

25 只鸟先以连续切线落入五乘五方阵，以 19 毫秒组间错峰重排成环，再用 1.53 秒三次缓动铺成正弦波；飞向下一组目标。 独立展示这个动作，遵循下载包的取景、时间范围和缓动，提供播放、暂停、重播与定位。

<a id="effect-14-flower-to-flock"></a>

## 线花生长与二十五只鸟离花

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/14-flower-to-flock.zip) · [在线读主源码](source/14-flower-to-flock.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/14-flower-to-flock.zip)

先露花茎，再按花瓣线坐标生长。收束花瓣后让同一批顶点逐群变成 25 只飞鸟。保持相机连续后撤及各鸟的拍翅相位。

原版核心提取。Three.js 0.180.0、EffectComposer、UnrealBloomPass、Anime.js 4.5.0、Tween.js 25.0.0。原片用 Ammo.js 计算刚体位姿，包中有原始 120 Hz 物理采样。

使用原工程的几何、镜头、队形与碰撞数据，独立播放已选时间段。预览以 960 × 720 绘制。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

先露花茎，再按花瓣线坐标生长。收束花瓣后让同一批顶点逐群变成 25 只飞鸟。保持相机连续后撤及各鸟的拍翅相位。 独立展示这个动作，遵循下载包的取景、时间范围和缓动，提供播放、暂停、重播与定位。

<a id="effect-14-glyph-scatter"></a>

## 工具卡阵与标题向外散开

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/14-glyph-scatter.zip) · [在线读主源码](source/14-glyph-scatter.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/14-glyph-scatter.zip)

先保持工具名可读，在 4.90 秒触发冲击，逐个字形和卡从中心沿各自径向散开，冲击圈和轻微镜头震动同时衰减。

原版核心提取。HTML/CSS 3D、原生 JavaScript。原片使用 GSAP 作为时间线；本包直接调用原片的逐帧 render。

保留卡面、几何、双面判断和动线，用系统字体替代成片字体。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

先保持工具名可读，在 4.90 秒触发冲击，逐个字形和卡从中心沿各自径向散开，冲击圈和轻微镜头震动同时衰减。 独立展示这个动作，遵循下载包的取景、时间范围和缓动，提供播放、暂停、重播与定位。

<a id="effect-14-layer-merge"></a>

## 画面、边框、文字与声纹合层

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/14-layer-merge.zip) · [在线读主源码](source/14-layer-merge.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/14-layer-merge.zip)

四层先在各自透视平面错开，间隔 0.25 秒进入；第 2.9 至 5.2 秒合拢为同一画面，随后面板放大。

原版核心提取。React、SVG、Remotion 原组件，独立预览使用本地 React 和浏览器时钟。

保留绘图和排布函数，用源工程的程序图形替代内嵌的整段样片。静态缩略图来自同一段的程序画面。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

四层先在各自透视平面错开，间隔 0.25 秒进入；第 2.9 至 5.2 秒合拢为同一画面，随后面板放大。 独立展示这个动作，遵循下载包的取景、时间范围和缓动，提供播放、暂停、重播与定位。

<a id="effect-14-material-sweep"></a>

## 球面木纹、大理石与行星扫换

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/14-material-sweep.zip) · [在线读主源码](source/14-material-sweep.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/14-material-sweep.zip)

在半径 0.88 的单球表面，以局部 x 坐标和宽度 0.12 的过渡带，从右往左依次扫过木纹、大理石和行星。高光、球面轮廓和自转连续。

原版材质节点与兼容预览。Three.js 0.180.0、WebGL2、TSL Textures。原节点入口使用 MeshPhysicalNodeMaterial；兼容入口使用 ShaderMaterial。

原版节点.html 和 node-material.js 保留原 TSL 材质。默认入口以单独编写的 WebGL 着色器绘制三种材质，并沿用相同扫换时间。两个入口都可离线打开。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

在半径 0.88 的单球表面，以局部 x 坐标和宽度 0.12 的过渡带，从右往左依次扫过木纹、大理石和行星。高光、球面轮廓和自转连续。 独立展示这个动作，遵循下载包的取景、时间范围和缓动，提供播放、暂停、重播与定位。

<a id="effect-14-score-ball"></a>

## 十三次落音与跟随镜头

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/14-score-ball.zip) · [在线读主源码](source/14-score-ball.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/14-score-ball.zip)

沿五线谱的 13 个符头逐次落球。击中有蓝色扩散环，尾迹沿上一小段抛物线衰减，镜头用单调三次曲线沿谱线跟随。可手动启用随节拍合成的音色。

原工程改编提取。Three.js 0.180.0、Canvas、SVG。《跳动音符》开源项目的求值方式用于原工程。原片用 SuperCollider 合成打击音，听音示例用 Web Audio。

保留相机、抛物线、光环和原片的 13 个事件。谱线和符头重新用基础几何绘制，未使用上游样片、曲谱文件或录音。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

沿五线谱的 13 个符头逐次落球。击中有蓝色扩散环，尾迹沿上一小段抛物线衰减，镜头用单调三次曲线沿谱线跟随。可手动启用随节拍合成的音色。 独立展示这个动作，遵循下载包的取景、时间范围和缓动，提供播放、暂停、重播与定位。

<a id="effect-14-staff-to-layers"></a>

## 谱线展开为四个画框

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/14-staff-to-layers.zip) · [在线读主源码](source/14-staff-to-layers.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/14-staff-to-layers.zip)

取五线谱第一、二、四、五根线的屏幕投影。将端点展开为四张有透视的画框，小球收束为左上层的定位点，持续约 0.7 秒。

原工程改编提取。Three.js 0.180.0、Canvas、SVG。《跳动音符》开源项目的求值方式用于原工程。原片用 SuperCollider 合成打击音，听音示例用 Web Audio。

保留相机、抛物线、光环和原片的 13 个事件。谱线和符头重新用基础几何绘制，未使用上游样片、曲谱文件或录音。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

取五线谱第一、二、四、五根线的屏幕投影。将端点展开为四张有透视的画框，小球收束为左上层的定位点，持续约 0.7 秒。 独立展示这个动作，遵循下载包的取景、时间范围和缓动，提供播放、暂停、重播与定位。

<a id="effect-14-toolkit-outro"></a>

## 成片画框缩成工具卡

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/14-toolkit-outro.zip) · [在线读主源码](source/14-toolkit-outro.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/14-toolkit-outro.zip)

画面由 640 × 360 缩为 190 × 232 的银色卡面，左移落稳。八个工具条目随后分两列错时出现。

原版核心提取。React、SVG、Remotion 原组件，独立预览使用本地 React 和浏览器时钟。

保留绘图和排布函数，用源工程的程序图形替代内嵌的整段样片。静态缩略图来自同一段的程序画面。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

画面由 640 × 360 缩为 190 × 232 的银色卡面，左移落稳。八个工具条目随后分两列错时出现。 独立展示这个动作，遵循下载包的取景、时间范围和缓动，提供播放、暂停、重播与定位。

<a id="effect-14-wire-impact"></a>

## 线球撞散二十个空心方块

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/14-wire-impact.zip) · [在线读主源码](source/14-wire-impact.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/14-wire-impact.zip)

20 组飞鸟落到方块的 12 条棱，另 5 组拼出线球。第 14.65 秒发射，沿原物理求解轨迹撞击，保持单体的位置、四元数和镜头追随。

原版核心提取。Three.js 0.180.0、EffectComposer、UnrealBloomPass、Anime.js 4.5.0、Tween.js 25.0.0。原片用 Ammo.js 计算刚体位姿，包中有原始 120 Hz 物理采样。

使用原工程的几何、镜头、队形与碰撞数据，独立播放已选时间段。预览以 960 × 720 绘制。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

20 组飞鸟落到方块的 12 条棱，另 5 组拼出线球。第 14.65 秒发射，沿原物理求解轨迹撞击，保持单体的位置、四元数和镜头追随。 独立展示这个动作，遵循下载包的取景、时间范围和缓动，提供播放、暂停、重播与定位。

[回到全部笔记](README.md)
