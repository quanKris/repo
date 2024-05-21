---
title: Typescript
date: 2024-05-14
sidebar: 'auto'
categories: 
 - Web
---
<!-- [[TOC]] -->


TypeScript 声明模块并扩展 vue-router 的 RouteMeta 接口
```ts
declare module 'vue-router' {
	interface RouteMeta {
		title?: string;
		isLink?: string;
		isHide?: boolean;
		isKeepAlive?: boolean;
		isAffix?: boolean;
		isIframe?: boolean;
		roles?: string[];
		icon?: string;
	}
}
```