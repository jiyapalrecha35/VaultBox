import { Link } from 'react-router-dom';
import image from './download.jpeg'


const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-pink-100 px-4 sm:px-8">
      {/* Header Section */}
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="text-6xl font-extrabold text-indigo-900 mb-4 tracking-tight mt-40">
          Welcome to VaultBox 🔐
        </h1>
        <p className="text-xl text-gray-800 mb-8">
          Your trusted secure vault for managing sensitive information. Start your secure journey today.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12">
        <Link
          to="/login"
          className="px-8 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-8 py-3 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition duration-300 transform hover:scale-105"
        >
          Register
        </Link>
      </div>

      {/* Optional: Background Image Section */}
      <div
        className="mt-12 w-full max-w-2xl bg-cover bg-center rounded-lg shadow-xl overflow-hidden h-80"
        style={{
            backgroundImage: `url(${image})`,  // Corrected here
        }}
      >
        {/* Optional Background Image */}
      </div>

      {/* Additional Section */}
      <div className="mt-8 text-center text-gray-600">
        <p>
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
