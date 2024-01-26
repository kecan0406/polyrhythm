import { useRhythmValue } from '@/hooks/useRhythmValue'
import { Visualization } from '@/lib/visualization'
import { CanvasSize } from '@/types/canvas-types'
import { RefObject, useEffect, useRef } from 'react'

export const useCanvas = (canvasSize: CanvasSize): RefObject<HTMLCanvasElement> => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)
  const { rhythms } = useRhythmValue()

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    setCanvas(canvas, ctx, canvasSize)

    const visualization = new Visualization(ctx)
    visualization.generateVisual(rhythms)

    let requestId: number
    const requestAnimation = () => {
      requestId = window.requestAnimationFrame(requestAnimation)
      visualization.animate(canvasSize)
    }
    requestAnimation()

    return () => window.cancelAnimationFrame(requestId)
  }, [canvasSize, rhythms])

  return canvasRef
}

const setCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, { width, height }: CanvasSize) => {
  const devicePixelRatio = window.devicePixelRatio ?? 1
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.width = Math.floor(width * devicePixelRatio)
  canvas.height = Math.floor(height * devicePixelRatio)

  ctx.scale(devicePixelRatio, devicePixelRatio)
}
