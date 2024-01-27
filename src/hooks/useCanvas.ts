import { Visualization } from '@/lib/visualization'
import { rhythmWithList } from '@/recoil/rhythm'
import { CanvasSize } from '@/types/canvas-types'
import { MutableRefObject, RefObject, useCallback, useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'

export const useCanvas = (
  canvasSize: CanvasSize,
  visualizationRef: MutableRefObject<Visualization | null>,
): RefObject<HTMLCanvasElement> => {
  const rhythms = useRecoilValue(rhythmWithList)
  const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)

  const setCanvas = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, { width, height }: CanvasSize) => {
      const devicePixelRatio = window.devicePixelRatio ?? 1
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      canvas.width = Math.floor(width * devicePixelRatio)
      canvas.height = Math.floor(height * devicePixelRatio)
      ctx.scale(devicePixelRatio, devicePixelRatio)
    },
    [canvasSize],
  )

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    setCanvas(canvas, ctx, canvasSize)

    const visualization = visualizationRef.current!
    visualization.generateVisual(ctx, rhythms)

    let requestId: number
    const requestAnimation = () => {
      requestId = window.requestAnimationFrame(requestAnimation)
      visualization.animate(ctx, canvasSize)
    }
    requestAnimation()

    return () => window.cancelAnimationFrame(requestId)
  }, [canvasSize, rhythms])

  return canvasRef
}
