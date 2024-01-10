---
title: HTML
date: 2023-12-28
categories: 
 - HTML
---
<!-- [TOC] -->

## **HTML 语义化的理解**

- 用正确的标签做正确的事情。 
- html 语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;
- 即使在没有样式 CSS 情况下也以一种文档格式显示，并且是容易阅读的;
- 搜索引擎的爬虫也依赖于 HTML 标记来确定上下文和各个关键字的权重，利于 SEO;
- 使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解
  dev 添加内容 修改了 dev

## **行内元素有哪些，块级元素有哪些，空(void)元素有那些？**

- 行内元素有：`a b span img input select strong`（强调的语气）
- 块级元素有：`div ul ol li dl dt dd h1 h2 h3 h4…p`
- 常见的空元素:` <br> <hr> <img> <input> <link> <meta>`

## **页面导入样式时，使用 link 和@import 有什么区别？**

- `link`属于`XHTML`标签，除了加载`CSS`外，还能用于定义`RSS`,定义`rel`连接属性等作用；而`@import`是`CSS`提供的，只能用于加载`CSS`
- 页面被加载的时，`link`会同时被加载，而`@import`引用的`CSS`会等到页面被加载完再加载
- `import`是`CSS2.1` 提出的，只在`IE5`以上才能被识别，而`link`是`XHTML`标签，无兼容问题

## **介绍一下你对浏览器内核的理解？**

- 主要分成两部分：渲染引擎(`layout engineer`或`Rendering Engine`)和`JS`引擎

- 渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核
- JS 引擎则：解析和执行 javascript 来实现网页的动态效果
- 最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎

## **常见的浏览器内核有哪些？**

- `Trident`内核：`IE,MaxThon,TT,The World,360`,搜狗浏览器等。[又称 MSHTML]
- `Gecko`内核：`Netscape6`及以上版本，`FF,MozillaSuite/SeaMonkey`等
- `Presto`内核：`Opera7`及以上。 [`Opera`内核原为：Presto，现为：`Blink`;]
- `Webkit`内核：`Safari,Chrome`等。 [ `Chrome`的`Blink`（`WebKit`的分支）]

## **html5 有哪些新特性、移除了那些元素？如何处理 HTML5 新标签的浏览器兼容问题？如何区分 HTML 和 HTML5？**

- HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加
  - 用于媒介回放的 video 和 audio 元素
  - 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失
  - sessionStorage 的数据在浏览器关闭后自动删除
  - 语意化更好的内容元素，比如 article、footer、header、nav、section
  - 表单控件，calendar、date、time、email、url、search
  - 新的技术 webworker, websocket, Geolocation
- 移除的元素：
- 纯表现的元素：basefont，big，center，font, s，strike，tt，u
- 对可用性产生负面影响的元素：frame，frameset，noframes

- 支持 HTML5 新标签：
  - IE8/IE7/IE6 支持通过 document.createElement 方法产生的标签
  - 可以利用这一特性让这些浏览器支持 HTML5 新标签
  - 浏览器支持新标签后，还需要添加标签默认的样式
- 当然也可以直接使用成熟的框架、比如 html5shim

```
<!--[if lt IE 9]>
<script> src="http://html5shim.googlecode.com
/svn/trunk/html5.js"</script><![endif]-->
```

- 如何区分 HTML5： DOCTYPE 声明\新增的结构元素\功能元素

## **请描述一下 cookies，sessionStorage 和 localStorage 的区别？**

- cookie 是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）
- cookie 数据始终在同源的 http 请求中携带（即使不需要），记会在浏览器和服务器间来回传递
- `sessionStorage`和`localStorage`不会自动把数据发给服务器，仅在本地保存
- 存储大小：
  - `cookie`数据大小不能超过 4k
  - `sessionStorage`和`localStorage`虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大
- 有期时间：
  - `localStorage` 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据
  - `sessionStorage` 数据在当前浏览器窗口关闭后自动删除
  - `cookie` 设置的`cookie`过期时间之前一直有效，即使窗口或浏览器关闭

## **Label 的作用是什么？是怎么用的？**

- label 标签来定义表单控制间的关系,当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件

## **如何实现浏览器内多个标签页之间的通信? (阿里)**

- WebSocket
- 也可以调用 localstorge、cookies 等本地存储方式

## **前端需要注意哪些 SEO**

- 合理的 title、description、keywords：搜索对着三项的权重逐个减小，title 值强调重点即可，重要关键词出现不要超过 2 次，而且要靠前，不同页面 title 要有所不同；description 把页面内容高度概括，长度合适，不可过分堆砌关键词，不同页面 description 有所不同；keywords 列举出重要关键词即可
- 语义化的 HTML 代码，符合 W3C 规范：语义化代码让搜索引擎容易理解网页
- 重要内容 HTML 代码放在最前：搜索引擎抓取 HTML 顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容一定会被抓取
- 重要内容不要用 js 输出：爬虫不会执行 js 获取内容
- 少用 iframe：搜索引擎不会抓取 iframe 中的内容
- 非装饰性图片必须加 alt

## **浏览器的渲染机制一般分为以下几个步骤**

- 处理 `HTML` 并构建 `DOM` 树。
- 处理 `CSS` 构建 `CSSOM` 树。
- 将 `DOM` 与 `CSSOM` 合并成一个渲染树。
- 根据渲染树来布局，计算每个节点的位置。
- 调用 `GPU` 绘制，合成图层，显示在屏幕上

![](https://user-gold-cdn.xitu.io/2018/4/11/162b2ab2ec70ac5b?w=900&h=352&f=png&s=49983)

- 在构建 CSSOM 树时，会阻塞渲染，直至 CSSOM 树构建完成。并且构建 CSSOM 树是一个十分消耗性能的过程，所以应该尽量保证层级扁平，减少过度层叠，越是具体的 CSS 选择器，执行速度越慢
- 当 HTML 解析到 script 标签时，会暂停构建 DOM，完成后才会从暂停的地方重新开始。也就是说，如果你想首屏渲染的越快，就越不应该在首屏就加载 JS 文件。

- 添加或删除可见的 DOM 元素
- 元素的位置发生变化
- 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
- 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代。
- 定位或者浮动
- 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）

_减少重绘和回流_

- 批量修改 DOM

- 对于复杂动画效果,使用绝对定位让其脱离文档流

- css3 硬件加速（GPU 加速）transform、opacity、filters 这些动画不会引起回流重绘
