import React, { useState } from "react";

function ImageUploader() {
  const [file, setFile] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { type } = event.dataTransfer.files[0];
    if (type.startsWith("image/")) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (event) => {
    const { type } = event.target.files[0];
    if (type.startsWith("image/")) {
      setFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className="image-uploader"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <label htmlFor="image-input">Drag & Drop an Image or Choose File</label>
      <input
        type="file"
        id="image-input"
        accept="image/*"
        onChange={handleInputChange}
      />
      {file && <img src={URL.createObjectURL(file)} alt="uploaded" />}
    </div>
  );
}

export default ImageUploader;
