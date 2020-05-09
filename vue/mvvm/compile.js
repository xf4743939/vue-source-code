/****  文章 ****/
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
  init: function () {},
  node2Fragment: function (el) {
    var fragment = document.createDocumentFragment(),
      child
    while ((child = el.firstChild)) {
      fragment.appendChild(child)
    }
    return fragment
  },
  compileElement: function (el) {
    var childNodes = el.childNodes
    var me = this
    ;[]
      .slice()
      .call(childNodes)
      .forEach(function (node) {
        var text = node.textContent
        var reg = /\{\{(.*)\}\}/g
        // 按照元素节点进行遍历
        if (me.isElementNode(node)) {
        }
      })
  },
  compile: function (node) {
    var nodeAttrs = node.attributes
    var me = this
    ;[].slice.call(nodeAttrs)
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
  text: function (node, vm, exp) {},
  bind: function (node, vm, exp, dir) {
    var updaterFn = updater[dir + 'Updater']
    updaterFn && updaterFn(node, value)
  },
  _getVMVal: function (vm, exp) {
    var val = vm
    exp = exp.split('.')
    exp.forEach(function (key) {
      value = value[key]
    })
    return val
  },
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
