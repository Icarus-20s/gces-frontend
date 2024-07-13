import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContextProvider';
import api from '../../Apis';
import './Notices.css';
import { MdOutlineAddCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import Loader from '../../components/Loader/Loader'; // Assuming Loader component exists
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import { MdTipsAndUpdates, MdSystemUpdateAlt } from "react-icons/md";

const Notice = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [noticeData, setNoticeData] = useState([]);
  const [addNotice, setAddNotice] = useState({
    title: '',
    content: '',
    branch: '',
  });
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await api.get('/notice');
        console.log(response.data);
        setNoticeData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching notice data:', error);
        setError('Failed to fetch notices. Please try again later.');
        setIsLoading(false);
      }
    };
    fetchNotice();
  }, []);

  const onChangeHandler = (e) => {
    setAddNotice({ ...addNotice, [e.target.name]: e.target.value });
  };

  const onClickHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (selectedNotice) {
        const response = await api.put(`/notice/${selectedNotice.id}/`, addNotice);
        console.log('Notice updated:', response.data);
        setNoticeData(noticeData.map((notice) => (notice.id === selectedNotice.id ? response.data : notice)));
      } else {
        const response = await api.post('/notice/', addNotice);
        console.log('Notice added:', response.data);
        setNoticeData((prevNotices) => [...prevNotices, response.data]);
      }
      setAddNotice({ title: '', content: '', branch: '' });
      setSelectedNotice(null);
      setShowAddNotice(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error updating/adding notice:', error);
      setError('Failed to update/add notice. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdateHandler = (notice) => {
    setSelectedNotice(notice);
    setAddNotice({
      title: notice.title,
      content: notice.content,
      branch: notice.branch,
    });
    setShowAddNotice(true);
  };

  const onDeleteHandler = async (id) => {
    try {
      setIsLoading(true);
      await api.delete(`/notice/${id}`);
      console.log('Notice deleted:', id);
      setNoticeData(noticeData.filter((notice) => notice.id !== id));
    } catch (error) {
      console.error('Error deleting notice:', error);
      setError('Failed to delete notice. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="submitted-container">
        <div className="thank-message">
          <h2>Notice {selectedNotice ? 'Updated' : 'Published'}!</h2>
        </div>
        <button onClick={() => navigate('/notice')}>
          Go Back <KeyboardBackspaceRoundedIcon />
        </button>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <Loader /> 
      ) : (
        <div className="notice-container">
          <h2>Notices</h2>
          <div className="notice-grid">
            {noticeData.map((notice) => (
              <div key={notice.id} className="notice-item">
                <p>Branch: {notice.branch}</p>
                <p>Title: {notice.title}</p>
                <p>Date Posted: {notice.date_posted}</p>
                <p>Content: {notice.content}</p>
                {auth.role === 'staff' && (
                  <div className="icon-buttons">
                    <MdSystemUpdateAlt onClick={() => onUpdateHandler(notice)} />
                    <AutoDeleteIcon onClick={() => onDeleteHandler(notice.id)} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {auth.role === 'staff' && (
        <>
          {!showAddNotice && (
            <button className = "button-to-add-notice" onClick={() => setShowAddNotice(true)}>Add Notice</button>
          )}
          {showAddNotice && (
            <div className="add-notice-form">
              <h2>{selectedNotice ? 'Update Notice' : 'Add Notice'}</h2>
              {error && <p className="error-message">{error}</p>}
              <form onSubmit={onClickHandler}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
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
                <button type="submit" disabled={isLoading}>
                  {selectedNotice ? 'Update Notice' : 'Submit Notice'} <MdOutlineAddCircle />
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Notice;
