---
title: GithubActions自动部署流
date: 2023-12-28
---
<!-- [TOC] -->



## 准备工作 

Linux服务器应该不需要准备什么，
windows服务器 ：
1.设置->应用和功能->可选功能->OpenSSH启动->OpenSSH服务：

```
sc start sshd
```

可选：将OpenSSH服务设置成自动启动：

```
sc config sshd start=auto
```

2.防火墙 22端口放开

C:\Program Files\Git\etc\ssh\sshd_config  文件，git外部登录选项放开

```
#PubkeyAuthentication yes
#PermiRootLogin yes
#StrictModes yes
```

## 初始化流

项目根目录初始化github的workflow流

![](D:\phpstudy_pro\WWW\repo\.vuepress\public\github.png)



以yml结尾就可，文件结构固定。

## 流的详细配置

```yml
name: Static Blog

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest  //windows-2019可选，某些配置需要变
    steps:
      - name: Checkout
        uses: actions/checkout@master

      - name: Build
        uses: actions/setup-node@master
      - run: npm install --registry=https://registry.npm.taobao.org //随项目走，不同项目可用不同镜像
      - run: npm run build

      - name: Package Dist
        run: tar -zcvf release.tgz -C $GITHUB_WORKSPACE/dist . //打包

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
            ./dist/* => /nginx-1.25.3/html/dist
          # last_ssh: |
          #   echo $LASTSSH 
          #   nginx -t
          #   nginx -s reload

      # Add your subsequent steps here

```

## Github秘钥配置

${{ secrets.SERVER_IP }}
采用大写形式，在github中如下位置进行配置字段，yml流中自由取用。

![](D:\phpstudy_pro\WWW\repo\.vuepress\public\secrets.png)



如果需要用到ACCESS_TOKEN的地方，去github的根settings里，点击Developer settings，勾选repo，和workflow流，生成秘钥，允许通过token进行控制仓库。本项目中未用到。

## 编译过程&结果

正常配置下来，不会有报错，用某些actions插件的时候，可能会报一些安全的问题，在打包前可以加一下这句。

```json
 "build": "export NODE_OPTIONS=--openssl-legacy-provider && vuepress build ."
```

![](D:\phpstudy_pro\WWW\repo\.vuepress\public\workflow.png)