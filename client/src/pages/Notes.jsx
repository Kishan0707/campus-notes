import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import { toast } from "react-toastify";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("campusUser"));

  useEffect(() => {
    fetchNotes();
  }, []);

  // =====================
  // FETCH NOTES
  // =====================
  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes");
      setNotes(res.data);
    } catch (error) {
      console.error("❌ Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async (noteId) => {
    try {
      await axios.post("http://localhost:5000/api/bookmarks/toggle", {
        userId: user.id,
        noteId,
      });
      toast.success("❤️ Bookmarked successfully");
    } catch (err) {
      console.log(err.response?.data);
      console.log(err.message);
      // alert(JSON.stringify(err.response?.data));
      toast.error(err.response?.data?.error || "Bookmark failed");
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Notes Library</h2>

      {loading ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p>No notes found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg mb-2">{note.title}</h3>

              <p className="text-sm text-gray-600">Subject: {note.subject}</p>
              <p className="text-sm text-gray-600">Semester: {note.semester}</p>
              <p className="text-sm text-gray-500 mb-3">
                Uploaded by: {note.uploaded_by}
              </p>

              <div className="flex items-center justify-between">
                <a
                  href={`http://localhost:5000${note.file_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View / Download
                </a>

                <button
                  onClick={() => handleBookmark(note.id)}
                  className="text-red-500 text-sm hover:scale-110 transition"
                  title="Bookmark"
                >
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Notes;
