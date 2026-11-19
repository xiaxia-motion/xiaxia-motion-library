# 蒲公英烟花

《祝我自己30岁生日快乐！》 · 2026-11-15 · 夏夏的AI灵感

本条笔记共 4 组。每一组有自己的源码和离线预览。

[蒲公英弹性入场](#effect-12-elastic-stem) · [十二次落瓣开花](#effect-12-petal-bursts) · [彩瓣分层飘落收尾](#effect-12-petal-fall) · [彩瓣花球加速旋抛](#effect-12-seed-spin)

<a id="effect-12-elastic-stem"></a>

## 蒲公英弹性入场

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/12-elastic-stem.zip) · [在线读主源码](source/12-elastic-stem.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/12-elastic-stem.zip)

花茎以 1/240 秒子步积分。画面为 4:3；每秒 60 帧，预览 800×600。

原版核心提取。Three.js r180、WebGL2、InstancedMesh；原片三次运动模糊采样，浏览器示例单次采样。

移除账号落款和配乐。多阶段共享同一花头，播放器只开放本组动作。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

一株有柔性花茎的蒲公英从侧边弹入，顶端发生延迟回摆，纸面浮影保持稳定。 用花茎求解器、曲面花瓣几何及固定随机数生成器生成画面。

<a id="effect-12-petal-bursts"></a>

## 十二次落瓣开花

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/12-petal-bursts.zip) · [在线读主源码](source/12-petal-bursts.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/12-petal-bursts.zip)

12 组 BURSTS，单次 156 片，阻力 5.8。画面为 4:3；每秒 60 帧，预览 800×600。

原版核心提取。Three.js r180、WebGL2、InstancedMesh；原片三次运动模糊采样，浏览器示例单次采样。

移除账号落款和配乐。多阶段共享同一花头，播放器只开放本组动作。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

让脱离花球的种子飞向多个爆点，在空中爆成带曲面和厚度的彩瓣，以短尾迹显示初速度。 用花茎求解器、曲面花瓣几何及固定随机数生成器生成画面。

<a id="effect-12-petal-fall"></a>

## 彩瓣分层飘落收尾

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/12-petal-fall.zip) · [在线读主源码](source/12-petal-fall.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/12-petal-fall.zip)

ending.start=11、ramp=2.4、extraFallSpeed=2.8。画面为 4:3；每秒 60 帧，预览 800×600。

原版核心提取。Three.js r180、WebGL2、InstancedMesh；原片三次运动模糊采样，浏览器示例单次采样。

移除账号落款和配乐。多阶段共享同一花头，播放器只开放本组动作。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

让彩瓣翻转向下落出画面，前后景速度不同；花茎保留柔性余振。 用花茎求解器、曲面花瓣几何及固定随机数生成器生成画面。

<a id="effect-12-seed-spin"></a>

## 彩瓣花球加速旋抛

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/12-seed-spin.zip) · [在线读主源码](source/12-seed-spin.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/12-seed-spin.zip)

158 颗种子、保留 26 颗、随机种子 2026111506。画面为 4:3；每秒 60 帧，预览 800×600。

原版核心提取。Three.js r180、WebGL2、InstancedMesh；原片三次运动模糊采样，浏览器示例单次采样。

移除账号落款和配乐。多阶段共享同一花头，播放器只开放本组动作。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

保留部分种子固定在花心，其余从花球表面按区带脱落，并延续原来的切线速度。 用花茎求解器、曲面花瓣几何及固定随机数生成器生成画面。

[回到全部笔记](README.md)
