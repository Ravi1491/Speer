const rateLimit = require("express-rate-limit");

export const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 60,
  message: "Too many requests from this IP, please try again later",
});
