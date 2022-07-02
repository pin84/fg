const useProxy = require('./proxy')
const CONFIG = require('./config')
const mount = require('./mount')
const http = require('./request')
const apis = require('./apis/index')
const info = require('./info')
const auth = require('./auth')
const img = require('./img')
const nmap = require('./nmap')
const tools = require('./tools/index')
const initPage = require('./page')
const awaitWrap = require('./create/awaitWrap')
const pagesStack = require('./create/pagesStack')
const externalLink = require('./externalLink')
const mock = require('./mockSrc/index')


/**
 * 新增工具需要在list添加相关项目
 * 参考已有工具的配置
 */

// let list = [
//     {name: 'CONFIG', path: 'config', isPass: true},
//     {name: 'mount', path: 'mount'},
//     {name: 'http', path: 'request'},
//     {name: 'apis', path: 'apis/index'},
//     {name: 'info', path: 'info'},
//     {name: 'auth', path: 'auth'},
//     {name: 'img', path: 'img'},
//     {name: 'nmap', path: 'nmap', isPass: true},
//     {name: 'tools', path: 'tools/index'},
//     {name: 'initPage', path: 'page'},
//     {name: 'awaitWrap', path: 'create/awaitWrap'},
//     {name: 'pagesStack', path: 'create/pagesStack'},
//     {name: 'externalLink', path: 'externalLink'},
//     {name: 'mock', path: 'mockSrc/index', isPass: true},
// ]

// list.map(item => {
//     listResult[item.name] = require(item.path)
// })

// let passList = list.filter(item => item.isPass).map(mitem => mitem.name)

// module.exports = useProxy(listResult, [])
module.exports = useProxy({
    CONFIG,
    mount, 
    http, 
    apis, 
    info, 
    auth, 
    img, 
    nmap, 
    tools, 
    initPage, 
    awaitWrap, 
    pagesStack, 
    externalLink, 
    mock
}, ["CONFIG", "nmap"])