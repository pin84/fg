var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var filesList = []; // 需要编译的文件相关
var ignoreList = [".git", "node_modules", "miniprogram_dist", "miniprogram_npm"]; // 忽略文件夹

// 处理路径
function readFileList(dir, filesList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(item => {
        var targetFilePath = path.join(dir, item);
        const stat = fs.statSync(targetFilePath);
        if (stat.isDirectory()) {
            if (!ignoreList.includes(item)) {
                readFileList(path.join(dir, item), filesList);
            };
        } else {
            if (path.extname(item) === ".less") {
                var resFilePath = path.join(dir, path.basename(item, ".less") + ".wxss");
                filesList.push({
                    targetFilePath,
                    resFilePath
                });
            };
        }
    });
    return filesList;
}
// 处理指令
function handleExec(item, p) {
    return new Promise((resolve, reject) => {
        // 非压缩编译
        exec(`lessc ${item.targetFilePath} > ${item.resFilePath}`, (error) => {
            if (error) {
                console.log(`${p || 0}% ERROR ---> ${item.targetFilePath} ---> ${item.resFilePath}`)
                reject(false);
            };
            console.log(`${p || 0}% SUCCESS ---> ${item.targetFilePath} ---> ${item.resFilePath}`)
            resolve(true);
        });
        // 压缩编译
        // exec(`lessc -x ${item.targetFilePath} > ${item.resFilePath}`, (error) => {
        //     if (error) {
        //         reject(false)
        //     }
        //     resolve(true)
        // });
    });
};
// 初始化
async function init() {
    readFileList(__dirname, filesList);
    for (let index = 0; index < filesList.length; index++) {
        const element = filesList[index];
        var execRes = await handleExec(element, ((index + 1) / filesList.length * 100).toFixed(0));
        if (!execRes) break;
    };
};

init();

