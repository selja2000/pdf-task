import React from 'react';
import { InputLabel } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import useStyles from './style';

const FileInput = ({
  label,
  value,
  onChange,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <>
      <InputLabel
        className={classes.inputLabel}
      >
        {label}
      </InputLabel>
      <MuiFileInput
        value={value}
        onChange={onChange}
        placeholder="Drag & Drop"
        onClick={onClick}
        className={classes.inputFileClass}
      />
    </>
  );
};

export default FileInput;