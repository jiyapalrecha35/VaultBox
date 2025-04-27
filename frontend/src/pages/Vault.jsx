import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Make sure to import the CSS


function Vault() {
  const [vaultEntries, setVaultEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personal");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null); // track editing
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchVault();
  }, []);

  const fetchVault = async () => {
    try {
      const res = await api.get("/vault", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVaultEntries(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load vault entries.");
    }
  };

  const handleAddOrUpdateEntry = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        // Update mode
        await api.put(
          `/vault/${editingId}`,
          { title, category, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Entry updated successfully!");
      } else {
        // Add new entry
        await api.post(
          "/vault",
          { title, category, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Entry added successfully!");
      }
      setTitle("");
      setCategory("Personal");
      setContent("");
      setEditingId(null);
      fetchVault();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save entry.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEntry = async (id) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    try {
      await api.delete(`/vault/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchVault();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete entry.");
    }
  };

  const handleEditEntry = (entry) => {
    setTitle(entry.title);
    setCategory(entry.category);
    setContent(entry.content); // assuming backend sends decrypted content
    setEditingId(entry._id);
  };

  const handleCancelEdit = () => {
    setTitle("");
    setCategory("Personal");
    setContent("");
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center mt-6">VaultBox-Manage Vault</h1>

        {/* Add or Update Entry Form */}
        <form onSubmit={handleAddOrUpdateEntry} className="bg-white p-6 rounded shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">{editingId ? "Update Entry" : "Add New Entry"}</h2>

          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            >
              <option>Finance</option>
              <option>Health</option>
              <option>Personal</option>
              <option>Notes</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? (editingId ? "Updating..." : "Adding...") : (editingId ? "Update Entry" : "Add Entry")}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Vault Entries List */}
        <div className="grid gap-4">
          {vaultEntries.map((entry) => (
            <div key={entry._id} className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-bold">{entry.title}</h3>
              <p className="text-gray-600">{entry.category}</p>
              <p className="mt-2">{entry.encryptedContent || entry.content}</p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleEditEntry(entry)}
                  className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEntry(entry._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Vault;
