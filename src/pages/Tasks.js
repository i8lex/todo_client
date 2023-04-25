import React, { useState } from "react";
// import Checkbox from "@mui/material/Checkbox";
import { Delete, Edit } from "@mui/icons-material";
import { Form, Formik } from "formik";
import { Input } from "../components/Input";
import {
  useGetTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  usePathTaskMutation,
} from "../providers/redux/tasks/tasksApi";
import { ModalDeleteConfirm } from "../components/ModalDeleteConfirm";
import { form } from "../constants/form";
import { ModalEditProject } from "../components/ModalEditProject";
import Checkbox from "../components/Checkbox";
// import moment from "moment";
import { format, parseISO } from "date-fns";
import { Timer } from "../components/Timer";

export const TasksPage = () => {
  const { data = [], isLoading } = useGetTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [pathTask] = usePathTaskMutation();

  const [modal, setModal] = useState({ isOpen: false, title: "" });
  const [editModal, setEditModal] = useState({
    isOpen: false,
    title: "",
    data: {},
    handleConfirm: () => {},
  });

  if (isLoading) {
    return <h1>...LOADING...</h1>;
  }
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
                await addTask(values).unwrap();

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
            {data.map(({ _id, title, description, created, deadline }) => {
              if (!deadline) {
                deadline = "Not set";
              }
              return (
                <li key={_id} className="tasks__item">
                  <h4 className="tasks__item__title">{title}</h4>
                  <p className="tasks__item__description">{description}</p>
                  <div className="tasks__item__dateBox">
                    <div>
                      <p className="tasks__item__dateText">Created at:</p>
                      <p className="tasks__item__date">
                        {format(parseISO(created), "d MMM yyyy")}
                      </p>
                      <p className="tasks__item__date">
                        {format(parseISO(created), "HH:mm:ss")}
                      </p>
                    </div>
                    <div>
                      <p className="tasks__item__dateText">Deadline at:</p>
                      {deadline !== "Not set" ? (
                        <>
                          <p className="tasks__item__date">
                            {format(parseISO(deadline), "d MMM yyyy")}
                          </p>
                          <p className="tasks__item__date">
                            {format(parseISO(deadline), "HH:mm:ss")}
                          </p>
                        </>
                      ) : (
                        <p className="tasks__item__date">{deadline}</p>
                      )}
                    </div>
                    <Timer deadline={deadline} />
                  </div>
                  <div className="tasks__item__iconBox">
                    <button
                      className="tasks__modalEdit__iconBtn"
                      onClick={() => {
                        setEditModal({
                          isOpen: true,
                          data: { title, description, deadline },
                          handleConfirm: async (values) => {
                            try {
                              await pathTask({ id: _id, body: values });

                              setEditModal((prevState) => ({
                                ...prevState,
                                isOpen: false,
                              }));
                            } catch (error) {}
                          },
                          title: `Update ${title}`,
                        });
                      }}
                    >
                      <></>
                    </button>

                    <button
                      className="tasks__delete__button"
                      type="button"
                      onClick={() =>
                        setModal({
                          isOpen: true,
                          title: title,
                          handleConfirm: async () => {
                            await deleteTask(`?ids=${_id}`);
                          },
                        })
                      }
                    >
                      <></>
                    </button>

                    <Checkbox taskId={_id} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <ModalDeleteConfirm
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
