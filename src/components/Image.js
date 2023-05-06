import React from "react";
import { useSelector } from "react-redux";
import { useGetImageQuery } from "../providers/redux/images/imageApi";

export const Image = () => {
  const imageId = useSelector((state) => state.image.imageId);
  console.log(imageId);
  const {
    data: image,
    isLoading,
    isError,
  } = useGetImageQuery(imageId, {
    skip: !imageId,
  });

  if (isLoading) return <p>...Loading image...</p>;
  if (isError) return <p>Error loading image</p>;

  return (
    <div className="image__imageBox">
      <img
        src={`data:${image.mimetype};base64,${image.image.toString("base64")}`}
        alt=""
        className="image__imageBox__img"
      />
    </div>
  );
};
