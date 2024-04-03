---
title: 域名解析
date: 2024-03-26
categories: 
 - Project
---


## 1.服务器域名解析
<p><a HREF="https://console.cloud.tencent.com/ssl?filterstatus=issued">服务器域名解析</a></p>
<img src="https://blog.babade.asia/server/0eeea60dc24a77411393844beb2553d.png" alt="0eeea60dc24a77411393844beb2553d"/>

## 2.申请ssl证书
<p><a HREF="https://console.cloud.tencent.com/ssl?filterstatus=issued">申请证书</a></p>
<img src="https://blog.babade.asia/server/332795015888db02b6b2476baed0846.png" alt="332795015888db02b6b2476baed0846"/>

## 3.域名解析
找到根域名，点击解析
<p><a HREF="https://console.cloud.tencent.com/cns">申请证书</a></p>
![d9f90121bb356f08c098fd144883bb3](https://blog.babade.asia/server/d9f90121bb356f08c098fd144883bb3.png)


## 4.添加一级/二级域名解析
申请ssl证书的时候加入解析和真实的域名解析，两条，申请的解析可以等证书签发下来后期删掉。
![589cdcd9a2e41204511af42725727ae](https://blog.babade.asia/server/589cdcd9a2e41204511af42725727ae.png)

## 5.Nginx配置
证书下载到目录，配置nginx，配置域名，监听443端口，开启ssl
![ea576dd89f2f658a2ed1101728258c3](https://blog.babade.asia/server/ea576dd89f2f658a2ed1101728258c3.png)
