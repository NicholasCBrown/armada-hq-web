import React, { useContext } from 'react';
import { Grid, Divider } from '@material-ui/core';
import DataContext from 'context/DataContext';
import ListContext from 'context/ListContext';
import CardModal from 'common/CardModal';
import themes from 'constants/themes';
import ListHeader from './ListHeader';
import ShipSelector from './ShipSelector';
import SquadronSelector from './SquadronSelector';
import ObjectiveSelector from './ObjectiveSelector';
import ListDisplay from './ListDisplay';
import ListShips from './ListShips';
import ListSquadrons from './ListSquadrons';
import CardSelector from './CardSelector';
import ListExtras from './ListExtras';

function ListLayout() {
  const { userSettings } = useContext(DataContext);
  const {
    width,
    cardPaneFilter,
    leftPaneWidth,
    rightPaneWidth,
    isModalOpen,
    modalContent,
    handleCloseModal
  } = useContext(ListContext);

  const { themeColor } = userSettings;
  const palette = themes.palettes[themeColor];

  const isMobile = width === 'xs' || width === 'sm';

  const paneStyles = {
    padding: '0 2px 2px',
    overflow: 'auto',
    height: `calc(100vh - ${isMobile ? '125px' : '75px'})`
  };

  const stickyStyles = {
    top: 0,
    zIndex: 1,
    position: '-webkit-sticky',
    position: 'sticky',
    backgroundColor: palette ? palette.background.default : ''
  };

  const builderPane = leftPaneWidth > 0 && (
    <Grid item xs={leftPaneWidth} style={paneStyles}>
      <div id="list-content">
        <div style={stickyStyles}>
          <ListHeader />
          <div style={{ marginTop: 8 }} />
        </div>
        <ShipSelector />
        <div style={{ marginBottom: 4 }} />
        <ListShips />
        <Divider style={{ marginBottom: 4 }} />
        <SquadronSelector />
        <div style={{ marginBottom: 4 }} />
        <ListSquadrons />
        <Divider style={{ marginBottom: 4 }} />
        <ObjectiveSelector />
      </div>
      <Divider style={{ marginBottom: 4 }} />
      <ListExtras />
      <div style={{ marginTop: 24 }} />
    </Grid>
  );

  const cardPane = rightPaneWidth > 0 && (
    <Grid item xs={rightPaneWidth} style={paneStyles}>
      {cardPaneFilter.action === 'DISPLAY_LIST' ? (
        <ListDisplay />
      ) : (
        <CardSelector />
      )}
    </Grid>
  );

  return (
    <Grid container direction="row">
      <CardModal
        id={modalContent}
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
      />
      {builderPane}
      {cardPane}
    </Grid>
  );
};

export default ListLayout;
