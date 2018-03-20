import React, { Component } from "react";

const article=`<h1 id="-canvas-">利用透视原理实现 canvas 第三维度</h1>
<p>canvas 2d 渲染上下文（The rendering context）只有 x、y 两个维度，若要表现物体的立体感和纵深感，就需要利用透视原理创建 z 维度，实现平面到立体的转变。</p>
<h3 id="-">透视原理</h3>
<p>透视是根据物体呈近大远小的空间关系，将立体三维空间的形象表现在二维平面上。透视的几个要素：</p>
<ul>
<li>视平线：就是与画者眼睛平行的水平线。</li>
<li>消失点：就是与画面不平行的成角物体，在透视中伸远到视平线心点两旁的消失点。举个栗子，当你沿着铁路线去看两条铁轨时、当沿着公路去看两侧排列整齐的树木时，两条平行的铁轨或两排树木连线交于很远的某一点，即消失点。<div align="center"><img width="432" height="296" src="http://p42jcfxfo.bkt.clouddn.com/images/thinkin/perspective_1.png?v=1"/></div>

</li>
</ul>
<h3 id="-">透视图公式</h3>
<p>原理：随着物体的深度(z 坐标)增加，远离成像面，其体积会逐渐缩小最后消失，同时 x,y 坐标向消失点移动。</p>
<div align="center"><img width="538" height="493" src="http://p42jcfxfo.bkt.clouddn.com/images/thinkin/perspective_0.png"/></div>

<p>有一个正在远离你的物体，一个观察点(镜头)和一个成像面(即屏幕)。物体和成像面之间有一段距离，也就是 z 值。观察点到成像面也有一段距离，与照相机镜头的焦距类似，用变量 f1 表示。很容易计算出物体实际大小与其在成像面上形成的图像大小之比为：</p>
<pre><code><span className="hljs-attr">scale</span>=fl/(fl+z)
</code></pre><p>物体和消失点的距离也随 scale 变化，假设消失点在成像面上的坐标为(cx,cy)，物体移动前位置为(x0,y0)则：</p>
<pre><code><span class="hljs-attr">x-cx</span>=scale*(x0-cx)
<span class="hljs-attr">y-cy</span>=scale*(y0-cy)
</code></pre><p>由此得到物体移动后的坐标：</p>
<pre><code><span class="hljs-attr">x</span>=cx+scale*(x0-cx)
<span class="hljs-attr">y</span>=cy+scale*(y0-cy)
</code></pre><h3 id="-">编程实践</h3>
<p>效果图：</p>
<div align="center"><img width="400" src="http://p42jcfxfo.bkt.clouddn.com/images/thinkin/paopao.gif"/></div>

<p>代码如下：</p>
<pre><code class="lang-html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>泡泡<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#262626</span>;
        }

        <span class="hljs-selector-tag">canvas</span> {
            <span class="hljs-attribute">display</span>: block;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"canvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"600"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"600"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"canvas"</span>),
            ctx = canvas.getContext(<span class="hljs-string">"2d"</span>),
            circleArr = [],
            fl = <span class="hljs-number">500</span>,
            R = <span class="hljs-number">30</span>,
            width = canvas.width,
            height = canvas.height,
            center = {
                <span class="hljs-attr">x</span>: width / <span class="hljs-number">2</span>,
                <span class="hljs-attr">y</span>: height / <span class="hljs-number">2</span>
            },
            random = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ((<span class="hljs-built_in">Math</span>.random() &gt; <span class="hljs-number">0.5</span> ? <span class="hljs-number">1</span> : <span class="hljs-number">-1</span>) * <span class="hljs-built_in">Math</span>.random() + <span class="hljs-number">0.5</span>);
        <span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span>;
        <span class="hljs-comment">//圆形类</span>
        <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Circle</span> </span>{
            <span class="hljs-keyword">constructor</span>(x, y, r, color) {
                <span class="hljs-keyword">this</span>.x = x;
                <span class="hljs-keyword">this</span>.y = y;
                <span class="hljs-keyword">this</span>.r = r;
                <span class="hljs-keyword">this</span>.z = <span class="hljs-number">0</span>;
                <span class="hljs-keyword">this</span>.index = index++;
                <span class="hljs-comment">// 颜色的取值范围</span>
                <span class="hljs-keyword">this</span>.color = <span class="hljs-string">"rgba("</span> + (<span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">240</span>) + <span class="hljs-number">9</span>) + <span class="hljs-string">","</span> + (<span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">220</span>) + <span class="hljs-number">18</span>) + <span class="hljs-string">",203,0.85)"</span>;
                <span class="hljs-comment">//往数组中push自己</span>
                circleArr.push(<span class="hljs-keyword">this</span>);
            }

            <span class="hljs-comment">//绘制</span>
            print() {
                <span class="hljs-comment">//新建一条路径</span>
                ctx.beginPath();
                <span class="hljs-comment">//创建一个圆</span>
                ctx.arc(<span class="hljs-keyword">this</span>.x, <span class="hljs-keyword">this</span>.y, <span class="hljs-keyword">this</span>.r, <span class="hljs-number">0</span>, <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>, <span class="hljs-literal">true</span>);
                <span class="hljs-comment">//设置样式颜色</span>
                ctx.fillStyle = <span class="hljs-keyword">this</span>.color;
                <span class="hljs-comment">//通过填充路径的内容区域生成实心的图形</span>
                ctx.fill();
            }

            <span class="hljs-comment">//更新</span>
            update() {
                <span class="hljs-keyword">this</span>.z += <span class="hljs-number">0.4</span>
                <span class="hljs-keyword">let</span> scale = fl / (fl + <span class="hljs-keyword">this</span>.z);
                <span class="hljs-keyword">this</span>.x = center.x + scale * (<span class="hljs-keyword">this</span>.x - center.x)
                <span class="hljs-keyword">this</span>.y = center.y + scale * (<span class="hljs-keyword">this</span>.y - center.y)
                <span class="hljs-keyword">this</span>.r = <span class="hljs-keyword">this</span>.r * scale;
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.index == <span class="hljs-number">1</span>) <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"scale:"</span>, scale.toFixed(<span class="hljs-number">2</span>) * <span class="hljs-number">1</span>, <span class="hljs-string">"r:"</span>, <span class="hljs-keyword">this</span>.r.toFixed(<span class="hljs-number">2</span>) * <span class="hljs-number">1</span>, <span class="hljs-string">" z:"</span>, <span class="hljs-keyword">this</span>.z.toFixed(<span class="hljs-number">2</span>) * <span class="hljs-number">1</span>)
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.r &lt; <span class="hljs-number">0.1</span>) {
                    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; circleArr.length; i++) {
                        <span class="hljs-keyword">if</span> (circleArr[i] === <span class="hljs-keyword">this</span>) {
                            circleArr.splice(i, <span class="hljs-number">1</span>);
                        };
                    }
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                }
                <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
            }
        }

        <span class="hljs-comment">//创建圆</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">500</span>; i++) {
            <span class="hljs-keyword">if</span> (i == <span class="hljs-number">0</span>) <span class="hljs-keyword">new</span> Circle(random() * width, random() * height, R, <span class="hljs-string">"orange"</span>);
            <span class="hljs-keyword">else</span>
                setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    <span class="hljs-keyword">new</span> Circle(random() * width, random() * height, R, <span class="hljs-string">"orange"</span>);
                }, i * <span class="hljs-number">50</span>)
        }

        <span class="hljs-comment">//更新和绘制</span>
        <span class="hljs-keyword">const</span> update = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            ctx.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1000</span>, <span class="hljs-number">600</span>)

            <span class="hljs-keyword">if</span> (circleArr.length &gt; <span class="hljs-number">0</span>) {
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; circleArr.length; i++) {
                    <span class="hljs-keyword">if</span> (circleArr[i]) circleArr[i].update() &amp;&amp; circleArr[i].print();
                };
                requestAnimationFrame(update)
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"animation end"</span>)
            }
        }
        requestAnimationFrame(update)
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
`


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

export default Index 