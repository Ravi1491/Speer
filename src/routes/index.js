import express from "express";
import userRouter from "./user-routes";
import notesRouter from "./notes-routes";
import searchRouter from "./search-route";
import authenticateUser from "../auth/auth";
import { limiter } from "../utils/rate-limiter";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.send("Welcome to Speer!!!");
});

router.use("/api/auth", limiter, userRouter);
router.use("/api/notes", limiter, authenticateUser, notesRouter);
router.use("/api/search", limiter, authenticateUser, searchRouter);

module.exports = router;
