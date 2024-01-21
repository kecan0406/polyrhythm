import { MouseEvent } from 'react'
import { Decibels } from 'tone/build/esm/core/type/Units'

export const PI2 = 2 * Math.PI
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
      return (e.clientX - progressBar.offsetLeft) / 100
    case 'vertical':
      return -(e.clientY - progressBar.offsetTop - 100) / 100
  }
}

export const valueLimit = (value: number, from: number = 0, to: number = 1) =>
  value <= from ? from : value >= to ? to : value
