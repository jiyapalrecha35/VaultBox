// src/pages/Card.jsx
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Make sure to import the CSS


const Card = () => {
    const navigate = useNavigate();

    const handleVaultClick = () => {
        navigate('/vault');
    };

    const handleTrustedContactClick = () => {
        navigate('/assign-trusted-contact');
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 mt-0">
                <h1 className="text-4xl font-bold mb-10 text-gray-800">Welcome to VaultBox! 🔒</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Vault Card */}
                    <div
                        onClick={handleVaultClick}
                        className="cursor-pointer p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all text-center"
                    >
                        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Manage Vault</h2>
                        <p className="text-gray-600">
                            Add, Edit, View or Delete your private secrets securely.
                        </p>
                    </div>

                    {/* Trusted Contact Card */}
                    <div
                        onClick={handleTrustedContactClick}
                        className="cursor-pointer p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all text-center"
                    >
                        <h2 className="text-2xl font-bold text-green-600 mb-4">Manage Trusted Contact</h2>
                        <p className="text-gray-600">
                            Assign or Update a trusted contact who can access your secrets if needed.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
