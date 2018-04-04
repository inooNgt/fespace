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


### React/Vue 不同组件之间是的通信方式

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
