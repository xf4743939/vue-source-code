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

## vue 高频面试题

### v-show 和 v-if 区别

1. v-show 加载了节点 v-if 只有为真才加载节点,频繁切换用 v-show

### v-for 中要用 key

1. 在 diff 对比中可以快速找对应节点,使用 map 映射而不是循环遍历，可以更快更效率
2. 用 key 不会就地复用有状态不会造成数据错乱

### vue 组件生命周期(父子组件)

1. beforeCreate(创建前)、created(创建后)、beforeMount(插入前)、mounted(插入后)、beforeUpdate(更新前)、updated(更新后)、beforeDestory(销毁前)、destoryed(销毁后)
2. 先父后子

### vue 组件如何通讯

1. $emit/prop、$emit/on、$ref、provide/inject、$listen/\$on、事件中线 bus

### 描述组件渲染和更新的过程

1. compile 编译解析指令替换节点内容，初始化视图,给绑定指令的节点添加订阅者,当数据更新更新视图
2. 当更新后进行 diff 对比，传入到 patchf 函数中,渲染更新修改部分 dom

### 双向数据绑定 v-model 的实现原理

### vue 组件化

### vue 响应式

### vdom 和 diff

- 当 oldVnode 与 vnode 在 sameVnode 的时候才会进行 patchVnode,就是新旧 VNode 节点判断为同一节点的时候才会进行 patchVnode 这个过程,否则就是创建新 Dom,移除就 Dom
- patchVnode 规则
  1.  若果新旧 VNode 都是静态的,同时它们的 key 相同(代表同一节点),并且新的 VNode 是 clone 或者标记了 once(v-once 属性,只渲染一次),那么只需要替换 elm 以及 componentInstance 即可
  2.  新老节点均有 children 子节点,则对子节点进行 diff 操作,调用 updateChildren 也是 diff 核心
  3.  如果老节点没有子节点而新节点存在子节点,先清空老节点点 Dom 的文本内容,然后为当前 Dom 节点加入子节点。
  4.  当新节点没有子节点而老节点有子节点的时候,则移除该 dom 节点的所有子节点
  5.  当新老节点都无子节点的时候,只是文本的替换

### vue.js 的 template 编译

### vue.js 异步更新 Dom 策略及 nextTick

### 从 template 到 Dom(vue.js 源码角度看内部运行机制)

### vuex 源码解析

### keep-alive 组价使用及其实现原理

### vue 组件间通信
### 渲染过程

### 前端路由
### vue 的nextTick原理
 1. vue用异步队列的方式来控制DOM更新和nextTick回调先后执行
 2. microtask因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕
 3. 因为兼容性问题，vue不得不做了microtask向macrotask的降级方案
 **每次event loop的最后，会有一个UI render，也就是更新DOM**
 * microtask有：Promise、MutationObserver，以及nodejs中的process.nextTick
 * macrotask有：setTimeout, setInterval, setImmediate, I/O, UI rendering
### vue事件机制
### vue中keep-alive实现原理
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