let baseURL,showImgURL
let env = process.env.NODE_ENV
if (env == 'development') {
    baseURL = 'http://localhost:3000/'
    showImgURL='http://localhost:3000/cxData/'
} else {
    baseURL = 'https://data.lzhs.top'
    showImgURL='https://data.lzhs.top/upload/cxData/'
}

console.log('----baseURL---',baseURL);


export {
    baseURL,
    showImgURL
}