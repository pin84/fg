module.exports = async ()=>{
    
    let file = document.getElementById("upload").files[0];
      // 通过 file 生成目标 url
      var imgURL = URL.createObjectURL(file);
      this.imgURL = imgURL;

      //  let imgURL = await upload.fileToBase64(file);
      let img = await upload.waitImgOnload(imgURL);
      let blob = await upload.imgToBlob(img);
      this.blob = blob;

      let formData = new FormData();

      formData.append("fileName", blob);

      let res = await post("/mini/upload", formData);
      this.srcList.push(res.data);
      console.log(res);

}