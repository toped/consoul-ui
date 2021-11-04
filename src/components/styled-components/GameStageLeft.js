import styled from 'styled-components'
import tw from 'twin.macro'

export const GameStageLeft = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 3rem;
  ${tw`w-full md:w-2/3`}
  box-sizing: border-box;
  background-color: ${({theme}) => theme.stageLeft};
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`

export default GameStageLeft