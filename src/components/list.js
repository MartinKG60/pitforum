import React from 'react';
import {firebaseCon} from '../connection';

class List extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			myData: []
		};

		this.updateItem = this.updateItem.bind(this);
	}

	componentDidMount() {
        firebaseCon.content.get('text', { fields: ['id', 'title'] })
        .then((items) => {
			let data = [];
			for (let item in items) {
				data.push(items[item]);
			}
			this.setState({ myData: data });
        })
        .catch(() => console.error('Something went wront'));
	}

	removeItem = (id) => {
		firebaseCon.content.remove('text', id)
		.then(() => console.log("Removed item.."))
  		.catch((e) => console.error(e));
	}
	
	updateItem(itemId) {
		this.props.updateItem(itemId);
	}
    
    render() {

		var aStyle = {
			width: "20px",
			height: "20px",
			lineHeight: "20px"
		};
		var iconStyle = {
			fontSize: "10px",
			lineHeight: "20px"
		}

        let itemList = this.state.myData.map((item) => {
			return (
				<li className="collection-item" id={item.id} key={item.id}>
					<div className="row">
						<div className="col s10">
							{item.title}
						</div>
						<div className="col s1">
							<a className="btn-floating waves-effect waves-light red" style={aStyle} onClick={this.updateItem.bind(this, item.id)}>
								<i className="tiny material-icons" style={iconStyle}>edit</i>
							</a>
						</div>
						<div className="col s1">
							<a className="btn-floating waves-effect waves-light red" style={aStyle} onClick={this.removeItem.bind(this, item.id)}>
								<i className="tiny material-icons" style={iconStyle}>delete</i>
							</a>
						</div>
					</div>
				</li>
			)
		});
        
        return (
			<div>
				<h5>Data</h5>
            	<ul className="collection">{itemList}</ul>
			</div>
        )
    }
}

export default List;