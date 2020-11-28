import React from 'react';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PlusOne, ExposureNeg1 } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    minWidth: '72px'
  }
}));

function ShipActions({ handleCopyShip, handleDeleteShip }) {
  const classes = useStyles();
  const fontSize = 24;
  return (
    <div className={classes.buttons}>
      <IconButton
        size="small"
        onClick={handleDeleteShip}
        style={{ marginLeft: 2, marginRight: 1 }}
      >
        <ExposureNeg1 style={{ fontSize }} />
      </IconButton>
      <IconButton
        size="small"
        onClick={handleCopyShip}
        style={{ marginLeft: 1, marginRight: 2 }}
      >
        <PlusOne style={{ fontSize }} />
      </IconButton>
    </div>
  );
};

export default ShipActions;
