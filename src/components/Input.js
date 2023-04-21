import React, { useState, useEffect } from "react";
import { Field, useField } from "formik";

export const Input = ({
  name,

  as = "input",
  label = "",
  required = false,
  type = "text",
  step,
  defaultValue,
}) => {
  const [{ onChange, onBlur, value }, { touched, error }] = useField(name);
  const isErrorShown = touched && !!error;
  const [labelClassName, setLabelClassName] = useState("tasks__form__label");

  useEffect(() => {
    if (!value) {
      if (!isErrorShown) {
        return setLabelClassName("tasks__form__label");
      }
      if (isErrorShown) {
        return setLabelClassName("tasks__form__labelError");
      }
    }
    if (value) {
      if (!isErrorShown) {
        return setLabelClassName("tasks__form__label tasks__form__labelMove");
      }
      if (isErrorShown) {
        return setLabelClassName(
          "tasks__form__labelError tasks__form__labelErrorMove"
        );
      }
    }
  }, [value, isErrorShown]);

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
        step={step}
        defaultValue={defaultValue}
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
