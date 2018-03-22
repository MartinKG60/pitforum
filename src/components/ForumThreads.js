import React from 'react';
import {firebaseCon} from '../connection';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';
import { Modal } from 'react-materialize';

class ForumThreads extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			user: null,
			threads: [],
			subCategoryId: "",
			subCategoryName: "",
			newThreadSubject: "",
			newThreadText: ""
		}
    }
    
    componentDidMount() {
		firebaseCon.content.get('forumThreads', { fields: ['id', 'subject', 'text', 'categoryRelation'], populate: ['categoryRelation'] })
        .then((threads) => {
			const subCategoryIdFromUrl = this.props.match.params.forumsubcatid;
			const threadList = [];

			for (let thread in threads) {
				if(threads.hasOwnProperty(thread)) {

					// Convert categoryobject to array
					let threadArray = threads[thread];

					// Get our sub categories
					let threadRelations = threadArray.categoryRelation;

					if(threadRelations !== undefined) {
						Object.keys(threadRelations).forEach((key) => {
							let subCategoryNames = threadRelations[key].name;

							// eslint-disable-next-line
							if(subCategoryIdFromUrl == subCategoryNames) {
								threadList.push(threadArray);
								let subcategoryName = threadRelations[key].name;
								this.setState({ subCategoryName: subcategoryName });
								this.setState({ threads: threadList });
							}
						});
					}
				}
			}
			
        })
        .catch((error) => console.error(error));
	}

	subjectOnChange = (e) => {
        this.setState({ newThreadSubject: e.target.value });
	}
	
	textOnChange = (e) => {
        this.setState({ newThreadText: e.target.value });
	}
	
	addThread = (e) => {
		let subjectVal = document.getElementById("threadsubject").value;
		let textVal = document.getElementById("threadtext").value;
        firebaseCon.content.set('forumThreads', Date.now().toString(), { subject: subjectVal, text: textVal, categoryRelation: this.props.location.state.subcatid, userid: this.props.user.uid })
        .then(() => console.log('Setting'))
        .catch((e) => console.error(e));
        this.setState({ title: '' });
	}

	render() {
        const threadList = this.state.threads.map((thread) => {
            return (
                <li className="thread-item collection-item avatar" id={thread.id} key={thread.id}>
                    <img src={require('../images/icon-rally200.jpg')} alt="{thread.subject}" className="circle" />
                    <span className="title">
						<Link to={{ pathname: `/forum/${this.props.match.params.forumcatid}/${this.props.match.params.forumsubcatid}/${thread.subject}`, state: { threadid: thread.id} }}>
							{thread.subject}
						</Link>
                    </span>
                    <p>{Parser(thread.text)}</p>
                </li>
            )
		});

		const OpenModal = (...props) => {
			console.log(this);
			return (
				<Modal
				fixedFooter
				trigger={<a>OPEN</a>}
				actions={<button className="btn waves-effect waves-light btn-flat modal-action modal-close">Fortryd</button>}>
				<h5>Opret ny tråd i {this.props.match.params.forumcatid} - {this.props.match.params.forumsubcatid}</h5>
				<input placeholder="Giv din tråd et navn" type="text" id="threadsubject" value={this.state.newThreadSubject} onChange={this.subjectOnChange} />
				<textarea id="threadtext" value={this.state.newThreadText} onChange={this.textOnChange}></textarea>
				<button onClick={this.addThread} className="waves-effect waves-light btn">Opret tråd</button>
				</Modal>
			)
		}
		
        return (
			<div>
				<h5>{this.props.match.params.forumsubcatid} <OpenModal modalLinkText="Hej" /></h5>
				{threadList.length ? 
				<ul className="collection threads">{threadList}</ul> : 
				<span className="no-threads">Ingen tråde i denne kategori. Vær den første til at !</span>}
			</div>
        )
    }
}

export default ForumThreads;