# javascript从入门到进阶的知识点
## js面试题汇总
1.js深拷贝

  ```
  // JavaScript面向对象编程指南
    function deepCopy(p, c) {
      c = c || {}
      for (let i in p) {
        if (p.hasOwnProperty(i)) {
          debugger
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
