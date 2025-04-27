import { useState } from "react";
import api from "../utils/axiosInstance";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Make sure to import the CSS


function TrustedContact() {
  const [email, setEmail] = useState("");
  const [unlockAfterDays, setUnlockAfterDays] = useState(0); // default 30 days
  const [userEmail, setUserEmail] = useState(""); // for request and unlock
  const [unlockResults, setUnlockResults] = useState(null);

  const token = localStorage.getItem("token");

  const handleSetTrustedContact = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        "/trusted-contact/set",
        { email, unlockAfterDays },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Trusted contact set/updated successfully.");
      setEmail("");
      setUnlockAfterDays(0);
    } catch (error) {
      console.error(error);
      toast.error("Failed to set trusted contact.");
    }
  };

  const handleRequestAccess = async (e) => {
    e.preventDefault();
    try {
      await api.post("/trusted-contact/request-access", { userEmail });
      toast.success("Access request recorded successfully.");
      setUserEmail("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to request access.");
    }
  };

  const handleUnlockVault = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/trusted-contact/unlock", { userEmail });
      setUnlockResults(res.data);
      setUserEmail("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to unlock vault.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-center mb-8 mt-6">Trusted Contact Center</h1>

        {/* Set Trusted Contact */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Set / Update Trusted Contact</h2>
          <form onSubmit={handleSetTrustedContact} className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-700">Trusted Contact Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Unlock After Days of Inactivity</label>
              <input
                type="number"
                value={unlockAfterDays}
                onChange={(e) => setUnlockAfterDays(Number(e.target.value))}
                className="w-full p-2 border rounded"
                required
                // min={1}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Set Trusted Contact
            </button>
          </form>
        </div>

        {/* Request Access */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Trusted Contact - Request Access</h2>
          <form onSubmit={handleRequestAccess} className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-700">Vault Owner Email</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition"
            >
              Request Access
            </button>
          </form>
        </div>

        {/* Unlock Vault */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Trusted Contact - Unlock Vault</h2>
          <form onSubmit={handleUnlockVault} className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-700">Vault Owner Email</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            >
              Unlock Vault
            </button>
          </form>

          {/* Show unlock results */}
          {unlockResults && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-green-700">Unlock Result</h3>
              <p className="text-gray-700 mb-2">{unlockResults.message}</p>
              {unlockResults.entries && (
                <div className="space-y-2">
                  {unlockResults.entries.map((entry) => (
                    <div key={entry._id} className="p-3 border rounded bg-gray-100">
                      <h4 className="font-bold">{entry.title}</h4>
                      <p className="text-sm text-gray-600">{entry.category}</p>
                      <p className="mt-1">{entry.encryptedContent}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrustedContact;
