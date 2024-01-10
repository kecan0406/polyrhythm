export const PI2 = 2 * Math.PI
export const getDivRatio = (dividend: number, divisor: number): [number, number] => {
  return [Math.trunc(dividend / divisor), (dividend % divisor) / divisor]
}
