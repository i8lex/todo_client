import React, { useState, useEffect } from "react";
// import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
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
    <section className="tasks">
      <div className="container">
        <div className="tasks__wrapper">
          <div>
            <Formik
              initialValues={{
                title: "",
                description: "",
                done: false,
              }}
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
              <Form className="tasks__form">
                <h4 className="tasks__create">Create project</h4>
                <Input name="title" label="Title" required />
                <Input
                  name="description"
                  as="textarea"
                  label="Description"
                  required
                />

                <button className="tasks__button" type="submit">
                  Create
                </button>
              </Form>
            </Formik>
          </div>
          <ul className="tasks__list">
            {projects.map(({ _id, title, description, created, deadline }) => {
              if (!deadline) {
                deadline = "Not set";
              }
              console.log(deadline);
              return (
                <li className="tasks__item">
                  <h4 className="tasks__item__title">{title}</h4>
                  <p className="tasks__item__description">{description}</p>
                  <div className="tasks__item__dateBox">
                    <div>
                      <p className="tasks__item__dateText">Created at:</p>
                      <p className="tasks__item__date">
                        {format(new Date(created), "yyyy-MM-dd")}
                      </p>
                      <p className="tasks__item__date">
                        {format(new Date(created), "HH:mm:ss")}
                      </p>
                    </div>
                    {!deadline === "Not set" ? (
                      <div>
                        <p className="tasks__item__dateText">Deadline at:</p>
                        <p className="tasks__item__date">
                          {format(new Date(deadline), "yyyy-MM-dd")}
                        </p>
                        <p className="tasks__item__date">
                          {format(new Date(deadline), "HH:mm:ss")}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="tasks__item__dateText">Deadline at:</p>
                        <p className="tasks__item__date">{deadline}</p>
                      </div>
                    )}
                  </div>
                  <div className="task__item__iconBox">
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
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
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
    </section>
  );
};
