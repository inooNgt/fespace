# web 性能优化

### 代码优化

1. css

-   css 合并，尽量减少 HTTP 请求（code splitting 除外）
-   css 压缩
-   将 css 文件放在页面最上面
-   选择器优化嵌套，尽量避免层级过深
-   充分利用 css 继承属性，减少代码量，如 font、color、line-height
-   抽象提取公共样式，区分公共 CSS 和 业务 CSS，减少代码量
-   使用伪元素，如::before，::after
-   css 雪碧图

2. html

-   简化 html 结构，尽量避免层级过深
-   标签语义化，用正确的标签做正确的事情
