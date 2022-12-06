import React,{useContext} from "react";
import QueueTracksList from "./QueueTracksList";
import {PlayerContext} from "../context/PlayerContext";

function QueueTracksPanel() {
    const {queue} = useContext(PlayerContext);
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
