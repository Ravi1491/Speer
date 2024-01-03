import express from "express";
import userRouter from "./user-routes";
import notesRouter from "./notes-routes";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.send("Welcome to Speer!!!");
});

router.use("/api/auth", userRouter);
router.use("/api/notes", notesRouter);

module.exports = router;
