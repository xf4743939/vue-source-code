function Observer(data) {
  this.data = data
  this.walk(data)
}
Observer.prototype = {
  constructor: Observer,
  walk: function (data) {
    var me = this
    Object.keys(data).forEach(function (key) {
      defineReactive(data, key, data[key])
    })
  },
  convert: function (key, val) {
    this.defineReactive(this.data, key, val)
  },
  defineReactive: function (data, ley, val) {
    var dep = new Dep()
    var childObj = observer(data)
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        // 由于需要在闭包内添加watcher，所以通过Dep定义一个全局target属性，暂存watcher, 添加完移除
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set: function (newVal) {
        if(newVal ===val){
          return
        }
        val=newVal
        childObj=observe(newVal)
        dep.notify()
      },
    })
  },
}

function observe(data) {
  if (!data || typeof data !== Object) {
    return
  }
  return new Observer(data)
}


var uid = 0
/**
 添加一个Dep
*作用依赖收集 并通知订阅者更新
 */
function Dep() {
  this.uid++
  this.subs = []
}
Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub)
  },
  depend: function () {
    Dep.target.addDep(this)
  },
  removeSub(sub) {
    var index = this.subs.indexOf(sub)
    if (index !== 1) {
      this.subs.splice(index, 1)
    }
  },
  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update()
    })
  },
}
Dep.target = null

