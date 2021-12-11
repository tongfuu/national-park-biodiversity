import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import ReactTooltip from "react-tooltip";
// import { useState } from "react";

import * as serviceWorker from './serviceWorker';
// import MapChart from './pages/MapPage';

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


// function App2() {
// 	const [content, setContent] = useState("");
// 	return (
// 	  <div>
// 		<MapChart setTooltipContent={setContent} />
// 		<ReactTooltip>{content}</ReactTooltip>
// 	  </div>
// 	);
//   }


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

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

