import React from "react";
import { Drawer, Box } from "@mui/material";
import { PlayerProvider } from "./context/PlayerContext";
import QueueTracksPanel from "./components/QueueTracksPanel";
import PlayerBar from "./components/player/PlayerBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PopularPlaylists from "./components/PopularPlaylists";
import Playlist from "./components/Playlist";

const drawerWidth = 330;
function App() {
  return (
    <PlayerProvider>
        {/*
            OK but you could refactor the layout part into the Layout component
            and just render the children here
            <PlayerProvider>
            <Layout>
                <BrowserRouter>...</BrowserRouter>
            </Layout>
            </PlayerProvider>
         */}
      <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
        <Box
          component="main"
          sx={{ display: "flex", overflow: "hidden", flex: 1 }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<PopularPlaylists />} />
                <Route path="/playlist/:id" element={<Playlist />} />
              </Routes>
            </BrowserRouter>
          </Box>
          <Drawer
            variant="permanent"
            anchor="right"
            sx={{
              width: drawerWidth,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Box sx={{ overflow: "auto" }}>
              <QueueTracksPanel />
            </Box>
          </Drawer>
        </Box>
        <PlayerBar />
      </Box>
    </PlayerProvider>
  );
}

export default App;
