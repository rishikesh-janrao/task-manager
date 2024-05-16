import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

export default function TaskComments({ comments }) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {comments
        ? comments.map(({userName, comment, id}) => (
            <Fragment key={id??userName}>
              <ListItem
                alignItems="center"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ListItemAvatar>
                  <Avatar alt="X Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  secondary={
                    <Fragment>
                      <Typography
                        sx={{ display: "flex" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {userName}
                      </Typography>
                      {comment}
                    </Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          ))
        : ""}
    </List>
  );
}
