require.include('./css/index.scss');
import fetch from 'isomorphic-fetch';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';

ReactDOM.render(<App />, document.getElementById('app'));
