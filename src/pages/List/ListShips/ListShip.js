import React, { useContext } from 'react';
import {
  Typography,
  IconButton
} from '@material-ui/core';
import { Flag } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import ListContext from 'context/ListContext';
import cards from 'constants/cards';
import ShipAvatar from './ShipAvatar';
import ShipActions from './ShipActions';
import ShipUpgrades from './ShipUpgrades';

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

function ListShip({ ship, shipIndex, handleCardZoom }) {
  const classes = useStyles();
  const { handleCopyShip, handleDeleteShip } = useContext(ListContext);
  const shipCard = cards[ship.shipId];
  let hasCommander = false;
  ship.equippedUpgrades.forEach(id => {
    if (id && cards[id].cardSubtype === 'commander') hasCommander = true;
  });
  return (
    <div className={classes.unitColumn}>
      <div className={classes.unitRow}>
        <div className={classes.leftCell}>
          <div style={{ marginTop: 2 }} />
          <ShipAvatar shipId={ship.shipId} handleCardZoom={handleCardZoom} />
        </div>
        <div className={classes.middleCell}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography style={{ marginRight: 8 }}>
              {shipCard.displayName ? shipCard.displayName : shipCard.cardName}
            </Typography>
            {hasCommander && <Flag fontSize="small" />}
          </div>
          <ShipUpgrades
            ship={ship}
            shipIndex={shipIndex}
            handleCardZoom={handleCardZoom}
          />
        </div>
        <div className={classes.rightCell}>
          <Typography>
            {ship.totalCost}
          </Typography>
          <ShipActions
            handleCopyShip={() => handleCopyShip(shipIndex)}
            handleDeleteShip={() => handleDeleteShip(shipIndex)}
          />
        </div>
      </div>
    </div>
  );
};

export default ListShip;
