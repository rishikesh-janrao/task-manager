import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../constants/STATUS";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import TaskComments from "./common/TaskComments";
import { Fragment } from "react";
import { addUpdateAction, setCurrentTaskId } from "../modules/Slices/appSlice";
import useTranslations from "../hooks/useTranslations";

function ViewTask(props) {
  const { currentTaskID, tasks } = useSelector((state) => state.task);
  const { t } = useTranslations();
  const dispatch = useDispatch();
  const { title, status, description, comments, date } = tasks[currentTaskID];

  return (
    <div className="layout__view-task">
      <Card sx={{ width: "100%", overflowY: "scroll" }}>
        <CardHeader
          action={
            <IconButton
              aria-label="settings"
              onClick={() => {
                dispatch(addUpdateAction("EDIT-TASK"));
                dispatch(setCurrentTaskId(currentTaskID));
              }}
            >
              <EditIcon />
            </IconButton>
          }
          title={
            <Fragment>
              <Typography gutterBottom variant="h5" component="div">
                <Typography
                  variant="h5"
                  fontWeight={600}
                  display="inline"
                  sx={{ textDecoration: "underline", marginRight: "1rem" }}
                >
                  {currentTaskID}:
                </Typography>
                {title}
              </Typography>
            </Fragment>
          }
        ></CardHeader>
        <CardContent>
          <Typography
            variant="subtitle1"
            fontStyle="italic"
            gutterBottom
            color="#575a5f"
          >
            {STATUSES.find((stat) => stat.id === status).name} -
            {`${new Date(date).getDate()}/${new Date(
              date
            ).getMonth()}/${new Date(date).getFullYear()}`}
          </Typography>
          <Divider />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ minHeight: "40vh", padding: "4rem 0" }}
          >
            {description}
          </Typography>
          <Divider />
        </CardContent>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              fontSize: "1rem",
            }}
          >
            {t("comments")}
          </AccordionSummary>
          <AccordionDetails>
            <TaskComments comments={comments} />
          </AccordionDetails>
        </Accordion>
      </Card>
    </div>
  );
}

export default ViewTask;
