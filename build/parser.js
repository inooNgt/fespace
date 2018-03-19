const fs = require("fs");
const path = require("path");
const marked = require("marked");

const getAllFiles = require("./file").getAllFiles;

let articles = getAllFiles(path.resolve(__dirname, "../markdown")),
    header = fs.readFileSync(path.resolve(__dirname, "./templet/header"), {
        encoding: "utf-8"
    }),
    footer = fs.readFileSync(path.resolve(__dirname, "./templet/footer"), {
        encoding: "utf-8"
    }),
    routeTpl = fs.readFileSync(path.resolve(__dirname, "./templet/route"), {
        encoding: "utf-8"
    });

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

articles.forEach((v, k) => {
    let basename = path.basename(v, ".md"),
        prepath = "../static/pages/Posts/routes",
        filename = `${prepath}/${basename}/components/Index.js`,
        component = marked(
            fs.readFileSync(v, {
                encoding: "utf-8"
            })
        ),
        route = routeTpl.replace(/{{route}}/, basename);

    fs.mkdirSync(`${prepath}/${basename}`);
    fs.mkdirSync(`${prepath}/${basename}/components`);

    component = component.replace(/\s+class=/, " className=");
    component = `${header}${component}${footer}`;
    fs.writeFileSync(filename, component, { encoding: "utf-8" });

    fs.writeFileSync(`${prepath}/${basename}/route.js`, route, {
        encoding: "utf-8"
    });

    console.info(`${path.basename(v)} parsed`);
});
