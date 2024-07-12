import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContextProvider';
import api from '../../Apis';
import './Notices.css'; 

const Notice = () => {
  const auth = useAuth();
  const [noticeData, setNoticeData] = useState([]);

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

  return (
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
  );
};

export default Notice;
