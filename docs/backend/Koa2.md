---
title: Koa2
date: 2024-02-02
categories: 
 - Backend
---

## Koa2

<img src="https://blog.babade.asia/nodejs/image-20220417075653414.png" alt="image-20220417075653414" style="zoom:50%;" />

### 1.简介

koa 是由 Express 原班人马打造的，致力于成为一个更小、更富有表现力、更健壮的 Web 框架。使用 koa 编写 web 应用，通过组合不同的 generator，可以免除重复繁琐的回调函数嵌套，并极大地提升错误处理的效率。koa 不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。

### 2. 快速开始

## 2.1 安装koa2

```s
# 初始化package.json
npm init

# 安装koa2 
npm install koa
```

## 2.2 hello world 代码

```js
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  ctx.body = 'hello koa2' //json数据
})

app.listen(3000)

```

![image-20220417092053231](https://blog.babade.asia/nodejs/image-20220417092053231.png)

## 2.3 启动demo

```s
node index.js
```

### 3. koa vs express

通常都会说 Koa 是洋葱模型，这重点在于中间件的设计。但是按照上面的分析，会发现 Express 也是类似的，不同的是Express 中间件机制使用了 Callback 实现，这样如果出现异步则可能会使你在执行顺序上感到困惑，因此如果我们想做接口耗时统计、错误处理 Koa 的这种中间件模式处理起来更方便些。最后一点响应机制也很重要，Koa 不是立即响应，是整个中间件处理完成在最外层进行了响应，而 Express 则是立即响应。

## 3.1更轻量

- koa 不提供内置的中间件；
- koa 不提供路由，而是把路由这个库分离出来了（koa/router）

## 3.2 Context对象

koa增加了一个Context的对象，作为这次请求的上下文对象（在koa2中作为中间件的第一个参数传入）。同时Context上也挂载了Request和Response两个对象。和Express类似，这两个对象都提供了大量的便捷方法辅助开发, 这样的话对于在保存一些公有的参数的话变得更加合情合理

## 3.3 异步流程控制

​    express采用callback来处理异步，    koa v1采用generator，koa v2 采用async/await。

​	generator和async/await使用同步的写法来处理异步，明显好于callback和promise，

## 3.4 中间件模型

​	express基于connect中间件，线性模型；

​     koa中间件采用洋葱模型（对于每个中间件，在完成了一些事情后，可以非常优雅的将控制权传递给下一个中间件，并能够等待它完成，当后续的中间件完成处理后，控制权又回到了自己）

<img src="https://blog.babade.asia/nodejs/image-20220417083817823.png" alt="image-20220417083817823" style="zoom:50%;;" />

   ![image-20220417085913567](https://blog.babade.asia/nodejs/image-20220417085913567.png)

```js
//同步
var express = require("express")
var app = express()

app.use((req,res,next)=>{
    console.log(1)
    next()
    console.log(4)
    res.send("hello")
})
app.use(()=>{
    console.log(3)
})

app.listen(3000)
//异步
var express = require("express")
var app = express()

app.use(async (req,res,next)=>{
    console.log(1)
    await next()
    console.log(4)
    res.send("hello")
})
app.use(async ()=>{
    console.log(2)
    await delay(1)
    console.log(3)
})

function delay(time){
 return new Promise((resolve,reject)=>{
    setTimeout(resolve,1000)
 })
}
```

```js
//同步
var koa = require("koa")
var app = new koa()

app.use((ctx,next)=>{
    console.log(1)
    next()
    console.log(4)
    ctx.body="hello"
})
app.use(()=>{
    console.log(3)
})

app.listen(3000)

//异步
var koa = require("koa")
var app = new koa()

app.use(async (ctx,next)=>{
    console.log(1)
    await next()
    console.log(4)
    ctx.body="hello"
}) 
app.use(async ()=>{
    console.log(2)
    await delay(1)
    console.log(3)
})

function delay(time){
 return new Promise((resolve,reject)=>{
    setTimeout(resolve,1000)
 })
}

app.listen(3000)
```

 ### 4. 路由

## 4.1基本用发

```js
var Koa = require("koa")
var Router = require("koa-router")

var app = new Koa()
var router = new Router()

router.post("/list",(ctx)=>{
    ctx.body=["111","222","333"]
})
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
```



## 4.2 router.allowedMethods作用

![image-20220417102845079](https://blog.babade.asia/nodejs/image-20220417102845079.png)

## 4.3 请求方式

Koa-router 请求方式： `get` 、 `put` 、 `post` 、 `patch` 、 `delete` 、 `del`  ，而使用方法就是 `router.方式()`  ，比如 `router.get()` 和 `router.post()` 。而 `router.all()` 会匹配所有的请求方法。

```js
var Koa = require("koa")
var Router = require("koa-router")

var app = new Koa()
var router = new Router()

router.get("/user",(ctx)=>{
    ctx.body=["aaa","bbb","ccc"]
})
.put("/user/:id",(ctx)=>{
    ctx.body={ok:1,info:"user update"}
})
.post("/user",(ctx)=>{
    ctx.body={ok:1,info:"user post"}
})
.del("/user/:id",(ctx)=>{
    ctx.body={ok:1,info:"user del"}
})


app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
```

## 4.4 拆分路由

list.js

```js
var Router = require("koa-router")
var router = new Router()
router.get("/",(ctx)=>{
    ctx.body=["111","222","333"]
})
.put("/:id",(ctx)=>{
    ctx.body={ok:1,info:"list update"}
})
.post("/",(ctx)=>{
    ctx.body={ok:1,info:"list post"}
})
.del("/:id",(ctx)=>{
    ctx.body={ok:1,info:"list del"}
})
module.exports = router
```

index.js

```js
var Router = require("koa-router")
var router = new Router()
var user = require("./user")
var list = require("./list")
router.use('/user', user.routes(), user.allowedMethods())
router.use('/list', list.routes(), list.allowedMethods())

module.exports = router
```

entry入口

```js
var Koa = require("koa")
var router = require("./router/index")

var app = new Koa()
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
```



## 4.5 路由前缀

```js
router.prefix('/api')
```



## 4.6 路由重定向

```js
router.get("/home",(ctx)=>{
    ctx.body="home页面"
})
//写法1 
router.redirect('/', '/home');
//写法2
router.get("/",(ctx)=>{
    ctx.redirect("/home")
})
```

### 5.  静态资源

```js
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

app.use(static(
  path.join( __dirname,  "public")
))


app.use( async ( ctx ) => {
  ctx.body = 'hello world'
})

app.listen(3000, () => {
  console.log('[demo] static-use-middleware is starting at port 3000')
})

```



### 6.  获取请求参数

## 6.1get参数

在koa中，获取GET请求数据源头是koa中request对象中的query方法或querystring方法，query返回是格式化好的参数对象，querystring返回的是请求字符串，由于ctx对request的API有直接引用的方式，所以获取GET请求数据有两个途径。

- 是从上下文中直接获取 请求对象ctx.query，返回如 { a:1, b:2 } 请求字符串 ctx.querystring，返回如 a=1&b=2
- 是从上下文的request对象中获取 请求对象ctx.request.query，返回如 { a:1, b:2 } 请求字符串 ctx.request.querystring，返回如 a=1&b=2

## 6.2post参数

对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中

```js
const bodyParser = require('koa-bodyparser')

// 使用ctx.body解析中间件
app.use(bodyParser())

```



### 7. ejs模板

## 7.1 安装模块

```js
# 安装koa模板使用中间件
npm install --save koa-views

# 安装ejs模板引擎
npm install --save ejs

```

## 7.2 使用模板引擎

**文件目录**

```
├── package.json
├── index.js
└── view
    └── index.ejs
```

**./index.js文件**

```js
const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

app.use( async ( ctx ) => {
  let title = 'hello koa2'
  await ctx.render('index', {
    title,
  })
})

app.listen(3000)
```

**./view/index.ejs 模板**

```html
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <h1><%= title %></h1>
    <p>EJS Welcome to <%= title %></p>
</body>
</html>
```



### 8. cookie&session

## 8.1 cookie

koa提供了从上下文直接读取、写入cookie的方法

- ctx.cookies.get(name, [options]) 读取上下文请求中的cookie
- ctx.cookies.set(name, value, [options]) 在上下文中写入cookie

## 8.2 session

- koa-session-minimal 适用于koa2 的session中间件，提供存储介质的读写接口 。

   ```js
   const session = require('koa-session-minimal')
   app.use(session({
       key: 'SESSION_ID',
       cookie: {
           maxAge:1000*60
       }
   }))
   ```

   

   ```js
   app.use(async (ctx, next) => {
       //排除login相关的路由和接口
       if (ctx.url.includes("login")) {
           await next()
           return
       }
   
       if (ctx.session.user) {
           //重新设置以下sesssion
           ctx.session.mydate = Date.now()
           await next()
       } else {
   
           ctx.redirect("/login")
       }
   })
   ```
### 9. JWT

   ```js
app.use(async(ctx, next) => {
    //排除login相关的路由和接口
    if (ctx.url.includes("login")) {
        await next()
        return
    }
    const token = ctx.headers["authorization"]?.split(" ")[1]
    // console.log(req.headers["authorization"])
    if(token){
        const payload=  JWT.verify(token)
        if(payload){
            //重新计算token过期时间
            const newToken = JWT.generate({
                _id:payload._id,
                username:payload.username
            },"10s")

            ctx.set("Authorization",newToken)
            await next()
        }else{
            ctx.status = 401
            ctx.body = {errCode:-1,errInfo:"token过期"}
        }
    }else{
        await next()
    }
})
   ```

###    

### 10.上传文件

> https://www.npmjs.com/package/@koa/multer

```js
npm install --save @koa/multer multer
```

```js
const multer = require('@koa/multer');
const upload = multer({ dest: 'public/uploads/' })

router.post("/",upload.single('avatar'),
(ctx,next)=>{
    console.log(ctx.request.body,ctx.file)
    ctx.body={
        ok:1,
        info:"add user success"
    }
})

```

### 11.操作MongoDB

```js
const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/kerwin_project")
//插入集合和数据,数据库kerwin_project会自动创建
```



```js
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const UserType = {
    username:String,
    password:String,
    age:Number,
    avatar:String
}

const UserModel = mongoose.model("user",new Schema(UserType))
// 模型user 将会对应 users 集合, 
module.exports = UserModel
```


