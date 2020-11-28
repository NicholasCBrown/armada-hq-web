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

function SquadronActions({ handleAddSquadron = undefined, handleDecrementSquadron }) {
  const classes = useStyles();
  const fontSize = 20;
  return (
    <div className={classes.buttons}>
      <IconButton
        size="small"
        onClick={handleDecrementSquadron}
        style={{ marginLeft: 2, marginRight: 1 }}
      >
        <ExposureNeg1 style={{ fontSize }} />
      </IconButton>
      {handleAddSquadron && (
        <IconButton
          size="small"
          onClick={handleAddSquadron}
          style={{ marginLeft: 1, marginRight: 2 }}
        >
          <PlusOne style={{ fontSize }} />
        </IconButton>
      )}
    </div>
  );
};

export default SquadronActions;
