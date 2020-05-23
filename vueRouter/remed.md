## vue-router 原理
### 完整导航解析流程
 1. 导航被触发
 2. 在失活的组件里调用离开守卫
 3. 调用全局的beforeEach守卫
 4. 在重用的组件里调用beforeUpdateRoute
 5. 在路由配置里调用beforeEnter
 6. 解析异步路由组件
 7. 在被激活的组件里调用beforeRouteEnter
 8. 调用全局beforeResolve
 9. 导航被确认
 10. 调用全局的 afterEach 钩子 
 11. 触发 DOM 更新。
 12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。
### 网页url组成部分
 * location.protocol // 'http:'
 * location.hostname // '127..0.0.1'
 * location.host // '127.0.0.1:8081'
 * location.port // '8081'
 * location.pathname // '/01.hash.html'
 * location.search // '?a=100&b=20'
 * location.hash // '#/aa/bb'
### hash的特点
 * hash变化会触发网页跳转,即浏览器的前进后提
 * hash变化不会刷新页面,SPA必需的特点
 * hash永远不会提交到server端
### hash 和 History interface 两种方式的区别

### 路由模块的本质就是建立起 URL 和页面之间的映射关系。

### history 对象理解

1. back(),forward().go()方法完成在用户历史记录向前和向后跳转

### 单页面与多页面的区别

- SPA（单页应用程序）：单个页面应用程序，有且只有一个完整的页面；当它在加载页面的时候，不会加载整个页面的内容，而只更新一个指定的容器中内容。

1. 单页面最大特点 采用前端路由系统，通过改变 URL,在不重新请求页面的情况下，更新页面视图。
