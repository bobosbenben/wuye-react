import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserAgentCheck from './UserAgentCheck'
import * as serviceWorker from './serviceWorker';


let ua = navigator.userAgent.toLowerCase();
// let isWeixin = ua.indexOf('micromessenger') != -1;
let isWeixin = true;
if (isWeixin) {
    ReactDOM.render(<App />, document.getElementById('root'));
}else{
    ReactDOM.render(<UserAgentCheck/>,document.getElementById('root'));
}



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
