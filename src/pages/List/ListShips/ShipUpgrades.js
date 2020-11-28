import React, { useContext } from 'react';
import ListContext from 'context/ListContext';
import AddUpgradeButton from './AddUpgradeButton';
import UpgradeChip from './UpgradeChip';
import cards from 'constants/cards';

function ShipUpgrades({ ship, shipIndex, handleCardZoom }) {
  const { currentList } = useContext(ListContext);

  const upgradeChips = [];
  const addUpgradeButtons = [];
  let hasBoardingTeamInWeapons = false;
  let hasBoardingTeamInOffensive = false;

  for (let i = 0; i < ship.upgradeBar.length; i++) {
    const upgradeId = ship.equippedUpgrades[i];
    if (!upgradeId) continue;
    const upgradeCard = cards[upgradeId];
    if (upgradeCard.cardSubtype === 'boarding team') {
      if (ship.upgradeBar[i] === 'weapons team') {
        hasBoardingTeamInWeapons = true
        break;
      } else if (ship.upgradeBar[i] === 'offensive retrofit') {
        hasBoardingTeamInOffensive = true;
        break;
      }
    }
  }

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
      if (hasBoardingTeamInWeapons && upgradeType === 'offensive retrofit') continue;
      if (hasBoardingTeamInOffensive && upgradeType === 'weapons team') continue;
      if (ship.equippedUpgrades[1] === 'kf' && (upgradeType === 'ordnance' || upgradeType === 'turbolasers')) continue;
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
