const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  headerImage: { type: String }, // URL to the header image
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
