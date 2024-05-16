import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import { Box, Button, Fade, Popper, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpdateAction } from "../../../modules/Slices/appSlice";
import TaskCard from "../../common/TaskCard";
import useTranslations from "../../../hooks/useTranslations";

const drawerWidth = 340;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  backgroundColor: "#282c34",
  color: "#fff",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function AppDrawer({ isHandheld }) {
  const [open, setOpen] = useState(false);
  const [searchedTask, setSearchedTask] = useState("");
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);
  const { t } = useTranslations();

  const [openPopper, setOpenPopper] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "spring-popper" : undefined;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const onSearchQuery = (event) => {
    const text = event.target.value;

    setOpenPopper(true);
    setAnchorEl(event.currentTarget);
    const result =
      Object.keys(tasks).find(
        (key) =>
          tasks[key].title.includes(text) ||
          tasks[key].description.includes(text)
      ) ?? "";
    setSearchedTask((searchedTask) => (result === searchedTask ? "" : result));
    if (text === "") {
      setOpenPopper(false);
    }
  };
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader sx={{ display: "flex", gap: "0" }}>
        {open && (
          <label className="layout__manager-heading">{t("task_manager")}</label>
        )}
        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
          {open ? (
            <ChevronLeftIcon sx={{ color: "white" }} />
          ) : (
            <ChevronRightIcon sx={{ color: "white" }} />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      {!isHandheld && (
        <List onClick={handleDrawerOpen}>
          <ListItem key="add-task" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: "center",
                px: 2.5,
              }}
            >
              {!open && (
                <>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <AddIcon />
                  </ListItemIcon>
                </>
              )}
              {open && (
                <Button
                  className="layout__manager-add-new-task"
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => dispatch(addUpdateAction("ADD-TASK"))}
                >
                  {t("new_task")}
                </Button>
              )}
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key="search" disablePadding sx={{ display: "block" }}>
            <div className="layout__manager-search-task">
              {open && (
                <>
                  <TextField
                    id="outlined-size-small"
                    label={t("search_tasks")}
                    variant="filled"
                    color="primary"
                    size="small"
                    fullWidth
                    onInput={onSearchQuery}
                  />

                  <SearchIcon className="layout__manager-search-task-icon" />
                </>
              )}
              {!open && (
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={handleDrawerOpen}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <SearchIcon />
                  </ListItemIcon>
                </ListItemButton>
              )}
            </div>
            <Popper
              id={id}
              open={openPopper}
              anchorEl={anchorEl}
              transition
              sx={{ margin: 0 }}
              placement="right"
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={2000}>
                  <Box sx={{ p: 1, bgcolor: "#ccc", width: "100%" }}>
                    {searchedTask === "" ? (
                      "No Results found! :-("
                    ) : (
                      <TaskCard
                        taskId={searchedTask}
                        taskData={tasks[searchedTask]}
                        closePopper={() => setOpenPopper(false)}
                      />
                    )}
                  </Box>
                </Fade>
              )}
            </Popper>
          </ListItem>
        </List>
      )}
      <Divider />
      <List>
        {[
          {
            name: t("all_tasks"),
            action: (() => {
              let action = "";
              Object.values(tasks).some(({ status }) => {
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
              return action;
            })(),
          },
          { name: t("task_to_do"), action: "to-do" },
          { name: t("task_in_progress"), action: "in-progress" },
          { name: t("completed_tasks"), action: "done" },
        ].map(({ name, action }, index) => (
          <ListItem
            key={name + Math.random()}
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              dispatch(addUpdateAction(action));
              if (isHandheld) handleDrawerClose();
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={handleDrawerOpen}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default AppDrawer;
