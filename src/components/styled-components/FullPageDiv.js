import styled from 'styled-components'

export const FullPageDiv = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({theme}) => theme.background};
  overflow: hidden;
`

export default FullPageDiv