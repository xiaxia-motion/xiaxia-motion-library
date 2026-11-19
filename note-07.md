# 滑杆调节

《【AI教程】第7集：适用播放器、图片编辑》 · 2026-11-10 · 夏夏的AI灵感

本条笔记共 4 组。每一组有自己的源码和离线预览。

[双向刻度滑杆](#effect-07-rm09-01) · [固定指针色温滑尺](#effect-07-rm09-02) · [弧形角度滑杆](#effect-07-rm09-03) · [前后对比滑杆](#effect-07-rm09-04)

<a id="effect-07-rm09-01"></a>

## 双向刻度滑杆

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/07-rm09-01.zip) · [在线读主源码](source/07-rm09-01.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/07-rm09-01.zip)

单组件截取帧区间 [140, 337)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。示例摄影替换为程序山景。曝光、色温、旋转、对比与原手柄仍在同一步进中计算。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「双向刻度滑杆」。从零点向左右拉出一条金线，曝光读数随手柄连续变化。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。按住圆钮或点按横轨，向左降低、向右提高；范围 −1.50 至 +1.50 EV。 聚焦主滑杆或下方原生滑杆后用方向键调节；主滑杆的 Home / End 到两端，PageUp / PageDown 每次调 0.10。 松开保留数值，点击复位回到 0.00；只改变示例读数。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

<a id="effect-07-rm09-02"></a>

## 固定指针色温滑尺

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/07-rm09-02.zip) · [在线读主源码](source/07-rm09-02.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/07-rm09-02.zip)

单组件截取帧区间 [342, 600)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。示例摄影替换为程序山景。曝光、色温、旋转、对比与原手柄仍在同一步进中计算。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「固定指针色温滑尺」。中央指针保持不动，整条色温刻度从下方滑过。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。按住炭灰标尺横向拖动，指针始终固定在中央；向左拉刻度会提高色温。 下方原生滑杆和主滑尺的方向键都能调节，范围 2500–7500 K，步长 50 K。 点击复位回到 3700 K；这是数值示例，不调整显示器。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

<a id="effect-07-rm09-03"></a>

## 弧形角度滑杆

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/07-rm09-03.zip) · [在线读主源码](source/07-rm09-03.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/07-rm09-03.zip)

单组件截取帧区间 [604, 884)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。示例摄影替换为程序山景。曝光、色温、旋转、对比与原手柄仍在同一步进中计算。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「弧形角度滑杆」。琥珀圆钮贴着圆弧移动，金线从弧顶连接到当前角度。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。点按或沿圆弧拖动，手柄始终贴着弧线；零点在弧顶。 范围 −8.0° 至 +8.0°，方向键每次调整 0.1°，Home / End 到两端。 下方滑杆同样可用，复位回到 0.0°。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

<a id="effect-07-rm09-04"></a>

## 前后对比滑杆

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/07-rm09-04.zip) · [在线读主源码](source/07-rm09-04.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/07-rm09-04.zip)

单组件截取帧区间 [886, 1204)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。示例摄影替换为程序山景。曝光、色温、旋转、对比与原手柄仍在同一步进中计算。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「前后对比滑杆」。图像固定不动，暖白分界线只改变左右版本的可见面积。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。拖动竖向分界线或点按图片，左右查看同一插画的调整前后。 键盘方向键每次移动 1%，Home / End 到 0% / 100%；下方滑杆同样可用。 图片保持配准，只改变遮罩；复位回到中间。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

[回到全部笔记](README.md)
