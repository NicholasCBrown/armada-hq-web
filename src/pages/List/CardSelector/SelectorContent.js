import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  Collapse,
  Typography,
  Divider,
  IconButton
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import ListContext from 'context/ListContext';
import {
  getEligibleShipIds,
  getEligibleSquadronIds
} from 'constants/listOperations';
import ArmadaCard from 'common/ArmadaCard';

const useStyles = makeStyles(theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: { transform: 'rotate(180deg)' },
  rowContainerWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  rowContainerNoWrap: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    padding: 4
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  item: {
    marginRight: 4,
    marginBottom: 4
  },
  divider: {
    flexGrow: 1
  }
}));

function CollapsedContent({ children, isExpanded }) {
  return (
    <Collapse unmountOnExit timeout="auto" in={isExpanded}>
      {children}
    </Collapse>
  );
}

function SelectorContent({
  currentList,
  cardPaneFilter,
  setCardPaneFilter,
  handleCardZoom
}) {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    handleAddShip,
    handleAddSquadron
  } = useContext(ListContext);
  const handleExpandClick = () => setIsExpanded(!isExpanded);

  let validIds = [], invalidIds = [];

  let handleAdd;

  switch (cardPaneFilter.action) {
    case 'ADD_SHIPS':
      [validIds, invalidIds] = getEligibleShipIds(currentList);
      handleAdd = handleAddShip;
      break;
    case 'ADD_SQUADRONS':
      [validIds, invalidIds] = getEligibleSquadronIds(currentList);
      handleAdd = handleAddSquadron;
      break;
    default:
      break;
  }

  return (
    <div className={classes.columnContainer}>
      <div className={classes.rowContainerWrap}>
        {validIds.map(id => (
          <ArmadaCard
            key={id}
            cardId={id}
            handleClick={() => handleAdd(id)}
            handleCardZoom={() => handleCardZoom(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectorContent;
