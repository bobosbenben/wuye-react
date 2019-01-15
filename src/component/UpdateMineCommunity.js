import React, { Component } from 'react';
import { Picker, List, InputItem, WhiteSpace, Button, WingBlank, Switch, Modal } from 'antd-mobile';
import * as WeUI from 'react-weui';
import { createForm } from 'rc-form';
const WeUIButton = WeUI.Button;
const Dialog = WeUI.Dialog;
const alert = Modal.alert;

class UpdateMineCommunity extends Component {

    constructor({match},props,context){
        super();
        this.state={
            match:match,
            id:match.params.id,
            province: ['nmg'],
            city: ['eeds'],
            country: ['yjhlq'],
            town: ['azhen'],
            community: ['wanjiayuyuan'],
            name: '石伊波',
            phoneNumber: '16564585',
            deleteModalShow: false
        }
    }

    onDeleteButtonClick = ()=>{
        // alert('删除', '确定删除该条小区房屋记录?', [
        //     { text: '取消', onPress: () => console.log('cancel') },
        //     {
        //         text: '确定',
        //         onPress: () =>{
        //             console.log('确定删除了');
        //         }
        //     },
        // ])
        this.setState({
            deleteModalShow:true
        });
    };

    onMessageClick = ()=>{
        console.log('确定删除');
        this.setState({
            deleteModalShow:false
        });
    }

    hideDialog = ()=>{
        this.setState({
            deleteModalShow:false
        });
    }

    render() {

        const { getFieldProps } = this.props.form;

        let buttons= [
            {
                type: 'default',
                label: '取消',
                onClick: this.hideDialog.bind(this)
            },
            {
                type: 'primary',
                label: '确定',
                onClick: this.hideDialog.bind(this)
            }
        ]

        const country = [{
            label: '伊金霍洛旗',
            value: 'yjhlq',
            children: [
                {
                    label: '阿镇',
                    value: 'azhen'
                },
                {
                    label: '纳林希里',
                    value: 'nlxl'
                },
                {
                    label: '敏盖',
                    value: 'mg'
                }
            ]
        },{
            label: '东胜',
            value: 'ds',
            children:[
                {
                    label: '东胜',
                    value: 'ds2'
                },
                {
                    label: '罕台',
                    value: 'hantai'
                },
                {
                    label: '铜川',
                    value: 'tongchuan'
                }
            ]
        }];
        const community = [{
            label: '万佳裕园',
            value: 'wanjiayuyuan'
        },{
            label: '康馨苑',
            value: 'kangxinyuan'
        }];
        const district = [
            {
                label: '内蒙古',
                value: 'nmg',
                children: [
                    {
                        label: '鄂尔多斯',
                        value: 'eeds',
                    }
                ]
            },
        ];
        const room = [
            {
                label: '5号楼',
                value: 'building-5',
                children: [
                    {
                        label: '1单元',
                        value: 'unit-1',
                        children: [
                            {
                                label: '903',
                                value: 'room-903'
                            },
                            {
                                label: '902',
                                value: 'room-902'
                            }
                        ]
                    },
                    {
                        label: '2单元',
                        value: 'unit-2',
                        children: [
                            {
                                label: '903',
                                value: 'room-903'
                            }
                        ]
                    }
                ]
            },
            {
                label: '11号楼',
                value: 'building-11',
                children: [
                    {
                        label: '1单元',
                        value: 'unit-1',
                        children: [
                            {
                                label: '903',
                                value: 'room-903'
                            },
                            {
                                label: '902',
                                value: 'room-902'
                            }
                        ]
                    },
                    {
                        label: '2单元',
                        value: 'unit-2',
                        children: [
                            {
                                label: '903',
                                value: 'room-903'
                            }
                        ]
                    }
                ]
            }
        ];

        const header = ()=>{
            return(
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{fontSize:'16px'}}>修改</div>
                    <div>
                        <WeUIButton type="default" size="small" onClick={this.onDeleteButtonClick.bind(this)}>删除</WeUIButton>
                    </div>
                </div>
            );
        };

        return (
            <div>
                <div>
                    <List renderHeader={header}>
                        <InputItem {...getFieldProps('name',{initialValue:this.state.name})} placeholder="联系到您时怎么称呼您呢">
                            您的昵称：
                        </InputItem>
                        <InputItem {...getFieldProps('phoneNumber',{initialValue:this.state.phoneNumber}) } type="number" placeholder="用于报修时联系到您" >
                            联系方式：
                        </InputItem>
                        <Picker extra="请选择(可选)"
                                data={district}
                                cols={2}
                                title="城市"
                                {...getFieldProps('district', {
                                    initialValue: ['nmg', 'eeds'],
                                })}
                                onOk={e => console.log('ok', e)}
                                onDismiss={e => console.log('dismiss', e)}
                        >
                            <List.Item arrow="horizontal">城市</List.Item>
                        </Picker>
                        <Picker extra="请选择(可选)"
                                data={country}
                                cols={2}
                                title="县镇"
                                {...getFieldProps('district', {
                                    initialValue: ['yjhlq', 'azhen'],
                                })}
                                onOk={e => console.log('ok', e)}
                                onDismiss={e => console.log('dismiss', e)}
                        >
                            <List.Item arrow="horizontal">县镇</List.Item>
                        </Picker>
                        <Picker data={community} cols={1} {...getFieldProps('community')} value={this.state.community} onChange={this.onPickerChange}>
                            <List.Item arrow="horizontal">小区</List.Item>
                        </Picker>
                        <Picker extra="请选择(可选)"
                                data={room}
                                cols={3}
                                title="房号"
                                {...getFieldProps('room', {
                                    initialValue: ['building-5', 'unit-1','room-903'],
                                })}
                                onOk={e => console.log('ok', e)}
                                onDismiss={e => console.log('dismiss', e)}
                        >
                            <List.Item arrow="horizontal">房号</List.Item>
                        </Picker>
                        <List.Item
                            extra={<Switch {...getFieldProps('1', { initialValue: true, valuePropName: 'checked' })} />}
                        >设为默认小区</List.Item>
                    </List>
                    <WingBlank>
                        <WhiteSpace/>
                        <WhiteSpace/>
                        <Button type="primary" style={{backgroundColor:'#00BB32'}}>保存并使用</Button>
                    </WingBlank>
                </div>
                <Dialog
                    type="android"
                    show={this.state.deleteModalShow}
                    title="删除"
                    buttons={buttons}
                >
                    确定删除该条小区房屋记录?
                </Dialog>
            </div>
        );
    }
}

export default createForm()(UpdateMineCommunity);