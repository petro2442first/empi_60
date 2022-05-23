export function toCorrectData(data, file = false) {
  console.log(data);
  return !file
    ? data
        .split(",")
        .filter((item) => item !== "")
        .map((item) => (Number.isNaN(Number(item)) ? 0 : Number(item)))
    : data
        .filter((item, index) => item !== "")
        .map((item) => (Number.isNaN(Number(item)) ? 0 : Number(item)));
}
