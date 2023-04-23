import React, { useState } from "react";
import moment from "moment";
import { format, parseISO } from "date-fns";
import {
  useGetTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  usePathTaskMutation,
} from "../providers/redux/tasks/tasksApi";
import { ModalEditProject } from "../components/ModalEditProject";

import { Timer } from "./Timer";
import { Delete, Edit } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";

export const TasksList = ({ data }) => {
  const { data = [], isLoading } = useGetTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [pathTask] = usePathTaskMutation();

  const [checkedTasks, setCheckedTasks] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, title: "" });
  const [editModal, setEditModal] = useState({
    isOpen: false,
    title: "",
    data: {},
    handleConfirm: () => {},
  });

  const handleCheckboxChange = (event) => {
    const itemId = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedTasks([...checkedTasks, itemId]);
    } else {
      setCheckedTasks(checkedTasks.filter((id) => id !== itemId));
    }
  };

  if (isLoading) {
    return <h1>...LOADING...</h1>;
  }
  return (
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
              <Edit
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
              />

              <Delete
                onClick={() =>
                  setModal({
                    isOpen: true,
                    title: `Are you sure to delete ${title}`,
                    handleConfirm: async () => {
                      await deleteTask(`?ids=${_id}`);
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
  );
};
