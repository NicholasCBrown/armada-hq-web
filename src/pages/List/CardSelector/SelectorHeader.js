import React from 'react';
import { Paper, IconButton } from '@material-ui/core';
import { Clear as ClearIcon } from '@material-ui/icons';

function SelectorHeader({ cardPaneFilter, setCardPaneFilter }) {
  const sticky = {
    top: 0,
    zIndex: 1,
    marginBottom: 4,
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    justifyContent: 'space-between',
    position: '-webkit-sticky',
    position: 'sticky'
  };
  let headerContent = '';

  switch (cardPaneFilter.action) {
    case 'ADD_SHIPS':
      headerContent = 'Adding ships'
      break;
    case 'ADD_SQUADRONS':
      headerContent = 'Adding squadrons'
      break;
    case 'ADD_UPGRADES':
      headerContent = 'Adding upgrades'
      break;
    case 'ADD_ASSAULT_OBJECTIVE':
      headerContent = 'Adding assault (red) objective'
      break;
    case 'ADD_DEFENSIVE_OBJECTIVE':
      headerContent = 'Adding defense (yellow) objective'
      break;
    case 'ADD_NAVIGATION_OBJECTIVE':
      headerContent = 'Adding navigation (blue) objective'
      break;
    default:
      break;
  }

  return (
    <Paper style={sticky}>
      {headerContent}
      <div style={{ flexGrow: 1 }} />
      <IconButton size="small" onClick={() => setCardPaneFilter({ action: 'DISPLAY_LIST' })}>
        <ClearIcon />
      </IconButton>
    </Paper>
  );
};

export default SelectorHeader;
