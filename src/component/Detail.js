import React, { Component } from 'react';
import {WingBlank, WhiteSpace} from 'antd-mobile';
import {Article, Cells, Cell, CellBody, CellFooter} from 'react-weui';
import './css/Detail.css';

class Detail extends Component {

    constructor({match},props,context){
        super();
        this.state={
            match:match,
            id:match.params.rowid
        }
        console.log('参数：'); console.log(this.state.match.params.rowid);
    }

    render() {
        const appMsgIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4YcfyR9x23Hw+/DY9dhm2WZG0kbT9NP0/PTL8sux7LFe115T1VM+zz7i+OIXxhes6qxr2mvA8MCe6J6M4oz6/frr+us5zjn2/fa67rqB4IF13XWn6ad83nxa1loqyirn+eccHxx4AAAC/klEQVRo3u2W2ZKiQBBF8wpCNSCyLwri7v//4bRIFVXoTBBB+DAReV5sG6lTXDITiGEYhmEYhmEYhmEYhmEY5v9i5fsZGRx9PyGDne8f6K9cfd+mKXe1yNG/0CcqYE86AkBMBh66f20deBc7wA/1WFiTwvSEpBMA2JJOBsSLxe/4QEEaJRrASP8EVF8Q74GbmevKg0saa0B8QbwBdjRyADYxIhqxAZ++IKYtciPXLQVG+imw+oo4Bu56rjEJ4GYsvPmKOAB+xlz7L5aevqUXuePWVhvWJ4eWiwUQ67mK51qPj4dFDMlRLBZTqF3SDvmr4BwtkECu5gHWPkmDfQh02WLxXuvbvC8ku8F57GsI5e0CmUwLz1kq3kD17R1In5816rGvQ5VMk5FEtIiWislTffuDpl/k/PzscdQsv8r9qWq4LRWX6tQYtTxvI3XyrwdyQxChXioOngH3dLgOFjk0all56XRi/wDFQrGQU3Os5t0wJu1GNtNKHdPqYaGYQuRDfbfDf26AGLYSyGS3ZAK4S8XuoAlxGSdYMKwqZKM9XJMtyqXi7HX/CiAZS6d8bSVUz5J36mEMFDTlAFQzxOT1dzLRljjB6+++ejFqka+mXIe6F59mw22OuOw1F4T6lg/9VjL1rLDoI9Xzl1MSYDNHnPQnt3D1EE7PrXjye/3pVpr1Z45hMUdcACc5NVQI0bOdS1WA0wuz73e7/5TNqBPhQXPEFGJNV2zNqWI7QKBd2Gn6AiBko02zuAOXeWIXjV0jNqdKegaE/kJQ6Bfs4aju04lMLkA2T5wBSYPKDGF3RKhFYEa6A1L1LG2yacmsaZ6YPOSAMKNsO+N5dNTfkc5Aqe26uxHpx7ZirvgCwJpWq/lmX1hA7LyabQ34tt5RiJKXSwQ+0KU0V5xg+hZrd4Bn1n4EID+WkQdgLfRNtvil9SPfwy+WQ7PFBWQz6dGWZBLkeJFXZGCfLUjCgGgqXo5TuSu3cugdcTv/HjqnBTEMwzAMwzAMwzAMwzAMw/zf/AFbXiOA6frlMAAAAABJRU5ErkJggg=="

        let evaluateHref = "/evaluatelist/" + this.state.id;

        return (
            <div>
                <WhiteSpace size="lg"/>
                <WingBlank>
                    <div style={{display:'flex', flexDirection: 'column'}}>
                        <div style={{display:'flex'}}>
                            <div>
                                <img src={appMsgIcon} style={{borderRadius:'40px'}} height="40px" width="40px" />
                            </div>
                            <div style={{display:'flex', flexDirection:'column', marginLeft:'10px', justifyContent:'center'}}>
                                <div style={{fontSize:'1.1em'}}>5号楼一单元903</div>
                                <div style={{fontSize:'0.9em', color:'#999999'}}>2018-09-28 13:19:35</div>
                            </div>
                        </div>
                        <div style={{backgroundColor:'#ffffff'}}>
                            <Article>
                                <section>
                                    <section>
                                        {/*<h3>H3 Heading</h3>*/}
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat. Duis aute</p>
                                        <p>
                                            <img src="https://duobifuwu-1252535629.cos.ap-beijing.myqcloud.com/wuye/code-db-onRemove.png12623309346902421801-temp" alt=""/>
                                            <img src="https://duobifuwu-1252535629.cos.ap-beijing.myqcloud.com/wuye/create-collection.png4795808656754779732-temp" alt=""/>
                                            <img src="https://duobifuwu-1252535629.cos.ap-beijing.myqcloud.com/ceshi.png" alt=""/>
                                        </p>
                                    </section>
                                </section>
                            </Article>
                        </div>
                        <div>
                            <Cells>
                                <Cell href={evaluateHref} access>
                                    <CellBody>工单状态</CellBody>
                                    <CellFooter>结单，请评价</CellFooter>
                                </Cell>
                            </Cells>
                        </div>
                        <WhiteSpace size="md"/>
                    </div>
                </WingBlank>
            </div>
        );
    }
}

export default Detail;