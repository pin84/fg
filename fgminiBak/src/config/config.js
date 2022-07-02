// const baseURL = 'http://42ml122265.wicp.vip'
let baseURL,showImgURL
let env = process.env.NODE_ENV
if (env == 'development') {
    // baseURL = 'http://localhost:3000'
    baseURL = 'https://data.lzhs.top'
    // baseURL = 'http://42ml122265.wicp.vip'
    showImgURL='https://data.lzhs.top/cxdata/'
} else {
    baseURL = 'https://data.lzhs.top'
    showImgURL='https://data.lzhs.top/cxdata/'
}

console.log('----baseURL---',baseURL);


export {
    baseURL,
    showImgURL
}