---
title: Webpack
date: 2024-05-14
sidebar: 'auto'
categories: 
 - Web
---
<!-- [[TOC]] -->


## svg-sprite-loader 加载器

> SVG Sprite Loader 是一个针对Webpack的加载器，它旨在优化SVG图标管理和注入，提供了一种高效且灵活的处理SVG的方式。
> SVG Sprite Loader 基于Webpack插件系统构建，它允许开发者将分散的SVG文件合并成一个Sprite（即精灵图），然后通过CSS引用这些图标
1. 安装
```bash
npm install --save-dev svg-sprite-loader
```
2. webpack配置
只希望指定目录下的svg文件被svg-sprite-loader处理，其他的还是使用webpack5默认的svg处理方式
```js
chainWebpack(config) {
    config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end()
        config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            symbolId: 'icon-[name]'
        })
        .end()
}
```

3. icon.js
> main.js 引入 icon.js文件，svg图标放置同层svg文件夹
```js
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
```

4. icon 组件
> 
```vue
<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    }
  }
}
</script>
```
5. 页面使用
```js
<svg-icon icon-class="top" class="Icon Icon--backToTopArrow" />
```