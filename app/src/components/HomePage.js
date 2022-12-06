import React, { useContext, useEffect, useState } from 'react'
import PopularPlaylists from './PopularPlaylists'
import CurrentPlaylist from './CurrentPlaylist'
import { PlayerContext } from '../context/PlayerContext'

const fetchPopularPlaylists = async () => {
  const response = await fetch("http://localhost:8080/popular/playlists");
  return await response.json();
};

const fetchPlaylist = async (playlistId) => {
  const response = await fetch(
    `http://localhost:8080/playlist/${playlistId}`
  );
  return await response.json();
};
export default function HomePlage() {
  const [playlist, setPlaylist] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const {addToQueue,playTrack} = useContext(PlayerContext);

  useEffect(() => {
    fetchPopularPlaylists().then(setPlaylists).catch(console.error);
  }, []);

  function handlePlaylistClick(playlist) {
    fetchPlaylist(playlist.id).then(setPlaylist).catch(console.error);
  }

  function handleClickTrack(track) {
    console.log(track);
    addToQueue(track);
    playTrack(track); // ONLY FOR DEMO
  }

  return (
    <>
      {playlist ?
        <CurrentPlaylist
          playlist={playlist}
          onClickTrack={handleClickTrack}
          onClickBack={()=>setPlaylist(null)}
        /> :
        <PopularPlaylists
          playlists={playlists}
          onPlaylistClick={handlePlaylistClick}
        />
      }
    </>
  );
}
