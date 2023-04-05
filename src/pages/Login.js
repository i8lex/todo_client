import React, { useContext } from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";

import { Input } from "../components/Input";
import { httpClient, loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/Storage/auth.hooks";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { saveAuthInfo } = useAuth();

  return (
    <Box sx={{ marginTop: 2 }}>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values, formikHelpers) => {
                try {
                  const { data } = await loginUser(values);
                  console.log(data);
                  saveAuthInfo(data);

                  formikHelpers.resetForm();
                  navigate("/tasks");
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
