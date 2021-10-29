import React from 'react'
import styled from 'styled-components'

const Indicator = styled.span`
  width: 10px;
  height: 10px;
  border: 2px solid white;
  display: inline-block;
  background-color: green;
  border-radius: 100%;
  animation: pulse 4s linear infinite;

  @keyframes pulse {
    0% {
     box-shadow: none;
    }
    50% {
      box-shadow: 0 0 10px 10px rgba(93, 216, 55, 0.1), 0 0 10px 5px rgba(255, 255, 255, 0.1);
    }
    100% {
      box-shadow: 0 0 10px 10px rgba(93, 216, 55, 0.1), 0 0 10px 5px transparent;
    }
  }
`
const OnlineCircle = (props) => {
	return <Indicator {...props}/>
}

export default OnlineCircle
