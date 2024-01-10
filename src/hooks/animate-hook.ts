import { Visualization } from '../lib/visualization'
import { Size } from '../types/canvas-types'
import { useTransport } from './transport-hook'

export const useAnimate = (visualization: Visualization) => {
  const transport = useTransport()
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
    const secondsToTicks = transport.toTicks(1)
    visualization.drawAll(ctx, transport.toTicks(), secondsToTicks)
  }

  return animate
}
