## javascript 从入门到进阶的知识点

### js 基础

1. 如何理解 javaScript 栈内存和堆内存
   - **基本类型** 有 Undefined、Null、Boolean、Number 和 String。这些类型在内存中分别占有固定大小的空间，他们的值保存在栈空间，我们通过按值来访问的。
   - **引用类型** 值大小不固定，栈内存中存放地址指向堆内存中的对象。是按引用访问的。如下图所示：栈内存中存放的只是该对象的访问地址，在堆内存中为这个值分配空间。由于这种值的大小不固定，因此不能把它们保存到栈内存中。但内存地址大小的固定的，因此可以将内存地址保存在栈内存中。 这样，当查询引用类型的变量时， 先从栈中读取内存地址， 然后再通过地址找到堆中的值。对于这种，我们把它叫做按引用访问。
2. es6 let,const,区别
   - var 存在变量提升 let 不存在变量提升
   - const let 申明的都是块级作用域/ const 必须初始化赋值 如果定义的是对象，那么可以修改对象内部的属性值
   - let const 当前块有效,执行到块外被销毁,不变量提升,不能重复申明

> > ![内存分配](https://img-blog.csdn.net/20141212220233511?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGRkMTk5MTA1MDU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

2.  前端性能优化
    1. dns 是否可以通过缓存减少 dns 查询时间?
    2. 网络请求的过程走最近的网络环境?
    3. 相同的静态资源是否可以缓存?
    4. 能否减少请求 http 请求大小
    5. 减少 http 请求
    6. 服务端渲染
    - js、css、html 压缩
      -js 合并带来问题 -首屏渲染问题 -缓存失效问题 -公共库压缩，单页面各自压缩

---

- js 浏览器渲染及 EventLoop

* 浏览器渲染过程 \*

1.  解析 html 构建 dom 树
2.  构建 render 树(渲染树,注：不包含 display:none)

- js 运行环境的运行机制 \*
- js 引擎 eventLoop \*
- macrotask 和 microtask\*

---

### js 面试题汇总

1. js 深拷贝

```js
// JavaScript面向对象编程指南
function deepCopy(p, c) {
  c = c || {}
  for (let i in p) {
    if (p.hasOwnProperty(i)) {
      if (typeof p[i] === 'object') {
        c[i] = Array.isArray(p[i]) ? [] : {}
        deepCopy(p[i], c[i])
      } else {
        c[i] = p[i]
      }
    }
  }
  return c
}
```

2.  原生 ajax 封装

```js
function ajax(param) {
  var xhr
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else {
    xhr = new ActiveXObject()
  }
  if (param.type.toLowerCase() === 'get') {
    xhr.open(param.type, param.url + '?' + formatParams(param.data), true)
    xhr.send(null)
  } else if (param.type.toLowerCase() === 'post') {
    xhr.open(param.type, param.url, true)
    xhr.send(JSON.stringify(param.data))
  }
  xhr.onreadystatechange = function() {
    // 0 未初始化未调用open
    // 1.启动 调用open 未调用 send
    // 2. 发送 已调用send() 但是未响应
    // 3. 接收 已经接收部分响应数据
    // 4.完成  完成全部数据响应
    /**
     *status 状态说明
     * 200 服务器成功返回页面
     * 400 语法错误 服务器不识别
     * 401 请求需要用户认证
     * 404 知道url 服务器找不到
     * 500 服务器错误 无法完成请求
     *
     */
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        param.success && param.success(xhr.responseText)
      } else {
        param.error && param.error()
      }
    }
  }
  // 格式化参数
  function formatParams(data) {
    if (!data) return
    var arr = []
    for (var i in data) {
      arr.push(`${encodeURIComponent(name)}=${encodeURIComponent(data[i])}`)
    }
    return arr.join('&')
  }
}
```

3.javeScript 深入之 call,apply,bind 模拟实现

```js
// call 实现
Function.prototype.call2 = function(context) {
  var context = context || window
  context.fn = this // this 指向调用者函数
  var args = []
  // 解决不定参数问题
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']')
  }
  // 可计算某个字符串，并执行其中的javascript代码
  var result = eval('context.fn(' + args + ')')
  delete context.fn
  return result
}
// apply 实现
Function.prototype.myApply = function(obj, arr) {
  obj = obj || window
  var result
  obj.fun = this
  if (!arr) {
    result = obj.fun()
  } else {
    var args = []
    for (var i = 0; i < arr.length; i++) {
      args.push('arr[' + i + ']')
    }
    result = eval('obj.fun(' + args + ')')
  }
  delete obj.fun
  return result
}
//  bind 实现
Function.prototype.bind2 = function(context) {
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.bind -what is trying to fBound is not callable'
    )
  }
  var self = this
  var args = Array.prototype.slice.call(arguments, 1)
  var fNOP = function() {}
  var fBound = function() {
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(
      this instanceof fBound ? this : context,
      args.concat(bindArgs)
    )
  }
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}
```

4.数组扁平化

```JS
  // 1. 常规
  function flatten(arr) {
    var arr = arr || [],
      res = [],
      len = arr.length;
    for (let i = 0; i < len; i++) {
      if (Array.isArray(arr[i])) {
        res = res.concat(arr[i])
      } else {
        res.push(arr[i])
      }
    }
    return res
  }
  // 2.优雅点
  Array.prototype.flatten = function () {
    var res = []
    this.forEach(function (item) {
      Object.prototype.toString.call(item) === '[object Array]' ? res = res.concat(item.flatten()) : res.push(
        item)
    })
    return res
  }
  // 3.进阶
  function flatten(arr) {
    arr = arr || []
    return arr.reduce(function (pre, next) {
      return Object.prototype.toString.call(next) == '[object Array]' ? pre.concat(flatten(next)) : pre.concat(
        next)
    }, [])
  }
  // 4. es6
const flatten = arr => arr.reduce((prev, next) => {
  return Object.prototype.toString.call(next) === '[object Array]' ?
    prev.concat(flatten(next)) : prev.concat(next)},
 [])
```

5.函数作用域

```JS
// 函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域。
  var a = 1;
  var x = function () {
  console.log(a);
  };
  function f() {
  var a = 2;
  x();
  }
  f() // 1
  ----
  // 函数体内部声明的函数，作用域绑定函数体内部
  function foo() {
    var x = 1;
    function bar() {
    console.log(x);
    }
    return bar;
  }
  var x = 2;
  var f = foo();
  f() // 1
  ---
  var a = 1
  function f1(){
      var a = 2
      f2.call()
  }
  function f2(){
      console.log(a) // 1
  }
  f1.call()
  ---
  // 1.匿名函数this总指向window 对象
  var val=1
  var obj={
    val:2,
    db1:function(){
      console.log(this)
      this.val*=2
      console.log(val)
      console.log(this.val)
    }
  }
  var ff=obj.db1()
  var fn=obj.db1;fn()
  ---
  +function(){
      console.log(a)
      var a=5;
      function a(){}
        console.log(a)
        function b(){}
         b=6
         console.log(b)
         var c=d=b
    }()
    console.log(d)
    console.log(c)
```

6.this 指向问题

```Js
// 普通函数被调用（运行时）确定函数内this的指向 箭头函数 函数定义时已经确定，this指向它的外层作用域this的指向
  var a = 1
  var test = () => {
      console.log(this.a)
  }
  var obj = {
      a: 2,
      test
  }
  obj.test()
```
