---
title: 登陆注册
date: 2024-03-25
categories: 
 - Project
---


## 1.前端注册
前端注册逻辑比较简单，用户输入账号密码，然后发送给后端，后端验证账号密码，验证通过则注册成功，返回注册成功的信息给前端。


## 2.后端注册

后端注册逻辑比较复杂，需要考虑以下几个方面：

1. 账号密码的验证规则
两种注册方式，手机号注册和邮箱注册
两种方式都需要验证手机号或邮箱是否为空，这部分前端可能已经限定过了，后端保守起见还是要加一个限制
2. 账号是否已存在
两种注册方式，手机号或者邮箱账号密码注册，用账号名去user库中查，如果结果大于0，说明账号名已存在，返回注册失败的信息给前端
3. 账号密码的加密存储
将传入的密码，用bcrypt.js加密存储，加密的强度为10
```js
reginfo.password = bcrypt.hashSync(reginfo.password, 10)
```
4. 账号注册成功后，需要发送邮件或短信通知用户


## 3.前端登录

前端登录逻辑,login接口不需要带token，所以不需要在header中添加Authorization字段，
当login成功之后，pinia存储一下token，之后每次接口请求都需要在header中添加Authorization字段。
```js
const userStore = useUserStore();
const { token } = userStore;
if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
  // jwt token
  (config as Recordable).headers.Authorization = options.authenticationScheme
    ? `${options.authenticationScheme} ${token}`
    : token;
}
```

## 4.后端登录

后端登录逻辑比较复杂，需要考虑以下几个方面：

1. login和register接口直接放行到下一步，不需要做token验证。
```js
app.use((req, res, next) => {
  //排除login相关的路由和接口
  if (req.url.includes("login") || req.url.includes("register")) {
    next()
    return
  }
  const token = req.headers["authorization"]?.split(" ")[1] // 与前端的Bearer字符做分割，取真实token
  if(token){
    const payload=  JWT.verify(token,jwtconfig.jwtSecretKey) // 此处验证token是否过期
    if(payload){
      //重新计算token过期时间
      const newToken = JWT.generate({
        _id:payload.password,
        username:payload.imageUrl
      },"1d")
      res.header("Authorization",newToken)
      next()
    }else{
      res.status(401).send({errCode:-1,errInfo:"Token过期"})
    }
  }else{
    res.status(401).send({errCode:-1,errInfo:"请先登录"})
  }
})
```
2. 无论是手机号登录还是邮箱账号密码登录，都去查他们的phone或者email是否在user表中存在，存在则下一步，不存在则需要先注册
```js
const compareResult = bcrypt.compareSync(loginfo.password, results[0].password)
if (!compareResult) {
    return res.cc('密码错误',403)
}
```
3. Token生成，可以依靠账号密码个人信息进行加密，jwtSecretKey秘钥，expiresIn过期时间
```js
const user = {
    ...results[0],
    password: '',
    create_time: '',
    update_time: '',
}
// 设置token的有效时长 有效期为7个小时
const tokenStr = jwt.sign(user, jwtconfig.jwtSecretKey, {
    expiresIn: '7h'
})
```
4. 账号登录成功后，需要发送邮件或短信通知用户
<!-- ![image-20220414094653807](https://blog.babade.asia/nodejs/image-20220414094653807.png) -->


## 5.具体信息字段和前端协商
```js
return res.send({
    code:6666,
    data:{
        status: 0,
        message: '注册账号失败'
    }
})
return res.send({
    code: 6666,
    data:{
        message: '注册账号成功'
    }
}),
return res.send({
    code: 6666,
    data:{
        token: tokenStr,
        message: '登录成功',
        userInfo: user,
    }
})
return res.cc = (err, status = 500) => {
	res.status(status).send({
		status,
		// 判断这个error是错误对象还是字符串
		message: err instanceof Error ? err.message : err,
	})
}
```

