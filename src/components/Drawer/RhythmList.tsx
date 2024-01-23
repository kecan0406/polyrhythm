import polyrhythmAtom from '@/recoil/polyrhythm'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

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
const Typography = styled.span`
  padding: 8px 16px;
  color: #fff;
  font-size: 1rem;
  font-weight: 400;
`

const RhythmList = () => {
  const polyrhythm = useRecoilValue(polyrhythmAtom)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    const rhythm = polyrhythm.find(({ id }) => id === selectedId)
    if (rhythm) {
      console.log(rhythm)
    }
  }, [selectedId])

  const handleSelectRhythm = (id: number) => {
    setSelectedId(selectedId === id ? null : id)
  }

  return (
    <RhythmListContainer>
      <RhythmLists>
        {polyrhythm.map(({ id }) => (
          <RhythmListItem key={id} onClick={() => handleSelectRhythm(id)} selected={selectedId === id}>
            <Typography>Rhythm {id}</Typography>
          </RhythmListItem>
        ))}
      </RhythmLists>
    </RhythmListContainer>
  )
}
export default RhythmList
