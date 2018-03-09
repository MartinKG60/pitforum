import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Front from './Front';
import List from './List';
import ListLive from './List-live';
import ItemDetail from './Item-detail';

class App extends Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<div className="container">
						<Header />
						<Route exact={true} path="/" component={Front} />
						<Route exact={true} path="/item/list" render={(props) => (
							<List updateItem={this.updateItem} />
						)}/>
						<Route exact={true} path="/item/list-live" render={(props) => (
							<ListLive />
						)}/>
						<Route exact={false} path="/item/detail/:itemid" component={ItemDetail}></Route>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
