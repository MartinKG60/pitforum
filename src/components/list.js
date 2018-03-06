import React from 'react';
import {firebaseCon} from '../connection';

class List extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			myData: [],
		};
	}

	componentDidMount() {
        firebaseCon.content.get('text', { fields: ['id', 'title'] })
        .then(items => {
			let data = [];
			for (let item in items) {
				data.push(items[item]);
			}
			this.setState({ myData: data });
        })
        .catch(() => console.error('Something went wront'));
    }
    
    render() {

        let itemList = this.state.myData.map(function(item) {
			return (
				<li className="item" id={item.id} key={item.id}>
					{item.title}
				</li>
			);
        });
        
        return (
            <ul>{itemList}</ul>
        )
    }
}

export default List;