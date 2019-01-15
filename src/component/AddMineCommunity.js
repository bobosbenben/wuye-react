import React, { Component } from 'react';
import { Picker, List, InputItem, WhiteSpace, Button, WingBlank, Switch } from 'antd-mobile';
import { createForm } from 'rc-form';

class AddMineCommunity extends Component {

    constructor(props){
        super(props);

        this.state = {
            province: ['nmg'],
            city: ['eeds'],
            country: ['yjhlq'],
            town: ['altxrz'],
            community: ['wanjiayuyuan'],
            fromFaultReport: this.props.match.params.fromfaultreport
        }
    }

    componentDidMount() {
        console.log(this.state.fromFaultReport);
    }

    onSaveButtonClick = ()=>{
        if (this.state.fromFaultReport){
            //先提交内容到后台，然后跳转到报修页面
            //此处需先把内容提交到后台
            this.props.history.push('/baoxiu/1');
        }
    };

    render() {
        const { getFieldProps } = this.props.form;

        const country = [{
            label: '伊金霍洛旗',
            value: 'yjhlq',
            children: [
                {
                    label: '阿镇',
                    value: 'altxrz'
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
                <div style={{display:'flex',justifyContent:'left',alignItems:'center'}}>
                    <div style={{fontSize:'16px'}}>新增我的小区</div>
                </div>
            );
        };

        return (
            <div>
                <div>
                    <List renderHeader={header}>
                        <InputItem {...getFieldProps('customerName')} placeholder="联系到您时怎么称呼您呢">
                            您的姓名：
                        </InputItem>
                        <InputItem {...getFieldProps('password')} placeholder="用于报修时联系到您">
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
                        <Button type="primary" style={{backgroundColor:'#00BB32'}} onClick={this.onSaveButtonClick.bind(this)}>保存并使用</Button>
                    </WingBlank>
                </div>
            </div>
        );
    }
}

export default createForm()(AddMineCommunity);