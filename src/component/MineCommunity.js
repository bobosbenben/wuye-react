import React, { Component } from 'react';
import './css/MineCommunity.css';
import CustomeredTag from './utils/CustomeredTag';

import { WhiteSpace, WingBlank, ListView, Button, Tag } from 'antd-mobile';

const data = [
    {
        id: 1,
        img: 'https://duobifuwu-1252535629.cos.ap-beijing.myqcloud.com/ceshi.png',
        title: 'Meet hotel',
        status: '已处理',
        des: '不是所有的兼职汪都需要风吹日晒不是所有的兼职汪都需要风吹日晒不是所有的兼职汪都需要风吹日晒不是所有的兼职汪都需要风吹日晒',
    },
    {
        id:2,
        img: 'https://duobifuwu-1252535629.cos.ap-beijing.myqcloud.com/wuye/QQ%E6%88%AA%E5%9B%BE20181210210529.png',
        title: '东方纽蓝地小区',
        building: '11号楼2单元903室',
        phoneNumber: '0477-3965669'
    },
    {
        id:3,
        img: 'https://duobifuwu-1252535629.cos.ap-beijing.myqcloud.com/wuye/QQ%E6%88%AA%E5%9B%BE20181210210529.png',
        title: '万佳裕园小区',
        building: '5号楼1单元903室',
        phoneNumber: '0477-3965669',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];

const NUM_ROWS = 2;
let pageIndex = 0;

function genData(pIndex = 0) {
    const dataBlob = {};
    for (let i = 0; i < NUM_ROWS; i++) {
        const ii = (pIndex * NUM_ROWS) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
}


class MineCommunity extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            showSingle: false,
            fromFaultReport: this.props.location.state===undefined?false:this.props.location.state.fromFaultReport
        };

    }

    componentDidMount() {

        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);

        // simulate initial Ajax
        setTimeout(() => {
            this.rData = genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 600);
    }

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.rData = { ...this.rData, ...genData(++pageIndex) };
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
    };

    onAddCommunityButtonClick=()=>{
        let path = '/addminecommunity/'+this.state.fromFaultReport;
        this.props.history.push(path);
    };

    onUpdateCommunityButtonClick=(id)=>{
        let path = '/updateminecommunity/'+id;
        this.props.history.push(path);
    };

    onChooseClick = (id)=>{
        console.log('选中了当前的记录: '+id);
        let path = '/baoxiu/'+id;
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
        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            let showFlag = rowID==='0'?true:false;

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
                        <div>{obj.title}</div>
                        <CustomeredTag content="默认" show={showFlag}/>
                    </div>
                    <div style={{ display: 'flex', padding: '15px 0' }}>
                        <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" onClick={this.onChooseClick.bind(this,rowID)}/>
                        <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                            <div style={{ lineHeight: 1 }} onClick={this.onChooseClick.bind(this,rowID)}>
                                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.building}</div>
                                <div><span style={{ fontSize: '16', color: '#999999' }}>物业电话：{obj.phoneNumber}</span></div>
                            </div>
                            <WhiteSpace size="xs" onClick={this.onChooseClick.bind(this,rowID)}/>
                            <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                <div style={{width:'80%'}} onClick={this.onChooseClick.bind(this,rowID)}></div>
                                <Button type="ghost" size="small" onClick={this.onUpdateCommunityButtonClick.bind(this,rowID)}>修改</Button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        const header = () =>{
            return (
                <span>我的小区</span>
            );
        };

        let imgSrc = 'https://duobifuwu-1252535629.cos.ap-beijing.myqcloud.com/ceshi.png';

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
                    pageSize={4}
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
                            新增小区
                        </Button>
                        <WhiteSpace/>
                    </WingBlank>
                </div>
            </div>
        );
    }
}

export default MineCommunity;