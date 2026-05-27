const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/questions");
const aiRoutes = require("./routes/ai");

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/ai", aiRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000,
})
.then(() => console.log("MongoDB connected"))
.catch((err) =>
  console.log("MongoDB connection failed:", err.message)
);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});