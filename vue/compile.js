// const ncname = '[a‐zA‐Z_][\\w\\‐\\.]*'
// const singleAttrIdentifier = /([^\s"'<>/=]+)/
// const singleAttrAssign = /(?:=)/
// const singleAttrValues = [
//   /"([^"]*)"+/.source,
//   /'([^']*)'+/.source,
//   /([^\s"'=<>`]+)/.source,
// ]
// const attribute = new RegExp(
//   '^\\s*' +
//     singleAttrIdentifier.source +
//     '(?:\\s*(' +
//     singleAttrAssign.source +
//     ')' +
//     '\\s*(?:' +
//     singleAttrValues.join('|') +
//     '))?'
// )
// const qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')'
// const startTagOpen = new RegExp('^<' + qnameCapture)
// const startTagClose = /^\s*(\/?)>/
// const endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>')
// const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g
// const forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/

// var html =
//   '<div :class="c" class="demo" v-if="isShow"><span v-for="item in sz">{{item}}</span></div>'

// function parseHTML() {
//   while (html) {
//     let textEnd = html.indexOf('<')
//     if (textEnd === 0) {
//       if (html.match(endTag)) {
//         continue
//       }
//       if (html.match(startTagOpen)) {
//         continue
//       }
//     } else {
//       continue
//     }
//   }
// }

// function insert(parent,elm,ref){
//   if(parent){
//      if(ref){
//        nodeOps.insertBefore(parent,elm,ref)
//      }else{
//        nodeOps.appendChild(parent,elm)
//      }
//   }
// }
/****  文章 ****/
function Compile(el) {
  this.$el = this.isElementNode(el) ? el : document.querySelector(el)
  if(this.$el){
    this.$fragment=
  }
}
Compile.prototype = {
  constructor: Compile,
  node2Fragment:function(el){
     var fragment=document.createDocumentFragment(),child;
     while(child = el.firstChild){
         fragment.appendChild(child) 
     }  
     return fragment
  },
  isElementNode: function (node) {
    return node.nodeType === 1
  },
  isTextNode: function (node) {
    return node.nodeType === 3
  },
}
