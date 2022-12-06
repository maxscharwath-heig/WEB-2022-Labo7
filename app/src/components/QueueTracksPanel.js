import React,{useContext,useEffect} from "react";
import QueueTracksList from "./QueueTracksList";
import {PlayerContext} from "../context/PlayerContext";

function QueueTracksPanel() {
    const {queue,addToQueue,fetchPlaylist,playNext} = useContext(PlayerContext);

    useEffect(() => {
        fetchPlaylist(1479458365).then(data => {
            console.log(data);
            addToQueue(...data.tracks.data);
            playNext();
        })
    },[]);

    return (
        <>
            <div>
                <span>Queue</span>
                <span>{queue.length} tracks</span>
            </div>
            <QueueTracksList queue={queue} />
        </>
    )
}

export default QueueTracksPanel;
