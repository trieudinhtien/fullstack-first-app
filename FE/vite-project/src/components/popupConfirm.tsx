import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface IProps {
  title: string;
  content?: string;
  open: boolean;
  close: () => void;
  onOk: () => void;
}

export default function PopupConfirm({
  title,
  content,
  open,
  close,
  onOk,
}: IProps) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} autoFocus>
            Disagree
          </Button>
          <Button onClick={onOk}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
