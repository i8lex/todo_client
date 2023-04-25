import React from "react";
import { useDispatch } from "react-redux";
import { toggleTask } from "../providers/redux/tasks/taskSlice";

const Checkbox = ({ taskId }) => {
  const dispatch = useDispatch();

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    dispatch(toggleTask({ itemId: taskId, isChecked }));
  };

  return <input type="checkbox" onChange={handleCheckboxChange} />;
};

export default Checkbox;
