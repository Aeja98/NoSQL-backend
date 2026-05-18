require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const workexpRoutes = require("./routes/workexp");

const app = express();
const PORT = process.env.PORT || 3000;

//middleware - run before any route (GET, POST, etc)

//allow frontend from another domain/port to make requests to backend
app.use(cors());

//parse JSON requests + make data available in req.body
app.use(express.json());

//test route
app.get("/", (req, res) => {
  res.json({
    message: "Work Experience API is running"
  });
});

//routes
app.use("/api/workexp", workexpRoutes);

//connect to MongoDB and then start server
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });