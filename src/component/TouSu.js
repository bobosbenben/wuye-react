import React, { Component } from 'react';
import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';

const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
}];

class TouSu extends Component {
    state = {
        files: data,
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }


    render() {
        const { files } = this.state;
        return (
            <WingBlank>

                <ImagePicker
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 7}
                    multiple={true}
                />
            </WingBlank>
        );
    }
}

export default TouSu;