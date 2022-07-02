const path = require("path");
const modules = {};
let files = require.context('./resources', true, /^\.\/.*\.js$/);
files.keys().forEach(key => {
  const name = path.basename(key, ".js");
  let dirList = key.split('/').filter(item => item !== '.' && !item.includes('.js'));
  let temp = dirList.reduce((obj, objKey) => {
    typeof obj[objKey] !== 'object' && (obj[objKey] = {});
    return obj[objKey];
  }, modules);
  temp[name] = files(key).default || files(key);
});

module.exports = modules;