import React from "react";
import { useSelector } from "react-redux";
import { useGetImageQuery } from "../providers/redux/images/imageApi";

export const Image = () => {
  const { imageId, mimetype, thumb, filename } = useSelector(
    (state) => state.image.image
  );

  const {
    data: image,
    isLoading,
    isError,
  } = useGetImageQuery(imageId, {
    skip: !imageId,
    enabled: !!imageId,
  });

  if (isLoading) {
    return (
      <div className="image__imageBox">
        <img
          src={`data:${mimetype};base64,${thumb.toString("base64")}`}
          alt={filename}
          className="image__imageBox__img"
        />
      </div>
    );
  }
  if (isError) {
    return <p>Error loading image</p>;
  }

  return (
    <div className="image__imageBox">
      <img
        src={`data:${image.mimetype};base64,${image.image.toString("base64")}`}
        alt={image.filename}
        className="image__imageBox__img"
      />
    </div>
  );
};
