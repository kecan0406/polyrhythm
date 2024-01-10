import { RefObject, useEffect, useRef, useState } from 'react'
import { Visualization } from '../lib/visualization'
import { CanvasSize, Size } from '../types/canvas-types'
import { usePolyrhythmValue } from './polyrhythm-hook'

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

export const useVisualization = () => {
  const polyrhythm = usePolyrhythmValue()
  const visualizationRef: RefObject<Visualization> = useRef<Visualization>(new Visualization())

  useEffect(() => {
    const visualization = visualizationRef.current!
    visualization.generateVisual(polyrhythm)
    return () => {
      visualization.clearVisual()
    }
  }, [polyrhythm])

  return visualizationRef.current!
}

export const useClientWidthHeight = (ref: RefObject<HTMLElement>): Size => {
  const [widthHeight, setWidthHeight] = useState<Size>({ width: 0, height: 0 })
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
