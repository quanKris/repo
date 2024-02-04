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
citys = os.environ["CITY"].split(',')



# 当前城市、日期
def get_city_date(city):
    return city, today.date().strftime("%Y-%m-%d %H:%M:%S")


# 字体随机颜色
def get_random_color():
    return "#%06x" % random.randint(0, 0xFFFFFF)


client = WeChatClient(app_id, app_secret)
wm = WeChatMessage(client)

for i in range(len(user_ids)):
    cit, dat_time  = get_city_date(citys[i])
    data = {
        "date": {"value": "当前时间：{}".format(dat_time), "color": get_random_color()},
        "city": {"value": "当前城市：{}".format(cit), "color": get_random_color()},
        "words": {"value": get_words(), "color": get_random_color()},
        "version":{"value": "1.0.0", "color": get_random_color()},
    }
    res = wm.send_template(user_ids[i], template_ids[i], data)
    print(res)