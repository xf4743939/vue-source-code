## vue 相关知识点

## vue.js 运行机制全局预览

### 初始化及挂载

1. 在 new Vue() 后 Vue 会调用 init 函数进行初始化,会初始化生命周期、事件、props、methods、data、computed、watch 等 其中最重要的是 Object.defineProperty 设置 setter 与 getter 函数，用来实现响应式以及依赖收集。初始化后调用$mount 会挂载组件，若果是运行时编译，即不存在 render function 但是存在 template,则需要编译步骤

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

     1. 实现一个数据监听器Observer,能够对数据对象的所有属性进行监听,如果有变动可拿到最新值并通知订阅者
     2. 实现一个指令解析器Compile,对每个元素节点的指令进行扫描和解析,根据指令模板替换数据，以及绑定相应的更新函数
     3. 实现一个watcher,作为连接Observer和compile的桥梁，能够订阅并收到每个每个属性变动的通知，执行指令绑定相应回调函数,从而更新视图   
![avatar](https://image-static.segmentfault.com/132/184/132184689-57b310ea1804f_articlex)
