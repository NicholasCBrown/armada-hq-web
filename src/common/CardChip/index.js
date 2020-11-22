import React from 'react';
import PointsChip from './PointsChip';
// import StatChip from './StatChip';

function CardChip({ size = 'small', value }) {
  return <PointsChip size={size} points={value} />;
};

export default CardChip;
