import React from 'react';
import {firebaseCon} from '../connection';
import Parser from 'html-react-parser';
import ModalComp from './Modal';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

class ForumThread extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			forumthreadsubject: "",
			forumthreadtext: "",
            replies: []
        }

        this.textOnChange = this.textOnChange.bind(this);
    }

	componentDidMount(props) {
		firebaseCon.content.get('forumThreads', this.props.location.state.threadid, { fields: ['id', 'subject', 'text', 'categoryRelation'], populate: ['categoryRelation'] })
        .then((thread) => {
			this.setState({ forumthreadsubject: thread.subject });
			this.setState({ forumthreadtext: thread.text });
        })
        .catch((error) => console.error(error));

        firebaseCon.content.get('forumThreadReplies', { fields: ['id', 'text', 'threadRelation'], populate: ['threadRelation'] })
        .then((replies) => {
			const replyList = [];

			for (let reply in replies) {
				if(replies.hasOwnProperty(reply)) {

					// Convert categoryobject to array
                    const replyArray = replies[reply];

					// Get our thread
                    const replyRelations = replyArray.threadRelation;

					if(replyRelations !== undefined) {
						Object.keys(replyRelations).forEach((key) => {
							if(this.props.location.state.threadid === replyRelations[key].id) {
								replyList.push(replyArray);
								this.setState({ replies: replyList });
							}
						});
					}
				}
			}
			
        })
        .catch((error) => console.error(error));
    }
    
    textOnChange = (newThreadText) => {
        this.setState({ newThreadText: newThreadText });
	}
	
	addReply = (e) => {
		let textVal = this.state.newThreadText;

		if(textVal !== "") {
			firebaseCon.content.set('forumThreadReplies', Date.now().toString(), { text: textVal, threadRelation: this.props.location.state.threadid, userid: this.props.user.uid })
			.then(() => console.log('Setting'))
			.catch((e) => console.error(e));
			window.location.reload();
			//const modalBtn = document.querySelector(".modal-close");
			//modalBtn.click();
		} else {
			console.log("Not OK");
		}
	}

    render() {
        const replyList = this.state.replies.map((reply) => {
            return (
                <li id={reply.id} key={reply.id}>{Parser(reply.text)}</li>
            )
        });
        
        const modalContent = (
			<div className="modalContent">
				<h6>Du er ved at svare på en tråd</h6>
				<FroalaEditor tag='textarea' onModelChange={this.textOnChange} config={{placeholderText: 'Skriv noget tekst her', quickInsertButtons: [''], height: 200, toolbarButtons: ['bold', 'italic', 'underline', 'insertLink', 'emoticons']}} />
				<button onClick={this.addReply} className="waves-effect waves-light btn">Svar på tråd</button>
			</div>
        )
        
        return (
			<div>
				<h5>{this.state.forumthreadsubject}</h5>
                {Parser(this.state.forumthreadtext)}
                <hr />
                <h5>Svar {this.props.user ? <span className="floatRight"><ModalComp modalLinkText="Ny tråd" ModalContent={modalContent} /></span> : ""}</h5>
                <ul>{replyList}</ul>
			</div>
        )
    }
}

export default ForumThread;