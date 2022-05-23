import SKCorrelation from "./SKCorrelation.js";

function toCorrectData(data) {
  return data
    .split(",")
    .filter((item) => item !== "")
    .map((item) => Number(typeof item == "NaN" ? 0 : item));
}

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
      console.log(fileResult);
      result1 = fileResult.map((item) =>
        item[0] == "NA" || item[0] == "?" ? 0 : +item[0]
      );
      result2 = fileResult.map((item) =>
        item[1] == "NA" || item[1] == "?" ? 0 : +item[1]
      );
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

    const skc =
      fileResult === null
        ? new SKCorrelation(toCorrectData(inputX), toCorrectData(inputY))
        : new SKCorrelation(fileResult);
    console.log(
      skc.evaluationSpearmanCoefficientWithBundles(
        skc.getRangs(skc.rx).result,
        skc.getRangs(skc.ry).result
      )
    );
    skc.print(".list");
  });
}
start();
