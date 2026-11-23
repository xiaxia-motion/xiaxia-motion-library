# 新拟物 UI · 14 组独立动效

夏夏的AI灵感 · 2026 年 11 月 23 日发布，来自《已开源：14组新拟物风格组件动效》的材质与动作优化版。

点「下载源码 ZIP」，解压后双击 index.html 看原片动作，再点「自己操作」。每组附可复制的提示词、中文说明和 MIT 许可。示例均可离线使用，音频控制台展示静音波形。

[下沉启动键](#effect-19-neumorph-button) · [环形加载与完成勾](#effect-19-neumorph-loader) · [波形音频控制台](#effect-19-neumorph-player) · [270° 音量旋钮](#effect-19-neumorph-slider) · [凹凸电源开关](#effect-19-neumorph-switch) · [三段实体模式键](#effect-19-neumorph-tabs) · [内凹搜索框](#effect-19-neumorph-search) · [搜索结果展开与选中](#effect-19-neumorph-results) · [七日趋势描线与查数](#effect-19-neumorph-chart) · [滚轮日期选择器](#effect-19-neumorph-calendar) · [凹面模式菜单](#effect-19-neumorph-menu) · [复选与单选设置](#effect-19-neumorph-choices) · [确认保存对话框](#effect-19-neumorph-dialog) · [分段圆环进度](#effect-19-neumorph-progress)

<a id="effect-19-neumorph-button"></a>

## 下沉启动键

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/19-neumorph-button.zip) · [在线读主源码](source/19-neumorph-button.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/19-neumorph-button.zip)

将一枚宽键帽放进圆角底座，顶面左亮右暗。触碰时键面向下移动最多 8 个逻辑像素，纵向压到 91.5%，投影换成贴面短影，再松开回到凸起状态。 点击「启动」，或在控件上按空格重播按压。

### 可复制的提示词

```text
请用 SVG 和原生 JavaScript 实现一枚「下沉启动键」。将一枚宽键帽放进圆角底座，顶面左亮右暗。触碰时键面向下移动最多 8 个逻辑像素，纵向压到 91.5%，投影换成贴面短影，再松开回到凸起状态。

面板以灰白 #e7e7e3 为底，墨绿 #2f443b 写标题，深绿 #376653 标记活动状态。左上白色高光和右下灰绿软影决定凸起方向，凹部用上暗下亮的渐变。控件按 460 × 160 逻辑像素绘制，等比缩放。以 60 帧/秒为时间参考，把这段动作安排在约 0.53 秒内，提供播放、暂停和拖动进度。另做可直接操作的入口。点击「启动」，或在控件上按空格重播按压。将所需资源都放在同一个离线文件夹中。
```

<a id="effect-19-neumorph-loader"></a>

## 环形加载与完成勾

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/19-neumorph-loader.zip) · [在线读主源码](source/19-neumorph-loader.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/19-neumorph-loader.zip)

在浅灰凸面上围一圈 12 根绿色短刻线，内半径 46，外半径 56。亮度沿相邻刻线错相流动。完成时整圈切换为深绿对勾，居中停住。 点击或按回车重新播放一轮加载。

### 可复制的提示词

```text
请用 SVG 和原生 JavaScript 实现一枚「环形加载与完成勾」。在浅灰凸面上围一圈 12 根绿色短刻线，内半径 46，外半径 56。亮度沿相邻刻线错相流动。完成时整圈切换为深绿对勾，居中停住。

面板以灰白 #e7e7e3 为底，墨绿 #2f443b 写标题，深绿 #376653 标记活动状态。左上白色高光和右下灰绿软影决定凸起方向，凹部用上暗下亮的渐变。控件按 240 × 230 逻辑像素绘制，等比缩放。以 60 帧/秒为时间参考，把这段动作安排在约 0.90 秒内，提供播放、暂停和拖动进度。另做可直接操作的入口。点击或按回车重新播放一轮加载。将所需资源都放在同一个离线文件夹中。
```

<a id="effect-19-neumorph-player"></a>

## 波形音频控制台

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/19-neumorph-player.zip) · [在线读主源码](source/19-neumorph-player.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/19-neumorph-player.zip)

上方长槽内放 33 根左右等距的波形线。中央圆键在播放箭头和暂停符号间切换，两侧是减号和加号。底轨的填充、滑帽和时间读数共用一个进度。演示内的 160 秒刻度从 32% 拖到 86%，播放器为静音视觉示例。 点中央圆键播放或暂停波形，拖动底部进度，左右键跳转 5 秒。加减键调节波形强度。

### 可复制的提示词

```text
请用 SVG 和原生 JavaScript 实现一枚「波形音频控制台」。上方长槽内放 33 根左右等距的波形线。中央圆键在播放箭头和暂停符号间切换，两侧是减号和加号。底轨的填充、滑帽和时间读数共用一个进度。演示内的 160 秒刻度从 32% 拖到 86%，播放器为静音视觉示例。

面板以灰白 #e7e7e3 为底，墨绿 #2f443b 写标题，深绿 #376653 标记活动状态。左上白色高光和右下灰绿软影决定凸起方向，凹部用上暗下亮的渐变。控件按 800 × 430 逻辑像素绘制，等比缩放。以 60 帧/秒为时间参考，把这段动作安排在约 1.95 秒内，提供播放、暂停和拖动进度。另做可直接操作的入口。点中央圆键播放或暂停波形，拖动底部进度，左右键跳转 5 秒。加减键调节波形强度。将所需资源都放在同一个离线文件夹中。
```

<a id="effect-19-neumorph-slider"></a>

## 270° 音量旋钮

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/19-neumorph-slider.zip) · [在线读主源码](source/19-neumorph-slider.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/19-neumorph-slider.zip)

把凸起圆盘放入凹槽，沿 270° 排布 25 根刻线，已通过的刻线变深绿。指针角度等于 −225° 加上进度乘以 270°。片中读数先从 86 降到 36，再回升到 100，针、亮起的刻线和读数同步。 沿圆周拖动指针，方向键微调，Home 和 End 跳到两端。

### 可复制的提示词

```text
请用 SVG 和原生 JavaScript 实现一枚「270° 音量旋钮」。把凸起圆盘放入凹槽，沿 270° 排布 25 根刻线，已通过的刻线变深绿。指针角度等于 −225° 加上进度乘以 270°。片中读数先从 86 降到 36，再回升到 100，针、亮起的刻线和读数同步。

面板以灰白 #e7e7e3 为底，墨绿 #2f443b 写标题，深绿 #376653 标记活动状态。左上白色高光和右下灰绿软影决定凸起方向，凹部用上暗下亮的渐变。控件按 480 × 470 逻辑像素绘制，等比缩放。以 60 帧/秒为时间参考，把这段动作安排在约 1.70 秒内，提供播放、暂停和拖动进度。另做可直接操作的入口。沿圆周拖动指针，方向键微调，Home 和 End 跳到两端。将所需资源都放在同一个离线文件夹中。
```

<a id="effect-19-neumorph-switch"></a>

## 凹凸电源开关

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/19-neumorph-switch.zip) · [在线读主源码](source/19-neumorph-switch.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/19-neumorph-switch.zip)

左侧画圆形承窝和有开口的电源符号，右侧写「电源」和当前状态。点击让内圈下沉约 3 个逻辑像素，交换凹槽与凸面渐变。演示先开启再关闭，文字同步显示「已开启」和「待机中」。 点电源键，或在控件上按空格切换待机与开启。

### 可复制的提示词

```text
请用 SVG 和原生 JavaScript 实现一枚「凹凸电源开关」。左侧画圆形承窝和有开口的电源符号，右侧写「电源」和当前状态。点击让内圈下沉约 3 个逻辑像素，交换凹槽与凸面渐变。演示先开启再关闭，文字同步显示「已开启」和「待机中」。

面板以灰白 #e7e7e3 为底，墨绿 #2f443b 写标题，深绿 #376653 标记活动状态。左上白色高光和右下灰绿软影决定凸起方向，凹部用上暗下亮的渐变。控件按 510 × 250 逻辑像素绘制，等比缩放。以 60 帧/秒为时间参考，把这段动作安排在约 0.77 秒内，提供播放、暂停和拖动进度。另做可直接操作的入口。点电源键，或在控件上按空格切换待机与开启。将所需资源都放在同一个离线文件夹中。
```

<a id="effect-19-neumorph-tabs"></a>

## 三段实体模式键

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/19-neumorph-tabs.zip) · [在线读主源码](source/19-neumorph-tabs.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/19-neumorph-tabs.zip)

同一个槽内排三枚独立实体键，依次从舒适切到专注、再切到睡眠。按住时右下投影收短，顶缘由亮变暗，底缘回亮，文字和短线随键面沉下。松手后选中的键留在槽内；旧键复位。保留定稿的接触加深与约 0.13 秒卸力。 点击「舒适」「专注」「睡眠」或用左右键切换。Home 和 End 到首尾。

### 可复制的提示词

```text
请用 SVG 和原生 JavaScript 实现一枚「三段实体模式键」。同一个槽内排三枚独立实体键，依次从舒适切到专注、再切到睡眠。按住时右下投影收短，顶缘由亮变暗，底缘回亮，文字和短线随键面沉下。松手后选中的键留在槽内；旧键复位。保留定稿的接触加深与约 0.13 秒卸力。

面板以灰白 #e7e7e3 为底，墨绿 #2f443b 写标题，深绿 #376653 标记活动状态。左上白色高光和右下灰绿软影决定凸起方向，凹部用上暗下亮的渐变。控件按 810 × 200 逻辑像素绘制，等比缩放。以 60 帧/秒为时间参考，把这段动作安排在约 1.52 秒内，提供播放、暂停和拖动进度。另做可直接操作的入口。点击「舒适」「专注」「睡眠」或用左右键切换。Home 和 End 到首尾。将所需资源都放在同一个离线文件夹中。
```

<a id="effect-19-neumorph-search"></a>

## 内凹搜索框

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/19-neumorph-search.zip) · [在线读主源码](source/19-neumorph-search.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/19-neumorph-search.zip)

把输入框做成内凹浅灰槽。左放放大镜，右放短键帽「搜索」。演示从占位字「搜索组件」依次出现「数」「数据」，文字后的插入光标闪动，提交时右侧键帽下沉再回弹。 点击输入区打字，按回车或点击「搜索」，会显示本地命中数。

### 可复制的提示词

```text
请用 SVG 和原生 JavaScript 实现一枚「内凹搜索框」。把输入框做成内凹浅灰槽。左放放大镜，右放短键帽「搜索」。演示从占位字「搜索组件」依次出现「数」「数据」，文字后的插入光标闪动，提交时右侧键帽下沉再回弹。

面板以灰白 #e7e7e3 为底，墨绿 #2f443b 写标题，深绿 #376653 标记活动状态。左上白色高光和右下灰绿软影决定凸起方向，凹部用上暗下亮的渐变。控件按 870 × 160 逻辑像素绘制，等比缩放。以 60 帧/秒为时间参考，把这段动作安排在约 1.00 秒内，提供播放、暂停和拖动进度。另做可直接操作的入口。点击输入区打字，按回车或点击「搜索」，会显示本地命中数。将所需资源都放在同一个离线文件夹中。
```

<a id="effect-19-neumorph-results"></a>

## 搜索结果展开与选中

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/19-neumorph-results.zip) · [在线读主源码](source/19-neumorph-results.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/19-neumorph-results.zip)

搜索框下排列访问趋势、访问统计、来源分析，右边各有符号。演示选中第一行时，浅绿色底衬从左向右铺开，约 0.14 秒填满，文字位置固定。交互时选择其他结果也沿同一方向展开。 输入文字筛选三条本地结果，点结果选中，上下键移项，回车确认。

### 可复制的提示词

```text
请用 SVG 和原生 JavaScript 实现一枚「搜索结果展开与选中」。搜索框下排列访问趋势、访问统计、来源分析，右边各有符号。演示选中第一行时，浅绿色底衬从左向右铺开，约 0.14 秒填满，文字位置固定。交互时选择其他结果也沿同一方向展开。

面板以灰白 #e7e7e3 为底，墨绿 #2f443b 写标题，深绿 #376653 标记活动状态。左上白色高光和右下灰绿软影决定凸起方向，凹部用上暗下亮的渐变。控件按 870 × 440 逻辑像素绘制，等比缩放。以 60 帧/秒为时间参考，把这段动作安排在约 1.72 秒内，提供播放、暂停和拖动进度。另做可直接操作的入口。输入文字筛选三条本地结果，点结果选中，上下键移项，回车确认。将所需资源都放在同一个离线文件夹中。
```

<a id="effect-19-neumorph-chart"></a>

## 七日趋势描线与查数

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/19-neumorph-chart.zip) · [在线读主源码](source/19-neumorph-chart.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/19-neumorph-chart.zip)

用 3400、5200、4600、6800、5600、7400、8640 七个采样点绘制平滑绿色曲线与淡色面积，曲线从左向右写出。线画完后，细虚线带着深色数值牌从左到右查数，数值与曲线使用同一插值。 在图上左右移动或拖动查看访问量，左右键移动，Home 和 End 查看首尾。

### 可复制的提示词

```text
请用 SVG 和原生 JavaScript 实现一枚「七日趋势描线与查数」。用 3400、5200、4600、6800、5600、7400、8640 七个采样点绘制平滑绿色曲线与淡色面积，曲线从左向右写出。线画完后，细虚线带着深色数值牌从左到右查数，数值与曲线使用同一插值。

面板以灰白 #e7e7e3 为底，墨绿 #2f443b 写标题，深绿 #376653 标记活动状态。左上白色高光和右下灰绿软影决定凸起方向，凹部用上暗下亮的渐变。控件按 940 × 530 逻辑像素绘制，等比缩放。以 60 帧/秒为时间参考，把这段动作安排在约 2.87 秒内，提供播放、暂停和拖动进度。另做可直接操作的入口。在图上左右移动或拖动查看访问量，左右键移动，Home 和 End 查看首尾。将所需资源都放在同一个离线文件夹中。
```

<a id="effect-19-neumorph-calendar"></a>

## 滚轮日期选择器

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/19-neumorph-calendar.zip) · [在线读主源码](source/19-neumorph-calendar.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/19-neumorph-calendar.zip)

浅灰凹槽中排年、月、日三枚立体数字窗，固定 2026 年 11 月。演示的日数从 13 连续滚到 18。用日期小数部分驱动上下两行，旧数字上移、新数字从下方进入，每档相隔 67 个逻辑像素，停稳后只显示整数。 在日期轮向上或向下拖动，也可滚动鼠标或按方向键调日。点击右上「确定」确认。

### 可复制的提示词

```text
请用 SVG 和原生 JavaScript 实现一枚「滚轮日期选择器」。浅灰凹槽中排年、月、日三枚立体数字窗，固定 2026 年 11 月。演示的日数从 13 连续滚到 18。用日期小数部分驱动上下两行，旧数字上移、新数字从下方进入，每档相隔 67 个逻辑像素，停稳后只显示整数。

面板以灰白 #e7e7e3 为底，墨绿 #2f443b 写标题，深绿 #376653 标记活动状态。左上白色高光和右下灰绿软影决定凸起方向，凹部用上暗下亮的渐变。控件按 760 × 370 逻辑像素绘制，等比缩放。以 60 帧/秒为时间参考，把这段动作安排在约 1.00 秒内，提供播放、暂停和拖动进度。另做可直接操作的入口。在日期轮向上或向下拖动，也可滚动鼠标或按方向键调日。点击右上「确定」确认。将所需资源都放在同一个离线文件夹中。
```

<a id="effect-19-neumorph-menu"></a>

## 凹面模式菜单

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/19-neumorph-menu.zip) · [在线读主源码](source/19-neumorph-menu.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/19-neumorph-menu.zip)

提供三个纵向排列的实体条目，未选项用凸面渐变和软投影，选中项切为暗顶亮底的凹槽。演示从均衡切到专注，右侧勾号与凹面一起移动到新行。 点任意一行或按上下键切换均衡、专注、轻盈模式。

### 可复制的提示词

```text
请用 SVG 和原生 JavaScript 实现一枚「凹面模式菜单」。提供三个纵向排列的实体条目，未选项用凸面渐变和软投影，选中项切为暗顶亮底的凹槽。演示从均衡切到专注，右侧勾号与凹面一起移动到新行。

面板以灰白 #e7e7e3 为底，墨绿 #2f443b 写标题，深绿 #376653 标记活动状态。左上白色高光和右下灰绿软影决定凸起方向，凹部用上暗下亮的渐变。控件按 730 × 405 逻辑像素绘制，等比缩放。以 60 帧/秒为时间参考，把这段动作安排在约 0.53 秒内，提供播放、暂停和拖动进度。另做可直接操作的入口。点任意一行或按上下键切换均衡、专注、轻盈模式。将所需资源都放在同一个离线文件夹中。
```

<a id="effect-19-neumorph-choices"></a>

## 复选与单选设置

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/19-neumorph-choices.zip) · [在线读主源码](source/19-neumorph-choices.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/19-neumorph-choices.zip)

把自动保存、消息提醒、同步设置排在左列，凸起的小方块选中后变凹并出现钩记。右列安静、标准、增强共用一个深绿圆点。按片中顺序勾上前两项，再选标准提醒并按继续。 点击左列独立勾选，点右列三选一，「继续」显示已选数量。也可用 Tab 操作下方的同名选项。

### 可复制的提示词

```text
请用 SVG 和原生 JavaScript 实现一枚「复选与单选设置」。把自动保存、消息提醒、同步设置排在左列，凸起的小方块选中后变凹并出现钩记。右列安静、标准、增强共用一个深绿圆点。按片中顺序勾上前两项，再选标准提醒并按继续。

面板以灰白 #e7e7e3 为底，墨绿 #2f443b 写标题，深绿 #376653 标记活动状态。左上白色高光和右下灰绿软影决定凸起方向，凹部用上暗下亮的渐变。控件按 850 × 420 逻辑像素绘制，等比缩放。以 60 帧/秒为时间参考，把这段动作安排在约 1.23 秒内，提供播放、暂停和拖动进度。另做可直接操作的入口。点击左列独立勾选，点右列三选一，「继续」显示已选数量。也可用 Tab 操作下方的同名选项。将所需资源都放在同一个离线文件夹中。
```

<a id="effect-19-neumorph-dialog"></a>

## 确认保存对话框

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/19-neumorph-dialog.zip) · [在线读主源码](source/19-neumorph-dialog.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/19-neumorph-dialog.zip)

圆角面板中放凹面圆徽记、保存提示和两枚并排按键。确认时右键按下，感叹号替换成对勾，正文由「保存这组设置？」切至「设置已保存」，确认键同时变为「完成」。 点「确认」保存，点「返回」复位。回车和 Esc 也可以操作。

### 可复制的提示词

```text
请用 SVG 和原生 JavaScript 实现一枚「确认保存对话框」。圆角面板中放凹面圆徽记、保存提示和两枚并排按键。确认时右键按下，感叹号替换成对勾，正文由「保存这组设置？」切至「设置已保存」，确认键同时变为「完成」。

面板以灰白 #e7e7e3 为底，墨绿 #2f443b 写标题，深绿 #376653 标记活动状态。左上白色高光和右下灰绿软影决定凸起方向，凹部用上暗下亮的渐变。控件按 760 × 370 逻辑像素绘制，等比缩放。以 60 帧/秒为时间参考，把这段动作安排在约 0.53 秒内，提供播放、暂停和拖动进度。另做可直接操作的入口。点「确认」保存，点「返回」复位。回车和 Esc 也可以操作。将所需资源都放在同一个离线文件夹中。
```

<a id="effect-19-neumorph-progress"></a>

## 分段圆环进度

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/19-neumorph-progress.zip) · [在线读主源码](source/19-neumorph-progress.js) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/19-neumorph-progress.zip)

在浅凹圆槽上叠凸起圆芯，从十二点位置顺时针描进度环。让环与中央数字共用同一进度，依次经过 0%、37%、68%，在 68% 短暂停下，再到 100%。底部同帧由「正在加载」切换成「全部就绪」。 点击圆环或按回车重新加载，观察中段停顿和完成状态。

### 可复制的提示词

```text
请用 SVG 和原生 JavaScript 实现一枚「分段圆环进度」。在浅凹圆槽上叠凸起圆芯，从十二点位置顺时针描进度环。让环与中央数字共用同一进度，依次经过 0%、37%、68%，在 68% 短暂停下，再到 100%。底部同帧由「正在加载」切换成「全部就绪」。

面板以灰白 #e7e7e3 为底，墨绿 #2f443b 写标题，深绿 #376653 标记活动状态。左上白色高光和右下灰绿软影决定凸起方向，凹部用上暗下亮的渐变。控件按 510 × 470 逻辑像素绘制，等比缩放。以 60 帧/秒为时间参考，把这段动作安排在约 1.65 秒内，提供播放、暂停和拖动进度。另做可直接操作的入口。点击圆环或按回车重新加载，观察中段停顿和完成状态。将所需资源都放在同一个离线文件夹中。
```

## 工具与技术规格

原片用 SVG 绘制，用 GSAP 3.14.2 对齐拍点，Chromium 逐帧取样，FFmpeg 编码。下载包使用原生 SVG、JavaScript、Pointer Events 与 requestAnimationFrame，双击即可离线运行。 每个包的 README.md 都附有成片位置、逻辑尺寸、输入方式和具体可调参数。

[全部动效](README.md) · [技术规范](TECHNICAL.md) · [原创代码许可](LICENSE)
