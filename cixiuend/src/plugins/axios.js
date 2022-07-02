import axios from 'axios'
import qs from 'qs'
import { baseURL  } from '../config/config';
import { Loading } from 'element-ui';

const service = axios.create({
  baseURL,
  timeout: 60000,
})
let loading = null
let requestTimes = 0
// Add a request interceptor
service.interceptors.request.use(function (config) {
  // Do something before request is sent
  requestTimes++

  console.log('---requestTimes-1---',requestTimes);
  loading = Loading.service({
    // background:'transparent'
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });

  // console.log('---config-==',config);
  return config;
}, function (error) {
  // Do something with request error
  return Promise.resolve(error);
});

// Add a response interceptor
service.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  requestTimes--
  console.log('---requestTimes-2---',requestTimes);
  if(!requestTimes){
    loading.close()
  }

  let {data} = response
  return data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  requestTimes--
  console.log('---requestTimes--3--',requestTimes);
  if(!requestTimes){
    loading.close()
  }
  return Promise.resolve({code:-1,data:'出错了！'});
});


export function get(url, params) {
  return service.get(url, {
    params
  })
}
export function post(url, params) {
  return service.post(url, params)
}









// export default service