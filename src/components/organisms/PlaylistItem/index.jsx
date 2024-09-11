import { IoMusicalNotesOutline } from "react-icons/io5";
import album from "../../../assets/images/album.jpg";
import "./playlistitem.style.scss";
const PlaylistItem = function (props) {
  return (
    <div
      className={`player-playlistitem ${
        props.active ? "player-playlistitem-active" : ""
      }`}
      onClick={props.handleClick}
    >
      <div className={"player-playlistitem-ordernumber"}>
        {props.active ? <IoMusicalNotesOutline /> : props.orderNumber}
      </div>
      <div className={"player-playlistitem-album"}>
        <img src={props.img} onError={(e) => (e.currentTarget.src = album)} />
        <div>{props.album}</div>
      </div>
      <div className={"player-playlistitem-track"}>{props.track}</div>
      <div className={"player-playlistitem-composer"}>{props.composer}</div>
      <div className={"player-playlistitem-duration"}>{props.duration}</div>
    </div>
  );
};

export default PlaylistItem;
