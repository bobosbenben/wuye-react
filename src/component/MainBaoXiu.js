import React, { Component } from 'react';
import { createForm } from 'rc-form';
import './css/MainBaoXiu.css';
import { Panel, MediaBoxTitle, MediaBoxDescription } from 'react-weui';
import { Button, WhiteSpace, WingBlank, ImagePicker, TextareaItem, List, Picker, Toast } from 'antd-mobile';
import CustomeredRightArrow from './utils/CustomeredRightArrow';
import {Link} from 'react-router-dom';

const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
}];

const appMsgIcon = <img height='64px' width='64px' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4YcfyR9x23Hw+/DY9dhm2WZG0kbT9NP0/PTL8sux7LFe115T1VM+zz7i+OIXxhes6qxr2mvA8MCe6J6M4oz6/frr+us5zjn2/fa67rqB4IF13XWn6ad83nxa1loqyirn+eccHxx4AAAC/klEQVRo3u2W2ZKiQBBF8wpCNSCyLwri7v//4bRIFVXoTBBB+DAReV5sG6lTXDITiGEYhmEYhmEYhmEYhmEY5v9i5fsZGRx9PyGDne8f6K9cfd+mKXe1yNG/0CcqYE86AkBMBh66f20deBc7wA/1WFiTwvSEpBMA2JJOBsSLxe/4QEEaJRrASP8EVF8Q74GbmevKg0saa0B8QbwBdjRyADYxIhqxAZ++IKYtciPXLQVG+imw+oo4Bu56rjEJ4GYsvPmKOAB+xlz7L5aevqUXuePWVhvWJ4eWiwUQ67mK51qPj4dFDMlRLBZTqF3SDvmr4BwtkECu5gHWPkmDfQh02WLxXuvbvC8ku8F57GsI5e0CmUwLz1kq3kD17R1In5816rGvQ5VMk5FEtIiWislTffuDpl/k/PzscdQsv8r9qWq4LRWX6tQYtTxvI3XyrwdyQxChXioOngH3dLgOFjk0all56XRi/wDFQrGQU3Os5t0wJu1GNtNKHdPqYaGYQuRDfbfDf26AGLYSyGS3ZAK4S8XuoAlxGSdYMKwqZKM9XJMtyqXi7HX/CiAZS6d8bSVUz5J36mEMFDTlAFQzxOT1dzLRljjB6+++ejFqka+mXIe6F59mw22OuOw1F4T6lg/9VjL1rLDoI9Xzl1MSYDNHnPQnt3D1EE7PrXjye/3pVpr1Z45hMUdcACc5NVQI0bOdS1WA0wuz73e7/5TNqBPhQXPEFGJNV2zNqWI7QKBd2Gn6AiBko02zuAOXeWIXjV0jNqdKegaE/kJQ6Bfs4aju04lMLkA2T5wBSYPKDGF3RKhFYEa6A1L1LG2yacmsaZ6YPOSAMKNsO+N5dNTfkc5Aqe26uxHpx7ZirvgCwJpWq/lmX1hA7LyabQ34tt5RiJKXSwQ+0KU0V5xg+hZrd4Bn1n4EID+WkQdgLfRNtvil9SPfwy+WQ7PFBWQz6dGWZBLkeJFXZGCfLUjCgGgqXo5TuSu3cugdcTv/HjqnBTEMwzAMwzAMwzAMwzAMw/zf/AFbXiOA6frlMAAAAABJRU5ErkJggg==" />

class MainBaoXiu extends Component {


    constructor(props){
        super(props);

        this.state = {
            files: [],
            tag: ['baoxiu']
        }
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
            tag: val
        });
    };

    onSubmitButtonClick = ()=>{
        if (this.state.files.length>4) {
            Toast.fail('提交的图片大于4张',2);
            return;
        }
        for(let i in this.state.files){
            let formData = new FormData();
            let currentFile = this.state.files[i].file;
            formData.append("file", currentFile);
            console.log(currentFile);
            console.log(currentFile.size);
            if (currentFile.size>2*1024*1024){
                Toast.fail(currentFile.name+'大小超过2MB');
                return;
            }

                fetch( "http://192.168.2.19:8080/upload" , {
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
                        Toast.success('报修成功',2);
                        this.setState({files:[]});
                    }
                }).catch((err)=> {
                Toast.fail(err.msg,2);
            });
        }
    };

    render() {
        const tags = [{
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
                <Panel>
                    <WhiteSpace/>
                    <div style={{display:'flex',flexDirection:'row',width:'100%',paddingLeft:'15px'}}>
                        <div>
                            {appMsgIcon}
                        </div>
                        <Link to={{pathname:'/minecommunity',state:{fromFaultReport:true}}} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                            <div style={{display:'flex',flexDirection:'column',width:'100%',paddingLeft:'10px'}}>
                                <MediaBoxTitle style={{textAlign:'left',color:'black'}}>5号楼1单元903</MediaBoxTitle>
                                <MediaBoxDescription>
                                    电话：15391257468
                                </MediaBoxDescription>
                                {/*<div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',paddingRight:'20px'}}>*/}
                                {/*<div style={{color:'#483d8b',font:'10',padding:'0px 5px 0px 5px',border:'1px solid #483d8b',borderRadius:'500px'}}>切换地址</div>*/}
                                {/*</div>*/}
                            </div>
                            <CustomeredRightArrow show={true} />
                        </Link>
                    </div>
                </Panel>

                <Panel>
                    <Picker data={tags} cols={1} {...getFieldProps('tag')} value={this.state.tag} onChange={this.onPickerChange}>
                        <List.Item arrow="horizontal">问题类型</List.Item>
                    </Picker>
                </Panel>

                <Panel>
                    <List>
                        <TextareaItem
                            placeholder="请描述您的问题"
                            rows={5}
                            count={100}
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
                </Panel>

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