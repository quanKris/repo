---
title: VUE
date: 2020-05-29
categories: 
 - VUE
---
<!-- [[TOC]] -->

## **1. nodejs 创建静态服务器？**

​	`http.createServer((req,res)=>{res.writeHead(),res.write(),res.end()}).listen(3000)`

## **2. commonJS规范 vs ES6 模块化规范**

	> require导入， module.exports 导出
	import 导入， export default 导出

> 区别：import {某个几个接口} from 'antd'  //webpack  (tree shaking 摇树优化)
> 		   var myview = require("antd") //导入整个接口

## **3. socket通信 聊天**

   `websocket全双工, 双向通信 onopen  onmessage  onclose onerror`

   - http 应用层协议， 区别：http 单向 ， 请求响应模型， XHR编程接口
   - TCP双向通信传输层协议，socket编程接口 

## **4. mongoDB 基本操作(增删改查)**

   - mysql 区别- 关系型， 非关系型 
   - mongoose --（model schema ）	

## **5. express 进行项目构建**

   `nodejs一个框架 （express, koa, egg）`

## **6. token（jwt-json web token） 与 session配合cookie  （登录，鉴权）**

## **7. MVVM - mvc mvvm mvp**

Vue是一套构建用户界面的渐进式的自底向上增量开发的MVVM框架，核心是关注视图层，vue的核心是为了解决数据的绑定问题，为了开发大型单页面应用和组件化，所以vue的核心思想是数据驱动和组件化，这里也说一下MVVM思想，MVVM思想是 模型  视图  vm是v和m连接的桥梁，当模型层数据修改时，VM层会检测到，并通知视图层进行相应修改。

ViewModel负责把Model的数据同步到View显示出来，还负责把View的修改同步回Model，View 和 Model 之间的同步工作完全是自动的，无需人为干涉（由viewModel完成），因此开发者只需关注业务逻辑，不需要手动操作DOM, 不需要关注数据状态的同步问题

<u>MVC和MVVM的区别并不是VM完全取代了C，只是在MVC的基础上增加了一层VM，只不过是弱化了C的概念，ViewModel 存在目的在于抽离 Controller 中展示的业务逻辑，而不是替代 Controller</u>

**MVC的特点**

MVC模式的特点在于实现关注点分离，即应用程序中的数据模型与业务和展示逻辑解耦。在客户端web开发中，就是将模型(M-数据、操作数据)、视图(V-显示数据的HTML元素)之间实现代码分离，松散耦合，使之成为一个更容易开发、维护和测试的客户端应用程序。

View 传送指令到 Controller ；
Controller 完成业务逻辑后，要求 Model 改变状态 ；
Model 将新的数据发送到 View，用户得到反馈。

**MVVM模式的优点**

1、低耦合：MVVM模式中，数据是独立于UI的，ViewModel只负责处理和提供数据，UI想怎么处理数据都由UI自己决定，ViewModel不涉及任何和UI相关的事，即使控件改变（input换成p）,ViewModel几乎不需要更改任何代码，专注自己的数据处理就可以了

2.自动同步数据:ViewModel通过双向数据绑定把View层和Model层连接了起来，View和Model这两者可以自动同步。程序员不需要手动操作DOM, 不需要关注数据状态的同步问题，MVVM 统一管理了复杂的数据状态维护

3、可重用性：你可以把一些视图逻辑放在一个ViewModel里面，让很多view重用这段视图逻辑。

4、独立开发：开发人员可以专注于业务逻辑和数据的开发（ViewModel），设计人员可以专注于页面设计。

5、可测试：ViewModel里面是数据和业务逻辑，View中关注的是UI，这样的做测试是很方便的，完全没有彼此的依赖，不管是UI的单元测试还是业务逻辑的单元测试，都是低耦合的

**MVVM模式与MVC模式的区别**

mvc 和 mvvm 其实区别并不大。都是一种设计思想，主要区别如下：

mvc中model层和controller层中间搭桥梁，这个桥梁便是viewmodel，

1.mvc 中 Controller演变成 mvvm 中的 viewModel

2.mvvm 通过数据来驱动视图层的显示而不是节点操作。

3.mvc中Model和View是可以直接打交道的，造成Model层和View层之间的耦合度高。而mvvm中Model和View不直接交互，而是通过中间桥梁ViewModel来同步

4.mvvm主要解决了:mvc中大量的DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。

## **8. vue双向数据绑定原理**

 - Object.defineProperty() get set, watcher , render = > 虚拟dom 对比老的vdom , diff
 - vue3.0  数据绑定 es6 proxy , new Proxy(obj,"name",{get }) 
 - vue响应式也叫作数据双向绑定，大致原理阐述：
   首先我们需要通过Object.defineProperty()方法把数据(data)设置为getter和setter的访问形式，getter中收集依赖，在setter中触发依赖，这样我们就可以在数据被修改时在setter方法设置监视修改页面信息，也就是说每当数据被修改，就会触发对应的set方法，然后我们可以在set方法中去调用操作dom的方法。
   此外，如果页面有input用v-model绑定数据，我们需要在这种绑定了data的input元素上添加监听，添加input事件监听，每当input事件被触发时，就修改对应的data。
   注：vue3.0版本用的是代理对象（new Proxy()）来做响应式的，我们访问数据访问的是代理对象的数据。
 - ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210108140237683.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hvdWd1YW5nemhhbw==,size_16,color_FFFFFF,t_70)
**具体步骤**

1. 需要observer的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter和getter
   这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化
2. compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
3. Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是:
   (1)在自身实例化时往属性订阅器(dep)里面添加自己
   (2)自身必须有一个update()方法
   (3)待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。
4. MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。

## **9. vue - 过滤器**

` 数据的格式化，vue.filter())，计算属性(模糊查询， 购物车金额计算)，watch (监听路由改变) , 方法`

## 10.watch监听 computed计算属性

```js
// 1. watch 监听，深度监听
// watch的简单的用法：
<input type="text" v-model="cityName"/>
new Vue({
  el: '#root',
  data: {
    cityName: 'shanghai'
  },
  watch: {
    cityName(newName, oldName) {
      // 直接写一个监听处理函数，当每次监听到 cityName 值发生改变时，执行函数。
	  // 也可以在所监听的数据后面直接加字符串形式的方法名：
	  // cityName: 'nameChange'
    }
  } 
})
//watch深度监听：
<input type="text" v-model="cityName.name"/>
new Vue({
  el: '/root',
  data: {
    cityName: {id: 1, name: 'shanghai'}
  },
  watch: {
// *******************************监听整个对象**********************************//
    cityName: {
      handler(newName, oldName) {
      // ...
    },
    deep: true,  // deep: true 则可以监听到cityName.name的变化
    immediate: true //immediate表示在watch中首次绑定的时候，是否执行handler，值为true则表示在watch中声明的时候，就立即执行handler方法
    },
// ****************************监听对象中的一个属性值******************************//
// 如果只需要监听对象中的一个属性值，则可以做以下优化：使用字符串的形式监听对象属性：
    'cityName.name': {
      handler(newName, oldName) {
      // ...
      },
      deep: true,
      immediate: true
    }
  }
})
// 2. 计算属性
//作用：==当依赖的属性的值发生变化的时候，才会触发他的更改，如果依赖的值，不发生变化的时候，使用的是缓存中的属性值。==
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
  
var vm = new Vue({
  el: '/example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

## **11.vue指令有哪些**

`v-if v-for v-else v-model v-html v-bind v-on v-show v-slot...`

## **11.1虚拟dom**

vdom 就是用 js 对象来描述真实 DOM，本质上就是在JS和DOM之间的一个缓存；由于直接操作 DOM 性能低，但是 js 层的操作效率高，可以将 DOM 操作转化成对象操作，最终通过diff算法比对差异进行更新DOM (减少了对真实DOM的操作)。虚拟DOM不依赖真实平台环境从而也可以实现跨平台。

优点：

1、保证性能下限：可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能；
2、无需手动操作dom：极大提高我们的开发效率；
3、跨平台：虚拟 DOM 本质上是 JavaScript 对象；

缺点：

无法进行极致优化： 在一些性能要求极高的应用中虚拟DOM无法进行针对性的极致优化

**11.2keep-alive**

keep-alive 主要是组件缓存，采用的是LRU算法。
常用的两个属性 include（要缓存的）/ exclude（不要缓存的），允许组件有条件的进行缓存；都可以用逗号分隔字符串、正则表达式或一个数组来表示
因为keep-alive会将组件保存在内存中，并不会销毁以及重新创建，所以不会重新调用组件的created等方法，所以它自己有两个生命周期activated / deactivated，用来得知当前组件是否处于活跃状态。

**11.3keep-alive**

## [**11.3vue 中的.sync语法糖**](https://www.cnblogs.com/wangyanhua95/p/8706147.html)

![1676511303802](C:\Users\MDPI\AppData\Roaming\Typora\typora-user-images\1676511303802.png)

官方对她的描述是：可以对一个prop进行双向绑定，当一个子组件改变了一个带.sync的prop的值时，这个变化也回同步到父组件所绑定的值。

```js
computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
```



## **12.vue单文件组件 **

- template 
- script 
- style 

## **15.vue路由   route router**

**$route 和 $router 的区别**

router为VueRouter的实例，相当于一个全局的路由器对象，里面含有很多属性和子对象，例如history对象。。。经常用的跳转链接就可以用this.$router.push，和router-link跳转一样。。。

route相当于当前正在跳转的路由对象。。可以从里面获取name,path,params,query等。。

```js
router.push(...)它就等同于<router-link :to="...">
router.push(...)这个方法会向 history 栈添加一个新的记录，当用户点击浏览器后退按钮时，则回到之前的 URL。该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：
//字符串
router.push('home')
//对象
router.push({path:'home'})
//命名的路由
router.push({ name: 'user', params: { userId: '123' }})
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
const userId = '123';
router.push({ name: 'user', params: { userId }})
// ->    /user/123
router.push({ path: `/user/${userId}` })
// ->    /user/123


1.query方式传参和接收参数
传参: 
this.$router.push({
        path:'/xxx',
        query:{
          id:id
        }
      })

接收参数:
this.$route.query.id

2.params方式传参和接收参数
传参: 
this.$router.push({
        name:'xxx',
        params:{
          id:id
        }
      })

接收参数:
this.$route.params.id
```


注意:params传参，push里面只能是 name:‘xxxx’,不能是path:’/xxx’,因为params只能用name来引入路由，如果这里写成了path，接收参数页面会是undefined！！！

另外，二者还有点区别，直白的来说query相当于get请求，页面跳转的时候，可以在地址栏看到请求参数，而params相当于post请求，参数不会再地址栏中显示

**路由两种模式**：

- hash(window.onhashchange)
- history (window.onpopstate)

**全局导航钩子主要有两种钩子：前置守卫、后置钩子，**

注册一个全局前置守卫：

```js
const router = new VueRouter({ ... });
router.beforeEach((to, from, next) => {
    // do someting
});
```


这三个参数 to 、from 、next 分别的作用：

to: Route，代表要进入的目标，它是一个路由对象

from: Route，代表当前正要离开的路由，同样也是一个路由对象

next: Function，这是一个必须需要调用的方法，而具体的执行效果则依赖 next 方法调用的参数

a. next()：进入管道中的下一个钩子，如果全部的钩子执行完了，则导航的状态就是 confirmed（确认的）
b. next(false)：这代表中断掉当前的导航，即 to 代表的路由对象不会进入，被中断，此时该表 URL 地址会被重置到 from 路由对应的地址
c. next(‘/’) 和 next({path: ‘/’})：在中断掉当前导航的同时，跳转到一个不同的地址
d. next(error)：如果传入参数是一个 Error 实例，那么导航被终止的同时会将错误传递给 router.onError() 注册过的回调

注意：next 方法必须要调用，否则钩子函数无法 resolved

## **16.vuex基本模块-state ,actions,mutations,getters**

集中式存储管理应用的所有组件的状态，而更改状态的唯一方法就是在mutaions里修改state，actions不能直接修改state，store是Vuex.Store这个构造函数new出来的实例。在构造函数中可以传一个对象参数。这个参数中可以包含5个对象：



**vuex异步流程**：组件发送一个dispatch到action中，action做异步请求，之后提交到mutation中，mutation修改状态，组件更新

1. state => 基本数据
2. getters =>state的计算属性
3. mutations => 提交更改数据的方法，同步！
4. actions => 把方法提交到mutation，异步操作
5. modules => 将store模块化—当store很大的时候，分成模块，方便管理

- workflow？

- 项目？ 非父子通信， 状态快照（缓存数据）

- store 内存， 一刷新页面没有

- 调试， devtools

  

## **18.vue优化**

- 首屏加载过慢，提供seo

- 首屏加载过慢 (路由懒加载)

  ```js
  <!-- import Foo from './Foo' -->
  var Foo = ()=>import("./Foo")  //webpack code split 代码分割
  const router = new VueRouter({
      routes: [
          { path: '/foo', component: Foo }
      ]
  })
  ```

**19 .React class组件， 函数式组件**


```js

class App extends Component{
     state = {}
	 render (){
	  return <div>111</div>
	 }
 }

 function App(props){

 	return <div>111</div>
 }
 
 react 函数式组件 hooks (钩住函数组件的状态) , useState,useEffect	

```

**20.受控组件&非受控组件？**

> 外部能控制组件内部状态 （属性）
>  	tabbar
>  	swiper

> 既能受控还能非受控

**21.vdom（js对象 模拟dom节点）与diff (同层级对比,key, 同class , 合并操作)**

```js
count = 1
setState({count：this.state.count+1})
setState({count：this.state.count+1})

setState({
	name:"xiaoming"
},()=>{
	//更新到dom, new Swiper
	// this.$nextTick Vue
})

setState((prevState)=>{
	return {
		count:prevState.count+1
	}
})
setState((prevState)=>{
	return {
		count:prevState.count+1
	}
})

多次setState 
```



**22.setState 之后？React数据更新原理？** 

**23. React按钮绑定事件**   

```js
<button onClick={()=>{

}}></button>

handleClilck(){
	console.log(this)
}
handleClilck = ()=>{
	console.log(this)
}
<button onClick={this.handleClick.bind(this)}></button>

事件与原生事件区别？  react 是代理到document 
```

**24.Ref - （dom =>refdom节点， 组件=>ref组件对象）**

> ref父子通信 

**25. 生命周期** 

> 老的

- componentWillMount 
- render	
- componentDidMount
- componentWillReceiveProps
- shouldComponentUpdate ? return false /true 性能优化
- componentWillUpdate
- render
- componentDidUpdate
- componentWillUnmount

>  新的 Fiber

- getDerivedStateFromProps
- getSnapShotBeforeUpdate



**26.父子通信以及非父子通信 (context)**
props 父传子  this.props.myname
callback 子传父 this.props.event()

**27.Redux**

- reducer
- store
- actionCreator
-  Component View


```js
redux原理: 订阅发布模式
	list = [()=>{},()=>{}]
	state = ""
	
	发布
	dispatch = function(){
			state = reducer(prevstate)
					for(var i in list){

						list[i]()
					}
			}
	监听
	subscribe(()=>{})

	异步？
	middleWare - redux-thunk redux-promise redux-saga

	flux VS react-redux VS redux
		- flux 架构思想 15种 (facebook flux(vue 老太太 ), redux )
		- redux （vue react, angular）
		- react-redux（不用自己监听，connect() 容器组件，自己叫UI组件，Provider组件 ）

	react-redux原理
	(1)高阶组件 HOC 高阶函数
	(2) <Provider store={store}/>,  context	(非父子通信，provider comsumer)
```

**28.Ant-Design**
	 哪些组件？ 准备几个

	 Button (size, type , disabled... ) 

**29.immutable (结构共享)**

- 深复制？ 
- [...] {...} 一级深复制
- JSON.parse(JSON.stringify()) 如果name:undefined

**30.Mobx**

- redux(普通js对象， state只读，单一store,纯函数) VS mobx(可观察对象，状态可以被修改，多个store. )

- Vuex（直接修改状态,actions, get set拦截,学习成本低） VS Redux (不能直接修改状态， middlerware， 自己subsribe, 成本高。)

## **31.vue2/3中环境变量的问题**

VUE2中：

一个 Vue CLI 项目有三个模式，具体使用哪个模式就是根据环境变量 NODE_ENV 来看的：

development 模式   test 模式   production 模式

 vue-cli-service build --mode development 
  --mode 后面指定的就是使用的模式，如果你根目录同名的文件（.env.[mode]），则使用这个文件中的 NODE_ENV，如果没找到就使用 --mode 后面的作为模式。 

```js
VUE_APP_ 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中。你可以在应用的代码中这样访问它们：console.log(process.env.VUE_APP_SECRET)

关于HTML 插值
被 html-webpack-plugin 处理的模板
<%= VALUE %> 用来做不转义插值；
<%- VALUE %> 用来做 HTML 转义插值；
<% expression %> 用来描述 JavaScript 流程控制。
<%= BASE_URL %> 环境变量的使用


配置举例说明：
// 本地环境：.env.local
NODE_ENV=development
BRANCH_ENV=feature
VUE_APP_ENV=local

// 集成开发环境：.env.dev
NODE_ENV=production
BRANCH_ENV=dev
VUE_APP_ENV=development

// 测试环境：.env.test
NODE_ENV=production
BRANCH_ENV=test
VUE_APP_ENV=test

// 预发环境：.env.uat
NODE_ENV=production
BRANCH_ENV=uat
VUE_APP_ENV=uat

// 生产环境：.env.prd
NODE_ENV=production
BRANCH_ENV=master
VUE_APP_ENV=production


"scripts": {
  "serve": "vue-cli-service serve --mode local",
  "build:dev": "vue-cli-service build --mode dev",
  "build:test": "vue-cli-service build --mode test",
  "build:uat": "vue-cli-service build --mode uat",
  "build:prd": "vue-cli-service build --mode prd",
}
  --mode 后面是什么就去找什么对应配置文件
```

VUE3中：

 还是像 vuecli 那样建立不同的 .env.[mode] 文件 

```js
// 以下是所有地方都可使用的环境变量
import.meta.env.MODE: {string} 应用运行的模式。
import.meta.env.BASE_URL: {string} 部署应用时的基本 URL。他由base 配置项决定。
import.meta.env.PROD: {boolean} 应用是否运行在生产环境。
import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)。
import.meta.env.SSR: {boolean} 应用是否运行在 server 上。

在 index.html 中使用环境变量
在 vuecli 中是可以直接用的，但是在 vite 中需要插件来支持。
npm i vite-plugin-html -D

import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from "vite-plugin-html";

export default ({ command, mode }: ConfigEnv): UserConfig => {
    // mode: production | test | development     --mode对应值
    // command: build | server
}
// 这样就已经可以在 html 中使用环境变量了
export default defineConfig({
    plugins: [
        createHtmlPlugin()
    ]
})

// 如果还想另外注入一些环境变量，如这里的 title，可以用如下方式
export default defineConfig({
    plugins: [
        createHtmlPlugin({
            inject: {
                data: {
                    title: getViteEnv(mode, "VITE_APP_TITLE")
                },
            },
        }),
      // ...
    ]
})
const getViteEnv = (mode, target) => {
    return loadEnv(mode, process.cwd())[target];
};

html中：
<title><%= title %></title>

```

## vue中封装dialog组件，全局使用，可避免缓存

通过main.js注册全局

```js
import dialog from './utils/dialog'
Vue.prototype.$dialog = dialog
```

dialog.js文件

```js
import Vue from 'vue'

const dialogMixin = {
  data() {
    return {
      resolve: true
    }
  },

  computed: {
    visible: {
      get() {
        return Boolean(this.resolve)
      },

      set(val) {
        if (!val) this.$dismiss()
      }
    }
  },

  methods: {
    open() {
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    $close(value) {
      if (this.resolve) {
        this.resolve(value)
        this.resolve = null
      }
    },
    $dismiss() {
      if (this.reject) {
        this.reject()
        this.reject = null
      }
    }
  }
}

const dialog = function(component, opts) {
  component = Object.assign({}, component)
  component.mixins = [dialogMixin]

  const Constructor = Vue.extend(component)
  const vm = new Constructor({ propsData: opts })
  vm.$nextTick(() => {
    vm.$mount(document.body.appendChild(document.createElement('div')))
  })

  return new Promise((resolve, reject) => {
    vm.open().then((val) => {
      resolve(val)
    }).catch((e) => {
      reject(e)
    }).finally(() => {
      if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > -1) {
        vm.$destroy()
        document.body.removeChild(vm.$el)
      } else {
        // destroy after dialog faded out
        setTimeout(() => {
          vm.$destroy()
          document.body.removeChild(vm.$el)
        }, 200)
      }
    })
  })
}

export default dialog

```

触发初始化dialog部分：

```js
import uploadDialog from './uploadDialog.vue'
handleUpload() {
      this.$dialog(uploadDialog, {}).then((value) => {
        this.resetAndQuery()
      }).catch(() => {})
}
```

uploadDialog 为业务弹窗组件，自行引入

```vue
<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="400px"
    custom-class="upload-file-dialog"
  >
    <!-- 此处为业务组件，我们只关心cancel和confirm部分的逻辑 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="$dismiss">Cancel</el-button>
      <el-button type="primary" :loading="loading" @click="handleConfirm">Confirm</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  methods: {
    handleConfirm() {
          uploadFile(params, this.id).then(({ data }) => {
            const { id } = data
            this.$close(id)
          })
        }
      })
    }
  }
}
</script>

```

