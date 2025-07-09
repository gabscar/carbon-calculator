import React from "react";
import { TextField, type TextFieldProps } from "@mui/material";
import { useController, type Control } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  control: Control<any>;
  type?: string;
} & TextFieldProps;

const TextInput: React.FC<Props> = ({ name, label, control, type = "text", ...rest }) => {
  const {
    field: { value, onChange, ...fieldProps },
    fieldState: { error },
  } = useController({ name, control });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    if (type === "number") {
      if (inputValue === "") {
        onChange("");
        return;
      }
      const numValue = Number(inputValue);
      if (!isNaN(numValue)) {
        onChange(numValue);
      }
    } else {
      onChange(inputValue);
    }
  };

  return (
    <TextField
      {...fieldProps}
      label={label}
      value={value ?? ""}
      onChange={handleChange}
      error={!!error}
      helperText={error ? error.message : '\u00A0'}
      fullWidth
      sx={{ 
        minHeight: 56,
        '& input[type=number]': {
          '-moz-appearance': 'textfield'
        },
        '& input[type=number]::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0
        },
        '& input[type=number]::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0
        }
      }}
      type={type}
      {...rest}
    />
  );
};

export default TextInput;
