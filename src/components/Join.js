import React from 'react'
import  Link from 'gatsby-link'

import { FullPageDiv } from '../components/styled-components/FullPageDiv'
import { Typography, Button } from './primitives'

const Join = () => {

	return (
		<FullPageDiv>
			<Typography variant="h3">Join Game...</Typography>
			<Link to="/">
				<Button className="mb-4" outline>Back to home</Button>
			</Link>
		</FullPageDiv>
	)
}

export default Join
