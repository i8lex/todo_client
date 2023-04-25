import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTask } from "../providers/redux/tasks/taskSlice";

const Checkbox = ({ taskId }) => {
  const dispatch = useDispatch();
  const [checkBoxStyle, setCheckBoxStyle] = useState("tasks__checkBox");
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    dispatch(toggleTask({ itemId: taskId, isChecked }));
    if (isChecked) {
      setCheckBoxStyle("tasks__checkBoxChecked");
    } else {
      setCheckBoxStyle("tasks__checkBox");
    }
  };

  return (
    <input
      className={checkBoxStyle}
      type="checkbox"
      onChange={handleCheckboxChange}
    />
  );
};

export default Checkbox;
