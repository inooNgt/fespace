# Vue 核心原理

### 生命周期

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

1.  beforeCreate
    InitEvents、InitLifecycle 后调用
2.  created
    initInjections、initState 后调用，initState 中调用 observe 方法对数据进行观察

        ```javascript
        observe(data, true /_ asRootData _/)
        ```

3.  beforeMount
    接下来根据 el 或者 template 选项找到模板并编译产生 render function，之后调用 beforeMount

4.  mounted
    执行 render function，挂载 DOM

5.  beforeUpdate
    当 vue 发现 data 中的数据发生了改变，调用 beforeUpdate

6.  updated
    更新虚拟 dom，重新渲染，调用 updated

7.  beforeDestroy
    beforeDestroy 钩子函数在实例销毁之前调用。在这一步，实例仍然完全可用。
8.  destroyed
    调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

### EventBus

EventBus 又称为事件总线。在 Vue 中可以使用 EventBus 来作为沟通桥梁的概念，就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件，所以组件都可以上下平行地通知其他组件。

参考：https://juejin.im/post/5bb355dae51d450ea4020b42#heading-0

### 双向绑定三大核心

Vue 的双向绑定有三大核心：Observer,Dep,Watcher

#### Dep

Dep 主要负责依赖的收集,get 时触发收集，set 时通知 watcher 通信：

```javascript
class Dep {
    constructor() {
        // 存放所有的监听watcher
        this.subs = [];
    }
    //添加一个观察者对象
    addSub(Watcher) {
        this.subs.push(Watcher);
    }
    //依赖收集
    depend() {
        //Dep.target 作用只有需要的才会收集依赖
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }
    // 调用依赖收集的Watcher更新
    notify() {
        const subs = this.subs.slice();
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update();
        }
    }
}

// 为Dep.target 赋值，target实际上是一个Watcher
export function pushTarget(Watcher) {
    1;
    Dep.target = Watcher;
}
```

#### Watcher

Watcher 负责数据变更之后调用 Vue 的 diff 进行视图的更新

简化的 Watcher：

```javascript
class Watcher {
    constructor(
        vm: Component,
        expOrFn: string | Function,
        cb: Function,
        options?: ?Object,
        isRenderWatcher?: boolean
    ) {
        this.vm = vm;
        if (isRenderWatcher) {
            vm._watcher = this;
        }
        vm._watchers.push(this);
        // options
        if (options) {
            this.deep = !!options.deep;
            this.user = !!options.user;
            this.lazy = !!options.lazy;
            this.sync = !!options.sync;
            this.before = options.before;
        } else {
            this.deep = this.user = this.lazy = this.sync = false;
        }
        //在Vue中cb是更新视图的核心，调用diff并更新视图的过程
        this.cb = cb;
        this.id = ++uid; // uid for batching
        this.active = true;
        this.dirty = this.lazy; // for lazy watchers
        this.deps = [];
        //收集Deps，用于移除监听
        this.newDeps = [];
        this.depIds = new Set();
        this.newDepIds = new Set();
        this.expression =
            process.env.NODE_ENV !== "production" ? expOrFn.toString() : "";
        // parse expression for getter
        if (typeof expOrFn === "function") {
            this.getter = expOrFn;
        } else {
            this.getter = parsePath(expOrFn);
            if (!this.getter) {
                this.getter = noop;
                process.env.NODE_ENV !== "production" &&
                    warn(
                        `Failed watching path: "${expOrFn}" ` +
                            "Watcher only accepts simple dot-delimited paths. " +
                            "For full control, use a function instead.",
                        vm
                    );
            }
        }
        this.value = this.lazy ? undefined : this.get();
    }

    get() {
        //设置Dep.target值，用以依赖收集
        pushTarget(this);
        const vm = this.vm;
        let value = this.getter.call(vm, vm);
        return value;
    }

    //添加依赖，在addDep的同时addSub
    addDep(dep) {
        // 这里简单处理
        this.newDeps.push(dep);
        dep.addSub(this);
    }

    /**
     * 通过getter计算value
     */
    evaluate() {
        this.value = this.get();
        this.dirty = false;
    }

    //更新视图
    update() {
        if (this.lazy) {
            this.dirty = true;
        } else if (this.sync) {
            this.run();
        } else {
            queueWatcher(this);
        }
    }

    /**
     * Scheduler job interface.
     * Will be called by the scheduler.
     */
    run() {
        if (this.active) {
            const value = this.get();
            if (
                value !== this.value ||
                // Deep watchers and watchers on Object/Arrays should fire even
                // when the value is the same, because the value may
                // have mutated.
                isObject(value) ||
                this.deep
            ) {
                // set new value
                const oldValue = this.value;
                this.value = value;
                if (this.user) {
                    try {
                        this.cb.call(this.vm, value, oldValue);
                    } catch (e) {
                        handleError(
                            e,
                            this.vm,
                            `callback for watcher "${this.expression}"`
                        );
                    }
                } else {
                    this.cb.call(this.vm, value, oldValue);
                }
            }
        }
    }
}
```

#### Observer

```javascript
export class Observer {
   value: any;
   dep: Dep;
   vmCount: number;
    constructor(value) {
        this.value = value;
        // 增加dep属性（处理数组时可以直接调用）
        this.dep = new Dep();
        this.vmCount = 0;
        //将Observer实例绑定到data的__ob__属性上面去，后期如果oberve时直接使用，不需要从新Observer,
        def(value, "__ob__", this);
        if (Array.isArray(value)) {
            //处理数组
            const augment = value.__proto__ ? protoAugment : copyAugment;
            //此处的 arrayMethods 就是上面使用Object.defineProperty处理过
            augment(value, arrayMethods, arrayKeys);
            // 循环遍历数组children进行oberve
            this.observeArray(value);
        } else {
            //处理对象
            this.walk(value);
        }
    }

    // 遍历对象属性，并将其转换成getter/setter的形式
    walk(obj) {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]]);
        }
    }
    // 侦听数组的每一个元素
    observeArray(items) {
        for (let i = 0, l = items.length; i < l; i++) {
            observe(items[i]);
        }
    }
}
//数据重复Observer
function observe(value，asRootData) {
    if (typeof value != "object") return;
    let ob = new Observer(value);
    if (asRootData && ob) {
        ob.vmCount++
    }
    return ob;
}
// 把对象属性改为getter/setter，并收集依赖
function defineReactive(obj, key, val) {
    const dep = new Dep();
    //处理children
    let childOb = observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            console.log(`调用get获取值，值为${val}`);
            const value = val;
            if (Dep.target) {
                // 依赖收集
                // dep.depend->watcher.addDep->dep.addSub
                dep.depend();
                if (childOb) {
                    childOb.dep.depend();
                }
                //此处是对Array数据类型的依赖收集
                if (Array.isArray(value)) {
                    dependArray(value);
                }
            }
            return value;
        },
        set: function reactiveSetter(newVal) {
            console.log(`调用了set，值为${newVal}`);
            const value = val;
            val = newVal;
            //对新值进行observe
            childOb = observe(newVal);
            //通知dep调用,循环调用手机的Watcher依赖，进行视图的更新
            dep.notify();
        }
    });
}

//辅助方法
function def(obj, key, val) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: true,
        writable: true,
        configurable: true
    });
}

//重新赋值Array的__proto__属性
function protoAugment(target, src) {
    target.__proto__ = src;
}
//不支持__proto__的直接修改相关属性方法
function copyAugment(target, src, keys) {
    for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        def(target, key, src[key]);
    }
}
//收集数组的依赖
function dependArray(value) {
    for (let e, i = 0, l = value.length; i < l; i++) {
        e = value[i];
        e && e.__ob__ && e.__ob__.dep.depend();
        if (Array.isArray(e)) {
            //循环遍历chindren进行依赖收集
            dependArray(e);
        }
    }
}
```

Vue 在执行方法 initState->initData 后调用 observe 方法进行数据侦听：

```javascript
vm.$options.data;
observe(data, true /* asRootData */);
```

observer 会返回一个 Observer 实例 ob = new Observer(data)

### 双向绑定

1. new Vue:

-   observe -> defineReative
    -   dep=new Dep()
    -   setter -> dep.notify setter 发布通知
        -   sub.update watcher 执行 update 方法
            -   更新 node
            -   sub.get -> getter
    -   getter -> dep.addSup(sub) 收集依赖
-   compile -> new Watcher 为每个与数据绑定相关的节点生成一个观察者 watcher，即 sub
    -   this.upate(sub.update) 初始化

2. 事件处理 -> setter 继续以上流程

参考：

[vue 双向数据绑定实现原理](https://juejin.im/entry/59116fa6a0bb9f0058aaaa4c)

[vue 依赖收集原理](https://juejin.im/post/5b40c8495188251af3632dfa)

### 计算属性 computed 原理

计算属性提供的函数将被作为相应属性的 getter 函数。若依赖的其他属性改变，此属性也会自动更新。此外，计算属性也可以设置 setter。

计算属性和方法的区别：计算值会被缓存，依赖的 data 值改变时才会从新计算；方法每次都需要执行。

计算属性和的侦听属性的区别:计算属性辑清晰，方便于管理；侦听属性很容易滥用。

computed 源码简化：

```javascript
const computedWatcherOptions = { lazy: true };
const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
};
function initComputed(vm: Component, computed: Object) {
    // $flow-disable-line
    const watchers = (vm._computedWatchers = Object.create(null));
    const isSSR = isServerRendering();
    for (const key in computed) {
        const userDef = computed[key];
        const getter = typeof userDef === "function" ? userDef : userDef.get;

        // 为computed属性创建watcher
        if (!isSSR) {
            watchers[key] = new Watcher(
                vm,
                getter || noop,
                noop,
                computedWatcherOptions
            );
        }

        // component-defined computed properties are already defined on the
        // component prototype. We only need to define computed properties defined
        // at instantiation here.
        if (!(key in vm)) {
            defineComputed(vm, key, userDef);
        }
    }
}
export function defineComputed(
    target: any,
    key: string,
    userDef: Object | Function
) {
    const shouldCache = !isServerRendering();
    if (typeof userDef === "function") {
        sharedPropertyDefinition.get = shouldCache
            ? createComputedGetter(key)
            : createGetterInvoker(userDef);
        sharedPropertyDefinition.set = noop;
    } else {
        sharedPropertyDefinition.get = userDef.get
            ? shouldCache && userDef.cache !== false
                ? createComputedGetter(key)
                : createGetterInvoker(userDef.get)
            : noop;
        sharedPropertyDefinition.set = userDef.set || noop;
    }
    // 取得getter、setter后定义computed属性
    Object.defineProperty(target, key, sharedPropertyDefinition);
}
function createComputedGetter(key) {
    // 计算属性的Getter函数
    return function computedGetter() {
        const watcher = this._computedWatchers && this._computedWatchers[key];
        if (watcher) {
            if (watcher.dirty) {
                // watcher.get->pushtTarget 为依赖收集作标记
                // 通过watcher调用Getter函数计算computed的结果
                watcher.evaluate();
            }

            // 依赖收集
            // dep.depend->watch.addDep->dep.addSub
            if (Dep.target) {
                watcher.depend();
            }
            // 返回computed的结果
            return watcher.value;
        }
    };
}

function createGetterInvoker(fn) {
    return function computedGetter() {
        return fn.call(this, this);
    };
}
```

现在可以回答问题：为何触发 data 值改变时 computed 会重新计算

-   initComputed 创建 watcher
-   在 computedGetter 中通过 watcher.depend()进行依赖收集
-   改变 data，触发 setter
-   dep.notify 发布通知，dep.subs 中的每个 watcher 都执行 update 方法
-   update->watcher.get ,call Getter 再执行 Getter 函数重新计算 computed

例子：

```html
<div id="example">
      <p>Original message: "{{ message }}"</p>
      <p>Computed reversed message: "{{ reversedMessage }}"</p>
    </div>
    <script>
      var vm = new Vue({
        el: '#example',
        data: {
          message: 'Hello'
        },
        computed: {
          // 计算属性的 getter
          reversedMessage: function() {
            debugger
            // `this` 指向 vm 实例
            return this.message
              .split('')
              .reverse()
              .join('')
          }
        }
      })
    </script>
```

在 message 的 dep.subs 记录了两个 watcher，一个是 message 的，另一个是 reversedMessage。
message 的值改变后，在 setter 里执行 dep.notify，遍历 dep.subs 执行 watcher.update 方法，最后 message 和 reversedMessage 都得到了更新。

<div align="center"><img width="600"src="http://cdn.inoongt.tech/images/thinkin/computed.png"/></div>

### watch 原理

```javascript
function initWatch(vm: Component, watch: Object) {
    for (const key in watch) {
        const handler = watch[key];
        if (Array.isArray(handler)) {
            for (let i = 0; i < handler.length; i++) {
                createWatcher(vm, key, handler[i]);
            }
        } else {
            createWatcher(vm, key, handler);
        }
    }
}

function createWatcher(
    vm: Component,
    expOrFn: string | Function,
    handler: any,
    options?: Object
) {
    if (isPlainObject(handler)) {
        options = handler;
        handler = handler.handler;
    }
    if (typeof handler === "string") {
        handler = vm[handler];
    }
    return vm.$watch(expOrFn, handler, options);
}

export function stateMixin(Vue: Class<Component>) {
    // 省略部分源码

    Vue.prototype.$watch = function(
        expOrFn: string | Function,
        cb: any,
        options?: Object
    ): Function {
        const vm: Component = this;
        if (isPlainObject(cb)) {
            return createWatcher(vm, expOrFn, cb, options);
        }
        options = options || {};
        options.user = true;
        const watcher = new Watcher(vm, expOrFn, cb, options);
        if (options.immediate) {
            try {
                cb.call(vm, watcher.value);
            } catch (error) {
                handleError(
                    error,
                    vm,
                    `callback for immediate watcher "${watcher.expression}"`
                );
            }
        }
        return function unwatchFn() {
            watcher.teardown();
        };
    };
}
```

简化的 Watcher：

```javascript
class Watcher {
    constructor(
        vm: Component,
        expOrFn: string | Function,
        cb: Function,
        options?: ?Object,
        isRenderWatcher?: boolean
    ) {
        // ...
        if (options) {
            this.deep = !!options.deep;
            this.user = !!options.user;
            this.lazy = !!options.lazy;
        } else {
            this.deep = this.user = this.lazy = false;
        }
        this.vm = vm;
        if (isRenderWatcher) {
            vm._watcher = this;
        }
        vm._watchers.push(this);
        //在Vue中cb是更新视图的核心，调用diff并更新视图的过程
        this.cb = cb;
        this.active = true;
        if (typeof expOrFn === "function") {
            this.getter = expOrFn;
        } else {
            this.getter = parsePath(expOrFn);
        }
        this.value = this.lazy ? undefined : this.get();
    }

    /**
     * Evaluate the getter, and re-collect dependencies.
     */
    get() {
        pushTarget(this);
        let value;
        const vm = this.vm;
        try {
            value = this.getter.call(vm, vm);
        } catch (e) {
            if (this.user) {
                handleError(e, vm, `getter for watcher "${this.expression}"`);
            } else {
                throw e;
            }
        } finally {
            // "touch" every property so they are all tracked as
            // dependencies for deep watching
            if (this.deep) {
                traverse(value);
            }
            popTarget();
            this.cleanupDeps();
        }
        return value;
    }

    //更新视图
    update() {
        // ...
        this.run();
    }
    /**
     * Scheduler job interface.
     * Will be called by the scheduler.
     */
    run() {
        if (this.active) {
            const value = this.get();
            if (
                value !== this.value ||
                // Deep watchers and watchers on Object/Arrays should fire even
                // when the value is the same, because the value may
                // have mutated.
                isObject(value) ||
                this.deep
            ) {
                // set new value
                const oldValue = this.value;
                this.value = value;
                if (this.user) {
                    try {
                        this.cb.call(this.vm, value, oldValue);
                    } catch (e) {
                        handleError(
                            e,
                            this.vm,
                            `callback for watcher "${this.expression}"`
                        );
                    }
                } else {
                    this.cb.call(this.vm, value, oldValue);
                }
            }
        }
    }

    // ...
}

function parsePath(path) {
    if (bailRE.test(path)) {
        return;
    }
    var segments = path.split(".");
    return function(obj) {
        for (var i = 0; i < segments.length; i++) {
            if (!obj) {
                return;
            }
            obj = obj[segments[i]];
        }
        return obj;
    };
}
```

watch 工作流程：

-   initState -> initWatch
-   initWatch 为每一个 watch 属性 createWatcher ,即 new Watcher
    -   Watcher 中记录回调函数 watcher.cb=cb
-   改变 data，触发 setter
-   dep.notify 发布通知，dep.subs 中的每个 watcher 都执行 update 方法
-   然后依次执行 watcher.update -> watcher.run -> watcher.cb.call(this.vm, value, oldValue) ，至此回调函数就被执行了。

### Vue 模板编译核心原理

Vue 模板编译分为：

-   独立构建：编译+运行时
-   运行时构建：运行时

#### compiletoRenderfunction(tempalte)

compile 的三个步骤：

-   parse 解析 template 中的指令、class、sytle 等数据，形成 AST
-   optimize 优化，标记静态节点
-   generate 将 AST 转化成 renderfunction 字符串的过程

compile 代码：

```javascript
var createCompiler = createCompilerCreator(function baseCompile(
    template,
    options
) {
    var ast = parse(template.trim(), options);
    if (options.optimize !== false) {
        optimize(ast, options);
    }
    var code = generate(ast, options);
    return {
        ast: ast,
        render: code.render,
        staticRenderFns: code.staticRenderFns
    };
});
```

#### Vue.protoypte.\$mount 执行流程：

-   根据 optins 中的选项 render、el、template 获取编译模板 template
-   compileToFunctions(template), 由 template 生成 render function
-   mountComponent
    -> vm.\_update(vm.\_render(), hydrating);
    -> new Watcher

#### render functin

1. 渲染函数结构

```javascript
//message/reversedMessage 是组建的数据
function anonymous() {
    with (this) {
        return _c("div", { attrs: { id: "example" } }, [
            _c("p", [_v('Original message: "' + _s(message) + '"')]),
            _v(" "),
            _c("p", [
                _v('Computed reversed message: "' + _s(reversedMessage) + '"')
            ])
        ]);
    }
}
```

2. 渲染函数的执行
   Vue.prototype.\_render 中：

```javascript
vnode = render.call(vm._renderProxy, vm.$createElement);
```

当 render functin 被调用的时候，需要读取所需对象（vm.\_renderProxy->hashandler）的值，所以会出发 getter 函数进行依赖收集，其目的是将观察者 Watcher 存放到订阅者 Dep 的 subs 中。

在修改对象指的时候，会触发对应的 setter，setter 通知之前依赖收集得到的 Dep 中的每一个 Watcher，告诉它们自己的指发生了变化，需要重新渲染视图。

3. 渲染函数作用域代理

```javascript
const hasHandler = {
    has(target, key) {
        const has = key in target;
        const isAllowed =
            allowedGlobals(key) ||
            (typeof key === "string" &&
                key.charAt(0) === "_" &&
                !(key in target.$data));
        if (!has && !isAllowed) {
            if (key in target.$data) warnReservedPrefix(target, key);
            else warnNonPresent(target, key);
        }
        return has || !isAllowed;
    }
};

const getHandler = {
    get(target, key) {
        if (typeof key === "string" && !(key in target)) {
            if (key in target.$data) warnReservedPrefix(target, key);
            else warnNonPresent(target, key);
        }
        return target[key];
    }
};
initProxy = function initProxy(vm) {
    if (hasProxy) {
        // determine which proxy handler to use
        const options = vm.$options;
        const handlers =
            options.render && options.render._withStripped
                ? getHandler
                : hasHandler;
        vm._renderProxy = new Proxy(vm, handlers);
    } else {
        vm._renderProxy = vm;
    }
};
```

### todo

#### $emit 原理
