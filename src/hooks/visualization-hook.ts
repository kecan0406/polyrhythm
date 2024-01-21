import { Visualization } from '@/lib/visualization'
import { rhythmConfigIntervalState } from '@/recoil/config/selector'
import { Size } from '@/types/canvas-types'
import { useEffect, useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { usePolyrhythmValue } from './polyrhythm-hook'

export const useVisualization = () => {
  const visualization = useMemo(() => new Visualization(), [])
  const polyrhythm = usePolyrhythmValue()
  const rhythmConfigInterval = useRecoilValue(rhythmConfigIntervalState)

  useEffect(() => {
    visualization.preview.interval = rhythmConfigInterval
  }, [rhythmConfigInterval])

  useEffect(() => {
    visualization.generateVisual(polyrhythm)
    return () => {
      visualization.clearVisual()
    }
  }, [polyrhythm])

  return visualization
}

export const getAnimate = (visualization: Visualization) => {
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
