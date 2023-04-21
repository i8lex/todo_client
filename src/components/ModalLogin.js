import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export const ModalLogin = ({ open, handleClose, message }) => {
  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      message={message}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        },
        content: {
          maxWidth: "500px",
          maxHeight: "300px",
          margin: "0 auto",
          border: "none",
          borderRadius: "10px",
          padding: "20px",
        },
      }}
    >
      <div className="login__modal">
        <h1 className="login__modal__title" id="modal-modal-title">
          {JSON.stringify(message, null, 2).replace(/["']/g, "")}
        </h1>
      </div>
    </Modal>
  );
};
