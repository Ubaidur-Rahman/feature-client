import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import img from '../../Asset/img/1250212.png';
import './SingleFeature.css';

const SingleFeature = ({ feature }) => {
    const history = useHistory();
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    const { title, description, status, createdAt, logo } = feature;
    console.log(feature)
    const time = parseInt(Math.abs(new Date() - new Date(createdAt)) / 36e5);

    const [data, setData] = useState([])
    const [state, setState] = useState([])
    useEffect(() => {
        const url = `http://localhost:5055/users/allUser`
        fetch(url, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(data => setState(data.result))

    }, [])

    const [allFeatures, setAllFeatures] = useState([])
    useEffect(() => {
        const url = `http://localhost:5055/feature/allFeature`
        fetch(url, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.result)
                setAllFeatures(data.result)
            })

    }, [])

    const likePost = (id) => {
        if (loggedinUser.email) {
            
        
        console.log(id)
        fetch('http://localhost:5055/feature/vote', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                id: id

            })

        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.map(feature => {
                    if (feature._id === result._id) {
                        return result
                    } else {
                        return feature
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
        }
        else(
            history.push("/login")
        )
    }

    const unlikePost = (id) => {
        fetch('http://localhost:5055/feature/unVote', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                body: JSON.stringify({
                    id: id
                })
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.map(feature => {
                    if (feature._id === result._id) {
                        return result
                    } else {
                        return feature
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const makeComment = (text, postId) => {
        fetch('/comment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.map(feature => {
                    if (feature._id === result._id) {
                        return result
                    } else {
                        return feature
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }


    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4 text-center m-auto">
                    {logo ? <img src={logo} className=" rounded-start p-2" height="100px" alt="..." /> :
                        <img src={img} className=" rounded-start p-2" height="100px" alt="..." />}
                    <div className="row card-text mt-2 mx-2">
                        <div className="col-md-6 col-5"><div className="card-content">

                            {feature.votes.includes(state._id) ?
                                <i className="material-icons"
                                    onClick={() => { unlikePost(feature._id) }}
                                ><FontAwesomeIcon icon={faThumbsDown} /><h6>{feature.votes.length} votes</h6></i>
                                :
                                <i className="material-icons"
                                    onClick={() => { likePost(feature._id) }}
                                ><FontAwesomeIcon icon={faThumbsUp} /><h6>{feature.votes.length} votes</h6></i>

                            }

                        </div>
                        </div>
                        <div className="col-md-6 col-7"><Link to="/comment" >
                        <i className="material-icons"
                                    onClick={() => { makeComment(feature._id) }}
                                ><FontAwesomeIcon icon={faCommentDots} /><h6>{feature?.comments?.length} Comment</h6></i></Link></div>
                    </div>
                   
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title mt-2">{title}</h5>

                        <p className="card-text">{description}</p>

                    </div>

                    {/* <div className="card-content">

                        {feature.votes.includes(state._id) ?
                            <i className="material-icons"
                                onClick={() => { unlikePost(feature._id) }}
                            ><FontAwesomeIcon icon={faThumbsDown} /><h6>{feature.votes.length} votes</h6></i>
                            :
                            <i className="material-icons"
                                onClick={() => { likePost(feature._id) }}
                            ><FontAwesomeIcon icon={faThumbsUp} /><h6>{feature.votes.length} votes</h6></i>

                        }
                        
                    </div> */}

                    <p className="card-text text-end"><small className="text-primary">Feature created {time} hours ago</small></p>
                </div>
            </div>
            {status && <div className='post-info-category'>{status}</div>}
        </div>
    );
};

export default SingleFeature;