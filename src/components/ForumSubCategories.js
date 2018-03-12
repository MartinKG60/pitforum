import React from 'react';
import {firebaseCon} from '../connection';
import { Link } from 'react-router-dom';

class ForumSubCategories extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			categories: []
		};
	}

	componentWillMount() {
		firebaseCon.content.get('forumSubcategories', { fields: ['id', 'name', 'description', 'categoryRelation'] })
        .then((categories) => {
			const mainCategoryId = this.props.match.params.maincatid;
			let categoryList = [];
			for (let category in categories) {
				if(categories.hasOwnProperty(category)) {
					let arrCategory = categories[category];
					if(mainCategoryId == arrCategory.categoryRelation) {
						categoryList.push(categories[category]);
					}
				}
			}
			this.setState({ categories: categoryList });
        })
        .catch((error) => console.error(error));
	}
    
    render() {
		
        const categoryList = this.state.categories.map((category) => {
			return (
				<li className="category-item collection-item avatar" id={category.id} key={category.id}>
					<img src={require('../images/icon-rally200.jpg')} alt="{category.name}" className="circle" />
					<span className="title">
						<Link to={`/category/${category.id}`}>{category.name}</Link>
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

export default ForumSubCategories;
