---
title: APIDOC
date: 2024-03-04
categories: 
 - Backend
---

## APIDOC - API 文档生成工具

apidoc 是一个简单的 RESTful API 文档生成工具，它从代码注释中提取特定格式的内容生成文档。支持诸如 Go、Java、C++、Rust 等大部分开发语言，具体可使用 `apidoc lang` 命令行查看所有的支持列表。

apidoc 拥有以下特点：

1. 跨平台，linux、windows、macOS 等都支持；
2. 支持语言广泛，即使是不支持，也很方便扩展；
3. 支持多个不同语言的多个项目生成一份文档；
4. 输出模板可自定义；
5. 根据文档生成 mock 数据；

```yml
npm install -g apidoc
```


![image-20220415085343339](https://blog.babade.asia/nodejs/image-20220415085343339.png)

注意：

(1) 在当前项目文件夹下 apidoc.json

```json
{
	"name": "****接口文档",
	"version": "1.0.0",
	"description": "关于****的接口文档描述",
	"title": "****"
}
```

（2）可以利用vscode apidoc snippets 插件创建api
输入api快捷键快速索引
![image-20220415085343339](https://blog.babade.asia/nodejs/apidoc.png)
