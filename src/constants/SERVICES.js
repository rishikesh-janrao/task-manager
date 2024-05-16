const PORT = 3001;
const HOST = `http://localhost:${PORT}`;

const SERVICES = {
  TRANSLATIONS: "/translations",
  ADD_TASK: "/add-task/",
  UPDATE_TASK: "/update-task/",
  DELETE_TASK: "/delete-task/",
  TASKS: "/tasks",
};
Object.keys(SERVICES).forEach((key) => {
  SERVICES[key] = `${HOST}${SERVICES[key]}`;
});
export default SERVICES;


