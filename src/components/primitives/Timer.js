import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ProgressRing from './ProgressRing'
import Typography from './Typography'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: ${({radius}) => (radius * 2)}px;
`

const Timer = ({duration, radius, onCompleted, active}) => {
	const [seconds, setSeconds] = useState(duration)

	const reset = () => {
		setSeconds(duration)
	}

	useEffect(() => {
		let interval = null

		if (active && seconds !== 0) {
			interval = setInterval(() => {
				setSeconds(seconds => seconds - 1)
			}, 1000)
		} else if (seconds === 0) {
			clearInterval(interval)
			onCompleted()
			reset()
		} else if (!active){
			clearInterval(interval)
			reset()
		}
		return () => clearInterval(interval)
	}, [active, seconds])

	return (
		<Wrapper radius={radius}>
			<ProgressRing
				radius={ radius }
				stroke={ 4 }
				progress={ (seconds / duration) * 100 }
				color="rgba(222,222,227,1)"
			/>
			<Typography variant="body" weight="bold" className="text-center m-0">{seconds}</Typography>
		</Wrapper>
	)
}

Timer.propTypes = {
	duration: PropTypes.number,
	radius: PropTypes.number,
	active: PropTypes.bool,
	onCompleted: PropTypes.func
}

Timer.defaultProps = {
	duration: 5,
	radius: 60,
	onCompleted: () => {},
	active: true
}

export default Timer
