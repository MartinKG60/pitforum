import React from 'react';
import {firebaseCon} from '../connection';

class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			title: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            title: props.item.title
        });
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
            title: event.currentTarget.value
        });
    }

    render() {
        return (
            <div className="input-field col s6 updateItem">
                <i className="material-icons prefix">mode_edit</i>
                <input type="text" id="editData" value={this.state.title || ""} onChange={this.handleChange} />
                <button className="waves-effect waves-light btn" onClick={this.updateItem.bind(this, this.props.item)}>UPDATE</button>
            </div>
        )
    }
}

export default Update
