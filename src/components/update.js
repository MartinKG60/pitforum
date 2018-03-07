import React from 'react';
import {firebaseCon} from '../connection';

class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			title: props.item.title
        };

        this.handleChange = this.handleChange.bind(this);
    }

    updateItem(item) {
        let inputVal = document.getElementById("editData").value;
        firebaseCon.content.update('text', item.id, { title: inputVal })
        .then(() => console.log('Updating the entry succeeded'))
        .catch((e) => console.error(e));
    }

    handleChange(event) {
        console.log(event.target.value);
        this.setState({
            title: event.target.value
        });
    }

    render() {
        return (
            <div className="input-field col s6 updateItem">
                <i className="material-icons prefix">mode_edit</i>
                <input type="text" id="editData" value={this.state.title || ''} onChange={(e) => this.handleChange(e)} />
                <button className="waves-effect waves-light btn" onClick={this.updateItem.bind(this, this.props.item.id)}>UPDATE</button>
            </div>
        )
    }
}

export default Update
