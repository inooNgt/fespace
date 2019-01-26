# 实现一个简单的 React-调和过程（Reconciliation）

上一篇文章中的 render 方法直接使用虚拟 DOM 来生成真实 DOM 结构，每次组件更新时都会带来大量对真实 DOM 的操作，这就会带来性能问题。React 所采用的方法是通过比较新的虚拟 DOM 和旧的虚拟 DOM 找出其中的差异，更新到真实 DOM 上，从而提高程序执行效率。这一过程就是 React 的调和过程 （Reconciliation），也称为“Diff”算法。

### 如何记录虚拟 DOM？

要完成同样的功能，我们首先要记录旧的虚拟 DOM。如何记录虚拟 DOM？我们要引入一个实例的概念，实例代表了已经渲染在 DOM 中的元素的信息，每一个真实 DOM 节点都有一个对应的实例。根据虚拟 DOM 生成实例，每次调用 render 方法后记录实例，就记录了虚拟 DOM。事实上，实例是一个 JS 对象，拥有 element, dom,和 childInstances 三个属性。childInstances 是由子节点的实例组合而成的数组。

### 重构 render 函数

现在我们来重构 render 函数，通过 instantiate 函数创建实例，添加变量 rootInstance 记录已渲染的实例。我们期望调和函数 reconcile 在新旧实例找出其中的差异，再更新到真实 DOM 上，但是这里先不比较，直接使用新实例更新并返回新实例以便在 render 函数中记录。

```javascript
let rootInstance = null;

function render(vnode, container) {
    const nextInstance = reconcile(container, rootInstance, vnode);
    rootInstance = nextInstance;
}

function reconcile(parentDom, instance, vnode) {
    if (instance == null) {
        const newInstance = instantiate(vnode);
        parentDom.appendChild(newInstance.dom);
        return newInstance;
    } else {
        const newInstance = instantiate(vnode);
        parentDom.replaceChild(newInstance.dom, instance.dom);
        return newInstance;
    }
}

function instantiate(vnode) {
    // 当vnode为字符串时，渲染结果是一段文本
    if (typeof vnode === "string") {
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
    // 当vnode为字符串时，渲染结果是一段文本
    if (typeof vnode === "string") {
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
