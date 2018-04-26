# Javascript Knowledge Point

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

### JSONP 跨域原理

在同源策略下，在某个服务器下的页面是无法获取到该服务器以外的数据的，但 img、iframe、script 等标签是个例外，这些标签可以通过 src 属性请求到其他服务器上的数据。利用 script 标签的开放策略，我们可以实现跨域请求数据，当然，也需要服务端的配合。当我们正常地请求一个 JSON 数据的时候，服务端返回的是一串 JSON 类型的数据，而我们使用 JSONP 模式来请求数据的时候，服务端返回的是一段可执行的 JavaScript 代码。

### 正则表达式之后向引用

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

### React/Vue 不同组件之间的通信方式

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

### Thunk 函数

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

### this 指向

*   纯粹的函数调用,this 就代表全局对象 Global
*   作为对象方法的调用,this 就指向上级对象
*   作为构造函数调用,this 就指向新对象
*   apply/call 调用,this 指向第一个参数提供的对象

### Cookie

功能：按照一定规范来储存这些信息，并在随后的请求中将这些信息发送至服务器，cookie 的值被存储在名为 Cookie 的 HTTP 消息头中。

给 document 赋值并不会覆盖原有的值。

```
const setCookie=(key,value,expires)=>{
    document.cookie=!expires?
	    `${key}=${value}`:
		`${key}=${value};expires=${`expires`};

}

const getCookie=(key)=>{
    const reg =new RegExp(`(?<=${key}=)(\w)+(?=\;)`,'g');
    let result="";
    let cookie=document.cookie;
    if(cookie){
    	result=cookie.match(r)[0]
    }

    return result;

}
```

### 快速排序

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

### 执行上下文(Execution Context)

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

### Promise 的实现

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

### 闭包

闭包是即使被外部函数返回，依然可以访问到外部（封闭）函数作用域的函数。

### 事件捕获 vs 事件冒泡

*   事件冒泡：事件从内层元素开始触发，向外层传播，直到 document。
*   事件捕获：事件从外层元素（document）开始触发，向内层传播，直到 目标元素（target）。

事件冒泡是由微软提出的，而事件捕获是由网景公司提出的，后来 w3c 制定了统一的方案：先捕获再冒泡。

对于当事件捕获和事件冒泡一起存在的情况，事件触发过程如下：

1.  document 往 target 节点，捕获前进，遇到注册的捕获事件立即触发执行

2.  到达 target 节点，触发事件（对于 target 节点上，是先捕获还是先冒泡则捕获事件和冒泡事件的注册顺序，先注册先执行）

3.  target 节点 往 document 方向，冒泡前进，遇到注册的冒泡事件立即触发

事件捕获与事件冒泡的用用--事件代理

### 服务端渲染

在后端将数据拼接到 HTML 字符串上发送给客户端，浏览器从服务器接收 HTML 并渲染。服务端渲染的优势:

*   SEO
    *   爬虫可以抓取页面的关键字等信息
*   首屏直出
    *   减少首屏渲染时间

### 浮点数知识

根据国际标准 IEEE 754，任意一个二进制浮点数 V 可以表示成下面的形式：
V=(-1)<sup>s</sup>*M*2<sup>E</sup>

*   (-1)^s 表示符号位
*   表示有效数字，大于等于 1，小于 2
*   2^E 表示指数位

对于 32 位的浮点数，最高的 1 位是符号位 s，接着的 8 位是指数 E，剩下的 23 位为有效数字 M。

Javascript 浮点数运算会先把十进制数转化为二进制数（乘二取整），然而有可能得到无限循环二进制数，然后再进行运算，然后再将结果转化为十进制数返回。
