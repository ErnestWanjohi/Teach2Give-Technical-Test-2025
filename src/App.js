import React from "react";
import "./App.css";
import FeedbackModal from "./components/FeedbackModal/FeedbackModal";

function App() {
  const handleSubmit = (rating) => {
    console.log("User rating:", rating);
    // sends selected rating to console
    alert(`Thanks for your ${rating} rating!`);
  };

  return (
    <div className="App">
      <h1>Give Feedback By Selecting the Button</h1>
      <FeedbackModal onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
