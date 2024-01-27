import { rhythmWithSelect } from '@/recoil/rhythm/index'
import { DefaultValue, selector } from 'recoil'

const rhythmWithPreviewPoint = selector({
  key: 'rhythmWithPreviewPoint',
  get: ({ get }) => get(rhythmWithSelect).point,
  set: ({ set, get }, point) => {
    const rhythm = get(rhythmWithSelect)
    !rhythm.isActive &&
      set(rhythmWithSelect, {
        ...rhythm,
        point: point instanceof DefaultValue ? rhythm.point : point,
      })
  },
})

export default rhythmWithPreviewPoint
