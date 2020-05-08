## webpack 性能优化

### 优化 Loader
  1. 影响打包效率是它的属性Babel.Babel会将代码转为字符串生成AST,然后对AST继续进行转变最后生成新的代码
  ,项目越大,转化代码越多,效率就越低。
  2. 优化Loader的文件搜索范围(只在src文件夹下查找/不去查找node_modules)
  3. 把Babel编译过的文件缓存起来(下次只需要编译更改过的代码文件)
### HappyPack
  1. 因为Node是单线程运行的，所以Webpack在打包的过程中也是单线程的,HappyPack可以将Loader的同步执行转换为并行的  
### DllPlugin
  1. DllPlugin可以将特定的类库提前打包然后引入。这种方式可以极大的减少打包类库的次数,只有当类库更新版本才有需要重新打包，并且也实现了将公共代码抽离成单独文件的优化方案 
### Scope Hoisting
  **optimization.concatenateModules**
  1. Scope Hoisting会分析出模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中去。