import React from 'react';
import {firebaseCon} from '../connection';

class Set extends React.Component {

    clickMe() {
        let inputVal = document.getElementById("setData").value;
        firebaseCon.content.set('text', '65431211xx', { id: '123456', title: inputVal })
        .then(() => console.log('Setting'))
        .catch((e) => console.error(e));
    }

    render() {
        return (
            <div>
                <label htmlFor="setData">Enter data</label>
                <input type="text" id="setData" />
                <button onClick={this.clickMe}>OK</button>
            </div>
        )
    }
}

export default Set;