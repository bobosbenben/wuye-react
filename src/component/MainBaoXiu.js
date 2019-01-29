import React, { Component } from 'react';
import { createForm } from 'rc-form';
import './css/MainBaoXiu.css';
import { Button, WhiteSpace, WingBlank, ImagePicker, TextareaItem, List, Picker, Toast, Result } from 'antd-mobile';
import CustomeredRightArrow from './utils/CustomeredRightArrow';
import {Link} from 'react-router-dom';
import {wrapedFetch} from "./utils/WrapedFetch";

class MainBaoXiu extends Component {


    constructor(props){
        super(props);

        this.state = {
            openid: this.props.openid,
            addressInfo: this.props.addressInfo,
            userInfo: null,
            files: [],
            problemType: ['baoxiu']
        };
    }

    componentDidMount(){
        wrapedFetch('http://192.168.2.126:7070/normaluser/getinfo',{
            openid:this.state.openid
        })
            .then(data =>{
                this.setState({
                    userInfo: data.data
                });
            })
            .catch(error =>{
                console.log('错误信息是：');console.log(error);
            });
    }

    onImagePickerChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    };

    onPickerChange = (val)=>{
        console.log('标签变化：'); console.log(val);
        this.setState({
            problemType: val
        });
    };

    gotoSuccessPage = ()=>{
        this.props.gotoSuccessPage('/problemreportsuccess');
    };

    onSubmitButtonClick = ()=>{
        if (this.state.files.length>4) {
            Toast.fail('提交的图片大于4张',2);
            return;
        }

        let formData = new FormData();

        if (this.state.files.length > 0){
            for(let i in this.state.files){
                let currentFile = this.state.files[i].file;
                formData.append("file", currentFile);
                console.log(currentFile);
                console.log(currentFile.size);
                if (currentFile.size>2*1024*1024){
                    Toast.fail(currentFile.name+'大小超过2MB');
                    return;
                }
            }
        }

        this.props.form.validateFields((err,values)=>{
            if (!err){
                formData.append("file", {});
                formData.append("openid",this.state.openid);
                formData.append("problemType",this.state.problemType);
                formData.append("problemDescription",values.problemDescription);
                Toast.loading('正在提交',0);
                fetch( "http://192.168.2.126:7070/problem/new" , {
                    mode: "cors",
                    method: 'POST',
                    headers: {},
                    body: formData,
                }).then((response) => response.json())
                    .then((responseData)=> {
                        if (responseData.success === false){
                            Toast.fail(responseData.msg,2);
                        }
                        else {
                            Toast.hide();
                            this.setState({files:[]});
                            this.gotoSuccessPage();
                        }
                    })
                    .catch((err)=> {
                    console.log('exception');console.log(err);
                    Toast.fail('异常:'+err.msg,2);
                });
            }
        });
    };

    render() {
        const problemTypes = [{
            label: '报修',
            value: 'baoxiu'
        },{
            label: '投诉',
            value: 'tousu'
        }];
        const { files } = this.state;
        const { getFieldProps } = this.props.form;
        return (
            <div style={{backgroundColor: '#EEEEEE', height:'100%',width:'100%'}}>
                <div className="panel" style={{marginTop:'0px'}}>
                    <WhiteSpace/>
                    <div style={{display:'flex',flexDirection:'row',width:'100%',paddingLeft:'15px'}}>
                        <div>
                            <img src={this.state.userInfo == null?'':this.state.userInfo.headImgUrl} width='64px' height='64px'/>
                        </div>
                        <Link to={{pathname:'/minecommunity/'+this.state.openid,state:{fromFaultReport:true}}} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                            <div style={{display:'flex',flexDirection:'column',width:'100%',paddingLeft:'10px'}}>
                                <div className="head-title">{this.state.addressInfo.building+this.state.addressInfo.unit+this.state.addressInfo.room}</div>
                                <div className="head-description" style={{marginTop:'5px'}}>
                                    {this.state.addressInfo.community}
                                </div>
                            </div>
                            <CustomeredRightArrow show={true} />
                        </Link>
                    </div>
                </div>

                <div className="panel">
                    <Picker data={problemTypes} cols={1} {...getFieldProps('problemType')} value={this.state.problemType} onChange={this.onPickerChange}>
                        <List.Item arrow="horizontal">问题类型</List.Item>
                    </Picker>
                </div>

                <div className="panel">
                    <List>
                        <TextareaItem
                            placeholder="请描述您的问题"
                            rows={5}
                            count={100}
                            {...getFieldProps('problemDescription',{rules:[{ required:true }]})}
                        />
                    </List>
                    <ImagePicker
                        // className={}
                        files={files}
                        onChange={this.onImagePickerChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={files.length < 4}
                        multiple={true}
                    />
                </div>

                <WingBlank>
                    <WhiteSpace size='lg'/>
                    <Button type='primary' style={{backgroundColor:'#00BB32'}} onClick={this.onSubmitButtonClick}>
                        提交报修
                    </Button>
                </WingBlank>
            </div>
        );
    }
}

export default createForm()(MainBaoXiu);