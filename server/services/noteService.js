const Note = require("../models/Note");

// CREATE
exports.createNoteService = async ({ title, content, userId }) => {
  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  const note = await Note.create({
    title,
    content,
    user: userId
  });

  return note;
};

// GET ALL
exports.getNotesService = async (userId) => {
  const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
  return notes;
};

// UPDATE
exports.updateNoteService = async ({ noteId, userId, data }) => {
  const note = await Note.findOneAndUpdate(
    { _id: noteId, user: userId },
    data,
    { new: true }
  );

  if (!note) {
    throw new Error("Note not found");
  }

  return note;
};

// DELETE
exports.deleteNoteService = async ({ noteId, userId }) => {
  const note = await Note.findOneAndDelete({
    _id: noteId,
    user: userId
  });

  if (!note) {
    throw new Error("Note not found");
  }

  return;
};