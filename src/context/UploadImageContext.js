import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { base_url } from "../utils/baseUrl";
import { config } from "../utils/config";

const UploadImageContext = createContext();

export const useUploadImageContext = () => useContext(UploadImageContext);

export const UploadImageProvider = ({ children }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const addUploadedImages = (images) => {
    setUploadedImages((prevImages) => [...prevImages, ...images]);
  };

  const clearUploadedImages = () => {
    setUploadedImages([]);
  };

  const uploadImagesToServer = async (data) => {
    try {
      const response = await axios.post(`${base_url}upload/`, data, config);
      // Assuming the server responds with the uploaded image URLs
      const uploadedImageUrls = response.data;
      addUploadedImages(uploadedImageUrls);
      return uploadedImageUrls;
    } catch (error) {
      console.error("Error uploading images:", error);
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  };

  const deleteImageFromServer = async (id) => {
    try {
      await axios.delete(`${base_url}upload/delete-img/${id}`, config);
      // Assuming successful deletion, remove the image from state
      setUploadedImages((prevImages) =>
        prevImages.filter((image) => image.id !== id)
      );
    } catch (error) {
      console.error("Error deleting image:", error);
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <UploadImageContext.Provider
      value={{
        uploadedImages,
        addUploadedImages,
        clearUploadedImages,
        uploadImagesToServer,
        deleteImageFromServer,
      }}
    >
      {children}
    </UploadImageContext.Provider>
  );
};
