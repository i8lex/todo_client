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
import { Formik, Form, Field, useField } from "formik";
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
    <div style={{ display: isOpen ? "block" : "none" }}>
      <div style={{ width: "500px", margin: "0 auto" }}>
        <Formik
          validationSchema={form.projectsValidationSchema}
          initialValues={{
            title: data.title,
            description: data.description,
            deadline: data.deadline,
          }}
          onSubmit={handleConfirm}
        >
          <Form className="tasks__form">
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="title"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Title
              </label>
              {isEditMode ? (
                <Field
                  type="text"
                  name="title"
                  className="tasks__form__input"
                />
              ) : (
                <div onClick={handleTextClick}>{data.title}</div>
              )}
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="description"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Description
              </label>
              {isEditMode ? (
                <Field
                  type="text"
                  name="description"
                  className="tasks__form__input"
                />
              ) : (
                <div onClick={handleTextClick}>{data.description}</div>
              )}
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="deadline"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Deadline
              </label>
              {isEditMode ? (
                <Field
                  type="date"
                  name="deadline"
                  className="tasks__form__input"
                />
              ) : (
                <div onClick={handleTextClick}>{data.deadline}</div>
              )}
            </div>
            <div style={{ textAlign: "right" }}>
              <button type="submit" style={{ marginRight: "10px" }}>
                Yes
              </button>
              <button type="button" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
