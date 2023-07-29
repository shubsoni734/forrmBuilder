const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Form = require("./models/Form.js");
const Question = require("./models/Question");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const mongoURI = "mongodb://localhost:27017/task";
mongoose
  .connect("mongodb://127.0.0.1:27017/Task")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Form and Question Models (Assuming you have these defined in separate files)

// Routes for handling form and question CRUD operations
app.post("/api/forms", async (req, res) => {
  try {
    const { title, description, headerImage, questions } = req.body;

    // Create a new form object based on the request data
    const newForm = new Form({
      title,
      description,
      headerImage,
      questions,
    });

    // Save the new form to the database
    const savedForm = await newForm.save();

    res.status(201).json(savedForm);
  } catch (error) {
    console.error("Error creating form:", error);
    res.status(500).json({ error: "Error creating form" });
  }
});

app.get("/api/forms/:formId ", async (req, res) => {
  try {
    const { formId } = req.params;
    const form = await Form.findById(formId).populate("questions");

    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    // res.status(200).json("hello how are");

    res.status(200).json(form);
  } catch (error) {
    console.error("Error retrieving form:", error);
    res.status(500).json({ error: "Error retrieving form" });
  }
});

app.put("/api/forms/:formId", async (req, res) => {
  try {
    const { formId } = req.params;
    const { title, description, headerImage, questions } = req.body;

    // Find the form by its ID in the database
    const formToUpdate = await Form.findById(formId);

    // If the form does not exist, return an error response
    if (!formToUpdate) {
      return res.status(404).json({ error: "Form not found" });
    }

    // Update the form properties based on the request data
    formToUpdate.title = title;
    formToUpdate.description = description;
    formToUpdate.headerImage = headerImage;
    formToUpdate.questions = questions;

    // Save the updated form to the database
    const updatedForm = await formToUpdate.save();

    res.status(200).json(updatedForm);
  } catch (error) {
    console.error("Error updating form:", error);
    res.status(500).json({ error: "Error updating form" });
  }
});

app.delete("/api/forms/:formId", async (req, res) => {
  try {
    const { formId } = req.params;

    // Find the form by its ID in the database
    const formToDelete = await Form.findById(formId);

    // If the form does not exist, return an error response
    if (!formToDelete) {
      return res.status(404).json({ error: "Form not found" });
    }

    // Delete the form from the database
    await formToDelete.remove();

    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error("Error deleting form:", error);
    res.status(500).json({ error: "Error deleting form" });
  }
});

app.post("/api/questions", async (req, res) => {
  try {
    const { type, questionText, image } = req.body;

    // Create a new question object based on the request data
    const newQuestion = new Question({
      type,
      questionText,
      image,
      // Add additional fields based on the questionType
    });

    // Save the new question to the database
    const savedQuestion = await newQuestion.save();
    // res.status(201).json("hello");

    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ error: "Error creating question" });
  }
});

app.put("/api/questions/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;
    const { type, questionText, image } = req.body;

    // Find the question by its ID in the database
    const questionToUpdate = await Question.findById(questionId);

    // If the question does not exist, return an error response
    if (!questionToUpdate) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Update the question properties based on the request data
    questionToUpdate.type = type;
    questionToUpdate.questionText = questionText;
    questionToUpdate.image = image;
    // Update additional fields based on the questionType

    // Save the updated question to the database
    const updatedQuestion = await questionToUpdate.save();

    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ error: "Error updating question" });
  }
});

app.delete("/api/questions/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;

    // Find the question by its ID in the database
    const questionToDelete = await Question.findById(questionId);

    // If the question does not exist, return an error response
    if (!questionToDelete) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Delete the question from the database
    await questionToDelete.remove();

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ error: "Error deleting question" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
