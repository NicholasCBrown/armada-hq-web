import React, { useState } from 'react';
import {
  Grow,
  IconButton,
  Collapse,
  Button,
  Avatar,
  Typography,
  Card,
  CardMedia,
  CardActions,
  CardActionArea
} from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import CardChip from 'common/CardChip';
import urls from 'constants/urls';
import cards from 'constants/cards';
import upgradeTypes from 'constants/upgradeTypes';

const useStyles = makeStyles(theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    })
  },
  expandOpen: { transform: 'rotate(180deg)' },
  selected: { border: '1px solid lightblue' },
  card: { marginRight: 4, marginBottom: 4 },
  shipCard: { maxWidth: 200 },
  hugeShipCard: { maxWidth: 400 },
  squadronCard: { maxWidth: 200 },
  objectiveCard: { maxWidth: 200 },
  upgradeCard: { maxWidth: 150 },
  shipImage: { height: 342, width: 200 },
  hugeShipImage: { height: 342, width: 400 },
  squadronImage: { height: 280, width: 200 },
  upgradeImage: { height: 232.5, width: 150 },
  objectiveImage: { height: 280, width: 200 }
}));

function ArmadaCard({ isSelected, cardId, handleClick, handleCardZoom }) {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpandClick = () => setIsExpanded(!isExpanded);
  const card = cards[cardId];
  const { cost, cardType, cardSubtype, cardName, displayName } = cards[cardId];
  return (
    <Grow unmountOnExit in={true}>
      <Card
        className={clsx(classes.card,
          { [classes.selected]: isSelected },
          { [classes.shipCard]: cardType === 'ship' },
          { [classes.hugeShipCard]: cardSubtype === 'huge' },
          { [classes.upgradeCard]: cardType === 'upgrade' },
          { [classes.squadronCard]: cardType === 'squadron' },
          { [classes.objectiveCard]: cardType === 'objective' },
        )}
      >
        <CardActionArea onClick={handleClick}>
          <CardMedia
            title={displayName ? displayName : cardName}
            image={`${urls.cdn}/${cardType}Cards/${cardName}.jpeg`}
            className={clsx(classes.card,
              { [classes.selected]: isSelected },
              { [classes.shipImage]: cardType === 'ship' },
              { [classes.upgradeImage]: cardType === 'upgrade' },
              { [classes.hugeShipImage]: cardSubtype === 'huge' },
              { [classes.squadronImage]: cardType === 'squadron' },
              { [classes.objectiveImage]: cardType === 'objective' },
            )}
          />
        </CardActionArea>
        {cardType === 'ship' && (
          <CardActions disableSpacing>
            {cards[cardId].upgradeBar.map((upgradeType, i) => {
              if (upgradeType === 'title' || upgradeType === 'commander') return null;
              return (
                <Avatar
                  key={`${upgradeType}_${i}`}
                  alt={upgradeType}
                  src={upgradeTypes[upgradeType].icon}
                  style={{ width: 24, height: 24, marginRight: 4 }}
                />
              );
            })}
          </CardActions>
        )}
        {card.isMod && (
          <CardActions disableSpacing>
            <Typography variant="body2">Modification</Typography>  
          </CardActions>
        )}
        {card.tags && card.tags.length > 0 && (
          <CardActions disableSpacing>
            {card.tags.map((tag, i) =>
              <Typography
                key={`${tag}_${i}`}
                variant="body2"
                style={{ marginRight: 4 }}
              >
                {`${tag}${i === card.tags.length - 1 ? '' : ', '}`}
              </Typography>
            )}
          </CardActions>
        )}
        <CardActions disableSpacing>
          {'cost' in cards[cardId] && <CardChip type="points" size="small" value={cost} />}
          <IconButton
            size="small"
            aria-expanded={isExpanded}
            className={clsx(classes.expand, {
              [classes.expandOpen]: isExpanded,
            })}
            onClick={handleExpandClick}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse unmountOnExit timeout="auto" in={isExpanded}>
          <CardActions>
            <Button
              size="small"
              style={{ marginLeft: 'auto' }}
              onClick={handleCardZoom}
            >
              Show More
            </Button>
          </CardActions>
        </Collapse>
      </Card>
    </Grow>
  );
};

export default ArmadaCard;
