import React, { Component } from 'react';
import { WhiteSpace, ListView } from 'antd-mobile';
import { Popup, Gallery } from 'react-weui';

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
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        status: '已处理',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        id:3,
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: '2018-10-22 17:35:28',
        status: '已处理',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];

const NUM_ROWS = 10;
let pageIndex = 0;

function genData(pIndex = 0) {
    const dataBlob = {};
    for (let i = 0; i < NUM_ROWS; i++) {
        const ii = (pIndex * NUM_ROWS) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
}


class LieBiao extends Component {

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            showSingle: false
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
    }

    onRowClick=(rowId)=>{
        let path = '/detail/'+rowId;
        this.props.history.push(path);
        // this.setState({showSingle:true});
    }

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

            return (
                <div key={rowID} style={{ padding: '0 15px' }}  onClick={this.onRowClick.bind(this,rowID)}>
                    <div style={{display:'flex',justifyContent:'space-between',borderBottom: '1px solid #F6F6F6'}}>
                        <div
                            style={{
                                lineHeight: '30px',
                                color: '#888',
                                fontSize: 12,
                            }}
                        >{obj.title}</div>
                        <div>
                            <WhiteSpace size="sm" />
                            <h5 style={{color:'green'}}>{obj.status}</h5>
                        </div>
                    </div>
                    <div style={{ padding: '10px 0' }}>
                        <div style={{ lineHeight: 1 }}>
                            <div style={{ marginBottom: '8px',color:'#666',fontSize:14,lineHeight:'20px'}}>{obj.des}</div>
                        </div>
                        {/*<div style={{display:'flex', flexWrap:'wrap'}} onClick={this.onImageClick}>*/}
                            {/*<img style={{ maxHeight: '64px', marginRight: '10px',maxWidth:'100%' }} src={obj.img} alt="" />*/}
                            {/*<img style={{ maxHeight: '64px', marginRight: '10px',maxWidth:'100%' }} src={obj.img} alt="" />*/}
                            {/*<img style={{ maxHeight: '64px', marginRight: '10px',maxWidth:'100%' }} src={obj.img} alt="" />*/}
                            {/*<img style={{ maxHeight: '64px', marginRight: '0px',maxWidth:'100%' }} src={obj.img} alt="" />*/}
                        {/*</div>*/}
                    </div>
                </div>
            );
        };

        let imgSrc = 'https://duobifuwu-1252535629.cos.ap-beijing.myqcloud.com/ceshi.png';

        return (
            <div>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderHeader={() => <span>我的工单</span>}
                    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                        {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}
                    renderRow={row}
                    renderSeparator={separator}
                    className="am-list"
                    pageSize={4}
                    useBodyScroll
                    onScroll={() => { console.log('scroll'); }}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                />
                {/*<Popup*/}
                    {/*show={this.state.showSingle}*/}
                    {/*onRequestClose={e=>this.setState({showSingle: false})}*/}
                {/*>*/}
                    {/*<div style={{height: '80vh', overflow: 'scroll'}}>*/}
                        {/*<Gallery src={imgSrc} show={this.state.showSingle}/>*/}
                    {/*</div>*/}
                {/*</Popup>*/}
            </div>
        );
    }
}

export default LieBiao;