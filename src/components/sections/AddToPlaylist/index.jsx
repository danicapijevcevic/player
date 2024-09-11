import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import IconButton from "../../atoms/IconButton/indes";
import Modal from "../../atoms/Modal";
import { PiMinusCircle, PiPlusCircle } from "react-icons/pi";
import { setAlbumsUpdate, setShowModalWindow } from "../../../redux/actions";
import { setAddNewSong } from "./utils";
import { findInString } from "../../../utils";
import "./addtoplaylist.style.scss";

const AddToPlaylist = function () {
  const { allLists } = useSelector((state) => state.getPlayerValues);
  const dispatch = useDispatch();
  const [state, setState] = useState({ albumImage: "slika" });
  const [list, setList] = useState(null);

  const addToPLaylist = (item) => () => {
    setState(setAddNewSong(item));
  };
  const handleCreatePlaylist = () => {
    state &&
      state.trackList &&
      state.trackList[0] &&
      dispatch(setAlbumsUpdate(state));
    dispatch(setShowModalWindow(false));
  };
  const handlePlaylistName = (e) => {
    const value = e.currentTarget.value;
    setState((prev) => ({ ...prev, album: value }));
  };
  const handleSearch = (e) => {
    const value = e.currentTarget.value;
    const find = findInString(value);
    setList(
      allLists?.allTracks?.filter(
        (item) =>
          find(item.trackName) || find(item.composer) || find(item.album)
      )
    );
  };

  useEffect(() => {
    allLists?.allTracks && setList(allLists?.allTracks);
  }, [allLists?.allTracks]);

  return (
    <Modal>
      <div
        className={"player-addtoplaylist"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className={"player-addtoplaylist-header"}>
          <h2>Add to playlist</h2>
          <div className={"player-addtoplaylist-add"}>
            <input
              type="text"
              placeholder="Playlist name"
              onChange={handlePlaylistName}
            />
            <div onClick={handleCreatePlaylist}>Create playlist</div>
          </div>
        </div>

        <div className={"player-addtoplaylist-list"}>
          <div className={"player-addtoplaylist-table"}>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Track</th>
                  <th>Album</th>
                  <th>Composer</th>
                  <th>Add</th>
                </tr>
              </thead>

              <tbody>
                {list?.map((item, index) => (
                  <tr key={item.key}>
                    <th>{index}</th>
                    <th>{item.trackName}</th>
                    <th>{item.album}</th>
                    <th>{item.composer}</th>
                    <th>
                      <IconButton
                        handleClick={addToPLaylist(item)}
                        img={
                          state.trackList?.find((i) => i.key === item.key)
                            ? PiMinusCircle
                            : PiPlusCircle
                        }
                        size={20}
                        active={false}
                      />
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={"player-addtoplaylist-search"}>
            <input placeholder="Search..." onChange={handleSearch} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddToPlaylist;
