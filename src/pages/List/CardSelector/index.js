import React, { useContext } from 'react';
import ListContext from 'context/ListContext';
import SelectorHeader from './SelectorHeader';
import SelectorContent from './SelectorContent';

function CardSelector() {
  const {
    currentList,
    cardPaneFilter,
    setCardPaneFilter,
    handleCardZoom
  } = useContext(ListContext);

  return (
    <div>
      <SelectorHeader
        cardPaneFilter={cardPaneFilter}
        setCardPaneFilter={setCardPaneFilter}
      />
      <SelectorContent
        currentList={currentList}
        cardPaneFilter={cardPaneFilter}
        setCardPaneFilter={setCardPaneFilter}
        handleCardZoom={handleCardZoom}
      />
    </div>
  );
};

export default CardSelector;
