import { useDispatch, useSelector } from "react-redux";
import { setCurrentPlaylist } from "../../../redux/actions";
import { sliceStr } from "../../../utils";
import album from "../../../assets/images/album.jpg";
import "./albumcard.style.scss";
const AlbumCard = function (props) {
  const { allLists } = useSelector((state) => state.getPlayerValues);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    const value =
      props.trackList ||
      allLists.allTracks.filter((item) => item.album === props.title);
    dispatch(setCurrentPlaylist(value));
  };

  const handleError = (e) => (e.currentTarget.src = album);

  return (
    <div className={"player-albumcard"} onClick={handleClick}>
      <img src={props.albumImage} onError={handleError} />
      <div className={"player-albumcard-info"}>
        <div className={"player-albumcard-title"}>
          {sliceStr(props.title, 20)}
        </div>
        <div className={"player-albumcard-composer"}>{props.composer}</div>
      </div>
    </div>
  );
};

export default AlbumCard;
