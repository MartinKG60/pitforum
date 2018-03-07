import React, { Component } from 'react';
import List from './components/list';
import ListLive from './components/list-live';
import Set from './components/set';

class App extends Component {

	constructor() {
		super();
		this.updateItem = this.updateItem.bind(this);

		// getInitialState
		this.state = {
			item: {}
		}
	}

	updateItem(item) {
		this.setState({ item: item });
	}

	render() {
		return (
			<div>
				<nav>
					<div className="nav-wrapper">
					<a href="/" className="brand-logo">PITFORUM</a>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li><a href="/">LIST</a></li>
					</ul>
					</div>
				</nav>
				<div className="row">
					<div className="col s12">
						<div className="row">
							<div className="col s12">
								<Set item={this.state.item} />
							</div>
							<div className="col s6">
								<List updateItem={this.updateItem} />
							</div>
							<div className="col s6">
								<ListLive updateItem={this.updateItem} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
