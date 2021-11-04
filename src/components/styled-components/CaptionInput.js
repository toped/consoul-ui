import { Input } from '../primitives'
import styled from 'styled-components'

const CaptionInput = styled(Input)`
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

export default CaptionInput