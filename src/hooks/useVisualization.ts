import { Visualization } from '@/lib/visualization'
import { rhythmWithInterval } from '@/recoil/rhythm'
import { MouseEvent, useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'

export const useVisualization = () => {
  const interval = useRecoilValue(rhythmWithInterval)
  const visualizationRef = useRef<Visualization | null>(null)

  if (!visualizationRef.current) {
    visualizationRef.current = new Visualization()
  }

  useEffect(() => {
    const visualization = visualizationRef.current!
    visualization.preview.vertex = interval
  }, [interval])

  const handlePreview = (isShow: boolean) => (e: MouseEvent) => {
    const visualization = visualizationRef.current!
    visualization.preview.point = isShow ? { x: e.clientX, y: e.clientY } : { x: Infinity, y: Infinity }
  }

  return { visualizationRef, handlePreview }
}
