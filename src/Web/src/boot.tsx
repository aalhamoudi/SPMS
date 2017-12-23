import './styles/app.css';
import 'bootstrap';
import 'materialize-css'
import 'font-awesome/css/font-awesome.css';
import 'react-hot-loader/patch';


import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";
import { createBrowserHistory } from 'history';

import { routes } from './routes';
import { stores } from './stores'

const history = createBrowserHistory();


function renderApp() {
    ReactDOM.render(
        <AppContainer>
            <Provider {...stores}>
                <Router children={routes} />
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    );
}

renderApp();

if (module.hot) {
    module.hot.accept(() => {
        renderApp();
    });
}