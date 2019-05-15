# My Scattered Notes

Guides:

1.  <a href="javascript:;" onclick="document.getElementById('g1').scrollIntoView();">undefined and null</a>
2.  <a href="javascript:;" onclick="document.getElementById('g2').scrollIntoView();">浏览器 Event loop 事件循环</a>
3.  <a href="javascript:;" onclick="document.getElementById('g3').scrollIntoView();">对象深拷贝</a>
4.  <a href="javascript:;" onclick="document.getElementById('g4').scrollIntoView();"> DNS 劫持及 HTTP 劫持</a>
5.  <a href="javascript:;" onclick="document.getElementById('g5').scrollIntoView();"> 正则表达式之后向引用</a>
6.  <a href="javascript:;" onclick="document.getElementById('g6').scrollIntoView();"> React/Vue 不同组件之间的通信方式</a>
7.  <a href="javascript:;" onclick="document.getElementById('g7').scrollIntoView();"> Thunk 函数</a>
8.  <a href="javascript:;" onclick="document.getElementById('g8').scrollIntoView();"> this 指向</a>
9.  <a href="javascript:;" onclick="document.getElementById('g9').scrollIntoView();"> Cookie</a>
10. <a href="javascript:;" onclick="document.getElementById('g10').scrollIntoView();"> 排序算法</a>
11. <a href="javascript:;" onclick="document.getElementById('g11').scrollIntoView();"> 执行上下文(Execution Context)</a>
12. <a href="javascript:;" onclick="document.getElementById('g12').scrollIntoView();"> Promise 的实现</a>
13. <a href="javascript:;" onclick="document.getElementById('g13').scrollIntoView();"> 闭包</a>
14. <a href="javascript:;" onclick="document.getElementById('g14').scrollIntoView();"> DOM 事件</a>
15. <a href="javascript:;" onclick="document.getElementById('g15').scrollIntoView();"> 服务端渲染</a>
16. <a href="javascript:;" onclick="document.getElementById('g16').scrollIntoView();"> 浮点数知识</a>
17. <a href="javascript:;" onclick="document.getElementById('g17').scrollIntoView();"> const 、let、块级作用域</a>
18. <a href="javascript:;" onclick="document.getElementById('g18').scrollIntoView();"> DocumentFragment</a>
19. <a href="javascript:;" onclick="document.getElementById('g19').scrollIntoView();"> 同源策咯</a>
20. <a href="javascript:;" onclick="document.getElementById('g20').scrollIntoView();"> Express 中间件</a>
21. <a href="javascript:;" onclick="document.getElementById('g21').scrollIntoView();"> https/http2</a>
22. <a href="javascript:;" onclick="document.getElementById('g22').scrollIntoView();"> 订阅/发布模式（subscribe&publish）</a>
23. <a href="javascript:;" onclick="document.getElementById('g23').scrollIntoView();"> Vue 相关</a>
24. <a href="javascript:;" onclick="document.getElementById('g24').scrollIntoView();"> 函数模拟 A instanceof B</a>
25. <a href="javascript:;" onclick="document.getElementById('g25').scrollIntoView();"> typeof 原理</a>
26. <a href="javascript:;" onclick="document.getElementById('g26').scrollIntoView();"> Iterator</a>
27. <a href="javascript:;" onclick="document.getElementById('g27').scrollIntoView();"> ToPrimitive</a>
28. <a href="javascript:;" onclick="document.getElementById('g28').scrollIntoView();"> BFC 布局</a>
29. <a href="javascript:;" onclick="document.getElementById('g29').scrollIntoView();"> 大整数相加</a>
30. <a href="javascript:;" onclick="document.getElementById('g30').scrollIntoView();"> Object.assign 模拟实现</a>
31. <a href="javascript:;" onclick="document.getElementById('g31').scrollIntoView();"> Http 幂等性</a>
32. <a href="javascript:;" onclick="document.getElementById('g32').scrollIntoView();"> 判断一个对象是否是数组</a>
33. <a href="javascript:;" onclick="document.getElementById('g33').scrollIntoView();"> 跨域</a>
34. <a href="javascript:;" onclick="document.getElementById('g34').scrollIntoView();"> Debounce and Throllte</a>
35. <a href="javascript:;" onclick="document.getElementById('g35').scrollIntoView();"> Session and SessionStorage</a>
36. <a href="javascript:;" onclick="document.getElementById('g36').scrollIntoView();"> Bind 的实现</a>
37. <a href="javascript:;" onclick="document.getElementById('g37').scrollIntoView();"> 内存管理</a>
38. <a href="javascript:;" onclick="document.getElementById('g38').scrollIntoView();"> 水平垂直居中方案</a>
39. <a href="javascript:;" onclick="document.getElementById('g39').scrollIntoView();"> CSS 三列布局</a>
40. <a href="javascript:;" onclick="document.getElementById('g40').scrollIntoView();"> HTTP 缓存</a>
41. <a href="javascript:;" onclick="document.getElementById('g41').scrollIntoView();"> JSBridge</a>
42. <a href="javascript:;" onclick="document.getElementById('g42').scrollIntoView();"> 继承</a>
43. <a href="javascript:;" onclick="document.getElementById('g43').scrollIntoView();"> 移动端布局</a>
44. <a href="javascript:;" onclick="document.getElementById('g44').scrollIntoView();"> websocket</a>
45. <a href="javascript:;" onclick="document.getElementById('g45').scrollIntoView();"> 回流与重绘</a>
46. <a href="javascript:;" onclick="document.getElementById('g46').scrollIntoView();"> javascript 词法分析</a>
47. <a href="javascript:;" onclick="document.getElementById('g47').scrollIntoView();"> 原型图</a>
48. <a href="javascript:;" onclick="document.getElementById('g48').scrollIntoView();"> 数组去重</a>
49. <a href="javascript:;" onclick="document.getElementById('g49').scrollIntoView();"> script 中 defer 和 async</a>
50. <a href="javascript:;" onclick="document.getElementById('g50').scrollIntoView();"> 移动端点击穿透</a>
51. <a href="javascript:;" onclick="document.getElementById('g51').scrollIntoView();"> CSS 关键字 initial、inherit 和 unset</a>
52. <a href="javascript:;" onclick="document.getElementById('g52').scrollIntoView();"> CSS 选择器层叠</a>
53. <a href="javascript:;" onclick="document.getElementById('g53').scrollIntoView();"> 查找算法</a>
54. <a href="javascript:;" onclick="document.getElementById('g54').scrollIntoView();"> flatten</a>
    <span id="g1"></span>

### 1、undefined and null

JavaScript 的最初版本是这样区分的：<b>null 是一个表示"无"的对象，转为数值时为 0；undefined 是一个表示"无"的原始值，转为数值时为 NaN</b>。

目前的用法：
<b>null 表示"没有对象"，即该处不应该有值</b>。典型用法是：

1.  作为函数的参数，表示该函数的参数不是对象。
2.  作为原型链的终点。

```
Object.getPrototypeOf(Object.prototype)
// null
```

<b>undefined 表示"缺少值"，就是此处应该有一个值，但是还没有定义</b>。典型用法是：

1.  变量被声明，但没有被赋值，其值就是 undefined。
2.  调用函数时，没有提供对应的参数，该参数就等于 undefined。
3.  对象没有赋值的属性，其值就是 undefined。
4.  函数没有返回值时，默认返回 undefined。

<span id="g2"></span>

### 2、浏览器 Event loop 事件循环

#### 堆（heap）

程序运行时申请的动态内存，在 JS 运行时用来存放对象。

#### 栈（stack）

JS 种的基本数据类型与指向对象的地址存放在栈内存中，此外还有一块栈内存用来执行 JS 主线程--执行栈（execution context stack）。

浏览器中的 Event loop：

-   所有同步任务都在主线程上执行，形成一个执行栈。
-   主任务之外，还存在任务队列。
    -   任务队列分为 macro-task(宏任务)和 micro-task(微任务)。
    -   macro-task(宏任务): setTimeout, setInterval, setImmediate, I/O 等
    -   micro-task(微任务): process.nextTick, Promise, MutationObserver 等

整个最基本的 Event Loop 如图所示：

<div align="center"><img width="600"src="http://cdn.inoongt.tech/images/thinkin/eventloop.png"/></div>

具体过程：

1.  浏览器中，先执行当前栈，执行完主线程中的任务。

2.  取出 Microtask 微任务队列中任务执行直到清空。

3.  取出 Macrotask 宏任务中 一个 任务执行。

4.  检查 Microtask 微任务中有没有任务，如果有任务执行直到清空。

5.  重复 3 和 4。

Node Event Loop:

"Event Loop 是一个程序结构，用于等待和发送消息和事件。（a programming construct that waits for and dispatches events or messages in a program.）"

简单说，就是在程序中设置两个线程：一个负责程序本身的运行，称为"主线程"；另一个负责主线程与其他进程（主要是各种 I/O 操作）的通信，被称为"Event Loop 线程"（可以译为"消息线程"）。

每当遇到 I/O 的时候，主线程就让 Event Loop 线程去通知相应的 I/O 程序，然后接着往后运行，所以不存在红色的等待时间。等到 I/O 程序完成操作，Event Loop 线程再把结果返回主线程。主线程就调用事先设定的回调函数，完成整个任务。

js 引擎遇到一个异步事件后并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务。当一个异步事件返回结果后，js 会将这个事件加入与当前执行栈不同的另一个队列，我们称之为事件队列。被放入事件队列不会立刻执行其回调，而是等待当前执行栈中的所有任务都执行完毕， 主线程处于闲置状态时，主线程会去查找事件队列是否有任务。如果有，那么主线程会从中取出排在第一位的事件，并把这个事件对应的回调放入执行栈中，然后执行其中的同步代码...，如此反复，这样就形成了一个无限的循环。这就是这个过程被称为“事件循环（Event Loop）”的原因。

当前执行栈执行完毕时会立刻先处理所有微任务队列（Promise）中的事件，然后再去宏任务队列（setTimeout）中取出一个事件。同一次事件循环中，微任务永远在宏任务之前执行。
https://zhuanlan.zhihu.com/p/33058983
<span id="g21"></span>

<span id="g3"></span>

### 3、对象深拷贝

JSON.parse(JSON.stringify(obj))

```
/*缺点：如果需要属性值是函数或者是undefined，就会被过滤掉 */
const clone=(obj)=>{
    let _obj=JSON.parse(JSON.stringify(obj))
}
```

递归

```javascript
const clone = obj => {
    if (!obj && typeof obj !== "object") {
        return obj;
    }
    let result = obj.constructor === Object ? {} : [];
    for (let key in obj) {
        result[key] =
            obj[key] && typeof obj[key] === "object"
                ? clone(obj[key])
                : obj[key];
    }
    return result;
};
```

<span id="g4"></span>

### 4、 DNS 劫持 HTTP 劫持

#### DNS 劫持

DNS 劫持又称域名劫持，是通过劫持技术修改域名注册信息，修改 DNS 解析，劫持修改域名解析结果。使访问域名的用户不能够准确达到目标站点，而进入指定站点。

例如：

1. 用户计算机感染病毒，该病毒在操作系统中 HOSTS 文件中添加了虚假的 DNS 解析记录，因为系统本地的 DNS 解析记录高于 DNS 服务器，操作系统在访问域名的时候都会先行检测本地 DNS 解析记录，然后在访问 DNS 服务器。

2. 用户试图访问的网站被攻击这击破，并在网站中植入路由 DNS 劫持代码，当用户访问网站，浏览器就是自动执行路由 DNS 劫持代码，用户路由器如果存在漏洞就会中招，导致用户上网流量被假 DNS 服务器劫持，出现广告，各种奇怪现象。

3. 当用户打开浏览器主页的时候，却出现 ISP 提供的定向页面，广告页面等内容页面

4. 用户在浏览器中输入了错误的域名，导致 DNS 查询不存在的记录。以前遇到这种情况，浏览器通常会返回一个错误提示。而最近，这种情况下用户会看到 ISP 设置的域名纠错系统提示。，广告页面等内容页面。

5. 用户想通过该网址访问 A 网站结果却指向了 B 网站。

如何防范 DNS 劫持：

第一：使用安全稳定可靠的 DNS 服务器，并且及时升级，更新补丁，加固服务器。

第二：保护好域名注册的账号信息。增加域名账号密码的复杂性。

第三：注意本地计算机系统的安全性，使用杀毒软件安全防范。

#### HTTP 劫持

HTTP 劫持：你 DNS 解析的域名的 IP 地址不变。在和网站交互过程中的劫持了你的请求。在网站发给你信息前就给你返回了请求。

HTTP 劫持很好判断，当年正常访问一个无广告的页面时，页面上出现广告弹窗，很可能就是运营商劫持了 HTTP。

原理：

1. 标识 HTTP 连接。在天上飞的很多连接中，有许多种协议，第一步做的就是在 TCP 连接中，找出应用层采用了 HTTP 协议的连接，进行标识
2. 篡改 HTTP 响应体，可以通过网关来获取数据包进行内容的篡改
3. 抢先回包，将篡改后的数据包抢先正常站点返回的数据包先到达用户侧，这样后面正常的数据包在到达之后会被直接丢弃

如何防范 HTTP 劫持：

1. 事前加密
   HTTPS

很大一部分 HTTP 劫持，主要的原因就是在传输数据时都是明文的，使用了 HTTPS 后，会在 HTTP 协议之上加上 TLS 进行保护，使得传输的数据进行加密，但是使用 HTTPS，一定要注意规范，必须要全站使用 HTTPS，否则只要有一个地方没有使用 HTTPS，明文传输就很有可能会被 HTTP 劫持了。

2. 事中加密
   拆分 HTTP 请求数据包

在 HTTP 劫持的步骤中，第一步是标记 TCP 连接，因此只要躲过了标识，那么后续的运营商篡改就不会存在了，有一种方式就是拆分 HTTP 请求

拆分数据包就是把 HTTP 请求的数据包拆分成多个，运营商的旁路设备由于没有完整的 TCP/IP 协议栈，所以就不会被标志，而目标 web 服务器是有完整的 TCP/IP 协议栈，能接收到的数据包拼成完整的 HTTP 请求，不影响服务

3. 事后屏蔽
   通过浏览器 Api，根据若干规则去匹配 DOM 中的节点，对匹配到的节点作拦截和隐藏

CSP（内容安全策略），DOM 事件监听等。

CSP 是浏览器附加的一层安全层，用于对抗跨站脚本与数据注入，运营商植入内容性质与数据注入类似，因此，可以用 CSP 对抗运营商劫持。通过在 HTTP 响应头或 meta 标签设置好规则，支持拦截和上报劫持信息的功能。

DOM 事件监听主要是监听 DOMNodeInserted、DOMContentLoaded、DOMAttrModified 等事件，可以在前端 DOM 结构发生变化时触发回调，这时补充一些检测逻辑，即可判断是不是业务的正常 UI 逻辑，如果不是，即可认为是来自劫持

<span id="g5"></span>

### 5、 正则表达式之后向引用

#### 分组

组的定义：

正则表达式通过使用括号将表达式分为不同的分组，识别的方法是通过从左至右搜寻左半括号，遇到第一个左半括号时，则该左半括号与对应的右半括号所包含的内容即为第一分组，以此类推 。例如，在表达式((A)(B(C)))，有四个这样的组：((A)(B(C)))、(A)、(B(C))、(C)

#### 位置类元数据

即像^、$、\b、\B 这样的元字符，是用来表示一个位置。作为一个判断条件，匹配的字符需要满足这样的位置信息，但最终匹配的字符串中并不会包含这个样的位置信息。

#### 零宽断言

\b,^,$那样用于指定一个位置，这个位置应该满足一定的条件（即断言），因此它们也被称为零宽断言。

-   (?=exp) 匹配 exp 前面的位置，比如\b\w+(?=ing\b)，匹配以 ing 结尾的单词的前面部分(除了 ing 以外的部分)
-   (?<=exp) 匹配 exp 后面的位置，比如(?<=\bre)\w+\b 会匹配以 re 开头的单词的后半部分(除了 re 以外的部分)
-   (?!exp) 匹配后面跟的不是 exp 的位置
-   (?<!exp) 匹配前面不是 exp 的位置

#### 贪婪与懒惰

当正则表达式中包含能接受重复的限定符时，通常的行为是（在使整个表达式能得到匹配的前提下）匹配尽可能多的字符。以这个表达式为例：a.\*b，它将会匹配最长的以 a 开始，以 b 结束的字符串。被称为贪婪匹配。

有时，我们更需要懒惰匹配，也就是匹配尽可能少的字符。要在它后面加上一个问号?。这样.\*?就意味着匹配任意数量的重复，但是在能使整个匹配成功的前提下使用最少的重复。

例子：

```
let str = `
  <p>第一个</p>
  <pre><code>console.log(1);</code></pre>
  <p>第二个</p>
  <pre><code>console.log(2);</code></pre>`;

str.match(/(?<=<pre><code>)[\s\S]*?(?=<\/code><\/pre>)/gi);  // 获得,/somePattern*?/是懒惰匹配。

str.replace(/(?<=<pre><code>)[\s\S]*?(?=<\/code><\/pre>)/gi, 'asdf');  // 替换
```

<span id="g6"></span>

### 6、 React/Vue 不同组件之间的通信方式

#### Vue

-   父子组件用 Props 通信,父->子直接用 Props,子->父用$emit 触发事件
-   非父子组件用 Event Bus 通信
-   如果项目够复杂,可能需要 Vuex 等全局状态管理库通信
-   $dispatch(已经废除)和$broadcast(已经废除)

#### React

-   父子组件,父->子直接用 Props,子->父用 callback 回调
-   非父子组件,用发布订阅模式的 Event 模块
-   项目复杂的话用 Redux、Mobx 等全局状态管理管库
-   使用 Context API(getChildContext/contextTyps)

<span id="g7"></span>

### 7、 Thunk 函数

将多参数函数替换成单参数的版本，且只接受回调函数作为参数。

```
const Thunk=(fn)=>{
	return (...args)=>{
		return (callback)=>{
			fn.call(this,...args,callback)
		}
	}
}

const readFileThunk = Thunk(fs.readFile);
readFileThunk(path)(callback);
```

<span id="g8"></span>

### 8、this 指向

-   默认绑定： 纯粹的函数调用,this 就代表全局对象 Global
-   隐式绑定： 作为对象方法的调用,this 就指向上级对象
-   显示绑定： apply/call 调用,this 指向第一个参数提供的对象
-   new 绑定： 作为构造函数调用,this 就指向新对象

<span id="g9"></span>

### 9、Cookie

功能：按照一定规范来储存这些信息，并在随后的请求中将这些信息发送至服务器，cookie 的值被存储在名为 Cookie 的 HTTP 消息头中。

给 document 赋值并不会覆盖原有的值。

```Javascript
const setCookie=(key,value,expires)=>{
    document.cookie=!expires?
	    `${key}=${value}`:
		`${key}=${value};expires=${expires}`;

}

const getCookie=(key)=>{
    const reg =new RegExp(`(?<=${key}=)(\w)+(?=\;)`,'g');
    let result="";
    let cookie=document.cookie;
    if(cookie){
    	result=cookie.match(reg)[0]
    }

    return result;

}
```

Session:
创建于服务器端，保存于服务器，维护于服务器端,每创建一个新的 Session,服务器端都会分配一个唯一的 ID，并且把这个 ID 保存到客户端的 Cookie 中，保存形式是以 JSESSIONID 来保存的。

<span id="g10"></span>

### 10、排序算法

#### 快速排序

算法思想：

-   在数据集之中，选择一个元素作为"基准"（pivot）。

-   所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。

-   对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。

实现：

```
quickSort = (arr)=> {
	let mid= arr.splice(Math.floor(arr.length/2),1)[0];
    let left =[],right=[];

    arr.forEach((v,i)=>{
        if(v>mid){
            right.push(v)
        }else{
            left.push(v)
        }
    })
  if(left.length>1) left = quickSort(left)
  if(right.length>1) right = quickSort(right)
  return [...left,mid,...right]
};

quickSort([3,5,0,2,4,8,1,9,7,6,2])
```

时间复杂度： O(nlogn)

#### 冒泡排序

算法思想：
对相邻的元素进行两两比较，顺序相反则进行交换，这样，每一趟会将最小或最大的元素“浮”到顶端，最终达到完全有序。就好像一串气泡一样，最终从小到大或从大到小依次排下来。

代码实现：

```javascript
function BubbleSort(arr) {
    if (Object.prototype.toString.call(arr) !== "[object Array]") {
        throw TypeError("argument type error!");
    }
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
```

时间复杂度：
对于一个长度为 n 的数组，需要进行 n-1 轮冒泡操作，才能完全确保排序完成，时间复杂度为 O(n^2)。

#### 归并排序

“归并”的意思是将两个或两个以上的有序表组合成一个新的有序表。假如初始序列含有 n 个记录，则可看成是 n 个有序的子序列，每个子序列的长度为 1，然后两两归并，得到[n/2]（向上取整）个长度为 2 或 1 的有序子序列；再两两归并，……，如此重复，直到得到一个长度为 n 的有序序列为止，这种排序方法称为 2-路归并排序。

步骤解析：

1. 把长度为 n 的输入序列分成两个长度为 n/2 的子序列；
2. 对这两个子序列继续分为 m/2 的子序列，一直分下去，直为 1 个元素；
3. 将两个排序好的子序列合并成一个最终的排序序列。

```javascript
function merge(left, right) {
    var tmp = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) tmp.push(left.shift());
        else tmp.push(right.shift());
    }

    return tmp.concat(left, right);
}

function mergeSort(a) {
    if (a.length === 1) return a;

    var mid = ~~(a.length / 2),
        left = a.slice(0, mid),
        right = a.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}
```

[更多内容](https://juejin.im/post/5c8532ec6fb9a049a42fdd81?utm_source=gold_browser_extension)

<span id="g11"></span>

### 11、执行上下文(Execution Context)

js 的运行有三种环境：

-   Global Code, JavaScript 代码开始运行的默认环境
-   Function Code, 代码进入一个 JavaScript 函数
-   Eval Code, 使用 eval()执行代码

为了表示不同的运行环境，JavaScript 中有一个执行上下文（Execution context，EC）的概念。也就是说，当 JavaScript 代码执行的时候，会进入不同的执行上下文，这些执行上下文就构成了一个执行上下文栈（Execution context stack，ECS）。

执行上下文有三个重要的属性:

-   变量对象（Variable object，VO）,进入一个执行上下文时被激活（Activation object，AO）
-   作用域链（Scope chain）
-   this

解释器执行代码的伪逻辑:

1.  查找调用函数的代码
2.  执行代码之前，先进入创建上下文阶段
    -   分析形参
    -   扫描上下文的函数声明
        -   为发现的每一个函数，在变量对象上创建一个属性——确切的说是函数的名字——其有一个指向函数在内存中的引用
        -   如果函数的名字已经存在，引用指针将被重写
    -   扫描上下文的变量声明
        -   为发现的每个变量声明，在变量对象上创建一个属性——就是变量的名字，并且将变量的值初始化为 undefined
        -   如果变量的名字已经在变量对象里存在，将不会进行任何操作并继续扫描。
    -   求出上下文内部“this”的值。
3.  执行代码阶段
    -   在当前上下文上运行/解释函数代码，并随着代码一行行执行指派变量的值。

VO 对应第二阶段，AO 对应第三阶段。

作用域链：

对于自由变量，即当前作用域中没有定义的变量，需要向父级作用域寻找,
如果父级中没有找到，则再一层一层向上查找，直到全局作用域。这种一层一层间的关系，就是作用域链。

注意：自由变量的查找依据的是函数定义时的作用域，而不是执行时的作用域,例如闭包。

<span id="g12"></span>

### 12、 Promise 的实现

```
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;

class Promise{

	constructor(fn){
        //promise的状态
        this.state=PENDING; //[PENDING,FULFILLED,REJECTED]
        //FULFILLED 或者 REJECTED 时的返回值
        this.value=null;
        //回调函数
        this.handlers=[];
		this.resolve=this.resolve.bind(this);
		this.reject=this.reject.bind(this);
		this.done=this.done.bind(this);
		this.handle=this.handle.bind(this);



		doResolve(fn, this.resolve, this.reject);
	}

	fulfill(value){
		this.state=FULFILLED;
		this.value=value;
		//执行回调
		this.handlers.forEach(this.handle)
		this.handlers=null
		console.log("fulfill: value",value,"state",this.state)
	}

	reject(error){
		this.state=REJECTED;
		this.value=error;
		//执行回调
		this.handlers.forEach(this.handle)
		this.handlers=null
		console.log("reject",error)
	}

	//相当于发布者
	resolve(value){
		console.log("in resolve")
		try{
			//若value为 Promise 则返回该 Promise 的 then 方法，即value.then
			var then =getThen(value);
			if(then){
				 console.log("value is promise")
				 //若value为promise，递归 resolve 待解析的 Promise
				 doResolve(then.bind(value),this.resolve,this.reject);
				 return;
			}
			this.fulfill(value);
		}catch(e){
			console.log(e)
			this.reject(e);
		}

	}

	//观察者接口
	then(onFulfilled, onRejected) {
 	    const self = this

        return new Promise(function (resolve, reject) {

        return self.done.call(self,function (result) {
          if (typeof onFulfilled === 'function') {
            try {
              return resolve(onFulfilled(result))
            } catch (ex) {
              return reject(ex)
            }
          } else return resolve(result)
        }, function (error) {
          if (typeof onRejected === 'function') {
            try {
              return resolve(onRejected(error))
            } catch (ex) {
              return reject(ex)
            }
          } else return reject(error)
        })
      })
    }

	//观察者接口
	done(onFulfilled, onRejected){
		// 保证 done 总是异步执行
        setTimeout(() =>{
            this.handle({
                onFulfilled: onFulfilled,
                onRejected: onRejected
            })
        }, 0)
	}

	 // 保证 done 中回调的执行
    handle (handler) {

        if (this.state === PENDING) {
          this.handlers.push(handler)
          console.log("push to handlers",this.handlers)
        } else {
          if (this.state === FULFILLED &&
            typeof handler.onFulfilled === 'function') {
            handler.onFulfilled(this.value)
          }
          if (this.state === REJECTED &&
            typeof handler.onRejected === 'function') {
            handler.onRejected(this.value)
          }
        }
    }

	catch(callback){


	}
}

function getThen(value) {
  var t = typeof value;
  if (value && (t === 'object' || t === 'function')) {
    var then = value.then;
    if (typeof then === 'function') {
      return then;
    }
  }
  return null;
}

function doResolve(fn, onFulfilled, onRejected) {
  var done = false;
  try {
    fn(function (value) {
      if (done) return
      done = true
      onFulfilled(value)
    }, function (reason) {
      if (done) return
      done = true
      onRejected(reason)
    })
  } catch (e) {
	console.log("doResolve",e)
    if (done) return
    done = true
    onRejected(e)
  }
}




p1 =new Promise((resolve,reject)=>{
	console.log("1")
	setTimeout(()=>{
		resolve("p1")
	},1500)

})


p1.then(res=>{
	console.log("res",res)
	return "then--res"
})
```

<span id="g13"></span>

### 13、 闭包

闭包是即使被外部函数返回，依然可以访问到外部（封闭）函数作用域的函数。

或者说，是有权访问另一个函数作用域中的变量的函数。

执行栈包含作用域链，作用域链本质上是一个指针列表，存储着各种变量对象。

在作用域中，外部函数的活动对象始终处于第二位，外部函数的活动对象处于第三位，......
直至作为作用域终点的全局执行环境。

执行栈：

-   变量对象
-   作用域链
    -   2：全局函数变量对象指针
    -   1：外层函数变量对象指针
    -   0：当前函数变量对象指针
-   this

<span id="g14"></span>

### 14、DOM 事件

#### 事件冒泡 vs 事件捕获

-   事件冒泡：事件从内层元素开始触发，向外层传播，直到 document。
-   事件捕获：事件从外层元素（document）开始触发，向内层传播，直到 目标元素（target）。

事件冒泡是由微软提出的，而事件捕获是由网景公司提出的，后来 w3c 制定了统一的方案：先捕获再冒泡。

对于当事件捕获和事件冒泡一起存在的情况，事件传播过程如下：

1.  document 往 target 节点，捕获前进，遇到注册的捕获事件立即触发执行

2.  到达 target 节点，触发事件（对于 target 节点上，是先捕获还是先冒泡则捕获事件和冒泡事件的注册顺序，先注册先执行）

3.  target 节点 往 document 方向，冒泡前进，遇到注册的冒泡事件立即触发

事件捕获与事件冒泡的应用--事件委托,即利用事件冒泡原理，让节点的父级代为执行事件。

#### 防止冒泡和捕获

w3c 的方法是 e.stopPropagation()，IE 则是使用 e.cancelBubble = true

```javascript
function stopBubble(e) {
    //如果提供了事件对象，则这是一个非IE浏览器
    if (e && e.stopPropagation)
        //因此它支持W3C的stopPropagation()方法
        e.stopPropagation();
    //否则，我们需要使用IE的方式来取消事件冒泡
    else window.event.cancelBubble = true;
}
```

#### 取消默认事件

w3c 的方法是 e.preventDefault()，IE 则是使用 e.returnValue = false;

```javascript
//阻止浏览器的默认行为
function stopDefault(e) {
    //阻止默认浏览器动作(W3C)
    if (e && e.preventDefault) e.preventDefault();
    //IE中阻止函数器默认动作的方式
    else window.event.returnValue = false;
    return false;
}
```

#### return false

javascript 的 return false 只会阻止默认行为，而是用 jQuery 的话则既阻止默认行为又防止对象冒泡。

#### DOM0 级、2 级、3 级事件

DOM0 级:

```javascript
btn.onclick = function(event) {
    console.log(event); //  事件对象
};
```

DOM0 级可以认为 onclick 是 btn 的一个属性。

事件对象常用的方法：event.preventDefault() 和 event.stopPropagation()。

-   preventDefault() 阻止事件的默认行为

-   stopPropagation() 阻止事件传播（捕获阶段已发生，实际上是阻止事件外层冒泡）

W3C 后来将 DOM1 升级为 DOM2，DOM2 级规范开始尝试以一种符合逻辑的方式来标准化 DOM 事件。
DOM2 级则将属性升级为队列。

DOM2 级事件定义了两个方法，用于处理指定和删除事件处理程序的操作，addEventListener()和 removeEventListener()，所有的 DOM 节点中都包含这两个方法：

```javascript
target.addEventListener(type, listener[, options]);
target.addEventListener(type, listener[, useCapture]);

target.removeEventListener(type, listener[, options]);
target.removeEventListener(type, listener[, useCapture]);
```

-   type 事件名
-   listener 事件处理程序函数
-   useCapture，指定事件是否在捕获或冒泡阶段执行，默认 false。
-   options.passive A Boolean which, if true, indicates that the function specified by listener will never call preventDefault().

DOM2 级:

```javascript
btn.addEventListener(
    "click",
    function(event) {
        console.log(event);
    },
    false
);
```

##### DOM3 级事件

DOM3 级事件模块在 DOM2 级事件的基础上重新定义了这些事件，也添加了一些新事件。包括 IE9 在内的主流浏览器都支持 DOM2 级事件，IE9 也支持 DOM3 级事件。

dom3 级是对 dom 事件的规范和补充

主要有：

-   使用 focusin 和 focusout 不冒泡 代替冒泡的 focus blur
-   使用 mouseenter mouseleave 不冒泡代替冒泡的 mouseout 和 mouseover

还支持 wheel 事件 还有规范了 textinput 系列事件 keyup keypress keydown 等事件中的参数

<span id="g15"></span>

### 15、服务端渲染

在后端将数据拼接到 HTML 字符串上发送给客户端，浏览器从服务器接收 HTML 并渲染。服务端渲染的优势:

-   SEO
    -   爬虫可以抓取页面的关键字等信息
-   首屏直出
    -   减少首屏渲染时间

<span id="g16"></span>

### 16、浮点数知识

JavaScript 内部，所有数字都是以 64 位浮点数形式储存，即使整数也是如此。
根据国际标准 IEEE 754，任意一个二进制浮点数 V 可以表示成下面的形式：
V=(-1)<sup>s</sup>*M*2<sup>E</sup>

-   (-1)^s 表示符号位
-   2^E 表示指数位
-   M 表示有效数字，大于等于 1，小于 2。形式为 1.xx...xx。

#### 精度

对于 64 位的浮点数，最高的 1 位是符号位 s，接着的 11 位是指数 E，剩下的 52 位为有效数字 M。IEEE 754 规定，如果指数部分的值在 0 到 2047 之间（不含两个端点），那么有效数字的第一位默认总是 1，不保存在 64 位浮点数之中。也就是说，有效数字这时总是 1.xx...xx 的形式，其中 xx..xx 的部分保存在 64 位浮点数之中，最长可能为 52 位。因此，JavaScript 提供的有效数字最长为 53 个二进制位。

Javascript 浮点数运算会先把十进制数转化为二进制数（整数部分除 2 取余，逆序排列；小数部分乘 2 取整，顺序排列），然而有可能得到无限循环二进制数这个时候需要进行舍弃，造成舍入误差；然后再进行运算；最后再将结果转化为十进制数返回。

解决方案：

-   运算数全部存储为整数（无类型），然后格式化显示
-   建议是使用库，像 sinfuljs 或 mathjs。

#### 数值范围

根据标准，64 位浮点数的指数部分的长度是 11 个二进制位，意味着指数部分的最大值是 2047（2 的 11 次方减 1）。也就是说，64 位浮点数的指数部分的值最大为 2047，分出一半表示负数，则 JavaScript 能够表示的数值范围为 21024 到 2-1023（开区间），超出这个范围的数无法表示。

[更多内容](https://wangdoc.com/javascript/types/number.html)

<span id="g17"></span>

### 17、const 、let、块级作用域

#### 暂时性死区

ES6 明确规定，如果区块中存在 let 和 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

总之，在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

```
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

#### 块级作用域与函数声明

ES6 规定，块级作用域之中，函数声明语句的行为类似于 let，在块级作用域之外不可引用。但是在 ES6 环境的浏览器（或者 nodejs 环境）可以有自己的行为：

-   允许在块级作用域内声明函数。
-   函数声明类似于 var，即会提升到全局作用域或函数作用域的头部。
-   同时，函数声明还会提升到所在的块级作用域的头部。

```
// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }
(function () {
  var f = undefined;
  if (false) {
    function f() { console.log('I am inside!'); }
  }

  f();
}());
```

考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

#### const 的本质

const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const 只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。

```
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

<span id="g18"></span>

### 18、 DocumentFragment

The DocumentFragment interface represents a minimal document object that has no parent. It is used as a lightweight version of Document that stores a segment of a document structure comprised of nodes just like a standard document. The key difference is that because the document fragment isn't part of the active document tree structure, changes made to the fragment don't affect the document, cause reflow, or incur any performance impact that can occur when changes are made.

example:

```
const fragment = document.createDocumentFragment();
const liItem = document.createElement("li");
liItem.innerText = "hello";
fragment.appendChild(liItem);
document.body.appendChild(fragment);
```

<span id="g19"></span>

### 19、同源策咯

同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。

同源是指：从协议、域名到端口都必须相同。

限制范围包括：

-   Cookie
    -   Cookie 是服务器写入浏览器的一小段信息，只有同源的网页才能共享。
-   iframe

    -   如果两个网页不同源，就无法拿到对方的 DOM。

-   AJAX

        *   同源政策规定，AJAX 请求只能发给同源的网址，否则就报错。可以使用 JSONP、WebSocket、CORS 等技术解决问题。

<span id="g20"></span>

### 20、Express 中间件

Express 是一个路由和中间件 Web 框架，其自身只具有最低程度的功能：Express 应用程序基本上是一系列中间件函数调用。

中间件函数能够访问请求对象 (req)、响应对象 (res) 以及应用程序的请求/响应循环中的下一个中间件函数。下一个中间件函数通常由名为 next 的变量来表示。

中间件函数可以执行以下任务：

-   执行任何代码。
-   对请求和响应对象进行更改。
-   结束请求/响应循环。
-   调用堆栈中的下一个中间件函数。

如果当前中间件函数没有结束请求/响应循环，那么它必须调用 next()，以将控制权传递给下一个中间件函数。否则，请求将保持挂起状态。

例如：

```javascript
var express = require("express");
var app = express();
app.use("/user", function(req, res, next) {
    //TODO
    next();
});
app.listen(8080);
```

#### app.use 做了什么？

express 内部维护一个函数数组，这个函数数组表示在发出响应之前要执行的所有函数，也就是中间件数组。

使用 app.use(fn)后，传进来的 fn 就会被扔到这个数组里，执行完毕后调用 next()方法执行函数数组里的下一个函数，如果没有调用 next()的话，就不会调用下一个函数了，也就是说调用就会被终止。

#### 实现简单的 Express 中间件

```javascript
var http = require("http");

/**
 * express实现中间件机制
 *
 * @return {app}
 */
function express() {
    var funcs = []; // 待执行的函数数组

    var app = function(req, res) {
        var i = 0;

        function next() {
            var task = funcs[i++]; // 取出函数数组里的下一个函数
            if (!task) {
                // 如果函数不存在,return
                return;
            }
            task(req, res, next); // 否则,执行下一个函数
        }

        next();
    };

    /**
     * use方法就是把函数添加到函数数组中
     * @param task
     */
    app.use = function(task) {
        funcs.push(task);
    };

    return app; // 返回实例
}
```

### https/http2

#### SSL

SSL 协议的握手过程:
第一步，客户端给出协议版本号、一个客户端生成的随机数（Client random），以及客户端支持的加密方法。

第二步，服务器确认双方使用的加密方法，并给出数字证书、以及一个服务器生成的随机数（Server random）。

第三步，客户端确认数字证书有效，然后生成一个新的随机数（Premaster secret），并使用数字证书中的公钥，加密这个随机数，发给服务器。

第四步，服务器使用自己的私钥，获取客户端发来的随机数（即 Premaster secret）。

第五步，客户端和服务器根据约定的加密方法，使用前面的三个随机数，生成"对话密钥"（session key），用来加密接下来的整个对话过程。

参考[图解 SSL/TLS 协议](http://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html)

#### HTTP2 新特性

1.  二进制分帧层
    HTTP/2 所有性能增强的核心在于新的二进制分帧层，它定义了如何封装 HTTP 消息并在客户端与服务器之间传输。

        <div align="center"><img width="400"src="http://cdn.inoongt.tech/images/thinkin/http2_binary_framing.svg"/></div>
        这里所谓的“层”，指的是位于套接字接口与应用可见的高级 HTTP API 之间一个经过优化的新编码机制：HTTP 的语义（包括各种动词、方法、标头）都不受影响，不同的是传输期间对它们的编码方式变了。 HTTP/1.x 协议以换行符作为纯文本的分隔符，而 HTTP/2 将所有传输的信息分割为更小的消息和帧，并采用二进制格式对它们编码。

    这样一来，客户端和服务器为了相互理解，都必须使用新的二进制编码机制：HTTP/1.x 客户端无法理解只支持 HTTP/2 的服务器，反之亦然。 不过不要紧，现有的应用不必担心这些变化，因为客户端和服务器会替我们完成必要的分帧工作。

2.  多路复用
    在一个 TCP 连接上，我们可以向对方不断发送帧，每帧的 stream identifier 的标明这一帧属于哪个流，然后在对方接收时，根据 stream identifier 拼接每个流的所有帧组成一整块数据。
    把 HTTP/1.1 每个请求都当作一个流，那么多个请求变成多个流，请求响应数据分成多个帧，不同流中的帧交错地发送给对方，这就是 HTTP/2 中的多路复用。

3.  服务端推送

浏览器发送一个请求，服务器主动向浏览器推送与这个请求相关的资源，这样浏览器就不用发起后续请求。

4. Header 压缩 (HPACK)

    使用 HPACK 算法来压缩首部内容
    <span id="g22"></span>

参考：https://developers.google.com/web/fundamentals/performance/http2/?hl=zh-cn

#### 队首阻塞

1.  http1.0 的队首阻塞

对于同一个 tcp 连接，所有的 http1.0 请求放入队列中，只有前一个请求的响应收到了，然后才能发送下一个请求。

可见，http1.0 的队首组塞发生在客户端。

2. http1.1 的队首阻塞

对于同一个 tcp 连接，http1.1 允许一次发送多个 http1.1 请求，也就是说，不必等前一个响应收到，就可以发送下一个请求，这样就解决了 http1.0 的客户端的队首阻塞。但是，http1.1 规定，服务器端的响应的发送要根据请求被接收的顺序排队，也就是说，先接收到的请求的响应也要先发送。这样造成的问题是，如果最先收到的请求的处理时间长的话，响应生成也慢，就会阻塞已经生成了的响应的发送。也会造成队首阻塞。

可见，http1.1 的队首阻塞发生在服务器端。

3. http2 是怎样解决队首阻塞的

http2 无论在客户端还是在服务器端都不需要排队，在同一个 tcp 连接上，有多个 stream，由各个 stream 发送和接收 http 请求，各个 steam 相互独立，互不阻塞。

只要 tcp 没有人在用那么就可以发送已经生成的 requst 或者 reponse 的数据，在两端都不用等，从而彻底解决了 http 协议层面的队首阻塞问题。

### 订阅/发布模式（subscribe&publish）

#### 观察者设计模式

观察者模式 在软件设计中是一个对象，维护一个依赖列表，当任何状态发生改变自动通知它们。

#### 订阅发布模式

订阅发布模式定义了一种一对多的关系，让多个观察者同时监听某一个主题对象，这个主题对象的状态发生改变时就会通知所有观察者对象。模式流程：发布者发出通知 => 主题对象收到通知并推送给订阅者 => 订阅者执行相应操作

发布者和订阅者不知道对方的存在。需要一个第三方组件，叫做信息中介，它将订阅者和发布者串联起来，它过滤和分配所有输入的消息。

```
//发布者
let pub={
  publish:function(dep){
    dep.notify();
  }
}
//订阅者
let sub1={update:()=>{console.log(1)}}
let sub2={update:()=>{console.log(2)}}

//主题
class Dep{
  constructor(subs){
    this.subs=subs||[]
  }
  notify(){
    this.subs.forEach((sub)=>sub.update())
  }
}

let dep =new Dep([sub1,sub2])
//发布者发布消息，主题对象执行notify方法，进而触发订阅者的update方法
pub.publish(dep);
```

<span id="g23"></span>

### Vue 相关

#### 生命周期

vue 生命周期整体上包含 create、mount、update、destroy

一段 Vue 的源码：

```javascript
initLifecycle(vm);
initEvents(vm);
initRender(vm);
callHook(vm, "beforeCreate");
initInjections(vm); // resolve injections before data/props
initState(vm);
initProvide(vm); // resolve provide after data/props
callHook(vm, "created");
```

1. beforeCreate
   InitEvents、InitLifecycle 后调用
2. created
   initInjections、initState 后调用，initState 中调用 observe 方法对数据进行观察

    ```javascript
    observe(data, true /_ asRootData _/)
    ```

3. beforeMount
   接下来根据 el 或者 template 选项找到模板并编译产生 render function，之后调用 beforeMount

4. mounted
   执行 render function，挂载 DOM

5. beforeUpdate
   当 vue 发现 data 中的数据发生了改变，调用 beforeUpdate

6. updated
   更新虚拟 dom，重新渲染，调用 updated

7. beforeDestroy
   beforeDestroy 钩子函数在实例销毁之前调用。在这一步，实例仍然完全可用。
8. destroyed
   调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

#### 双向绑定

1. new Vue:

-   observe=>defineReative
    -   setter =>dep.notify setter 发布通知
        -   sub.update=>
            -   更新 node
            -   sub.get=>getter
    -   getter=>dep.addSup(sub) 收集依赖
-   compile=>new Watcher 为每个与数据绑定相关的节点生成一个订阅者 watcher，即 sub
    -   this.upate(sub.update) 初始化

2. 事件处理=>setter 继续以上流程

[vue 双向数据绑定实现原理](https://juejin.im/entry/59116fa6a0bb9f0058aaaa4c)
[vue 依赖收集原理](https://juejin.im/post/5b40c8495188251af3632dfa)

<span id="g24"></span>

### 函数模拟 A instanceof B

js 原生的 instanceof 可以检测某个对象是不是另一个对象的实例。
用函数模拟 instanceof 的原理是：查看对象 B 的 prototype 指向的对象是否在对象 A 的[[prototype]]链上。如果在，则返回 true,如果不在则返回 false。不过有一个特殊的情况，当对象 B 的 prototype 为 null 将会报错(类似于空指针异常)。

```javascript
function _instanceof(A, B) {
    let _prototype = B.prototype;
    let _proto = A.__proto__;

    while (true) {
        //Object.prototype.__proto__ === null
        if (_proto === null) return false;
        if (_proto === _prototype) return true;
        _proto = _proto.__proto__;
    }
}
```

<span id="g25"></span>

### typeof 原理

同的对象在底层都表示为二进制， 在 JavaScript 中二进制前三位都为 0 的话会被判断为 object 类型， null 的二进制表示是全 0， 自然前三位也是 0， 所以执行 typeof 时会返回“object”。

在 javascript 的最初版本中，使用的 32 位系统，为了性能考虑使用低位存储了变量的类型信息：

000：对象
1：整数
010：浮点数
100：字符串
110：布尔
有 2 个值比较特殊：

undefined：用 - （−2^30）表示。
null：对应机器码的 NULL 指针，一般是全零。

<span id="g26"></span>

### Iterator

Iterator 是一种接口，为各种不同的数据结构（Array,Object,Map,Set）提供统一的访问机制。

Iterator 的遍历过程:

1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
2. 第一次调用指针对象的 next 方法，可以将指针指向数据结构的第一个成员。
3. 第二次调用指针对象的 next 方法，指针就指向数据结构的第二个成员。
4. 不断调用指针对象的 next 方法，直到它指向数据结构的结束位置。

每一次调用 next 方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含 value 和 done 两个属性的对象。其中，value 属性是当前成员的值，done 属性是一个布尔值，表示遍历是否结束。

数组有内置的 iterator，可以通过 Symbol.iterator 获取：

```javascript
let myArray = [1, 2, 3];
it = myArray[Symbol.iterator]();
it.next();
it.next();
it.next();
it.next(); //{done:true}
```

而对象没有内置的 iterator，可以自己定义：

```javascript
let myObject = { a: 1, b: 2 };
Object.defineProperty(myObject, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function() {
        let o = this;
        let index = 0;
        let keys = Object.keys(o);
        return {
            next: function() {
                return {
                    value: o[keys[index++]],
                    done: index > keys.length
                };
            }
        };
    }
});

let it = myObject[Symbol.iterator]();
it.next();
```

<span id="g27"></span>

### ToPrimitive

JavaScript 引擎内部的抽象操作 ToPrimitive() 有着这样的签名:

```javascript
ToPrimitive(input，PreferredType?)
```

可选参数 PreferredType 可以是 Number 或者 String。 它只代表了一个转换的偏好，转换结果不一定必须是这个参数所指的类型，但转换结果一定是一个原始值。 如果 PreferredType 被标志为 Number，则会进行下面的操作来转换 input:

-   如果 input 是个原始值，则直接返回它。

-   否则，如果 input 是一个对象。如果有 obj。valueOf 方法，则调用 obj.valueOf() 方法。 如果 obj.valueOf()返回值是一个原始值，则返回这个原始值。

-   否则，调用 obj.toString() 方法。 如果返回值是一个原始值，则返回这个原始值。

-   否则，抛出 TypeError 异常。

如果 PreferredType 被标志为 String，则转换操作的第二步和第三步的顺序会调换。 如果没有 PreferredType 这个参数，则 PreferredType 的值会按照这样的规则来自动设置：

Date 类型的对象会被设置为 String，

其它类型的值会被设置为 Number。

```javascript
var obj = {
    valueOf: function() {
        console.log("valueOf");
        return {}; // not a primitive
    },
    toString: function() {
        console.log("toString");
        return {}; // not a primitive
    }
};
Number(obj);
```

[更多内容](https://justjavac.com/javascript/2012/12/20/object-plus-object.html)

<span id="g28"></span>

### BFC

在解释 BFC 之前，先说一下文档流。我们常说的文档流其实分为定位流、浮动流和普通流三种。而普通流其实就是指 BFC 中的 FC。FC 是 formatting context 的首字母缩写，
直译过来是格式化上下文，它是页面中的一块渲染区域，有一套渲染规则，决定了其子元素如何布局，以及和其他元素之间的关系和作用。常见的 FC 有 BFC、IFC，还有 GFC 和 FFC。
BFC 是 block formatting context，也就是块级格式化上下文，是用于布局块级盒子的一块渲染区域.

满足下列条件之一就可触发 BFC:

1. 根元素，即 HTML 元素

2. float 的值不为 none

3. overflow 的值不为 visible

4. display 的值为 inline-block、table-cell、table-caption

5. position 的值为 absolute 或 fixed

BFC 布局规则：

1. 内部的盒子(box)会在垂直方向一个接一个地放置
2. box 垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻 box 的 margin 会发生重叠。
3. 每个元素 margin box 左边，与包含块 border box 的左边相接触（对于从左向右的格式化，否则相反），即使存在浮动也是如此
4. BFC 的区域不会与 float box 重叠
5. BFC 是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素
6. 计算 BFC 高度时，浮动元素也参与计算

BFC 应用：

1. 清除浮动
2. 防止 margin 重叠
    - 根据 BFC 布局规则第二条：Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠。
      我们可以在 p 外面包裹一层容器，并触发该容器生成一个 BFC。那么两个 P 便不属于同一个 BFC，就不会发生 margin 重叠了。
3. 多栏布局的一种方式

参考：
https://www.w3cplus.com/css/understanding-bfc-and-margin-collapse.html
https://www.jianshu.com/p/fc4c2d8a0018
<span id="g29"></span>

### 大整数相加

主要思想:逐位相加并进位
下面这个字符串相加函数，接收两个字符串参数，并返回它们相加之后的结果，也是字符串形式。
代码如下:

```javascript
function sumStrings(a, b) {
    //通过补零让a和b对齐
    //若a比b短，则对a补零
    while (a.length < b.length) {
        a = "0" + a;
    }
    //若b比a短，则对b补零
    while (b.length < a.length) {
        b = "0" + b;
    }
    //是否有进位
    var addOne = 0;
    //结果数组
    var result = [];
    //从个位开始相加
    for (var i = a.length - 1; i >= 0; i--) {
        var c1 = a.charAt(i) - 0;
        var c2 = b.charAt(i) - 0;
        var sum = c1 + c2 + addOne;
        //若数字相加大于9，则进位
        if (sum > 9) {
            result.unshift(sum - 10);
            addOne = 1;
        } else {
            result.unshift(sum);
            addOne = 0;
        }
    }
    //应付下面的情况：
    //"99" + "11" => "110"
    //它最后仍然要进位
    if (addOne) {
        result.unshift(addOne);
    }
    //应付如下的情况
    //"01" + "01" => "2"
    //而不是"02"，所以移除第一位的"0"
    if (!result[0]) {
        result.splice(0, 1);
    }
    return result.join("");
}
```

<span id='g30'></span>

### Object.assign 模拟实现

The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.
Properties in the target object will be overwritten by properties in the sources if they have the same key. Later sources' properties will similarly overwrite earlier ones.

Object.assign 模拟实现的思路如下：

1. 判断原生 Object 是否支持该函数，如果不存在的话创建一个函数 assign，并使用 Object.defineProperty 将该函数绑定到 Object 上。
2. 判断参数是否正确（目标对象不能为空，我们可以直接设置{}传递进去,但必须设置值）
3. 使用 Object() 转成对象，并保存为 result，最后返回这个对象 result
4. 使用 for..in 循环遍历出所有可枚举的自有属性。并复制给新的目标对象(hasOwnProperty 返回非原型链上的属性)

```javascript
if (!Object.assign) {
    Object.definedProperty(Object, "assign", {
        configurable: true,
        enumerable: false,
        writable: false,
        value: function(targetObj) {
            if (targetObj == null) {
                throw new TypeError(
                    "Cannot convert undefined or null to object"
                );
            }
            /**
             * Object.assign('',{a:1}) 返回 String {"", a: 1, length: 0}
             */
            var result = Object(targetObj);

            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource && typeof nextSource === "object") {
                    for (var key in nextSource) {
                        if (
                            Object.prototype.hasOwnProperty.call(
                                nextSource,
                                key
                            )
                        ) {
                            result[key] = nextSource[key];
                        }
                    }
                }
            }
            return result;
        }
    });
}
```

<span id='g31'></span>

### Http 幂等性

#### 概述

幂等性原本是数学上的概念，即使公式：f(x)=f(f(x)) 能够成立的数学性质。用在编程领域，则意为对同一个系统，使用同样的条件，一次请求和重复的多次请求对系统资源的影响是一致的。
幂等性是分布式系统设计中十分重要的概念，具有这一性质的接口在设计时总是秉持这样的一种理念：调用接口发生异常并且重复尝试时，总是会造成系统所无法承受的损失，所以必须阻止这种现象的发生。

#### GET 和 POST 的幂等性

HTTP GET 方法，用于获取资源，不管调用多少次接口，结果都不会改变，所以是幂等的；HTTP POST 方法是一个非幂等方法，因为调用多次，都将产生新的资源。所以，GET 和 POST 最大的区别主要是 GET 请求是幂等性的，POST 请求不是。
正因为它们有这样的区别，所以不应该且不能用 get 请求做数据的增删改这些有副作用的操作。因为 get 请求是幂等的，在网络不好的隧道中会尝试重试。如果用 get 请求增数据，会有重复操作的风险，而这种重复操作可能会导致副作用（浏览器和操作系统并不知道你会用 get 请求去做增操作）。

<span id='g32'></span>

### 判断一个对象是否是数组

#### 1.instanceof

A instanceof B 可以查看 B 的 prototype 指向的对象是否在对象 A 的[[prototype]]链上。

缺点：如果 A 的**proto**被改变，则失效。

```
a=new Object()
a.__proto__=Array.prototype
a instancefo Array // true
Object.prototype.toString.apply(a) //"[object Object]"
```

#### 2.constructor

每一个实例化的数组拥有一个 constructor 属性，这个属性指向生成这个数组的方法 Array。

```
const a = [];
console.log(a.constructor == Array);//true
```

缺点：constructor 是可以改写的

```
const a=[]
a.constructor =Object
console.log(a.constructor === Object) //true
```

#### 3.Object.prototype.toString

Object.prototype.toString 会返回对象类型的信息。

```
const a = [1];
const b = {0:0};
const c = 'hello';
a.toString();//"1",这里调用的是Array.prototype.toString方法
b.toString();//"[object Object]"
c.toString();//"hello"
Object.prototype.toString.call(a);//"[object Array]"
Object.prototype.toString.call(b);//"[object Object]"
Object.prototype.toString.call(c);//"[object String]"
```

缺点：Object.prototype.toString 也是可以被修改的

```
Object.getOwnPropertyDescriptor(Object.prototype,'toString').writable // true
```

#### 4.Array.isArray

```
const a=[];
Array.isArray(a); // true
```

缺点：Array.isArray 是 ES5 标准中增加的方法，部分浏览器不支持。
可以使用以下代码兼容：

```
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```

<span id='g33'></span>

### 跨域

解决方法：

#### 1. JSONP

在同源策略下，在某个服务器下的页面是无法获取到该服务器以外的数据的，但 img、iframe、script 等标签是个例外，这些标签可以通过 src 属性请求到其他服务器上的数据。利用 script 标签的开放策略，我们可以实现跨域请求数据，当然，也需要服务端的配合。当我们正常地请求一个 JSON 数据的时候，服务端返回的是一串 JSON 类型的数据，而我们使用 JSONP 模式来请求数据的时候，服务端返回的是一段可执行的 JavaScript 代码,而这段代码可以包含数据。例如：

客户端请求,并指定回调函数的名字：

```
function appendScript(src){
    let script=document.createElement("script");
    script.src=src;
    document.appendChild(script)
}

function somefun(data){
    console.log("data:",data)
}

appdendScript("http://a.com&callback=somefun");
```

服务端返回 Javascript 代码：

```
"somefun({key:somevalue});"
```

#### 2. CORS

跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。

#### 3. 代理

#### 4. 修改 document.domain 来跨子域

#### 5. window.postMessage 实现 iframe 跨域通信

在 HTML5 中，Window.postMessage() 方法可以安全地实现跨源通信。通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有相同的协议（通常为 https），端口号（443 为 https 的默认值），以及主机 (两个页面的模数 Document.domain 设置为相同的值) 时，这两个脚本才能相互通信。window.postMessage() 方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。

Window.postMessage 有三个参数，message、targetOrigin 和可选的[transfer])，其中 message 代表将要发送到其他窗口的数据，targetOrigin 表示接收数据消息的目标窗口，transfer 代表消息的所有权。另外还有一个 window.addEventListener(“message”, receiveMessage, false)，用以监听消息数据的反馈，其中的 message 就存在 data、origin 和 source 三个属性，origin 属性表示消息数据发送方的身份，只有和原来指定发送方的协议、域名或端口一致，才能建立通信。具体请参考 postMessage 的详细介绍。

实例：

index.html（http://localhost:1234）

```html
<script type="text/javascript">
  // 页面加载完后才能获取dom节点（iframe）
  window.onload = function(){
    // 向目标源发送数据
    document.getElementsByTagName('iframe')[0].contentWindow.postMessage({"age":10}, '*');
    // window.frames[0].contentWindow.postMessage({"age":10}, '*');
  };

  // 监听有没有数据发送过来
  window.addEventListener('message', function(e) {
      console.log('parent received:',e);
  });
</script>
<iframe src="http://localhost:1235" name='frame'></iframe>
```

child.html（http://localhost:1235）

```html
<script type="text/javascript">
  // 监听有没有数据发送过来
  window.addEventListener('message', function(e){
      // 判断数据发送方是否是可靠的地址
      if(e.origin !== 'http://localhost:1234')
        return;
    // 打印数据格式
    console.log('child received',e);
    // 回发数据
    e.source.postMessage('hello world', e.origin);
  }, false);
</script>
```

#### 6. window.name

全局变量 window 有一个特殊的 name 属性，其有以下特征：
1）每个窗口都有独立的 window.name 与之对应；
2）在一个窗口的生命周期中（被关闭前），窗口载入的所有页面同时共享一个 window.name，每个页面对 window.name 都有读写的权限；
3）window.name 一直存在与当前窗口，即使是有新的页面载入也不会改变 window.name 的值；
4）window.name 可以存储不超过 2M 的数据，数据格式按需自定义。

window.name 可以传入 json、string,并且会对传入数据做一个 toString 操作。

window.name 跨域原理：

<div align="center"><img width="300"src="http://cdn.inoongt.tech/images/thinkin/windowname.png"/></div>

通过在 iframe 中加载目标页面的资源，将该资源将存储至 iframe 的 name 属性。此 name 属性值可被原始页面获取到，以访问 Web 服务发送的信息。但 name 属性仅对相同域名的 iframe 可访问。这意味着为了访问 name 属性，当远程 Web 服务页面被加载后，必须导航 iframe 回到原始域。然而 name 属性是不安全的,一旦获得，建议销毁 iframe 。

实例

www.a.com 请求 www.b.com 的数据：

```javascript
const getDataByWindowName = url => {
    let hasLoaded = false;
    const iframe = document.createElement("iframe");
    const loadData = function() {
        if (hasLoaded) {
            var data = iframe.contentWindow.name; //获取window.name
            console.log(data);
            //销毁数据
            iframe.contentWindow.document.write("");
            iframe.contentWindow.close();
            document.body.removeChild(iframe);
        } else {
            hasLoaded = true;
            // iframe载入同域页面
            iframe.contentWindow.location = "www.a.com/xxx";
        }
    };
    iframe.src = url;
    if (iframe.attachEvent) {
        iframe.attachEvent("onload", loadData);
    } else {
        iframe.onload = loadData;
    }
    document.body.appendChild(iframe);
};
getDataByWindowName("www.b.com/api");
```

www.b.com 页面需要将数据存储入 window.name 中：

```javascript
window.name = "data";
```

#### X-Frame-Options

从安全角度考虑，如果不想让自己的网页数据被跨域访问，可以设置 X-Frame-Options:DENY/SAMEORIGIN/ALLOW-FROM uri。

> X-Frame-Options HTTP 响应头是用来给浏览器指示允许一个页面可否在 frame, iframe 或者 object 中展现的标记。网站可以使用此功能，来确保自己网站的内容没有被嵌到别人的网站中去，也从而避免了点击劫持 (clickjacking) 的攻击。

<span id='g34'></span>

### Debounce and Throllte

Debounce 和 Throllte 都是用来防止函数被高频调用的函数，但二者又有所不同：

-   Debounce 被称为防抖函数，debounce(fn,wait)会等待 wait 时间间隔后执行 fn,若 wait 期间 debounce 被调用，则重新计时(fn 不会被执行)
-   Throttle 被成为节流函数，throttle(fn,wait)在 wait 时间间隔内至多执行一次 fn

#### 简单的实现

Debounce：

```javascript
function debounce(fn, wait) {
    var timer;

    var result = function() {
        var args = Array.prototype.slice.call(arguments);
        var context = this;

        clearTimeout(timer);

        timer = setTimeout(function() {
            fn.apply(this, args);
        }, wait);
    };

    return result;
}
```

Throttle:

```javascript
function throttle(fn, wait) {
    var timer;
    var lastTime = 0;
    var throttled = function() {
        var currTime = Date.now();
        var args = Array.prototype.slice.call(arguments);
        var context = this;
        var remaining = currTime - lastTime;

        if (remaining <= 0 || remaining >= wait) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            lastTime = currTime;
            return fn.apply(this, args);
        } else {
            clearTimeout(timer);
            // 保证在当前时间区间结束后，再执行一次 fn
            timer = setTimeout(function() {
                // lastTime=Date.now() //? or currTime
                fn.apply(this, args);
            }, remaining);
        }
    };

    return throttled;
}
```

#### undersocre 的实现

```javascript
// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
_.throttle = function(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : _.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = _.now();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };

    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };
    return throttled;
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
_.debounce = function(func, wait, immediate) {
    var timeout, result;

    var later = function(context, args) {
        timeout = null;
        if (args) result = func.apply(context, args);
    };

    var debounced = restArguments(function(args) {
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(later, wait);
            if (callNow) result = func.apply(this, args);
        } else {
            timeout = _.delay(later, wait, this, args);
        }

        return result;
    });

    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
};
```

<span id='g35'></span>

### Session and SessionStorage

sSession 是服务器端使用的一种记录客户端状态的机制。客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上，这就是 Session。客户端浏览器再次访问时只需要从该 Session 中查找该客户的状态就可以了。session 的存储方式也有多样，最为传统的就是服务端(内存或者数据库)保存 session 的内容，客户端浏览器 cookie 保存 sessionid，服务端通过客户端每次 http 请求带上的 cookie 中的 sessionid 去找到对应此用户的 session 内容。

#### Session 与客户端

虽然 Session 保存在服务器，对客户端是透明的，它的正常运行仍然需要客户端浏览器的支持。这是因为 Session 需要使用 Cookie 作为识别标志。HTTP 协议是无状态的，Session 不能依据 HTTP 连接来判断是否为同一客户，因此服务器向客户端浏览器发送一个名为 JSESSIONID 的 Cookie，它的值为该 Session 的 id。Session 依据该 Cookie 来识别是否为同一用户。

该 Cookie 为服务器自动生成的，它的 maxAge 属性一般为-1，表示仅当前浏览器内有效，并且各浏览器窗口间不共享，关闭浏览器就会失效。因此同一机器的两个浏览器窗口访问服务器时，会生成两个不同的 Session。但是由浏览器窗口内的链接、脚本等打开的新窗口除外。这类子窗口会共享父窗口的 Cookie，因此会共享一个 Session。

#### Session 的有效期

Session 生成后，只要用户继续访问，服务器就会更新 Session 的最后访问时间，并维护该 Session 。用户每访问服务器一次，无论是否读写 Session，服务器都认为该用户的 Session"活跃（active）"了一次。

由于会有越来越多的用户访问服务器，因此 Session 也会越来越多。为防止内存溢出，服务器会把长时间内没有活跃的 Session 从内存删除。这个时间就是 Session 的超时时间 。如果超过了超时时间没访问过服务器，Session 就自动失效了。

#### SessionStorage

SessionStorage HTML5 Web 存储中的一种， 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据，存储在 sessionStorage 里面的数据在页面会话结束时会被清除。页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。`

HTML5 Web 存储的数据不会被保存在服务器上，只用于客户端上，可以存储大量的数据，而不影响网站的性能。

SessionStorage 特点

-   同源策略限制。若想在不同页面之间对同一个 sessionStorage 进行操作，这些页面必须同源。
-   本地存储。seesionStorage 的数据不会跟随 HTTP 请求一起发送到服务器，只会在本地生效，并在关闭标签页后清除数据。
-   存储方式。seesionStorage 的存储方式采用 key、value 的方式。
-   存储上限限制：不同的浏览器存储的上限也不一样，但大多数浏览器把上限限制在 5MB 以下。

#### 与 localStorage 的区别

localStorage 的同源策略限制、本地存储、存储方式、存储上限限制和 SessionStorage 相同，区别在于：

-   SessionStorage 临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据；LocalStorage 可以永久保存数据。
-   SessionStorage 只适用于同一个标签页，其他标签页内无法直接共享（除非在同源标签之间访问其他窗口）；LocalStorage 相比而言可以在多个标签页中共享数据。

### Bind 的实现

<span id='g36'></span>

注意：

1. 传入 context 为 null、undefined 等无效值，通过 apply(context)将 this 绑定到全局变量
2. 必须通过函数调用 bind，否则产生 TypeError
3. 参数的处理，合并参数 args.concat(...arguments)
4. 函数返回值的处理，'return fn.apply()'
5. 通过 new 调用 bind 返回的函数时，需要返回被调用的函数的实例

```javascript
Function.prototype._bind = function(context) {
    if (typeof this !== "function") {
        throw TypeError("argument error");
    }
    var fn = this;
    var args = Array.prototype.slice.call(arguments).slice(1);

    return function F() {
        //通过new调用bind返回的函数，返回fn的实例
        if (this instanceof F) {
            return new fn(...args, ...arguments);
        }
        return fn.apply(context, args.concat(...arguments));
    };
};
```

<span id='g37'></span>

### 内存管理

#### 内存生命周期

1. 分配你所需要的内存
2. 使用分配到的内存（读、写）
3. 不需要时将其释放\归还

#### 垃圾回收

##### 引用计数垃圾收集

这是最初级的垃圾收集算法。此算法把“对象是否不再需要”简化定义为“对象有没有其他对象引用到它”。如果没有引用指向该对象（零引用），对象将被垃圾回收机制回收。

这个算法的缺点是不能解决循环引用的问题，于是有了标记-清除算法。

步骤：

1. 声明一个变量并将引用类型的值赋给该变量，则该值的引用次数为 1
2. 如果同一个值又被赋予另一个变量，则该值的引用次数加 1
3. 如果包含对该值的引用的变量被赋予另一个值时，引用次数减 1
4. 当该值的引用次数为 0 时，将其回收。

##### 标记-清除算法

这个算法假定设置一个叫做根（root）的对象（在 Javascript 里，根是全局对象）。垃圾回收器将定期从根开始，找所有从根开始引用的对象，然后找这些对象引用的对象……从根开始，垃圾回收器将找到所有可以获得的对象和收集所有不能获得的对象。

算法包含以下步骤：

1. 垃圾回收器生成一个根列表。根通常是将引用保存在代码中的全局变量。在 JavaScript 中，window 对象是一个可以作为根的全局变量。
2. 所有的根都被检查和标记成活跃的（不是垃圾），所有的子变量也被递归检查。
3. 所有没有被标记成活跃的内存都被认为是垃圾。垃圾回收器就可以释放内存并且把内存还给操作系统。

这个算法的缺点: 那些无法从根对象查询到的对象都将被清除。

#### 回收规则

标记-清除算法是现代浏览器所采用的算法，根据标记-清除算法可以总结出代码回收的规则：

1. 全局变量不会被回收。

2. 局部变量会被回收，也就是函数一旦运行完以后，函数内部的东西都会被销毁。

3. 只要被另外一个作用域所引用就不会被回收。

#### 4 种常见的 JavaScript 内存泄漏

1. 意外的全局变量
2. 被遗忘的定时器或者回调
3. 闭包
4. DOM 外引用

参考:
https://segmentfault.com/a/1190000011411121

具体例子：
引用了第三方库，但组件销毁时一般不会释放第三方对象：

```javascript
    mounted() {
        this.initOptions();
        this.draw();
    },
    beforeDestroy() {
        this.myChart && this.myChart.destroy();
    }
```

DOM 元素绑定了事件，但组件销毁时没有移除事件：

```javascript
   created: function () {
            that.documentHandler = function (event) {
                // 处理函数
            };
            if (this.rawProp('mode') === 'click') {
                $(document).bind('mousedown', that.documentHandler);
            }
        },
        removed: function () {
            $(document).unbind('mousedown', this.documentHandler);
        }
```

<span id='g37'></span>

### 水平垂直居中方案

html 结构：

```html
<div class='wrap'>
  <div class='box'></div>
</div>
```

#### 定宽高

1. absolute+负 margin
2. absolute+transform
3. absolute+calc
4. absolute+margin auto

css 代码：

```css
.wrap {
    width: 300px;
    height: 300px;
    position: relative;
}
.box {
    width: 100px;
    height: 100px;
    position: absolute;
}
/* absolute+负margin  */
.box {
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
}
/* absolute+transform  */
.box {
    top: 50%;
    left: 50%;
    translate: transform(-50%, -50%);
}
/* absolute+calc  */
.box {
    left: calc(50%-50px);
    top: calc(50%-50px);
}
/* absolute+margin auto */
.box {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
```

#### 不定宽高

1. absolute + transform（与定宽高相同）

2. flex

3. css-table

4. lineheight

```css
/*flex*/
.wrap {
    display: flex;
    justify-content: center;
    align-items: center;
}
/*css-table*/
.wrap {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.box {
    display: inline-block;
}
/*lineheight*/
.wp {
    line-height: 300px;
    text-align: center;
    font-size: 0px;
}
.box {
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
    line-height: initial;
    text-align: left; /* 修正文字 */
}
```

其他兼容性较差的方案：writing-mode、grid

<span id='g39'></span>

### CSS 三列布局

实现一个左右宽度固定，中间自适应的三列布局。

#### 1.absolute

```css
.container {
    position: relative;
}
.left,
.right {
    background: blue;
    width: 200px;
    position: absolute;
    top: 0;
}
.left {
    left: 0;
}
.right {
    right: 0;
}
.center {
    background: green;
    margin: 0 200px;
}
```

```html
  <div class="container">
    <div class='left'>左右定宽</div>
    <div class='main'>中间自适应</div>
    <div class='right'>左右定宽</div>
  </div>
```

#### 2.flex

```css
.container {
    display: flex;
}
.left,
.right {
    background: blue;
    width: 200px;
    flex: 0 0 auto;
}
.center {
    background: green;
    flex: 1 1 auto;
}
```

```html
  <div class="container">
    <div class='left'>左右定宽</div>
    <div class='main'>中间自适应</div>
    <div class='right'>左右定宽</div>
  </div>
```

#### 3.BFC+ float

优先渲染左右两列，中间列使用 overflow: hidden 触发 BFC 防止文字环绕。

```css
.left,
.right {
    width: 200px;
    background: blue;
}

.left {
    float: left;
}
.right {
    float: right;
}
.center {
    background: green;
    overflow: hidden;
    margin: auto;
}
```

#### 4.双飞翼布局

```css
.container {
    position: relative;
    overflow: hidden;
}
.left,
.right {
    background: blue;
    width: 200px;
}
.left {
    float: left;
    margin-left: -100%;
}
.right {
    float: left;
    margin-left: -200px;
}
.center {
    float: left;
    width: 100%;
}
.content {
    margin: 0 200px;
    background: green;
}
```

```html
  <div class="container">
    <div class='center'>
     <div class="content">中间自适应</div>
 	</div>
    <div class='left'>左右定宽</div>
    <div class='right'>左右定宽</div>
  </div>
```

<span id='g40'></span>

### HTTP 缓存

#### 强制缓存

服务端通过设置 HTTP 头字段的 cache-control/expires 告知客户端在某段时间内资源是最新的，无需向服务端发出请求。服务器则返回状态码 Status Code: 200 (from memory cache)。

#### 协商缓存

1.Last-Modified：内容的最后修改时间。

2.ETag：一串编码来标记内容，没有规定具体的格式和计算方式，只要能够起到标识内容的作用即可。

当浏览器第一次请求某一个 URL 时，服务端在返回内容的同时也会返回相应的“头信息”，该头信息中就包含了“Last-Modified”和“ETag”（这里特指请求静态文件，动态文件并不包含在内，下面会对动态文件做特别说明，不同操作系统，不同 web 服务器可能返回的头信息可能不同），当浏览器再次请求该 URL 的时候，浏览器会向服务器传送 If-Modified-Since 和 If-None-Match 报头，询问该时间之后文件是否有被修改过，如果修改过，则请求最新内容，如果没有被修改过，则使用浏览器缓存。

虽然两种协商方法均可让浏览器使用缓存内容，但是两者在仍有一定区别，Last-Modified 针对的是时间，ETag 针对的是内容。

ETag 的优缺点：

优点：

ETag 解决了 Last-Modified 无法解决的一些问题。例如文件做周期性更改，内容不变，仅仅改变修改时间；某些文件修改非常频繁，比如在秒以下的时间内进行修改，Last-Modified 无法判断；某些服务器不能精确的获取到最后修改时间。

缺点：

不同操作系统，web 服务器对于 ETag 的计算方法也不同，当使用不同操作系统，不同类型的 web 服务器做负载均衡的时候，如果用 ETag 作为判断条件，在被负载均衡到不同服务器后，则很容易导致缓存失效。

“Last-Modified”和“ETag”两者存在其一，就可以进行缓存协商。

##### 为何 Last-Modified 和 ETag 一起用？

##### 什么时候使用强制缓存，什么时候用协商缓存？

参考：

https://blog.csdn.net/a7442358/article/details/48845335

https://imweb.io/topic/5795dcb6fb312541492eda8c

<span id='g41'></span>

### JSBridge

JSBridge 的核心是构建 Native 和非 Native 间双向通信的通道。

JSBridge 的通信原理

#### JavaScript 调用 Native

1. 注入 API

注入 API 方式的主要原理是，通过 WebView 提供的接口，向 JavaScript 的 Context（window）中注入对象或者方法，让 JavaScript 调用时，直接执行相应的 Native 代码逻辑，达到 JavaScript 调用 Native 的目的。

2. 拦截 URL SCHEME

先解释一下 URL SCHEME：URL SCHEME 是一种类似于 url 的链接，是为了方便 app 直接互相调用设计的，形式和普通的 url 近似，主要区别是 protocol 和 host 一般是自定义的，例如: qunarhy://hy/url?url=ymfe.tech，protocol 是 qunarhy，host 则是 hy。
拦截 URL SCHEME 的主要流程是：Web 端通过某种方式（例如 iframe.src）发送 URL Scheme 请求，之后 Native 拦截到请求并根据 URL SCHEME（包括所带的参数）进行相关操作。

#### Native 调用 JavaScript

相比于 JavaScript 调用 Native， Native 调用 JavaScript 较为简单，毕竟不管是 iOS 的 UIWebView 还是 WKWebView，还是 Android 的 WebView 组件，都以子组件的形式存在于 View/Activity 中，直接调用相应的 API 即可。
Native 调用 JavaScript，其实就是执行拼接 JavaScript 字符串，从外部调用 JavaScript 中的方法，因此 JavaScript 的方法必须在全局的 window 上。

#### JSBridge 雏形

```javascript
window.JSBridge = {
    // 调用 Native
    invoke: function(bridgeName, data) {
        // 判断环境，获取不同的 nativeBridge
        nativeBridge.postMessage({
            bridgeName: bridgeName,
            data: data || {}
        });
    },
    receiveMessage: function(msg) {
        var bridgeName = msg.bridgeName,
            data = msg.data || {};
        // 具体逻辑
    }
};
```

参考：

https://juejin.im/post/5abca877f265da238155b6bc

<span id='g42'></span>

### 继承

Javascript 的继承是通过原型链实现的。

#### 1.原型链继承

继承就是要让子类获得父类的属性和方法。原型链的思路是利用原型共享的特点，让父类的一个实例充当子类的原型。父类的实例必然包括了父类的属性与方法，那么子类的所有实例都可以通过原型链一层层找到父类的属性与方法了著作权归作者所有。

```javascript
function Parent() {
    this.type = "man";
}
Parent.prototype.say = function() {
    console.log("say");
};
function Child() {
    this.age = 20;
}
Child.prototype = new Parent();
var p = new Parent();
var c = new Child();
console.log(c);
```

原型继承的问题：

1、子类共享父类原型的属性（引用类型）和方法。

2、在创建子类的实例时，不能向父类型的构造函数中传递参数。

#### 2. 借用构造函数（call、apply）

这种方法的思想是在子类型的构造函数内部通过 call/apply 调用超类型的构造函数。

```javascript
function SuperType() {
    this.colors = ["red", "green"];
}

function SubType() {
    SuperType.call(this);
}

var ins1 = new SubType();

ins1.colors.push("blue");
var ins2 = new SubType();

ins2.colors.push("black");
```

SubType 的每个实例会拥有自己的 colors 副本，互不影响。

借用构造函数的问题：
需要继承的属性和方法都在构造函数中定义，
子类无法使用超类原型上的方法。

#### 3.组合继承

原型链继承和借用构造函数组合使用。

```javascript
function SuperType(name) {
    this.name = name;
    this.colors = ["red", "green"];
}

SuperType.prototype.sayName = function() {
    console.log(this.name);
};

function SubType(name, age) {
    SuperType.call(this, name);

    this.age = age;
}

SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;

var ins1 = new SubType("a", 18);

ins1.colors.push("blue");
var ins2 = new SubType("b", 19);

ins2.colors.push("black");
```

组合继承避免了原型链继承和借用构造函数的缺点，是最常用的模式。

#### 原型式继承

借用原型基于以后的对象创建新对象。

```javascript
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

var person = {
    name: "sam",
    colors: ["red", "green"]
};

var o1 = object(person);
o1.colors.push("blue");
var o2 = object(person);
o2.colors.push("black");
```

缺点：
共享基础对象的引用类型属性。

#### 寄生式继承

创建一个用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后返回对象。

```javascript
function createAnother(o) {
    var ins = object(o);
    ins.sayHi = function() {
        console.log("hi");
    };
    return ins;
}
```

寄生式继承使得新对象不但有基础对象的所有方法和属性，还可以有自己的属性和方法。
但并没有解决原型式继承的问题.

### 寄生式组合继承

通过借用构造函数来继承熟悉,通过原型链的混成来继承方法.

```javascript
function inheritPrototype(subType, superType) {
    var prototype = object(subType, superType);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

function SuperType(name) {
    this.name = name;
    this.colors = ["red", "green"];
}

SuperType.prototype.sayName = function() {
    console.log(this.name);
};

function SubType(name, age) {
    SuperType.call(this, name);

    this.age = age;
}

inheritPrototype(SubType, SuperType);

var ins1 = new SubType("a", 18);

ins1.colors.push("blue");
var ins2 = new SubType("b", 19);

ins2.colors.push("black");
```

寄生式组合继承比组合式高效,只调用了一次超类构造函数,是一种最理想的继承方式.

<span id='g43'></span>

### 移动端布局

#### 移动端页面渲染过程

打开一个页面，移动端浏览器会自动寻找 viewport 中的 width,如果指定了视窗口的 width，就会把页面放到指定 width 的 viewport 里面。如果没有指定，则使用默认值（980px），具体根据浏览器来定的。

```
<meta name=”viewport” content=”width=device-width, initial-scale=1, maximum-scale=1″>
```

上述代码可以解决这个问题。
width：控制 layout viewport 的大小，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）。

#### 相关概念

##### viewport

移动设备上的 viewport 就是设备的屏幕上能用来显示我们的网页的那一块区域，在具体一点，就是浏览器上(也可能是一个 app 中的 webview)用来显示网页的那部分区域，但 viewport 又不局限于浏览器可视区域的大小，它可能比浏览器的可视区域要大，也可能比浏览器的可视区域要小。在默认情况下，一般来讲，移动设备上的 viewport 都是要大于浏览器可视区域的，这是因为考虑到移动设备的分辨率相对于桌面电脑来说都比较小，所以为了能在移动设备上正常显示那些传统的为桌面浏览器设计的网站，移动设备上的浏览器都会把自己默认的 viewport 设为 980px 或 1024px（也可能是其它值，这个是由设备自己决定的），但带来的后果就是浏览器会出现横向滚动条，因为浏览器可视区域的宽度是比这个默认的 viewport 的宽度要小的。

##### 缩放以及 initial-scale

缩放是相对于移动设备的屏幕宽度的，所以 initial-scale=1.0 和 width=device-width 能达到一样的效果。

##### 物理像素

设备像素又称物理像素（physical pixel），设备能控制显示的最小单位。

##### CSS 像素

CSS 像素又称为逻辑像素，是为 web 开发者创造的，在 CSS 和 javascript 中使用的一个抽象的层,每一个 CSS 声明和几乎所有的 javascript 属性都使用 CSS 像素.

##### PPI

pixels per inch 所表示的是每英寸所拥有的像素（pixel）数目。

##### DPR 设备像素比

DPR = 设备像素 / CSS 像素(某一方向上)

#### rem 计算

> 在 W3C 官网上是这样描述 rem 的——“font size of the root element” 。

##### 1.媒体查询

```css
@media screen and (min-width: 375px) {
    html {
        font-size: 14.0625px;
    }
}
@media screen and (min-width: 360px) {
    html {
        font-size: 13.5px;
    }
}
@media screen and (min-width: 320px) {
    html {
        font-size: 12px;
    }
}
html {
    font-size: 16px;
}
```

##### 2. js 计算

首先需要一个基准，比如 750px 下为 16px，然后根据这个基准响应变化。

简单计算：

```javascript
const oHtml = document.getElementsByTagName("html")[0];
const width = oHtml.clientWidth;
// 320px的屏幕基准像素为16px
oHtml.style.fontSize = 16 * (width / 750) + "px";
```

更复杂的计算:
[flexible.js](https://github.com/amfe/lib-flexible/blob/2.0/index.js)

#### Sass 中的 pxTorem

定义基准和 rem 函数

```css
$baseFontSize: 14;
@function rem($pixels, $context: $baseFontSize) {
    @if (unitless($pixels)) {
        $pixels: $pixels * 1px;
    }

    @if (unitless($context)) {
        $context: $context * 1px;
    }

    @return $pixels / $context * 1rem;
}

.class {
    font-size: rem(38);
}
```

使用

```css
.header {
    font-size: pxTorem(12px);
}
```

如果需要同时设置多个属性值，需要使用 mixin

```css
// Remove the unit of a length
// @param {Number} $number - Number to remove unit from
// @return {Number} - Unitless number
@function strip-unit($number) {
    @if type-of($number) == "number" and not unitless($number) {
        //除以一个单位
        @return $number / ($number * 0 + 1);
    }

    @return $number;
}

@mixin remCalc($property, $values...) {
    $max: length($values); //返回$values列表的长度值
    $pxValues: "";
    $remValues: "";

    @for $i from 1 through $max {
        $value: strip-units(
            nth($values, $i)
        ); //返回$values列表中的第$i个值，并将单位值去掉
        $browser-default-font-size: strip-units($browser-default-font-size);
        $pxValues: #{$pxValues + $value * $browser-default-font-size}px;
        @if $i < $max {
            $pxValues: #{$pxValues + " "};
        }
    }

    @for $i from 1 through $max {
        $value: strip-units(nth($values, $i));
        $remValues: #{$remValues + $value}rem;
        @if $i < $max {
            $remValues: #{$remValues + " "};
        }
    }

    #{$property}: $pxValues;
    #{$property}: $remValues;
}
```

[查看 sass 语法](http://sass.bootcss.com/docs/sass-reference/#interpolation_)
参考：https://www.w3cplus.com/preprocessor/sass-px-to-rem-with-mixin-and-function.html

使用

```css
.wrapper {
    @include remCalc(width, 45);
    @include remCalc(margin, 1, 0.5, 2, 3);
}
```

#### vm

仅使用 vw 单位作为唯一应用的一种 CSS 单位

```css
//iPhone 7尺寸作为设计稿基准
$vw_base: 750;
@function vw($px) {
    @return ($px / $vw_base) * 100vw;
}
```

参考：https://aotu.io/notes/2017/04/28/2017-4-28-CSS-viewport-units/index.html

#### vm+rem

使用 vm 设置 html 的字体大小，在使用 rem 作为单位开发。

```css
html {
    /* 100/750 vm */
    font-size: calc(13.33333333vw);

    /* 限制最大最小值 */
    @media screen and (max-width: 320px) {
        font-size: 64px;
    }
    @media screen and (min-width: 540px) {
        font-size: 108px;
    }
}
```

<span id='g44'></span>

### websocket

#### 原理

WebSocket 是 HTML5 下一种新的协议。它实现了浏览器与服务器全双工通信，能更好的节省服务器资源和带宽并达到实时通讯的目的。它与 HTTP 一样通过已建立的 TCP 连接来传输数据，但是它和 HTTP 最大不同是：
WebSocket 是一种双向通信协议。在建立连接后，WebSocket 服务器端和客户端都能主动向对方发送或接收数据，就像 Socket 一样；
WebSocket 需要像 TCP 一样，先建立连接，连接成功后才能相互通信。

一旦 WebSocket 连接建立后，后续数据都以帧序列的形式传输。在客户端断开 WebSocket 连接或 Server 端中断连接前，不需要客户端和服务端重新发起连接请求。在海量并发及客户端与服务器交互负载流量大的情况下，极大的节省了网络带宽资源的消耗，有明显的性能优势，且客户端发送和接受消息是在同一个持久连接上发起，实时性优势明显。

#### 心跳重连

websocket 是前后端交互的长连接，前后端也都可能因为一些情况导致连接失效并且相互之间没有反馈提醒。因此为了保证连接的可持续性和稳定性，websocket 心跳重连就应运而生。

##### 问题

1. 在使用原生 websocket 的时候，如果设备网络断开，不会触发 websocket 的任何事件函数，前端程序无法得知当前连接已经断开。

2. 后端 websocket 服务也可能出现异常，连接断开后前端也并没有收到通知。

为了解决以上两个问题，以前端作为主动方，前端定时发送心跳消息 ping，后端收到 ping 类型的消息，立马返回 pong 消息，告知前端连接正常。如果一定时间没收到 pong 消息，就说明连接不正常，前端便会执行重连。

实现：

```javascript
var ws = new WebSocket(url);
var heartCheck = {
    timeout: 60000, //60ms
    timeoutObj: null,
    reset: function() {
        clearTimeout(this.timeoutObj);
        this.start();
    },
    start: function() {
        this.timeoutObj = setTimeout(function() {
            ws.send("HeartBeat");
        }, this.timeout);
    }
};

ws.onopen = function() {
    heartCheck.start();
};
ws.onmessage = function(event) {
    heartCheck.reset();
};
```

服务端如何判断客户端是否掉线？

客户端定时每 X 秒(推荐小于 60 秒)向服务端发送特定数据，服务端设定为 X 秒没有收到客户端心跳则认为客户端掉线，并关闭连接触发 onClose 回调。

<span id='go45'></span>

### 回流与重绘

当元素的样式发生变化时，浏览器需要触发更新，重新绘制元素。这个过程中，有两种类型的操作，即重绘与回流。

重绘(repaint): 当元素样式的改变不影响布局时，浏览器将使用重绘对元素进行更新，此时由于只需要 UI 层面的重新像素绘制，因此 损耗较少

回流(reflow): 当元素的尺寸、结构或触发某些属性时，浏览器会重新渲染页面，称为回流。此时，浏览器需要重新经过计算，计算后还需要重新页面布局，因此是较重的操作。会触发回流的操作:

页面初次渲染
浏览器窗口大小改变
元素尺寸、位置、内容发生改变
元素字体大小变化
添加或者删除可见的 dom 元素
激活 CSS 伪类（例如：:hover）
查询某些属性或调用某些方法

clientWidth、clientHeight、clientTop、clientLeft
offsetWidth、offsetHeight、offsetTop、offsetLeft
scrollWidth、scrollHeight、scrollTop、scrollLeft
getComputedStyle()
getBoundingClientRect()
scrollTo()

回流必定触发重绘，重绘不一定触发回流。重绘的开销较小，回流的代价较高。

<span id='g46'></span>

### javascript 词法分析

JavaScript 代码自上而下执行，但是在 js 代码执行前，会首先进行词法分析，所以事实上，js 运行要分为词法分析和执行两个阶段。

词法分析
词法分析主要分为 3 步：
第 1 步：分析形参
第 2 步：分析变量声明
第 3 步：分析函数声明

如果存在函数嵌套，则从外往内进行词法分析

具体步骤：
0、在函数执行的一瞬间，生产 Active Object（活动对象）

1、分析形参
1.1 函数声明的形参，形成 AO 的属性，默认值是 undefined,
1.2 接收形参，给刚刚形成 AO 的属性的形参赋值

2、分析变量声明，如 var age;（变量的值是在运行时期决定）
2.1 如果 AO 上还没有 age 属性，则给 AO 添加 age 属性，默认值是 undefined
2.2 如果 AO 上已经有 age 属性，则不做任何操作。

3、分析函数声明！如 function foot(){}
3.1 如果 AO 上没有 foot 属性，则把函数赋给 AO.foot 属性
3.2 如果 AO 上有 foot 属性，则会直接覆盖，把函数赋给 AO.foot 属性

<span id='g47'></span>

### 原型图

在 Javascript 中，每个函数都有一个原型属性 prototype 指向自身的原型，而由这个函数创建的对象也有一个**proto**属性指向这个原型，而函数的原型是一个对象，所以这个对象也会有一个**proto**指向自己的原型，这样逐层深入直到 Object 对象的原型，这样就形成了原型链。下面这张图很好的解释了 Javascript 中的原型和原型链的关系。

<div align="center"><img width="600"src="http://cdn.inoongt.tech/images/thinkin/prototype.jpg"/></div>

每个函数都是 Function 函数创建的对象，所以每个函数也有一个**proto**属性指向 Function 函数的原型。这里需要指出的是，真正形成原型链的是每个对象的**proto**属性，而不是函数的 prototype 属性，这是很重要的。

<span id='g48'></span>

### 数组去重

es6：

```javascript
[...new Set(arr]
```

es5:

```javascript
arr.filter(function(ele, index, array) {
    return index === array.indexOf(ele);
});
```

<span id='g49'></span>

### script 中 defer 和 async

> defer：此布尔属性被设置为向浏览器指示脚本在文档被解析后执行。
> async：设置此布尔属性，以指示浏览器如果可能的话，应异步执行脚本。

#### 相同点

-   加载文件时不阻塞页面渲染
-   对于 inline 的 script（内联脚本）无效
-   使用这两个属性的脚本中不能调用 document.write 方法
-   有脚本的 onload 的事件回调

#### 不同点

-   html 的版本 html4.0 中定义了 defer；html5.0 中定义了 async
-   执行时刻

#### 总结

-   如果 async 为 true，那么脚本在下载完成后异步执行。
-   如果 async 为 false，defer 为 true，那么脚本会在页面解析完毕之后执行（有争议，iOS safari 白屏）。
-   如果 async 和 defer 都为 false，那么脚本会在页面解析中，停止页面解析，立刻下载并且执行。

<span id='g50'></span>

### 移动端点击穿透

http://www.fly63.com/article/detial/695

<span id='g51'></span>

### CSS 关键字 initial、inherit 和 unset

#### initial

initial 关键字用于设置 CSS 属性为它的默认值，可作用于任何 CSS 样式。

#### inherit

每一个 CSS 属性都有一个特性就是，这个属性必然是默认继承的 (inherited: Yes) 或者是默认不继承的 (inherited: no)其中之一，我们可以在 MDN 上通过这个索引查找，判断一个属性的是否继承特性。

可继承属性：

-   所有元素可继承：visibility 和 cursor
-   内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、 font-family、font-size、font-style、font-variant、font-weight、text- decoration、text-transform、direction
-   块状元素可继承：text-indent 和 text-align
-   列表元素可继承：list-style、list-style-type、list-style-position、list-style-image
-   表格元素可继承：border-collapse

#### unset

名如其意，unset 关键字我们可以简单理解为不设置。其实，它是关键字 initial 和 inherit 的组合。

什么意思呢？也就是当我们给一个 CSS 属性设置了 unset 的话：

-   如果该属性是默认继承属性，该值等同于 inherit
-   如果该属性是非继承属性，该值等同于 initial

<span id='g52'></span>

### CSS 选择器层叠

#### CSS 来源

样式表可能有 3 种不同来源：编写者，用户和用户代理

-   编写者：编写者根据文档语言约定给源文档指定样式表。例如，HTML 中，样式表可以包含在文档中或者从外部链接
-   用户：用户可能会给某个特定文档指定样式信息。例如，用户可以指定一个含有样式表的文件，或者用户代理可能会提供一个用来生成用户样式表的界面
-   用户代理: （与 CSS 规范）一致的用户代理必须应用一份默认样式表。用户代理的默认样式表应该以满足文档语言一般表现预期的方式来呈现文档语言元素（例如，对于可视化浏览器，HTML 中 EM 元素用斜体来表示）。

#### 层叠顺序

为了找出一个元素/属性组合的值，用户代理必须按照下列（步骤）排序：

1. 找出目标媒体类型下，所有适用于该元素和目标属性的声明。
2. 根据重要性（常规或重要）和来源（编写者，用户或用户代理）排序，升序优先级为：
    - 用户代理声明
    - 用户常规声明
    - 编写者常规声明（!important）
    - 编写者重要声明
    - 用户重要声明
3. 相同重要性和来源的规则根据选择器的特殊性（specificity）排序：更特殊的选择器将重写一般的。伪元素和伪类被分别算作常规元素和类
4. 最后，根据指定顺序排序：如果两个声明的权重，来源和特殊性都相同，后指定的生效。引入的样式表（译注：这里应该是指'@import'，而不是广义的通过各种方式引入样式表）中的声明被认为在样式表自身的所有声明之前

#### 计算选择器的特殊性

一个选择器的特殊性是根据下列（规则）计算的：

如果声明来自一个'style'属性而不是一条选择器样式规则，算 1，否则就是 0 (= a)（HTMl 中，一个元素的"style"属性值是样式表规则，这些属性没有选择器，所以 a=1，b=0，c=0，d=0）
计算选择器中 ID 属性的数量 (= b)
计算选择器中其它属性和伪类的数量 (= c)
计算选择器中元素名和伪元素的数量 (= d)
特殊性只根据选择器的形式来定。特殊的，一个"[id=p33]"形式的选择器被算作一个属性选择器(a=0, b=0, c=1, d=0)，即使 id 属性在源文档的 DTD 中被定义为"ID"

4 个数连起来 a-b-c-d（在一个基数很大的数字系统中（in a number system with a large base））表示特殊性

一些示例：

```
 *             {}  /* a=0 b=0 c=0 d=0 -> specificity = 0,0,0,0 */
 li            {}  /* a=0 b=0 c=0 d=1 -> specificity = 0,0,0,1 */
 li:first-line {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
 ul li         {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
 ul ol+li      {}  /* a=0 b=0 c=0 d=3 -> specificity = 0,0,0,3 */
 h1 + *[rel=up]{}  /* a=0 b=0 c=1 d=1 -> specificity = 0,0,1,1 */
 ul ol li.red  {}  /* a=0 b=0 c=1 d=3 -> specificity = 0,0,1,3 */
 li.red.level  {}  /* a=0 b=0 c=2 d=1 -> specificity = 0,0,2,1 */
 #x34y         {}  /* a=0 b=1 c=0 d=0 -> specificity = 0,1,0,0 */
 style=""          /* a=1 b=0 c=0 d=0 -> specificity = 1,0,0,0 */
```

<span id='g53'></span>

### 查找算法

#### 二分查找

算法思想是：
（1）确定该区间的中间位置 mid
（2）将查找的值与 array[mid]比较,若相等，查找成功返回此位置；否则确定新的查找区域，继续二分查找。

```javascript
const binarySeach = (arr, n)=> {
  let low = 0;
  let high = arr.length - 1;
  let mid;

  while (low<high-1) {
    mid = Math.floor((low + high) / 2);
    console.log('mid',mid,arr[mid])

    if (n === arr[low]) return low;
    if (n === arr[high]) return high;
	  if (n === arr[mid]) return mid;

    if (n > arr[mid]) low = mid;
    if (n < arr[mid]) high = mid;
  }
  return -1;
};

算法复杂度：

对于N个元素，每次查找的区间大小就是N，N/2，N/4，…，N/2^k，其中k就是循环的次数。

即k次循环中需要查找的范围是N/2^k，而N/2^k总是大于1。

由N/2^k>=1得k<=logN(以2为底的对数)。

所以时间复杂度为O(logN)
```

<span id=54 />

### flatten

展开数组

```javascript
function flatten(arr) {
    let result = [];
    arr.forEach(v => {
        result = Array.isArray(v)
            ? result.concat(flatten(v))
            : result.concat(v);
    });
    return result;
}

function flattenMd(arr) {
    var result = [];
    function flatten(arr) {
        for (var i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                flatten(arr[i]);
            } else {
                result.push(arr[i]);
            }
        }
    }
    flatten(arr);
    return result;
}
```

```javascript
function flatten(arr) {
    return arr.reduce((acc, v, i) => {
        return prev.concat(Array.isArray(item) ? flatten(item) : item);
    }, []);
}
```
