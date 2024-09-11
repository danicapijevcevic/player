import { useState } from "react";
import Player from "../../organisms/Player";
import ComposersList from "../../sections/ComposersList";
import Playlist from "../../sections/Playlist";
import CurrentPlaying from "../../organisms/CurrentPlaying";
import { useSelector } from "react-redux";
import Albums from "../../sections/Albums";
import AddToPlaylist from "../../sections/AddToPlaylist";
import "./main.style.scss";

const Main = function () {
  const [triggerScroll, setTriggerScroll] = useState(0);
  const { nowPlaying, allLists, showModal } = useSelector(
    (state) => state.getPlayerValues
  );
  const scrolltotop = () => {
    setTriggerScroll((prev) => prev + 1);
  };
  return (
    <div className="player-main">
      <div
        className={"player-main-background"}
        style={{
          backgroundImage: `url(${nowPlaying?.composerImage})`,
        }}
      />
      <Albums list={allLists?.albums} />
      <div className={"player-main-player"}>
        <CurrentPlaying />
        <Player scrolltotop={scrolltotop} />
        <div className={"player-main-player-right"} />
      </div>
      <div className={"player-main-left"}></div>
      <div className={"player-main-central"}>
        <div className={"player-maincontent"}>
          <Playlist triggerScroll={triggerScroll} />
          <ComposersList />
        </div>
      </div>
      {showModal && <AddToPlaylist />}
    </div>
  );
};

export default Main;
