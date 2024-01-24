import rhythmConfigAtom, {
  rhythmConfigWithDeregister,
  rhythmConfigWithRegister,
  rhythmSelectAtom,
} from '@/recoil/rhythm/atom'
import { Point } from '@/types/canvas-types'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export const usePolyrhythmAction = () => {
  const selectRhythmId = useRecoilValue(rhythmSelectAtom)
  const setRhythmConfig = useSetRecoilState(rhythmConfigWithRegister)
  const setDeregister = useSetRecoilState(rhythmConfigWithDeregister)
  const rhythmConfig = useRecoilValue(rhythmConfigAtom)

  const register = (position: Point) => {
    setRhythmConfig({ ...rhythmConfig, position })
  }

  const deRegister = () => {
    setDeregister(selectRhythmId)
  }

  return { register, deRegister }
}
