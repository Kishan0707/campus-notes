import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [bookmarksCount, setBookmarkCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("campusUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchBookmarkCount();
      fetchNotes();
    }
  }, [user]);

  const fetchBookmarkCount = async () => {
    try {
      const res = await axios.get(`${API_URL}/bookmarks/count/${user.id}`);
      setBookmarkCount(res.data.count);
    } catch (err) {
      toast.error("❌ Error fetching bookmark count", err);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API_URL}/notes`);
      setNotes(res.data);
    } catch (err) {
      toast.error("❌ Error fetching notes", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">
        Welcome {user?.name || "Student"}
      </h2>
      <p className="capitalize mb-6">Role: {user?.role}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow hover:shadow-lg">
          <h2 className="font-semibold text-lg">Total Notes</h2>
          <p className="text-3xl mt-2">{notes.length}</p>
        </div>

        <div className="bg-white p-6 rounded shadow hover:shadow-lg">
          <h2 className="font-semibold text-lg">My Bookmarks</h2>
          {loading ? (
            <p className="mt-2 text-xl">Loading...</p>
          ) : (
            <p className="mt-2 text-3xl text-green-600 font-bold">
              {bookmarksCount}
            </p>
          )}
        </div>

        <div className="bg-white p-6 rounded shadow hover:shadow-lg">
          <h2 className="font-semibold text-lg">Recent Uploads</h2>
          <p className="text-3xl mt-2">{notes.slice(0, 3).length}</p>
        </div>
      </div>
      {user?.role === "teacher" && (
        <div className="bg-blue-100 p-4 rounded mt-6">
          <p className="font-semibold">
            Teacher Panel: Upload notes from sidebar
          </p>
        </div>
      )}
      {user?.role === "admin" && (
        <div className="bg-red-100 p-6 rounded mt-6">
          <p className="font-semibold">
            Admin Panel: Manage all use and content
          </p>
        </div>
      )}
      <div className="bg-white p-6 rounded shadow mt-8">
        <h3 className="text-lg font-bold mb-4">Recent Notes</h3>

        {loading ? (
          <p>Loading notes...</p>
        ) : notes.length === 0 ? (
          <p>No notes available</p>
        ) : (
          <div className="space-y-4">
            {notes.slice(0, 3).map((note) => (
              <div
                key={note.id}
                className="border p-4 rounded hover:bg-gray-50"
              >
                <h4 className="font-semibold">{note.title}</h4>
                <p className="text-sm text-gray-500">
                  {note.subject} • {note.semester}
                </p>
                <p className="text-sm text-gray-400">
                  Uploaded by {note.uploaded_by}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
