Promise顺序执行
=============
### 起源
JavaScript在处理异步任务时，经常用到的手段是回调函数。奈何，面对多个需要顺序执行的异步任务很容易造成回调地狱(Callback Hell):

```javascript
request(a, (b) => {
    request(b, (c) => {
        request(c, (d) => {
	    //...
        })
    })
})
```

Promise是Callback Hell的一种解决方案，并且得到了非常广泛的应用。

### Promise顺序执行异步任务
将异步任务改写成Promise的形式，然后在上一个 promise 的状态变为 resolved 调用下一个promise。
Promise处理异步任务的优雅的实现方式应该是这样：
``` javascript
const A = a =>
    new Promise((resolve, reject) => request(a, resolve))

const B = b =>
    new Promise((resolve, reject) => request(b, resolve))

const C = c =>
    new Promise((resolve, reject) => request(c, resolve))

A(a)
    .then(B)
    .then(C)
    .catch(e => {
        console.log(e)
    })
```

基于以上结果我们可以进一步将其封装成进行顺序处理的函数,此函数接受异步任务数组作为参数，顺序执行后返回结果。
顺序处理的函数的实现方式：
``` javascript
/**	
* @param {*promise任务队列} tasks 
*/
const sequenceTasks = (tasks) => {
    const recordValue = (results, value) => {
        results.push(value);
        return results;
    }
    const pushValue = recordValue.bind(null, []);
	
    return tasks.reduce(function (promise, task) {
        return promise.then(task).then(pushValue);
	}, Promise.resolve());
}

const promise1= ()=> new Promise((resolve,rejecrt)=>{
	setTimeout(()=>{
		console.log("promise1 resolve")
		resolve("promise1")
	},1000)
})

const promise2= ()=> new Promise((resolve,rejecrt)=>{
	setTimeout(()=>{
		console.log("promise2 resolve")
		resolve("promise2")
	},1)
})

const tasks = [promise1, promise2];
sequenceTasks(tasks)
    .then(res=>{
	console.log("res",res)
    })
    .catch(e => {
	console.log(e)
    })
//输出结果：
//promise1 resolve
//promise2 resolve
//res ["promise1", "promise2"]
```

在reduce中第一个参数中被 return 的值,利用reduce方法使下一个promise指向promise.then(task).then(pushValue)，从而实现promise链。