import rhythmConfigAtom, { rhythmConfigWithDeregister, rhythmConfigWithRegister, RhythmId } from '@/recoil/rhythm/atom'
import { Point } from '@/types/canvas-types'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export const usePolyrhythmAction = () => {
  const setRhythmConfig = useSetRecoilState(rhythmConfigWithRegister)
  const setDeregister = useSetRecoilState(rhythmConfigWithDeregister)
  const rhythmConfig = useRecoilValue(rhythmConfigAtom)

  const register = (position: Point) => {
    setRhythmConfig({ ...rhythmConfig, position })
  }

  const deRegister = (rhythmId?: RhythmId) => {
    setDeregister(rhythmId)
  }

  return { register, deRegister }
}
