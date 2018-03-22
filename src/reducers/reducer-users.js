import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

//export default function() {
    // return [
    //     {
    //         id: 1,
    //         first: "Bucky"
    //     },
    //     {
    //         id: 2,
    //         first: "Olga"
    //     }
    // ]

class FacebookLoginButton extends Component {

    responseFacebook = (response) => {
        console.log(response);
        return response;
    }

    render() {
        return (
            <div>
                <FacebookLogin appId="1554227584702614" autoLoad fields="name,picture" callback={this.responseFacebook} render={renderProps => (<a onClick={renderProps.onClick}>Login with Facebook</a>)} />
            </div>
        )
    }
}

export default FacebookLoginButton;
