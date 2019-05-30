import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Router } from "react-router-dom";
import LogRocket from "logrocket";
import { Provider } from "react-redux";
import setupLogRocketReact from "logrocket-react";
import store, { history } from "./configureStore";

setupLogRocketReact( LogRocket );

ReactDOM.render( <Provider store={ store }>
    <Router history={ history }>
        <App/>
    </Router>
</Provider>, document.getElementById( "root" ) );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
