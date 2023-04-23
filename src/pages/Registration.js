import React, { useState } from "react";
import { Form, Formik } from "formik";
import { ModalAuth } from "../components/ModalAuth";
import * as yup from "yup";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "../providers/redux/auth/authApi";

export const RegistrationPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [registration] = useRegistrationMutation();

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (values, formikHelpers) => {
    const { data } = await registration(values);
    console.log(data);
    try {
      if (data.token) {
        const { message } = data;
        setMessage(message);

        setOpenModal(true);

        return setTimeout(() => navigate("/tasks"), 3000);
      } else {
        const { message } = data;
        setMessage(message);
        setOpenModal(true);
        setTimeout(handleClose, 3000);
        return formikHelpers.resetForm();
      }
    } catch (err) {
      const { message } = data;

      setMessage(message);
      setOpenModal(true);

      setTimeout(handleClose, 3000);
    }
  };

  return (
    <section className="login">
      <div className="container">
        <div className="login__wrapper">
          <ModalAuth open={openModal} onClose={handleClose} message={message} />

          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={yup.object().shape({
              name: yup.string().label("Name").min(6).max(30).required(),
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
              <h1 className="login__title">Registraion</h1>
              <Input label="Name" required name="name" />
              <Input label="Email" required name="email" />
              <Input label="Password" type="password" name="password" />
              <button
                className="login__button"
                type="submit"
                onSubmit={handleSubmit}
              >
                Registration
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </section>
  );
};
