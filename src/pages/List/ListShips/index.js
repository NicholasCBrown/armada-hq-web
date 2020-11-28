import React, { useContext } from 'react';
import ListContext from 'context/ListContext';
import DragDropContainer from './DragDropContainer';
import ListShip from './ListShip';

function ListShips() {
  const {
    currentList,
    reorderShips,
    handleCardZoom
  } = useContext(ListContext);
  const items = currentList.ships.map((ship, shipIndex) => {
    return {
      id: `${ship.shipHash}_${shipIndex}`,
      component: <ListShip ship={ship} shipIndex={shipIndex} handleCardZoom={handleCardZoom} />
    };
  });
  return (
    <div id="list-ships" style={{ display: 'flex', flexFlow: 'column' }}>
      <DragDropContainer items={items} reorderItems={reorderShips} />
    </div>
  );
};

export default ListShips;
