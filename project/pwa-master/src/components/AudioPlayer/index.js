import React from "react";
import ReactAudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./styles.scss";

const AudioPlayer = ({ src }) => {
  return (
    <ReactAudioPlayer
      showLoopControl={false}
      showVolumeControl={false}
      src={src}
      style={{
        width: "100%",
        backgroundColor: "transparent",
      }}
    />
  );
};

export default AudioPlayer;
