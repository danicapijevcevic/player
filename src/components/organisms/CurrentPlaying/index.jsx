import { useSelector } from "react-redux";
import album from "../../../assets/images/album.jpg";
import "./currentplaying.style.scss";

const CurrentPlaying = function (props) {
  const { nowPlaying } = useSelector((state) => state.getPlayerValues);

  return (
    <div className={"player-currentplaying"}>
      {!nowPlaying ? null : (
        <>
          <div className={"player-currentplaying-img"}>
            <img
              src={nowPlaying?.albumImage}
              onError={(e) => (e.currentTarget.src = album)}
            />
          </div>
          <div className={"player-currentplaying-info"}>
            <div>
              <h2>{nowPlaying?.composer}</h2>
              <h3>{nowPlaying?.trackName}</h3>
              <h4>{nowPlaying?.album}</h4>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrentPlaying;
