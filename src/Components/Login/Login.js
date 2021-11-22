import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from '../../App';
import logo from '../../Asset/img/login-1.jpg';
import '../Signup/Signup.css';


const Login = () => {
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
 
 
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    reset("", {
      keepValues: false,
    });
   
    const userData = {
      ...user,
      email: data.email,
      password: data.password
  }
 
  const loginUrl = 'http://localhost:5055/users/login'
  fetch(loginUrl, {
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(userData)
  })
      .then(res => res.json())
      .then(data => {
        setLoggedinUser(data);
        console.log(data)
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("userInfo", JSON.stringify(data));
        history.replace(from);
      })
      .catch(err => console.log(err))
};
 
 
console.log(loggedinUser);



    return (
        <div className="content">
            <div className="account-container row g-0">
                <div className="left col-md-6">
                    <img src={logo} className="img-fluid" alt="" />
                </div>
                <div className="right col-md-6">
                    <div className="user-info">
                        <h4 className="title">Welcome Back!</h4>
                        <p className="normal-text sub-title">Let's Login. You have been missed.</p>
                        {/* Signup */}

                        <div className="">
                            <div className="card shadow-lg bg-white">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    {/* <label className="form-label">Title</label> */}
                                                    <div className="user-information-collection user-information-collection-first-child">
                                                        {/* <input placeholder="feature title" type="text" className="form-control field-box" /> */}
                                                        
                                                        <input  {...register("email", { required: true })} className="user-action-box" type="email" placeholder="email" />
                                                        <i class="fas fa-lock user-action-icon" aria-hidden="true"><FontAwesomeIcon icon={faUser} /></i>
                                                        {errors.email && <span className="text-danger">Email Is Required</span>}
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <div className="user-information-collection">
                                                            <input  {...register("password", { required: true })}  className="user-action-box" type="password" placeholder="password" />
                                                            <i class="fas fa-lock user-action-icon" aria-hidden="true"><FontAwesomeIcon icon={faKey} /></i>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <input className="action-button mt-3" type="submit" value="LogIn" />
                                    </form>
                                </div>
                            </div>
                            <div className="account-operation mt-3 normal-text">
                            <span>Don't have an account yet? </span>
                            <Link to="/signup" className="link" ><strong>Register</strong></Link>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;