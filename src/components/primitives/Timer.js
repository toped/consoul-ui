import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ProgressRing from './ProgressRing'
import Typography from './Typography'

const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  width: ${({radius}) => (radius * 2)}px;
`
const Number = styled(Typography)`
	font-size: ${({$radius}) => ($radius - 10)}px !important;
`

const DummyRing = styled.circle`
  transition: stroke-dashoffset 1.5s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`

let percentColors = [
	{ pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
	{ pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
	{ pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ]

let getColorForPercentage = (pct) => {
	for (var i = 1; i < percentColors.length - 1; i++) {
		if (pct < percentColors[i].pct) {
			break
		}
	}
	let lower = percentColors[i - 1]
	let upper = percentColors[i]
	let range = upper.pct - lower.pct
	let rangePct = (pct - lower.pct) / range
	let pctLower = 1 - rangePct
	let pctUpper = rangePct
	let color = {
		r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
		g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
		b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
	}
	return 'rgb(' + [color.r, color.g, color.b].join(',') + ')'
	// or output as hex if preferred
}

const Timer = ({showTimer, duration, radius, onCompleted, active, timerUpdated, controlled, currentTick, fontColor}) => {
	const [seconds, setSeconds] = useState(duration)

	const reset = () => {
		setSeconds(duration)
	}

	useEffect(() => {
		if(timerUpdated)
			timerUpdated(seconds)
	}, [seconds])

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
		<Wrapper className={showTimer ? 'flex' : 'hidden'} radius={radius}>
			<ProgressRing
				radius={ radius }
				stroke={ 4 }
				color={'rgba(58,58,58,1)'}
				progress={ 100 }
			/>
			<ProgressRing
				radius={ radius }
				stroke={ 4 }
				color={
					controlled 
						? getColorForPercentage(currentTick / duration)
						: getColorForPercentage(seconds / duration)
				}
				progress={ 
					controlled 
						? (currentTick / duration) * 100
						: (seconds / duration) * 100 
				}
			/>
			<Number variant="h1" weight="bold" className="text-center m-0" $radius={radius} color={fontColor}>
				{
					controlled
						? currentTick
						: seconds
				}
			</Number>
		</Wrapper>
	)
}

Timer.propTypes = {
	duration: PropTypes.number,
	currentTick: PropTypes.number,
	radius: PropTypes.number,
	active: PropTypes.bool,
	onCompleted: PropTypes.func,
	timerUpdated: PropTypes.func,
	showTimer: PropTypes.bool,
	controlled: PropTypes.bool,
	fontColor: PropTypes.string
}

Timer.defaultProps = {
	radius: 60,
	onCompleted: () => console.warn('timer complete'),
	active: true,
	showTimer: true
}

export default Timer
