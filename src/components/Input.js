import React from "react";
import { Field, useField } from "formik";

export const Input = ({
  name,

  as = "input",
  label = "",
  required = false,
  type = "text",
}) => {
  const [{ onChange, onBlur, value }, { touched, error }] = useField(name);
  const isErrorShown = touched && !!error;
  const labelClassName = !isErrorShown
    ? "tasks__form__label"
    : "tasks__form__labelError";
  const inputClassName = !isErrorShown
    ? "tasks__form__input"
    : "tasks__form__inputError";
  return (
    <div className="tasks__form__inputBox">
      <Field
        className={inputClassName}
        as={as}
        required={required}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
      />
      {label && (
        <label className={labelClassName} htmlFor={name}>
          {label}
        </label>
      )}
      {isErrorShown && <div className="tasks__form__error">{error}</div>}
    </div>
  );
};
