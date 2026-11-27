# 5 种创意键盘 UI · 可交互源码合集

> [✨ 在线展馆试玩本期](https://xiaxia-motion.github.io/xiaxia-motion-library/#note=22) · [← 返回全库首页](../README.md)

夏夏的AI灵感 · 2026 年 11 月 27 日更新源码。按 23.00 秒定稿顺序收录高定复古打字机、小猫陪打字、字母花园、旋律键盘与激光输入框，每款均可单独下载。

完整解压后双击 `index.html` 即可离线观看定稿动作，点「自己操作」可用鼠标点击屏幕键帽或直接用电脑实体键盘输入，点「开启声音」可体验零外部素材的浏览器实时拟音。

| 顺序 | 组件 | 原片入点 | 可以尝试 |
| --- | --- | --- | --- |
| 01 | [高定复古打字机](#effect-22-keyboard-typewriter) | 00:00.00 | 点击任意圆键或敲实体键盘打字、连杆击打、回车暖金扫光 |
| 02 | [小猫陪打字](#effect-22-keyboard-cat) | 00:04.10 | 点击软糖键帽看小猫追眼伸爪、退格触发腮红叹号、拼出 MEOW 或按回车冒爱心 |
| 03 | [字母花园](#effect-22-keyboard-garden) | 00:08.65 | 输入字母长出五种水彩花草、退格飘瓣凋谢、回车洒出暖金花粉 |
| 04 | [旋律键盘](#effect-22-keyboard-melody) | 00:13.45 | 点击玻璃字母键演奏 E♭ 大调音符、五线谱实时点亮、按回车顺序回奏 |
| 05 | [激光输入框](#effect-22-keyboard-laser) | 00:17.50 | 任意字母发射翡翠弧线激光点亮点阵屏、退格琥珀红光逆向回吸、回车扫描锁字 |

<a id="effect-22-keyboard-typewriter"></a>

## 01　高定复古打字机

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=22-keyboard-typewriter) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/22-keyboard-typewriter.zip) · [在线读主源码](../source/22-keyboard-typewriter.js)

直接点击屏幕 32 枚镀铬圆键，或用电脑键盘打字、空格、退格与回车（回车可切换第二行并触发暖金流光）。

INTRO_KEYS 控制 32 枚复古圆形键位，26 根拉丝金属连杆随按键深度抬升 36 px；回车可切行并扫过字内暖金高光。

**原片提示词**

暖象牙棉纸底配柔光斜带，居中展示 26 根拉丝金属连杆与 32 键镀铬黑曜石圆形机械键盘（退格键点缀酒红漆面）。逐键击打打出双行标题 VibeCoding / 5种创意键盘 UI，标题落定后一道暖金流光沿字形内部掠过，不溢出字外。

<a id="effect-22-keyboard-cat"></a>

## 02　小猫陪打字

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=22-keyboard-cat) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/22-keyboard-cat.zip) · [在线读主源码](../source/22-keyboard-cat.js)

点击屏幕奶油方键或敲电脑键盘，三花小猫会追视键位并伸出左右毛绒爪拍键；按退格触发腮红慌张感叹号，拼出 MEOW 或按回车会开心眯眼冒爱心。

MAIN_KEYS 控制 32 枚奶油软糖方键，drawCatCharacter 绘制呼吸、追视眼神、脸红叹号与开心眯眼状态，左右前爪依键位横向坐标自动分配弧线落点。

**原片提示词**

奶油暖杏底色与柔和圆润的奶油方键虚拟 QWERTY 键盘，上方居中配圆角输入框。一只奶萌三花小猫趴在键盘后方，目光与双爪实时追随按下的键位；依次输入 M、E、O、P，打错 P 时脸颊微红冒出慌张感叹号，按退格删掉错字再补打 W，拼出 MEOW 后开心眯眼冒出粉红爱心。

<a id="effect-22-keyboard-garden"></a>

## 03　字母花园

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=22-keyboard-garden) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/22-keyboard-garden.zip) · [在线读主源码](../source/22-keyboard-garden.js)

点击温润陶瓷方键或敲击字母键（最多并排 6 株），每个字母都会长出不同花型的水彩植物并随风轻摆；按退格让末株凋落飘瓣，按回车洒出暖金花粉。

drawPlantStemAndLeaves 与 drawBotanicalFlower 分别绘制弧形枝茎、叶脉与五类水彩花型（poppy / anemone / daisy / camellia / gold），击键弹出陶瓷预览气泡。

**原片提示词**

手工水彩棉纸背景与温润白陶瓷方键虚拟键盘，上方设纸面种植框。每按一个字母便从输入框底线抽芽长出对应花型与叶脉的水彩植物并在微风中轻摆；输入 G、R、O、W 长出四株花草，按退格让 W 对应花株低头凋落，再重按 W 补种绽放一株明亮金黄小花。

<a id="effect-22-keyboard-melody"></a>

## 04　旋律键盘

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=22-keyboard-melody) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/22-keyboard-melody.zip) · [在线读主源码](../source/22-keyboard-melody.js)

点击暗黑玻璃字母键或用实体键盘输入（4 个旋律槽循环写入），每个字母映射到 E♭ 大调音阶并点亮五线谱与虹彩声波；开启声音并按回车即可按节拍自动回奏。

26 个字母均匀映射至 E♭4–E♭5 音阶并自动标注 ♭ 降记号；按 Enter 启动 120 BPM 光幕扫谱与四槽顺序高亮回奏，sound.js 用 Web Audio 合成三角钢琴泛音。

**原片提示词**

深海星夜暗黑毛玻璃虚拟键盘，上方为玻璃输入框，中间横排发亮高音五线谱。输入 b、e、a、t 四个字母时分别点亮 E♭4、G4、B♭4、D5 彩色光晕音符与对应按键并奏出清澈三角钢琴音；按下回车键后，五线谱按节拍依次高亮回奏整段旋律。

<a id="effect-22-keyboard-laser"></a>

## 05　激光输入框

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=22-keyboard-laser) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/22-keyboard-laser.zip) · [在线读主源码](../source/22-keyboard-laser.js)

点击翡翠霓虹键帽或敲击 A–Z 任意字母（4 格点阵终端），按下即发射三层弧线激光与火花点亮对应 6×7 像素字；按退格触发琥珀光逆向回吸消除末位，按回车触发全屏扫光锁定。

内置全部 26 字母 6×7 点阵字形 DOT_GLYPHS；每道激光沿二次贝塞尔曲线飞行 12 帧并带机身微震反馈，Backspace 沿逆向曲线把末格像素抽回键帽。

**原片提示词**

赛博暗黑工业终端，下方为翡翠霓虹描边虚拟键盘，上方为像素点阵显示屏。输入 B、O、O、X 时每个按下键帽都向目标点阵格射出弧线翡翠激光束并在落点炸出像素光粒；错字 X 亮红告警，按退格后触发红光逆向吸束将字符抽回键盘销毁，再输入 M 发射收尾激光并点亮完整 BOOM。

定稿与独立版的工具、参数及许可详见各包 `README.md`。[全库入口](../README.md)
