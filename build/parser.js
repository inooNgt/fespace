const fs = require("fs");
const path = require("path");
const marked = require("marked");

const getAllFiles = require("./file").getAllFiles;

let files = getAllFiles(path.resolve(__dirname, "../markdown"));

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

files.forEach((v, k) => {
    let filename =`../src/articles/${path.basename(v, ".md")}.js`,
        data = marked(
            fs.readFileSync(v, {
                encoding: "utf-8"
            })
        );
    console.log(v, data);
    fs.writeFileSync(filename, data, { encoding: "utf-8" });
});
