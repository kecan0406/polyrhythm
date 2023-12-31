import { RefObject, useEffect, useRef, useState } from 'react'
import { Visualization } from '../lib/visualization'
import { CanvasSize, ClickInteraction, Interaction, Size, WheelInteraction } from '../types/canvas-types'

export const useCanvas = ({ width, height }: CanvasSize): RefObject<HTMLCanvasElement> => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)
  const interaction = useInteraction(canvasRef)
  const animate = useVisualization(interaction)

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

const useInteraction = (canvasRef: RefObject<HTMLElement>): Interaction => {
  const [interaction, setInteraction] = useState<Interaction>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const setClickInteraction = ({ type, x, y }: MouseEvent) => {
      setInteraction({ type, value: { x, y } } as ClickInteraction)
    }
    const setWheelInteraction = ({ ctrlKey, deltaY, x, y }: WheelEvent) => {
      const type = deltaY ? 'wheelUp' : 'wheelDown'
      !ctrlKey && setInteraction({ type, value: { x, y } } as WheelInteraction)
    }

    canvas.addEventListener('click', setClickInteraction)
    canvas.addEventListener('contextmenu', setClickInteraction)
    canvas.addEventListener('wheel', setWheelInteraction)
    return () => {
      canvas.removeEventListener('click', setClickInteraction)
      canvas.removeEventListener('contextmenu', setClickInteraction)
      canvas.removeEventListener('wheel', setWheelInteraction)
    }
  }, [])

  return interaction
}

const useVisualization = (interaction: Interaction) => {
  const visualizationRef: RefObject<Visualization> = useRef<Visualization>(new Visualization())

  useEffect(() => {
    if (!interaction) return
    const visualization = visualizationRef.current!
    const { type: interactionType, value: interactionValue } = interaction

    switch (interactionType) {
      case 'click':
        visualization.generatePolygon(interactionValue)
        break
      case 'contextmenu':
        visualization.removePolygon()
        break
    }
  }, [interaction])

  const animate = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')!
    fillBackground(ctx, { width: parseInt(canvas.style.width), height: parseInt(canvas.style.height) })
    drawVisual(ctx)
  }

  const fillBackground = (ctx: CanvasRenderingContext2D, { width, height }: Size) => {
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = 'rgb(31,31,36)'
    ctx.fillRect(0, 0, width, height)
  }

  const drawVisual = (ctx: CanvasRenderingContext2D) => {
    const visualization = visualizationRef.current!
    visualization.drawAll(ctx)
  }
  return animate
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
