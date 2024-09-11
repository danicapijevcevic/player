import { useDispatch, useSelector } from "react-redux";
import PlaylistItem from "../../organisms/PlaylistItem";
import { useEffect, useRef, useState } from "react";
import { setCurrentPlaylist, setNowPlaying } from "../../../redux/actions";
import "./playlist.style.scss";
const Playlist = function (props) {
  const itemsref = useRef();
  const [playlist, setPlaylist] = useState(null);
  const { currentPlaylist, allLists, nowPlaying } = useSelector(
    (state) => state.getPlayerValues
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allLists) return;
    const value = allLists.allTracks.slice(0, 10);
    dispatch(setCurrentPlaylist(value));
  }, [allLists]);

  useEffect(() => {
    if (!currentPlaylist) return;
    setPlaylist(currentPlaylist);
  }, [currentPlaylist]);

  useEffect(() => {
    if (!nowPlaying) return;
    setPlaylist((prev) =>
      prev.map((item) => ({
        ...item,
        active: item.key === nowPlaying.key,
      }))
    );
  }, [nowPlaying]);

  useEffect(() => {
    if (!props.triggerScroll) return;
    itemsref.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [props.triggerScroll]);

  const handleTrackClick = (track) => () => {
    dispatch(setNowPlaying(track));
  };

  return (
    <div className={"player-playlist"}>
      <div className={"player-playlist-title"}>
        <h3>Playlist</h3>
        <div className={"player-playlist-title-all"}>See all</div>
      </div>

      <div className={"player-playlist-items"} ref={itemsref}>
        {playlist?.map((item, index) => (
          <PlaylistItem
            key={item.key}
            active={item.active}
            orderNumber={index + 1}
            img={item.albumImage}
            album={item.album}
            track={item.trackName}
            composer={item.composer}
            duration={item.duration}
            handleClick={handleTrackClick(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
