import React from 'react';
import {firebaseCon} from '../connection';
import { Link } from 'react-router-dom';

class ForumSubCategories extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			categories: [],
			mainCategoryName: ""
		};
	}

	componentDidMount() {
		firebaseCon.content.get('forumSubcategories', { fields: ['id', 'name', 'description', 'categoryRelation'], populate: ['categoryRelation'] })
        .then((categories) => {
			const mainCategoryIdFromUrl = this.props.match.params.forumcatid;
			const categoryList = [];

			for (let category in categories) {
				if(categories.hasOwnProperty(category)) {

					// Convert categoryobject to array
					let categoryArray = categories[category];

					// Get our main categories
					let categoryRelations = categoryArray.categoryRelation;

					Object.keys(categoryRelations).forEach((key) => {
						let mainCategoryNames = categoryRelations[key].name;

						// eslint-disable-next-line
						if(mainCategoryIdFromUrl == mainCategoryNames) {
							categoryList.push(categoryArray);
							let maincategoryName = categoryRelations[key].name;
							this.setState({ mainCategoryName: maincategoryName });
						}
					});
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
						<Link to={`/forum/${this.state.mainCategoryName}/${category.name}`}>{category.name}</Link>
					</span>
					<p>{category.description}</p>
				</li>
			)
		});
        
        return (
			<div>
				<h5>{this.state.mainCategoryName}</h5>
            	<ul className="collection categories">{categoryList}</ul>
			</div>
        )
    }
}

export default ForumSubCategories;
