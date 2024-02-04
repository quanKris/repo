---
title: Node JS
date: 2024-01-23
categories: 
 - Backend
---

<!-- [[TOC]] -->

## 一、Node.js基础

### 1.  认识Node.js

> Node.js是一个javascript运行环境。它让javascript可以开发后端程序，实现几乎其他后端语言实现的所有功能，可以与PHP、Java、Python、.NET、Ruby等后端语言平起平坐。
>
> Nodejs是基于V8引擎，V8是Google发布的开源JavaScript引擎，本身就是用于Chrome浏览器的js解释部分，但是Ryan Dahl 这哥们，鬼才般的，把这个V8搬到了服务器上，用于做服务器的软件。

- Nodejs语法完全是js语法，只要你懂js基础就可以学会Nodejs后端开发
- NodeJs超强的高并发能力,实现高性能服务器
- 开发周期短、开发成本低、学习成本低

> http://nodejs.cn/learn/how-much-javascript-do-you-need-to-know-to-use-nodejs

![image-20220209152247426](https://blog.babade.asia/nodejs/image-20220209152247426.png)

Node.js 可以解析JS代码（没有浏览器安全级别的限制）提供很多系统级别的API，如：

- 文件的读写 (File System)

  ```js
  const fs = require('fs')
  
  fs.readFile('./ajax.png', 'utf-8', (err, content) => {
    console.log(content)
  })
  ```

- 进程的管理 (Process)

  ```js
  function main(argv) {
    console.log(argv)
  }
  
  main(process.argv.slice(2))
  
  ```

  

- 网络通信 (HTTP/HTTPS)

  ```js
  const http = require("http")
  
  http.createServer((req,res) => {
    res.writeHead(200, {
      "content-type": "text/plain"
    })
    res.write("hello nodejs")
    res.end()
  }).listen(3000)
  
  ```

### 2.  开发环境搭建

> http://nodejs.cn/download/

![image-20220210095903409](https://blog.babade.asia/nodejs/image-20220210095903409.png)

### 3.  模块、包、commonJS

![image-20220210100015768](https://blog.babade.asia/nodejs/image-20220210100015768.png)

### 4. CommonJS规范

<img src="https://blog.babade.asia/nodejs/image-20220210101652166.png" alt="image-20220210101652166" style="zoom: 67%;display:block; float: left;" />

<img src="https://blog.babade.asia/nodejs/image-20220210101720533.png" alt="image-20220210101720533" style="zoom: 67%; display:block" />

### 5. modules模块化规范写法

我们可以把公共的功能 抽离成为一个单独的 js 文件 作为一个模块，默认情况下面这个模块里面的方法或者属性，外面是没法访问的。如果要让外部可以访问模块里面的方法或者属性，就必须在模块里面通过 exports 或者 module.exports 暴露属性或者方法。

m1.js：

```js
const name = 'gp19'

const sayName = () => {
  console.log(name)
}

console.log('module 1')

// 接口暴露方法一：
module.exports = {
  say: sayName
}

// 接口暴露方法二：
exports.say = sayName

// 错误！
exports = {
  say: sayName
}
```

main.js：

```js
const m1 = require('./m1')
m1.say()
```

### 6. npm的使用

```js
npm init
npm install 包名 –g  （uninstall,update）
npm install 包名 --save-dev (uninstall,update)
npm list -g (不加-g，列举当前目录下的安装包)
npm info 包名（详细信息） npm info 包名 version(获取最新版本)
npm install md5@1（安装指定版本）
npm outdated(  检查包是否已经过时)


"dependencies": {    "md5": "^2.1.0"  }  ^ 表示 如果 直接npm install 将会 安md5
2.*.*  	最新版本
"dependencies": {    "md5": "~2.1.0"  }  ~ 表示 如果 直接npm install 将会 安装md5 2.1.*  最新版本
"dependencies": {    "md5": "*"  }  * 表示 如果 直接npm install 将会 安装 md5  最新版本
```

### 7. 全局安装 nrm  可选，一般用不上 

> NRM (npm registry manager)是npm的镜像源管理工具，有时候国外资源太慢，使用这个就可以快速地在 npm 源间切换。

`手动切换方法： npm config set registry https://registry.npm.taobao.org`

**安装 nrm**

在命令行执行命令，npm install -g nrm，全局安装nrm。

**使用 nrm**

执行命令 nrm ls 查看可选的源。 其中，带*的是当前使用的源，上面的输出表明当前源是官方源。

**切换 nrm**

如果要切换到taobao源，执行命令nrm use taobao。

**测试速度**

你还可以通过 nrm test 测试相应源的响应时间。

```
nrm test
```

>  扩展：

> ![image-20220210114017616](https://blog.babade.asia/nodejs/image-20220210114017616.png)

 ```bash
 npm install -g cnpm --registry=https://registry.npmmirror.com
 ```



### 8. yarn使用

```
npm install -g yarn
```

```js
对比npm:
	速度超快: Yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快。
    超级安全: 在执行代码之前，Yarn 会通过算法校验每个安装包的完整性。

开始新项目
	yarn init 
添加依赖包
	yarn add [package] 
	yarn add [package]@[version] 
	yarn add [package] --dev 
升级依赖包
	 yarn upgrade [package]@[version] 
移除依赖包
	 yarn remove [package]
	 
安装项目的全部依赖
	 yarn install 
```



### 9. http模块

> 要使用 HTTP 服务器和客户端，则必须 `require('http')`。

```js
const http = require('http');

// 创建本地服务器来从其接收数据
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!'
  }));
});

server.listen(8000);

```

```js
const http = require('http');

// 创建本地服务器来从其接收数据
const server = http.createServer();

// 监听请求事件
server.on('request', (request, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!'
  }));
});

server.listen(8000);
```

### 10. url模块

- parse
```js
const url = require('url')
const urlString = 'https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110'
const parsedStr = url.parse(urlString)
console.log(parsedStr)
```

- format

```js
const url = require('url')
const urlObject = {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com:443',
  port: '443',
  hostname: 'www.baidu.com',
  hash: '#tag=110',
  search: '?id=8&name=mouse',
  query: { id: '8', name: 'mouse' },
  pathname: '/ad/index.html',
  path: '/ad/index.html?id=8&name=mouse'
}
const parsedObj = url.format(urlObject)
console.log(parsedObj)

```

- resolve

```js
const url = require('url')
var a = url.resolve('/one/two/three', 'four')  ( 注意最后加/ ，不加/的区别 )// four
var b = url.resolve('http://example.com/', '/one') //http://example.com/one
var c = url.resolve('http://example.com/one', '/two') //http://example.com/two
console.log(a + "," + b + "," + c)
```



### 11. querystring模块

- parse

```js
const querystring = require('querystring')
var qs = 'x=3&y=4'
var parsed = querystring.parse(qs)
console.log(parsed)

```

- stringify

```js
const querystring = require('querystring')
var qo = {
  x: 3,
  y: 4
}
var parsed = querystring.stringify(qo)
console.log(parsed)

```

- escape/unescape

<img src="https://blog.babade.asia/nodejs/image-20220213211406894.png" alt="image-20220213211406894" style="zoom:67%;" />

<img src="https://blog.babade.asia/nodejs/image-20220213211423142.png" alt="image-20220213211423142" style="zoom:67%;" />

```js
const querystring = require('querystring')
var str = 'id=3&city=北京&url=https://www.baidu.com'
var escaped = querystring.escape(str)
console.log(escaped)

```

```js
const querystring = require('querystring')
var str = 'id%3D3%26city%3D%E5%8C%97%E4%BA%AC%26url%3Dhttps%3A%2F%2Fwww.baidu.com'
var unescaped = querystring.unescape(str)
console.log(unescaped)
```

### 12. http模块补充

::: tip
接口：jsonp
:::
```js
const http = require('http')
const url = require('url')

const app = http.createServer((req, res) => {
  let urlObj = url.parse(req.url, true)

  switch (urlObj.pathname) {
    case '/api/user':
      res.end(`${urlObj.query.cb}({"name": "gp145"})`)
      break
    default:
      res.end('404.')
      break
  }
})

app.listen(8080, () => {
  console.log('localhost:8080')
})
```

::: tip
跨域：CORS
:::
```js
const http = require('http')
const url = require('url')
const querystring = require('querystring')

const app = http.createServer((req, res) => {
  let data = ''
  let urlObj = url.parse(req.url, true)

  res.writeHead(200, {
    'content-type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  })

  req.on('data', (chunk) => {
    data += chunk
  })

  req.on('end', () => {
    responseResult(querystring.parse(data))
  })

  function responseResult(data) {
    switch (urlObj.pathname) {
      case '/api/login':
        res.end(JSON.stringify({
          message: data
        }))
        break
      default:
        res.end('404.')
        break
    }
  }
})

app.listen(8080, () => {
  console.log('localhost:8080')
})
```

::: tip
模拟get
:::
```js
var http = require('http')
var https = require('https')

// 1、接口 2、跨域
const server = http.createServer((request, response) => {
  var url = request.url.substr(1)

  var data = ''

  response.writeHeader(200, {
    'content-type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  })

  https.get(`https://m.lagou.com/listmore.json${url}`, (res) => {

    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      response.end(JSON.stringify({
        ret: true,
        data
      }))
    })
  })

})

server.listen(8080, () => {
  console.log('localhost:8080')
})
```

::: tip
模拟post：服务器提交（攻击）
:::
```js
const https = require('https')
const querystring = require('querystring')

const postData = querystring.stringify({
  province: '上海',
  city: '上海',
  district: '宝山区',
  address: '同济支路199号智慧七立方3号楼2-4层',
  latitude: 43.0,
  longitude: 160.0,
  message: '求购一条小鱼',
  contact: '13666666',
  type: 'sell',
  time: 1571217561
})

const options = {
  protocol: 'https:',
  hostname: 'ik9hkddr.qcloud.la',
  method: 'POST',
  port: 443,
  path: '/index.php/trade/add_item',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
}

function doPost() {
  let data

  let req = https.request(options, (res) => {
    res.on('data', chunk => data += chunk)
    res.on('end', () => {
      console.log(data)
    })
  })

  req.write(postData)
  req.end()
}

// setInterval(() => {
//   doPost()
// }, 1000)
```

::: tip
爬虫
:::
```js
const https = require('https')
const http = require('http')
const cheerio = require('cheerio')

http.createServer((request, response) => {
  response.writeHead(200, {
    'content-type': 'application/json;charset=utf-8'
  })

  const options = {
    // protocol: 'https:',
    hostname: 'i.maoyan.com',
    port: 443,
    path: '/',
    method: 'GET'
  }

  const req = https.request(options, (res) => {
    let data = ''
    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      filterData(data)
    })
  })

  function filterData(data) {
    //   console.log(data)
    let $ = cheerio.load(data)
    let $movieList = $('.column.content')
    console.log($movieList)
    let movies = []
    $movieList.each((index, value) => {
      movies.push({
        title: $(value).find('.movie-title .title').text(),
        detail: $(value).find('.detail .actor').text(),
      })
    })

    response.end(JSON.stringify(movies))
  }

  req.end()
}).listen(3000)
```

### 13.	event模块

```js
const EventEmitter = require('events')

class MyEventEmitter extends EventEmitter {}

const event = new MyEventEmitter()

event.on('play', (movie) => {
  console.log(movie)
})

event.emit('play', '我和我的祖国')
event.emit('play', '中国机长')
```

### 14. fs文件操作模块

```js
const fs = require('fs')

// 创建文件夹
fs.mkdir('./logs', (err) => {
  console.log('done.')
})

// 文件夹改名
fs.rename('./logs', './log', () => {
  console.log('done')
})

// 删除文件夹
fs.rmdir('./log', () => {
  console.log('done.')
})

// 写内容到文件里
fs.writeFile(
  './logs/log1.txt',
  'hello',
  // 错误优先的回调函数
  (err) => {
    if (err) {
      console.log(err.message)
    } else {
      console.log('文件创建成功')
    }
  }
)

// 给文件追加内容
fs.appendFile('./logs/log1.txt', '\nworld', () => {
  console.log('done.')
})

// 读取文件内容
fs.readFile('./logs/log1.txt', 'utf-8', (err, data) => {
  console.log(data)
})

// 删除文件
fs.unlink('./logs/log1.txt', (err) => {
  console.log('done.')
})

// 批量写文件
for (var i = 0; i < 10; i++) {
  fs.writeFile(`./logs/log-${i}.txt`, `log-${i}`, (err) => {
    console.log('done.')
  })
}

// 读取文件/目录信息
fs.readdir('./', (err, data) => {
  data.forEach((value, index) => {
    fs.stat(`./${value}`, (err, stats) => {
      // console.log(value + ':' + stats.size)
      console.log(value + ' is ' + (stats.isDirectory() ? 'directory' : 'file'))
    })
  })
})

// 同步读取文件
try {
  const content = fs.readFileSync('./logs/log-1.txt', 'utf-8')
  console.log(content)
  console.log(0)
} catch (e) {
  console.log(e.message)
}

// 异步读取文件：方法一
fs.readFile('./logs/log-0.txt', 'utf-8', (err, content) => {
  console.log(content)
  console.log(0)
})
console.log(1)

// 异步读取文件：方法二
const fs = require("fs").promises
fs.readFile('./logs/log-0.txt', 'utf-8').then(result => {
  console.log(result)
})

```

在`fs`模块中，提供同步方法是为了方便使用。那我们到底是应该用异步方法还是同步方法呢？

由于Node环境执行的JavaScript代码是服务器端代码，所以，绝大部分需要在服务器运行期反复执行业务逻辑的代码，*必须使用异步代码*，否则，同步代码在执行时期，服务器将停止响应，因为JavaScript只有一个执行线程。

服务器启动时如果需要读取配置文件，或者结束时需要写入到状态文件时，可以使用同步代码，因为这些代码只在启动和结束时执行一次，不影响服务器正常运行时的异步执行。

### 15. stream流模块

`stream`是Node.js提供的又一个仅在服务区端可用的模块，目的是支持“流”这种数据结构。

什么是流？流是一种抽象的数据结构。想象水流，当在水管中流动时，就可以从某个地方（例如自来水厂）源源不断地到达另一个地方（比如你家的洗手池）。我们也可以把数据看成是数据流，比如你敲键盘的时候，就可以把每个字符依次连起来，看成字符流。这个流是从键盘输入到应用程序，实际上它还对应着一个名字：标准输入流（stdin）。

![image-20220407085931744](https://blog.babade.asia/nodejs/image-20220407085931744.png)

如果应用程序把字符一个一个输出到显示器上，这也可以看成是一个流，这个流也有名字：标准输出流（stdout）。流的特点是数据是有序的，而且必须依次读取，或者依次写入，不能像Array那样随机定位。

有些流用来读取数据，比如从文件读取数据时，可以打开一个文件流，然后从文件流中不断地读取数据。有些流用来写入数据，比如向文件写入数据时，只需要把数据不断地往文件流中写进去就可以了。

在Node.js中，流也是一个对象，我们只需要响应流的事件就可以了：`data`事件表示流的数据已经可以读取了，`end`事件表示这个流已经到末尾了，没有数据可以读取了，`error`事件表示出错了。

```js
var fs = require('fs');

// 打开一个流:
var rs = fs.createReadStream('sample.txt', 'utf-8');

rs.on('data', function (chunk) {
    console.log('DATA:')
    console.log(chunk);
});

rs.on('end', function () {
    console.log('END');
});

rs.on('error', function (err) {
    console.log('ERROR: ' + err);
});

```

要注意，`data`事件可能会有多次，每次传递的`chunk`是流的一部分数据。

要以流的形式写入文件，只需要不断调用`write()`方法，最后以`end()`结束：



```js
var fs = require('fs');

var ws1 = fs.createWriteStream('output1.txt', 'utf-8');
ws1.write('使用Stream写入文本数据...\n');
ws1.write('END.');
ws1.end();

```

`pipe` 就像可以把两个水管串成一个更长的水管一样，两个流也可以串起来。一个`Readable`流和一个`Writable`流串起来后，所有的数据自动从`Readable`流进入`Writable`流，这种操作叫`pipe`。

在Node.js中，`Readable`流有一个`pipe()`方法，就是用来干这件事的。

让我们用`pipe()`把一个文件流和另一个文件流串起来，这样源文件的所有数据就自动写入到目标文件里了，所以，这实际上是一个复制文件的程序：

```js
const fs = require('fs')

const readstream = fs.createReadStream('./1.txt')
const writestream = fs.createWriteStream('./2.txt')

readstream.pipe(writestream)
```

### 16. zlib

<img src="https://blog.babade.asia/nodejs/image-20220407105916114.png" alt="image-20220407105916114" style="zoom:50%;" />

```js
const fs = require('fs')
const zlib = require('zlib')

const gzip = zlib.createGzip()

const readstream = fs.createReadStream('./note.txt')
const writestream = fs.createWriteStream('./note2.txt')

readstream
  .pipe(gzip)
  .pipe(writestream)

```

### 17. crypto

crypto模块的目的是为了提供通用的加密和哈希算法。用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢。Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。

MD5是一种常用的哈希算法，用于给任意数据一个“签名”。这个签名通常用一个十六进制的字符串表示：

```js
const crypto = require('crypto');

const hash = crypto.createHash('md5');

// 可任意多次调用update():
hash.update('Hello, world!');
hash.update('Hello, nodejs!');

console.log(hash.digest('hex')); 

```

`update()`方法默认字符串编码为`UTF-8`，也可以传入Buffer。

如果要计算SHA1，只需要把`'md5'`改成`'sha1'`，就可以得到SHA1的结果`1f32b9c9932c02227819a4151feed43e131aca40`。

Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥：

```
const crypto = require('crypto');

const hmac = crypto.createHmac('sha256', 'secret-key');

hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');

console.log(hmac.digest('hex')); // 80f7e22570...

```

只要密钥发生了变化，那么同样的输入数据也会得到不同的签名，因此，可以把Hmac理解为用随机数“增强”的哈希算法。



AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持，但是需要自己封装好函数，便于使用：

```js
const crypto = require("crypto");

function encrypt (key, iv, data) {
    let decipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    // decipher.setAutoPadding(true);
    return decipher.update(data, 'binary', 'hex') + decipher.final('hex');
}

function decrypt (key, iv, crypted) {
     crypted = Buffer.from(crypted, 'hex').toString('binary');
     let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
     return decipher.update(crypted, 'binary', 'utf8') + decipher.final('utf8');
}
key,iv必须是16个字节

```

可以看出，加密后的字符串通过解密又得到了原始内容。

### 18. 路由

::: tip
基础
:::
```js
/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
var fs = require("fs")
var path = require("path")

function render(res, path) {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf8" })
    res.write(fs.readFileSync(path, "utf8"))
    res.end()
}


const route = {
    "/login": (req, res) => {
        render(res, "./static/login.html")
    },

    "/home": (req, res) => {
        render(res, "./static/home.html")
    },
    "/404": (req, res) => {
        res.writeHead(404, { "Content-Type": "text/html;charset=utf8" })
        res.write(fs.readFileSync("./static/404.html", "utf8"))
    }
}


```
::: tip
获取参数
:::

get请求

```js
    "/api/login":(req,res)=>{
        const myURL = new URL(req.url, 'http://127.0.0.1:3000');
        console.log(myURL.searchParams.get("username"))   
        render(res,`{ok:1}`)
    }
```

post请求

```js
"/api/login": (req, res) => {
        var post = '';
        // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        req.on('data', function (chunk) {
            post += chunk;
        });

        // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
        req.on('end', function () {
            post = JSON.parse(post);
            render(res, `{ok:1}`)
        });
    }
```


::: tip
静态资源处理
:::

```js
function readStaticFile(req, res) {
    const myURL = new URL(req.url, 'http://127.0.0.1:3000')
    var filePathname = path.join(__dirname, "/static", myURL.pathname);

    if (fs.existsSync(filePathname)) {
        // console.log(1111)
        res.writeHead(200, { "Content-Type": `${mime.getType(myURL.pathname.split(".")[1])};charset=utf8` })
        res.write(fs.readFileSync(filePathname, "utf8"))
        res.end()
        return true
    } else {
        return false
    }
}
```

