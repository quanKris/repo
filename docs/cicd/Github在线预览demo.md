---
title: Github在线预览demo
date: 2024-02-19
categories: 
 - CI/CD
---
## Github 实现在线预览项目https://xxxx.github.io/xxxx/

```ts
//config.ts配置文件中，根路径要加一个xxxx项目名称，因为github服务器上默认的项目名带根目录
  "base":"/xxxx/",
```
```yml
- name: Deploy Quan
    uses: JamesIves/github-pages-deploy-action@releases/v3
    with:
      ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
      BRANCH: gh-pages
      FOLDER: dist

```
::: tip
注意是gh-pages分支，是固定的，github用来解析index.html的固定分支，要保证项目中有此分支

如果需要用到ACCESS_TOKEN的地方，去github的根settings里，点击Developer settings，勾选repo，和workflow流，生成秘钥，允许通过ssh token进行控制仓库。
:::