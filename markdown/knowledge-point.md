# My Scattered  Notes

Guides:

1.  <a href="javascript:;" onclick="document.getElementById('g1').scrollIntoView();">undefined and null</a>
2.  <a href="javascript:;" onclick="document.getElementById('g2').scrollIntoView();">浏览器 Event loop 事件循环</a>
3.  <a href="javascript:;" onclick="document.getElementById('g3').scrollIntoView();">对象深拷贝</a>
4.  <a href="javascript:;" onclick="document.getElementById('g4').scrollIntoView();"> DNS 劫持及HTTP劫持</a>
5.  <a href="javascript:;" onclick="document.getElementById('g5').scrollIntoView();"> 正则表达式之后向引用</a>
6.  <a href="javascript:;" onclick="document.getElementById('g6').scrollIntoView();"> React/Vue 不同组件之间的通信方式</a>
7.  <a href="javascript:;" onclick="document.getElementById('g7').scrollIntoView();"> Thunk 函数</a>
8.  <a href="javascript:;" onclick="document.getElementById('g8').scrollIntoView();"> this 指向</a>
9.  <a href="javascript:;" onclick="document.getElementById('g9').scrollIntoView();"> Cookie</a>
10. <a href="javascript:;" onclick="document.getElementById('g10').scrollIntoView();"> 排序算法</a>
11. <a href="javascript:;" onclick="document.getElementById('g11').scrollIntoView();"> 执行上下文(Execution Context)</a>
12. <a href="javascript:;" onclick="document.getElementById('g12').scrollIntoView();"> Promise 的实现</a>
13. <a href="javascript:;" onclick="document.getElementById('g13').scrollIntoView();"> 闭包</a>
14. <a href="javascript:;" onclick="document.getElementById('g14').scrollIntoView();"> DOM事件</a>
15. <a href="javascript:;" onclick="document.getElementById('g15').scrollIntoView();"> 服务端渲染</a>
16. <a href="javascript:;" onclick="document.getElementById('g16').scrollIntoView();"> 浮点数知识</a>
17. <a href="javascript:;" onclick="document.getElementById('g17').scrollIntoView();"> const 、let、块级作用域</a>
18. <a href="javascript:;" onclick="document.getElementById('g18').scrollIntoView();"> DocumentFragment</a>
19. <a href="javascript:;" onclick="document.getElementById('g19').scrollIntoView();"> 同源策咯</a>
20. <a href="javascript:;" onclick="document.getElementById('g20').scrollIntoView();"> 事件循环</a>
21. <a href="javascript:;" onclick="document.getElementById('g21').scrollIntoView();"> https/http2</a>
22. <a href="javascript:;" onclick="document.getElementById('g22').scrollIntoView();"> 订阅/发布模式（subscribe&publish）</a>
23. <a href="javascript:;" onclick="document.getElementById('g23').scrollIntoView();"> vue 双向数据绑定实现原理</a>
24. <a href="javascript:;" onclick="document.getElementById('g24').scrollIntoView();"> 函数模拟 A instanceof B</a>
25. <a href="javascript:;" onclick="document.getElementById('g25').scrollIntoView();"> typeof 原理</a>
26. <a href="javascript:;" onclick="document.getElementById('g26').scrollIntoView();"> Iterator</a>
27. <a href="javascript:;" onclick="document.getElementById('g27').scrollIntoView();"> ToPrimitive</a>
28. <a href="javascript:;" onclick="document.getElementById('g28').scrollIntoView();"> BFC布局</a>
29. <a href="javascript:;" onclick="document.getElementById('g29').scrollIntoView();"> 大整数相加</a>
30. <a href="javascript:;" onclick="document.getElementById('g30').scrollIntoView();"> Object.assign 模拟实现</a>
31. <a href="javascript:;" onclick="document.getElementById('g31').scrollIntoView();"> Http幂等性</a>
32. <a href="javascript:;" onclick="document.getElementById('g32').scrollIntoView();"> 判断一个对象是否是数组</a>
33. <a href="javascript:;" onclick="document.getElementById('g33').scrollIntoView();"> 跨域</a>
34. <a href="javascript:;" onclick="document.getElementById('g34').scrollIntoView();"> Debounce and Throllte</a>
35. <a href="javascript:;" onclick="document.getElementById('g35').scrollIntoView();"> Session and SessionStorage</a>
36. <a href="javascript:;" onclick="document.getElementById('g36').scrollIntoView();"> Bind的实现</a>
37. <a href="javascript:;" onclick="document.getElementById('g37').scrollIntoView();"> 内存管理</a>
38. <a href="javascript:;" onclick="document.getElementById('g38').scrollIntoView();"> 水平垂直居中方案</a>
39. <a href="javascript:;" onclick="document.getElementById('g39').scrollIntoView();"> CSS三列布局</a>
40. <a href="javascript:;" onclick="document.getElementById('g40').scrollIntoView();"> HTTP缓存</a>
41. <a href="javascript:;" onclick="document.getElementById('g41').scrollIntoView();"> JSBridge</a>

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

1.  浏览器中，先执行当前栈，执行完主执行线程中的任务。

2.  取出 Microtask 微任务队列中任务执行直到清空。

3.  取出 Macrotask 宏任务中 一个 任务执行。

4.  检查 Microtask 微任务中有没有任务，如果有任务执行直到清空。

5.  重复 3 和 4。

<span id="g3"></span>




### 3、对象深拷贝

```
/*缺点：如果需要属性值是函数或者是undefined，就会被过滤掉 */
const clone=(obj)=>{
    let _obj=JSON.parse(JSON.stringify(obj))
}
```

```javascript
const clone = obj => {
    if (!obj && typeof obj !== "object") {
        return;
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




### 4、 DNS 劫持 HTTP劫持

#### DNS 劫持

DNS劫持又称域名劫持，是通过劫持技术修改域名注册信息，修改DNS解析，劫持修改域名解析结果。使访问域名的用户不能够准确达到目标站点，而进入指定站点。

例如：

1. 用户计算机感染病毒，该病毒在操作系统中HOSTS文件中添加了虚假的DNS解析记录，因为系统本地的DNS解析记录高于DNS服务器，操作系统在访问域名的时候都会先行检测本地DNS解析记录，然后在访问DNS服务器。

2. 用户试图访问的网站被攻击这击破，并在网站中植入路由DNS劫持代码，当用户访问网站，浏览器就是自动执行路由DNS劫持代码，用户路由器如果存在漏洞就会中招，导致用户上网流量被假DNS服务器劫持，出现广告，各种奇怪现象。

3. 当用户打开浏览器主页的时候，却出现ISP提供的定向页面，广告页面等内容页面

4. 用户在浏览器中输入了错误的域名，导致DNS查询不存在的记录。以前遇到这种情况，浏览器通常会返回一个错误提示。而最近，这种情况下用户会看到ISP设置的域名纠错系统提示。，广告页面等内容页面。

5. 用户想通过该网址访问A网站结果却指向了B网站。

如何防范DNS劫持：

第一：使用安全稳定可靠的DNS服务器，并且及时升级，更新补丁，加固服务器。

第二：保护好域名注册的账号信息。增加域名账号密码的复杂性。

第三：注意本地计算机系统的安全性，使用杀毒软件安全防范。

#### HTTP劫持

HTTP劫持：你DNS解析的域名的IP地址不变。在和网站交互过程中的劫持了你的请求。在网站发给你信息前就给你返回了请求。

HTTP劫持很好判断，当年正常访问一个无广告的页面时，页面上出现广告弹窗，很可能就是运营商劫持了HTTP。

原理：

1. 标识HTTP连接。在天上飞的很多连接中，有许多种协议，第一步做的就是在TCP连接中，找出应用层采用了HTTP协议的连接，进行标识
2. 篡改HTTP响应体，可以通过网关来获取数据包进行内容的篡改
3. 抢先回包，将篡改后的数据包抢先正常站点返回的数据包先到达用户侧，这样后面正常的数据包在到达之后会被直接丢弃


如何防范HTTP劫持：

1. 事前加密
HTTPS

很大一部分HTTP劫持，主要的原因就是在传输数据时都是明文的，使用了HTTPS后，会在HTTP协议之上加上TLS进行保护，使得传输的数据进行加密，但是使用HTTPS，一定要注意规范，必须要全站使用HTTPS，否则只要有一个地方没有使用HTTPS，明文传输就很有可能会被HTTP劫持了。

2. 事中加密
拆分HTTP请求数据包

在HTTP劫持的步骤中，第一步是标记TCP连接，因此只要躲过了标识，那么后续的运营商篡改就不会存在了，有一种方式就是拆分HTTP请求

拆分数据包就是把HTTP请求的数据包拆分成多个，运营商的旁路设备由于没有完整的TCP/IP协议栈，所以就不会被标志，而目标web服务器是有完整的TCP/IP协议栈，能接收到的数据包拼成完整的HTTP请求，不影响服务

3. 事后屏蔽
通过浏览器Api，根据若干规则去匹配DOM中的节点，对匹配到的节点作拦截和隐藏

CSP（内容安全策略），DOM事件监听等。

CSP是浏览器附加的一层安全层，用于对抗跨站脚本与数据注入，运营商植入内容性质与数据注入类似，因此，可以用CSP对抗运营商劫持。通过在HTTP响应头或meta标签设置好规则，支持拦截和上报劫持信息的功能。

DOM事件监听主要是监听DOMNodeInserted、DOMContentLoaded、DOMAttrModified等事件，可以在前端DOM结构发生变化时触发回调，这时补充一些检测逻辑，即可判断是不是业务的正常UI逻辑，如果不是，即可认为是来自劫持


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

-   父子组件用 Props 通信,父->子直接用 Props,子->父用$emit触发事件
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

-   纯粹的函数调用,this 就代表全局对象 Global
-   作为对象方法的调用,this 就指向上级对象
-   作为构造函数调用,this 就指向新对象
-   apply/call 调用,this 指向第一个参数提供的对象

<span id="g9"></span>




### 9、Cookie

功能：按照一定规范来储存这些信息，并在随后的请求中将这些信息发送至服务器，cookie 的值被存储在名为 Cookie 的 HTTP 消息头中。

给 document 赋值并不会覆盖原有的值。

```
const setCookie=(key,value,expires)=>{
    document.cookie=!expires?
	    `${key}=${value}`:
		`${key}=${value};expires=${expires};

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

#### 冒泡排序

算法思想：
对相邻的元素进行两两比较，顺序相反则进行交换，这样，每一趟会将最小或最大的元素“浮”到顶端，最终达到完全有序。就好像一串气泡一样，最终从小到大或从大到小依次排下来。

对于一个长度为n的数组，需要进行n-1轮冒泡操作，才能完全确保排序完成，时间复杂度为O(n^2)。

代码实现：
```javascript
function BubbleSort(arr){

  if(Object.prototype.toString.call(arr) !=='[object Array]'){
  	throw TypeError('argument type error!')
	}
    for(var i=0;i<arr.length;i++){
        for(var j=0;j<arr.length-i-1;j++){
          if(arr[j]>arr[j+1]){
            [arr[j],arr[j+1]]=[arr[j+1],arr[j]]
          }
        }
    }
  return arr 
}

```

#### 归并排序

“归并”的意思是将两个或两个以上的有序表组合成一个新的有序表。假如初始序列含有n个记录，则可看成是n个有序的子序列，每个子序列的长度为1，然后两两归并，得到[n/2]（向上取整）个长度为2或1的有序子序列；再两两归并，……，如此重复，直到得到一个长度为n的有序序列为止，这种排序方法称为2-路归并排序。

步骤解析：
1. 把长度为n的输入序列分成两个长度为n/2的子序列；
2. 对这两个子序列继续分为m/2的子序列，一直分下去，直为1个元素；
3. 将两个排序好的子序列合并成一个最终的排序序列。

```javascript
function merge(left, right) {
  var tmp = [];

  while (left.length && right.length) {
    if (left[0] < right[0])
      tmp.push(left.shift());
    else
      tmp.push(right.shift());
  }

  return tmp.concat(left, right);
}

function mergeSort(a) {
  if (a.length === 1) 
    return a;

  var mid = ~~(a.length / 2)
    , left = a.slice(0, mid)
    , right = a.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}
```


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

注意：自由变量的查找依据的是函数定义时的作用域，而不是执行时的作用预,例如闭包。

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

<span id="g14"></span>




### 14、DOM事件

#### 事件冒泡 vs 事件捕获

-   事件冒泡：事件从内层元素开始触发，向外层传播，直到 document。
-   事件捕获：事件从外层元素（document）开始触发，向内层传播，直到 目标元素（target）。

事件冒泡是由微软提出的，而事件捕获是由网景公司提出的，后来 w3c 制定了统一的方案：先捕获再冒泡。

对于当事件捕获和事件冒泡一起存在的情况，事件传播过程如下：

1.  document 往 target 节点，捕获前进，遇到注册的捕获事件立即触发执行

2.  到达 target 节点，触发事件（对于 target 节点上，是先捕获还是先冒泡则捕获事件和冒泡事件的注册顺序，先注册先执行）

3.  target 节点 往 document 方向，冒泡前进，遇到注册的冒泡事件立即触发

事件捕获与事件冒泡的应用--事件委托,即利用事件冒泡原理，让节点的父级代为执行事件。

#### DOM0级、2级事件

DOM0级:
```javascript 
btn.onclick = function(event){
   console.log(event);  //  事件对象
}
```
DOM0级可以认为onclick是btn的一个属性。

事件对象常用的方法：event.preventDefault() 和 event.stopPropagation()。

- preventDefault() 阻止事件的默认行为

- stopPropagation() 阻止事件传播（捕获阶段已发生，实际上是阻止事件外层冒泡）

W3C后来将DOM1升级为DOM2，DOM2级规范开始尝试以一种符合逻辑的方式来标准化DOM事件。
DOM2级则将属性升级为队列。

DOM2级事件定义了两个方法，用于处理指定和删除事件处理程序的操作，addEventListener()和removeEventListener()，所有的DOM节点中都包含这两个方法：

```javascript 
target.addEventListener(type, listener[, options]);
target.addEventListener(type, listener[, useCapture]);

target.removeEventListener(type, listener[, options]);
target.removeEventListener(type, listener[, useCapture]);
```

- type事件名
- listener事件处理程序函数
- useCapture，指定事件是否在捕获或冒泡阶段执行，默认false。
- options.passive  A Boolean which, if true, indicates that the function specified by listener will never call preventDefault(). 

DOM2级:
```javascript 
btn.addEventListener('click',function(event){
   console.log(event);
},false)
```


<span id="g15"></span>




### 15、服务端渲染

在后端将数据拼接到 HTML 字符串上发送给客户端，浏览器从服务器接收 HTML 并渲染。服务端渲染的优势:

-   SEO
    -   爬虫可以抓取页面的关键字等信息
-   首屏直出 
    -   减少首屏渲染时间

 <span id="g16"></span>




### 16、浮点数知识
JavaScript 内部，所有数字都是以64位浮点数形式储存，即使整数也是如此。
根据国际标准 IEEE 754，任意一个二进制浮点数 V 可以表示成下面的形式：
V=(-1)<sup>s</sup>*M*2<sup>E</sup>

-   (-1)^s 表示符号位
-   2^E 表示指数位
-   M表示有效数字，大于等于 1，小于 2。形式为1.xx...xx。

#### 精度  

对于 64 位的浮点数，最高的 1 位是符号位 s，接着的 11 位是指数 E，剩下的 52 位为有效数字 M。IEEE 754 规定，如果指数部分的值在0到2047之间（不含两个端点），那么有效数字的第一位默认总是1，不保存在64位浮点数之中。也就是说，有效数字这时总是1.xx...xx的形式，其中xx..xx的部分保存在64位浮点数之中，最长可能为52位。因此，JavaScript 提供的有效数字最长为53个二进制位。

Javascript 浮点数运算会先把十进制数转化为二进制数（整数部分除2取余，逆序排列；小数部分乘2取整，顺序排列），然而有可能得到无限循环二进制数这个时候需要进行舍弃，造成舍入误差；然后再进行运算；最后再将结果转化为十进制数返回。


解决方案：
- 运算数全部存储为整数（无类型），然后格式化显示
- 建议是使用库，像sinfuljs或mathjs。

#### 数值范围

根据标准，64位浮点数的指数部分的长度是11个二进制位，意味着指数部分的最大值是2047（2的11次方减1）。也就是说，64位浮点数的指数部分的值最大为2047，分出一半表示负数，则 JavaScript 能够表示的数值范围为21024到2-1023（开区间），超出这个范围的数无法表示。

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




### 20、事件循环

"Event Loop 是一个程序结构，用于等待和发送消息和事件。（a programming construct that waits for and dispatches events or messages in a program.）"

简单说，就是在程序中设置两个线程：一个负责程序本身的运行，称为"主线程"；另一个负责主线程与其他进程（主要是各种 I/O 操作）的通信，被称为"Event Loop 线程"（可以译为"消息线程"）。

每当遇到 I/O 的时候，主线程就让 Event Loop 线程去通知相应的 I/O 程序，然后接着往后运行，所以不存在红色的等待时间。等到 I/O 程序完成操作，Event Loop 线程再把结果返回主线程。主线程就调用事先设定的回调函数，完成整个任务。

js 引擎遇到一个异步事件后并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务。当一个异步事件返回结果后，js 会将这个事件加入与当前执行栈不同的另一个队列，我们称之为事件队列。被放入事件队列不会立刻执行其回调，而是等待当前执行栈中的所有任务都执行完毕， 主线程处于闲置状态时，主线程会去查找事件队列是否有任务。如果有，那么主线程会从中取出排在第一位的事件，并把这个事件对应的回调放入执行栈中，然后执行其中的同步代码...，如此反复，这样就形成了一个无限的循环。这就是这个过程被称为“事件循环（Event Loop）”的原因。

当前执行栈执行完毕时会立刻先处理所有微任务队列（Promise）中的事件，然后再去宏任务队列（setTimeout）中取出一个事件。同一次事件循环中，微任务永远在宏任务之前执行。
https://zhuanlan.zhihu.com/p/33058983
<span id="g21"></span>




### https/http2

#### SSL

SSL协议的握手过程:
第一步，客户端给出协议版本号、一个客户端生成的随机数（Client random），以及客户端支持的加密方法。

第二步，服务器确认双方使用的加密方法，并给出数字证书、以及一个服务器生成的随机数（Server random）。

第三步，客户端确认数字证书有效，然后生成一个新的随机数（Premaster secret），并使用数字证书中的公钥，加密这个随机数，发给服务器。

第四步，服务器使用自己的私钥，获取客户端发来的随机数（即 Premaster secret）。

第五步，客户端和服务器根据约定的加密方法，使用前面的三个随机数，生成"对话密钥"（session key），用来加密接下来的整个对话过程。

参考[图解 SSL/TLS 协议](http://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html)

#### HTTP2 新特性
1. 二进制分帧层
  帧是数据传输的最小单位，以二进制传输代替原本的明文传输，原本的报文消息被划分为更小的数据帧

2. 多路复用
  在一个 TCP 连接上，我们可以向对方不断发送帧，每帧的 stream identifier 的标明这一帧属于哪个流，然后在对方接收时，根据 stream identifier 拼接每个流的所有帧组成一整块数据。
  把 HTTP/1.1 每个请求都当作一个流，那么多个请求变成多个流，请求响应数据分成多个帧，不同流中的帧交错地发送给对方，这就是 HTTP/2 中的多路复用。

3. 服务端推送  

浏览器发送一个请求，服务器主动向浏览器推送与这个请求相关的资源，这样浏览器就不用发起后续请求。

4. Header 压缩 (HPACK)

   使用 HPACK 算法来压缩首部内容
<span id="g22"></span>




### 订阅/发布模式（subscribe&publish）

订阅发布模式（又称观察者模式）定义了一种一对多的关系，让多个观察者同时监听某一个主题对象，这个主题对象的状态发生改变时就会通知所有观察者对象。模式流程：发布者发出通知 => 主题对象收到通知并推送给订阅者 => 订阅者执行相应操作

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




### vue 双向数据绑定实现原理

[vue 双向数据绑定实现原理](https://juejin.im/entry/59116fa6a0bb9f0058aaaa4c)

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

数组有内置的iterator，可以通过Symbol.iterator获取：
```javascript
 let myArray=[1,2,3]
 it=myArray[Symbol.iterator]()
 it.next()
 it.next()
 it.next()  
 it.next() //{done:true}
```

而对象没有内置的iterator，可以自己定义：
```javascript
let myObject={a:1,b:2}
Object.defineProperty(myObject,Symbol.iterator,{
  enumerable:false,
  writable:false,
  configurable:true,
  value:function(){
    let o=this
    let index=0
    let keys=Object.keys(o)
    return {
      next:function() {
		    return{
          value:o[keys[index++]],
          done:index>keys.length
        }
      }
    }
  }
})

let it=myObject[Symbol.iterator]()
it.next()
```

<span id="g27"></span>



### ToPrimitive
JavaScript 引擎内部的抽象操作 ToPrimitive() 有着这样的签名:
``` javascript
ToPrimitive(input，PreferredType?)
```
可选参数 PreferredType 可以是 Number 或者 String。 它只代表了一个转换的偏好，转换结果不一定必须是这个参数所指的类型，但转换结果一定是一个原始值。 如果 PreferredType 被标志为 Number，则会进行下面的操作来转换 input:

- 如果 input 是个原始值，则直接返回它。

- 否则，如果 input 是一个对象。如果有obj。valueOf方法，则调用 obj.valueOf() 方法。 如果obj.valueOf()返回值是一个原始值，则返回这个原始值。

- 否则，调用 obj.toString() 方法。 如果返回值是一个原始值，则返回这个原始值。

- 否则，抛出 TypeError 异常。

如果 PreferredType 被标志为 String，则转换操作的第二步和第三步的顺序会调换。 如果没有 PreferredType 这个参数，则 PreferredType 的值会按照这样的规则来自动设置：

Date 类型的对象会被设置为 String，

其它类型的值会被设置为 Number。

```javascript
var obj = {
	valueOf: function () {
		console.log("valueOf");
		return {}; // not a primitive
	},
	toString: function () {
		console.log("toString");
		return {}; // not a primitive
	}
}
Number(obj)
```

[更多内容](https://justjavac.com/javascript/2012/12/20/object-plus-object.html)



<span id="g28"></span>




### BFC
在解释BFC之前，先说一下文档流。我们常说的文档流其实分为定位流、浮动流和普通流三种。而普通流其实就是指BFC中的FC。FC是formatting context的首字母缩写，
直译过来是格式化上下文，它是页面中的一块渲染区域，有一套渲染规则，决定了其子元素如何布局，以及和其他元素之间的关系和作用。常见的FC有BFC、IFC，还有GFC和FFC。
BFC是block formatting context，也就是块级格式化上下文，是用于布局块级盒子的一块渲染区域.

 

满足下列条件之一就可触发BFC:

1. 根元素，即HTML元素

2. float的值不为none

3. overflow的值不为visible

4. display的值为inline-block、table-cell、table-caption

5. position的值为absolute或fixed


BFC布局规则：
1. 内部的盒子(box)会在垂直方向一个接一个地放置
2. box垂直方向的距离由margin决定，属于同一个BFC的两个相邻box的margin会发生重叠
3. 每个元素margin box左边，与包含块border box的左边相接触（对于从左向右的格式化，否则相反），即使存在浮动也是如此
4. BFC的区域不会与float box重叠
5. BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素
6. 计算BFC高度时，浮动元素也参与计算

[更多内容](https://www.w3cplus.com/css/understanding-bfc-and-margin-collapse.html)

<span id="g29"></span>


### 大整数相加

主要思想:逐位相加并进位
下面这个字符串相加函数，接收两个字符串参数，并返回它们相加之后的结果，也是字符串形式。
代码如下:
```javascript
function sumStrings(a,b) {  
    //通过补零让a和b对齐  
    //若a比b短，则对a补零  
    while(a.length < b.length){  
        a = "0" + a;  
    }  
    //若b比a短，则对b补零  
    while(b.length < a.length){  
        b = "0" + b;  
    }  
    //是否有进位  
    var addOne = 0;  
    //结果数组  
    var result = [];  
    //从个位开始相加  
    for(var i=a.length-1;i>=0;i--){  
        var c1 = a.charAt(i) - 0;  
        var c2 = b.charAt(i) - 0;  
        var sum = c1 + c2 + addOne;  
        //若数字相加大于9，则进位  
        if(sum > 9){  
            result.unshift(sum - 10);  
            addOne = 1;  
        }  
        else{  
            result.unshift(sum);  
            addOne = 0;  
        }  
    }  
    //应付下面的情况：  
    //"99" + "11" => "110"  
    //它最后仍然要进位  
    if(addOne){  
        result.unshift(addOne);  
    }  
    //应付如下的情况  
    //"01" + "01" => "2"  
    //而不是"02"，所以移除第一位的"0"  
    if(!result[0]){  
        result.splice(0,1);  
    }  
    return result.join("");  
}  
```
<span id='g30'></span>
### Object.assign 模拟实现

The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.
Properties in the target object will be overwritten by properties in the sources if they have the same key.  Later sources' properties will similarly overwrite earlier ones.  

Object.assign 模拟实现的思路如下：
1. 判断原生 Object 是否支持该函数，如果不存在的话创建一个函数 assign，并使用 Object.defineProperty 将该函数绑定到 Object 上。
2. 判断参数是否正确（目标对象不能为空，我们可以直接设置{}传递进去,但必须设置值）
3. 使用 Object() 转成对象，并保存为 result，最后返回这个对象 result
4. 使用 for..in 循环遍历出所有可枚举的自有属性。并复制给新的目标对象(hasOwnProperty返回非原型链上的属性)

```javascript
if(!Object.assign){
  Object.definedProperty(Object,'assign',{
    configurable:true,
    enumerable:false,
    writable:false,
    value:function(targetObj){
      if (targetObj == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
      /**
      * Object.assign('',{a:1}) 返回 String {"", a: 1, length: 0}
      */
      var result=Object(targetObj);

      for(var i=1;i<arguments.length;i++){
        var nextSource =arguments[i]
        if(nextSource  && typeof nextSource  === 'object'){
          for(var key in nextSource ){
            if(Object.prototype.hasOwnProperty.call(nextSource, key)){
              result[key]=nextSource [key]
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

#### GET 和 POST的幂等性
HTTP GET方法，用于获取资源，不管调用多少次接口，结果都不会改变，所以是幂等的；HTTP POST方法是一个非幂等方法，因为调用多次，都将产生新的资源。所以，GET和POST最大的区别主要是GET请求是幂等性的，POST请求不是。
正因为它们有这样的区别，所以不应该且不能用get请求做数据的增删改这些有副作用的操作。因为get请求是幂等的，在网络不好的隧道中会尝试重试。如果用get请求增数据，会有重复操作的风险，而这种重复操作可能会导致副作用（浏览器和操作系统并不知道你会用get请求去做增操作）。

<span id='g32'></span>




### 判断一个对象是否是数组

#### 1.instanceof

A instanceof B 可以查看 B 的 prototype 指向的对象是否在对象 A 的[[prototype]]链上。

缺点：如果A的__proto__被改变，则失效。
```
a=new Object()
a.__proto__=Array.prototype
a instancefo Array // true
Object.prototype.toString.apply(a) //"[object Object]"
```

#### 2.constructor
每一个实例化的数组拥有一个constructor属性，这个属性指向生成这个数组的方法Array。
```
const a = [];
console.log(a.constructor == Array);//true
```

缺点：constructor是可以改写的
```
const a=[]
a.constructor =Object
console.log(a.constructor === Object) //true
```
#### 3.Object.prototype.toString  
Object.prototype.toString会返回对象类型的信息。
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

缺点：Object.prototype.toString也是可以被修改的
```
Object.getOwnPropertyDescriptor(Object.prototype,'toString').writable // true
```

#### 4.Array.isArray

```
const a=[];
Array.isArray(a); // true
```

缺点：Array.isArray是ES5标准中增加的方法，部分浏览器不支持。
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

1. JSONP


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




2. CORS

跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。

3. 代理

4. 修改document.domain来跨子域

5. window.postMessage实现iframe 跨域通信

在HTML5中，Window.postMessage() 方法可以安全地实现跨源通信。通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有相同的协议（通常为https），端口号（443为https的默认值），以及主机  (两个页面的模数 Document.domain设置为相同的值) 时，这两个脚本才能相互通信。window.postMessage() 方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。

Window.postMessage有三个参数，message、targetOrigin和可选的[transfer])，其中message代表将要发送到其他窗口的数据，targetOrigin表示接收数据消息的目标窗口，transfer代表消息的所有权。另外还有一个window.addEventListener(“message”, receiveMessage, false)，用以监听消息数据的反馈，其中的message就存在data、origin和source三个属性，origin属性表示消息数据发送方的身份，只有和原来指定发送方的协议、域名或端口一致，才能建立通信。具体请参考 postMessage的详细介绍。

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



<span id='g34'></span>


### Debounce and Throllte

Debounce 和 Throllte都是用来防止函数被高频调用的函数，但二者又有所不同：
- Debounce被称为防抖函数，debounce(fn,wait)会等待wait时间间隔后执行fn,若wait期间debounce被调用，则重新计时(fn不会被执行)
- Throttle被成为节流函数，throttle(fn,wait)在wait时间间隔内至多执行一次fn

#### 简单的实现
Debounce：

```javascript
function debounce(fn,wait){
  
  var timer;

  var result=function(){
    var args=Array.prototype.slice.call(arguments);
    var context=this

    clearTimeout(timer)

    timer=setTimeout(function(){
      fn.apply(this,args)
    },wait)
  }

  return result
}
```

Throttle:

```javascript
function throttle(fn,wait){
  
  var timer;
  var lastTime=0;
  var result=function(){
    var currTime=Date.now();
    var args=Array.prototype.slice.call(arguments);
    var context=this
	
    if(currTime-lastTime>=wait){
      lastTime=currTime
      return  fn.apply(this,args)
    }else{
      clearTimeout(timer)

       // 保证在当前时间区间结束后，再执行一次 fn
      timer=setTimeout(function(){
        // lastTime=Date.now() //? or currTime
        fn.apply(this,args)
      },wait)
    }
  }

  return result
}

```
<span id='g35'></span>


### Session and SessionStorage
sSession是服务器端使用的一种记录客户端状态的机制。客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上，这就是Session。客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了。session的存储方式也有多样，最为传统的就是服务端(内存或者数据库)保存session的内容，客户端浏览器cookie保存sessionid，服务端通过客户端每次http请求带上的cookie中的sessionid去找到对应此用户的session内容。

#### Session与客户端
虽然Session保存在服务器，对客户端是透明的，它的正常运行仍然需要客户端浏览器的支持。这是因为Session需要使用Cookie作为识别标志。HTTP协议是无状态的，Session不能依据HTTP连接来判断是否为同一客户，因此服务器向客户端浏览器发送一个名为JSESSIONID 的Cookie，它的值为该Session的id。Session依据该Cookie来识别是否为同一用户。

该Cookie为服务器自动生成的，它的maxAge属性一般为-1，表示仅当前浏览器内有效，并且各浏览器窗口间不共享，关闭浏览器就会失效。因此同一机器的两个浏览器窗口访问服务器时，会生成两个不同的Session。但是由浏览器窗口内的链接、脚本等打开的新窗口除外。这类子窗口会共享父窗口的Cookie，因此会共享一个Session。

#### Session的有效期

Session生成后，只要用户继续访问，服务器就会更新Session的最后访问时间，并维护该Session 。用户每访问服务器一次，无论是否读写Session，服务器都认为该用户的Session"活跃（active）"了一次。

由于会有越来越多的用户访问服务器，因此Session也会越来越多。为防止内存溢出，服务器会把长时间内没有活跃的Session从内存删除。这个时间就是Session的超时时间 。如果超过了超时时间没访问过服务器，Session就自动失效了。

#### SessionStorage
SessionStorage HTML5 Web 存储中的一种， 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据。
HTML5 Web 存储的数据不会被保存在服务器上，只用于客户端上，可以存储大量的数据，而不影响网站的性能。

SessionStorage 特点
- 同源策略限制。若想在不同页面之间对同一个sessionStorage进行操作，这些页面必须同源。
- 本地存储。seesionStorage的数据不会跟随HTTP请求一起发送到服务器，只会在本地生效，并在关闭标签页后清除数据。
- 存储方式。seesionStorage的存储方式采用key、value的方式。
- 存储上限限制：不同的浏览器存储的上限也不一样，但大多数浏览器把上限限制在5MB以下。

#### 与localStorage的区别 

localStorage的同源策略限制、本地存储、存储方式、存储上限限制和SessionStorage相同，区别在于：

- SessionStorage 临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据；LocalStorage可以永久保存数据。
- SessionStorage 只适用于同一个标签页，其他标签页内无法直接共享（除非在同源标签之间访问其他窗口）；LocalStorage相比而言可以在多个标签页中共享数据。


### Bind 的实现

<span id='g36'></span>

注意：
1. 传入context为null、undefined等无效值，通过apply(context)将this绑定到全局变量
2. 必须通过函数调用bind，否则产生TypeError
3. 参数的处理，合并参数 args.concat(...arguments)
4. 函数返回值的处理，'return fn.apply()'
5. 通过new调用bind返回的函数时，需要返回被调用的函数的实例

```javascript
Function.prototype._bind=function(context){
	if(typeof this !=='function'){
		throw TypeError("argument error")
	}
	var fn=this
	var args=Array.prototype.slice.call(arguments).slice(1)

  return function F(){

    //通过new调用bind返回的函数，返回fn的实例
    if(this instanceof F){
      return new fn(...args,...arguments)
    }	
    return fn.apply(context,args.concat(...arguments))
  }
}
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

##### 标记-清除算法

这个算法假定设置一个叫做根（root）的对象（在Javascript里，根是全局对象）。垃圾回收器将定期从根开始，找所有从根开始引用的对象，然后找这些对象引用的对象……从根开始，垃圾回收器将找到所有可以获得的对象和收集所有不能获得的对象。

这个算法的缺点: 那些无法从根对象查询到的对象都将被清除。

### 回收规则

标记-清除算法是现代浏览器所采用的算法，根据标记-清除算法可以总结出代码回收的规则：

1.全局变量不会被回收。

2.局部变量会被回收，也就是函数一旦运行完以后，函数内部的东西都会被销毁。

3.只要被另外一个作用域所引用就不会被回收

<span id='g37'></span>

### 水平垂直居中方案

html结构：
```html
<div class='wrap'>
  <div class='box'></div>
</div>
```

#### 定宽高

1. absolute+负margin
2. absolute+transform
3. absolute+calc
4. absolute+margin auto

css代码：
```css
.wrap{
  width:300px;
  height:300px;
  position:relative;
}
.box{
  width:100px;
  height:100px;
  position:absolute;
  }
/* absolute+负margin  */
.box{
  top:50%;
  left:50%;
  margin-left:-50px;
  margin-top:-50px;
}
/* absolute+transform  */
.box{
  top:50%;
  left:50%;
  translate:transform(-50%,-50%);
}
/* absolute+calc  */
.box{
  left:calc(50%-50px);
  top:calc(50%-50px);
}
/* absolute+margin auto */
.box{
  top:0;
  bottom:0;
  left:0;
  right:0;
  margin:auto;
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
.wrap{
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

### CSS三列布局


实现一个左右宽度固定，中间自适应的三列布局。

#### 1.absolute

```css
  .container{
    position: relative;
  }
  .left,.right{
    background: blue;
    width:200px;
    position: absolute;
    top:0;
  }
  .left{
    left:0;
  }
  .right{
    right:0;
  }
  .center{
    background: green;
    margin:0 200px;
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
.container{
  display: flex;
}
.left,.right{
  background: blue;
  width:200px;
  flex: 0 0 auto;
}
.center{
  background: green;
  flex:1 1 auto;
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

优先渲染左右两列，中间列使用overflow: hidden触发BFC防止文字环绕。
```css
  .left,.right{
    width:200px;
    background: blue;
  }

  .left{
    float:left;
  }    	
  .right{
    float:right;
  }
  .center{
    background: green;
    overflow: hidden;
    margin:auto;
  }
```
#### 5.双飞翼布局

```css
	.container{
      position: relative;
      overflow: hidden;
    }
    .left,.right{
      background: blue;
      width:200px;
    }
    .left{
      float:left;
      margin-left:-100%;
    }
    .right{
      float:left;
      margin-left:-200px;
    }
    .center{
      float:left;
      width:100%;
    }
  .content{
    margin:0 200px;
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

### HTTP缓存

#### 强制缓存

服务端通过设置 HTTP 头字段的 cache-control/expires 告知客户端在某段时间内资源是最新的，无需向服务端发出请求。服务器则返回状态码 Status Code: 200 (from memory cache)。

#### 协商缓存

  1.Last-Modified：内容的最后修改时间。

    2.ETag：一串编码来标记内容，没有规定具体的格式和计算方式，只要能够起到标识内容的作用即可。

    当浏览器第一次请求某一个URL时，服务端在返回内容的同时也会返回相应的“头信息”，该头信息中就包含了“Last-Modified”和“ETag”（这里特指请求静态文件，动态文件并不包含在内，下面会对动态文件做特别说明，不同操作系统，不同web服务器可能返回的头信息可能不同），当浏览器再次请求该URL的时候，浏览器会向服务器传送If-Modified-Since和If-None-Match报头，询问该时间之后文件是否有被修改过，如果修改过，则请求最新内容，如果没有被修改过，则使用浏览器缓存。

    虽然两种协商方法均可让浏览器使用缓存内容，但是两者在仍有一定区别，Last-Modified针对的是时间，ETag针对的是内容。

    ETag的优缺点：

    优点：

    ETag 解决了 Last-Modified 无法解决的一些问题。例如文件做周期性更改，内容不变，仅仅改变修改时间；某些文件修改非常频繁，比如在秒以下的时间内进行修改，Last-Modified无法判断；某些服务器不能精确的获取到最后修改时间。

    缺点：

    不同操作系统，web服务器对于ETag的计算方法也不同，当使用不同操作系统，不同类型的web服务器做负载均衡的时候，如果用ETag作为判断条件，在被负载均衡到不同服务器后，则很容易导致缓存失效。

    “Last-Modified”和“ETag”两者存在其一，就可以进行缓存协商。

参考：

https://blog.csdn.net/a7442358/article/details/48845335 

https://imweb.io/topic/5795dcb6fb312541492eda8c

<span id='g41'></span>

### JSBridge

参考：

https://juejin.im/post/5abca877f265da238155b6bc