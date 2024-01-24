import { Instruments } from '@/lib/instruments'
import { rhythmConfigFamily, RhythmId, rhythmIdsAtom, rhythmSelectAtom } from '@/recoil/rhythm/atom'
import { QUARTER_NOTE } from '@/utils/math-util'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { getDestination, getTransport } from 'tone'

const RhythmListContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: auto;
`
const RhythmLists = styled.ul``

type RhythmListItemProps = { selected: boolean }
const RhythmListItem = styled.li<RhythmListItemProps>`
  display: flex;
  width: 100%;
  height: 46px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.1s ease;
  background-color: ${({ selected }) => selected && '#3e3e3e'};
  :hover {
    background-color: ${({ selected }) => (selected ? '#3e3e3e' : '#282828')};
  }
`
const RhythmList = () => {
  const rhythmIds = useRecoilValue(rhythmIdsAtom)
  const [selectedId, setSelectedId] = useState<RhythmId | null>(null)
  const setSelectRhythmConfig = useSetRecoilState(rhythmSelectAtom)

  useEffect(() => {
    setSelectRhythmConfig(selectedId)
  }, [selectedId])

  const handleSelectRhythm = (id: RhythmId) => {
    setSelectedId(selectedId === id ? null : id)
  }

  return (
    <RhythmListContainer>
      <RhythmLists>
        {rhythmIds.map((id) => (
          <RhythmListItem key={id} onClick={() => handleSelectRhythm(id)} selected={selectedId === id}>
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
  const rhythmConfig = useRecoilValue(rhythmConfigFamily(rhythmId))

  useEffect(() => {
    const transport = getTransport()
    const instrument = new Instruments(rhythmConfig.synthName).connect(getDestination())
    const scheduleId = transport.scheduleRepeat(
      (time) => instrument.trigger(rhythmConfig.noteSymbol, rhythmConfig.pitch, '8n', time),
      `${Math.round(QUARTER_NOTE / rhythmConfig.interval)}i`,
      0,
    )
    return () => {
      transport.clear(scheduleId)
      instrument.dispose()
    }
  }, [rhythmConfig])

  return (
    <RhythmItemContainer>
      <Typography>Rhythm {rhythmId}</Typography>
    </RhythmItemContainer>
  )
}
