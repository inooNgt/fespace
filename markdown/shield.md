# web 安全之 XSS/CSRF 攻击与防御

## XSS

XSS 全称为 Cross Site Scripting，即跨站脚本。攻击者在 Web 页面里输入 Script 代码，当用户浏览该页之时，嵌入 Web 页面中的 Script 代码会被执行，从而达到攻击用户的目的。

### XSS 的原理

1. 攻击者将脚本代码输入至包含漏洞的服务器
2. 用户打开受到攻击的服务器 URL
3. 恶意脚本在浏览器中执行执行

### XSS 的分类

XSS 有三类：反射型 XSS、存储型 XSS、DOM XSS。

#### 反射型 XSS

XSS 代码通过 URL 的方式作为输入提交到服务器，服务器未经过滤直接响应，在响应内容中出现该段 XSS 代码，最后在浏览器解析执行。

一个典型的例子是攻击者通过电子邮件，诱使用户去访问一个包含恶意代码的 URL，当受害者点击这些专门设计的链接的时候，恶意代码会直接在受害者主机上的浏览器执行。

#### 存储型 XSS

攻击者事先将恶意代码上传或储存到漏洞服务器中，只要受害者浏览包含此恶意代码的页面就会执行恶意代码。
存储型 XSS 与反射型 XSS 的差别仅在于：提交的 XSS 代码会存储到服务器（数据库，内存，文件系统等），下次请求目标页面时不用再提交 XSS 代码。

存储型 XSS 一般出现在网站留言、评论、博客日志等交互处，恶意脚本存储到客户端或者服务端的数据库中。

#### DOM XSS

DOM XSS 型的 XSS 代码不需要服务器解析响应，可以在客户端动态地检查和修改页面内容。
例如客户端如从 URL 中提取数据并在本地执行，如果用户在客户端输入的数据包含了恶意的 JavaScript 脚本，而这些脚本没有经过适当的过滤就可以在客户端执行，那么应用程序就受到了 DOM XSS 攻击。

常见的输入点有：
document.URL
document.location
document.referrer
window.location

常见的输出点有：
document.body.innerHtml=...
document.location=...
document.URL=...
window.open
eval

### 浏览器的字符解析过程

XSS 往往和字符编码有着密切的联系，理解浏览器的字符解析过程显得格外重要。

#### 基本概念

1.  [HTML 字符实体](http://www.w3school.com.cn/html/html_entities.asp)

在呈现 HTML 页面时，针对某些特殊字符如“<”或”>”直接使用，浏览器会误以为它们标签的开始或结束，若想正确的在 HTML 页面呈现特殊字符就需要用到其对应的字符实体。

字符实体是一个预先定义好的转义序列，它定义了一些无法在文本内容中输入的字符或符号。字符实体以&开头+预先定义的实体名称，以分号结束，如“<”的实体名称为&lt; 或以<开头+#符号以及字符的十进制数字，如”<”的实体编号为&#60;，字符都是有实体编号的但有些字符没有实体名称。

2. JavaScript 编码

最常用的如“\uXXXX”这种写法为 Unicode 转义序列，表示一个字符，其中 xxxx 表示一个 16 进制数字，如”<” Unicode 编码为“\u003c”。

3. [URL 编码](https://www.cnblogs.com/liuhongfeng/p/5006341.html)

%加字符的 ASCII 编码对应的 2 位 16 进制数字，如”/”对应的 URL 编码为%2f。

#### 浏览器解析过程

浏览器解析过程
浏览器在解析 HTML 文档时无论按照什么顺序，主要有三个过程：HTML 解析、JS 解析和 URL 解析，每个解析器负责 HTML 文档中各自对应部分的解析工作。下面以一篇 HTML 文档解析来简单的讨论下解析器如何协同工作的。

首先浏览器接收到一个 HTML 文档时，会触发 HTML 解析器对 HTML 文档进行词法解析，这一过程完成 HTML 解码并创建 DOM 树，接下来 JavaScript 解析器会介入对内联脚本进行解析，这一过程完成 JS 的解码工作，如果浏览器遇到需要 URL 的上下文环境，这时 URL 解析器也会介入完成 URL 的解码工作，URL 解析器的解码顺序会根据 URL 所在位置不同，可能在 JavaScript 解析器之前或之后解析。每个解析过程中也有许多细节。

### 防御方法

1. 编码

包括 URL 编码、JS 编码、HTML 编码、复合编码。

例如：

```javascript
// 将 & < > " ' / 转义为实体字符（或者十进制、十六进制）。
function encodeForHTML(str, kwargs){
    return ('' + str)
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/"/g, '"')
      .replace(/'/g, ''')
      .replace(/\//g, '/');
  };
// 除字母数字字符外，使用xHH格式（二位十六进制）转义ASCII码小于256的所有字符
function encodeForJavascript(str, kwargs) {
    let encoded = '';
    for(let i = 0; i < str.length; i++) {
      let cc = hex = str[i];
      if (!/[A-Za-z0-9]/.test(str[i]) && str.charCodeAt(i) < 256) {
        hex = '\\x' + cc.charCodeAt().toString(16);
      }
      encoded += hex;
    }
    return encoded;
  };

  // encodeURIComponent 编码
  function encodeForURL(str, kwargs){
    return encodeURIComponent(str);
  };
```

2. 过滤

移除用户上传的 DOM 属性和节点，如 onerror、style 、script、iframe 等。

3. 校正

避免直接对 HTML Entity 编码，使用 DOM Prase 转换，校正不配对的 DOM 标签。

1. [CSP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)

内容安全策略 CSP(Content Security Policy) 的实质就是白名单制度，开发者明确告诉客户端，哪些外部资源可以加载和执行，等同于提供白名单。它的实现和执行全部由浏览器完成，开发者只需提供配置。

启用 CSP：

1. 在 http 头信息加上:

```
Content-Security-Policy: script-src 'self'; object-src 'none';
style-src cdn.example.org third-party.org; child-src https:
```

2. <meta>标签

```
<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:">
```

## CSRF

CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

一个典型的 CSRF 攻击有着如下的流程：

-   受害者登录 a.com，并保留了登录凭证（Cookie）。
-   攻击者引诱受害者访问了 b.com。
-   b.com 向 a.com 发送了一个请求：a.com/act=xx。浏览器会默认携带 a.com 的 Cookie。
-   a.com 接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求。
-   a.com 以受害者的名义执行了 act=xx。
-   攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让 a.com 执行了自己定义的操作。

### CSRF 防护策略

CSRF 通常从第三方网站发起，被攻击的网站无法防止攻击发生，只能通过增强自己网站针对 CSRF 的防护能力来提升安全性。

CSRF 有两个显著的特点：

CSRF（通常）发生在第三方域名。
CSRF 攻击者不能获取到 Cookie 等信息，只是使用。

针对这两点，我们可以专门制定防护策略，如下：

-   阻止不明外域的访问
    -   同源检测
    -   Samesite Cookie
-   提交时要求附加本域才能获取的信息
    -   CSRF Token
    -   双重 Cookie 验证

参考文献：

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP

https://www.tuicool.com/articles/R3qIBja

https://tech.meituan.com/2018/10/11/fe-security-csrf.html
