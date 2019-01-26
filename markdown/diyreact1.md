# 实现一个简单的 React-JSX、虚拟 DOM 和渲染 DOM

### 前言

一种更深刻理解 React 的方法是动手实现它，如果忽略一些细节，只关注 React 的主要结构和特性，实现一个 React 还是比较简单的。

实现一个简单的 React，这就是我们接下来要做的事情，可以把即将要实现的库称为 SimpleReact。

先来看一下目标，我们要用 SimpleReact 写的代码：

```javascript
const posts = [
    { name: "Post1" },
    { name: "Post2" },
    { name: "Post3" },
    { name: "Post4" }
];

class App extends SimpleReact.Component {
    render() {
        return (
            <div>
                <h1>SimpleReact Posts</h1>
                <ul>
                    {this.props.posts.map(story => {
                        return <Story name={story.name} />;
                    })}
                </ul>
            </div>
        );
    }
}

class Story extends SimpleReact.Component {
    constructor(props) {
        super(props);
        this.state = { likesCount: Math.ceil(Math.random() * 100) };
    }
    like() {
        this.setState({
            likesCount: this.state.likesCount + 1
        });
    }
    render() {
        const { name } = this.props;
        const { likesCount } = this.state;
        return (
            <li>
                <button onClick={e => this.like()}>
                    {likesCount}
                    <b>❤️</b>
                </button>
                <span>{name}</span>
            </li>
        );
    }
}

SimpleReact.render(<App posts={posts} />, document.getElementById("root"));
```

SimpleReact 要实现的功能有：

1. 用 JSX 创建 DOM 元素
2. 渲染 DOM 元素
3. virtual DOM
4. 组件
5. Fiber

### JSX 和虚拟 DOM

JSX 是提供了创建元素的语法糖，看一下这段代码：

```javascript
const element = (
    <div id="container">
        <h1>Hello, world!</h1>
    </div>
);
```

通过 Babel 的编译，它将变成：

```
"use strict";

var element = React.createElement(
  "div",
  { id: "container" },
  React.createElement(
    "h1",
    null,
    "Hello, world!"
  )
);
```

你可以查看[Babel 在线编译](https://babeljs.io/repl/#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=MYewdgzgLgBApgGzgWzmWBeGAKAUDGAHgBMBLANxlOIwCJR0BDUsOAJ1oD58CiALAIycAEogQgANDADuINgmIBCQgHpB3AqrLluASgDcQA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-0&prettier=false&targets=&version=6.26.0&envVersion=)。

React.createElement 将会返回以下结果：

```javascript
{
    type:'div',
    props:{
        id:'container',
        children:{
            type:'h1',
            props:{
                children:'Hello,world!'
            }
        }
    }
}
```

这是一个用来描述 DOM 元素的普通对象， 称之为虚拟 DOM。React 使用虚拟 DOM 以提高自身的性能，因为每一次对真是 DOM 的修改都会引起浏览器的重新渲染。

我们现在首先做的是实现 createElement 方法，创建虚拟 DOM，至于 JSX 的编译则交给 Babel 完成。createElement 方法的第一个参数是节点类型 type，第二个参数是节点属性 props 对象，剩下的其他参数是子节点 children。

```javascript
function createElement(type, attrs, ...rest) {
    const props = Object.assign({}, attrs);

    if (!type && typeof type !== "string") {
        throw Error("element type is invalid");
    }

    if (rest.length > 0) {
        props.children = rest.length > 1 ? [].concat(...rest) : rest[0];
    }
    return { type, props };
}
```

我们的 createElement 会返回由 typp 和 props 组合的对象，若有子节点，将会在 props 节点上添加 children 属性。如果只有一个子节点，则将子节点对象直接赋值给 children ；否则, children 是由所有子节点组成的数组。
这样，我们的 createElement 方法就返回了一个记录 DOM 节点所有的信息的对象，即虚拟 DOM。

### 渲染 DOM 元素

有了虚拟 DOM 后，接下来要做的就是将虚拟 DOM 渲染成真实 DOM 的 render 函数。

render 函数的任务是接收虚拟 DOM 元素和父容器元素，根据虚拟 DOM 创建 DOM 子树，并把子树添加到父容器中。
对于 props 中的事件属性，需要为其添加事件句柄；children 需要递归处理；对于文本节点，它只是一个字符串，使用 document.createTextNode 处理。

```javascript
function render(vnode, parentDom) {
    // 当vnode为字符串时，渲染结果是一段文本
    if (typeof vnode === "string") {
        const textNode = document.createTextNode(vnode);
        return parentDom.appendChild(textNode);
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
    childElements.forEach(childElement => render(childElement, dom));

    // 子树添加到父容器
    if (!parentDom.lastChild) {
        parentDom.appendChild(dom);
    } else {
        parentDom.replaceChild(dom, parentDom.lastChild);
    }
}
```
