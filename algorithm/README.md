## js 算法专题
  * 时间复杂度看的是运行的次数
  * 空间复杂度看占的内存大小
### 简单算法
   * 电话号码组合（公式运算）
   * 卡牌分组(归类运算)
   * 种花问题(赛选运算)
   * 格雷编码(二进制运算)
### 数据结构
 * 栈
  
 * 队列
 * 链表
 * 矩阵
   * 螺旋矩阵
   * 旋转图像
 * 二叉树
 * 堆
### 冒泡排序
```JS
  const bubbleSort=(arr)=>{   
         for(let i=arr.length-1,temp;i>0;i--){
           for(let j=0;j<i; j++){
             temp=arr[j]
             if(temp>arr[j+1]){
               arr[j]=arr[j+1]
               arr[j+1]=temp
             }
           }
         }
         return arr
      }
``` 
### 选择排序
```js
  selectionSort=(arr)=>{
        for(let i =0,min;i<arr.length;i++){
          let min=arr[i]
         for(let j=i+1;j<arr.length;j++){
            if(min>arr[j]){
               let c=min
               min=arr[j]
               arr[j]=c
            }
            console.log(arr)
          }
          arr[i]=min
        }
        return arr
      }
```
### 旋转矩阵
```JS
      let arr=[[1,2,3,4],[12,13,14,5],[11,16,15,6],[10,9,8,7]]
      const matrix=(arr)=>{
        let cycle=(arr=[],r=[])=>{
          
          for(let i=0,len=arr.length;i<len;i++){
            if(i===0){
              r=[...r,...arr[i]]
            }else if(i===len-1){
              r=[...r,...arr[i].reverse()]   
            }else{
              r=[...r,arr[i].pop()]
            }
          } 
          // 删除头部  
          arr.shift()
          // 删除尾部
          arr.pop()  
          for(let i=arr.length-1;i>=0;i--){
            r=[...r,arr[i].shift()]
          }
          if(arr.length){
            return cycle(arr,r)
          } else{
            return r
          } 
        }
        return cycle(arr)
      }
```
### 二叉树
```js
      function Node(data,left,right){
          this.data=data
          this.left=left
          this.right=right
      }
      Node.prototype={
        show:function(){
          console.log(this.data)
        }
      }
      function Tree(){
         this.root=null
      }
      Tree.prototype={
        insert:function(data){
           var node =new Node(data,null,null)
           if(!this.root){
             this.root=node
             return
           }
           var current=this.root
           var parent=null;
           while(current){
              parent=current
              if(data<parent.data){
                current=parent.left
                if(!current){
                  parent.left=node
                  return
                }
              }else{
                 current=parent.right
                 if(!current){
                  parent.right=node
                   return
                 }
              }
           }
        }
      }
      let tree=new Tree()
      let arr=[3,8,2,1,6,7,9,5,0,4]
      arr.forEach(item=>{
        tree.insert(item)
      })
      console.log(tree.root)
```