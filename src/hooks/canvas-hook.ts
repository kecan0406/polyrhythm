import { RefObject, useEffect, useRef, useState } from 'react'
import { Polygon } from '../lib/visualization'
import { CanvasPoint, CanvasSize } from '../types/canvas-types'

export const useCanvas = (canvasSize: CanvasSize) => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)
  const [canvasPoint, setCanvasPoint] = useState<CanvasPoint>({ x: 0, y: 0 })

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
    setCanvasPoint(() => {
      const { x, y } = canvas.getBoundingClientRect()
      return { x, y }
    })
  }, [canvasSize])

  return { canvasRef, canvasPoint }
}

export const useCanvasAnimate = (
  canvasRef: RefObject<HTMLCanvasElement>,
  canvasSize: CanvasSize,
  polygonList: Polygon[],
) => {
  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const animate = (ctx: CanvasRenderingContext2D) => {
      fillBackGround(ctx)
      polygonList.forEach((polygon) => polygon.draw(ctx))
    }
    const fillBackGround = (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = 'rgb(31,31,36)'
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
    }

    animate(ctx)
  }, [canvasSize, polygonList])
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
