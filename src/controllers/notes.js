import * as noteService from "../services/notes";

export async function getAllNotes(req, res) {
  try {
    const userId = req.user.id;
    console.log(userId);

    const notes = await noteService.findAllNotes({ userId });
    console.log(notes);

    res.json({ notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getNoteById(req, res) {
  const noteId = req.params.id;

  try {
    const note = await noteService.findOneNote({ id: noteId });
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createNote(req, res) {
  const { title, description } = req.body;

  try {
    const newNote = await noteService.createNote({
      title,
      description,
      userId: req.user.id,
    });

    res
      .status(201)
      .json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateNoteById(req, res) {
  const noteId = req.params.id;
  const { title, description } = req.body;

  try {
    const updatedNote = await noteService.updateNoteById(noteId, {
      title,
      description,
    });

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteNoteById(req, res) {
  const noteId = req.params.id;

  try {
    const isDeleted = await noteService.deleteNoteById(noteId);

    if (!isDeleted) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function shareNoteById(req, res) {
  const noteId = req.params.id;
  const targetUserId = req.body.targetUserId;

  try {
    const note = await noteService.findOneNote({
      id: noteId,
      userId: req.user.id,
    });
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    const isShared = await noteService.createShareNote({
      noteId,
      userId: targetUserId,
    });
    if (!isShared) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note shared successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
