import React from 'react'
import styled from 'styled-components'

import Typography from './Typography'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #292970;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
          flex-direction: column;
  -webkit-box-align: stretch;
          align-items: stretch;
  -webkit-box-pack: center;
          justify-content: center;
  align-content: center;

  @keyframes loading {
    0% {
      width: 50pt;
      height: 50pt;
      margin-top: 0;
    }
    25% {
      height: 4pt;
      margin-top: 23pt;
    }
    50% {
      width: 4pt;
    }
    75% {
      width: 50pt;
    }
    100% {
      width: 50pt;
      height: 50pt;
      margin-top: 0;
    }
  }
`
const Box = styled.div`
  min-height: 60pt;
`
const Loader = styled.div`
  width: 50pt;
  height: 50pt;
  border-radius: 100%;
  border: #6767fa 4pt solid;
  margin-left: auto;
  margin-right: auto;
  background-color: transparent;
  -webkit-animation: loading 1s infinite;
  animation: loading 1s infinite;
`

const GameLoading = () => {
	return (
		<Wrapper>
			<Box>
				{/* <Loader/> */}
			</Box>
		</Wrapper>
	)
}

export default GameLoading
