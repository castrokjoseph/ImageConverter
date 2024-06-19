import { useState, useRef } from "react";
//import { convertImage, downloadFiles } from "../Utils/imageUtils";
import { convertImage, downloadFiles } from "../Utils/imageUtils";
import ImageViewer from "./ImageViewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImage,
  faFile,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons/faFileAlt";
import "../style/ImageUploader.css";

function ImageUploader() {
  const [files, setFiles] = useState([]);
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [format, setFormat] = useState("png");
  const [conversionInProgress, setConversionInProgress] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 10) {
      alert("You can upload a maximum of 10 files");
      return;
    }
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleConvert = async () => {
    setConversionInProgress(true);
    const converted = await Promise.all(
      files.map((file) => convertImage(file, format))
    );
    setConvertedFiles(converted);
    setConversionInProgress(false);
  };

  const handleDownload = () => {
    downloadFiles(convertedFiles);
  };
  const handleClear = () => {
    setFiles([]);
    setConvertedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <div className="ImageUploader">
      <ImageViewer images={files} />
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
      />
      <select onChange={(e) => setFormat(e.target.value)} value={format}>
        <option value="png">PNG</option>
        <option value="jpeg">JPEG</option>
        <option value="webp">WEBP</option>
      </select>
      <button
        onClick={handleConvert}
        disabled={!files.length || conversionInProgress}
      >
        {files.length > 1 ? (
          <FontAwesomeIcon icon={faFileAlt} />
        ) : (
          <FontAwesomeIcon icon={faFile} />
        )}
        &nbsp; {conversionInProgress ? "Converting..." : "Convert"}
      </button>
      <button onClick={handleDownload} disabled={!convertedFiles.length}>
        {convertedFiles.length > 1 ? (
          <FontAwesomeIcon icon={faFileImage} />
        ) : (
          <FontAwesomeIcon icon={faFile} />
        )}
        &nbsp; Download
      </button>
      <button
        onClick={handleClear}
        disabled={!files.length && !convertedFiles.length}
      >
        <FontAwesomeIcon icon={faTrash} />
        &nbsp; Clear
      </button>
      <div className="file-list">
        <h3>Uploaded Files</h3>
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ImageUploader;
