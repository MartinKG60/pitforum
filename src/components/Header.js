import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FacebookLoginButton from './FacebookLogin';

class Header extends Component {
	render() {
		return (
			<nav className="header">
                <div className="nav-wrapper">
                    <Link to='/' className="left brand-logo">
						X
					</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <FacebookLoginButton />
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
