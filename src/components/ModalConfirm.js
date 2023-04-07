import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

export const ModalConfirm = ({ title, isOpen, handleClose, handleConfirm }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            handleConfirm();
            handleClose();
          }}
        >
          Yes
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
