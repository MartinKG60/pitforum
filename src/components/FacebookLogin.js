import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {firebaseCon} from '../connection';

class FacebookLoginButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            userName: "",
            userExist: true
        };
    }

	componentDidMount() {
        if(this.state.userId !== "") {
            firebaseCon.content.get('users', { fields: [ 'userid', 'username' ] })
            .then((users) => {

                // Iterate over users
                let userList = [];
                for (let user in users) {
                    userList.push(users[user]);
                }

                // Convert userObject to Array
                const userArray = userList.map((user) => {
                    return user.userid
                })

                //  Check if user exist in Firebase
                if(userArray.includes(this.state.userId) === false) {
                    console.log("User doesn't exist");
                    this.setState({
                        userExist: false
                    });
                }

                // If user doesn't exist, create it!
                if(this.state.userExist === false) {
                    firebaseCon.content.set('users', Date.now().toString(), { userid: this.state.userId, username: this.state.userName })
                    .then(() => console.log('Setting'))
                    .catch((e) => console.error(e));
                }

            })
            .catch((error) => console.error(error));
        }
    }
    
    responseFacebook = (response) => {
        this.setState({ 
            userId: response.id,
            userName: response.name
        }, this.componentDidMount);
    }

    render() {
		return (
            <div data-userid={this.state.userId} data-username={this.state.userName} data-userexist={this.state.userExist}>
                <FacebookLogin appId="1554227584702614" autoLoad callback={this.responseFacebook} render={renderProps => (<a onClick={renderProps.onClick}>Login with Facebook</a>)} />
            </div>
        )
    }
}

export default FacebookLoginButton;
