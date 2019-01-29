import React, { Component } from 'react';
import { Toast, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import 'whatwg-fetch';
import {wrapedFetch} from './utils/WrapedFetch';
import MainBaoXiu from './MainBaoXiu'

class BaoXiu extends Component {

    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            hadSetInfo: false,
            messageShow:false,
            openid: this.props.match.params.openid,
            addressid: this.props.match.params.addressid,
            addressInfo:null
        }
    }

    componentDidMount(){
        Toast.loading('正在加载',0);
        //提供了房屋id（如果已经提供，那就是由“我的房屋”页面选中，然后跳转到报修页面来的）
        if (this.state.addressid !== undefined){
            wrapedFetch('http://192.168.2.126:7070/wuye/getaddress',{
                openid:this.state.openid,
                normalUserAddressId: this.state.addressid
            })
                .then(data =>{
                    this.setState({
                        isLoading: false,
                        hadSetInfo: data.total===1,
                        messageShow: !(data.total===1),
                        addressInfo: data.data
                    });
                    Toast.hide();
                })
                .catch(error =>{
                    console.log('错误信息是：');console.log(error);
                });
        }
        // 未提供房屋id，则向后台获取该用户的默认房屋
        else {
            if (this.state.openid === undefined){
                this.setState({
                    isLoading:false,
                    hadSetInfo:true
                });
                Toast.fail('获取不到用户信息',2);
            }
            else {
                wrapedFetch('http://192.168.2.126:7070/wuye/getdefaultaddress',{openid:this.state.openid})
                    .then(data =>{
                        this.setState({
                            isLoading: false,
                            hadSetInfo: data.total===1,
                            messageShow: !(data.total===1),
                            addressInfo: data.data
                        });
                        Toast.hide();
                    })
                    .catch(error =>{
                        console.log('错误信息是：');console.log(error);
                    })
            }
        }
    }

    onMessageClick = ()=> {
        this.setState({messageShow:false});
        let url = '/addminecommunity/'+this.state.openid+'/1';
        this.props.history.push(url);//1表示从报修页面跳转到新增小区页面
    };

    gotoSuccessPage = ()=>{
        this.props.history.push('/problemreportsuccess/'+this.state.openid);
    };

    render() {

        const Message = ()=>{

            return <Modal
                visible={true}
                transparent
                maskClosable={false}
                title="提示"
                platform="android"
                footer={[{ text: <span style={{color:'green'}}>确定</span>, onPress: () => { this.onMessageClick() } }]}
            >
                <div style={{ height: 30, overflow: 'scroll' }}>
                    请先增加您的房屋
                </div>
            </Modal>
        };

        const Loading = ()=>{
            return <div/>
        };

        return (
            this.state.isLoading?<Loading show={this.state.isLoading}>正在加载页面</Loading>:
            this.state.hadSetInfo? <MainBaoXiu openid={this.state.openid} addressInfo={this.state.addressInfo} gotoSuccessPage={this.gotoSuccessPage} />:<Message/>
        );
    }
}

export default createForm()(BaoXiu);