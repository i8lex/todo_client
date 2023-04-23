import React, { useState } from "react";
import { Form, Formik } from "formik";
import { ModalLogin } from "../components/ModalLogin";
import * as yup from "yup";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../providers/redux/auth/authSlice";
import { useLoginMutation } from "../providers/redux/auth/authApi";

export const LoginPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (values, formikHelpers) => {
    try {
      const { data } = await login(values);
      const { message } = data;
      setMessage(message);
      setOpenModal(true);
      if (data.token) {
        // setMessage(message);
        // setOpenModal(true);
        dispatch(loginSuccess(data.token));
        setTimeout(() => navigate("/tasks"), 3000);
        formikHelpers.resetForm();
        setTimeout(() => setMessage(""), 3000);
      }

      setTimeout(() => {
        handleClose();
        setMessage("");
      }, 3000);

      // else {
      //   const { message } = data;
      //   setMessage(message);
      //   setOpenModal(true);
      //   setTimeout(handleClose, 3000);
      //   return formikHelpers.resetForm();
      // }
    } catch (err) {
      // const { message } = data;
      console.log(err.message);
      // setMessage(err.message);
      setOpenModal(true);

      setTimeout(handleClose, 3000);
    }
  };

  return (
    <section className="login">
      <div className="container">
        <div className="login__wrapper">
          <ModalLogin
            open={openModal}
            onClose={handleClose}
            message={message}
          />

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .label("Email")
                .min(6)
                .email()
                .max(30)
                .required(),
              password: yup
                .string()
                .label("Password")
                .min(8)
                .max(30)
                .required(),
            })}
          >
            <Form autoComplete="off">
              <h1 className="login__title">Login</h1>
              <Input label="Email" required name="email" />
              <Input label="Password" type="password" name="password" />
              <button
                className="login__button"
                type="submit"
                onClick={handleSubmit}
              >
                Login
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </section>
  );
};
