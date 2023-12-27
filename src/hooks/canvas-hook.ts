import { RefObject, useEffect, useRef, useState } from 'react'

export const useCanvas = (
  canvasWidth: number,
  canvasHeight: number,
  animate: (ctx: CanvasRenderingContext2D) => void,
) => {
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const setCanvas = () => {
      const devicePixelRatio = window.devicePixelRatio ?? 1
      canvas.style.width = `${canvasWidth}px`
      canvas.style.height = `${canvasHeight}px`
      canvas.width = Math.floor(canvasWidth * devicePixelRatio)
      canvas.height = Math.floor(canvasHeight * devicePixelRatio)

      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    setCanvas()
    animate(ctx)
  }, [canvasWidth, canvasHeight])

  return canvasRef
}

export const useClientWidthHeight = (ref: RefObject<HTMLElement>) => {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  useEffect(() => {
    const setClientWidthHeight = () => {
      const clientEl = ref.current!
      setWidth(clientEl.clientWidth)
      setHeight(clientEl.clientHeight)
    }
    setClientWidthHeight()

    window.addEventListener('resize', setClientWidthHeight)

    return () => window.removeEventListener('resize', setClientWidthHeight)
  }, [])

  return { width, height }
}
