import { RefObject, useEffect, useRef, useState } from 'react'
import { CanvasSize } from '../types/canvas-types'

export const useCanvas = (canvasSize: CanvasSize, animate: (ctx: CanvasRenderingContext2D) => void) => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const setCanvas = () => {
      const { width, height } = canvasSize
      const devicePixelRatio = window.devicePixelRatio ?? 1
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      canvas.width = Math.floor(width * devicePixelRatio)
      canvas.height = Math.floor(height * devicePixelRatio)

      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    setCanvas()
    animate(ctx)
  }, [canvasSize])

  return canvasRef
}

export const useClientWidthHeight = (ref: RefObject<HTMLElement>): CanvasSize => {
  const [widthHeight, setWidthHeight] = useState<CanvasSize>({ width: 0, height: 0 })
  useEffect(() => {
    const setClientWidthHeight = () => {
      const { clientWidth, clientHeight } = ref.current!
      setWidthHeight({ width: clientWidth, height: clientHeight })
    }
    setClientWidthHeight()

    window.addEventListener('resize', setClientWidthHeight)

    return () => window.removeEventListener('resize', setClientWidthHeight)
  }, [])

  return widthHeight
}
