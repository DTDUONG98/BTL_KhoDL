import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Route, Router, browserHistory } from '../node_modules/react-router';
import './index.css';


import Major0 from './Major0'
import Major1 from './Major1'
import Major2 from './Major2'
import Major3 from './Major3'
import Major4 from './Major4'
import Major5 from './Major5'
import Major6 from './Major6'
import Major7 from './Major7'
import Major8 from './Major8'
import Major9 from './Major9'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/> 
        {/* <Route exact path="/" component={Major0} /> */}
        <Route exact path="/" component={Major1} />
        <Route exact path="/Major2/:id" component={Major2} />
        <Route exact path="/Major3/:id" component={Major3} />
        <Route exact path="/Major4/:id" component={Major4} />
        <Route exact path="/Major5/:id" component={Major5} />
        <Route exact path="/Major6/:id" component={Major6} />
        <Route exact path="/Major7/:id" component={Major7} />
        <Route exact path="/Major8/:id" component={Major8} />
        <Route exact path="/Major9/:id" component={Major9} />
    </BrowserRouter>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
