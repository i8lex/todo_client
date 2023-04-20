import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  Modal,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { Input } from "../components/Input";
import { httpClient, loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../providers/redux/auth/authSlice";
import { useLoginMutation } from "../providers/redux/auth/authApi";

export const LoginPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isError }] = useLoginMutation();
  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (values, formikHelpers) => {
    // login(values) // Вызов мутации useLoginMutation с передачей formData
    //   .then((result) => {
    //     // Обработка успешного ответа
    //     console.log("Успешный ответ:", result.data); // Обработка данных из ответа
    //   })
    //   .catch((error) => {
    //     // Обработка ошибки
    //     console.error("Ошибка:", error);
    //   });
    try {
      const { data } = await login(values);
      if (data) {
        const { message, token } = data;
        setMessage(message);

        setOpenModal(true);
        dispatch(loginSuccess(token));

        setTimeout(() => navigate("/tasks"), 3000);
      } else {
        setOpenModal(true);

        setTimeout(handleClose, 3000);
      }

      formikHelpers.resetForm();
    } catch (err) {
      const {
        response: { data },
      } = err;

      formikHelpers.setFieldError(data.field, data.message);
    }
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <Container>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              backgroundColor: "rgba(241,241,241,0.5)",
              color: "#323232",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.6)",
                borderRadius: "10px",
                width: "80%",
                height: "30%",
                fontSize: "24px",
                textAlign: "center",
              }}
            >
              <Typography id="modal-modal-title" variant="h2" component="h2">
                {JSON.stringify(message, null, 2).replace(/["']/g, "")}
              </Typography>{" "}
            </Box>
          </Box>
        </Modal>
        <Grid container spacing={1}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values, formikHelpers) =>
                await handleSubmit(values, formikHelpers)
              }
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
                <Stack spacing={2}>
                  <Typography component="h1" align="center" variant="h3">
                    Login
                  </Typography>
                  <Input label="Email" required name="email" />
                  <Input label="Password" type="password" name="password" />
                  <Button type="submit" variant="contained" size="large">
                    Login
                  </Button>
                </Stack>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
