import React,{useContext,useEffect} from "react";
import QueueTracksList from "./QueueTracksList";
import {PlayerContext} from "../context/PlayerContext";

function QueueTracksPanel() {
    const {queue,addToQueue,fetchPlaylist,playTrack} = useContext(PlayerContext);

    useEffect(() => {
        fetchPlaylist(1479458365).then(data => {
            addToQueue(...data.tracks.data);
        })
    },[]);

    const handleClickTrack = (track) => {
        playTrack(track);
    }

    return (
        <>
            <div>
                <span>Queue</span>
                <span>{queue.length} tracks</span>
            </div>
            <QueueTracksList queue={queue} onClickTrack={handleClickTrack} />
        </>
    )
}

export default QueueTracksPanel;
