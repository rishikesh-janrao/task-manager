import {
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { STATUSES } from "../../constants/STATUS";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  addUpdateAction,
  updateTask,
} from "../../modules/Slices/appSlice";
import useTranslations from "../../hooks/useTranslations";

export default function AddUpdateTask({ state }) {
  const dispatch = useDispatch();
  const { currentTaskID, tasks, actionItem } = useSelector(
    (state) => state.task
  );
  const { t } = useTranslations();

  useEffect(() => {
    if (actionItem === "EDIT-TASK" && currentTaskID !== "") {
      const data = { ...initialState };
      data.title.value = tasks[currentTaskID].title;
      data.description.value = tasks[currentTaskID].description;
      data.status.value = tasks[currentTaskID].status;
      setFormValues(data);
    }
  }, [actionItem]);

  const initialState = {
    title: {
      value: "",
      error: false,
      errorMessage: "Title is required to save task.",
    },
    description: {
      value: "",
      error: false,
      errorMessage: "Task description is required to save task.",
    },
    status: {
      value: "",
      error: false,
      errorMessage: "Please select task status.",
    },
  };
  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
        error: value.length <= 0,
      },
    });
  };
  const submitTaskData = (e) => {
    e.preventDefault();

    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };

    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];

      newFormValues = {
        ...newFormValues,
        [currentField]: {
          ...newFormValues[currentField],
          error: newFormValues[currentField].value.length <= 0,
        },
      };
    }

    setFormValues(initialState);
    const saveData = {
      title: newFormValues.title.value,
      description: newFormValues.description.value,
      status: newFormValues.status.value,
      date: Date.now(),
    };
    if (actionItem === "EDIT-TASK" && currentTaskID !== "")
      dispatch(updateTask({ id: currentTaskID, taskData: saveData }));
    else dispatch(addTask(saveData));
    dispatch(addUpdateAction(saveData.status));
    return false;
  };
  const handleReset = (e) => {
    e.preventDefault();
    setFormValues(initialState);
  };
  return (
    <form
      className="layout__board-new-task-form"
      noValidate
      onSubmit={submitTaskData}
      onChange={handleChange}
      onReset={handleReset}
    >
      <h2 className="layout__board-new-task-heading">
        {state === "ADD-TASK" && t("add_new_task")}
        {state === "EDIT-TASK" && t("update_task")}
      </h2>
      <TextField
        id="filled-basic"
        label="Title"
        variant="filled"
        className="layout__title-input"
        name="title"
        placeholder={t("new_task_title_placeholder")}
        required
        value={formValues.title.value}
        error={formValues.title.error}
        helperText={formValues.title.error && formValues.title.errorMessage}
      />
      <TextField
        id="filled-textarea"
        label="Description"
        multiline
        rows={8}
        placeholder={t("new_task_description_placeholder")}
        className="layout__description-input"
        name="description"
        variant="filled"
        required
        value={formValues.description.value}
        error={formValues.description.error}
        helperText={
          formValues.description.error && formValues.description.errorMessage
        }
      />
      <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Status"
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          name="status"
          required
          value={formValues.status.value}
          error={formValues.status.error}
          onChange={handleChange}
          sx={{ maxWidth: 200 }}
        >
          <MenuItem value="">Status</MenuItem>
          {STATUSES.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText className="layout__error-text">
          {formValues.status.error && formValues.status.errorMessage}
        </FormHelperText>
      </FormControl>
      <div className="layout__form-controls">
        <Button variant="contained" color="success" type="submit">
          {state === "ADD-TASK" ? t("save") : t("update")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="reset"
          onClick={() => dispatch(addUpdateAction("VIEW-ALL"))}
        >
          {t("cancel")}
        </Button>
      </div>
    </form>
  );
}
