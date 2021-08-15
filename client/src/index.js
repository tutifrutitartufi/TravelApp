import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxPromise from "redux-promise";

import Reducers from './reducers';
import App from './App';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(Reducers)}>
        <App />
    </Provider>,
    document.getElementById('root')
);
