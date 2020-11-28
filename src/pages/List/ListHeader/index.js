import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListContext from 'context/ListContext';
import TitleField from './TitleField';
import FactionButton from './FactionButton';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: { marginRight: 6 }
});

function ListHeader() {
  const {
    currentList,
    handleChangeTitle
  } = useContext(ListContext);
  const classes = useStyles();
  const numActivations = currentList.ships.reduce((num, ship) => {
    num += ship.count;
    return num;
  }, 0);
  const numSquadActivations = currentList.squadrons.reduce((num, squad) => {
    num += squad.count;
    return num
  }, 0);
  return (
    <div id="list-header" className={classes.container}>
      <div className={classes.item}>
        <FactionButton
          faction={currentList.faction}
        />
      </div>
      <div className={classes.item}>
        <TitleField
          activations={numActivations}
          squadActivations={numSquadActivations}
          title={currentList.title}
          handleChange={e => {
            e.persist();
            if (handleChangeTitle) handleChangeTitle(e.target.value);
          }}
        />
      </div>
      <div className={classes.item} style={{ marginLeft: 2 }}>
        <Typography>
          {currentList.pointTotal}
        </Typography>
      </div>
    </div>
  );
};

export default ListHeader;
