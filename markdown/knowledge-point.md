# Javascript Notes

Guides:

1.  <a href="#g1" target="_self">undefined and null</a>
2.  <a href="#g2" target="_self">浏览器 Event loop 事件循环</a>
3.  <a href="#g3" target="_self">对象深拷贝</a>
4.  <a href="#g4" target="_self"> JSONP 跨域原理及 CORS</a>
5.  <a href="#g5" target="_self"> 正则表达式之后向引用</a>
6.  <a href="#g6" target="_self"> React/Vue 不同组件之间的通信方式</a>
7.  <a href="#g7" target="_self"> 正则表达式之后向引用</a>
8.  <a href="#g8" target="_self"> this 指向</a>
9.  <a href="#g9" target="_self"> Cookie</a>
10. <a href="#g10" target="_self"> 快速排序</a>
11. <a href="#g11" target="_self"> 执行上下文(Execution Context)</a>
12. <a href="#g12" target="_self"> Promise 的实现</a>
13. <a href="#g13" target="_self"> 闭包</a>
14. <a href="#g14" target="_self"> 事件捕获 vs 事件冒泡</a>
15. <a href="#g15" target="_self"> 服务端渲染</a>
16. <a href="#g10" target="_self"> 浮点数知识</a>
17. <a href="#g17" target="_self"> const 、let、块级作用域</a>
18. <a href="#g18" target="_self"> DocumentFragment</a>
19. <a href="#19" target="_self"> 同源策咯</a>
20. <a href="#g20" target="_self"> 事件循环</a>
21. <a href="#g21" target="_self"> https 过程</a>
22. <a href="#g22" target="_self"> 订阅/发布模式（subscribe&publish）</a>
23. <a href="#g23" target="_self"> vue 双向数据绑定实现原理</a>


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

*   所有同步任务都在主线程上执行，形成一个执行栈。
*   主任务之外，还存在任务队列。
    *   任务队列分为 macro-task(宏任务)和 micro-task(微任务)。
    *   macro-task(宏任务): setTimeout, setInterval, setImmediate, I/O 等
    *   micro-task(微任务): process.nextTick, Promise, MutationObserver 等

整个最基本的 Event Loop 如图所示：

<div align="center"><img width="600"src="http://p42jcfxfo.bkt.clouddn.com/images/thinkin/eventloop.png"/></div>

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

```
const clone=(obj)=>{
  if(!obj&& typeof obj!== 'object'){
    return;
  }
  let result=obj.constructor===Object?{}:[];
  for(let key in obj){
    result[key] =(obj[key]&&typeof obj[key]==='object')?clone(obj[key]):obj[key];
  }
  return result;
}
```

<span id="g4"></span>

### 4、 JSONP 跨域原理及 CORS

#### JSONP

在同源策略下，在某个服务器下的页面是无法获取到该服务器以外的数据的，但 img、iframe、script 等标签是个例外，这些标签可以通过 src 属性请求到其他服务器上的数据。利用 script 标签的开放策略，我们可以实现跨域请求数据，当然，也需要服务端的配合。当我们正常地请求一个 JSON 数据的时候，服务端返回的是一串 JSON 类型的数据，而我们使用 JSONP 模式来请求数据的时候，服务端返回的是一段可执行的 JavaScript 代码。例如：

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

#### CORS

跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。

<span id="g5"></span>

### 5、 正则表达式之后向引用

#### 分组

组的定义：

正则表达式通过使用括号将表达式分为不同的分组，识别的方法是通过从左至右搜寻左半括号，遇到第一个左半括号时，则该左半括号与对应的右半括号所包含的内容即为第一分组，以此类推 。例如，在表达式((A)(B(C)))，有四个这样的组：((A)(B(C)))、(A)、(B(C))、(C)

#### 位置类元数据

即像^、$、\b、\B 这样的元字符，是用来表示一个位置。作为一个判断条件，匹配的字符需要满足这样的位置信息，但最终匹配的字符串中并不会包含这个样的位置信息。

#### 零宽断言

\b,^,$那样用于指定一个位置，这个位置应该满足一定的条件（即断言），因此它们也被称为零宽断言。

*   (?=exp) 匹配 exp 前面的位置，比如\b\w+(?=ing\b)，匹配以 ing 结尾的单词的前面部分(除了 ing 以外的部分)
*   (?<=exp) 匹配 exp 后面的位置，比如(?<=\bre)\w+\b 会匹配以 re 开头的单词的后半部分(除了 re 以外的部分)
*   (?!exp) 匹配后面跟的不是 exp 的位置
*   (?<!exp) 匹配前面不是 exp 的位置

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

*   父子组件用 Props 通信
*   非父子组件用 Event Bus 通信
*   如果项目够复杂,可能需要 Vuex 等全局状态管理库通信
*   $dispatch(已经废除)和$broadcast(已经废除)

#### React

*   父子组件,父->子直接用 Props,子->父用 callback 回调
*   非父子组件,用发布订阅模式的 Event 模块
*   项目复杂的话用 Redux、Mobx 等全局状态管理管库
*   用新的 Context Api

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

*   纯粹的函数调用,this 就代表全局对象 Global
*   作为对象方法的调用,this 就指向上级对象
*   作为构造函数调用,this 就指向新对象
*   apply/call 调用,this 指向第一个参数提供的对象

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

### 10、快速排序

算法思想：

*   在数据集之中，选择一个元素作为"基准"（pivot）。

*   所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。

*   对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。

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

<span id="g11"></span>

### 11、执行上下文(Execution Context)

js 的运行有三种环境：

*   Global Code, JavaScript 代码开始运行的默认环境
*   Function Code, 代码进入一个 JavaScript 函数
*   Eval Code, 使用 eval()执行代码

为了表示不同的运行环境，JavaScript 中有一个执行上下文（Execution context，EC）的概念。也就是说，当 JavaScript 代码执行的时候，会进入不同的执行上下文，这些执行上下文就构成了一个执行上下文栈（Execution context stack，ECS）。

执行上下文有三个重要的属性:

*   变量对象（Variable object，VO）,进入一个执行上下文时被激活（Activation object，AO）
*   作用域链（Scope chain）
*   this

解释器执行代码的伪逻辑:

1.  查找调用函数的代码
2.  执行代码之前，先进入创建上下文阶段
    *   分析形参
    *   扫描上下文的函数声明
        *   为发现的每一个函数，在变量对象上创建一个属性——确切的说是函数的名字——其有一个指向函数在内存中的引用
        *   如果函数的名字已经存在，引用指针将被重写
    *   扫描上下文的变量声明
        *   为发现的每个变量声明，在变量对象上创建一个属性——就是变量的名字，并且将变量的值初始化为 undefined
        *   如果变量的名字已经在变量对象里存在，将不会进行任何操作并继续扫描。
    *   求出上下文内部“this”的值。
3.  执行代码阶段
    *   在当前上下文上运行/解释函数代码，并随着代码一行行执行指派变量的值。

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

### 14、事件捕获 vs 事件冒泡

*   事件冒泡：事件从内层元素开始触发，向外层传播，直到 document。
*   事件捕获：事件从外层元素（document）开始触发，向内层传播，直到 目标元素（target）。

事件冒泡是由微软提出的，而事件捕获是由网景公司提出的，后来 w3c 制定了统一的方案：先捕获再冒泡。

对于当事件捕获和事件冒泡一起存在的情况，事件触发过程如下：

1.  document 往 target 节点，捕获前进，遇到注册的捕获事件立即触发执行

2.  到达 target 节点，触发事件（对于 target 节点上，是先捕获还是先冒泡则捕获事件和冒泡事件的注册顺序，先注册先执行）

3.  target 节点 往 document 方向，冒泡前进，遇到注册的冒泡事件立即触发

事件捕获与事件冒泡的用用--事件代理

<span id="g15"></span>

### 15、服务端渲染

在后端将数据拼接到 HTML 字符串上发送给客户端，浏览器从服务器接收 HTML 并渲染。服务端渲染的优势:

*   SEO
    *   爬虫可以抓取页面的关键字等信息
*   首屏直出 \* 减少首屏渲染时间
    <span id="g16"></span>

### 16、浮点数知识

根据国际标准 IEEE 754，任意一个二进制浮点数 V 可以表示成下面的形式：
V=(-1)<sup>s</sup>*M*2<sup>E</sup>

*   (-1)^s 表示符号位
*   表示有效数字，大于等于 1，小于 2
*   2^E 表示指数位

对于 32 位的浮点数，最高的 1 位是符号位 s，接着的 8 位是指数 E，剩下的 23 位为有效数字 M。

Javascript 浮点数运算会先把十进制数转化为二进制数（乘二取整），然而有可能得到无限循环二进制数，然后再进行运算，然后再将结果转化为十进制数返回。
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

*   允许在块级作用域内声明函数。
*   函数声明类似于 var，即会提升到全局作用域或函数作用域的头部。
*   同时，函数声明还会提升到所在的块级作用域的头部。

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

*   Cookie
    *   Cookie 是服务器写入浏览器的一小段信息，只有同源的网页才能共享。
*   iframe

    *   如果两个网页不同源，就无法拿到对方的 DOM。

*   AJAX

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

### https 过程

客户端和服务器握手过程大致如下:
第一步，客户端给出协议版本号、一个客户端生成的随机数（Client random），以及客户端支持的加密方法。

第二步，服务器确认双方使用的加密方法，并给出数字证书、以及一个服务器生成的随机数（Server random）。

第三步，客户端确认数字证书有效，然后生成一个新的随机数（Premaster secret），并使用数字证书中的公钥，加密这个随机数，发给服务器。

第四步，服务器使用自己的私钥，获取客户端发来的随机数（即 Premaster secret）。

第五步，客户端和服务器根据约定的加密方法，使用前面的三个随机数，生成"对话密钥"（session key），用来加密接下来的整个对话过程。

参考[图解 SSL/TLS 协议](http://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html)

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

### vue 双向数据绑定实现原理

[vue 双向数据绑定实现原理](https://juejin.im/entry/59116fa6a0bb9f0058aaaa4c)
