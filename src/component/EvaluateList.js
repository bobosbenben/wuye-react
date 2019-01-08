import React, { Component } from 'react';
import { ListView, Button, WhiteSpace } from 'antd-mobile';

const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: '张保安',
        des: '保安：15326978295',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: '李师傅',
        des: '水暖师傅：18648713667',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: '小赵',
        des: '物业前台：15124875234',
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


class EvaluateList extends Component {

    constructor({match},props,context){
        super();

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state={
            match:match,
            dataSource,
            isLoading: true,
            hasMore: true
        };
        console.log('evaluate参数：'); console.log(this.state.match.params.id);
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

    onEvaluateButtonClick = (rowId)=>{
        let path = '/evaluate/'+rowId;
        this.props.history.push(path);
    };

    onEndReached = (event) => {
        console.log('reach end', pageIndex);
        if (pageIndex === 2) {
            this.setState({
                hasMore:false
            });
            return;
        }
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.rData = { ...this.rData, ...genData(++pageIndex) };
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
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
            return (
                <div key={rowID} style={{ padding: '0 15px' }}>
                    <div style={{ display: 'flex', padding: '15px 0' }}>
                        <img style={{ height: '80px', marginRight: '15px' }} src={obj.img} alt="" />
                        <div style={{ lineHeight: 1,width:'100%'}}>
                            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.title}</div>
                            <div><span style={{ fontSize: '0.8em', color: '#aaaaaa' }}>{obj.des}</span></div>
                            <WhiteSpace size="xs"/>
                            <div style={{display:'flex',justifyContent:'flex-end'}}>
                                <Button inline size="small" style={{ marginRight:'4px'}} onClick={this.onEvaluateButtonClick.bind(this,rowID)}>去评价</Button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderHeader={() => <span>本次服务由以下人员为您提供</span>}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? '加载中...' : this.state.hasMore?'上拉加载':'没有啦'}
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
        );
    }
}

export default EvaluateList;