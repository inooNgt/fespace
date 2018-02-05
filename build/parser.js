const fs = require("fs");
const path = require("path");
const marked = require("marked");

const getAllFiles = require("./file").getAllFiles;

let files = getAllFiles(path.resolve(__dirname, "../markdown"));
let header = fs.readFileSync(path.resolve(__dirname, "./templet/header"), { encoding: "utf-8" });
let footer = fs.readFileSync(path.resolve(__dirname, "./templet/footer"), { encoding: "utf-8" });



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
	let filename = `../src/articles/${path.basename(v, ".md")}.js`,
		data = marked(
			fs.readFileSync(v, {
				encoding: "utf-8"
			})
		);
		data=data.replace(/\s+class=/," className=")
		data=`${header}${data}${footer}`
	fs.writeFileSync(filename, data, { encoding: "utf-8" });

	console.info(`${path.basename(v)} parsed`)
});
