import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../../App';
import './Navbar.css';

const Navbar = () => {
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    const handleLogout = () =>{
        setLoggedinUser({});
    }
    return (
        <div className="navbar">
            <div className="nav-area">
            <div className="logo"><h2><Link to="/">Feature Request</Link></h2></div>
                <nav>
                   
                    <Link to="/admin" className="nav-link">Admin</Link>
                    <Link to="/signup" className="nav-link">Register</Link>
                    <p>{loggedinUser.email}</p>
                </nav>
                {
                    loggedinUser.email ? <Link to="/" onClick={()=>handleLogout()} className="nav-link nav-btn">Logout</Link> : <Link to="/login" className="nav-link nav-btn">Login</Link>
                }
                
                
            </div></div>
    );
};

export default Navbar;