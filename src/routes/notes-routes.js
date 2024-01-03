import express from "express";

import {
  createNote,
  deleteNoteById,
  getAllNotes,
  getNoteById,
  shareNoteById,
  updateNoteById,
} from "../controllers/notes";
import authenticateUser from "../auth/auth";

const router = express.Router();

router.get("/", authenticateUser, getAllNotes);
router.post("/", authenticateUser, createNote);
router.get("/:id", authenticateUser, getNoteById);
router.put("/:id", authenticateUser, updateNoteById);
router.delete("/:id", authenticateUser, deleteNoteById);
router.post("/:id/share", authenticateUser, shareNoteById);

module.exports = router;
