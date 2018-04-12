import React from 'react';
import {firebaseCon} from '../connection';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';
import ModalComp from './Modal';
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

class ForumThreads extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			facebookuserid: "",
			userid: "",
			threads: [],
			newThreadSubject: "",
			newThreadText: ""
		}
		this.textOnChange = this.textOnChange.bind(this);
	}

    componentDidMount() {
		
		// Get threads
		firebaseCon.content.get('forumThreads', { fields: ['id', 'subject', 'text', 'dateCreated', 'categoryRelation', 'userRelation'],
			populate: [
				{
					field: 'categoryRelation',
					fields: ['id']
				},
				{
					field: 'userRelation',
					fields: ['id', 'facebookUserid', 'username', 'image'],
					populate: [ 'image' ]
				}
			]
	 	})
        .then((threads) => {
			const threadList = [];

			for (let thread in threads) {
				if(threads.hasOwnProperty(thread)) {

					// Convert categoryobject to array
					const threadArray = threads[thread];

					// Get our sub categories
					const threadRelations = threadArray.categoryRelation;

					if(threadRelations !== undefined) {
						Object.keys(threadRelations).forEach((key) => {
							if(this.props.location.state.subcategoryid === threadRelations[key].id) {
								threadList.push(threadArray);
								this.setState({ threads: threadList });
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

	subjectOnChange = (e) => {
        this.setState({ newThreadSubject: e.target.value });
	}
	
	textOnChange = (newThreadText) => {
        this.setState({ newThreadText: newThreadText });
	}
	
	addThread = (e) => {
		const subjectVal = document.getElementById("threadsubject").value;
		let textVal = this.state.newThreadText;

		if(subjectVal && textVal !== "") {
			firebaseCon.content.set('forumThreads', Date.now().toString(), { subject: subjectVal, text: textVal, categoryRelation: this.props.location.state.subcategoryid, mainCategory: this.props.match.params.forumcatid, userRelation: this.state.userid })
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
        const threadList = this.state.threads.map((thread) => {
			const userRelated = thread.userRelation;
			const user = userRelated[0];
			if(user.image !== undefined) {
				console.log(Object.entries(user.image));
			}
            return (
                <li className="thread-item collection-item avatar" id={thread.id} key={thread.id}>
                    <img src={userRelated[0].image} alt={userRelated[0].username} className="circle" />
                    <span className="title">
						<Link to={{ pathname: `/forum/${this.props.match.params.forumcatid}/${this.props.match.params.forumsubcatid}/${thread.subject}`, state: { threadid: thread.id} }}>
							{thread.subject}
						</Link>
                    </span>
                    <div>{Parser(thread.text.substring(0, 20) + "...")}</div>
					<span className="secondary-content thread-info">
						{userRelated[0].username}
						<br />
						{DateFormat(thread.dateCreated, "dddd, dd. mmmm yyyy - H:MM:ss")}
					</span>
                </li>
            )
		});

		const modalContent = (
			<div className="modalContent">
				<h6>Du er ved at oprette en ny tråd i {this.props.match.params.forumcatid} - {this.props.match.params.forumsubcatid}</h6>
				<input placeholder="Giv din tråd et navn" type="text" id="threadsubject" className="validate" required value={this.state.newThreadSubject} onChange={this.subjectOnChange} />
				{/* <textarea id="threadtext" className="validate" required value={this.state.newThreadText} onChange={this.textOnChange}></textarea> */}
				<FroalaEditor tag='textarea' onModelChange={this.textOnChange} config={{placeholderText: 'Skriv noget tekst her', quickInsertButtons: [''], height: 200, toolbarButtons: ['bold', 'italic', 'underline', 'insertLink']}} />
				<button onClick={this.addThread} className="waves-effect waves-light btn">Opret tråd</button>
			</div>
		)

        return (
			<div>
				<h5>{this.props.match.params.forumsubcatid} {this.props.user ? <span className="floatRight"><ModalComp modalLinkText="Ny tråd" ModalContent={modalContent} /></span> : ""}</h5>
				{threadList.length ? 
				<ul className="collection threads">{threadList}</ul> : 
				<span className="no-threads">Ingen tråde i denne kategori. Vær den første til at oprette en ved at klikke på "Ny tråd"!</span>}
			</div>
        )
    }
}

export default ForumThreads;