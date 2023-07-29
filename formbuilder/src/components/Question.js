import React, { useState } from "react";
import axios from "axios";

const Question = ({ questionData }) => {
  const [question, setQuestion] = useState(questionData);

  const handleQuestionChange = (event) => {
    const { name, value } = event.target;
    setQuestion((prevQuestion) => ({ ...prevQuestion, [name]: value }));
  };

  const handleUpdateQuestion = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/api/questions/${question._id}`,
        question
      ); // Change the API endpoint as needed
      console.log("Question updated successfully:", response.data);
      // Handle success (e.g., show a success message, trigger a form data update, etc.)
    } catch (error) {
      console.error("Error updating question:", error);
      // Handle error (e.g., show an error message, display validation errors, etc.)
    }
  };

  const handleDeleteQuestion = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/api/questions/${question._id}`
      ); // Change the API endpoint as needed
      console.log("Question deleted successfully:", response.data);
      // Handle success (e.g., show a success message, trigger a form data update, etc.)
    } catch (error) {
      console.error("Error deleting question:", error);
      // Handle error (e.g., show an error message, etc.)
    }
  };

  return (
    <div>
      <label>
        Question Text:
        <input
          type="text"
          name="questionText"
          value={question.questionText}
          onChange={handleQuestionChange}
        />
      </label>
      <label>
        Question Image URL:
        <input
          type="text"
          name="image"
          value={question.image}
          onChange={handleQuestionChange}
        />
      </label>
      {/* Additional fields based on question type */}
      <button type="button" onClick={handleUpdateQuestion}>
        Update Question
      </button>
      <button type="button" onClick={handleDeleteQuestion}>
        Delete Question
      </button>
    </div>
  );
};

export default Question;
