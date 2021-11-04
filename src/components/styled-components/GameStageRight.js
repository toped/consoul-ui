import styled from 'styled-components'
import tw from 'twin.macro'

export const GameStageRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 3rem;
  ${tw`w-full md:w-1/3`}
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.GameStageRight};
  border-top: 3px solid ${({ theme }) => theme.stageLeft};
	border-bottom: 3px solid ${({ theme }) => theme.stageLeft};
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  overflow: hidden;
`

export default GameStageRight