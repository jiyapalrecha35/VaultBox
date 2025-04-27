import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Vault from './pages/Vault';
import AssignTrustedContact from './pages/AssignTrustedContact';
import ProtectedRoute from './ProtectedRoute';
import './index.css';
import Card from './pages/Card';
import Home from './pages/Home'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer /> {/* Add this line */}

      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        {/* <Navbar /> */}

        {/* Page Content */}
        <div className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vault"
              element={
                <ProtectedRoute>
                  <Vault />
                </ProtectedRoute>
              }
            />
            <Route
              path="/card"
              element={
                <ProtectedRoute>
                  <Card />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assign-trusted-contact"
              element={
                <ProtectedRoute>
                  <AssignTrustedContact />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-indigo-600 text-white text-center p-4">
          &copy; {new Date().getFullYear()} VaultBox. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default App;