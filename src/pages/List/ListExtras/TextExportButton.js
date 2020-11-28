import React, { useState, useEffect } from 'react';
import {
  useMediaQuery,
  Chip,
  TextField
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Description as TextIcon } from '@material-ui/icons';
import { generateText } from 'constants/listOperations';
import DialogModal from './DialogModal';
import ClipboardButton from './ClipboardButton';

function DialogContent({ currentList, content, handleChangeListText }) {
  return (
    <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}>
      <div style={{ marginTop: 16 }} />
      {content && (
        <TextField
          multiline
          size="small"
          variant="outlined"
          value={content}
          onChange={handleChangeListText}
          style={{ padding: 8, width: '100%' }}
        />
      )}
    </div>
  );
}

function TextExportButton({ currentList }) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [listText, setListText] = useState('');
  const handleChangeListText = e => setListText(e.target.value);
  useEffect(() => {
    setListText(generateText(currentList));
  }, [currentList, isOpen]);
  const isFullscreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div style={{ marginRight: 4, marginBottom: 4 }}>
      <Chip
        clickable
        variant="outlined"
        label="Export Text"
        icon={<TextIcon />}
        onClick={() => setIsOpen(true)}
      />
      <DialogModal
        isFullWidth={true}
        isMobile={isFullscreen}
        isOpen={isOpen}
        actions={<ClipboardButton content={listText} />}
        content={
          <DialogContent
            currentList={currentList}
            content={listText}
            handleChangeListText={handleChangeListText}
          />
        }
        handleClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default TextExportButton;
