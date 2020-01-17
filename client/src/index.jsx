import React from 'react';
import ReactDOM from 'react-dom';
import movies from "../data/movieList.js";
import App from './components/App.jsx';

ReactDOM.render(<App movieList = {movies}/>, document.getElementById('app'));
