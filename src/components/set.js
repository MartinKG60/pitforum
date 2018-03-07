import React from 'react';
import {firebaseCon} from '../connection';
import Update from './update'

class Set extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			value: '',
        };
    }
    
    addItem = (e) => {
        let inputVal = document.getElementById("setData").value;
        firebaseCon.content.set('text', Date.now().toString(), { title: inputVal })
        .then(() => console.log('Setting'))
        .catch((e) => console.error(e));
        this.setState({ value: '' });
    }

    inputOnChange = (e) => {
        this.setState({ value: e.target.value });
    }

    render() {
        return (
            <div className="row">
                <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">add</i>
                        <input placeholder="Insert data.." type="text" id="setData" value={this.state.value} onChange={this.inputOnChange} />
                        <button onClick={this.addItem} className="waves-effect waves-light btn">ADD</button>
                    </div>
                    <Update itemId={this.props.itemId} />
                </div>
            </div>
        )
    }
}

export default Set;