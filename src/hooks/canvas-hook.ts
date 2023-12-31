import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import { Visualization } from '../lib/visualization'
import { CanvasSize, ClickInteraction, Interaction, WheelInteraction } from '../types/canvas-types'

export const useCanvas = (canvasSize: CanvasSize): [Interaction, RefObject<HTMLCanvasElement>] => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)
  const [interaction, setInteraction] = useInteraction(canvasRef)

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

const useInteraction = (canvasRef: RefObject<HTMLElement>): [Interaction, Dispatch<SetStateAction<Interaction>>] => {
  const [interaction, setInteraction] = useState<Interaction>({ type: 'resize', value: { width: 0, height: 0 } })

  useEffect(() => {
    const canvas = canvasRef.current!
    const setClickInteraction = ({ type, x, y }: MouseEvent) => {
      setInteraction({ type, value: { x, y } } as ClickInteraction)
    }
    const setWheelInteraction = ({ deltaY, x, y }: WheelEvent) => {
      const type = deltaY ? 'wheelUp' : 'wheelDown'
      setInteraction({ type, value: { x, y } } as WheelInteraction)
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

  return [interaction, setInteraction]
}

export const useVisualization = (interaction: Interaction, canvasRef: RefObject<HTMLCanvasElement>) => {
  const visualizationRef: RefObject<Visualization> = useRef<Visualization>(new Visualization())

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const visualization = visualizationRef.current!

    if (interaction.type === 'click') {
      visualization.generatePolygon(interaction.value, ctx)
    }
    if (interaction.type === 'resize') {
      visualization.drawAll(ctx)
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
