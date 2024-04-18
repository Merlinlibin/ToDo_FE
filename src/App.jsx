import React, { useEffect, useState } from "react";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ForgetPassword from "./components/ForgetPassword";
import Error from "./components/Error";

function App() {
  const [token, settoken] = useState(null);
  const [user, setuser] = useState(null);
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [logobj, setlogobj] = useState({
    email: "",
    Password: "",
  });

  useEffect(() => {
    const user = window.localStorage.getItem("user");
    const token = window.localStorage.getItem("token");

    if (user && token) {
      setuser(JSON.parse(user));
      settoken(token);
    }
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/forgetpassword/" element={<ForgetPassword />} />
          <Route path="/home" element={token?<Dashboard />:<Error/>} />
          <Route
            path="/"
            element={
              <Login
                token={token}
                settoken={settoken}
                user={user}
                setuser={setuser}
                logobj={logobj}
                setlogobj={setlogobj}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                registerFormData={registerFormData}
                setRegisterFormData={setRegisterFormData}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
