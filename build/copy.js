const fs = require("fs");
const path = require("path");

const copyFolder = require("./file").copyFolder;

copyFolder(path.resolve(__dirname, "../public"),path.resolve(__dirname, "../"));

console.log("copyFolder end");

