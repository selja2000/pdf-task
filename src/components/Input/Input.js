import React from 'react';
import { InputLabel, TextField } from '@mui/material';
import useStyles from './style';

const CustomTextField = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  ...rest
}) => {
  const classes = useStyles();

  const configTextField = {
    ...rest,
    type,
    name,
    className: classes.textField,
  };

  return (
    <>
      {label && (
        <InputLabel
          className={classes.inputLabel}
        >
          {label}
        </InputLabel>
      )}
      <TextField
        placeholder={placeholder || label}
        {...configTextField}
        className={classes.textField}
      />
    </>
  );
};

export default React.memo(CustomTextField);
