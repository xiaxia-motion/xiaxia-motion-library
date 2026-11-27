# 弥散光 UI · 9 款可操作组件

> [✨ 在线展馆试玩本期](https://xiaxia-motion.github.io/xiaxia-motion-library/#note=21) · [← 返回全库首页](../README.md)

夏夏的AI灵感 · 2026 年 11 月 26 日更新源码。按 45.8 秒定稿的顺序找到喜欢的控件，打开它的「下载源码 ZIP」，完整解压后双击 index.html。每款都有定稿动作、自己操作、中文提示词和可修改的主源码。

波形播放器可导入本机音频试听。验证码可输入任意六位演示数字，开启琴声后按原片音高与入点播放六个音；离线版音色由浏览器合成。

| 顺序 | 组件 | 原片入点 | 可以尝试 |
| --- | --- | --- | --- |
| 01 | [阻尼刻度](#effect-21-diffuse-dial) | 00:05.43 | 拖动、松手回弹和键盘调节 |
| 02 | [蓄力发送](#effect-21-diffuse-charge) | 00:09.33 | 短按取消、长按发送、再次发送 |
| 03 | [波形播放器](#effect-21-diffuse-player) | 00:13.10 | 播放暂停、切歌归零、拖动进度、播放本机音频 |
| 04 | [全息通行证](#effect-21-diffuse-pass) | 00:16.68 | 指针倾转、键盘调角、收藏与取消 |
| 05 | [光标导航](#effect-21-diffuse-dock) | 00:20.57 | 五个选项直接点选、前后沿时差、左右键 |
| 06 | [验证码](#effect-21-diffuse-code) | 00:24.28 | 真实输入和粘贴、退格、六位连框绕光、六音触发 |
| 07 | [通知堆叠](#effect-21-diffuse-notices) | 00:30.50 | 逐条入栈、连点、重新开始 |
| 08 | [同步光环](#effect-21-diffuse-sync) | 00:33.85 | 开始、手动定值、完成和重新运行 |
| 09 | [心动反馈](#effect-21-diffuse-like) | 00:37.67 | 原触碰帧、点赞、撤销、计数滚动及再次触发 |

<a id="effect-21-diffuse-dial"></a>

## 01　阻尼刻度

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=21-diffuse-dial) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/21-diffuse-dial.zip) · [在线读主源码](../source/21-diffuse-dial.js)

在旋钮上左右拖动，松手观察超调和回落，也可以使用下方滑杆或方向键。

gain 控制 −18 至 +12 dB。表圈有 42 个间隔，扫过 1.52π 弧度，定稿最后稳定在 +6 dB。

**原片提示词**

做一枚烟黑音响旋钮，用细刻度围出一圈弧光。旋转时让白色指示珠对准刻度，扫过的刻线泛起虹彩。松手后刻度越过目标，再轻轻回到 +6 dB。

<a id="effect-21-diffuse-charge"></a>

## 02　蓄力发送

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=21-diffuse-charge) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/21-diffuse-charge.zip) · [在线读主源码](../source/21-diffuse-charge.js)

按住画面里的胶囊键或下方按钮。充满后松手发送，提前松手可取消。使用键盘时按住空格。

charge 是 0–1 的充能量，press 是键面下沉量，sent 控制完成勾。原片先充满，随后在释放的那一帧变成「已发送」。

**原片提示词**

做一枚深色磨砂胶囊键，按住时让键身下沉。从左向右灌入青蓝、紫红和暖金，中央跟随显示百分比。到 100% 后微微回缩，松开时亮出对勾。

<a id="effect-21-diffuse-player"></a>

## 03　波形播放器

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=21-diffuse-player) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/21-diffuse-player.zip) · [在线读主源码](../source/21-diffuse-player.js)

点击播放、暂停或切歌，拖动波形或进度条定位。还可以选择本机音频试听。

trackMix 控制两张程序封面的交叉淡入。playerSeconds 是已经播放的秒数，示例曲目的显示时长分别为 108 秒、117 秒。39 根波形柱随播放时钟起伏。

**原片提示词**

做一台烟黑玻璃播放器，左上放柔和彩色方形封面。光点绕回封面时切歌，让新封面和曲名一起淡入。波形持续起伏，播放时间归零，剩余时长随之更新。

<a id="effect-21-diffuse-pass"></a>

## 04　全息通行证

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=21-diffuse-pass) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/21-diffuse-pass.zip) · [在线读主源码](../source/21-diffuse-pass.js)

移动指针或左右拖动改变全息反射，点卡片或按「收藏」查看回执。

tilt 是卡身倾角的归一化输入，foilTurn 控制圆章内外的高光错位，collected 控制收藏回执显现。原纹理在 32 个光照样本之间插值。

**原片提示词**

做一张全息通行证，在烟紫卡面压一枚虹彩圆章。转动卡身，让圆章内外的反光错位掠过金属细边。卡面转过正面时，在圆章下弹出白色收藏回执。

<a id="effect-21-diffuse-dock"></a>

## 05　光标导航

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=21-diffuse-dock) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/21-diffuse-dock.zip) · [在线读主源码](../source/21-diffuse-dock.js)

直接点选五个图标；也可使用下方按钮或方向键。注意选框前后沿到达目标的时间差。

tab 取 0–4，五个图标中心相隔 45 个设计单位。tabBounds.left / right 分别控制框的两端，前沿先伸出，后沿追上。

**原片提示词**

做一条深色玻璃导航，横排五枚细线图标。虹彩选框先拉长碰到下一项，再让后沿追上、收拢。选中「消息」时，把图标和下方的小光标点亮。

<a id="effect-21-diffuse-code"></a>

## 06　验证码

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=21-diffuse-code) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/21-diffuse-code.zip) · [在线读主源码](../source/21-diffuse-code.js)

在示例输入框键入任意六位数字或整串粘贴，可退格重输。点「开启琴声」可听每一位的提示音。

code 是已填位数，digitTravel 推动光标移到下一格，codeSeal 将六格连成 255 × 46 的共同轮廓。原片示例为 687204，六个音依次是 F5、A5、C6、D6、C6、F6。

**原片提示词**

做一组六格烟黑验证码框，用等宽数字快速输入。让发光选框逐格前移，输完时六位数字显出不同光色。把六格连成一圈细虹彩，让光球沿整圈绕回出发点。

<a id="effect-21-diffuse-notices"></a>

## 07　通知堆叠

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=21-diffuse-notices) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/21-diffuse-notices.zip) · [在线读主源码](../source/21-diffuse-notices.js)

点一下通知或「下一条通知」，依次加入导出、评论和归档。新卡落下时，旧卡连同文字沉入下一层。

noticeIndex 选择当前消息，noticeMix 控制入栈进度，topLift 控制顶层位置。最多画三层，每退一层横向缩小 7.2%。

**原片提示词**

做一叠烟黑玻璃通知，露出后面两张的圆角薄边。导出、评论、归档依次到达，每条配不同颜色的小图标。新通知从上方落位，上一张带着内容缩小，沉入后排。

<a id="effect-21-diffuse-sync"></a>

## 08　同步光环

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=21-diffuse-sync) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/21-diffuse-sync.zip) · [在线读主源码](../source/21-diffuse-sync.js)

点击圆盘或「开始同步」，观察光球、百分比和完成勾；下方滑杆可直接预览指定进度。

sync 取 0–1，syncAngle 为 −2.12 弧度。原片光球抵达左上弧后即开始亮起，达到 99.9% 时数字让位给白底勾。

**原片提示词**

做一枚烟黑玻璃同步圆盘，在外沿留一条细光轨。光球接上左上弧时立刻扫亮连续虹彩，百分比跟着增长。满圈时让数字切成白底对勾，再把光球送出。

<a id="effect-21-diffuse-like"></a>

## 09　心动反馈

[在线试玩](https://xiaxia-motion.github.io/xiaxia-motion-library/#item=21-diffuse-like) · [下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/zips/21-diffuse-like.zip) · [在线读主源码](../source/21-diffuse-like.js)

点击爱心或按钮点赞，再点可撤销。留意 2,481 滚到 2,482、爱心回弹和向外消散的彩点。

like 选择点赞状态，likeAge 是触碰后经过的秒数。原动作有 0.17 秒数字滚动、0.42 秒扩散环，以及 12 颗在 0.48 秒内消散的彩点。

**原片提示词**

做一枚黑玻璃点赞键，左边画空心爱心，右边排计数。光球触碰就填入虹彩，数字向上滚一位，爱心轻弹。让一圈细光和几颗彩点从爱心散开，然后收光。

定稿与独立版的工具及许可见各组 README.md。本期视觉参考为观默《Halo》。[视觉参考原帖](https://x.com/guanmo_ai/status/2125425240184385648) · [全库入口](../README.md)
