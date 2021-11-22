import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";


const Sort = () => {

    const [allFeatures, setAllFeatures] = useState([])
    useEffect(() => {
        const url = `https://shielded-lowlands-99329.herokuapp.com/feature/allFeature`
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



    return (
        <div>
            <ul className="text-start">
                <li className="list-unstyled"><NavLink to="/numOfVote" activeStyle={{
                    fontWeight: "bold",
                    color: "#11969E"
                }} >Number of Vote </NavLink></li>
                <li className="list-unstyled">  <NavLink to="/numOfComment" activeStyle={{
                    fontWeight: "bold",
                    color: "#11969E"
                }} >Number of Comment</NavLink> </li>
                <li className="list-unstyled">  <NavLink to="/new" activeStyle={{
                    fontWeight: "bold",
                    color: "#11969E"
                }}>New</NavLink> </li>
                <li className="list-unstyled"> <NavLink to="/alphabetically" activeStyle={{
                    fontWeight: "bold",
                    color: "#11969E"
                }} >Alphabetically</NavLink> </li>
                <li className="list-unstyled"> <NavLink to="/random" activeStyle={{
                    fontWeight: "bold",
                    color: "#11969E"
                }} >Random</NavLink> </li>
                <li className="list-unstyled"> <NavLink to="/status" activeStyle={{
                    fontWeight: "bold",
                    color: "#11969E"
                }} >Status</NavLink> </li>
            </ul>
        </div>
    );
};

export default Sort;