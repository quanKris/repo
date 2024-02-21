---
title: Vite
date: 2024-02-21
categories: 
 - Web
---
<!-- [[TOC]] -->

## 基本配置   <a href="https://cn.vitejs.dev/" target="_blank">Vite 中文文档</a>


```js
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
    // 根据当前工作目录中的 `mode` 加载 .env 文件
    // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
    const env = loadEnv(mode, process.cwd(), '')
    return {
        // vite 配置
        define: {
        __APP_ENV__: JSON.stringify(env.APP_ENV),
        },
    }
})

// {
//   mode: 'staging',  模式一般跟着"--mode staging" mode后面模式走
//   command: 'build', 编译还是打包 ["serve","build"]
//   isSsrBuild: false,
//   isPreview: false
// }
```

## 参数

::: tip root
类型： string 

默认： process.cwd() 

项目根目录（index.html 文件所在的位置）。可以是一个绝对路径，或者一个相对于该配置文件本身的相对路径。
:::


::: tip base
类型： string

默认： /

相关： server.origin

开发或生产环境服务的公共基础路径。合法的值包括以下几种：
绝对 URL 路径名，例如 /foo/
完整的 URL，例如 https://foo.com/（原始的部分在开发环境中不会被使用）
空字符串或 ./（用于嵌入形式的开发）
:::

::: tip mode
类型： string

默认： 'development' 用于开发，'production' 用于构建

在配置中指明将会把 serve 和 build 时的模式 都 覆盖掉。也可以通过命令行 --mode 选项来重写。

查看 环境变量与模式 章节获取更多细节。
:::

::: tip define
类型： Record<string, any>

定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。

Vite 使用 esbuild define 来进行替换，因此值的表达式必须是一个包含 JSON 可序列化值（null、boolean、number、string、array 或 object）或单一标识符的字符串。对于非字符串值，Vite 将自动使用 JSON.stringify 将其转换为字符串。
```js
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify('v1.0.0'),
    __API_URL__: 'window.__backend_api_url',
  },
})
```
:::

::: tip plugins
类型： (Plugin | Plugin[] | Promise<Plugin | Plugin[]>)[]

需要用到的插件数组。Falsy 虚值的插件将被忽略，插件数组将被扁平化（flatten）。查看 <a href="https://cn.vitejs.dev/guide/api-plugin" target="_blank">插件</a> API 获取 Vite 插件的更多细节。
:::

::: tip publicDir
类型： string | false

默认： "public"

作为静态资源服务的文件夹。该目录中的文件在开发期间在 / 处提供，并在构建期间复制到 outDir 的根目录，并且始终按原样提供或复制而无需进行转换。该值可以是文件系统的绝对路径，也可以是相对于项目根目录的相对路径。

将 publicDir 设定为 false 可以关闭此项功能。

欲了解更多，请参阅 public 目录。
:::

::: tip resolve.alias
类型：Record<string, string> | Array<{ find: string | RegExp, replacement: string, customResolver?: ResolverFunction | ResolverObject }>

将会被传递到 @rollup/plugin-alias 作为 entries 的选项。也可以是一个对象，或一个 { find, replacement, customResolver } 的数组。

当使用文件系统路径的别名时，请始终使用绝对路径。相对路径的别名值会原封不动地被使用，因此无法被正常解析。

更高级的自定义解析方法可以通过 插件 实现。
:::

