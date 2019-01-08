import React, { Component } from 'react';
import { Toast, Dialog } from 'react-weui';
import { createForm } from 'rc-form';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import 'antd-mobile/dist/antd-mobile.css';
import './css/component.css';
import 'whatwg-fetch';
import MainBaoXiu from './MainBaoXiu'

class BaoXiu extends Component {

    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            hadSetInfo: false,
            messageShow:false,
            mineInfoId: this.props.match.params.mineinfoid
        }
    }

    componentDidMount(){
        if (this.state.mineInfoId === undefined){
            console.log('从后台获取默认的小区');
            console.log('如果没有传入我的小区的id，也没有默认的小区，则页面跳转到新增我的小')
            //并且要添加路径参数，fromfaultreport的属性要设置为true，这样当设置完以后，就会跳转到保修页面
        }
        fetch('http://192.168.2.45:8080/hello',{
            mode: "cors",
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
            .then(response => response.json())
            .then(data =>{
                console.log('返回的数据是:');
                console.log(data);
                this.setState({
                    isLoading:false,
                    // hadSetInfo:data.success,
                    hadSetInfo:true,
                    messageShow:!data.success
                });
            })
            .catch(error =>{
                console.log('错误信息是：');console.log(error);
            })
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
            this.state.isLoading?<Toast icon="loading" show={this.state.isLoading}>正在加载页面</Toast>:
            this.state.hadSetInfo? <MainBaoXiu/>:<Message/>
        );
    }
}

export default createForm()(BaoXiu);