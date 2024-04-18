import {  useRef, useState } from "react";

function Card({ data, settodoName, settodoDescription, Api_Url, callGetApi }) {

  const [status, setStatus] = useState(data.todoStatus);

  
  const deletTodo = async (id) => {
    console.log(id);
    await fetch(`${Api_Url}/delete/${id}`, {
      method: "DELETE",
    }).then(() => {
      console.log(`post with id ${id} deleted successfully`);
      callGetApi();
    });
  };

  //Change status of todo
  const patchData = async (data, status) => {
    console.log(status, data);
    try {
      let updatedstatus = {
        todoStatus: status ,
      };
      let postedJSON = await fetch(`${Api_Url}/edit/${data._id}`, {
        method: "PUT",
        body: JSON.stringify(updatedstatus),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      let postedObject = await postedJSON.json();

      console.log("Post Updated successfully!", postedObject);
      callGetApi();
    } catch (error) {
      console.log("error Updating the post", error);
    }
  };

  //Edit todo
  const EditTodo = ({ _id, todoName, todoDescription, todoStatus }) => {
    settodoName(todoName);
    settodoDescription(todoDescription);

    deletTodo(_id);
  };

  if (data != "datas") {
    return (
      <div className="col-md-6 col-lg-4 py-3" id="cardSection">
        <div className="cards rounded p-3 text-start">
          <p className="m-2">
            <b>Name : </b>
            {data.todoName}
          </p>
          <div className="heightDiv">
            <p className="m-1 text-break">
              <b>Description : </b>
              {data.todoDescription}
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-start mt-2">
            <p className="m-1">
              <b>Status : </b>
            </p>
            <select
              className=" cartdselect form-select  w-auto m-1"
              id="select"
              style={{
                backgroundColor: data.todoStatus ? "lightgreen" : "#DC3545",
              }}
              onChange={(e) => {
                patchData(data, e.target.value);
                setStatus(e.target.value);
              }}
              value={status}>
              <option value={false} id="NotCompleted">
                Not Completed
              </option>
              <option value={true} id="Completed">
                Completed
              </option>
            </select>
          </div>
          <div className="mt-3 d-flex justify-content-end">
            <button
              className="edit m-1 rounded "
              onClick={() => {
                EditTodo(data);
              }}>
              Edit
            </button>
            <button
              className="delete m-1 rounded"
              onClick={() => {
                deletTodo(data._id);
              }}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Card;
