import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Header from './components/Header';
import Front from './components/Front';
import ForumSubCategories from './components/ForumSubCategories';
import ForumThreads from './components/ForumThreads';
import ForumThread from './components/ForumThread';

const Breadcrumbs = ({ match }) => {
    if(match !== undefined) {
        return (
            <span className={match.isExact ? 'breadcrumb active' : 'breadcrumb'}>
                <Link to={match.url || ''}>
                    {match.url.substr(match.url.lastIndexOf('/')+1, match.url.length)}
                </Link>
                <Route path={`${match.url}/:path`} component={Breadcrumbs} />
            </span>
        )
    } else {
        return true;
    }
}

const Routes = () => {
    return (
        <Router>
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <Header />
                        <nav className="breadcrumb-wrapper">
                            <div className="nav-wrapper">
                                <div className="col s12">
                                    <Route path='/:path' component={Breadcrumbs} />
                                </div>
                            </div>
                        </nav>
                        <Route exact={true} path="/" component={Front} />
                        <Route exact={true} path="/forum/:forumcatid" component={ForumSubCategories} />
                        <Route exact={true} path="/forum/:forumcatid/:forumsubcatid" component={ForumThreads}></Route>
                        <Route exact={true} path="/forum/:forumcatid/:forumsubcatid/:forumthreadid" component={ForumThread} />
                        {/* <Route
                            path="/forum/:forumcatid/:forumsubcatid/:forumthreadid"
                            render={(props) =>
                            <ForumThread isAuthenticated={isAuthenticated} />
                        } /> */}
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default Routes;
