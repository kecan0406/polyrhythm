import { useCanvas, useClientWidthHeight } from '@/hooks/canvas-hook'
import { usePolyrhythmActions } from '@/hooks/polyrhythm-hook'
import { getAnimate, useVisualization } from '@/hooks/visualization-hook'
import { withInterval } from '@/recoil/rhythm'
import { CanvasSize } from '@/types/canvas-types'
import { valueLimit } from '@/utils/math-util'
import styled from '@emotion/styled'
import React, { RefObject, useRef } from 'react'
import { useSetRecoilState } from 'recoil'

const MainContainer = styled.div`
  overflow: hidden;
  display: flex;

  width: 100%;
  height: 100%;
`

const Main = () => {
  const mainRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const playgroundSize = useClientWidthHeight(mainRef)
  return (
    <MainContainer ref={mainRef}>
      <PolyrhythmCanvas canvasSize={playgroundSize} />
    </MainContainer>
  )
}
export default Main

const CanvasVisualization = styled.canvas`
  display: block;
`

type PolyrhythmCanvasProps = { canvasSize: CanvasSize }
const PolyrhythmCanvas = ({ canvasSize }: PolyrhythmCanvasProps) => {
  const setRhythmInterval = useSetRecoilState(withInterval)
  const polyrhythmActions = usePolyrhythmActions()
  const visualization = useVisualization()

  const handleRegister = (e: React.MouseEvent) => {
    polyrhythmActions.register({ x: e.clientX, y: e.clientY })
  }

  const handleDeregister = (e: React.MouseEvent) => {
    polyrhythmActions.deregister()
    e.preventDefault()
  }

  const handlePreview = (e: React.MouseEvent) => {
    visualization.preview.position = { x: e.clientX, y: e.clientY }
  }

  const handleWheel = (e: React.WheelEvent) => {
    const plus = e.deltaY < 0 ? 1 : -1
    setRhythmInterval((currInterval) => valueLimit(currInterval + plus, 2, 16))
  }

  const canvasRef = useCanvas(canvasSize, getAnimate(visualization))
  return (
    <CanvasVisualization
      ref={canvasRef}
      onClick={handleRegister}
      onContextMenu={handleDeregister}
      onMouseMove={handlePreview}
      onMouseEnter={() => (visualization.preview.isShow = true)}
      onMouseLeave={() => (visualization.preview.isShow = false)}
      onWheel={handleWheel}
    />
  )
}
