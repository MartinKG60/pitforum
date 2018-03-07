import React from 'react';
import {firebaseCon} from '../connection';

class ListLive extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			myLiveData: [],
        };
        
        this.updateItem = this.updateItem.bind(this);
	}

	componentDidMount() {
        // This is referring to the promise scope. Either use fat arrow functions (es6)
        // Or create a copy of this before the promise
        //var self = this;
        firebaseCon.content.subscribe('text', { fields: [ 'id', 'title' ] }, (error, items) => {
            if (error) {
                return console.error(error);
            }
            let dataLive = [];
            for (let item in items) {
                dataLive.push(items[item]);
            }
            this.setState({ myLiveData: dataLive });
        });
    }

    removeItem = (id) => {
		firebaseCon.content.remove('text', id)
		.then(() => console.log("Removed item.."))
  		.catch((e) => console.error(e));
	}
	
	updateItem(item) {
		this.props.updateItem(item);
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
        
        let itemList = this.state.myLiveData.map((item) =>{
			return (
				<li className="collection-item" id={item.id} key={item.id}>
					<div className="row">
                        <div className="col s10">
                            {item.title}
                        </div>
                        <div className="col s1">
                            <a className="btn-floating waves-effect waves-light red" style={aStyle} onClick={this.updateItem.bind(this, item)}>
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
			);
        });
        
        return (
            <div>
                <h5>Live data</h5>
                <ul className="collection">{itemList}</ul>
            </div>
        )
    }
}

export default ListLive;