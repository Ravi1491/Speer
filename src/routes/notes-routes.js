import express from "express";

import {
  createNote,
  deleteNoteById,
  getAllNotes,
  getNoteById,
  shareNoteById,
  updateNoteById,
} from "../controllers/notes";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNote);
router.get("/:id", getNoteById);
router.put("/:id", updateNoteById);
router.delete("/:id", deleteNoteById);
router.post("/:id/share", shareNoteById);

module.exports = router;
