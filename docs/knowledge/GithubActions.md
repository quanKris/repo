---
title: Github Actions
date: 2024-01-04
---
<!-- [TOC] -->

## 准备工作 

Linux服务器应该不需要准备什么，
windows服务器 ：
设置->应用和功能->可选功能->OpenSSH启动->OpenSSH服务：

```
sc start sshd
```

可选：将OpenSSH服务设置成自动启动：

```
sc config sshd start=auto
```

可选：防火墙 22端口放开

C:\Program Files\Git\etc\ssh\sshd_config  文件，git外部登录选项放开

```
#PubkeyAuthentication yes
#PermiRootLogin yes
#StrictModes yes
```

## 初始化流

项目根目录初始化github的workflow流，以yml结尾就可，文件结构固定。

![github](http://43.142.54.214/workflow/github.png)

## 流的详细配置

::: tip
详细配置的坑已基本踩完，大致分为两种，linux和windows的不同配置，导致的actions插件的内部命令执行时的报错，这里推荐用linux虚拟机构建流，npm下载时的镜像随你本身项目可执行的配置走，流程大致如下：
:::

- checkout 当前分支，拉取代码
- 项目编译，打包
- 将生成的dist包压缩，生成dist.tgz
- 检查打包后的项目结构明细
- SSH远程连接到服务器  scp同步文件  
- 进到windows服务器中，指定发布目录解压包，删除包。
- 愿意写点什么就写点什么吧

::: warning
结尾的命令注意是在windows中的，要换成windows命令
:::

```yml
name: Static Blog

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@master

      - name: Build
        uses: actions/setup-node@master
      - run: npm install --registry=https://registry.npm.taobao.org
      - run: npm run build

      - name: Package Dist
        run: tar -zcvf dist.tgz -C $GITHUB_WORKSPACE/dist .

      - name: Display Contents
        run: ls -R
        
      - name: scp ssh pipelines
        uses: cross-the-world/ssh-scp-ssh-pipelines@latest
        env:
          LASTSSH: "Doing something after copying"
        with:
          host: ${{ secrets.SERVER_IP }}
          user: 'Administrator'
          pass: ${{ secrets.SERVER_PASSWORD }}
          scp: |
            ./dist.tgz => /nginx-1.25.3/html/dist
          last_ssh: |   #  注意此处为windows操作语言
            cd C:/nginx-1.25.3/html/dist
            tar -xf dist.tgz
            del dist.tgz
          # last_ssh: |
          #   echo $LASTSSH 
          #   nginx -t
          #   nginx -s reload
      # Add your subsequent steps here

```

## Github秘钥配置

::: tip 安全考虑
secrets.SERVER_IP 配置中的key默认采用大写形式，在github中如下位置进行配置字段，yml流中自由取用。
如果需要用到ACCESS_TOKEN的地方，去github的根settings里，点击Developer settings，勾选repo，和workflow流，生成秘钥，允许通过ssh token进行控制仓库。本项目用的账号密码直接登录的，没用ssh接管。
:::

![secrets](http://43.142.54.214/workflow/secrets.png)





## 编译过程&结果

::: tip 成功
正常配置下来，不会有报错，用某些actions插件的时候，可能会报一些安全的问题，在打包前可以加一下这句。
:::

```json
 "build": "export NODE_OPTIONS=--openssl-legacy-provider && vuepress build ."
```

::: danger 失败
有报红的步骤，具体原因具体分析，大多数都是actions插件没玩明白的原因，或者服务器ssh登录不上。
:::

![workflow](http://43.142.54.214/workflow/workflow.png)
