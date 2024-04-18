import axios from "axios";
import React, { useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { TodoState } from "../Context";

function ForgetPassword() {
  const API_URL = `https://todo-be-8z8i.onrender.com`;
  const [loading, setloading] = useState(false);
  const resetUrl = `${API_URL}/api/passwordReset/`;
  const passref = useRef("");
  const eyeref = useRef("");
  const [resetobj, setresetobj] = useState({
    email: "",
    newPassword: "",
    OTP: "",
  });
  const navigate = useNavigate();
  const errMailref = useRef("");
  const errpassref = useRef("");
  const OTPref = useRef("");

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

  const handleresetpass = async () => {
    event.preventDefault();

    setloading(true);

    console.log("Resetting the user password...");

    try {
      const response = await axios.patch(resetUrl, resetobj);
      console.log(response);
      const data = await response.data;
      console.log(data);
      if (response.status === 200) {
        console.log("password changed successfully");
        console.log(response.status);
        setresetobj({
          email: "",
          newPassword: "",
          OTP: "",
        });
        setloading(false);
        navigate("/");
      }
    } catch (e) {
      setloading(false);
      console.log("Error logging in...", e);
    }
  };
  const errMailStatus = async (e) => {
    await axios
      .get(`${API_URL}/api/users/`)
      .then((res) => res.data)
      .then((users) =>
        users.find((user) => {
          if (user.email === e.target.value) {
            return user;
          }
        })
      )
      .then((user) => {
        // console.log(user);
        if (!user) {
          return (errMailref.current.className = "errMail d-block");
        }
        if (user.email === e.target.value) {
          errMailref.current.className = "errMail d-none";
        }
      });
  };

  const errOTPStatus = async (e) => {
    await axios
      .get(`${API_URL}/api/users/`)
      .then((res) => res.data)
      .then((users) =>
        users.find((user) => {
          if (user.email == resetobj.email) {
            return user;
          }
        })
      )
      .then((user) => {
        // console.log(user);
        if (user.randomStr == e.target.value) {
          OTPref.current.className = "errpass d-none";
        } else {
          OTPref.current.className = "errpass d-block";
        }
      });
  };

  return (
    <div className="main">
      <div className="container  sub">
        <h2 className="text-center my-4">Reset Password</h2>
        <div className="row container">
          <form onSubmit={handleresetpass}>
            <div className="form-group my-3">
              <label htmlFor="email">Enter your Email</label>
              <div className="email">
                <input
                  required
                  type="email"
                  name="email"
                  className="form-control my-2"
                  placeholder="enter your email... "
                  value={resetobj.email}
                  onChange={(e) => {
                    setresetobj({ ...resetobj, email: e.target.value });
                    errMailStatus(e);
                  }}
                />
                <div className="errMail d-none" ref={errMailref}>
                  Email dosent exist please register!
                </div>
              </div>
            </div>
            <div className="form-group my-3">
              <label htmlFor="newPassword">Enter new Password</label>
              <div className="pass">
                <input
                  required
                  type="password"
                  name="newpassword"
                  className="form-control my-2"
                  placeholder="Password"
                  ref={passref}
                  minLength={6}
                  value={resetobj.newPassword}
                  onChange={(e) =>
                    setresetobj({ ...resetobj, newPassword: e.target.value })
                  }
                />
                <div className="errpass d-none" ref={errpassref}>
                  Please enter the valid password!!
                </div>
                <i
                  className="bi bi-eye-slash eye"
                  onClick={togglepass}
                  ref={eyeref}></i>
              </div>
            </div>
            <div className="form-group my-3">
              <label htmlFor="OTP">OTP</label>
              <div className="OTP">
                <input
                  required
                  type="text"
                  name="OTP"
                  className="form-control my-2"
                  placeholder="enter your OTP... "
                  value={resetobj.OTP}
                  onChange={(e) => {
                    setresetobj({ ...resetobj, OTP: e.target.value });
                    errOTPStatus(e);
                  }}
                />
                <div className="errOTP d-none" ref={OTPref}>
                  Please enter the valid OTP!!
                </div>
              </div>
            </div>
            <div className="mt-2 mb-2 text-center">
              <button className="btn btn-primary my-2 w-50 ">
                {loading ? (
                  <div className="d-flex alighn-items-center justify-content-center">
                    <Oval color="white" height="25" width="25" />
                  </div>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
