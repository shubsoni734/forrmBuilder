import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = ({ formId }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    headerImage: "",
    questions: [],
  });

  useEffect(() => {
    if (formId) {
      fetchFormData();
    }
  }, [formId]);

  const fetchFormData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/forms/${formId}`
      ); // Change the API endpoint as needed
      setForm(response.data);
    } catch (error) {
      console.error("Error fetching form data:", error);
      // Handle error (e.g., show an error message, redirect to form list, etc.)
    }
  };

  return (
    <div>
      <h2>{form.title}</h2>
      <p>{form.description}</p>
      {form.headerImage && (
        <img
          src={form.headerImage}
          alt="Form Header"
          style={{ width: "100%" }}
        />
      )}

      <h3>Questions:</h3>
      {form.questions.map((question, index) => (
        <div key={index}>
          <h4>{question.questionText}</h4>
          {question.image && (
            <img
              src={question.image}
              alt="Question Image"
              style={{ width: "50%" }}
            />
          )}
          {/* Render additional fields based on question type */}
        </div>
      ))}
    </div>
  );
};

export default Form;
