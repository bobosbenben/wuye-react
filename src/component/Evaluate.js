import React, { Component } from 'react';
import { createForm } from 'rc-form';
import { Panel, PanelBody, MediaBox, MediaBoxHeader, MediaBoxBody, MediaBoxTitle, MediaBoxDescription } from 'react-weui';
import { Button, WhiteSpace, WingBlank, TextareaItem, List, Picker } from 'antd-mobile';

class Evaluate extends Component {

    constructor({match},props,context){
        super();
        this.state={
            match:match,
            id:match.params.rowid,
            tag: ['fivepoint']
        }
        console.log('1111参数：'); console.log(this.state.match.params.rowid);
    }

    onPickerChange = (val)=>{
        console.log('标签变化：'); console.log(val);
        this.setState({
            tag: val
        });
    };

    render() {

        const appMsgIcon = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4YcfyR9x23Hw+/DY9dhm2WZG0kbT9NP0/PTL8sux7LFe115T1VM+zz7i+OIXxhes6qxr2mvA8MCe6J6M4oz6/frr+us5zjn2/fa67rqB4IF13XWn6ad83nxa1loqyirn+eccHxx4AAAC/klEQVRo3u2W2ZKiQBBF8wpCNSCyLwri7v//4bRIFVXoTBBB+DAReV5sG6lTXDITiGEYhmEYhmEYhmEYhmEY5v9i5fsZGRx9PyGDne8f6K9cfd+mKXe1yNG/0CcqYE86AkBMBh66f20deBc7wA/1WFiTwvSEpBMA2JJOBsSLxe/4QEEaJRrASP8EVF8Q74GbmevKg0saa0B8QbwBdjRyADYxIhqxAZ++IKYtciPXLQVG+imw+oo4Bu56rjEJ4GYsvPmKOAB+xlz7L5aevqUXuePWVhvWJ4eWiwUQ67mK51qPj4dFDMlRLBZTqF3SDvmr4BwtkECu5gHWPkmDfQh02WLxXuvbvC8ku8F57GsI5e0CmUwLz1kq3kD17R1In5816rGvQ5VMk5FEtIiWislTffuDpl/k/PzscdQsv8r9qWq4LRWX6tQYtTxvI3XyrwdyQxChXioOngH3dLgOFjk0all56XRi/wDFQrGQU3Os5t0wJu1GNtNKHdPqYaGYQuRDfbfDf26AGLYSyGS3ZAK4S8XuoAlxGSdYMKwqZKM9XJMtyqXi7HX/CiAZS6d8bSVUz5J36mEMFDTlAFQzxOT1dzLRljjB6+++ejFqka+mXIe6F59mw22OuOw1F4T6lg/9VjL1rLDoI9Xzl1MSYDNHnPQnt3D1EE7PrXjye/3pVpr1Z45hMUdcACc5NVQI0bOdS1WA0wuz73e7/5TNqBPhQXPEFGJNV2zNqWI7QKBd2Gn6AiBko02zuAOXeWIXjV0jNqdKegaE/kJQ6Bfs4aju04lMLkA2T5wBSYPKDGF3RKhFYEa6A1L1LG2yacmsaZ6YPOSAMKNsO+N5dNTfkc5Aqe26uxHpx7ZirvgCwJpWq/lmX1hA7LyabQ34tt5RiJKXSwQ+0KU0V5xg+hZrd4Bn1n4EID+WkQdgLfRNtvil9SPfwy+WQ7PFBWQz6dGWZBLkeJFXZGCfLUjCgGgqXo5TuSu3cugdcTv/HjqnBTEMwzAMwzAMwzAMwzAMw/zf/AFbXiOA6frlMAAAAABJRU5ErkJggg==" />

        const tags = [{
            label: '1分极差评',
            value: 'onepoint'
        },{
            label: '2分较差评',
            value: 'twopoint'
        },{
            label: '3分一般般',
            value: 'threepoint'
        },{
            label: '4分勉强满意',
            value: 'fourpoint'
        },{
            label: '5分完美',
            value: 'fivepoint'
        }];

        const { getFieldProps } = this.props.form;

        return (
            <div style={{backgroundColor: '#EEEEEE', height:'100%'}}>
                <Panel>
                    <PanelBody>
                        <MediaBox type="appmsg">
                            <MediaBoxHeader>{appMsgIcon}</MediaBoxHeader>
                            <MediaBoxBody>
                                <MediaBoxTitle style={{textAlign:'left'}}>小赵</MediaBoxTitle>
                                <MediaBoxDescription>
                                    物业前台：15391257468
                                </MediaBoxDescription>
                            </MediaBoxBody>
                        </MediaBox>
                    </PanelBody>
                </Panel>
                <Panel>
                    <Picker data={tags} cols={1} {...getFieldProps('tag')} value={this.state.tag} onChange={this.onPickerChange.bind(this)}>
                        <List.Item arrow="horizontal">评分</List.Item>
                    </Picker>
                </Panel>
                <Panel>
                    <List>
                        <TextareaItem
                            placeholder="请您对该次服务进行评价"
                            rows={5}
                            count={100}
                        />
                    </List>
                </Panel>
                <WingBlank>
                    <WhiteSpace size='lg'/>
                    <Button type='primary' style={{backgroundColor:'#00BB32'}} onClick={this.onSubmitButtonClick}>
                        提交评价
                    </Button>
                </WingBlank>
            </div>
        );
    }
}

export default createForm()(Evaluate);