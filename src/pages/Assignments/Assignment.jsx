import React, { useEffect, useState } from "react";
import api from "../../Apis/index.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import "./assignment.css";

const Assignment = () => {
  const [data, setData] = useState({
    title: "",
    file_assignment: null,
    description: "",
    deadline: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState([]);

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
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("deadline", data.deadline);
      formData.append("file_assignment", data.file_assignment);

      const response = await api.post("/assignment/", formData);
      console.log(response.data);
      setFetchedData([...fetchedData, response.data]); // Add new assignment to the list
    } catch (error) {
      console.error("Error submitting assignment:", error);
    }
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await api.get("/assignment/");
        console.log(response.data);
        setFetchedData(response.data.Message); // Adjust based on your response structure
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  return (
    <div className="assignment-container">
      <h1>Assignments</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="assignment-list">
          {fetchedData.map((data) => (
            <div key={data.id} className="assignment-item">
              <p>
                Assignment: <a href={data.file_assignment}>{data.file_assignment}</a>
              </p>
              <p>Title: {data.title}</p>
              <p>Deadline: {data.deadline}</p>
              <p>Description: {data.description}</p>
            </div>
          ))}
        </div>
      )}

      <div className="add-assignment-form">
        <h2>Submit Assignment</h2>
        <form onSubmit={onSubmitHandler}>
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
    </div>
  );
};

export default Assignment;
