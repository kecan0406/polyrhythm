import styled from '@emotion/styled'
import React, { MouseEvent, RefObject, useRef } from 'react'

const ProgressBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 12px;
`
const ProgressBarBackground = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 4px;
  top: 50%;
  transform: translateY(-50%);
  background: gray;
  border-radius: 4px;
  overflow: hidden;
`
type ProgressBarActiveProps = { percent: number; isHover: boolean }
const ProgressBarActive = styled.div<ProgressBarActiveProps>`
  width: 100%;
  transform: translateX(${({ percent }) => (percent - 1) * 100}%);
  background: ${({ isHover }) => (isHover ? 'rgb(29, 185, 84)' : 'white')};
  touch-action: none;
`

type ProgressBarProps = { progress: number; isHover: boolean; onDrag: (percent: number) => void }
const ProgressBar = ({ progress, onDrag, isHover }: ProgressBarProps) => {
  const progressBarRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef<boolean>(false)

  const handleDrag = ({ clientX }: MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = !isDraggingRef.current

    const progressBar = progressBarRef.current!
    onDrag((clientX - progressBar.offsetLeft) / 100)
  }

  const handleValue = ({ clientX }: MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return

    const progressBar = progressBarRef.current!
    onDrag((clientX - progressBar.offsetLeft) / 100)
  }

  return (
    <ProgressBarContainer
      onMouseUp={handleDrag}
      onMouseDown={handleDrag}
      onMouseLeave={() => (isDraggingRef.current = false)}
      onMouseMove={handleValue}
      ref={progressBarRef}
    >
      <ProgressBarBackground>
        <ProgressBarActive percent={progress} isHover={isHover} />
      </ProgressBarBackground>
    </ProgressBarContainer>
  )
}
export default ProgressBar
