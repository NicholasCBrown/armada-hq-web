import React, { useContext } from 'react';
import { Chip } from '@material-ui/core';
import ListContext from 'context/ListContext';
import cards from 'constants/cards';
import urls from 'constants/urls';

function UpgradeAvatar({ card, handleClick }) {
  return (
    <div
      style={{
        width: 40,
        height: 32,
        borderRadius: 25,
        overflow: 'hidden',
        '&:hover': { cursor: 'pointer' }
      }}
    >
      <img
        alt={card.cardName}
        src={`${urls.cdn}/${card.cardType}Cards/${card.cardName}.jpeg`}
        style={{ width: 75, margin: '0px 0px 0px -17.5px' }}
        onClick={handleClick}
      />
    </div>
  );
}

function UpgradeChip({ upgradeId, upgradeIndex, ship, shipIndex }) {
  const {
    handleCardZoom,
    handleRemoveUpgrade
  } = useContext(ListContext);
  const card = cards[upgradeId];
  const handleDelete = () => handleRemoveUpgrade(shipIndex, upgradeIndex);
  return (
    <Chip
      size="medium"
      avatar={<UpgradeAvatar card={card} handleClick={() => handleCardZoom(upgradeId)} />}
      label={`${card.displayName ? card.displayName : card.cardName} (${card.cost})`}
      style={{ marginRight: 4, marginBottom: 3, height: 'auto' }}
      onDelete={handleDelete}
    />
  );
};

export default UpgradeChip;
