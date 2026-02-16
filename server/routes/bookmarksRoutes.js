import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT
      b.id,
      b.note_id,
      n.title,
      n.file_url,
      s.name AS subject,
      sem.name AS semester,
      u.name AS uploaded_by
    FROM bookmarks b
    JOIN notes n ON b.note_id = n.id
    LEFT JOIN subjects s ON n.subject_id = s.id
    LEFT JOIN semesters sem ON n.semester_id = sem.id
    LEFT JOIN users u ON n.uploaded_by = u.id
    WHERE b.user_id = ?
    ORDER BY b.created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("❌ BOOKMARK FETCH ERROR:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
router.get("/count/:userId", (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT COUNT(*) AS count
    FROM bookmarks
    WHERE user_id = ?
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("❌ BOOKMARK COUNT ERROR:", err.sqlMessage);
      return res.status(500).json({ error: err.sqlMessage });
    }

    // VERY IMPORTANT
    res.json({
      count: result[0].count,
    });
  });
});
router.post("/toggle", (req, res) => {
  const { userId, noteId } = req.body;

  if (!userId || !noteId) {
    return res.status(400).json({ error: "userId and noteId are required" });
  }

  const checkSql = "SELECT id FROM bookmarks WHERE user_id = ? AND note_id = ?";

  db.query(checkSql, [userId, noteId], (err, rows) => {
    if (err) {
      console.error("❌ CHECK ERROR:", err.message);
      return res.status(500).json({ error: err.message });
    }

    if (rows.length > 0) {
      const deleteSql =
        "DELETE FROM bookmarks WHERE user_id = ? AND note_id = ?";

      db.query(deleteSql, [userId, noteId], (err) => {
        if (err) {
          console.error("❌ DELETE ERROR:", err.message);
          return res.status(500).json({ error: err.message });
        }

        return res.json({ message: "Bookmark removed" });
      });
    } else {
      const insertSql =
        "INSERT INTO bookmarks (user_id, note_id) VALUES (?, ?)";

      db.query(insertSql, [userId, noteId], (err) => {
        if (err) {
          console.error("❌ INSERT ERROR:", err.message);
          return res.status(500).json({ error: err.message });
        }

        return res.json({ message: "Bookmark added" });
      });
    }
  });
});

export default router;
