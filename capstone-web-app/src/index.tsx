import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// @ts-ignore
import ScrollToTop from 'react-router-scroll-top'
import 'bootstrap/dist/css/bootstrap.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import CustomerRegistration from './Components/CustomerRegistration/CustomerRegistration';
import UserProfile from './Components/UserProfile/UserProfile';

const routing = (
    <Router>
        <Switch>
            <ScrollToTop>
                <Route exact path="/" component={App} />
                <Route exact path="/Register" component={CustomerRegistration} />
                <Route exact path="/UserProfile" component={UserProfile} />
            </ScrollToTop>
        </Switch>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
