# 展开方式

《【AI教程】第6集：4种标签展开方式》 · 2026-11-09 · 夏夏的AI灵感

本条笔记共 4 组。每一组有自己的源码和离线预览。

[环形散开](#effect-06-rm01-01) · [墨滴展开](#effect-06-rm01-02) · [横向拉开](#effect-06-rm01-03) · [纵向滑选](#effect-06-rm01-04)

<a id="effect-06-rm01-01"></a>

## 环形散开

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/06-rm01-01.zip) · [在线读主源码](source/06-rm01-01.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/06-rm01-01.zip)

单组件截取帧区间 [172, 467)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「环形散开」。一枚朱红加号，展开成文字、图片、音频和视频四个入口。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。点击加号，四个选项依次向四个方向展开。 点击任一选项，会显示本次选择并收起菜单。 方向键可展开和切换，Home/End跳转首尾，Escape收起并回到加号。 这里只选择创作类型，不会新建或上传任何文件。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

<a id="effect-06-rm01-02"></a>

## 墨滴展开

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/06-rm01-02.zip) · [在线读主源码](source/06-rm01-02.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/06-rm01-02.zip)

单组件截取帧区间 [497, 591)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「墨滴展开」。墨绿轮廓从一点长开，四个素材入口在柔软墨滴里显露。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。点击加号打开菜单，文字、图片、音频、视频按两行两列出现。 鼠标悬停或键盘聚焦选项会高亮；点击确认后收起并显示结果。 方向键切换选项，Home/End到首尾，Escape收起；加号可以快速反向切换。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

<a id="effect-06-rm01-03"></a>

## 横向拉开

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/06-rm01-03.zip) · [在线读主源码](source/06-rm01-03.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/06-rm01-03.zip)

单组件截取帧区间 [670, 938)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「横向拉开」。加号沿轨道拉出胶囊，选项始终留在裁切边界内。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。点击加号，或按住加号向右拖动，展开横向素材轨道。 悬停或聚焦时红色底板滑向对应选项，点击选中后收起。 拖到一半以上松手会展开；取消拖动恢复开始状态。方向键、Home/End和Escape可操作。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

<a id="effect-06-rm01-04"></a>

## 纵向滑选

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/06-rm01-04.zip) · [在线读主源码](source/06-rm01-04.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/06-rm01-04.zip)

单组件截取帧区间 [952, 1250)，每秒 60 帧。可操作版的具体输入见下文。

原版核心提取。原片使用 React 19.2.3、Remotion 4.0.539、SVG；离线入口复用绘制函数和 React，逐帧时间由浏览器驱动。React 与 ReactDOM 随包附 MIT 许可。

按原组件绘制函数及发布版动作曲线拆分，移除栏目包装。

主源码在 effect.js，完整使用步骤在包内 README.md。 还可以直接打开 interactive/index.html 自己动手操作。

### 可复制的提示词

请用 React 和 SVG 单独实现「纵向滑选」。红色选择窗沿四行滑动，松手后确认当前素材。参考 effect.js 中的原始绘图坐标、曲线与取帧区间，在一个 4∶3 容器按每秒 60 帧演示。保留动作前的初态、运动中的过渡与结束后的稳定姿势，不能用静图切换代替。

真实操作版要让访客自己触发同样的反馈。点击加号展开四行素材。按住列表上下拖动，红色窗口跟随最近行。 松手确认当前行并收起；点击单行也可确认。 方向键预选、Enter/空格确认、Home/End到首尾、Escape取消；pointercancel恢复拖动前预选。 将操作、绘制与计时放在各自容器中，支持重新操作；照着 interactive 文件夹的输入处理实现。

[回到全部笔记](README.md)
