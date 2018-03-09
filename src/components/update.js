import React from 'react';
import {firebaseCon} from '../connection';

class Update extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			title: ""
        };

        this.updateItem = this.updateItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            title: props.item.title
        });
    }

    updateItem(itemId) {
        let inputVal = document.getElementById("editData").value;
        firebaseCon.content.update('text', itemId, { title: inputVal })
        .then(() => {console.log('Updating the entry succeeded')
            this.setState({ title: "" });
        })
        .catch((e) => console.error(e));
    }

    handleChange(e) {
        var value = e.target.value;
        this.setState({ title: value });
    }

    render() {
        return (
            <div className="input-field col s12">
                <i className="material-icons prefix">mode_edit</i>
                <input type="text" id="editData" value={this.state.title || ""} onChange={this.handleChange} />
                <button className="waves-effect waves-light btn" onClick={this.updateItem.bind(this, this.props.item.id)}>UPDATE</button>
            </div>
        )
    }
}

export default Update
