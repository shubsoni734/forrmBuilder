import React, { useState } from "react";
import axios from "axios";

const FormBuilder = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    headerImage: "",
    questions: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleAddQuestion = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: [
        ...prevFormData.questions,
        { type: "", questionText: "", image: "" },
      ],
    }));
  };

  const handleQuestionChange = (event, index) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updatedQuestions = [...prevFormData.questions];
      updatedQuestions[index] = { ...updatedQuestions[index], [name]: value };
      return { ...prevFormData, questions: updatedQuestions };
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const formToSend = {
        ...formData,
        questions: formData.questions.map((question) => ({
          ...question,
          // Remove any empty properties (optional)
          // Only include properties that have values
        })),
      };
      const response = await axios.post(
        "http://127.0.0.1:5000/api/forms",
        formToSend
      ); // Change the API endpoint as needed
      console.log("Form created successfully:", response.data);
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("Error creating form:", error);
      // Handle error (e.g., show an error message, etc.)
    }
  };

  return (
    <div>
      <h2>Form Builder</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Header Image URL:
          <input
            type="text"
            name="headerImage"
            value={formData.headerImage}
            onChange={handleInputChange}
          />
        </label>

        <h3>Questions:</h3>
        {formData.questions.map((question, index) => (
          <div key={index}>
            <label>
              Question Type:
              <input
                type="text"
                name="type"
                value={question.type}
                onChange={(event) => handleQuestionChange(event, index)}
                required
              />
            </label>
            <label>
              Question Text:
              <input
                type="text"
                name="questionText"
                value={question.questionText}
                onChange={(event) => handleQuestionChange(event, index)}
                required
              />
            </label>
            <label>
              Question Image URL:
              <input
                type="text"
                name="image"
                value={question.image}
                onChange={(event) => handleQuestionChange(event, index)}
              />
            </label>
          </div>
        ))}

        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>
        <button type="submit">Create Form</button>
      </form>
    </div>
  );
};

export default FormBuilder;
