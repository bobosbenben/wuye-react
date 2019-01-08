import React, { Component } from 'react';
import '../css/CustomeredTag.css'
import {Icon} from "antd-mobile";

class CustomeredRightArrow extends Component {

    constructor(props){
        super(props);
        this.state = {
            content: this.props.content,
            show: this.props.show
        };
    }

    render() {
        return (
            <div className={this.state.show===true?'show':'hide'} style={{paddingBottom:'15px'}}>
                <div style={{paddingRight:'20px',display:'flex',alignItems:'center',height:'100%'}}>
                    <Icon type="right" size="lg" color='#ccc'/>
                </div>
            </div>
        );
    }
}

export default CustomeredRightArrow;