import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Header from './components/Header';
import Front from './components/Front';
import ForumSubCategories from './components/ForumSubCategories';
import ForumThreads from './components/ForumThreads';
import ForumThread from './components/ForumThread';

class Routes extends Component {

	constructor(props) {
        super(props);
        this.state = {
            user: ""
        }
    }

    Breadcrumbs = ({ match }) => {
        if(match !== undefined) {
            return (
                <span className={match.isExact ? 'breadcrumb active' : 'breadcrumb'}>
                    <Link to={match.url || ''}>
                        {match.url.substr(match.url.lastIndexOf('/')+1, match.url.length).split("?")[0]}
                    </Link>
                    <Route path={`${match.url}/:path`} component={this.Breadcrumbs} />
                </span>
            )
        } else {
            return true;
        }
    }
    
    render() {
        return (
            <Router>
                <div className="container">
                    <div className="row">
                        <div className="col s12">
                            <Header user={this.props.user} login={this.props.login} />
                            <nav className="breadcrumb-wrapper">
                                <div className="nav-wrapper">
                                    <div className="col s12">
                                        <Route path='/:path' component={this.Breadcrumbs} />
                                    </div>
                                </div>
                            </nav>
                            <Route exact={true} path="/" component={Front} />
                            <div className="forum">
                                <Route exact={true} path="/forum/:forumcatid" component={ForumSubCategories} />
                                <Route exact={true} path="/forum/:forumcatid/:forumsubcatid" render={(routeProps) => ( <ForumThreads {...routeProps} {...this.props} /> )} />
                                <Route exact={true} path="/forum/:forumcatid/:forumsubcatid/:forumthreadid" render={(routeProps) => ( <ForumThread {...routeProps} {...this.props} /> )} />
                                {/* <Route exact={true} path="/forum/:forumcatid/:forumsubcatid/:forumthreadid" component={ForumThread} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default Routes;
