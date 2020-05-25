## webpack 性能优化
### 前端代码为何要进行构建和打包?
### module chunk bundle 分别什么意思,有何区别?
 1. module-各个源码文件,webpack中一切皆模块
 2. chunk-多模块合并成的,如 entry, import() splitChunk
 3. bundle-最终的输出文件
### loader 和 plugin 区别?
 1. loaders是用来告诉webpack如何转化处理某一类型的文件,并且引入到打包出的文件中
 2. plugin 是用来自定义webpack打包过程的方式,一个插件含有apply方法的一个对象，通过这个方法可以参与到整个webpack 打包的各个流程(生命周期)
### webpack-dev-server和http服务器如nginx有什么区别?
 1. webpack-dev-server使用内存来存储webpack开发环境下打包的文件,并且使用模块热更新,他比传统的http服务对开发更加简单有效.
### 什么是长缓存？在webpack 中如何做到长缓存优化？
 * 浏览器在用户访问页面,为了加快加载速度,会对用户访问的静态资源进行存储,但是每一次代码升级或是更新,都需要浏览器去下载新的代码，最方便和简单的更新方式就是引入新的文件名称，在webpack 中可以output中输出文件指定chunkHash,并且分离经常更新的代码和框架代码,通过NameModulesPlugin或是HashModuleIdsPlugin 是再次打包文件名不变。
### 什么是Tree-shaking?CSS可以Tree-shaking吗?
* Tree-shaking是指在打包中去除那些引入了，但是在代码中没有被用到的那些死代码。在webpack中Tree-shaking是通过uglifyJSPlugin来Tree-shaking JS。Css需要使用Purify-CSS。   
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
  * loader 作用
    1. 实现对不同格式文件的处理
    2. 转换这些文件，从而使其能够被添加到依赖图中
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
### 什么是webpack 和 grunt 和gulp 有什么不同
  * webpack 是一个模块打包器,他可以递归的打包项目中所有的模块,最终生成几个打包文件,他和其他工具最大的不同在于他支持code-splitting,模块化(AMD,ESM,CommonJs),全局分析  
  * gulp 和 grunk 是基于任务和流(task、stream)的找到一个(或一类)文件,对其做一系列链式操作,更新流上的数据，整条链式操作构成一个任务，多个任务就构成了真个web的构建流程
  * webpack基于入口的。webpack会自动地递归解析入口所需要的所有资源文件，然后用不同loader来处理不同的文件,用plugin来扩展webpack功能
### 与webpack类似的工具还有哪些？谈谈你为什么最终选择（或放弃）使用webpack？
  * webpack、rollup、parcel
  * webpack 适合于大型复杂的前端站点构建
  * rollup 适合基础库的打包,如vue、react
  * parcel s适用于简单的实验性项目,他可以满足低门槛开始看到效果
### 有哪些常见的Loader？他们是解决什么问题的？
* file-loader:把文件输出到一个文件夹中，在代码中通过相对URL去引用输出文件    
* url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
* source-map-loader：加载额外的 Source Map 文件，以方便断点调试
* image-loader：加载并且压缩图片文件
* babel-loader:把es6 转化为es5
* css-loader:加载css 支持模块化、压缩、文件导入等特性
* style-loader:把css代码注入到javaScript 中，通过Dom 操作去加载css
* eslint-loader:通过Eslint 检查javascript 代码
### 有哪些常见的plugin?他们是解决什么问题的？
* define-plugin:定义环境变量
* uglifyjsPlugin:通过UglifyES 压缩es6 代码
### webpack 的构建流程是什么?从读取配置到输出文件这个过程尽量说全
 1. 初始化参数:从配置文件和shell语句中读取与合并参数,得出最终的参数
 2. 开始编译:用上一步得到的参数初始化Compiler对象，加载所有配置插件，执行对象run 方法进行开始编译
 3. 确定入口:根据配置中entry找出所有的入口文件
 4. 编译模块：从入口文件出发,调用所有配置的Loader的模块进行编译,在找出改模块的依赖模块，在递归本步骤直到所有入口文件依赖的文件都经过本步骤的处理
 5. 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
 6. 输出资源:根据入口和模块之间依赖关系，组装成一个个包含多个模块的chunk，在把每个chunk转化成一个单独的文件加载到输出列表（这步是可以修改输出内容的最后机会）
 7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
