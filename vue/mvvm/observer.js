/* 响应式 对data 数据进行响应式绑定*/
function Observer(data) {
  
  this.data = data
  this.walk(data)
}
Observer.prototype = {
  constructor: Observer,
  walk: function (data) {
    var me = this
    Object.keys(data).forEach(function (key) {
      me.defineReactive(data, key, data[key])
    })
  },
  convert: function (key, val) {
    this.defineReactive(this.data, key, val)
  },
  defineReactive: function (data, key, val) {
    var dep = new Dep()
    // var childObj = observe(data)
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        // 由于需要在闭包内添加watcher，所以通过Dep定义一个全局target属性，暂存watcher, 添加完移除
        Dep.target && dep.depend(Dep.target)
        return val
      },
      set: function (newVal) {
        if(newVal ===val){
          return
        }
        val=newVal
        // 新的值object的话进行监听
        childObj=observe(newVal)
        // 通知订阅者
        dep.notify()
      },
    })
  },
}

function observe(data) {
  if (!data || typeof data !== 'object') {
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
  this.id=uid++
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

