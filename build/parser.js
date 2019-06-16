const fs = require("fs");
const path = require("path");
const marked = require("marked");
const file = require("./file");

let articles = file.getAllFiles(path.resolve(__dirname, "../markdown")),
    prepath = path.resolve(__dirname, "../src/pages/Posts/routes"),
    componentTpl = fs.readFileSync(
        path.resolve(__dirname, "./templet/components/Index.js"),
        {
            encoding: "utf-8"
        }
    ),
    routeTpl = fs.readFileSync(path.resolve(__dirname, "./templet/router.js"), {
        encoding: "utf-8"
    });

/**
 *  marked 配置
 */
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
    highlight: function(code) {
        return require("highlight.js").highlightAuto(code).value;
    }
});

/**
 *  生成组件
 */

let contents = [];

articles.forEach((v, k) => {
    let basename = path.basename(v, ".md");
    let filename = `${prepath}/${basename}/components/Index.js`;
    let filecontent = fs.readFileSync(v, {
        encoding: "utf-8"
    });
    let component = marked(filecontent);
    let route = routeTpl.replace(/{{route}}/, basename);

    let title = filecontent.match(/^#\s*(.*)\r*\n+/, "")[1];

    component = component.replace(/\s+class=/, " className=");
    component = component.replace(/\`/g, "\\`");
    component = component.replace(/\{/g, "\\{");
    component = component.replace(/\}/g, "\\}");
    component = componentTpl.replace(/{{component}}/, component);

    /**
     *  创建目录
     */
    file.mkdirSync(`${prepath}/${basename}/components`);

    /**
     *  写入文件
     */
    fs.writeFileSync(filename, component, { encoding: "utf-8" });
    fs.writeFileSync(`${prepath}/${basename}/router.js`, route, {
        encoding: "utf-8"
    });

    /**
     * todo
     */
    contents.push({ name: title, path: `/posts/${basename}` });

    console.info(`${path.basename(v)} parsed`);
});
