import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCheckedImages } from "../providers/redux/images/imageSlice";

const ImagesCheckbox = ({ imageId }) => {
  const dispatch = useDispatch();
  const [checkBoxStyle, setCheckBoxStyle] = useState("tasks__checkBox");
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    dispatch(setCheckedImages({ imageId: imageId, isChecked }));
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

export default ImagesCheckbox;
