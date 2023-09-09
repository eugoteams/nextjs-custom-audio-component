/** @format */

import AdComponent from "@/Component/AudioComponent/AdComponent";
import AudioComponent from "@/Component/AudioComponent/AudioComponent";
import React, { useEffect, useState } from "react";
import ErrorBoundry from "../Component/ErrorBoundry";

export default function Home() {
  const [track, setTrack] = useState(0);
  const [log, setLog] = useState("");
  const audioRef = React.createRef();

  const onTrackSelect = (trackID) => {
    setTrack((prevState) => trackID);
    audioSrcLoader(trackID);
  };

  const audioSrcLoader = (trackId) => {
    audioRef.current.src = `/sound/1/${trackId}.mp3`;
    audioRef.current.load();
  };

  //AdComponenet control Listener
  const controlListener = (action) => {
    switch (action.type) {
      case "play":
        audioRef.current.play();
        break;
      case "pause":
        audioRef.current.pause();
        break;
      case "forward":
        let nextTrack = track + 1;
        setTrack((prevState) => nextTrack);
        audioSrcLoader(nextTrack);
        console.log("forward", track);
        break;
      case "backward":
        let prevTrack = track - 1;
        if (prevTrack > 0) {
          setTrack((prevState) => prevTrack);
          audioSrcLoader(prevTrack);
          console.log("backward");
        }

        break;
      case "seek":
        audioRef.current.currentTime = action.payload;
        break;
      case "close":
        audioRef.current.pause();
        break;
      case "playBackRate":
        audioRef.current.playbackRate = action.payload;
        break;
      default:
        //no-opt
        break;
    }
  };

  return (
    <React.Fragment>
      <ErrorBoundry>
        <h1 style={{ margin: "2rem auto", textAlign: "center" }}>Tracks</h1>
        <div
          style={{
            width: "34rem",
            height: "27rem",
            overflow: "auto",
            textAlign: "center",
            padding: "1rem",
            margin: "2rem auto",
          }}
        >
          <div>{log}</div>
          <div style={{ fontSize: "2.4rem" }}>{track}</div>
          {[...Array(47)].map((_, index) => {
            let id = index + 1;
            return (
              <p
                style={{
                  margin: "1rem auto",
                  textAlign: "center",
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
                key={id}
                onClick={(e) => {
                  onTrackSelect(id);
                }}
              >{`Audio ${id}.mp3`}</p>
            );
          })}
        </div>

        <AdComponent ref={audioRef} controlListener={controlListener} />
      </ErrorBoundry>
    </React.Fragment>
  );
}
