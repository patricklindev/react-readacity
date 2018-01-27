import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

const app = (
    <BrowserRouter>
        <Route to='/' component={App}/>
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
