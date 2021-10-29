import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SVG = styled.svg`
  position: absolute;
`
const Circle = styled.circle`
  transition: stroke-dashoffset 1.5s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`

const ProgressRing = ({ radius, stroke, progress, color }) => {
  
	const normalizedRadius = radius - stroke * 2
	const circumference = normalizedRadius * 2 * Math.PI
	const strokeDashoffset = circumference - progress / 100 * circumference
  
	return (
		<SVG
			height={radius * 2}
			width={radius * 2}
		>
			<Circle
				stroke={color || 'blue'}
				fill="transparent"
				strokeWidth={ stroke }
				strokeLinecap="round"
				strokeDasharray={circumference + ' ' + circumference }
				style={ { strokeDashoffset } }
				r={ normalizedRadius }
				cx={ radius }
				cy={ radius }
			/>
		</SVG>
	)
}

ProgressRing.propTypes = {
	radius: PropTypes.number,
	stroke: PropTypes.number,
	progress: PropTypes.number,
	color: PropTypes.string
}

export default ProgressRing