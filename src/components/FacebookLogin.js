import React, { Component } from 'react';
//import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {firebaseCon} from '../connection';

class FacebookLoginButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidUpdate() {
        if(this.props.user) {
            if(this.props.user.uid !== "") {
                firebaseCon.content.get('users', { fields: [ 'facebookUserid', 'username' ] })
                .then((users) => {

                    // Iterate over users
                    let userList = [];
                    for (let user in users) {
                        userList.push(users[user]);
                    }

                    // Convert userObject to Array
                    const userArray = userList.map((user) => {
                        return user.facebookUserid
                    })

                    // If user doesn't exist, create it!
                    if(userArray.includes(this.props.user.uid) === false) {
                        firebaseCon.content.set('users', Date.now().toString(), { facebookUserid: this.props.user.uid, username: this.props.user.displayName, image: this.props.user.photoURL })
                        .then(() => console.log('Creating user..'))
                        .catch((e) => console.error(e));
                    }

                })
                .catch((error) => console.error(error));
            }
        }
    }
    
    // responseFacebook = (response) => {
    //     const userPictureArray = Object.values(this.props.picture)[0];
    //     this.setState({ 
    //         userPicture: userPictureArray.url,
    //         isLoggedIn: true
    //     }, this.componentDidUpdate);
    // }

    render() {
        // const isLoggedIn = this.state.isLoggedIn;
        // const greeting = isLoggedIn ? (
        //     <div><p>Hej {this.props.user.name}</p> <img src={this.state.userPicture} alt={this.props.user.name} /></div>
        // ) : (
        //     <FacebookLogin appId="1554227584702614" autoLoad fields="name,picture" callback={this.responseFacebook} render={renderProps => (<a onClick={renderProps.onClick}>Login with Facebook</a>)} />
        // );
		return (
            <div id="facebook-login">
                {this.props.user ? <img src={this.props.user.photoURL} alt={this.props.user.displayName} title={this.props.user.displayName} /> : ""}
                <p>{this.props.user ? "" : <a onClick={this.props.login.bind(this)}>Facebook</a>}</p>
            </div>
        )
    }
}

export default FacebookLoginButton;
