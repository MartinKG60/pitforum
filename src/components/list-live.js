import React from 'react';
import {firebaseCon} from '../connection';

class ListLive extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			myLiveData: [],
		};
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
    
    render() {

        let itemList = this.state.myLiveData.map(function(item) {
			return (
				<li className="collection-item scale-transition scale-in" id={item.id} key={item.id}>
					{item.title}
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