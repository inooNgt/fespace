import React, { Component } from "react";

const article = `<h1 id="my-scattered-notes">My Scattered  Notes</h1>
<p>Guides:</p>
<ol>
<li><a href="javascript:;" onclick="document.getElementById('g1').scrollIntoView();">undefined and null</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g2').scrollIntoView();">浏览器 Event loop 事件循环</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g3').scrollIntoView();">对象深拷贝</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g4').scrollIntoView();"> JSONP 跨域原理及 CORS</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g5').scrollIntoView();"> 正则表达式之后向引用</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g6').scrollIntoView();"> React/Vue 不同组件之间的通信方式</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g7').scrollIntoView();"> Thunk 函数</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g8').scrollIntoView();"> this 指向</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g9').scrollIntoView();"> Cookie</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g10').scrollIntoView();"> 快速排序</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g11').scrollIntoView();"> 执行上下文(Execution Context)</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g12').scrollIntoView();"> Promise 的实现</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g13').scrollIntoView();"> 闭包</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g14').scrollIntoView();"> 事件捕获 vs 事件冒泡</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g15').scrollIntoView();"> 服务端渲染</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g16').scrollIntoView();"> 浮点数知识</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g17').scrollIntoView();"> const 、let、块级作用域</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g18').scrollIntoView();"> DocumentFragment</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g19').scrollIntoView();"> 同源策咯</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g20').scrollIntoView();"> 事件循环</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g21').scrollIntoView();"> https 过程</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g22').scrollIntoView();"> 订阅/发布模式（subscribe&amp;publish）</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g23').scrollIntoView();"> vue 双向数据绑定实现原理</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g24').scrollIntoView();"> 函数模拟 A instanceof B</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g25').scrollIntoView();"> typeof 原理</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g26').scrollIntoView();"> Iterator</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g27').scrollIntoView();"> ToPrimitive</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g28').scrollIntoView();"> BFC布局</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g29').scrollIntoView();"> 大整数相加</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g30').scrollIntoView();"> Object.assign 模拟实现</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g31').scrollIntoView();"> Http幂等性</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g32').scrollIntoView();"> 判断一个对象是否是数组</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g33').scrollIntoView();"> 跨域</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g34').scrollIntoView();"> Debounce and Throllte</a></li>
<li><a href="javascript:;" onclick="document.getElementById('g35').scrollIntoView();"> Session and SessionStorage</a></li>
</ol>
<p><span id="g1"></span></p>
<h3 id="1-undefined-and-null">1、undefined and null</h3>
<p>JavaScript 的最初版本是这样区分的：<b>null 是一个表示&quot;无&quot;的对象，转为数值时为 0；undefined 是一个表示&quot;无&quot;的原始值，转为数值时为 NaN</b>。</p>
<p>目前的用法：
<b>null 表示&quot;没有对象&quot;，即该处不应该有值</b>。典型用法是：</p>
<ol>
<li>作为函数的参数，表示该函数的参数不是对象。</li>
<li>作为原型链的终点。</li>
</ol>
<pre><code><span className="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Object</span>.prototype)
<span class="hljs-comment">// null</span>
</code></pre><p><b>undefined 表示&quot;缺少值&quot;，就是此处应该有一个值，但是还没有定义</b>。典型用法是：</p>
<ol>
<li>变量被声明，但没有被赋值，其值就是 undefined。</li>
<li>调用函数时，没有提供对应的参数，该参数就等于 undefined。</li>
<li>对象没有赋值的属性，其值就是 undefined。</li>
<li>函数没有返回值时，默认返回 undefined。</li>
</ol>
<p><span id="g2"></span></p>
<h3 id="2-event-loop-">2、浏览器 Event loop 事件循环</h3>
<h4 id="-heap-">堆（heap）</h4>
<p>程序运行时申请的动态内存，在 JS 运行时用来存放对象。</p>
<h4 id="-stack-">栈（stack）</h4>
<p>JS 种的基本数据类型与指向对象的地址存放在栈内存中，此外还有一块栈内存用来执行 JS 主线程--执行栈（execution context stack）。</p>
<p>浏览器中的 Event loop：</p>
<ul>
<li>所有同步任务都在主线程上执行，形成一个执行栈。</li>
<li>主任务之外，还存在任务队列。<ul>
<li>任务队列分为 macro-task(宏任务)和 micro-task(微任务)。</li>
<li>macro-task(宏任务): setTimeout, setInterval, setImmediate, I/O 等</li>
<li>micro-task(微任务): process.nextTick, Promise, MutationObserver 等</li>
</ul>
</li>
</ul>
<p>整个最基本的 Event Loop 如图所示：</p>
<div align="center">&lt;img width=&quot;600&quot;src=&quot;<a href="http://cdn.inoongt.tech/images/thinkin/eventloop.png&quot;/&gt;">http://cdn.inoongt.tech/images/thinkin/eventloop.png&quot;/&gt;</a></div>

<p>具体过程：</p>
<ol>
<li><p>浏览器中，先执行当前栈，执行完主执行线程中的任务。</p>
</li>
<li><p>取出 Microtask 微任务队列中任务执行直到清空。</p>
</li>
<li><p>取出 Macrotask 宏任务中 一个 任务执行。</p>
</li>
<li><p>检查 Microtask 微任务中有没有任务，如果有任务执行直到清空。</p>
</li>
<li><p>重复 3 和 4。</p>
</li>
</ol>
<p><span id="g3"></span></p>
<h3 id="3-">3、对象深拷贝</h3>
<pre><code><span class="hljs-comment">/*缺点：如果需要属性值是函数或者是undefined，就会被过滤掉 */</span>
<span class="hljs-keyword">const</span> clone=<span class="hljs-function">(<span class="hljs-params">obj</span>)=&gt;</span>\{
    <span class="hljs-keyword">let</span> _obj=<span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(obj))
\}
</code></pre><pre><code class="lang-javascript"><span class="hljs-keyword">const</span> clone = <span class="hljs-function"><span class="hljs-params">obj</span> =&gt;</span> \{
    <span class="hljs-keyword">if</span> (!obj &amp;&amp; <span class="hljs-keyword">typeof</span> obj !== <span class="hljs-string">"object"</span>) \{
        <span class="hljs-keyword">return</span>;
    \}
    <span class="hljs-keyword">let</span> result = obj.constructor === <span class="hljs-built_in">Object</span> ? \{\} : [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> obj) \{
        result[key] =
            obj[key] &amp;&amp; <span class="hljs-keyword">typeof</span> obj[key] === <span class="hljs-string">"object"</span>
                ? clone(obj[key])
                : obj[key];
    \}
    <span class="hljs-keyword">return</span> result;
\};
</code></pre>
<p><span id="g4"></span></p>
<h3 id="4-jsonp-cors">4、 JSONP 跨域原理及 CORS</h3>
<h4 id="jsonp">JSONP</h4>
<p>在同源策略下，在某个服务器下的页面是无法获取到该服务器以外的数据的，但 img、iframe、script 等标签是个例外，这些标签可以通过 src 属性请求到其他服务器上的数据。利用 script 标签的开放策略，我们可以实现跨域请求数据，当然，也需要服务端的配合。当我们正常地请求一个 JSON 数据的时候，服务端返回的是一串 JSON 类型的数据，而我们使用 JSONP 模式来请求数据的时候，服务端返回的是一段可执行的 JavaScript 代码,而这段代码可以包含数据。例如：</p>
<p>客户端请求,并指定回调函数的名字：</p>
<pre><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">appendScript</span>(<span class="hljs-params">src</span>)</span>\{
    <span class="hljs-keyword">let</span> script=<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"script"</span>);
    script.src=src;
    <span class="hljs-built_in">document</span>.appendChild(script)
\}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">somefun</span>(<span class="hljs-params">data</span>)</span>\{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"data:"</span>,data)
\}

appdendScript(<span class="hljs-string">"http://a.com&amp;callback=somefun"</span>);
</code></pre><p>服务端返回 Javascript 代码：</p>
<pre><code>"<span class="hljs-selector-tag">somefun</span>(\{<span class="hljs-attribute">key</span>:somevalue\});"
</code></pre><h4 id="cors">CORS</h4>
<p>跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。</p>
<p><span id="g5"></span></p>
<h3 id="5-">5、 正则表达式之后向引用</h3>
<h4 id="-">分组</h4>
<p>组的定义：</p>
<p>正则表达式通过使用括号将表达式分为不同的分组，识别的方法是通过从左至右搜寻左半括号，遇到第一个左半括号时，则该左半括号与对应的右半括号所包含的内容即为第一分组，以此类推 。例如，在表达式((A)(B(C)))，有四个这样的组：((A)(B(C)))、(A)、(B(C))、(C)</p>
<h4 id="-">位置类元数据</h4>
<p>即像^、$、\b、\B 这样的元字符，是用来表示一个位置。作为一个判断条件，匹配的字符需要满足这样的位置信息，但最终匹配的字符串中并不会包含这个样的位置信息。</p>
<h4 id="-">零宽断言</h4>
<p>\b,^,$那样用于指定一个位置，这个位置应该满足一定的条件（即断言），因此它们也被称为零宽断言。</p>
<ul>
<li>(?=exp) 匹配 exp 前面的位置，比如\b\w+(?=ing\b)，匹配以 ing 结尾的单词的前面部分(除了 ing 以外的部分)</li>
<li>(?&lt;=exp) 匹配 exp 后面的位置，比如(?&lt;=\bre)\w+\b 会匹配以 re 开头的单词的后半部分(除了 re 以外的部分)</li>
<li>(?!exp) 匹配后面跟的不是 exp 的位置</li>
<li>(?&lt;!exp) 匹配前面不是 exp 的位置</li>
</ul>
<h4 id="-">贪婪与懒惰</h4>
<p>当正则表达式中包含能接受重复的限定符时，通常的行为是（在使整个表达式能得到匹配的前提下）匹配尽可能多的字符。以这个表达式为例：a.*b，它将会匹配最长的以 a 开始，以 b 结束的字符串。被称为贪婪匹配。</p>
<p>有时，我们更需要懒惰匹配，也就是匹配尽可能少的字符。要在它后面加上一个问号?。这样.*?就意味着匹配任意数量的重复，但是在能使整个匹配成功的前提下使用最少的重复。</p>
<p>例子：</p>
<pre><code>let str = \`
  <span class="hljs-attribute">&lt;p&gt;</span>第一个<span class="hljs-attribute">&lt;/p&gt;</span>
  <span class="hljs-attribute">&lt;pre&gt;</span><span class="hljs-attribute">&lt;code&gt;</span>console.log(1);<span class="hljs-attribute">&lt;/code&gt;</span><span class="hljs-attribute">&lt;/pre&gt;</span>
  <span class="hljs-attribute">&lt;p&gt;</span>第二个<span class="hljs-attribute">&lt;/p&gt;</span>
  <span class="hljs-attribute">&lt;pre&gt;</span><span class="hljs-attribute">&lt;code&gt;</span>console.log(2);<span class="hljs-attribute">&lt;/code&gt;</span><span class="hljs-attribute">&lt;/pre&gt;</span>\`;

str.match(/(?<span class="hljs-attribute">&lt;=&lt;pre&gt;</span><span class="hljs-attribute">&lt;code&gt;</span>)[\s\S]*?(?=<span class="hljs-attribute">&lt;\/code&gt;</span><span class="hljs-attribute">&lt;\/pre&gt;</span>)/gi);  // 获得,/somePattern*?/是懒惰匹配。

str.replace(/(?<span class="hljs-attribute">&lt;=&lt;pre&gt;</span><span class="hljs-attribute">&lt;code&gt;</span>)[\s\S]*?(?=<span class="hljs-attribute">&lt;\/code&gt;</span><span class="hljs-attribute">&lt;\/pre&gt;</span>)/gi, 'asdf');  // 替换
</code></pre><p><span id="g6"></span></p>
<h3 id="6-react-vue-">6、 React/Vue 不同组件之间的通信方式</h3>
<h4 id="vue">Vue</h4>
<ul>
<li>父子组件用 Props 通信</li>
<li>非父子组件用 Event Bus 通信</li>
<li>如果项目够复杂,可能需要 Vuex 等全局状态管理库通信</li>
<li>$dispatch(已经废除)和$broadcast(已经废除)</li>
</ul>
<h4 id="react">React</h4>
<ul>
<li>父子组件,父-&gt;子直接用 Props,子-&gt;父用 callback 回调</li>
<li>非父子组件,用发布订阅模式的 Event 模块</li>
<li>项目复杂的话用 Redux、Mobx 等全局状态管理管库</li>
<li>用新的 Context Api</li>
</ul>
<p><span id="g7"></span></p>
<h3 id="7-thunk-">7、 Thunk 函数</h3>
<p>将多参数函数替换成单参数的版本，且只接受回调函数作为参数。</p>
<pre><code><span class="hljs-keyword">const</span> Thunk=<span class="hljs-function">(<span class="hljs-params">fn</span>)=&gt;</span>\{
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">...args</span>)=&gt;</span>\{
        <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">callback</span>)=&gt;</span>\{
            fn.call(<span class="hljs-keyword">this</span>,...args,callback)
        \}
    \}
\}

<span class="hljs-keyword">const</span> readFileThunk = Thunk(fs.readFile);
readFileThunk(path)(callback);
</code></pre><p><span id="g8"></span></p>
<h3 id="8-this-">8、this 指向</h3>
<ul>
<li>纯粹的函数调用,this 就代表全局对象 Global</li>
<li>作为对象方法的调用,this 就指向上级对象</li>
<li>作为构造函数调用,this 就指向新对象</li>
<li>apply/call 调用,this 指向第一个参数提供的对象</li>
</ul>
<p><span id="g9"></span></p>
<h3 id="9-cookie">9、Cookie</h3>
<p>功能：按照一定规范来储存这些信息，并在随后的请求中将这些信息发送至服务器，cookie 的值被存储在名为 Cookie 的 HTTP 消息头中。</p>
<p>给 document 赋值并不会覆盖原有的值。</p>
<pre><code>const setCookie=<span class="hljs-function"><span class="hljs-params">(key,value,expires)</span>=&gt;</span>\{
    <span class="hljs-built_in">document</span>.cookie=!expires?
        \`<span class="javascript">$\{key\}=$\{value\}</span>\`:
        \`<span class="javascript">$\{key\}=$\{value\};expires=$\{expires\};

\}

<span class="hljs-keyword">const</span> getCookie=<span class="hljs-function">(<span class="hljs-params">key</span>)=&gt;</span>\{
    <span class="hljs-keyword">const</span> reg =<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(</span>\`(?&lt;=$\{key\}=)(\w)+(?=\;)\`<span class="javascript">,<span class="hljs-string">'g'</span>);
    <span class="hljs-keyword">let</span> result=<span class="hljs-string">""</span>;
    <span class="hljs-keyword">let</span> cookie=<span class="hljs-built_in">document</span>.cookie;
    <span class="hljs-keyword">if</span>(cookie)\{
        result=cookie.match(reg)[<span class="hljs-number">0</span>]
    \}

    <span class="hljs-keyword">return</span> result;

\}</span>
</code></pre><p>Session:
创建于服务器端，保存于服务器，维护于服务器端,每创建一个新的 Session,服务器端都会分配一个唯一的 ID，并且把这个 ID 保存到客户端的 Cookie 中，保存形式是以 JSESSIONID 来保存的。</p>
<p><span id="g10"></span></p>
<h3 id="10-">10、快速排序</h3>
<p>算法思想：</p>
<ul>
<li><p>在数据集之中，选择一个元素作为&quot;基准&quot;（pivot）。</p>
</li>
<li><p>所有小于&quot;基准&quot;的元素，都移到&quot;基准&quot;的左边；所有大于&quot;基准&quot;的元素，都移到&quot;基准&quot;的右边。</p>
</li>
<li><p>对&quot;基准&quot;左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。</p>
</li>
</ul>
<p>实现：</p>
<pre><code><span class="hljs-built_in">quickSort</span> = (arr)=&gt; \{
    <span class="hljs-keyword">let</span> mid= arr.splice(<span class="hljs-type">Math</span>.floor(arr.length/<span class="hljs-number">2</span>),<span class="hljs-number">1</span>)[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">left</span> =[],<span class="hljs-keyword">right</span>=[];

    arr.forEach((v,i)=&gt;\{
        <span class="hljs-keyword">if</span>(v&gt;mid)\{
            <span class="hljs-keyword">right</span>.push(v)
        \}<span class="hljs-keyword">else</span>\{
            <span class="hljs-keyword">left</span>.push(v)
        \}
    \})
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">left</span>.length&gt;<span class="hljs-number">1</span>) <span class="hljs-keyword">left</span> = <span class="hljs-built_in">quickSort</span>(<span class="hljs-keyword">left</span>)
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">right</span>.length&gt;<span class="hljs-number">1</span>) <span class="hljs-keyword">right</span> = <span class="hljs-built_in">quickSort</span>(<span class="hljs-keyword">right</span>)
  <span class="hljs-keyword">return</span> [...<span class="hljs-keyword">left</span>,mid,...<span class="hljs-keyword">right</span>]
\};

<span class="hljs-built_in">quickSort</span>([<span class="hljs-number">3</span>,<span class="hljs-number">5</span>,<span class="hljs-number">0</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">8</span>,<span class="hljs-number">1</span>,<span class="hljs-number">9</span>,<span class="hljs-number">7</span>,<span class="hljs-number">6</span>,<span class="hljs-number">2</span>])
</code></pre><p><span id="g11"></span></p>
<h3 id="11-execution-context-">11、执行上下文(Execution Context)</h3>
<p>js 的运行有三种环境：</p>
<ul>
<li>Global Code, JavaScript 代码开始运行的默认环境</li>
<li>Function Code, 代码进入一个 JavaScript 函数</li>
<li>Eval Code, 使用 eval()执行代码</li>
</ul>
<p>为了表示不同的运行环境，JavaScript 中有一个执行上下文（Execution context，EC）的概念。也就是说，当 JavaScript 代码执行的时候，会进入不同的执行上下文，这些执行上下文就构成了一个执行上下文栈（Execution context stack，ECS）。</p>
<p>执行上下文有三个重要的属性:</p>
<ul>
<li>变量对象（Variable object，VO）,进入一个执行上下文时被激活（Activation object，AO）</li>
<li>作用域链（Scope chain）</li>
<li>this</li>
</ul>
<p>解释器执行代码的伪逻辑:</p>
<ol>
<li>查找调用函数的代码</li>
<li>执行代码之前，先进入创建上下文阶段<ul>
<li>分析形参</li>
<li>扫描上下文的函数声明<ul>
<li>为发现的每一个函数，在变量对象上创建一个属性——确切的说是函数的名字——其有一个指向函数在内存中的引用</li>
<li>如果函数的名字已经存在，引用指针将被重写</li>
</ul>
</li>
<li>扫描上下文的变量声明<ul>
<li>为发现的每个变量声明，在变量对象上创建一个属性——就是变量的名字，并且将变量的值初始化为 undefined</li>
<li>如果变量的名字已经在变量对象里存在，将不会进行任何操作并继续扫描。</li>
</ul>
</li>
<li>求出上下文内部“this”的值。</li>
</ul>
</li>
<li>执行代码阶段<ul>
<li>在当前上下文上运行/解释函数代码，并随着代码一行行执行指派变量的值。</li>
</ul>
</li>
</ol>
<p>VO 对应第二阶段，AO 对应第三阶段。</p>
<p>作用域链：</p>
<p>对于自由变量，即当前作用域中没有定义的变量，需要向父级作用域寻找,
如果父级中没有找到，则再一层一层向上查找，直到全局作用域。这种一层一层间的关系，就是作用域链。</p>
<p>注意：自由变量的查找依据的是函数定义时的作用域，而不是执行时的作用预,例如闭包。</p>
<p><span id="g12"></span></p>
<h3 id="12-promise-">12、 Promise 的实现</h3>
<pre><code><span class="hljs-keyword">var</span> PENDING = <span class="hljs-number">0</span>;
<span class="hljs-keyword">var</span> FULFILLED = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> REJECTED = <span class="hljs-number">2</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Promise</span></span>\{

    <span class="hljs-keyword">constructor</span>(fn)\{
        <span class="hljs-comment">//promise的状态</span>
        <span class="hljs-keyword">this</span>.state=PENDING; <span class="hljs-comment">//[PENDING,FULFILLED,REJECTED]</span>
        <span class="hljs-comment">//FULFILLED 或者 REJECTED 时的返回值</span>
        <span class="hljs-keyword">this</span>.value=<span class="hljs-literal">null</span>;
        <span class="hljs-comment">//回调函数</span>
        <span class="hljs-keyword">this</span>.handlers=[];
        <span class="hljs-keyword">this</span>.resolve=<span class="hljs-keyword">this</span>.resolve.bind(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">this</span>.reject=<span class="hljs-keyword">this</span>.reject.bind(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">this</span>.done=<span class="hljs-keyword">this</span>.done.bind(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">this</span>.handle=<span class="hljs-keyword">this</span>.handle.bind(<span class="hljs-keyword">this</span>);



        doResolve(fn, <span class="hljs-keyword">this</span>.resolve, <span class="hljs-keyword">this</span>.reject);
    \}

    fulfill(value)\{
        <span class="hljs-keyword">this</span>.state=FULFILLED;
        <span class="hljs-keyword">this</span>.value=value;
        <span class="hljs-comment">//执行回调</span>
        <span class="hljs-keyword">this</span>.handlers.forEach(<span class="hljs-keyword">this</span>.handle)
        <span class="hljs-keyword">this</span>.handlers=<span class="hljs-literal">null</span>
        console.log(<span class="hljs-string">"fulfill: value"</span>,value,<span class="hljs-string">"state"</span>,<span class="hljs-keyword">this</span>.state)
    \}

    reject(error)\{
        <span class="hljs-keyword">this</span>.state=REJECTED;
        <span class="hljs-keyword">this</span>.value=error;
        <span class="hljs-comment">//执行回调</span>
        <span class="hljs-keyword">this</span>.handlers.forEach(<span class="hljs-keyword">this</span>.handle)
        <span class="hljs-keyword">this</span>.handlers=<span class="hljs-literal">null</span>
        console.log(<span class="hljs-string">"reject"</span>,error)
    \}

    <span class="hljs-comment">//相当于发布者</span>
    resolve(value)\{
        console.log(<span class="hljs-string">"in resolve"</span>)
        <span class="hljs-keyword">try</span>\{
            <span class="hljs-comment">//若value为 Promise 则返回该 Promise 的 then 方法，即value.then</span>
            <span class="hljs-keyword">var</span> then =getThen(value);
            <span class="hljs-keyword">if</span>(then)\{
                 console.log(<span class="hljs-string">"value is promise"</span>)
                 <span class="hljs-comment">//若value为promise，递归 resolve 待解析的 Promise</span>
                 doResolve(then.bind(value),<span class="hljs-keyword">this</span>.resolve,<span class="hljs-keyword">this</span>.reject);
                 <span class="hljs-keyword">return</span>;
            \}
            <span class="hljs-keyword">this</span>.fulfill(value);
        \}<span class="hljs-keyword">catch</span>(e)\{
            console.log(e)
            <span class="hljs-keyword">this</span>.reject(e);
        \}

    \}

    <span class="hljs-comment">//观察者接口</span>
    then(onFulfilled, onRejected) \{
         const self = <span class="hljs-keyword">this</span>

        <span class="hljs-keyword">return</span> new Promise(function (resolve, reject) \{

        <span class="hljs-keyword">return</span> self.done.call(self,function (result) \{
          <span class="hljs-keyword">if</span> (typeof onFulfilled === <span class="hljs-string">'function'</span>) \{
            <span class="hljs-keyword">try</span> \{
              <span class="hljs-keyword">return</span> resolve(onFulfilled(result))
            \} <span class="hljs-keyword">catch</span> (ex) \{
              <span class="hljs-keyword">return</span> reject(ex)
            \}
          \} <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> resolve(result)
        \}, function (error) \{
          <span class="hljs-keyword">if</span> (typeof onRejected === <span class="hljs-string">'function'</span>) \{
            <span class="hljs-keyword">try</span> \{
              <span class="hljs-keyword">return</span> resolve(onRejected(error))
            \} <span class="hljs-keyword">catch</span> (ex) \{
              <span class="hljs-keyword">return</span> reject(ex)
            \}
          \} <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> reject(error)
        \})
      \})
    \}

    <span class="hljs-comment">//观察者接口</span>
    done(onFulfilled, onRejected)\{
        <span class="hljs-comment">// 保证 done 总是异步执行</span>
        setTimeout(() =&gt;\{
            <span class="hljs-keyword">this</span>.handle(\{
                onFulfilled: onFulfilled,
                onRejected: onRejected
            \})
        \}, <span class="hljs-number">0</span>)
    \}

     <span class="hljs-comment">// 保证 done 中回调的执行</span>
    handle (handler) \{

        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state === PENDING) \{
          <span class="hljs-keyword">this</span>.handlers.push(handler)
          console.log(<span class="hljs-string">"push to handlers"</span>,<span class="hljs-keyword">this</span>.handlers)
        \} <span class="hljs-keyword">else</span> \{
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state === FULFILLED &amp;&amp;
            typeof handler.onFulfilled === <span class="hljs-string">'function'</span>) \{
            handler.onFulfilled(<span class="hljs-keyword">this</span>.value)
          \}
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state === REJECTED &amp;&amp;
            typeof handler.onRejected === <span class="hljs-string">'function'</span>) \{
            handler.onRejected(<span class="hljs-keyword">this</span>.value)
          \}
        \}
    \}

    <span class="hljs-keyword">catch</span>(callback)\{


    \}
\}

function getThen(value) \{
  <span class="hljs-keyword">var</span> t = typeof value;
  <span class="hljs-keyword">if</span> (value &amp;&amp; (t === <span class="hljs-string">'object'</span> || t === <span class="hljs-string">'function'</span>)) \{
    <span class="hljs-keyword">var</span> then = value.then;
    <span class="hljs-keyword">if</span> (typeof then === <span class="hljs-string">'function'</span>) \{
      <span class="hljs-keyword">return</span> then;
    \}
  \}
  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
\}

function doResolve(fn, onFulfilled, onRejected) \{
  <span class="hljs-keyword">var</span> done = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">try</span> \{
    fn(function (value) \{
      <span class="hljs-keyword">if</span> (done) <span class="hljs-keyword">return</span>
      done = <span class="hljs-literal">true</span>
      onFulfilled(value)
    \}, function (reason) \{
      <span class="hljs-keyword">if</span> (done) <span class="hljs-keyword">return</span>
      done = <span class="hljs-literal">true</span>
      onRejected(reason)
    \})
  \} <span class="hljs-keyword">catch</span> (e) \{
    console.log(<span class="hljs-string">"doResolve"</span>,e)
    <span class="hljs-keyword">if</span> (done) <span class="hljs-keyword">return</span>
    done = <span class="hljs-literal">true</span>
    onRejected(e)
  \}
\}




p1 =new Promise((resolve,reject)=&gt;\{
    console.log(<span class="hljs-string">"1"</span>)
    setTimeout(()=&gt;\{
        resolve(<span class="hljs-string">"p1"</span>)
    \},<span class="hljs-number">1500</span>)

\})


p1.then(res=&gt;\{
    console.log(<span class="hljs-string">"res"</span>,res)
    <span class="hljs-keyword">return</span> <span class="hljs-string">"then--res"</span>
\})
</code></pre><p><span id="g13"></span></p>
<h3 id="13-">13、 闭包</h3>
<p>闭包是即使被外部函数返回，依然可以访问到外部（封闭）函数作用域的函数。</p>
<p><span id="g14"></span></p>
<h3 id="14-vs-">14、事件捕获 vs 事件冒泡</h3>
<ul>
<li>事件冒泡：事件从内层元素开始触发，向外层传播，直到 document。</li>
<li>事件捕获：事件从外层元素（document）开始触发，向内层传播，直到 目标元素（target）。</li>
</ul>
<p>事件冒泡是由微软提出的，而事件捕获是由网景公司提出的，后来 w3c 制定了统一的方案：先捕获再冒泡。</p>
<p>对于当事件捕获和事件冒泡一起存在的情况，事件触发过程如下：</p>
<ol>
<li><p>document 往 target 节点，捕获前进，遇到注册的捕获事件立即触发执行</p>
</li>
<li><p>到达 target 节点，触发事件（对于 target 节点上，是先捕获还是先冒泡则捕获事件和冒泡事件的注册顺序，先注册先执行）</p>
</li>
<li><p>target 节点 往 document 方向，冒泡前进，遇到注册的冒泡事件立即触发</p>
</li>
</ol>
<p>事件捕获与事件冒泡的用用--事件代理</p>
<p><span id="g15"></span></p>
<h3 id="15-">15、服务端渲染</h3>
<p>在后端将数据拼接到 HTML 字符串上发送给客户端，浏览器从服务器接收 HTML 并渲染。服务端渲染的优势:</p>
<ul>
<li>SEO<ul>
<li>爬虫可以抓取页面的关键字等信息</li>
</ul>
</li>
<li><p>首屏直出 </p>
<ul>
<li>减少首屏渲染时间</li>
</ul>
<p><span id="g16"></span></p>
</li>
</ul>
<h3 id="16-">16、浮点数知识</h3>
<p>JavaScript 内部，所有数字都是以64位浮点数形式储存，即使整数也是如此。
根据国际标准 IEEE 754，任意一个二进制浮点数 V 可以表示成下面的形式：
V=(-1)<sup>s</sup><em>M</em>2<sup>E</sup></p>
<ul>
<li>(-1)^s 表示符号位</li>
<li>2^E 表示指数位</li>
<li>表示有效数字，大于等于 1，小于 2。形式为1.xx...xx。</li>
</ul>
<h4 id="-">精度</h4>
<p>对于 64 位的浮点数，最高的 1 位是符号位 s，接着的 11 位是指数 E，剩下的 52 位为有效数字 M。IEEE 754 规定，如果指数部分的值在0到2047之间（不含两个端点），那么有效数字的第一位默认总是1，不保存在64位浮点数之中。也就是说，有效数字这时总是1.xx...xx的形式，其中xx..xx的部分保存在64位浮点数之中，最长可能为52位。因此，JavaScript 提供的有效数字最长为53个二进制位。</p>
<p>Javascript 浮点数运算会先把十进制数转化为二进制数（整数部分除2取余，逆序排列；小数部分乘2取整，顺序排列），然而有可能得到无限循环二进制数这个时候需要进行舍弃，造成舍入误差；然后再进行运算；最后再将结果转化为十进制数返回。</p>
<p>解决方案：</p>
<ul>
<li>运算数全部存储为整数（无类型），然后格式化显示</li>
<li>建议是使用库，像sinfuljs或mathjs。</li>
</ul>
<h4 id="-">数值范围</h4>
<p>根据标准，64位浮点数的指数部分的长度是11个二进制位，意味着指数部分的最大值是2047（2的11次方减1）。也就是说，64位浮点数的指数部分的值最大为2047，分出一半表示负数，则 JavaScript 能够表示的数值范围为21024到2-1023（开区间），超出这个范围的数无法表示。</p>
<p><a href="https://wangdoc.com/javascript/types/number.html">更多内容</a></p>
<p><span id="g17"></span></p>
<h3 id="17-const-let-">17、const 、let、块级作用域</h3>
<h4 id="-">暂时性死区</h4>
<p>ES6 明确规定，如果区块中存在 let 和 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。</p>
<p>总之，在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。</p>
<pre><code><span class="hljs-keyword">var</span> tmp = <span class="hljs-number">123</span>;

<span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) \{
  tmp = <span class="hljs-string">'abc'</span>; <span class="hljs-comment">// ReferenceError</span>
  <span class="hljs-keyword">let</span> tmp;
\}
</code></pre><h4 id="-">块级作用域与函数声明</h4>
<p>ES6 规定，块级作用域之中，函数声明语句的行为类似于 let，在块级作用域之外不可引用。但是在 ES6 环境的浏览器（或者 nodejs 环境）可以有自己的行为：</p>
<ul>
<li>允许在块级作用域内声明函数。</li>
<li>函数声明类似于 var，即会提升到全局作用域或函数作用域的头部。</li>
<li>同时，函数声明还会提升到所在的块级作用域的头部。</li>
</ul>
<pre><code><span class="hljs-comment">// 浏览器的 ES6 环境</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>\{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I am outside!'</span>); \}
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>\{
  <span class="hljs-keyword">var</span> f = <span class="hljs-literal">undefined</span>;
  <span class="hljs-keyword">if</span> (<span class="hljs-literal">false</span>) \{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>\{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I am inside!'</span>); \}
  \}

  f();
\}());
</code></pre><p>考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。</p>
<h4 id="const-">const 的本质</h4>
<p>const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const 只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。</p>
<pre><code><span class="hljs-keyword">const</span> foo = \{\};

<span class="hljs-comment">// 为 foo 添加一个属性，可以成功</span>
foo.<span class="hljs-keyword">prop</span> = 123;
foo.<span class="hljs-keyword">prop</span> <span class="hljs-comment">// 123</span>

<span class="hljs-comment">// 将 foo 指向另一个对象，就会报错</span>
foo = \{\}; <span class="hljs-comment">// TypeError: "foo" is read-only</span>
</code></pre><p><span id="g18"></span></p>
<h3 id="18-documentfragment">18、 DocumentFragment</h3>
<p>The DocumentFragment interface represents a minimal document object that has no parent. It is used as a lightweight version of Document that stores a segment of a document structure comprised of nodes just like a standard document. The key difference is that because the document fragment isn&#39;t part of the active document tree structure, changes made to the fragment don&#39;t affect the document, cause reflow, or incur any performance impact that can occur when changes are made.</p>
<p>example:</p>
<pre><code>const fragment = document.createDocumentFragment()<span class="hljs-comment">;</span>
const liItem = document.createElement(<span class="hljs-string">"li"</span>)<span class="hljs-comment">;</span>
liItem.innerText = <span class="hljs-string">"hello"</span><span class="hljs-comment">;</span>
fragment.appendChild(liItem)<span class="hljs-comment">;</span>
document.body.appendChild(fragment)<span class="hljs-comment">;</span>
</code></pre><p><span id="g19"></span></p>
<h3 id="19-">19、同源策咯</h3>
<p>同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。</p>
<p>同源是指：从协议、域名到端口都必须相同。</p>
<p>限制范围包括：</p>
<ul>
<li>Cookie<ul>
<li>Cookie 是服务器写入浏览器的一小段信息，只有同源的网页才能共享。</li>
</ul>
</li>
<li><p>iframe</p>
<ul>
<li>如果两个网页不同源，就无法拿到对方的 DOM。</li>
</ul>
</li>
<li><p>AJAX</p>
<pre><code><span class="hljs-bullet">*   </span>同源政策规定，AJAX 请求只能发给同源的网址，否则就报错。可以使用 JSONP、WebSocket、CORS 等技术解决问题。
</code></pre><p><span id="g20"></span></p>
</li>
</ul>
<h3 id="20-">20、事件循环</h3>
<p>&quot;Event Loop 是一个程序结构，用于等待和发送消息和事件。（a programming construct that waits for and dispatches events or messages in a program.）&quot;</p>
<p>简单说，就是在程序中设置两个线程：一个负责程序本身的运行，称为&quot;主线程&quot;；另一个负责主线程与其他进程（主要是各种 I/O 操作）的通信，被称为&quot;Event Loop 线程&quot;（可以译为&quot;消息线程&quot;）。</p>
<p>每当遇到 I/O 的时候，主线程就让 Event Loop 线程去通知相应的 I/O 程序，然后接着往后运行，所以不存在红色的等待时间。等到 I/O 程序完成操作，Event Loop 线程再把结果返回主线程。主线程就调用事先设定的回调函数，完成整个任务。</p>
<p>js 引擎遇到一个异步事件后并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务。当一个异步事件返回结果后，js 会将这个事件加入与当前执行栈不同的另一个队列，我们称之为事件队列。被放入事件队列不会立刻执行其回调，而是等待当前执行栈中的所有任务都执行完毕， 主线程处于闲置状态时，主线程会去查找事件队列是否有任务。如果有，那么主线程会从中取出排在第一位的事件，并把这个事件对应的回调放入执行栈中，然后执行其中的同步代码...，如此反复，这样就形成了一个无限的循环。这就是这个过程被称为“事件循环（Event Loop）”的原因。</p>
<p>当前执行栈执行完毕时会立刻先处理所有微任务队列（Promise）中的事件，然后再去宏任务队列（setTimeout）中取出一个事件。同一次事件循环中，微任务永远在宏任务之前执行。
<a href="https://zhuanlan.zhihu.com/p/33058983">https://zhuanlan.zhihu.com/p/33058983</a>
<span id="g21"></span></p>
<h3 id="https-">https 过程</h3>
<p>客户端和服务器握手过程大致如下:
第一步，客户端给出协议版本号、一个客户端生成的随机数（Client random），以及客户端支持的加密方法。</p>
<p>第二步，服务器确认双方使用的加密方法，并给出数字证书、以及一个服务器生成的随机数（Server random）。</p>
<p>第三步，客户端确认数字证书有效，然后生成一个新的随机数（Premaster secret），并使用数字证书中的公钥，加密这个随机数，发给服务器。</p>
<p>第四步，服务器使用自己的私钥，获取客户端发来的随机数（即 Premaster secret）。</p>
<p>第五步，客户端和服务器根据约定的加密方法，使用前面的三个随机数，生成&quot;对话密钥&quot;（session key），用来加密接下来的整个对话过程。</p>
<p>参考<a href="http://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html">图解 SSL/TLS 协议</a>
<span id="g22"></span></p>
<h3 id="-subscribepublish-">订阅/发布模式（subscribe&amp;publish）</h3>
<p>订阅发布模式（又称观察者模式）定义了一种一对多的关系，让多个观察者同时监听某一个主题对象，这个主题对象的状态发生改变时就会通知所有观察者对象。模式流程：发布者发出通知 =&gt; 主题对象收到通知并推送给订阅者 =&gt; 订阅者执行相应操作</p>
<pre><code><span class="hljs-comment">//发布者</span>
<span class="hljs-keyword">let</span> pub=\{
  <span class="hljs-attr">publish</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dep</span>)</span>\{
    dep.notify();
  \}
\}
<span class="hljs-comment">//订阅者</span>
<span class="hljs-keyword">let</span> sub1=\{<span class="hljs-attr">update</span>:<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>\{<span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)\}\}
<span class="hljs-keyword">let</span> sub2=\{<span class="hljs-attr">update</span>:<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>\{<span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)\}\}

<span class="hljs-comment">//主题</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dep</span></span>\{
  <span class="hljs-keyword">constructor</span>(subs)\{
    <span class="hljs-keyword">this</span>.subs=subs||[]
  \}
  notify()\{
    <span class="hljs-keyword">this</span>.subs.forEach(<span class="hljs-function">(<span class="hljs-params">sub</span>)=&gt;</span>sub.update())
  \}
\}

<span class="hljs-keyword">let</span> dep =<span class="hljs-keyword">new</span> Dep([sub1,sub2])
<span class="hljs-comment">//发布者发布消息，主题对象执行notify方法，进而触发订阅者的update方法</span>
pub.publish(dep);
</code></pre><p><span id="g23"></span></p>
<h3 id="vue-">vue 双向数据绑定实现原理</h3>
<p><a href="https://juejin.im/entry/59116fa6a0bb9f0058aaaa4c">vue 双向数据绑定实现原理</a></p>
<p><span id="g24"></span></p>
<h3 id="-a-instanceof-b">函数模拟 A instanceof B</h3>
<p>js 原生的 instanceof 可以检测某个对象是不是另一个对象的实例。
用函数模拟 instanceof 的原理是：查看对象 B 的 prototype 指向的对象是否在对象 A 的[[prototype]]链上。如果在，则返回 true,如果不在则返回 false。不过有一个特殊的情况，当对象 B 的 prototype 为 null 将会报错(类似于空指针异常)。</p>
<pre><code class="lang-javascript">function <span class="hljs-variable">_instanceof</span>(A, B) \{
    let <span class="hljs-variable">_prototype</span> = B.prototype;
    let <span class="hljs-variable">_proto</span> = A.<span class="hljs-variable">__proto__</span>;

    <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) \{
        <span class="hljs-comment">//Object.prototype.__proto__ === null</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-variable">_proto</span> === null) return <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">if</span> (<span class="hljs-variable">_proto</span> === <span class="hljs-variable">_prototype</span>) return <span class="hljs-literal">true</span>;
        <span class="hljs-variable">_proto</span> = <span class="hljs-variable">_proto</span>.<span class="hljs-variable">__proto__</span>;
    \}
\}
</code></pre>
<p><span id="g25"></span></p>
<h3 id="typeof-">typeof 原理</h3>
<p>同的对象在底层都表示为二进制， 在 JavaScript 中二进制前三位都为 0 的话会被判断为 object 类型， null 的二进制表示是全 0， 自然前三位也是 0， 所以执行 typeof 时会返回“object”。</p>
<p>在 javascript 的最初版本中，使用的 32 位系统，为了性能考虑使用低位存储了变量的类型信息：</p>
<p>000：对象
1：整数
010：浮点数
100：字符串
110：布尔
有 2 个值比较特殊：</p>
<p>undefined：用 - （−2^30）表示。
null：对应机器码的 NULL 指针，一般是全零。</p>
<p><span id="g26"></span></p>
<h3 id="iterator">Iterator</h3>
<p>Iterator 是一种接口，为各种不同的数据结构（Array,Object,Map,Set）提供统一的访问机制。</p>
<p>Iterator 的遍历过程:</p>
<ol>
<li>创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。</li>
<li>第一次调用指针对象的 next 方法，可以将指针指向数据结构的第一个成员。</li>
<li>第二次调用指针对象的 next 方法，指针就指向数据结构的第二个成员。</li>
<li>不断调用指针对象的 next 方法，直到它指向数据结构的结束位置。</li>
</ol>
<p>每一次调用 next 方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含 value 和 done 两个属性的对象。其中，value 属性是当前成员的值，done 属性是一个布尔值，表示遍历是否结束。</p>
<p>数组有内置的iterator，可以通过Symbol.iterator获取：</p>
<pre><code class="lang-javascript"> let myArray=[1,2,3]
 it=myArray[<span class="hljs-string">Symbol.iterator</span>](<span class="hljs-link"></span>)
 it.next()
 it.next()
 it.next()  
 it.next() //\{done:true\}
</code></pre>
<p>而对象没有内置的iterator，可以自己定义：</p>
<pre><code class="lang-javascript"><span class="hljs-keyword">let</span> myObject=\{<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">b</span>:<span class="hljs-number">2</span>\}
<span class="hljs-built_in">Object</span>.defineProperty(myObject,<span class="hljs-built_in">Symbol</span>.iterator,\{
  <span class="hljs-attr">enumerable</span>:<span class="hljs-literal">false</span>,
  <span class="hljs-attr">writable</span>:<span class="hljs-literal">false</span>,
  <span class="hljs-attr">configurable</span>:<span class="hljs-literal">true</span>,
  <span class="hljs-attr">value</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>\{
    <span class="hljs-keyword">let</span> o=<span class="hljs-keyword">this</span>
    <span class="hljs-keyword">let</span> index=<span class="hljs-number">0</span>
    <span class="hljs-keyword">let</span> keys=<span class="hljs-built_in">Object</span>.keys(o)
    <span class="hljs-keyword">return</span> \{
      <span class="hljs-attr">next</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>\{
            <span class="hljs-keyword">return</span>\{
          <span class="hljs-attr">value</span>:o[keys[index++]],
          <span class="hljs-attr">done</span>:index&gt;keys.length
        \}
      \}
    \}
  \}
\})

<span class="hljs-keyword">let</span> it=myObject[<span class="hljs-built_in">Symbol</span>.iterator]()
it.next()
</code></pre>
<p><span id="g27"></span></p>
<h3 id="toprimitive">ToPrimitive</h3>
<p>JavaScript 引擎内部的抽象操作 ToPrimitive() 有着这样的签名:</p>
<pre><code class="lang-javascript"><span class="hljs-function"><span class="hljs-title">ToPrimitive</span><span class="hljs-params">(input，PreferredType?)</span></span>
</code></pre>
<p>可选参数 PreferredType 可以是 Number 或者 String。 它只代表了一个转换的偏好，转换结果不一定必须是这个参数所指的类型，但转换结果一定是一个原始值。 如果 PreferredType 被标志为 Number，则会进行下面的操作来转换 input:</p>
<ul>
<li><p>如果 input 是个原始值，则直接返回它。</p>
</li>
<li><p>否则，如果 input 是一个对象。如果有obj。valueOf方法，则调用 obj.valueOf() 方法。 如果obj.valueOf()返回值是一个原始值，则返回这个原始值。</p>
</li>
<li><p>否则，调用 obj.toString() 方法。 如果返回值是一个原始值，则返回这个原始值。</p>
</li>
<li><p>否则，抛出 TypeError 异常。</p>
</li>
</ul>
<p>如果 PreferredType 被标志为 String，则转换操作的第二步和第三步的顺序会调换。 如果没有 PreferredType 这个参数，则 PreferredType 的值会按照这样的规则来自动设置：</p>
<p>Date 类型的对象会被设置为 String，</p>
<p>其它类型的值会被设置为 Number。</p>
<pre><code class="lang-javascript"><span class="hljs-keyword">var</span> obj = \{
    <span class="hljs-attr">valueOf</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>\{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"valueOf"</span>);
        <span class="hljs-keyword">return</span> \{\}; <span class="hljs-comment">// not a primitive</span>
    \},
    <span class="hljs-attr">toString</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>\{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"toString"</span>);
        <span class="hljs-keyword">return</span> \{\}; <span class="hljs-comment">// not a primitive</span>
    \}
\}
<span class="hljs-built_in">Number</span>(obj)
</code></pre>
<p><a href="https://justjavac.com/javascript/2012/12/20/object-plus-object.html">更多内容</a></p>
<p><span id="g28"></span></p>
<h3 id="bfc">BFC</h3>
<p>在解释BFC之前，先说一下文档流。我们常说的文档流其实分为定位流、浮动流和普通流三种。而普通流其实就是指BFC中的FC。FC是formatting context的首字母缩写，直译过来是格式化上下文，它是页面中的一块渲染区域，有一套渲染规则，决定了其子元素如何布局，以及和其他元素之间的关系和作用。常见的FC有BFC、IFC，还有GFC和FFC。BFC是block formatting context，也就是块级格式化上下文，是用于布局块级盒子的一块渲染区域.</p>
<p>满足下列条件之一就可触发BFC:</p>
<ol>
<li><p>根元素，即HTML元素</p>
</li>
<li><p>float的值不为none</p>
</li>
<li><p>overflow的值不为visible</p>
</li>
<li><p>display的值为inline-block、table-cell、table-caption</p>
</li>
<li><p>position的值为absolute或fixed</p>
</li>
</ol>
<p>BFC布局规则：</p>
<ol>
<li>内部的box会在垂直方向一个接一个地放置</li>
<li>box垂直方向的距离由margin决定，属于同一个BFC的两个相邻box的margin会发生重叠</li>
<li>每个元素margin box左边，与包含块border box的左边相接触（对于从左向右的格式化，否则相反），即使存在浮动也是如此</li>
<li>BFC的区域不会与float box重叠</li>
<li>BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素</li>
<li>计算BFC高度时，浮动元素也参与计算</li>
</ol>
<p><a href="https://www.jianshu.com/p/580b28878630">更多内容</a></p>
<p><span id="g29"></span></p>
<h3 id="-">大整数相加</h3>
<p>主要思想:逐位相加并进位
下面这个字符串相加函数，接收两个字符串参数，并返回它们相加之后的结果，也是字符串形式。
代码如下:</p>
<pre><code class="lang-javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sumStrings</span><span class="hljs-params">(a,b)</span> \{  </span>
    <span class="hljs-comment">//通过补零让a和b对齐  </span>
    <span class="hljs-comment">//若a比b短，则对a补零  </span>
    <span class="hljs-keyword">while</span>(a.<span class="hljs-built_in">length</span> &lt; b.<span class="hljs-built_in">length</span>)\{  
        a = <span class="hljs-string">"0"</span> + a;  
    \}  
    <span class="hljs-comment">//若b比a短，则对b补零  </span>
    <span class="hljs-keyword">while</span>(b.<span class="hljs-built_in">length</span> &lt; a.<span class="hljs-built_in">length</span>)\{  
        b = <span class="hljs-string">"0"</span> + b;  
    \}  
    <span class="hljs-comment">//是否有进位  </span>
    var addOne = <span class="hljs-number">0</span>;  
    <span class="hljs-comment">//结果数组  </span>
    var result = [];  
    <span class="hljs-comment">//从个位开始相加  </span>
    <span class="hljs-keyword">for</span>(var i=a.<span class="hljs-built_in">length</span><span class="hljs-number">-1</span>;i&gt;=<span class="hljs-number">0</span>;i--)\{  
        var c1 = a.charAt(i) - <span class="hljs-number">0</span>;  
        var c2 = b.charAt(i) - <span class="hljs-number">0</span>;  
        var <span class="hljs-built_in">sum</span> = c1 + c2 + addOne;  
        <span class="hljs-comment">//若数字相加大于9，则进位  </span>
        <span class="hljs-keyword">if</span>(<span class="hljs-built_in">sum</span> &gt; <span class="hljs-number">9</span>)\{  
            result.unshift(<span class="hljs-built_in">sum</span> - <span class="hljs-number">10</span>);  
            addOne = <span class="hljs-number">1</span>;  
        \}  
        <span class="hljs-keyword">else</span>\{  
            result.unshift(<span class="hljs-built_in">sum</span>);  
            addOne = <span class="hljs-number">0</span>;  
        \}  
    \}  
    <span class="hljs-comment">//应付下面的情况：  </span>
    <span class="hljs-comment">//"99" + "11" =&gt; "110"  </span>
    <span class="hljs-comment">//它最后仍然要进位  </span>
    <span class="hljs-keyword">if</span>(addOne)\{  
        result.unshift(addOne);  
    \}  
    <span class="hljs-comment">//应付如下的情况  </span>
    <span class="hljs-comment">//"01" + "01" =&gt; "2"  </span>
    <span class="hljs-comment">//而不是"02"，所以移除第一位的"0"  </span>
    <span class="hljs-keyword">if</span>(!result[<span class="hljs-number">0</span>])\{  
        result.splice(<span class="hljs-number">0</span>,<span class="hljs-number">1</span>);  
    \}  
    <span class="hljs-keyword">return</span> result.join(<span class="hljs-string">""</span>);  
\}  
</code></pre>
<p><span id='g30'></span></p>
<h3 id="object-assign-">Object.assign 模拟实现</h3>
<p>The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.
Properties in the target object will be overwritten by properties in the sources if they have the same key.  Later sources&#39; properties will similarly overwrite earlier ones.  </p>
<p>Object.assign 模拟实现的思路如下：</p>
<ol>
<li>判断原生 Object 是否支持该函数，如果不存在的话创建一个函数 assign，并使用 Object.defineProperty 将该函数绑定到 Object 上。</li>
<li>判断参数是否正确（目标对象不能为空，我们可以直接设置\{\}传递进去,但必须设置值）</li>
<li>使用 Object() 转成对象，并保存为 result，最后返回这个对象 result</li>
<li>使用 for..in 循环遍历出所有可枚举的自有属性。并复制给新的目标对象(hasOwnProperty返回非原型链上的属性)</li>
</ol>
<pre><code class="lang-javascript"><span class="hljs-keyword">if</span>(!<span class="hljs-built_in">Object</span>.assign)\{
  <span class="hljs-built_in">Object</span>.definedProperty(<span class="hljs-built_in">Object</span>,<span class="hljs-string">'assign'</span>,\{
    <span class="hljs-attr">configurable</span>:<span class="hljs-literal">true</span>,
    <span class="hljs-attr">enumerable</span>:<span class="hljs-literal">false</span>,
    <span class="hljs-attr">writable</span>:<span class="hljs-literal">false</span>,
    <span class="hljs-attr">value</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">targetObj</span>)</span>\{
      <span class="hljs-keyword">if</span> (targetObj == <span class="hljs-literal">null</span>) \{
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'Cannot convert undefined or null to object'</span>);
      \}
      <span class="hljs-comment">/**
      * Object.assign('',\{a:1\}) 返回 String \{"", a: 1, length: 0\}
      */</span>
      <span class="hljs-keyword">var</span> result=<span class="hljs-built_in">Object</span>(targetObj);

      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">1</span>;i&lt;<span class="hljs-built_in">arguments</span>.length;i++)\{
        <span class="hljs-keyword">var</span> nextSource =<span class="hljs-built_in">arguments</span>[i]
        <span class="hljs-keyword">if</span>(nextSource  &amp;&amp; <span class="hljs-keyword">typeof</span> nextSource  === <span class="hljs-string">'object'</span>)\{
          <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> nextSource )\{
            <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(nextSource, key))\{
              result[key]=nextSource [key]
            \}
          \}
        \}
      \}
      <span class="hljs-keyword">return</span> result;
    \}
  \});
\}
</code></pre>
<p><span id='g31'></span></p>
<h3 id="http-">Http 幂等性</h3>
<h4 id="-">概述</h4>
<p>幂等性原本是数学上的概念，即使公式：f(x)=f(f(x)) 能够成立的数学性质。用在编程领域，则意为对同一个系统，使用同样的条件，一次请求和重复的多次请求对系统资源的影响是一致的。
幂等性是分布式系统设计中十分重要的概念，具有这一性质的接口在设计时总是秉持这样的一种理念：调用接口发生异常并且重复尝试时，总是会造成系统所无法承受的损失，所以必须阻止这种现象的发生。</p>
<h4 id="get-post-">GET 和 POST的幂等性</h4>
<p>HTTP GET方法，用于获取资源，不管调用多少次接口，结果都不会改变，所以是幂等的；HTTP POST方法是一个非幂等方法，因为调用多次，都将产生新的资源。所以，GET和POST最大的区别主要是GET请求是幂等性的，POST请求不是。
正因为它们有这样的区别，所以不应该且不能用get请求做数据的增删改这些有副作用的操作。因为get请求是幂等的，在网络不好的隧道中会尝试重试。如果用get请求增数据，会有重复操作的风险，而这种重复操作可能会导致副作用（浏览器和操作系统并不知道你会用get请求去做增操作）。</p>
<p><span id='g32'></span></p>
<h3 id="-">判断一个对象是否是数组</h3>
<h4 id="1-instanceof">1.instanceof</h4>
<p>A instanceof B 可以查看 B 的 prototype 指向的对象是否在对象 A 的[[prototype]]链上。</p>
<p>缺点：如果A的<strong>proto</strong>被改变，则失效。</p>
<pre><code>a=new Object()
<span class="hljs-selector-tag">a</span>.__proto__=Array<span class="hljs-selector-class">.prototype</span>
<span class="hljs-selector-tag">a</span> instancefo Array <span class="hljs-comment">// true</span>
Object<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.toString</span><span class="hljs-selector-class">.apply</span>(a) <span class="hljs-comment">//"[object Object]"</span>
</code></pre><h4 id="2-constructor">2.constructor</h4>
<p>每一个实例化的数组拥有一个constructor属性，这个属性指向生成这个数组的方法Array。</p>
<pre><code><span class="hljs-keyword">const</span> a = [];
console.log(a.<span class="hljs-keyword">constructor</span> == <span class="hljs-keyword">Array</span>);<span class="hljs-comment">//true</span>
</code></pre><p>缺点：constructor是可以改写的</p>
<pre><code><span class="hljs-keyword">const</span> a=[]
a.<span class="hljs-keyword">constructor</span> =<span class="hljs-keyword">Object</span>
console.log(a.<span class="hljs-keyword">constructor</span> === <span class="hljs-keyword">Object</span>) <span class="hljs-comment">//true</span>
</code></pre><h4 id="3-object-prototype-tostring">3.Object.prototype.toString</h4>
<p>Object.prototype.toString会返回对象类型的信息。</p>
<pre><code>const <span class="hljs-attr">a</span> = [<span class="hljs-number">1</span>];
const <span class="hljs-attr">b</span> = \{<span class="hljs-number">0</span>:<span class="hljs-number">0</span>\};
const <span class="hljs-attr">c</span> = 'hello';
a.<span class="hljs-built_in">toString</span>();//<span class="hljs-string">"1"</span>,这里调用的是Array.prototype.<span class="hljs-built_in">toString</span>方法
b.<span class="hljs-built_in">toString</span>();//<span class="hljs-string">"[object Object]"</span>
c.<span class="hljs-built_in">toString</span>();//<span class="hljs-string">"hello"</span>
Object.prototype.<span class="hljs-built_in">toString</span>.call(a);//<span class="hljs-string">"[object Array]"</span>
Object.prototype.<span class="hljs-built_in">toString</span>.call(b);//<span class="hljs-string">"[object Object]"</span>
Object.prototype.<span class="hljs-built_in">toString</span>.call(c);//<span class="hljs-string">"[object String]"</span>
</code></pre><p>缺点：Object.prototype.toString也是可以被修改的</p>
<pre><code>Object.getOwnPropertyDescriptor(Object<span class="hljs-selector-class">.prototype</span>,<span class="hljs-string">'toString'</span>)<span class="hljs-selector-class">.writable</span> <span class="hljs-comment">// true</span>
</code></pre><h4 id="4-array-isarray">4.Array.isArray</h4>
<pre><code><span class="hljs-keyword">const</span> a=[];
<span class="hljs-keyword">Array</span>.isArray(a); <span class="hljs-comment">// true</span>
</code></pre><p>缺点：Array.isArray是ES5标准中增加的方法，部分浏览器不支持。
可以使用以下代码兼容：</p>
<pre><code><span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Array</span>.isArray) \{
  <span class="hljs-built_in">Array</span>.isArray = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arg</span>) </span>\{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(arg) === <span class="hljs-string">'[object Array]'</span>;
  \};
\}
</code></pre><p><span id='g33'></span></p>
<h3 id="-">跨域</h3>
<p>解决方法：</p>
<ol>
<li>JSONP</li>
<li>CORS</li>
<li>代理</li>
<li>修改document.domain来跨子域</li>
<li>window.postMessage实现iframe 跨域通信</li>
</ol>
<p><span id='g34'></span></p>
<h3 id="debounce-and-throllte">Debounce and Throllte</h3>
<p>Debounce 和 Throllte都是用来防止函数被高频调用的函数，但二者又有所不同：</p>
<ul>
<li>Debounce被称为防抖函数，debounce(fn,wait)会等待wait时间间隔后执行fn,若wait期间debounce被调用，则重新计时(fn不会被执行)</li>
<li>Throttle被成为节流函数，throttle(fn,wait)在wait时间间隔内至多执行一次fn</li>
</ul>
<h4 id="-">简单的实现</h4>
<p>Debounce：</p>
<pre><code class="lang-javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounce</span>(<span class="hljs-params">fn,wait</span>)</span>\{

  <span class="hljs-keyword">var</span> timer;

  <span class="hljs-keyword">var</span> result=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>\{
    <span class="hljs-keyword">var</span> args=<span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);
    <span class="hljs-keyword">var</span> context=<span class="hljs-keyword">this</span>

    clearTimeout(timer)

    timer=setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>\{
      fn.apply(<span class="hljs-keyword">this</span>,args)
    \},wait)
  \}

  <span class="hljs-keyword">return</span> result
\}
</code></pre>
<p>Throttle:</p>
<pre><code class="lang-javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span>(<span class="hljs-params">fn,wait</span>)</span>\{

  <span class="hljs-keyword">var</span> timer;
  <span class="hljs-keyword">var</span> lastTime=<span class="hljs-number">0</span>;
  <span class="hljs-keyword">var</span> result=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>\{
    <span class="hljs-keyword">var</span> currTime=<span class="hljs-built_in">Date</span>.now();
    <span class="hljs-keyword">var</span> args=<span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);
    <span class="hljs-keyword">var</span> context=<span class="hljs-keyword">this</span>

    <span class="hljs-keyword">if</span>(currTime-lastTime&gt;=wait)\{
      lastTime=currTime
      <span class="hljs-keyword">return</span>  fn.apply(<span class="hljs-keyword">this</span>,args)
    \}<span class="hljs-keyword">else</span>\{
      clearTimeout(timer)

       <span class="hljs-comment">// 保证在当前时间区间结束后，再执行一次 fn</span>
      timer=setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>\{
        <span class="hljs-comment">// lastTime=Date.now() //? or currTime</span>
        fn.apply(<span class="hljs-keyword">this</span>,args)
      \},wait)
    \}
  \}

  <span class="hljs-keyword">return</span> result
\}

</code></pre>
<p><span id='g35'></span></p>
<h3 id="session-and-sessionstorage">Session and SessionStorage</h3>
<p>sSession是服务器端使用的一种记录客户端状态的机制。客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上，这就是Session。客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了。session的存储方式也有多样，最为传统的就是服务端(内存或者数据库)保存session的内容，客户端浏览器cookie保存sessionid，服务端通过客户端每次http请求带上的cookie中的sessionid去找到对应此用户的session内容。</p>
<h4 id="session-">Session与客户端</h4>
<p>虽然Session保存在服务器，对客户端是透明的，它的正常运行仍然需要客户端浏览器的支持。这是因为Session需要使用Cookie作为识别标志。HTTP协议是无状态的，Session不能依据HTTP连接来判断是否为同一客户，因此服务器向客户端浏览器发送一个名为JSESSIONID 的Cookie，它的值为该Session的id。Session依据该Cookie来识别是否为同一用户。</p>
<p>该Cookie为服务器自动生成的，它的maxAge属性一般为-1，表示仅当前浏览器内有效，并且各浏览器窗口间不共享，关闭浏览器就会失效。因此同一机器的两个浏览器窗口访问服务器时，会生成两个不同的Session。但是由浏览器窗口内的链接、脚本等打开的新窗口除外。这类子窗口会共享父窗口的Cookie，因此会共享一个Session。</p>
<h4 id="session-">Session的有效期</h4>
<p>Session生成后，只要用户继续访问，服务器就会更新Session的最后访问时间，并维护该Session 。用户每访问服务器一次，无论是否读写Session，服务器都认为该用户的Session&quot;活跃（active）&quot;了一次。</p>
<p>由于会有越来越多的用户访问服务器，因此Session也会越来越多。为防止内存溢出，服务器会把长时间内没有活跃的Session从内存删除。这个时间就是Session的超时时间 。如果超过了超时时间没访问过服务器，Session就自动失效了。</p>
<h4 id="sessionstorage">SessionStorage</h4>
<p>SessionStorage HTML5 Web 存储中的一种， 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据。
HTML5 Web 存储的数据不会被保存在服务器上，只用于客户端上，可以存储大量的数据，而不影响网站的性能。</p>
<p>SessionStorage 特点</p>
<ul>
<li>同源策略限制。若想在不同页面之间对同一个sessionStorage进行操作，这些页面必须同源。</li>
<li>本地存储。seesionStorage的数据不会跟随HTTP请求一起发送到服务器，只会在本地生效，并在关闭标签页后清除数据。</li>
<li>存储方式。seesionStorage的存储方式采用key、value的方式。</li>
<li>存储上限限制：不同的浏览器存储的上限也不一样，但大多数浏览器把上限限制在5MB以下。</li>
</ul>
<h4 id="-localstorage-">与localStorage的区别</h4>
<p>localStorage的同源策略限制、本地存储、存储方式、存储上限限制和SessionStorage相同，区别在于：</p>
<ul>
<li>SessionStorage 临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据；LocalStorage可以永久保存数据。</li>
<li>SessionStorage 只适用于同一个标签页，其他标签页内无法直接共享（除非在同源标签之间访问其他窗口）；LocalStorage相比而言可以在多个标签页中共享数据。</li>
</ul>
`;

class Index extends Component {
    constructor(props) {
        super(props);
    }
    rawMarkup() {
        return { __html: article };
    }
    render() {
        return <div dangerouslySetInnerHTML={this.rawMarkup()} />;
    }
}

export default Index;
