import React from 'react';
import ForumMainCategories from './Forum/MainCategories';
import Adverts from './Market/Adverts';

const Front = () => {
    return (
        <div className="row">
            <div className="col s6">
                <h4>Forum</h4>
                <ForumMainCategories />
            </div>
            <div className="col s6">
                <h4>Marked</h4>
                <Adverts />
            </div>
        </div>
    );
};

export default Front;
