import React from 'react';
import {firebaseCon} from '../connection';

class ItemDetail extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			title: []
        };
    }

	componentDidMount() {
		firebaseCon.content.get('text', this.props.match.params.itemid, { fields: [ 'title' ] })
		.then((items) => {
			let data = [];
			for (let item in items) {
				data.push(items[item]);
			}
			this.setState({ title: data });
        })
		.catch(error => console.error(error));
	}

    render() {
        return (
            <div className="row">
                <div className="col s6">
					<h2>
                    	Item detail
					</h2>
					<p>Title: {this.state.title}</p>
                </div>
            </div>
        )
    }
}

export default ItemDetail;
