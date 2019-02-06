import React, { Component } from 'react';
import { Picker, List, InputItem, WhiteSpace, Button, WingBlank, Switch, Modal, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import {wrapedFetch} from "./utils/WrapedFetch";
const alert = Modal.alert;

class UpdateMineCommunity extends Component {

    constructor({match},props,context){
        super();
        this.state={
            match:match,
            id:match.params.id,
            parameter:match.params.parameter,
            openid: match.params.openid,
            name:null,
            phoneNumber:null,
            isDefaultAddress: false,
            currentDefaultProvinceAndCityIds: [],
            currentCountryAndTownIds: [],
            currentCommunity: [],
            currentBuildingAndUnitAndRoom: [],
            districts:[],
            countryAndTowns:[],
            communities:[],
            buildingsAndUnitsAndRooms:[],
        }
    }

    componentDidMount(){
        wrapedFetch('http://192.168.2.126:7070/minecommunity/getaddressinfo',{
                normalUserAddressId: this.state.id,
                openid: this.state.openid
        })
            .then(data =>{
                console.log(data);
                if (data.success===true){
                    this.setState({
                        name: data.data.name,
                        phoneNumber: data.data.phoneNumber,
                        isDefaultAddress: data.data.isDefaultAddress,
                        currentDefaultProvinceAndCityIds: data.data.defaultAddressInfo.defaultProvinceAndCityIds,
                        currentCountryAndTownIds: data.data.defaultAddressInfo.defaultCountryAndTowns,
                        currentCommunity: data.data.defaultAddressInfo.defaultCommunity,
                        currentBuildingAndUnitAndRoom: data.data.defaultAddressInfo.defaultBuildingAndUnitAndRoom,
                        districts: data.data.districts,
                        countryAndTowns: data.data.countryAndTowns,
                        communities: data.data.communities,
                        buildingsAndUnitsAndRooms: data.data.buildingsAndUnitsAndRooms
                    });
                }
                else {
                    Toast.fail(data.message,1,()=>{
                        // this.props.history.push('/minecommunity/'+this.state.openid+'/'+this.state.parameter);
                        window.location.href='http://192.168.2.126:3000/#/minecommunity/'+this.state.openid+'/'+this.state.parameter;
                    })
                }
            })
            .catch(error =>{
                console.log('错误信息是：');console.log(error);
            });
    }

    onDeleteButtonClick = ()=>{
        alert('删除', '确定删除该条小区房屋记录?', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: <span style={{color:'green'}}>确定</span>,
                onPress: () =>{
                    console.log('确定删除了');
                    wrapedFetch('http://192.168.2.126:7070/minecommunity/delete',{
                        normalUserAddressId: this.state.id,
                        openid: this.state.openid
                    })
                        .then(data=>{
                            if (data.success === true){
                                Toast.success(data.msg,1,()=>{
                                    // this.props.history.push('/minecommunity/'+this.state.openid+'/'+this.state.parameter);
                                    window.location.href='http://192.168.2.126:3000/#/minecommunity/'+this.state.openid+'/'+this.state.parameter;
                                })
                            }
                            else Toast.fail('删除失败',1);
                        })
                        .catch(error =>{
                            console.log('错误信息是：');console.log(error);
                        });
                }
            }
        ],'android')
    };

    onDistrictPickerOk = (e)=>{
        if (e[0] !== this.state.currentDefaultProvinceAndCityIds[0] || e[1] !== this.state.currentDefaultProvinceAndCityIds[1]){
            this.getCountryAndTownsByCityId(e[1]);
        }
        this.setState({
            currentDefaultProvinceAndCityIds:e,
            currentCountryAndTownIds: [],
            currentCommunity: [],
            currentBuildingAndUnitAndRoom: [],
            communities:[],
            buildingsAndUnitsAndRooms:[]
        });
    };

    onCountryPickerOk = (e)=>{
        if (e[0] !== this.state.currentCountryAndTownIds[0] || e[1] !== this.state.currentCountryAndTownIds[1]){
            this.getCommunityByTownId(e[1]);
        }
        this.setState({
            currentCountryAndTownIds: e,
            currentCommunity: [],
            currentBuildingAndUnitAndRoom: [],
            buildingsAndUnitsAndRooms:[]
        });
    };

    onCommunityPickerOk = (e)=>{
        if (e[0] !== this.state.currentCommunity[0] ){
            this.getRoomByCommunityId(e[0]);
        }
        this.setState({
            currentCommunity: e,
            currentBuildingAndUnitAndRoom: []
        });
    };

    onRoomPickerOk = (e)=>{
        this.setState({
            currentBuildingAndUnitAndRoom: e
        });
    };

    render() {

        const { getFieldProps } = this.props.form;

        const header = ()=>{
            return(
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{fontSize:'16px', fontWeight:'bold'}}>修改我的房屋</div>
                    <div>
                        <Button size="small" type="default" onClick={this.onDeleteButtonClick.bind(this)}>删除</Button>
                    </div>
                </div>
            );
        };

        return (
            <div>
                <div>
                    <List renderHeader={header}>
                        <InputItem {...getFieldProps('name',{initialValue:this.state.name})} placeholder="联系到您时怎么称呼您呢">
                            您的称呼：
                        </InputItem>
                        <InputItem {...getFieldProps('phoneNumber',{initialValue:this.state.phoneNumber}) } type="number" placeholder="用于报修时联系到您" >
                            联系方式：
                        </InputItem>
                        <Picker extra="请选择"
                                data={this.state.districts}
                                cols={2}
                                title="城市"
                                {...getFieldProps('district', {
                                    initialValue: this.state.currentDefaultProvinceAndCityIds
                                })}
                                onOk={this.onDistrictPickerOk.bind(this)}
                        >
                            <List.Item arrow="horizontal">城市</List.Item>
                        </Picker>
                        <Picker extra="请选择"
                                data={this.state.countryAndTowns}
                                disabled={!this.state.countryAndTowns.length>0}
                                cols={2}
                                title="县镇"
                                {...getFieldProps('country', {
                                    initialValue: this.state.currentCountryAndTownIds
                                })}
                                onOk={this.onCountryPickerOk.bind(this)}
                        >
                            <List.Item arrow="horizontal">县镇</List.Item>
                        </Picker>
                        <Picker
                            data={this.state.communities}
                            cols={1}
                            {...getFieldProps('community',{
                                initialValue: this.state.currentCommunity
                            })}
                            onOk={this.onCommunityPickerOk.bind(this)}
                        >
                            <List.Item arrow="horizontal">小区</List.Item>
                        </Picker>
                        <Picker extra="请选择(可选)"
                                data={this.state.buildingsAndUnitsAndRooms}
                                disabled={!this.state.buildingsAndUnitsAndRooms.length>0}
                                cols={3}
                                title="房号"
                                {...getFieldProps('room', {
                                    initialValue: this.state.currentBuildingAndUnitAndRoom
                                })}
                                onOk={this.onRoomPickerOk.bind(this)}
                        >
                            <List.Item arrow="horizontal">房号</List.Item>
                        </Picker>
                        <List.Item
                            extra={<Switch {...getFieldProps('isDefaultAddress', { initialValue: this.state.isDefaultAddress, valuePropName: 'checked' })} />}
                        >设为默认小区</List.Item>
                    </List>
                    <WingBlank>
                        <WhiteSpace/>
                        <WhiteSpace/>
                        <Button type="primary" style={{backgroundColor:'#00BB32'}}>保存并使用</Button>
                    </WingBlank>
                </div>
            </div>
        );
    }
}

export default createForm()(UpdateMineCommunity);