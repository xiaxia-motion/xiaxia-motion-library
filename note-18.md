# 黑白极简 UI · 14 组独立动效

夏夏的AI灵感 · 源码更新于 2026-11-22。取自工作台 28.60 秒连续运镜版正文。十四个包保留各自的面板、原始绘制函数及操作节奏，独立展示时固定外框。

点名称可跳到该项。下载 ZIP 并完整解压，双击 index.html 看原片动作，点「自己操作」试用。每组下方都能直接复制提示词。

[黑白按压按钮](#effect-18-mono-button) · [三段加载与完成勾](#effect-18-mono-loader) · [线性波形播放器](#effect-18-mono-player) · [双端范围筛选](#effect-18-mono-slider) · [方形同步开关](#effect-18-mono-switch) · [下划线导航](#effect-18-mono-tabs) · [命令搜索框](#effect-18-mono-search) · [搜索结果选中](#effect-18-mono-results) · [七日趋势描线与查数](#effect-18-mono-chart) · [横向日期带](#effect-18-mono-calendar) · [黑底模式清单](#effect-18-mono-menu) · [复选与单选设置面板](#effect-18-mono-choices) · [确认与返回对话框](#effect-18-mono-dialog) · [三阶段细线进度](#effect-18-mono-progress)

<a id="effect-18-mono-button"></a>

## 黑白按压按钮

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/18-mono-button.zip) · [在线读主源码](source/18-mono-button.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/18-mono-button.zip)

点黑色「开始」键或按空格观察按下和松开。

黑色直角键面、白色粗字，外壳保留下沿。按下时键面下移并纵向压扁，从接触前一帧到松开后五帧完成反馈。

### 可复制的提示词

请用可直接在浏览器打开的 SVG 和 JavaScript 实现「黑白按压按钮」。黑色直角键面、白色粗字，外壳保留下沿。按下时键面下移并纵向压扁，从接触前一帧到松开后五帧完成反馈。

近白底 #fafafa、墨黑 #171717、白色面板、灰线 #bdbdbd；黑白反转强调选择，细黑下沿提示键面厚度。按 460×136 的逻辑尺寸绘制，等比缩放。以每秒 60 帧为动作参考，演示约 0.52 秒。另提供真实操作版本。点黑色「开始」键或按空格观察按下和松开。所有资源放在同一解压目录内。

<a id="effect-18-mono-loader"></a>

## 三段加载与完成勾

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/18-mono-loader.zip) · [在线读主源码](source/18-mono-loader.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/18-mono-loader.zip)

点击或按回车重播加载到完成。

在同一白色外壳中画三条 26×12 的黑短条，错相改变透明度。完成时以清晰的黑色对勾取代短条。

### 可复制的提示词

请用可直接在浏览器打开的 SVG 和 JavaScript 实现「三段加载与完成勾」。在同一白色外壳中画三条 26×12 的黑短条，错相改变透明度。完成时以清晰的黑色对勾取代短条。

近白底 #fafafa、墨黑 #171717、白色面板、灰线 #bdbdbd；黑白反转强调选择，细黑下沿提示键面厚度。按 240×150 的逻辑尺寸绘制，等比缩放。以每秒 60 帧为动作参考，演示约 0.90 秒。另提供真实操作版本。点击或按回车重播加载到完成。所有资源放在同一解压目录内。

<a id="effect-18-mono-player"></a>

## 线性波形播放器

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/18-mono-player.zip) · [在线读主源码](source/18-mono-player.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/18-mono-player.zip)

点播放键切换波形运动，拖动时间线定位；左右键快退、快进。播放器为静音示例。

绘制 43 条竖向波形，根据当前位置区分黑线和浅灰线。播放时波形持续变化，演示进度由 32% 拖到 86%，160 秒刻度和下方时码联动。

### 可复制的提示词

请用可直接在浏览器打开的 SVG 和 JavaScript 实现「线性波形播放器」。绘制 43 条竖向波形，根据当前位置区分黑线和浅灰线。播放时波形持续变化，演示进度由 32% 拖到 86%，160 秒刻度和下方时码联动。

近白底 #fafafa、墨黑 #171717、白色面板、灰线 #bdbdbd；黑白反转强调选择，细黑下沿提示键面厚度。按 820×340 的逻辑尺寸绘制，等比缩放。以每秒 60 帧为动作参考，演示约 1.95 秒。另提供真实操作版本。点播放键切换波形运动，拖动时间线定位；左右键快退、快进。播放器为静音示例。所有资源放在同一解压目录内。

<a id="effect-18-mono-slider"></a>

## 双端范围筛选

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/18-mono-slider.zip) · [在线读主源码](source/18-mono-slider.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/18-mono-slider.zip)

拖动左、右两个空心手柄，Tab 可通过下方的两个范围输入分别调整。

用一条细灰轨道和黑色选中区间，配两个白底黑边圆形滑帽。片中左端保持 20，右端先降再升；手动版两个手柄均可调节且互不越过。

### 可复制的提示词

请用可直接在浏览器打开的 SVG 和 JavaScript 实现「双端范围筛选」。用一条细灰轨道和黑色选中区间，配两个白底黑边圆形滑帽。片中左端保持 20，右端先降再升；手动版两个手柄均可调节且互不越过。

近白底 #fafafa、墨黑 #171717、白色面板、灰线 #bdbdbd；黑白反转强调选择，细黑下沿提示键面厚度。按 850×210 的逻辑尺寸绘制，等比缩放。以每秒 60 帧为动作参考，演示约 1.70 秒。另提供真实操作版本。拖动左、右两个空心手柄，Tab 可通过下方的两个范围输入分别调整。所有资源放在同一解压目录内。

<a id="effect-18-mono-switch"></a>

## 方形同步开关

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/18-mono-switch.zip) · [在线读主源码](source/18-mono-switch.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/18-mono-switch.zip)

点 ON / OFF 或按空格切换自动同步。

「自动同步」右侧是 116×60 的矩形开关。关闭为白底黑字 OFF，开启为黑底白字 ON，演示完成一开一关。

### 可复制的提示词

请用可直接在浏览器打开的 SVG 和 JavaScript 实现「方形同步开关」。「自动同步」右侧是 116×60 的矩形开关。关闭为白底黑字 OFF，开启为黑底白字 ON，演示完成一开一关。

近白底 #fafafa、墨黑 #171717、白色面板、灰线 #bdbdbd；黑白反转强调选择，细黑下沿提示键面厚度。按 570×190 的逻辑尺寸绘制，等比缩放。以每秒 60 帧为动作参考，演示约 0.77 秒。另提供真实操作版本。点 ON / OFF 或按空格切换自动同步。所有资源放在同一解压目录内。

<a id="effect-18-mono-tabs"></a>

## 下划线导航

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/18-mono-tabs.zip) · [在线读主源码](source/18-mono-tabs.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/18-mono-tabs.zip)

点概览、趋势、详情，或按左右键切换。

沿细灰色基线滑动黑色下划线，让选中标题加粗。按概览、趋势、详情三个等宽栏目计算位置，保持组件外框固定。

### 可复制的提示词

请用可直接在浏览器打开的 SVG 和 JavaScript 实现「下划线导航」。沿细灰色基线滑动黑色下划线，让选中标题加粗。按概览、趋势、详情三个等宽栏目计算位置，保持组件外框固定。

近白底 #fafafa、墨黑 #171717、白色面板、灰线 #bdbdbd；黑白反转强调选择，细黑下沿提示键面厚度。按 810×170 的逻辑尺寸绘制，等比缩放。以每秒 60 帧为动作参考，演示约 0.77 秒。另提供真实操作版本。点概览、趋势、详情，或按左右键切换。所有资源放在同一解压目录内。

<a id="effect-18-mono-search"></a>

## 命令搜索框

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/18-mono-search.zip) · [在线读主源码](source/18-mono-search.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/18-mono-search.zip)

点输入区打字，按回车或点右侧键提交。

白底黑线框，左侧放放大镜，右侧显示 ⌘ K 或「回车」。演示从空值依次输入「数」「数据」，光标紧随文字闪烁。

### 可复制的提示词

请用可直接在浏览器打开的 SVG 和 JavaScript 实现「命令搜索框」。白底黑线框，左侧放放大镜，右侧显示 ⌘ K 或「回车」。演示从空值依次输入「数」「数据」，光标紧随文字闪烁。

近白底 #fafafa、墨黑 #171717、白色面板、灰线 #bdbdbd；黑白反转强调选择，细黑下沿提示键面厚度。按 880×144 的逻辑尺寸绘制，等比缩放。以每秒 60 帧为动作参考，演示约 1.00 秒。另提供真实操作版本。点输入区打字，按回车或点右侧键提交。所有资源放在同一解压目录内。

<a id="effect-18-mono-results"></a>

## 搜索结果选中

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/18-mono-results.zip) · [在线读主源码](source/18-mono-results.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/18-mono-results.zip)

点击结果行。上下键移动选中项，回车确认。

在搜索框下列出访问趋势、访问统计、来源分析。选中时黑底横向展开，当前行文字和右侧符号反白，其余两行保留白底。

### 可复制的提示词

请用可直接在浏览器打开的 SVG 和 JavaScript 实现「搜索结果选中」。在搜索框下列出访问趋势、访问统计、来源分析。选中时黑底横向展开，当前行文字和右侧符号反白，其余两行保留白底。

近白底 #fafafa、墨黑 #171717、白色面板、灰线 #bdbdbd；黑白反转强调选择，细黑下沿提示键面厚度。按 880×450 的逻辑尺寸绘制，等比缩放。以每秒 60 帧为动作参考，演示约 1.72 秒。另提供真实操作版本。点击结果行。上下键移动选中项，回车确认。所有资源放在同一解压目录内。

<a id="effect-18-mono-chart"></a>

## 七日趋势描线与查数

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/18-mono-chart.zip) · [在线读主源码](source/18-mono-chart.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/18-mono-chart.zip)

在图上左右移动或拖动查看数值，也可使用左右键。

在七个真实采样点之间绘制平滑黑线，按路径长度由左至右显现。随后用竖向虚线和黑底浮签读数，保持原来的浅灰网格与面积。

### 可复制的提示词

请用可直接在浏览器打开的 SVG 和 JavaScript 实现「七日趋势描线与查数」。在七个真实采样点之间绘制平滑黑线，按路径长度由左至右显现。随后用竖向虚线和黑底浮签读数，保持原来的浅灰网格与面积。

近白底 #fafafa、墨黑 #171717、白色面板、灰线 #bdbdbd；黑白反转强调选择，细黑下沿提示键面厚度。按 950×520 的逻辑尺寸绘制，等比缩放。以每秒 60 帧为动作参考，演示约 2.87 秒。另提供真实操作版本。在图上左右移动或拖动查看数值，也可使用左右键。所有资源放在同一解压目录内。

<a id="effect-18-mono-calendar"></a>

## 横向日期带

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/18-mono-calendar.zip) · [在线读主源码](source/18-mono-calendar.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/18-mono-calendar.zip)

点击 14 至 20 日选择，左右键切日，回车确认。

在一行里排七天，上方星期、下方日期。当前日期用黑色方片与白字突出，下方同步显示十一月日期，右边保留「确定」入口。

### 可复制的提示词

请用可直接在浏览器打开的 SVG 和 JavaScript 实现「横向日期带」。在一行里排七天，上方星期、下方日期。当前日期用黑色方片与白字突出，下方同步显示十一月日期，右边保留「确定」入口。

近白底 #fafafa、墨黑 #171717、白色面板、灰线 #bdbdbd；黑白反转强调选择，细黑下沿提示键面厚度。按 870×310 的逻辑尺寸绘制，等比缩放。以每秒 60 帧为动作参考，演示约 1.00 秒。另提供真实操作版本。点击 14 至 20 日选择，左右键切日，回车确认。所有资源放在同一解压目录内。

<a id="effect-18-mono-menu"></a>

## 黑底模式清单

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/18-mono-menu.zip) · [在线读主源码](source/18-mono-menu.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/18-mono-menu.zip)

点任意一行或按上下键选择模式。

三行依次为均衡、专注、轻盈。让黑色选中背景按照原节奏在行间滑动，选中行显示白色标签和右侧对勾。

### 可复制的提示词

请用可直接在浏览器打开的 SVG 和 JavaScript 实现「黑底模式清单」。三行依次为均衡、专注、轻盈。让黑色选中背景按照原节奏在行间滑动，选中行显示白色标签和右侧对勾。

近白底 #fafafa、墨黑 #171717、白色面板、灰线 #bdbdbd；黑白反转强调选择，细黑下沿提示键面厚度。按 710×395 的逻辑尺寸绘制，等比缩放。以每秒 60 帧为动作参考，演示约 0.53 秒。另提供真实操作版本。点任意一行或按上下键选择模式。所有资源放在同一解压目录内。

<a id="effect-18-mono-choices"></a>

## 复选与单选设置面板

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/18-mono-choices.zip) · [在线读主源码](source/18-mono-choices.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/18-mono-choices.zip)

点击左列独立勾选，点击右列选择一种提醒强度；Tab 可操作下方的同名选项。

在左列放三个方形复选框，右列放三个圆形单选框。逐个打开自动保存、消息提醒，再选标准提醒。保留底部「继续」按钮。

### 可复制的提示词

请用可直接在浏览器打开的 SVG 和 JavaScript 实现「复选与单选设置面板」。在左列放三个方形复选框，右列放三个圆形单选框。逐个打开自动保存、消息提醒，再选标准提醒。保留底部「继续」按钮。

近白底 #fafafa、墨黑 #171717、白色面板、灰线 #bdbdbd；黑白反转强调选择，细黑下沿提示键面厚度。按 850×380 的逻辑尺寸绘制，等比缩放。以每秒 60 帧为动作参考，演示约 1.23 秒。另提供真实操作版本。点击左列独立勾选，点击右列选择一种提醒强度；Tab 可操作下方的同名选项。所有资源放在同一解压目录内。

<a id="effect-18-mono-dialog"></a>

## 确认与返回对话框

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/18-mono-dialog.zip) · [在线读主源码](source/18-mono-dialog.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/18-mono-dialog.zip)

点确认保存，点返回复位。回车和 Esc 也能操作。

白色黑边外壳内放感叹号、保存问题以及一白一黑两枚按钮。确认后改成对勾，标题和确认按钮一起切到完成状态。

### 可复制的提示词

请用可直接在浏览器打开的 SVG 和 JavaScript 实现「确认与返回对话框」。白色黑边外壳内放感叹号、保存问题以及一白一黑两枚按钮。确认后改成对勾，标题和确认按钮一起切到完成状态。

近白底 #fafafa、墨黑 #171717、白色面板、灰线 #bdbdbd；黑白反转强调选择，细黑下沿提示键面厚度。按 740×340 的逻辑尺寸绘制，等比缩放。以每秒 60 帧为动作参考，演示约 0.53 秒。另提供真实操作版本。点确认保存，点返回复位。回车和 Esc 也能操作。所有资源放在同一解压目录内。

<a id="effect-18-mono-progress"></a>

## 三阶段细线进度

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/18-mono-progress.zip) · [在线读主源码](source/18-mono-progress.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/18-mono-progress.zip)

点击面板或按回车重新执行加载。

让大号百分比、黑色细线和「载入、整理、就绪」三个节点使用同一进度。演示在 37%、68% 后短暂停留，最后到达 100%。

### 可复制的提示词

请用可直接在浏览器打开的 SVG 和 JavaScript 实现「三阶段细线进度」。让大号百分比、黑色细线和「载入、整理、就绪」三个节点使用同一进度。演示在 37%、68% 后短暂停留，最后到达 100%。

近白底 #fafafa、墨黑 #171717、白色面板、灰线 #bdbdbd；黑白反转强调选择，细黑下沿提示键面厚度。按 810×330 的逻辑尺寸绘制，等比缩放。以每秒 60 帧为动作参考，演示约 1.65 秒。另提供真实操作版本。点击面板或按回车重新执行加载。所有资源放在同一解压目录内。

## 工具与技术规格

原片使用 SVG、GSAP 3.14.2、Chromium 取帧和 FFmpeg 封装。独立预览使用浏览器原生 SVG、JavaScript、指针与键盘事件以及 requestAnimationFrame，可直接离线打开。 演示和手动操作分别有独立入口。播放器示例为静音。每包标明原片帧区间、逻辑尺寸和调参位置。

[全部动效](README.md) · [技术规范](TECHNICAL.md) · [许可](LICENSE)
