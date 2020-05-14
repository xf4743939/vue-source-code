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
