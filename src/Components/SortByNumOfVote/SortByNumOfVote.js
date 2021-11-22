import React, { useEffect, useState } from 'react';
import FeatureRequest from '../FeatureRequest/FeatureRequest';
import SingleFeature from '../SingleFeature/SingleFeature';
import Sort from '../Sort/Sort';

const SortByNumOfVote = () => {
    const [allFeatures, setAllFeatures] = useState([])
    useEffect(() => {
        const url = `https://shielded-lowlands-99329.herokuapp.com/feature/allFeatureByNew`
        fetch(url, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(data => setAllFeatures(data.result))

    }, [])



    return (
        <div className="container-fluid container-bg">
            <div className="row">
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-md-3 bg-sidebar">
                            <h5 className='text-center my-3'>Sort by Category</h5>
                            <Sort />

                        </div>
                        <div className="col-md-9 main-feature bg-all-feature">
                            <h2 className='text-center my-3'>Requested All feature</h2>

                            {
                                allFeatures.map(feature => <SingleFeature feature={feature} />
                                )
                            }

                        </div>
                    </div>
                </div>
                <div className="col-md-3 bg-sidebar">

                    <h5 className='text-center my-3'>Request for a Feature</h5>
                    <FeatureRequest />
                </div>

            </div>
        </div>
    );
};

export default SortByNumOfVote;