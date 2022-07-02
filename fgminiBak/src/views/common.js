
import { msgbox, fileToBase64, base64ToBlob,fileAppenToFormData } from "../utils/utils";
let comInputChange = async(e, item) => {
    let files = e.target.files;
    if (files.length) {
        let formdateList = [];
        files.forEach(async(file) => {
            let type = file.type.split('/')[0]
            let formData
            if (type == 'image') {
                let { name } = file
                let base64URL = await fileToBase64(file)
                let blob = await base64ToBlob(base64URL)
                formData = fileAppenToFormData(blob, name);
            } else {
                formData = fileAppenToFormData(file);
            }
            formdateList.push(formData);
        });
        item["formdateList"] = formdateList;
    } else {
        delete item["formdateList"];
    }
}


let comSave =async (dataList)=>{
    let nameObj = dataList.find((item) => item.mkey == "name");
    if (!nameObj.inputText) {
      msgbox({
        msg: "请输入作品名称",
      });
      return;
    }
    loading();
    let { uploadFileList, record } = await this.uploadfile();
    let copyObj = this.localListHandler(uploadFileList, record);

    console.log(copyObj);
    let obj = {};
    dataList.forEach((item) => {
      obj[item.mkey] = item.inputText;
    });

    let mediaObj = {};
    copyObj.forEach((item) => {
      if (item.filenameArr) {
        mediaObj[item.mkey] = item.originalnameArr;
        mediaObj[item.mediaUrl] = item.filenameArr;
      }
    });

    obj = Object.assign({}, obj, mediaObj);
    obj.d_type = obj.d_type.join(",");
    console.log("===obj===", obj);
    let url = this.$api.addplay;

    let res = await this.$post(url, obj);
    msgbox({
      msg: res.data,
    });
    
}

export {
    comInputChange
}