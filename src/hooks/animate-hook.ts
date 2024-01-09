import { Visualization } from '../lib/visualization'
import { Size } from '../types/canvas-types'

export const useAnimate = (visualization: Visualization) => {
  const animate = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')!
    fillBackground(ctx, { width: parseInt(canvas.style.width), height: parseInt(canvas.style.height) })
    drawVisual(ctx)
  }

  const fillBackground = (ctx: CanvasRenderingContext2D, { width, height }: Size) => {
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = 'rgb(31,31,36)'
    ctx.fillRect(0, 0, width, height)
  }

  const drawVisual = (ctx: CanvasRenderingContext2D) => {
    visualization.drawAll(ctx)
  }

  return animate
}
