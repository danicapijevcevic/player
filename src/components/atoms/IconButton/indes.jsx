import "./iconbutton.style.scss";
import Image from "../Image";
const IconButton = function ({ handleClick, img, size, active }) {
  return (
    <div
      className={`player-iconbutton ${
        active ? "player-iconbutton-active" : ""
      }`}
      onClick={handleClick}
    >
      {Image(img, size || 20)}
    </div>
  );
};

export default IconButton;
