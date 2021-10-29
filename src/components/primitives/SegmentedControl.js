import React, { useState, useRef, useEffect } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  background: rgba(239,239,240,1);
  /* max-width: 520px; */
  border-radius: 9px;
  margin: 0;
  padding: 2px;
  border: none;
  outline: none;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .option {
    position: relative;
    cursor: pointer !important;
  }

  .option:hover input:not(:checked) + label span,
  .option:active input:not(:checked) + label span,
  .option:focus input:not(:checked) + label span {
    opacity: .2;
  }

  .option:active input:not(:checked) + label span {
    transform: scale(.95);
  }

  .option label {
    position: relative;
    display: block;
    text-align: center;
    padding: 3px 6vmin;
    background: rgba(255,255,255,0);
    font-weight: 500;
    color: rgba(0,0,0,1);
    font-size: 14px;
  }

  .option label::before,
  .option label::after {
    content: '';
    width: 1px;
    background: rgba(142,142,147,.15);
    position: absolute;
    top: 14%;
    bottom: 14%;
    border-radius: 10px;
    will-change: background;
    -webkit-transition: background .2s ease;
    transition: background .2s ease;
  }

  .option label::before {
    left: 0;
    transform: translateX(-.5px);
  }

  .option label::after {
    right: 0;
    transform: translateX(.5px);
  }

  .option:first-of-type {
    grid-column: 1;
    grid-row: 1;
    box-shadow: none;
  }

  .option:first-of-type label::before {
    opacity: 0;
  }

  .option:last-of-type label::after {
    opacity: 0;
  }

  .selection {
    background: rgba(255,255,255,1);
    border: .5px solid rgba(0,0,0,0.04);
    box-shadow: 0 3px 8px 0 rgba(0,0,0,0.12), 0 3px 1px 0 rgba(0,0,0,0.04);
    border-radius: 7px;
    grid-column: 1;
    grid-row: 1;
    z-index: 2;
    will-change: transform;
    -webkit-transition: transform .2s ease;
    transition: transform .2s ease;
  }

  .option input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    border: none;
    opacity: 1;
    z-index: 3;
  }

  .option label span {
    display: block;
    position: relative;
    z-index: 2;
    -webkit-transition: all .2s ease;
    transition: all .2s ease;
    will-change: transform;
  }

  .option input:checked+label::before, .option input:checked+label::after {
    background: rgba(239,239,240,1);
    z-index: 1;
  }

  .option input:checked+label {
    cursor: pointer;
  }
`

const SegmentedControl = ({initialSegment, segments, changeHandler, ...props}) => {

	const [state,setState] = useState(initialSegment)
	const [lastPillSelection, setLastPillSelection] = useState(null)
	const [width] = useWindowSize()
	const selection = useRef(null)

	useEffect(() => {
		updatePillPosition(lastPillSelection?.element, lastPillSelection?.index)
	}, [width])
  
	useEffect(() => {
		if (typeof (changeHandler) === 'function') {
			changeHandler(state)
		}   
	}, [state])

	const updatePillPosition = (e, index) => {
		if (e === undefined || index === undefined) return

		selection.current.style.transform = `translateX(${(e.target.offsetWidth * index)}px)`
		setLastPillSelection({
			element: e,
			index
		}) 
	}
  
	return (
		<Wrapper {...props}>
			<span className="selection" ref={selection}/>
			{
				segments && segments.length > 0
					? segments.map((segment, idx) => {
						return (
							<div key={segment} className="option">
								<input
									type="radio"
									id={segment}
									name="options"
									value={segment}
									onClick={(e) => {setState(segment); updatePillPosition(e, idx)}}
								/>
								<label htmlFor="metro"><span>{segment}</span></label>
							</div>
						)})
					: null
			}
		</Wrapper>
	)
}

SegmentedControl.propTypes = {
	initialSegment: PropTypes.any,
	segments: PropTypes.array.isRequired,
	changeHandler: PropTypes.func.isRequired
}

export default SegmentedControl
