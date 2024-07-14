import React, { useEffect, useState } from "react";
import api from "../../Apis/index.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import "./assignment.css";
import { useAuth } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { MdDeleteSweep } from "react-icons/md";

const Assignment = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState({
    title: "",
    file_assignment: null,
    description: "",
    deadline: "",
  });
  const [showAddAssignment, setShowAddAssignment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState([]);
  const { user, role } = useAuth();

  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChangeHandler = (e) => {
    setData({
      ...data,
      file_assignment: e.target.files[0],
    });
    console.log("Selected file:", e.target.files[0]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("deadline", data.deadline);
      formData.append("file_assignment", data.file_assignment);

      const response = await api.post("/assignment/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      setFetchedData([...fetchedData, response.data]);
      setData({
        title: "",
        file_assignment: null,
        description: "",
        deadline: "",
      });
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000); // Reset submission status after 3 seconds
    } catch (error) {
      console.error(
        "Error submitting assignment:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/assignment/");
        console.log(response.data);
        setFetchedData(response.data.Message);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const onUpdateHandler = async (id) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("deadline", data.deadline);
      formData.append("file_assignment", data.file_assignment);

      const response = await api.put(`/assignment/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedIndex = fetchedData.findIndex((item) => item.id === id);
      const updatedData = [...fetchedData];
      updatedData[updatedIndex] = response.data;

      setFetchedData(updatedData);
      setData({
        title: "",
        file_assignment: null,
        description: "",
        deadline: "",
      });

      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000); // Reset submission status after 3 seconds
    } catch (error) {
      console.error(
        "Error updating assignment:",
        error.response?.data || error.message
      );
    }
  };

  const onDeleteHandler = async (id) => {
    console.log(id);
    try {
      await api.delete(`/assignment/${id}`);
      console.log({ "Deleted id": id });
      setFetchedData(fetchedData.filter((assignment) => assignment.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="submitted-container">
        <div className="thank-message">
          <h2>Assignment Assigned.</h2>
        </div>
        <button onClick={() => navigate("/assignment")}>
          Go Back <KeyboardBackspaceRoundedIcon />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="assignment-container">
        <h1>Assignments</h1>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="assignment-list">
            {fetchedData.map((assignment) => (
              <div key={assignment.id} className="assignment-item">
                <p>Title: {assignment.title}</p>
                <p>Deadline: {assignment.deadline}</p>
                <p>Description: {assignment.description}</p>
                {assignment.file_assignment && (
                  <a
                    href={`http://127.0.0.1:8000${assignment.file_assignment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start Doing Assignment.
                  </a>
                )}
                <br />
                <button onClick={() => onDeleteHandler(assignment.id)}>
                  Delete
                </button>
                <button onClick={() => onUpdateHandler(assignment.id)}>
                  Update
                </button>
              </div>
            ))}
          </div>
        )}
        {role === "teacher" && !showAddAssignment && (
          <button
            className="show-add-assignment"
            onClick={() => {
              setShowAddAssignment(true);
            }}
          >
            Assign Assignment
          </button>
        )}

        {showAddAssignment && (
          <div className="add-assignment-form">
            <h2>Submit Assignment</h2>
            <form onSubmit={onSubmitHandler} encType="multipart/form-data">
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={onChangeHandler}
                placeholder="Title"
                required
              />
              <input
                type="file"
                name="file_assignment"
                onChange={onFileChangeHandler}
                required
              />
              <textarea
                name="description"
                value={data.description}
                onChange={onChangeHandler}
                placeholder="Description"
                required
              />
              <input
                type="date"
                name="deadline"
                value={data.deadline}
                onChange={onChangeHandler}
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Assignment;
