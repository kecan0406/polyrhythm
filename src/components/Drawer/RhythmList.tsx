import { Instruments } from '@/lib/instruments'
import { rhythmIdsAtom, rhythmWithIsSelect } from '@/recoil/rhythm'
import { RhythmId, rhythmAtomFamily, selectRhythmIdAtom } from '@/recoil/rhythm/atom'
import { QUARTER_NOTE } from '@/utils/math-util'
import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { getDestination, getTransport } from 'tone'

const RhythmListContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: auto;
`
const RhythmLists = styled.ul``

type RhythmListItemProps = { isSelect: boolean }
const RhythmListItem = styled.li<RhythmListItemProps>`
  display: flex;
  width: 100%;
  height: 46px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.1s ease;
  background-color: ${({ isSelect }) => isSelect && '#3e3e3e'};
  :hover {
    background-color: ${({ isSelect }) => (isSelect ? '#3e3e3e' : '#282828')};
  }
`
const RhythmList = () => {
  const rhythmIds = useRecoilValue(rhythmIdsAtom)
  const [rhythmId, setRhythmId] = useRecoilState(selectRhythmIdAtom)
  const setIsSelect = useSetRecoilState(rhythmWithIsSelect)

  useEffect(() => {
    rhythmId && setIsSelect(true)
  }, [rhythmId])

  const handleSelectRhythm = (id: RhythmId) => () => {
    setIsSelect(false)
    setRhythmId(id === rhythmId ? 0 : id)
  }

  return (
    <RhythmListContainer>
      <RhythmLists>
        {rhythmIds.map((id) => (
          <RhythmListItem key={id} onClick={handleSelectRhythm(id)} isSelect={rhythmId === id}>
            <RhythmItem rhythmId={id} />
          </RhythmListItem>
        ))}
      </RhythmLists>
    </RhythmListContainer>
  )
}
export default RhythmList

const RhythmItemContainer = styled.div`
  display: flex;
  flex: 1;
`
const Typography = styled.span`
  padding: 8px 16px;
  color: #fff;
  font-size: 1rem;
  font-weight: 400;
`

type RhythmItemProps = { rhythmId: number }
const RhythmItem = ({ rhythmId }: RhythmItemProps) => {
  const rhythm = useRecoilValue(rhythmAtomFamily(rhythmId))

  useEffect(() => {
    const transport = getTransport()
    const instrument = new Instruments(rhythm.synthName).connect(getDestination())
    const scheduleId = transport.scheduleRepeat(
      (time) => instrument.trigger(`${rhythm.noteSymbol}${rhythm.pitch}`, '8n', time),
      `${Math.round(QUARTER_NOTE / rhythm.interval)}i`,
      0,
    )
    return () => {
      instrument.dispose()
      transport.clear(scheduleId)
    }
  }, [rhythm])

  return (
    <RhythmItemContainer>
      <Typography>Rhythm {rhythmId}</Typography>
    </RhythmItemContainer>
  )
}
