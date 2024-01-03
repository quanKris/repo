---
title: CSS
date: 2023-12-28
---
<!-- [TOC] -->

## **display: none; 与 visibility: hidden; 的区别**

- 联系：它们都能让元素不可见
- 区别：
  - `display:none`;会让元素完全从渲染树中消失，渲染的时候不占据任何空间；`visibility: hidden`;不会让元素从渲染树消失，渲染师元素继续占据空间，只是内容不可见
  - 修改常规流中元素的`display`通常会造成文档重排。修改`visibility`属性只会造成本元素的重绘
  
    

## **外边距折叠(collapsing margins)**

- 毗邻的两个或多个 `margin` 会合并成一个`margin`，叫做外边距折叠。规则如下：
  - 两个或多个毗邻的普通流中的块元素垂直方向上的`margin`会折叠
  - 浮动元素或`inline-block`元素或绝对定位元素的`margin`不会和垂直方向上的其他元素的margin折叠
  - 创建了块级格式化上下文（BFC）的元素，不会和它的子元素发生margin折叠

## **介绍一下标准的CSS的盒子模型？低版本IE的盒子模型有什么不同的？**

- 有两种， IE 盒子模型、W3C 盒子模型；
- 盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border)；
- 区  别： IE的content部分把 border 和 padding计算了进去;

## **CSS优先级算法如何计算？**

- 优先级为: `!important >  id > class > tag` important 比 内联优先级高

## **position的值relative和absolute定位原点是？**

- absolute
  
    - 生成绝对定位的元素，相对于值不为 static的第一个父元素进行定位。
    
- fixed （老IE不支持）
  
    - 生成绝对定位的元素，相对于浏览器窗口进行定位。
    
- relative
  
    - 生成相对定位的元素，相对于其正常位置进行定位。
    
- static
  
    - 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right - z-index 声明）。
    
- inherit
  
    - 规定从父元素继承 position 属性的值
    
- sticky

     - 粘性定位，同时给一个(top,bottom,right,left)之一即可

       

## **CSS3有哪些新特性？**

 - 新增各种CSS选择器  （: not(.input)：所有 class 不是“input”的节点）
 - 圆角           （border-radius:8px）
 - 阴影           （Shadow）
 - 文字特效      （text-shadow、）
 - 线性渐变      （gradient）
 - 旋转          （transform）
 - 增加了旋转,缩放,定位,倾斜,动画，多背景
 - `transform:\scale(0.85,0.90)\ translate(0px,-30px)\ skew(-9deg,0deg)\Animation:`

## **对BFC规范(块级格式化上下文：block formatting context)的理解？**

- 一个页面是由很多个 Box 组成的,元素的类型和 display 属性,决定了这个 Box 的类型

- 不同类型的 Box,会参与不同的 Formatting Context（决定如何渲染文档的容器）,因此Box内的元素会以不同的方式渲染,也就是说BFC内部的元素和外部的元素不会互相影响

- 是CSS中的一个渲染机制，BFC就相当于一个盒子，内部的元素与外界的元素互不干扰。它不会影响外部的布局，外部的布局也不会影响到它.

  BFC创建：float的值不是none，position 的值不是static或者relative，display的值是inline-block,table-cell,flex,table-caption或者inline-flex，overflow的值不是visible

  特性：内部的BOX会在垂直方向上一个接一个的放置，于同一个BFC的俩个相邻的BOX的margin会发生重叠，与方向无关，每个元素的左外边距与包含块的左边界相接触（从左到右），即使浮动元素也是如此，BFC的区域不会与float的元素区域重叠，计算BFC的高度时，浮动子元素也参与计算，BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然

## **css定义的权重**

```
// 以下是权重的规则：标签的权重为1，class的权重为10，id的权重为100，以下/// 例子是演示各种定义的权重值：

/*权重为1*/
div{
}
/*权重为10*/
.class1{
}
/*权重为100*/
#id1{
}
/*权重为100+1=101*/
#id1 div{
}
/*权重为10+1=11*/
.class1 div{
}
/*权重为10+10+1=21*/
.class1 .class2 div{
}

// 如果权重相同，则最后定义的样式会起作用，但是应该避免这种情况出现
```



## **box-sizing 常用的属性有哪些？分别有什么作用？**

* box-sizing: content-box;  // 默认的标准(W3C)盒模型元素效果
* box-sizing: border-box;   // 触发怪异(IE)盒模型元素的效果
* box-sizing: inherit;      //  继承父元素 box-sizing 属性的值



## **css垂直居中的方法有哪些？**

* 如果是单行文本, line-height 设置成和 height 值

```js
.vertical {
      height: 100px;
      line-height: 100px;
    }
```
* 已知高度的块级子元素，采用绝对定位和负边距

```js
.container {
  position: relative;
}
.vertical {
  height: 300px;  /*子元素高度*/
  position: absolute;
  top:50%;  /*父元素高度50%*/
  margin-top: -150px; /*自身高度一半*/
}
```

* 绝对定位配合 CSS3 位移

```js
.vertical {
  position: absolute;
  top:50%;  /*父元素高度50%*/js
  left:50%;
  transform:translate(-50%, -50%);
}
```

* CSS3弹性盒模型

```js
.container {
  display:flex;
  justify-content: center; /*子元素水平居中*/
  align-items: center; /*子元素垂直居中*/
}
```

- 根据table的vertical-align属性，父级元素table-cell，子元素若为块元素转为行内块元素

```js
.wrapBox3{
    width: 300px;
    height: 300px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
.wrapItem3{
    width: 100px;
    height: 50px;
    display: inline-block;
}
```

## **px、rem、 em 在表现上有什么区别？**

- px 相对于显示器屏幕分辨率，无法用浏览器字体放大功能
- em 值并不是固定的，会继承父级的字体大小： em = 像素值 / 父级font-size
- rem（font size of the root element）是指相对于根元素的字体大小的单位

css中的body中先全局声明font-size=62.5%，这里的%的算法和rem一样。
因为100%=16px，1px=6.25%，所以10px=62.5%，
这是的1rem=10px，所以12px=1.2rem。px与rem的转换通过10就可以得来，很方便了吧！
rem是只相对于根元素htm的font-size，即只需要设置根元素的font-size，其它元素使用rem单位设置成相应的百分比即可；

例子：

```js
 /*16px * 312.5% = 50px;*/
 html{font-size: 26.6667vw%;}
 /*50px * 0.5 = 25px;*/
 body{
	font-size: 0.5rem;
	font-size\0:25px;
}
```


一般情况下，是这样子使用的

```js
html{font-size:62.5%;} 
 body{font-size:12px;font-size:1.2rem ;} 
 p{font-size:14px;font-size:1.4rem;}
```

## **解释下什么是浮动和它的工作原理？**


* 非IE浏览器下，容器不设高度且子元素浮动时，容器高度不能被内容撑开。
此时，内容会溢出到容器外面而影响布局。这种现象被称为浮动（溢出）。
* 工作原理：
  - 浮动元素脱离文档流，不占据空间（引起“高度塌陷”现象）
  - 浮动元素碰到包含它的边框或者其他浮动元素的边框停留
  

## **浮动元素引起的问题？**

* 父元素的高度无法被撑开，影响与父元素同级的元素
* 与浮动元素同级的非浮动元素会跟随其后

## **列举几种清除浮动的方式？**

* 添加额外标签，例如 `<div style="clear:both"></div>`
* 使用 br 标签和其自身的 clear 属性，例如 `<br clear="all" />`
* 父元素设置 overflow：hidden; 在IE6中还需要触发 hasLayout，例如zoom：1;
* 父元素也设置浮动
* 使用 :after 伪元素。由于IE6-7不支持 :after，使用 zoom:1 触发 hasLayout



## **介绍使用过的 CSS 预处理器？**

* CSS 预处理器基本思想：为 CSS 增加了一些编程的特性（变量、逻辑判断、函数等）
* 开发者使用这种语言进行进行 Web 页面样式设计，再编译成正常的 CSS 文件使用
* 使用 CSS 预处理器，可以使 CSS 更加简洁、适应性更强、可读性更佳，无需考虑兼容性
* 最常用的 CSS 预处理器语言包括：Sass（SCSS）和 LESS

## **CSS优化、提高性能的方法有哪些？**

* 多个css合并，尽量减少HTTP请求
* 将css文件放在页面最上面
* 移除空的css规则
* 避免使用CSS表达式
* 选择器优化嵌套，尽量避免层级过深
* 充分利用css继承属性，减少代码量
* 抽象提取公共样式，减少代码量
* 属性值为0时，不加单位
* 属性值为小于1的小数时，省略小数点前面的0
* css雪碧图

## **浏览器是怎样解析CSS选择器的？**

- 浏览器解析 CSS 选择器的方式是从右到左,  ul li img {width：100px}

## **抽离样式模块怎么写，说出思路？**

- CSS可以拆分成2部分：公共CSS 和 业务CSS：
  - 网站的配色，字体，交互提取出为公共CSS。这部分CSS命名不应涉及具体的业务
  - 对于业务CSS，需要有统一的命名，使用公用的前缀。可以参考面向对象的CSS
  

## **元素竖向的百分比设定是相对于容器的高度吗？**

- 元素竖向的百分比设定是相对于容器的宽度，而不是高度

## **什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的IE？**

* 响应式设计就是网站能够兼容多个终端，而不是为每个终端做一个特定的版本
* 基本原理是利用CSS3媒体查询，为不同尺寸的设备适配不同样式
* 对于低版本的IE，可采用JS获取屏幕宽度，然后通过resize方法来实现兼容：


```js
$(window).resize(function () {
  screenRespond();
});
screenRespond();
function screenRespond(){
var screenWidth = $(window).width();
if(screenWidth <= 1800){
  $("body").attr("class", "w1800");
}
if(screenWidth <= 1400){
  $("body").attr("class", "w1400");
}
if(screenWidth > 1800){
  $("body").attr("class", "");
}
}
```

## **假设高度默认`100px` ，请写出三栏布局，其中左栏、右栏各为`300px`，中间自适应。**

![](http://img.smyhvae.com/20180305_1520.png)

- 方法1：浮动
- 方法2：绝对定位
- 方法3：`flexbox`。移动开发里经常用到。

**方法1、浮动：**

> 左侧设置左浮动，右侧设置右浮动即可，中间会自动地自适应。

**方法2、绝对定位：**

> 左侧设置为绝对定位， ` left：0px`。右侧设置为绝对定位， `right：0px`。中间设置为绝对定位，`left `和`right` 都为`300px`，即可。中间的宽度会自适应。


> 使用`article`标签作为容器，包裹左、中、右三个部分。


> 方法1 和方法2 的代码如下：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        html * {
            padding: 0px;
            margin: 0px;
        }

        .layout {
            margin-bottom: 150px;
        }


        .layout article div { /*注意，这里是设置每个小块儿的高度为100px，而不是设置大容器的高度。大容器的高度要符合响应式*/
            height: 100px;
        }

        /* 方法一 start */

        .layout.float .left {
            float: left;
            width: 300px;
            background: red;
        }

        .layout.float .right {
            float: right;
            width: 300px;
            background: blue;
        }

        .layout.float .center {
            background: green;

        }

        /* 方法一 end */


        /* 方法二 start */
        .layout.absolute .left-center-right {
            position: relative;
        }

        .layout.absolute .left {
            position: absolute;
            left: 0;
            width: 300px;
            background: red;
        }

        /* 【重要】中间的区域，左侧定位300px，右侧定位为300px，即可完成。宽度会自使用 */
        .layout.absolute .center {
            position: absolute;
            left: 300px;
            right: 300px;
            background: green;
        }

        .layout.absolute .right {
            position: absolute;
            right: 0;
            width: 300px;
            background: blue;
        }


        /* 方法二 end */
    </style>
</head>

<body>

    <!-- 方法一：浮动 start -->
    <!-- 输入 section.layout.float，即可生成  -->
    <section class="layout float">
        <!-- 用  article 标签包裹左、中、右三个部分 -->
        <article class="left-right-center">
            <!-- 输入 div.left+div.right+div.center，即可生成 -->
            <div class="left">
                我是 left
            </div>
            <div class="right">
                我是 right
            </div>
            <div class="center">
                浮动解决方案
                我是 center
            </div>

        </article>

    </section>
    <!-- 方法一：浮动 end -->

    <section class="layout absolute">
        <article class="left-center-right">
            <div class="left">
                我是 left
            </div>
            <div class="right">
                我是 right
            </div>
            <div class="center">
                <h1>绝对定位解决方案</h1>
                我是 center
            </div>
        </article>
    </section>
</body>
</html>

```

效果如下：

![](http://img.smyhvae.com/20180305_1640.gif)

**方法3、flexbox布局**

> 将左中右所在的容器设置为`display: flex`，设置两侧的宽度后，然后让中间的`flex = 1`，即可。


```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        html * {
            padding: 0;
            margin: 0;
        }

        .layout article div {
            height: 100px;
        }

        .left-center-right {
            display: flex;
        }

        .layout.flex .left {
            width: 300px;
            background: red;
        }

        .layout.flex .center {
            flex: 1;
            background: green;
        }

        .layout.flex .right {
            width: 300px;
            background: blue;
        }
    </style>

</head>

<body>
    <section class="layout flex">
        <article class="left-center-right-">
            <div class="left">
                我是 left
            </div>
            <div class="center">
                <h1>flex布局解决方案</h1>
                我是 center
            </div>
            <div class="right">
                我是 right
            </div>

        </article>
    </section>

</body>

</html>


```


效果如下：

![](http://img.smyhvae.com/20180305_1700.gif)



## **flex属性及含义**

- 第一个参数表示: flex-grow 定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大

- 第二个参数表示: flex-shrink 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小

- 第三个参数表示: flex-basis给上面两个属性分配多余空间之前, 计算项目是否有多余空间, 默认值为 auto, 即项目本身的大小

  flex: 1 ===  flex: 1 1 0