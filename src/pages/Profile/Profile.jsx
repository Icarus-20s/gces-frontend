import React, { useEffect, useState } from 'react';
import api from '../../Apis/index';
import "./profile.css";
import { useAuth } from '../../context/AuthContextProvider';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const auth = useAuth();

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
    <div className="user-profile">
      {userData ? (
        <>
          <p>ID: {userData.id}</p>
          <p>First Name: {userData.first_name}</p>
          <p>Last Name: {userData.last_name}</p>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
          <p>Branch: {userData.branch}</p>
          <button onClick={auth.logout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
