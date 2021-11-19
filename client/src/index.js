import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';

import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import App from './App';
// import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import ParksPage from './pages/ParksPage';
import SearchPage from './pages/SearchPage';
import TrailsPage from './pages/TrailsPage';
// import 'antd/dist/antd.css';

// import "bootstrap/dist/css/bootstrap.min.css";
// import "shards-ui/dist/css/shards.min.css"

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<App />
							)}/>
		<Route exact
							path="/map"
							render={() => (
								<MapPage />
							)}/>
        <Route exact
							path="/parks"
							render={() => (
								<ParksPage />
							)}/>
        <Route exact
							path="/search"
							render={() => (
								<SearchPage />
							)}/>
		<Route exact
							path="/trails"
							render={() => (
								<TrailsPage />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
