import React, { useEffect, useState } from 'react';
import api from '../../Apis/index';
import "./profile.css"

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('http://127.0.0.1:8000/user-profile');
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      {userData ? (
        <div className="user-profile">
          <p>id: {userData.id}</p>
          <p>first name: {userData.first_name}</p>
          <p>last name: {userData.last_name}</p>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
          <p>Branch: {userData.branch}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
