import React, { useEffect, useState } from "react";
import api from "../../Apis/index.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import "./assignment.css";
import { useAuth } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import SubmitAssignment from "../SubmitAssignment/SubmitAssignment.jsx";

const Assignment = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({
    title: "",
    file_assignment: null,
    description: "",
    deadline: "",
  });
  const [showAddAssignment, setShowAddAssignment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState([]);
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const { role, user } = useAuth();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); 
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    try {
      if (currentAssignmentId) {
        await api.put(`/assignment/${currentAssignmentId}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await api.post("/assignment/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      resetForm();
      await fetchAssignments();
    } catch (error) {
      console.error(
        "Error submitting assignment:",
        error.response?.data || error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAssignmentSubmission = async (textSubmission, fileSubmission) => {
    const formData = new FormData();
    formData.append('text_submission', textSubmission);
    if (fileSubmission) {
      formData.append('file_submission', fileSubmission);
    }
    formData.append('student', user.id);
    formData.append('assignment', currentAssignmentId);

    try {
      await api.post("/assignment-submission/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setShowSubmitPopup(false);
    } catch (error) {
      console.error("Error submitting assignment:", error.response?.data || error.message);
    }
  };

  const resetForm = () => {
    setData({
      title: "",
      file_assignment: null,
      description: "",
      deadline: "",
    });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setCurrentAssignmentId(null);
    setShowAddAssignment(false);
  };

  const fetchAssignments = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/assignment/");
      setFetchedData(response.data.Message);
    } catch (error) {
      console.error("Error fetching assignments:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleEdit = (assignment) => {
    setCurrentAssignmentId(assignment.id);
    setData({
      title: assignment.title,
      description: assignment.description,
      deadline: assignment.deadline,
      file_assignment: null,
    });
    setShowAddAssignment(true);
  };

  const handleDelete = async (id) => {
    setIsLoading(true); 
    try {
      await api.delete(`/assignment/${id}`);
      setFetchedData((prevData) =>
        prevData.filter((assignment) => assignment.id !== id)
      );
    } catch (error) {
      console.error("Error deleting assignment:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
                  Start Doing Assignment
                </a>
              )}
              {
                role==="student"&&(
                  <>
                  <button
                onClick={() => {
                  setCurrentAssignmentId(assignment.id);
                  setShowSubmitPopup(true);
                }}
              >
                Submit Assignment
              </button>
                  </>
                )
              }
              <SubmitAssignment
                isOpen={showSubmitPopup}
                onClose={() => setShowSubmitPopup(false)}
                onSubmit={handleAssignmentSubmission}
              />
              {role === "teacher" && (
                <>
                  <button
                    className="update"
                    onClick={() => handleEdit(assignment)}
                  >
                    Update
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(assignment.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      {role === "teacher" && !showAddAssignment && (
        <button
          className="show-add-assignment"
          onClick={() => setShowAddAssignment(true)}
        >
          Assign Assignment
        </button>
      )}
      {showAddAssignment && (
        <div className="add-assignment-form">
          <h2>
            {currentAssignmentId ? "Update Assignment" : "Submit Assignment"}
          </h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
            <input
              type="file"
              name="file_assignment"
              onChange={handleChange}
              required={!currentAssignmentId}
            />
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Description"
              required
            />
            <input
              type="date"
              name="deadline"
              value={data.deadline}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={isSubmitting}>
              {currentAssignmentId ? "Update" : "Submit"}
            </button>
          </form>
          {isSubmitting && <Loader />}
        </div>
      )}
    </div>
  );
};

export default Assignment;
