import { RefObject, useEffect, useRef } from 'react'
import { Visualization } from '../lib/visualization'
import { Size } from '../types/canvas-types'
import { usePolyrhythmValue } from './polyrhythm-hook'
import { useTransport } from './transport-hook'

export const useVisualization = () => {
  const polyrhythm = usePolyrhythmValue()
  const visualizationRef: RefObject<Visualization> = useRef<Visualization>(new Visualization())

  useEffect(() => {
    const visualization = visualizationRef.current!
    visualization.generateVisual(polyrhythm)
    return () => {
      visualization.clearVisual()
    }
  }, [polyrhythm])

  return visualizationRef.current!
}

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
