import { useSelector } from "react-redux";
import { ActionStatuses, SummaryStatuses } from "../../../constants/STATUS";
import TaskListByStatus from "../../common/TaskListByStatus";
import AddUpdateTask from "../../common/AddUpdateTask";
import MoveConfirmation from "../../MoveConfirmation";
import ViewTask from "../../ViewTask";

function AppBoard() {
  const { actionItem, currentTaskID } = useSelector((state) => state.task);
  return (
    <section className="layout__board">
      {SummaryStatuses.includes(actionItem) && (
        <TaskListByStatus status={actionItem} />
      )}
      {ActionStatuses.includes(actionItem) && (
        <AddUpdateTask state={actionItem} />
      )}
      {actionItem === "VIEW-TASK" && <ViewTask />}
      <MoveConfirmation
        state={currentTaskID !== "" && actionItem === "MOVE-TASK"}
      />
    </section>
  );
}

export default AppBoard;
