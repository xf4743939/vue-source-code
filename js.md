# javascript从入门到进阶的知识点
## js基础
* 如何理解javaScript栈内存和堆内存
> **javascript 变量分为基本类型和引用类型**
1. 基本类型有Undefined、Null、Boolean、Number 和String。这些类型在内存中分别占有固定大小的空间，他们的值保存在栈空间，我们通过按值来访问的。
## js面试题汇总
> 1. js深拷贝

  ```
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
