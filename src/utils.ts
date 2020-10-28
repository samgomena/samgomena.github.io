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

export async function loadShader(name: string) {
  const raw_vs = await fetch(`assets/shaders/${name}.vs`);
  const raw_fs = await fetch(`assets/shaders/${name}.fs`);

  const vs = await raw_vs.text();
  const fs = await raw_fs.text();

  return ({vs, fs})
}

export function range(oldVal, oldMin, oldMax, newMin, newMax, clamped) {
  let oldRange = oldMax - oldMin;
  let newRange = newMax - newMin;
  let newValue = ((oldVal - oldMin) * newRange) / oldRange + newMin;
  // if (clamped)
  //   return _this.clamp(
  //     newValue,
  //     Math.min(newMin, newMax),
  //     Math.max(newMin, newMax)
  //   );
  return newValue;
}