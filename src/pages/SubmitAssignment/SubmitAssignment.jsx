import React, { useState } from 'react';
import './submitAssignment.css';
import { useAuth } from "../../context/AuthContextProvider";

const SubmitAssignment = ({ isOpen, onClose, onSubmit }) => {
  const [textSubmission, setTextSubmission] = useState('');
  const [fileSubmission, setFileSubmission] = useState(null);
  const { role } = useAuth();

  const handleFileChange = (e) => {
    setFileSubmission(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(textSubmission, fileSubmission);
    onClose();
  };

  if (!isOpen || role !== "student") {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Submit Assignment</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Text Submission:
            <textarea
              value={textSubmission}
              onChange={(e) => setTextSubmission(e.target.value)}
              placeholder="Enter your text submission"
            />
          </label>
          <label>
            Upload File:
            <input type="file" onChange={handleFileChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SubmitAssignment;
