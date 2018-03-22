import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import './styles/main.css';

import React from 'react';
import ReactDOM from 'react-dom';

// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
//import allReducers from './reducers'

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

//const store = createStore(allReducers);

// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
