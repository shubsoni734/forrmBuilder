import axios from "axios";
import React, { useState } from "react";

const CategoryQuestionForm = () => {
  const [question, setQuestion] = useState("");
  const [categories, setCategories] = useState(["Option 1", "Option 2"]);
  const [newCategory, setNewCategory] = useState("");
  const [item, setItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [itemsList, setItemsList] = useState([]);

  const handleAddCategory = () => {
    if (newCategory) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleEditCategory = (index) => {
    setEditIndex(index);
    setNewCategory(categories[index]);
  };

  const handleSaveEdit = () => {
    if (newCategory) {
      const updatedCategories = [...categories];
      updatedCategories[editIndex] = newCategory;
      setCategories(updatedCategories);
      setEditIndex(-1);
      setNewCategory("");
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(-1);
    setNewCategory("");
  };

  const handleAddItem = () => {
    if (item && selectedCategory) {
      setItemsList([...itemsList, { item, category: selectedCategory }]);
      setItem("");
      setSelectedCategory("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      question,
      categories,
      itemsList,
    };
    axios
      .post("http://127.0.0.1:5000/api/category-form", formData)
      .then((response) => {
        console.log("Form data submitted:", response.data);
        // Do any other necessary actions after successful form submission
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
        // Handle errors if the form submission fails
      });
    // console.log("Submitted:", { question, categories, itemsList });
  };

  const handleDeletecategories = (index) => {
    const updatedItemsList = [...categories];
    updatedItemsList.splice(index, 1);
    setCategories(updatedItemsList);
  };
  const handleDeleteItem = (index) => {
    const updatedItemsList = [...itemsList];
    updatedItemsList.splice(index, 1);
    setItemsList(updatedItemsList);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Question:</label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <br />
        <br />

        <label htmlFor="category">Categories:</label>
        <div>
          {categories.map((category, index) => (
            <div key={index}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <button type="button" onClick={handleSaveEdit}>
                    Save
                  </button>
                  <button type="button" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {category}
                  <button
                    type="button"
                    onClick={() => handleEditCategory(index)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeletecategories(index)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter a new category"
        />
        <button type="button" onClick={handleAddCategory}>
          Add Category
        </button>
        <br />
        <br />

        <label htmlFor="item">Create Item:</label>
        <input
          type="text"
          id="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />

        <label htmlFor="categoryDropdown">Select Category:</label>
        <select
          id="categoryDropdown"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleAddItem}>
          Add More Item
        </button>

        <ul>
          {itemsList.map((itemData, index) => (
            <li key={index}>
              Item: {itemData.item}, Category: {itemData.category}
              <button type="button" onClick={() => handleDeleteItem(index)}>
                Delete Item
              </button>
            </li>
          ))}
        </ul>

        <br />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CategoryQuestionForm;
