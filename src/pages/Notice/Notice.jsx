import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContextProvider';
import api from '../../Apis';
import './Notices.css'; 
import { MdOutlineAddCircle } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';

const Notice = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [noticeData, setNoticeData] = useState([]);
  const [addNotice, setAddNotice] = useState({
    title: "",
    content: "",
    branch: ""
  });
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onChangeHandler = (e) => {
    setAddNotice({ ...addNotice, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await api.get('http://127.0.0.1:8000/notice/');
        console.log(response.data);
        setNoticeData(response.data);
      } catch (error) {
        console.log('Error fetching notice data:', error);
      }
    };
    fetchNotice();
  }, []);

  const onClickHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('http://127.0.0.1:8000/notice/', addNotice);
      console.log(response.data);
      setNoticeData((prevNotices) => [...prevNotices, response.data]);
      setAddNotice({ title: "", content: "", branch: "" }); 
      setShowAddNotice(false);
      setIsSubmitted(true); // Set isSubmitted to true upon successful submission
    } catch (error) {
      console.log('Error adding notice:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="contact-us-container">
        <div className="thank-you-message">
          <h2>Notice Published!</h2>
          <p>By {auth.user}</p> {/* Assuming auth.user is the user's name */}
        </div>
        <button onClick={() => navigate('/notice')}>
          Go Back <KeyboardBackspaceRoundedIcon />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="notice-container"> 
        <h2>Notices</h2>
        <div className="notice-grid">
          {noticeData.map((notice) => (
            <div key={notice.id} className="notice-item">
              <p>Branch: {notice.branch}</p>
              <p>Title: {notice.title}</p>
              <p>Date Posted: {notice.date_posted}</p>
              <p>Content: {notice.content}</p>
            </div>
          ))}
        </div>
      </div>
      {auth.role === "staff" && (
        <>
          {!showAddNotice && (
            <button onClick={() => setShowAddNotice(true)}>Add Notice</button>
          )}
          {showAddNotice && (
            <div className="add-notice-form">
              <h2>Add Notice</h2>
              <form onSubmit={onClickHandler}>
                <label htmlFor="title">Title</label>
                <input 
                  type="text"
                  name='title'
                  placeholder="New Title"
                  value={addNotice.title}
                  onChange={onChangeHandler} 
                />
                <label htmlFor="content">Content</label>
                <textarea
                  name="content"
                  placeholder="Content"
                  value={addNotice.content}
                  onChange={onChangeHandler}
                />
                <label htmlFor="branch">Branch</label>
                <input
                  type="text"
                  name="branch"
                  placeholder="Branch"
                  value={addNotice.branch}
                  onChange={onChangeHandler} 
                />
                <button type="submit">Submit Notice <MdOutlineAddCircle /></button>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Notice;
