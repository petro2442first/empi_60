import LinearRegression from "./LinearRegerssion";
import { toCorrectData } from "./utils/helpers";

function start() {
  const submit = document.querySelector("#submit-input");
  const fileInput = document.querySelector("#input-file") ?? null;
  let fileResult = null;
  if (fileInput === null) return console.error("fileInput === null");
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);

    reader.addEventListener("load", (e) => {
      fileResult = reader.result
        .split("\n")
        .map((item) => item.trim())
        .map((item) => item.split(/\s+/));

      result1 = fileResult.map((item) =>
        item[0] == "NA" || item[0] == "?" ? 0 : +item[0]
      );
      result2 = fileResult.map((item) =>
        item[1] == "NA" || item[1] == "?" ? 0 : +item[1]
      );
      fileResult = { x: result1, y: result2 };
      document.querySelector("#file-label").innerText = `Loaded: ${file.name}`;
    });

    reader.onerror = () => console.log(reader.error);
  });
  submit.addEventListener("click", (e) => {
    const inputX = document.querySelector("#input-x").value ?? "";
    const inputY = document.querySelector("#input-y").value ?? "";

    const lr =
      fileResult === null
        ? new LinearRegression(toCorrectData(inputX), toCorrectData(inputY))
        : new LinearRegression(fileResult);
    console.log(lr.getS("x"));
    lr.printChart("chart1-1");
  });
}
start();
