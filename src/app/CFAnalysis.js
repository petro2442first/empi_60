import { findQuantileU } from "./utils/quantiles";
import Chart from "chart.js/auto";
export default class CFAnalysis {
  #x = [];
  #y = [];
  constructor(...params) {
    this.#x = params[0].x || params[0]["x"] || params[0];
    this.#y = params[0].y || params[0]["y"] || params[1];
    this.#x.pop();
    this.#y.pop();
  }
  // Props
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

  // Private Methods
  #getAverage(data) {
    data = data == "y" ? this.#y : this.#x;
    return data.reduce((accum, curr) => accum + curr) / data.length;
  }
  #getS(data) {
    const arr = data == "y" ? this.#y : this.#x;
    return Math.sqrt(
      (1 / arr.length) *
        arr.reduce(
          (accum, curr) => accum + Math.pow(curr - this.#getAverage(data), 2)
        )
    );
  }

  // Public Methods
  getAverageX() {
    return this.#getAverage("x");
  }
  getAverageY() {
    return this.#getAverage("y");
  }
  getAverageByGroup() {
    return (
      this.#x.reduce((accum, curr, index) => accum + curr * this.#y[index], 0) /
      this.#x.length
    );
  }
  getSX() {
    return this.#getS("x");
  }
  getSY() {
    return this.#getS("y");
  }
  getR() {
    return (
      (this.getAverageByGroup() - this.getAverageX() * this.getAverageY()) /
      (this.getSX() * this.getSY())
    );
  }
  getStatistics() {
    return (
      (this.getR() * Math.sqrt(this.x.length - 2)) /
      Math.sqrt(1 - Math.pow(this.getR(), 2))
    );
  }
  getRInterval() {
    return [
      this.getR() +
        (this.getR() * (1 - Math.pow(this.getR(), 2))) / (2 * this.#x.length) -
        (findQuantileU() * (1 - Math.pow(this.getR(), 2))) /
          Math.sqrt(this.#x.length - 1),

      this.getR() +
        (this.getR() * (1 - Math.pow(this.getR(), 2))) / (2 * this.#x.length) +
        (findQuantileU() * (1 - Math.pow(this.getR(), 2))) /
          Math.sqrt(this.#x.length - 1),
    ];
  }
  printChart(id = "chart") {
    const ctx = document.getElementById(id).getContext("2d");
    const myChart = new Chart(ctx, {
      data: {
        labels: this.#x,
        datasets: [
          {
            type: "scatter",
            label: "Correlation field",
            pointRadius: 3,
            data: this.#y,
            backgroundColor: "#107c41",
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
  printFormulas() {
    const list = document.querySelector(".list");

    const inner = `
        <li>Average x: ${this.getAverageX().toFixed(4)}</li>
        <li>Average y: ${this.getAverageY().toFixed(4)}</li>
        <li>Average by group: ${this.getAverageByGroup().toFixed(4)}</li>
        <li>Sx: ${this.getSX().toFixed(4)}</li>
        <li>Sy: ${this.getSY().toFixed(4)}</li>
        <li>r: ${this.getR().toFixed(4)}</li>
        <li>t: ${this.getStatistics().toFixed(4)}</li>
        <li>[r<sub>н</sub>; r<sub>в</sub>]: [${this.getRInterval()
          .map((item) => item.toFixed(4))
          .join(";")}]</li>
    `;

    list.innerHTML = inner;
  }
}
