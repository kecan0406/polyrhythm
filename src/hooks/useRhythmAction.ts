import { rhythmWithDeRegister, rhythmWithInterval, rhythmWithRegister } from '@/recoil/rhythm'
import rhythmAtom, { RhythmId } from '@/recoil/rhythm/atom'
import { Point } from '@/types/canvas-types'
import { valueLimit } from '@/utils/math-util'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export const useRhythmAction = () => {
  const rhythm = useRecoilValue(rhythmAtom)
  const setRegister = useSetRecoilState(rhythmWithRegister)
  const setDeregister = useSetRecoilState(rhythmWithDeRegister)
  const setRhythmInterval = useSetRecoilState(rhythmWithInterval)

  const register = (point: Point) => {
    setRegister({ ...rhythm, point })
  }

  const deRegister = (rhythmId: RhythmId) => {
    setDeregister(rhythmId)
  }

  const setInterval = (isPlus: boolean) => {
    setRhythmInterval((interval) => valueLimit(interval + (isPlus ? 1 : -1), 2, 16))
  }

  return { register, deRegister, setInterval }
}
