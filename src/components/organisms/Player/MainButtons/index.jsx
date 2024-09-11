import { useEffect, useState } from "react";
import IconButton from "../../../atoms/IconButton/indes";
import { buttonslist } from "./buttonslist";
import { useCommandsUpdate } from "./commandutils";
import "./mainbuttons.style.scss";

const MainButtons = function (props) {
  const [buttons, setButtons] = useState(buttonslist);
  const command = useCommandsUpdate(props, setButtons, useEffect);
  command("play");
  command("loop");
  command("shuffle");

  return (
    <div className={"player-mainbuttons"}>
      {buttons.map((item) => (
        <IconButton
          key={item.id}
          handleClick={props.handleClick(item.name)}
          img={item.name === "play" && item.active ? item.img2 : item.img}
          size={item.size}
          active={item.active}
        />
      ))}
    </div>
  );
};

export default MainButtons;
