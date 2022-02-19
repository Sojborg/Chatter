import {createContext, FC, ReactElement, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

interface IModalContext {
  showDialog(options: IDialogOptions): void;
  hideDialog(): void;
}

export interface IDialogOptions {
  title: string;
  content: string | ReactElement;
  onConfirm?(): void;
  onCancel?(): void;
}

export const ModalContext = createContext({} as IModalContext);

export const ModalProvider: FC = (props) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState({} as IDialogOptions);

  const showDialog = (options: IDialogOptions) => {
    setOptions(options);
    setOpen(true)
  };
  const hideDialog = () => setOpen(false);

  return <ModalContext.Provider value={{
    showDialog,
    hideDialog

  }}>
    {props.children}
    <Dialog
      open={open}
      onClose={hideDialog}
      fullWidth={true}
    >
      <DialogTitle>{options.title}</DialogTitle>
      <DialogContent>{options.content}</DialogContent>
      <DialogActions>
        {options.onCancel &&
          <Button
            onClick={options.onCancel}
          >Cancel</Button>
        }
        {options.onConfirm &&
          <Button
            onClick={options.onConfirm}
          >Cancel</Button>
        }
      </DialogActions>
    </Dialog>
  </ModalContext.Provider>
}
