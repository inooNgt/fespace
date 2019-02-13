# 实现一个简单的 React-调和过程（Diff 算法）

上一篇文章中的 render 方法直接使用虚拟 DOM 来生成真实 DOM 结构，每次组件更新时都会带来大量对真实 DOM 的操作，这就会带来性能问题。React 所采用的方法是通过比较新的虚拟 DOM 和旧的虚拟 DOM 找出其中的差异，更新到真实 DOM 上，从而提高程序执行效率。这一过程就是 React 的调和过程 （Reconciliation），也称为 Diff 算法。

### 如何记录虚拟 DOM？

要完成同样的功能，我们首先要记录旧的虚拟 DOM。如何记录虚拟 DOM？我们要引入一个实例的概念，实例由虚拟 DOM 生产，代表了已经渲染在 DOM 中的元素的信息，每一个真实 DOM 节点都有一个对应的实例。根据虚拟 DOM 生成实例，每次调用 render 方法后记录实例，就记录了虚拟 DOM。事实上，实例是一个 JS 对象，拥有 vnode, dom,和 childInstances 三个属性。

### 重构 render 函数

现在我们来重构 render 函数，通过 reconcile 函数获取新实例，用变量 rootInstance 记录已渲染的实例。

```javascript
let rootInstance = null;

function render(vnode, container) {
    const nextInstance = reconcile(container, rootInstance, vnode);
    rootInstance = nextInstance;
}
```

### 调和函数

我们期望调和函数 reconcile 在旧实例和由虚拟 DOM 生成的新实例之间找出差异，然后再更新到真实 DOM 上，最后返回更新的实例。现在 reconcile 函数要做的有：

1. 未记录过实例则代表初次渲染，直接将实例节点添加到真实 DOM
2. 对于文本节点，直接改变节点的 nodeValue 值
3. 其他情况，这里先用新实例替换旧实例，下文再详述

```javascript
function reconcile(parentDom, instance, vnode) {
    if (instance == null) {
        const newInstance = instantiate(vnode);
        parentDom.appendChild(newInstance.dom);
        return newInstance;
    } else if (typeof vnode !== "object") {
        if (instance.vnode !== vnode) {
            instance.dom.nodeValue = vnode;
        }
        return instance;
    } else {
        const newInstance = instantiate(vnode);
        parentDom.replaceChild(newInstance.dom, instance.dom);
        return newInstance;
    }
}
```

### 实例化

reconcile 函数中用到了实例化函数 instantiate，instantiate 接收虚拟 DOM 作为参数，返回由虚拟 DOM 生成的实例对象，实例对象有 vnode, dom,和 childInstances 三个属性，dom 是实例对应的 真实 DOM 节点，childInstances 是由子节点的实例组合而成的数组。

```javascript
function instantiate(vnode) {
    // 当vnode为基本数据类型时，渲染结果是一段文本
    if (typeof vnode !== "object") {
        const textNode = document.createTextNode(vnode);
        return { dom: textNode, vnode };
    }

    const { type, props } = vnode;
    // 创建DOM节点
    const dom = document.createElement(type);

    // 添加事件句柄
    const isListener = name => name.startsWith("on");
    Object.keys(props)
        .filter(isListener)
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2);
            dom.addEventListener(eventType, props[name]);
        });

    // 设置节点属性
    const isAttribute = name => !isListener(name) && name != "children";
    Object.keys(props)
        .filter(isAttribute)
        .forEach(name => {
            dom[name] = props[name];
        });

    // Render children
    const childElements =
        Object.prototype.toString.call(props.children) === "[object Array]"
            ? props.children
            : [props.children];
    const childInstances = childElements.map(instantiate);
    const childDoms = childInstances.map(childInstance => childInstance.dom);
    childDoms.forEach(childDom => dom.appendChild(childDom));

    const instance = { dom, vnode, childInstances };
    return instance;
}
```

现在的 instantiate 函数比较混乱，我们把设置元素属性的部分拆分为 updateDomProperties 方法以便重用：

```javascript
function instantiate(vnode) {
    // 当vnode为基本数据类型时，渲染结果是一段文本
    if (typeof vnode !== "object") {
        const textNode = document.createTextNode(vnode);
        return { dom: textNode, vnode };
    }

    const { type, props } = vnode;
    // 创建DOM节点
    const dom = document.createElement(type);

    updateDomProperties(dom, [], props);

    // Render children
    const childElements =
        Object.prototype.toString.call(props.children) === "[object Array]"
            ? props.children
            : [props.children];
    const childInstances = childElements.map(instantiate);
    const childDoms = childInstances.map(childInstance => childInstance.dom);
    childDoms.forEach(childDom => dom.appendChild(childDom));

    const instance = { dom, vnode, childInstances };
    return instance;
}

function updateDomProperties(dom, prevProps, nextProps) {
    // 添加事件句柄
    const isListener = name => name.startsWith("on");
    Object.keys(props)
        .filter(isListener)
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2);
            dom.addEventListener(eventType, props[name]);
        });

    // 设置节点属性
    const isAttribute = name => !isListener(name) && name != "children";
    Object.keys(props)
        .filter(isAttribute)
        .forEach(name => {
            dom[name] = props[name];
        });
}
```

### reconcile-比较根节点

目前为止我们的调和函数 reconcile 只是简单使用 replaceChild 把整棵 DOM 树拆掉重建。现在做一些优化：

1. 如果根节点是不同类型(包括组件类型)的元素，则认为新旧 DOM 树完全不同，把整棵 DOM 树拆掉重建；
2. 如果根节点类型是相同的 DOM 元素，则保留根节点，只更新根节点属性；

同时 ，updateDomProperties 函数也要做一些修改：移除所有旧的节点属性，再重新设置新的节点属性。
事实上，React 的 Diff 算法对相同类型的 DOM 元素，会比较根节点的属性，然后只更新变化了的属性，我们在这里先不考虑。

```javascript
function reconcile(parentDom, instance, vnode) {
    if (instance == null) {
        // Create instance
        const newInstance = instantiate(vnode);
        parentDom.appendChild(newInstance.dom);
        return newInstance;
    } else if (typeof vnode !== "object") {
        if (instance.vnode !== vnode) {
            instance.dom.nodeValue = vnode;
        }
        return instance;
    } else if (instance.vnode.type === vnode.type) {
        // Update instance
        updateDomProperties(instance.dom, instance.vnode.props, vnode.props);
        instance.vnode = vnode;
        return instance;
    } else {
        // Replace instance
        const newInstance = instantiate(vnode);
        parentDom.replaceChild(newInstance.dom, instance.dom);
        return newInstance;
    }
}

function updateDomProperties(dom, prevProps, nextProps) {
    const isEvent = name => name.startsWith("on");
    const isAttribute = name => !isEvent(name) && name != "children";

    // Remove event listeners
    Object.keys(prevProps)
        .filter(isEvent)
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2);
            dom.removeEventListener(eventType, prevProps[name]);
        });

    // Remove attributes
    Object.keys(prevProps)
        .filter(isAttribute)
        .forEach(name => {
            dom[name] = null;
        });

    // Set attributes
    Object.keys(nextProps)
        .filter(isAttribute)
        .forEach(name => {
            dom[name] = nextProps[name];
        });

    // Add event listeners
    Object.keys(nextProps)
        .filter(isEvent)
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2);
            dom.addEventListener(eventType, nextProps[name]);
        });
}
```

### reconcile-比较子节点

比较完根节点以后，需要以同样的原则继续递归比较子节点，每一个子节点相对于其层级以下的节点来说又是一个根节点。
当一个子节点有多个子节点时，我们按照顺序逐一比较两棵树上对应的子节点。这样做有一个缺陷，当子节点仅改变顺序或者插入、删除一个节点时，仍按照节点顺序比较则可能导致所有子节点都被修改。
React 的解决方案是，为每一个子节点添加 key 属性用来标识子节点，对 key 值相同的子节点进行比较。为了简单起见，我们先不引入 key 属性。

```javascript
function reconcile(parentDom, instance, vnode) {
    if (instance == null) {
        // Create instance
        const newInstance = instantiate(vnode);
        parentDom.appendChild(newInstance.dom);
        return newInstance;
    } else if (typeof vnode !== "object") {
        if (instance.vnode !== vnode) {
            instance.dom.nodeValue = vnode;
        }
        return instance;
    } else if (vnode == null) {
        // Remove instance
        parentDom.removeChild(instance.dom);
        return null;
    } else if (instance.vnode.type === vnode.type) {
        // Update instance
        updateDomProperties(instance.dom, instance.vnode.props, vnode.props);
        instance.childInstances = reconcileChildren(instance, vnode);
        instance.vnode = vnode;
        return instance;
    } else {
        // Replace instance
        const newInstance = instantiate(vnode);
        parentDom.replaceChild(newInstance.dom, instance.dom);
        return newInstance;
    }
}

function reconcileChildren(instance, vnode) {
    const dom = instance.dom;
    const childInstances = instance.childInstances;
    const { props } = vnode;
    const nextChildElements =
        Object.prototype.toString.call(props.children) === "[object Array]"
            ? props.children
            : [props.children];
    const newChildInstances = [];
    const count = Math.max(childInstances.length, nextChildElements.length);
    for (let i = 0; i < count; i++) {
        const childInstance = childInstances[i];
        const childElement = nextChildElements[i];
        const newChildInstance = reconcile(dom, childInstance, childElement);
        newChildInstances.push(newChildInstance);
    }
    return newChildInstances.filter(instance => instance != null);
}
```
