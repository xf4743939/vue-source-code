function cd(val) {
  /*更新视图拉*/
  console.log('更新视图啦啦')
}
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      return val
    },
    set: function(newVal) {
      if (newVal === val) return
      cd(newVal)
    }
  })
}
// value 需要响应对象 该对象每个属性都要经过defineReactive
function observer(value) {
  if (!value || typeof value !== 'object') return
  Object.keys(value).forEach(key => {
    defineReactive(value, key, value[key])
  })
}

class Vue {
  constructor(options) {
    this._data = options.data
    observer(this._data)
  }
}

// 订阅者
class Dep {
  constructor() {
    // 用来存放Watcher 对象的数组 vue 里只有三个
    this.subs = []
  }
  /* 添加watcher对象 */
  addSub(sub) {
    this.subs.push(sub)
  }
  /* 通知是有watcher 对象更新视图 */
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
class Watcher {
  constructor() {
    /*  在new 一个watcher对象时赋值给Dep.target */
    Dep.target = this
  }
  update() {
    console.log('视图跟新啦')
  }
}

let o = new Vue({
  data: {
    msg: '好好学习vue'
  }
})
o._data.msg = 'yes,ok'
