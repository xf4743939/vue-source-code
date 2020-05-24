## webpack 性能优化
### 前端代码为何要进行构建和打包?
### module chunk bundle 分别什么意思,有何区别?
 1. module-各个源码文件,webpack中一切皆模块
 2. chunk-多模块合并成的,如 entry, import() splitChunk
 3. bundle-最终的输出文件
### loader 和 plugin 区别?
### webpack 如何实现懒加载?
### webpack 常见性能优化
  * 优化打包构建速度-开发体验和效率
    1. 优化babel-loader(开启缓存/include 或者 exclude)
    2. IgnorePlugin(忽略第三方包指定目录,让这些指定目录不要被打包进去)
    3. noParse(精准过滤不需要解析的文件，如jquery/loadsh)
    4. happyPack(js单线程,开启多进程打包;提高构建速度(特别多核cpu))
    5. parallelUglifyPlugin(多进程压缩js)
    6. 自动刷新（开发环境）
    7. 热更新（开发环境）
    8. DllPlugin(先打包出dll 文件/dllReferencePlugin -使用dll 文件)(开发环境)
  * 优化产出代码-产品性能
    * 体积更小
    * 合理分包,不重复加载
    * 速度更快,内存使用更少
    * 小图片base64 编码
    * bundle 加hash(根据内容算hash)
    * 懒加载
    * 提取公共代码
    * IngorePlugin
    * 使用cdn加速(打包文件上传cdn服务上)
    * 使用production
    * Scope Hosting
### babel-runtime 和 babel-polyfill 区别

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

* optimization.concatenateModules

  1. Scope Hoisting会分析出模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中去。

