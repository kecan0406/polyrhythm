import { RefObject, useEffect, useRef, useState } from 'react'
import { VisualizationManager } from '../lib/visualization'
import { CanvasSize, Interaction } from '../types/canvas-types'

export const useCanvas = (canvasSize: CanvasSize): [Interaction, RefObject<HTMLCanvasElement>] => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)
  const [interaction, setInteraction] = useState<Interaction>({ type: 'resize', value: canvasSize })

  useEffect(() => {
    const canvas = canvasRef.current!
    const setClickInteraction = (e: MouseEvent) => {
      setInteraction({ type: 'click', value: { x: e.clientX, y: e.clientY } })
      e.preventDefault()
    }

    canvas.addEventListener('click', setClickInteraction)
    canvas.addEventListener('contextmenu', setClickInteraction)
    return () => {
      canvas.removeEventListener('click', setClickInteraction)
      canvas.removeEventListener('contextmenu', setClickInteraction)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const { width, height } = canvasSize

    const setCanvas = () => {
      const devicePixelRatio = window.devicePixelRatio ?? 1
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      canvas.width = Math.floor(width * devicePixelRatio)
      canvas.height = Math.floor(height * devicePixelRatio)

      ctx.scale(devicePixelRatio, devicePixelRatio)
      ctx.fillStyle = 'rgb(31,31,36)'
      ctx.fillRect(0, 0, width, height)
    }
    setCanvas()

    setInteraction({ type: 'resize', value: canvasSize })
  }, [canvasSize])

  return [interaction, canvasRef]
}

export const useCanvasVisualization = (interaction: Interaction, canvasRef: RefObject<HTMLCanvasElement>) => {
  const visualizationManagerRef: RefObject<VisualizationManager> = useRef<VisualizationManager>(
    new VisualizationManager(),
  )

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const visualizationManager = visualizationManagerRef.current!

    if (interaction.type === 'click') {
      visualizationManager.generatePolygon(interaction.value)
      visualizationManager.draw(ctx)
    }
    if (interaction.type === 'resize') {
      visualizationManager.draw(ctx)
    }
  }, [interaction])
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
