import React from 'react';
import {firebaseCon} from '../connection';
import { Link } from 'react-router-dom';

class ForumMainCategories extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			categories: []
		};
	}

	componentWillMount() {
        firebaseCon.content.get('forumCategories', { fields: ['id', 'name', 'description'] })
        .then((categories) => {
			let categoryList = [];
			for (let category in categories) {
				categoryList.push(categories[category]);
			}
			this.setState({ categories: categoryList });
        })
        .catch((error) => console.error(error));
	}
    
    render() {
        let categoryList = this.state.categories.map((category) => {
			return (
				<li className="category-item collection-item avatar" id={category.id} key={category.id}>
                    <img src={require('../images/icon-rally200.jpg')} alt="{category.name}" className="circle" />
                    <span className="title">
                        <Link to={`/forum/${category.id}`}>{category.name}</Link>
                    </span>
                    <p>{category.description}</p>
				</li>
			)
		});
        
        return (
			<div>
            	<ul className="collection categories">{categoryList}</ul>
			</div>
        )
    }
}

export default ForumMainCategories;