(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{337:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return r}));n(127);var o=n(0);function c(){const e=Object(o.d)();if(!e)throw new Error("must be called in setup");return(null==e?void 0:e.proxy)||{}}function r(){const e=Object(o.h)(!1);return Object(o.e)(()=>{e.value=!0}),Object(o.f)(()=>{e.value=!1,setTimeout(()=>{e.value=!0},100)}),{recoShowModule:e}}},339:function(e,t,n){},343:function(e,t,n){"use strict";n(339)},356:function(e,t,n){},390:function(e,t,n){"use strict";n(356)},428:function(e,t,n){"use strict";n.r(t);var o=n(0),c=n(337);const r=["There's nothing here.","How did we get here?","That's a Four-Oh-Four.","Looks like we've got some broken links."];var s=Object(o.c)({setup(e,t){const n=Object(c.a)(),s=Object(o.a)(()=>!1!==n.$themeConfig.noFoundPageByTencent);return Object(o.e)(()=>{if(s.value){const e=document.createElement("script");e.setAttribute("homePageName","回到首页"),e.setAttribute("homePageUrl",n.$site.base),e.setAttribute("src","//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js"),document.body.append(e)}}),{noFoundPageByTencent:s,getMsg:()=>r[Math.floor(Math.random()*r.length)]}}}),u=(n(343),n(390),n(2)),i=Object(u.a)(s,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.noFoundPageByTencent?e._e():n("section",{staticClass:"theme-container"},[n("article",{staticClass:"content"},[n("h1",[e._v("404")]),e._v(" "),n("blockquote",[e._v(e._s(e.getMsg()))]),e._v(" "),n("router-link",{attrs:{to:"/"}},[e._v("Take me home.")])],1)])}),[],!1,null,null,null);t.default=i.exports}}]);