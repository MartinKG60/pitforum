import React from 'react';
import {firebaseCon} from '../connection';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';

class ForumThreads extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			threads: [],
			subCategoryName: ""
		};
    }
    
    componentDidMount() {
		firebaseCon.content.get('forumThreds', { fields: ['id', 'subject', 'text', 'categoryRelation'], populate: ['categoryRelation'] })
        .then((threads) => {
			const subCategoryIdFromUrl = this.props.match.params.forumsubcatid;
			const threadList = [];

			for (let thread in threads) {
				if(threads.hasOwnProperty(thread)) {

					// Convert categoryobject to array
					let threadArray = threads[thread];

					// Get our sub categories
					let threadRelations = threadArray.categoryRelation;

					Object.keys(threadRelations).forEach((key) => {
						let subCategoryNames = threadRelations[key].name;

                        // eslint-disable-next-line
						if(subCategoryIdFromUrl == subCategoryNames) {
							threadList.push(threadArray);
							let subcategoryName = threadRelations[key].name;
							this.setState({ subCategoryName: subcategoryName });
						}
					});
				}
			}
			this.setState({ threads: threadList });
        })
        .catch((error) => console.error(error));
	}

    render() {

        const threadList = this.state.threads.map((thread) => {
            return (
                <li className="thread-item collection-item avatar" id={thread.id} key={thread.id}>
                    <img src={require('../images/icon-rally200.jpg')} alt="{thread.subject}" className="circle" />
                    <span className="title">
						{/* <Link to={`/forum/${this.props.match.params.forumcatid}/${this.props.match.params.forumsubcatid}/${thread.subject}`} params={{ threadid: thread.id }}>{thread.subject}</Link> */}
						<Link to={{ pathname: `/forum/${this.props.match.params.forumcatid}/${this.props.match.params.forumsubcatid}/${thread.subject}`, props: { threadid: thread.id} }}>
							{thread.subject}
						</Link>
                    </span>
                    {Parser(thread.text)}
                </li>
            )
        });
        
        return (
			<div>
				<h5>{this.props.match.params.forumsubcatid}</h5>
                {threadList.length ? <ul className="collection threads">{threadList}</ul> : <p>Ingen tråde..</p>}
			</div>
        )
    }
}

export default ForumThreads;