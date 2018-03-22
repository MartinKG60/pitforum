import React, { Component } from 'react';
import {connect} from 'react-redux';

class UserList extends Component {

    createListItems() {
        return this.props.users.map((user) => {
            return (
                <li key={user.id}>{user.first}</li>
            );
        });
    }

	render() {
        console.log(this.props.users);
		return (
			<div>
                <ul>
                    {this.createListItems()}
                </ul>
            </div>
		);
	}
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(UserList);
