module.exports = {
  "title": "quan",
  "description": "",
  "dest": "dist",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "type": "blog",
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "Docs",
        "icon": "reco-message",
        "items": [
          {
            "text": "vuepress-reco",
            "link": "/docs/theme-reco/"
          },
          {
            "text": "都是芝士啊",
            "link": "/docs/knowledge/"
          },
          {
            "text": "Link",
            "link": "/docs/link/"
          }
        ]
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://gitee.com/yuan19980925/reco-blog",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "sidebar": {
      "/docs/theme-reco/": [
        "",
        "theme",
        "plugin",
        "api"
      ],
      "/docs/knowledge/": [
        "",
        "HTML",
        "CSS",
        "JavaScript",
        "Jquery",
        "ES6",
        "前端工程化工具",
        "VUE",
        "辞海",
        "小程序开发",
        "Git常用命令",
        "Node.js",
        "Vuepress语法",
        "GithubActions"
      ],
      "/docs/link/": [
        "",
        "link",
      ],
    },
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    "friendLink": [
      {
        "title": "协同开发,加入我",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "320356500@qq.com",
        "link": "https://gitee.com/yuan19980925/reco-blog"
      },
      {
        "title": "vuepress-theme-reco技术支持",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/logo.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "",
    "authorAvatar": "/avatar.png",
    "record": "xxxx",
    "startYear": "2023",
    "subSidebar": 'auto'
  },
  "markdown": {
    "lineNumbers": true
  },
  "plugins": [
    [
      '@vuepress-reco/vuepress-plugin-kan-ban-niang',{
        theme: [
          'shizuku', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'miku', 'wanko', 'blackCat', 'z16'
        ],
        clean: false,
        messages: { 
          welcome: '欢迎来到我的博客', home: '...', theme: '好吧，希望你能喜欢我的其他小伙伴。', close: '你不喜欢我了吗？痴痴地望着你。' 
        },
        messageStyle: { right: '68px', bottom: '290px' },
        width: 200,
        height: 270
      }
    ],
  ],
}