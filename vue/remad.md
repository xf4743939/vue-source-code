## vue 相关知识点

## vue.js 运行机制全局预览
  ### 初始化及挂载
     
  1. 在 *new Vue()* 后 Vue 会调用*_init* 函数进行初始化,会初始化生命周期、事件、props、methods、data、computed、watch 等 其中最重要的是*Object.defineProperty* 设置 setter 与 getter 函数，用来实现*响应式*以及*依赖收集*。 
  初始化后调用$mount 会挂载组件，若果是运行时编译，即不存在 render function 但是存在 template,则需要**编译**步骤 
  ===
  ### 编译(complie)
  编辑可以分为 **parse**、**optimize**、**generate**三个阶段，最总需要得到render function
  1. parse会用正则等方式解析template模板中指令、class、style、等数据,形成AST
  2. optimize的主要作用是标记static静态节点,这是vue在编译过程中一处优化,后面当update 更新界面时，会有一个patch过程,diff算法会直接跳过静态节点,从而减少比较过程，优化了patch的性能
  3. generate是将AST转为成render function 字符串的过程,得到结果render 字符串以及staticRenderFns字符串
  经历了parse、optimize、generate这三个阶段以后,组件就会存在渲染VNode所需的render function 了。
  ### 响应式
  1. init的时候通过**Object.defineProperty**进行绑定 被设置的对象被读取时会执行getter 函数,当被赋值时执行setter 函数
  2. 当render function 被渲染时，因为会读取对象的值，所以会触发**getter**函数进行**依赖收集**,**依赖收集**的目的是将观察者Watcher对象放在当前闭包中的订阅者Deps的subs 中，修改对象值时会触发setter,setter通知dep 每一个watcher，告诉他们自己的值改变了,需要重新渲染视图。这下watcher 就会开始调用**update**更新视图。中间还有一个patch的过程以及使用队列异步更新的策略。
  ### Virtual DOM
  1. render function 会被转化为VNode节点,Virtual DOM是一个javascript 对象(Vnode)为基础的树，他不依赖真实平台环境，所以具备跨平台能力。
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
     当数据变化后，执行 render function 就可以得到一个新的 VNode 节点，我们将新的VNode 与旧的VNode 一起传入patch 进行比较，经过**diff**算法得出它们的**差异** 只需将这些差异的对应Dom进行修改即可。
  ### 响应式系统依赖收集追踪原理
   1. 为什么要依赖收集?  
      依赖收集会让字段(text)知道有几个地方依赖我的数据，我变化的时候需要通知它们。
      最终会形成数据与视图的一种对应关系



