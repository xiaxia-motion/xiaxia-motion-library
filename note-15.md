# 复古橡皮管 UI

《Astra6.2审美含量真的超标了！》 · 2026-11-18 · 夏夏的AI灵感

本条笔记共 13 组。每一组有自己的源码和离线预览。

[放映机拉远与错列控件展墙](#effect-15-cinema-gallery) · [心形收藏计数](#effect-15-favorite) · [喇叭音量推子](#effect-15-horn-slider) · [灯泡拨动开关](#effect-15-lamp-switch) · [放映机双卷盘开机](#effect-15-projector) · [下拉刷新与纸面回弹](#effect-15-pull-refresh) · [搜片双键与列表筛选](#effect-15-search-keys) · [六个橡皮管控件亮相与戏票推近](#effect-15-six-controls-intro) · [验票章盖印勾选](#effect-15-stamp-check) · [跳跃星级评分](#effect-15-star-rating) · [戏票按压回弹](#effect-15-ticket) · [打字机逐键输入 MOON](#effect-15-typewriter) · [切换到我的片单](#effect-15-watch-list)

<a id="effect-15-cinema-gallery"></a>

## 放映机拉远与错列控件展墙

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/15-cinema-gallery.zip) · [在线读主源码](source/15-cinema-gallery.cpp) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/15-cinema-gallery.zip)

跟踪银幕中心，放映机卷轴继续运转，同时把画面缩回左上的节目卡，已完成动作的控件错列显现。

原版 C++ 绘制函数。C++17、Cairo、Python 3 与 Pillow。浏览器预览播放同一绘图函数生成的 24 帧/秒图集。

原排版、原控件和原相机。预览用程序纸纹及自绘月亮代替成片的材料底图。

主源码在 component.cpp，完整使用步骤在包内 README.md。

### 可复制的提示词

跟踪银幕中心，放映机卷轴继续运转，同时把画面缩回左上的节目卡，已完成动作的控件错列显现。 保持节目的纸色、笔触和角色姿势，镜头沿原坐标连续运动。

<a id="effect-15-favorite"></a>

## 心形收藏计数

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/15-favorite.zip) · [在线读主源码](source/15-favorite.cpp) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/15-favorite.zip)

光标、心形填充和计数从零到一共享同一时钟。 原角色时钟为 60 帧/秒和 128 BPM。离线图集为 24 帧/秒，原始函数支持任意时刻与目标分辨率。

原版 C++ 绘制函数。C++17、Cairo 1.18.4、pkg-config；重新生成预览使用 Python 3 与 Pillow。浏览器端为原函数逐帧绘制的图集。

单独展示角色并居中取景。搜索、片单和放映设备的小图使用程序绘制的月亮替代。

主源码在 component.cpp，完整使用步骤在包内 README.md。

### 可复制的提示词

光标、心形填充和计数从零到一共享同一时钟。 以暖纸、深咖轮廓、朱红和芥末黄建立旧戏院的橡皮管角色。身体轮廓、眼睛方向、手套接触点都依照 component.cpp 的动作求值。

<a id="effect-15-horn-slider"></a>

## 喇叭音量推子

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/15-horn-slider.zip) · [在线读主源码](source/15-horn-slider.cpp) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/15-horn-slider.zip)

音量从 18% 到 80%，瞳孔与手套跟踪同一手柄。 原角色时钟为 60 帧/秒和 128 BPM。离线图集为 24 帧/秒，原始函数支持任意时刻与目标分辨率。

原版 C++ 绘制函数。C++17、Cairo 1.18.4、pkg-config；重新生成预览使用 Python 3 与 Pillow。浏览器端为原函数逐帧绘制的图集。

单独展示角色并居中取景。搜索、片单和放映设备的小图使用程序绘制的月亮替代。

主源码在 component.cpp，完整使用步骤在包内 README.md。

### 可复制的提示词

音量从 18% 到 80%，瞳孔与手套跟踪同一手柄。 以暖纸、深咖轮廓、朱红和芥末黄建立旧戏院的橡皮管角色。身体轮廓、眼睛方向、手套接触点都依照 component.cpp 的动作求值。

<a id="effect-15-lamp-switch"></a>

## 灯泡拨动开关

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/15-lamp-switch.zip) · [在线读主源码](source/15-lamp-switch.cpp) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/15-lamp-switch.zip)

滑柄横移 97 单位，到位后轻微弹过头，灯丝和放射线同步。 原角色时钟为 60 帧/秒和 128 BPM。离线图集为 24 帧/秒，原始函数支持任意时刻与目标分辨率。

原版 C++ 绘制函数。C++17、Cairo 1.18.4、pkg-config；重新生成预览使用 Python 3 与 Pillow。浏览器端为原函数逐帧绘制的图集。

单独展示角色并居中取景。搜索、片单和放映设备的小图使用程序绘制的月亮替代。

主源码在 component.cpp，完整使用步骤在包内 README.md。

### 可复制的提示词

滑柄横移 97 单位，到位后轻微弹过头，灯丝和放射线同步。 以暖纸、深咖轮廓、朱红和芥末黄建立旧戏院的橡皮管角色。身体轮廓、眼睛方向、手套接触点都依照 component.cpp 的动作求值。

<a id="effect-15-projector"></a>

## 放映机双卷盘开机

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/15-projector.zip) · [在线读主源码](source/15-projector.cpp) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/15-projector.zip)

相反方向的双卷盘从同一启动点展开，机身与橡皮管双手同步。 原角色时钟为 60 帧/秒和 128 BPM。离线图集为 24 帧/秒，原始函数支持任意时刻与目标分辨率。

原版 C++ 绘制函数。C++17、Cairo 1.18.4、pkg-config；重新生成预览使用 Python 3 与 Pillow。浏览器端为原函数逐帧绘制的图集。

单独展示角色并居中取景。搜索、片单和放映设备的小图使用程序绘制的月亮替代。

主源码在 component.cpp，完整使用步骤在包内 README.md。

### 可复制的提示词

相反方向的双卷盘从同一启动点展开，机身与橡皮管双手同步。 以暖纸、深咖轮廓、朱红和芥末黄建立旧戏院的橡皮管角色。身体轮廓、眼睛方向、手套接触点都依照 component.cpp 的动作求值。

<a id="effect-15-pull-refresh"></a>

## 下拉刷新与纸面回弹

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/15-pull-refresh.zip) · [在线读主源码](source/15-pull-refresh.cpp) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/15-pull-refresh.zip)

列表纸张跟随手指向下，在释放以后才回弹并显示更新时间。 原角色时钟为 60 帧/秒和 128 BPM。离线图集为 24 帧/秒，原始函数支持任意时刻与目标分辨率。

原版 C++ 绘制函数。C++17、Cairo 1.18.4、pkg-config；重新生成预览使用 Python 3 与 Pillow。浏览器端为原函数逐帧绘制的图集。

单独展示角色并居中取景。搜索、片单和放映设备的小图使用程序绘制的月亮替代。

主源码在 component.cpp，完整使用步骤在包内 README.md。

### 可复制的提示词

列表纸张跟随手指向下，在释放以后才回弹并显示更新时间。 以暖纸、深咖轮廓、朱红和芥末黄建立旧戏院的橡皮管角色。身体轮廓、眼睛方向、手套接触点都依照 component.cpp 的动作求值。

<a id="effect-15-search-keys"></a>

## 搜片双键与列表筛选

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/15-search-keys.zip) · [在线读主源码](source/15-search-keys.cpp) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/15-search-keys.zip)

手先触碰搜索框，再按月、夜两键；候选行在第二键后收窄。 原角色时钟为 60 帧/秒和 128 BPM。离线图集为 24 帧/秒，原始函数支持任意时刻与目标分辨率。

原版 C++ 绘制函数。C++17、Cairo 1.18.4、pkg-config；重新生成预览使用 Python 3 与 Pillow。浏览器端为原函数逐帧绘制的图集。

单独展示角色并居中取景。搜索、片单和放映设备的小图使用程序绘制的月亮替代。

主源码在 component.cpp，完整使用步骤在包内 README.md。

### 可复制的提示词

手先触碰搜索框，再按月、夜两键；候选行在第二键后收窄。 以暖纸、深咖轮廓、朱红和芥末黄建立旧戏院的橡皮管角色。身体轮廓、眼睛方向、手套接触点都依照 component.cpp 的动作求值。

<a id="effect-15-six-controls-intro"></a>

## 六个橡皮管控件亮相与戏票推近

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/15-six-controls-intro.zip) · [在线读主源码](source/15-six-controls-intro.cpp) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/15-six-controls-intro.zip)

标题逐字揭出，六件控件进入两排。1.20 秒开始向下排中央的戏票推进，其他角色与边框收起。

原版 C++ 绘制函数。C++17、Cairo、Python 3 与 Pillow。浏览器预览播放同一绘图函数生成的 24 帧/秒图集。

原排版、原控件和原相机。预览用程序纸纹及自绘月亮代替成片的材料底图。

主源码在 component.cpp，完整使用步骤在包内 README.md。

### 可复制的提示词

标题逐字揭出，六件控件进入两排。1.20 秒开始向下排中央的戏票推进，其他角色与边框收起。 保持节目的纸色、笔触和角色姿势，镜头沿原坐标连续运动。

<a id="effect-15-stamp-check"></a>

## 验票章盖印勾选

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/15-stamp-check.zip) · [在线读主源码](source/15-stamp-check.cpp) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/15-stamp-check.zip)

票根在印章接触时眯眼，抬起后显示勾选。 原角色时钟为 60 帧/秒和 128 BPM。离线图集为 24 帧/秒，原始函数支持任意时刻与目标分辨率。

原版 C++ 绘制函数。C++17、Cairo 1.18.4、pkg-config；重新生成预览使用 Python 3 与 Pillow。浏览器端为原函数逐帧绘制的图集。

单独展示角色并居中取景。搜索、片单和放映设备的小图使用程序绘制的月亮替代。

主源码在 component.cpp，完整使用步骤在包内 README.md。

### 可复制的提示词

票根在印章接触时眯眼，抬起后显示勾选。 以暖纸、深咖轮廓、朱红和芥末黄建立旧戏院的橡皮管角色。身体轮廓、眼睛方向、手套接触点都依照 component.cpp 的动作求值。

<a id="effect-15-star-rating"></a>

## 跳跃星级评分

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/15-star-rating.zip) · [在线读主源码](source/15-star-rating.cpp) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/15-star-rating.zip)

四个拍点让星星逐格跳跃、触底形变、填色后回弹。 原角色时钟为 60 帧/秒和 128 BPM。离线图集为 24 帧/秒，原始函数支持任意时刻与目标分辨率。

原版 C++ 绘制函数。C++17、Cairo 1.18.4、pkg-config；重新生成预览使用 Python 3 与 Pillow。浏览器端为原函数逐帧绘制的图集。

单独展示角色并居中取景。搜索、片单和放映设备的小图使用程序绘制的月亮替代。

主源码在 component.cpp，完整使用步骤在包内 README.md。

### 可复制的提示词

四个拍点让星星逐格跳跃、触底形变、填色后回弹。 以暖纸、深咖轮廓、朱红和芥末黄建立旧戏院的橡皮管角色。身体轮廓、眼睛方向、手套接触点都依照 component.cpp 的动作求值。

<a id="effect-15-ticket"></a>

## 戏票按压回弹

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/15-ticket.zip) · [在线读主源码](source/15-ticket.cpp) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/15-ticket.zip)

2.78 倍近景中，身体先压缩再回弹，手套后抬。 原角色时钟为 60 帧/秒和 128 BPM。离线图集为 24 帧/秒，原始函数支持任意时刻与目标分辨率。

原版 C++ 绘制函数。C++17、Cairo 1.18.4、pkg-config；重新生成预览使用 Python 3 与 Pillow。浏览器端为原函数逐帧绘制的图集。

单独展示角色并居中取景。搜索、片单和放映设备的小图使用程序绘制的月亮替代。

主源码在 component.cpp，完整使用步骤在包内 README.md。

### 可复制的提示词

2.78 倍近景中，身体先压缩再回弹，手套后抬。 以暖纸、深咖轮廓、朱红和芥末黄建立旧戏院的橡皮管角色。身体轮廓、眼睛方向、手套接触点都依照 component.cpp 的动作求值。

<a id="effect-15-typewriter"></a>

## 打字机逐键输入 MOON

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/15-typewriter.zip) · [在线读主源码](source/15-typewriter.cpp) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/15-typewriter.zip)

四次字键动作各有独立按下、回程和落字时刻。 原角色时钟为 60 帧/秒和 128 BPM。离线图集为 24 帧/秒，原始函数支持任意时刻与目标分辨率。

原版 C++ 绘制函数。C++17、Cairo 1.18.4、pkg-config；重新生成预览使用 Python 3 与 Pillow。浏览器端为原函数逐帧绘制的图集。

单独展示角色并居中取景。搜索、片单和放映设备的小图使用程序绘制的月亮替代。

主源码在 component.cpp，完整使用步骤在包内 README.md。

### 可复制的提示词

四次字键动作各有独立按下、回程和落字时刻。 以暖纸、深咖轮廓、朱红和芥末黄建立旧戏院的橡皮管角色。身体轮廓、眼睛方向、手套接触点都依照 component.cpp 的动作求值。

<a id="effect-15-watch-list"></a>

## 切换到我的片单

[下载源码 ZIP](https://github.com/xiaxia-motion/xiaxia-motion-library/raw/refs/heads/main/15-watch-list.zip) · [在线读主源码](source/15-watch-list.cpp) · [分享这个文件](https://github.com/xiaxia-motion/xiaxia-motion-library/blob/main/15-watch-list.zip)

分段标签移动，刚收藏的电影沿原卡片进入片单。 原角色时钟为 60 帧/秒和 128 BPM。离线图集为 24 帧/秒，原始函数支持任意时刻与目标分辨率。

原版 C++ 绘制函数。C++17、Cairo 1.18.4、pkg-config；重新生成预览使用 Python 3 与 Pillow。浏览器端为原函数逐帧绘制的图集。

单独展示角色并居中取景。搜索、片单和放映设备的小图使用程序绘制的月亮替代。

主源码在 component.cpp，完整使用步骤在包内 README.md。

### 可复制的提示词

分段标签移动，刚收藏的电影沿原卡片进入片单。 以暖纸、深咖轮廓、朱红和芥末黄建立旧戏院的橡皮管角色。身体轮廓、眼睛方向、手套接触点都依照 component.cpp 的动作求值。

[回到全部笔记](README.md)
