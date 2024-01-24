import { rhythmWithDeRegister, rhythmWithInterval, rhythmWithRegister } from '@/recoil/rhythm'
import rhythmAtom, { selectRhythmIdAtom } from '@/recoil/rhythm/atom'
import { Point } from '@/types/canvas-types'
import { valueLimit } from '@/utils/math-util'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export const useRhythmAction = () => {
  const rhythm = useRecoilValue(rhythmAtom)
  const selectRhythmId = useRecoilValue(selectRhythmIdAtom)
  const setRegister = useSetRecoilState(rhythmWithRegister)
  const setDeregister = useSetRecoilState(rhythmWithDeRegister)
  const setRhythmInterval = useSetRecoilState(rhythmWithInterval)

  const register = (position: Point) => {
    setRegister({ ...rhythm, position })
  }

  const deRegister = () => {
    setDeregister(selectRhythmId)
  }

  const setInterval = (plus: number) => {
    setRhythmInterval((currInterval) => valueLimit(currInterval + plus, 2, 16))
  }

  return { register, deRegister, setInterval }
}
