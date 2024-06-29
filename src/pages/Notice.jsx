import React, { useEffect } from 'react';
import axios from 'axios';

const Notice = () => {
  useEffect(() => {
    // Perform the HTTP GET request when the component mounts
    axios.get('http://127.0.0.1:8000/hello/')
      .then(response => {
        // Log the response data if the request is successful
        console.log(response.data);
      })
      .catch(error => {
        // Log the error if the request fails
        console.error("There was an error", error);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <h1>Notice</h1>
    </div>
  );
}

export default Notice;
