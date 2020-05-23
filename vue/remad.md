## vue 相关知识点

## vue.js 运行机制全局预览

### 初始化及挂载

1. 在 new Vue() 后 Vue 会调用 init 函数进行初始化,会初始化生命周期、事件、props、methods、data、computed、watch 等 其中最重要的是 Object.defineProperty 设置 setter 与 getter 函数，用来实现响应式以及依赖收集。初始化后调用\$mount 会挂载组件，若果是运行时编译，即不存在 render function 但是存在 template,则需要编译步骤

### 编译(complie)

编译可以分为 **parse**、**optimize**、**generate**三个阶段，最终需要得到 render function

1. parse 会用正则等方式解析 template 模板中指令、class、style、等数据,形成 AST
2. optimize 的主要作用是标记 static 静态节点,这是 vue 在编译过程中一处优化,后面当 update 更新界面时，会有一个 patch 过程,diff 算法会直接跳过静态节点,从而减少比较过程，优化了 patch 的性能
3. generate 是将 AST 转为成 render function 字符串的过程,得到结果 render 字符串以及 staticRenderFns 字符串
   经历了 parse、optimize、generate 这三个阶段以后,组件就会存在渲染 VNode 所需的 render function 了。

### 响应式

1. init 的时候通过**Object.defineProperty**进行绑定 被设置的对象被读取时会执行 getter 函数,当被赋值时执行 setter 函数
2. 当 render function 被渲染时，因为会读取对象的值，所以会触发**getter**函数进行**依赖收集**,**依赖收集**的目的是将观察者 Watcher 对象放在当前闭包中的订阅者 Deps 的 subs 中，修改对象值时会触发 setter,setter 通知 dep 每一个 watcher，告诉他们自己的值改变了,需要重新渲染视图。这下 watcher 就会开始调用**update**更新视图。中间还有一个 patch 的过程以及使用队列异步更新的策略。

### Virtual DOM

1. render function 会被转化为 VNode 节点,Virtual DOM 是一个 javascript 对象(Vnode)为基础的树，他不依赖真实平台环境，所以具备跨平台能力。

```js
{
  tag:'div',
  children:[
    {
      tag:'a',
      text:'me'
    }
  ]
}
```

### 更新视图

1. setter->Watcher->update 流程来修改对应视图
2. 最终是如果更新视图的？
   当数据变化后，执行 render function 就可以得到一个新的 VNode 节点，我们将新的 VNode 与旧的 VNode 一起传入 patch 进行比较，经过**diff**算法得出它们的**差异** 只需将这些差异的对应 Dom 进行修改即可。

### 响应式系统依赖收集追踪原理

1.  为什么要依赖收集?  
    依赖收集会让字段(text)知道有几个地方依赖我的数据，我变化的时候需要通知它们。
    最终会形成数据与视图的一种对应关系

---

## vue 实现双向绑定

### 思路整理

**响应式核心 Observer Dep Watcher**

- 响应式核心是利用 Object.defineProperty 给对象的属性添加 getter 和 setter
- Vue 会把 props、data 等变成响应式对象,在创建过程中,发生子属性也为对象则递归把该对象变成响应式
- Observer 中进行响应式的绑定，在数据被读的时候，触发 get 方法，执行 Dep 来收集依赖，也就是收集 Watcher
- 在数据被改的时候，触发 set 方法，通过对应的所有依赖(Watcher)，去执行更新。比如 watch 和 computed 就执行开发者自定义的回调方法。
- compile 主要是解析模板指令,将模板中变量替换成数据,然后初始化渲染页面视图,并将指令对应的节点绑定更新函数,添加监听数据的订阅者,一旦数据有变动,收到通知,更新视图

1. 实现一个数据监听器 Observer,能够对数据对象的所有属性进行监听,如果有变动可拿到最新值并通知订阅者
2. 实现一个指令解析器 Compile,对每个元素节点的指令进行扫描和解析,根据指令模板替换数据，以及绑定相应的更新函数
3. 实现一个 watcher,作为连接 Observer 和 compile 的桥梁，能够订阅并收到每个每个属性变动的通知，执行指令绑定相应回调函数,从而更新视图

----- 

## vue 高频面试题

### v-show 和 v-if 区别
1. v-show 加载了节点 v-if 只有为真才加载节点,频繁切换用 v-show
2. v-show 通过css display 控制显示和隐藏
3. v-if 组件真正渲染和销毁,而不是显示和隐藏

### v-for 中要用 key
* 原理:vue在patch过程中通过key可以精准判断两个节点是否是同一个，从而避免频繁更新不同元素，使得整个patch过程更加高效，减少DOM操作量，提高性能
*  key的作用主要是为了高效的更新虚拟DOM
1. diff 通过tag 和key 来判断是否为 sameNode
2. 减少渲染次数,提升渲染性能
3. 用 key 不会就地复用有状态不会造成数据错乱

### vue 组件生命周期(父子组件)

1. beforeCreate(创建前)、created(创建后)、beforeMount(插入前)、mounted(插入后)、beforeUpdate(更新前)、updated(更新后)、beforeDestory(销毁前)、destoryed(销毁后)
2. 先父后子

### vue 组件如何通讯
1. 父子组件 props和this.$emit
2. 自定义事件 event.$on、event.$off、event.$emit
3. vuex
4. $refs
5. provide/inject
6. $listener/$attrs
7. 事件中线

### 双向数据绑定 v-model 的实现原理
* v-model 是一个语法糖,真正实现双向绑定还是依靠v-bind:绑定响应式数据,以及触发input事件并传递数据
1. input 元素value=this.name
2. 绑定input事件this.name=$event.target.value
3. data 更新触发re-render
### 为何组件data 必须是一个函数?
1. 定义.vue 文件是一个class,每次使用实际是类的实例化(不然数据共享了)
### ajax请求应该放在哪个生命周期
1. mounted
2. 放在mounted之前没有用,只会让逻辑更加混乱
### 何时需要使用beforeDestory
1. 解绑自定义事件event.$off
2. 清楚定时器 
3. 解除自定义的Dom事件,如 window.scroll
### vue常见性能优化
1. 合理利用computed
2. v-for/key
3. v-if/v-show
4. 自定义事件和dom事件及时销毁
5. data 层级不要太深
6. 合理使用异步组件
7. 合理使用keep-alive
8. 使用vue-loader在开发环境做模板编译
### vue 组件化
   1. 组件化基础
      * 很久以前的组件化
       1. asp、jsp、php 已经有组件化了
       2. node.js也有组件化 
      * 数据驱动视图
        1. 传统组件,只是静态渲染，更新还要依赖于操作DOM 
        2. 数据驱动视图-vue MVVM(更加注重业务开发)
        3. 官网的图（vue）

### vue 响应式
  * Object.defineProperty缺点
    1. 深度监听需要递归,一次性计算量大
    2. 无法监听(data)新增属性/删除属性(vue.set/vue.delete)
    3. 无法原生监听数组,需要特殊处理
### vdom 和 diff
* Dom操作非常消耗性能,所以使用VDOM，我们把计算转移为JS计算
* 因为有了虚拟DOM，所以让Vue有了跨平台的能力
* 以前用jquery,可以自行控制DOM 操作的时机,手动调整
* vue 和 react 数据驱动视图，如何有效控制Dom?
  * 解决方案
    * 有了一定复杂度，想减少计算次数比较难
    * 能不能把计算,更多的转移为js计算?因为js执行速度很快
    * vdom -用js模拟Dom结构,计算出最小的变更,操作Dom
* 通过snabbdom学习vdom
* 优化时间复杂度到O(n)
  1. 只比较同一层级,不跨级比较
  2. tap不相同,则直接删除掉重建,不再深度比较
  3. tag 和 key,两者相同，则认为是相同节点,不在深度比较

- 当 oldVnode 与 vnode 在 sameVnode 的时候才会进行 patchVnode,就是新旧 VNode 节点判断为同一节点的时候才会进行 patchVnode 这个过程,否则就是创建新 Dom,移除就 Dom
- patchVnode 规则
  1. 新老节点相同，直接return
  2. 若果新旧 VNode 都是静态的,同时它们的 key 相同(代表同一节点),并且新的 VNode 是 clone 或者标记了 once(v-once 属性,只渲染一次),那么只需要替换 elm 以及 componentInstance 即可
  3. 当VNode是文本节点，直接setTextContent来设置text,若不是文本节点者执行4-7
  4. 新老节点均有 children 子节点,则对子节点进行 diff 操作,调用 updateChildren 也是 diff 核心
  5. 如果老节点没有子节点而新节点存在子节点,先清空老节点点 Dom 的文本内容,然后为当前 Dom 节点加入子节点。
  6. 当新节点没有子节点而老节点有子节点的时候,则移除该 dom 节点的所有子节点
  7. 当新老节点都无子节点的时候,只是文本的替换
- patch  
- addNodes removevNodes
- updateChildren(key的重要性)
### vue.js 的 template 编译 /(描述组件渲染和更新的过程)
  * vue template complier 将模板编译为render函数
  * 执行render 函数生成vnode
  * 模板不是Html,有指令、插值、js表达式、能实现判断、循环
  * html是标签语言,只有js才能实现判读、循环(图灵完备的)
  * 因此，模板一定是转换为某种js代码,即编译模板。
  * with 语法
  * 模板到render 函数,再到vnode,再到渲染和更新
  * vue组件可以用render 代替template
### 组件渲染和更新的过程
 - 过程
    * 初次渲染
      1. 解析模板为render函数(或再开发环境已完成)
      2. 触发响应式，监听data属性的getter的依赖收集，也即是往dep里面添加watcher的过程
      3. 执行render函数，生成vnode，patch(elm,vnode)
    * 更新过程
      1. 修改data，setter(必需是初始渲染已经依赖过的)调用Dep.notify()，将通知它内部的所有的Watcher对象进行视图更新
      2. 重新执行render函数，生成newVnode
      3. 然后就是patch的过程(diff算法)
    * 异步渲染($nextTick)
      1. 汇总data 的修改,一次性更新函数
      2. 减少Dom操作次数,提高性能    
    1. new vue()后会调用_init 函数进行初始化，初始化生命周期、事件、
    props、methods、data、computed、watch
    2. 模板编译 vue-template-complier (compile 编译 分为 parse、optimize 与 generate 三个阶段)
    3. 响应式
       1. 首先我们一开始会进行响应式初始化，也即是我们开始前的哪个init过程，通过observer (value) 方法，然后通过defineReactive()方法遍历，对每个对象的每个属性进行setter和getter初始化。
       2. 依赖收集：我们在闭包中增加了一个 Dep 类的对象，用来收集 Watcher 对象。在对象被「读」的时候，会触发 reactiveGetter 函数把当前的 Watcher 对象，收集到 Dep 类中去。之后如果当该对象被「写」的时候，则会触发 reactiveSetter 方法，通知 Dep 类调用 notify 来触发所有 Watcher 对象的 update 方法更新对应视图。


### 前端路由

### vue.js 异步更新 Dom 策略及 nextTick

### 从 template 到 Dom(vue.js 源码角度看内部运行机制)

### vuex 源码解析

### keep-alive 组价使用及其实现原理

### vue 的nextTick原理
 1. vue用异步队列的方式来控制DOM更新和nextTick回调先后执行
 2. microtask因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕
 3. 因为兼容性问题，vue不得不做了microtask向macrotask的降级方案
 **每次event loop的最后，会有一个UI render，也就是更新DOM**
 * microtask有：Promise、MutationObserver，以及nodejs中的process.nextTick
 * macrotask有：setTimeout, setInterval, setImmediate, I/O, UI rendering
### vue事件机制

###  VNode
  * createElement用来创建一个虚拟节点。当data上已经绑定__ob__的时候，代表该对象已经被Oberver过了，所以创建一个空节点。tag不存在的时候同样创建一个空节点。当tag不是一个String类型的时候代表tag是一个组件的构造类，直接用new VNode创建。当tag是String类型的时候，如果是保留标签，则用new VNode创建一个VNode实例，如果在vm的option的components找得到该tag，代表这是一个组件，否则统一用new VNode创建。
### 发布订阅模式
  * 中间的全局容器（target），用来存储可以被触发的东西（函数或对象）
  * 需要有一个方法可以往容器中传入东西(函数或对象)
  * 可以将容器中东西取出来调用
  * 解耦让各模块之间没有紧密的联系
  * 实际上就是事件模型
    1. 有一个event全局对象
    2. event.on('事件名',处理函数),订阅事件
       1. 可以连续订阅
       2. 移除某一个类型事件
       3. 移除某一个类型事件的一个函数
### vue 升级内容
* 全部用ts重写(响应式、vdom、模板编译)
* 性能提升,代码量减少