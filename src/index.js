import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import App from './App';
import './styles/reactDataTable.css';
import './styles/formio.css';


ReactDOM.render(
    <Suspense fallback="loading">
        <App />
    </Suspense>,
    document.getElementById('root') 
    );

