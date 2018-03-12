import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Front from './Front';

class App extends Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<div className="container">
						<Header />
						<Route exact={true} path="/" component={Front} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
