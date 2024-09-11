import MainButtons from "./MainButtons";
import { useEffect, useRef, useState } from "react";
import {
  valuesToPercent,
  percentToValue,
  formatSeconds,
  getIds,
  makeIncrementArray,
  shuffleArray,
  stateNot,
  playerActions,
} from "../../../utils";
import ProgressBar from "../../molecules/ProgressBar";
import VolumeBar from "../../molecules/VolumeBar";
import PlaylistButton from "./PlaylistButton";
import { useDispatch, useSelector } from "react-redux";
import { setNowPlaying } from "../../../redux/actions";
import { CIRCLE_WIDTH } from "../../../utils/constants";
import "./player.style.scss";

const Player = function (props) {
  const [play, setPlay] = useState(null);
  const [loop, setLoop] = useState(false);
  const [songCurrentTime, setSongCurrentTime] = useState("");
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progresspercent, setProgresspercent] = useState("0%");
  const [circleOffset, setCircleOffset] = useState(0);
  const [mute, setMute] = useState(false);
  const [volpercent, setVolpercent] = useState("50%");
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [shuffle, setShuffle] = useState(false);
  const [randomRow, setRandomRow] = useState(null);
  const audioref = useRef();
  const lastvolumevalue = useRef();
  const randomIncrement = useRef(null);

  const dispatch = useDispatch();
  const { nowPlaying, currentPlaylist } = useSelector(
    (state) => state.getPlayerValues
  );

  const handleAction = (action) => (e) => {
    const f = (name) => () => name(stateNot);
    playerActions(action, {
      play: f(setPlay),
      loop: f(setLoop),
      back: f(setPrev),
      forward: f(setNext),
      shuffle: f(setShuffle),
    })();
  };
  const setTrack = (n) => {
    const trackIndex = currentPlaylist.map(getIds).indexOf(nowPlaying.key);
    const nextTrack = currentPlaylist.slice(trackIndex + n)[0];
    dispatch(setNowPlaying(nextTrack || (loop && currentPlaylist[0]) || null));
    !nextTrack && loop && props.scrolltotop();
  };
  const setRandomTrack = (i) => {
    const trackIndex = randomRow[i];
    const nextTrack = currentPlaylist[trackIndex];
    dispatch(
      setNowPlaying(
        nextTrack || (loop && currentPlaylist[randomRow[0]]) || null
      )
    );
  };
  const getCurrentPercentVolume = (p) => {
    const maxvolume = 1;
    audioref.current.volume = percentToValue(p, maxvolume);
  };
  const handleMute = () => {
    setMute((prev) => !prev);
  };

  useEffect(() => {
    if (play === null) return;
    audioref.current[play ? "play" : "pause"]();
  }, [play]);

  useEffect(() => {
    if (prev === null) return;
    setTrack(-1);
  }, [prev]);

  useEffect(() => {
    if (next === null) return;
    setTrack(1);
  }, [next]);

  useEffect(() => {
    setRandomRow(
      !shuffle
        ? null
        : shuffleArray(makeIncrementArray(currentPlaylist?.length))
    );
    randomIncrement.current = shuffle ? 0 : null;
  }, [shuffle]);

  useEffect(() => {
    if (!nowPlaying) return;
    audioref.current.pause();
    audioref.current.load();
    audioref.current.play();
    setPlay(true);
  }, [nowPlaying]);

  useEffect(() => {
    if (!nowPlaying) return;
    const ended = () => {
      if (randomRow) {
        randomIncrement.current = randomIncrement.current + 1;
        setRandomTrack(randomIncrement.current);
      } else setTrack(1);
    };
    audioref.current.addEventListener("ended", ended);
    return () => {
      audioref.current.removeEventListener("ended", ended);
    };
  }, [nowPlaying, currentPlaylist]);

  useEffect(() => {
    const load = (e) => {
      setLoading(false);
      setSongCurrentTime("00 : 00");
      setDuration(formatSeconds(e.currentTarget.duration));
      audioref.current.volume = 0.5;
    };

    const timeupdate = (e) => {
      const { currentTime } = e.currentTarget;
      const { duration } = e.currentTarget;
      const percent = valuesToPercent(currentTime, duration);
      const _circleOffset = percentToValue(CIRCLE_WIDTH, percent);
      setSongCurrentTime(formatSeconds(currentTime));
      setProgresspercent(percent + "%");
      setCircleOffset(_circleOffset);
    };

    audioref.current.addEventListener("loadedmetadata", load);
    audioref.current.addEventListener("timeupdate", timeupdate);
    return () => {
      audioref.current.removeEventListener("loadedmetadata", load);
      audioref.current.removeEventListener("timeupdate", timeupdate);
    };
  }, []);

  useEffect(() => {
    lastvolumevalue.current = audioref.current?.volume;
    if (mute) {
      audioref.current.volume = 0;
      setVolpercent("0%");
    } else audioref.current.volume = lastvolumevalue.current;
  }, [mute]);
  const getCurrentPercent = (p) => {
    const { duration } = audioref.current;
    audioref.current.currentTime = percentToValue(p, duration);
  };

  return (
    <div className={"player-appplayer"}>
      <div className={"player-audioplayer-controls"}>
        <div className={"player-audioplayer-left"}>
          <PlaylistButton />
        </div>
        <MainButtons
          handleClick={handleAction}
          play={play}
          loop={loop}
          shuffle={shuffle}
        />
        <div className={"player-audioplayer-volume"}>
          <VolumeBar
            progresspercent={volpercent}
            circleOffset={9 / 2}
            customClass={"player-audioplayer-volume-container"}
            getCurrentPercent={getCurrentPercentVolume}
            handleMute={handleMute}
            mute={mute}
          />
        </div>
      </div>
      <div className={"player-audioplayer-songprogres"}>
        <div className={"player-audioplayer-songprogres-time"}>
          {songCurrentTime}
        </div>
        <ProgressBar
          progresspercent={progresspercent}
          circleOffset={circleOffset}
          songtrack={true}
          loading={loading}
          getCurrentPercent={getCurrentPercent}
        />
        <div className={"player-audioplayer-songprogres-time"}>{duration}</div>
      </div>

      <audio ref={audioref} controls={true} mute={mute}>
        {nowPlaying && (
          <source src={nowPlaying?.source || ""} type="audio/mp3" />
        )}
      </audio>
    </div>
  );
};

export default Player;
