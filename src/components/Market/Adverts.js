import React from 'react';
import { firebaseCon } from '../../connection';
import { Link } from 'react-router-dom';
//import JwPagination from 'jw-react-pagination';

class Adverts extends React.Component {

    constructor(props) {
        super(props);

		this.state = {
            search: '',
            adverts: []
            //pageOfItems: []
        };
        
        //this.onChangePage = this.onChangePage.bind(this);
    }

    // onChangePage(pageOfItems) {
    //     this.setState({ pageOfItems });
    // }
    
	componentDidMount() {
        firebaseCon.content.get('adverts', { fields: ['id', 'header', 'price', 'image', 'tags', '__meta__'],
            populate: [
                {
                    field: 'image'
                }
            ]
        })
        .then((adverts) => {
			let advertList = [];
			for (let advert in adverts) {
				advertList.push(adverts[advert]);
			}
			this.setState({ adverts: advertList });
        })
        .catch((error) => console.error(error));
    }
    
    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }
    
    render() {

        let filteredAdverts = this.state.adverts.filter((advert) => {
            return advert.tags.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        });

        //let advertList = this.state.pageOfItems.map((advert) => {
        let advertList = filteredAdverts.map((advert) => {
            console.log(advert.__meta__.createdDate);
            let advertImg;
            if(typeof(advert.image) === "undefined") {
                advertImg = "http://via.placeholder.com/1024x768/fc510b/ffffff?text=Intet+billede";
            } else {
                advertImg = advert.image[0].url;
            }
			return (
				<li className="advert-item collection-item" id={advert.id} key={advert.id}>
                    <div className="row">
                        <div className="col s8">
                            <div className="header">
                                <Link to={`/advert/${advert.header}`}>{advert.header}</Link>
                            </div>
                        </div>
                        <div className="col s4">
                            <div className="price">
                                <b>{advert.price} kr.</b>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <img src={advertImg} width="80" alt={advert.header} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <p><i>{advert.tags}</i></p>
                        </div>
                    </div>
				</li>
			)
		});
        
        return (
			<div>
                <div className="input-field">
                    <i className="material-icons prefix">search</i>
                    <input type="search" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                    <label>Søg i annoncer</label>
                </div>
                {/* <JwPagination items={this.state.adverts} onChangePage={this.onChangePage} /> */}
            	<ul className="collection advert-list">{advertList}</ul>
			</div>
        )
    }
}

export default Adverts;
