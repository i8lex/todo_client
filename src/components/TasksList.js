import React from "react";
import {
  useDeleteTaskMutation,
  usePathTaskMutation,
} from "../providers/redux/tasks/tasksApi";
import { format, parseISO } from "date-fns";
import { Timer } from "./Timer";
import Checkbox from "./Checkbox";

export const TasksList = ({
  _id,
  title,
  description,
  created,
  deadline,
  setDeleteConfirmModal,
  setEditModal,
}) => {
  const [deleteTask] = useDeleteTaskMutation();
  const [pathTask] = usePathTaskMutation();

  return (
    <li className="tasks__item">
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
            setDeleteConfirmModal({
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
};
