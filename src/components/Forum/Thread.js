import React from 'react';
import { firebaseCon } from '../../connection';
import Parser from 'html-react-parser';
import ModalComp from '../Modal';
import DateFormat from 'dateformat';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

DateFormat.i18n = {
	dayNames: [
		'Søn', 'Man', 'Tir', 'Ons', 'Tors', 'Fre', 'Lør',
		'Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'
	],
	monthNames: [
		'Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec',
		'Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'
	],
	timeNames: [
		'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
	]
};

class ForumThread extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			facebookuserid: "",
			userid: "",
			threadusername: "",
			threaduserimage: "",
			threaddatecreated: "",
			forumthreadsubject: "",
			forumthreadtext: "",
            replies: []
        }

		this.textOnChange = this.textOnChange.bind(this);
    }

	componentDidMount(props) {
		firebaseCon.content.get('forumThreads', this.props.location.state.threadid, { fields: ['id', 'subject', 'text', 'dateCreated', 'userRelation'], 
			populate: [
				{
					field: 'userRelation',
					fields: ['username', 'image']
				}
			]
		})
        .then((thread) => {
			this.setState({ forumthreadsubject: thread.subject });
			this.setState({ forumthreadtext: thread.text });
			this.setState({ threaddatecreated: thread.dateCreated });
			this.setState({ threadusername: thread.userRelation[0].username });
			this.setState({ threaduserimage: thread.userRelation[0].image });
        })
        .catch((error) => console.error(error));

		firebaseCon.content.get('forumThreadReplies', { fields: ['id', 'text', 'threadRelation', 'userRelation'], 
			populate: [
				{
					field: 'threadRelation',
					fields: ['id']
				},
				{
					field: 'userRelation',
					fields: ['id', 'facebookUserid', 'username', 'image']
				}
			]
		})
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
		
		// Get users
		firebaseCon.content.get('users', { fields: ['id', 'facebookUserid', 'username', 'image'] })
		.then((users) => {
			if(this.props.user) {
				const loggedinFacebookUserId = this.props.user.uid;

				for (let user in users) {
					if(users.hasOwnProperty(user)) {
						// Convert userobject to array
						const userArray = users[user];
						if(userArray.facebookUserid === loggedinFacebookUserId) {
							this.setState({ 
								facebookuserid: userArray.facebookUserid,
								userid: userArray.id
							});
						}
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
			firebaseCon.content.set('forumThreadReplies', Date.now().toString(), { text: textVal, threadRelation: this.props.location.state.threadid, dateCreated: Date.now(), userRelation: this.state.userid })
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
			const userRelated = reply.userRelation;
			let userImageUrl = "";
			let username = "";
			if(userRelated !== undefined) {
				userImageUrl = userRelated[0].image;
				username = userRelated[0].username;
			}
			
            return (
				<li className="reply-item collection-item avatar" id={reply.id} key={reply.id}>
					<img src={userImageUrl} alt={username} title={username} className="circle" />
					<div>{Parser(reply.text)}</div>
					<span className="secondary-content reply-info">
						{username}
						<br />
						{DateFormat(reply.dateCreated, "dddd, dd. mmmm yyyy - H:MM:ss")}
					</span>
				</li>
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
				<ul className="collection threads">
					<li className="thread-item collection-item avatar">
						<img src={this.state.threaduserimage} alt={this.state.threadusername} title={this.state.threadusername} className="circle" />
						{Parser(this.state.forumthreadtext)}
						<span className="secondary-content thread-info">
							{this.state.threadusername}
							<br />
							{DateFormat(this.state.threaddatecreated, "dddd, dd. mmmm yyyy - H:MM:ss")}
						</span>
					</li>
				</ul>
                <hr />
                <h5>Svar {this.props.user ? <span className="floatRight"><ModalComp modalLinkText="Ny tråd" ModalContent={modalContent} /></span> : ""}</h5>
                <ul className="collection threads">{replyList}</ul>
			</div>
        )
    }
}

export default ForumThread;