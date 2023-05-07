import React, { useEffect, useState } from "react";
import { useGetThumbsQuery } from "../providers/redux/images/imageApi";
import { useDispatch, useSelector } from "react-redux";
import { ModalThumbsList } from "./ModalThumbsList";
import { ImageUploader } from "./ImageUploader";
import {
  setImage,
  setModalThumbsNeedRefetch,
} from "../providers/redux/images/imageSlice";

export const ThumbList = ({ _id, images }) => {
  const dispatch = useDispatch();
  const [isThumbsOpen, setIsThumbsOpen] = useState(false);
  const [isGetImages, setIsGetImages] = useState(false);
  const { data = [], refetch, isLoading } = useGetThumbsQuery(_id);

  const { modalThumbsNeedRefetch } = useSelector((state) => state.image);

  useEffect(() => {
    if (isGetImages && images.length) {
      refetch();
    }
  }, [images.length, isGetImages, refetch]);

  useEffect(() => {
    if (modalThumbsNeedRefetch) {
      refetch();
      setTimeout(() => {
        dispatch(setModalThumbsNeedRefetch(false));
      }, 100);
    }
  }, [modalThumbsNeedRefetch, refetch]);

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

  // console.log(!isGetImages);
  // console.log(!images.length);

  return (
    <>
      {!isGetImages && !images.length ? (
        <div className="image__uploadBoxSmall">
          <ImageUploader
            setIsGetImages={setIsGetImages}
            onFileSelect={handleFileSelect}
            _id={_id}
          />
        </div>
      ) : (
        <ul className="tasks__item__thumbsWrapper">
          {data.slice(0, 3).map(({ thumb, mimetype, _id, image, filename }) => {
            return (
              <li
                className="tasks__item__thumbBox"
                key={_id}
                onClick={() => {
                  dispatch(
                    setImage({ imageId: image, mimetype, thumb, filename })
                  );
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
              dispatch(setImage({}));
            }}
          >
            <></>
          </li>
        </ul>
      )}
      <ModalThumbsList
        images={images}
        data={data}
        isThumbsOpen={isThumbsOpen}
        modalThumbsHandler={modalThumbsHandler}
        refetch={refetch}
        setIsGetImages={setIsGetImages}
        _id={_id}
      />
    </>
  );
};
