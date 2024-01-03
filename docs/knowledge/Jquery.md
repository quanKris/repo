---
title: Jquery
date: 2023-12-28
---
<!-- [TOC] -->

## **基础**

```js
//文档就绪事件
$(document).ready(function(){
   // 开始写 jQuery 代码...
});
$(function(){
   // 开始写 jQuery 代码...
});


$("#wholebody").removeClass();//移除class

$("p").find("span").css('color','red');//搜索所有段落中的后代 span 元素，并将其颜色设置为红色：

$("p:first").addClass("intro");//向第一个 <p> 元素添加一个类名：

$("***").parent();//返回每个 <span> 元素的直接父元素
$("***").closest(filter);// 找最近的父/祖籍元素



$("div").children("p.1");//返回类名为 "1" 的所有 <p> 元素，并且它们是 <div> 的直接子元素

$("p").next(".selected").css("background", "yellow");//查找每个段落的下一个同胞元素，仅选中类名为 "selected" 的段落



$('#****').is(':visible') == false //is( ‘:visible’) 判读元素是否可见
$("#**** input[type='checkbox']:checked") 判读单元框是否被选中
$("#**** tr:lt(5) input[type='checkbox']").prop("checked", true); 默认前五行的checkbox选中
 rowData = {}
$(this).siblings('.reviewer_info_form').find('*[name]').each () ->
              val = $(this).val()
              name = $(this).prop('name')
              rowData[name] = val
            formData.push(rowData)

$.each([52,335,344,97], function(index, value) {alert(index + ': ' + value);});//遍历数组元素

<div id="text" value="黑哒哒的盟友"><div> //jQuery取值： $("#text").attr("value");

<div id="text" data-name="黑哒哒的盟友"><div> //jQuery取值：$("#text").data("name");

JQ                                          DOM
.val()     									.value=""
.text() --->写内容是设置，没写是获取			.innerText --->获取元素中的单纯文字内容
.html()  ---> 写内容是设置，没写是获取			.innerHTMl ---> 获取元素中的标签 + 文字内容（进行拼接创建元素）
attr() - 获取指定属性的值
removeAttr() - 移除指定的属性

show() ---> 显示
hide() ---> 隐藏
slideUp() ---> 滑出
slideDown() ---> 滑入
slideToggle() ---> 切换滑入和滑出
fadeIn() ---> 淡入
fadeOut() ---> 淡出
fadeToggle() ---> 淡入淡出
fadeTo() ---> 设置在多长时间把透明度降低或设置为多少

子元素.appendTo(父级元素)
父级元素.append(子级元素)
prepend() ---> 追加到子元素的做前面
before() ---> 添加到当前元素的前面，作为兄弟元素
after() ---> 添加到当前元素后面

.html("") ---> 占空间（清空当前元素中的内容）
.empty() ---> 清空的更干净 （常用）
.remove() ---> 清空自己

indexOf() 指出对象内子字符串的开始位置。如果没有找到子字符串，则返回  -1
find()  ---> 查找某个元素
siblings ---> 获取兄弟元素
next() ---> 获取当前元素的下一个兄弟元素
nextAll() ---> 获取当前元素后面所有的兄弟元素
prev() ---> 获取当前元素的上一个兄弟元素
prevAll() ---> 获取当前元素前面所有的兄弟元素

$("标签名:eq("+this.index()+")")
.eq($(this).index())
$(this).index() --->获取当前元素的索引
$.each(info,function(index,element){})--->循环（隐式迭代）								







JQ转DOM
var $cr = $("p");   //jquery对象
var cr = $cr[1];    //dom对象
var ct = $cr.get(0)   //第二种转换为DOM对象的方式
cr.innerHTML = "you"    //检测是否转换成功，可以用DOM方法 输出结果为第二个my改成了you
ct.innerHTML = 'fuck'   //输出结果第一个my改成了fuck
DOM转JQ
var cr = document.getElementsByTagName("p")  //DOM对象
var $cr = $(cr);     //jquery对象
$cr.eq(0).html("fuck");  //检测是否转换成功，可以用jquery方法 输出结果为第二个my改成了fuck
$cr.eq(1).html("you"); //输出结果为my改成you


1、后代选择器
示例：$("p span") 选取<p>元素里的所有的<span>元素（注：后代选择器选择父元素所有指定选择的元素，不管是儿子级，还是孙子级）

2、子选择器 $("parent>child")
示例：$("p>span") 选择<p>元素下的所有<span>元素 （注：子选择器只选择直属于父元素的子元素）

3、同辈选择器 $("prev+next")
描述：选取紧接在prev元素后的next元素，返回元素集合 $(".one+p") 选取class为one的下一个<p>同辈元素集合

4、同辈选择器 $("prev~siblings")
描述：选取prev元素后的所有siblings元素，返回元素集合  $("#two~p")选取id为two的元素后所有<p>同辈元素集合

jquery:
	$.fn === $.prototype = jQuery.prototype
	$.fn.kerwin = function(){this.attr("name","kerwin"); return this}

	$(".box").kerwin().css().kerwin()

	$.extend({
		kerwin:function(){

		}
	})

	$.kerwin();

	prop vs attr?

	$(".box").prop("disbaled"，true)
	$(".box").attr("myname",2222)

//通配符
$("input[id^='code']");//id属性以code开始的所有input标签
$("input[id$='code']");//id属性以code结束的所有input标签
$("input[id*='code']");//id属性包含code的所有input标签
$("input[name^='code']");//name属性以code开始的所有input标签
$("input[name$='code']");//name属性以code结束的所有input标签
$("input[name*='code']");//name属性包含code的所有input标签

```

## **jq拖拽**

```js
$(document).on('mousedown', '.titleInfoPopuph', function (e) {
    var $d = $(this).parents('.titleInfoPopup').addClass('feedback-draggable'),
        drag_h = $d.outerHeight(),
        drag_w = $d.outerWidth(),
        pos_y = $d.offset().top + drag_h - e.pageY,
        pos_x = $d.offset().left + drag_w - e.pageX;
    $d.css('z-index', 40000).parents().on('mousemove', function (e) {
        _top = e.pageY + pos_y - drag_h;
        _left = e.pageX + pos_x - drag_w;
        _bottom = drag_h - e.pageY;
        _right = drag_w - e.pageX;

        if (_left < 0) _left = 0;
        if (_top < 0) _top = 0;
        if (_right > $(window).width())
            _left = $(window).width() - drag_w;
        if (_left > $(window).width() - drag_w)
            _left = $(window).width() - drag_w;
        if (_bottom > $(document).height())
            _top = $(document).height() - drag_h;
        if (_top > $(document).height() - drag_h)
            _top = $(document).height() - drag_h;

        $('.feedback-draggable').offset({
            top: _top,
            left: _left
        }).on("mouseup", function () {
            $(this).removeClass('feedback-draggable');
        });
    });
    e.preventDefault();
}).on('mouseup', function () {
    $(this).parents('.titleInfoPopup').removeClass('feedback-draggable');
    $(this).parents().off('mousemove mousedown');
});
```

api文档

```js
{
    code:200,
    data:[
        {
            time:"2022-06-13 14:00:22",
            title:"susy-updates-version-2012323",
            markbook:true,
            mark_read:true
        }
    ]
}
```



## **Base64 转码**

```js
uploadId () {
                var data = this.$refs.uploadId.files[0]
                this.getBase64(data).then(res => {
                    this.idCard = res
                })
            }, 
            getBase64 (file) {
                return new Promise(function (resolve, reject) {
                    var reader = new FileReader()
                    var imgResult = ''
                    reader.readAsDataURL(file)
                    reader.onload = function () {
                        imgResult = reader.result
                    }
                    reader.onerror = function (error) {
                        reject(error)
                    }
                    reader.onloadend = function () {
                        resolve(imgResult)
                    }
                })
            },
```

## **formData**格式数据转换

```js

export function logOutForm() {
  // return request({
  //   url: window.location.origin + '/user/logout',
  //   method: 'post',
  //   data,
  //   transformRequest: [
  //     function(data) {
  //       return stringify(data)
  //     }
  //   ],
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   }
  // })
  return request({
    url: window.location.origin + '/user/logout', // http://deployment.susy.mdpi.test/
    method: 'get'
  })
}
// function stringify(data) {
//   const formData = new FormData()
//   for (const key in data) {
//     // eslint-disable-next-line no-prototype-builtins
//     if (data.hasOwnProperty(key)) {
//       if (data[key]) {
//         if (data[key].constructor === Array) {
//           if (data[key][0]) {
//             if (data[key][0].constructor === Object) {
//               formData.append(key, JSON.stringify(data[key]))
//             } else {
//               data[key].forEach((item, index) => {
//                 formData.append(key + `[${index}]`, item)
//               })
//             }
//           } else {
//             formData.append(key + '[]', '')
//           }
//         } else if (data[key].constructor === Object) {
//           formData.append(key, JSON.stringify(data[key]))
//         } else {
//           formData.append(key, data[key])
//         }
//       } else {
//         if (data[key] === 0) {
//           formData.append(key, 0)
//         } else {
//           formData.append(key, '')
//         }
//       }
//     }
//   }
//   return formData
// }

```

## **JSON转表单格式**

```js
// json转表单格式
baseFormdataify(params) {
  const formData = new FormData()
  Object.keys(params).forEach((i) => {
    if (typeof params[i] == 'string') {
      formData.append(i, params[i])
    } else {
      formData.append(i, JSON.stringify(params[i]))
    }
  })
  return formData
}
```



## **表格自适应代码（高度）**

```js
// this.$nextTick(() => {
    //   this.tableH = window.innerHeight - this.$refs.tabless.$el.offsetTop - 169
    //   const self = this
    //   window.onresize = function() {
    //     self.tableH =
    //       window.innerHeight - self.$refs.tabless.$el.offsetTop - 169
    //   }
    // })
```

## **封装dialog弹窗，内含checkbox**

```twig
//触发弹窗页面 引入弹窗组件，传值，title， checkbox值，path
{% include "Components/checkbox_popup.html.twig" with {'title': 'Export', 'options': checkbox_list,'path': export_proofread_manuscript_path(status, show_type) ~ '?' ~ query_string} %}

//弹窗组件
<div id="checkbox_popup" class="hide" title="{{title}}">
    <div class="checkbox-popup-container">
        <div class="checkbox-group">
            <div class="checkbox-box">
                <input type="checkbox" name="select-all" id="select-all">
                <label for="select-all">Select All</label>
            </div>
            {% for option in options %}
                <div class="checkbox-box">
                    <input type="checkbox" name="checkbox" value="{{option.key}}" id="checkbox_{{option.key}}">
                    <label for="checkbox_{{option.key}}">{{option.value}}</label>
                </div>
            {% endfor %}
        </div>
        <button class="submit-btn margin-top-1" data-path="{{path}}" data-reload="{{reload}}">Submit</button>
    </div>
</div>

//js部分
$(function () {
  $('#checkbox_popup').dialog({
    modal: true,
    autoOpen: false,
    width: 400,
    height: 300,
    resizable: true
  })

  $('body').on('click', '.display-checkbox-popup', function () {
    $('#checkbox_popup').removeClass('hide')
    $('#checkbox_popup').dialog('open');
    $('#checkbox_popup input[type="checkbox"]').prop('checked', false);
  })

  $('body').on('click', '#checkbox_popup #select-all', function () {
     $('#checkbox_popup input[type="checkbox"][name="checkbox"]').prop('checked', this.checked);
  });

  $('body').on('click', '#checkbox_popup input[type="checkbox"][name="checkbox"]', function () {
    if ($('input[type="checkbox"][name="checkbox"]:checked').length == 	                 	   $('input[type="checkbox"][name="checkbox"]').length) {  $('#select-            all').prop('checked', true);
    } else {
      $('#select-all').prop('checked', false);
    }
  });

  $('body').on('click', '#checkbox_popup .submit-btn', function () {
    let selected = [];
    $('#checkbox_popup input[type="checkbox"][name="checkbox"]:checked').each(function ()   {
      selected.push($(this).val());
    });
    if (selected.length === 0) {
      $.alertError('Please select!')
      return;
    }
    const url = $(this).data('path')
    const reload = $(this).data('reload')
    submitData(url, { selected }, reload)
  })

  function submitData(url, data, reload) {
    $('#checkbox_popup').dialog('close');
    if (reload) {
      window.location.reload()
    }
    $.blockUI({
      message: `<p class='margin-1'>${SusyConfig.image.loading} Loading ...</p>`
    })
    $.ajax({
      url,
      data: data,
      type: 'POST'
    }).done(function ({ status, message }) {
      if (status == "success") {
        $('#checkbox_popup').dialog('close');
        if (reload) {
          window.location.reload()
        }
        if (message) {
          $.alertSuccess(message)
        }
      }
    }).always(function () {
      return $.unblockUI()
    })
  }
});

```

## **form序列化表单数据**

```js
$('#payment-account').submit(function(e) { //表单提交默认事件
        e.preventDefault();
        $.post(
            $(this).attr('action'),
            $(this).serialize(),
            function(data) {
                if (data.success == 'ok') {
                    window.location.reload();
                } else if (data.success == 'failed') {
                    $.alert(data.message);
                } else {
                    dialog.html(data);
                    submitEventBind(dialog);
                }
            }
        );
    });
```

## **内置loading效果**

```js
//coffee.js
if $('#ebm-invitation-form').length > 0
    $('#ebm_pending_check_btn').on 'click', (e) ->
      e.preventDefault()
      check_btn = $(this)
      check_btn.after(SusyConfig.image.loading)
      check_btn.prop('disabled', true)
      url = check_btn.data('check-url')
      data = {}
      $('#ebm-invitation-form').find('input[name], select[name]').each ->
        data[$(this).prop('name')] = $(this).val()
      $.ajax(
        url: url,
        data: data,
        type: 'GET',
      ).done (res) ->
        check_btn.hide()
        $('#ebm_pending_check_section').html(res).show()
      .fail ->
        $.alertError('Check failed!')
      .always ->
        check_btn.next('img').remove()
        check_btn.prop('disabled', false)
    $('#ebm-invitation-form').on 'click', '.cancel-btn', (e) ->
      e.preventDefault()
      $('#ebm_pending_check_section').html('').hide()
      $('#ebm_pending_check_btn').show()
```

## **Twig Block域的用法**

```twig
{% block susy_js_config %}
    <script>
        SusyConfig.url.user_myprofile_path ='{{ user_myprofile_path() }}';
        SusyConfig.url.myprofile_get_articles_path = "{{ ajax_myprofile_articles_path('')|replace({'//': '/'}) }}" ;
        SusyConfig.url.allow_external_editor = '{{ ajax_allow_external_editor_path() }}';
        SusyConfig.url.allow_guest_editor = '{{ ajax_allow_guest_editor_path() }}';
        SusyConfig.eic_cansee = "EiC can see this manuscript";
        SusyConfig.ge_cansee = "GEs can see this manuscript";
        SusyConfig.eic_cannotsee = "EiC can not see this manuscript";
        SusyConfig.ge_cannotsee = "GEs can not see this manuscript";
        SusyConfig.image.locked = '{{ asset('bundles/mdpisusy/img/icon/lock.png') }}';
        SusyConfig.image.unlock = '{{ asset('bundles/mdpisusy/img/icon/lock-unlock.png') }}';
        SusyConfig.image.ge_locked = '{{ asset('bundles/mdpisusy/img/icon/ge-lock.png') }}';
        SusyConfig.image.ge_unlock = '{{ asset('bundles/mdpisusy/img/icon/ge-lock-unlock.png') }}';
    </script>
{% endblock %}

//base.html.twig 文件中放置好了插槽
{% block susy_js_config %}{% endblock %}


任意JS中可应用block域内的变量，使用前if $('#myprofile').length > 0，记得做限制。
```

