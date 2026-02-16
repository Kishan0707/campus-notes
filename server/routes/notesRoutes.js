import express from "express";
import db from "../config/db.js";
import multer from "multer";
import path from "path";

const router = express.Router();

/* =========================
   MULTER CONFIG
========================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files allowed"), false);
    }
  },
});

/* =========================
   UPLOAD PDF NOTE
   POST /api/notes/upload
========================= */
router.post("/upload", upload.single("pdf"), (req, res) => {
  const { title, subject_id, semester_id, uploaded_by } = req.body;

  if (!title || !subject_id || !semester_id || !uploaded_by) {
    return res.status(400).json({ error: "All fields required" });
  }

  if (!req.file) {
    return res.status(400).json({ error: "PDF file required" });
  }

  const fileUrl = `/uploads/${req.file.filename}`;

  const sql = `
    INSERT INTO notes
    (title, file_url, subject_id, semester_id, uploaded_by)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, fileUrl, subject_id, semester_id, uploaded_by],
    (err, result) => {
      if (err) {
        console.error("❌ Upload error:", err.message);
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        message: "✅ PDF uploaded successfully",
        noteId: result.insertId,
      });
    }
  );
});

/* =========================
   GET ALL NOTES
   GET /api/notes
========================= */
router.get("/", (req, res) => {
  const sql = `
    SELECT
      n.id,
      n.title,
      n.file_url,
      s.name AS subject,
      sem.name AS semester,
      u.name AS uploaded_by,
      n.created_at
    FROM notes n
    LEFT JOIN subjects s ON n.subject_id = s.id
    LEFT JOIN semesters sem ON n.semester_id = sem.id
    LEFT JOIN users u ON n.uploaded_by = u.id
    ORDER BY n.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching notes:", err.message);
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});

export default router;