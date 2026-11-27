# 滚轮日期选择器

夏夏的AI灵感 · 《新拟物 UI》材质与动作优化版 · 2026-11-23

## 观看与操作

完整解压 ZIP，在现代浏览器中双击 index.html。可以暂停、重播或拖动时间条。点右上「自己操作」进入 interactive/index.html。在日期轮向上或向下拖动，也可滚动鼠标或按方向键调日。点击右上「确定」确认。

## 画面与动作

浅灰凹槽中排年、月、日三枚立体数字窗，固定 2026 年 11 月。演示的日数从 13 连续滚到 18。用日期小数部分驱动上下两行，旧数字上移、新数字从下方进入，每档相隔 67 个逻辑像素，停稳后只显示整数。

面板以灰白 #e7e7e3 为底，墨绿 #2f443b 写标题，深绿 #376653 标记活动状态。左上白色高光和右下灰绿软影决定凸起方向，凹部用上暗下亮的渐变。原片为 3840 × 2880、60 帧/秒，长 28.60 秒。本控件的逻辑尺寸为 760 × 370。独立演示对应原片约 18.05 至 19.05 秒，以第 0 帧起算为第 1083 至 1142 帧。独立入口将组件居中展示，文字随设备上的中文字体排版。

## 使用的工具和插件

原片用 SVG 绘制，用 GSAP 3.14.2 对齐拍点，Chromium 逐帧取样，FFmpeg 编码。下载包使用原生 SVG、JavaScript、Pointer Events 与 requestAnimationFrame，双击即可离线运行。公开包里的组件使用系统字体；波形、表单和交互数据都在本机运行。独立包不含视频配乐或实录音效。

## 修改与调用

- effect.js 保存这组控件的绘图、颜色与动作函数。renderCalendar 中的 67 控制两行的位移。手动版在 1 至 30 日间选择。
- settings.js 中的 start、end 与 events 都以原工程秒数为单位。width、height、radius 控制面板尺寸。改尺寸时同步更新两个 HTML 文件中的 viewBox。
- 在演示页上调用 window.singleEffect.seek(秒数) 可从本段起点定位。play() 和 pause() 控制播放。手动页将实际输入交给同一绘图函数，调用 window.liveComponent.state() 可读当前操作状态。
- 可把整个文件夹和提示词.txt 一起交给 AI，并指出希望修改的颜色、手感或节奏。修改后重新打开 index.html 和 interactive/index.html 核对两种入口。

原创代码采用 MIT 许可，允许修改与商用。再分发时保留署名和 LICENSE.txt。[本期 14 组动效](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/note-19.md)
