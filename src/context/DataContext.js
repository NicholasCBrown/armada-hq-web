import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Info as InfoIcon
} from '@material-ui/icons';
import FactionIcon from 'common/FactionIcon';
import settings from 'constants/settings';

const DataContext = createContext();
const httpClient = Axios.create();
httpClient.defaults.timeout = 10000;

const fontSize = 26;

const routes = {
  '/': {
    name: 'Home',
    path: '/',
    icon: <HomeIcon style={{ fontSize }} />
  },
  '/list/rebels': {
    name: 'Rebels',
    path: '/list/rebels',
    icon: <FactionIcon faction="rebels" />
  },
  '/list/empire': {
    name: 'Empire',
    path: '/list/empire',
    icon: <FactionIcon faction="empire" />
  },
  '/list/republic': {
    name: 'Republic',
    path: '/list/republic',
    icon: <FactionIcon faction="republic" />
  },
  '/list/separatists': {
    name: 'Separatists',
    path: '/list/separatists',
    icon: <FactionIcon faction="separatists" />
  },
  '/settings': {
    name: 'Settings',
    path: '/settings',
    icon: <SettingsIcon style={{ fontSize }} />
  },
  '/info': {
    name: 'Info',
    path: '/info',
    icon: <InfoIcon style={{ fontSize }} />
  }
};

const newsPosts = [
  {
    "title": "Beta Release",
    "date": "21 November 2020",
    "body": "Limited features available. Accounts may come later."
  }
];

function initializeLocalSettings() {
  if (typeof(Storage) !== 'undefined') {
    const localSettings = JSON.parse(window.localStorage.getItem('settings'));
    return {
      ...settings.default,
      ...localSettings
    };
  }
  return settings.default;
}

export function DataProvider({ children }) {
  const history = useHistory();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [userSettings, setUserSettings] = useState(initializeLocalSettings());

  const setUserSettingsValue = (key, value) => {
    if (typeof(Storage) !== 'undefined') {
      const newSettings = {
        ...userSettings,
        [key]: value
      };
      window.localStorage.setItem('settings', JSON.stringify(newSettings));
      setUserSettings(newSettings)
    }
  }
  const goToPage = (newRoute) => history.push(newRoute);

  return (
    <React.Fragment>
      <DataContext.Provider
        value={{
          isDrawerOpen,
          newsPosts,
          routes,
          userLists,
          userSettings,
          goToPage,
          setUserLists,
          setUserSettingsValue,
          setIsDrawerOpen
        }}
      >
        {children}
      </DataContext.Provider>
    </React.Fragment>
  );
};

export default DataContext;
