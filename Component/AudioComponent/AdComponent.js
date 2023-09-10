/** @format */

import React, { forwardRef, useState } from "react";
import classes from "./AudioComponent.module.css";
import { FaForward, FaPlay, FaBackward, FaPause } from "react-icons/fa";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { GrClose } from "react-icons/gr";
const AdComponent = forwardRef(({ controlListener }, ref) => {
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

  const stateHandler = (key, value) => {
    setState((prevState) => {
      prevState[key] = value;
      return { ...prevState };
    });
  };

  // console.log(playerState["play"]);
  return (
    <React.Fragment>
      <div>
        <audio
          ref={ref}
          autoPlay
          preload="metadata"
          style={{ display: "none" }}
          onPlay={() => {
            stateHandler("play", true);
            if (!playerState["playerClosed"]) {
              stateHandler("playerClosed", !playerState["playerClosed"]);
            }
          }}
          onPause={() => {
            stateHandler("play", false);
          }}
          onTimeUpdate={() => {
            stateHandler("trackDurationPlayed", ref.current.currentTime);
          }}
          onEnded={() => {
            stateHandler("play", false);
          }}
          onLoadedMetadata={(value) => {
            stateHandler("trackDuration", ref.current.duration);
          }}
        ></audio>
        {playerState["playerClosed"] && (
          <div className={`${classes.container}`}>
            <div>
              <input
                type="range"
                className={`${classes.slider}`}
                onChange={(e) => {
                  controlListener({ type: "seek", payload: e.target.value });
                  stateHandler("trackDurationPlayed", e.target.value);
                }}
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
                  stateHandler("optMenu", !playerState["optMenu"]);
                }}
              >
                <PiDotsThreeOutlineFill />
              </div>
              <div
                className={`${classes.icons}`}
                onClick={(e) => controlListener({ type: "backward" })}
              >
                <FaBackward />
              </div>
              <div className={`${classes.icons}`}>
                {playerState["play"] ? (
                  <FaPause
                    onClick={(e) => {
                      console.log("Player *****", playerState["play"]);
                      controlListener({ type: "pause" });
                    }}
                  />
                ) : (
                  <FaPlay
                    onClick={(e) => {
                      console.log("Player**** ", playerState["play"]);
                      controlListener({ type: "play" });
                    }}
                  />
                )}
              </div>
              <div
                className={`${classes.icons}`}
                onClick={(e) => controlListener({ type: "forward" })}
              >
                <FaForward />
              </div>
              <div
                className={`${classes.icons}`}
                onClick={(e) => {
                  stateHandler("playerClosed", !playerState["playerClosed"]);
                  controlListener({ type: "close" });
                }}
              >
                <GrClose />
              </div>
            </div>
            <div>{convertSecToMinutes(playerState["trackDuration"])}</div>
            {playerState["optMenu"] && (
              <div className={`${classes.playback_opt}`}>
                {playbackRate.map((playRate, index) => {
                  return (
                    <span
                      key={`${playRate}_${index}`}
                      onClick={(e) => {
                        stateHandler("playbackRate", playRate);
                        stateHandler("optMenu", !playerState["optMenu"]);
                        controlListener({
                          type: "playBackRate",
                          payload: playRate === "normal" ? 1 : playRate,
                        });
                      }}
                    >
                      {playRate}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
});

export default AdComponent;
