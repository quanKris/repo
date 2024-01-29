---
title: VUE3
date: 2024-01-05
categories: 
 - Web
---
<!-- [TOC] -->

## **v-if 与 v-for 的优先级对比**
2.x 版本中  v-for > v-if
3.x 版本中  v-if  > v-for

## **v-for 的数组**
```js
//vue2.x 会自动把ref填充内容
//vue3.x 需要手动添加
	<ul>
      <li v-for='item in 5' :key='item' :ref="setItemRef">
        {{ item }}
      </li>
    </ul>

    methods:{
    	setItemRef(el){
    		this.arr.push( el );
    	}
	}
```

## $children 已被移除

## 组合式 API

- `Vue2`的`API`设计是`Options`（配置）风格的。
- `Vue3`的`API`设计是`Composition`（组合）风格的。

###  Options API 的弊端

`Options`类型的 `API`，数据、方法、计算属性等，是分散在：`data`、`methods`、`computed`中的，若想新增或者修改一个需求，就需要分别修改：`data`、`methods`、`computed`，不便于维护和复用。
### Composition API 的优势

可以用函数的方式，更加优雅的组织代码，让相关功能的代码更加有序的组织在一起。

```js
setup(){
    console.log(this) //setup中的this是undefined，Vue3在弱化this了
    // 数据，原来是写在data中的，此时的name、age、tel都不是响应式的数据
    let name = '张三'
    let age = 18
    let tel = '13888888888'
        
    // 方法
    function changeName() {
      name = 'zhang-san' //注意：这样修改name，页面是没有变化的
      console.log(name) //name确实改了，但name不是响应式的
    }
    function changeAge() {
      age += 1 //注意：这样修改age，页面是没有变化的
      console.log(age) //age确实改了，但age不是响应式的
    }
    function showTel() {
      alert(tel)
    }
    
    // 将数据、方法交出去，模板中才可以使用
    return {name,age,tel,changeName,changeAge,showTel}
}
```
特点如下：

- `setup`函数返回的对象中的内容，可直接在模板中使用。
- `setup`中访问`this`是`undefined`。
- `setup`函数会在`beforeCreate`之前调用，它是“领先”所有钩子执行的。

## setup语法糖插件 ： unplugin-auto-import
```js
解决场景 ： 在组件中开发无需每次都引入 import { ref }..
1. 下载安装

	npm i unplugin-auto-import -D

2. 配置：vite.config.js中

	import AutoImport from 'unplugin-auto-import/vite'
	export default defineConfig({
	  plugins: [
	  	AutoImport({
	  		imports:['vue','vue-router']//自动导入vue和vue-router相关函数
	  	})
	  ],
	})
```
## setup语法糖插件 ： vite-plugin-vue-setup-extend
```js
<template>
  <div class="person">
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <button @click="changName">修改名字</button>
    <button @click="changAge">年龄+1</button>
    <button @click="showTel">点我查看联系方式</button>
  </div>
</template>
 
<script lang="ts">
  export default {
    name:'Person',
  }
</script>
 
<!-- 下面的写法是setup语法糖 -->
<script setup lang="ts">
  console.log(this) //undefined
  
  // 数据（注意：此时的name、age、tel都不是响应式数据）
  let name = '张三'
  let age = 18
  let tel = '13888888888'
 
  // 方法
  function changName(){
    name = '李四'//注意：此时这么修改name页面是不变化的
  }
  function changAge(){
    console.log(age)
    age += 1 //注意：此时这么修改age页面是不变化的
  }
  function showTel(){
    alert(tel)
  }
</script>
```
扩展：上述代码，还需要编写一个不写`setup`的`script`标签，去指定组件名字，比较麻烦，我们可以借助`vite`中的插件简化

1. 第一步：在终端中`npm i vite-plugin-vue-setup-extend -D`
2. 第二步：打开`vite.config.ts`文件，改为：
```js
import { defineConfig } from 'vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
 
export default defineConfig({
  plugins: [ VueSetupExtend() ]
})
```

## ref 创建：基本类型的响应式数据
（该ref与vue2中的ref不同。该ref是可以使数据变为响应式的，哪个是响应式，就给哪个加）

- 作用：定义响应式变量。
- 语法：`let xxx = ref(初始值)`。
- 返回值：一个`RefImpl`的实例对象，简称`ref对象`或`ref`，`ref`对象的`value`属性是响应式的。
- 注意点：
   - `JS`中操作数据需要：`xxx.value`，但模板中不需要`.value`，直接使用即可。
   - 对于`let name = ref('张三')`来说，`name`不是响应式的，`name.value`是响应式的。（JS中操作ref对象时候需要.value）
```js
<template>
  <div class="person">
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">年龄+1</button>
    <button @click="showTel">点我查看联系方式</button>
  </div>
</template>
 
<script setup lang="ts" name="Person">
  import {ref} from 'vue'
  // name和age是一个RefImpl的实例对象，简称ref对象，它们的value属性是响应式的。
  let name = ref('张三')
  let age = ref(18)
  // tel就是一个普通的字符串，不是响应式的
  let tel = '13888888888'
 
  function changeName(){
    // JS中操作ref对象时候需要.value
    name.value = '李四'
    console.log(name.value)
 
    // 注意：name不是响应式的，name.value是响应式的，所以如下代码并不会引起页面的更新。
    // name = ref('zhang-san')
  }
  function changeAge(){
    // JS中操作ref对象时候需要.value
    age.value += 1 
    console.log(age.value)
  }
  function showTel(){
    alert(tel)
  }
</script>
```

## reactive 创建：对象类型的响应式数据
- 作用：定义一个响应式对象（基本类型不要用它，要用`ref`，否则报错）
- 语法：`let 响应式对象= reactive(源对象)`。
- 返回值：一个`Proxy`的实例对象，简称：响应式对象。
- 注意点：`reactive`定义的响应式数据是“深层次”的。

（Shift + Alt + 上/下箭头 选中代码往上/下面复制）
```js
<template>
  <div class="person">
    <h2>汽车信息：一台{{ car.brand }}汽车，价值{{ car.price }}万</h2>
    <h2>游戏列表：</h2>
    <ul>
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
    <h2>测试：{{obj.a.b.c.d}}</h2>
    <button @click="changeCarPrice">修改汽车价格</button>
    <button @click="changeFirstGame">修改第一游戏</button>
    <button @click="test">测试</button>
  </div>
</template>
 
<script lang="ts" setup name="Person">
import { reactive } from 'vue'
 
// 数据
let car = reactive({ brand: '奔驰', price: 100 })
let games = reactive([
  { id: 'ahsgdyfa01', name: '英雄联盟' },
  { id: 'ahsgdyfa02', name: '王者荣耀' },
  { id: 'ahsgdyfa03', name: '原神' }
])
let obj = reactive({
  a:{
    b:{
      c:{
        d:666
      }
    }
  }
})
 
function changeCarPrice() {
  car.price += 10
}
function changeFirstGame() {
  games[0].name = '流星蝴蝶剑'
}
function test(){
  obj.a.b.c.d = 999
}
</script>
```

## ref 创建：对象类型的响应式数据
- 其实`ref`接收的数据可以是：基本类型、对象类型。
- 若`ref`接收的是对象类型，内部其实也是调用了`reactive`函数。

（reactive只能定义对象类型的响应式数据）

```js
<template>
  <div class="person">
    <h2>汽车信息：一台{{ car.brand }}汽车，价值{{ car.price }}万</h2>
    <h2>游戏列表：</h2>
    <ul>
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
    <h2>测试：{{obj.a.b.c.d}}</h2>
    <button @click="changeCarPrice">修改汽车价格</button>
    <button @click="changeFirstGame">修改第一游戏</button>
    <button @click="test">测试</button>
  </div>
</template>
 
<script lang="ts" setup name="Person">
import { ref } from 'vue'
 
// 数据
let car = ref({ brand: '奔驰', price: 100 })
let games = ref([
  { id: 'ahsgdyfa01', name: '英雄联盟' },
  { id: 'ahsgdyfa02', name: '王者荣耀' },
  { id: 'ahsgdyfa03', name: '原神' }
])
let obj = ref({
  a:{
    b:{
      c:{
        d:666
      }
    }
  }
})
 
console.log(car)
 
function changeCarPrice() {
  car.value.price += 10
}
function changeFirstGame() {
  games.value[0].name = '流星蝴蝶剑'
}
function test(){
  obj.value.a.b.c.d = 999
}
</script>
```

## ref 对比 reactive

宏观角度看：

> 1. `ref`用来定义：基本类型数据、对象类型数据；
> 2. `reactive`用来定义：对象类型数据。

区别：
> 1. `ref`创建的变量必须使用`.value`（可以使用`volar`插件自动添加`.value`）。
> 2. `reactive`重新分配一个新对象，会失去响应式（可以使用`Object.assign`去整体替换）。

- 使用原则：
> 1. 若需要一个基本类型的响应式数据，必须使用`ref`。
> 2. 若需要一个响应式对象，层级不深，`ref`、`reactive`都可以。
> 3. 若需要一个响应式对象，且层级较深，推荐使用`reactive`。做表单相关的数据，推荐使用reactive。

## toRefs 与 toRef
- 作用：将一个响应式对象中的每一个属性，转换为`ref`对象。
- 备注：`toRefs`与`toRef`功能一致，但`toRefs`可以批量转换。 

-toRefs是把整个reactive所定义的对象的每一组key-value都拿出来形成一个新的对象并且还具备响应式的能力
- 语法如下：
```js
<template>
  <div class="person">
    <h2>姓名：{{person.name}}</h2>
    <h2>年龄：{{person.age}}</h2>
    <h2>性别：{{person.gender}}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeGender">修改性别</button>
  </div>
</template>
 
<script lang="ts" setup name="Person">
  import {ref,reactive,toRefs,toRef} from 'vue'
 
  // 数据
  let person = reactive({name:'张三', age:18, gender:'男'})
	
  // 通过toRefs将person对象中的n个属性批量取出，且依然保持响应式的能力
  let {name,gender} =  toRefs(person)
	
  // 通过toRef将person对象中的gender属性取出，且依然保持响应式的能力
  let age = toRef(person,'age')
 
  // 方法
  function changeName(){
    name.value += '~'
  }
  function changeAge(){
    age.value += 1
  }
  function changeGender(){
    gender.value = '女'
  }
</script>
```

## computed计算属性
作用：根据已有数据计算出新数据（和`Vue2`中的`computed`作用一致）。

底层借助了object.defineproperty方法提供的getter和setter
```js
<template>
  <div class="person">
    姓：<input type="text" v-model="firstName"> <br>
    名：<input type="text" v-model="lastName"> <br>
    全名：<span>{{fullName}}</span> <br>
    <button @click="changeFullName">全名改为：li-si</button>
  </div>
</template>
 
<script setup lang="ts" name="App">
  import {ref,computed} from 'vue'
 
  let firstName = ref('zhang')
  let lastName = ref('san')
 
  // 计算属性——只读取，不修改
  /* let fullName = computed(()=>{
    return firstName.value + '-' + lastName.value
  }) */
 
 
  // 计算属性——既读取又修改
  let fullName = computed({
    // 读取
    get(){
      return firstName.value + '-' + lastName.value
    },
    // 修改
    set(val){
      console.log('有人修改了fullName',val)
      firstName.value = val.split('-')[0]
      lastName.value = val.split('-')[1]
    }
  })
 
  function changeFullName(){
    fullName.value = 'li-si'
  } 
</script>
```

## watch监听

- 作用：监视数据的变化（和`Vue2`中的`watch`作用一致）
- 特点：`Vue3`中的`watch`只能监视以下四种数据：
> 1. `ref`定义的数据。
> 2. `reactive`定义的数据。
> 3. 函数返回一个值（`getter`函数）。
> 4. 一个包含上述内容的数组。

(官方文档

watch() 默认是懒侦听的，即仅在侦听源发生变化时才执行回调函数。

第一个参数是侦听器的源。这个来源可以是以下几种：

一个函数，返回一个值
一个 ref
一个响应式对象
...或是由以上类型的值组成的数组
)

我们在`Vue3`中使用`watch`的时候，通常会遇到以下几种情况：

 * *情况一
监视`ref`定义的【基本类型】数据：直接写数据名即可，监视的是其`value`值的改变。

```js
<template>
  <div class="person">
    <h1>情况一：监视【ref】定义的【基本类型】数据</h1>
    <h2>当前求和为：{{sum}}</h2>
    <button @click="changeSum">点我sum+1</button>
  </div>
</template>
 
<script lang="ts" setup name="Person">
  import {ref,watch} from 'vue'
  // 数据
  let sum = ref(0)
  // 方法
  function changeSum(){
    sum.value += 1
  }
  // 监视，情况一：监视【ref】定义的【基本类型】数据
  const stopWatch = watch(sum,(newValue,oldValue)=>{  //不写sum.value,因为sum才是ref定义的数据。而不是sum.value
    console.log('sum变化了',newValue,oldValue)
    if(newValue >= 10){
      stopWatch()  //回调一个停止监视的函数，此处是当newValue>10时，停止监视。
    }
  })
</script>
```
**情况二

监视`ref`定义的【对象类型】数据：直接写数据名，监视的是对象的【地址值】，若想监视对象内部的数据，要手动开启深度监视。

 注意：
> 若修改的是`ref`定义的对象中的属性，`newValue` 和 `oldValue` 都是新值，因为它们是同一个对象。
> 若修改整个`ref`定义的对象，`newValue` 是新值， `oldValue` 是旧值，因为不是同一个对象了。

>监视，情况一：监视【ref】定义的【对象类型】数据，监视的是对象的地址值，只有整个对象被改变的时候才会被监视到。

    若想监视对象内部属性的变化，需要手动开启深度监视

    watch的第一个参数是：被监视的数据

    watch的第二个参数是：监视的回调

    watch的第三个参数是：配置对象（deep、immediate等等.....）qing
```js
<template>
  <div class="person">
    <h1>情况二：监视【ref】定义的【对象类型】数据</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改整个人</button>
  </div>
</template>
 
<script lang="ts" setup name="Person">
  import {ref,watch} from 'vue'
  // 数据
  let person = ref({
    name:'张三',
    age:18
  })
  // 方法
  function changeName(){
    person.value.name += '~'
  }
  function changeAge(){
    person.value.age += 1
  }
  function changePerson(){
    person.value = {name:'李四',age:90}
  }
  /* 
    监视，情况一：监视【ref】定义的【对象类型】数据，监视的是对象的地址值，只有整个对象被改变的时候才会被监视到。
    若想监视对象内部属性的变化，需要手动开启深度监视
    watch的第一个参数是：被监视的数据
    watch的第二个参数是：监视的回调
    watch的第三个参数是：配置对象（deep、immediate等等.....） 
  */
  watch(person,(newValue,oldValue)=>{
    console.log('person变化了',newValue,oldValue)
  },{deep:true})
  
</script>
```
监视`reactive`定义的【对象类型】数据，且默认开启了深度监视。

（reactiv隐式创建深层监听，并且该深度监视没法关闭）

对比ref与reactiv修改整个对象的方法
```js
<template>
  <div class="person">
    <h1>情况三：监视【reactive】定义的【对象类型】数据</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改整个人</button>
    <hr>
    <h2>测试：{{obj.a.b.c}}</h2>
    <button @click="test">修改obj.a.b.c</button>
  </div>
</template>
 
<script lang="ts" setup name="Person">
  import {reactive,watch} from 'vue'
  // 数据
  let person = reactive({
    name:'张三',
    age:18
  })
  let obj = reactive({
    a:{
      b:{
        c:666
      }
    }
  })
  // 方法
  function changeName(){
    person.name += '~'
  }
  function changeAge(){
    person.age += 1
  }
  function changePerson(){
    Object.assign(person,{name:'李四',age:80})
  }
  function test(){
    obj.a.b.c = 888
  }
 
  // 监视，情况三：监视【reactive】定义的【对象类型】数据，且默认是开启深度监视的
  watch(person,(newValue,oldValue)=>{
    console.log('person变化了',newValue,oldValue)
  })
  watch(obj,(newValue,oldValue)=>{
    console.log('Obj变化了',newValue,oldValue)
  })
  
</script>
```
* *情况四

监视`ref`或`reactive`定义的【对象类型】数据中的某个属性，（遇到该情况，反手就用函数）注意点如下：

1. 若该属性值不是【对象类型】，需要写成函数形式。
2. 若该属性值是依然是【对象类型】，可直接编，也可写成函数，建议写成函数。

结论：监视的要是对象里的属性，那么最好写函数式，注意点：若是对象监视的是地址值，需要关注对象内部，需要手动开启深度监视。
```js
<template>
  <div class="person">
    <h1>情况四：监视【ref】或【reactive】定义的【对象类型】数据中的某个属性</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>汽车：{{ person.car.c1 }}、{{ person.car.c2 }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeC1">修改第一台车</button>
    <button @click="changeC2">修改第二台车</button>
    <button @click="changeCar">修改整个车</button>
  </div>
</template>
 
<script lang="ts" setup name="Person">
  import {reactive,watch} from 'vue'
 
  // 数据
  let person = reactive({
    name:'张三',
    age:18,
    car:{
      c1:'奔驰',
      c2:'宝马'
    }
  })
  // 方法
  function changeName(){
    person.name += '~'
  }
  function changeAge(){
    person.age += 1
  }
  function changeC1(){
    person.car.c1 = '奥迪'
  }
  function changeC2(){
    person.car.c2 = '大众'
  }
  function changeCar(){
    person.car = {c1:'雅迪',c2:'爱玛'}
  }
 
  // 监视，情况四：监视响应式对象中的某个属性，且该属性是基本类型的，要写成函数式
  /* watch(()=> person.name,(newValue,oldValue)=>{
    console.log('person.name变化了',newValue,oldValue)
  }) */
 
  // 监视，情况四：监视响应式对象中的某个属性，且该属性是对象类型的，可以直接写，也能写函数，更推荐写函数
  watch(()=>person.car,(newValue,oldValue)=>{
    console.log('person.car变化了',newValue,oldValue)
  },{deep:true})
 
</script>
```
监视上述的多个数据

```js
<template>
  <div class="person">
    <h1>情况五：监视上述的多个数据</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>汽车：{{ person.car.c1 }}、{{ person.car.c2 }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeC1">修改第一台车</button>
    <button @click="changeC2">修改第二台车</button>
    <button @click="changeCar">修改整个车</button>
  </div>
</template>
 
<script lang="ts" setup name="Person">
  import {reactive,watch} from 'vue'
 
  // 数据
  let person = reactive({
    name:'张三',
    age:18,
    car:{
      c1:'奔驰',
      c2:'宝马'
    }
  })
  // 方法
  function changeName(){
    person.name += '~'
  }
  function changeAge(){
    person.age += 1
  }
  function changeC1(){
    person.car.c1 = '奥迪'
  }
  function changeC2(){
    person.car.c2 = '大众'
  }
  function changeCar(){
    person.car = {c1:'雅迪',c2:'爱玛'}
  }
 
  // 监视，情况五：监视上述的多个数据
  watch([()=>person.name,person.car],(newValue,oldValue)=>{
    console.log('person.car变化了',newValue,oldValue)
  },{deep:true})
 
</script>
```


## watchEffect

官网：立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行该函数。

 `watch`对比`watchEffect`

  > 1. 都能监听响应式数据的变化，不同的是监听数据变化的方式不同
  > 2. `watch`：要明确指出监视的数据，watch是惰性的，你让他监视谁才监视谁
  > 3. `watchEffect`：不用明确指出监视的数据（函数中用到哪些属性，那就监视哪些属性）。

```js
<template>
  <div class="person">
    <h2>需求：当水温达到60度，或水位达到80cm时，给服务器发请求</h2>
    <h2>当前水温：{{temp}}℃</h2>
    <h2>当前水位：{{height}}cm</h2>
    <button @click="changeTemp">水温+10</button>
    <button @click="changeHeight">水位+10</button>
  </div>
</template>
 
<script lang="ts" setup name="Person">
  import {ref,watch,watchEffect} from 'vue'
 
  // 数据
  let temp = ref(10)
  let height = ref(0)
 
  // 方法
  function changeTemp(){
    temp.value += 10
  }
  function changeHeight(){
    height.value += 10
  }
 
  // 监视 -- watch实现  watch是惰性的，你让他监视谁才监视谁
  /* watch([temp,height],(value)=>{
    // 从value中获取最新的水温(newTemp)、最新的水位(newHeight)
    let [newTemp,newHeight] = value
    // 逻辑
    if(newTemp >= 60 || newHeight >= 80){
      console.log('给服务器发请求')
    }
  }) */
 
  // 监视 -- watchEffect实现
  watchEffect(()=>{
    if(temp.value >= 60 || height.value >= 80){
      console.log('给服务器发请求')
    }
  })
 
</script>
```

## 标签的 ref 属性

作用：用于注册模板引用。

> * 用在普通`DOM`标签上，获取的是`DOM`节点。
> * 用在组件标签上，获取的是组件实例对象。

用在普通`DOM`标签上：

```js
<template>
  <div class="person">
    <h1 ref="title1">尚硅谷</h1>
    <h2 ref="title2">前端</h2>
    <h3 ref="title3">Vue</h3>
    <input type="text" ref="inpt"> <br><br>
    <button @click="showLog">点我打印内容</button>
  </div>
</template>
 
<script lang="ts" setup name="Person">
  import {ref} from 'vue'
	
  let title1 = ref()
  let title2 = ref()
  let title3 = ref()
 
  function showLog(){
    // 通过id获取元素
    const t1 = document.getElementById('title1')
    // 打印内容
    console.log((t1 as HTMLElement).innerText)
    console.log((<HTMLElement>t1).innerText)
    console.log(t1?.innerText)
    
		//
		
    // 通过ref获取元素
    console.log(title1.value)
    console.log(title2.value)
    console.log(title3.value)
  }
</script>
```
用在组件标签上：

```js
<!-- 父组件App.vue -->
<template>
  <Person ref="ren"/>
  <button @click="test">测试</button>
</template>
 
<script lang="ts" setup name="App">
  import Person from './components/Person.vue'
  import {ref} from 'vue'
 
  let ren = ref()
 
  function test(){
    console.log(ren.value.name)
    console.log(ren.value.age)
  }
</script>
 
 
<!-- 子组件Person.vue中要使用defineExpose暴露内容 -->
<script lang="ts" setup name="Person">
  import {ref,defineExpose} from 'vue'
	// 数据
  let name = ref('张三')
  let age = ref(18)
  //
  //
  // 使用defineExpose将组件中的数据交给外部
  defineExpose({name,age})
</script>
```

## props

路径别名报错注意：

如果在引入"@"符号以下报错的时候，出现这个错误通常是由于找不到所需的模块或类型声明文件引起的。在 Vue 3 项目中，使用@引入根目录是一个常见的路径别名设置。

要解决这个问题，你需要在你的项目中进行一些配置：

1. 在项目的根目录下找到 tsconfig.json 文件（如果没有，请创建一个）。这是 TypeScript 的配置文件。

2. 在 tsconfig.json 文件中，添加一个 "baseUrl" 属性，指定你的根目录的路径

3. 如果你使用了路径别名，比如 "@"，你还需要添加一个 "paths" 属性来映射路径别名到实际的文件路径。

4. tsconfig.json 文件代码如下：

```js
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.node.json"
    },
    {
      "path": "./tsconfig.app.json"
    }
  ],
  
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"]
      },
      // 其他选项...
    }
  
}
```

index.ts代码：

```js
// 定义一个接口，用于限制person对象的具体属性
export interface PersonInter {
  id:string,
  name:string,
  age:number,
}
 
// 一个自定义类型
// export type Persons = Array<PersonInter>
export type Persons = PersonInter[]
```
App.vue代码：
```js
<template>
  <!-- 务必看懂下面这一行代码 -->
  <!-- <h2 a="1+1" :b="1+1" c="x" :d="x" ref="qwe">测试</h2> -->
  
  <Person a="哈哈" />
</template>
 
<script lang="ts" setup name="App">
  import Person from './components/Person.vue'
  import {reactive} from 'vue'
  import {type Persons} from '@/types'
 
  let x = 9
 
  let personList = reactive<Persons>([
    {id:'asudfysafd01',name:'张三',age:18},
    {id:'asudfysafd02',name:'李四',age:20},
    {id:'asudfysaf)d03',name:'王五',age:22}
  ])
 
</script>
```
Person.vue`中代码：
```js
<template>
  <div class="person">
    <ul>
      <li v-for="p in list" :key="p.id">
        {{p.name}} -- {{p.age}}
      </li>
    </ul>
  </div>
</template>
 
<script lang="ts" setup name="Person">
  import {withDefaults} from 'vue'
  import {type Persons} from '@/types'
 
  // 只接收list
  // defineProps(['list'])
 
  // 接收list + 限制类型
  // defineProps<{list:Persons}>()
 
  //  接收list + 限制类型 + 限制必要性 + 指定默认值
  withDefaults(defineProps<{list?:Persons}>(),{
    list:()=> [{id:'ausydgyu01',name:'康师傅·王麻子·特仑苏',age:19}]
  })
 
 
  // 接收list，同时将props保存起来
  /* let x = defineProps(['list'])
  console.log(x.list) */
 
</script>
```

## 生命周期

*概念：`Vue`组件实例在创建时要经历一系列的初始化步骤，在此过程中`Vue`会在合适的时机，调用特定的函数，从而让开发者有机会在特定阶段运行自己的代码，这些特定的函数统称为：生命周期钩子

* 规律：

  > 生命周期整体分为四个阶段，分别是：创建、挂载、更新、销毁，每个阶段都有两个钩子，一前一后。

* `Vue2`的生命周期

  > 创建阶段：`beforeCreate`、`created`
  > 挂载阶段：`beforeMount`、`mounted`
  > 更新阶段：`beforeUpdate`、`updated`
  > 销毁阶段：`beforeDestroy`、`destroyed`

* `Vue3`的生命周期

  > 创建阶段：`setup`
  > 挂载阶段：`onBeforeMount`、`onMounted`
  > 更新阶段：`onBeforeUpdate`、`onUpdated`
  > 卸载阶段：`onBeforeUnmount`、`onUnmounted`

* 常用的钩子：`onMounted`(挂载完毕)、`onUpdated`(更新完毕)、`onBeforeUnmount`(卸载之前)

（注意：在组件中，需要先把子组件挂载完毕，最后再挂载父组件App，因为父组件的最上面就是引用的一些子组件，必须先把所有的子组件挂载完毕以后。才会挂载父组件。有点像深度优先遍历）

代码：
```js
<template>
  <div class="person">
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="add">点我sum+1</button>
  </div>
</template>
 
<script lang="ts" setup name="Person">
  import {ref,onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted} from 'vue'
 
  // 数据
  let sum = ref(0)
  // 方法
  function add(){
    sum.value += 1
  }
  // 创建
  console.log('创建')
 
  // 挂载前
  onBeforeMount(()=>{
    console.log('挂载前')
  })
  // 挂载完毕
  onMounted(()=>{
    console.log('挂载后');
  })
  // 更新前
  onBeforeUpdate(()=>{
    console.log('更新前')
  })
  // 更新后
  onUpdated(()=>{
    console.log('更新完毕')
  })
  // 卸载前
  onBeforeUnmount(()=>{
    console.log('卸载前')
  })
  // 卸载完毕
  onUnmounted(()=>{
    console.log('卸载完毕')
    
  })
  
</script>
```

## 自定义hook

- 什么是`hook`？—— 本质是一个函数，把`setup`函数中使用的`Composition API`进行了封装，类似于`vue2.x`中的`mixin`。

- 自定义`hook`的优势：复用代码, 让`setup`中的逻辑更清楚易懂。

`useSum.ts`中内容如下：
```js
 import {ref,onMounted} from 'vue'
  
  export default function(){
    let sum = ref(0)
  
    const increment = ()=>{
      sum.value += 1
    }
    const decrement = ()=>{
      sum.value -= 1
    }
    onMounted(()=>{
      increment()
    })
  
    //向外部暴露数据
    return {sum,increment,decrement}
  }		
```
`useDog.ts`中内容如下：
```js
  import {reactive,onMounted} from 'vue'
  import axios,{AxiosError} from 'axios'
  
  export default function(){
    let dogList = reactive<string[]>([])
  
    // 方法
    async function getDog(){
      try {
        // 发请求
        let {data} = await axios.get('https://dog.ceo/api/breed/pembroke/images/random')
        // 维护数据
        dogList.push(data.message)
      } catch (error) {
        // 处理错误
        const err = <AxiosError>error
        console.log(err.message)
      }
    }
  
    // 挂载钩子
    onMounted(()=>{
      getDog()
    })
  	
    //向外部暴露数据
    return {dogList,getDog}
  }
```
组件中具体使用：

```js
  <template>
    <h2>当前求和为：{{sum}}</h2>
    <button @click="increment">点我+1</button>
    <button @click="decrement">点我-1</button>
    <hr>
    <img v-for="(u,index) in dogList.urlList" :key="index" :src="(u as string)"> 
    <span v-show="dogList.isLoading">加载中......</span><br>
    <button @click="getDog">再来一只狗</button>
  </template>
  
  <script lang="ts">
    import {defineComponent} from 'vue'
  
    export default defineComponent({
      name:'App',
    })
  </script>
  
  <script setup lang="ts">
    import useSum from './hooks/useSum'
    import useDog from './hooks/useDog'
  	
    let {sum,increment,decrement} = useSum()
    let {dogList,getDog} = useDog()
  </script>
```

## 路由

- `Vue3`中要使用`vue-router`的最新版本，目前是`4`版本。

        npm i vue-router

- 路由配置文件代码如下：

index.ts代码：

```js
// 创建一个路由器并且暴漏出去
 
// 第一步，引入createRouter
import {createRouter,createWebHistory} from 'vue-router'
 
// 引入一个个的路由组件
import Home from '@/components/Home.vue'
import About from '@/components/About.vue'
import News from '@/components/News.vue'
 
// 第二步，创建路由求
const router = createRouter({
    history:createWebHistory(),
    routes:[  //一个个的路由规则
        {
            path:'/Home',
            component:Home
        },
        {
            path:'/News',
            component:News
        },
        {
            path:'/About',
            component:About
        },
    ]
})
// 暴漏出去router
export default router
```
main.ts代码：

```js
// 引入createApp用于创建应用
import {createApp} from 'vue'
// 引入App根组件
import App from './App.vue'
// 引入路由器
import router from './router'
 
// 创建一个应用
const app = createApp(App)
// 使用路由器
app.use(router)
// 挂载整个应用到app容器中
app.mount('#app')
```
App.vue`代码如下
```js
<template>
  <div class="app">
    <h2 class="title">Vue路由测试</h2>
    <!-- 导航区 -->
    <div class="navigate">
      <RouterLink to="/home" active-class="xiaozhupeiqi">首页</RouterLink>
      <RouterLink to="/news" active-class="xiaozhupeiqi">新闻</RouterLink>
      <RouterLink to="/about" active-class="xiaozhupeiqi">关于</RouterLink>
    </div>
    <!-- 展示区 -->
    <div class="main-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>
 
<script lang="ts" setup name="App">
  import {RouterView,RouterLink} from 'vue-router'
</script>
```
注意：需要在App组件中引入RouterLink，RouterLink是标签，把a标签改成RouterLink，里面的href也改成to。激活高亮是active-class

## 路由器工作模式
1. `history`模式

   > 优点：`URL`更加美观，不带有`#`，更接近传统的网站`URL`。
   > 缺点：后期项目上线，需要服务端配合处理路径问题，否则刷新会有`404`错误。
```js
const router = createRouter({
  	history:createWebHistory(), //history模式
 })
```
2. `hash`模式

   > 优点：兼容性更好，因为不需要服务器端处理路径。
   > 缺点：`URL`带有`#`不太美观，且在`SEO`优化方面相对较差。
```js
const router = createRouter({
  	history:createWebHashHistory(), //hash模式
   	//
})
```

## to的两种写法
```js
<!-- 第一种：to的字符串写法 -->
<router-link active-class="active" to="/home">主页</router-link>
 
<!-- 第二种：to的对象写法 -->
<router-link active-class="active" :to="{path:'/home'}">Home</router-link>
```

## 命名路由
```js
routes:[
  {
    name:'zhuye',
    path:'/home',
    component:Home
  },
  {
    name:'xinwen',
    path:'/news',
    component:News,
  },
  {
    name:'guanyu',
    path:'/about',
    component:About
  }
]
```
跳转路由：
```js
<!--简化前：需要写完整的路径（to的字符串写法） -->
<router-link to="/news/detail">跳转</router-link>
 
<!--简化后：直接通过名字跳转（to的对象写法配合name属性） -->
<router-link :to="{name:'guanyu'}">跳转</router-link>
```


## 嵌套路由

1. 编写`News`的子路由：`Detail.vue`

2. 配置路由规则，使用`children`配置项：
```js
   const router = createRouter({
     history:createWebHistory(),
   	routes:[
   		{
   			name:'zhuye',
   			path:'/home',
   			component:Home
   		},
   		{
   			name:'xinwen',
   			path:'/news',
   			component:News,
   			children:[
   				{
   					name:'xiang',
   					path:'detail',
   					component:Detail
   				}
   			]
   		},
   		{
   			name:'guanyu',
   			path:'/about',
   			component:About
   		}
   	]
   })
   export default router
```

3. 跳转路由（记得要加完整路径）：
```js
<router-link to="/news/detail">xxxx</router-link>
<!-- 或 -->
<router-link :to="{path:'/news/detail'}">xxxx</router-link>
```

4. 记得去`Home`组件中预留一个`<router-view>`
```js
   <template>
     <div class="news">
       <nav class="news-list">
         <RouterLink v-for="news in newsList" :key="news.id" :to="{path:'/news/detail'}">
           {{news.name}}
         </RouterLink>
       </nav>
       <div class="news-detail">
         <RouterView/>
       </div>
     </div>
   </template>
```