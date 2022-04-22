const alpha = 0.05;
const isDetailsMode = true;

export function findQuantileU(p = 1 - alpha / 2) {
  function Fi(a) {
    const options = {
      t: Math.sqrt(-2 * Math.log(a)),
      c0: 2.515517,
      c1: 0.802853,
      c2: 0.010328,
      d1: 1.432788,
      d2: 0.1892659,
      d3: 0.001308,
    };

    const { t, c0, c1, c2, d1, d2, d3 } = options;

    return (
      t -
      (c0 + c1 * t + c2 * Math.pow(t, 2)) /
        (1 + d1 * t + d2 * Math.pow(t, 2) + d3 * Math.pow(t, 3))
    );
  }

  if (p <= 0.5) {
    return -Fi(p);
  } else {
    return Fi(1 - p);
  }
}

export function findQuantileS(v, p = 1 - alpha / 2) {
  const g1 = (u) => {
    return (Math.pow(u, 3) + u) / 4;
  };

  const g2 = (u) => {
    return (5 * Math.pow(u, 5) + 16 * Math.pow(u, 3) + 3 * u) / 96;
  };

  const g3 = (u) => {
    return (
      (3 * Math.pow(u, 7) +
        19 * Math.pow(u, 5) +
        17 * Math.pow(u, 3) -
        15 * u) /
      384
    );
  };

  const g4 = (u) => {
    return (
      (79 * Math.pow(u, 9) +
        779 * Math.pow(u, 7) +
        1482 * Math.pow(u, 5) -
        1920 * Math.pow(u, 3) -
        945 * u) /
      92160
    );
  };

  const u = findQuantileU(p);

  return +(
    u +
    g1(u) / v +
    g2(u) / Math.pow(v, 2) +
    g3(u) / Math.pow(v, 3) +
    g4(u) / Math.pow(v, 4)
  ).toFixed(2);
}

export function aproxLaplace(u) {
  if (u <= 0) {
    return 1 - aproxLaplace(Math.abs(u));
  }

  const b1 = 0.31938153;
  const b2 = -0.356563782;
  const b3 = 1.781477937;
  const b4 = -1.821255978;
  const b5 = 1.330274429;
  const t = 1 / (1 + 0.2316419 * u);
  return (
    1 -
    (1 / Math.sqrt(2 * Math.PI)) *
      Math.exp((-u * u) / 2) *
      (b1 * t +
        b2 * t * t +
        b3 * Math.pow(t, 3) +
        b4 * Math.pow(t, 4) +
        b5 * Math.pow(t, 5)) +
    7.8 * Math.pow(10, -8)
  );
}

export function fisherDistribQuan(v1, v2, p = 1 - alpha) {
  const s = 1 / v1 + 1 / v2;
  const d = 1 / v1 - 1 / v2;
  const u = findQuantileU(p);
  console.log(u);

  const a = Math.sqrt(s / 2);
  const z =
    u * a -
    (1 / 6) * d * (u * u + 2) +
    a *
      ((s / 24) * (u * u + 3 * u) +
        ((d * d) / (72 * s)) * (Math.pow(u, 3) + 11 * u)) -
    ((d * s) / 120) * (Math.pow(u, 4) + 9 * Math.pow(u, 2) + 8) +
    (Math.pow(d, 3) / (3240 * s)) * (3 * Math.pow(u, 4) + 7 * u * u - 16) +
    a *
      (((s * s) / 1920) * (Math.pow(u, 5) + 20 * Math.pow(u, 3) + 15 * u) +
        (Math.pow(d, 4) / 2880) *
          (Math.pow(u, 5) + 44 * Math.pow(u, 3) + 183 * u) +
        (Math.pow(d, 4) / (155520 * s * s)) *
          (9 * Math.pow(u, 5) - 284 * Math.pow(u, 3) - 1531 * u));
  return Math.exp(2 * z);
}
