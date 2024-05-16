import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../modules/Slices/appSlice";
import useTranslations from "../hooks/useTranslations";

export default function MoveConfirmation({ state }) {
  const [open, setOpen] = useState(state);
  const { actionItem, currentTaskID, tasks } = useSelector(
    (state) => state.task
  );
  const dispatch = useDispatch();
  const {t}= useTranslations()

  useEffect(() => {
    if (actionItem === "MOVE-TASK" && currentTaskID !== "") {
      setOpen(true);
    }
  }, [actionItem, currentTaskID]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const comment = {
              userName: "X",
              comment: formJson.comment.toString(),
            };
            let comments = [];
            if (tasks[currentTaskID].comments) {
              comments = [
                ...tasks[currentTaskID].comments,
                {
                  ...comment,
                  id: tasks[currentTaskID].comments.length+1,
                },
              ];
            } else comments.push(comment);
            dispatch(
              updateTask({
                id: currentTaskID,
                taskData: { ...tasks[currentTaskID], comments: comments },
              })
            );
            handleClose();
          },
        }}
      >
        <DialogTitle>{t("move_confirmation_title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("move_confirmation_subtitle")}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="comment"
            label="Comment"
            type="email"
            fullWidth
            id="filled-textarea"
            multiline
            rows={8}
            placeholder={t("move_confirmation_comment_placeholder")}
            className="layout__description-input"
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("cancel")}</Button>
          <Button type="submit">{t("move")}</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
