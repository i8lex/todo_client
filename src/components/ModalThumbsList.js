import React from "react";
import Modal from "react-modal";
import { useGetImageQuery } from "../providers/redux/images/imageApi";

Modal.setAppElement("#root");

export const ModalThumbsList = ({
  data: thumb,
  isThumbsOpen,
  modalThumbsHandler,
}) => {
  const [selectedImageId, setSelectedImageId] = React.useState(
    "645408c55bcf2a0413bd487b"
  );
  // const selectedImage = useGetImageQuery(selectedImageId);
  const { data, isLoading, isError } = useGetImageQuery(selectedImageId);
  if (isLoading) return <p>Loading image...</p>;
  if (isError) return <p>Error loading image</p>;

  console.log(isLoading);
  console.log(isError);
  const imageBlob = new Blob([data], {
    type: data.type,
  });
  console.log(data.image);

  const imageUrl = URL.createObjectURL(imageBlob);
  console.log(imageUrl);
  return (
    <Modal
      isOpen={isThumbsOpen}
      onRequestClose={modalThumbsHandler}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        },
        content: {
          maxWidth: "1000px",
          maxHeight: "1000px",
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
              <li key={_id} className="image__modal__thumbsBox">
                <img
                  className="image__modal__thumb"
                  src={`data:${mimetype};base64,${thumb.toString("base64")}`}
                  alt={filename}
                  onClick={() => setSelectedImageId(image)}
                />
              </li>
            );
          })}
        </ul>

        <img
          src={`data:${data.mimetype};base64,${data.image.toString("base64")}`}
          alt=""
          className="image__imageBox"
        />

        <button
          className="image__modal__close"
          type="button"
          onClick={modalThumbsHandler}
        >
          <></>
        </button>
      </div>
    </Modal>
  );
};
