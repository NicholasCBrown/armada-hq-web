import React, { useContext } from 'react';
import ListContext from 'context/ListContext';
import DragDropContainer from '../ListShips/DragDropContainer';
import ListSquadron from './ListSquadron';

function ListSquadrons() {
  const {
    currentList,
    reorderSquadrons,
    handleCardZoom
  } = useContext(ListContext);

  const items = currentList.squadrons.map((squadron, squadronIndex) => {
    return {
      id: `${squadron.squadronId}_${squadronIndex}`,
      component: <ListSquadron squadron={squadron} squadronIndex={squadronIndex} handleCardZoom={handleCardZoom} />
    };
  });
  return (
    <div id="list-squadrons" style={{ display: 'flex', flexFlow: 'column' }}>
      <DragDropContainer items={items} reorderItems={reorderSquadrons} />
    </div>
  );
};

export default ListSquadrons;
