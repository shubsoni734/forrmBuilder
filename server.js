const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const mongoURI = "mongodb://localhost:27017/task";
mongoose.connect("mongodb://127.0.0.1:27017/Task")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Form and Question Models (Assuming you have these defined in separate files)
const Form = require("./models/Form.js");
const Question = require("./models/Question");

// Routes for handling form and question CRUD operations
app.post("/api/forms", (req, res) => {
  // Implement logic to create a new form and save it to the database
  // Use Form model to create a new form
});

app.get("/api/forms/:formId", (req, res) => {
  // Implement logic to get a form by its ID from the database
  // Use Form model to find the form by ID and populate its questions
});

app.put("/api/forms/:formId", (req, res) => {
  // Implement logic to update a form by its ID in the database
  // Use Form model to find the form by ID and update its properties
});

app.delete("/api/forms/:formId", (req, res) => {
  // Implement logic to delete a form by its ID from the database
  // Use Form model to find the form by ID and remove it from the database
});

app.post("/api/questions", (req, res) => {
  // Implement logic to create a new question and save it to the database
  // Use Question model to create a new question
});

app.put("/api/questions/:questionId", (req, res) => {
  // Implement logic to update a question by its ID in the database
  // Use Question model to find the question by ID and update its properties
});

app.delete("/api/questions/:questionId", (req, res) => {
  // Implement logic to delete a question by its ID from the database
  // Use Question model to find the question by ID and remove it from the database
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
