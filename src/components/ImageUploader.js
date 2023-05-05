import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAddImageMutation } from "../providers/redux/images/imageApi";

export const ImageUploader = ({ _id, setIsGetImages }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxFiles: 5,
    maxSize: 3 * 1024 * 1024,
    onDrop: (acceptedFiles) => {
      uploadImages(acceptedFiles);
    },
  });

  const [addImage, { isLoading }] = useAddImageMutation({
    onError: (error) => {
      console.error(error);
    },
  });
  const uploadImages = async (files) => {
    try {
      // const body = new FormData();
      // files.forEach((file) => {
      //   body.append("images", file);
      // });
      // body.append("task", _id);
      // await addImage(body);
      // setIsGetImages(true);

      const body = new FormData();
      let totalSize = 0;
      files.forEach((file) => {
        totalSize += file.size;
        if (!["image/jpeg", "image/png"].includes(file.type)) {
          setErrorMessage("Invalid file format");
          console.log(errorMessage);
          return;
        }
        if (files.length > 5) {
          setErrorMessage("Maximum number of files - 5");
          console.log(errorMessage);
          return;
        }
      });
      if (totalSize > 15 * 1024 * 1024) {
        setErrorMessage("Maximum file size - 3 MB");
        console.log(errorMessage);

        return;
      }
      files.forEach((file) => {
        body.append("images", file);
      });
      body.append("task", _id);
      await addImage(body);
      setIsGetImages(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="image__uploadBox" {...getRootProps()}>
      <input {...getInputProps()} />
      <p className="image__uploadBox__title">You can drop your images here</p>
      {acceptedFiles.map((file) => (
        <div key={file.name}>
          <span>{file.name}</span>
        </div>
      ))}
      {isLoading && <p>...Loading...</p>}
    </div>
  );
};
