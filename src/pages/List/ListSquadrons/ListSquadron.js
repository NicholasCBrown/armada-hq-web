import React, { useContext } from 'react';
import {
  Typography,
  IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListContext from 'context/ListContext';
import cards from 'constants/cards';
import SquadronAvatar from './SquadronAvatar';
import SquadronActions from './SquadronActions';

const useStyles = makeStyles(theme => ({
  unitRow: {
    display: 'flex',
    flexFlow: 'row nowrap',
    borderTop: '1px solid rgba(255,255,255,0.12)'
  },
  unitColumn: { display: 'flex', flexFlow: 'column nowrap' },
  leftCell: { marginRight: 4 },
  counterpart: { marginLeft: 20 },
  middleCell: {
    flex: 1,
    marginRight: 2,
    display: 'flex',
    flexFlow: 'column nowrap',
    overflowX: 'auto',
    overflowY: 'hidden'
  },
  rightCell: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    borderLeft: '1px solid rgba(255,255,255,0.12)'
  }
}));

function ListSquadron({ squadron, squadronIndex, handleCardZoom }) {
  const classes = useStyles();
  const {
    handleAddSquadron,
    handleDecrementSquadron
  } = useContext(ListContext);
  const squadCard = cards[squadron.squadronId];
  return (
    <div className={classes.unitColumn}>
      <div className={classes.unitRow}>
        <div className={classes.leftCell}>
          <div style={{ marginTop: 2 }} />
          <SquadronAvatar squadronId={squadron.squadronId} count={squadron.count} handleCardZoom={handleCardZoom} />
        </div>
        <div className={classes.middleCell}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" style={{ marginRight: 8 }}>
              {squadCard.displayName ? squadCard.displayName : squadCard.cardName}
            </Typography>
          </div>
        </div>
        <div className={classes.rightCell}>
          <Typography variant="body2">
            {squadCard.cost}
          </Typography>
          <SquadronActions
            handleAddSquadron={squadCard.isUnique ? undefined : () => handleAddSquadron(squadron.squadronId)}
            handleDecrementSquadron={() => handleDecrementSquadron(squadronIndex)}
          />
        </div>
      </div>
    </div>
  );
};

export default ListSquadron;
