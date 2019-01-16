import React, { Component } from 'react';
import { Picker, List, InputItem, WhiteSpace, Button, WingBlank, Switch } from 'antd-mobile';
import { createForm } from 'rc-form';
import 'whatwg-fetch';

class AddMineCommunity extends Component {

    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            fromFaultReport: this.props.match.params.parameter === '1',
            openid: this.props.match.params.openid,
            currentDefaultProvinceAndCityIds: ['2','3'],
            currentCountryAndTownIds: [],
            currentCommunity: [],
            currentBuildingAndUnitAndRoom: [],
            districts:[],
            countryAndTowns:[],
            communities:[],
            buildingsAndUnitsAndRooms:[],
        }
    }

    componentDidMount() {
        console.log(this.state.fromFaultReport);
        this.setState({
            isLoading:true
        });

        fetch('/apis/minecommunity/getdistrict',{
            mode: "cors",
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    districts:data
                });
                console.log(data);
            })
            .catch(error =>{
                console.log('错误信息是：');console.log(error);
            });
        this.setState({
            isLoading: false,
        });

        this.getCountryAndTownsByCityId(this.state.currentDefaultProvinceAndCityIds[1]);
    }

    getCountryAndTownsByCityId = (cityId) =>{
        this.setState({
            isLoading:true
        });

        fetch('/apis/minecommunity/getcountry',{
            mode: "cors",
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cityId: cityId
            })
        })
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    countryAndTowns:data
                });
            })
            .catch(error =>{
                console.log('错误信息是：');console.log(error);
            });
        this.setState({
            isLoading: false,
        });
    };

    getCommunityByTownId = (townId) =>{
        this.setState({
            isLoading:true
        });

        fetch('/apis/minecommunity/getcommunity',{
            mode: "cors",
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                townId: townId
            })
        })
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    communities:data
                });
            })
            .catch(error =>{
                console.log('错误信息是：');console.log(error);
            });
        this.setState({
            isLoading: false,
        });
    };

    getRoomByCommunityId = (communityId) =>{
        this.setState({
            isLoading:true
        });

        fetch('/apis/minecommunity/getroom',{
            mode: "cors",
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                communityId: communityId
            })
        })
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    buildingsAndUnitsAndRooms: data
                });
            })
            .catch(error =>{
                console.log('错误信息是：');console.log(error);
            });
        this.setState({
            isLoading: false,
        });
    };

    onSaveButtonClick = ()=>{
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch('/apis/minecommunity/new',{
                    mode: "cors",
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        openid: this.state.openid,
                        customerName: values.customerName,
                        phoneNumber: values.phoneNumber,
                        provinceEntityId: this.state.currentDefaultProvinceAndCityIds[0],
                        cityEntityId: this.state.currentDefaultProvinceAndCityIds[1],
                        countryOrDistrictEntityId: this.state.currentCountryAndTownIds[0],
                        townEntityId: this.state.currentCountryAndTownIds[1],
                        communityEntityId: this.state.currentCommunity[0],
                        buildingEntityId: this.state.currentBuildingAndUnitAndRoom[0],
                        unitEntityId: this.state.currentBuildingAndUnitAndRoom[1],
                        roomEntityId: this.state.currentBuildingAndUnitAndRoom[2],
                        normalUsersDefaultAddress: values.isDefaultAddress
                    })
                })
                    .then(response => response.json())
                    .then(data =>{

                    })
                    .catch(error =>{
                        console.log('错误信息是：');console.log(error);
                    });


            }

        });

        // if (this.state.fromFaultReport){
            //先提交内容到后台，然后跳转到报修页面
            //此处需先把内容提交到后台
            // this.props.history.push('/baoxiu/'+this.state.openid);
        // }
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
                            您的称谓：
                        </InputItem>
                        <InputItem {...getFieldProps('phoneNumber')} placeholder="用于报修时联系到您">
                            联系方式：
                        </InputItem>
                        <Picker extra="请选择"
                                data={this.state.districts}
                                disabled={!this.state.districts.length>0}
                                cols={2}
                                title="城市"
                                {...getFieldProps('district', {
                                    initialValue: this.state.currentDefaultProvinceAndCityIds,
                                })}
                                onOk={this.onDistrictPickerOk.bind(this)}
                                // onDismiss={e => console.log('dismiss', e)}
                        >
                            <List.Item arrow="horizontal">城市</List.Item>
                        </Picker>
                        <Picker extra="请选择"
                                data={this.state.countryAndTowns}
                                disabled={!this.state.countryAndTowns.length>0}
                                cols={2}
                                title="县镇"
                                {...getFieldProps('country', {
                                })}
                                onOk={this.onCountryPickerOk.bind(this)}
                        >
                            <List.Item arrow="horizontal">县镇</List.Item>
                        </Picker>
                        <Picker
                            data={this.state.communities}
                            cols={1}
                            disabled={!this.state.communities.length>0}
                            {...getFieldProps('community')}
                            // value={this.state.community}
                            // onChange={this.onPickerChange}
                            onOk={this.onCommunityPickerOk.bind(this)}
                        >
                            <List.Item arrow="horizontal">小区</List.Item>
                        </Picker>
                        <Picker extra="请选择"
                                data={this.state.buildingsAndUnitsAndRooms}
                                disabled={!this.state.buildingsAndUnitsAndRooms.length>0}
                                cols={3}
                                title="房号"
                                {...getFieldProps('room', {
                                })}
                                onOk={this.onRoomPickerOk.bind(this)}
                        >
                            <List.Item arrow="horizontal">房号</List.Item>
                        </Picker>
                        <List.Item
                            extra={<Switch {...getFieldProps('isDefaultAddress', { initialValue: true, valuePropName: 'checked' })} />}
                        >设为默认小区</List.Item>
                    </List>
                    <WingBlank>
                        <WhiteSpace/>
                        <WhiteSpace/>
                        <Button type="primary" disabled={!(this.state.currentDefaultProvinceAndCityIds.length>0 && this.state.currentCountryAndTownIds.length>0 && this.state.currentCommunity.length>0 && this.state.currentBuildingAndUnitAndRoom.length>0)} style={{backgroundColor:'#00BB32'}} onClick={this.onSaveButtonClick.bind(this)}>保存并使用</Button>
                    </WingBlank>
                </div>
            </div>
        );
    }
}

export default createForm()(AddMineCommunity);