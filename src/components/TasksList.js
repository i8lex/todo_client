import React from "react";
import moment from "moment";
import { Timer } from "./Timer";
import { Delete, Edit } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";

export const TasksList = ({ data }) => {
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
                  {moment(created).format("D MMM YYYY")}
                </p>
                <p className="tasks__item__date">
                  {moment(created).format("HH:mm:ss")}
                </p>
              </div>
              <div>
                <p className="tasks__item__dateText">Deadline at:</p>
                {deadline !== "Not set" ? (
                  <>
                    <p className="tasks__item__date">
                      {moment(deadline).format("D MMM YYYY")}
                    </p>
                    <p className="tasks__item__date">
                      {moment(deadline).format("HH:mm:ss")}
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
                      } catch (error) {
                        // Здесь можно обработать ошибку выполнения мутации
                      }
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
