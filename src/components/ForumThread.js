import React from 'react';
import {firebaseCon} from '../connection';
import Parser from 'html-react-parser';

class ForumThread extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			forumthreadsubject: "",
			forumthreadtext: "",
            replies: []
        }
    }

	componentDidMount(props) {
		firebaseCon.content.get('forumThreds', this.props.location.state.threadid, { fields: ['id', 'subject', 'text', 'categoryRelation'], populate: ['categoryRelation'] })
        .then((thread) => {
			this.setState({ forumthreadsubject: thread.subject });
			this.setState({ forumthreadtext: thread.text });
        })
        .catch((error) => console.error(error));
	}

    render() {
        return (
			<div>
				<h5>{this.state.forumthreadsubject}</h5>
				{Parser(this.state.forumthreadtext)}
			</div>
        )
    }
}

export default ForumThread;