import React, { Component } from 'react';
import { Result } from 'antd-mobile';
import '../css/ResultForProblemReportSuccess.css';

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" style={{height:'66px',width:'66px'}}/>;

class ResultForProblemReportSuccess extends Component {

    constructor(props){
        super(props);

        this.state = {
            openid: this.props.match.params.openid,
        }
    }

    onButtonClick = ()=>{
        // this.props.history.push()
        console.log('前往哪个页面呢？');
    };

    render() {
        return (
            <div style={{backgroundColor:'#fff',height:'100%'}}>
                <Result
                    img={myImg('https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg')}
                    title="等待处理"
                    message="报修申请已提交，等待物业处理"
                    buttonText="查看"
                    buttonType="primary"
                    style={{height: '100%'}}
                    onButtonClick={this.onButtonClick}
                />
            </div>
        );
    }
}

export default ResultForProblemReportSuccess;