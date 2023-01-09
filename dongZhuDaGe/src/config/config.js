let baseURL,showImgURL
let env = process.env.NODE_ENV
if (env == 'development') {
    baseURL = 'http://localhost:3000/'
    showImgURL='http://localhost:3000/daGeData/'
} else {
    baseURL = 'https://data.lzhs.top'
    showImgURL='https://data.lzhs.top/upload/daGeData/'
}

console.log('----baseURL---',baseURL);


export {
    baseURL,
    showImgURL
}