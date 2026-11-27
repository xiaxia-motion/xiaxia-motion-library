# 卡片交互

> [✨ 在线展馆试玩本期](https://xiaxia-motion.github.io/xiaxia-motion-library/#note=3) · [← 返回全库首页](../README.md)

《【AI教程】第3集：适合网页、app、小程序》 · 2026-11-07 · 夏夏的AI灵感

本条笔记共 4 组。每一组有自己的源码和离线预览。

[悬浮分层](#effect-03-rm17-01) · [叠卡换位](#effect-03-rm17-02) · [共享展开](#effect-03-rm17-03) · [方向揭幕](#effect-03-rm17-04)

<a id="effect-03-rm17-01"></a>

## 悬浮分层

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=03-rm17-01) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/03-rm17-01.zip) · [在线读主源码](../source/03-rm17-01.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/zips/03-rm17-01.zip)

单组件截取帧区间 [0, 300)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。窗口内的摄影缩图采用程序绘制的山景。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「悬浮分层」。图片、标题和朱红书签各自抬起，指针牵动真实透视。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。移动指针，卡片绕X/Y轴转动，图片、文字、书签按不同高度抬起。 聚焦卡片后使用方向键；Esc、离开或“回到原位”恢复平面。 多次快速移入移出只保留当前目标，不排队播放旧动作。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

<a id="effect-03-rm17-02"></a>

## 叠卡换位

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=03-rm17-02) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/03-rm17-02.zip) · [在线读主源码](../source/03-rm17-02.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/zips/03-rm17-02.zip)

单组件截取帧区间 [300, 600)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。窗口内的摄影缩图采用程序绘制的山景。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「叠卡换位」。拖出前卡沿弧线归入牌堆，后卡自然补位。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。向左或右拖动前卡，超过牌堆宽度18%后完成换位。 拖动不足或取消触摸会归位；“下一张”和“带回上一张”支持键盘。 连续点按钮只保留当前动作与最后一个待执行方向；卡片不会复制或丢失。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

<a id="effect-03-rm17-03"></a>

## 共享展开

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=03-rm17-03) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/03-rm17-03.zip) · [在线读主源码](../source/03-rm17-03.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/zips/03-rm17-03.zip)

单组件截取帧区间 [600, 900)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。窗口内的摄影缩图采用程序绘制的山景。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「共享展开」。同一封面与标题从竖卡连续长成横向详情。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。点击《光的秩序》卡片，卡框、同一张图和标题连续移动到详情布局。 点击右上关闭、Esc或下方切换按钮，沿原路径收回。 动画中也可以反向操作；关闭后焦点回到原卡。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

<a id="effect-03-rm17-04"></a>

## 方向揭幕

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=03-rm17-04) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/03-rm17-04.zip) · [在线读主源码](../source/03-rm17-04.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/zips/03-rm17-04.zip)

单组件截取帧区间 [900, 1200)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。窗口内的摄影缩图采用程序绘制的山景。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「方向揭幕」。信息遮罩从真正进入的一侧滑来，从离开的一侧退走。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。从任意边缘移入卡片，遮罩从最近边进入；移出时从离开边退出。 聚焦卡片用方向键指定进入边，Esc退出；下方按钮也可操作。 从底部进入时改用墨绿渐变，山景和朱红书签保持原位。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

[回到全部笔记](../README.md)
