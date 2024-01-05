---
title: JavaScript
date: 2020-05-29
sidebar: 'auto'
---
<!-- [[TOC]] -->
## JavaScript的组成

- JavaScript 由以下三部分组成：
  - ECMAScript（核心）：JavaScript 语言基础
  - DOM（文档对象模型）：规定了访问HTML和XML的接口
  - BOM（浏览器对象模型）：提供了浏览器窗口之间进行交互的对象和方法
    

## JS的基本数据类型和引用数据类型

- 基本数据类型：undefined、null、boolean、number、string、symbol
- 引用数据类型：object、array、function

## 检测浏览器版本版本有哪些方式？

- 根据 navigator.userAgent   //  UA.toLowerCase().indexOf('chrome')

  

## 介绍JS有哪些内置对象？

- 数据封装类对象：Object、Array、Boolean、Number、String
- 其他对象：Function、Arguments、Math、Date、RegExp、Error
- ES6新增对象：Symbol（标识唯一性的ID）、Map、Set、Promises、Proxy、Reflect
- 

## 事件委托

- 事件代理又称事件委托，js中常见的绑定事件的技巧，把原本需要绑定的事件委托给父元素，

  让父元素负责事件监听，事件代理原理是DOM元素的事件冒泡。好处是减少事件数量，提高性能

  事件动态绑定，新添加元素仍可触发事件，避免内存泄漏，低版本IE防止删除元素而没有移除事件造成的内存溢出

  

## 事件冒泡

- 一个事件触发后，会在子元素和父元素之间传播，这种传播分为三个阶段，

  捕获阶段（从window对象传导到目标节点（从外到里），这个阶段不会响应任何事件），目标阶段，（在目标节点上触发），冒泡阶段（从目标节点传导回window对象（从里到外））

  

## 重绘(repaint)和回流(reflow)？

psb

1. 回流：当我们对 DOM 的修改引发了 DOM 几何尺寸的变化（比如修改元素的宽、高或隐藏元素等）时，浏览器需要重新计算元素的几何属性（其他元素的几何属性和位置也会因此受到影响），然后再将计算的结果绘制出来。这个过程就是回流（也叫重排）。
2. 重绘：当我们对 DOM 的修改导致了样式的变化、却并未影响其几何属性（比如修改了颜色或背景色）时，浏览器不需重新计算元素的几何属性、直接为该元素绘制新的样式（跳过了上图所示的回流环节）。这个过程叫做重绘。

由此我们可以看出，重绘不一定导致回流，回流一定会导致重绘。硬要比较的话，回流比重绘做的事情更多，带来的开销也更大。但这两个说到底都是吃性能的，所以都不是什么善茬。我们在开发中，要从代码层面出发，尽可能把回流和重绘的次数最小化。

- 需要要对元素进行复杂的操作时，可以先隐藏(display:"none")，操作完成后再显示

- 批量修改DOM

- 对于复杂动画效果,使用绝对定位让其脱离文档流

- css3硬件加速（GPU加速）transform、opacity、filters这些动画不会引起回流重绘

- 缓存Layout属性值，如：var left = elem.offsetLeft; 这样，多次使用 left 只产生一次回流

- 尽量避免用table布局（table元素一旦触发回流就会导致table里所有的其它元素回流）

  

## Javascript作用链域?

- 全局函数无法查看局部函数的内部细节，但局部函数可以查看其上层的函数细节，直至全局细节
- 如果当前作用域没有找到属性或方法，会向上层作用域[[Scoped]]查找，直至全局函数，这种形式就是作用域链



## 事件绑定和普通事件区别

```js
obox.onclick =function(){}  //不支持 DOM 事件流：事件捕获阶段 => 目标元素阶段 => 事件冒泡阶段
obox.addEventListener('click',function(){ //支持 DOM 事件流

},false) ; // 捕获 冒泡？

```

1.如果说给同一个元素绑定了两次或者多次相同类型的事件，那么后面的绑定会覆盖前面 的绑定

2.如果说给一个元素绑定了多次相同类型的事件，所有的绑定将会按绑定顺序依次触发

## ajax数据请求

 (1) XHR 

```js
var xhr = new XMLHttpRequest(); //创建XMLHTTPRequest对象
xhr.open('get',"www.aaaa.com",true);//异步 使用open方法创建http请求，并设置请求地址
//request.setRequestHeader("Content-type","application/x-www-form-urlencoded");  必须写在open和send中间
xhr.send();      //设置发送的数据，用send发送请求
xhr.onreadystatechange = function(){  //注册事件（给ajax设置事件）
	//readstate  4  响应返回成功的时候得到通知。
    // getAllResponseHeader()：获取所有的响应报头。
	// status  200-300 数字和文本形式返回http状态码
	//200 成功 （有可能强缓存策略）
	// 301 302 redirect
	// 304 从缓存读取数据。(协商缓存策略)
	// 404 not found
	// 500 服务器错误。	

}
  xhr 可以取消？
  xhr.abort();//终止请求。

缺点：可能破坏浏览器后退功能，嵌套回调，难以处理

jquery中的ajax
$.ajax({
        type:"GET",
        url:"service.php?number="+$("#keyword").val(),
        dataType:"json", 预期服务器返回数据的类型
        success:function(data){
           if(data.success){
               $("searchResult").html(data.msg);
           }else{
               $("#searchResult").html("出现错误：" + data.msg);
           }
        },
        error:function(jqXHR){
           aler("发生错误："+ jqXHR.status);
        }
});
缺点：嵌套回调，难以处理，如果为了一个JqueryAjax就引入整个jquery，文件比较大，成本过高
```

 (2) fetch （w3c）

```js
fetch("url",	  
   {method:"post",body:"",credencial:'include'})
   .then(res=>res.json())
   .then(res=>{console.log(res)})
   // 兼容性问题
   // API 偏底层，需要封装
   // 发出的请求，默认是不带cookie.  credencial:'include'
```



 (3) jsonp (解决跨域)     

```js
  标签的src和link属性，并没有受同源策略的限制。说到这里jsonp的实现原理就浮出水面了。
  jsonp就是使用同源策略这一“漏洞”，实现的跨域请求（这也是jsonp跨域只能用get请求的原因所在）

  后端返回的数据格式 一定是， test('["111","222","3333"]');

  前端提前定义好 test这个方法，通过形参就拿到数据了。

  jsonp可以取消吗？不能
```

  (4) 跨域？ ps:只要协议、域名(或主机地址)、端口有任何一个不同，都被当作是不同的域。

1.通过服务器端返回带有Access-Control-Allow-Origin标识的Response header，用来解决资源的跨域权限问题。
使用方法，在response添加 Access-Control-Allow-Origin，例如

```js
Access-Control-Allow-Origin:www.google.com
```

2.cors (跨域资源共享)  需要浏览器和服务器同时支持，才可以实现跨域请求  服务端设置即可

 ```js
var express = require('express');
var app = express();
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');服务器支持的所有跨域请求的方法
  res.header('Access-Control-Allow-Headers', 'Content-Type');表明服务器支持的所有头信息字段
  next();
}
app.use(allowCrossDomain);
 ```

3.nginx

## 面向对象

   *(1)构造函数*

```js
function Test(name,age){
    this.name = name;
    this.age =age;
    this.getName= function(){
    	return this.name;
    }
}
// Test();
var obj = new Test("kerwin",100);
var obj2 =new Test("xiaoming",18)


//子类向父类传值
class fa {
    constructor(x,y){
        this.x =x 
        this.y =y
    }
    sum(){
        console.log(this.x + this.y)
    }
}
class son extends fa {
    constructor(x,y){
        super(x,y) // 调用父类的constuctor，实现传递
    }
}
var bb = new son(1,2)
bb.sum()

//子类调用父类的方法
class fa {
    say(){
       return '1111'
    }
}
class son extends fa {
    say(){
       console.log(super.say() + '2222')
    }
}
var son = new son()
son.say()


//子类继承加法，扩展减法方法
class fa {
    constructor(x,y){
        this.x =x 
        this.y =y
    }
    sum(){
        console.log(this.x + this.y)
    }
}
class son extends fa {
    constructor(x,y){
        //必须在子类定义之前调用
        super(x,y)
        this.x =x 
        this.y =y
    }
    subtract(){
        console.log(this.x - this.y)
    }
}
var bb = new son(5,3)
bb.subtract()
bb.sum()


//this 指向问题
button按钮
var _that
class fa {
    constructor(name,age){
        this.name =name 
        this.age =age
        this.btn = document.querySelector('button');
        this.btn.onclick = this.sing()
    }
    sing(){
        console.log(this) // 指向的调用者btn
        console.log(this.name) undefined  // btn里没有name这个key
    }
    dance(){
        _that = this
        console.log(this)// 指向的fa这个实例对象
    }
}
var bb = new fa(5,3)
bb.dance()

```

   *(2)原型*
          

```js
 //内存只有一份
Test.prototype.getName= function(){

}
//缺点是？

原型容易被覆盖

Array.prototype = {

}
```


   *(3)继承*

```js
//构造函数继承
function Test2(name,age,location){
    // this.name =name;
    // this.age =age;
    // Test.call(this,name,age);
    Test.apply(this,[name,age])
    this.location = location;
}
var obj = new Test2();

//原型继承
Test2.prototype =Test.prototype
//Test2.prototype =new Test()
Test2.prototype.constructor =Test2;

//混合继承
```

 

*(4)原型链*

> 原型链的基本原理：任何一个实例，通过原型链，找到它上面的原型，该原型对象中的方法和属性，可以被所有的原型实例共享。

![image-20200411192514703](http://43.142.54.214/image-20200411192514703.png)

##  闭包

闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，创建的函数可以访问到当前函数的局部变量。

闭包有两个常用的用途；

- 闭包的第一个用途是使我们在函数外部能够访问到函数内部的变量。通过使用闭包，可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来创建私有变量。
- 闭包的另一个用途是使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收。

其实闭包的本质就是作用域链的一个特殊的应用，只要了解了作用域链的创建过程，就能够理解闭包的实现原理。

 ```js
    	//1. 函数防抖(搜索查询)
    	
    	inputelement.oninput = (function(){
    		var timer =null;
    		return function(){
                console.log("scroll")
    			if(timer){
    				clearTimeout(timer);
    			}
    			timer = setTimeout(() => {
    			 	console.log("代码执行,ajax"); 
                    
    			}, 500)
    		}
    	})()
    	// 2. 函数节流（onrize，onscroll）
            window.onscroll = (function(){
                var date = Date.now();
                return function(){

                    if(Date.now()-date>500){
                        date = Date.now();
                        console.log("代码执行echarts resize")

                    }
                }
            })()
    	
    	// 3. ul li
    	var oli = document.getElementsByTagName("li");

    	for(var i=0;i<oli.length;i++){
    		oli[i].onclick =(function(index){
                return function(){
                    console.log(index)
                }
            })(i)   
    	}
 ```

## 防抖函数

- 概念：函数防抖是指频繁触发的情况下，只有足够的空闲时间，才执行代码一次。比如生活中的坐公交，就是一定时间内，如果有人陆续刷卡上车，司机就不会开车。只有别人没刷卡了，司机才开车。
- 场景：函数防抖的应用场景，最常见的就是用户注册时候的手机号码验证和邮箱验证了。只有等用户输入完毕后，前端才需要检查格式是否正确，如果不正确，再弹出提示语。


代码示例：

```js
var timer = false;
		$("#scroll").scroll(function() {
			clearTimeout(timer); // 清除未执行的代码，重置回初始化状态
			timer = setTimeout(function() {
				console.log("函数防抖");
			}, 300)
		})
```

函数防抖的要点，也是需要一个setTimeout来辅助实现。延迟执行需要跑的代码。
 如果方法多次触发，则把上次记录的延迟执行代码用clearTimeout清掉，重新开始。
 如果计时完毕，没有方法进来访问触发，则执行代码。

## 函数节流

- 函数节流是指一定时间内js方法只跑一次。比如人的眨眼睛，就是一定时间内眨一次。

- 场景：数节流应用的实际场景，多数在监听页面元素滚动事件的时候会用到。因为滚动事件，是一个高频触发的事件。

  代码示例：

```js
var ss = true
		$("#scroll").scroll(function() {
			if(!ss) {
				return
			}
			ss = false;
			setTimeout(function() {
				console.log("节流函数");
				ss = true;
			}, 300)
		})
```

函数节流的要点是，声明一个变量当标志位，记录当前代码是否在执行。
 如果空闲，则可以正常触发方法执行。
 如果代码正在执行，则取消这次方法执行，直接return。

数组去重

```js
 var arr = [1,2,3,4,3,4];

 var myset = new Set(arr);
 var mya = Array.from(myset);
```



## this指向问题

this 是执行上下文中的一个属性，它指向最后一次调用这个方法的对象。在实际开发中，this 的指向可以通过四种调用模式来判断。

- 第一种是函数调用模式，当一个函数不是一个对象的属性时，直接作为函数来调用时，this 指向全局对象。
- 第二种是方法调用模式，如果一个函数作为一个对象的方法来调用时，this 指向这个对象。
- 第三种是构造器调用模式，如果一个函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象。
- 第四种是 apply 、 call 和 bind 调用模式，这三个方法都可以显示的指定调用函数的 this 指向。其中 apply 方法接收两个参数：一个是 this 绑定的对象，一个是参数数组。call 方法接收的参数，第一个是 this 绑定的对象，后面的其余参数是传入函数执行的参数。也就是说，在使用 call() 方法时，传递给函数的参数必须逐个列举出来。bind 方法通过传入一个对象，返回一个 this 绑定了传入对象的新函数。这个函数的 this 指向除了使用 new 时会被改变，其他情况下都不会改变。



这四种方式，使用构造器调用模式的优先级最高，然后是 apply 、 call 和 bind 调用模式，然后是方法调用模式，然后是函数调用模式。



## 异步编程的实现方式？

JavaScript中的异步机制可以分为以下几种：

- 回调函数的方式，使用回调函数的方式有一个缺点是，多个回调函数嵌套的时候会造成回调函数地狱，上下两层的回调函数间的代码耦合度太高，不利于代码的可维护。
- Promise 的方式，使用 Promise 的方式可以将嵌套的回调函数作为链式调用。但是使用这种方法，有时会造成多个 then 的链式调用，可能会造成代码的语义不够明确。
- generator 的方式，它可以在函数的执行过程中，将函数的执行权转移出去，在函数外部还可以将执行权转移回来。当遇到异步函数执行的时候，将函数执行权转移出去，当异步函数执行完毕时再将执行权给转移回来。因此在 generator 内部对于异步操作的方式，可以以同步的顺序来书写。使用这种方式需要考虑的问题是何时将函数的控制权转移回来，因此需要有一个自动执行 generator 的机制，比如说 co 模块等方式来实现 generator 的自动执行。
- async 函数的形式，async 函数是 generator 和 promise 实现的一个自动执行的语法糖，它内部自带执行器，当函数内部执行到一个 await 语句的时候，如果语句返回一个 promise 对象，那么函数将会等待 promise 对象的状态变为 resolve 后再继续向下执行。因此可以将异步逻辑，转化为同步的顺序来书写，并且这个函数可以自动执行。



## setTimeout、Promise、Async/Await 的区别

（1）setTimeout

```js
console.log('script start') //1. 打印 script start
setTimeout(function(){
    console.log('settimeout')   // 4. 打印 settimeout
})  // 2. 调用 setTimeout 函数，并定义其完成后执行的回调函数
console.log('script end')   //3. 打印 script start
// 输出顺序：script start->script end->settimeout
```

（2）Promise

Promise本身是同步的立即执行函数， 当在executor中执行resolve或者reject的时候, 此时是异步操作， 会先执行then/catch等，当主栈完成后，才会去调用resolve/reject中存放的方法执行，打印p的时候，是打印的返回结果，一个Promise实例。

```js
console.log('script start')
let promise1 = new Promise(function (resolve，reject) {
    console.log('promise1')
    resolve()
    console.log('promise1 end')
}).then(function () {
    console.log('promise2')
})
setTimeout(function(){
    console.log('settimeout')
})
console.log('script end')
// 输出顺序: script start->promise1->promise1 end->script end->promise2->settimeout
```

当JS主线程执行到Promise对象时，

- promise1.then() 的回调就是一个 task
- promise1 是 resolved或rejected: 那这个 task 就会放入当前事件循环回合的 microtask queue
- promise1 是 pending: 这个 task 就会放入 事件循环的未来的某个(可能下一个)回合的 microtask queue 中
- setTimeout 的回调也是个 task ，它会被放入 macrotask queue 即使是 0ms 的情况

（3）async/await

```JS
async function async1(){
   console.log('async1 start');
    await async2();
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}
console.log('script start');
async1();
console.log('script end')
// 输出顺序：script start->async1 start->async2->script end->async1 end
```

async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 async 函数体。

举个例子：

```JS
async function func1() {
    return 1
}
console.log(func1())
```

![image](https://cdn.nlark.com/yuque/0/2020/png/1500604/1604021075237-8249a8df-3a28-4bca-9f22-02923aba8618.png) 很显然，func1的运行结果其实就是一个Promise对象。因此也可以使用then来处理后续逻辑。

```js
func1().then(res => {
    console.log(res);  // 30
})
```

await的含义为等待，也就是 async 函数需要等待await后的函数执行完成并且有了返回结果（Promise对象）之后，才能继续执行下面的代码。await通过返回一个Promise对象来实现同步的效果。



## 对Promise的理解

Promise是异步编程的一种解决方案，它是一个对象，可以获取异步操作的消息，他的出现大大改善了异步编程的困境，避免了地狱回调，它比传统的解决方案回调函数和事件更合理和更强大。



所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

（1）Promise的实例有三个状态:

- Pending（进行中）
- Resolved（已完成）
- Rejected（已拒绝）

当把一件事情交给promise时，它的状态就是Pending，任务完成了状态就变成了Resolved、没有完成失败了就变成了Rejected。

（2）Promise的实例有两个过程：

- pending -> fulfilled : Resolved（已完成）
- pending -> rejected：Rejected（已拒绝）

需要注意：一旦从进行状态变成为其他状态就永远不能更改状态了。




Promise的特点：

- 对象的状态不受外界影响。promise对象代表一个异步操作，有三种状态，`pending`（进行中）、`fulfilled`（已成功）、`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态，这也是promise这个名字的由来——“承诺”；
- 一旦状态改变就不会再变，任何时候都可以得到这个结果。promise对象的状态改变，只有两种可能：从`pending`变为`fulfilled`，从`pending`变为`rejected`。这时就称为`resolved`（已定型）。如果改变已经发生了，你再对promise对象添加回调函数，也会立即得到这个结果。这与事件（event）完全不同，事件的特点是：如果你错过了它，再去监听是得不到结果的。



Promise的缺点：

- 无法取消Promise，一旦新建它就会立即执行，无法中途取消。
- 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
- 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。



总结：

Promise 对象是异步编程的一种解决方案，最早由社区提出。Promise 是一个构造函数，接收一个函数作为参数，返回一个 Promise 实例。一个 Promise 实例有三种状态，分别是pending、resolved 和 rejected，分别代表了进行中、已成功和已失败。实例的状态只能由 pending 转变 resolved 或者rejected 状态，并且状态一经改变，就凝固了，无法再被改变了。



状态的改变是通过 resolve() 和 reject() 函数来实现的，可以在异步操作结束后调用这两个函数改变 Promise 实例的状态，它的原型上定义了一个 then 方法，使用这个 then 方法可以为两个状态的改变注册回调函数。这个回调函数属于微任务，会在本轮事件循环的末尾执行。



## 垃圾回收的概念

垃圾回收：JavaScript代码运行时，需要分配内存空间来储存变量和值。当变量不在参与运行时，就需要系统收回被占用的内存空间，这就是垃圾回收。

回收机制：

- Javascript 具有自动垃圾回收机制，会定期对那些不再使用的变量、对象所占用的内存进行释放，原理就是找到不再使用的变量，然后释放掉其占用的内存。
- JavaScript中存在两种变量：局部变量和全局变量。全局变量的生命周期会持续要页面卸载；而局部变量声明在函数中，它的生命周期从函数执行开始，直到函数执行结束，在这个过程中，局部变量会在堆或栈中存储它们的值，当函数执行结束后，这些局部变量不再被使用，它们所占有的空间就会被释放。
- 不过，当局部变量被外部函数使用时，其中一种情况就是闭包，在函数执行结束后，函数外部的变量依然指向函数内部的局部变量，此时局部变量依然在被使用，所以不会回收。

## 垃圾回收的方式

现在浏览器通常使用的垃圾回收方法有两种：标记清除，引用计数。

1）标记清除

- 标记清除是浏览器常见的垃圾回收方式，当变量进入执行环境时，就标记这个变量“进入环境”，被标记为“进入环境”的变量是不能被回收的，因为他们正在被使用。当变量离开环境时，就会被标记为“离开环境”，被标记为“离开环境”的变量会被内存释放。
- 垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记。然后，它会去掉环境中的变量以及被环境中的变量引用的标记。而在此之后再被加上标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。最后。垃圾收集器完成内存清除工作，销毁那些带标记的值，并回收他们所占用的内存空间。

2）引用计数

- 另外一种垃圾回收机制就是引用计数，这个用的相对较少。引用计数就是跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型赋值给该变量时，则这个值的引用次数就是1。相反，如果包含对这个值引用的变量又取得了另外一个值，则这个值的引用次数就减1。当这个引用次数变为0时，说明这个变量已经没有价值，因此，在在机回收期下次再运行时，这个变量所占有的内存空间就会被释放出来。
- 这种方法会引起循环引用的问题：

`obj1`和`obj2`通过属性进行相互引用，两个对象的引用次数都是2。当使用循环计数时，由于函数执行完后，两个对象都离开作用域，函数执行结束，`obj1`和`obj2`还将会继续存在，因此它们的引用次数永远不会是0，就会引起循环引用。

```
function fun() {
    let obj1 = {};
    let obj2 = {};
    obj1.a = obj2; // obj1 引用 obj2
    obj2.a = obj1; // obj2 引用 obj1
}
```

这种情况下，就要手动释放变量占用的内存：

```
obj1.a =  null
 obj2.a =  null
```

## 减少垃圾回收

虽然浏览器可以进行垃圾自动回收，但是当代码比较复杂时，垃圾回收所带来的代价比较大，所以应该尽量减少垃圾回收。

- 对数组进行优化：在清空一个数组时，最简单的方法就是给其赋值为[ ]，但是与此同时会创建一个新的空对象，可以将数组的长度设置为0，以此来达到清空数组的目的。
- 对`object`进行优化：对象尽量复用，对于不再使用的对象，就将其设置为null，尽快被回收。
- 对函数进行优化：在循环中的函数表达式，如果可以复用，尽量放在函数的外面。



## export {default as} from 【深入解读】

```js
export {default as Home} from './Home.js'
//拆分
import {default as Home} from './Home.js'
export Home



import str from './index.js'
等价于
import {default as str} from './index.js

export {default as b} from './table.js'
等价于
import {default as b} from './table.js'
export b
```

## 文件上传

```html

<input ref="img-upload-input" class="img-upload-input" type="file" accept=".png, .jpg" @change="submitUpload">
<el-button style="margin-top: 20px" type="primary" @click="handleSelectedImg">选择图片</el-button>
```

```vue
//点击上传按钮
handleSelectedImg() {
 this.$refs['img-upload-input'].click()
},
 //选好图片之后点击打开按钮
submitUpload(e) {
  const files = e.target.files
  const rawFile = files[0] // only use files[0]
  if (!rawFile) return
  this.upload(rawFile)
},
 //上传
upload(rawFile) {
   this.$refs['img-upload-input'].value = null // fix can't select the same excel
   if (!this.beforeUpload) {
     return
   }
   //检查文件是否满足条件
   const before = this.beforeUpload(rawFile)
   if (before) {
   //上传事件
     this.uploadSectionFile(this.uploadParams, rawFile)
   }
},
beforeUpload(file) {
   const isLt1M = file.size / 1024 / 1024 < 50

   if (isLt1M) {
     return true
   }
   console.log('上传文件不超过50M', 'warning')
   return false
},
uploadSectionFile(params, file) {
   let data = params
   let fd = new FormData()// FormData 对象
   let fileObj = file// 相当于input里取得的files
   fd.append('stationID', data.stationID)
   fd.append('date', data.date)
   fd.append('file', fileObj)// 文件对象
   supplementFile(fd).then(res => {
     //调用上传接口
   })
}
```

## 元素在浏览器/元素中的位置，高度

1.clientWidth和clientHeight  元素的可视部分宽度和高度，即padding+content 
注：下面盒子宽高200px,如果没有滚动条，即为元素设定的高度和宽度，如果出现滚动条，滚动条会遮盖元素的宽高，那么该属性就是其本来宽高减去滚动条的宽高 

![img](https://images0.cnblogs.com/blog/475683/201501/281157400343970.png)

 2.offsetWidth和offsetHeight   指的是元素的border+padding+content的宽度和高度，该属性和其内部的内容是否超出元素大小无关，只和本来设定的border以及width和height有关 

![img](https://images0.cnblogs.com/blog/475683/201501/281209063471409.png)

3.  offsetLeft和offsetTop 指的是当前元素的离自己最近的具有定位的（position:absolute或者position：relative）父级元素（不仅仅指的是直接父级元素，只要是它的父元素都可以），该父级元素就是当前元素的offsetParent，如果从该元素向上寻找，找不到这样一个父级元素，那么当前元素的offsetParent就是body元素。而offsetLeft和offsetTop指的是当前元素，相对于其offsetParent左边距离和上边距离  

4.  scrollHeight和scrollWidth  指的是当元素内部的内容超出其宽度和高度的时候，元素内部内容的实际宽度和高度，需要注意的是，当元素其中内容没有超过其高度或者宽度的时候，该属性是取不到的。 

    ![img](https://images0.cnblogs.com/blog/475683/201501/281243245341497.png)   

   尽管该div的宽高都是100，但是其scrollheight为234显示的是其中内容的实际高度，scrollWidth为83（由于滚动条占据了宽度） 

5.  scrollTop和scrollLeft  指的是当元素其中的内容超出其宽高的时候，元素被卷起的高度和宽度。 

    ![img](https://images0.cnblogs.com/blog/475683/201501/281249482374352.png) 

    由于拖动了滚动条，scrollTop的属性值一直在增大，而水平方向没有滚动条，所以scrollLeft一直为0. 

    通过直接设定div的scrollTop,让它直接显示在滚动条在20垂直方向上20的位置。 

6. screenX、screenY

   screenX 设置或获取获取鼠标指针位置相对于电脑屏幕的 x 坐标
    screenY 设置或获取鼠标指针位置相对于电脑屏幕的 y 坐标

   offsetX、offsetY

   offsetX 设置或获取鼠标指针位置相对于触发事件的对象的 x 坐标
    offsetY 设置或获取鼠标指针位置相对于触发事件的对象的 y 坐标

   clientX、clientY

   clientX 设置或获取鼠标指针位置相对于当前窗口的 x 坐标
    clientY 设置或获取鼠标指针位置相对于当前窗口的 y 坐标

   pageX、pageY

   在图上看似pageX和screenX是一样的距离，其实不然，pageX指的是鼠标指针位置相对于整个页面的x坐标。其中就包括滚动条移动的距离。

![img](https://upload-images.jianshu.io/upload_images/6381209-67d65b5bb09721e2.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

