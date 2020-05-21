

function MVVM(options) {
  
  this.$options = options
  var data = (this._data = this.$options.data),
    me = this
  Object.keys(data).forEach(function (key) {
    me._proxy(key)
  })
  this._initComputed()
  
  observe(data, this)
  this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
  constructor: MVVM,
  $watch:function(key,cb,options){
   new Watcher(this,key,cb)
  },
  _proxy: function (key,getter,setter) {
    var me = this
    setter=setter ||
    Object.defineProperty(me, key, {
      configurable: false,
      enumerable: true,
      get: function proxyGetter() {
        return me._data[key]
      },
      set: function proxySeller(newVal) {
        me._data[key] = newVal
      },
    })
  },
  _initComputed: function() {
    var me = this;
    var computed = this.$options.computed;
    if (typeof computed === 'object') {
        Object.keys(computed).forEach(function(key) {
            Object.defineProperty(me, key, {
                get: typeof computed[key] === 'function' 
                        ? computed[key] 
                        : computed[key].get,
                set: function() {}
            });
        });
    }
 }
}
