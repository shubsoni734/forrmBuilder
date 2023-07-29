const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Possible values: 'Categorize', 'Cloze', 'Comprehension'
  questionText: { type: String, required: true },
  image: { type: String }, // URL to the image for the question
  // Add more fields specific to each question type as needed
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
