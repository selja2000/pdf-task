import React from 'react';
import { Box, MenuItem, Select } from '@mui/material';
import useStyles from './style';

const Selected = ({
  selectedCoordinate,
  handleChange,
  coordinates
}) => {
  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.container}>Searched Keyword:</Box>
      <Select
        value={selectedCoordinate}
        onChange={handleChange}
        displayEmpty
        className={classes.select}
      >
        <MenuItem value="" disabled>
          Select a coordinate
        </MenuItem>
        {coordinates?.map((coord, index) => (
          <MenuItem key={index} value={coord?.page} className={classes.menuItem}>
            {`Page ${coord?.page}: ${coord?.text}`}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default Selected;

