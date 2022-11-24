import { useEffect } from "react";

// import material items
import {
  AppBar,
  Box,
  Drawer,
  ListItemButton,
  Toolbar,
  ListItem,
  Divider,
  List,
  CssBaseline,
  Typography,
  ListItemText,
  Button,
} from "@mui/material";

// import icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const drawerWidth = 230;

export default function Slidebars() {
  const navigate = useNavigate();

  const url = "http://localhost:8000/profile";
  const token = localStorage.getItem("x-access-token");

  useEffect(() => {
    axios
      .get(url, { headers: { "x-access-token": token } })
      .then((res) => {})
      .catch((err) => {
        if (err) {
          window.location.reload(true);
          localStorage.removeItem("x-access-token");
        }
      });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("x-access-token")) {
      navigate("/login");
    }
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        variant="error"
        color="success"
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, flexGrow: "1" }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: "1" }}
          >
            DashBaord
          </Typography>
          <Typography>
            <Button
              className="category-btn"
              variant="outlined"
              color="inherit"
              onClick={() => {
                localStorage.removeItem("x-access-token");
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItemButton onClick={() => navigate("/")}>
              <AccountCircleIcon />
              <ListItem>
                <ListItemText> My Profile</ListItemText>
              </ListItem>
              &nbsp;
            </ListItemButton>

            <ListItemButton onClick={() => navigate("/add_user")}>
              &nbsp;
              <PersonAddIcon />
              <ListItem> Create User </ListItem>
            </ListItemButton>

            <ListItemButton onClick={() => navigate("/users")}>
              &nbsp;
              <PeopleIcon />
              <ListItem> User List </ListItem>
            </ListItemButton>

            <ListItemButton onClick={() => navigate("/books")}>
              &nbsp;
              <LocalLibraryIcon />
              <ListItem> Book List </ListItem>
            </ListItemButton>
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box>
    </Box>
  );
}
