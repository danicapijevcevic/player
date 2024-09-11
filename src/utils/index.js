export const formatSeconds = (sec) => {
  const time = Math.floor(sec);
  const m = Math.floor(time / 60);
  const s = time % 60;
  const minutes = m < 10 ? `0${m}` : m;
  const seconds = s < 10 ? `0${s}` : s;
  return `${minutes} : ${seconds}`;
};
export const valuesToPercent = (a, n) => (a * 100) / n;
export const percentToValue = (a, n) => (a * n) / 100;
export const range = (n, width) => (n < 0 ? 0 : n > width ? width : n);
export const getVolumeImageFromPercent = (p) =>
  p === 0
    ? "off"
    : p > 0 && p < 40
    ? "low"
    : p > 40 && p < 80
    ? "medium"
    : "high";
export const getUnique = (n) => [...new Set(n)];
export const getIds = (item) => item.key;
export const makeIncrementArray = (length) =>
  Array(length)
    .fill(null)
    .map((_, index) => index);
export const shuffleArray = (a, length = a.length, newArray = []) => {
  const i = Math.floor(Math.random() * a.length);
  return newArray.length === length
    ? newArray
    : shuffleArray(
        a.slice(0, i).concat(a.slice(i + 1)),
        length,
        newArray.concat(a[i])
      );
};
export const sliceStr = (str, n) =>
  str.slice(0, n) + (str.length > n ? "..." : "");
export const findInString = (a) => (n) =>
  n.toLowerCase().includes(a.toLowerCase());
export const stateNot = (state) => !state;
export const playerActions = (action, obj) => obj[action];
