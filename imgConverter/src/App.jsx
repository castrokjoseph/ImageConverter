// src/App.js
import React from "react";
//import ImageUploader from "../components/ImageUploader.jsx";
import ImageUploader from "./components/ImageUploader";
import "./App.css";

function App() {
  return (
    <div>
      <div>
        <h1>Image Format Converter</h1>
      </div>
      <div className="App">
        <ImageUploader />
      </div>
    </div>
  );
}

export default App;
