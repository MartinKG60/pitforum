import flamelink from 'flamelink';
import React, { Component } from 'react';

const firebaseCon = flamelink({
	apiKey: 'AIzaSyDQbnSX3eQ4M40cDptvZXd2XsBjqtIOdJI', // required
	authDomain: 'pitforum-a0ca2.firebaseapp.com', // required
	databaseURL: 'https://pitforum-a0ca2.firebaseio.com', // required
	projectId: 'pitforum-a0ca2', // required
	storageBucket: 'pitforum-a0ca2.appspot.com', // required
	messagingSenderId: '133198215359', // optional
});

class Text extends React.Component {

    render() {

        function RenderText(props) {
            firebaseCon.content.get('text', { fields: ['title'] }).then(results => {
                //console.log(results);
                const items = Object.entries(results);
                items.map((item, i) =>
                    //console.log(item[1].title)
                    <li key={i}>{item[1].title}</li>
                );
            });
            return true;
        }

        return (
            <ul>
                <RenderText />
            </ul>
        )
    }
}

export default Text;
