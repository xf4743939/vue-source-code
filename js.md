# javascript从入门到进阶的知识点
## js基础
* 如何理解javaScript栈内存和堆内存
> **javascript 变量分为基本类型和引用类型**
>> 1. 基本类型有Undefined、Null、Boolean、Number 和String。这些类型在内存中分别占有固定大小的空间，他们的值保存在栈空间，我们通过按值来访问的。
>> 2. 引用类型，值大小不固定，栈内存中存放地址指向堆内存中的对象。是按引用访问的。如下图所示：栈内存中存放的只是该对象的访问地址，在堆内存中为这个值分配空间。由于这种值的大小不固定，因此不能把它们保存到栈内存中。但内存地址大小的固定的，因此可以将内存地址保存在栈内存中。 这样，当查询引用类型的变量时， 先从栈中读取内存地址， 然后再通过地址找到堆中的值。对于这种，我们把它叫做按引用访问。
>>  ![内存分配](https://img-blog.csdn.net/20141212220233511?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGRkMTk5MTA1MDU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)
---  
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
