export const PI2 = 2 * Math.PI
export const QUARTER_NOTE = 768
export const getDivRatio = (dividend: number, divisor: number): [number, number] => {
  return [Math.trunc(dividend / divisor), (dividend % divisor) / divisor]
}

export const OPACITY_REGEX = /[^,]+(?=\))/
