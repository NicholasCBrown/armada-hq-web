import React, { useState, useEffect, useContext, createContext } from 'react';
import Axios from 'axios';
import DataContext from 'context/DataContext';
import factions from 'constants/factions';
import {
  addShip,
  addSquadron
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
  const handleAddShip = id => setCurrentList({ ...addShip(currentList, id) });
  const handleAddSquadron = id => setCurrentList({ ...addSquadron(currentList, id) });
  const listProps = {
    currentList,
    handleAddShip,
    handleAddSquadron
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
