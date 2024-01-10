---
title: Git
date: 2020-05-29
categories: 
 - Git
---

<!-- [[TOC]] -->

```js
svn 集中式代码管理 不能再离线的情况下使用 svn。如果服务器出现问题，就没有办法使用 svn 来提交代码。
git 分布式代码管理
(1)git pull (同步，更新代码) => git fetch + git merge
(2)git add . 暂存区
(3)git commit 提交到本地仓库。
(4)git remote add origin https:.......  配置git连接远程仓库路径
(5)git push origin master:kerwin
(6)git push origin -d yuan     删除远端yuan 分支
(7)$ git push origin Dev-special  把本地分支推送到远程
(8)$ git push origin :Dev-special  删除远程分支
(9)$ git push --set-upstream origin xxxxxx   origin 是默认的远程版本库名称 给远程仓库添加分支
git remote prune origin  同步远程分支，同步远程已删除分支

git clone 克隆代码 克隆者不用再次连接远程地址，自动有。
git pull origin master 更新合并其他人代码的时候，留注释，按esc ：wq
git checkout -b dev  创建一个叫dev的分支，-b创建，不带-b切分支

重置暂存区与工作区，与上一次commit保持一致
$ git reset --hard

重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
$ git reset [commit]

重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git reset --hard [commit]

重置当前HEAD为指定commit，但保持暂存区和工作区不变
$ git reset --keep [commit]

暂时将未提交的变化移除，稍后再移入
$ git stash
$ git pull
$ git stash pop

git merge dev 讲dev分支代码迁移至主分支
git rebase  把自己当前分支提前到

git branch -a 查看所有分支
git branch -d dev  删除本地dev分支
git branch -M main  Git会将默认分支重命名为”main”, 如果之前没有名为”main”的分支，将创建该分支

本地仓库推到github上仓库的全过程
git init
git add .
git commit -m "备注信息"
git remote add origin 你的远程仓库地址
git push -u origin master  是--set-upstream 的缩写

代码冲突怎么解决？
两个人修改同一个文件造成

a.js 111111 => github(gitlab, gitee)
a.js 222222 =>失败，提示git pull ,自动合并失败。

手动合并(借助可视化工具 ，小乌龟)
>>>>>>>>>>>>>head>>>>>>>>>>>>>

>>>>>>>>>>>43fdea4wadwad>>>>>>>>
git add. git commit git push 远程仓库就是合并完的代码

git reset
git revert 生成一个新的log记录

Git从码云Gitee下载项目重复输入帐号和密码，永久记住账号密码方法
git config --global credential.helper store
去重新下载，第一次输入帐号密码，之后再下载就不会出现了

git tag : 直接列出所有的标签
git tag -l xxxx : 可以根据 xxxx 进行标签的筛选
git tag -d 标签名称 : 删除指定名称的标签

轻量标签
git tag 标签名 ： 直接给当前的提交版本创建一个【轻量标签】
git tag 标签名 提交版本号 ：给指定的提交版本创建一个 【轻量标签】
$ git tag 标签名
$ git tag 标签名 提交版本
附注标签
-a : 理解为 annotated 的首字符，表示 附注标签
-m : 指定附注信息
git tag -a 标签名称 -m 附注信息 ：直接给当前的提交版本创建一个 【附注标签】
git tag -a 标签名称 提交版本号 -m 附注信息 ：给指定的提交版本创建一个【附注标签】

//两个命令都是删除远程仓库中的 指定标签
$ git push origin  :regs/tags/标签名称
$ git push origin --delete 标签名称


git push origin 标签名称 : 将指定的标签上传到远程仓库
git push origin --tags : 将所有不在远程仓库中的标签上传到远程仓库
```
