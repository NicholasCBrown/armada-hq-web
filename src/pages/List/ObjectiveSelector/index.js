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
    handleRemoveBattle
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
        <Chip
          clickable
          size={chipSize}
          color="primary"
          label="Assault Objective"
          icon={<AddIcon />}
          style={{ marginBottom: 4, marginRight: 4 }}
          onClick={() => setCardPaneFilter({ action: 'ADD_ASSAULT_OBJECTIVE' })}
        />
      </ThemeProvider>
      <ThemeProvider theme={defensiveTheme}>
        <Chip
          clickable
          size={chipSize}
          color="primary"
          label="Defensive Objective"
          icon={<AddIcon />}
          style={{ marginBottom: 4, marginRight: 4 }}
          onClick={() => setCardPaneFilter({ action: 'ADD_DEFENSIVE_OBJECTIVE' })}
        />
      </ThemeProvider>
      <ThemeProvider theme={navigationTheme}>
        <Chip
          clickable
          size={chipSize}
          color="primary"
          label="Navigation Objective"
          icon={<AddIcon />}
          style={{ marginBottom: 4, marginRight: 4 }}
          onClick={() => setCardPaneFilter({ action: 'ADD_NAVIGATION_OBJECTIVE' })}
        />
      </ThemeProvider>
    </div>
  );
};

export default ObjectiveSelector;
