import { IoPlayOutline } from "react-icons/io5";
import { IoPlaySkipBackOutline } from "react-icons/io5";
import { IoPlaySkipForwardOutline } from "react-icons/io5";
import { IoPauseOutline } from "react-icons/io5";
import { IoRepeat } from "react-icons/io5";
import { IoShuffle } from "react-icons/io5";

export const buttonslist = [
  { id: 1, name: "shuffle", img: IoShuffle, active: false },
  { id: 2, name: "back", img: IoPlaySkipBackOutline, active: false },
  {
    id: 3,
    name: "play",
    img: IoPlayOutline,
    img2: IoPauseOutline,
    active: null,
    size: 25,
  },
  { id: 4, name: "forward", img: IoPlaySkipForwardOutline, active: false },
  { id: 5, name: "loop", img: IoRepeat, active: false },
];
