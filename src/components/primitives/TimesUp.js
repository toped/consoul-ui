import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  /* http://waitanimate.wstone.io/#!/ */
  animation: shake-animation 4.72s ease infinite;
  transform-origin: 50% 50%;

  @keyframes shake-animation {
    0% { transform:translate(0,0) }
    1.78571% { transform:translate(5px,0) }
    3.57143% { transform:translate(0,0) }
    5.35714% { transform:translate(5px,0) }
    7.14286% { transform:translate(0,0) }
    8.92857% { transform:translate(5px,0) }
    10.71429% { transform:translate(0,0) }
    100% { transform:translate(0,0) }
  }
`
const TimesUp = (props) => {
	return (
		<Wrapper>
			{props.children}
		</Wrapper>
	)
}

TimesUp.propTypes = {
	/** Optional React Node to pass into component */
	children: PropTypes.node,
}

export default TimesUp
