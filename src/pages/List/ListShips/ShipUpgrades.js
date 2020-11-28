import React, { useContext } from 'react';
import ListContext from 'context/ListContext';
import AddUpgradeButton from './AddUpgradeButton';
import UpgradeChip from './UpgradeChip';

function ShipUpgrades({ ship, shipIndex, handleCardZoom }) {
  const { currentList } = useContext(ListContext);

  const upgradeChips = [];
  const addUpgradeButtons = [];

  for (let i = 0; i < ship.upgradeBar.length; i++) {
    if (ship.equippedUpgrades[i]) {
      const upgradeId = ship.equippedUpgrades[i];
      upgradeChips.push(
        <UpgradeChip
          key={upgradeId}
          upgradeId={upgradeId}
          upgradeIndex={i}
          ship={ship}
          shipIndex={shipIndex}
        />
      );
    } else {
      const upgradeType = ship.upgradeBar[i];
      if (upgradeType === 'commander' && currentList.commander) continue;
      addUpgradeButtons.push(
        <AddUpgradeButton
          key={`${upgradeType}_${i}`}
          upgradeIndex={i}
          upgradeType={upgradeType}
          ship={ship}
          shipIndex={shipIndex}
        />
      );
    }
  }

  return (
    <div style={{ flex: 'display', flexFlow: 'row wrap', alignItems: 'center' }}>
      {addUpgradeButtons}
      {upgradeChips}
    </div>
  );
};

export default ShipUpgrades;
