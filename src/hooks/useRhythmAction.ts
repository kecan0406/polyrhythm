import { rhythmWithDeRegister, rhythmWithInterval, rhythmWithPreviewPoint, rhythmWithRegister } from '@/recoil/rhythm'
import rhythmAtom, { RhythmId } from '@/recoil/rhythm/atom'
import { Point } from '@/types/canvas-types'
import { valueLimit } from '@/utils/math-util'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export const useRhythmAction = () => {
  const rhythm = useRecoilValue(rhythmAtom)
  const setRegister = useSetRecoilState(rhythmWithRegister)
  const setDeregister = useSetRecoilState(rhythmWithDeRegister)
  const setRhythmInterval = useSetRecoilState(rhythmWithInterval)
  const setRhythmPreviewPoint = useSetRecoilState(rhythmWithPreviewPoint)

  const register = (point: Point) => {
    setRegister({ ...rhythm, point })
  }

  const deRegister = (rhythmId: RhythmId) => {
    setDeregister(rhythmId)
  }

  const setInterval = (plus: boolean) => {
    setRhythmInterval((interval) => valueLimit(interval + (plus ? 1 : -1), 2, 16))
  }

  const setPreviewPoint = (point: Point) => {
    setRhythmPreviewPoint(point)
  }

  return { register, deRegister, setInterval, setPreviewPoint }
}
