import { Size } from '@/types/canvas-types'
import { RefObject, useEffect, useState } from 'react'

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
