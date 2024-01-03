import express from "express";

import { searchNotes } from "../controllers/search";

const router = express.Router();

router.get("/", searchNotes);

module.exports = router;
