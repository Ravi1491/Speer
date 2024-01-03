import "reflect-metadata";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
