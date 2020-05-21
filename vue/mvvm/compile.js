

function Compile(el, vm) {
  this.$vm = vm
  this.$el = this.isElementNode(el) ? el : document.querySelector(el)
  if (this.$el) {
    this.$fragment = this.node2Fragment(this.$el)
    this.init()
    this.$el.appendChild(this.$fragment)
  }
}
Compile.prototype = {
  constructor: Compile,
  init: function () {
    this.compileElement(this.$fragment)
  },
  node2Fragment: function (el) {
    var fragment = document.createDocumentFragment(),
      child
      // 将原生节点拷贝到fragment上
    while (child = el.firstChild) {
      fragment.appendChild(child)
    }
    return fragment
  },  
  compileElement: function (el) {
    var childNodes = el.childNodes
    var me = this;
    [].slice
      .call(childNodes)
      .forEach(function (node) {
        var text = node.textContent
        var reg = /\{\{(.*)\}\}/g // 指令匹配验证
        // 按照元素节点进行遍历
        if (me.isElementNode(node)) {
          me.compile(node)
        }else if(me.isTextNode(node) && reg.test(text) ){
           me.compileText(node,RegExp.$1)  
        }
        if(node.childNodes && node.childNodes.length){
          me.compileElement(node)  
        }
      })
  },
  compile: function (node) {
    var nodeAttrs = node.attributes
    var me = this;
    /* 规定指令以v-xxx 命名 
    * <span v-text="content"></span>
    */
    [].slice.call(nodeAttrs).forEach(function(attr){
       var attrName=attr.name // v-text
       if(me.isDirective(attrName)){
            var exp=attr.value //context
            var dir=attrName.substring(2) // text
            if(me.isEventDirective(dir)){
               // 包含on 的为事件指令
               compileUtil.eventHandler(node,me.$vm,exp,dir)
            }else{
              // 普通指令
              compileUtil[dir] && compileUtil[dir](node,me.$vm,exp)
            }
            node.removeAttribute(attrName)
       }
    })
  },
  compileText:function(node,exp){
    compileUtil.text(node,this.$vm,exp)
  },
  /* 是否是指令 */
  isDirective: function (attr) {
    return attr.indexOf('v-') == 0
  },
  /* 是否事件指令 */
  isEventDirective: function (dir) {
    return dir.indexOf('on') === 0
  },
  isElementNode: function (node) {
    return node.nodeType === 1
  },
  isTextNode: function (node) {
    return node.nodeType === 3
  },
}
var compileUtil = {
  text: function (node, vm, exp) {
     this.bind(node,vm,exp,'text')
  },
  html:function(node,vm,exp){
    this.bind(node,vm,exp,'html')
  },
  model:function(node,vm,exp){
    this.bind(node,vm,exp,'model')
    var me=this,
    val=this._getVMVal(vm,exp)
    node.addEventListener('input',function(e){
        var newVal=e.target.value
        if(val === newVal){
          return
        }
        me._setVal(vm,exp,newVal)
        val=newVal
    })
  },
  class:function(node,vm,exp){
    this.bind(node,vm,exp,'class')
  },
  bind: function (node, vm, exp, dir) {
    var updaterFn = updater[dir + 'Updater']
    // 第一次初始化视图
    updaterFn && updaterFn(node, this._getVMVal(vm, exp))
  
    // 实例化订阅者 该操作会再对应属性信息订阅器添加对应Watcher
   let res= new Watcher(vm,exp,function(node,value,oldValue){
        // 一旦属性值有变化，会收到通知 执行更新函数，更新视图
        updaterFn && updaterFn(node,value,oldValue)  
    })
    console.log(res,'res')
  },
  // 事件处理
  eventHandler:function(node,vm,exp,dir){
    var eventType=dir.split(":")[1]
    fn=vm.$options.methods && vm.$options.methods[exp];
    if(eventType && fn){
      node.addEventListener(eventType,fn.bind(vm),false)
    }
  }, 
  _getVMVal: function (vm, exp) {
    var val = vm
    exp = exp.split('.')
    exp.forEach(function (key) {
      val = val[key]
    })
    return val
  },
  _setVal:function(vm,exp,value){
      var val=vm
      exp=exp.split('.')
      exp.forEach(function(k,i){
           // 非最后一个key，更新val的值
        if(i<exp.length-1){
          val=val[k]
        }else{
          val[k]=value
        }
      })
  }
}

var updater = {
  textUpdater: function (node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value
  },
  htmlUpdater: function (node, value) {
    node.innerHTML = typeof value == 'undefined' ? '' : value
  },
  classUpdater: function (node, value, oldValue) {
    var className = node.className
    className = className.replace(oldValue, '').replace(/\s$/, '')
    var space = className && String(value) ? ' ' : ''
    node.className = className + space + value
  },
  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value == 'undefined' ? '' : value
  },
}
