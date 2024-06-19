import React, { useState } from "react";
import "../style/ImageViewer.css";

function ImageViewer({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="ImageViewer">
      {images.length > 0 && (
        <>
          <div className="image-container">
            <button className="nav-button" onClick={handlePrevious}>
              &lt;
            </button>
            <img
              src={URL.createObjectURL(images[currentImageIndex])}
              alt="Uploaded"
            />
            <button className="nav-button" onClick={handleNext}>
              &gt;
            </button>
          </div>
          <p>
            {currentImageIndex + 1} / {images.length}
          </p>
        </>
      )}
    </div>
  );
}

export default ImageViewer;
