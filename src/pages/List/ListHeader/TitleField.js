import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

function TitleField({ activations, squadActivations, title, handleChange }) {
  const shipText = activations === 1 ? '1 ship' : `${activations} ships`;
  const squadText = squadActivations === 1 ? '1 squadron' : `${squadActivations} squadrons`;
  return (
    <TextField
      value={title}
      helperText={`${shipText} / ${squadText}`}
      onChange={handleChange}
    />
  );
};

TitleField.propTypes = {
  activations: PropTypes.number.isRequired,
  squadActivations: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default TitleField;
