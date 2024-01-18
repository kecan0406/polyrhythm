import { Visualization } from '@/lib/visualization'
import { Size } from '@/types/canvas-types'
import { RefObject, useEffect, useRef } from 'react'
import { usePolyrhythmValue } from './polyrhythm-hook'

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
  const animate = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')!
    fillBackground(ctx, { width: parseInt(canvas.style.width), height: parseInt(canvas.style.height) })
    drawVisual(ctx)
  }

  const fillBackground = (ctx: CanvasRenderingContext2D, { width, height }: Size) => {
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.fillRect(0, 0, width, height)
  }

  const drawVisual = (ctx: CanvasRenderingContext2D) => {
    visualization.drawAll(ctx)
  }

  return animate
}
