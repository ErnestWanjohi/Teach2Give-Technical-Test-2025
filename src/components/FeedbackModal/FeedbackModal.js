import React, { useState, useRef, useEffect } from "react"; //useState - component mgmnt useRef -DOM elements accessing useEffect - just an name suggest for effects
import "./FeedbackModal.css";

const FeedbackModal = ({ triggerButtonText = "Give Feedback", onSubmit }) => {
  //functiona component that triggers button and calls a function
  const [isOpen, setIsOpen] = useState(false); //controls modal visibility
  const [selectedRating, setSelectedRating] = useState(null); //for rating
  const [hoverRating, setHoverRating] = useState(null); //for hover effect
  const modalRef = useRef(null); //ref to modal DOM element

  const handleOpenModal = () => {
    //open modal
    setIsOpen(true);
    document.body.style.overflow = "hidden"; //event handler that prevents scrolling of page
  };

  const handleCloseModal = () => {
    //close modal
    setIsOpen(false);
    setSelectedRating(null);
    setHoverRating(null);
    document.body.style.overflow = "auto"; //scrolling is now available
  };

  const handleSubmit = () => {
    //submission function
    if (selectedRating !== null) {
      if (onSubmit) {
        onSubmit(selectedRating);
      }
      handleCloseModal();
    }
  };

  const handleClickOutside = (event) => {
    //modal gest closed once clicked outside
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    //modal visibility effect
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    //triggers button once clicked
    <div className="feedback-container">
      <button className="feedback-trigger" onClick={handleOpenModal}>
        {triggerButtonText}
      </button>
      {isOpen && (
        <div className="modal-overlay">
          <div className="feedback-modal" ref={modalRef}>
            <h2 className="modal-title">
              How likely are you to recommend This website
              <br />
              to someone you know?
            </h2>

            <div className="rating-scale">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                (
                  number //rating scale 1 to 10
                ) => (
                  <button
                    key={number}
                    className={`rating-number ${
                      selectedRating === number ? "selected" : ""
                    } ${
                      hoverRating !== null && number <= hoverRating //updates states on clicked events
                        ? "hovered"
                        : ""
                    }`}
                    onClick={() => setSelectedRating(number)}
                    onMouseEnter={() => setHoverRating(number)}
                    onMouseLeave={() => setHoverRating(null)}
                  >
                    {number}
                  </button>
                )
              )}
            </div>

            <div className="rating-labels">
              <span>Not likely at all</span>
              <span>Extremely Likely</span>
            </div>

            <div className="modal-actions">
              <button className="cancel-button" onClick={handleCloseModal}>
                Cancel
              </button>
              <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={selectedRating === null}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackModal;
