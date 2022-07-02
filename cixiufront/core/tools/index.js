const path = require("path");
let modules = {};
let files = require.context('./resources', true, /^\.\/.*\.js$/);
files.keys().forEach(key => {
  const name = path.basename(key, ".js");
  let dirList = key.split('/').filter(item => item !== '.' && !item.includes('.js'));
  let temp = dirList.reduce((obj, objKey) => {
    typeof obj[objKey] !== 'object' && (obj[objKey] = {});
    return obj[objKey];
  }, modules);
  let deconstructList = ["function", "typeof"];
  let func = files(key).default || files(key);
  // temp[name] = func
  if (deconstructList.includes(name)) {
    modules = {...modules, ...func}
  } else {
    temp[name] = func
  }
});

module.exports = modules;