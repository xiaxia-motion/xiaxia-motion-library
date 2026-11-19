# 粒子幻境

《上次做的粒子效果大家很喜欢，又做了一期。》 · 2026-11-16 · 夏夏的AI灵感

本条笔记共 7 组。每一组有自己的源码和离线预览。

[鸟群散为立体雪花](#effect-13-birds-to-snow) · [余烬回聚成光环](#effect-13-embers-ring) · [花瓣原位化鸟与振翅](#effect-13-petals-to-birds) · [粒子丝带汇环](#effect-13-ribbon-ring) · [蒲公英分批旋抛花火](#effect-13-seed-fireworks) · [雪晶归集为蒲公英](#effect-13-snow-to-seed) · [错落网格花开](#effect-13-wire-flower)

<a id="effect-13-birds-to-snow"></a>

## 鸟群散为立体雪花

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/13-birds-to-snow.zip) · [在线读主源码](source/13-birds-to-snow.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/13-birds-to-snow.zip)

five-timing.js：正文第 586/60 秒触发雪晶形态。逻辑画幅 4:3，60 帧/秒，预览 960×720；Bloom 强度 .36、半径 .28、阈值 .83。

原版核心提取。Three.js r180、WebGL2、UnrealBloomPass、浮点 DataTexture 和自定义 GLSL。原工程 HyperFrames 0.9.52 用于录制。

首尾圆环也拆出独立入口。正文动作依赖粒子身份连续性，随包保留共用形变函数。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

飞鸟连续解散成粒子并重组为多枚六向雪晶；镜头升高观察同一粒群。 保持原工程的顶点编号与相机基准，避免硬切或用视频贴片。

<a id="effect-13-embers-ring"></a>

## 余烬回聚成光环

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/13-embers-ring.zip) · [在线读主源码](source/13-embers-ring.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/13-embers-ring.zip)

bookends.js 与 five-shaders.js：保持与片头相同的环目标。逻辑画幅 4:3，60 帧/秒，预览 960×720；Bloom 强度 .36、半径 .28、阈值 .83。

原版核心提取。Three.js r180、WebGL2、UnrealBloomPass、浮点 DataTexture 和自定义 GLSL。原工程 HyperFrames 0.9.52 用于录制。

首尾圆环也拆出独立入口。正文动作依赖粒子身份连续性，随包保留共用形变函数。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

跟随广域花火的尾迹向内绕回，余烬重写同一条粒子圆环。 保持原工程的顶点编号与相机基准，避免硬切或用视频贴片。

<a id="effect-13-petals-to-birds"></a>

## 花瓣原位化鸟与振翅

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/13-petals-to-birds.zip) · [在线读主源码](source/13-petals-to-birds.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/13-petals-to-birds.zip)

five-motion.js：launch=7 秒为正文局部时间。逻辑画幅 4:3，60 帧/秒，预览 960×720；Bloom 强度 .36、半径 .28、阈值 .83。

原版核心提取。Three.js r180、WebGL2、UnrealBloomPass、浮点 DataTexture 和自定义 GLSL。原工程 HyperFrames 0.9.52 用于录制。

首尾圆环也拆出独立入口。正文动作依赖粒子身份连续性，随包保留共用形变函数。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

让已展开花瓣直接从其所在位置形成鸟体，并沿原方位起飞，不跳切。 保持原工程的顶点编号与相机基准，避免硬切或用视频贴片。

<a id="effect-13-ribbon-ring"></a>

## 粒子丝带汇环

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/13-ribbon-ring.zip) · [在线读主源码](source/13-ribbon-ring.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/13-ribbon-ring.zip)

bookends.js：片头长度 3 秒。逻辑画幅 4:3，60 帧/秒，预览 960×720；Bloom 强度 .36、半径 .28、阈值 .83。

原版核心提取。Three.js r180、WebGL2、UnrealBloomPass、浮点 DataTexture 和自定义 GLSL。原工程 HyperFrames 0.9.52 用于录制。

首尾圆环也拆出独立入口。正文动作依赖粒子身份连续性，随包保留共用形变函数。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

细小粒子沿侧流汇聚成扭转丝带环，从同一空间投影转入花心。 保持原工程的顶点编号与相机基准，避免硬切或用视频贴片。

<a id="effect-13-seed-fireworks"></a>

## 蒲公英分批旋抛花火

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/13-seed-fireworks.zip) · [在线读主源码](source/13-seed-fireworks.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/13-seed-fireworks.zip)

five-timing.js：正文 1208、1291、1374 帧触发爆点。逻辑画幅 4:3，60 帧/秒，预览 960×720；Bloom 强度 .36、半径 .28、阈值 .83。

原版核心提取。Three.js r180、WebGL2、UnrealBloomPass、浮点 DataTexture 和自定义 GLSL。原工程 HyperFrames 0.9.52 用于录制。

首尾圆环也拆出独立入口。正文动作依赖粒子身份连续性，随包保留共用形变函数。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

让种子随横向旋转脱离花球，于三个不同位置和帧点依次爆开。 保持原工程的顶点编号与相机基准，避免硬切或用视频贴片。

<a id="effect-13-snow-to-seed"></a>

## 雪晶归集为蒲公英

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/13-snow-to-seed.zip) · [在线读主源码](source/13-snow-to-seed.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/13-snow-to-seed.zip)

five-timing.js：正文 835/60 秒起聚合。逻辑画幅 4:3，60 帧/秒，预览 960×720；Bloom 强度 .36、半径 .28、阈值 .83。

原版核心提取。Three.js r180、WebGL2、UnrealBloomPass、浮点 DataTexture 和自定义 GLSL。原工程 HyperFrames 0.9.52 用于录制。

首尾圆环也拆出独立入口。正文动作依赖粒子身份连续性，随包保留共用形变函数。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

分散的雪晶沿空间路径收集，在花球上分布成带冠毛的种子。 保持原工程的顶点编号与相机基准，避免硬切或用视频贴片。

<a id="effect-13-wire-flower"></a>

## 错落网格花开

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/13-wire-flower.zip) · [在线读主源码](source/13-wire-flower.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/13-wire-flower.zip)

flower-a.js：原花片拓扑和线网坐标。逻辑画幅 4:3，60 帧/秒，预览 960×720；Bloom 强度 .36、半径 .28、阈值 .83。

原版核心提取。Three.js r180、WebGL2、UnrealBloomPass、浮点 DataTexture 和自定义 GLSL。原工程 HyperFrames 0.9.52 用于录制。

首尾圆环也拆出独立入口。正文动作依赖粒子身份连续性，随包保留共用形变函数。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

由花心开始逐层推出 25 片线网花瓣，边缘翻卷，花瓣错开生长。 保持原工程的顶点编号与相机基准，避免硬切或用视频贴片。

[回到全部笔记](README.md)
