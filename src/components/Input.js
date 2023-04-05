import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

export const Input = ({
  name,
  label = "",
  required = false,
  type = "text",
}) => {
  const [{ onChange, onBlur, value }, { touched, error }] = useField(name);
  const isErrorShown = touched && !!error;
  console.log(value);
  return (
    <TextField
      required={required}
      fullWidth
      variant="outlined"
      label={label}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      error={isErrorShown}
      helperText={isErrorShown ? error : ""}
    />
  );
};
