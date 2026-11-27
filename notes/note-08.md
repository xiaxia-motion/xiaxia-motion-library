# 通知消息

> [✨ 在线展馆试玩本期](https://xiaxia-motion.github.io/xiaxia-motion-library/#note=8) · [← 返回全库首页](../README.md)

《【AI教程】第8集：消息弹窗》 · 2026-11-11 · 夏夏的AI灵感

本条笔记共 4 组。每一组有自己的源码和离线预览。

[流体通知岛](#effect-08-rm16-01) · [纸卡堆栈](#effect-08-rm16-02) · [边缘回执](#effect-08-rm16-03) · [轨道归档](#effect-08-rm16-04)

<a id="effect-08-rm16-01"></a>

## 流体通知岛

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=08-rm16-01) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/08-rm16-01.zip) · [在线读主源码](../source/08-rm16-01.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/zips/08-rm16-01.zip)

单组件截取帧区间 [0, 300)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。窗口内的摄影缩图采用程序绘制的山景。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「流体通知岛」。同一个胶囊变为完整消息卡，查看操作会真正减少未读数。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。点击山野项目胶囊展开，文字在底形变大后进入。 点击查看作品会把这一条标记已读，未读数从 3 变成 2，重复点击不会再次减少。 收起按钮、再次点击顶部或 Escape 关闭，焦点回到顶部触发区。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

<a id="effect-08-rm16-02"></a>

## 纸卡堆栈

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=08-rm16-02) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/08-rm16-02.zip) · [在线读主源码](../source/08-rm16-02.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/zips/08-rm16-02.zip)

单组件截取帧区间 [300, 600)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。窗口内的摄影缩图采用程序绘制的山景。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「纸卡堆栈」。三条消息展开为独立纸卡，已读只更新当前那一条。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。点击展开 3 条消息，纸卡依次从叠放位置来到独立行。 点击某条只标记该条已读，卡片身份与顺序保持不变。 收起后后两条隐藏消息不进入键盘焦点；再次展开可继续查看。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

<a id="effect-08-rm16-03"></a>

## 边缘回执

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=08-rm16-03) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/08-rm16-03.zip) · [在线读主源码](../source/08-rm16-03.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/zips/08-rm16-03.zip)

单组件截取帧区间 [600, 900)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。窗口内的摄影缩图采用程序绘制的山景。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「边缘回执」。保存回执从右边缘展开，悬停暂停倒计时，撤销恢复版本。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。保存会让示例版本递增，并从右边缘展开可读回执。 回执出现 6 秒后关闭；鼠标停留或键盘焦点在回执里时暂停计时。 撤销恢复本次保存前的版本，回执改成已恢复；再次保存可重新撤销。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

<a id="effect-08-rm16-04"></a>

## 轨道归档

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=08-rm16-04) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/08-rm16-04.zip) · [在线读主源码](../source/08-rm16-04.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/zips/08-rm16-04.zip)

单组件截取帧区间 [900, 1200)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。窗口内的摄影缩图采用程序绘制的山景。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「轨道归档」。通知从项目节点沿独立弧线归位，最终记录一直保留。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。点击归档 3 条消息，消息标记沿三条不同弧线进入时间线。 卡片按 5 分钟前、2 分钟前、刚刚的顺序排列，落位后不会自动消失。 点击已归档卡片查看本地上下文；复位能取消当前归档并重新开始。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

[回到全部笔记](../README.md)
