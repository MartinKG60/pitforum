import React from 'react';
import {firebaseCon} from '../connection';

class Set extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			title: '',
        };
    }
    
    addItem = (e) => {
        let inputVal = document.getElementById("setData").value;
        firebaseCon.content.set('text', Date.now().toString(), { title: inputVal })
        .then(() => console.log('Setting'))
        .catch((e) => console.error(e));
        this.setState({ title: '' });
    }

    inputOnChange = (e) => {
        this.setState({ title: e.target.value });
    }

    render() {
        return (
            <div className="row">
                <div className="input-field col s12">
                    <i className="material-icons prefix">add</i>
                    <input placeholder="Insert data.." type="text" id="setData" value={this.state.title} onChange={this.inputOnChange} />
                    <button onClick={this.addItem} className="waves-effect waves-light btn">ADD</button>
                </div>
            </div>
        )
    }
}

export default Set;