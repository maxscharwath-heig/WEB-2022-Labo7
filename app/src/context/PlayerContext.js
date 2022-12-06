import {createContext, useState} from "react";

export const PlayerContext = createContext({});

export const PlayerProvider = ({children}) => {
    const [queue, setQueue] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);

    const fetchPlaylist = async (playlistId) => {
        //TODO: fetch playlist from API
    }

    const fetchPopularPlaylists = async () => {
        //TODO: fetch popular playlists from API
    }

    const addToQueue = (track) => {
        setQueue([...queue, track]);
    }

    const toggleTrack = () => {
        //TODO: toggle play
    }

    const playNext = () => {
        //TODO: play next track
    }

    const playPrevious = () => {
        //TODO: play previous track
    }


    return (
        <PlayerContext.Provider value={{
            queue,
            currentTrack,
            fetchPlaylist,
            fetchPopularPlaylists,
            addToQueue,
            toggleTrack,
            playNext,
            playPrevious
        }}>
            {children}
        </PlayerContext.Provider>
    )
}
