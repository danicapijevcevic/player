import { useRef } from "react";
import AlbumCard from "../../organisms/AlbumCard";
import HorizontalScroller from "../../atoms/HorizontalScroller";
import "./albums.style.scss";

const Albums = function (props) {
  const albumsref = useRef();

  return (
    <div ref={albumsref} className={"player-albums"}>
      <h2 className={"player-mainheading"}>My albums</h2>
      <HorizontalScroller>
        {props.list?.map((item) => (
          <AlbumCard
            title={item.album}
            albumImage={item.albumImage}
            composer={item.composer}
            period={item.period}
            trackList={item.trackList}
          />
        ))}
      </HorizontalScroller>
    </div>
  );
};

export default Albums;
