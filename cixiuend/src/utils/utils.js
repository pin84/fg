import { MessageBox } from 'element-ui';
// base64数据的处理，主要针对IOS和安卓设备
const base64RULHandler = (base64URL) => {
    let imageBase64 = "";
    if (base64URL.indexOf("data:image") == 0) {
        console.log('-----utils--ios--');
        //苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接
        imageBase64 = base64URL;
    } else {
        //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换
        //此时一个正常的base64图片路径就完美生成赋值到img的src中了
        console.log('-----utils--安卓--');
        imageBase64 =
            "data:image/jpeg;base64," + base64URL.replace(/\n/g, "");
    }

    return imageBase64
}

const fileToBase64 = (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve, reject) => {
            reader.onload = e => {
                let url = e.target.result;
                resolve(url);
            };
        });
    }
    // base64 to bolb 使用前，必须对base64的URL进行得理。ios我安桌有区别
const base64ToBlob = async(dataURL, quality = 0.3) => {
    var img = new Image(); // Create new img element
    img.setAttribute("crossOrigin", "Anonymous");
    img.src = dataURL; // 设置图片源地址

    return new Promise((resolve, reject) => {
        img.onload = () => {
            // console.log('--onload--', img);
            // console.log('----fileSize--', img.fileSize);
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            canvas.toBlob(blob => {
                console.log('- toBlob--', blob);
                resolve(blob);
            }, "image/jpeg", quality);
        };
        img.onerror = (err) => {
            console.log('--err---', err);
            reject(err)
        };
    });
}




//blob => base64
// convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
//   const reader = new FileReader;
//   reader.onerror = reject;
//   reader.onload = () => {
//       resolve(reader.result);
//   };
//   reader.readAsDataURL(blob);
// });

// const base64String = await convertBlobToBase64(blob);
// https://ionicframework.com/blog/converting-a-base64-string-to-a-blob-in-javascript/



// 将blob转换为file
const blobToFile = (theBlob, fileName) => {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

const fileAppenToFormData = (file, originalname) => {
    let formData = new FormData()
    formData.append('fileName', file, originalname) // 'fileName'这个字符串不能修改，是和后台对应起来的
    return formData
}


const msgbox = ({
    msg = 'aa',
    showCancelButton = false
} = {}) => {
    return new Promise((resolve, reject) => {
        MessageBox.confirm(msg, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            showCancelButton
        }).then(() => {
            resolve(true)
        }).catch(() => {
            resolve(false)
        });

    })
}

let options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
};
const toLocalDate = (time) => {
    let ts = (new Date(time).getTime()) + (1000 * 60 * 8)
    return new Date(ts).toLocaleString("zh-CN", options)
}




export {
    blobToFile,
    fileAppenToFormData,
    base64ToBlob,
    base64RULHandler,
    msgbox,
    toLocalDate,
    fileToBase64,
}