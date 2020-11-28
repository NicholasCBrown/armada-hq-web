import React from 'react';
import CardImage from './CardImage';
import cards from 'constants/cards';

function RowDisplay({ ship, faction, handleCardZoom }) {
  const upgradeCards = [];
  if (ship.commander && ship.commander !== '') {
    upgradeCards.push(
      <CardImage key={ship.commander} id={ship.commander} handleClick={() => handleCardZoom(ship.commander)} />
    );
  }
  ship.equippedUpgrades.forEach((id, i) => {
    upgradeCards.push(
      <div key={`${id}_${i}`}>
        {cards.displayName ? cards.displayName : cards.cardName}
      </div>
    );
  });
  return (
    <div style={{ display: 'flex', flexFlow: 'col nowrap' }}>
      <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
        <CardImage id={ship.shipId} handleClick={() => handleCardZoom(ship.shipId)} />
        {upgradeCards}
      </div>
    </div>
  );
};

export default RowDisplay;
