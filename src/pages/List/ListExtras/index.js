import React, { useContext } from 'react';
import {
  History as UsePrevIcon,
  Clear as ClearIcon,
  Save as SaveIcon,
  CallSplit as ForkIcon
} from '@material-ui/icons';
import cards from 'constants/cards';
import DataContext from 'context/DataContext';
import ListContext from 'context/ListContext';
import SimpleButton from './SimpleButton';
import TextExportButton from './TextExportButton';
import ImageExportButton from './ImageExportButton'

function ListExtras() {
  const {
    currentList,
    handleClearList
  } = useContext(ListContext);

  return (
    <div
      style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}
    >
      <SimpleButton
        icon={<ClearIcon />}
        label="Clear List"
        handleClick={handleClearList}
      />
      <TextExportButton currentList={currentList} />
      <ImageExportButton currentList={currentList} />
    </div>
  );
};

export default ListExtras;
