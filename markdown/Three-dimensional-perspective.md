# 利用透视原理实现 canvas 第三维度

canvas 2d 渲染上下文（The rendering context）只有 x、y 两个维度，若要表现物体的立体感和纵深感，就需要利用透视原理创建 z 维度，实现平面到立体的转变。

### 透视原理

透视是根据物体呈近大远小的空间关系，将立体三维空间的形象表现在二维平面上。透视的几个要素：

*   视平线：就是与画者眼睛平行的水平线。
*   消失点：就是与画面不平行的成角物体，在透视中伸远到视平线心点两旁的消失点。举个栗子，当你沿着铁路线去看两条铁轨时、当沿着公路去看两侧排列整齐的树木时，两条平行的铁轨或两排树木连线交于很远的某一点，即消失点。
    <div align="center"><img width="432" height="296" src="http://p42jcfxfo.bkt.clouddn.com/images/thinkin/perspective_1.png?v=1"/></div>

### 透视图公式

原理：随着物体的深度(z 坐标)增加，远离成像面，其体积会逐渐缩小最后消失，同时 x,y 坐标向消失点移动。

<div align="center"><img width="538" height="493" src="http://p42jcfxfo.bkt.clouddn.com/images/thinkin/perspective_0.png"/></div>

有一个正在远离你的物体，一个观察点(镜头)和一个成像面(即屏幕)。物体和成像面之间有一段距离，也就是 z 值。观察点到成像面也有一段距离，与照相机镜头的焦距类似，用变量 f1 表示。很容易计算出物体实际大小与其在成像面上形成的图像大小之比为：

```
scale=fl/(fl+z)
```

物体和消失点的距离也随 scale 变化，假设消失点在成像面上的坐标为(cx,cy)，物体移动前位置为(x0,y0)则：

```
x-cx=scale*(x0-cx)
y-cy=scale*(y0-cy)
```

由此得到物体移动后的坐标：

```
x=cx+scale*(x0-cx)
y=cy+scale*(y0-cy)
```

### 编程实践

效果图：

<div align="center"><img width="400" src="http://p42jcfxfo.bkt.clouddn.com/images/thinkin/paopao.gif"/></div>

代码如下：

```html
<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<title>泡泡</title>
	<style type="text/css">
		body {
			background: #262626;
		}

		canvas {
			display: block;
			margin: 100px auto;
		}
	</style>
</head>

<body>
	<canvas id="canvas" width="600" height="600"></canvas>
	<script type="text/javascript">
		const canvas = document.getElementById("canvas"),
			ctx = canvas.getContext("2d"),
			circleArr = [],
			fl = 500,
			R = 30,
			width = canvas.width,
			height = canvas.height,
			center = {
				x: width / 2,
				y: height / 2
			},
			random = () => ((Math.random() > 0.5 ? 1 : -1) * Math.random() + 0.5);
		let index = 0;
		//圆形类
		class Circle {
			constructor(x, y, r, color) {
				this.x = x;
				this.y = y;
				this.r = r;
				this.z = 0;
				this.index = index++;
				// 颜色的取值范围
				this.color = "rgba(" + (parseInt(Math.random() * 240) + 9) + "," + (parseInt(Math.random() * 220) + 18) + ",203,0.85)";
				//往数组中push自己
				circleArr.push(this);
			}

			//绘制
			print() {
				//新建一条路径
				ctx.beginPath();
				//创建一个圆
				ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
				//设置样式颜色
				ctx.fillStyle = this.color;
				//通过填充路径的内容区域生成实心的图形
				ctx.fill();
			}

			//更新
			update() {
				this.z += 0.4
				let scale = fl / (fl + this.z);
				this.x = center.x + scale * (this.x - center.x)
				this.y = center.y + scale * (this.y - center.y)
				this.r = this.r * scale;
				if (this.index == 1) console.log("scale:", scale.toFixed(2) * 1, "r:", this.r.toFixed(2) * 1, " z:", this.z.toFixed(2) * 1)
				if (this.r < 0.1) {
					for (let i = 0; i < circleArr.length; i++) {
						if (circleArr[i] === this) {
							circleArr.splice(i, 1);
						};
					}
					return false;
				}
				return true;
			}
		}

		//创建圆
		for (let i = 0; i < 500; i++) {
			if (i == 0) new Circle(random() * width, random() * height, R, "orange");
			else
				setTimeout(() => {
					new Circle(random() * width, random() * height, R, "orange");
				}, i * 50)
		}

		//更新和绘制
		const update = () => {
			ctx.clearRect(0, 0, 1000, 600)

			if (circleArr.length > 0) {
				for (let i = 0; i < circleArr.length; i++) {
					if (circleArr[i]) circleArr[i].update() && circleArr[i].print();
				};
				requestAnimationFrame(update)
			} else {
				console.log("animation end")
			}
		}
		requestAnimationFrame(update)
	</script>
</body>

</html>
```
