import React, { Component } from 'react';
import {Button} from 'antd-mobile';

class XinXi extends Component {

    onButtonClick = ()=>{

        let APPID = 'wx62865bf34b25ba13';
        let REDIRECT_URI = 'https://www.duobifuwu.com/wuye/code';
        let SCOPE = 'snsapi_base';
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+APPID+'&redirect_uri='+REDIRECT_URI+'&response_type=code&scope='+SCOPE+'&state=STATE#wechat_redirect';

        window.location = url;
        // fetch(url,{
        //     // mode: "cors",
        //     method: 'get',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify()
        // })
        //     .then(response => response.json())
        //     .then(data =>{
        //         console.log('返回的数据是:');
        //         console.log(data);
        //         this.setState({
        //             isLoading:false,
        //             // hadSetInfo:data.success,
        //             hadSetInfo:true,
        //             messageShow:!data.success
        //         });
        //     })
        //     .catch(error =>{
        //         console.log('错误信息是：');console.log(error);
        //     })
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.onButtonClick.bind(this)}>测试跳转</Button>
            </div>
        );
    }
}

export default XinXi;