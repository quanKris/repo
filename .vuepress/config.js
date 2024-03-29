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
            "text": "Web",
            "link": "/docs/web/HTML"
          },
          {
            "text": "Backend",
            "link": "/docs/backend/Node.js"
          },
          {
            "text": "CI/CD",
            "link": "/docs/cicd/Git常用命令"
          },
          {
            "text": "Link",
            "link": "/docs/link/link"
          },
          {
            "text": "Project",
            "link": "/docs/project/loginRegister"
          }
        ]
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/quanKris/repo",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "sidebar": {
      "/docs/web/": [
        "HTML",
        "CSS",
        "JavaScript",
        "Jquery",
        "轮子",
        "ES6",
        "前端工程化工具",
        "VUE",
        "vue3",
        "Vite",
        "辞海",
        "小程序开发",
        "Vuepress语法",
      ],
      "/docs/backend/": [
        "Node.js",
        "Express",
        "MongoDB",
        "Mysql",
        "接口规范",
        "登录授权",
        "文件上传",
        "Apidoc",
        "Koa2"
      ],
      "/docs/cicd/": [
        "Git常用命令",
        "GithubActions",
        "钉钉&公众号发送信息",
        "Github在线预览demo"
      ],
      "/docs/link/": [
        // "",
        "link",
      ],
      "/docs/project/": [
        // "",
        "loginRegister",
        "server",
        "前后端部署",
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
        "link": "https://github.com/quanKris/repo"
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
    "record": "辽ICP备2024018226号",
    "recordLink": 'https://beian.miit.gov.cn/#/Integrated/index',
    "startYear": "2023",
    "subSidebar": 'auto'
  },
  "markdown": {
    "lineNumbers": true
  },
//   "plugins": [
//     [
//       '@vuepress-reco/vuepress-plugin-kan-ban-niang',{
//         theme: [
//           'shizuku', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'miku', 'wanko', 'blackCat', 'z16'
//         ],
//         clean: false,
//         messages: { 
//           welcome: '欢迎来到我的博客', home: '...', theme: '好吧，希望你能喜欢我的其他小伙伴。', close: '你不喜欢我了吗？痴痴地望着你。' 
//         },
//         messageStyle: { right: '68px', bottom: '290px' },
//         width: 200,
//         height: 270
//       }
//     ],
//   ],
}