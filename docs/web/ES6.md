---
title: ES6
date: 2023-12-28
categories: 
 - Web
---
<!-- [TOC] -->

## ES6

新增模板字符串（为JavaScript提供了简单的字符串插值功能）、箭头函数（操作符左边为输入的参数，而右边则是进行的操作以及返回的值Inputs=>outputs。）、for-of（用来遍历数据—例如数组中的值。）arguments对象可被不定参数和默认参数完美代替。ES6将promise对象纳入规范，提供了原生的Promise对象。增加了let和const命令，用来声明变量。增加了块级作用域。let命令实际上就增加了块级作用域。ES6规定，var命令和function命令声明的全局变量，属于全局对象的属性；let命令、const命令、class命令声明的全局变量，不属于全局对象的属性。。还有就是引入module模块的概念

## **0.ECMAScript6的新特性？**

- 块级作用区域 `let a = 1;`
- 可定义常量 `const PI = 3.141592654;`
- 变量解构赋值 `var [a, b, c] = [1, 2, 3];`
- 字符串的扩展(模板字符串) `var sum =`${a + b}`;`
- 数组的扩展(转换数组类型) `Array.from($('li'));`
- 函数的扩展(扩展运算符) `[1, 2].push(...[3, 4, 5]);`
- 对象的扩展(同值相等算法) `Object.is(NaN, NaN);`
- 新增数据类型(Symbol) `let uid = Symbol('uid');`
- 新增数据结构(Map) `let set = new Set([1, 2, 2, 3]);`
- for…of循环 `for(let val of arr){};`
- Promise对象 `var promise = new Promise(func);`
- Generator函数 `function* foo(x){yield x; return x*x;}`
- 引入Class(类) `class Foo {}`
- 引入模块体系 `export default func;`
- 引入async函数[ES7]

---
> webpack babel-loader 

## **1. let const**

 ES5 中作用域有：全局作用域、函数作用域。没有块作用域的概念。

 ES6 中新增了块级作用域。块作用域由 { } 包括，if语句和 for语句里面的{ }也属于块作用域。

- var定义的变量，没有块的概念，可以跨块访问, 不能跨函数访问。
- let定义的变量，只能在块作用域里访问，不能跨块访问，也不能跨函数访问。
- const用来定义常量，使用时必须初始化(即必须赋值)，只能在块作用域里访问，而且不能修改。

```js
  if(true){
       let name ="kerwin"
   }
   
   const obj = {name:"kerwin"}
   obj.name="xiaoming"
   // obj = {name:"xioamng"}
   // obj= 'dwadwa'
```

const定义的对象属性是否可以改变上面说到 const 是不能修改的，于是很痛快的说不能，但是回来实际测试后发现错了，在此记录一下。

```js
const person = {
     name : 'jiuke',
     sex : '男'
 }

 person.name = 'test'

 console.log(person.name)
```

对象是引用类型的，person中保存的仅是对象的指针，这就意味着，const仅保证指针不发生改变，修改对象的属性不会改变对象的指针，所以是被允许的。也就是说const定义的引用类型只要指针不发生改变，其他的不论如何改变都是允许的。

然后我们试着修改一下指针，让person指向一个新对象，果然报错

```js
const person = {
   name : 'jiuke',
   sex : '男'
}

person = {
   name : 'test',
   sex : '男'

}
```

## **2. 箭头函数**

`this指向父作用域的this`

## **3.解构**	

- 数组解构赋值。`ES6`可以直接以`let [a,b,c] = [1,2,3]`形式进行变量赋值，在声明较多变量时，不用再写很多`let(var),`且映射关系清晰，且支持赋默认值

```js
	let {type,payload} = data;  // {type:"",payload:""}
```

## **4 ... 扩展运算符**

- 扩展运算符。`ES6`新增的扩展运算符(`...`)(重要),可以轻松的实现数组和松散序列的相互转化，可以取代`arguments`对象和`apply`方法，轻松获取未知参数个数情况下的参数集合。（尤其是在`ES5`中，`arguments`并不是一个真正的数组，而是一个类数组的对象，但是扩展运算符的逆运算却可以返回一个真正的数组）。扩展运算符还可以轻松方便的实现数组的复制和解构赋值（`let a = [2,3,4]`; `let b = [...a]`）

```js
	[...arr1,...arr2] 	
	{...obj1,...obj2} 
```
## **5.promise**

```js
	//异步处理方案
	1. 回调函数
    2. Promise
    3. generator 生成器 yield 
    4. async await

	//解决回调地狱 ，嵌套金字塔
	
	function test1(){
		return new Promise((resolve,rejet)=>{
			setTimeout(() => {
			  	resolve("123")
			}, 2000)
		})
	}
	
	test1().then(res=>{
	
	}).catch(error=>{
	
	})
	// pending reject fullfilled
	
	axios.get("1.php").then(res=>{
		return axios.get(2.php,{res})
	}).then(res=>{
		return axios.get(3.php)
	}).then(res=>{
		console.log(res.data)
	}).catch(error=>{
		console.log(error)
	})
	async await 写起来
	
	async function test(){
		var a = await axios.get(1);
		var b= await axios.get(2,{a});
		var c= await axios.get(3,{b})
		console.log(c);
	}
	
	test()
	
	//所有的异步都结束
	Promise.all([axios.get(1),axios.get(2)]).then(res=>{
		//loading隐藏
	}).catch(error=>{
	
	})
	
	Promise.race([axios.get(1),axios.get(2)])
```
## **6.class (语法糖 =>  构造函数,babel-loader) **

```js
	class Person{
		constructor(name,age) {
		  this.name = name;
		  this.age =age;
		}
		say=()=>{
	
		}
	}
	
	class Test extends person{
		constructor(name,age,location) {
		  super(name,age);
		  this.location = location;
		}
        compoenntDidMount(){
            console.log("修改，会覆盖之前父类的生命周期")
        }
	
		say(){
	
		}
	}
```

## **7.模块化**

```js
	import obj from "./a" ;  
	export default aaa;
	
	import {test} from "./b" ; 
	export {test} ; 
	export var test =function(){}

	AMD - 前端 异步加载 - 提前下载， 提前加载 require.js
	CMD -  异步加载 - 提前下载 ， 按需加载 -- 玉伯 -sea.js
	CommonJs -同步加载（webpack）
		require("./b")    
		=>module.exports 
		=>exports
	ES6 - 模块化
	
	//ES6 和 commonJS区别？
	//ES6可以导入某几个接口 import {a} from './module.js' + webpack- tree shaking 摇树优化

	//commonJS 导入整个文件
```
## **8.Set解构**

​    `不能重复的类似于数组的一个新的结构`

## **9. 字符串模板**

 > \`aaaa${name}bbbb\` 

## **10.new Map()的详细介绍与用法**

 它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。 

```js
let obj = new Map([['name', '张三'], ['age', 18], ['sex', '男']])
obj.size  //3


// 常用写法
let obj = new Map()
obj.set("age", 20)        // 键是字符串
obj.set(0, "attack_type")     // 键是数值
obj.set(undefined, "definition")     // 键是undefined

//set方法返回的是Map本身，也可以采用链式写法。
let map = new Map()
.set(1, 'a')
.set(2, 'b')

let obj = new Map()
obj.set("hello", 'Hello ES6!')
obj.get('hello')  // Hello ES6!
obj.get('word')  // undefined


let obj = new Map()
obj.set("hello", 'Hello ES6!')
obj.has('hello')  // true
obj.has('word')  // false

let obj = new Map()
obj.set("hello", 'Hello ES6!')
obj.size // 1
obj.clear()
obj.size // 0

```





