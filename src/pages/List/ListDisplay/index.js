import React, { useContext } from 'react';
import { Fade, Divider } from '@material-ui/core';
import ListContext from 'context/ListContext';
import RowDisplay from './RowDisplay';
import SquadronRow from './SquadronRow';

function ListDisplay() {
  const {
    currentList,
    cardPaneFilter,
    handleCardZoom
  } = useContext(ListContext);

  return (
    <Fade unmountOnExit exit={false} in={cardPaneFilter.action === 'DISPLAY_LIST'}>
      <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch' }}>
        {currentList.ships.map((ship, i) => (
          <div key={`${ship.shipHash}_${i}`}>
            <RowDisplay
              ship={ship}
              faction={currentList.faction}
              handleCardZoom={handleCardZoom}
            />
            <Divider />
          </div>
        ))}
        <SquadronRow
          squadrons={currentList.squadrons}
          handleCardZoom={handleCardZoom}
        />
      </div>
    </Fade>
  );
};

export default ListDisplay;
