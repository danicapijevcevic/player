import { useRef, useState } from "react";
import "./playerscroller.style.scss";
const HorizontalScroller = function (props) {
  const [mouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const elementref = useRef();
  const handleMouseDown = (e) => {
    if (!elementref.current) return;
    const x = e.pageX - elementref.current.offsetLeft;
    setMouseDown(true);
    setStartX(x);
    setScrollLeft(elementref.current.scrollLeft);
    
  };
  const handleMouseUp = (e) => {
    if (!elementref.current) return;
    setMouseDown(false);
  };
  const handleMouseMove = (e) => {
    if (!elementref.current) return;
    if (!mouseDown) return;

    const x = e.pageX - elementref.current.offsetLeft;
    const n = x - startX;
    elementref.current.scrollLeft = scrollLeft - n;
  };

  return (
    <div
      ref={elementref}
      className={"player-playerscroller"}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
    >
      {props.children}
    </div>
  );
};

export default HorizontalScroller;
