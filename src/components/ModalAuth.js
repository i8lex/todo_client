import React from "react";
import Modal from "react-modal";
// import { repeatEmailHandler } from "./handlers/repeatEmailHandler";
import { useEmailRepeatMutation } from "../providers/redux/auth/authApi";

Modal.setAppElement("#root");

export const ModalAuth = ({ email, open, handleClose, message, confirmed }) => {
  const [emailRepeat] = useEmailRepeatMutation();
  const repeatEmailHandler = async () => {
    try {
      const value = new Object({ email: email });
      console.log(value);
      const { data } = await emailRepeat(value);
      const { message } = data;
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal
      email={email}
      isOpen={open}
      onClose={handleClose}
      message={message}
      confirmed={confirmed}
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
        <button
          className="login__modal__close"
          type="button"
          onClick={handleClose}
        >
          X
        </button>
        <h1 className="login__modal__title" id="modal-modal-title">
          {JSON.stringify(message, null, 2).replace(/["']/g, "")}
        </h1>
        {confirmed === false ? (
          <button className="login__modal__button" onClick={repeatEmailHandler}>
            Confirm email again
          </button>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
};
