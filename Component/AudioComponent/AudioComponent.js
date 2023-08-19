/** @format */

import React, { forwardRef, useEffect, useRef, useState } from "react";
import classes from "./AudioComponent.module.css";
import { FaForward, FaPlay, FaBackward, FaPause } from "react-icons/fa";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { GrClose } from "react-icons/gr";

const AudioComponent = ({ trackId }) => {
  let audioRef = useRef();
  const [playerState, setState] = useState({
    play: false,
    trackDuration: 0,
    trackDurationPlayed: 0,
    optMenu: false,
    playbackRate: 1,
    playerClosed: true,
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

  const playerStateManipulator = (key, value) => {
    setState((prevState) => {
      switch (true) {
        case key === "play":
          if (value) {
            audioRef.current.src = `/sound/1/${trackId}.mp3`;
            audioRef.current.load();
            if (prevState["trackDurationPlayed"] > 0) {
              audioRef.current.currentTime = prevState["trackDurationPlayed"];
              audioRef.current.playbackRate = prevState["playbackRate"];
            }
            audioRef.current.play();
          } else {
            audioRef.current.pause();
          }
          prevState[key] = value;
          break;
        case key === "playbackRate":
          if (value === 0 || value === "normal") {
            audioRef.current.playbackRate = 1;
            prevState[key] = 1;
          } else {
            audioRef.current.playbackRate = value;
            prevState[key] = value;
          }

          prevState["optMenu"] = false;
          break;
        case key === "reset":
          prevState["trackDuration"] = 0;
          prevState["trackDurationPlayed"] = 0;
          prevState["playbackRate"] = 1;
          console.log("state - reset", prevState);
          break;
        default:
          prevState[key] = value;
      }

      return { ...prevState };
    });
  };

  const onPlayerDurationUpdateListener = () => {
    let durationPlayed = audioRef.current.currentTime;
    playerStateManipulator("trackDurationPlayed", durationPlayed);
  };

  const onPlayerPlayEndedListener = () => {
    playerStateManipulator("reset", undefined);
    playerStateManipulator("play", false);
  };

  const onRangeChangeListener = (event) => {
    let dragedRange = event.target.value;
    audioRef.current.currentTime = dragedRange;
    playerStateManipulator("trackDurationPlayed", dragedRange);
  };

  const onLoadMetaDataListener = () => {
    playerStateManipulator("trackDuration", audioRef.current.duration);
  };

  const onClickForwardListener = (event) => {
    playerStateManipulator("reset", undefined);
  };

  const onClickBackWardListener = (event) => {
    playerStateManipulator("reset", undefined);
  };

  useEffect(() => {
    playerStateManipulator("reset", undefined);
    playerStateManipulator("play", true);
  }, [trackId]);

  return (
    <React.Fragment>
      <audio
        style={{ display: "none" }}
        ref={audioRef}
        onTimeUpdate={onPlayerDurationUpdateListener}
        onEnded={onPlayerPlayEndedListener}
        preload="metadata"
        onLoadedMetadata={onLoadMetaDataListener}
      ></audio>
      <div className={`${classes.container}`}>
        <div>
          <input
            type="range"
            className={`${classes.slider}`}
            onChange={onRangeChangeListener}
            value={playerState["trackDurationPlayed"]}
            min={0}
            max={playerState["trackDuration"]}
          />
        </div>
        <div>{convertSecToMinutes(playerState["trackDurationPlayed"])}</div>
        <div className={`${classes.controls}`}>
          <div
            className={`${classes.icons} `}
            onClick={(e) => playerStateManipulator("optMenu", true)}
          >
            <PiDotsThreeOutlineFill />
          </div>
          <div className={`${classes.icons}`} onClick={onClickBackWardListener}>
            <FaBackward />
          </div>
          <div className={`${classes.icons}`}>
            {playerState["play"] ? (
              <FaPause
                onClick={(e) => {
                  playerStateManipulator("play", false);
                }}
              />
            ) : (
              <FaPlay
                onClick={(e) => {
                  playerStateManipulator("play", true);
                }}
              />
            )}
          </div>
          <div className={`${classes.icons}`} onClick={onClickForwardListener}>
            <FaForward />
          </div>
          <div
            className={`${classes.icons}`}
            onClick={(e) => playerStateManipulator("playerClosed", true)}
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
                  onClick={(e) =>
                    playerStateManipulator("playbackRate", playRate)
                  }
                >
                  {playRate}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default AudioComponent;
