// import React, { useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Grid,
// } from "@mui/material";
// import { Formik, Form } from "formik";
// import { Input } from "./Input";
// import { form } from "../constants/form";
//
// export const ModalEditProject = ({
//   title,
//   isOpen,
//   handleClose,
//   handleConfirm,
//   data,
// }) => {
//   const [isEditMode, setIsEditMode] = useState(false);
//   const handleTextClick = () => {
//     setIsEditMode(true);
//   };
//   return (
//     <Dialog open={isOpen} onClose={handleClose}>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <Formik
//             validationSchema={form.projectsValidationSchema}
//             initialValues={{ title: data.title, description: data.description }}
//             onSubmit={handleConfirm}
//           >
//             <Form>
//               <DialogContent>
//                 {isEditMode ? (
//                   <Input label="Title" name="title" />
//                 ) : (
//                   <div onClick={handleTextClick}>{data.title}</div>
//                 )}
//                 {isEditMode ? (
//                   <Input label="Description" name="description" />
//                 ) : (
//                   <div onClick={handleTextClick}>{data.description}</div>
//                 )}
//                 {isEditMode ? (
//                   <Input label="Deadline" name="deadline" type="Date" />
//                 ) : (
//                   <div onClick={handleTextClick}>{data.deadline}</div>
//                 )}
//               </DialogContent>
//               <DialogActions>
//                 <Button variant="contained" type="submit">
//                   Yes
//                 </Button>
//                 <Button variant="outlined" onClick={handleClose}>
//                   Cancel
//                 </Button>
//               </DialogActions>
//             </Form>
//           </Formik>
//         </Grid>
//       </Grid>
//     </Dialog>
//   );
// };

import React, { useState } from "react";
import Modal from "react-modal";
import { Formik, Form, Field } from "formik";
import { form } from "../constants/form";
import moment from "moment";

Modal.setAppElement("#root");

export const ModalEditProject = ({
  title,
  isOpen,
  handleClose,
  handleConfirm,
  data,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const handleEditClick = () => {
    setIsEditMode(true);
  };
  const handleTextOnBlur = () => {
    setIsEditMode(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      contentLabel={title}
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
      <div className="tasks__modalEdit">
        <Formik
          validationSchema={form.projectsValidationSchema}
          initialValues={{
            title: data.title,
            description: data.description,
            deadline: data.deadline,
          }}
          onSubmit={handleConfirm}
        >
          <Form>
            <div className="tasks__form__inputBox">
              <label
                className="tasks__form__label"
                htmlFor="title"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Title
              </label>

              <Field
                className="tasks__form__input"
                onBlur={handleTextOnBlur}
                type="text"
                name="title"
              />
            </div>
            <div className="tasks__form__inputBox">
              <label className="tasks__form__label" htmlFor="description">
                Description
              </label>

              <Field
                onBlur={handleTextOnBlur}
                as="textarea"
                className="tasks__form__input"
                type="text"
                name="description"
              />
            </div>
            <div className="tasks__form__inputBox">
              <label className="tasks__form__label" htmlFor="deadline">
                Deadline
              </label>

              <Field
                onBlur={handleTextOnBlur}
                className="tasks__form__input"
                type="datetime-local"
                name="deadline"
                default={data.deadline}
              />
            </div>
            <div style={{ textAlign: "right" }}>
              <button type="submit" className="tasks__button">
                Yes
              </button>
              <button
                type="button"
                className="tasks__button"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
};
