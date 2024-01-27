import { Point } from '@/types/canvas-types'
import { MouseEvent } from 'react'
import { Decibels } from 'tone/build/esm/core/type/Units'

export const PI2 = 2 * Math.PI
export const PI_DEG = 1.5 * Math.PI
export const QUARTER_NOTE = 768
export const RGB_OPACITY_REGEX = /[^,]+(?=\))/

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

export const valueLimit = (value: number, min: number = 0, max: number = Infinity) =>
  value <= min ? min : value >= max ? max : value

export const asc = (a: number, b: number) => a - b
export const desc = (a: number, b: number) => b - a

export const getCurrentArcPoint = (currentTick: number, vertex: number, point: Point, radius: number): Point => {
  const { quotient: currentLine, remainRate: ratio } = getDivision(currentTick, QUARTER_NOTE / vertex)
  const { x: fromX, y: fromY } = getArcPoint(currentLine, vertex, point, radius)
  const { x: toX, y: toY } = getArcPoint(currentLine + 1, vertex, point, radius)
  return { x: fromX + (toX - fromX) * ratio, y: fromY + (toY - fromY) * ratio }
}

type Division = { quotient: number; remain: number; remainRate: number }
export const getDivision = (dividend: number, divisor: number): Division => ({
  quotient: Math.floor(dividend / divisor),
  remain: dividend % divisor,
  remainRate: (dividend % divisor) / divisor,
})

export const getArcPoint = (currentLine: number, vertex: number, point: Point, radius: number): Point => {
  const arc = (currentLine * PI2) / vertex + PI_DEG
  return { x: point.x + radius * Math.cos(arc), y: point.y + radius * Math.sin(arc) }
}
