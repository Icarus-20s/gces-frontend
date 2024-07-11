import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './landing.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LandingPage = () => {
  const navigate = useNavigate();

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Progress',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Your Dashboard</h1>
      <p>Manage your activities and monitor your progress here.</p>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
      <div className="button-container">
        <button onClick={() => navigate('/profile')}>Profile</button>
        <button onClick={() => navigate('/logout')}>Logout</button>
      </div>
    </div>
  );
};

export default LandingPage;
