import React, { useState } from "react";
import { useUploadImageContext } from "../context/UploadImageContext";

const ImageUploadPage = () => {
  const { uploadImagesToServer } = useUploadImageContext();
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setSelectedImages(selectedFiles);
  };

  const handleUpload = async () => {
    if (selectedImages.length > 0) {
      const formData = new FormData();
      selectedImages.forEach((file) => {
        formData.append("images", file);
      });

      try {
        await uploadImagesToServer(formData);
        setSelectedImages([]);
        console.log("Images uploaded successfully!");
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }
  };

  return (
    <div>
      <h2>Image Upload Page</h2>
      <input
        type="file"
        multiple
        onChange={handleImageChange}
      />
      <button onClick={handleUpload}>Upload Images</button>
    </div>
  );
};

export default ImageUploadPage;
