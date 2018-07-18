import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import AppNoJSX from './App.noJSX';
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render( <App />, 
                document.getElementById('root'));
registerServiceWorker();
