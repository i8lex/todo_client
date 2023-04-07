import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Formik, Form } from "formik";
import { Input } from "./Input";
import { form } from "../constants/form";

export const ModalEditProject = ({
  title,
  isOpen,
  handleClose,
  handleConfirm,
  data,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const handleTextClick = () => {
    setIsEditMode(true);
  };
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Formik
        validationSchema={form.projectsValidationSchema}
        initialValues={{ title: data.title }}
        onSubmit={handleConfirm}
      >
        <Form>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            {isEditMode ? (
              <Input label="Title" name="title" />
            ) : (
              <div onClick={handleTextClick}>{data.title}</div>
            )}
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit">
              Yes
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};
