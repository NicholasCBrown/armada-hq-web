import React, { useContext } from 'react';
import { Chip } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Add as AddIcon } from '@material-ui/icons';
import ListContext from 'context/ListContext';
import cards from 'constants/cards';

const chipSize = 'medium';

function ObjectiveSelector() {
  const {
    currentList,
    setCardPaneFilter,
    handleCardZoom,
    handleRemoveObjective
  } = useContext(ListContext);
  const assaultTheme = createMuiTheme({
    palette: { primary: { main: '#9A4252' } }
  });
  const defensiveTheme = createMuiTheme({
    palette: { primary: { main: '#9D8D20', contrastText: '#fff' } }
  });
  const navigationTheme = createMuiTheme({
    palette: { primary: { main: '#7E8A91' } }
  });
  return (
    <div
      id="list-objectives"
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center'
      }}
    >
      <ThemeProvider theme={assaultTheme}>
        {currentList.assaultObjective ? (
          <Chip
            clickable
            size={chipSize}
            color="primary"
            label={cards[currentList.assaultObjective].cardName}
            style={{ marginBottom: 4, marginRight: 4 }}
            onClick={() => handleCardZoom(currentList.assaultObjective)}
            onDelete={() => handleRemoveObjective('assault')}
          />
        ) : (
          <Chip
            clickable
            size={chipSize}
            color="primary"
            label="Assault Objective"
            icon={<AddIcon />}
            style={{ marginBottom: 4, marginRight: 4 }}
            onClick={() => setCardPaneFilter({ action: 'ADD_ASSAULT_OBJECTIVE' })}
          />
        )}
      </ThemeProvider>
      <ThemeProvider theme={defensiveTheme}>
        {currentList.defensiveObjective ? (
          <Chip
            clickable
            size={chipSize}
            color="primary"
            label={cards[currentList.defensiveObjective].cardName}
            style={{ marginBottom: 4, marginRight: 4 }}
            onClick={() => handleCardZoom(currentList.defensiveObjective)}
            onDelete={() => handleRemoveObjective('defensive')}
          />
        ) : (
          <Chip
            clickable
            size={chipSize}
            color="primary"
            label="Defensive Objective"
            icon={<AddIcon />}
            style={{ marginBottom: 4, marginRight: 4 }}
            onClick={() => setCardPaneFilter({ action: 'ADD_DEFENSIVE_OBJECTIVE' })}
          />
        )}
      </ThemeProvider>
      <ThemeProvider theme={navigationTheme}>
        {currentList.navigationObjective ? (
          <Chip
            clickable
            size={chipSize}
            color="primary"
            label={cards[currentList.navigationObjective].cardName}
            style={{ marginBottom: 4, marginRight: 4 }}
            onClick={() => handleCardZoom(currentList.navigationObjective)}
            onDelete={() => handleRemoveObjective('navigation')}
          />
        ) : (
          <Chip
            clickable
            size={chipSize}
            color="primary"
            label="Navigation Objective"
            icon={<AddIcon />}
            style={{ marginBottom: 4, marginRight: 4 }}
            onClick={() => setCardPaneFilter({ action: 'ADD_NAVIGATION_OBJECTIVE' })}
          />
        )}
      </ThemeProvider>
    </div>
  );
};

export default ObjectiveSelector;
