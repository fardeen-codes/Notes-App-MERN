const express = require("express");
const router = express.Router();
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote
} = require("../controllers/noteController");

const protect = require("../middleware/authMiddleware");

router.post("/createnote", protect, createNote);
router.get("/getnotes", protect, getNotes);
router.patch("/updatenote/:id", protect, updateNote);
router.delete("/deletenote/:id", protect, deleteNote);

module.exports = router;
