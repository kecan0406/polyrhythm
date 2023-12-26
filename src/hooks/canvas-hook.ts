import { RefObject, useEffect, useRef, useState } from 'react'

export const useCanvas = (canvasWidth: number, canvasHeight: number) => {
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const setCanvas = () => {
      const devicePixelRatio = window.devicePixelRatio ?? 1
      canvas.style.width = `${canvasWidth}px`
      canvas.style.height = `${canvasHeight}px`

      canvas.width = canvasWidth * devicePixelRatio
      canvas.height = canvasHeight * devicePixelRatio

      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    setCanvas()
  }, [canvasWidth, canvasHeight])

  return canvasRef
}

export const useClientWidthHeight = (ref: RefObject<HTMLElement>) => {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  useEffect(() => {
    const setClientWidthHeight = () => {
      if (ref.current) {
        setWidth(ref.current.clientWidth)
        setHeight(ref.current.clientHeight)
      }
    }
    setClientWidthHeight()

    window.addEventListener('resize', setClientWidthHeight)

    return () => window.removeEventListener('resize', setClientWidthHeight)
  }, [])

  return { width, height }
}
