import { useDispatch } from "react-redux";
import { setShowModalWindow } from "../../../redux/actions";
import "./modal.style.scss";
const Modal = function (props) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setShowModalWindow(false));
  };
  return (
    <div className={"player-modal"} onClick={handleClick}>
      {props.children}
    </div>
  );
};

export default Modal;
