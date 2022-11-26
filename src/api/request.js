import axios from 'axios';
import NProgress from 'nprogress';
import { ElNotification } from 'element-plus'

const ERROR_MSG = {
    ECONNABORTED: "请求超时,请稍后重试",
    ETIMEDOUT: "网络异常,请检查网络连接",
    ERR_NETWORK: "网络异常,请检查网络连接"
}

const HTTP_MSG = {
    401: "未授权",
    403: "未授权",
    404: "您所访问的资源不存在",
    500: "服务器异常,请联系管理员",
    DEFAULT: "服务器忙,请稍后重试"
}

const requestSuccess = function(config){
    NProgress.start();
    return config;
}

const resSuccess = (res) => {
    NProgress.done();
    return res.data
}

const resFailure = (error) => {
    NProgress.done();
    let title = "运行错误,请联系管理员";
    // if (error instanceof axios.AxiosError) {
    if (error instanceof axios.AxiosError) {
        let { status, code } = error.toJSON();
        if (status) {
            title = HTTP_MSG[status] || HTTP_MSG.DEFAULT;
        } else {
            title = ERROR_MSG[code];
        }
    }

    ElNotification({
        title: title,
        message: '请求失败',
        type: 'error'
    })
    
    return Promise.reject(error);
}

// axios.interceptors.response.use(
//     function (response) {
//         // 统一成功处理
//         // showTip("请求成功","","success")
//         return response.data;
//     },
//     function (error) {
//         // console.log(111)

//     }
// )

const createRequest = (baseURL) => {
    let instance = axios.create({
        baseURL
    })

    instance.interceptors.request.use(requestSuccess)
    instance.interceptors.response.use(resSuccess, resFailure)
    return instance
}

export default createRequest