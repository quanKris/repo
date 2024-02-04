---
title: 微信公众号同步action反馈
date: 2024-02-04
categories: 
 - CI/CD
---

## yml流新增脚本
::: tip
通过./requirements.txt && python ./main.py 这两个文件配置，进行公众号信息的同步和发送
secrets.APP_SECRET 这种秘钥同理，github actions 配置
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
      *****
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
          last_ssh: |
            echo $LASTSSH 
            nginx -t
            nginx -s reload
      - run: pip install -r ./requirements.txt && python ./main.py
      env:
          APP_ID: ${{ secrets.APP_ID }}
          APP_SECRET: ${{ secrets.APP_SECRET }}
          USER_ID: ${{ secrets.USER_ID }}
          TEMPLATE_ID: ${{ secrets.TEMPLATE_ID }}
          CITY: ${{ secrets.CITY }}
      # Add your subsequent steps here

```

## main.py 文件
::: tip
此处为python脚本，主要是为微信公众号的模板提供变量
:::
```python
import os
import math
import random
import requests

from datetime import date, datetime
from wechatpy import WeChatClient
from wechatpy.client.api import WeChatMessage, WeChatTemplate

today = datetime.now()

# 微信公众测试号ID和SECRET
app_id = os.environ["APP_ID"]
app_secret = os.environ["APP_SECRET"]

# 可把os.environ结果替换成字符串在本地调试
user_ids = os.environ["USER_ID"].split(',')
template_ids = os.environ["TEMPLATE_ID"].split(',')



# 当前城市、日期
def get_city_date():
    return today.date().strftime("%Y-%m-%d %H:%M:%S")


# 字体随机颜色
def get_random_color():
    return "#%06x" % random.randint(0, 0xFFFFFF)


client = WeChatClient(app_id, app_secret)
wm = WeChatMessage(client)

for i in range(len(user_ids)):
    dat_time  = get_city_date()
    data = {
        "date": {"value": "当前时间：{}".format(dat_time), "color": get_random_color()},
        "city": {"value": "当前城市：大连 中国", "color": get_random_color()},
        "version":{"value": "1.0.0", "color": get_random_color()},
    }
    res = wm.send_template(user_ids[i], template_ids[0], data)
    print(res)
```

## requirements.txt文件

```txt
certifi==2022.6.15
cffi==1.15.1
charset-normalizer==2.1.0
cryptography==37.0.4
idna==3.3
optionaldict==0.1.2
pycparser==2.21
python-dateutil==2.8.2
requests==2.28.1
six==1.16.0
urllib3==1.26.11
wechatpy==1.8.18
xmltodict==0.13.0
```

微信公众号的测试平台，无需申请公众账号、可在测试账号中体验并测试微信公众平台所有高级接口。
> <a href="https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index" target="_blank">微信公众号测试平台</a>


微信公众号平台。
> <a href="https://mp.weixin.qq.com/cgi-bin/frame?t=advanced/dev_tools_frame&nav=10049&token=1372366963&lang=zh_CN" target="_blank">微信公众号平台</a>