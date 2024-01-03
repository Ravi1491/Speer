import express from "express";

import authenticateUser from "../auth/auth";
import { searchNotes } from "../controllers/search";

const router = express.Router();

router.get("/", authenticateUser, searchNotes);

module.exports = router;
