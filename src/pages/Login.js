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
import { useAuth } from "../providers/Storage/auth.hooks";

export const LoginPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { saveAuthInfo } = useAuth();

  const handleClose = () => {
    setOpenModal(false);
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
              onSubmit={async (values, formikHelpers) => {
                try {
                  const { data } = await loginUser(values);
                  const { message } = data;
                  setMessage(message);

                  if (message.includes("Welcome")) {
                    setOpenModal(true);
                    saveAuthInfo(data);

                    setTimeout(() => navigate("/tasks"), 3000);
                  } else {
                    setOpenModal(true);
                    setTimeout(handleClose, 3000);
                  }

                  formikHelpers.resetForm();
                  // navigate("/tasks");
                } catch (err) {
                  const {
                    response: { data },
                  } = err;

                  formikHelpers.setFieldError(data.field, data.message);
                }
              }}
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

// <Formik
//     initialValues={{ email: "", password: "" }}
//     onSubmit={async (values, formikHelpers) => {
//       try {
//         const { data } = await loginUser(values);
//         console.log(data);
//         saveAuthInfo(data);
//
//         formikHelpers.resetForm();
//         navigate("/tasks");
//       } catch (err) {
//         const {
//           response: { data },
//         } = err;
//
//         formikHelpers.setFieldError(data.field, data.message);
//       }
//     }}
//     validationSchema={yup.object().shape({
//       email: yup.string().label("Email").min(6).email().max(30).required(),
//       password: yup.string().label("Password").min(8).max(30).required(),
//     })}
// >
//   <Form autoComplete="off">
//     <h1>Login</h1>
//     <Field label="Email" required name="email" />
//     <Field label="Password" type="password" name="password" />
//     <button type="submit">Login</button>
//   </Form>
// </Formik>
