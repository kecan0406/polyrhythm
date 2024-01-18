import { ReactComponent as Github } from '@/assets/icon/github.svg'
import styled from '@emotion/styled'
import React from 'react'

const IntroduceContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
  margin-left: 12px;
`
const Link = styled.a`
  & > svg {
    :hover {
      fill: #fff;
    }
    fill: hsla(0, 0%, 100%, 0.7);
  }
`

const Introduce = () => {
  return (
    <IntroduceContainer>
      <Link href="https://github.com/kecan0406" target="_blank" rel="noopener">
        <Github />
      </Link>
    </IntroduceContainer>
  )
}
export default Introduce
