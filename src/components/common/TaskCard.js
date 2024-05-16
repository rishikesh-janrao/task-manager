import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormControl, MenuItem, Select } from "@mui/material";
import { STATUSES } from "../../constants/STATUS";
import { useDispatch } from "react-redux";
import {
  addUpdateAction,
  deleteTask,
  setCurrentTaskId,
  updateTask,
} from "../../modules/Slices/appSlice";

export default function TaskCard({ taskId, taskData, closePopper }) {
  const dispatch = useDispatch();

  return (
    <Card
      sx={{ width: 200, cursor: "pointer", overflow: "unset" }}
      onClick={() => {
        dispatch(addUpdateAction("VIEW-TASK"));
        dispatch(setCurrentTaskId(taskId));
        if (closePopper) {
          closePopper();
        }
      }}
    >
      <CardHeader
        title={taskData.title}
        subheader={`${new Date(taskData.date).getDate()}/${new Date(
          taskData.date
        ).getMonth()}/${new Date(taskData.date).getFullYear()}`}
      />
      <CardContent sx={{ padding: "0 0.5rem" }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ overflow: "hidden", height: 40 }}
        >
          {taskData.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="Edit"
          onClick={(e) => {
            dispatch(addUpdateAction("EDIT-TASK"));
            dispatch(setCurrentTaskId(taskId));
            e.stopPropagation();
          }}
          sx={{ padding: "0 0.2rem" }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="Delete"
          onClick={(e) => {
            dispatch(addUpdateAction("DELETE-TASK"));
            dispatch(deleteTask(taskId));
            e.stopPropagation();
          }}
          sx={{ padding: "0 0.2rem" }}
        >
          <DeleteIcon />
        </IconButton>
        <FormControl fullWidth variant="standard" sx={{ m: 1, maxWidth: 110 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Status"
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            name="status"
            value={"move"}
            required
            sx={{ maxWidth: 200 }}
            onChange={(e) => e.preventDefault()}
          >
            <MenuItem value="move">Move To</MenuItem>
            {STATUSES.map(({ id, name }) => (
              <MenuItem
                key={id}
                value={id}
                onClick={(e) => {
                  dispatch(setCurrentTaskId(taskId));
                  dispatch(
                    updateTask({
                      id: taskId,
                      taskData: {
                        ...taskData,
                        status: id,
                      },
                    })
                  );

                  dispatch(addUpdateAction("MOVE-TASK"));
                  e.stopPropagation();
                  return true;
                }}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardActions>
    </Card>
  );
}
