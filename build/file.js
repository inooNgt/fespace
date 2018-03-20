const fs = require("fs");
const path = require("path");
/** */
const getAllFiles = srcdir => {
    let filesArr = [];
    const readFiles = dir => {
        let files = fs.readdirSync(dir);

        if (files.length) {
            files.forEach((v, k) => {
                let filedir = path.join(dir, v),
                    stats = fs.statSync(filedir);

                if (stats.isFile()) {
                    filesArr.unshift(filedir);
                } else if (stats.isDirectory()) {
                    readFiles(filedir);
                }
            });
        }
    };
    readFiles(srcdir);

    return filesArr;
};

const copyFolder = (srcdir, tardir, cb) => {
    fs.readdir(srcdir, (err, files) => {
        let count = 0;
        let checkEnd = () => {
            ++count == files.length && cb && cb();
        };

        if (err) {
            checkEnd();
            return;
        }

        files.forEach(file => {
            console.log(file);
            let srcPath = path.join(srcdir, file);
            let tarPath = path.join(tardir, file);

            fs.stat(srcPath, (err, stats) => {
                if (stats.isDirectory()) {
                    fs.mkdir(tarPath, err => {
                        if (err) {
                            console.log(err);
                        }
                        copyFolder(srcPath, tarPath, checkEnd);
                    });
                } else {
                    fs.copyFileSync(srcPath, tarPath, checkEnd);
                }
            });
        });

        //为空时直接回调
        files.length === 0 && cb && cb();
    });
};

const mkdirSync = (pathString, mode = 0o777) => {
    if (!pathString || typeof pathString !== "string") return;
    let pathArr = pathString.replace(/\//g, "\\").split("\\");
    // '/a/b' './a/b'
    if (pathArr[0] == "" || pathArr == ".") pathArr.shift();

    const mkdir = p => {
        try {
            fs.mkdirSync(p, mode);
        } catch (e) {
            if (e.code == "EEXIST") {
                // console.log(`文件夹${p}已存在`);
            }
        }
        if (pathArr.length) {
            mkdir(p + "/" + pathArr.shift());
        }
    };

    pathArr.length && mkdir(pathArr.shift());
};

module.exports = {
    copyFolder,
    mkdirSync,
    getAllFiles
};
