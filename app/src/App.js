import React, { lazy, Suspense } from 'react'
import { Drawer, Box } from '@mui/material'
import { PlayerProvider } from './context/PlayerContext'
import QueueTracksPanel from './components/QueueTracksPanel'
import Player from './components/Player'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Playlist = lazy(() => import('./components/Playlist'))
const PopularPlaylists = lazy(() => import('./components/PopularPlaylists'))

const drawerWidth = 330
function App() {
   return (
      <PlayerProvider>
         <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
            <Box component='main' sx={{ display: 'flex', overflow: 'hidden', flex: 1 }}>
               <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <BrowserRouter>
                     <Routes>
                        <Route
                           path='/'
                           element={
                              <Suspense fallback={<div>Loading Playlists...</div>}>
                                 <PopularPlaylists />
                              </Suspense>
                           }
                        />
                        <Route
                           path='/playlist/:id'
                           element={
                              <Suspense fallback={<div>Loading Playlist...</div>}>
                                 <Playlist />
                              </Suspense>
                           }
                        />
                     </Routes>
                  </BrowserRouter>
               </Box>
               <Drawer
                  variant='permanent'
                  anchor='right'
                  sx={{
                     width: drawerWidth,
                     [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                     },
                  }}
               >
                  <Box sx={{ overflow: 'auto' }}>
                     <QueueTracksPanel />
                  </Box>
               </Drawer>
            </Box>
            <Player />
         </Box>
      </PlayerProvider>
   )
}

export default App
