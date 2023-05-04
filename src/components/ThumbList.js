import React, { useState } from "react";
import { useGetThumbsQuery } from "../providers/redux/images/imageApi";

import { ModalThumbsList } from "./ModalThumbsList";

export const ThumbList = ({ _id, images }) => {
  const [isThumbsOpen, setIsThumbsOpen] = useState(false);
  const [imageId, setImageId] = useState("");
  const { data = [], isLoading } = useGetThumbsQuery(_id);

  if (isLoading) {
    return <h3>...LOADING...</h3>;
  }

  const modalThumbsHandler = () => {
    setIsThumbsOpen(!isThumbsOpen);
  };

  return (
    <>
      {!images.length ? (
        <>
          <h3>You can upload images</h3>
        </>
      ) : (
        <ul className="tasks__item__thumbsWrapper">
          {data.slice(0, 3).map(({ thumb, mimetype, _id, image, filename }) => {
            return (
              <li
                className="tasks__item__thumbBox"
                key={_id}
                onClick={() => {
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
          <li className="tasks__item__thumbsMore" onClick={modalThumbsHandler}>
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
