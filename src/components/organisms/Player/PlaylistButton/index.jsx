import IconButton from "../../../atoms/IconButton/indes";
import { PiPlaylistLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setShowModalWindow } from "../../../../redux/actions";
const PlaylistButton = function (props) {
  const dispatch = useDispatch();

  const addToPlaylist = () => {
    dispatch(setShowModalWindow(true));
  };

  return (
    <div className={"player-playlistbutton"}>
      <IconButton
        handleClick={addToPlaylist}
        img={PiPlaylistLight}
        size={20}
        active={false}
      />
    </div>
  );
};

export default PlaylistButton;
