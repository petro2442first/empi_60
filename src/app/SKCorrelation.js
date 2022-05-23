import CFAnalysis from "./CFAnalysis.js";
import { findQuantileS, findQuantileU } from "./utils/quantiles";
export default class SKCorrelation {
  #rx = [];
  #ry = [];
  constructor(...params) {
    this.#rx = params[0].x || params[0]["x"] || params[0];
    this.#ry = params[0].y || params[0]["y"] || params[1];
  }
  set rx(list) {
    if (typeof list !== "object")
      return console.error("Type Error: Parameter type must be an array");
    this.#rx = list;
  }
  get rx() {
    return this.#rx;
  }
  set ry(list) {
    if (typeof list !== "object")
      return console.error("Type Error: Parameter type must be an array");
    this.#ry = list;
  }
  get ry() {
    return this.#ry;
  }
  getS() {
    let rangs = this.mapRangsToArray();
    const sortedByX = [...rangs].sort((a, b) => a[0] - b[0]);
    const map = {};

    sortedByX.forEach((rang, index) => {
      const [currentX, currentY] = rang;
      map[index] = 0;

      for (let j = index + 1; j < sortedByX.length; j++) {
        const [nextX, nextY] = sortedByX[j];

        map[index] += this.getV(
          this.getRangs(this.#rx).object,
          this.getRangs(this.#ry).object,
          currentX,
          currentY,
          nextX,
          nextY
        );
      }
    });

    return Object.values(map).reduce((state, current) => state + current, 0);
  }

  getV(rx, ry, currentX, currentY, nextX, nextY) {
    const isBundlesExists = this.isBundlesExists(rx, ry);

    if (isBundlesExists) {
      if (currentY < nextY && currentX !== nextX) {
        return 1;
      } else if (currentY > nextY && currentX !== nextX) {
        return -1;
      } else {
        return 0;
      }
    } else {
      if (currentY < nextY) {
        return 1;
      } else {
        return -1;
      }
    }
  }

  isBundlesExists() {
    let rx = this.getRangs(this.#rx);
    let ry = this.getRangs(this.#ry);
    const isXhaveBundles = Object.values(rx).some((item) => item.quantity > 1);
    const isYhaveBundles = Object.values(ry).some((item) => item.quantity > 1);

    return isXhaveBundles || isYhaveBundles;
  }

  evaluationKendallCoefficient() {
    return this.isBundlesExists()
      ? this.evaluationKendallCoefficientWithBundles(
          this.getS(),
          this.getRangs(this.#rx).object,
          this.getRangs(this.#ry).object,
          this.getRangs(this.#rx).result,
          this.getRangs(this.#ry).result
        )
      : this.evaluationKendallCoefficientWithoutBundles(
          this.getS(),
          this.getRangs(this.#rx).result
        );
  }

  evaluationKendallCoefficientWithoutBundles(S, x) {
    const N = x.length;

    return (2 * S) / (N * (N - 1));
  }

  evaluationKendallCoefficientWithBundles(S, rx, ry, xF, yF) {
    const N = xF.length;

    const C = this.getCurrentCalcsCD(rx);
    const D = this.getCurrentCalcsCD(ry);

    console.log(S);

    return (
      S / Math.sqrt(((1 / 2) * N * (N - 1) - C) * ((1 / 2) * N * (N - 1) - D))
    );
  }

  getCurrentCalcsCD(data) {
    data = Object.values(data);

    console.log(data);

    const z = data.filter((item) => item.quantity > 1);
    const res = z.reduce(
      (state, { quantity: current }) => state + current * (current - 1),
      0
    );

    return res / 2;
  }

  getStatisticU() {
    const N = this.#rx.length;

    return (
      (3 *
        this.evaluationKendallCoefficient(
          this.getRangs(this.#rx).object,
          this.getRangs(this.#ry).object,
          this.getRangs(this.#rx).result,
          this.getRangs(this.#ry).result,
          this.getS()
        ) *
        Math.sqrt(N * (N - 1))) /
      Math.sqrt(2 * (2 * N + 5))
    );
  }

  // lab 1 part 2.1

  evaluationSpearmanCoefficient() {
    return this.isBundlesExists()
      ? this.evaluationSpearmanCoefficientWithBundles()
      : this.evaluationSpearmanCoefficientWithoutBundles();
  }

  getStatisticT() {
    const N = this.#rx.length;

    return (
      (this.evaluationSpearmanCoefficient() * Math.sqrt(N - 2)) /
      Math.sqrt(1 - Math.pow(this.evaluationSpearmanCoefficient(), 2))
    );
  }

  getSquareDiffRangs() {
    return this.mapRangsToArray().reduce(
      (state, [rx, ry]) => state + Math.pow(rx - ry, 2),
      0
    );
  }

  evaluationSpearmanCoefficientWithBundles() {
    let xF = this.getRangs(this.#rx).result;
    let yF = this.getRangs(this.#ry).result;
    let sdr = this.getSquareDiffRangs();
    const N = xF.length;

    const A = this.getCurrentCalcsAB(xF);
    const B = this.getCurrentCalcsAB(yF);

    // console.log(N, sdr);
    // console.log(A, B);

    const tc =
      ((1 / 6) * N * (Math.pow(N, 2) - 1) - sdr - A - B) /
      Math.sqrt(
        ((1 / 6) * N * (Math.pow(N, 2) - 1) - 2 * A) *
          ((1 / 6) * N * (Math.pow(N, 2) - 1) - 2 * B)
      );

    return tc;
  }
  evaluationSpearmanCoefficientWithoutBundles() {
    const N = this.#rx.length;
    let sdr = this.getSquareDiffRangs();
    return 1 - (6 / (N * (Math.pow(N, 2) - 1))) * sdr;
  }
  getCurrentCalcsAB(data) {
    data = Object.values(data);

    const z = data.filter((item) => item.quantity > 1);
    const res = z.reduce(
      (state, { quantity: current }) =>
        state + (Math.pow(current, 3) - current),
      0
    );

    return res / 12;
  }

  pearsonCorrelation() {
    const cfa = new CFAnalysis(this.#rx, this.#ry);

    return cfa.getR();
  }

  mapRangsToArray() {
    const resultX = [];
    const resultY = [];
    const rangsX = this.getRangs(this.#rx).result;
    const rangsY = this.getRangs(this.#ry).result;

    this.#rx.forEach((item) => {
      resultX.push(rangsX.find((rang) => rang.value === item).index);
    });

    this.#ry.forEach((item) => {
      resultY.push(rangsY.find((rang) => rang.value === item).index);
    });

    const result = resultX.map((item, index) => {
      return [item, resultY[index]];
    });

    return result;
  }

  getRangs(data, table = {}) {
    const sortedData =
      typeof data[0] === "object"
        ? [...data].sort((a, b) => a.value - b.value)
        : [...data].sort((a, b) => a - b);

    typeof data[0] === "object" ? (table = data) : (table = {});

    const object = {};

    sortedData.forEach((item, index) => {
      if (typeof item === "object") {
        if (object.hasOwnProperty(item.value)) {
          object[item.value] = {
            quantity: object[item.value].quantity + 1,
            index: object[item.value].index + index + 1,
            entity: item.entity,
          };
        } else {
          object[item.value] = {
            quantity: 1,
            index: index + 1,
            entity: item.entity,
          };
        }
      } else {
        if (object.hasOwnProperty(item)) {
          object[item] = {
            quantity: object[item].quantity + 1,
            index: object[item].index + index + 1,
          };
        } else {
          object[item] = {
            quantity: 1,
            index: index + 1,
          };
        }
      }
    });

    for (const key in object) {
      if (object[key].quantity > 1) {
        object[key].index = object[key].index / object[key].quantity;
      }
    }

    // console.log(object);

    // for (const key in table) {
    //     if (table[key].value === 0) {
    //         table[key].rang = 0
    //     } else {
    //         table[key].rang = object[table[key].value].index
    //     }
    // }

    const result = [...data]
      .sort((a, b) => a - b)
      .map((item) => {
        return {
          value: item,
          index: object[item].index,
        };
      });

    return { object, result };
  }
  sortedMappedRangs() {
    return [...this.mapRangsToArray()].sort((a, b) => a[0] - b[0]);
  }
  Spearman() {
    return /* html */ `
      <h3>Коефіцієнт рангової кореляції Спірмена</h3>
      <p>Compared rangs: </p>
      <table>
      <tr>${this.sortedMappedRangs()
        .map((item) => {
          return `
              <td>${item[0]}</td>
          `;
        })
        .join("")}</tr>
      <tr>
      ${this.sortedMappedRangs()
        .map((item) => {
          return `
              <td>${item[1]}</td>
          `;
        })
        .join("")}</tr>
      </table>
      <p>Square rangs: ${this.getSquareDiffRangs().toFixed(4)}</p>
      <p>Evaluate τ<sub>c</sub>: ${this.evaluationSpearmanCoefficient().toFixed(
        4
      )}</p>
      <p>Statistic T: ${this.getStatisticT().toFixed(4)}</p>
      ${
        Math.abs(this.getStatisticT()) <= findQuantileS(this.#rx.length - 2)
          ? `<p>|${this.getStatisticT()}| &le; ${findQuantileS(
              this.#rx.length - 2
            )}, <br> коефіцієнт кореляції Спірмена дорівнює нулю  (незначущий),  між  показниками  відсутня  монотонна  залежність.`
          : `<p>|${this.getStatisticT()}| > ${findQuantileS(
              this.#rx.length - 2
            ).toFixed(
              4
            )}, <br> Коефіцієнт кореляції Спірмена відмінний від нуля і між показниками x та y існує  монотонний  зв’язок</p>`
      }
  `;
  }
  Kendall() {
    return /* html */ `
      <h3>Коефіцієнт рангової кореляції Кендалла</h3>
      <p>S: ${this.getS().toFixed(4)}</p>
      <p>Evaluate τ<sub>k</sub>: ${this.evaluationKendallCoefficient().toFixed(
        4
      )}</p>
      <p>Statistic U: ${this.getStatisticU().toFixed(4)}</p>
      ${
        Math.abs(this.getStatisticU()) <= findQuantileU()
          ? `<p>|${this.getStatisticU().toFixed(
              4
            )}| &le; ${findQuantileU()}, <br> Коефіцієнт  кореляції  вважаємо  таким,  що  дорівнює нулю,  і можемо стверджувати,  що  монотонної  залежності  між  показниками  немає.`
          : `<p>|${this.getStatisticU().toFixed(
              4
            )}| > ${findQuantileU().toFixed(
              4
            )}, <br> Коефіцієнт кореляції Кендалла відмінний від нуля і між показниками x та y існує  монотонний  зв’язок</p>`
      }
  `;
  }
  print(selector) {
    document.querySelector(selector).innerHTML =
      this.Spearman() + this.Kendall();
  }
}
