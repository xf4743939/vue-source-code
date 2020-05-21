## 前端漏洞分析和防御
### xss(跨站脚本攻击) 
  - 反射型
  攻击者通过url参数直接注入
  - 存储型
  存储到Db后读取时注入
  - xss攻击注入点
   1. html节点内容
   2. html属性
   3. javaScript代码
   4. 富文本 
  1. script由数据变成了程序
  2. scripting 能干吗？
    1. 获取页面数据
    2. 获取cookies
    3. 劫持前端逻辑
    4. 发送请求
    5. 偷取网站任意数据
    6. 偷取用户资料
    7. 偷取用户密码和登录态
    8. 欺骗用户
   ### 防御xss
      1. 浏览器自带防御 
### CSRF攻击
1. csrf攻击危害
 - 利用用户登录态
 - 用户并不知情
 - 完成业务请求
 - 盗取用户资金(转账消费)
2. CSRF防御 
 - SameSite(SameSite-Strict SameSite-Lax)
 - SameSite-Lax(a 链接; 预加载 和get表单)可以发送cookie
 - SameSite兼容性不好 
### cookies 特性
 - 前端数据存储
 - 后端通过http头设置
 - 请求时通过http头传给后端
 - 前端可以读写
 - 遵守同源策略
 - 域名
 - 有效期
 - 路径
 - http-only
 - secure
### cookies作用 
 1. 用户登录凭证
   - 用户Id
   - 用户ID + 签名
   - SessionId
### cookies 和 xss的关系
  - xss 可能偷取cookies
  - http-only的cookie不会被偷
### csrf 和cookies 的关系
- csrf 利用了用户cookies
- 攻击站点无法读取cookies
- 最好能禁止第三方使用cookies
### cookies 安全策略
- 签名防止篡改
- 加密
- http-only(防止xss)
- secure
- same-site
### 前端点击劫持
 - 用户亲手操作
 - 用户不知情
 - 盗取用户资金（转账）
 - 获取用户信息.
### 点击劫持防御 
 - javascript禁止内嵌（top ===window || top.location !== window.location）
 - sandbox
 - x-frame-options 禁止内嵌（ie8以上)
 - 其它辅助手段