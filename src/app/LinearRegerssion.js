import { findQuantileS } from "./utils/quantiles";

export default class LinearRegression {
  #x = [];
  #y = [];
  constructor(...params) {
    this.#x = params[0].x || params[0]["x"] || params[0];
    this.#y = params[0].y || params[0]["y"] || params[1];
  }
  set x(list) {
    if (typeof list !== "object")
      return console.error("Type Error: Parameter type must be an array");
    this.#x = list;
  }
  get x() {
    return this.#x;
  }
  set y(list) {
    if (typeof list !== "object")
      return console.error("Type Error: Parameter type must be an array");
    this.#y = list;
  }
  get y() {
    return this.#y;
  }
  // Methods
  getAverage(name = "x") {
    return name.toLowerCase() == "y"
      ? this.#y.reduce((state, curr) => state + curr) / this.#y.length
      : this.#x.reduce((state, curr) => state + curr) / this.#x.length;
  }
  getAverageByGroup() {
    return (
      this.#x.reduce(
        (state, current, index) => state + current * this.#y[index]
      ) / this.#x.length
    );
  }
  getS(data = "x") {
    return Math.sqrt(
      (1 / this[data.toLowerCase()].length) *
        this[data.toLowerCase()].reduce(
          (state, curr) => state + Math.pow(curr - this.getAverage(data), 2)
        )
    );
  }
  getR() {
    return (
      (this.getAverageByGroup() - this.getAverage("x") * this.getAverage("y")) /
      (this.getS("x") * this.getS("y"))
    );
  }
  getStatistics() {
    return (
      (this.getR() * Math.sqrt(this.x.length - 2)) /
      Math.sqrt(1 - Math.pow(this.getR(), 2))
    );
  }
  getEstimation() {
    return this.getR() * (this.getS("y") / this.getS("x"));
  }
  getEstimationA() {
    return this.getAverage("y") - this.getEstimationB() * this.getAverage("x");
  }
  getReconstructedRegressionLine() {
    const y = [...this.#x].map((item) => {
      return this.getEstimationA() + this.getEstimationB() * item;
    });

    return { x: [...this.x].sort((a, b) => a - b), y: y };
  }
  getReconstructedRegressionFunction() {
    const { reconstructedY } = this.getReconstructedRegressionLine();

    return this.y
      .map((item, index) => item - reconstructedY[index])
      .map((item) => Math.pow(item, 2))
      .reduce((state, current) => state + current);
  }
  getDispersionOfPours() {
    return this.getReconstructedRegressionFunction() / (this.#x.length - 2);
  }
  getAverageQuadraticDeviationsA() {
    return Math.sqrt(
      (this.getDispersionOfPours() / this.x.length) *
        (1 + Math.pow(this.getAverage("x"), 2) / Math.pow(this.getS("x"), 2))
    );
  }
  getAverageQuadraticDeviationsB() {
    return Math.sqrt(
      this.getDispersionOfPours() /
        (this.x.length * Math.pow(this.getS("x"), 2))
    );
  }
  getConfidenceIntervals() {
    const v = this.x.length - 2;

    const Al =
      this.getEstimationA() -
      findQuantileS(v) * this.getAverageQuadraticDeviationsA();
    const Ah =
      this.getEstimationA() +
      findQuantileS(v) * this.getAverageQuadraticDeviationsA();
    const Bl =
      this.getEstimationB() -
      findQuantileS(v) * this.getAverageQuadraticDeviationsB();
    const Bh =
      this.getEstimationB() +
      findQuantileS(v) * this.getAverageQuadraticDeviationsB();

    return {
      a: [Al, Ah],
      b: [Bl, Bh],
    };
  }
  getValueOfParemetherA() {
    return this.getEstimationA() / this.getAverageQuadraticDeviationsA();
  }
  getValueOfParemetherB() {
    return this.getEstimationB() / this.getAverageQuadraticDeviationsB();
  }

  printChart(id = "chart1-1") {
    const ctx = document.querySelector(`#${id}`).getContext("2d");

    const [regressX, regressY] = this.getReconstructedRegressionLine();
    console.log(regressX, regressY);
    const [corrX, corrY] = [x, y];

    const myChart = new Chart(ctx, {
      data: {
        labels: corrX,
        datasets: [
          {
            type: "scatter",
            label: "Correlation field",
            pointRadius: 3,
            data: corrY,
            backgroundColor: "#34a853",
          },
          {
            type: "line",
            label: "Reconstructed regression line",
            data: regressY,
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          x: {
            title: {
              text: "x",
              display: true,
              align: "end",
            },
            position: "bottom",
          },
          y: {
            title: {
              text: "y",
              display: true,
              align: "end",
            },
          },
        },
      },
    });
  }
}
