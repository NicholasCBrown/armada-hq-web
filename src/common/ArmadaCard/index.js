import React, { useState } from 'react';
import {
  Grow,
  IconButton,
  Collapse,
  Button,
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
  upgradeImage: { height: 310, width: 200 },
  objectiveImage: { height: 420, width: 300 }
}));

function ArmadaCard({ isSelected, cardId, handleClick, handleCardZoom }) {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpandClick = () => setIsExpanded(!isExpanded);
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
            )}
          />
        </CardActionArea>
        <CardActions disableSpacing>
          {cost && <CardChip type="points" size="small" value={cost} />}
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
