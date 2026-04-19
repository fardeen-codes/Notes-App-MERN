const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// cors
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// middlewares
app.use(express.json());

// DB connect
require("./config/db");

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

