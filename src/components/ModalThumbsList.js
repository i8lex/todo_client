import React from "react";
import Modal from "react-modal";
// import { useSelector, useDispatch } from "react-redux";
import { useGetImageQuery } from "../providers/redux/images/imageApi";
// import { setImageId } from "../providers/redux/images/imageSlice";

Modal.setAppElement("#root");

export const ModalThumbsList = ({
  data: thumb,
  isThumbsOpen,
  modalThumbsHandler,
  imageId,
  setImageId,
}) => {
  // const dispatch = useDispatch();
  // const imageId = useSelector((state) => state.image.imageId);
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
    <Modal
      isOpen={isThumbsOpen}
      onRequestClose={modalThumbsHandler}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        },
        content: {
          maxWidth: "100rem",
          maxHeight: "100rem",
          margin: "0 auto",
          border: "none",
          borderRadius: "10px",
          padding: "20px",
        },
      }}
    >
      <div className="image">
        <ul className="image__wrapper">
          {thumb.map(({ thumb, mimetype, _id, filename, image }) => {
            return (
              <li key={_id} className="image__thumbsBox">
                <img
                  className="image__thumbsBox__thumb"
                  src={`data:${mimetype};base64,${thumb.toString("base64")}`}
                  alt={filename}
                  // onClick={() => dispatch(setImageId(image))}
                  onClick={() => setImageId(image)}
                />
              </li>
            );
          })}
        </ul>
        {!imageId ? (
          <></>
        ) : (
          <div className="image__imageBox">
            <img
              src={`data:${image.mimetype};base64,${image.image.toString(
                "base64"
              )}`}
              alt=""
              className="image__imageBox__img"
            />
          </div>
        )}

        <button
          className="image__close"
          type="button"
          onClick={modalThumbsHandler}
        >
          <></>
        </button>
      </div>
    </Modal>
  );
};
