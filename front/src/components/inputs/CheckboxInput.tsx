import React from 'react';
import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  control: Control<any>;
  disabled?: boolean;
};

const CheckboxInput: React.FC<Props> = ({ name, label, control, disabled }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <>
      <FormControlLabel
        control={<Checkbox {...field} checked={!!field.value} disabled={disabled} />}
        label={label}
      />
      {error && <FormHelperText error>{error.message}</FormHelperText>}
    </>
  );
};

export default CheckboxInput; 