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
