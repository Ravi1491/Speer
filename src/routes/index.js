import express from "express";
import userRouter from "./user-routes";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.send("Welcome to Speer!!!");
});

router.use("/api/auth", userRouter);

module.exports = router;
