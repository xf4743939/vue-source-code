## js 算法专题

```JS
 // 插入排序
   function insertSort(arr) {
        for (let i = 1; i < arr.length; i++) {
          let target = i
          for (let j = i - 1; j >= 0; j--) {
            if (arr[target] < arr[j]) {
              ;[arr[target], arr[j]] = [arr[j], arr[target]]
              target = j
            } else {
              break
            }
          }
        }
        return arr
      }
```
