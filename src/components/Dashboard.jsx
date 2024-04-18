import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import Card from "./Card";

function App() {
  const API_URL = `https://todo-be-8z8i.onrender.com/api/todo`;

  // Adding the todo
  const [todoName, settodoName] = useState("");
  const [todoDescription, settodoDescription] = useState("");
  const [user, setUser] = useState();
  const [apiData, setapiData] = useState([]);
  const navigate = useNavigate();

  const onLogout = () => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");

    navigate("/");
  };

  //Filter the Todos
  function getData() {
    let id = document.getElementById("dataView");
    console.log(id.value);
    if (id.value == "1") {
      callGetApi();
    } else if (id.value == "2") {
      callGetApi2();
    } else if (id.value == "3") {
      callGetApi3();
    }
  }

  //Add Todo
  async function addTodo() {
    if ((todoName != "") & (todoDescription != "")) {
      let newTodo = {
        todoName: todoName,
        todoDescription: todoDescription,
        email: user.email,
      };

      try {
        let postedJSON = await fetch(`${API_URL}/create`, {
          method: "POST",
          body: JSON.stringify(newTodo),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        let postedObject = await postedJSON.json();

        settodoName("");
        settodoDescription("");

        callGetApi();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please enter the name & Descriptgion");
    }
  }

  //Getting the todo

  const callGetApi = async () => {
    const resp = await fetch(`${API_URL}/get`)
      .then((resp) => resp.json())
      .then((data) => data);
    setapiData(resp);
  };
  const callGetApi2 = async () => {
    const resp = await fetch(`${API_URL}/get`)
      .then((resp) => resp.json())
      .then((data) => data);
    setapiData(resp.filter((e) => e.todoStatus === true));
  };

  const callGetApi3 = async () => {
    const resp = await fetch(`${API_URL}/get`)
      .then((resp) => resp.json())
      .then((data) => data);
    setapiData(resp.filter((e) => e.todoStatus === false));
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    callGetApi();
  }, []);

  //Deleting the todo

  return (
    <div className="container-fluid dashboard px-5">
      {/* head */}
      <div className="d-flex justify-content-end">
        <button
          onClick={onLogout}
          className="btn btn-danger w-auto px-2 py-1 rounded my-2">
          logout
        </button>
      </div>
      <div className="text-center">
        <h1 className="py-5 mt-2 mb-3 heading" style={{ color: "#6B6B6B" }}>
          My todo
        </h1>
        <div className="head d-md-flex justify-content-center w-100 ">
          <input
            className="ip w-75 mx-4 rounded form-control"
            maxLength={25}
            type="text"
            value={todoName}
            onChange={(event) => settodoName(event.target.value)}
            placeholder="Todo Name..."
            id="todoName"
          />
          <input
            className="ip w-75 mx-4 rounded form-control"
            maxLength={120}
            type="text"
            value={todoDescription}
            onChange={(event) => settodoDescription(event.target.value)}
            placeholder="Todo Description..."
            id="todoDescription"
          />
          <button
            className="buttonAdd w-25 mx-4 rounded "
            style={{ backgroundColor: "#6B6B6B" }}
            onClick={addTodo}>
            Add todo
          </button>
        </div>
        {/* filter Section */}

        <div>
          <hr />
          <div className=" d-flex justify-content-between py-1 mainsec">
            <h2 className="text-sm">My Todos</h2>
            <div className="d-flex d-flex justify-content-end w-auto align-items-center">
              <h2 className="d-inline w-auto px-2">Status Filter:</h2>
              <select
                className=" select form-select d-inline w-auto "
                id="dataView"
                onChange={getData}>
                <option value="1">All </option>
                <option value="2">Completed </option>
                <option value="3">Not Completed </option>
              </select>
            </div>
          </div>
          <hr />
          {/* card section */}
          <div className="row">
            {apiData.map(
              (data) =>
                data.user === user.email && (
                  <Card
                    key={data._id}
                    data={data}
                    settodoName={settodoName}
                    settodoDescription={settodoDescription}
                    Api_Url={API_URL}
                    callGetApi={callGetApi}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
