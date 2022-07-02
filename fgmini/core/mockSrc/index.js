
// let list = [
//     {name: 'article', path: './article.js'},
//     {name: 'home', path: './home.js'},
//     {name: 'mine', path: './mine.js'},
//     {name: 'service', path: './service.js'},
// ]

// let listResult = {}
// list.map(item => {
//     listResult[item.name] = require(item.path)
// })


const article = require('./article')
const home = require('./home')
const mine = require('./mine')
const service = require('./service')


module.exports = {
    article,
    home,
    mine,
    service
}