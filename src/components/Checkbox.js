import React, { useState } from "react";

export const Checkbox = ({ value, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);
    onChange(value, isChecked);
  };

  return (
    <input
      type="checkbox"
      value={value}
      checked={isChecked}
      onChange={handleCheckboxChange}
    />
  );
};

// const MyComponent = () => {
//     const [checkedTasks, setCheckedTasks] = useState([]);
//
//     const handleCheckboxChange = (itemId, isChecked) => {
//         if (isChecked) {
//             setCheckedTasks([...checkedTasks, itemId]);
//         } else {
//             setCheckedTasks(checkedTasks.filter((id) => id !== itemId));
//         }
//         console.log(checkedTasks);
//     };
//
//     return (
//         <div>
//             {/* Пример использования Checkbox */}
//             <Checkbox value={_id} onChange={handleCheckboxChange} />
//         </div>
//     );
// };
