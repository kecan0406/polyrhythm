import { rhythmWithDeRegister, rhythmWithRegister } from '@/recoil/rhythm'
import rhythmAtom, { selectRhythmIdAtom } from '@/recoil/rhythm/atom'
import { Point } from '@/types/canvas-types'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export const useRhythmAction = () => {
  const rhythm = useRecoilValue(rhythmAtom)
  const selectRhythmId = useRecoilValue(selectRhythmIdAtom)
  const setRegister = useSetRecoilState(rhythmWithRegister)
  const setDeregister = useSetRecoilState(rhythmWithDeRegister)

  const register = (position: Point) => {
    setRegister({ ...rhythm, position })
  }

  const deRegister = () => {
    setDeregister(selectRhythmId)
  }

  return { register, deRegister }
}
