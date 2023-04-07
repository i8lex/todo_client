import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Delete, Edit } from "@mui/icons-material";
import { Form, Formik } from "formik";
import { Input } from "../components/Input";
import {
  getTasks,
  createTask,
  updateTasks,
  deleteTasks,
  getImages,
  deleteImages,
  uploadImages,
} from "../api/index";
import { ModalConfirm } from "../components/ModalConfirm";
import { form } from "../constants/form";
import { ModalEditProject } from "../components/ModalEditProject";
import { format } from "date-fns";

export const TasksPage = () => {
  const [checkedTaks, setCheckedTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, title: "" });
  const [editModal, setEditModal] = useState({
    isOpen: false,
    title: "",
    data: {},
    handleConfirm: () => {},
  });
  // const label = { inputProps: { "aria-label": "Checkbox demo" } };

  useEffect(() => {
    getTasks().then(({ data }) => {
      setProjects(data);
    });
  }, []);

  const handleCheckboxChange = (event) => {
    const itemId = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedTasks([...checkedTaks, itemId]);
    } else {
      setCheckedTasks(checkedTaks.filter((id) => id !== itemId));
    }
  };

  console.log(checkedTaks);
  return (
    <Box sx={{ marginTop: 2 }}>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Formik
              initialValues={{ title: "", description: "" }}
              onSubmit={async (values, formikHelpers) => {
                const result = await createTask(values);
                console.log(result);
                setProjects((prevState) => {
                  return [...prevState, result.data.newTask];
                });

                formikHelpers.resetForm();
              }}
              validationSchema={form.projectsValidationSchema}
            >
              <Form>
                <Stack spacing={2}>
                  <Typography component="h1" variant="h5" align="center">
                    Create project
                  </Typography>
                  <Input name="title" label="Title" required />
                  <Input name="description" label="Description" required />

                  <Button variant="contained" size="large" type="submit">
                    Create
                  </Button>
                </Stack>
              </Form>
            </Formik>
          </Grid>

          {projects.map(({ _id, title, created }) => {
            return (
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                item
                xs={12}
                key={_id}
                // onClick={handle}
              >
                <Typography component="h2" variant="h5">
                  {title}
                </Typography>
                <Typography component="p" variant="h5">
                  {format(new Date(created), "yyyy-MM-dd HH:mm:ss")}
                </Typography>
                <Edit
                  onClick={() => {
                    setEditModal({
                      isOpen: true,
                      data: { title },
                      handleConfirm: async (values, helpers) => {
                        console.log(values, helpers);
                        await updateTasks(_id, values);

                        setProjects((prevState) => {
                          return prevState.map((project) => {
                            if (project._id === _id) {
                              return {
                                ...project,
                                title: values.title,
                              };
                            }

                            return project;
                          });
                        });
                        setEditModal((prevState) => ({
                          ...prevState,
                          isOpen: false,
                        }));
                      },
                      title: `Update ${title}`,
                    });
                  }}
                />
                <Delete
                  onClick={() =>
                    setModal({
                      isOpen: true,
                      title: `Are you sure to delete ${title}`,
                      handleConfirm: async () => {
                        await deleteTasks(`?ids=${_id}`);
                        setProjects((prevState) =>
                          prevState.filter((project) => project._id !== _id)
                        );
                      },
                    })
                  }
                />
                <Checkbox value={_id} onChange={handleCheckboxChange} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <ModalConfirm
        isOpen={modal.isOpen}
        title={modal.title}
        handleClose={() => {
          setModal((prevState) => {
            return {
              ...prevState,
              isOpen: false,
            };
          });
        }}
        handleConfirm={modal.handleConfirm}
      />
      <ModalEditProject
        isOpen={editModal.isOpen}
        title={editModal.title}
        data={editModal.data}
        handleClose={() => {
          setEditModal((prevState) => ({ ...prevState, isOpen: false }));
        }}
        handleConfirm={editModal.handleConfirm}
      />
    </Box>
  );
};
