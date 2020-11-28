import React from 'react';
import Img from 'react-image';
import { makeStyles } from '@material-ui/styles';
import cards from 'constants/cards';
import urls from 'constants/urls';

const useStyles = makeStyles(theme => ({
  container: {
    marginRight: 4,
    zIndex: 1,
    '&:hover': {
      transition: '.25s ease',
      cursor: 'pointer',
      opacity: 0.75
    }
  },
  loadoutContainer: {
    marginRight: 4,
    marginLeft: -50,
    zIndex: 0,
    '&:hover': {
      transition: '.25s ease',
      cursor: 'pointer',
      zIndex: 1,
      opacity: 0.75
    }
  },
  ship: { height: 342, width: 'auto' },
  squadron: { height: 280, width: 200 },
  upgrade: { height: 232.5, width: 150 },
  objective: { height: 420, width: 300 }
}));

function CardImage({ id, handleClick }) {
  const card = cards[id];
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Img
        alt={card.cardName}
        src={`${urls.cdn}/${card.cardType}Cards/${card.cardName}.jpeg`}
        className={classes[card.cardType]}
        onClick={handleClick}
      />
    </div>
  );
}

export default CardImage;
