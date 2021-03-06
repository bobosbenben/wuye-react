import React, { Component } from 'react';
import './App.css';
import BaoXiu from './component/BaoXiu.js';
import TouSu from  './component/TouSu';
import XinXi from './component/XinXi';
import LieBiao from './component/LieBiao';
import HomePage from './component/HomePage';
import TuPian from './component/TuPian';
import Detail from './component/Detail';
import EvaluateList from './component/EvaluateList';
import Evaluate from "./component/Evaluate";
import MineCommunity from './component/MineCommunity';
import AddMineCommunity from './component/AddMineCommunity';
import UpdateMineCommunity from './component/UpdateMineCommunity';
import ResultForProblemReportSuccess from './component/utils/ResultForProblemReportSuccess';

import {Route, Switch, Redirect, HashRouter} from 'react-router-dom';

const PrimaryLayout = () => (
    <div className="primary-layout" style={{height:'100%'}}>
        {/*<header> Our React Router 4 App </header>*/}
        <main style={{height: '100%'}}>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/baoxiu/:openid?/:addressid?" exact component={BaoXiu} />
                <Route path="/tousu" component={TouSu} />
                <Route path="/xinxi" component={XinXi} />
                <Route path="/liebiao" component={LieBiao} />
                <Route path="/tupian/:pid" component={TuPian}/>
                <Route path={"/detail/:rowid"} component={Detail}/>
                <Route path={"/evaluatelist/:id"} component={EvaluateList}/>
                <Route path={"/evaluate/:rowid"} component={Evaluate} />
                <Route path={"/minecommunity/:openid?/:parameter?"} component={MineCommunity}/>
                <Route path="/addminecommunity/:openid?/:parameter?" component={AddMineCommunity}/>
                <Route path={"/updateminecommunity/:openid?/:parameter?/:id?"} component={UpdateMineCommunity}/>
                <Route path={"/problemreportsuccess/:openid"} component={ResultForProblemReportSuccess} />
                <Redirect to="/"/>
            </Switch>
        </main>
    </div>
);

class App extends Component {
    render() {
        return (
            <div className="App">
                <HashRouter>
                    <PrimaryLayout/>
                </HashRouter>
            </div>
        );
    }
}

export default App;