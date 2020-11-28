import React, { useState, useEffect, useContext, createContext } from 'react';
import Axios from 'axios';
import DataContext from 'context/DataContext';
import factions from 'constants/factions';
import {
  addShip,
  copyShip,
  deleteShip,
  equipUpgrade,
  unequipUpgrade,
  addSquadron,
  decrementSquadronCount,
  addObjective,
  removeObjective
} from 'constants/listOperations';

const ListContext = createContext();
const httpClient = Axios.create();
httpClient.defaults.timeout = 10000;

export function ListProvider({
  width, children, slug, listHash, storedLists, updateStoredList
}) {
  const { userSettings, goToPage } = useContext(DataContext);
  const [modalContent, setModalContent] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentList, setCurrentList] = useState();
  const [leftPaneWidth, setLeftPaneWidth] = useState(0);
  const [rightPaneWidth, setRightPaneWidth] = useState(0);
  const [cardPaneFilter, setCardPaneFilter] = useState({ action: 'DISPLAY_LIST' });
  useEffect(() => {
    resetCardPaneFilter();
    if (slug in factions) {
      if (listHash) {

      } else setCurrentList(JSON.parse(JSON.stringify(storedLists[slug])));
    }
  }, [slug]);
  useEffect(() => {
  // Save list before unmount
  return () => { if (currentList) updateStoredList(currentList); }
}, [currentList]);
  useEffect(() => {
    if (width === 'xs' || width === 'sm') {
      setLeftPaneWidth(12);
      setRightPaneWidth(0);
    } else {
      setLeftPaneWidth(6);
      setRightPaneWidth(6);
    }
  }, [width]);
  useEffect(() => {
    if (width === 'xs' || width === 'sm') {
      if (cardPaneFilter.action === 'DISPLAY_LIST') {
        setLeftPaneWidth(12);
        setRightPaneWidth(0);
      } else {
        setLeftPaneWidth(0);
        setRightPaneWidth(12);
      }
    }
  }, [width, cardPaneFilter]);
  const handleCardZoom = (cardId) => {
    setModalContent(cardId);
    setIsModalOpen(true);
  }
  const handleOpenModal = () => {
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent();
  }
  const resetCardPaneFilter = () => setCardPaneFilter({ action: 'DISPLAY_LIST' });
  const handleAddShip = id => setCurrentList({ ...addShip(currentList, id) });
  const handleCopyShip = index => setCurrentList({ ...copyShip(currentList, index) });
  const handleDeleteShip = index => setCurrentList({ ...deleteShip(currentList, index) });
  const handleAddSquadron = id => setCurrentList({ ...addSquadron(currentList, id) });
  const handleDecrementSquadron = index => setCurrentList({ ...decrementSquadronCount(currentList, index) });
  const handleAddUpgrade = (id, shipIndex, upgradeIndex) => setCurrentList({ ...equipUpgrade(currentList, shipIndex, upgradeIndex, id) });
  const handleRemoveUpgrade = (shipIndex, upgradeIndex) => setCurrentList({ ...unequipUpgrade(currentList, shipIndex, upgradeIndex) });
  const handleAddObjective = (id, objectiveType) => setCurrentList({ ...addObjective(currentList, objectiveType, id) });
  const handleRemoveObjective = (objectiveType) => setCurrentList({ ...removeObjective(currentList, objectiveType) });
  const reorderShips = (startIndex, endIndex) => {
    function reorder(arr) {
      const result = Array.from(arr);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    }
    currentList.ships = reorder(
      currentList.ships, startIndex, endIndex
    );
    currentList.shipHashes = reorder(
      currentList.shipHashes, startIndex, endIndex
    );
    setCurrentList({ ...currentList });
  }
  const reorderSquadrons = (startIndex, endIndex) => {
    function reorder(arr) {
      const result = Array.from(arr);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    }
    currentList.squadrons = reorder(
      currentList.squadrons, startIndex, endIndex
    );
    currentList.squadronHashes = reorder(
      currentList.squadronHashes, startIndex, endIndex
    );
    setCurrentList({ ...currentList });
  }
  const listProps = {
    currentList,
    reorderShips,
    reorderSquadrons,
    handleAddShip,
    handleCopyShip,
    handleDeleteShip,
    handleAddSquadron,
    handleDecrementSquadron,
    handleAddUpgrade,
    handleRemoveUpgrade,
    handleAddObjective,
    handleRemoveObjective
  };
  const modalProps = {
    handleOpenModal,
    handleCloseModal,
    modalContent,
    isModalOpen,
    handleCardZoom
  };
  const viewProps = {
    width,
    cardPaneFilter,
    setCardPaneFilter,
    resetCardPaneFilter,
    leftPaneWidth,
    rightPaneWidth,
    setLeftPaneWidth,
    setRightPaneWidth
  };
  console.log(currentList);
  return (
    <ListContext.Provider
      value={{
        userSettings,
        ...listProps,
        ...modalProps,
        ...viewProps
      }}
    >
      {children}
    </ListContext.Provider>
  );
}

export default ListContext;
