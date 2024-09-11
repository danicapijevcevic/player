export const setAddNewSong = (item) => (prev) => {
  const prevl = prev.trackList || [];
  const keys = prevl.map((item) => item.key);
  const listIndex = ~keys.indexOf(item.key);
  const list = !listIndex
    ? prevl.concat(item)
    : prevl.filter((i) => i.key !== item.key);
  return {
    ...prev,
    trackList: list,
  };
};
