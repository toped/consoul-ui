import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Input, Button } from '.'

const CaptionInputField = styled(Input)`
	background-color: #e8eeef;
	border-radius: 5px;
  width:100%;

	.bp3-input {
		text-align: center;
		background: rgba(255,255,255,0.);
		border: none !important;
		font-size: 1rem !important;
		height: 60px;
		margin: 0;
		outline: 0;
		padding: 7px;
		background-color: ${({theme}) => theme.grey_4 } !important;
		border-radius: 5px !important;
		color: ${({theme}) => theme.text } !important;
		::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
			color: ${({theme}) => theme.text } !important;
			opacity: .4 !important;
		}
	}
`

const CaptionInput = ({ submitCaption }) => {
	
	const [captionText, setCaptionText] = useState('')

	return (
		<>
			<CaptionInputField
				onChange={(e) => {setCaptionText(e.target.value)}}
				className="my-4"
				placeholder="Enter a caption"
				type="text"
				name="caption"
				maxLength="25"
				value={captionText}
			/>
			<Button className="mb-4" color="MediumSeaGreen" outline onClick={() => submitCaption(captionText)}>Submit caption</Button>
		</>
	)
}


CaptionInput.propTypes = {
	submitCaption: PropTypes.func
}

export default CaptionInput