# 健身打卡

> [✨ 在线展馆试玩本期](https://xiaxia-motion.github.io/xiaxia-motion-library/#note=5) · [← 返回全库首页](../README.md)

《【AI教程】第5集：健身打卡平台的组件交互》 · 2026-11-08 · 夏夏的AI灵感

本条笔记共 4 组。每一组有自己的源码和离线预览。

[周历滑选](#effect-05-rm24-01) · [训练卡展开](#effect-05-rm24-02) · [次数滚轮](#effect-05-rm24-03) · [长按打卡](#effect-05-rm24-04)

<a id="effect-05-rm24-01"></a>

## 周历滑选

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=05-rm24-01) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/05-rm24-01.zip) · [在线读主源码](../source/05-rm24-01.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/zips/05-rm24-01.zip)

单组件截取帧区间 [166, 388)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「周历滑选」。日期沿立体弧线排开，左右拖动逐日吸附。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。演示11月1–30日，初始05。左右拖动每40px约一天，松手停在整数日期；方向键和前后按钮可选择。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

<a id="effect-05-rm24-02"></a>

## 训练卡展开

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=05-rm24-02) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/05-rm24-02.zip) · [在线读主源码](../source/05-rm24-02.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/zips/05-rm24-02.zip)

单组件截取帧区间 [388, 724)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「训练卡展开」。训练卡横向展开记录，金属哑铃保留在卡面。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。点击展开训练记录，再点击记录第三组，状态只在本页保存。可随时收起；数据用于界面示例。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

<a id="effect-05-rm24-03"></a>

## 次数滚轮

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=05-rm24-03) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/05-rm24-03.zip) · [在线读主源码](../source/05-rm24-03.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/zips/05-rm24-03.zip)

单组件截取帧区间 [724, 1064)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「次数滚轮」。机械数字滚轮逐档吸附，合计次数同步变化。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。第三组初始10次，范围1–30次。向上拖动或按上键增加，下键减少；前两组各10次，合计实时更新。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

<a id="effect-05-rm24-04"></a>

## 长按打卡

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=05-rm24-04) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/05-rm24-04.zip) · [在线读主源码](../source/05-rm24-04.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/zips/05-rm24-04.zip)

单组件截取帧区间 [1064, 1394)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「长按打卡」。按住圆盘，红色进度绕满一圈后留下完成印记。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。鼠标、触摸或键盘空格/回车按住1.2秒。提前松开、移出、失焦或离屏都会取消；完成后本周示例由3/4变4/4。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

[回到全部笔记](../README.md)
