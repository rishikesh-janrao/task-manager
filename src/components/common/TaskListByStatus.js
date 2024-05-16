import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Skeleton,
  Typography,
} from "@mui/material";
import TaskCard from "./TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../../constants/STATUS";
import { useEffect, useState } from "react";
import { addUpdateAction, setAllTasks } from "../../modules/Slices/appSlice";
import SERVICES from "../../constants/SERVICES";

const styles = {
  "list-title": {
    fontSize: 20,
    margin: "0px !important",
  },
  "list-container": {
    margin: 0,
    backgroundColor: "#ccc",
    display: "flex",
    gap: "0.5rem",
    overflow: "scroll",
  },
  "list-summary": {
    margin: "0px !important",
    minHeight: "20px !important",
  },
};
function TaskListByStatus(props) {
  const { actionItem, tasks } = useSelector((state) => state.task);
  const [currentTab, setCurrentTab] = useState("to-do");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(0);


  const openDefaultTaskTab = (taskList) => {
    let action = "";
    Object.values(taskList).some(({ status }) => {
      if (
        (status === "to-do" || status === "in-progress") &&
        action !== ""
      ) {
        action = status;
        return action !== "";
      }
      action = status;
      return false;
    });
    dispatch(addUpdateAction(action));
  }


  useEffect(() => {
    setCurrentTab(actionItem);
  }, [actionItem, tasks]);

  useEffect(() => {
    if (Object.keys(tasks).length === 0) {
      setLoading(true)
      const fetchTasks = async () => {
        const rawResponse = await fetch(SERVICES.TASKS);
        const tasks = await rawResponse.json();
        dispatch(setAllTasks(tasks));
        setLoading(false)
        openDefaultTaskTab(tasks)
      };
      fetchTasks();
    }
  }, []);
  return (
    <div className="layout__board-list">
      {loading ? (
        <Skeleton
          animation="wave"
          variant="rounded"
          className="layout__board-list-by-status-skeleton"
          sx={{ backgroundColor: "#575a5f" }}
        />
      ) : STATUSES.map(({ name, id }) => (
        <Accordion
          className="layout__board-list-by-status"
          key={id}
          expanded={currentTab === id}
          onChange={(e) => {
            if (id === currentTab) {
              setCurrentTab("to-do");
              dispatch(addUpdateAction("to-do"));
            } else dispatch(addUpdateAction(id));
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={styles["list-summary"]}
          >
            <Typography sx={styles["list-title"]}>{name}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={styles["list-container"]}>
            {Object.keys(tasks).map(
              (t) =>
                tasks[t].status === id && (
                  <TaskCard key={t} taskId={t} taskData={tasks[t]} />
                )
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default TaskListByStatus;
