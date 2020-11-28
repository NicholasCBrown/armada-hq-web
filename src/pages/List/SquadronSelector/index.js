import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import ListContext from 'context/ListContext';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center'
  }
});

function SquadronSelector() {
  const classes = useStyles();
  const { currentList, setCardPaneFilter } = useContext(ListContext);
  let points = 0;
  currentList.squadrons.forEach(squadron => {
    points += squadron.cost * squadron.count;
  });
  return (
    <div className={classes.container}>
      <Button
        size="small"
        variant="outlined"
        startIcon={<Add />}
        style={{ width: 420 }}
        onClick={() => setCardPaneFilter({ action: 'ADD_SQUADRONS' })}
      >
        Add Squadrons ({points})
      </Button>
    </div>
  );
};

export default SquadronSelector;
