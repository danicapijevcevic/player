import ProgressBar from "../ProgressBar";
import IconButton from "../../atoms/IconButton/indes";
import { getVolumeImageFromPercent } from "../../../utils";
import { useState } from "react";
import { imagesmap } from "./imagesmap";
import "./volumebar.style.scss";

const VolumeBar = function (props) {
  const [volume, setVolume] = useState("medium");

  const currentPercent = (percent) => {
    props.getCurrentPercent(percent);
    const value = getVolumeImageFromPercent(percent);
    setVolume(value);
  };

  return (
    <div className={"player-volumebar"}>
      <ProgressBar
        progresspercent={props.progresspercent}
        circleOffset={props.circleOffset}
        customClass={"player-audioplayer-volume-container"}
        getCurrentPercent={currentPercent}
        onVolumeUpdate={currentPercent}
      />
      <div className={"player-volumebar-img"}>
        <IconButton
          handleClick={props.handleMute}
          img={imagesmap[props.mute ? "off" : volume]}
          size={20}
          active={false}
        />
      </div>
    </div>
  );
};

export default VolumeBar;
