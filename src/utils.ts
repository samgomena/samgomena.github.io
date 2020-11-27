export function toRadians(deg: number) {
  return deg * (Math.PI / 180);
}

export function headsTails(heads: number, tails: number) {
  return !doRandom(0, 1) ? heads : tails;
}

export function doRandom(min: number, max: number, precision?: number) {
  function rand(min: number, max: number) {
    return lerp(Math.random(), min, max);
  }

  function lerp(ratio: number, start: number, end: number) {
    return start + (end - start) * ratio;
  }

  if (typeof precision === "number") {
    const p = Math.pow(10, precision);
    return Math.round(rand(min, max) * p) / p;
  } else {
    return Math.round(rand(min - 0.5, max + 0.5));
  }
}

export function clamp(x: number, a: number, b: number) {
  return Math.max(a, Math.min(x, b));
}

export function range(
  oldVal: number,
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number,
  clamped: number
) {
  const oldRange = oldMax - oldMin;
  const newRange = newMax - newMin;
  const newValue = ((oldVal - oldMin) * newRange) / oldRange + newMin;
  if (clamped)
    return clamp(newValue, Math.min(newMin, newMax), Math.max(newMin, newMax));
  return newValue;
}

export function getRandomBetween(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// See: https://stackoverflow.com/questions/1484506/random-color-generator
export function rainbow(numOfSteps: number, step: number) {
  // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
  // Adam Cole, 2011-Sept-14
  // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
  let r = 0,
    g = 0,
    b = 0;
  let h = step / numOfSteps;
  let i = ~~(h * 6);
  let f = h * 6 - i;
  let q = 1 - f;
  switch (i % 6) {
    case 0:
      r = 1;
      g = f;
      b = 0;
      break;
    case 1:
      r = q;
      g = 1;
      b = 0;
      break;
    case 2:
      r = 0;
      g = 1;
      b = f;
      break;
    case 3:
      r = 0;
      g = q;
      b = 1;
      break;
    case 4:
      r = f;
      g = 0;
      b = 1;
      break;
    case 5:
      r = 1;
      g = 0;
      b = q;
      break;
  }
  let c =
    "#" +
    ("00" + (~~(r * 255)).toString(16)).slice(-2) +
    ("00" + (~~(g * 255)).toString(16)).slice(-2) +
    ("00" + (~~(b * 255)).toString(16)).slice(-2);
  return c;
}
