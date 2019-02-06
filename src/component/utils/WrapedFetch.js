import {Modal,Toast} from 'antd-mobile';
// require('es6-promise').polyfill();
import 'whatwg-fetch';

/**
 * 封装fetch，用于适应服务端特殊的数据请求格式
 * @param url 地址
 * @param params 参数，应该为一个数据对象
 * @param showSuccessMessage 请求成功时是否显示成功信息
 * @param messageContent 如果显示成功信息时显示的内容
 */
export const wrapedFetch = (url,params={},showSuccessMessage=false,messageContent='请求数据成功')=>{

    if (url === null || url === undefined || url === ''){
        Modal.alert(
            '错误',
            '请求的地址为空',
            [{
                text:'确定'
            }]
        );
        return;
    }

    return new Promise((resolve,reject)=>{
        fetch(url,{
            mode: "cors",
            // credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...params
            }),
        })
            .then(res => {
                if(res.status === 500){
                    reject({
                        code: 500,
                        message: '服务器发生内部错误，请联系管理员'
                    });
                }
                else if(res.status === 404){
                    reject({
                        code: 404,
                        message: '无法找到页面，错误的请求地址或服务器已停止，请联系管理员'
                    });
                }
                else if (res.status === 200){//不能用resolve，因为res.json()本身就是一个Promise
                    return res.json();
                }
                else {
                    reject({
                        code: res.status,
                        message: '其他系统错误，请联系管理员'
                    });
                }
            })
            .then((data)=>{
                if(data !== null && data !== undefined){
                    if (data.success === false){
                        resolve({
                            code: 200,
                            success: false,
                            message: data.msg
                        });
                    }
                    else {
                        if (showSuccessMessage === true){
                            Toast.success(messageContent,1);
                        }
                        resolve(data);
                    }
                }
            })

    })
}