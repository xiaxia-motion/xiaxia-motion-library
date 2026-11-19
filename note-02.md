# 四种空间动效

《【AI教程】第2集：用three.js实现粒子动效》 · 2026-11-07 · 夏夏的AI灵感

本条笔记共 4 组。每一组有自己的源码和离线预览。

[星尘成形](#effect-02-dust-to-mark) · [星云旋涡](#effect-02-nebula-vortex) · [神经传导](#effect-02-neural-signal) · [脉冲扩散](#effect-02-spherical-pulse)

<a id="effect-02-dust-to-mark"></a>

## 星尘成形

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/02-dust-to-mark.zip) · [在线读主源码](source/02-dust-to-mark.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/02-dust-to-mark.zip)

design.js / markPaths 三条轮廓决定粒子的终点。 光晕强度 .46、半径 .43、阈值 .72；设计分辨率 1440×1080，预览以 0.6 倍绘制。

原版核心提取。Three.js 0.180.0，WebGL2，EffectComposer、RenderPass、UnrealBloomPass、OutputPass。原片另用 HyperFrames 0.8.222；此包直接用浏览器时钟。

去掉教程字幕与音轨，保留原项目的程序密度图与原创发光纹理。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

让同一批星尘沿两条弧线回卷成太阳和双山，保持原有颜色和短尾迹。 自建三维场景，使用给定的几何、着色器与镜头；从设置中指定的时间开始，循环这一组效果。

<a id="effect-02-nebula-vortex"></a>

## 星云旋涡

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/02-nebula-vortex.zip) · [在线读主源码](source/02-nebula-vortex.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/02-nebula-vortex.zip)

nebula.js / diskShader，配置盘内差速、内圈曝光与遮光。 光晕强度 .46、半径 .43、阈值 .72；设计分辨率 1440×1080，预览以 0.6 倍绘制。

原版核心提取。Three.js 0.180.0，WebGL2，EffectComposer、RenderPass、UnrealBloomPass、OutputPass。原片另用 HyperFrames 0.8.222；此包直接用浏览器时钟。

去掉教程字幕与音轨，保留原项目的程序密度图与原创发光纹理。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

让金光斜掠暗蓝色空间，穿过带分层密度和气尘暗纹的倾斜星系。 自建三维场景，使用给定的几何、着色器与镜头；从设置中指定的时间开始，循环这一组效果。

<a id="effect-02-neural-signal"></a>

## 神经传导

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/02-neural-signal.zip) · [在线读主源码](source/02-neural-signal.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/02-neural-signal.zip)

network.js / buildNetwork，改变节点密度和亮起衰减时保留路线连通。 光晕强度 .46、半径 .43、阈值 .72；设计分辨率 1440×1080，预览以 0.6 倍绘制。

原版核心提取。Three.js 0.180.0，WebGL2，EffectComposer、RenderPass、UnrealBloomPass、OutputPass。原片另用 HyperFrames 0.8.222；此包直接用浏览器时钟。

去掉教程字幕与音轨，保留原项目的程序密度图与原创发光纹理。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

金光沿一条连通的主路径移动，只点亮沿途节点和附近支路。 自建三维场景，使用给定的几何、着色器与镜头；从设置中指定的时间开始，循环这一组效果。

<a id="effect-02-spherical-pulse"></a>

## 脉冲扩散

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/02-spherical-pulse.zip) · [在线读主源码](source/02-spherical-pulse.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/02-spherical-pulse.zip)

particle-field.js 与 flight.js，控制波前半径与宽度。 光晕强度 .46、半径 .43、阈值 .72；设计分辨率 1440×1080，预览以 0.6 倍绘制。

原版核心提取。Three.js 0.180.0，WebGL2，EffectComposer、RenderPass、UnrealBloomPass、OutputPass。原片另用 HyperFrames 0.8.222；此包直接用浏览器时钟。

去掉教程字幕与音轨，保留原项目的程序密度图与原创发光纹理。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

由同一触发点发出领先的金色球面波和后续两道青色薄波，扫过星粒才发亮。 自建三维场景，使用给定的几何、着色器与镜头；从设置中指定的时间开始，循环这一组效果。

[回到全部笔记](README.md)
