import React, { useContext } from 'react';
import { IconButton, Icon, Avatar } from '@material-ui/core';
import ListContext from 'context/ListContext';
import upgradeTypes from 'constants/upgradeTypes';

function AddUpgradeButton({ upgradeType, upgradeIndex, shipIndex }) {
  const {
    setCardPaneFilter
  } = useContext(ListContext);

  const size = 32;
  return (
    <IconButton
      size="small"
      style={{ marginBottom: 4 }}
      onClick={() => setCardPaneFilter({
        upgradeIndex,
        shipIndex,
        action: 'ADD_UPGRADES'
      })}
    >
      <Icon style={{ height: size, width: size }}>
        <Avatar
          alt={upgradeType}
          src={upgradeTypes[upgradeType].icon}
          style={{ height: size, width: size }}
        />
      </Icon>
    </IconButton>
  );
};

export default AddUpgradeButton;
