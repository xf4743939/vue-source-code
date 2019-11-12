## javascript从入门到进阶的知识点
### js基础
- 如何理解javaScript栈内存和堆内存
  ===
  **javascript 变量分为基本类型和引用类型**

  * 基本类型有Undefined、Null、Boolean、Number 和String。这些类型在内存中分别占有固定大小的空间，他们的值保存在栈空间，我们通过按值来访问的。
  * 引用类型，值大小不固定，栈内存中存放地址指向堆内存中的对象。是按引用访问的。如下图所示：栈内存中存放的只是该对象的访问地址，在堆内存中为这个值分配空间。由于这种值的大小不固定，因此不能把它们保存到栈内存中。但内存地址大小的固定的，因此可以将内存地址保存在栈内存中。 这样，当查询引用类型的变量时， 先从栈中读取内存地址， 然后再通过地址找到堆中的值。对于这种，我们把它叫做按引用访问。

>> ![内存分配](https://img-blog.csdn.net/20141212220233511?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGRkMTk5MTA1MDU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)
---
- js浏览器渲染及EventLoop
 * 浏览器渲染过程 *
 1. 解析html构建dom树
 2. 构建render树(渲染树,注：不包含display:none)
 * js运行环境的运行机制 *
 * js引擎eventLoop * 
 * macrotask 和 microtask*
  
---  
### js面试题汇总
  1. js深拷贝
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
   2. 原生ajax封装
  ```js
   function ajax(param) {
      var xhr;
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
      xhr.onreadystatechange = function () {
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
          if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
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
  3.javeScript深入之call,apply,bind模拟实现
  ```js
  // call 实现
  Function.prototype.call2 = function (context) {
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
    Function.prototype.myApply = function (obj, arr) {
      obj = obj || window
      var result;
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
    Function.prototype.bind2 = function (context) {
      if (typeof this !== 'function') {
        throw new Error('Function.prototype.bind -what is trying to fBound is not callable')
      }
      var self = this
      var args = Array.prototype.slice.call(arguments, 1)
      var fNOP = function () {}
      var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments)
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
      }
      fNOP.prototype = this.prototype
      fBound.prototype = new fNOP()
      return fBound
    }
  ```

