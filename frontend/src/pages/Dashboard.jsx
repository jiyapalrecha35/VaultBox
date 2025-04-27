// src/pages/Dashboard.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Make sure to import the CSS
import Navbar from './Navbar'


const Dashboard = () => {
  const [vaultEntries, setVaultEntries] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  useEffect(() => {
    const fetchVaultEntries = async () => {
      try {
        const res = await axios.get('/vaults');
        setVaultEntries(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch vault entries!');
      }
    };

    fetchVaultEntries();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <h2 className="mt-4 text-xl">Vault Entries</h2>
      <div className="mt-4 space-y-4">
        {vaultEntries.length > 0 ? (
          vaultEntries.map((entry, index) => (
            <div key={index} className="p-4 border rounded-md bg-gray-100">
              <p><strong>Title:</strong> {entry.title}</p>
              <p><strong>Description:</strong> {entry.description}</p>
            </div>
          ))
        ) : (
          <p>No vault entries found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
