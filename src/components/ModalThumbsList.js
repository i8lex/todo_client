import React from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { setImage } from "../providers/redux/images/imageSlice";
import { Image } from "./Image";
import { ImageUploader } from "./ImageUploader";

Modal.setAppElement("#root");

export const ModalThumbsList = ({
  data: thumb,
  isThumbsOpen,
  modalThumbsHandler,
}) => {
  const dispatch = useDispatch();
  const { imageId } = useSelector((state) => state.image.image);

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
          <li
            onClick={() => dispatch(setImage({}))}
            className="image__thumbsBox"
          >
            <div className="image__thumbsBox__toUpload">
              <></>
            </div>
          </li>
          {thumb.map(({ thumb, mimetype, _id, filename, image }) => {
            return (
              <li key={_id} className="image__thumbsBox">
                <img
                  className="image__thumbsBox__thumb"
                  src={`data:${mimetype};base64,${thumb.toString("base64")}`}
                  alt={filename}
                  onClick={() =>
                    dispatch(
                      setImage({ imageId: image, mimetype, thumb, filename })
                    )
                  }
                />
              </li>
            );
          })}
        </ul>
        {!imageId ? (
          <div className="image__imageBox">
            <ImageUploader />
          </div>
        ) : (
          <Image />
        )}

        <button
          className="image__close"
          type="button"
          onClick={() => {
            dispatch(setImage({}));
            modalThumbsHandler();
          }}
        >
          <></>
        </button>
      </div>
    </Modal>
  );
};
