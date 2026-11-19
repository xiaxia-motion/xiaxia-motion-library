# 鼠标指针

《效果适用于网页、app、小程序等UI设计。》 · 2026-11-07 · 夏夏的AI灵感

本条笔记共 4 组。每一组有自己的源码和离线预览。

[目光追踪](#effect-01-rm11-01) · [字面受压](#effect-01-rm11-02) · [局部透镜](#effect-01-rm11-03) · [磁吸按钮](#effect-01-rm11-04)

<a id="effect-01-rm11-01"></a>

## 目光追踪

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/01-rm11-01.zip) · [在线读主源码](source/01-rm11-01.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/01-rm11-01.zip)

单组件截取帧区间 [166, 454)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。摄影示例使用包内程序绘制的山景，便于替换自己的图。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「目光追踪」。墨绿小头像轻微偏头，瞳孔始终留在眼白内部。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。在头像区域移动指针，头部和两只瞳孔会柔和跟随。 键盘聚焦头像后使用方向键看向四方，Home 回到正中。 点击探索作品会展开本地简介；不跳转、不联系外部服务。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

<a id="effect-01-rm11-02"></a>

## 字面受压

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/01-rm11-02.zip) · [在线读主源码](source/01-rm11-02.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/01-rm11-02.zip)

单组件截取帧区间 [488, 762)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。摄影示例使用包内程序绘制的山景，便于替换自己的图。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「字面受压」。近处汉字变宽，邻字压缩，四字总宽度始终不变。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。在四个字上移动指针，最近的字扩宽并变暖，邻字同时收窄。 左右方向键选择受压字，Home / End 到首尾，Escape 复原。 移开或失焦后约 0.24 秒恢复；没有换行或文字相互覆盖。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

<a id="effect-01-rm11-03"></a>

## 局部透镜

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/01-rm11-03.zip) · [在线读主源码](source/01-rm11-03.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/01-rm11-03.zip)

单组件截取帧区间 [802, 1122)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。摄影示例使用包内程序绘制的山景，便于替换自己的图。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「局部透镜」。圆形镜片跟随真实指针，镜中同一细节精确放大两倍。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。指针进入插画会展开圆形透镜，移动时查看对应位置的 2× 细节。 聚焦图片后可用方向键每次移动 8%，Escape 收起。 移开或失焦后透镜收回；图片与透镜都被同一矩形窗口裁切。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

<a id="effect-01-rm11-04"></a>

## 磁吸按钮

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/01-rm11-04.zip) · [在线读主源码](source/01-rm11-04.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/01-rm11-04.zip)

单组件截取帧区间 [1162, 1440)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。摄影示例使用包内程序绘制的山景，便于替换自己的图。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「磁吸按钮」。底板与文字分层吸向指针，点击后收藏状态明确保留。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。靠近聊聊项目或收藏作品集，按钮底板和文字会以不同幅度跟随。 点击收藏会变成已收藏，再次点击取消；键盘空格与回车可操作。 聊聊项目只显示本地需求提示，不发送消息或打开外部网站。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

[回到全部笔记](README.md)
