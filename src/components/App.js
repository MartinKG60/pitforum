import React, { Component } from 'react';
import Routes from '../router';
import firebase from 'firebase';
//import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
//import UserList from '../containers/user-list';

var config = {
	apiKey: "AIzaSyDQbnSX3eQ4M40cDptvZXd2XsBjqtIOdJI",
	authDomain: "pitforum-a0ca2.firebaseapp.com",
	databaseURL: "https://pitforum-a0ca2.firebaseio.com",
	projectId: "pitforum-a0ca2",
	storageBucket: "pitforum-a0ca2.appspot.com",
	messagingSenderId: "133198215359"
	};
firebase.initializeApp(config);

const provider = new firebase.auth.FacebookAuthProvider();

class App extends Component {

	constructor(props) {
        super(props);
        this.state = {
            user: null
		}
	}

	async componentWillMount() {
		await firebase.auth().onAuthStateChanged(user => {
			if (user) {
				// User is signed in.
				this.setState({user: user});
			}
		});
	}

	async login() {
		await firebase.auth().signInWithPopup(provider).then(result => {
			this.setState({user: result.user});
		}).catch(function(error) {
			console.log(error);
		});
	}

	async logout() {
		await firebase.auth().signOut();
		this.setState({user: null});
	}

	render() {
		return (
			<div>
				{/* <p>{this.state.user ? `Hi, ${this.state.user.displayName}!` : 'Hi!'}</p> */}
				{/* <button onClick={this.login.bind(this)}>Login with Facebook</button> */}
				<button className="x" onClick={this.logout.bind(this)}>Logout</button>
				{/* <FacebookLogin appId="1554227584702614" isDisabled autoLoad fields="id, name, picture" callback={this.responseFacebook} render={renderProps => (<a onClick={renderProps.onClick}>Login with Facebook</a>)} /> */}
				{/* <UserList /> */}
				<Routes user={this.state.user} login={this.login} />
			</div>
		);
	}
}

export default App;
