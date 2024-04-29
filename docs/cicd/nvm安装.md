---
title: nvm安装
date: 2024-04-29
categories: 
 - CI/CD
---
<!-- [TOC] -->

## NVM下载 

<p><a href="https://github.com/coreybutler/nvm-windows/releases" target="_blank">nvm链接</a>
</p>

```bash
nvm -v
nvm ls
nvm list available
nvm install 版本号 
nvm use 版本号

node-v 检查版本
```
## NVM安装 
注意，配置环境变量的时候，最好安装就指定其他盘，防止c盘溢出
如果后迁移，需要更改环境变量，nvm是包存放的位置，nodejs是执行项，文件夹都要保证存在
![49ba753ebdd26a99f25603485a903d6](https://blog.babade.asia/nodejs/49ba753ebdd26a99f25603485a903d6.png)

## settings.txt
国内镜像，加速
```bash
node_mirror: http://npmmirror.com/mirrors/node/
npm_mirror: http://registry.npmmirror.com/mirrors/npm/
```

## 文档原链接
<p><a href="https://blog.csdn.net/qq_22182989/article/details/125387145" target="_blank">文档源链接</a>
</p>

