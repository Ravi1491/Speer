import express from "express";
import userRouter from "./user-routes";
import notesRouter from "./notes-routes";
import searchRouter from "./search-route";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.send("Welcome to Speer!!!");
});

router.use("/api/auth", userRouter);
router.use("/api/notes", notesRouter);
router.use("/api/search", searchRouter);

module.exports = router;
