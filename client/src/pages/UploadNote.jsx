import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardLayout from "../layouts/DashboardLayout";
const API_URL = import.meta.env.VITE_API_URL;

const UploadNote = () => {
  const user = JSON.parse(localStorage.getItem("campusUser"));

  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !subjectId || !semesterId || !pdf) {
      toast.error("All fields required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject_id", subjectId);
    formData.append("semester_id", semesterId);
    formData.append("uploaded_by", user.id);
    formData.append("pdf", pdf);

    try {
      setLoading(true);

      await axios.post(`${API_URL}/notes/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-user-role": user.role,
        },
      });

      toast.success("📁 PDF uploaded successfully");

      // reset
      setTitle("");
      setSubjectId("");
      setSemesterId("");
      setPdf(null);
    } catch (err) {
      toast.error(err.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Upload Note</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-md"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border mb-3"
        />

        <input
          type="number"
          placeholder="Subject ID (e.g. 1)"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="w-full p-2 border mb-3"
        />

        <input
          type="number"
          placeholder="Semester ID (e.g. 2)"
          value={semesterId}
          onChange={(e) => setSemesterId(e.target.value)}
          className="w-full p-2 border mb-3"
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdf(e.target.files[0])}
          className="mb-4"
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload PDF"}
        </button>
      </form>
    </DashboardLayout>
  );
};

export default UploadNote;
