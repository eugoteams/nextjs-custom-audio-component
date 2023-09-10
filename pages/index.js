/** @format */

import AdComponent from "@/Component/AudioComponent/AdComponent";
import Tracks from "@/Component/Tracks";
import React, { useState } from "react";

export default function Home() {
  const [track, setTrack] = useState(0);
  const audioRef = React.createRef();

  const audioSrcLoader = (trackId) => {
    audioRef.current.src = `/sound/1/${trackId}.mp3`;
    audioRef.current.load();
  };

  const onClickListener = (trackID) => {
    setTrack((prevState) => trackID);
    audioSrcLoader(trackID);
  };

  //AdComponenet control Listener
  const controlListenerHanlder = (action) => {
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
      <div style={{ fontSize: "2.4rem" }}>{track}</div>
      <div>
        <Tracks onClick={onClickListener} />
        <AdComponent ref={audioRef} controlListener={controlListenerHanlder} />
      </div>
    </React.Fragment>
  );
}
