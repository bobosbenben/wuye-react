import React, { Component } from 'react';
import * as WeUI from 'react-weui';
import { Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import 'whatwg-fetch';
import MainBaoXiu from './MainBaoXiu'

const Dialog = WeUI.Dialog;
const WeUIToast = WeUI.Toast;

class BaoXiu extends Component {

    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            hadSetInfo: false,
            messageShow:false,
            openid: this.props.match.params.openid
        }
    }

    componentDidMount(){
        if (this.state.openid === undefined){
            this.setState({
                isLoading:false,
                hadSetInfo:true
            });
            Toast.fail('获取不到用户信息',2);
        }
        else {
            fetch('/apis/wuye/getdefaultaddress',{
                mode: "cors",
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    openid:this.state.openid
                })
            })
                .then(response => response.json())
                .then(data =>{
                    console.log('返回的数据是:');
                    console.log(data);
                    this.setState({
                        isLoading: false,
                        hadSetInfo: data.total===1,
                        messageShow: !(data.total===1)
                    });
                })
                .catch(error =>{
                    console.log('错误信息是：');console.log(error);
                })
        }
    }

    onMessageClick = ()=> {
        this.setState({messageShow:false});
        this.props.history.push("/addminecommunity")
    }

    render() {
        const Message = ()=>{
            let buttons = [{
                type: 'primary',
                label: '确定',
                onClick: this.onMessageClick.bind(this)
            }];
            return <Dialog buttons={buttons} show={this.state.messageShow}>
                请先设置您所在的小区
            </Dialog>
        }

        return (
            this.state.isLoading?<WeUIToast show={this.state.isLoading}>正在加载页面</WeUIToast>:
            this.state.hadSetInfo? <MainBaoXiu/>:<Message/>
        );
    }
}

export default createForm()(BaoXiu);