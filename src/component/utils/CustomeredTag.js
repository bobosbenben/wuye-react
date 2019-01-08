import React, { Component } from 'react';
import '../css/CustomeredTag.css'

class CustomeredTag extends Component {

    constructor(props){
        super(props);
        this.state = {
            content: this.props.content,
            show: this.props.show
        };
    }

    render() {
        return (
            <div className={this.state.show===true?'show':'hide'}>
                <div style={{border: '1px solid red',borderRadius:'500px',backgroundColor:'red',color:'white',padding:'0px 5px 0px 5px',fontSize:'12px',lineHeight:'12px'}}>
                    {this.state.content}
                </div>
            </div>
        );
    }
}

export default CustomeredTag;