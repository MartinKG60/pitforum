import React from 'react';
import {firebaseCon} from '../connection';

class Update extends React.Component {
    updateItem(itemId) {
        let inputVal = document.getElementById("editData").value;
        firebaseCon.content.update('text', itemId, { title: inputVal })
        .then(() => console.log('Updating the entry succeeded'))
        .catch((e) => console.error(e));
    }

    render() {
        return (
            <div className="input-field col s6 updateItem">
                <i className="material-icons prefix">mode_edit</i>
                <input type="text" id="editData" />
                <button className="waves-effect waves-light btn" onClick={this.updateItem.bind(this, this.props.itemId)}>UPDATE</button>
            </div>
        )
    }
}

export default Update
