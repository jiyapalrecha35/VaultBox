import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Make sure to import the CSS


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/');
  };

  const isAuthenticated = localStorage.getItem('token'); // Check if user is logged in

  // If not authenticated, redirect to home and prevent rendering the navbar
  if (!isAuthenticated && window.location.pathname !== '/') {
    navigate('/');
    return null; // Don't render anything if not authenticated
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center text-white">
        <h1 className="text-2xl font-bold tracking-wide">VaultBox 🔐</h1>
        <div className="space-x-4">
          {/* Show Home and Login before login */}
          {!isAuthenticated ? (
            <>
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/login" className="hover:underline">Login</Link>
            </>
          ) : (
            // Show Home, Dashboard, and Logout after login
            <>
              <Link to="/" className="hover:underline">Home</Link>
              {/* <Link to="/dashboard" className="hover:underline">Dashboard</Link> */}
              <button 
                onClick={handleLogout} 
                className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
