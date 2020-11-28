import React, { useState, Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoadingWidget from 'common/LoadingWidget';
import listTemplate from 'constants/listTemplate';
const Home = lazy(() => import('pages/Home'));
const List = lazy(() => import('pages/List'));
const Settings = lazy(() => import('pages/Settings'));
const Callback = lazy(() => import('pages/Callback'));
const Info = lazy(() => import('pages/Info'));

function Pages() {
  const initialLists = {
    rebels: { ...listTemplate, faction: 'rebels' },
    empire: { ...listTemplate, faction: 'empire' },
    republic: { ...listTemplate, faction: 'republic' },
    separatists: { ...listTemplate, faction: 'separatists' }
  };
  const [storedLists, setStoredLists] = useState(() => initialLists);
  const updateStoredList = (newList) => {
    const faction = newList.faction;
    storedLists[faction] = newList;
    setStoredLists({ ...storedLists });
  }

  return (
    <Suspense fallback={<LoadingWidget />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/list/:slug/:listHash?"
          render={({ match }) => {
            const { params } = match;
            const { slug, listHash } = params;
            return (
              <List
                slug={slug}
                listHash={listHash}
                storedLists={storedLists}
                updateStoredList={updateStoredList}
              />
            );
          }}
        />
        <Route path="/info" component={Info} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
};

export default Pages;
