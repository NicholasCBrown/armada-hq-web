import React from 'react';
import Img from 'react-image';
import { Badge } from '@material-ui/core';
import urls from 'constants/urls';
import cards from 'constants/cards';

function Squadron({ squadronId, count = 1, handleCardZoom }) {
  const { cardType, cardName } = cards[squadronId];
  return (
    <Badge
      color="primary"
      overlap="circle"
      badgeContent={count}
      invisible={count < 2}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
    >
      <div style={{ marginLeft: 2, width: 60, height: 40, borderRadius: 5, overflow: 'hidden' }}>
        <Img
          alt={cardName}
          src={`${urls.cdn}/${cardType}Cards/${cardName}.jpeg`}
          style={{ width: 100, margin: '0px 0px 0px -20px' }}
          onClick={() => handleCardZoom(squadronId)}
        />
      </div>
    </Badge>
  );
};

export default Squadron;
