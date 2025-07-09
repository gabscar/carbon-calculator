// components/Inputs/SelectInput.tsx
import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  
} from "@mui/material";
import type {SelectProps} from "@mui/material";
import { useController } from "react-hook-form";

import type { Control } from "react-hook-form";


type Option = {
  label: string;
  value: string | number;
};

type Props = {
  name: string;
  label: string;
  control: Control<any>;
  options: Option[];
} & SelectProps;

const SelectInput: React.FC<Props> = ({
  name,
  label,
  control,
  options,
  ...rest
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormControl fullWidth error={!!error} sx={{ minHeight: 56 }}>
      <InputLabel>{label}</InputLabel>
      <Select {...field} label={label} {...rest}  >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        {error ? error.message : '\u00A0'}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectInput;
