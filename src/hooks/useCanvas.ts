import { CanvasSize } from '@/types/canvas-types'
import { RefObject, useEffect, useRef } from 'react'

export const useCanvas = (
  { width, height }: CanvasSize,
  animate: (canvas: HTMLCanvasElement) => void,
): RefObject<HTMLCanvasElement> => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const setCanvas = () => {
      const devicePixelRatio = window.devicePixelRatio ?? 1
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      canvas.width = Math.floor(width * devicePixelRatio)
      canvas.height = Math.floor(height * devicePixelRatio)

      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    setCanvas()

    let requestId: number
    const requestAnimation = () => {
      requestId = window.requestAnimationFrame(requestAnimation)
      animate(canvas)
    }
    requestAnimation()

    return () => window.cancelAnimationFrame(requestId)
  }, [width, height, animate])

  return canvasRef
}
