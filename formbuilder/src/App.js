import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FormBuilder from "./components/FormBuilder";
import Form from "./components/Form";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/form-builder">Form Builder</Link>
            </li>
            {/* Add other navigation links as needed */}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route path="/forms/:formId" element={<Form />} />
          {/* Add other routes for different components and pages */}
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => {
  return <h2>Welcome to the Home Page</h2>;
};

export default App;
