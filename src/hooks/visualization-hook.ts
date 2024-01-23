import { Visualization } from '@/lib/visualization'
import withInterval from '@/recoil/rhythm/withInterval'
import { Size } from '@/types/canvas-types'
import { useEffect, useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { usePolyrhythmValue } from './polyrhythm-hook'

export const useVisualization = () => {
  const visualization = useMemo(() => new Visualization(), [])
  const polyrhythm = usePolyrhythmValue()
  const rhythmInterval = useRecoilValue(withInterval)

  useEffect(() => {
    visualization.preview.interval = rhythmInterval
  }, [rhythmInterval])

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
