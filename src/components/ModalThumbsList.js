import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export const ModalThumbsList = ({
  data,
  isThumbsOpen,
  isImageOpen,
  modalThumbsHandler,
}) => {
  return (
    <Modal
      isOpen={isThumbsOpen}
      onClose={isThumbsOpen}
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
      <div className="tasks__modalEdit">
        <button
          className="login__modal__close"
          type="button"
          onClick={modalThumbsHandler}
        >
          <></>
        </button>
        {data.map(({ thumb, mimetype, _id }) => {
          return (
            <li key={_id} className="tasks__thumbBox">
              <img
                src={`data:${mimetype};base64,${thumb.toString("base64")}`}
                alt="Task memo"
              />
            </li>
          );
        })}
      </div>
    </Modal>
  );
};
