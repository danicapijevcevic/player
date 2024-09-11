import { useDispatch, useSelector } from "react-redux";
import { setCurrentPlaylist } from "../../../redux/actions";
import "./composerslist.style.scss";

const ComposersList = function () {
  const { allLists } = useSelector((state) => state.getPlayerValues);
  const dispatch = useDispatch();
  const handleClick = (composer) => (e) => {
    const value = allLists.allTracks.filter(
      (item) => item.composer === composer
    );
    dispatch(setCurrentPlaylist(value));
  };

  return (
    <div className={"player-composerslist"}>
      <h3>Composers</h3>

      <div className={"player-composerslist-items"}>
        {allLists?.composers?.map((item) => (
          <div
            key={item.name}
            className={"player-composerslist-item"}
            onClick={handleClick(item.name)}
          >
            <img src={item.img} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComposersList;
