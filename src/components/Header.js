import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

class Header extends Component {
	render() {

        
        const responseFacebook = (response) => {
            console.log(response.id);
            console.log(response.name);
        }

		return (
			<nav className="header">
                <div className="nav-wrapper">
                    <Link to='/' className="left brand-logo">
						X
					</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <FacebookLogin appId="1554227584702614" autoLoad callback={responseFacebook} render={renderProps => (<a onClick={renderProps.onClick}>Login with Facebook</a>)} />
                        </li>
                        <li>
                            <Link to="/item/list">List</Link>
                        </li>
                        <li>
                            <Link to="/item/list-live">List LIVE</Link>
                        </li>
                    </ul>
                </div>
            </nav>
		);
	}
}

export default Header;
