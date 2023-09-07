/** @format */

import React, { forwardRef, useState } from "react";
import classes from "./AudioComponent.module.css";
import { FaForward, FaPlay, FaBackward, FaPause } from "react-icons/fa";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { GrClose } from "react-icons/gr";
const AdComponent = forwardRef((props, ref) => {
  const [playerState, setState] = useState({
    play: false,
    trackDuration: 0,
    trackDurationPlayed: 0,
    optMenu: false,
    playbackRate: 1,
    playerClosed: false,
  });

  let playbackRate = [
    "0.25",
    "0.5",
    "0.75",
    "normal",
    "1.25",
    "1.5",
    "1.75",
    "2",
  ];
  const convertSecToMinutes = (time) => {
    let minutes = Math.floor(time / 60);
    let extraSeconds = Math.round(time % 60);
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
    return `${minutes}:${extraSeconds}`;
  };
  return (
    <React.Fragment>
      <div>
        <audio
          autoPlay
          style={{ display: "none" }}
          ref={ref}
          onTimeUpdate={() => {
            console.log("onTimeUpdate");
          }}
          onEnded={() => {
            console.log("onended");
          }}
          preload="metadata"
          onLoadedMetadata={() => {
            console.log("OnLoad meta data listener");
          }}
          muted
        ></audio>
        <div className={`${classes.container}`}>
          <div>
            <input
              type="range"
              className={`${classes.slider}`}
              onChange={(e) => console.log("range", e.target.value)}
              value={playerState["trackDurationPlayed"]}
              min={0}
              max={playerState["trackDuration"]}
            />
          </div>
          <div>{convertSecToMinutes(playerState["trackDurationPlayed"])}</div>
          <div className={`${classes.controls}`}>
            <div
              className={`${classes.icons} `}
              onClick={(e) => {
                console.log("menu");
              }}
            >
              <PiDotsThreeOutlineFill />
            </div>
            <div
              className={`${classes.icons}`}
              onClick={(e) => {
                console.log("backward");
              }}
            >
              <FaBackward />
            </div>
            <div className={`${classes.icons}`}>
              {playerState["play"] ? (
                <FaPause
                  onClick={(e) => {
                    console.log("pause");
                  }}
                />
              ) : (
                <FaPlay
                  onClick={(e) => {
                    console.log("play");
                  }}
                />
              )}
            </div>
            <div
              className={`${classes.icons}`}
              onClick={(e) => {
                console.log("forward");
              }}
            >
              <FaForward />
            </div>
            <div
              className={`${classes.icons}`}
              onClick={(e) => console.log("close player")}
            >
              <GrClose />
            </div>
          </div>
          <div>{convertSecToMinutes(playerState["trackDuration"])}</div>
          {true && (
            <div className={`${classes.playback_opt}`}>
              {playbackRate.map((playRate, index) => {
                return (
                  <span
                    key={`${playRate}_${index}`}
                    onClick={(e) => console.log(playRate)}
                  >
                    {playRate}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
});

export default AdComponent;
