var MyRouter=function MyRouter(options) {
  this.options = options
  this.$routerMap = {} // {'/':{component:...}}
  // url 响应式 当值变化时引用的地方都会刷新
  this.app = new Vue({
    data: {
      current: '/',
    },
  })
}
MyRouter.prototype.init = function () {
  // 监听事件
  this.bindEvent()
  // 解析路由
  this.createRouteMap()
  // 申明组件
  this.initComponent()
}
MyRouter.prototype.bindEvent = function () {
  window.addEventListener('hashChange', this.onHashChange.bind(this))
}
MyRouter.prototype.onHashChange = function () {
  window.addEventListener('hashChange', this.onHashChange.bind(this))
}
MyRouter.prototype.createRouteMap = function () {
  this.$options.routes.forEach((route) => {
    this.$routerMap[route.path] = route
  })
}
MyRouter.prototype.initComponent = function () {
  Vue.component('router-link', {
    props: {
      to: String,
    },
    render(h) {
      return h('a', { attrs: { href: '#' + this.to } }, [this.$slots.default])
    },
  })
  Vue.component('router-view', {
    render: (h) => {
      const Component = this.$routerMap[this.app.current].component
      return h(Component)
    },
  })
}
// class MyRouter {
//   constructor(options) {
//     debugger
//     this.options = options
//     this.$routerMap = {} // {'/':{component:...}}
//     // url 响应式 当值变化时引用的地方都会刷新
//     this.app = new Vue({
//       data: {
//         current: '/',
//       },
//     })
//   }
//   init() {
//     // 监听事件
//     this.bindEvent()
//     // 解析路由
//     this.createRouteMap()
//     // 申明组件
//     this.initComponent()
//   }
//   bindEvent() {
//     window.addEventListener('hashChange', this.onHashChange.bind(this))
//   }
//   onHashChange() {
//     this.app.current = window.location.hash.slice(1) || '/'
//   }
//   createRouteMap() {
//     this.$options.routes.forEach((route) => {
//       this.$routerMap[route.path] = route
//     })
//   }
//   initComponent() {
//     Vue.component('router-link', {
//       props: {
//         to: String,
//       },
//       render(h) {
//         return h('a', { attrs: { href: '#' + this.to } }, [this.$slots.default])
//       },
//     })
//     Vue.component('router-view', {
//       render: (h) => {
//         const Component = this.$routerMap[this.app.current].component
//         return h(Component)
//       },
//     })
//   }
// }
MyRouter.prototype.install = function (_vue) {
  Vue = _vue
  Vue.mixin({
    beforeCreate() {
      
      //拿到router的示例，挂载到vue的原型上
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
        this.$options.router.init()
      }
    },
  })
}


