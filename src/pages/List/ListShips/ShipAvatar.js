import React from 'react';
import Img from 'react-image';
import urls from 'constants/urls';
import cards from 'constants/cards';

function ShipAvatar({ shipId, handleCardZoom }) {
  const { cardType, cardName } = cards[shipId];
  return (
    <div style={{ marginLeft: 2, width: 80, height: 40, borderRadius: 5, overflow: 'hidden' }}>
      <Img
        alt={cardName}
        src={`${urls.cdn}/${cardType}Cards/${cardName}.jpeg`}
        style={{ width: 100, margin: '3px 0px 0px -10px' }}
      />
    </div>
  );
};

export default ShipAvatar;
