import flamelink from 'flamelink';
import React, { Component } from 'react';

const firebaseCon = flamelink({
	apiKey: 'AIzaSyDQbnSX3eQ4M40cDptvZXd2XsBjqtIOdJI', // required
	authDomain: 'pitforum-a0ca2.firebaseapp.com', // required
	databaseURL: 'https://pitforum-a0ca2.firebaseio.com', // required
	projectId: 'pitforum-a0ca2', // required
	storageBucket: 'pitforum-a0ca2.appspot.com', // required
	messagingSenderId: '133198215359', // optional
});

class App extends Component {

	constructor() {
		super();
		this.state = {
	 		myData: []
		}
	}

	//async componentWillMount() {
		//const data = await firebaseCon.content.get('text', { fields: ['id', 'title'] });
		//firebaseCon.content.get('text', { fields: ['id', 'title'] }).then(function(data) {
			//console.log(data);
			//if(data) {
				//this.setState({
					//myData: data
				//});
			//}
		//});
	//}

	componentDidMount() {
		// fetch the project name, once it retrieves resolve the promsie and update the state. 
		//this.itemList().then(result => this.setState({
		this.itemList().then(items => {
			console.log(items)
			Object.keys(items).map(function (key) {
				console.log(items[key]);
				this.setState({
					myData: items[key]
				});
			});
		})
	}

	itemList() {
		const promise = firebaseCon.content.get('text', { fields: ['title'] });
		return promise;
	}
		
	render() {

		///firebaseCon.content.get('text', { fields: ['title'] }).then(results => {
			//console.log(results);
			//const items = Object.entries(results);
			//items.map(function(item, i) {
				//console.log(item[1].title);
				//<li key={i}>{item[1].title}</li>
				//return true;
			//});
		//})

		//const data = firebaseCon.content.get('text', { fields: ['id', 'title'] }).then(function(result) {
			//console.log(result)
			//result.map(function(item) {
				//return <li className="item" key={item.id}>{item.title}</li>;
			//});
		//});

		return (
			<div>
				<ul>
					{this.state.myData}
				</ul>
			</div>
		)
	}
}

export default App;
