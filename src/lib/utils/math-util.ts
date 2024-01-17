import { Decibels } from 'tone/build/esm/core/type/Units'

export const PI2 = 2 * Math.PI
export const QUARTER_NOTE = 768
export const getDivRatio = (dividend: number, divisor: number): [number, number] => {
  return [Math.trunc(dividend / divisor), (dividend % divisor) / divisor]
}

export const OPACITY_REGEX = /[^,]+(?=\))/

export const db2linear = (db: Decibels) => Math.pow(10, db / 20)
export const linear2db = (linear: number) => 20 * Math.log10(linear)
