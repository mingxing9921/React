import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './css/reset.css'
import './css/common.css'

//同步测试
ReactDOM.render(
    <App/>, document.getElementById('root'));
registerServiceWorker();
