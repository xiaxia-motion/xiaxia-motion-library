# 十二种设计风格

《给AI换个审美，试试这些提示词！》 · 2026-11-14 · 夏夏的AI灵感

本条笔记共 15 组。每一组有自己的源码和离线预览。

[三张材质卡亮相与玻璃图标接力](#effect-11-card-gallery-intro) · [同一四角星在不同材质间形变](#effect-11-icon-morph) · [包豪斯主图微晃](#effect-11-style-bauhaus) · [新粗野主义主图微晃](#effect-11-style-br) · [黏土风主图微晃](#effect-11-style-clay) · [赛博朋克主图微晃](#effect-11-style-cyber) · [杂志编辑主图微晃](#effect-11-style-ed) · [玻璃拟态主图微晃](#effect-11-style-gl) · [黑白极简主图微晃](#effect-11-style-minimal) · [新拟物主图微晃](#effect-11-style-neumorph) · [像素风主图微晃](#effect-11-style-pixel) · [手绘涂鸦主图微晃](#effect-11-style-sketch) · [瑞士平面主图微晃](#effect-11-style-swiss) · [Y2K主图微晃](#effect-11-style-y2k) · [十二种风格收进作品墙](#effect-11-twelve-grid)

<a id="effect-11-card-gallery-intro"></a>

## 三张材质卡亮相与玻璃图标接力

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/11-card-gallery-intro.zip) · [在线读主源码](source/11-card-gallery-intro.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/11-card-gallery-intro.zip)

三张黏土、纸艺和玻璃卡依次进入。其余底板退去，第三张卡的同一图标向右上方移动并放大，接入玻璃网页。

原版核心提取。React、SVG、WebGL 着色器与 Remotion 的原绘图组件。独立版用浏览器时钟，用本地贴图库加载 12 种图标。

保留发布版时序、图形采样与材质插值。图层压缩为带透明度的 WebP，预览使用系统字体。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

三张黏土、纸艺和玻璃卡依次进入。其余底板退去，第三张卡的同一图标向右上方移动并放大，接入玻璃网页。 使用真实轮廓和同一组图标，保持版面可读，交付可拖动的独立组件。

<a id="effect-11-icon-morph"></a>

## 同一四角星在不同材质间形变

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/11-icon-morph.zip) · [在线读主源码](source/11-icon-morph.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/11-icon-morph.zip)

对不同材质的同一个四角星沿极角采轮廓，插值边界和材质，背景页面独立原位淡入淡出。

原版核心提取。React、SVG、WebGL 着色器与 Remotion 的原绘图组件。独立版用浏览器时钟，用本地贴图库加载 12 种图标。

保留发布版时序、图形采样与材质插值。图层压缩为带透明度的 WebP，预览使用系统字体。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

对不同材质的同一个四角星沿极角采轮廓，插值边界和材质，背景页面独立原位淡入淡出。 使用真实轮廓和同一组图标，保持版面可读，交付可拖动的独立组件。

<a id="effect-11-style-bauhaus"></a>

## 包豪斯主图微晃

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/11-style-bauhaus.zip) · [在线读主源码](source/11-style-bauhaus.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/11-style-bauhaus.zip)

1440 × 884 页面；横向 1.8、纵向 2.8 像素；最大转角 1.35°；三个正弦周期分别为 3.2、2.8 和 3.8 秒；首尾缓入归零。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

保留单页静置时的原位微晃。字体使用浏览器本机的中文字体。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

用几何构图、红黄蓝原色，搭配简洁字形与几何拼贴插画。保留包内页面的构图，主图绕自身中心进行极小幅移动与旋转；文字和背景固定，动作幅度和曲线使用 iconMotionAt。

<a id="effect-11-style-br"></a>

## 新粗野主义主图微晃

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/11-style-br.zip) · [在线读主源码](source/11-style-br.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/11-style-br.zip)

1440 × 884 页面；横向 1.8、纵向 2.8 像素；最大转角 1.35°；三个正弦周期分别为 3.2、2.8 和 3.8 秒；首尾缓入归零。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

保留单页静置时的原位微晃。字体使用浏览器本机的中文字体。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

用粗黑边框、硬边偏移阴影，明亮撞色，搭配立体几何插画。保留包内页面的构图，主图绕自身中心进行极小幅移动与旋转；文字和背景固定，动作幅度和曲线使用 iconMotionAt。

<a id="effect-11-style-clay"></a>

## 黏土风主图微晃

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/11-style-clay.zip) · [在线读主源码](source/11-style-clay.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/11-style-clay.zip)

1440 × 884 页面；横向 1.8、纵向 2.8 像素；最大转角 1.35°；三个正弦周期分别为 3.2、2.8 和 3.8 秒；首尾缓入归零。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

保留单页静置时的原位微晃。字体使用浏览器本机的中文字体。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

用圆润体块、柔和粉彩，搭配厚实圆角与黏土质感插画。保留包内页面的构图，主图绕自身中心进行极小幅移动与旋转；文字和背景固定，动作幅度和曲线使用 iconMotionAt。

<a id="effect-11-style-cyber"></a>

## 赛博朋克主图微晃

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/11-style-cyber.zip) · [在线读主源码](source/11-style-cyber.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/11-style-cyber.zip)

1440 × 884 页面；横向 1.8、纵向 2.8 像素；最大转角 1.35°；三个正弦周期分别为 3.2、2.8 和 3.8 秒；首尾缓入归零。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

保留单页静置时的原位微晃。字体使用浏览器本机的中文字体。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

用深色背景、青紫霓虹，搭配切角面板与克制的发光描边。保留包内页面的构图，主图绕自身中心进行极小幅移动与旋转；文字和背景固定，动作幅度和曲线使用 iconMotionAt。

<a id="effect-11-style-ed"></a>

## 杂志编辑主图微晃

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/11-style-ed.zip) · [在线读主源码](source/11-style-ed.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/11-style-ed.zip)

1440 × 884 页面；横向 1.8、纵向 2.8 像素；最大转角 1.35°；三个正弦周期分别为 3.2、2.8 和 3.8 秒；首尾缓入归零。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

保留单页静置时的原位微晃。字体使用浏览器本机的中文字体。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

用衬线大标题、非对称分栏，米白纸感，搭配低饱和纸艺插画。保留包内页面的构图，主图绕自身中心进行极小幅移动与旋转；文字和背景固定，动作幅度和曲线使用 iconMotionAt。

<a id="effect-11-style-gl"></a>

## 玻璃拟态主图微晃

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/11-style-gl.zip) · [在线读主源码](source/11-style-gl.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/11-style-gl.zip)

1440 × 884 页面；横向 1.8、纵向 2.8 像素；最大转角 1.35°；三个正弦周期分别为 3.2、2.8 和 3.8 秒；首尾缓入归零。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

保留单页静置时的原位微晃。字体使用浏览器本机的中文字体。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

用半透明面板与背景模糊，柔和渐变，搭配同色系玻璃插画。保留包内页面的构图，主图绕自身中心进行极小幅移动与旋转；文字和背景固定，动作幅度和曲线使用 iconMotionAt。

<a id="effect-11-style-minimal"></a>

## 黑白极简主图微晃

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/11-style-minimal.zip) · [在线读主源码](source/11-style-minimal.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/11-style-minimal.zip)

1440 × 884 页面；横向 1.8、纵向 2.8 像素；最大转角 1.35°；三个正弦周期分别为 3.2、2.8 和 3.8 秒；首尾缓入归零。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

保留单页静置时的原位微晃。字体使用浏览器本机的中文字体。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

用黑白配色、大面积留白，减少装饰，突出标题与核心按钮。保留包内页面的构图，主图绕自身中心进行极小幅移动与旋转；文字和背景固定，动作幅度和曲线使用 iconMotionAt。

<a id="effect-11-style-neumorph"></a>

## 新拟物主图微晃

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/11-style-neumorph.zip) · [在线读主源码](source/11-style-neumorph.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/11-style-neumorph.zip)

1440 × 884 页面；横向 1.8、纵向 2.8 像素；最大转角 1.35°；三个正弦周期分别为 3.2、2.8 和 3.8 秒；首尾缓入归零。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

保留单页静置时的原位微晃。字体使用浏览器本机的中文字体。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

用同色系底面、双向柔和阴影，让按钮呈现轻微凸起与凹陷感。保留包内页面的构图，主图绕自身中心进行极小幅移动与旋转；文字和背景固定，动作幅度和曲线使用 iconMotionAt。

<a id="effect-11-style-pixel"></a>

## 像素风主图微晃

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/11-style-pixel.zip) · [在线读主源码](source/11-style-pixel.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/11-style-pixel.zip)

1440 × 884 页面；横向 1.8、纵向 2.8 像素；最大转角 1.35°；三个正弦周期分别为 3.2、2.8 和 3.8 秒；首尾缓入归零。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

保留单页静置时的原位微晃。字体使用浏览器本机的中文字体。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

用阶梯边缘、方块图形，限制色板，搭配像素插画与按钮。保留包内页面的构图，主图绕自身中心进行极小幅移动与旋转；文字和背景固定，动作幅度和曲线使用 iconMotionAt。

<a id="effect-11-style-sketch"></a>

## 手绘涂鸦主图微晃

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/11-style-sketch.zip) · [在线读主源码](source/11-style-sketch.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/11-style-sketch.zip)

1440 × 884 页面；横向 1.8、纵向 2.8 像素；最大转角 1.35°；三个正弦周期分别为 3.2、2.8 和 3.8 秒；首尾缓入归零。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

保留单页静置时的原位微晃。字体使用浏览器本机的中文字体。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

用不规则线条、手写感字形，保留纸张肌理，搭配铅笔涂鸦。保留包内页面的构图，主图绕自身中心进行极小幅移动与旋转；文字和背景固定，动作幅度和曲线使用 iconMotionAt。

<a id="effect-11-style-swiss"></a>

## 瑞士平面主图微晃

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/11-style-swiss.zip) · [在线读主源码](source/11-style-swiss.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/11-style-swiss.zip)

1440 × 884 页面；横向 1.8、纵向 2.8 像素；最大转角 1.35°；三个正弦周期分别为 3.2、2.8 和 3.8 秒；首尾缓入归零。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

保留单页静置时的原位微晃。字体使用浏览器本机的中文字体。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

用严格网格、无衬线字体，统一左对齐，红黑白配色。保留包内页面的构图，主图绕自身中心进行极小幅移动与旋转；文字和背景固定，动作幅度和曲线使用 iconMotionAt。

<a id="effect-11-style-y2k"></a>

## Y2K主图微晃

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/11-style-y2k.zip) · [在线读主源码](source/11-style-y2k.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/11-style-y2k.zip)

1440 × 884 页面；横向 1.8、纵向 2.8 像素；最大转角 1.35°；三个正弦周期分别为 3.2、2.8 和 3.8 秒；首尾缓入归零。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

保留单页静置时的原位微晃。字体使用浏览器本机的中文字体。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

用液态金属、粉蓝渐变，搭配圆润胶囊与镜面铬质感插画。保留包内页面的构图，主图绕自身中心进行极小幅移动与旋转；文字和背景固定，动作幅度和曲线使用 iconMotionAt。

<a id="effect-11-twelve-grid"></a>

## 十二种风格收进作品墙

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/11-twelve-grid.zip) · [在线读主源码](source/11-twelve-grid.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/11-twelve-grid.zip)

主页和图标缩进四列三行展示墙，到位以后每一格以不同相位轻轻平移、转动。

原版核心提取。React、SVG、WebGL 着色器与 Remotion 的原绘图组件。独立版用浏览器时钟，用本地贴图库加载 12 种图标。

保留发布版时序、图形采样与材质插值。图层压缩为带透明度的 WebP，预览使用系统字体。

主源码在 effect.js，完整使用步骤在包内 README.md。

### 可复制的提示词

主页和图标缩进四列三行展示墙，到位以后每一格以不同相位轻轻平移、转动。 使用真实轮廓和同一组图标，保持版面可读，交付可拖动的独立组件。

[回到全部笔记](README.md)
