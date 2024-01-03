---
title: 前端工程化工具
date: 2023-12-28
---
<!-- [TOC] -->

## **前端工程化工具 gulp&webpack**

**gulp**

```js
gulp -src=>pipe(scss翻译).pipe(css 合并).pipe(css压缩)=>dist
gulp -src=>pipe(模块化编译).pipe(js压缩)=>dist
	流程化
webpack
    模块化 默认支持的commonjs规范

所有js模块打包生成一个js文件
编译解析浏览器不能识别的语言 （scss ,.vue, jsx, ts, ES6）

配置？
 入口
 出口
 devserver 启动 自动刷新，热更新， 反向代理
 sourcemap-调试代码 .map （地图）

 loaders: sass-loader css-loader file-loader  babel-loader vue-loader postcss-loader

 plugin:  压缩, 提取公共库



```

**webpack**

说白了，就是一个模块化的打包工具，可以处理各 js 模块之间的依赖关系，将其打包成浏览器认识的 js 文件(现代浏览器到目前为止是不支持 js 模块化的，如果有一天支持了那`webpack`也许就要退出历史的舞台了)。

webpack 是基于入口的。webpack 会自动地递归解析入口所需要加载的所有资源文件，然后用不同的 Loader 来处理不同的文件，用 Plugin 来扩展 webpack 功能。

- **Loader**直译为"加载器"。Webpack 将一切文件视为模块，但是 webpack 原生是只能解析 js 文件，如果想将其他文件也打包的话，就会用到`loader`。 所以 Loader 的作用是让 webpack 拥有了加载和解析*非 JavaScript 文件*的能力。
- **Plugin**直译为"插件"。Plugin 可以扩展 webpack 的功能，让 webpack 具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

## **Git 团队协作工具 版本控制工具， 代码管理工具**

> svn&git

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015120901.png)

```js
svn 集中式代码管理 不能再离线的情况下使用 svn。如果服务器出现问题，就没有办法使用 svn 来提交代码。
git 分布式代码管理
(1)git pull (同步，更新代码) => git fetch + git merge
(2)git add . 暂存区
(3)git commit 提交到本地仓库。
(4)git remote add origin https:.......  配置git连接远程仓库路径
(5)git push origin master:kerwin
(6)git push origin -d yuan     删除远端yuan 分支
(7)$ git push origin Dev-special  把本地分支推送到远程
(8)$ git push origin :Dev-special  删除远程分支
(9)$ git push --set-upstream origin xxxxxx   origin 是默认的远程版本库名称 给远程仓库添加分支
git remote prune origin  同步远程分支，同步远程已删除分支

git clone 克隆代码 克隆者不用再次连接远程地址，自动有。
git pull origin master 更新合并其他人代码的时候，留注释，按esc ：wq
git checkout -b dev  创建一个叫dev的分支，-b创建，不带-b切分支

重置暂存区与工作区，与上一次commit保持一致
$ git reset --hard

重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
$ git reset [commit]

重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git reset --hard [commit]

重置当前HEAD为指定commit，但保持暂存区和工作区不变
$ git reset --keep [commit]

暂时将未提交的变化移除，稍后再移入
$ git stash
$ git pull
$ git stash pop

git merge dev 讲dev分支代码迁移至主分支
git rebase  把自己当前分支提前到

git branch -a 查看所有分支
git branch -d dev  删除本地dev分支

本地仓库推到github上仓库的全过程
git init
git add .
git commit -m "备注信息"
git remote add origin 你的远程仓库地址
git push -u origin master

代码冲突怎么解决？
两个人修改同一个文件造成

a.js 111111 => github(gitlab, gitee)
a.js 222222 =>失败，提示git pull ,自动合并失败。

手动合并(借助可视化工具 ，小乌龟)
>>>>>>>>>>>>>head>>>>>>>>>>>>>

>>>>>>>>>>>43fdea4wadwad>>>>>>>>
git add. git commit git push 远程仓库就是合并完的代码

git reset
git revert 生成一个新的log记录

Git从码云Gitee下载项目重复输入帐号和密码，永久记住账号密码方法
git config --global credential.helper store
去重新下载，第一次输入帐号密码，之后再下载就不会出现了

git tag : 直接列出所有的标签
git tag -l xxxx : 可以根据 xxxx 进行标签的筛选
git tag -d 标签名称 : 删除指定名称的标签

轻量标签
git tag 标签名 ： 直接给当前的提交版本创建一个【轻量标签】
git tag 标签名 提交版本号 ：给指定的提交版本创建一个 【轻量标签】
$ git tag 标签名
$ git tag 标签名 提交版本
附注标签
-a : 理解为 annotated 的首字符，表示 附注标签
-m : 指定附注信息
git tag -a 标签名称 -m 附注信息 ：直接给当前的提交版本创建一个 【附注标签】
git tag -a 标签名称 提交版本号 -m 附注信息 ：给指定的提交版本创建一个【附注标签】

//两个命令都是删除远程仓库中的 指定标签
$ git push origin  :regs/tags/标签名称
$ git push origin --delete 标签名称


git push origin 标签名称 : 将指定的标签上传到远程仓库
git push origin --tags : 将所有不在远程仓库中的标签上传到远程仓库
```

**事件循环**

```js
（1）所有同步任务在主线程上执行，形成一个执行栈

（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务(setInterval,setTimeout，i/o...)有了结果，就在"任务队列"之中放置一个事件。

（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，拿到队列的第一个任务，进入执行栈，开始执行。

（4）主线程不断重复上面的(3)。

主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）

```

![img](05-综合.assets/15586502-25e3b2d71281a70b.webp)

## **微任务和宏任务**

> Promise 的出现让问题变复杂了, 它跟 setTimeout 优先级？ 上面的事件循环解释不够用了。

```js
console.log("script start");

setTimeout(function () {
  console.log("timer over");
}, 0);

Promise.resolve()
  .then(function () {
    console.log("promise1");
  })
  .then(function () {
    console.log("promise2");
  });

console.log("script end");

// script start
// script end
// promise1
// promise2
// timer over
```

```js
所有任务分为宏任务（macrotask ）和微任务（microtask ） 两种。
MacroTask（宏任务）：* script全部代码、setTimeout、setInterval、I/O、UI Rendering。
MicroTask（微任务）：* Process.nextTick（Node独有）、Promise...

在挂起任务时，JS 引擎会将所有任务按照类别分到这两个队列中，首先在 宏任务 的队列中取出第一个任务，执行完毕后取出 微任务 队列中的所有任务顺序执行；之后新的事件循环开始，取宏任务的第一个，周而复始，直至两个队列的任务都取完。
```

![img](05-综合.assets/15586502-4f2d3f71a94a4a00.webp)

![img](05-综合.assets/15586502-30ee422b0922669e.webp)

## **下面代码的执行结果是**

```
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
```

这是秋招遇到的一个笔试题，流程比较复杂，下面来分析一下：

**（1）第一轮事件循环流程分析如下：**

- 整体 script 作为第一个宏任务进入主线程，遇到`console.log`，输出 1。
- 遇到`setTimeout`，其回调函数被分发到宏任务 Event Queue 中。暂且记为`setTimeout1`。
- 遇到`process.nextTick()`，其回调函数被分发到微任务 Event Queue 中。记为`process1`。
- 遇到`Promise`，`new Promise`直接执行，输出 7。`then`被分发到微任务 Event Queue 中。记为`then1`。
- 又遇到了`setTimeout`，其回调函数被分发到宏任务 Event Queue 中，记为`setTimeout2`。

| 宏任务 Event Queue | 微任务 Event Queue |
| ------------------ | ------------------ |
| setTimeout1        | process1           |
| setTimeout2        | then1              |

上表是第一轮事件循环宏任务结束时各 Event Queue 的情况，此时已经输出了 1 和 7。发现了`process1`和`then1`两个微任务：

- 执行`process1`，输出 6。
- 执行`then1`，输出 8。

好了，第一轮事件循环正式结束，这一轮的结果是输出 1，7，6，8。

**（2）第二轮时间循环从\*\***`setTimeout1`\***\*宏任务开始：**

- 首先输出 2。接下来遇到了`process.nextTick()`，同样将其分发到微任务 Event Queue 中，记为`process2`。
- `new Promise`立即执行输出 4，`then`也分发到微任务 Event Queue 中，记为`then2`。

| 宏任务 Event Queue | 微任务 Event Queue |
| ------------------ | ------------------ |
| setTimeout2        | process2           |
|                    | then2              |

第二轮事件循环宏任务结束，发现有`process2`和`then2`两个微任务可以执行：

- 输出 3。
- 输出 5。

第二轮事件循环结束，第二轮输出 2，4，3，5。

**（3）第三轮事件循环开始，此时只剩 setTimeout2 了，执行。**

- 直接输出 9。
- 将`process.nextTick()`分发到微任务 Event Queue 中。记为`process3`。
- 直接执行`new Promise`，输出 11。
- 将`then`分发到微任务 Event Queue 中，记为`then3`。

| 宏任务 Event Queue | 微任务 Event Queue |
| ------------------ | ------------------ |
|                    | process3           |
|                    | then3              |

第三轮事件循环宏任务执行结束，执行两个微任务`process3`和`then3`：

- 输出 10。
- 输出 12。

第三轮事件循环结束，第三轮输出 9，11，10，12。

整段代码，共进行了三次事件循环，完整的输出为 1，7，6，8，2，4，3，5，9，11，10，12。

## **http 相关**

## **http 状态码有那些？分别代表是什么意思？**

```
    [
        100  Continue   继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
        200  OK         正常返回信息
        201  Created    请求成功并且服务器创建了新的资源
        202  Accepted   服务器已接受请求，但尚未处理

        301  Moved Permanently  请求的网页已永久移动到新位置。
        302 Found       临时性重定向。
        307 Internal Redirect  内部重定向

        304  Not Modified 自从上次请求后，请求的网页未修改过。 协商缓存
		200  memory cache  强缓存

        400 Bad Request  服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
        401 Unauthorized 请求未授权。
        403 Forbidden   禁止访问。
        404 Not Found   找不到如何与 URl 相匹配的资源。

        500 Internal Server Error  最常见的服务器端错误。
        503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。
    ]
```

## **页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？**

- 浏览器根据请求的 URL 交给 DNS 域名解析，找到真实 IP，向服务器发起请求；
- 客户端与服务器建立 TCP 安全连接，为之后的 http 响应做准备
- 客户端根据用户操作，如按下回车键，向服务器发送 HTTP 请求，服务器接收请求，然后进行处理，整合需要的资源，通过 HTTP 协议传输响应发送给客户端浏览器
- 浏览器接收服务器资源，对加载到的资源（HTML、JS、CSS 等）进行语法解析，建立相应的内部数据结构（如 HTML 的 DOM）解析渲染成 Web 页面。
- 通过四次挥手，断开连接

## **说说 TCP 传输的三次握手四次挥手策略**

- 为了准确无误地把数据送达目标处，TCP 协议采用了三次握手策略。用 TCP 协议把数据包送出去后，TCP 不会对传送 后的情况置之不理，它一定会向对方确认是否成功送达。握手过程中使用了 TCP 的标志：SYN 和 ACK

- 发送端首先发送一个带 SYN 标志的数据包给对方。接收端收到后，回传一个带有 SYN/ACK 标志的数据包以示传达确认信息。 最后，发送端再回传一个带 ACK 标志的数据包，代表“握手”结束。 若在握手过程中某个阶段莫名中断，TCP 协议会再次以相同的顺序发送相同的数据包

## **断开一个 TCP 连接则需要“四次挥手”：**

- 第一次挥手：主动关闭方发送一个 FIN，用来关闭主动方到被动关闭方的数据传送，也就是主动关闭方告诉被动关闭方：我已经不 会再给你发数据了(当然，在 fin 包之前发送出去的数据，如果没有收到对应的 ack 确认报文，主动关闭方依然会重发这些数据)，但是，此时主动关闭方还可 以接受数据

- 第二次挥手：被动关闭方收到 FIN 包后，发送一个 ACK 给对方，确认序号为收到序号+1（与 SYN 相同，一个 FIN 占用一个序号）

- 第三次挥手：被动关闭方发送一个 FIN，用来关闭被动关闭方到主动关闭方的数据传送，也就是告诉主动关闭方，我的数据也发送完了，不会再给你发数据了

- 第四次挥手：主动关闭方收到 FIN 后，发送一个 ACK 给被动关闭方，确认序号为收到序号+1，至此，完成四次挥手

## **TCP 和 UDP 的区别**

- TCP（Transmission Control Protocol，传输控制协议）是基于连接的协议，也就是说，在正式收发数据前，必须和对方建立可靠的连接。一个 TCP 连接必须要经过三次“对话”才能建立起来

- UDP（User Data Protocol，用户数据报协议）是与 TCP 相对应的协议。它是面向非连接的协议，它不与对方建立连接，而是直接就把数据包发送过去！ UDP 适用于一次只传送少量数据、对可靠性要求不高的应用环境

## **HTTP 和 HTTPS**

- http 超文本传输协议，是一个基于请求与响应，无状态的，应用层的协议，常基于 TCP/IP 协议传输数据，在 HTTP 和 TCP 之间添加一个安全协议层（SSL 或 TLS），这个时候，就成了我们常说的 HTTPS
- https 是一种通过计算机网络进行安全通信的的传输协议，经由 http 通信，利用 ssl/tls 全信道，加密数据包，主要目的是提供对网站服务器的身份认证，保护交换数据隐私与完整。 ps：tls 是传输层加密协议，前身 ssl
- 默认 HTTP 的端口号为 80，HTTPS 的端口号为 443

## **为什么 HTTPS 安全**

- 因为网络请求需要中间有很多的服务器路由器的转发。中间的节点都可能篡改信息，而如果使用 HTTPS，密钥在你和终点站才有。https 之所以比 http 安全，是因为他利用 ssl/tls 协议传输。它包含证书，卸载，流量转发，负载均衡，页面适配，浏览器适配，refer 传递等。保障了传输过程的安全性

## **websocket**

websocket 是一种网络通信协议，是 HTML5 开始提供的一种基于 TCP 连接上进行全双工通信的协议，这个对比着 http 协议来说，http 协议是一种无状态的、无连接的、单向的应用层协议，通信请求只能由客户端发起，服务端对请求做出应答处理。

http 协议无法实现服务器主动向客户端发起消息，Websocket 连接允许客户端和服务器之间进行全双工通信，以便任一方都可以通过建立的连接将数据推送到另一端。WebSocket 只需要建立一次连接，就可以一直保持连接状态。

## **一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？**

- 01.浏览器查找域名对应的 IP 地址(DNS 查询：浏览器缓存->系统缓存->路由器缓存->ISP DNS 缓存->根域名服务器)
- 02.浏览器向 Web 服务器发送一个 HTTP 请求（TCP 三次握手）
- 03.服务器 301 重定向（从 http://example.com 重定向到 http://www.example.com）
- 04.浏览器跟踪重定向地址，请求另一个带 www 的网址
- 05.服务器处理请求（通过路由读取资源）
- 06.服务器返回一个 HTTP 响应（报头中把 Content-type 设置为 'text/html'）
- 07.浏览器进 DOM 树构建
- 08.浏览器发送请求获取嵌在 HTML 中的资源（如图片、音频、视频、CSS、JS 等）
- 09.浏览器显示完成页面
- 10.浏览器发送异步请求

## **前端攻击**

### **1. CSRF 的基本概念、缩写、全称**

> `CSRF`（`Cross-site request forgery`）：**跨站请求伪造**。

> 原理：攻击者诱导用户进入一个第三方网站，然后该网站向被攻击网站发送跨站请求。如果用户在被攻击网站中保存了登录状态，那么攻击者就可以利用这个登录状态，绕过后台的用户验证，冒充用户向服务器执行一些操作。CSRF 攻击的本质是利用了 cookie 会在同源请求中携带发送给服务器的特点，以此来实现用户的冒充。

![](http://img.smyhvae.com/20180307_1735.png)

> 用户是网站 A 的注册用户，且登录进去，于是网站 A 就给用户下发`cookie`。

> 从上图可以看出，要完成一次`CSRF`攻击，受害者必须满足两个必要的条件：

1. 登录受信任网站`A`，并在本地生成`Cookie`。（如果用户没有登录网站`A`，那么网站`B`在诱导的时候，请求网站`A`的`api`接口时，会提示你登录）
2. 在不登出`A`的情况下，访问危险网站`B`（其实是利用了网站`A`的漏洞）。

> 我们在讲`CSRF`时，一定要把上面的两点说清楚。

> 温馨提示一下，`cookie`保证了用户可以处于登录状态，但网站`B`其实拿不到 `cookie`。

> 举个例子，前段时间里，微博网站有个`api`接口有漏洞，导致很多用户的粉丝暴增。

**CSRF 的防范措施**

**方法一、Token 验证：**（用的最多）

1. 服务器发送给客户端一个`token`；
2. 客户端提交的表单中带着这个`token`。
3. 如果这个 `token` 不合法，那么服务器拒绝这个请求。

**方法二：隐藏令牌：**

- 把 `token` 隐藏在 `http` 的 `head`头中。

> 方法二和方法一有点像，本质上没有太大区别，只是使用方式上有区别。

**方法三、Referer 验证：**

> `Referer` 指的是页面请求来源。意思是，**只接受本站的请求，服务器才做响应**；如果不是，就拦截。

### **2. XSS 的攻击原理**

> XSS 攻击指的是跨站脚本攻击，是一种代码注入攻击。攻击者通过在网站注入恶意脚本，使之在用户的浏览器上运行，从而盗取用户的信息如 cookie 等。
>
> XSS 的本质是因为网站没有对恶意代码进行过滤，与正常的代码混合在一起了，浏览器没有办法分辨哪些脚本是可信的，从而导致了恶意代码的执行。
>
> 不需要你做任何的登录认证，它会通过合法的操作（比如在`url`中输入、在评论框中输入），向你的页面注入脚本（可能是`js`、`hmtl`代码块等）。

> 最后导致的结果可能是：

- 盗用`Cookie`
- 破坏页面的正常结构，插入广告等恶意内容
- `D-doss`攻击

**XSS 的防范措施主要有三个：**

**1. 编码**：

> 对用户输入的数据进行`HTML Entity`编码。

如上图所示，把字符转换成 转义字符。

> `Encode`的作用是将`$var`等一些字符进行转化，使得浏览器在最终输出结果上是一样的。

比如说这段代码：

```html
<script>
  alert(1);
</script>
```

> 若不进行任何处理，则浏览器会执行 alert 的 js 操作，实现 XSS 注入。

> 进行编码处理之后，L 在浏览器中的显示结果就是`<script>alert(1)</script>`，实现了将``$var`作为纯文本进行输出，且不引起 J`avaScript`的执行。

**2、过滤：**

- 移除用户输入的和事件相关的属性。如`onerror`可以自动触发攻击，还有`onclick`等。（总而言是，过滤掉一些不安全的内容）
- 移除用户输入的`Style`节点、`Script`节点、`Iframe`节点。（尤其是`Script`节点，它可是支持跨域的呀，一定要移除）。

**3、校正**

- 避免直接对`HTML Entity`进行解码。
- 使用`DOM Parse`转换，校正不配对的`DOM`标签。

> 备注：我们应该去了解一下`DOM Parse`这个概念，它的作用是把文本解析成`DOM`结构。

比较常用的做法是，通过第一步的编码转成文本，然后第三步转成`DOM`对象，然后经过第二步的过滤。

### **3 CSRF 和 XSS 的区别**

> 面试官还可能喜欢问二者的区别。

**区别一：**

- `CSRF`：需要用户先登录网站`A`，获取 `cookie`
- `XSS`：不需要登录。

**区别二：（原理的区别）**

- `CSRF`：是利用网站`A`本身的漏洞，去请求网站`A`的`api`。
- `XSS`：是向网站 `A` 注入 `JS`代码，然后执行 `JS` 里的代码，篡改网站`A`的内容。

## **Common JS 规范 AMD/CMD**

- 定义：一个单独的文件就是一个模块。每一个模块都是一个单独的作用域，也就是说，在该模块内部定义的变量，无法被其他模块读取，除非定义为 global 对象的属性

- 模块输出：模块只有一个出口，module.exports 对象，我们需要把模块希望输出的内容放入该对象
- 加载模块：加载模块使用 require 方法，该方法读取一个文件并执行，返回文件内部的 module.exports 对象

```js
//模块定义 myModel.js

var name = "Byron";

function printName() {
  console.log(name);
}

function printFullName(firstName) {
  console.log(firstName + name);
}

module.exports = {
  printName: printName,
  printFullName: printFullName
};

//加载模块

var nameModule = require("./myModel.js");

nameModule.printName();
```

浏览器端，加载 js 最容易的方式就是在 document 中插入 script 标签，脚本天生异步，传统 commonJS 在浏览器环境中无法正常加载，所以用一套模板封装模块定义，引入 AMD

AMD 即 Asynchronous Module Definition，中文名是异步模块定义的意思。它是一个在浏览器端模块化开发的规范

由于不是 JavaScript 原生支持，使用 AMD 规范进行页面开发需要用到对应的库函数，也就是大名鼎鼎 RequireJS，实际上 AMD 是 RequireJS 在推广过程中对模块定义的规范化的产出

requireJS 主要解决两个问题

- 多个 js 文件可能有依赖关系，被依赖的文件需要早于依赖它的文件加载到浏览器
- js 加载的时候浏览器会停止页面渲染，加载文件越多，页面失去响应时间越长

**AMD 推崇依赖前置，在定义模块的时候就要声明其依赖的模块**
**CMD 推崇就近依赖，只有在用到某个模块的时候再去 require**

最大的区别是对依赖模块的执行时机处理不同，注意不是加载的时机或者方式不同，其实加载模块都是异步的，只不过 AMD 依赖前置，js 可以方便的知道依赖模块是谁，CMD 就近依赖，需要把模块变为字符串解析一遍才知道依赖哪些模块，牺牲性能带来开发便利性。

同样都是异步加载模块，AMD 在加载模块完成后就会执行改模块，所有模块都加载执行完后会进入 require 的回调函数，执行主逻辑，这样的效果就是依赖模块的执行顺序和书写顺序不一定一致，看网络速度，哪个先下载下来，哪个先执行，但是主逻辑一定在所有依赖加载完成后才执行

CMD 加载完某个依赖模块后并不执行，只是下载而已，在所有依赖模块加载完成后进入主逻辑，遇到 require 语句的时候才执行对应的模块，这样模块的执行顺序和书写顺序是完全一致的，这也是很多人说 AMD 用户体验好，因为没有延迟，依赖模块提前执行了，CMD 性能好，因为只有用户需要的时候才执行的原因

## **依赖下载安装**

```js
cnpm install --save highlight@11.3.1  // 切记加--save 协同开发  
npm install -g cnpm -registry=https://registry.npm.taobao.org

npm uninstall echarts --save-dev：删除依赖，同时删除package.json中devdependencies 的配置
npm uninstall echarts --save：删除依赖，同时删除package.json中dependencies 的配置

npm i module_name  -S  = >  npm install module_name --save    写入到 dependencies 对象
npm i module_name  -D  => npm install module_name --save-dev   写入到 devDependencies 对象
npm i module_name  -g  全局安装     
```

## **ssh环境配置**

[git ssh拉取代码_新手Git操作_weixin_39648492的博客-CSDN博客](https://blog.csdn.net/weixin_39648492/article/details/110642623)

**vue路由详解**

https://www.cnblogs.com/dengyao-blogs/p/11562257.html

## **sourceTree代码管理工具（内涵ssh配置）**

https://www.cnblogs.com/fisherbook/p/11397168.html

## **VUE UI搭建项目**

https://blog.csdn.net/m0_48607837/article/details/120704009

## .**husky  Git 钩子组件**

husky v6 版本

新版本的变化是十分巨大的，主要表现在：

1. 蛮横减小体积。无理占用你 `package.json` 中 npm script 自带的 `pre** / post**` 系列 hooks 来减少自身包的大小。

2. 使用门槛提高。在 hooks 中执行的命令，全部收敛到 shell 脚本，意味着你要具备基本的读写 shell 脚本的能力。

   

首先，在 `package.json` 的 script 自动插入了 `prepare` 的 script pre hook：

![img](https://img-blog.csdnimg.cn/20210505200407898.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIxNTY3Mzg1,size_16,color_FFFFFF,t_30)

这个 hook 的执行时机有两个：

1. 安装依赖时，也就是 `yarn` 和 `yarn add **` 时。
2. 发布前，也就是 `yarn publish` 前。

可以看到，在项目根目录生成了一个 `.husky` 文件夹：

![img](https://img-blog.csdnimg.cn/20210505200837271.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIxNTY3Mzg1,size_16,color_FFFFFF,t_30)

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run pre-commit               // package.json中 "pre-commit": "npm run lint -- --fix",
```

可以看出，现在的 husky 在某个 hooks 阶段，将运行 `.husky/*` 文件夹下的同名脚本。

再看 `.husky/_/husky.sh` 这个脚本，他被放到了 `.husky/pre-commit` 的一开头就执行，我们需要格外关注：

```bash
#!/bin/sh

# 1. 先判断是否有 husky_skip_init 环境变量，不为空，执行下面的内容
if [ -z "$husky_skip_init" ]; then

  # 2. 声明一个 debug 函数，用来打印 debug 消息到控制台
  #    当然，是有条件的，必须满足 HUSKY_DEBUG 为 "1"
  debug () {
    [ "$HUSKY_DEBUG" = "1" ] && echo "husky (debug) - $1"
  }

  # 3. debug 的环境变量 HUSKY_DEBUG 开启时，才会打印当前执行的脚本名（ hook 名）
  readonly hook_name="$(basename "$0")"
  debug "starting $hook_name..."

  # 4. 如果把环境变量 HUSKY 指定为 "0" ，那么程序将直接退出
  #    从而我们知道了这个环境变量是全局总开关
  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
    exit 0
  fi

  # 5. 检测 ~ 目录是否有全局的 husky 脚本，有的话执行，这里不重要
  if [ -f ~/.huskyrc ]; then
    debug "sourcing ~/.huskyrc"
    . ~/.huskyrc
  fi

  # 6. 把 husky_skip_init 变量置为 1 后，再用 sh 执行一边该脚本
  #    也就是说，下一轮执行这段代码并不会再运行了，而是去运行用户写的脚本命令
  export readonly husky_skip_init=1
  sh -e "$0" "$@"
  exitCode="$?"

  # 7. 如果用户写的脚本命令失败了，会给出提示
  if [ $exitCode != 0 ]; then
    echo "husky - $hook_name hook exited with code $exitCode (error)"
  fi
    if [ $exitCode = 127 ]; then
    echo "husky - command not found in PATH=$PATH"
  fi
  # 8. 最后退出，防止用户写的命令又反复再跑一次
  exit $exitCode
fi
```

## **Axios 请求头信息  formData格式数据转换**

```js
//第一种qs axios自带的，直接用。
//import Qs from 'qs'
// axios({
//    headers: {
//        'Content-Type': 'application/x-www-form-urlencoded'
//   },
//    method: 'post',
//    url: '/api/lockServer/search',
//    data: Qs.stringify(data)
// })

// 第二种，自己封装的formdata转换
export function logOutForm() {
  // return request({
  //   url: window.location.origin + '/user/logout',
  //   method: 'post',
  //   data,
  //   transformRequest: [
  //     function(data) {
  //       return stringify(data)
  //     }
  //   ],
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   }
  // })
  return request({
    url: window.location.origin + '/user/logout', // http://deployment.susy.mdpi.test/
    method: 'get'
  })
}
// function stringify(data) {
//   const formData = new FormData()
//   for (const key in data) {
//     // eslint-disable-next-line no-prototype-builtins
//     if (data.hasOwnProperty(key)) {
//       if (data[key]) {
//         if (data[key].constructor === Array) {
//           if (data[key][0]) {
//             if (data[key][0].constructor === Object) {
//               formData.append(key, JSON.stringify(data[key]))
//             } else {
//               data[key].forEach((item, index) => {
//                 formData.append(key + `[${index}]`, item)
//               })
//             }
//           } else {
//             formData.append(key + '[]', '')
//           }
//         } else if (data[key].constructor === Object) {
//           formData.append(key, JSON.stringify(data[key]))
//         } else {
//           formData.append(key, data[key])
//         }
//       } else {
//         if (data[key] === 0) {
//           formData.append(key, 0)
//         } else {
//           formData.append(key, '')
//         }
//       }
//     }
//   }
//   return formData
// }

```

**Axios 请求头信息  multipart/form-data 格式数据转换 **

```js
//常见前端页面上传个人图像，然后点击保存发送后端修改原始数据	
let params = new FormData()
	params.append('file', this.file)
	params.append('id', localStorage.getItem('userID'))
	params.append('userName', this.name)
	params.append('sex', this.sex)
	params.append('mobile', this.phone)
	params.append('email', this.email)
	params.append('qq', this.qq)
	params.append('weChat', this.WeChat)

	axios.post(URL, params, {headers: {'Content-Type': 'multipart/form-data'}}).then(res	=> {
		if (res.data.code === 0) {
		this.$router.go(-1)
	}
	}).catch(error => {
		alert('更新用户数据失败' + error)
	})
```



## **Axios 详细配置**

```js
//全局 axios 默认值
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 创建实例时配置默认值
const instance = axios.create({
  baseURL: 'https://api.example.com'
});
// 创建实例后修改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
	
//axios 的请求配置
{
  // `url` 是用于请求的服务器 URL
  url: '/user',
  // `method` 是创建请求时使用的方法
  method: 'get', // 默认值
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 它只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 数组中最后一个函数必须返回一个字符串， 一个Buffer实例，ArrayBuffer，FormData，或 Stream
  // 你可以修改请求头。
  transformRequest: [function (data, headers) {
    // 对发送的 data 进行任意转换处理
    return data;
  }],
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对接收的 data 进行任意转换处理
    return data;
  }],
  // 自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},
 //Content-Type: application/json  默认为json
 //如果requestedWith为null，则为同步请求。
 //如果requestedWith为XMLHttpRequest则为Ajax请求。
  // `params` 是与请求一起发送的 URL 参数
  // 必须是一个简单对象或 URLSearchParams 对象
  params: {
    ID: 12345
  },
  // `paramsSerializer`是可选方法，主要用于序列化`params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },
  // `data` 是作为请求体被发送的数据
  // 仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
  // 在没有设置 `transformRequest` 时，则必须是以下类型之一:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属: FormData, File, Blob
  // - Node 专属: Stream, Buffer
  data: {
    firstName: 'Fred'
  },
  // 发送请求体数据的可选语法
  // 请求方式 post
  // 只有 value 会被发送，key 则不会
  data: 'Country=Brasil&City=Belo Horizonte',
  // `timeout` 指定请求超时的毫秒数。
  // 如果请求时间超过 `timeout` 的值，则请求会被中断
  timeout: 1000, // 默认值是 `0` (永不超时)
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default
}
```

## **axios 取消请求 防止多次请求**

```js
var sourceMap = new Map();
发出请求之前   ↓↓↓↓↓↓↓↓↓↓
	var service;
    var cancelToken = null;
    if (cancelKey) { 
        var source = sourceMap.get(cancelKey);
        if (source && typeof source === 'function') {
            source('cancel');
        }
        cancelToken = new axios.CancelToken(function executor(c) {
            sourceMap.set(cancelKey, c);
        })
    }
    if (http_type == 'get') {
        service = axiosService.get(url, {
            params: params,
            cancelToken: cancelToken
        });
    }

```

