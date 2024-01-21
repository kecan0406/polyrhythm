import { MouseEvent } from 'react'
import { Decibels } from 'tone/build/esm/core/type/Units'

export const PI2 = 2 * Math.PI
export const PI_DEG = 1.5 * Math.PI
export const QUARTER_NOTE = 768
export const getDivRatio = (dividend: number, divisor: number): [number, number] => {
  return [Math.trunc(dividend / divisor), (dividend % divisor) / divisor]
}

export const OPACITY_REGEX = /[^,]+(?=\))/

export const db2linear = (db: Decibels) => Math.pow(10, db / 20)
export const linear2db = (linear: number) => 20 * Math.log10(linear)

export const getProgressPercent = (
  direction: 'horizontal' | 'vertical',
  progressBar: HTMLDivElement,
  e: MouseEvent<HTMLDivElement>,
) => {
  switch (direction) {
    case 'horizontal':
      return ((progressBar.offsetWidth + progressBar.offsetLeft - e.clientX) / progressBar.offsetWidth - 1) * -1
    case 'vertical':
      return -(e.clientY - progressBar.offsetTop - 100) / 100
  }
}

export const valueLimit = (value: number, min: number = 0, max: number = 1) =>
  value <= min ? min : value >= max ? max : value
