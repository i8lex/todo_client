import React, { useState } from "react";
import { useGetThumbsQuery } from "../providers/redux/images/imageApi";
// import { useDispatch } from "react-redux";
import { ModalThumbsList } from "./ModalThumbsList";
import ImageUploader from "./ImageUploader";
// import { setImageId } from "../providers/redux/images/imageSlice";

export const ThumbList = ({ _id, images }) => {
  // const dispatch = useDispatch();
  const [isThumbsOpen, setIsThumbsOpen] = useState(false);
  const [imageId, setImageId] = useState("");
  const { data = [], isLoading } = useGetThumbsQuery(_id);

  if (isLoading) {
    return <h3>...LOADING...</h3>;
  }

  const modalThumbsHandler = () => {
    setIsThumbsOpen(!isThumbsOpen);
  };

  const handleFileSelect = (files) => {
    // Handle the selected files
    console.log(files);
  };
  return (
    <>
      {!images.length ? (
        <>
          <h3 className="tasks__item__thumbUpload">
            You can upload images here
          </h3>
          <ImageUploader onFileSelect={handleFileSelect} />
        </>
      ) : (
        <ul className="tasks__item__thumbsWrapper">
          {data.slice(0, 3).map(({ thumb, mimetype, _id, image, filename }) => {
            return (
              <li
                className="tasks__item__thumbBox"
                key={_id}
                onClick={() => {
                  // dispatch(setImageId(image));
                  setImageId(image);
                  modalThumbsHandler();
                }}
              >
                <img
                  alt={filename}
                  className="tasks__item__thumb"
                  src={`data:${mimetype};base64,${thumb.toString("base64")}`}
                />
              </li>
            );
          })}
          <li
            className="tasks__item__thumbsMore"
            onClick={() => {
              modalThumbsHandler();
              setImageId("");
            }}
          >
            <></>
          </li>
        </ul>
      )}
      <ModalThumbsList
        data={data}
        imageId={imageId}
        setImageId={setImageId}
        isThumbsOpen={isThumbsOpen}
        modalThumbsHandler={modalThumbsHandler}
      />
    </>
  );
};
