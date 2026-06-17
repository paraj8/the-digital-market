const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "The Digital Market API Running 🚀",
  });
});

module.exports = app;