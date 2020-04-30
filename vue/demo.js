function cd(val) {
  /*更新视图拉*/
  console.log('更新视图啦啦')
}

// 订阅者
class Dep {
  constructor() {
    // 用来存放Watcher 对象的数组 vue 里只有三个
    this.subs = []
  }
  /* 添加watcher对象 */
  addSub(sub) {
    debugger
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
    debugger
    /*  在new 一个watcher对象时赋值给Dep.target */
    Dep.target = this
  }
  update() {
    debugger
    console.log('视图跟新啦')
  }
}

function defineReactive(obj, key, val) {
  /* 一个Dep类对象 */
  const dep = new Dep()
  debugger
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      debugger
      /* 将Dep.target（即当前的watcher 对象存入subs 中） */
      dep.addSub(dep.target)
      return val
    },
    set: function(newVal) {
      if (newVal === val)
        return /* 在 set 的时候触发 dep 的 notify 来通知所有的 Watcher 对象更新视图 */
      dep.notify()
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
    /* 新建一个watcher观察者对象，这时候Dep.target 会指向这个Watcher */
    new Watcher()
    /* 这里模拟render 过程 为了触发属性的get 函数 */

    console.log('render~', this._data.msg)
  }
}

Dep.target = null

let o = new Vue({
  data: {
    msg: '好好学习vue'
  }
})
