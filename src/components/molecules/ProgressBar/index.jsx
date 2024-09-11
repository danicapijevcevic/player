import { useEffect, useRef, useState } from "react";
import { range, valuesToPercent, percentToValue } from "../../../utils";
import { CIRCLE_WIDTH } from "../../../utils/constants";
import "./progressbar.style.scss";
const ProgressBar = function (props) {
  const [progressPercent, setProgresPercent] = useState("0%");
  const [circleOffset, setCircleOffset] = useState(0);
  const progressInner = useRef();
  const down = useRef(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    down.current = true;
    const x = e.pageX - e.currentTarget.offsetLeft;
    const { clientWidth } = e.currentTarget;
    const percent = valuesToPercent(x, clientWidth);
    setProgresPercent(percent + "%");
  };

  useEffect(() => {
    !down.current && setProgresPercent(props.progresspercent);
  }, [props.progresspercent]);

  useEffect(() => {
    !down.current && setCircleOffset(props.circleOffset);
  }, [props.circleOffset]);

  useEffect(() => {
    const mouseMove = (e) => {
      if (!down.current) return;
      const pwidth = progressInner.current.clientWidth;
      const oleft = progressInner.current.getBoundingClientRect().left;
      const left = e.pageX - oleft;
      const x = range(left, pwidth);
      const percent = valuesToPercent(x, pwidth);
      const _circleOffset = percentToValue(CIRCLE_WIDTH, percent);
      setCircleOffset(_circleOffset);
      setProgresPercent(percent + "%");
      props.onVolumeUpdate && props.onVolumeUpdate(percent);
    };

    const mouseUp = (e) => {
      if (!down.current) return;
      const pwidth = progressInner.current.clientWidth;
      const oleft = progressInner.current.getBoundingClientRect().left;
      const left = e.pageX - oleft;
      const x = range(left, pwidth);
      const percent = valuesToPercent(x, pwidth);
      setProgresPercent(percent + "%");
      props.getCurrentPercent(percent);
      down.current = false;
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, []);

  return (
    <div className={`player-progressbar ${props.customClass || ""}`}>
      {props.loading && props.songtrack ? (
        <div className={"player-progressbar-loader"} />
      ) : (
        <div
          ref={progressInner}
          className={"player-progressbar-inner"}
          onMouseDown={handleMouseDown}
        >
          <div
            className={"player-progressbar-progress"}
            style={{ width: progressPercent }}
          />
          <div className={"player-progressbar-all"}></div>
          <div
            className={`player-progressbar-circle ${
              down.current ? "player-progressbar-circle-active" : ""
            }`}
            style={{
              left: `calc(${progressPercent} - ${circleOffset}px)`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
