const noteService = require("../services/noteService");

// CREATE NOTE
exports.createNote = async (req, res) => {
  try {
    const note = await noteService.createNoteService({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET NOTES
exports.getNotes = async (req, res) => {
  try {
    const notes = await noteService.getNotesService(req.user.id);

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE NOTE
exports.updateNote = async (req, res) => {
  try {
    const note = await noteService.updateNoteService({
      noteId: req.params.id,
      userId: req.user.id,
      data: req.body
    });

    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// DELETE NOTE
exports.deleteNote = async (req, res) => {
  try {
    await noteService.deleteNoteService({
      noteId: req.params.id,
      userId: req.user.id
    });

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};