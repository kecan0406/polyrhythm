import { Visualization } from '@/lib/visualization'
import { rhythmWithInterval, rhythmWithList } from '@/recoil/rhythm'
import { Size } from '@/types/canvas-types'
import { useEffect, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

export const useVisualization = () => {
  const visualization = useMemo(() => new Visualization(), [])
  const rhythms = useRecoilValue(rhythmWithList)

  const rhythmInterval = useRecoilValue(rhythmWithInterval)
  useEffect(() => {
    visualization.preview.interval = rhythmInterval
  }, [rhythmInterval])

  useEffect(() => {
    visualization.generateVisual(rhythms)
    return () => {
      visualization.clearVisual()
    }
  }, [rhythms])

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
