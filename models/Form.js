const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  items: {
    type: [
      {
        item: String,
        category: String,
      },
    ],
    required: true,
  },
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
