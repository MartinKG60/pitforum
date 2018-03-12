import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Front from './Front';
//import ForumMainCategories from './ForumMainCategories';
import ForumSubCategories from './ForumSubCategories';

class App extends Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<div className="container">
						<Header />
						<Route exact={true} path="/" component={Front} />
						{/* <Route exact={true} path="/category/:itemid" render={(props) => (
							<ForumMainCategories />
						)}/> */}
						<Route exact={false} path="/forum/:maincatid" component={ForumSubCategories} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
