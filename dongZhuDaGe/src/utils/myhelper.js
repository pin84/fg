import {get,post} from '../plugins/axios.js';
import { Notification } from 'element-ui';
// console.log(get);

// const myDelete  = (url,d)=>{

// }

// let a = {a:1}


let  myDelete  = async (url,id)=>{
  let res = await get(url,{id})
  if(res.code == 0){
    Notification.success(res.data)
  }else {
    Notification.error(res.data)
  }
}





export {
  myDelete
}