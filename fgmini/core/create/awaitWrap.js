/**
 * handle async await 
 * @param {*} promise 挂载的对象
 */
const awaitWrap = (promise) => {
    return promise
        .then(res => [null, res])
        .catch(err => [err, null])
}
module.exports = awaitWrap;