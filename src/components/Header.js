import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FacebookLoginButton from './FacebookLogin';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: ""
        }
    }

	render() {
		return (
			<nav className="header">
                <div className="nav-wrapper">
                    <Link to='/' className="left brand-logo">
						X
					</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <FacebookLoginButton user={this.props.user} login={this.props.login} />
                        </li>
                    </ul>
                </div>
            </nav>
		);
	}
}

export default Header;
