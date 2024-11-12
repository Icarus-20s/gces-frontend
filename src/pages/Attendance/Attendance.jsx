import React, { useState } from 'react';
import './attendance.css';

const Attendance = () => {
  // Dummy data for students
  const [students] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Michael Johnson' },
  ]);

  const [attendance, setAttendance] = useState({}); // Stores attendance status for each student
  const [message, setMessage] = useState("");

  // Handle checkbox change
  const handleCheckboxChange = (studentId, status) => {
    setAttendance(prevAttendance => {
      // If the same status is clicked (Present/Absent), uncheck it
      if (prevAttendance[studentId] === status) {
        return {
          ...prevAttendance,
          [studentId]: null
        };
      }
      return {
        ...prevAttendance,
        [studentId]: status
      };
    });
  };

  // Submit attendance (currently just logs to console)
  const submitAttendance = () => {
    console.log('Submitting attendance:', attendance);
    setMessage('Attendance submitted successfully');
  };

  return (
    <div className="attendance-container">
      <h2>Student Attendance</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Present</th>
            <th>Absent</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={attendance[student.id] === 'Present'}
                  onChange={() => handleCheckboxChange(student.id, 'Present')}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={attendance[student.id] === 'Absent'}
                  onChange={() => handleCheckboxChange(student.id, 'Absent')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="submit-btn" onClick={submitAttendance}>Submit Attendance</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Attendance;
