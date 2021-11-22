import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import logo from '../../Asset/img/registration-form-template-with-flat-design_23-2147971971.jpg';
import './Signup.css';

const Signup = () => {

    const history = useHistory();
 
    
const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
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

const newUserData = {
    ...userData,
    name: data.name,
    email: data.email,
    password: data.password,
  };

  const signupUrl = "https://shielded-lowlands-99329.herokuapp.com/users/signup";
  console.log(newUserData)
  fetch(signupUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newUserData),
  })
    .then((res) => res.json())
    .then((data) => {
        if(data){
            history.push("/login");
        }
        console.log(data)
    })
    .catch(err => console.log(err))
};



    return (
        <div className="content">
            <div className="account-container row g-0">
                <div className="left col-md-6">
                    <img src={logo} className="img-fluid" alt="" />
                </div>
                <div className="right col-md-6">
                    <div className="user-info">
                        <h4 className="title">Welcome</h4>
                        <p className="normal-text sub-title">Let's Sign up. You have been missed.</p>
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
                                                        
                                                        <input  {...register("name", { required: true })} className="user-action-box" type="text" placeholder="name" />
                                                        <i class="fas fa-lock user-action-icon" aria-hidden="true"><FontAwesomeIcon icon={faUser} /></i>

                                                        {errors.name && <span className="text-danger">Name Is Required</span>}
                                                    </div>
                                                </div>
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
                                                <div className="remember-me">
                                                    <input type="checkbox" />
                                                    <span className="normal-text">Remember me</span>
                                                </div>
                                            </div>
                                        </div>
                                        <input className="action-button mt-3" type="submit" value="Sign up" />
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="account-operation mt-3 normal-text">
                            <span>Already have an account? </span>
                            <Link to="/login" className="link" href=""><strong>Log in</strong></Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Signup;