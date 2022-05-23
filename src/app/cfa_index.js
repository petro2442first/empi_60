import CFAnalysis from "./CFAnalysis";
import { toCorrectData } from "./utils/helpers";
const dataX = [
  8, 13, 17, 6, 14, 21, 2, 16, 18, 15, 9, 10, 7, 22, 3, 5, 12, 19, 4, 20, 11,
];
const dataY = [
  1.8, 1.8, 1.8, 3.3, 2, 0.9, 2.4, 1.6, 1.4, 1.8, 1.6, 1.4, 2.3, 0.8, 4.3, 4.5,
  1.4, 1.3, 4.1, 1, 1.4,
];

function start() {
  const submit = document.querySelector("#submit-input");
  // configLoadData("#input-file");
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
      console.log(fileResult);
      result1 = fileResult.map((item) => Number(item[4]));
      result2 = fileResult.map((item) => Number(item[5]));
      fileResult = { x: result1, y: result2 };
      document.querySelector("#file-label").innerText = `Loaded: ${file.name}`;
    });

    reader.onerror = function () {
      console.log(reader.error);
    };
  });
  submit.addEventListener("click", (e) => {
    const inputX = document.querySelector("#input-x").value ?? "";
    const inputY = document.querySelector("#input-y").value ?? "";

    const cfa =
      fileResult === null
        ? new CFAnalysis(toCorrectData(inputX), toCorrectData(inputY))
        : new CFAnalysis(
            toCorrectData(result1, true),
            toCorrectData(result2, true)
          );
    cfa.printChart();
    cfa.printFormulas();
  });
}
start();
