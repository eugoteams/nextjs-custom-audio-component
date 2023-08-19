/** @format */

import AudioComponent from "@/Component/AudioComponent/AudioComponent";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [track, setTrack] = useState(0);

  const onTrackSelect = (trackID) => {
    setTrack((prevState) => trackID);
  };

  const onTrackEndListener = () => {
    //no-opt
  };

  return (
    <React.Fragment>
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
              onClick={(e) => onTrackSelect(id)}
            >{`Audio ${id}.mp3`}</p>
          );
        })}
      </div>
      <AudioComponent trackId={track} />
      {/* <Ac trackId={track} onTrackEnd={onTrackEndListener} autoplay={true} /> */}
    </React.Fragment>
  );
}
