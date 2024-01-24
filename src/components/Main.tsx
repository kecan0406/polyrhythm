import { useCanvas } from '@/hooks/useCanvas'
import { useClientWidthHeight } from '@/hooks/useClientWithHeight'
import { useRhythmAction } from '@/hooks/useRhythmAction'
import { getAnimate, useVisualization } from '@/hooks/useVisualization'
import { selectRhythmIdAtom } from '@/recoil/rhythm'
import { CanvasSize } from '@/types/canvas-types'
import styled from '@emotion/styled'
import React, { RefObject, useRef } from 'react'
import { useRecoilValue } from 'recoil'

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
  const visualization = useVisualization()
  const rhythmAction = useRhythmAction()
  const isSelect = useRecoilValue(selectRhythmIdAtom) !== null

  const handleRegister = (e: React.MouseEvent) => {
    rhythmAction.register({ x: e.clientX, y: e.clientY })
  }

  const handleDeregister = (e: React.MouseEvent) => {
    rhythmAction.deRegister()
    e.preventDefault()
  }

  const handlePreviewPosition = (e: React.MouseEvent) => {
    visualization.preview.isShow = !isSelect
    visualization.preview.position = { x: e.clientX, y: e.clientY }
  }

  const handleInterval = (e: React.WheelEvent) => {
    rhythmAction.setInterval(e.deltaY < 0 ? 1 : -1)
  }

  const canvasRef = useCanvas(canvasSize, getAnimate(visualization))
  return (
    <CanvasVisualization
      ref={canvasRef}
      onClick={handleRegister}
      onContextMenu={handleDeregister}
      onMouseMove={handlePreviewPosition}
      onWheel={handleInterval}
      onMouseEnter={() => (visualization.preview.isShow = true)}
      onMouseLeave={() => (visualization.preview.isShow = false)}
    />
  )
}
