import React, { useRe, useRef, useState } from "react";
import "../styles/Register.css";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import {  useNavigate } from "react-router-dom";
import { TodoState } from "../Context";


function Register({
  registerFormData,
  setRegisterFormData,
}) {
  const API_URL = `https://todo-be-8z8i.onrender.com`;
  console.log(API_URL);
  const passref = useRef("");
  const eyeref = useRef("");
  const errMailref = useRef("");
  const [loading, setloading] = useState(false);
  const registerUrl = `${API_URL}/api/users/`;
  const navigate = useNavigate();
  

  const togglepass = () => {
    if (
      passref.current.type == "password" &&
      eyeref.current.className == "bi bi-eye-slash eye"
    ) {
      passref.current.type = "text";
      eyeref.current.className = "bi bi-eye eye";
    } else {
      passref.current.type = "password";
      eyeref.current.className = "bi bi-eye-slash eye";
    }
  };

  const handleRegister = async () => {
      event.preventDefault();
      setloading(true);
    console.log("Registering new user...");

    try {
      const response = await axios.post(registerUrl, registerFormData);

      const data = await response.data;

      if (response.status === 200) {
        console.log("User registered in successfully");
       // console.log(data);
        setRegisterFormData({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate('/');
       
      }
      
    } catch (e) {
      console.log("Error logging in...", e.response.request.status);
      if (e.response.request.status === 409) {
        errMailref.current.className = "errMail d-block";
      }
    }
    setloading(false);
      
  };
  const handlelogin = () => {
    event.preventDefault();
      navigate("/");
      
  };
  return (
    <div className="main">
      <div className="container  sub">
        <h2 className="text-center my-4">Register Form</h2>
        <div className="row container">
          <form onSubmit={handleRegister}>
            <div className="form-group my-3 ">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                className="form-control my-2"
                placeholder="Enter name.."
                value={registerFormData.username}
                onChange={(e) =>
                  setRegisterFormData({
                    ...registerFormData,
                    username: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="form-group my-3 ">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                name="email"
                className="form-control my-2"
                placeholder="Enter email"
                value={registerFormData.email}
                onChange={(e) =>
                  setRegisterFormData({
                    ...registerFormData,
                    email: e.target.value,
                  })
                }
                required
              />
              <div className="errMail d-none" ref={errMailref}>
                email already exist please login!
              </div>
            </div>
            <div className="form-group my-3 ">
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                name="phone"
                className="form-control my-2"
                placeholder="Enter phone number.."
                value={registerFormData.phone}
                onChange={(e) =>
                  setRegisterFormData({
                    ...registerFormData,
                    phone: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="Password1">Password</label>
              <div className="pass">
                <input
                  ref={passref}
                  type="password"
                  name="password"
                  className="form-control my-2"
                  placeholder="Password"
                  value={registerFormData.psaawordHash}
                  minLength={6}
                  onChange={(e) =>
                    setRegisterFormData({
                      ...registerFormData,
                      passwordHash: e.target.value,
                    })
                  }
                  required
                />
                <i
                  className="bi bi-eye-slash eye"
                  ref={eyeref}
                  onClick={togglepass}></i>
              </div>
            </div>
            <div className="mt-5 mb-2 text-center">
              <button className="btn btn-primary my-2 w-50 ">
                {loading ? (
                  <div className="d-flex alighn-items-center justify-content-center">
                    <Oval color="white" height="25" width="25" />
                  </div>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
          <div className="my-3 text-center">
            <i>Already have account</i>
            <button className="loginbtn" onClick={handlelogin}>
              login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
