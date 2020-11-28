import React from 'react';
import CardImage from './CardImage';

function SquadronRow({ squadrons, handleCardZoom }) {
  return (
    <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
      {squadrons.map(({ squadronId }) => (
        <div key={squadronId}>
          <CardImage
            key={squadronId}
            id={squadronId}
            handleClick={() => handleCardZoom(squadronId)}
          />
        </div>
      ))}
    </div>
  );
};

export default SquadronRow;
