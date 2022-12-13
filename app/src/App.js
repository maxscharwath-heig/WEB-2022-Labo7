import React from 'react'
import { Toolbar, Drawer, Box } from '@mui/material'
import { PlayerProvider } from './context/PlayerContext'
import QueueTracksPanel from './components/QueueTracksPanel'
import HomePage from './components/HomePage'
import Player from './components/Player'

// CSS
import './normalize.css'
import './style.css'

const drawerWidth = 330
function App() {
   return (
      <PlayerProvider>
         <Box sx={{ display: 'flex' }}>
            <Box component='main' sx={{ flexGrow: 1 }}>
               <HomePage />
            </Box>
            <Drawer
               variant='permanent'
               anchor='right'
               sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  [`& .MuiDrawer-paper`]: {
                     width: drawerWidth,
                     boxSizing: 'border-box',
                  },
               }}
            >
               <Toolbar />
               <Box sx={{ overflow: 'auto' }}>
                  <QueueTracksPanel />
               </Box>
            </Drawer>
         </Box>
         <Player />
      </PlayerProvider>
   )
}

export default App
