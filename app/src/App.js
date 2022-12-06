import React from "react";
import {
  Toolbar,
  Drawer,
  AppBar,
  Slider,
  Typography,
  Box,
} from "@mui/material";
import { PlayerProvider } from "./context/PlayerContext";
import QueueTracksPanel from "./components/QueueTracksPanel";
import HomePage from "./components/HomePage";

const drawerWidth = 240;
function App() {
  return (
    <PlayerProvider>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            top: "auto",
            bottom: 0,
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Clipped drawer
            </Typography>
            <Slider
              color="secondary"
              defaultValue={30}
              aria-label="Small"
              valueLabelDisplay="auto"
            />
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <HomePage />
        </Box>
        <Drawer
          variant="permanent"
          anchor="right"
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
            <QueueTracksPanel />
          </Box>
        </Drawer>
      </Box>
    </PlayerProvider>
  );
}

export default App;
