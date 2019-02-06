import React, { Component } from 'react';
import './css/MineCommunity.css';
import CustomeredTag from './utils/CustomeredTag';
import { WhiteSpace, WingBlank, ListView, Button, Toast } from 'antd-mobile';
import 'whatwg-fetch';

let currentPageNum = 1;
class MineCommunity extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,//指定我们更新row的策略，一般来说都是prevRowData和nextRowData不相等时更新row
        });

        this.state = {
            dataSource,
            isLoading: true,
            showSingle: false,
            pageSize:10,
            hasMore: true,
            openid: this.props.match.params.openid,
            parameter: this.props.match.params.parameter,
            fromFaultReport: this.props.match.params.parameter === '1',
        };
        this._data = [];

    }

    componentDidMount() {
        this.fetchData(currentPageNum);
    }

    fetchData = (pageNum)=>{
        Toast.loading('正在加载我的房屋',0);
        this.setState({isLoading:true});
        fetch('http://192.168.2.126:7070/minecommunity/getminehouselist',{
            mode: "cors",
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                openid: this.state.openid,
                page:{
                    pageNo: pageNum,
                    pageSize: this.state.pageSize
                }
            })
        })
            .then(response => response.json())
            .then(data =>{
                if (data.success === true){
                    this._data = this._data.concat(data.data);
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this._data),
                        isLoading:false
                    });
                    if (data.total>pageNum*this.state.pageSize) this.setState({hasMore:false});
                    Toast.hide();
                }
                else {
                    this.setState({isLoading:false});
                    Toast.fail(data.msg,1,()=>{
                        Toast.hide();
                    })
                }
            })
            .catch(error =>{
                Toast.fail(error,1,()=>{
                    Toast.hide();
                });
                this.setState({isLoading:true});
                console.log('错误信息是：');console.log(error);
            });
    };

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        currentPageNum = currentPageNum + 1;
        this.fetchData(currentPageNum);
    };

    onAddCommunityButtonClick=()=>{
        let path = '/addminecommunity/1';//1表示新增我的房屋后需要跳转到报修页面
        this.props.history.push(path);
    };

    onUpdateCommunityButtonClick=(id)=>{
        let path = '/updateminecommunity/'+this.state.openid+'/'+this.state.parameter+'/'+id;
        this.props.history.push(path);
    };

    onChooseClick = (id)=>{
        console.log('选中了当前的记录: '+id);
        let path = '/baoxiu/'+this.state.openid+'/'+id;
        this.props.history.push(path);
    };

    render() {

        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            let showFlag = rowData.normalUsersDefaultAddress;

            return (
                <div key={rowID} style={{ padding: '0 15px' }} >
                    <div
                        style={{
                            lineHeight: '30px',
                            color: '#888',
                            fontSize: 12,
                            borderBottom: '1px solid #F6F6F6',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems:'center'
                        }}
                    >
                        <div>{rowData.community}</div>
                        <CustomeredTag content="默认" show={showFlag}/>
                    </div>
                    <div style={{ display: 'flex', padding: '15px 0' }}>
                        <img style={{ height: '64px', width:'80px',marginRight: '15px' }} src={rowData.communityImgUrl} alt="" onClick={this.onChooseClick.bind(this,rowData.id)}/>
                        <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                            <div style={{ lineHeight: 1 }} onClick={this.onChooseClick.bind(this,rowData.id)}>
                                <div style={{ marginBottom: '8px', fontWeight: 'bold', textAlign:'left' }}>{rowData.building+rowData.unit+rowData.room}</div>
                                <div><span style={{ fontSize: '16', color: '#999999' }}>联系方式：{rowData.phoneNumber}</span></div>
                            </div>
                            <WhiteSpace size="xs" onClick={this.onChooseClick.bind(this,rowData.id)}/>
                            <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                <div style={{width:'50%'}} onClick={this.onChooseClick.bind(this,rowData.id)} />
                                <Button type="ghost" size="small" onClick={this.onUpdateCommunityButtonClick.bind(this,rowData.id)}>修改</Button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        const header = () =>{
            return (
                <div style={{display:'flex',justifyContent:'left',alignItems:'center'}}>
                    <div style={{fontSize:'16px', fontWeight:'bold'}}>我的房屋</div>
                </div>
            );
        };

        return (
            <div>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderHeader={header}
                    // renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    //     {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    // </div>)}
                    renderRow={row}
                    renderSeparator={separator}
                    className="am-list"
                    pageSize={this.state.pageSize}
                    useBodyScroll
                    onScroll={() => { console.log('scroll'); }}
                    scrollRenderAheadDistance={500}
                    // onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                />
                <div>
                    <WingBlank>
                        <WhiteSpace/>
                        <WhiteSpace/>
                        <Button type='primary' style={{backgroundColor:'#00BB32'}} onClick={this.onAddCommunityButtonClick}>
                            新增我的房屋
                        </Button>
                        <WhiteSpace/>
                    </WingBlank>
                </div>
            </div>
        );
    }
}

export default MineCommunity;