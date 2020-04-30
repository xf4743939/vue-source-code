let Vue
class Vuex {
  constructor(options = {}) {
    if (!Vue && typeof window !== 'undefined' && window.vue) {
      //  install()
    }
    const { plugins = [], strict = false } = options
    let { states = {} } = options
    const store = this
    const { dispatch, commit } = this
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit(type, payload, options) {
      commit.call(store, type, payload, options)
    }
  }
  install(_Vue) {
    if (Vue && _Vue === Vue) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          `[vuex] already installed Vue.use(Vuex) should be called only once`
        )
      }
      return
    }
    Vue = _Vue
    applyMixin(Vue)
  }
  applyMixin(vue) {
    const version = Number(vue.version.split('.')[0])
    if (version >= 2) {
      Vue.mixin({
        beforeCreate: vuexInit,
      })
    } else {
      const _init = Vue.property._init
      Vue.property._init = function (options = {}) {
        //  options.init=options.init ? [vuexIn]
      }
    }
  }
  vuexInit() {
    const options = this.$options
    if (options.store) {
      this.$store =
        typeof options.store === 'function' ? options.store() : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store=options.parent.$store
    }
  }
}
