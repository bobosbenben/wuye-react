import React, { Component } from 'react';
import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import {Gallery, GalleryDelete, Button} from 'react-weui';
// import imgSrc from '../static/clock.png';

const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
}];

class TuPian extends Component {

    constructor({match},props,context){
        super()
        console.log(match);
        console.log(props);
        this.state={
            match:match,
            files: data,
            showSingle: true
        }
        console.log('参fffff数：'); console.log(this.state.match.params.pid);
    }

    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }

    onBackButtonClick = ()=>{
        this.setState({ showSingle: false})
        this.props.history.goBack();
    }

    render() {
        let imgSrc = 'https://duobifuwu-1252535629.cos.ap-beijing.myqcloud.com/wuye/code-db-onRemove.png12623309346902421801-temp';
        const BackButtonStyle = {
            float: 'left',
            width: 'auto',
            color: 'white',
            border: 'none',
            // position: 'absolute',
            top: '0px',
            left: '15px'
        }
        const { files } = this.state;
        return (
            <Gallery src={imgSrc} show={this.state.showSingle}>
                <Button
                    style={BackButtonStyle}
                    // size="small"
                    onClick={this.onBackButtonClick}
                    plain
                >
                    返回
                </Button>
                {/*<GalleryDelete*/}
                    {/*onClick={ (e, i)=> alert('click deleted id:' + i) }*/}
                {/*/>*/}
            </Gallery>
        );
    }
}

export default TuPian;