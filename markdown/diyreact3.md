# 实现一个简单的 React-组件

上一篇文章我们已经实现了使用 JSX 渲染 DOM,接下来要做的事渲染组件。

React 的组件继承自 React.Component,我们首先要实现 React.Component 类。Component 的构造函数中提供 state 和 props 属性，Component 还需要提供一个 setState 方法用来更新组件的 state。为了优化性能 React 的 setState 是异步的，并且可以接收一个回调函数，这里先不考虑这点。

```javascript
class Component {
    constructor(props) {
        this.props = props;
        this.state = this.state || {};
    }

    setState(partialState) {
        this.state = Object.assign({}, this.state, partialState);
        // todo
        renderComponent(this);
    }
}
```

组件的使用方式和一般的标签节点并无二致，比如<MyComponent/>，这样就不需要 createElement 函数了。现在需要的是一个可以调用组件构造函数创建组件实例的函数,组件实例是组件类的实例化对象,用来管理内部 state 和生命周期，React 组件生命周期函数中的 this 指向组件实例。

```javascript
function createPublicInstance(vnode, internalInstance) {
    const { type, props } = vnode;
    // type 即组件类名
    const publicInstance = new type(props);
    publicInstance.__internalInstance = internalInstance;
    return publicInstance;
}
```

publicInstance 是已渲染的组件的实例，internalInstance（内部实例） 是上篇文章中提到的根据虚拟 DOM 生成并用于记录虚拟 DOM 信息的实例，拥有 vnode, dom,和 childInstances 三个属性。

组件实例保留着内部实例的引用，当组件实例的状态发生变化时，调和函数 reconcile 对比组件实例和内部实例，找出内部实例改变的部分，然后只更新内部实例改变的部分。

```javascript
class Component {
    constructor(props) {
        this.props = props;
        this.state = this.state || {};
    }

    setState(partialState) {
        this.state = Object.assign({}, this.state, partialState);
        updateInstance(this.__internalInstance);
    }
}

function updateInstance(internalInstance) {
    const parentDom = internalInstance.dom.parentNode;
    const vnode = internalInstance.vnode;
    reconcile(parentDom, internalInstance, vnode);
}
```

我们的 instantiate 函数需要做些修改，对于我们需要创建一个组件实例并且调用组件的 render 方法获取组件子节点。

```javascript
function instantiate(vnode) {
    // 当vnode为基本数据类型时，渲染结果是一段文本
    if (typeof vnode !== "object") {
        const textNode = document.createTextNode(vnode);
        return { dom: textNode, vnode };
    }

    const { type, props } = vnode;
    const isDomElement = typeof type === "string";
    if (isDomElement) {
        // 如果是原生的dom元素的话，直接创建实例
        // 创建DOM节点
        const dom = document.createElement(type);

        updateDomProperties(dom, [], props);

        // Render children
        const childElements =
            Object.prototype.toString.call(props.children) === "[object Array]"
                ? props.children
                : [props.children];
        const childInstances = childElements.map(instantiate);
        const childDoms = childInstances.map(
            childInstance => childInstance.dom
        );
        childDoms.forEach(childDom => dom.appendChild(childDom));

        const instance = { dom, vnode, childInstances };
        return instance;
    } else {
        const instance = {};
        const publicInstance = createPublicInstance(vnode, instance);
        const childElement = publicInstance.render();
        const childInstance = instantiate(childElement);
        const dom = childInstance.dom;

        Object.assign(instance, {
            dom,
            vnode,
            childInstance,
            publicInstance
        });
        return instance;
    }
}
```

最后调和函数 reconcile 中需要对组件做处理:

```javascript
function reconcile(parentDom, instance, vnode) {
    if (instance == null) {
        // Create instance
        const newInstance = instantiate(vnode);
        parentDom.appendChild(newInstance.dom);
        return newInstance;
    } else if (vnode == null) {
        // Remove instance
        parentDom.removeChild(instance.dom);
        return null;
    } else if (typeof vnode !== "object") {
        if (instance.vnode !== vnode) {
            instance.dom.nodeValue = vnode;
        }
        return instance;
    } else if (instance.vnode.type !== vnode.type) {
        // Update instance
        updateDomProperties(instance.dom, instance.vnode.props, vnode.props);
        instance.childInstances = reconcileChildren(instance, vnode);
        instance.vnode = vnode;
        return instance;
    } else if (typeof vnode.type === "string") {
        // Update dom instance
        updateDomProperties(instance.dom, instance.vnode.props, vnode.props);
        instance.childInstances = reconcileChildren(instance, vnode);
        instance.vnode = vnode;
        return instance;
    } else {
        //Update composite instance
        instance.publicInstance.props = vnode.props;
        const childElement = instance.publicInstance.render();
        const oldChildInstance = instance.childInstance;
        const childInstance = reconcile(
            parentDom,
            oldChildInstance,
            childElement
        );
        instance.dom = childInstance.dom;
        instance.childInstance = childInstance;
        instance.vnode = vnode;
        return instance;
    }
}
```
